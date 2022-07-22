import { Entity, EntityItem } from "electrodb";
import { Dynamo } from "../dynamo";

export const SourceEntity = new Entity(
  {
    model: {
      entity: "PlaidSource",
      version: "1",
      service: "mangrove",
    },
    attributes: {
      sourceID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      pipeID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      accountID: {
        type: "string",
        required: true,
        readOnly: false,
      },
      accountName: {
        type: "string",
        required: true,
        readOnly: false,
      },
      accountKind: {
        type: "string",
        required: true,
        readOnly: false,
      },
      itemID: {
        type: "string",
        required: true,
        readOnly: false,
      },
      kind: {
        type: "string",
        required: true,
        readOnly: false,
      },
    },
    indexes: {
      source: {
        pk: {
          field: "pk",
          composite: ["sourceID"],
        },
        sk: {
          field: "sk",
          composite: ["pipeID"],
        },
      },
      pipe: {
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["pipeID"],
        },
        sk: {
          field: "gsi1sk",
          composite: [],
        },
      },
    },
  },
  Dynamo.Configuration
);

export type SourceEntityType = EntityItem<typeof SourceEntity>;
export * as Source from ".";
