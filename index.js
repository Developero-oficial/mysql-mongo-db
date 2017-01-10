'use strict'

const factory = require('./lib/Factory/Factory.js')

exports.createDB = function createDB (db) {
  return factory.createDB(db)
}
