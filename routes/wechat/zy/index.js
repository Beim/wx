const http = require('http')

const getIP = () => {
    return new Promise((resolve, reject) => {
        http.get('http://localhost/zy', (res) => {
            res.setEncoding('utf8')
            let data = ''
            res.on('data', (c) => {data += c})
            res.on('end', () => {
                resolve(JSON.parse(data))
            })
        })
    })
}

const parseIP = (ip, data) => {
    let patt = new RegExp(ip)
    let res = null
    for (let i in data) {
        if (patt.test(data[i].ip)) {
            res = {
                index: i,
                ip,
                num: data[i].num
            }
        }
    }
    return res
}

const parseNum = (num, data) => {
    let res = null
    for (let i in data) {
        if (data[i].num == num) {
            res = {
                index: i,
                ip: data[i].ip,
                num
            }
            break
        }
    }
    return res
}

const zy = (args) => {
    return new Promise((resolve ,reject) => {
        getIP().then((data) => {
            if (args.length === 0) {
                resolve(JSON.stringify(data, null, 4))
            } else if (args.length === 1) {
                let num = args[0]
                let res = parseNum(num, data)
                if (res) {
                    resolve(JSON.stringify(res, null, 4))
                } else {
                    resolve('未查找到对应编号')
                }
            } else if (args.length === 2) {
                if (args[0] == 'num') {
                    let num = args[1]
                    let res = parseNum(num, data)
                    if (res) {
                        resolve(JSON.stringify(res, null, 4))
                    } else {
                        resolve('未查找到对应编号')
                    }
                } else if (args[0] == 'ip') {
                    let ip = args[1]
                    let res = parseIP(ip, data)
                    if (res) {
                        resolve(JSON.stringify(res, null, 4))
                    } else {
                        resolve('未查找到对应ip')
                    }
                } else if (args[0] == 'city') {
                    
                }
            } else if (args.length === 3) {
                
            } else {
                resolve('请正确输入参数')
            }
        })
    })
}

const biliload = (args) => {
    return new Promise((resolve, reject) => {
        if (args.length === 1) {
            http.get('http://localhost/biliload/' + args[0], (response) => {
                response.setEncoding('utf8')
                let chunk = ''
                response.on('data', (c) => {
                    chunk += c
                })
                response.on('end', () => {
                    let result = JSON.parse(chunk)
                    if (result.flag) {
                        http.get('http://localhost/url?bilishare;;' + result.href)
                        let str = result.heading + '\n\n' + 'av号: ' + result.avnum + '\n\n' + result.info + '\n' + result.href + '\n\n或(非永久) \nhttp://beim.site/url/bilishare ' 
                        resolve(str)
                    } else {
                        resolve('Failed to parse@')
                    }
                })
            })
        }
    })
}

module.exports = zy
