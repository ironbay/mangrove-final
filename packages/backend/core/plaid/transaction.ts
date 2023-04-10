import { SyncUpdatesAvailableWebhook, Transaction } from "plaid"
import { Bus } from "@mangrove/core/bus"
import { Connection } from "@mangrove/core/plaid"

declare module "@mangrove/core/bus" {
  export interface Events {
    "plaid.tx.available": SyncUpdatesAvailableWebhook
    "plaid.tx.new": Transaction
  }
}

export async function publishAvailable(input: SyncUpdatesAvailableWebhook) {
  return await Bus.publish("plaid.tx.available", input)
}

export async function fetch(input: SyncUpdatesAvailableWebhook) {
  const connection = await Connection.byPlaidItemID(input.item_id)!

  async function fetch(args: {
    hasMore: boolean
    cursor: string | undefined
  }): Promise<Transaction[]> {
    const resp = await Connection.sandboxClient.transactionsSync({
      count: 100,
      access_token: input.accessToken,
      cursor: args.cursor,
    })

    if (resp.data.has_more) {
      return [
        ...resp.data.added,
        ...(await fetch({
          hasMore: resp.data.has_more,
          cursor: resp.data.next_cursor,
        })),
      ]
    }

    await Connection.setCursor({
      connectionID: connection!.connectionID,
      cursor: resp.data.next_cursor,
    })

    return resp.data.added
  }

  const newTx = await fetch({
    hasMore: true,
    cursor: connection?.plaidTransactionCursor,
  })

  await Promise.all(newTx.map((tx) => Bus.publish("plaid.tx.new", tx)))
  return
}

// export async function txFetch(input: SyncUpdatesAvailableWebhook) {
//   const item = await byPlaidItemID(input.item_id)
//   const transactions = await fetchTx({
//     connectionID: item?.connectionID!,
//     accessToken: item?.accessToken!,
//     cursor: item!.plaidTransactionCursor,
//   })

//   const publishes = Promise.all(
//     transactions.map((tx) => Bus.publish("plaid.tx.new", tx))
//   )

//   await Promise.all([publishes])
// }

// export async function fetchTx(input: {
//   connectionID: string
//   accessToken: string
//   cursor: string | undefined
// }) {
//   async function fetch(args: {
//     hasMore: boolean
//     cursor: string | undefined
//   }): Promise<Transaction[]> {
//     const resp = await plaidSandboxClient.transactionsSync({
//       count: 100,
//       access_token: input.accessToken,
//       cursor: args.cursor,
//     })

//     if (resp.data.has_more) {
//       return [
//         ...resp.data.added,
//         ...(await fetch({
//           hasMore: resp.data.has_more,
//           cursor: resp.data.next_cursor,
//         })),
//       ]
//     }

//     await PlaidConnectionEntity.update({
//       connectionID: input.connectionID,
//     })
//       .set({ plaidTransactionCursor: args.cursor })
//       .go()

//     return resp.data.added
//   }

//   const transactions = await fetch({
//     hasMore: true,
//     cursor: input.cursor,
//   })

//   return transactions
// }
