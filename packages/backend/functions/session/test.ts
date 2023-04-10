import { ApiHandler } from "sst/node/api"
import { useSession } from "sst/node/auth"

export const calback = ApiHandler(async () => {
  const session = useSession()
  return {
    body: JSON.stringify(session),
  }
})
