import { createHandler } from "@mangrove/core/bus";
import { PlaidConnection } from "@mangrove/core/plaid/plaid";
import { Bus } from "@mangrove/core/bus";

export async function test(first: any, ...args: any) {
  await Bus.publish("plaid.tx.available", {
    connID: "plaid_123",
    num_transactions: 22,
  });
}

export const tx_available = createHandler<"plaid.tx.available">(
  async (event, record) => {
    await PlaidConnection.syncTX(event.properties.connID);
  }
);

export const tx_new = createHandler<"plaid.tx.new">(async (event, record) => {
  PlaidConnection.pipes();
});

// export const tx_available = createHandler<"plaid.tx.available">(
//   async (event, record) => {
//     console.log(event);
//     console.log(record);
//   }
// );
