import { Entity } from "electrodb"

const SlackConnectionEntity = new Entity({
  model: {
    entity: "SlackConnection",
    version: "1",
    service: "mangrove",
  },
  attributes: {
    connectionID: {
      type: "string",
      required: true,
    },
    timesCreated: {
      type: "string",
      required: true,
    },
    userID: {
      type: "string",
      required: true,
    },
    accessToken: {
      type: "string",
      required: true,
    },
    refreshToken: {
      type: "string",
      required: true,
    },
    slackTeamID: {
      type: "string",
      required: true,
    },
    slackTeamName: {
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
        composite: [],
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
    slackConnectionLookup: {
      pk: {
        field: "gsi5pk",
        composite: ["slackConnectionID"],
      },
      sk: {
        field: "gsi5sk",
        composite: [],
      },
    },
  },
})
