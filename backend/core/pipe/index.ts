import { Entity, EntityItem } from "electrodb"
import * as Dynamo from "@mangrove/core/dynamo"
import { Transaction } from "plaid"
import { Target } from "../slack"

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
        index: "gsi2",
        collection: "pipes",
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
  Dynamo.Config
)

export type PipeType = EntityItem<typeof PipeEntity>

export async function handlePlaidMatch(input: {
  pipeID: string
  tx: Transaction
}) {
  const pipes = await Dynamo.Mangrove.collections
    .pipes({ pipeID: input.pipeID })
    .go()

  const pipe = pipes.data.pipe.at(0)

  await Promise.all(
    pipes.data.slackTarget.map((target) => {
      Target.publishPlaidTx({ target, pipe: pipe!, tx: input.tx })
    })
  )
}
