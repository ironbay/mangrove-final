import { Entity } from "electrodb"
import { Dynamo } from "../dynamo"
import { Config } from "sst/node/config"
import { WebClient } from "@slack/web-api"
import crypto from "crypto"

const SlackConnectionEntity = new Entity(
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
      },
      timesCreated: {
        type: "string",
        required: true,
      },
      userID: {
        type: "string",
        required: true,
      },
      accessToken: {
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
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: ["userID", "slackTeamID"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },
      byUserID: {
        index: "gsi3",
        pk: {
          field: "gsi3pk",
          composite: ["userID"],
        },
        sk: {
          field: "gsi3sk",
          composite: ["connectionID"],
        },
      },
      slackConnectionLookup: {
        index: "gsi5",
        pk: {
          field: "gsi5pk",
          composite: ["connectionID"],
        },
        sk: {
          field: "gsi5sk",
          composite: [],
        },
      },
    },
  },
  Dynamo.Config
)

function client(token?: string) {
  return new WebClient(token)
}

export async function create(input: {
  userID: string
  accessToken: string
  slackTeamName: string
  slackTeamID: string
}) {
  const resp = await SlackConnectionEntity.put({
    connectionID: crypto.randomUUID(),
    userID: input.userID,
    accessToken: input.accessToken,
    slackTeamName: input.slackTeamName,
    slackTeamID: input.slackTeamID,
    timesCreated: Date.now().toString(),
  }).go()

  return resp.data
}

export async function listChannels(team: string) {
  const resp = await client("123").conversations.list()
  return resp
}

// export async function refreshToken(input: { refreshToken: string }) {
//   const resp = await client().oauth.v2.access({
//     client_id: Config.SLACK_CLIENT_ID,
//     client_secret: Config.SLACK_CLIENT_SECRET,
//     grant_type: "refresh_token",
//     refresh_token: input.refreshToken,
//   })

//   const update = await SlackConnectionEntity.update({ connectionID: "123" })
//     .set({
//       refreshToken: resp.refresh_token,
//     })
//     .go({ response: "all_new" })

//   return update
// }
