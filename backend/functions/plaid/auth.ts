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
  const userID = "efb9cc5d-b910-4b93-a1b4-8d166cd98c7b"
  const publicToken = await Plaid.sandboxCreatePublicToken(userID)

  const created = await Plaid.connect({
    publicToken: publicToken.public_token,
    userID,
  })

  return {
    body: JSON.stringify(created!.userID),
  }
})

export const sandboxFireWebhook = ApiHandler(async (event) => {
  const userID = "efb9cc5d-b910-4b93-a1b4-8d166cd98c7b"
  const connection = await Plaid.byUserID(userID)

  const fired = await Plaid.sandboxFireWebhook({
    accessToken: connection?.accessToken!,
  }).catch((e) => e)

  return {
    body: "ok",
  }
})

export const hook = ApiHandler(async (event) => {
  Plaid.incomingWebhook(JSON.parse(event.body!))

  return {
    statusCode: 200,
  }
})
