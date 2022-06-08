export * as SlackConnection from "./slack";
import { WebClient as Client } from "@slack/web-api";
import { SQL } from "@mangrove/core/sql";

declare module "@mangrove/core/sql" {
  export interface Database {
    slack_connections: {
      id: string;
      user_id: string;
      team_name: string;
      logo: string;
      access_token: string;
    };
  }
}

export type Channel = {
  id: string;
  name: string;
};

export async function list() {
  return SQL.DB.selectFrom("slack_connections").selectAll().execute();
}

export async function from_id(id: string) {
  const alan = SQL.DB.selectFrom("slack_connections")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirstOrThrow();

  return alan;
}

export async function channels(access_token: string) {
  const client = new Client(access_token);
  return client.conversations
    .list()
    .then(resp => resp.channels!.map(c => ({ id: c.id!, name: c.name! })));
}
