'use strict'

class Factory {
  createDB (db) {
    switch (db) {
      case 'MongoDB':
        let MongoDB = require('../MongoDB/MongoDB.js')
        return new MongoDB()
      case 'MySQL':
        let MySQL = require('../MySQL/MySQL.js')
        return new MySQL()
      default:
        throw new Error('Database invalid').toString()
    }
  }
}

module.exports = new Factory()
