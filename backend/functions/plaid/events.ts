import { createHandler } from "@mangrove/core/bus";
import { Plaid } from "@mangrove/core/plaid";
import { Bus } from "@mangrove/core/bus";
import { Pipe } from "@mangrove/core/pipe";

export async function test(first: any, ...args: any) {
  await Bus.publish("plaid.tx.available", {
    connID: "plaid_123",
    num_transactions: 22,
  });
}

export const tx_available = createHandler<"plaid.tx.available">(
  async (event, _record) => {
    await Plaid.Tx.sync(event.properties.connID);
  }
);

export const tx_new = createHandler<"plaid.tx.new">(async (event, record) => {
  console.log("i was called");
  //   const ran = await Pipe.run(event.properties);
  // run the pipes
  //   PlaidConnection.pipes();
});

// export const tx_available = createHandler<"plaid.tx.available">(
//   async (event, record) => {
//     console.log(event);
//     console.log(record);
//   }
// );
