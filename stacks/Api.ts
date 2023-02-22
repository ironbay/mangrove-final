import { StackContext, use, Api as ApiGateway } from "sst/constructs"
import { Dynamo } from "./Dynamo"

export function Api(ctx: StackContext) {
  const dynamo = use(Dynamo)

  const api = new ApiGateway(ctx.stack, "api", {
    defaults: {
      function: {
        bind: [dynamo],
      },
    },
    routes: {
      "POST /graphql": {
        type: "graphql",
        function: "backend/functions/graphql/graphql.handler",
        pothos: {
          schema: "backend/functions/graphql/schema.ts",
          output: "graphl/schema.graphql",
          commands: [
            "./npx genql --output ./graphql/genql --schema ./graphql/schema.graphl --esm",
          ],
        },
      },
    },
  })

  ctx.stack.addOutputs({
    API_URL: api.url,
  })

  return api
}
