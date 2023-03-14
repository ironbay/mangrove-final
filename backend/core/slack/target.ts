import { Entity, EntityItem } from "electrodb"
import { Dynamo } from "../dynamo"
import { Transaction } from "plaid"
import { PipeType } from "../pipe"
import { Bus } from "@mangrove/core/bus"

export const SlackTargetEntity = new Entity(
  {
    model: {
      entity: "SlackTarget",
      version: "1",
      service: "mangrove",
    },
    attributes: {
      targetID: {
        type: "string",
        required: true,
      },
      userID: {
        type: "string",
        required: true,
      },
      pipeID: {
        type: "string",
        required: true,
      },
      slackConnectionID: {
        type: "string",
        required: true,
      },
      slackTeamID: {
        type: "string",
        required: true,
      },
      slackTeamName: {
        type: "string",
        required: true,
      },
      slackTeamLogo: {
        type: "string",
        required: true,
      },
      slackChannelID: {
        type: "string",
        required: true,
      },
      slackChannelName: {
        type: "string",
        required: true,
      },
      refreshToken: {
        type: "string",
        required: true,
      },
      accessToken: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: ["targetID"],
        },
      },
      byPipeID: {
        index: "gsi2",
        collection: "pipes",
        pk: {
          field: "gsi2pk",
          composite: ["pipeID"],
        },
        sk: {
          field: "gsi2sk",
          composite: ["targetID"],
        },
      },
      bySlackConnectionID: {
        pk: {
          field: "gsi5pk",
          composite: ["slackConnectionID"],
        },
        sk: {
          field: "gsi5sk",
          composite: ["targetID"],
        },
      },
    },
  },
  Dynamo.Config
)

declare module "@mangrove/core/bus" {
  export interface Events {
    "slack.target.publish.plaid": {
      tx: Transaction
      pipe: PipeType
      target: SlackTargetType
    }
  }
}

export type SlackTargetType = EntityItem<typeof SlackTargetEntity>

export async function publishPlaidTx(input: {
  tx: Transaction
  pipe: PipeType
  target: SlackTargetType
}) {
  await Bus.publish("slack.target.publish.plaid", input)
}

export async function sendPlaid(input: {
  tx: Transaction
  pipe: PipeType
  target: SlackTargetType
}) {}
