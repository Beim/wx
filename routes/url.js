const router = require('koa-router')()
const fs = require('fs')
const path = require('path')

const DB_PATH = path.resolve(__dirname, '../dbs/urls.json')

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

router.get('/', function *(next) {
    this.body = 'Hello World@'
})

module.exports = router