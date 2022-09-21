import { Entity, EntityItem } from 'electrodb'

export * as Filter from "."

export const FilterEntity = new Entity({
    model: {
        version: '1',
        entity: 'Filter',
        service: 'mangrove',
    },
    attributes: {
        filterID: {
            type: 'string',
        },
        sourceID: {
          type: "string"
        }, 
        op: {
          type: "string", 
          required: true, 
        }, 
        kind: {
          type: "string", 
          required: true
        }, 
        value: {
          type: "any", 
          required: true
        }
    },
    indexes: {
        primary: {
            pk: {
                field: 'pk',
                composite: ['filterID'],
            },
            sk: {
                field: 'sk',
                composite: [],
            },
        },
        bySource: {
            index: 'gsi1',
            pk: {
                field: 'gsi1pk',
                composite: ['sourceID'],
            },
            sk: {
                field: 'gsi1sk',
                composite: ['filterID'],
            },
        },
    },
})

export async function forSource(sourceID: string) {
  return FilterEntity.query.bySource({ sourceID }).go()
}

export type FilterEntityType = EntityItem<typeof FilterEntity>

