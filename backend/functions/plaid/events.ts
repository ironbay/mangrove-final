import * as Bus from "@mangrove/core/bus"

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

  // plaid match, then emit an event and then have consumers for those (slack jut now)
})
