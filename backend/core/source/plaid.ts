import { Entity, EntityItem } from 'electrodb'
import { Dynamo } from '../dynamo'

export const PlaidSourceEntity = new Entity(
    {
        model: {
            entity: 'PlaidSource',
            version: '1',
            service: 'mangrove',
        },
        attributes: {
            sourceID: {
                type: 'string',
                require: true,
                readOnly: true,
            },
            connectionID: {
                type: 'string',
                required: true,
                readOnly: false,
            },
            pipeID: {
                type: 'string',
                required: true,
                readOnly: true,
            },
            instLogo: {
                type: 'string',
                required: true,
                readOnly: false,
            },
            instName: {
                type: 'string',
                required: true,
                readOnly: false,
            },
            accountID: {
                type: 'string',
                required: true,
                readOnly: false,
            },
            accountName: {
                type: 'string',
                required: true,
                readOnly: false,
            },
            accountKind: {
                type: 'string',
                required: true,
                readOnly: false,
            },
            filterID: {
                type: 'string',
                required: true,
                readOnly: false,
            },
        },
        indexes: {
            source: {
                pk: {
                    field: 'pk',
                    composite: ['sourceID'],
                },
            },
            byPipe: {
                index: 'gsi1',
                pk: {
                    field: 'gsi1pk',
                    composite: ['pipeID'],
                },
                sk: {
                    field: 'gsi1sk',
                    composite: ['sourceID'],
                },
            },
        },
    },
    Dynamo.Configuration
)

// a source is a
// plaid account
// plaid connection (item)
// a filter

export async function forPipe(pipeID: string) {
    const results = await PlaidSourceEntity.query.byPipe({ pipeID }).go()
    return results
}

export type PlaidSourceEntityType = EntityItem<typeof PlaidSourceEntity>
