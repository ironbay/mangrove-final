export * as Pipe from "./pipe";
import { SQL } from "@mangrove/core/sql";
import { PlaidAccountType } from "functions/graphql/types/connection";
import { ulid } from "ulid";

declare module "@mangrove/core/sql" {
  export interface Database {
    pipes: {
      id: string;
      enabled: boolean;
      name: string;
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

export async function from_plaid_connection(connection_id: string) {
  const number_filter_matches = await SQL.DB.selectFrom("number_filters")
    .innerJoin("pipes", "id", "pipe_id")
    .where("connection_id", "=", connection_id)
    .groupBy("pipes.id")
    .select(["pipes.id", "pipes.name", "pipes.enabled"])
    .execute();
  const string_filter_matches = await SQL.DB.selectFrom("string_filters")
    .innerJoin("pipes", "id", "pipe_id")
    .where("connection_id", "=", connection_id)
    .groupBy("pipes.id")
    .select(["pipes.id", "pipes.name", "pipes.enabled"])
    .execute();

  return Object.values(
    [...number_filter_matches, ...string_filter_matches].reduce(
      (coll, curr) => {
        if (!coll[curr.id]) coll[curr.id] = curr;
        return coll;
      },
      {} as { [key: string]: SQL.Row["pipes"] }
    )
  );
}

export async function from_slack_connection(connection_id: string) {
  return await SQL.DB.selectFrom("slack_destinations")
    .innerJoin("pipes", "id", "pipe_id")
    .where("connection_id", "=", connection_id)
    .groupBy("pipes.id")
    .select(["pipes.id", "pipes.name", "pipes.enabled"])
    .execute();
}
