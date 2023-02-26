import { Entity } from "electrodb"
import * as Dynamo from "@mangrove/core/dynamo"
import * as Github from "@mangrove/core/github"

const UserEntity = new Entity(
  {
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
      githubAccessToken: {
        type: "string",
        required: true,
      },
      githubID: {
        type: "string",
        required: true,
      },
      logoUrl: {
        type: "string",
        required: false,
      },
      name: {
        type: "string",
        required: false,
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
  },
  Dynamo.Service
)

export async function login(input: Github.Credentials) {
  const profile = await Github.profileFromToken(input.accessToken)
  const email = await Github.emailFromToken(input.accessToken)
}
