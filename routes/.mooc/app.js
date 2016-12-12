const fs = require('fs')
const path = require('fs')
const util = require('./util.js')
const request = require('./request.js')

request.getMoocAnnounces().then((res) => {
    console.log(res)
})