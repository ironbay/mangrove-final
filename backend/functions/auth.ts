import { Issuer } from "openid-client"
import { useSession } from "sst/node/auth"
import { Config } from "sst/node/config"
import { AuthHandler, GithubAdapter, OauthAdapter } from "sst/node/future/auth"

declare module "sst/node/future/auth" {
  export interface SessionTypes {
    user: {
      userID: string
    }
  }
}

export const handler = AuthHandler({
  clients: async () => ({
    local: "https://localhost",
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
      scope: "chat:write team:read channels:read channels:join",
    }),
  },
  async onAuthorize(input) {
    console.log("---")
    console.log("---")
    console.log(Config.GITHUB_CLIENT_ID)
    console.log(Config.GITHUB_CLIENT_SECRET)
    console.log(input)
    console.log("on authorize")
  },
  async onSuccess(input) {
    const session = useSession()
    console.log("----", session)

    if (input.provider === "github") {
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
    console.log("why")
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "text/plain",
      },
      body: "Auth failed",
    }
  },
})
