import { StackContext, Table, Config } from "@serverless-stack/resources"

export function Dynamo(ctx: StackContext) {
  const table = new Table(ctx.stack, "table", {
    fields: {
      pk: "string",
      sk: "string",
      gsi1pk: "string",
      gsi1sk: "string",
      gsi2pk: "string",
      gsi2sk: "string",
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
      gsi3: {
        partitionKey: "gsi3pk",
        sortKey: "gsi3sk",
      },
      gsi4: {
        partitionKey: "gsi4pk",
        sortKey: "gsi4sk",
      },
    },
  })

  return {
    table,
    DYNAMO_TABLE: new Config.Parameter(ctx.stack, "DYNAMO_TABLE", {
      value: table.tableName,
    }),
  }
}
