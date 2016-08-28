const router = require('koa-router')()
const wechat = require('co-wechat')

router.get('/', function *(next) {
    console.log(this.query)
    this.body = 'hello'
})

router.post('/', function *(next) {
    console.log(this.app)
    this.app.use(wechat('beim').middleware(function *() {
        let message = this.weixin
        console.log('message: ', message)
        this.body = 'here'
    }))
})

module.exports = router