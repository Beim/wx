const fs = require('fs')
const path = require('path')
const querystring = require('querystring')

const DB_PATH = path.resolve(__dirname, '../../dbs/urls.json')
const patt = new RegExp('http')

const func = function *(args) {
    let shortUrl = querystring.unescape(args[0])
    let longUrl = args[1]
    if (!patt.test(longUrl))
        longUrl = 'http://' + longUrl
    let description = args[2] ? args[2] : ''
    let body = yield new Promise((resolve, reject) => {
        fs.readFile(DB_PATH, (err, data) => {
            if (err) throw err;
            data = JSON.parse(data)
            data[shortUrl] = {
                url: longUrl,
                description: description,
                clicks: 0
            }
            fs.writeFile(DB_PATH, JSON.stringify(data, null, 4), (err) => {
                if (err) console.log(err)
            })
            resolve(`设置成功\n ${args[0]} ${args[1]}`)
        })
    })
    this.body = body

}

module.exports = func
