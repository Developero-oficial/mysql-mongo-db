'use strict'

const test = require('tape')
const Db = require('../../lib/MySQL/MySQL.js')

test('Should create params for database operations', t => {
  const mysql = new Db()
  let config = { host: 'localhost', user: 'root', pass: '', db: 'test' }
  mysql.connect(config, (err) => {
    if (err) throw err
    let credenciales = {name: 'John Doe', password: '$2a$10 $a5aS', instancia: 'test'}
    let params = {where: `usu_nombre = ${credenciales.name}`, and: `usu_contraseña = ${credenciales.password}`, limit: '10', group_by: 'nombre'}
    let res = mysql.isObject(params)
    t.ok(res, 'Params should be an object')
    let sentence = mysql.generate(params)
    console.log(sentence)
    t.equals(typeof sentence, 'string', 'Should be a string sentence')
    mysql.close()
    t.end()
  })
})
