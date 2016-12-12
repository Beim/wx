const http = require('http')
const util = require('./util.js')
const querystring = require('querystring')
const zlib = require('zlib')

const makeHeaders = (args) => {
    let commonHeaders = {
        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding':'gzip, deflate',
        'Accept-Language':'zh-CN,zh;q=0.8',
        'Cache-Control':'no-cache',
        'Connection':'keep-alive',
        // 'Host':'login.icourse163.org',
        'Origin':'http://www.icourse163.org',
        'Pragma':'no-cache',
        'Referer':'http://www.icourse163.org',
        'Upgrade-Insecure-Requests':'1',
        'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/51.0.2704.79 Chrome/51.0.2704.79 Safari/537.36',
    }
    for (let i in args) {
        commonHeaders[i] = args[i]
    }
    return commonHeaders
}

const login = (username, passwd) => {
    return new Promise((resolve, reject) => {
        const postData = {
            returnUrl: 'aHR0cDovL2ljb3Vyc2UxNjMub3JnLw==',
            failUrl: 'aHR0cDovL3d3dy5pY291cnNlMTYzLm9yZy9tZW1iZXIvbG9naW4uaHRtP2VtYWlsRW5jb2RlZD1PREExT1RBNE5EazVRSEZ4TG1OdmJRPT0=',
            savelogin: false,
            oauthType: '',
            username,
            passwd
        }
        const headers = makeHeaders({
            'Content-Length': Buffer.byteLength(querystring.stringify(postData)),
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host':'login.icourse163.org',
        })
        const options = {
            hostname: 'login.icourse163.org',
            path: '/reg/icourseLogin.do',
            method: 'POST',
            headers
        }
        let req = http.request(options, (response) => {
            // let resH = util.parseHeader(response.rawHeaders)
            // console.log(resH)
            let session = util.parseCookie(response.rawHeaders)
            resolve(session)

            let data = []
            response.on('data', (c) => {data.push(c)})
            response.on('end', () => {
                // let buf = Buffer.concat(data)
                // zlib.gunzip(buf, (err, result) => {
                //     if (err) console.log(err)
                // })
            })
        })
        req.write(querystring.stringify(postData))
        req.end()
    })
}

const visitMainPage = (session) => {
    return new Promise((resolve, reject) => {
        let Cookie = util.stringifyCookie(session)
        const headers = makeHeaders({
            Cookie,
            Host: 'www.icourse163.org',
            'Referer': 'http://www.icourse163.org/home/htm'
        })
        delete headers['Origin']
        const options = {
            hostname: 'www.icourse163.org',
            path: '/learn/hit-154005?tid=1001690016',
            method: 'GET',
            headers
        }
        let req = http.request(options, (response) => {
            let cookie = util.parseCookie(response.rawHeaders)
            session = util.updateCookie(session, cookie)
            let data = []
            response.on('data', (c) => {data.push(c)})
            response.on('end', () => {
                let buf = Buffer.concat(data)
                zlib.gunzip(buf, (err, result) => {
                    if (err) console.log(err)
                    resolve(result.toString())
                })
            })

        })
        req.end()
    })
}

const setActivity = (session) => {
    return new Promise((resolve, reject) => {
        util.print(session)
        const Cookie = util.stringifyCookie(session)
        let postData = {
            callCount: 1,
            scriptSessionId: '${scriptSessionId}190',
            httpSessionId: session.NTESSTUDYSI,
            'c0-scripName': 'CommonBean',
            'c0-methodName': 'obtain',
            // 'c0-scriptName': 'MemberBean',
            // 'c0-methodName': 'checkEmailStatus',
            'c0-id': 0,
            'c0-param0': 'string:MoocLogo',
            batchId: new Date().getTime()
        }
        let strData = util.stringifyPostData(postData)
        const headers = makeHeaders({
            'Accept': '*/*',
            'Content-Length': Buffer.byteLength(strData),
            'Content-Type': 'text/plain',
            Cookie,
            // Referer: 'http://www.icourse163.org/learn/hit-154005?tid=1001690016',
            Referer: 'http://www.icourse163.org/member/login.htm?emailEncoded=ODA1OTA4NDk5QHFxLmNvbQ==&returnUrl=aHR0cDovL3d3dy5pY291cnNlMTYzLm9yZy9pbmRleC5odG0=&oauthType=undefined&errorCode=-1',
            Host: 'www.icourse163.org'
        })
        delete headers['Upgrade-Insecure-Requests']
        util.print(headers)
        const options = {
            hostname: 'www.icourse163.org',
            path: '/dwr/call/plaincall/CommonBean.obtain.dwr',
            method: 'POST',
            headers
        }
        let req = http.request(options, (response) => {
            let cookie = util.parseCookie(response.rawHeaders)
            session = util.updateCookie(session, cookie)
            let data = []
            response.on('data', (c) => {data.push(c)})
            response.on('end', () => {
                let buf = Buffer.concat(data)
                zlib.gunzip(buf, (err, result) => {
                    if (err) console.log(err)
                    resolve([result.toString(), session])
                })
            })
        })
        req.write(strData)
        req.end()


    })
}

const getMoocAnnounce = (session) => {
    return new Promise((resolve, reject) => {
        const Cookie = util.stringifyCookie(session)
        const time = new Date().getTime()
        let postData = {
            callCount: 1,
            scriptSessionId: '${scriptSessionId}190',
            httpSessionId: session.NTESSTUDYSI,
            'c0-scriptName': 'CourseBean',
            'c0-methodName': 'getAllAnnouncementByTerm',
            'c0-id': 0,
            'c0-param0': 'number:1001690016',
            'c0-param1': 'number:1',
            'batchId': time
        }
        let strData = util.stringifyPostData(postData)

        const headers = makeHeaders({
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Content-Length': Buffer.byteLength(strData),
            'Content-Type': 'text/plain;charset=UTF-8',
            Cookie,
            Referer: 'http://www.icourse163.org/learn/hit-154005?tid=1001690016',
            Host: 'www.icourse163.org'
        })
        delete headers['Upgrade-Insecure-Requests']
        const options = {
            hostname: 'www.icourse163.org',
            path: '/dwr/call/plaincall/CourseBean.getAllAnnouncementByTerm.dwr',
            method: 'POST',
            headers
        }
        let req = http.request(options, (response) => {
            let cookie = util.parseCookie(response.rawHeaders)
            session = util.updateCookie(session, cookie)
            let data = []
            response.on('data', (c) => {data.push(c)})
            response.on('end', () => {
                let buf = Buffer.concat(data)
                zlib.gunzip(buf, (err, result) => {
                    if (err) console.log(err)
                    resolve(result.toString())
                })
            })
        })
        req.write(strData)
        req.end()
    })
}


const getSpocAnnounce = (session) => {
    return new Promise((resolve, reject) => {
        const Cookie = util.stringifyCookie(session)
        const time = new Date().getTime()
        let postData = {
            callCount: 1,
            scriptSessionId: '${scriptSessionId}190',
            httpSessionId: session.NTESSTUDYSI,
            'c0-scriptName': 'CourseBean',
            'c0-methodName': 'getAllAnnouncementByTerm',
            'c0-id': 0,
            'c0-param0': 'number:1001807012',
            'c0-param1': 'number:1',
            'batchId': time
        }
        let strData = util.stringifyPostData(postData)

        const headers = makeHeaders({
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Content-Length': Buffer.byteLength(strData),
            'Content-Type': 'text/plain;charset=UTF-8',
            Cookie,
            Referer: 'http://www.icourse163.org/learn/hit-1001720004?tid=1001807012',
            Host: 'www.icourse163.org'
        })
        delete headers['Upgrade-Insecure-Requests']
        const options = {
            hostname: 'www.icourse163.org',
            path: '/dwr/call/plaincall/CourseBean.getAllAnnouncementByTerm.dwr',
            method: 'POST',
            headers
        }
        let req = http.request(options, (response) => {
            let cookie = util.parseCookie(response.rawHeaders)
            session = util.updateCookie(session, cookie)
            let data = []
            response.on('data', (c) => {data.push(c)})
            response.on('end', () => {
                let buf = Buffer.concat(data)
                zlib.gunzip(buf, (err, result) => {
                    if (err) console.log(err)
                    resolve(result.toString())
                })
            })
        })
        req.write(strData)
        req.end()
    })
}

const getAnnounces = (flag) => {
    let func = getMoocAnnounce
    if (flag === 1) {
        func = getSpocAnnounce
    }
    return new Promise((resolve, reject) => {
        util.run(function *() {
            try {
                // cookie = yield login('964873559@qq.com', '13669094224')
                let session = yield login('805908499@qq.com', '112223334')
                yield visitMainPage(session)
                let result = yield func(session)
                result = util.decode(result)
                let arr = util.parseAnnounce(result)
                // for (let i in arr) {
                //     arr[i].data = util.parsePtoN(arr[i].data)
                // } 
                resolve(arr)
            } catch (e) {
                reject(e)
                console.log(e)
            }
        })
    })
}

const getMoocAnnounces = () => {
    return getAnnounces(0)
}

const getSpocAnnounces = () => {
    return getAnnounces(1)
}


module.exports = {
    // login,
    // visitMainPage,
    // getMoocAnnounce,
    // getSpocAnnounce,
    // setActivity
    getMoocAnnounces,
    getSpocAnnounces
}