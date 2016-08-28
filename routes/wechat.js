const router = require('koa-router')()

router.get('/', function *(next) {
    console.log(this.query)
    this.body = 'hello'
})

router.post('/', function *(next) {
    console.log(this.request.body)
    this.body = 'hello post'
})

module.exports = router