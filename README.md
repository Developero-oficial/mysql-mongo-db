+mysql-mongo-db
+==========
+
+Módulo para hacer operaciones a base de datos con Mysql y Mongodb.
+
+
+Ejemplos de uso
+--------------------
## Synopsis

This is a **Mysql** and **Mongodb** interface for basic database operations (CRUD). 

## Code Example

**Creat Mysql object**

``` js
const mysql_mongo = require('mysql-mongo-db')

const mysql = mysql_mongo.createDB('MySQL')

```

**Create Mongo object**

``` js
const mysql_mongo = require('mysql-mongo-db')
const mongodb = mysql_mongo.createDB('MongoDB')

```

**Connect to database**

``` js
let config = { host: 'my-host', user: 'my-user', pass: 'my-pass', db: 'my-db' }
mysql.connect(config, err => {
  if(err) throw err
  console.log(`Connected in ${config.host}/${config.db}`)
})

```

``` js
let config = { host: 'my-host', user: 'my-user', port: 27017, pass: 'my-pass', db: 'my-db' }
mongodb.connect(config, err => {
  if(err) throw err
  console.log(`Connected in ${config.host}/${config.db}`)
})

```

**CRUD Mysql** 

``` js
let valuesToInsert = {nombre: 'John Doe', age: 40, address: '42th. Street'}
mysql.insert('my_table', valuesToInsert, (err, res) => {
  if (err) throw err
  console.log(res)
})

let valuesToUpdate = {name: 'Johana Daw', age: 30}
let updateParams = {where: 'id = 1' and: 'name = John Doe'}
mysql.update('my_table', valuesToUpdate, updateParams, (err, res) => {
  if (err) throw err
  console.log(`Changed rows: ${res.changedRows}`)
  t.end()
})

let deleteParams = {where: 'id = 1'}
mysql.delete('my_table', deleteParams, (err, res) => {
  if (err) throw err
  console.log(`Affected rows: ${res.affectedRows}`)
  t.end()
})

```
**Params in mysql database operations**
If you want to add some params like where sentence (or like, limit, etc), you must use a object like: 

``` js
let params = {where: 'id > 1 ', and: 'age > 10'}

```

**Examples with Select**

``` js
// This will get all the rows of my_table
mysql.select('my_table', null, null, (err, res, fields) => {
  if (err) throw err
  console.log(`Num results: ${res.length}`)
})

// This will get all the data with specific columns 
let columns = ['nombre', 'edad'] // Must be an array
mysql.select('my_table', columns, null, (err, res, fields) => {
  if (err) throw err
  console.log(`Num results: ${res.length}`)
})

// This will get all the data with specific columns and the params
let selectParams = {where: 'id_pruebas > 1'}
mysql.select('my_table', columns, selectParams, (err, res, fields) => {
      if (err) throw err
      console.log(`Num results: ${res.length}`) 
    })

```

**CRUD Mongogb**
After crud, you need create a schema and model:

``` js
// Basic schema, you can do more complex if you want
let schema = {name: String, age: Number, address: String}
let personSchema = mongodb.create(schema)
let PersonModel = mongodb.createModel('my_collection', itemSchema)
```

Using the previous example:

``` js
let doc = {name: 'Jason', age: 25, address: '7th. Street'}
const docModel = new PersonModel(doc)

mongoDb.save(docModel, (error, docStored) => {
  if (err) throw err
  console.log(docStored)
})

// You can get the id with the find method
let newValue = {age: 30}
mongoDb.updateById(docModel, '5873e9666e75a111102c073b', newValue, (err, doc) => {
  if (err) throw err
  console.log(doc)
})

// You can use other find method, explained below
mongoDb.findOne(docModel, (err, doc) => {
  if (err) throw err
  mongoDb.remove(doc, (err) => {
    if (err) throw err
  })
})

mongoDb.find(docModel, null, (err, docs) => {
  if (err) throw err
  console.log(docs)
})

// With params
mongoDb.find(docModel, {age: 30}, (err, docs) => {
  if (err) throw err
  console.log(docs)
})

mongoDb.findOne(docModel, (err, docs) => {
  if (err) throw err
  console.log(docs)
})

mongoDb.findById(docModel, '5873e9666e75a111102c073b', (err, docs) => {
  if (err) throw err
  console.log(docs)
})

```

**Close connection**

``` js

mysql.close()

// Or with callback

mysql.close(() => {
  // Do something you want
})

// Will print message in console 
mongoDb.close(() => {
})

```

## Motivation

I want to create a db library that you can use mysql or mongodb easily and in the same interface.

## Installation

```
npm install mysql-mongo-db --save
```

## License

MIT