'use strict'

const test = require('tape')
const Db = require('../../lib/MySQL/MySQL.js')

test('Should select data in db', t => {
  const mysql = new Db()
  let config = { host: 'localhost', user: 'root', pass: '', db: 'test' }
  mysql.connect(config, (err) => {
    if (err) throw err
    mysql.select('pruebas', null, null, (err, res, fields) => {
      if (err) throw err
      t.ok(res.length, 'Should be all the data')
    })
    let columns = ['nombre', 'edad']
    mysql.select('pruebas', columns, null, (err, res, fields) => {
      if (err) throw err
      t.ok(res.length, 'Should be all the data with specific columns')
    })
    let selectParams = {where: 'id_pruebas > 1'}
    mysql.select('pruebas', columns, selectParams, (err, res, fields) => {
      if (err) throw err
      t.ok(res.length, 'Should be all the data with specific columns and params')
      mysql.close()
      t.end()
    })
  })
})
