'use strict'

const test = require('tape')
const db = require('../lib/MongoDB/MongoDB.js')

test('Should create a instance of MongoDB class', t => {
  const mongodb = new db()
  t.ok(mongodb)
  t.equal(typeof mongodb, 'object', 'Should be an object')
  t.ok(mongodb instanceof db, 'Should be a instance of MongoDB')
  t.end()
})

test('Should be a mongodb connection', t => {
  const mongodb = new db()
  t.equal(typeof mongodb.connect, 'function', 'Should be a function')
  let config = {
    host: 'localhost',
    user: '',
    pass: '',
    port : 27017,
    db : 'test'
  }
  t.ok(mongodb.validate(config), 'The configuration parameters must be valid')
  t.ok(mongodb.getUri(config), 'Should return the uri for mongodb connection')
  mongodb.connect(config, (err) => {
    t.equal(err, undefined, 'Should be not error, that means a mongodb connection')
    mongodb.close((res) => {
      t.ok(res, 'Should close the database connection')
    })
    t.end()
  })
})

test('Should be errors in mongodb connection', t => {
  const mongodb = new db()
  let config = {
    host: '',
    user: '',
    pass: '',
    port : 27017,
    db : 'test'
  }
  t.equal(mongodb.validate(config), 'Error: El host no está definido', 'Should be new host error')
  config.host = 'localhost'
  config.port = ''
  t.equal(mongodb.validate(config), 'Error: El puerto no está definido', 'Should be new port error')
  config.port = 27017
  config.db = ''
  t.equal(mongodb.validate(config), 'Error: La base de datos no está definida', 'Should be new db error')
  t.end()
})
