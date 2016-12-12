const path = require('path')
const router = require('koa-router')()
const serve = require('koa-router-static')

// static file
router.get('/*', serve(path.join(__dirname, 'getup/public')))

router.get('/', function *(next) {
    this.body = 'hello, try to getUp !'
})

module.exports = router
