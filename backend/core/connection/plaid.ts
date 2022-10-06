import { Configuration, PlaidApi, PlaidEnvironments, CountryCode } from "plaid";

import { ulid } from "ulid";

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
      instID: {
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
        required: false,
        readOnly: false,
      },
      instLogo: {
        type: "string",
        required: false,
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
          composite: [],
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
  name: string;
  color: string;
  logo: string;
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

export async function create(userID: string, publicToken: string) {
  const accessToken = await exchangeToken(publicToken);
  const {
    data: { item },
  } = await client.itemGet({ access_token: accessToken });

  const { instID, instName, instLogo, instColor } = await instFromID(
    item.institution_id!
  );

  const base = await PlaidConnectionEntity.create({
    connectionID: ulid(),
    itemID: item.data.item.item_id,
    userID,
    accessToken,
    instName,
    instID,
  }).go();

  if (instColor) await addInstColor(base.connectionID, instColor);
  if (instLogo) await addInstLogo(base.connectionID, instName);

  const [created] = await PlaidConnectionEntity.query
    .connection({
      connectionID: base.connectionID,
    })
    .go();

  return created;
}

async function exchangeToken(publicToken: string) {
  const resp = await client.itemPublicTokenExchange({
    public_token: publicToken,
  });

  return resp.data.access_token;
}

async function instFromID(instID: string) {
  const resp = await client.institutionsGetById({
    institution_id: instID,
    country_codes: [CountryCode.Us],
  });

  return {
    instID: resp.data.institution.institution_id,
    instName: resp.data.institution.name,
    instLogo: resp.data.institution.logo,
    instColor: resp.data.institution.primary_color,
  };
}

async function addInstColor(connectionID: string, instColor: string) {
  await PlaidConnectionEntity.update({ connectionID }).set({ instColor }).go();
}

async function addInstLogo(connectionID: string, instLogo: string) {
  await PlaidConnectionEntity.update({ connectionID }).set({ instLogo }).go();
}

export type PlaidConnectionEntityType = EntityItem<
  typeof PlaidConnectionEntity
>;

export * as Connection from ".";
