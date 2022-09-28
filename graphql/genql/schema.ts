import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    ID: string,
    String: string,
    Float: number,
    Boolean: boolean,
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

export interface Filter {
    id: Scalars['String']
    kind: Scalars['String']
    op: Scalars['String']
    value: Value
    __typename: 'Filter'
}

export interface Mutation {
    addComment: Comment
    createArticle: Article
    createSlackConnection?: SlackConnection
    removeComment: Comment
    __typename: 'Mutation'
}

export interface NumberType {
    value: Scalars['Float']
    __typename: 'NumberType'
}

export interface Pipe {
    enabled: Scalars['Boolean']
    id: Scalars['ID']
    name: Scalars['String']
    plaidSources: PlaidSource[]
    __typename: 'Pipe'
}

export interface PlaidSource {
    account: PlaidSourceAccountType
    filters: Filter[]
    id: Scalars['ID']
    institution: Scalars['String']
    __typename: 'PlaidSource'
}

export interface PlaidSourceAccountType {
    kind: Scalars['String']
    name: Scalars['String']
    __typename: 'PlaidSourceAccountType'
}

export interface PlaidSourceInstitutionType {
    logo: Scalars['String']
    name: Scalars['String']
    __typename: 'PlaidSourceInstitutionType'
}

export interface Query {
    articles: Article[]
    pipe: Pipe
    pipes?: Pipe[]
    slackConnections?: SlackConnection[]
    __typename: 'Query'
}

export interface SlackChannel {
    id: Scalars['ID']
    name: Scalars['ID']
    __typename: 'SlackChannel'
}

export interface SlackConnection {
    channels: SlackChannel[]
    id: Scalars['ID']
    team: SlackTeam
    __typename: 'SlackConnection'
}

export interface SlackTeam {
    id: Scalars['ID']
    name: Scalars['String']
    __typename: 'SlackTeam'
}

export interface TextContainsType {
    value: Scalars['String'][]
    __typename: 'TextContainsType'
}

export interface TextType {
    value: Scalars['String']
    __typename: 'TextType'
}

export type Value = (NumberType | TextContainsType | TextType) & { __isUnion?: true }

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

export interface FilterRequest{
    id?: boolean | number
    kind?: boolean | number
    op?: boolean | number
    value?: ValueRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationRequest{
    addComment?: [{articleID: Scalars['String'],text: Scalars['String']},CommentRequest]
    createArticle?: [{title: Scalars['String'],url: Scalars['String']},ArticleRequest]
    createSlackConnection?: [{code: Scalars['String'],userID: Scalars['String']},SlackConnectionRequest]
    removeComment?: [{id: Scalars['String']},CommentRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NumberTypeRequest{
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PipeRequest{
    enabled?: boolean | number
    id?: boolean | number
    name?: boolean | number
    plaidSources?: PlaidSourceRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PlaidSourceRequest{
    account?: PlaidSourceAccountTypeRequest
    filters?: FilterRequest
    id?: boolean | number
    institution?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PlaidSourceAccountTypeRequest{
    kind?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PlaidSourceInstitutionTypeRequest{
    logo?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    articles?: ArticleRequest
    pipe?: [{pipeID: Scalars['String']},PipeRequest]
    pipes?: [{userID: Scalars['String']},PipeRequest]
    slackConnections?: [{userID: Scalars['String']},SlackConnectionRequest]
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
    team?: SlackTeamRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SlackTeamRequest{
    id?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TextContainsTypeRequest{
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TextTypeRequest{
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ValueRequest{
    on_NumberType?:NumberTypeRequest,
    on_TextContainsType?:TextContainsTypeRequest,
    on_TextType?:TextTypeRequest,
    __typename?: boolean | number
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



const Filter_possibleTypes: string[] = ['Filter']
export const isFilter = (obj?: { __typename?: any } | null): obj is Filter => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFilter"')
  return Filter_possibleTypes.includes(obj.__typename)
}



const Mutation_possibleTypes: string[] = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



const NumberType_possibleTypes: string[] = ['NumberType']
export const isNumberType = (obj?: { __typename?: any } | null): obj is NumberType => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isNumberType"')
  return NumberType_possibleTypes.includes(obj.__typename)
}



const Pipe_possibleTypes: string[] = ['Pipe']
export const isPipe = (obj?: { __typename?: any } | null): obj is Pipe => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPipe"')
  return Pipe_possibleTypes.includes(obj.__typename)
}



const PlaidSource_possibleTypes: string[] = ['PlaidSource']
export const isPlaidSource = (obj?: { __typename?: any } | null): obj is PlaidSource => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPlaidSource"')
  return PlaidSource_possibleTypes.includes(obj.__typename)
}



const PlaidSourceAccountType_possibleTypes: string[] = ['PlaidSourceAccountType']
export const isPlaidSourceAccountType = (obj?: { __typename?: any } | null): obj is PlaidSourceAccountType => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPlaidSourceAccountType"')
  return PlaidSourceAccountType_possibleTypes.includes(obj.__typename)
}



const PlaidSourceInstitutionType_possibleTypes: string[] = ['PlaidSourceInstitutionType']
export const isPlaidSourceInstitutionType = (obj?: { __typename?: any } | null): obj is PlaidSourceInstitutionType => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPlaidSourceInstitutionType"')
  return PlaidSourceInstitutionType_possibleTypes.includes(obj.__typename)
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



const SlackTeam_possibleTypes: string[] = ['SlackTeam']
export const isSlackTeam = (obj?: { __typename?: any } | null): obj is SlackTeam => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSlackTeam"')
  return SlackTeam_possibleTypes.includes(obj.__typename)
}



const TextContainsType_possibleTypes: string[] = ['TextContainsType']
export const isTextContainsType = (obj?: { __typename?: any } | null): obj is TextContainsType => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isTextContainsType"')
  return TextContainsType_possibleTypes.includes(obj.__typename)
}



const TextType_possibleTypes: string[] = ['TextType']
export const isTextType = (obj?: { __typename?: any } | null): obj is TextType => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isTextType"')
  return TextType_possibleTypes.includes(obj.__typename)
}



const Value_possibleTypes: string[] = ['NumberType','TextContainsType','TextType']
export const isValue = (obj?: { __typename?: any } | null): obj is Value => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isValue"')
  return Value_possibleTypes.includes(obj.__typename)
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

export interface FilterPromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    kind: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    op: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    value: ({get: <R extends ValueRequest>(request: R, defaultValue?: FieldsSelection<Value, R>) => Promise<FieldsSelection<Value, R>>})
}

export interface FilterObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    kind: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    op: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    value: ({get: <R extends ValueRequest>(request: R, defaultValue?: FieldsSelection<Value, R>) => Observable<FieldsSelection<Value, R>>})
}

export interface MutationPromiseChain{
    addComment: ((args: {articleID: Scalars['String'],text: Scalars['String']}) => CommentPromiseChain & {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>) => Promise<FieldsSelection<Comment, R>>}),
    createArticle: ((args: {title: Scalars['String'],url: Scalars['String']}) => ArticlePromiseChain & {get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>) => Promise<FieldsSelection<Article, R>>}),
    createSlackConnection: ((args: {code: Scalars['String'],userID: Scalars['String']}) => SlackConnectionPromiseChain & {get: <R extends SlackConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SlackConnection, R> | undefined)) => Promise<(FieldsSelection<SlackConnection, R> | undefined)>}),
    removeComment: ((args: {id: Scalars['String']}) => CommentPromiseChain & {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>) => Promise<FieldsSelection<Comment, R>>})
}

export interface MutationObservableChain{
    addComment: ((args: {articleID: Scalars['String'],text: Scalars['String']}) => CommentObservableChain & {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>) => Observable<FieldsSelection<Comment, R>>}),
    createArticle: ((args: {title: Scalars['String'],url: Scalars['String']}) => ArticleObservableChain & {get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>) => Observable<FieldsSelection<Article, R>>}),
    createSlackConnection: ((args: {code: Scalars['String'],userID: Scalars['String']}) => SlackConnectionObservableChain & {get: <R extends SlackConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SlackConnection, R> | undefined)) => Observable<(FieldsSelection<SlackConnection, R> | undefined)>}),
    removeComment: ((args: {id: Scalars['String']}) => CommentObservableChain & {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>) => Observable<FieldsSelection<Comment, R>>})
}

export interface NumberTypePromiseChain{
    value: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>})
}

export interface NumberTypeObservableChain{
    value: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>})
}

export interface PipePromiseChain{
    enabled: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    plaidSources: ({get: <R extends PlaidSourceRequest>(request: R, defaultValue?: FieldsSelection<PlaidSource, R>[]) => Promise<FieldsSelection<PlaidSource, R>[]>})
}

export interface PipeObservableChain{
    enabled: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    plaidSources: ({get: <R extends PlaidSourceRequest>(request: R, defaultValue?: FieldsSelection<PlaidSource, R>[]) => Observable<FieldsSelection<PlaidSource, R>[]>})
}

export interface PlaidSourcePromiseChain{
    account: (PlaidSourceAccountTypePromiseChain & {get: <R extends PlaidSourceAccountTypeRequest>(request: R, defaultValue?: FieldsSelection<PlaidSourceAccountType, R>) => Promise<FieldsSelection<PlaidSourceAccountType, R>>}),
    filters: ({get: <R extends FilterRequest>(request: R, defaultValue?: FieldsSelection<Filter, R>[]) => Promise<FieldsSelection<Filter, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    institution: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface PlaidSourceObservableChain{
    account: (PlaidSourceAccountTypeObservableChain & {get: <R extends PlaidSourceAccountTypeRequest>(request: R, defaultValue?: FieldsSelection<PlaidSourceAccountType, R>) => Observable<FieldsSelection<PlaidSourceAccountType, R>>}),
    filters: ({get: <R extends FilterRequest>(request: R, defaultValue?: FieldsSelection<Filter, R>[]) => Observable<FieldsSelection<Filter, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    institution: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface PlaidSourceAccountTypePromiseChain{
    kind: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface PlaidSourceAccountTypeObservableChain{
    kind: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface PlaidSourceInstitutionTypePromiseChain{
    logo: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface PlaidSourceInstitutionTypeObservableChain{
    logo: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface QueryPromiseChain{
    articles: ({get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>[]) => Promise<FieldsSelection<Article, R>[]>}),
    pipe: ((args: {pipeID: Scalars['String']}) => PipePromiseChain & {get: <R extends PipeRequest>(request: R, defaultValue?: FieldsSelection<Pipe, R>) => Promise<FieldsSelection<Pipe, R>>}),
    pipes: ((args: {userID: Scalars['String']}) => {get: <R extends PipeRequest>(request: R, defaultValue?: (FieldsSelection<Pipe, R>[] | undefined)) => Promise<(FieldsSelection<Pipe, R>[] | undefined)>}),
    slackConnections: ((args: {userID: Scalars['String']}) => {get: <R extends SlackConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SlackConnection, R>[] | undefined)) => Promise<(FieldsSelection<SlackConnection, R>[] | undefined)>})
}

export interface QueryObservableChain{
    articles: ({get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>[]) => Observable<FieldsSelection<Article, R>[]>}),
    pipe: ((args: {pipeID: Scalars['String']}) => PipeObservableChain & {get: <R extends PipeRequest>(request: R, defaultValue?: FieldsSelection<Pipe, R>) => Observable<FieldsSelection<Pipe, R>>}),
    pipes: ((args: {userID: Scalars['String']}) => {get: <R extends PipeRequest>(request: R, defaultValue?: (FieldsSelection<Pipe, R>[] | undefined)) => Observable<(FieldsSelection<Pipe, R>[] | undefined)>}),
    slackConnections: ((args: {userID: Scalars['String']}) => {get: <R extends SlackConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SlackConnection, R>[] | undefined)) => Observable<(FieldsSelection<SlackConnection, R>[] | undefined)>})
}

export interface SlackChannelPromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>})
}

export interface SlackChannelObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>})
}

export interface SlackConnectionPromiseChain{
    channels: ({get: <R extends SlackChannelRequest>(request: R, defaultValue?: FieldsSelection<SlackChannel, R>[]) => Promise<FieldsSelection<SlackChannel, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    team: (SlackTeamPromiseChain & {get: <R extends SlackTeamRequest>(request: R, defaultValue?: FieldsSelection<SlackTeam, R>) => Promise<FieldsSelection<SlackTeam, R>>})
}

export interface SlackConnectionObservableChain{
    channels: ({get: <R extends SlackChannelRequest>(request: R, defaultValue?: FieldsSelection<SlackChannel, R>[]) => Observable<FieldsSelection<SlackChannel, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    team: (SlackTeamObservableChain & {get: <R extends SlackTeamRequest>(request: R, defaultValue?: FieldsSelection<SlackTeam, R>) => Observable<FieldsSelection<SlackTeam, R>>})
}

export interface SlackTeamPromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface SlackTeamObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface TextContainsTypePromiseChain{
    value: ({get: (request?: boolean|number, defaultValue?: Scalars['String'][]) => Promise<Scalars['String'][]>})
}

export interface TextContainsTypeObservableChain{
    value: ({get: (request?: boolean|number, defaultValue?: Scalars['String'][]) => Observable<Scalars['String'][]>})
}

export interface TextTypePromiseChain{
    value: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface TextTypeObservableChain{
    value: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}