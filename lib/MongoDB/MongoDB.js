'use strict'

class MongoDB {
  constructor () {
    this.mongoose = require('mongoose')
    this.mongoose.Promise = global.Promise
    this.conn = null
  }

  connect (config, callback) {
    if (!this.validate(config)) return this.validate(config)
    this.mongoose.connect(this.getUri(config), {auto_reconnect: true, native_parser: true}, (err) => {
      callback(err)
    })
  }

  validate (config) {
    if (!config.host) return new Error('El host no está definido').toString()
    if (!config.db) return new Error('La base de datos no está definida').toString()
    if (!config.port) return new Error('El puerto no está definido').toString()
    return true
  }

  getUri (config) {
    if (!config.user || !config.pass) return `mongodb://${config.host}:${config.port}/${config.db}`
    return `mongodb://${config.user}:${config.pass}@${config.host}:${config.port}/${config.db}`
  }

  close (callback) {
    this.mongoose.connection.close(() => {
      console.log('Mongoose connection disconnected')
      callback(true)
    })
  }
}

module.exports = MongoDB
