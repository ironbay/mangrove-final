
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



var Filter_possibleTypes = ['Filter']
export var isFilter = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isFilter"')
  return Filter_possibleTypes.includes(obj.__typename)
}



var Mutation_possibleTypes = ['Mutation']
export var isMutation = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



var NumberType_possibleTypes = ['NumberType']
export var isNumberType = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isNumberType"')
  return NumberType_possibleTypes.includes(obj.__typename)
}



var Pipe_possibleTypes = ['Pipe']
export var isPipe = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPipe"')
  return Pipe_possibleTypes.includes(obj.__typename)
}



var PlaidSource_possibleTypes = ['PlaidSource']
export var isPlaidSource = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPlaidSource"')
  return PlaidSource_possibleTypes.includes(obj.__typename)
}



var PlaidSourceAccountType_possibleTypes = ['PlaidSourceAccountType']
export var isPlaidSourceAccountType = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPlaidSourceAccountType"')
  return PlaidSourceAccountType_possibleTypes.includes(obj.__typename)
}



var PlaidSourceInstitutionType_possibleTypes = ['PlaidSourceInstitutionType']
export var isPlaidSourceInstitutionType = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPlaidSourceInstitutionType"')
  return PlaidSourceInstitutionType_possibleTypes.includes(obj.__typename)
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



var SlackTeam_possibleTypes = ['SlackTeam']
export var isSlackTeam = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSlackTeam"')
  return SlackTeam_possibleTypes.includes(obj.__typename)
}



var TextContainsType_possibleTypes = ['TextContainsType']
export var isTextContainsType = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTextContainsType"')
  return TextContainsType_possibleTypes.includes(obj.__typename)
}



var TextType_possibleTypes = ['TextType']
export var isTextType = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTextType"')
  return TextType_possibleTypes.includes(obj.__typename)
}



var Value_possibleTypes = ['NumberType','TextContainsType','TextType']
export var isValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isValue"')
  return Value_possibleTypes.includes(obj.__typename)
}
