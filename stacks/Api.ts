import {
  StackContext,
  use,
  Api as ApiGateway,
} from "@serverless-stack/resources";
import { Dynamo } from "./Dynamo";

export function Api(ctx: StackContext) {
  const dynamo = use(Dynamo);

  const api = new ApiGateway(ctx.stack, "api", {
    defaults: {
      function: {
        permissions: [dynamo.table],
        config: [dynamo.DYNAMO_TABLE],
      },
    },
    routes: {
      "POST /graphql": {
        type: "pothos",
        schema: "backend/functions/graphql/schema.ts",
        output: "graphql/schema.grapqhl",
        function: "functions/graphql/graphql.handler",
        commands: [
          "npx genql --output ./graphql/genql --schema ./graphql/schema.graphql --esm",
        ],
      },
    },
  });

  ctx.stack.addOutputs({
    API_URL: api.url,
  });

  return api;
}
