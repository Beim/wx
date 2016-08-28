const router = require('koa-router')()

router.get('/', function *(next) {
    console.log(this.query)
    this.body = 'Hello World@'
})

module.exports = router