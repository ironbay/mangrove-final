import { Entity } from "electrodb"

const UserEntity = new Entity({
  model: {
    entity: "User",
    version: "1",
    service: "mangrove",
  },
  attributes: {
    userID: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
  },
  indexes: {
    primary: {
      pk: {
        field: "pk",
        composite: ["userID"],
      },
    },
    userLookup: {
      pk: {
        field: "gsi3pk",
        composite: ["userID"],
      },
      sk: {
        field: "gsi3sk",
        composite: ["userID"],
      },
    },
  },
})
