const fs = require('fs')
const path = require('path')
const DB = path.resolve(__dirname, './db.json')
let str = '[]'
fs.writeFile(DB, str)
