import { EntityConfiguration, Service } from "electrodb"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
export const Client = new DynamoDBClient({})
import { Table } from "sst/node/table"

import { PipeEntity } from "../pipe"
import { SlackTargetEntity } from "../slack/target"
import { PlaidSourceEntity } from "../plaid/source"

export const Config: EntityConfiguration = {
  table: Table.table.tableName,
  client: Client,
}

export const Mangrove = new Service(
  {
    pipe: PipeEntity,
    slackTarget: SlackTargetEntity,
    plaidSource: PlaidSourceEntity,
  },
  Config
)

export * as Dynamo from "."
