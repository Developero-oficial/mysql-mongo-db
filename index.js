'use strict'

const MongoDB = require('./lib/MongoDB/MongoDB.js')

let config = {
    host: 'localhost',
    user: '',
    pass: '',
    port : 27017,
    db : 'test'
  }

const mongodb = new MongoDB()
