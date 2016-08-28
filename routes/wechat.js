const router = require('koa-router')()

router.get('/', function *(next) {
    console.log(this.query)
    this.body = this.query.echostr
})

module.exports = router