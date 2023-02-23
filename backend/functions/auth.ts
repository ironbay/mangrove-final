import { AuthHandler, GoogleAdapter } from "sst/node/auth"
import { Config } from "sst/node/config"

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: "oauth",
      clientID: Config.GOOGLE_CLIENT_ID,
      clientSecret: Config.GOOGLE_CLIENT_SECRET,
      scope: "https://www.googleapis.com/auth/userinfo.profile",
      onSuccess: async (tokenset) => {
        return {
          statusCode: 200,
          body: JSON.stringify(tokenset),
        }
      },
    }),
  },
})
