export * as SlackConnection from "./";
import { WebClient as Client } from "@slack/web-api";
import { Entity, EntityItem } from "electrodb";
import { Dynamo } from "../dynamo";

export const SlackConnectionEntity = new Entity(
  {
    model: {
      entity: "SlackConnection",
      version: "1",
      service: "mangrove",
    },
    attributes: {
      connectionID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      userID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      accessToken: {
        type: "string",
        required: true,
        readOnly: true,
      },
      teamID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      teamName: {
        type: "string",
        required: true,
        readOnly: true,
      },
    },
    indexes: {
      connection: {
        pk: {
          field: "pk",
          composite: ["connectionID"],
        },
        sk: {
          field: "sk",
          composite: ["userID"],
        },
      },
    },
  },
  Dynamo.Configuration
);

function client(accessToken: string) {
  return new Client(accessToken);
}

async function clientFromID(connectionID: string) {
  const [conn] = await fromID(connectionID);
  return client(conn.accessToken);
}

export async function fromID(connectionID: string) {
  return SlackConnectionEntity.query.connection({ connectionID }).go();
}

export async function teamForDestination(connID: string, teamID: string) {
  const client = await clientFromID(connID);
  const resp = await client.team.info({ team: teamID });

  return {
    id: resp.team!.id!,
    name: resp.team!.name!,
    icon: resp.team!.icon?.image_230,
  };
}

export async function channelForDestination(connID: string, channelID: string) {
  const client = await clientFromID(connID);
  const resp = await client.conversations.info({ channel: channelID });

  return {
    id: resp.channel!.id!,
    name: resp.channel!.name!,
  };
}

export async function channels(connectionID: string) {
  const [connection] = await fromID(connectionID);
  const resp = await client(connection.accessToken).conversations.list();
  return resp.channels!.map(c => ({ name: c.name!, id: c.id! }));
}

export type SlackConnectionEntityType = EntityItem<
  typeof SlackConnectionEntity
>;
