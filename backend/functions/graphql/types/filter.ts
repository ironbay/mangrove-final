import { builder } from '../builder'
import { Filter } from '@mangrove/core/filter'

export const FilterType = builder.objectRef<Filter.FilterEntityType>('Filter')

FilterType.implement({
    fields: (t) => ({
        id: t.exposeString('filterID'),
        kind: t.exposeString('kind'),
        op: t.exposeString('op'),
        value: t.field({
            type: FilterValueType,
            resolve: (parent) => parent,
        }),
    }),
})

const NumberType = builder
    .objectRef<{ value: number; kind: string }>('TextType')
    .implement({
        fields: (t) => ({
            value: t.exposeFloat('value'),
        }),
    })

const TextType = builder
    .objectRef<{ value: string; kind: string }>('TextType')
    .implement({
        fields: (t) => ({
            value: t.exposeString('value'),
        }),
    })

const TextContainsType = builder
    .objectRef<{ value: string[]; kind: string }>('TextType')
    .implement({
        fields: (t) => ({
            value: t.exposeStringList('value'),
        }),
    })
2
const FilterValueType = builder.unionType('Value', {
    types: [NumberType, TextType, TextContainsType],
    resolveType: (filter) => {
        switch (filter.kind) {
            case 'number':
                return NumberType
            case 'text':
                return TextType
            case 'textContains':
                return TextContainsType
        }
    },
})
