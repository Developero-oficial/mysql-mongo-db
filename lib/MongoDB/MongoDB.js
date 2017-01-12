'use strict'

class MongoDB {
  constructor () {
    this.type = 'MongoDB'
    this.mongoose = require('mongoose')
    this.mongoose.Promise = global.Promise
    this.conn = null
  }

  connect (config, callback) {
    if (!this.validate(config)) return this.validate(config)
    if (this.conn) return this.conn
    this.conn = this.mongoose.connect(this.getUri(config), (err) => {
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

  create (schema) {
    return this.mongoose.Schema(schema)
  }

  createModel (name, schema) {
    let model
    try { model = this.mongoose.model(name) } catch (e) { model = this.mongoose.model(name, schema) }
    return model
  }

  save (model, callback) {
    model.save((err, docStored) => {
      callback(err, docStored)
    })
  }

  find (model, params, callback) {
    model.find(params, (err, docs) => {
      callback(err, docs)
    })
  }

  findOne (model, callback) {
    model.findOne((err, docs) => {
      callback(err, docs)
    })
  }

  findById (model, id, callback) {
    model.findById(id, (err, doc) => {
      callback(err, doc)
    })
  }

  updateById (model, id, doc, callback) {
    model.findByIdAndUpdate(id, doc, (err, docUpdated) => {
      callback(err, docUpdated)
    })
  }

  remove (doc, callback) {
    doc.remove(err => {
      callback(err)
    })
  }

  close (callback) {
    if (!this.conn) return false
    this.mongoose.connection.close(() => {
      this.conn = null
      console.log('Mongoose connection disconnected')
      callback(true)
    })
  }
}

module.exports = MongoDB
