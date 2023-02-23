import {
  Config,
  StackContext,
  use,
  Api as ApiGateway,
  Auth,
} from "sst/constructs"
import { Dynamo } from "./Dynamo"

export function Api(ctx: StackContext) {
  const dynamo = use(Dynamo)

  const GOOGLE_CLIENT_ID = new Config.Secret(ctx.stack, "GOOGLE_CLIENT_ID")
  const GOOGLE_CLIENT_SECRET = new Config.Secret(
    ctx.stack,
    "GOOGLE_CLIENT_SECRET"
  )

  const api = new ApiGateway(ctx.stack, "api", {
    defaults: {
      function: {
        bind: [dynamo, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET],
      },
    },
    routes: {
      "POST /graphql": {
        type: "graphql",
        function: "backend/functions/graphql/graphql.handler",
        pothos: {
          schema: "backend/functions/graphql/schema.ts",
          output: "graphql/schema.graphql",
          commands: [
            "cd graphql && pnpm genql --output ./genql --schema ./schema.graphql --esm",
          ],
        },
      },
    },
  })

  const auth = new Auth(ctx.stack, "auth", {
    authenticator: "backend/functions/auth.handler",
  })

  auth.attach(ctx.stack, { api })

  ctx.stack.addOutputs({
    API_URL: api.url,
  })

  return api
}
