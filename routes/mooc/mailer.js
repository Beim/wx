const mailer = require('nodemailer')

const sendData = (data, users) => {
    let to = ''
    for (let i of users) {
        to += i + ', ' 
    }
    to = to.slice(0, -2)
    // console.log(to)
    let transporter = mailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 25,
        // port: 587,
        // secure: true,
        auth: {
            user: 'beim2015@outlook.com',
            pass: 'giveup999'
        }
    })
    let mailOptions = {
        from: 'beim2015@outlook.com',
        to,
        subject: 'Mooc 新公告',
        html: data
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Message sent: ', info.response)
        }
    })
}

// sendData('test', ['805908499@qq.com', 'beim2015@outlook.com', 'beiming945@gmail.com'])

module.exports = {
    sendData
}
