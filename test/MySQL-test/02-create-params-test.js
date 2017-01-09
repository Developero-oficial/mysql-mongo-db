'use strict'

const test = require('tape')
const Db = require('../../lib/MySQL/MySQL.js')

test('Should create params for database operations', t => {
  const mysql = new Db()
  let config = { host: 'localhost', user: 'root', pass: '', db: 'test' }
  mysql.connect(config, (err) => {
    if (err) throw err
    let params = {where: 'id_pruebas = 9'}
    let res = mysql.isObject(params)
    t.ok(res, 'Params should be an object')
    let sentence = mysql.generate(params)
    t.equals(typeof sentence, 'string', 'Should be a string sentence')
    mysql.close()
    t.end()
  })
})
