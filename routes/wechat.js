const router = require('koa-router')()
const wechat = require('co-wechat')

router.post('/', wechat('beim').middleware(function *() {
    let message = this.weixin
    console.log('message: ', message)
    // this.body = 'hahahaha'
    this.body = [
        {
            title: 'haha',
            description: message,
            picurl: 'http://img21.mtime.cn/pi/2011/04/04/161411.40182295_1000X1000.jpg',
            url: 'https://www.baidu.com/'
        }
    ]
}))

module.exports = router