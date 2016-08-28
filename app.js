const app = require('koa')()
const koaRouter = require('koa-router')()
const parser = require('koa-bodyparser')
const json = require('koa-json')
const path = require('path')
const wechat = require('co-wechat')
// const session = require('koa-session')
// const koaStatic = require('koa-static')

let wxx = wechat('beim').middleware(function *() {
    console.log('haha')
    let message = this.weixin
    console.log('message: ', message)
    this.body = 'hehe'
})

// *********start middwares******************
// // koa-session
// app.keys = ['secret', 'keys'] // key of session
// const opts = {
//     'maxAge': 60 * 60 * 1000
// }
// app.use(session(app, opts))
// // koa-static
// app.usr(koaStatic(path.join(__dirname, '/public')))
// koa-parser
// app.use(parser({
//     extendTypes: {
//         json: ['application/x-javascript']
//     }
// }))
// koa-json
// app.use(json())
// koa-router
// const routeOpts = require('./routes/config.json')
// for (let key in routeOpts) {
//     if (routeOpts.hasOwnProperty(key)) {
//         let elem = require('./routes/' + routeOpts[key])
//         koaRouter.use(key, elem.routes(), elem.allowedMethods())
//     }
// }
koaRouter.use(wxx)
app.use(koaRouter.routes())
// *********end middwares******************

module.exports = app