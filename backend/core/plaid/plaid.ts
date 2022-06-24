export * as PlaidConnection from "./plaid";
import {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
  AccountBase,
  Transaction as PlaidTransaction,
} from "plaid";
import { SQL } from "@mangrove/core/sql";
import { DateTime } from "luxon";
import { Location } from "aws-sdk";
import { Bus } from "@mangrove/core/bus";

declare module "@mangrove/core/sql" {
  export interface Database {
    plaid_connections: {
      id: string;
      user_id: string;
      access_token: string;
      institution_name: string;
      institution_color: string;
      logo: string;
    };
    plaid_transactions: {
      id: string;
      user_id: string;
      amount: number;
      connection_id: string;
      account_id: string;
      date: string;
      name: string;
      pending: boolean;
      category: string | null;
      merchant?: string | null;
      channel: string;
      location_address: string | null;
      location_city: string | null;
      location_region: string | null;
      location_postal: string | null;
      location_country: string | null;
    };
  }
}

export interface Account {
  id: string;
  name: string;
  kind: string;
}

export interface Connection {
  id: string;
  institution_name: string;
  institution_color: string;
  logo: string;
}

const configuration = new Configuration({
  basePath: PlaidEnvironments.production,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": "xxx_client_id",
      "PLAID-SECRET": "xxx_plaid_secret",
    },
  },
});

declare module "@mangrove/core/bus" {
  export interface Events {
    "plaid.tx.available": {
      connID: string;
      num_transactions: number;
    };
    // "plaid.tx.new": SQL.Row["plaid_transactions"];
    "plaid.tx.new": { id: string; amount: number };
    "plaid.tx.test": {
      id: string;
    };
  }
}

const client = new PlaidApi(configuration);

export async function get_account(
  connection_id: string,
  account_id: string
): Promise<Account> {
  const connection = await from_id(connection_id);

  const account = await client
    .accountsGet({
      access_token: connection.access_token,
    })
    .then(resp => {
      return resp.data.accounts.find(a => a.account_id === account_id);
    });

  return {
    id: account!.account_id!,
    name: account!.official_name!,
    kind: account!.type,
  };
}

export async function accounts(connection_id: string) {
  const connection = await from_id(connection_id);

  return await client
    .accountsGet({
      access_token: connection.access_token,
    })
    .then(resp => resp.data.accounts.map(raw => format_account(raw)));
}

export async function list(user_id: string) {
  return await SQL.DB.selectFrom("plaid_connections").selectAll().execute();
}

export async function fromID(connection_id: string) {
  return await SQL.DB.selectFrom("plaid_connections")
    .selectAll()
    .where("id", "=", connection_id)
    .executeTakeFirstOrThrow();
}

function format_account(raw: AccountBase) {
  return {
    id: raw!.account_id!,
    name: raw!.official_name!,
    kind: raw!.type,
  };
}

export async function transactions(
  conn_id: string,
  start: string,
  finish: string
) {
  return SQL.DB.selectFrom("plaid_transactions")
    .selectAll()
    .where("connection_id", "=", conn_id)
    .where("date", ">=", start)
    .where("date", "<=", finish)
    .execute();
}

export async function pipes() {
  setTimeout(() => {}, 2000);
}

export async function syncTX(connID: string) {
  const conn = await fromID(connID);

  const start = DateTime.now().minus({ days: 7 }).toFormat("yyyy-MM-dd");
  const finish = DateTime.now().plus({ days: 1 }).toFormat("yyyy-MM-dd");

  async function fetch(offset = 0): Promise<SQL.Row["plaid_transactions"][]> {
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
        ...resp.data.transactions.map(tx =>
          formatTransaction(conn.user_id, conn.id, tx)
        ),
        ...(await fetch(offset + resp.data.transactions.length)),
      ];
    }

    return resp.data.transactions.map(tx =>
      formatTransaction(conn.user_id, conn.id, tx)
    );
  }

  const [existing, next] = await Promise.all([
    transactions(connID, start, finish),
    fetch(),
  ]);

  const map = existing.reduce((coll, row) => {
    coll[row.id] = true;
    return coll;
  }, {} as Record<string, boolean>);

  const freshTX = next.filter(tx => !map[tx.id]);

  const db_write = SQL.DB.insertInto("plaid_transactions")
    .values(freshTX)
    .execute();

  const publish = Promise.all(freshTX.map(t => Bus.publish("plaid.tx.new", t)));
  return Promise.all([db_write, publish]);
}

function formatTransaction(
  userID: string,
  connID: string,
  tx: PlaidTransaction
): SQL.Row["plaid_transactions"] {
  return {
    id: tx.transaction_id,
    user_id: userID,
    connection_id: connID,
    account_id: tx.account_id,
    amount: tx.amount,
    name: tx.name,
    date: tx.date,
    pending: tx.pending,
    category: tx.category?.join(",") || null,
    merchant: tx.merchant_name,
    channel: tx.payment_channel,
    location_address: tx.location.address,
    location_city: tx.location.city,
    location_region: tx.location.region,
    location_postal: tx.location.postal,
    location_country: tx.location.country,
  };
}
