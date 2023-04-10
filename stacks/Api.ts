import { Config, StackContext, use, Api as ApiGateway } from "sst/constructs"
import { Auth } from "sst/constructs/future"

import { Dynamo } from "./Dynamo"
import { Bus } from "./Bus"

export function Api(ctx: StackContext) {
  const dynamo = use(Dynamo)
  const bus = use(Bus)

  const secrets = Config.Secret.create(
    ctx.stack,
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
    "PLAID_CLIENT_ID",
    "PLAID_CLIENT_SECRET",
    "PLAID_CLIENT_SECRET_SANDBOX",
    "SLACK_CLIENT_ID",
    "SLACK_CLIENT_SECRET",
    "SLACK_SIGNING_SECRET"
  )

  const auth = new Auth(ctx.stack, "auth", {
    authenticator: {
      handler: "packages/backend/functions/auth.handler",
      bind: [
        secrets.GITHUB_CLIENT_ID,
        secrets.GITHUB_CLIENT_SECRET,
        secrets.SLACK_CLIENT_ID,
        secrets.SLACK_CLIENT_SECRET,
        dynamo,
      ],
    },
  })

  const api = new ApiGateway(ctx.stack, "api", {
    defaults: {
      function: {
        bind: [
          auth,
          bus.bus,
          dynamo,
          secrets.GITHUB_CLIENT_ID,
          secrets.GITHUB_CLIENT_SECRET,
          secrets.PLAID_CLIENT_ID,
          secrets.PLAID_CLIENT_SECRET,
          secrets.PLAID_CLIENT_SECRET_SANDBOX,
          secrets.SLACK_CLIENT_ID,
          secrets.SLACK_CLIENT_SECRET,
          secrets.SLACK_SIGNING_SECRET,
        ],
      },
    },
    routes: {
      "GET /{proxy+}": {
        type: "function",
        function: "packages/backend/functions/trpc.handler",
      },
      "POST /{proxy+}": {
        type: "function",
        function: "packages/backend/functions/trpc.handler",
      },
      "GET /slack/listChannels": {
        type: "function",
        function: "packages/backend/functions/slack/api.listChannels",
      },
      "GET /session/test": {
        type: "function",
        function: "packages/backend/functions/session/test.callback",
      },
      "GET /plaid/auth/callback": {
        type: "function",
        function: "packages/backend/functions/plaid/auth.callback",
      },
      "GET /plaid/institutions": {
        type: "function",
        function: "packages/backend/functions/plaid/auth.institutions",
      },
      "GET /plaid/sandboxPublicToken": {
        type: "function",
        function: "packages/backend/functions/plaid/auth.sandboxPublicToken",
      },
      "GET /plaid/sandboxFireWebhook": {
        type: "function",
        function: "packages/backend/functions/plaid/auth.sandboxFireWebhook",
      },
      "POST /plaid/webhook": {
        type: "function",
        function: "packages/backend/functions/plaid/auth.hook",
      },
    },
  })

  ctx.stack.addOutputs({
    API_URL: api.url,
    AUTH_URL: auth.url,
  })

  return api
}
