import { StackContext, Table } from "@serverless-stack/resources";

export function Dynamo(ctx: StackContext) {
  const table = new Table(ctx.stack, "table", {
    fields: {
      pk: "string",
      sk: "string",
      gsi1pk: "string", 
      gsi1sk: "string", 
      gsi2pk: "string", 
      gsi1sk: "string", 
    },
    primaryIndex: {
      partitionKey: "pk",
      sortKey: "sk",
    },
    globalIndexes: {
      gsi1: {
        partitionKey: "gsi1pk",
        sortKey: "gsi1sk",
      },
      gsi2: {
        partitionKey: "gsi2pk",
        sortKey: "gsi2sk",
      },
    },
  });

  return {
    table, 
    DYNAMO_TABLE:
  }
}
