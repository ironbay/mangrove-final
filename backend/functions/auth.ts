import { AuthHandler, GoogleAdapter } from "sst/node/auth"
import { Config } from "sst/node/config"

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: "oidc",
      clientID: Config.GOOGLE_CLIENT_ID,
      onSuccess: async (tokenset) => {
        return {
          statusCode: 200,
          body: JSON.stringify(tokenset),
        }
      },
    }),
  },
})
