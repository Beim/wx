const path = require('path')
const fs = require('fs')
const http  =require('http')

const DB_PATH = path.resolve(__dirname, '../../../dbs/urls.json')

const parse = (args, data) => {
    args = args.split(';;')
    let res = null
    switch (args[0]) {
        case '-h':
            break;
        case '-s':
            data = JSON.parse(data)
            res = ''
            for (let i in data) {
                res += (i + ' \n' + data[i].url + ' \n' + data[i].description + '\n\n')
            }
            break;
        case '-t':
            data = JSON.parse(data)
            res = ''
            for (let i of data) {
                res += (i.shortUrl + ' \n' + i.longUrl + ' \n\n')
            }
            break;
        default:
            res = data
    }
    return res
}

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
            } else {
                res('Not found')
            }
        } else if (args.length > 1) {
            // e.g. url google https://www.google.com/
            args = args.join(';;')
            http.get(`http://localhost/url?${args}`, (response) => {
                response.setEncoding('utf8')
                let chunk = ''
                response.on('data', (c) => {
                    chunk += c
                })
                response.on('end', () => {
                    res(parse(args, chunk))
                })
            })
        }
    })
}

module.exports = url