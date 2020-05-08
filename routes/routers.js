const admin = require('./admin')
const user = require('./user')
const stream = require('./stream')
const account = require('./account')
const os = require('./os')
const apk = require('./apk')
const yitu = require('./yitu')
const upload = require('./upload')

const routers = [
    {
        prefix: '/api',
        routes: admin
    },
    {
        prefix: '/api',
        routes: user
    },
    {
        prefix: '/api',
        routes: stream
    },
    {
        prefix: '/api',
        routes: account
    },
    {
        prefix: '/api',
        routes: os
    },
    {
        prefix: '/api',
        routes: apk
    },
    {
        prefix: '/api',
        routes: yitu
    },
    {
        prefix: '/api',
        routes: upload
    }
]

module.exports = routers