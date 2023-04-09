import { initTRPC } from "@trpc/server"
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda"
import { z } from "zod"
import Slack from "@mangrove/core/slack"
import { useSession } from "sst/node/auth"

const t = initTRPC.create()

export const router = t.router({
  slackChannelsList: t.procedure
    .input(z.object({ slackTeamID: z.string() }))
    .query(async ({ input }) => {
      await Slack.Connection.listChannels(input.slackTeamID)
    }),
})

const trpc = awsLambdaRequestHandler({
  router,
  createContext: async () => {
    const session = useSession()
  },
})
