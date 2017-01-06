'use strict'

class MongoDB 
{
  constructor()
  {
    this.mongoose = require('mongoose')
    this.mongoose.Promise = global.Promise;
    this.conn = null
  }


}

module.exports = MongoDB