'use strict'

const test = require('tape')
const Db = require('../../index')

test('Should select data in db', t => {
  const mysql = Db.createDB('MySQL')
  let config = { host: 'localhost', user: 'root', pass: '', db: 'test' }
  mysql.connect(config, (err) => {
    t.notOk(err)
    mysql.select('pruebas', null, null, (err, res, fields) => {
      t.notOk(err)
      t.ok(res.length, 'Should be all the data')
      console.log(res)
    })
    let columns = ['nombre', 'edad']
    mysql.select('pruebas', columns, null, (err, res, fields) => {
      t.notOk(err)
      t.ok(res.length, 'Should be all the data with specific columns (nombre, edad)')
      console.log(res)
    })
    let selectParams = {where: 'edad > 30'}
    console.log(mysql.generate(selectParams))
    mysql.select('pruebas', null, selectParams, (err, res, fields) => {
      t.notOk(err)
      t.ok(res.length, 'Should be all the data with specific params (edad > 30)')
      console.log(res)
    })
    mysql.select('pruebas', columns, selectParams, (err, res, fields) => {
      t.notOk(err)
      t.ok(res.length, 'Should be all the data with specific columns (nombre, edad) and params (edad > 30)')
      console.log(res)
    })
    let betweenParams = {where: 'edad', between: '0', and: '30'}
    mysql.select('pruebas', columns, betweenParams, (err, res, fields) => {
      t.notOk(err)
      t.ok(res.length, 'Should be all the data with between params: where edad between 0 and 30')
      console.log(res)
    })
    let limitParams = {limit: 3}
    mysql.select('pruebas', null, limitParams, (err, res, fields) => {
      t.notOk(err)
      t.ok(res.length, 'Should be 3 rows result')
      console.log(res)
      mysql.close()
      t.end()
    })
  })
})
