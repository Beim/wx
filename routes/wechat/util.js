const path = require('path')
const dispatchConfig = require(path.resolve(__dirname, '../../config/dispatch.json'))

const dispatch = (arg) => {
    if (dispatchConfig[arg]) {
        return require(path.resolve(__dirname, dispatchConfig[arg]))
    }
}

exports.dispatch = dispatch