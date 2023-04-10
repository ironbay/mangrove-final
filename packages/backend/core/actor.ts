import { z } from "zod"
import { Context } from "sst/context"

const PublicActor = z.object({
  type: z.literal("public"),
  properties: z.object({}),
})

type PublicActor = z.infer<typeof PublicActor>

const UserActor = z.object({
  type: z.literal("user"),
  properties: z.object({
    userID: z.string(),
  }),
})

type UserActor = z.infer<typeof UserActor>

const Actor = z.discriminatedUnion("type", [PublicActor, UserActor])
type Actor = z.infer<typeof Actor>

const ActorContext = Context.create<Actor>()
export const provideActor = ActorContext.provide
export const useActor = ActorContext.use

export function assertUser() {
  const actor = useActor()
  if (actor.type !== "user") {
    throw new Error("Expected User Context")
  }

  return actor
}
