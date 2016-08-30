const http = require('http')

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
                        let str = 'av号: ' + args[0] + '\n' + result.info + '\n' + result.href
                        res(str)
                    } else {
                        res('Failed to parse@')
                    }
                })
            })
        }
    })
}

module.exports = biliload