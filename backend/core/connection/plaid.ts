export * as PlaidConnection from "./plaid";
import { Configuration, PlaidApi, PlaidEnvironments, AccountBase } from "plaid";
import { SQL } from "@mangrove/core/sql";
import { DateTime } from "luxon";

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
      id: string;
      num_transactions: number;
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

export async function from_id(connection_id: string) {
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

function get_tx(conn_id: string) {
  const conn = await from_id(conn_id);

  const start = DateTime.now().minus({ days: 7 }).toFormat("yyyy-MM-dd");
  const finish = DateTime.now().add({ days: 1 }).toFormat("yyyy-MM-dd");

  async function fetch(offset = 0) {
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
        ...resp.data.transactions,
        ...(await fetch(offset + resp.data.transactions.length)),
      ];
    }
    return resp.data.transactions;
  }
}

// declare module "@mangrove/core/plaid_connection" {
//   export interface Plaid {
//     account: {
//       id: string;
//       name: string;
//       kind: string;
//       subkind: string;
//     };
//     institution: {
//       id: string;
//       name: string;
//       color: string;
//       logo: string;
//     };
//   }
// }
