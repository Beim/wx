const path = require('path')
const fs = require('fs')

const DB_PATH = path.resolve(__dirname, '../../../dbs/urls.json')

const url = (args) => {
    return new Promise((res, rej) => {
        // e.g. url
        if (args.length === 0) {
            res('list all urls')
        } else if (args.length === 1) {
            let data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'))
            let info = data[args[0]]
            if (info) {
                info.clicks += 1
                fs.writeFile(DB_PATH, JSON.stringify(data, null, 4))
                res(info.url)
            }
        } else if (args.length > 1) {

        }
    })
}

module.exports = url