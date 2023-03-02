import * as Bus from "@mangrove/core/bus"

export const connected = Bus.subscribe("plaid.connected", async (evt) => {
  console.log(evt)
})
