import { Entity } from "electrodb"
import * as Dynamo from "@mangrove/core/dynamo"
import * as Bus from "@mangrove/core/bus"

import {
  Configuration,
  PlaidEnvironments,
  PlaidApi,
  Products,
  CountryCode,
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

// sync

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

  Bus.publish("plaid.connected", {
    userID: input.userID,
    accessToken: resp.data.access_token,
  })

  return resp
}

export async function sandboxCreatePublicToken(userID: string) {
  const resp = await plaidSandboxClient.sandboxPublicTokenCreate({
    institution_id: "ins_109903",
    initial_products: [Products.Transactions],
  })

  return resp.data
}
