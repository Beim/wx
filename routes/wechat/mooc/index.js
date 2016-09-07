const fs = require('fs')
const path = require('path')

const DB = path.resolve(__dirname, '../../../dbs/moocUser.json')

const test = (args) => {
    return new Promise((resolve, reject) => {
        if (args.length === 0) {
            resolve('请输入参数：')
        } else if (args.length === 1) {
            let users = fs.readFileSync(DB)
            users = JSON.parse(users)
            if (users.indexOf(args[0]) < 0) {
                users.push(args[0])
                fs.writeFileSync(DB, JSON.stringify(users, null, 4))
                let body = '添加通知： ' + args[0]
                resolve(body)
            } else {
                resolve('邮箱重复')
            }
        } else if (args.length === 2) {
            if (args[0] === '-d') {
                let users = fs.readFileSync(DB)
                users = JSON.parse(users)
                if (users.indexOf(args[1]) < 0) {
                    resolve('邮箱不存在')
                } else {
                    users = users.filter((elem) => {
                        return elem !== args[1]
                    })
                    resolve('删除成功')
                }
            }
        }
    })
}

module.exports = test