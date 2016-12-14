const fs = require('fs')
const path = require('path')
const querystring = require('querystring')

const DB_PATH = path.resolve(__dirname, '../../dbs/urls.json')

const func = function *(args) {
    let shortUrl = querystring.unescape(args[1])
    if (shortUrl) {
        let data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'))
        let body = {}
        let patt = new RegExp(shortUrl)
        for (let i in data) {
            if (patt.test(i)) {
                body[i] = data[i]
            }
        }
        this.body = JSON.stringify(body, null, 4)

    } else {
        this.body = 'Empty pattern'
    }
}

module.exports = func
