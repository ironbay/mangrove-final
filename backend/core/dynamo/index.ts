import { EntityConfiguration, Service } from "electrodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
export const Client = new DynamoDBClient({});

import {
  PipeEntity,
  NumberFilterEntity,
  TextFilterEntity,
  TextContainsFilterEntity,
  SourceEntity,
} from "@mangrove/core/pipe";

const table = "xxx";

export const Configuration: EntityConfiguration = {
  table,
  client: Client,
};

export const MangroveService = new Service(
  {
    pipe: PipeEntity,
    numberFilter: NumberFilterEntity,
    textFilter: TextFilterEntity,
    textFilterContains: TextContainsFilterEntity,
    source: SourceEntity,
  },
  { client: Client, table }
);

export * as Dynamo from ".";
