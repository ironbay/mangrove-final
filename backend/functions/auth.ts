import { Issuer, TokenSet } from "openid-client"
import { Config } from "sst/node/config"
import Slack from "@mangrove/core/slack"
import * as User from "@mangrove/core/user"

import {
  AuthHandler,
  GithubAdapter,
  OauthAdapter,
  useSession,
} from "sst/node/future/auth"
import { SessionTypes } from "sst/node/auth"

declare module "sst/node/future/auth" {
  export interface SessionTypes {
    user: {
      userID: string
    }
  }
}

type SlackTokenSetMetaData = {
  team: {
    id: string
    name: string
  }
}

export const handler = AuthHandler({
  clients: async () => ({
    // local: "https://gzo8h80da7.execute-api.us-east-1.amazonaws.com",
    local: "https://ph0jx8k451.execute-api.us-east-1.amazonaws.com",
  }),
  providers: {
    github: GithubAdapter({
      clientID: Config.GITHUB_CLIENT_ID,
      clientSecret: Config.GITHUB_CLIENT_SECRET,
      scope: "user:email",
    }),
    slack: OauthAdapter({
      issuer: new Issuer({
        issuer: "slack",
        authorization_endpoint: "https://slack.com/oauth/v2/authorize",
        token_endpoint: "https://slack.com/api/oauth.v2.access",
      }),
      clientID: Config.SLACK_CLIENT_ID,
      clientSecret: Config.SLACK_CLIENT_SECRET,
      scope: "chat:write team:read channels:read channels:join groups:read",
    }),
  },
  async onAuthorize(input) {},
  async onSuccess(input) {
    const session = useSession()

    console.log(session)

    if (session.type === "user") {
      console.log("the user is: ", session.properties.userID)
    }

    if (input.provider === "github") {
      await User.githubLogin(input.tokenset.access_token!)
    }

    if (input.provider === "slack") {
      if (session.type !== "user") throw new Error("User not logged in")
      const tokenSet = input.tokenset as TokenSet & SlackTokenSetMetaData
      console.log(tokenSet)
      await Slack.Connection.create({
        userID: session.properties.userID,
        slackTeamID: tokenSet.team.id,
        slackTeamName: tokenSet.team.name,
        accessToken: tokenSet.access_token!,
      })
    }

    if (input.provider === "github" || input.provider === "slack") {
      return {
        type: "user",
        properties: {
          userID: "usr123",
        },
      }
    }

    throw new Error("Unkown provider")
  },
  async onError() {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "text/plain",
      },
      body: "Auth failed",
    }
  },
})
