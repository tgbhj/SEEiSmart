const users = require('../dbs/users')
const crypto = require('crypto')
const codes = require('../dbs/codes')
const account = require('../dbs/account')

async function addSubAccount(req, reply) {
    req.body.password = crypto.createHash('md5').update(req.body.password + ':adinno').digest('hex')
    await users
        .findOne({ username: req.user })
        .then(async user => {
            if (user != null) {
                await account
                    .findOne({ phone: req.body.phone })
                    .then(async cb => {
                        if (cb != null) {
                            reply.send({
                                code: 50011,
                                msg: '账号已存在',
                                err: 'Null',
                                cb: {}
                            })
                        } else {
                            await new account({
                                phone: req.body.phone,
                                password: req.body.password,
                                user: user._id,
                                code: req.body.codeId
                            }).save(async (err, subAccount) => {
                                if (subAccount != null) {
                                    await codes
                                        .findByIdAndUpdate({ _id: req.body.codeId }, { $set: { subAccount: subAccount._id, bind: 1 } })
                                        .then(async cb => {
                                            if (cb != null) {
                                                await users
                                                    .findOneAndUpdate({ username: user.username }, { $push: { subAccount: subAccount._id } })
                                                    .then(cb => {
                                                        if (cb != null) {
                                                            reply.send({
                                                                code: 20000,
                                                                msg: 'Success',
                                                                err: 'Null',
                                                                cb: {}
                                                            })
                                                        } else {
                                                            reply.send({
                                                                code: 50005,
                                                                msg: '账号不存在',
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
                                            } else {
                                                reply.send({
                                                    code: 50000,
                                                    msg: 'UnKnow-Error',
                                                    err: err.message,
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
                                } else {
                                    reply.send({
                                        code: 50000,
                                        msg: 'UnKnow-Error',
                                        err: err.message,
                                        cb: {}
                                    })
                                }
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
            } else {
                reply.send({
                    code: 50005,
                    msg: '账号不存在',
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

async function subAccountLogin(req, reply) {
    req.body.password = crypto.createHash('md5').update(req.body.password + ':adinno').digest('hex')
    let subAccount = await account.findOne({
        phone: req.body.phone,
        password: req.body.password
    }).populate('code').then()
    if (subAccount != null) {
        const token = await reply.jwtSign(req.body.phone)
        reply.send({
            code: 20000,
            msg: 'Success',
            err: 'Null',
            cb: {
                token: token,
                streamId: subAccount.code._id,
                code: subAccount.code.code,
                expireDate: subAccount.code.expireDate
            }
        })
    } else {
        reply.send({
            code: 50004,
            msg: '账号或密码错误',
            err: 'Null',
            cb: {}
        })
    }
}

async function delSubAccount(req, reply) {
    await users
        .findOneAndUpdate({ username: req.user }, { $pull: { subAccount: req.body.subAccountId } })
        .then(async cb => {
            if (cb != null) {
                await account
                    .findById({ _id: req.body.subAccountId })
                    .then(async cb => {
                        if (cb.code != null) {
                            await account
                                .deleteOne({ _id: req.body.subAccountId })
                                .then(async cb => {
                                    if (cb != null) {
                                        await codes
                                            .findOneAndUpdate({ subAccount: req.body.subAccountId }, { $unset: { subAccount: req.body.subAccountId } })
                                            .then(cb => {
                                                if (cb != null) {
                                                    reply.send({
                                                        code: 20000,
                                                        msg: 'Success',
                                                        err: 'Null',
                                                        cb: {}
                                                    })
                                                } else {
                                                    reply.send({
                                                        code: 50000,
                                                        msg: 'UnKnow-Error',
                                                        err: err.message,
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
                                    } else {
                                        reply.send({
                                            code: 50000,
                                            msg: 'UnKnow-Error',
                                            err: err.message,
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
                        } else {
                            await account
                                .deleteOne({ _id: req.body.subAccountId })
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
                    }, err => {
                        reply.send({
                            code: 50000,
                            msg: 'UnKnow-Error',
                            err: err.message,
                            cb: {}
                        })
                    })
            } else {
                reply.send({
                    code: 50000,
                    msg: 'UnKnow-Error',
                    err: err.message,
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

async function wowzaIps(req, reply) {
    await account
        .findOne({ phone: req.user })
        .then(async subAccount => {
            if (subAccount != null) {
                await codes
                    .findOneAndUpdate({ _id: subAccount.code }, { $set: { title: req.body.title } })
                    .then(async cb => {
                        if (cb != null) {
                            await account
                                .findOne({ phone: subAccount.phone })
                                .populate('user')
                                .then(cb => {
                                    if (cb != null) {
                                        reply.send({
                                            code: 20000,
                                            msg: 'Success',
                                            err: 'Null',
                                            cb: {
                                                ip: cb.user.ips[0],
                                                cloudAddress: cb.user.cloudAddress[0]
                                            }
                                        })
                                    } else {
                                        reply.send({
                                            code: 50005,
                                            msg: '账号不存在',
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
                        } else {
                            reply.send({
                                code: 50000,
                                msg: 'UnKnow-Error',
                                err: err.message,
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
            } else {
                reply.send({
                    code: 50005,
                    msg: '账号不存在',
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

module.exports = { addSubAccount, subAccountLogin, delSubAccount, wowzaIps }