import {
  Config,
  StackContext,
  use,
  Api as ApiGateway,
  Auth,
} from "sst/constructs"
import { Dynamo } from "./Dynamo"
import { Bus } from "./Bus"

export function Api(ctx: StackContext) {
  const dynamo = use(Dynamo)
  const bus = use(Bus)

  const GITHUB_CLIENT_ID = new Config.Secret(ctx.stack, "GITHUB_CLIENT_ID")
  const GITHUB_CLIENT_SECRET = new Config.Secret(
    ctx.stack,
    "GITHUB_CLIENT_SECRET"
  )

  const PLAID_CLIENT_ID = new Config.Secret(ctx.stack, "PLAID_CLIENT_ID")
  const PLAID_CLIENT_SECRET = new Config.Secret(
    ctx.stack,
    "PLAID_CLIENT_SECRET"
  )
  const PLAID_CLIENT_SECRET_SANDBOX = new Config.Secret(
    ctx.stack,
    "PLAID_CLIENT_SECRET_SANDBOX"
  )

  const SLACK_CLIENT_ID = new Config.Secret(ctx.stack, "SLACK_CLIENT_ID")
  const SLACK_CLIENT_SECRET = new Config.Secret(
    ctx.stack,
    "SLACK_CLIENT_SECRET"
  )
  const SLACK_SIGNING_SECRET = new Config.Secret(
    ctx.stack,
    "SLACK_SIGNING_SECRET"
  )

  const api = new ApiGateway(ctx.stack, "api", {
    defaults: {
      function: {
        bind: [
          bus.bus,
          dynamo,
          GITHUB_CLIENT_ID,
          GITHUB_CLIENT_SECRET,
          PLAID_CLIENT_ID,
          PLAID_CLIENT_SECRET,
          PLAID_CLIENT_SECRET_SANDBOX,
          SLACK_CLIENT_ID,
          SLACK_CLIENT_SECRET,
          SLACK_SIGNING_SECRET,
        ],
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
      "GET /plaid/auth/callback": {
        type: "function",
        function: "backend/functions/plaid/auth.callback",
      },
      "GET /plaid/institutions": {
        type: "function",
        function: "backend/functions/plaid/auth.institutions",
      },
      "GET /plaid/sandboxPublicToken": {
        type: "function",
        function: "backend/functions/plaid/auth.sandboxPublicToken",
      },
      "GET /plaid/sandboxFireWebhook": {
        type: "function",
        function: "backend/functions/plaid/auth.sandboxFireWebhook",
      },
      "POST /plaid/webhook": {
        type: "function",
        function: "backend/functions/plaid/auth.hook",
      },
    },
  })

  api.bind([api])

  const auth = new Auth(ctx.stack, "auth", {
    authenticator: "backend/functions/auth.handler",
  })

  auth.attach(ctx.stack, { api })

  ctx.stack.addOutputs({
    API_URL: api.url,
  })

  return api
}
