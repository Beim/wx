const router = require('koa-router')()
const wechat = require('co-wechat')

// router.use(wechat('beim').middleware(function *() {
//     console.log(this)
//     let message = this.weixin
//     console.log('message: ', message)
//     this.body = 'here'
// }))

router.get('/', function *(next) {
    console.log(this.query)
    this.body = 'hello'
})

router.post('/', wechat('beim').middleware(function *() {
    console.log(this)
    let message = this.weixin
    console.log('message: ', message)
    this.body = 'hahahaha'
}))

// router.post('/', function *(next) {
//     this.use(wechat('beim').middleware(function *() {
//         console.log(this)
//         let message = this.weixin
//         console.log('message: ', message)
//         this.body = 'here'
//     }))
    
// })

module.exports = router