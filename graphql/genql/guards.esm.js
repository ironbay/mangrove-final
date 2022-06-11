
var Article_possibleTypes = ['Article']
export var isArticle = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isArticle"')
  return Article_possibleTypes.includes(obj.__typename)
}



var Comment_possibleTypes = ['Comment']
export var isComment = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isComment"')
  return Comment_possibleTypes.includes(obj.__typename)
}



var CustomDataTimes_possibleTypes = ['CustomDataTimes']
export var isCustomDataTimes = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isCustomDataTimes"')
  return CustomDataTimes_possibleTypes.includes(obj.__typename)
}



var Mutation_possibleTypes = ['Mutation']
export var isMutation = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



var NumberFilter_possibleTypes = ['NumberFilter']
export var isNumberFilter = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isNumberFilter"')
  return NumberFilter_possibleTypes.includes(obj.__typename)
}



var Pipe_possibleTypes = ['Pipe']
export var isPipe = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPipe"')
  return Pipe_possibleTypes.includes(obj.__typename)
}



var PlaidAccount_possibleTypes = ['PlaidAccount']
export var isPlaidAccount = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPlaidAccount"')
  return PlaidAccount_possibleTypes.includes(obj.__typename)
}



var PlaidConnection_possibleTypes = ['PlaidConnection']
export var isPlaidConnection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPlaidConnection"')
  return PlaidConnection_possibleTypes.includes(obj.__typename)
}



var Query_possibleTypes = ['Query']
export var isQuery = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



var SlackChannel_possibleTypes = ['SlackChannel']
export var isSlackChannel = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSlackChannel"')
  return SlackChannel_possibleTypes.includes(obj.__typename)
}



var SlackConnection_possibleTypes = ['SlackConnection']
export var isSlackConnection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSlackConnection"')
  return SlackConnection_possibleTypes.includes(obj.__typename)
}



var SlackDestination_possibleTypes = ['SlackDestination']
export var isSlackDestination = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSlackDestination"')
  return SlackDestination_possibleTypes.includes(obj.__typename)
}



var StringFilter_possibleTypes = ['StringFilter']
export var isStringFilter = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isStringFilter"')
  return StringFilter_possibleTypes.includes(obj.__typename)
}
