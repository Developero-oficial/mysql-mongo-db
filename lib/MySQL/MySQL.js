'use strict'

class MySQL {
  constructor () {
    this.mysql = require('mysql')
    this.conn = null
  }

  connect (config, callback) {
    if (this.conn) return this.conn
    if (!this.validate(config)) return this.validate(config)
    this.conn = this.mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.pass,
      database: config.db
    })
    this.conn.connect(err => {
      console.log(`MySQL: Connected in ${this.conn.config.host}/${this.conn.config.database}`)
      callback(err)
    })
  }

  validate (config) {
    if (!config.host) return new Error('El host no está definido').toString()
    if (!config.db) return new Error('La base de datos no está definida').toString()
    if (!config.port) return new Error('El puerto no está definido').toString()
    return true
  }

  insert (table, values, callback) {
    let query = `INSERT INTO ?? SET ?`
    this.conn.query(query, [table, values], (err, result) => {
      callback(err, result)
    })
  }

  update (table, values, params, callback) {
    let prms = this.generate(params)
    let query = `UPDATE ?? SET ? ` + prms
    this.conn.query(query, [table, values], (err, result) => {
      callback(err, result)
    })
  }

  delete (table, params, callback) {
    let prms = this.generate(params)
    let query = `DELETE FROM ?? ` + prms
    console.log(query)
    this.conn.query(query, [table], (err, result) => {
      callback(err, result)
    })
  }

  select (table, columns, params, callback) {
    let gqs = this.generateQuerySequence(table, columns, params)
    this.conn.query(gqs.query, gqs.placeholder, (err, results, columns) => {
      callback(err, results, columns)
    })
  }

  generateQuerySequence (table, columns, params) {
    if (params) { params = this.generate(params) } else { params = '' }
    if (table && columns) return {query: 'SELECT ?? FROM ?? ' + params, placeholder: [columns, table]}
    if (table && !columns) return {query: 'SELECT * FROM ?? ' + params, placeholder: [table]}
    if (!table) return false
    return 'error al generar query'
  }

  generate (params) {
    this.isObject(params)
    let sentence = ''
    let value = ''
    let arrayParams = []
    for (let property in params) {
      arrayParams = params[property].split(' ')
      value = arrayParams.pop()
      sentence += `${property} ${arrayParams.toString().replace(',', ' ')}${this.conn.escape(value)} `
    }
    return sentence
  }

  isObject (params) {
    if (params === Object(params)) return true
    return false
  }

  close (callback) {
    if (!this.conn) return false
    this.conn.destroy()
    this.conn = null
    console.log('MySQL connection disconnected')
  }
}

module.exports = MySQL
