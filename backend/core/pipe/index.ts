import { Entity, EntityItem } from "electrodb";
import { FilterNode } from "kysely";
import { Dynamo, MangroveService } from "../dynamo";
export * as Filter from "./filter";

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

export type PipeEntityType = EntityItem<typeof PipeEntity>;
export function create() {}

export * as Pipe from "./index";
