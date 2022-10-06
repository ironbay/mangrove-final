import { Entity, EntityItem } from "electrodb";
import { FilterNode } from "kysely";
import { Dynamo, MangroveService } from "../dynamo";
export * as Filter from "./filter";
export * as Pipe from "./index";

export type PipeEntityType = EntityItem<typeof PipeEntity>;
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
      user: {
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["userID"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["pipeID"],
        },
      },
    },
  },
  Dynamo.Configuration
);

export async function forUser(userID: string): Promise<PipeEntityType[]> {
  return [
    {
      pipeID: "pipe1",
      userID: "user123",
      enabled: true,
      name: "my sweet pipe",
    },
  ];
  //   return PipeEntity.query.user({ userID }).go();
}

export async function fromID(pipeID: string) {
  const [pipe] = await PipeEntity.query.pipe({ pipeID }).go();
  return pipe;
}
