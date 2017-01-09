'use strict'

class MySQL {
  constructor () {
    this.mysql = require('mysql')
    this.conn = false
  }

  connect (config, callback) {
    if (!this.validate(config)) return this.validate(config)
    this.connection = this.mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.pass,
      database: config.db
    })
    this.connection.connect(err => {
      console.log(`MySQL: Connected in ${this.connection.config.host}/${this.connection.config.database}`)
      callback(err)
    })
  }

  validate (config) {
    if (!config.host) return new Error('El host no está definido').toString()
    if (!config.db) return new Error('La base de datos no está definida').toString()
    if (!config.port) return new Error('El puerto no está definido').toString()
    return true
  }

  close (callback) {
    this.connection.destroy()
    this.connection = null
    console.log('MySQL connection disconnected')
  }
}

module.exports = MySQL
