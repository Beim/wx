const router = require('koa-router')()

router.get('/', function *(next) {
    this.body = 'HELO I\'m beim\n\nwechat: beiming945\n\nemail: beim2015@outlook.com\n\nblog: http://blog.beim.site/\n\ngithub: https://github.com/Beim\n\nshowURL service: http://beim.site/url/'
})

module.exports = router
