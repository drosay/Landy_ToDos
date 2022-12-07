'use strict'

const {format,register} = require('timeago.js')
const locale = require('timeago.js/lib/lang/es').default

const helpers = {}

register('es',locale)//timeago español

helpers.timeago = timestamp => format(timestamp)
helpers.es_timeago = timestamp => format(timestamp,'es')

module.exports = helpers