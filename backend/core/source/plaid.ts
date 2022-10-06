import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";
import { Connection } from "../connection";
import { account } from "../connection/plaid";
import { Dynamo } from "../dynamo";

export const PlaidSourceEntity = new Entity(
  {
    model: {
      entity: "PlaidSource",
      version: "1",
      service: "mangrove",
    },
    attributes: {
      sourceID: {
        type: "string",
        require: true,
        readOnly: true,
      },
      connectionID: {
        type: "string",
        required: true,
        readOnly: false,
      },
      pipeID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      accountID: {
        type: "string",
        required: true,
        readOnly: false,
      },
      accountName: {
        type: "string",
        required: true,
        readOnly: false,
      },
      accountKind: {
        type: "string",
        required: true,
        readOnly: false,
      },
    },
    indexes: {
      source: {
        pk: {
          field: "pk",
          composite: ["sourceID"],
        },
      },
      byPipe: {
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["pipeID"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["sourceID"],
        },
      },
    },
  },
  Dynamo.Configuration
);

// a source is a
// plaid account
// plaid connection (item)
// a filter

export async function forPipe(pipeID: string) {
  const results = await PlaidSourceEntity.query.byPipe({ pipeID }).go();
  return results;
}

export async function fromID(sourceID: string) {
  const results;
}

export async function create(
  sources: {
    pipeID: string;
    connectionID: string;
    accountID: string;
    numberFilters: any;
  }[]
) {
  async function buildSource(source: {
    pipeID: string;
    connectionID: string;
    accountID: string;
  }) {
    const account = await Connection.Plaid.account(
      source.connectionID,
      source.accountID
    );
    const id = ulid();
    return {
      sourceID: id,
      pipeID: source.pipeID,
      connectionID: source.connectionID,
      accountID: source.accountID,
      accountKind: account.kind,
      accountName: account.name,
    };
  }

  const built = await Promise.all(
    sources.map(async source => buildSource(source))
  );

  await PlaidSourceEntity.put([...built]);
}

export type PlaidSourceEntityType = EntityItem<typeof PlaidSourceEntity>;
