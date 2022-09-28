import { EntityConfiguration, Service } from "electrodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
export const Client = new DynamoDBClient({});
import { Config } from "@serverless-stack/node/config";

const table = Config.DYNAMO_TABLE;

export const Configuration: EntityConfiguration = {
  table,
  client: Client,
};

export * as Dynamo from ".";
