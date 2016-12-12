const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const DB = path.resolve(__dirname, './zy/db.json')

const saveIP = (ip, num) => {
    const db = JSON.parse(fs.readFileSync(DB))
    let isSame = false
    for (let item of db) {
        if (item.ip == ip && item.num == num) {
            isSame = true
            break
        }
    }
    if (!isSame) {
        db.push({ip, num})
        fs.writeFileSync(DB, JSON.stringify(db, null, 4))
    } 
}

const getIP = () => {
    const db = JSON.parse(fs.readFileSync(DB))
    return JSON.stringify(db, null, 4)
}

router.get('/', function *(next) {
    let db = getIP()
    this.body = db
})

router.get('/:num', function *(next) {
    const ip = this.ip
    const num = this.params.num
    saveIP(ip, num)
    this.body = 'hhhh'
})

module.exports = router
