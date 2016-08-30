const fs = require('fs')
const path = require('path')

const DB_PATH = path.resolve(__dirname, '../../dbs/urls.json')

const func = function *(args) {
    let num = (parseInt(args[1]).toString() === 'NaN') ? 3 : parseInt(args[1])
    num = num > 10 ? 10 : num
    let data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'))
    let dataArr = []
    for (let i in data) {
        let obj = {}
        obj.shortUrl = i
        obj.longUrl = data[i].url
        obj.clicks = data[i].clicks
        dataArr.push(obj)
    }
    dataArr = dataArr.sort((a, b) => {
        return b.clicks - a.clicks
    }) 
    dataArr = dataArr.slice(0, num)
    this.body = JSON.stringify(dataArr, null, 4)
}

module.exports = func