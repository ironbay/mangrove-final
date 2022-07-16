import { Entity, EntityItem } from "electrodb";
import { FilterNode } from "kysely";
import { Dynamo, MangroveService } from "../dynamo";

export const NumberFilterEntity = new Entity(
  {
    model: {
      entity: "NumberFilter",
      version: "1",
      service: "mangrove",
    },
    attributes: {
      filterID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      sourceID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      pipeID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      op: {
        type: "string",
        required: true,
        readOnly: false,
      },
      value: {
        type: "number",
        required: true,
        readOnly: false,
      },
      kind: {
        type: "string",
        required: true,
        readOnly: false,
      },
    },
    indexes: {
      filter: {
        collection: "filters",
        pk: {
          field: "pk",
          composite: ["filterID"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },
      source: {
        collection: "sources",
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["sourceID"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["filterID"],
        },
      },
      pipe: {
        collection: "pipes",
        index: "gsi2",
        pk: {
          field: "gsi2pk",
          composite: ["pipeID"],
        },
        sk: {
          field: "gsi2pk",
          composite: ["sourceID", "filterID"],
        },
      },
    },
  },
  Dynamo.Configuration
);

export const TextFilterEntity = new Entity(
  {
    model: {
      entity: "TextFilter",
      version: "1",
      service: "mangrove",
    },
    attributes: {
      filterID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      sourceID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      pipeID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      op: {
        type: "string",
        required: true,
        readOnly: false,
      },
      value: {
        type: "string",
        required: true,
        readOnly: false,
      },
      kind: {
        type: "string",
        required: true,
        readOnly: false,
      },
    },
    indexes: {
      filter: {
        collection: "filters",
        pk: {
          field: "pk",
          composite: ["filterID"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },
      source: {
        collection: "sources",
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["sourceID"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["filterID"],
        },
      },
      assigned: {
        collection: "pipes",
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["pipeID"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["sourceID", "filterID"],
        },
      },
    },
  },
  Dynamo.Configuration
);

export const TextContainsFilterEntity = new Entity(
  {
    model: {
      entity: "TextFilter",
      version: "1",
      service: "mangrove",
    },
    attributes: {
      filterID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      sourceID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      pipeID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      op: {
        type: "string",
        required: true,
        readOnly: false,
      },
      value: {
        type: "list",
        items: {
          type: "string",
        },
        required: true,
        readOnly: false,
      },
      kind: {
        type: "string",
        required: true,
        readOnly: false,
      },
    },
    indexes: {
      filter: {
        collection: "filters",
        pk: {
          field: "pk",
          composite: ["filterID"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },
      source: {
        collection: "sources",
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["sourceID"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["filterID"],
        },
      },
      assigned: {
        collection: "pipes",
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["pipeID"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["sourceID", "filterID"],
        },
      },
    },
  },
  Dynamo.Configuration
);

export const SourceEntity = new Entity(
  {
    model: {
      entity: "Source",
      version: "1",
      service: "mangrove",
    },
    attributes: {
      sourceID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      pipeID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      kind: {
        type: "string",
        required: true,
        readOnly: true,
      },
      bingo: {
        type: "string",
        required: true,
        readOnly: true,
      },
      accountID: {
        type: "string",
        required: true,
        readOnly: false,
      },
    },
    indexes: {
      source: {
        collection: "sources",
        pk: {
          field: "pk",
          composite: ["sourceID"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },
      pipe: {
        collection: "pipes",
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["pipeID"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["sourceID"],
        },
      },
    },
  },
  Dynamo.Configuration
);

export const SlackDestinationEntity = new Entity(
  {
    model: {
      entity: "SlackDestination",
      version: "1",
      service: "mangrove",
    },
    attributes: {
      destinationID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      pipeID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      teamID: {
        type: "string",
        required: true,
        readOnly: false,
      },
      channelID: {
        type: "string",
        required: true,
        readOnly: false,
      },
    },
    indexes: {
      destination: {
        pk: {
          field: "pk",
          composite: ["destinationID"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },
      pipe: {
        collection: "pipes",
        index: "gsi1pk",
        pk: {
          field: "gsi1pk",
          composite: ["pipeID"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["destinationID"],
        },
      },
    },
  },
  Dynamo.Configuration
);

export const PipeEntity = new Entity(
  {
    model: {
      entity: "Pipe",
      version: "1",
      service: "mangrove",
    },
    attributes: {
      pipeID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      userID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      name: {
        type: "string",
        required: true,
        readOnly: false,
      },
      enabled: {
        type: "boolean",
        required: true,
        readOnly: false,
      },
    },
    indexes: {
      pipe: {
        collection: "pipes",
        pk: {
          field: "pk",
          composite: ["pipeID"],
        },
        sk: {
          field: "sk",
          composite: ["userID"],
        },
      },
    },
  },
  Dynamo.Configuration
);

export async function sources(pipeID: string) {
  return SourceEntity.query.pipe({ pipeID }).go();
}

export async function filtersForSource(sourceID: string) {
  return Promise.all([
    NumberFilterEntity.query.source({ sourceID }).go(),
    TextFilterEntity.query.source({ sourceID }).go(),
    TextContainsFilterEntity.query.source({ sourceID }).go(),
  ]).then(resp => resp.flat());
}

export async function destinations(pipeID: string) {
  return SlackDestinationEntity.query.pipe({ pipeID }).go();
}

export type NumberFilterEntityType = EntityItem<typeof NumberFilterEntity>;
export type PipeEntityType = EntityItem<typeof PipeEntity>;
export type TextFilterEntityType = EntityItem<typeof TextFilterEntity>;
export type TextContainsFilterEntityType = EntityItem<
  typeof TextContainsFilterEntity
>;
export type SourceEntityType = EntityItem<typeof SourceEntity>;
export type SlackDestinationType = EntityItem<typeof SlackDestinationEntity>;
export function create() {}

export * as Pipe from ".";
