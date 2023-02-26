import { Entity } from "electrodb"
import * as Dynamo from "@mangrove/core/dynamo"
import * as Github from "@mangrove/core/github"
import crypto from "crypto"

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
        sk: {
          field: "sk",
          composite: [],
        },
      },
      byGithubID: {
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["githubID"],
        },
        sk: {
          field: "gsi1sk",
          composite: [],
        },
      },
      userLookup: {
        index: "gsi3",
        pk: {
          field: "gsi3pk",
          composite: ["userID"],
        },
        sk: {
          field: "gsi3sk",
          composite: [],
        },
      },
    },
  },
  Dynamo.Service
)

export async function login(input: Github.Credentials) {
  const profile = await Github.profileFromToken(input.accessToken)
  const email = await Github.emailFromToken(input.accessToken)
  const githubID = profile.id.toString()

  const existing = await UserEntity.query
    .byGithubID({
      githubID,
    })
    .go()

  if (!existing.data.at(0)) {
    const user = await UserEntity.create({
      userID: crypto.randomUUID(),
      email,
      githubID,
      githubAccessToken: input.accessToken,
      logoUrl: profile.avatar_url,
    }).go()

    return user.data
  }

  const updateResult = await UserEntity.update({
    userID: existing.data[0].userID,
  })
    .set({
      githubAccessToken: input.accessToken,
      logoUrl: profile.avatar_url,
    })
    .go({ response: "all_new" })

  return updateResult.data!
}
