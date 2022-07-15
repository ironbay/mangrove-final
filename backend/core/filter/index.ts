import { Entity } from "electrodb";
import { Dynamo } from "../dynamo";

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
      accountID: {
        type: "string",
        requried: true,
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
      assigned: {
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

type NumberFilter<T extends string> = {
  id: string;
  sourceID: string;
  kind: T;
  op: "eq" | "lt" | "gt";
  value: number;
};

type TextFilter<T extends string> =
  | {
      id: string;
      sourceID: string;
      kind: T;
      op: "eq" | "contains";
      value: string;
    }
  | {
      id: string;
      sourceID: string;
      kind: T;
      op: "in";
      value: string[];
    };
