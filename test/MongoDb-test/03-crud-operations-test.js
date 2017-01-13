'use strict'

const test = require('tape')
const Db = require('../../lib/MongoDb/MongoDb.js')

test('Should excute a save operation', t => {
  const mongoDb = new Db()
  let config = {host: 'localhost', user: '', pass: '', port: 27017, db: 'test'}
  mongoDb.connect(config, err => {
    if (err) throw err
    let itemSchema = mongoDb.create({item: String, valor: Number, existencia: Number})
    const ItemModel = mongoDb.createModel('items', itemSchema)
    let doc = {item: 'wii', valor: 6000, existencia: 15}
    const docModel = new ItemModel(doc)
    mongoDb.save(docModel, (error, docStored) => {
      t.error(error, 'Should not be error')
      t.ok(docStored, 'Should be the doc stored')
      mongoDb.close((res) => {
        t.end()
      })
    })
  })
})

test('Should execute all the find methods declarated', t => {
  const mongoDb = new Db()
  let config = {host: 'localhost', user: '', pass: '', port: 27017, db: 'test'}
  mongoDb.connect(config, err => {
    if (err) throw err
    let itemSchema = mongoDb.create({item: String, valor: Number, existencia: Number})
    const ItemModel = mongoDb.createModel('items', itemSchema)
    mongoDb.find(ItemModel, null, (err, docs) => {
      console.log(docs)
      t.error(err, 'Should not be error')
      t.ok(docs, 'Should be the docs found')
    })
    mongoDb.find(ItemModel, {tiem: 1}, (err, docs) => {
      console.log(docs)
      t.error(err, 'Should not be error')
      t.ok(docs, 'Should be the docs found with the params')
    })
    mongoDb.findOne(ItemModel, (err, docs) => {
      console.log(docs)
      t.error(err, 'Should not be error')
      t.ok(docs, 'Should be the doc found with findOne')
    })
    mongoDb.findOne(ItemModel, {item: 'xbox'}, (err, docs) => {
      console.log(docs)
      t.error(err, 'Should not be error')
      t.ok(docs, 'Should be the doc found with findOne and params')
    })
    mongoDb.findById(ItemModel, '5878ebd4851ebd144c971439', (err, docs) => {
      console.log(docs)
      t.error(err, 'Should not be error')
      t.ok(docs, 'Should be the doc found with id')
      mongoDb.close((res) => {
        t.end()
      })
    })
  })
})

test('Should execute updateById method', t => {
  const mongoDb = new Db()
  let config = { host: 'localhost', user: '', pass: '', port: 27017, db: 'test' }
  mongoDb.connect(config, err => {
    if (err) throw err
    let itemSchema = mongoDb.create({ item: String, valor: Number, existencia: Number })
    const ItemModel = mongoDb.createModel('items', itemSchema)
    let newDoc = {valor: 100}
    mongoDb.updateById(ItemModel, '5873e9666e75a111102c073b', newDoc, (err, docUp) => {
      if (err) throw err
      t.ok(docUp, 'Should be the updated doc')
      mongoDb.close((res) => {
        t.end()
      })
    })
  })
})

test('Should execute remove method', t => {
  const mongoDb = new Db()
  let config = { host: 'localhost', user: '', pass: '', port: 27017, db: 'test' }
  mongoDb.connect(config, err => {
    if (err) throw err
    let itemSchema = mongoDb.create({ item: String, valor: Number, existencia: Number })
    const ItemModel = mongoDb.createModel('items', itemSchema)
    mongoDb.findOne(ItemModel, (err, doc) => {
      t.error(err, 'Should not be error')
      mongoDb.remove(doc, (err) => {
        t.error(err, 'Should be not error, that means the remove was success')
        mongoDb.close((res) => {
          t.end()
        })
      })
    })
  })
})
