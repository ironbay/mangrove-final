import { Entity, EntityItem, EntityRecord, UpdateEntityItem } from "electrodb"
import * as Dynamo from "@mangrove/core/dynamo"
import * as Bus from "@mangrove/core/bus"
import { Api } from "sst/node/api"
import crypto from "crypto"
import * as R from "remeda"

import {
  Configuration,
  PlaidEnvironments,
  PlaidApi,
  Products,
  CountryCode,
  SandboxItemFireWebhookRequestWebhookCodeEnum,
  SyncUpdatesAvailableWebhook,
} from "plaid"

import { Config } from "sst/node/config"

declare module "@mangrove/core/bus" {
  export interface Events {
    "plaid.connection.created": {
      userID: string
      accessToken: string
    }
    "plaid.tx.available": SyncUpdatesAvailableWebhook
    "plaid.tx.new": {
      transactionID: string
    }
  }
}

const PlaidConnectionEntity = new Entity(
  {
    model: {
      entity: "PlaidConnection",
      version: "1",
      service: "mangrove",
    },
    attributes: {
      connectionID: {
        type: "string",
        required: true,
      },
      userID: {
        type: "string",
        required: true,
      },
      timesCreated: {
        type: "string",
        required: true,
      },
      plaidItemID: {
        type: "string",
        required: true,
      },
      plaidTransactionCursor: {
        type: "string",
        required: false,
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
      plaidInstLogo: {
        type: "string",
        required: false,
      },
      plaidWebhook: {
        type: "string",
        required: true,
      },
      accessToken: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: ["connectionID"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },
      byUserID: {
        index: "gsi3",
        pk: {
          field: "gsi3pk",
          composite: ["userID"],
        },
        sk: {
          field: "gsi3sk",
          composite: ["connectionID"],
        },
      },
      byPlaidItemID: {
        index: "gsi4",
        pk: {
          field: "gsi4pk",
          composite: ["plaidItemID"],
        },
        sk: {
          field: "gsi4sk",
          composite: ["connectionID"],
        },
      },
      plaidConnectionLookup: {
        index: "gsi5",
        pk: {
          field: "gsi5pk",
          composite: ["connectionID"],
        },
        sk: {
          field: "gsi1sk",
          composite: [],
        },
      },
    },
  },
  Dynamo.Service
)

const PlaidTransactionEntity = new Entity(
  {
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
      plaidTransactionID: {
        type: "string",
        required: true,
      },
      plaidAccountID: {
        type: "string",
        required: true,
      },
      amount: {
        type: "number",
        required: true,
      },
      currencyCode: {
        type: "string",
        required: false,
      },
      unofficialCurrencyCode: {
        type: "string",
        required: false,
      },
      category: {
        type: "list",
        required: false,
        items: {
          type: "string",
        },
      },
      categoryID: {
        type: "string",
        required: false,
      },
      timesCreated: {
        type: "string",
        required: true,
      },
      timesPosted: {
        type: "string",
        required: true,
      },
      locationAddress: {
        type: "string",
        required: false,
      },
      locationCity: {
        type: "string",
        required: false,
      },
      locationRegion: {
        type: "string",
        required: false,
      },
      locationPostalCode: {
        type: "string",
        required: false,
      },
      locationCountry: {
        type: "string",
        required: false,
      },
      locationLat: {
        type: "number",
        required: false,
      },
      locationLon: {
        type: "number",
        required: false,
      },
      merchantName: {
        type: "string",
        required: true,
      },
      plaidMerchantName: {
        type: "string",
        required: false,
      },
      pending: {
        type: "boolean",
        required: true,
      },
      paymentChannel: {
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
  },
  Dynamo.Service
)

export async function syncTx(input: { accessToken: string; cursor: string }) {
  const resp = await plaidSandboxClient.transactionsSync({
    access_token: input.accessToken,
    count: 250,
    cursor: input.cursor,
  })

  // save
}

const plaidConfig = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": Config.PLAID_CLIENT_ID,
      "PLAID-SECRET": Config.PLAID_CLIENT_SECRET,
    },
  },
})

const plaidSandboxConfig = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": Config.PLAID_CLIENT_ID,
      "PLAID-SECRET": Config.PLAID_CLIENT_SECRET_SANDBOX,
    },
  },
})

const plaidClient = new PlaidApi(plaidConfig)
const plaidSandboxClient = new PlaidApi(plaidSandboxConfig)

export async function createLinkToken(userID: string) {
  const resp = await plaidClient.linkTokenCreate({
    user: {
      client_user_id: userID,
    },
    client_name: "Mangrove",
    products: [Products.Transactions],
    country_codes: [CountryCode.Us],
    language: "en",
    webhook: "https://google.com",
    redirect_uri:
      "https://9vrhcfnv57.execute-api.us-east-1.amazonaws.com/plaid/auth/callback",
  })

  return resp
}

export async function listInstitutions() {
  const resp = await plaidClient
    .institutionsGet({
      count: 500,
      offset: 0,
      country_codes: [CountryCode.Us],
    })
    .catch((e) => console.log(e))
    .then((resp) => {
      if (resp) {
        return resp.data.institutions
      }
    })

  return resp
}

type TokenExchange = {
  userID: string
  publicToken: string
}

export async function connect(input: TokenExchange) {
  const resp = await plaidSandboxClient.itemPublicTokenExchange({
    public_token: input.publicToken,
  })

  const existing = await PlaidConnectionEntity.query
    .byPlaidItemID({
      plaidItemID: resp.data.item_id,
    })
    .go()

  const itemResp = await getItem({ accessToken: resp.data.access_token })

  const instResp = await getInst({ instID: itemResp.item.institution_id! })

  if (!existing.data[0]) {
    const plaidConnection = await PlaidConnectionEntity.create({
      connectionID: crypto.randomUUID(),
      timesCreated: new Date().toISOString(),
      userID: input.userID,
      accessToken: resp.data.access_token,
      plaidItemID: itemResp.item.item_id,
      plaidWebhook: itemResp.item.webhook!,
      plaidInstID: instResp.institution.institution_id,
      plaidInstName: instResp.institution.name,
      plaidInstColor: instResp.institution.primary_color || "",
      plaidInstLogo: instResp.institution.logo || "",
    }).go()

    Bus.publish("plaid.connection.created", {
      userID: input.userID,
      accessToken: resp.data.access_token,
    })

    return plaidConnection.data
  }

  const update = await PlaidConnectionEntity.update({
    connectionID: existing.data[0].connectionID,
  })
    .set({
      accessToken: resp.data.access_token,
      plaidInstID: instResp.institution.institution_id,
      plaidInstName: instResp.institution.name,
      plaidInstColor: instResp.institution.primary_color || "",
      plaidInstLogo: instResp.institution.logo || "",
    })
    .go({ response: "all_new" })

  Bus.publish("plaid.connection.created", {
    userID: update.data.userID!,
    accessToken: update.data.accessToken!,
  })
}

export async function byUserID(userID: string) {
  const resp = await PlaidConnectionEntity.query
    .byUserID({ userID: userID })
    .go()

  return resp.data.at(0)
}

export async function byPlaidItemID(input: string) {
  const resp = await PlaidConnectionEntity.query
    .byPlaidItemID({
      plaidItemID: input,
    })
    .go()

  return resp.data.at(0)
}

export async function sandboxCreatePublicToken(userID: string) {
  const resp = await plaidSandboxClient.sandboxPublicTokenCreate({
    institution_id: "ins_109903",
    initial_products: [Products.Transactions],
    options: {
      webhook: Api.api.url + "/plaid/webhook",
    },
  })

  return resp.data
}

export async function getItem(input: { accessToken: string }) {
  const resp = await plaidSandboxClient.itemGet({
    access_token: input.accessToken,
  })
  return resp.data
}

export async function getInst(input: { instID: string }) {
  const resp = await plaidSandboxClient.institutionsGetById({
    institution_id: input.instID,
    country_codes: [CountryCode.Us],
  })

  return resp.data
}

export async function sandboxFireWebhook(input: { accessToken: string }) {
  const resp = await plaidSandboxClient.sandboxItemFireWebhook({
    access_token: input.accessToken,
    webhook_code: SandboxItemFireWebhookRequestWebhookCodeEnum.DefaultUpdate,
  })

  return resp
}

export async function txAvailable(input: SyncUpdatesAvailableWebhook) {
  const item = await byPlaidItemID(input.item_id)

  //
}

export async function fetchTx(input: {
  connectionID: string
  accessToken: string
  cursor: string | undefined
}) {
  const nextTx: EntityItem<typeof PlaidTransactionEntity>[] = []

  fetch({ cursor: input.cursor, hasMore: true })

  async function fetch(args: {
    cursor: string | undefined
    hasMore: boolean
  }): Promise<void> {
    if (!args.hasMore) {
      await PlaidConnectionEntity.update({
        connectionID: input.connectionID,
      })
        .set({ plaidTransactionCursor: args.cursor })
        .go()

      for (const tx of nextTx) {
        await Bus.publish("plaid.tx.new", { transactionID: tx.transactionID })
      }

      return
    }

    const resp = await plaidSandboxClient.transactionsSync({
      access_token: input.accessToken,
      cursor: input.cursor,
    })

    const toAdd: EntityItem<typeof PlaidTransactionEntity>[] =
      resp.data.added.map((tx) => ({
        transactionID: crypto.randomUUID(),
        plaidTransactionID: tx.transaction_id,
        plaidAccountID: tx.account_id,
        amount: tx.amount,
        currencyCode: tx.iso_currency_code || undefined,
        unofficialCurrencyCode: tx.unofficial_currency_code || undefined,
        category: tx.category || [],
        categoryID: tx.category_id || undefined,
        timesCreated: new Date().toString(),
        timesPosted: tx.date,
        locationAddress: tx.location.address || undefined,
        locationCity: tx.location.city || undefined,
        locationRegion: tx.location.region || undefined,
        locationPostalCode: tx.location.postal_code || undefined,
        locationCountry: tx.location.country || undefined,
        locationLat: tx.location.lat || undefined,
        locationLon: tx.location.lon || undefined,
        merchantName: tx.name,
        plaidMerchantName: tx.merchant_name || undefined,
        pending: tx.pending,
        paymentChannel: tx.payment_channel,
      }))

    nextTx.concat(toAdd)
    await PlaidTransactionEntity.put(toAdd).go()

    return fetch({
      cursor: resp.data.next_cursor,
      hasMore: resp.data.has_more,
    })
  }
}

export async function recurse(num: number): Promise<number> {
  if (num < 4) {
    console.log("num", num)
    return recurse(num + 1)
  }

  return 0
}

// incoming webhook comes in
// webhook with item_id
// get the next cursor saved for the item
// get the tx transactions/sync using the saved cursor for the item
// list of added, then next cursor
// save all the tx
