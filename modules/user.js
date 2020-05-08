const users = require('../dbs/users')
const crypto = require('crypto')
const account = require('../dbs/account')
const codes = require('../dbs/codes')
const fs = require('fs')
const fly = require('flyio')
const os = require('os')

async function signIn(req, reply) {
    req.body.password = crypto.createHash('md5').update(req.body.password + ':adinno').digest('hex')
    let user = await users.findOne({
        username: req.body.username,
        password: req.body.password
    }).then()
    if (user != null) {
        const token = await reply.jwtSign(req.body.username)
        reply.send({
            code: 20000,
            msg: 'Success',
            err: 'Null',
            cb: { token: token }
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

async function getUser(req, reply) {
    await users
        .findOne({ username: req.user }, { password: 0 })
        .then(cb => {
            if (cb != null) {
                reply.send({
                    code: 20000,
                    msg: 'Success',
                    err: 'Null',
                    cb: cb
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

async function getCodes(req, reply) {
    await users
        .findOne({ username: req.user })
        .then(async cb => {
            if (cb != null) {
                await account
                    .find({ user: cb._id }, { password: 0 })
                    .populate('code')
                    .then(cb => {
                        reply.send({
                            code: 20000,
                            msg: 'Success',
                            err: 'Null',
                            cb: cb
                        })
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

async function editPW(req, reply) {
    await users
        .findOne({ username: req.user })
        .then(async user => {
            if (user != null) {
                if (user.admin > 0) {
                    if (req.body.old == user.password) {
                        req.body.new = crypto.createHash('md5').update(req.body.new + ':adinno').digest('hex')
                        await users
                            .findOneAndUpdate({ username: user.username }, { password: req.body.new })
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
                            code: 50008,
                            msg: '原密码错误',
                            err: 'Null',
                            cb: {}
                        })
                    }
                } else {
                    reply.send({
                        code: 50009,
                        msg: '权限不足',
                        err: 'Null',
                        cb: {}
                    })
                }
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

async function userIps(req, reply) {
    await users
        .findOne({ username: req.user })
        .then(cb => {
            if (cb != null) {
                reply.send({
                    code: 20000,
                    msg: 'Success',
                    err: 'Null',
                    cb: {
                        ips: cb.ips
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
}

async function unUseCodes(req, reply) {
    await users
        .findOne({ username: req.user })
        .then(async cb => {
            if (cb != null) {
                await codes
                    .find({ bind: 0 })
                    .then(cb => {
                        if (cb != null) {
                            reply.send({
                                code: 20000,
                                msg: 'Success',
                                err: 'Null',
                                cb: cb
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

async function viewIp(req, reply) {
    await users
        .findOne({ username: req.user })
        .then(async cb => {
            if (cb != null) {
                await codes
                    .findOne({ code: req.query.code })
                    .populate('user')
                    .then(cb => {
                        if (cb != null) {
                            reply.send({
                                code: 20000,
                                msg: 'Success',
                                err: 'Null',
                                cb: cb.user.ips[0]
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

async function addWhiteList(req, reply) {
    await users
        .findOne({ username: req.user })
        .then(cb => {
            if (cb != null) {
                fs.appendFileSync('/usr/local/WowzaStreamingEngine/conf/whitelist.txt', `live:_definst_:${req.body.code}`)
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
}

async function delWhiteList(req, reply) {
    await users
        .findOne({ username: req.user })
        .then(cb => {
            if (cb != null) {
                let data = fs.readFileSync('/usr/local/WowzaStreamingEngine/conf/whitelist.txt', 'utf8')
                let result = data.replace(`live:_definst_:${req.body.code}`, '')
                fs.writeFileSync('/usr/local/WowzaStreamingEngine/conf/whitelist.txt', result)
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
}

async function getStreams(req, reply) {
    await fly
        .get('http://127.0.0.1:8087/v2/servers/_defaultServer_/vhosts/_defaultVHost_/applications/live/instances/_definst_', {}, { headers: { 'accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(async res => {
            if (res.data.incomingStreams.length === 0) {
                reply.send({
                    code: 20000,
                    msg: 'Success',
                    err: 'Null',
                    cb: []
                })
            } else {
                let streams = []
                for (let i = 0; i < res.data.incomingStreams.length; i++) {
                    let stream = await codes
                        .findOne({ code: res.data.incomingStreams[i].name })
                        .then()
                    if (stream !== null) {
                        streams.push(stream)
                    }
                }
                if (streams == null) {
                    reply.send({
                        code: 20000,
                        msg: 'Success',
                        err: 'Null',
                        cb: []
                    })
                } else {
                    reply.send({
                        code: 20000,
                        msg: 'Success',
                        err: 'Null',
                        cb: streams
                    })
                }
            }
        })
        .catch(error => {
            reply.send({
                code: 50000,
                msg: 'UnKnow-Error',
                err: error.message,
                cb: {}
            })
        })
}

async function getFileList(req, reply) {
    let files = fs.readdirSync(`${os.homedir()}/StreamsRecord`)
    reply.send({
        code: 20000,
        msg: 'Success',
        err: 'Null',
        cb: files
    })
}

async function delFileList(req, reply) {
    fs.unlinkSync(`${os.homedir()}/StreamsRecord/${req.body.name}`)
    reply.send({
        code: 20000,
        msg: 'Success',
        err: 'Null',
        cb: {}
    })
}

module.exports = { signIn, getUser, editPW, getCodes, userIps, unUseCodes, viewIp, addWhiteList, delWhiteList, getStreams, getFileList, delFileList }