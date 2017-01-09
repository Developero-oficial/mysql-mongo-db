'use strict'

const test = require('tape')
const Db = require('../../lib/MongoDB/MongoDB.js')

test('Should create a Schema and model', t => {
  const mongodb = new Db()
  let schema = {item: String, valor: Number, existencia: Number}
  let itemSchema = mongodb.create(schema)
  t.ok(itemSchema, 'Should create a Schema')
  let itemModel = mongodb.createModel('items', itemSchema)
  t.ok(itemModel, 'Should create a model')
  t.end()
})
