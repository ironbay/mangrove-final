import { Entity } from "electrodb"
import * as Dynamo from "@mangrove/core/dynamo"

const PipeEntity = new Entity(
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
      },
      userID: {
        type: "string",
        required: true,
      },
      status: {
        type: "string",
        required: true,
      },
      name: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: ["pipeID"],
        },
      },
      pipeLookup: {
        pk: {
          field: "gsi2pk",
          composite: ["pipeID"],
        },
        sk: {
          field: "gsi2sk",
          composite: ["pipeID"],
        },
      },
      byUserID: {
        pk: {
          field: "gsi3pk",
          composite: ["userID"],
        },
        sk: {
          field: "gsi3sk",
          composite: ["pipeID"],
        },
      },
    },
  },
  Dynamo.Service
)
