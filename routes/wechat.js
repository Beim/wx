const router = require('koa-router')()
const wechat = require('co-wechat')
const fs = require('fs')
const util  = require('./wechat/util.js')

router.post('/', wechat('beim').middleware(function *() {
    let message = this.weixin
    fs.writeFile('./log', JSON.stringify(message, null, 4) + '\n\n', {encoding: 'utf8', flag: 'a'})
    if (message.MsgType === 'text') {
        let arg = message.Content.split(' ')
        let parser = util.dispatch(arg[0])
        console.log(parser)
        if (parser) {
            arg.shift()
            parser(arg).then((res) => {
                this.body = res
            })
        } else {
            this.body = 'Hello World@'
        }
    }
    // this.body = [
    //     {
    //         title: 'haha',
    //         description: message.Content,
    //         picurl: 'http://img21.mtime.cn/pi/2011/04/04/161411.40182295_1000X1000.jpg',
    //         url: 'https://www.baidu.com/'
    //     }
    // ]
}))

module.exports = router