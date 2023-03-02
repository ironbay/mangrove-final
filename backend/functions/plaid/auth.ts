import { ApiHandler } from "sst/node/api"
import * as Plaid from "@mangrove/core/plaid/connection"

export const callback = ApiHandler(async (event) => {
  return {
    body: "<h1>I am callback</h1>",
  }
})

export const institutions = ApiHandler(async (event) => {
  const insts = await Plaid.listInstitutions()
  return {
    body: JSON.stringify(insts, null, 2),
  }
})

export const sandboxPublicToken = ApiHandler(async (event) => {
  const publicToken = await Plaid.sandboxCreatePublicToken("usr123")

  const created = await Plaid.connect({
    publicToken: publicToken.public_token,
    userID: "user123",
  })

  return {
    body: JSON.stringify(created!.userID),
  }
})
