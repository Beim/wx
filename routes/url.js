const router = require('koa-router')()
const fs = require('fs')
const path = require('path')

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
        let shortUrl = args[0]
        let longUrl = args[1]
        let description = args[2] ? args[2] : ''
        fs.readFile(DB_PATH, (err, data) => {
            if (err) throw err;
            data = JSON.parse(data)
            data[shortUrl] = {
                url: longUrl,
                description: description,
                clicks: 0
            }
            fs.writeFile(DB_PATH, JSON.stringify(data, null, 4))
        })
    }
    this.body = 'Hello World@123'
})

module.exports = router