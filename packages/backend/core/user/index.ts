import { Entity } from "electrodb"
import * as Dynamo from "@mangrove/core/dynamo"
import { Octokit } from "@octokit/rest"
import { ulid } from "ulid"

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
      byEmail: {
        index: "gsi4",
        pk: {
          field: "gsi4pk",
          composite: ["email"],
        },
        sk: {
          field: "gsi4sk",
          composite: [],
        },
      },
    },
  },
  Dynamo.Config
)

export async function githubLogin(accessToken: string) {
  const octo = new Octokit({
    auth: accessToken,
  })
  const emails = await octo.request("GET /user/emails")
  const primaryEmail = emails.data.find((email) => email.primary)?.email
  if (!primaryEmail) throw new Error("No email found")
  const existingUser = await byEmail(primaryEmail)
  if (existingUser) {
    return existingUser
  }

  const id = ulid()

  const currentUser = await octo.users.getAuthenticated()

  const created = await UserEntity.create({
    userID: id,
    email: primaryEmail,
    logoUrl: currentUser.data.avatar_url,
    name: currentUser.data.name || undefined,
  }).go()

  return created
}

export async function byEmail(email: string) {
  const resp = await UserEntity.query.byEmail({ email }).go()
  if (!resp.data.length) return null
  return resp.data.at(0)
}
