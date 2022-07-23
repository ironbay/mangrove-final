import { Entity, EntityItem } from "electrodb";
import { Dynamo } from "../dynamo";

export const FilterEntity = new Entity(
  {
    model: {
      entity: "NumberFilter",
      version: "1",
      service: "mangrove",
    },
    attributes: {
      filterID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      pipeID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      filterKind: {
        type: "string",
        required: true,
        readOnly: false,
      },
      op: {
        type: "string",
        required: true,
        readOnly: false,
      },
      value: {
        type: "any",
        required: true,
        readOnly: false,
      },
    },
    indexes: {
      filter: {
        collection: "filters",
        pk: {
          field: "pk",
          composite: ["filterID"],
        },
        sk: {
          field: "sk",
          composite: [],
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

export type FilterType = EntityItem<typeof FilterEntity>;

export async function forPipe(pipeID: string) {
  return FilterEntity.query.pipe({ pipeID }).go();
}

export * as Filter from ".";
