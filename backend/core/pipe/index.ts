import { Entity, EntityItem } from "electrodb";
import { FilterNode } from "kysely";
import { Dynamo, MangroveService } from "../dynamo";
export * as Filter from "./filter";

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

export const PipeEntity = new Entity(
  {
    model: {
      entity: "Pipe",
      version: "1",
      service: "mangrove",
    },
    attributes: {
      pipeID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      userID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      name: {
        type: "string",
        required: true,
        readOnly: false,
      },
      enabled: {
        type: "boolean",
        required: true,
        readOnly: false,
      },
    },
    indexes: {
      pipe: {
        collection: "pipes",
        pk: {
          field: "pk",
          composite: ["pipeID"],
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

export async function destinations(pipeID: string) {
  return SlackDestinationEntity.query.pipe({ pipeID }).go();
}

export type PipeEntityType = EntityItem<typeof PipeEntity>;
export type SlackDestinationType = EntityItem<typeof SlackDestinationEntity>;
export function create() {}

export * as Pipe from "./index";
