const users = require('../dbs/users')

async function wowzaIp(req, reply) {
    await users
        .findOneAndUpdate({ username: req.body.username }, { $push: { ips: req.headers.host } })
        .then(() => {
            reply.send({
                code: 20000,
                msg: 'Success',
                err: 'Null',
                cb: {}
            })
        }, err => {
            reply.send({
                code: 50000,
                msg: 'UnKnow-Error',
                err: err.message,
                cb: {}
            })
        })
}

module.exports = { wowzaIp }