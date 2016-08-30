const router = require('koa-router')()
const http = require('http')
const cheerio = require('cheerio')

const getUrl = (avnum) => {
    const URL = 'http://www.ibilibili.com/video/av'
    return URL + parseInt(avnum)
}

router.get('/', function *(next) {
    this.body = 'Hello World@'
})

router.get('/:avnum', function *(next) {
    let url = getUrl(this.params.avnum)
    // 抓取网页内容
    let body = yield new Promise((res, rej) => {
        http.get(url, (response) => {
            response.setEncoding('utf8')
            let chunk = ''
            response.on('data', (c) => {
                chunk += c
            })
            response.on('end', () => {
                res(chunk)
            })
        })    
    })
    // 解析出下载链接
    let $ = cheerio.load(body)
    let downloadTag = $('#download a')[2]
    let headingTag = $('.media .media-heading').text()
    if (downloadTag && headingTag) {
        let body = {
            flag: true,
            heading: headingTag,
            avnum: this.params.avnum,
            href: downloadTag.attribs.href,
            info: downloadTag.children[0].data
        }
        this.body = JSON.stringify(body, null, 4)
    } else {
        let body = {
            flag: false
        }
        this.body = JSON.stringify(body, null, 4)
    }
})

module.exports = router