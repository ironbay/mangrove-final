import * as Bus from "@mangrove/core/bus"

export const connected = Bus.subscribe("plaid.connected", async (evt) => {
  // possible resync here
  console.log("fired!!!")
  console.log(evt)
})
