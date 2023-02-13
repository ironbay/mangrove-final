import { SQL } from "@mangrove/core/sql";
export * as Tx from "./transaction";
import type { Transaction } from "plaid";
import * as Connection from "./connection";
import { DateTime } from "luxon";

import { Bus } from "@mangrove/core/bus";
import { PlaidEnvironments, Configuration, PlaidApi } from "plaid";

const configuration = new Configuration({
  basePath: PlaidEnvironments.production,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": "xxx_client_id",
      "PLAID-SECRET": "xxx_plaid_secret",
    },
  },
});

const client = new PlaidApi(configuration);

declare module "@mangrove/core/sql" {
  export interface Database {
    plaid_transactions: {
      id: string;
      userID: string;
      amount: number;
      connectionID: string;
      accountID: string;
      date: string;
      name: string;
      pending: boolean;
      category: string | null;
      merchant?: string | null;
      channel: string;
      locationAddress: string | null;
      locationCity: string | null;
      locationRegion: string | null;
      locationPostal: string | null;
      locationCountry: string | null;
    };
  }
}

export type PlaidTx = {
  id: string;
  userID: string;
  accountID: string;
  connectionID: string;
  amount: number;
  date: string;
  name: string;
  pending: boolean;
  categories: string[];
  merchant?: string | null;
  channel: string;
  location: {
    address: string | null;
    city: string | null;
    region: string | null;
    postal: string | null;
    country: string | null;
  };
};

declare module "@mangrove/core/bus" {
  export interface Events {
    "plaid.tx.available": {
      connID: string;
      num_transactions: number;
    };
    "plaid.tx.new": PlaidTx;
    "plaid.tx.test": {
      id: string;
    };
  }
}

export async function sync(connID: string) {
  console.log("i am called");
  const conn = await Connection.fromID(connID);
  console.log("so am i ");
  const start = DateTime.now().minus({ days: 7 }).toFormat("yyyy-MM-dd");
  const finish = DateTime.now().plus({ days: 1 }).toFormat("yyyy-MM-dd");

  const [existing, next] = await Promise.all([
    list(connID, start, finish),
    fetchFromPlaid(connID, start, finish),
  ]);

  const freshTx = findFresh(existing, next);
  const db_write = SQL.DB.insertInto("plaid_transactions")
    .values(freshTx.map(tx => encode(tx)))
    .execute();

  console.log("last once alled..");

  const publish = Promise.all(freshTx.map(t => Bus.publish("plaid.tx.new", t)));
  return Promise.all([db_write, publish]);
}

function findFresh(existing: PlaidTx[], fetched: PlaidTx[]) {
  const map = existing.reduce((coll, row) => {
    coll[row.id] = true;
    return coll;
  }, {} as Record<string, boolean>);

  return fetched.filter(tx => !map[tx.id]);
}

async function list(connID: string, start: string, finish: string) {
  return SQL.DB.selectFrom("plaid_transactions")
    .selectAll()
    .where("connectionID", "=", connID)
    .where("date", ">=", start)
    .where("date", "<=", finish)
    .execute()
    .then(resp => resp.map(tx => decode(tx)));
}

async function fetchFromPlaid(connID: string, start: string, finish: string) {
  console.log("i am also called");
  const conn = await Connection.fromID(connID);
  console.log("but this was not");

  async function fetch(offset = 0): Promise<PlaidTx[]> {
    const resp = await client.transactionsGet({
      access_token: conn.id,
      start_date: start,
      end_date: finish,
      options: {
        offset,
      },
    });

    if (resp.data.transactions.length < resp.data.total_transactions) {
      return [
        ...resp.data.transactions.map(
          tx => fromPlaid(tx, conn.id, conn.userID),
          fetch(offset + resp.data.transactions.length)
        ),
        ...(await fetch(offset + resp.data.transactions.length)),
      ];
    }

    return resp.data.transactions.map(tx =>
      fromPlaid(tx, conn.id, conn.userID)
    );
  }

  return fetch();
}

function decode(tx: SQL.Row["plaid_transactions"]): PlaidTx {
  return {
    ...tx,
    userID: tx.userID,
    connectionID: tx.connectionID,
    accountID: tx.accountID,
    categories: (tx.category || "").split(","),
    location: {
      address: tx.locationAddress,
      city: tx.locationCity,
      region: tx.locationRegion,
      postal: tx.locationPostal,
      country: tx.locationCountry,
    },
  };
}

function encode(tx: PlaidTx): SQL.Row["plaid_transactions"] {
  return {
    ...tx,
    merchant: tx.merchant || null,
    category: tx.categories.join(","),
    locationAddress: tx.location.address,
    locationCity: tx.location.city,
    locationRegion: tx.location.region,
    locationPostal: tx.location.postal,
    locationCountry: tx.location.country,
  };
}

function fromPlaid(tx: Transaction, connID: string, userID: string): PlaidTX {
  return {
    id: tx.transaction_id,
    userID: userID,
    connectionID: connID,
    accountID: tx.account_id,
    amount: tx.amount,
    name: tx.name,
    date: tx.date,
    pending: tx.pending,
    categories: tx.category || [],
    merchant: tx.merchant_name,
    channel: tx.payment_channel,
    location: { ...tx.location, postal: tx.location.postal_code },
  };
}
