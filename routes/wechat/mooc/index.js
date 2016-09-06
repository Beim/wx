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
        }
        // let body = [
        //     {
        //         title: 'test',
        //         description: 'test des',
        //         picurl: 'https://beim.github.io/images/hand_zheng.jpg',
        //         url: 'https://www.baidu.com/'
        //     },
        //     {
        //         title: 'test1',
        //         description: 'test1 des',
        //         picurl: 'https://beim.github.io/images/hand_zheng.jpg',
        //         url: 'https://www.baidu.com/'
        //     }
        // ]
        // resolve(body)
    })
}

module.exports = test