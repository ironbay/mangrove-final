import * as Github from "@mangrove/core/github"
import { AuthHandler, GithubAdapter } from "sst/node/auth"
import { Config } from "sst/node/config"

export const handler = AuthHandler({
  providers: {
    github: GithubAdapter({
      clientID: Config.GITHUB_CLIENT_ID,
      clientSecret: Config.GITHUB_CLIENT_SECRET,
      scope: "user:email",
      onSuccess: async (tokenset) => {
        const userInfo = await Github.fromToken(tokenset?.access_token || "")
        const emailInfo = await Github.emailsFromToken(
          tokenset?.access_token || ""
        )
        const json = JSON.stringify(
          { userInfo, tokenset, emailInfo },
          null,
          "\t"
        )

        return {
          statusCode: 200,
          body: json,
        }
      },
    }),
  },
})
