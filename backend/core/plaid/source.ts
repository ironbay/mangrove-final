import { Entity, EntityItem } from "electrodb"
import * as Dynamo from "@mangrove/core/dynamo"
import { Transaction } from "plaid"
import * as R from "remeda"
import * as Bus from "@mangrove/core/bus"
import { txAvailable } from "./connection"

export const PlaidSourceEntity = new Entity(
  {
    model: {
      entity: "PlaidSource",
      version: "1",
      service: "mangrove",
    },
    attributes: {
      sourceID: {
        type: "string",
        required: true,
      },
      plaidConnectionID: {
        type: "string",
        required: true,
      },
      timesCreated: {
        type: "string",
        required: true,
      },
      plaidAccountID: {
        type: "string",
        required: true,
      },
      plaidItemID: {
        type: "string",
        required: true,
      },
      plaidInstID: {
        type: "string",
        required: true,
      },
      plaidInstName: {
        type: "string",
        required: true,
      },
      plaidInstColor: {
        type: "string",
        required: false,
      },
      pipeID: {
        type: "string",
        required: true,
      },
      filters: {
        type: "string",
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: ["sourceID"],
        },
      },
      byPlaidAccountID: {
        pk: {
          field: "gsi1pk",
          composite: ["plaidAccountID"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["sourceID"],
        },
      },
      byPipeID: {
        index: "gsi2",
        collection: "pipes",
        pk: {
          field: "gsi2pk",
          composite: ["pipeID"],
        },
        sk: { field: "gsi2sk", composite: ["sourceID", "plaidAccountID"] },
      },
      byPlaidConnectionID: {
        pk: {
          field: "gsi5pk",
          composite: ["plaidConnectionID"],
        },
        sk: {
          field: "gsi5sk",
          composite: ["sourceID"],
        },
      },
    },
  },
  Dynamo.Config
)

declare module "@mangrove/core/bus" {
  export interface Events {
    "plaid.source.match": {
      tx: Transaction
      pipeID: string
    }
  }
}

type NumberFilter<T extends string> = {
  kind: "number"
  field: T
  filterID: string
  op: NumberOp
  value: number
}

type StringFilter<T extends string> =
  | {
      kind: "string"
      field: T
      filterID: string
      op: StringOp
      value: string
    }
  | {
      kind: "string"
      op: StringOp
      field: T
      filterID: string
      value: string[]
    }

export async function matchSources(tx: Transaction) {
  const sources = await PlaidSourceEntity.query
    .byPlaidAccountID({
      plaidAccountID: tx.account_id,
    })
    .go()

  return R.pipe(
    sources.data,
    (x) => R.filter(x, (source) => isMatch({ source, tx })),
    R.forEach((source) =>
      Bus.publish("plaid.source.match", {
        tx,
        pipeID: source.pipeID,
      })
    )
  )
}

function isMatch(input: {
  source: EntityItem<typeof PlaidSourceEntity>
  tx: Transaction
}) {
  const filters = JSON.parse(input.source.filters || "") as (
    | NumberFilter<"amount">
    | StringFilter<"merchant">
  )[]

  return (
    filters.filter((filter) => {
      if (filter.kind === "number") {
        return numberOp({
          op: filter.op,
          txValue: input.tx.amount,
          filterValue: filter.value,
        })
      }
      if (filter.kind === "string") {
        return stringOp({
          op: filter.op,
          txValue: input.tx.merchant_name || "",
          filterValue: filter.value,
        })
      }
      return false
    }).length > 0
  )
}

type NumberOp = "gt" | "lt" | "eq"

function numberOp(input: {
  op: NumberOp
  txValue: number
  filterValue: number
}) {
  if (input.op === "gt") return input.txValue > input.filterValue
  if (input.op === "lt") return input.txValue < input.filterValue
  if (input.op === "eq") return input.txValue === input.filterValue
  return false
}

type StringOp = "eq" | "contains" | "in"

function stringOp(input: {
  op: StringOp
  txValue: string
  filterValue: string | string[]
}) {
  if (input.op === "eq") return input.txValue === input.filterValue
  if (input.op === "contains") {
    return input.txValue
      .toLowerCase()
      .includes((input.filterValue as string).toLowerCase())
  }
  if (input.op === "in") {
    return R.pipe(
      input.filterValue as string[],
      R.map((value) => value.toLowerCase()),
      (x) =>
        R.find(x, (filterValue) => filterValue === input.txValue.toLowerCase())
    )
      ? true
      : false
  }

  return false
}
