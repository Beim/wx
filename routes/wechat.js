const router = require('koa-router')()
const wechat = require('co-wechat')
const fs = require('fs')
const util  = require('./wechat/util.js')

router.post('/', wechat('beim').middleware(function *() {
    let message = this.weixin
    // 消息日志
    fs.writeFile('./log', JSON.stringify(message, null, 4) + '\n\n', {encoding: 'utf8', flag: 'a'})
    if (message.MsgType === 'text') {
        let arg = message.Content.split(' ')
        let parser = util.dispatch(arg[0])
        if (parser) {
            arg.shift()
            this.body = yield parser(arg)
        } else {
            this.body = 'Hello World@'
        }
    }
}))

module.exports = router