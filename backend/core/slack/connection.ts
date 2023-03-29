import { Entity } from "electrodb"
import { Dynamo } from "../dynamo"
import { InstallProvider, InstallURLOptions, Installation } from "@slack/oauth"

import { Config } from "sst/node/config"
import { Api } from "sst/node/api"
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
      refreshToken: {
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
          composite: ["connectionID"],
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

const installer = new InstallProvider({
  clientId: Config.SLACK_CLIENT_ID,
  clientSecret: Config.SLACK_CLIENT_SECRET,
  stateSecret: "secret",
})

const redirectURI = Api.api.url + "/slack/auth/callback"

function client(token?: string) {
  return new WebClient(token)
}

export async function authURL(input: { userID: string }) {
  const metaData = JSON.stringify({
    userID: input.userID,
  })

  return installer.generateInstallUrl({
    scopes: ["chat:write", "team:read", "channels:read", "channels:join"],
    redirectUri: redirectURI,
    metadata: metaData,
  })
}

export async function authFinish(input: { userID: string }) {
  const exchange = await tokenExchange({ code: "", userID: "" })
  const created = await create({
    userID: input.userID,
    accessToken: exchange.access_token!,
    slackTeamName: exchange.team?.name!,
    slackTeamID: exchange.team?.id!,
    refreshToken: exchange.refresh_token!,
  })

  return created
}

export async function tokenExchange(input: { code: string; userID: string }) {
  const resp = await client().oauth.v2.access({
    code: input.code,
    client_id: Config.SLACK_CLIENT_ID,
    client_secret: Config.SLACK_CLIENT_SECRET,
    redirect_uri: redirectURI,
  })

  return resp
}

export async function create(input: {
  userID: string
  accessToken: string
  slackTeamName: string
  slackTeamID: string
  refreshToken: string
}) {
  const resp = await SlackConnectionEntity.create({
    connectionID: crypto.randomUUID(),
    userID: input.userID,
    accessToken: input.accessToken,
    slackTeamName: input.slackTeamName,
    slackTeamID: input.slackTeamID,
    refreshToken: input.refreshToken,
    timesCreated: Date.now().toString(),
  }).go()

  return resp.data
}

export async function refreshToken(input: { refreshToken: string }) {
  const resp = await client().oauth.v2.access({
    client_id: Config.SLACK_CLIENT_ID,
    client_secret: Config.SLACK_CLIENT_SECRET,
    grant_type: "refresh_token",
    refresh_token: input.refreshToken,
  })

  const update = await SlackConnectionEntity.update({ connectionID: "123" })
    .set({
      refreshToken: resp.refresh_token,
    })
    .go({ response: "all_new" })

  return update
}
