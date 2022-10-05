import { WebClient as Client } from "@slack/web-api";
import { Entity, EntityItem } from "electrodb";
import { Dynamo } from "../dynamo";
import { config, Config } from "@serverless-stack/node/config";
import { ulid } from "ulid";
import { Response } from "aws-sdk";

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
      user: {
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["userID"],
        },

        sk: {
          field: "gsi1sk",
          composite: ["connectionID"],
        },
      },
    },
  },
  Dynamo.Configuration
);

function client(accessToken?: string) {
  return new Client(accessToken);
}

async function clientFromID(connectionID: string) {
  const conn = await fromID(connectionID);
  return client(conn.accessToken);
}

export async function forUser(userID: string) {
  return SlackConnectionEntity.query.user({ userID }).go();
}

export async function fromID(connectionID: string) {
  const [conn] = await SlackConnectionEntity.query
    .connection({ connectionID })
    .go();

  return conn;
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
  const connection = await fromID(connectionID);
  const resp = await client(connection.accessToken).conversations.list();
  if (!resp.channels) return [];

  return resp.channels.map(channel => ({
    id: channel.id!,
    name: channel.name!,
  }));
}

export async function create(userID: string, code: string) {
  const resp = await client().oauth.v2.access({
    code,
    client_id: Config.SLACK_CLIENT_ID,
    client_secret: Config.SLACK_CLIENT_SECRET,
  });

  const created = await SlackConnectionEntity.create({
    connectionID: ulid(),
    userID,
    accessToken: resp.access_token!,
    teamID: resp.team!.id!,
    teamName: resp.team!.name!,
  }).go();

  return fromID(created.connectionID);
}

export type SlackConnectionEntityType = EntityItem<
  typeof SlackConnectionEntity
>;

export * as Connection from ".";
