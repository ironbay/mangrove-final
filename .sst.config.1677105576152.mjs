import { createRequire as topLevelCreateRequire } from 'module';const require = topLevelCreateRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// stacks/Dynamo.ts
import { Table } from "sst/constructs";
function Dynamo(ctx) {
  const table = new Table(ctx.stack, "table", {
    fields: {
      pk: "string",
      sk: "string",
      gsi1pk: "string",
      gsi1sk: "string",
      gsi2pk: "string",
      gsi2sk: "string",
      gsi3pk: "string",
      gsi3sk: "string",
      gsi4pk: "string",
      gsi4sk: "string",
      gsi5pk: "string",
      gsi5sk: "string"
    },
    primaryIndex: {
      partitionKey: "pk",
      sortKey: "sk"
    },
    globalIndexes: {
      gsi1: {
        partitionKey: "gsi1pk",
        sortKey: "gsi1sk"
      },
      gsi2: {
        partitionKey: "gsi2pk",
        sortKey: "gsi2sk"
      },
      gsi3: {
        partitionKey: "gsi3pk",
        sortKey: "gsi3sk"
      },
      gsi4: {
        partitionKey: "gsi4pk",
        sortKey: "gsi4sk"
      },
      gsi5: {
        partitionKey: "gsi5pk",
        sortKey: "gsi5sk"
      }
    }
  });
  return table;
}
__name(Dynamo, "Dynamo");

// stacks/Bus.ts
import {
  EventBus,
  Function,
  Queue,
  Config as Config2
} from "sst/constructs";
function Bus(ctx) {
  const eventBus = new EventBus(ctx.stack, "Bus");
  const BUS_NAME = new Config2.Parameter(ctx.stack, "BUS_NAME", {
    value: eventBus.eventBusName
  });
  new Function(ctx.stack, "tesfunction", {
    handler: "backend/functions/plaid/events.test",
    permissions: [eventBus],
    environment: {
      BUS_NAME: eventBus.eventBusName
    }
  });
  function subscribe(opts) {
    const func = Function.fromDefinition(
      ctx.stack,
      opts.id + "Function",
      opts.function
    );
    eventBus.addRules(ctx.stack, {
      [`${opts.id}Rule`]: {
        pattern: {
          detailType: opts.types,
          source: ["mangrove"]
        },
        targets: {
          queue: new Queue(ctx.stack, `${opts.id}Queue`, {
            consumer: {
              function: func,
              cdk: {
                eventSource: {
                  batchSize: 1
                }
              }
            }
          })
        }
      }
    });
  }
  __name(subscribe, "subscribe");
}
__name(Bus, "Bus");

// stacks/Api.ts
import { use as use2, Api as ApiGateway } from "sst/constructs";
function Api(ctx) {
  const dynamo = use2(Dynamo);
  const api = new ApiGateway(ctx.stack, "api", {
    defaults: {
      function: {
        bind: [dynamo]
      }
    },
    routes: {
      "POST /graphql": {
        type: "graphql",
        function: "backend/functions/graphql/graphql.handler",
        pothos: {
          schema: "backend/functions/graphql/schema.ts",
          output: "graphql/schema.graphql",
          commands: [
            "cd graphql && pnpm genql --output ./genql --schema ./schema.graphql --esm"
          ]
        }
      }
    }
  });
  ctx.stack.addOutputs({
    API_URL: api.url
  });
  return api;
}
__name(Api, "Api");

// stacks/Web.ts
import { use as use3, StaticSite } from "sst/constructs";
function Web({ stack }) {
  const api = use3(Api);
  const _site = new StaticSite(stack, "web", {
    path: "web",
    buildCommand: "pnpm run build",
    buildOutput: "dist",
    environment: {
      VITE_GRAPHQL_URL: api.url + "/graphql"
    },
    vite: {
      types: "types/web.d.ts"
    }
  });
}
__name(Web, "Web");

// sst.config.ts
var sst_config_default = {
  config(input) {
    const profile = {
      dev: "ironbay-dev",
      production: "ironbay-production"
    };
    return {
      name: "mangrove",
      region: "us-east-1",
      profile: profile[input.stage || ""] || profile.dev
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: "nodejs16.x",
      architecture: "arm_64",
      nodejs: {
        format: "esm",
        esbuild: {
          keepNames: true
        }
      }
    });
    app.stack(Dynamo).stack(Bus).stack(Api).stack(Web);
  }
};
export {
  sst_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RhY2tzL0R5bmFtby50cyIsICJzdGFja3MvQnVzLnRzIiwgInN0YWNrcy9BcGkudHMiLCAic3RhY2tzL1dlYi50cyIsICJzc3QuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBTdGFja0NvbnRleHQsIFRhYmxlLCBDb25maWcgfSBmcm9tIFwic3N0L2NvbnN0cnVjdHNcIlxuXG5leHBvcnQgZnVuY3Rpb24gRHluYW1vKGN0eDogU3RhY2tDb250ZXh0KSB7XG4gIGNvbnN0IHRhYmxlID0gbmV3IFRhYmxlKGN0eC5zdGFjaywgXCJ0YWJsZVwiLCB7XG4gICAgZmllbGRzOiB7XG4gICAgICBwazogXCJzdHJpbmdcIixcbiAgICAgIHNrOiBcInN0cmluZ1wiLFxuICAgICAgZ3NpMXBrOiBcInN0cmluZ1wiLFxuICAgICAgZ3NpMXNrOiBcInN0cmluZ1wiLFxuICAgICAgZ3NpMnBrOiBcInN0cmluZ1wiLFxuICAgICAgZ3NpMnNrOiBcInN0cmluZ1wiLFxuICAgICAgZ3NpM3BrOiBcInN0cmluZ1wiLFxuICAgICAgZ3NpM3NrOiBcInN0cmluZ1wiLFxuICAgICAgZ3NpNHBrOiBcInN0cmluZ1wiLFxuICAgICAgZ3NpNHNrOiBcInN0cmluZ1wiLFxuICAgICAgZ3NpNXBrOiBcInN0cmluZ1wiLFxuICAgICAgZ3NpNXNrOiBcInN0cmluZ1wiLFxuICAgIH0sXG4gICAgcHJpbWFyeUluZGV4OiB7XG4gICAgICBwYXJ0aXRpb25LZXk6IFwicGtcIixcbiAgICAgIHNvcnRLZXk6IFwic2tcIixcbiAgICB9LFxuICAgIGdsb2JhbEluZGV4ZXM6IHtcbiAgICAgIGdzaTE6IHtcbiAgICAgICAgcGFydGl0aW9uS2V5OiBcImdzaTFwa1wiLFxuICAgICAgICBzb3J0S2V5OiBcImdzaTFza1wiLFxuICAgICAgfSxcbiAgICAgIGdzaTI6IHtcbiAgICAgICAgcGFydGl0aW9uS2V5OiBcImdzaTJwa1wiLFxuICAgICAgICBzb3J0S2V5OiBcImdzaTJza1wiLFxuICAgICAgfSxcbiAgICAgIGdzaTM6IHtcbiAgICAgICAgcGFydGl0aW9uS2V5OiBcImdzaTNwa1wiLFxuICAgICAgICBzb3J0S2V5OiBcImdzaTNza1wiLFxuICAgICAgfSxcbiAgICAgIGdzaTQ6IHtcbiAgICAgICAgcGFydGl0aW9uS2V5OiBcImdzaTRwa1wiLFxuICAgICAgICBzb3J0S2V5OiBcImdzaTRza1wiLFxuICAgICAgfSxcbiAgICAgIGdzaTU6IHtcbiAgICAgICAgcGFydGl0aW9uS2V5OiBcImdzaTVwa1wiLFxuICAgICAgICBzb3J0S2V5OiBcImdzaTVza1wiLFxuICAgICAgfSxcbiAgICB9LFxuICB9KVxuXG4gIHJldHVybiB0YWJsZVxufVxuIiwgImltcG9ydCB7XG4gIEV2ZW50QnVzLFxuICBGdW5jdGlvbkRlZmluaXRpb24sXG4gIFN0YWNrQ29udGV4dCxcbiAgRnVuY3Rpb24sXG4gIFF1ZXVlLFxuICB1c2UsXG4gIENvbmZpZyxcbn0gZnJvbSBcInNzdC9jb25zdHJ1Y3RzXCJcblxuZXhwb3J0IGZ1bmN0aW9uIEJ1cyhjdHg6IFN0YWNrQ29udGV4dCkge1xuICBjb25zdCBldmVudEJ1cyA9IG5ldyBFdmVudEJ1cyhjdHguc3RhY2ssIFwiQnVzXCIpXG4gIGNvbnN0IEJVU19OQU1FID0gbmV3IENvbmZpZy5QYXJhbWV0ZXIoY3R4LnN0YWNrLCBcIkJVU19OQU1FXCIsIHtcbiAgICB2YWx1ZTogZXZlbnRCdXMuZXZlbnRCdXNOYW1lLFxuICB9KVxuXG4gIG5ldyBGdW5jdGlvbihjdHguc3RhY2ssIFwidGVzZnVuY3Rpb25cIiwge1xuICAgIGhhbmRsZXI6IFwiYmFja2VuZC9mdW5jdGlvbnMvcGxhaWQvZXZlbnRzLnRlc3RcIixcbiAgICBwZXJtaXNzaW9uczogW2V2ZW50QnVzXSxcbiAgICBlbnZpcm9ubWVudDoge1xuICAgICAgQlVTX05BTUU6IGV2ZW50QnVzLmV2ZW50QnVzTmFtZSxcbiAgICB9LFxuICB9KVxuXG4gIHR5cGUgU3Vic2NyaWJlT3B0cyA9IHtcbiAgICBpZDogc3RyaW5nXG4gICAgZnVuY3Rpb246IEZ1bmN0aW9uRGVmaW5pdGlvblxuICAgIHR5cGVzPzogc3RyaW5nW11cbiAgfVxuXG4gIGZ1bmN0aW9uIHN1YnNjcmliZShvcHRzOiBTdWJzY3JpYmVPcHRzKSB7XG4gICAgY29uc3QgZnVuYyA9IEZ1bmN0aW9uLmZyb21EZWZpbml0aW9uKFxuICAgICAgY3R4LnN0YWNrLFxuICAgICAgb3B0cy5pZCArIFwiRnVuY3Rpb25cIixcbiAgICAgIG9wdHMuZnVuY3Rpb25cbiAgICApXG5cbiAgICBldmVudEJ1cy5hZGRSdWxlcyhjdHguc3RhY2ssIHtcbiAgICAgIFtgJHtvcHRzLmlkfVJ1bGVgXToge1xuICAgICAgICBwYXR0ZXJuOiB7XG4gICAgICAgICAgZGV0YWlsVHlwZTogb3B0cy50eXBlcyxcbiAgICAgICAgICBzb3VyY2U6IFtcIm1hbmdyb3ZlXCJdLFxuICAgICAgICB9LFxuICAgICAgICB0YXJnZXRzOiB7XG4gICAgICAgICAgcXVldWU6IG5ldyBRdWV1ZShjdHguc3RhY2ssIGAke29wdHMuaWR9UXVldWVgLCB7XG4gICAgICAgICAgICBjb25zdW1lcjoge1xuICAgICAgICAgICAgICBmdW5jdGlvbjogZnVuYyxcbiAgICAgICAgICAgICAgY2RrOiB7XG4gICAgICAgICAgICAgICAgZXZlbnRTb3VyY2U6IHtcbiAgICAgICAgICAgICAgICAgIGJhdGNoU2l6ZTogMSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxuXG4gIC8vICAgc3Vic2NyaWJlKHtcbiAgLy8gICAgIGlkOiBcIlBsYWlkVHhBdmFpbGFibGVcIixcbiAgLy8gICAgIHR5cGVzOiBbXCJwbGFpZC50eC5hdmFpbGFibGVcIl0sXG4gIC8vICAgICBmdW5jdGlvbjoge1xuICAvLyAgICAgICBoYW5kbGVyOiBcImZ1bmN0aW9ucy9wbGFpZC9ldmVudHMudHhfYXZhaWxhYmxlXCIsXG4gIC8vICAgICAgIHBlcm1pc3Npb25zOiBbZXZlbnRCdXMsIGRhdGFiYXNlXSxcbiAgLy8gICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgLy8gICAgICAgICBCVVNfTkFNRTogZXZlbnRCdXMuZXZlbnRCdXNOYW1lLFxuICAvLyAgICAgICB9LFxuICAvLyAgICAgfSxcbiAgLy8gICB9KTtcblxuICAvLyAgIHN1YnNjcmliZSh7XG4gIC8vICAgICBpZDogXCJQbGFpZFR4TmV3XCIsXG4gIC8vICAgICB0eXBlczogW1wicGxhaWQudHgubmV3XCJdLFxuICAvLyAgICAgZnVuY3Rpb246IHtcbiAgLy8gICAgICAgaGFuZGxlcjogXCJmdW5jdGlvbnMvcGxhaWQvZXZlbnRzLnR4X25ld1wiLFxuICAvLyAgICAgICBwZXJtaXNzaW9uczogW2V2ZW50QnVzLCBkYXRhYmFzZV0sXG4gIC8vICAgICB9LFxuICAvLyAgIH0pO1xufVxuIiwgImltcG9ydCB7IFN0YWNrQ29udGV4dCwgdXNlLCBBcGkgYXMgQXBpR2F0ZXdheSB9IGZyb20gXCJzc3QvY29uc3RydWN0c1wiXG5pbXBvcnQgeyBEeW5hbW8gfSBmcm9tIFwiLi9EeW5hbW9cIlxuXG5leHBvcnQgZnVuY3Rpb24gQXBpKGN0eDogU3RhY2tDb250ZXh0KSB7XG4gIGNvbnN0IGR5bmFtbyA9IHVzZShEeW5hbW8pXG5cbiAgY29uc3QgYXBpID0gbmV3IEFwaUdhdGV3YXkoY3R4LnN0YWNrLCBcImFwaVwiLCB7XG4gICAgZGVmYXVsdHM6IHtcbiAgICAgIGZ1bmN0aW9uOiB7XG4gICAgICAgIGJpbmQ6IFtkeW5hbW9dLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJvdXRlczoge1xuICAgICAgXCJQT1NUIC9ncmFwaHFsXCI6IHtcbiAgICAgICAgdHlwZTogXCJncmFwaHFsXCIsXG4gICAgICAgIGZ1bmN0aW9uOiBcImJhY2tlbmQvZnVuY3Rpb25zL2dyYXBocWwvZ3JhcGhxbC5oYW5kbGVyXCIsXG4gICAgICAgIHBvdGhvczoge1xuICAgICAgICAgIHNjaGVtYTogXCJiYWNrZW5kL2Z1bmN0aW9ucy9ncmFwaHFsL3NjaGVtYS50c1wiLFxuICAgICAgICAgIG91dHB1dDogXCJncmFwaHFsL3NjaGVtYS5ncmFwaHFsXCIsXG4gICAgICAgICAgY29tbWFuZHM6IFtcbiAgICAgICAgICAgIFwiY2QgZ3JhcGhxbCAmJiBwbnBtIGdlbnFsIC0tb3V0cHV0IC4vZ2VucWwgLS1zY2hlbWEgLi9zY2hlbWEuZ3JhcGhxbCAtLWVzbVwiLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0pXG5cbiAgY3R4LnN0YWNrLmFkZE91dHB1dHMoe1xuICAgIEFQSV9VUkw6IGFwaS51cmwsXG4gIH0pXG5cbiAgcmV0dXJuIGFwaVxufVxuIiwgImltcG9ydCB7IFN0YWNrQ29udGV4dCwgdXNlLCBTdGF0aWNTaXRlIH0gZnJvbSBcInNzdC9jb25zdHJ1Y3RzXCJcbmltcG9ydCB7IEFwaSB9IGZyb20gXCIuL0FwaVwiXG5cbmV4cG9ydCBmdW5jdGlvbiBXZWIoeyBzdGFjayB9OiBTdGFja0NvbnRleHQpIHtcbiAgY29uc3QgYXBpID0gdXNlKEFwaSlcblxuICBjb25zdCBfc2l0ZSA9IG5ldyBTdGF0aWNTaXRlKHN0YWNrLCBcIndlYlwiLCB7XG4gICAgcGF0aDogXCJ3ZWJcIixcbiAgICBidWlsZENvbW1hbmQ6IFwicG5wbSBydW4gYnVpbGRcIixcbiAgICBidWlsZE91dHB1dDogXCJkaXN0XCIsXG4gICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgIFZJVEVfR1JBUEhRTF9VUkw6IGFwaS51cmwgKyBcIi9ncmFwaHFsXCIsXG4gICAgfSxcbiAgICB2aXRlOiB7XG4gICAgICB0eXBlczogXCJ0eXBlcy93ZWIuZC50c1wiLFxuICAgIH0sXG4gIH0pXG59XG4iLCAiaW1wb3J0IHsgU1NUQ29uZmlnIH0gZnJvbSBcInNzdFwiXG5cbmltcG9ydCB7IER5bmFtbyB9IGZyb20gXCIuL3N0YWNrcy9EeW5hbW9cIlxuaW1wb3J0IHsgQnVzIH0gZnJvbSBcIi4vc3RhY2tzL0J1c1wiXG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwiLi9zdGFja3MvQXBpXCJcbmltcG9ydCB7IFdlYiB9IGZyb20gXCIuL3N0YWNrcy9XZWJcIlxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZyhpbnB1dCkge1xuICAgIGNvbnN0IHByb2ZpbGUgPSB7XG4gICAgICBkZXY6IFwiaXJvbmJheS1kZXZcIixcbiAgICAgIHByb2R1Y3Rpb246IFwiaXJvbmJheS1wcm9kdWN0aW9uXCIsXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IFwibWFuZ3JvdmVcIixcbiAgICAgIHJlZ2lvbjogXCJ1cy1lYXN0LTFcIixcbiAgICAgIHByb2ZpbGU6IHByb2ZpbGVbaW5wdXQuc3RhZ2UgfHwgXCJcIl0gfHwgcHJvZmlsZS5kZXYsXG4gICAgfVxuICB9LFxuICBzdGFja3MoYXBwKSB7XG4gICAgYXBwLnNldERlZmF1bHRGdW5jdGlvblByb3BzKHtcbiAgICAgIHJ1bnRpbWU6IFwibm9kZWpzMTYueFwiLFxuICAgICAgYXJjaGl0ZWN0dXJlOiBcImFybV82NFwiLFxuICAgICAgbm9kZWpzOiB7XG4gICAgICAgIGZvcm1hdDogXCJlc21cIixcbiAgICAgICAgZXNidWlsZDoge1xuICAgICAgICAgIGtlZXBOYW1lczogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIGFwcC5zdGFjayhEeW5hbW8pLnN0YWNrKEJ1cykuc3RhY2soQXBpKS5zdGFjayhXZWIpXG4gIH0sXG59IHNhdGlzZmllcyBTU1RDb25maWdcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7O0FBQUEsU0FBdUIsYUFBcUI7QUFFckMsU0FBUyxPQUFPLEtBQW1CO0FBQ3hDLFFBQU0sUUFBUSxJQUFJLE1BQU0sSUFBSSxPQUFPLFNBQVM7QUFBQSxJQUMxQyxRQUFRO0FBQUEsTUFDTixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixRQUFRO0FBQUEs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
