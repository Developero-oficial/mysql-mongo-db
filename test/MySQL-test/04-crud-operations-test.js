'use strict'

const test = require('tape')
const Db = require('../../lib/MySQL/MySQL.js')

test('Should insert data in db', t => {
  const mysql = new Db()
  let config = { host: 'localhost', user: 'root', pass: '', db: 'test' }
  mysql.connect(config, (err) => {
    if (err) throw err
    let values = {nombre: 'Jaimico', edad: 40, direccion: 'Av la paz'}
    mysql.insert('pruebas', values, (err, res) => {
      if (err) throw err
      t.ok(res, 'Should be the row inserted')
      mysql.close()
      t.end()
    })
  })
})

test('Should update data in db', t => {
  const mysql = new Db()
  let config = { host: 'localhost', user: 'root', pass: '', db: 'test' }
  mysql.connect(config, (err) => {
    if (err) throw err
    let values = {nombre: 'Jimenez', edad: 15, direccion: 'Av la corregidora'}
    let updateParams = {where: 'id_pruebas = ' + Math.floor((Math.random() * 5) + 2)}
    mysql.update('pruebas', values, updateParams, (err, res) => {
      if (err) throw err
      t.ok(res.changedRows, 'Should be the rows affected')
      mysql.close()
      t.end()
    })
  })
})

test('Should delete data in db', t => {
  const mysql = new Db()
  let config = { host: 'localhost', user: 'root', pass: '', db: 'test' }
  mysql.connect(config, (err) => {
    if (err) throw err
    let deleteParams = {where: 'id_pruebas = ' + Math.floor((Math.random() * 5) + 2)}
    mysql.delete('pruebas', deleteParams, (err, res) => {
      if (err) throw err
      t.ok(res.affectedRows, 'Should be the rows affected')
      mysql.close()
      t.end()
    })
  })
})
