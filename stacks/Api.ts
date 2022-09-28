import {
  StackContext,
  use,
  Api as ApiGateway,
} from "@serverless-stack/resources";
import { Database } from "./Database";
import { Parameter } from "./Parameter";

export function Api(ctx: StackContext) {
  const rds = use(Database);
  const api = new ApiGateway(ctx.stack, "api", {
    defaults: {
      function: {
        permissions: [rds],
        environment: {
          RDS_SECRET_ARN: rds.secretArn,
          RDS_ARN: rds.clusterArn,
          RDS_DATABASE: rds.defaultDatabaseName,
        },
      },
    },
    routes: {
      "POST /graphql": {
        type: "pothos",
        function: {
          handler: "functions/graphql/graphql.handler",
        },
        schema: "backend/functions/graphql/schema.ts",
        output: "graphql/schema.graphql",
        commands: [
          "npx genql --output ./graphql/genql --schema ./graphql/schema.graphql --esm",
        ],
      },
    },
  });

  ctx.stack.addOutputs({
    API_URL: api.url,
  });

  //   Parameter.use(
  //     api.getFunction("POST /")!,
  //     new Parameter(ctx.stack, "SLACK_CLIENT_ID"),
  //     new Parameter(ctx.stack, "SLACK_CLIENT_SECRET")
  //   );

  return api;
}
