const router = require('koa-router')()
const wechat = require('co-wechat')

router.post('/', wechat('beim').middleware(function *() {
    console.log(this)
    let message = this.weixin
    console.log('message: ', message)
    this.body = 'hahahaha'
}))

module.exports = router