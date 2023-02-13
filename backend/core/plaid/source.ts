import { Entity } from "electrodb"

const PlaidSourceEntity = new Entity({
  model: {
    entity: "PlaidSource",
    version: "1",
    service: "mangrove",
  },
  attributes: {
    sourceID: {
      type: "string",
      required: true,
    },
    timesCreated: {
      type: "string",
      required: true,
    },
    plaidAccountID: {
      type: "string",
      required: true,
    },
    plaidItemID: {
      type: "string",
      required: true,
    },
    plaidInstID: {
      type: "string",
      required: true,
    },
    plaidInstName: {
      type: "string",
      required: true,
    },
    plaidInstColor: {
      type: "string",
      required: false,
    },
    pipeID: {
      type: "string",
      required: true,
    },
    filters: {
      type: "string",
    },
  },
  indexes: {
    primary: {
      pk: {
        field: "pk",
        composite: ["sourceID"],
      },
    },
    byPlaidAccountID: {
      pk: {
        field: "gsi1pk",
        composite: ["plaidAccountID"],
      },
      sk: {
        field: "gsi1sk",
        composite: ["sourceID"],
      },
    },
    byPipeID: {
      pk: {
        field: "gsi2pk",
        composite: ["pipeID"],
      },
      sk: { field: "gsi2sk", composite: ["sourceID", "plaidAccountID"] },
    },
  },
})
