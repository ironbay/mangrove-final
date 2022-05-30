export * as Pipe from "./pipe";
import { SQL } from "@mangrove/core/sql";

declare module "@mangrove/core/sql" {
  export interface Database {
    pipes: {
      id: string;
      user_id: string;
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
    };
  }
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
