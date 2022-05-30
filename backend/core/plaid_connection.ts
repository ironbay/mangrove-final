export * as PlaidConnection from "./plaid_connection";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import { SQL } from "@mangrove/core/sql";

declare module "@mangrove/core/sql" {
  export interface Database {
    plaid_connections: {
      id: string;
      user_id: string;
      access_token: string;
    };
  }
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

const client = new PlaidApi(configuration);

export interface Account {
  id: string;
  name: string;
  kind: string;
}

export async function account(
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

async function from_id(connection_id: string) {
  return await SQL.DB.selectFrom("plaid_connections")
    .selectAll()
    .where("id", "=", connection_id)
    .executeTakeFirstOrThrow();
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
