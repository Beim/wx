const parseCookie = (rawHeader) => {
    let flag = false
    let result = rawHeader.reduce((total, curr) => {
        if (!flag && curr === 'Set-Cookie') {
            flag = true
        } else if (flag) {
            let cookie = curr.split(';')[0].split('=')
            let key = cookie.shift()
            let value = cookie.join('=')
            total[key] = value
            flag = false
        }
        return total
    }, {})
    return result
}

const stringifyCookie = (cookie) => {
    let res = ''
    for (let i in cookie) {
        res += `${i}=${cookie[i]}; `
    }
    return res.slice(0, -2)
}

const parseHeader = (rawHeader) => {
    let flag = false
    let result = {}
    for (let i = 0; i < rawHeader.length; i += 2) {
        if (!result[rawHeader[i]]) {
            result[rawHeader[i]] = rawHeader[i+1]
        } else {
            if (typeof result[rawHeader[i]] !== 'string') {
                result[rawHeader[i]].push(rawHeader[i+1])
            } else {
                result[rawHeader[i]] = [result[rawHeader[i]], rawHeader[i+1]]
            }
        }
    }
    return result
}

const updateCookie = (curr, next) => {
    for (let i in next) {
        if (next[i] !== '') {
            curr[i] = next[i]
        }
    }
    return curr
}

const run = (gen) => {
    let g = gen()
    let next = (data) => {
        let result = g.next(data)
        // if (result.done) return result.value;
        if (result.done) return ;
        result.value.then((data) => {
            next(data)
        })
    }
    next()
}

const print = (obj) => {
    if (typeof obj === 'object') 
        console.log(JSON.stringify(obj, null, 4))
    else 
        console.log(obj)
}

const stringifyPostData = (postData) => {
    let strData = ``
    for (let i in postData) {
        strData += `${i}=${postData[i]}\n`
        // strData = strData + i.toString() + '=' + postData[i].toString() + '\n'
    }
    strData = strData.slice(0, -1)
    // strData += '\r'
    return strData
}

const parseAnnounce = (raw) => {
    let resArr = []
    while (true) {
        let res1 = raw.search(/content="/)
        let res2 = raw.search(/<\/p>";/)
        let res3 = raw.search(/publishTime/)
        if (res1 > -1 && res2 > -1) {
            let data = raw.slice(res1 + 9, res2) + '</p>'
            let publish = raw.slice(res3 + 12, res3 + 25)
            raw = raw.slice(res3 + 25)
            resArr.push({
                publish,
                data
            })
        } else {
            break;
        } 
    }
    return resArr
}

const decode = (str) => {
    return unescape(str.replace(/\\(u[0-9a-fA-F]{4})/gm, '%$1'))
}

const parsePtoN = (str) => {
    str = str.replace(/(<p>|<br\/>)/gm, '')
    str = str.replace(/<\/p>/gm, '\n')
    str = str.replace(/\&nbsp;/gm, ' ')
    return str
}

module.exports = {
    parseCookie,
    stringifyCookie,
    parseHeader,
    updateCookie,
    print,
    run,
    stringifyPostData,
    parseAnnounce,
    decode,
    parsePtoN
}