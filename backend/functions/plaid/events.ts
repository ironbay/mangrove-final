import { createHandler } from "@mangrove/core/bus";

export const handler = createHandler<"plaid.tx.available">(
  async (event, record) => {
    console.log(event);
  }
);
