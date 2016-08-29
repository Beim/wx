const func = function (args) {
        let shortUrl = args[0]
        let longUrl = args[1]
        let description = args[2] ? args[2] : ''
        let body = yield new Promise((resolve, reject) => {
            fs.readFile(DB_PATH, (err, data) => {
                if (err) throw err;
                data = JSON.parse(data)
                data[shortUrl] = {
                    url: longUrl,
                    description: description,
                    clicks: 0
                }
                fs.writeFile(DB_PATH, JSON.stringify(data, null, 4))
                resolve(`设置成功\n ${args[0]} ${args[1]}`)
            })
        })
        this.body = body

}

module.exports = func
