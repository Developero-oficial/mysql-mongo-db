'use strict'

const test = require('tape')
const Db = require('../../lib/MySQL/MySQL.js')

test('Should create a instance of MySQL class', t => {
  const mysql = new Db()
  t.ok(mysql)
  t.equal(typeof mysql, 'object', 'Should be an object')
  t.ok(mysql instanceof Db, 'Should be a instance of MySQL')
  t.end()
})

test('Should be a MySQL connection', t => {
  const mysql = new Db()
  let config = { host: 'localhost', user: 'root', pass: '', db: 'test' }
  t.ok(mysql.validate(config), 'The configuration parameters must be valid')
  mysql.connect(config, (err) => {
    t.equal(err, null, 'Should be not error, that means a mysql connection')
    mysql.close()
    t.end()
  })
})
