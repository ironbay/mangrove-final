import * as Github from "@mangrove/core/github"
import { AuthHandler, GithubAdapter, OauthAdapter } from "sst/node/auth"
import { Issuer } from "openid-client"
import { Config } from "sst/node/config"
import * as User from "@mangrove/core/user"

export const handler = AuthHandler({
  providers: {
    github: GithubAdapter({
      clientID: Config.GITHUB_CLIENT_ID,
      clientSecret: Config.GITHUB_CLIENT_SECRET,
      scope: "user:email",
      onSuccess: async (tokenset) => {
        await User.login({ accessToken: tokenset.access_token! })

        return {
          statusCode: 200,
          body: JSON.stringify(tokenset),
        }
      },
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
      onSuccess: async (tokenSet) => {
        return {
          statusCode: 200,
          body: tokenSet.scope || "no scope",
        }
      },
    }),
  },
})
