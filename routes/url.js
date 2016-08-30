const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const def = require('./url/default.js')
const search = require('./url/search.js')
const top = require('./url/top.js')
const help = require('./url/help.js')

const DB_PATH = path.resolve(__dirname, '../dbs/urls.json')

// 直接重定向到对应url
router.get('/:shortUrl', function *(next) {
    let shortUrl = this.params.shortUrl
    let data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'))
    if (data[shortUrl]) {
        data[shortUrl].clicks += 1
        fs.writeFile(DB_PATH, JSON.stringify(data, null, 4)) 
        this.redirect(data[shortUrl].url)
    } else {
        this.body = 'ERROR@'
    }
})

// 匹配, 用来设置url, 如 GET localhost/url?baidu;;www.baidu.com
router.get('/', function *(next) {
    let args = this.querystring.split(';;')
    if (args.length > 1) {
        switch (args[0]) {
            case '-h':
                yield help.call(this, args)
                break;
            case '-s':
                yield search.call(this, args)
                break;
            case '-t':
                yield top.call(this, args)
                break;
            default:
                yield def.call(this, args)
        }
    } else {
        this.body = 'ERROR@'
    }
})

module.exports = router