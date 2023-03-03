import { Entity } from "electrodb"
import * as Dynamo from "@mangrove/core/dynamo"
import * as Bus from "@mangrove/core/bus"
import { Api } from "sst/node/api"
import crypto from "crypto"

import {
  Configuration,
  PlaidEnvironments,
  PlaidApi,
  Products,
  CountryCode,
  WebhookType,
  SandboxItemFireWebhookRequestWebhookCodeEnum,
} from "plaid"

import { Config } from "sst/node/config"

declare module "@mangrove/core/bus" {
  export interface Events {
    "plaid.connected": {
      userID: string
      accessToken: string
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

    Bus.publish("plaid.connected", {
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

  Bus.publish("plaid.connected", {
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
