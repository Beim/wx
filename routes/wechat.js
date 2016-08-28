const router = require('koa-router')()
const wechat = require('co-wechat')

router.post('/', wechat('beim').middleware(function *() {
    let message = this.weixin
    console.log('message: ', message)
    // this.body = 'hahahaha'
    this.body = [
        {
            title: 'haha',
            description: 'gfs',
            picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
            url: 'https://www.baidu.com/'
        }
    ]
}))

module.exports = router