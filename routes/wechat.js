const router = require('koa-router')()

router.get('/', function *(next) {
    console.log(this.query)
    this.body = 'hello'
})

module.exports = router