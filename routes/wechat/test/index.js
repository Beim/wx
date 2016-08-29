const test = (args) => {
    return new Promise((resolve, reject) => {
        let body = [
            {
                title: 'test',
                description: 'test des',
                picurl: 'https://beim.github.io/images/hand_zheng.jpg',
                url: 'https://www.baidu.com/'
            }
        ]
        resolve(body)
    })
}

module.exports = test