import Slack from "@mangrove/core/slack"
import { ApiHandler } from "sst/node/api"
import { parameter } from "sst/node/auth"

export const authFinish = ApiHandler(async (event) => {
  const parameters = event.queryStringParameters
})

export const listChannels = ApiHandler(async (event) => {
  return Slack.Connection.listChannels("xxz")
})
