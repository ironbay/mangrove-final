import { Entity } from "electrodb"

const PlaidConnectionEntity = new Entity({
  model: {
    entity: "PlaidConnection",
    version: "1",
    service: "mangrove",
  },
  attributes: {
    connectionID: {
      type: "string",
      required: true,
    },
    plaidItemID: {
      type: "string",
      required: true,
    },
    plaidTransactionCursor: {
      type: "string",
      required: false,
    },
    timeCreated: {
      type: "string",
      required: true,
    },
    accessToken: {
      type: "string",
      required: true,
    },
    userID: {
      type: "string",
      required: true,
    },
    institutionID: {
      type: "string",
      required: true,
    },
    institutionName: {
      type: "string",
      required: true,
    },
    institutionColor: {
      type: "string",
      required: false,
    },
  },
  indexes: {
    primary: {
      pk: {
        field: "pk",
        composite: ["connectionID"],
      },
      sk: {
        field: "sk",
        composite: ["timeCreated"],
      },
    },
    byPlaidItemID: {
      pk: {
        field: "gsi4pk",
        composite: ["plaidItemID"],
      },
      sk: {
        field: "gsi4sk",
        composite: ["plaidConnectionID"],
      },
    },
  },
})
