'use strict'

const test = require('tape')
const Db = require('../../lib/MySQL/MySQL.js')

test('Should create params for database operations', t => {
  const mysql = new Db()
  let config = { host: 'localhost', user: 'root', pass: '', db: 'test' }
  mysql.connect(config, (err) => {
    t.notOk(err)
    t.equals(mysql.generate({where: 'id = 1'}), 'where id =\'1\' ')
    t.equals(mysql.generate({where: 'id > 1'}), 'where id >\'1\' ')
    t.equals(mysql.generate({where: 'id >= 1'}), 'where id >=\'1\' ')
    t.equals(mysql.generate({where: 'id < 1'}), 'where id <\'1\' ')
    t.equals(mysql.generate({where: 'id <= 1'}), 'where id <=\'1\' ')
    t.equals(mysql.generate({where: 'id != 1'}), 'where id !=\'1\' ')
    t.equals(mysql.generate({where: 'id = 1', and: 'edad = 30'}), 'where id =\'1\' and edad =\'30\' ')
    t.equals(mysql.generate({where: 'edad', between: 0, and: 30}), 'where edad between 0 and 30 ')
    t.equals(mysql.generate({limit: 3}), 'limit 3 ')
    mysql.close()
    t.end()
  })
})
