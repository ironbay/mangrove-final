import { Entity, EntityItem } from "electrodb";

export const PlaidSourceEntity = new Entity({
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
    instLogo: {
      type: "string",
      required: true,
      readOnly: false,
    },
    instName: {
      type: "string",
      required: true,
      readOnly: false,
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
    filterID: {
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
  },
});

export async function filter(_sourceID: string) {
  return {
    filterID: "filter123",
    op: "gt",
    kind: "number",
    value: 10,
  };
}

export type PlaidSourceEntityType = EntityItem<typeof PlaidSourceEntity>;

export * as PlaidSource from ".";
