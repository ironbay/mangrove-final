export * as SlackConnection from "./slack";

declare module "@mangrove/core/sql" {
  export interface Database {
    slack_connections: {
      id: string;
      user_id: string;
      access_token: string;
      team_name: string;
    };
  }
}

export interface Connection {
  id: string;
  team_name: string;
  logo: string;
  channels: Channel[];
}

export interface Channel {
  id: string;
  name: string;
  is_private: boolean;
}

export interface Destination {
  id: string;
  connection: Connection;
  channel: Channel;
}

export async function from_id(id: string) {
  return {
    id: "123",
    team_name: "123",
    logo: "123",
    channels: [],
  };
}

export async function channels(id: string) {
  return [];
}
