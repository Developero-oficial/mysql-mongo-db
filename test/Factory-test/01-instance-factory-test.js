'use strict'

const test = require('tape')
const factory = require('../../lib/Factory/Factory.js')
const mysql = require('../../lib/MySQL/MySQL.js')
const mongodb = require('../../lib/MongoDB/MongoDB.js')

test('Should instance MySQL with Factory', t => {
  const MySQL = factory.createDB('MySQL')
  t.ok(MySQL)
  t.equal(typeof MySQL, 'object', 'Should be an object')
  t.ok(MySQL instanceof mysql, 'Should be a instance of MySQL')
  t.end()
})

test('Should instance MongoDb with Factory', t => {
  const MongoDb = factory.createDB('MongoDB')
  t.ok(MongoDb)
  t.equal(typeof MongoDb, 'object', 'Should be an object')
  t.ok(MongoDb instanceof mongodb, 'Should be a instance of MongoDb')
  t.end()
})
