const router = require('koa-router')()

router.get('/', function *(next) {
    console.log('here wx come')
    this.body = 'Hello World@'
})

module.exports = router