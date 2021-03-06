import { Entity, EntityItem } from "electrodb";
import { Dynamo } from "../dynamo";

export const SlackDestinationEntity = new Entity(
  {
    model: {
      entity: "SlackDestination",
      version: "1",
      service: "mangrove",
    },
    attributes: {
      destinationID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      connectionID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      pipeID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      teamID: {
        type: "string",
        required: true,
        readOnly: false,
      },
      channelID: {
        type: "string",
        required: true,
        readOnly: false,
      },
    },
    indexes: {
      destination: {
        pk: {
          field: "pk",
          composite: ["destinationID"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },
      pipe: {
        collection: "pipes",
        index: "gsi1pk",
        pk: {
          field: "gsi1pk",
          composite: ["pipeID"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["destinationID"],
        },
      },
    },
  },
  Dynamo.Configuration
);

export async function forPipe(pipeID: string) {
  return SlackDestinationEntity.query.pipe({ pipeID }).go();
}

export type SlackDestinationEntityType = EntityItem<
  typeof SlackDestinationEntity
>;

export * as Slack from ".";
