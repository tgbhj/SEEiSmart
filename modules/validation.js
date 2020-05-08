const users = require('../dbs/users')

async function userValidation(req, reply) {
    try {
        await req.jwtVerify(req.headers['authorization'])
    } catch (err) {
        switch (err.message) {
            case 'Format is Authorization: Bearer [token]':
                reply.send({
                    code: 50007,
                    msg: '格式错误',
                    err: err.message,
                    cb: {}
                })
                break
            case 'Authorization token is invalid: invalid token':
                reply.send({
                    code: 50008,
                    msg: 'Token错误',
                    err: err.message,
                    cb: {}
                })
                break
            case 'No Authorization was found in request.headers':
                reply.send({
                    code: 50010,
                    msg: '缺少Authorization参数',
                    err: err.message,
                    cb: {}
                })
                break
            case 'Authorization token is invalid: invalid signature':
                reply.send({
                    code: 50012,
                    msg: '无效的签名',
                    err: err.message,
                    cb: {}
                })
                break
            case 'Authorization token is invalid: jwt malformed':
                reply.send({
                    code: 50013,
                    msg: 'jwt异常',
                    err: err.message,
                    cb: {}
                })
                break
            default:
                reply.send({
                    code: 50000,
                    msg: 'UnKnow-Error',
                    err: err.message,
                    cb: {}
                })
        }
    }
}

async function authority(req, reply) {
    await users
        .findOne({ username: req.user, admin: 2 })
        .then(cb => {
            if (cb != null) {
                req.authority = 1
            } else {
                reply.send({
                    code: 50009,
                    msg: '权限不足',
                    err: 'Null',
                    cb: {}
                })
            }
        }, err => {
            reply.send({
                code: 50000,
                msg: 'UnKnow-Error',
                err: err.message,
                cb: {}
            })
        })
}

module.exports = { userValidation, authority }