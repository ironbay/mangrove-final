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
    userID: {
      type: "string",
      required: true,
    },
    timesCreated: {
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
    accessToken: {
      type: "string",
      required: true,
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
        composite: ["timesCreated"],
      },
    },
    byUserID: {
      pk: {
        field: "gsi3pk",
        composite: ["userID"],
      },
      sk: {
        field: "gsi3sk",
        composite: ["connectionID"],
      },
    },
    byPlaidItemID: {
      pk: {
        field: "gsi4pk",
        composite: ["plaidItemID"],
      },
      sk: {
        field: "gsi4sk",
        composite: ["connectionID"],
      },
    },
  },
})
