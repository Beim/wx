const util = require('./mooc/util.js')
const request = require('./mooc/request.js')
const fs = require('fs')
const path = require('path')
const mailer = require('./mooc/mailer.js')

let initData = require(path.resolve(__dirname, '../dbs/moocDb.json'))[0]

const sendData = (data) => {
    let t = new Date(parseInt(data.publish))    
    data = `${data.data}</br>${t.toLocaleString()}`
    console.log(data)
    let users = fs.readFileSync(path.resolve(__dirname, '../dbs/moocUser.json'))
    users = JSON.parse(users)
    mailer.sendData(data, users)
}

setInterval(() => {
    util.run(function *() {
        try {
            let res = yield request.getMoocAnnounces()
            res.sort((a, b) => {
                return b.publish - a.publish
            })
            fs.writeFileSync(path.resolve(__dirname, '../dbs/moocDb.json'), JSON.stringify(res, null, 4))
            if (initData.publish && parseInt(res[0].publish) > parseInt(initData.publish)) {
                initData = res[0]
                sendData(res[0])
            }
        } catch (e) {
            console.log(e)
        }
    })
}, 1000 * 1)
