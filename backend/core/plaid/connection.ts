import { Configuration, PlaidApi, PlaidEnvironments, AccountBase } from "plaid";
import { SQL } from "@mangrove/core/sql";

import { Entity, EntityItem } from "electrodb";
import { Dynamo } from "../dynamo";

export const PlaidConnectionEntity = new Entity(
  {
    model: {
      entity: "PlaidConnection",
      version: "1",
      service: "mangrove",
    },
    attributes: {
      connectionID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      itemID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      userID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      accessToken: {
        type: "string",
        required: true,
        readOnly: true,
      },
      instName: {
        type: "string",
        required: true,
        readOnly: false,
      },
      instColor: {
        type: "string",
        required: true,
        readOnly: false,
      },
      instLogo: {
        type: "string",
        required: true,
        readOnly: false,
      },
    },
    indexes: {
      connection: {
        pk: {
          field: "pk",
          composite: ["connectionID"],
        },
        sk: {
          field: "sk",
          composite: [""],
        },
      },
      user: {
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["userID"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["connectionID"],
        },
      },
    },
  },
  Dynamo.Configuration
);

export interface Account {
  type: "plaidAccount";
  id: string;
  name: string;
  kind: string;
  subkind: string;
}

export interface Institution {
  id: string;
  name: string;
  color: string;
  logo: string;
}

export type PlaidConnection = {
  id: string;
  userID: string;
  accessToken: string;
  institution: {
    name: string;
    color: string;
    logo: string;
  };
};

const configuration = new Configuration({
  basePath: PlaidEnvironments.production,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": "xxx_client_id",
      "PLAID-SECRET": "xxx_plaid_secret",
    },
  },
});

const client = new PlaidApi(configuration);

async function fromID(connectionID: string) {
  const [result] = await PlaidConnectionEntity.query
    .connection({ connectionID })
    .go();
  return result;
}

export async function forUser(userID: string) {
  return PlaidConnectionEntity.query.user({ userID }).go();
}

export async function accounts(connectionID: string) {
  const connection = await fromID(connectionID);
  const resp = await client.accountsGet({
    access_token: connection.accessToken,
  });

  return resp.data.accounts;
}

export type PlaidConnectionEntityType = EntityItem<
  typeof PlaidConnectionEntity
>;

export * as Connection from ".";
