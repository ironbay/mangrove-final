import { Entity, EntityItem } from "electrodb"
import { Dynamo } from "../dynamo"

export const FilterEntity = new Entity(
  {
    model: {
      entity: "Filter",
      version: "1",
      service: "mangrove",
    },
    attributes: {
      filterID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      kind: {
        type: "string",
        required: true,
        readOnly: false,
      },
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
          composite: ["filterID"],
        },
      },
    },
  },
  Dynamo.Config
)

export function fromPipe(pipeID: string) {
  return FilterEntity.query.pipe({ pipeID }).go()
}
