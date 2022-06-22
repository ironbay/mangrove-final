import { createHandler } from "@mangrove/core/bus";
import { PlaidConnection } from "@mangrove/core/connection/plaid";
import { Bus } from "@mangrove/core/bus";

export async function test(first: any, ...args: any) {
  console.log("me?");
  await Bus.publish("plaid.tx.available", { id: "123", num_transactions: 22 });
}

export const tx_available = createHandler<"plaid.tx.available">(
  async (event, record) => {
    await PlaidConnection.sync("bingoboy!");
  }
);

export const tx_new = createHandler<"plaid.tx.new">(async (event, record) => {
  console.log("ok?");
  PlaidConnection.pipes();
});

// export const tx_available = createHandler<"plaid.tx.available">(
//   async (event, record) => {
//     console.log(event);
//     console.log(record);
//   }
// );
