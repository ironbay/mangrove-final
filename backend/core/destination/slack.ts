import { Entity, EntityItem } from "electrodb";
import { Dynamo } from "../dynamo";

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
      }, 
      pipeID: {
        type: "string", 
        required: true, 
      }, 
      teamName: {
        type: "string", 
        required: true,
      }, 
      teamLogo: {
        type: "string",
         required: true
      }, 
      channelName: {
        type: "string", 
        required: true
      }
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: ["destinationID"]
        }, 
        sk: {
          field: "sk", 
          composite:[]
        },
      }, 
      byPipe: {
        index: "gsi1", 
        pk: {
          field: "gsi1pk", 
          composite: ["pipeID"]
        }, 
        sk: {
          field: "gsi1sk",
          composite: ["destinationID"]
        }
      }
    }
  },
  Dynamo.Configuration
);

export async function forPipe(pipeID: string) {
  return SlackDestinationEntity.query.byPipe({ pipeID}).go()
}

export type SlackDestinationEntityType = EntityItem<
  typeof SlackDestinationEntity
>;

export * as Slack from ".";
