import { initTRPC } from "@trpc/server"
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda"
import { z } from "zod"
import Slack from "@mangrove/core/slack"
import { useSession } from "sst/node/future/auth"
import { provideActor } from "@mangrove/core/actor"
import { ApiHandler } from "sst/node/api"

const t = initTRPC.create()

export const router = t.router({
  slackChannelsList: t.procedure
    .input(z.object({ slackTeamID: z.string() }))
    .query(async ({ input }) => {
      return await Slack.Connection.listChannels(input.slackTeamID)
    }),
})

const trpc = awsLambdaRequestHandler({
  router,
  createContext: async () => {
    const session = useSession()
    // setting manually now for console testing
    return provideActor({
      type: "user",
      properties: {
        userID: "user..123",
      },
    })
    // return provideActor(session)
  },
})

export const handler = ApiHandler((req, ctx) => {
  return trpc(req, ctx)
})
