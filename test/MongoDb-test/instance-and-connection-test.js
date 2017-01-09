'use strict'

const test = require('tape')
const Db = require('../../lib/MongoDb/MongoDb.js')

test('Should create a instance of MongoDb class', t => {
  const mongoDb = new Db()
  t.ok(mongoDb)
  t.equal(typeof mongoDb, 'object', 'Should be an object')
  t.ok(mongoDb instanceof Db, 'Should be a instance of MongoDb')
  t.end()
})

test('Should be a mongoDb connection', t => {
  const mongoDb = new Db()
  t.equal(typeof mongoDb.connect, 'function', 'Should be a function')
  let config = {
    host: 'localhost',
    user: '',
    pass: '',
    port: 27017,
    db: 'test'
  }
  t.ok(mongoDb.validate(config), 'The configuration parameters must be valid')
  t.ok(mongoDb.getUri(config), 'Should return the uri for mongoDb connection')
  mongoDb.connect(config, (err) => {
    t.equal(err, undefined, 'Should be not error, that means a mongoDb connection')
    mongoDb.close((res) => {
      t.ok(res, 'Should close the database connection')
    })
    t.end()
  })
})

test('Should be errors in mongoDb connection', t => {
  const mongoDb = new Db()
  let config = {
    host: '',
    user: '',
    pass: '',
    port: 27017,
    db: 'test'
  }
  t.equal(mongoDb.validate(config), 'Error: El host no está definido', 'Should be new host error')
  config.host = 'localhost'
  config.port = ''
  t.equal(mongoDb.validate(config), 'Error: El puerto no está definido', 'Should be new port error')
  config.port = 27017
  config.db = ''
  t.equal(mongoDb.validate(config), 'Error: La base de datos no está definida', 'Should be new Db error')
  t.end()
})
