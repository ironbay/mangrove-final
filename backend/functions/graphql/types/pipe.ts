import { builder } from '../builder'
import { Pipe, PipeEntity } from '@mangrove/core/pipe'
import { Source } from '@mangrove/core/source'
import { PlaidSourceType } from './source'

export const PipeType = builder.objectRef<Pipe.PipeEntityType>('Pipe')

PipeType.implement({
    fields: (t) => ({
        id: t.exposeID('pipeID'),
        name: t.exposeString('name'),
        enabled: t.exposeBoolean('enabled'),
        plaidSources: t.field({
            type: [PlaidSourceType],
            resolve: async (pipe) => Source.Plaid.forPipe(pipe.pipeID),
        }),
    }),
})

builder.queryFields((t) => ({
    pipes: t.field({
        type: [PipeType],
        args: {
            userID: t.arg.string({ required: true }),
        },
        nullable: true,
        resolve: async (_parent, args) => {
            return Pipe.forUser(args.userID)
        },
    }),
    pipe: t.field({
        type: PipeType,
        args: {
            pipeID: t.arg.string({ required: true }),
        },
        resolve: async (_parent, args) => {
            return Pipe.fromID(args.pipeID)
        },
    }),
}))
