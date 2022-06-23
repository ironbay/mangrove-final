import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    ID: string,
    String: string,
    Boolean: boolean,
    Float: number,
}

export interface Article {
    comments: Comment[]
    id: Scalars['ID']
    title: Scalars['ID']
    url: Scalars['ID']
    __typename: 'Article'
}

export interface Comment {
    id: Scalars['String']
    text: Scalars['String']
    __typename: 'Comment'
}

export interface CommonDataTimes {
    created: Scalars['String']
    updated: Scalars['String']
    __typename: 'CommonDataTimes'
}

export interface Mutation {
    addComment: Comment
    addPipe: Pipe
    createArticle: Article
    removeComment: Comment
    __typename: 'Mutation'
}

export interface NumberFilter {
    account: PlaidAccount
    connection: PlaidConnection
    id: Scalars['ID']
    operand: Scalars['String']
    value: Scalars['Float']
    __typename: 'NumberFilter'
}

export interface Pipe {
    enabled: Scalars['Boolean']
    id: Scalars['ID']
    name: Scalars['String']
    number_filters: NumberFilter[]
    slack_destinations: SlackDestination[]
    string_filters: StringFilter[]
    times: CommonDataTimes
    __typename: 'Pipe'
}

export interface PlaidAccount {
    id: Scalars['ID']
    kind: Scalars['String']
    name: Scalars['String']
    __typename: 'PlaidAccount'
}

export interface PlaidConnection {
    accounts: PlaidAccount[]
    id: Scalars['ID']
    institution_color: Scalars['String']
    institution_logo: Scalars['String']
    institution_name: Scalars['String']
    __typename: 'PlaidConnection'
}

export interface Query {
    articles: Article[]
    pipes: Pipe[]
    pipesFromPlaidConnection: Pipe[]
    pipesFromSlackConnection: Pipe[]
    plaidConnection: PlaidConnection
    plaidConnections: PlaidConnection[]
    slackConnecion: SlackConnection
    slackConnections: SlackConnection[]
    __typename: 'Query'
}

export interface SlackChannel {
    id: Scalars['ID']
    name: Scalars['String']
    __typename: 'SlackChannel'
}

export interface SlackConnection {
    channels: SlackChannel[]
    id: Scalars['ID']
    logo: Scalars['String']
    name: Scalars['String']
    __typename: 'SlackConnection'
}

export interface SlackDestination {
    channel: SlackChannel[]
    connection: SlackConnection
    id: Scalars['ID']
    __typename: 'SlackDestination'
}

export interface StringFilter {
    id: Scalars['ID']
    operand: Scalars['String']
    value: Scalars['String']
    __typename: 'StringFilter'
}

export interface ArticleRequest{
    comments?: CommentRequest
    id?: boolean | number
    title?: boolean | number
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CommentRequest{
    id?: boolean | number
    text?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CommonDataTimesRequest{
    created?: boolean | number
    updated?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationRequest{
    addComment?: [{articleID: Scalars['String'],text: Scalars['String']},CommentRequest]
    addPipe?: [{enabled: Scalars['Boolean'],name: Scalars['String'],number_filters: NumberFilterInputType[]},PipeRequest]
    createArticle?: [{title: Scalars['String'],url: Scalars['String']},ArticleRequest]
    removeComment?: [{id: Scalars['String']},CommentRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NumberFilterRequest{
    account?: PlaidAccountRequest
    connection?: PlaidConnectionRequest
    id?: boolean | number
    operand?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NumberFilterInputType {operand: Scalars['String'],value: Scalars['Float']}

export interface PipeRequest{
    enabled?: boolean | number
    id?: boolean | number
    name?: boolean | number
    number_filters?: NumberFilterRequest
    slack_destinations?: SlackDestinationRequest
    string_filters?: StringFilterRequest
    times?: CommonDataTimesRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PlaidAccountRequest{
    id?: boolean | number
    kind?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PlaidConnectionRequest{
    accounts?: PlaidAccountRequest
    id?: boolean | number
    institution_color?: boolean | number
    institution_logo?: boolean | number
    institution_name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    articles?: ArticleRequest
    pipes?: PipeRequest
    pipesFromPlaidConnection?: [{id: Scalars['String']},PipeRequest]
    pipesFromSlackConnection?: [{id: Scalars['String']},PipeRequest]
    plaidConnection?: [{id: Scalars['String']},PlaidConnectionRequest]
    plaidConnections?: PlaidConnectionRequest
    slackConnecion?: [{id: Scalars['String']},SlackConnectionRequest]
    slackConnections?: SlackConnectionRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SlackChannelRequest{
    id?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SlackConnectionRequest{
    channels?: SlackChannelRequest
    id?: boolean | number
    logo?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SlackDestinationRequest{
    channel?: SlackChannelRequest
    connection?: SlackConnectionRequest
    id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface StringFilterRequest{
    id?: boolean | number
    operand?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


const Article_possibleTypes: string[] = ['Article']
export const isArticle = (obj?: { __typename?: any } | null): obj is Article => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isArticle"')
  return Article_possibleTypes.includes(obj.__typename)
}



const Comment_possibleTypes: string[] = ['Comment']
export const isComment = (obj?: { __typename?: any } | null): obj is Comment => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isComment"')
  return Comment_possibleTypes.includes(obj.__typename)
}



const CommonDataTimes_possibleTypes: string[] = ['CommonDataTimes']
export const isCommonDataTimes = (obj?: { __typename?: any } | null): obj is CommonDataTimes => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCommonDataTimes"')
  return CommonDataTimes_possibleTypes.includes(obj.__typename)
}



const Mutation_possibleTypes: string[] = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



const NumberFilter_possibleTypes: string[] = ['NumberFilter']
export const isNumberFilter = (obj?: { __typename?: any } | null): obj is NumberFilter => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isNumberFilter"')
  return NumberFilter_possibleTypes.includes(obj.__typename)
}



const Pipe_possibleTypes: string[] = ['Pipe']
export const isPipe = (obj?: { __typename?: any } | null): obj is Pipe => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPipe"')
  return Pipe_possibleTypes.includes(obj.__typename)
}



const PlaidAccount_possibleTypes: string[] = ['PlaidAccount']
export const isPlaidAccount = (obj?: { __typename?: any } | null): obj is PlaidAccount => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPlaidAccount"')
  return PlaidAccount_possibleTypes.includes(obj.__typename)
}



const PlaidConnection_possibleTypes: string[] = ['PlaidConnection']
export const isPlaidConnection = (obj?: { __typename?: any } | null): obj is PlaidConnection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPlaidConnection"')
  return PlaidConnection_possibleTypes.includes(obj.__typename)
}



const Query_possibleTypes: string[] = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



const SlackChannel_possibleTypes: string[] = ['SlackChannel']
export const isSlackChannel = (obj?: { __typename?: any } | null): obj is SlackChannel => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSlackChannel"')
  return SlackChannel_possibleTypes.includes(obj.__typename)
}



const SlackConnection_possibleTypes: string[] = ['SlackConnection']
export const isSlackConnection = (obj?: { __typename?: any } | null): obj is SlackConnection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSlackConnection"')
  return SlackConnection_possibleTypes.includes(obj.__typename)
}



const SlackDestination_possibleTypes: string[] = ['SlackDestination']
export const isSlackDestination = (obj?: { __typename?: any } | null): obj is SlackDestination => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSlackDestination"')
  return SlackDestination_possibleTypes.includes(obj.__typename)
}



const StringFilter_possibleTypes: string[] = ['StringFilter']
export const isStringFilter = (obj?: { __typename?: any } | null): obj is StringFilter => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isStringFilter"')
  return StringFilter_possibleTypes.includes(obj.__typename)
}


export interface ArticlePromiseChain{
    comments: ({get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>[]) => Promise<FieldsSelection<Comment, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    url: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>})
}

export interface ArticleObservableChain{
    comments: ({get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>[]) => Observable<FieldsSelection<Comment, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    url: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>})
}

export interface CommentPromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    text: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface CommentObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    text: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface CommonDataTimesPromiseChain{
    created: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    updated: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface CommonDataTimesObservableChain{
    created: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    updated: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface MutationPromiseChain{
    addComment: ((args: {articleID: Scalars['String'],text: Scalars['String']}) => CommentPromiseChain & {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>) => Promise<FieldsSelection<Comment, R>>}),
    addPipe: ((args: {enabled: Scalars['Boolean'],name: Scalars['String'],number_filters: NumberFilterInputType[]}) => PipePromiseChain & {get: <R extends PipeRequest>(request: R, defaultValue?: FieldsSelection<Pipe, R>) => Promise<FieldsSelection<Pipe, R>>}),
    createArticle: ((args: {title: Scalars['String'],url: Scalars['String']}) => ArticlePromiseChain & {get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>) => Promise<FieldsSelection<Article, R>>}),
    removeComment: ((args: {id: Scalars['String']}) => CommentPromiseChain & {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>) => Promise<FieldsSelection<Comment, R>>})
}

export interface MutationObservableChain{
    addComment: ((args: {articleID: Scalars['String'],text: Scalars['String']}) => CommentObservableChain & {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>) => Observable<FieldsSelection<Comment, R>>}),
    addPipe: ((args: {enabled: Scalars['Boolean'],name: Scalars['String'],number_filters: NumberFilterInputType[]}) => PipeObservableChain & {get: <R extends PipeRequest>(request: R, defaultValue?: FieldsSelection<Pipe, R>) => Observable<FieldsSelection<Pipe, R>>}),
    createArticle: ((args: {title: Scalars['String'],url: Scalars['String']}) => ArticleObservableChain & {get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>) => Observable<FieldsSelection<Article, R>>}),
    removeComment: ((args: {id: Scalars['String']}) => CommentObservableChain & {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>) => Observable<FieldsSelection<Comment, R>>})
}

export interface NumberFilterPromiseChain{
    account: (PlaidAccountPromiseChain & {get: <R extends PlaidAccountRequest>(request: R, defaultValue?: FieldsSelection<PlaidAccount, R>) => Promise<FieldsSelection<PlaidAccount, R>>}),
    connection: (PlaidConnectionPromiseChain & {get: <R extends PlaidConnectionRequest>(request: R, defaultValue?: FieldsSelection<PlaidConnection, R>) => Promise<FieldsSelection<PlaidConnection, R>>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    operand: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    value: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>})
}

export interface NumberFilterObservableChain{
    account: (PlaidAccountObservableChain & {get: <R extends PlaidAccountRequest>(request: R, defaultValue?: FieldsSelection<PlaidAccount, R>) => Observable<FieldsSelection<PlaidAccount, R>>}),
    connection: (PlaidConnectionObservableChain & {get: <R extends PlaidConnectionRequest>(request: R, defaultValue?: FieldsSelection<PlaidConnection, R>) => Observable<FieldsSelection<PlaidConnection, R>>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    operand: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    value: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>})
}

export interface PipePromiseChain{
    enabled: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    number_filters: ({get: <R extends NumberFilterRequest>(request: R, defaultValue?: FieldsSelection<NumberFilter, R>[]) => Promise<FieldsSelection<NumberFilter, R>[]>}),
    slack_destinations: ({get: <R extends SlackDestinationRequest>(request: R, defaultValue?: FieldsSelection<SlackDestination, R>[]) => Promise<FieldsSelection<SlackDestination, R>[]>}),
    string_filters: ({get: <R extends StringFilterRequest>(request: R, defaultValue?: FieldsSelection<StringFilter, R>[]) => Promise<FieldsSelection<StringFilter, R>[]>}),
    times: (CommonDataTimesPromiseChain & {get: <R extends CommonDataTimesRequest>(request: R, defaultValue?: FieldsSelection<CommonDataTimes, R>) => Promise<FieldsSelection<CommonDataTimes, R>>})
}

export interface PipeObservableChain{
    enabled: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    number_filters: ({get: <R extends NumberFilterRequest>(request: R, defaultValue?: FieldsSelection<NumberFilter, R>[]) => Observable<FieldsSelection<NumberFilter, R>[]>}),
    slack_destinations: ({get: <R extends SlackDestinationRequest>(request: R, defaultValue?: FieldsSelection<SlackDestination, R>[]) => Observable<FieldsSelection<SlackDestination, R>[]>}),
    string_filters: ({get: <R extends StringFilterRequest>(request: R, defaultValue?: FieldsSelection<StringFilter, R>[]) => Observable<FieldsSelection<StringFilter, R>[]>}),
    times: (CommonDataTimesObservableChain & {get: <R extends CommonDataTimesRequest>(request: R, defaultValue?: FieldsSelection<CommonDataTimes, R>) => Observable<FieldsSelection<CommonDataTimes, R>>})
}

export interface PlaidAccountPromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    kind: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface PlaidAccountObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    kind: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface PlaidConnectionPromiseChain{
    accounts: ({get: <R extends PlaidAccountRequest>(request: R, defaultValue?: FieldsSelection<PlaidAccount, R>[]) => Promise<FieldsSelection<PlaidAccount, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    institution_color: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    institution_logo: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    institution_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface PlaidConnectionObservableChain{
    accounts: ({get: <R extends PlaidAccountRequest>(request: R, defaultValue?: FieldsSelection<PlaidAccount, R>[]) => Observable<FieldsSelection<PlaidAccount, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    institution_color: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    institution_logo: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    institution_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface QueryPromiseChain{
    articles: ({get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>[]) => Promise<FieldsSelection<Article, R>[]>}),
    pipes: ({get: <R extends PipeRequest>(request: R, defaultValue?: FieldsSelection<Pipe, R>[]) => Promise<FieldsSelection<Pipe, R>[]>}),
    pipesFromPlaidConnection: ((args: {id: Scalars['String']}) => {get: <R extends PipeRequest>(request: R, defaultValue?: FieldsSelection<Pipe, R>[]) => Promise<FieldsSelection<Pipe, R>[]>}),
    pipesFromSlackConnection: ((args: {id: Scalars['String']}) => {get: <R extends PipeRequest>(request: R, defaultValue?: FieldsSelection<Pipe, R>[]) => Promise<FieldsSelection<Pipe, R>[]>}),
    plaidConnection: ((args: {id: Scalars['String']}) => PlaidConnectionPromiseChain & {get: <R extends PlaidConnectionRequest>(request: R, defaultValue?: FieldsSelection<PlaidConnection, R>) => Promise<FieldsSelection<PlaidConnection, R>>}),
    plaidConnections: ({get: <R extends PlaidConnectionRequest>(request: R, defaultValue?: FieldsSelection<PlaidConnection, R>[]) => Promise<FieldsSelection<PlaidConnection, R>[]>}),
    slackConnecion: ((args: {id: Scalars['String']}) => SlackConnectionPromiseChain & {get: <R extends SlackConnectionRequest>(request: R, defaultValue?: FieldsSelection<SlackConnection, R>) => Promise<FieldsSelection<SlackConnection, R>>}),
    slackConnections: ({get: <R extends SlackConnectionRequest>(request: R, defaultValue?: FieldsSelection<SlackConnection, R>[]) => Promise<FieldsSelection<SlackConnection, R>[]>})
}

export interface QueryObservableChain{
    articles: ({get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>[]) => Observable<FieldsSelection<Article, R>[]>}),
    pipes: ({get: <R extends PipeRequest>(request: R, defaultValue?: FieldsSelection<Pipe, R>[]) => Observable<FieldsSelection<Pipe, R>[]>}),
    pipesFromPlaidConnection: ((args: {id: Scalars['String']}) => {get: <R extends PipeRequest>(request: R, defaultValue?: FieldsSelection<Pipe, R>[]) => Observable<FieldsSelection<Pipe, R>[]>}),
    pipesFromSlackConnection: ((args: {id: Scalars['String']}) => {get: <R extends PipeRequest>(request: R, defaultValue?: FieldsSelection<Pipe, R>[]) => Observable<FieldsSelection<Pipe, R>[]>}),
    plaidConnection: ((args: {id: Scalars['String']}) => PlaidConnectionObservableChain & {get: <R extends PlaidConnectionRequest>(request: R, defaultValue?: FieldsSelection<PlaidConnection, R>) => Observable<FieldsSelection<PlaidConnection, R>>}),
    plaidConnections: ({get: <R extends PlaidConnectionRequest>(request: R, defaultValue?: FieldsSelection<PlaidConnection, R>[]) => Observable<FieldsSelection<PlaidConnection, R>[]>}),
    slackConnecion: ((args: {id: Scalars['String']}) => SlackConnectionObservableChain & {get: <R extends SlackConnectionRequest>(request: R, defaultValue?: FieldsSelection<SlackConnection, R>) => Observable<FieldsSelection<SlackConnection, R>>}),
    slackConnections: ({get: <R extends SlackConnectionRequest>(request: R, defaultValue?: FieldsSelection<SlackConnection, R>[]) => Observable<FieldsSelection<SlackConnection, R>[]>})
}

export interface SlackChannelPromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface SlackChannelObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface SlackConnectionPromiseChain{
    channels: ({get: <R extends SlackChannelRequest>(request: R, defaultValue?: FieldsSelection<SlackChannel, R>[]) => Promise<FieldsSelection<SlackChannel, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    logo: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface SlackConnectionObservableChain{
    channels: ({get: <R extends SlackChannelRequest>(request: R, defaultValue?: FieldsSelection<SlackChannel, R>[]) => Observable<FieldsSelection<SlackChannel, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    logo: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface SlackDestinationPromiseChain{
    channel: ({get: <R extends SlackChannelRequest>(request: R, defaultValue?: FieldsSelection<SlackChannel, R>[]) => Promise<FieldsSelection<SlackChannel, R>[]>}),
    connection: (SlackConnectionPromiseChain & {get: <R extends SlackConnectionRequest>(request: R, defaultValue?: FieldsSelection<SlackConnection, R>) => Promise<FieldsSelection<SlackConnection, R>>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>})
}

export interface SlackDestinationObservableChain{
    channel: ({get: <R extends SlackChannelRequest>(request: R, defaultValue?: FieldsSelection<SlackChannel, R>[]) => Observable<FieldsSelection<SlackChannel, R>[]>}),
    connection: (SlackConnectionObservableChain & {get: <R extends SlackConnectionRequest>(request: R, defaultValue?: FieldsSelection<SlackConnection, R>) => Observable<FieldsSelection<SlackConnection, R>>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>})
}

export interface StringFilterPromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    operand: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    value: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface StringFilterObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    operand: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    value: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}