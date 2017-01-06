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