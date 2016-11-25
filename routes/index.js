const router = require('koa-router')()

router.get('/', function *(next) {
    this.body = 'HELO Im beim\n email: beim2015@outlook.com'
})

module.exports = router
