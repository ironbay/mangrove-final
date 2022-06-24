export * as Pipe from ".";
import { SQL } from "@mangrove/core/sql";
import { PlaidAccountType } from "functions/graphql/types/connection";
import { ulid } from "ulid";

declare module "@mangrove/core/sql" {
  export interface Database {
    pipes: {
      id: string;
      enabled: boolean;
      name: string;
      times_created: string;
      times_updated: string;
    };
    number_filters: {
      id: string;
      pipe_id: string;
      account_id: string;
      connection_id: string;
      value: number;
      operand: string;
    };
    string_filters: {
      id: string;
      pipe_id: string;
      account_id: string;
      connection_id: string;
      value: string;
      operand: string;
    };
    slack_destinations: {
      id: string;
      pipe_id: string;
      channel_id: string;
      team_id: string;
      connection_id: string;
    };
  }
}

type NumberFiltersInput = {
  operand: string;
  value: number;
};

export async function addPipe(
  name: string,
  enabled: boolean,
  number_filters: NumberFiltersInput[]
) {
  const pipe = await SQL.DB.insertInto("pipes")
    .values({
      id: ulid(),
      name,
      enabled,
      times_created: new Date().toISOString(),
      times_updated: new Date().toISOString(),
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  return pipe;
}

export async function list() {
  const pipes = await SQL.DB.selectFrom("pipes").selectAll().execute();
  return pipes;
}

export async function number_filters(pipe_id: string) {
  return await SQL.DB.selectFrom("number_filters")
    .selectAll()
    .where("pipe_id", "=", pipe_id)
    .execute();
}

export async function string_filters(pipe_id: string) {
  return await SQL.DB.selectFrom("string_filters")
    .selectAll()
    .where("pipe_id", "=", pipe_id)
    .execute();
}

export async function slack_destinations(pipe_id: string) {
  return await SQL.DB.selectFrom("slack_destinations")
    .selectAll()
    .where("pipe_id", "=", pipe_id)
    .execute();
}

async function from_child(
  connection_id: string,
  kind: "number_filters" | "string_filters" | "slack_destinations"
) {
  return await SQL.DB.selectFrom(kind)
    .innerJoin("pipes", "id", "pipe_id")
    .where("connection_id", "=", connection_id)
    .groupBy("pipes.id")
    .select([
      "pipes.id",
      "pipes.name",
      "pipes.enabled",
      "pipes.times_created",
      "pipes.times_updated",
    ])
    .execute();
}

export async function from_plaid_connection(connection_id: string) {
  const from_number_filters = await from_child(connection_id, "number_filters");
  const from_string_filters = await from_child(connection_id, "string_filters");

  return Object.values(
    [...from_number_filters, ...from_string_filters].reduce((coll, curr) => {
      if (!coll[curr.id]) coll[curr.id] = curr;
      return coll;
    }, {} as { [key: string]: SQL.Row["pipes"] })
  );
}

export async function from_slack_connection(connection_id: string) {
  return await from_child(connection_id, "slack_destinations");
}

export async function run(tx: SQL.Row["plaid_connections"]) {}
