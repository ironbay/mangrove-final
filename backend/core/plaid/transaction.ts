import { Entity } from "electrodb"

const PlaidTransactionEntity = new Entity({
  model: {
    entity: "PlaidTransactionEntity",
    version: "1",
    service: "mangrove",
  },
  attributes: {
    transactionID: {
      type: "string",
      required: true,
    },
  },
  indexes: {
    primary: {
      pk: {
        field: "pk",
        composite: ["transactionID"],
      },
      sk: {
        field: "sk",
        composite: ["transactionID"],
      },
    },
  },
})

export async function syncTx(input: { accessToken: string; cursor: string }) {
  const resp = await plaidSandboxClient.transactionsSync({
    access_token: input.accessToken,
    count: 250,
    cursor: input.cursor,
  })

  // save
}
