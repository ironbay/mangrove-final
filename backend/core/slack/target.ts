import { Entity } from "electrodb"

const SlackTargetEntity = new Entity({
  model: {
    entity: "SlackTarget",
    version: "1",
    service: "mangrove",
  },
  attributes: {
    targetID: {
      type: "string",
      required: true,
    },
    userID: {
      type: "string",
      required: true,
    },
    pipeID: {
      type: "string",
      required: true,
    },
    slackConnectionID: {
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
    slackTeamLogo: {
      type: "string",
      required: true,
    },
    slackChannelID: {
      type: "string",
      required: true,
    },
    slackChannelName: {
      type: "string",
      required: true,
    },
    refreshToken: {
      type: "string",
      required: true,
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
        composite: ["targetID"],
      },
    },
    byPipeID: {
      pk: {
        field: "gsi2pk",
        composite: ["pipeID"],
      },
      sk: {
        field: "gsi2sk",
        composite: ["targetID"],
      },
    },
    bySlackConnectionID: {
      pk: {
        field: "gsi5pk",
        composite: ["slackConnectionID"],
      },
      sk: {
        field: "gsi5sk",
        composite: ["targetID"],
      },
    },
  },
})
