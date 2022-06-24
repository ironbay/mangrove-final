export * as Connection from "./connection";
import { Configuration, PlaidApi, PlaidEnvironments, AccountBase } from "plaid";
import { SQL } from "@mangrove/core/sql";

declare module "@mangrove/core/sql" {
  export interface Database {
    plaid_connections: {
      id: string;
      userID: string;
      accessToken: string;
      institutionName: string;
      institutionColor: string;
      logo: string;
    };
  }
}

export interface Account {
  id: string;
  name: string;
  kind: string;
}

export type PlaidConnection = {
  id: string;
  userID: string;
  accessToken: string;
  institution: {
    name: string;
    color: string;
    logo: string;
  };
};

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

export async function get_account(
  connection_id: string,
  account_id: string
): Promise<Account> {
  const connection = await fromID(connection_id);

  const account = await client
    .accountsGet({
      access_token: connection.accessToken,
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
  const connection = await fromID(connection_id);

  return await client
    .accountsGet({
      access_token: connection.accessToken,
    })
    .then(resp => resp.data.accounts.map(raw => format_account(raw)));
}

export async function list(userID: string) {
  return await SQL.DB.selectFrom("plaid_connections")
    .selectAll()
    .where("userID", "=", userID)
    .execute();
}

export async function fromID(connection_id: string) {
  const alan = await SQL.DB.selectFrom("plaid_connections")
    .selectAll()
    .where("id", "=", connection_id)
    .executeTakeFirstOrThrow();

  return alan;
}

function decode(row: SQL.Row["plaid_connections"]): PlaidConnection {
  return {
    ...row,
    userID: row.userID,
    accessToken: row.accessToken,
    institution: {
      name: row.institutionName,
      color: row.institutionColor,
      logo: row.logo,
    },
  };
}

function format_account(raw: AccountBase) {
  return {
    id: raw!.account_id!,
    name: raw!.official_name!,
    kind: raw!.type,
  };
}
