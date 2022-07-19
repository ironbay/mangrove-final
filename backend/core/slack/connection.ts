export * as SlackConnection from "./connection";
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

export async function fromID(connectionID: string) {
  return SlackConnectionEntity.query.connection({ connectionID }).go();
}

export async function channels(connectionID: string) {
  const [connection] = await fromID(connectionID);
  const resp = await client(connection.accessToken).conversations.list();
  return resp.channels!.map(c => ({ name: c.name!, id: c.id! }));
}

export type SlackConnectionEntityType = EntityItem<
  typeof SlackConnectionEntity
>;

export * as Connection from ".";
