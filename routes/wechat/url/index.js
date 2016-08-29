const path = require('path')
const fs = require('fs')
const http  =require('http')

const DB_PATH = path.resolve(__dirname, '../../../dbs/urls.json')

const url = (args) => {
    return new Promise((res, rej) => {
        let data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'))
        if (args.length === 0) {
            // e.g. url
            res('list all urls')
        } else if (args.length === 1) {
            // e.g. url google
            let info = data[args[0]]
            if (info) {
                info.clicks += 1
                fs.writeFile(DB_PATH, JSON.stringify(data, null, 4))
                res(info.url)
            }
        } else if (args.length > 1) {
            // e.g. url google https://www.google.com/
            http.get(`http://localhost/url?${args[0]};;${args[1]}`)
            res('ok')
        }
    })
}

module.exports = url