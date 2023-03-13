import * as Bus from "@mangrove/core/bus"
import * as Source from "@mangrove/core/plaid/source"

export const connectionCreated = Bus.subscribe(
  "plaid.connection.created",
  async (evt) => {
    console.log("user created", evt.userID)
  }
)

export const txAvailable = Bus.subscribe(
  "plaid.tx.available",
  async (evt) => {}
)

export const txNew = Bus.subscribe("plaid.tx.new", async (evt) => {
  console.log("New Tx...", evt)
  await Source.matchSources(evt)
})
