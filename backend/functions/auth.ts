import * as Github from "@mangrove/core/github"
import { AuthHandler, GithubAdapter } from "sst/node/auth"
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
  },
})
