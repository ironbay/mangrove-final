import { builder } from '../builder'
import { Source } from '@mangrove/core/source'

export const PlaidSourceType = builder
    .objectRef<Source.Plaid.PlaidSourceEntityType>('PlaidSource')
    .implement({
        fields: (t) => ({
            id: t.exposeID('sourceID'),
            institution: t.field({
                type: 'String',
                resolve: () => 'Gina',
            }),
            account: t.field({
                type: PlaidSourceAccountType,
                resolve: (t) => t,
            }),
        }),
    })

export const PlaidSourceInstitutionType = builder
    .objectRef<{ instLogo: string; instName: string }>(
        'PlaidSourceInstitutionType'
    )
    .implement({
        fields: (t) => ({
            name: t.exposeString('instName'),
            logo: t.exposeString('instLogo'),
        }),
    })

export const PlaidSourceAccountType = builder
    .objectRef<{
        accountName: string
        accountKind: string
    }>('PlaidSourceAccountType')
    .implement({
        fields: (t) => ({
            name: t.exposeString('accountName'),
            kind: t.exposeString('accountKind'),
        }),
    })
