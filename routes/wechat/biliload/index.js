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
                        http.get('http://localhost/url?bilishare;;' + result.href)
                        let str = result.heading + '\n\n' + 'av号: ' + result.avnum + '\n\n' + result.info + '\n' + result.href + '\n或 \nhttp://beim.site/url/bilishare \n(非永久)' 
                        resolve(str)
                    } else {
                        resolve('Failed to parse@')
                    }
                })
            })
        }
    })
}

module.exports = biliload