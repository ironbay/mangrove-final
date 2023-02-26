import { EntityConfiguration } from "electrodb"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
export const Client = new DynamoDBClient({})
import { Table } from "sst/node/table"

export const Service: EntityConfiguration = {
  table: Table.table.tableName,
  client: Client,
}

export * as Dynamo from "."
