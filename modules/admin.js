const users = require('../dbs/users')
const account = require('../dbs/account')
const codes = require('../dbs/codes')
const { randomWord } = require('./random')
const moment = require('moment')

async function signUp(req, reply) {
    await new users({
        username: 'admin123',
        password: '66f9e61072c8a9b5b262555ed04152d6',
        admin: 2,
        code: [],
        ips: [],
        cloudAddress: [
            'rtmp://dnionpublish.seei.tv/liveTarget/'
        ],
        subAccount: [],
        __v: 0
    }).save((err, cb) => {
        reply.send({
            code: 20000,
            msg: 'Success',
            err: 'Null',
            cb: cb
        })
    })
}

async function getUsers(req, reply) {
    if (req.authority === 1) {
        await users
            .find()
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
    }
}

async function delUser(req, reply) {
    if (req.authority === 1) {
        await users
            .findOneAndUpdate({ username: req.body.username }, { admin: 0 })
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
        reply.send({
            code: 20000,
            msg: 'Success',
            err: 'Null',
            cb: {}
        })
    }
}

async function getAccounts(req, reply) {
    if (req.authority === 1) {
        await account
            .find()
            .populate('user')
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
    }
}

async function getAllCodes(req, reply) {
    if (req.authority === 1) {
        await codes
            .find()
            .populate('user')
            .populate('subAccount')
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
    }
}

async function createCodes(req, reply) {
    if (req.authority === 1) {
        await users
            .findOne({ username: req.body.username })
            .then(async cb => {
                if (cb != null) {
                    await new codes({
                        code: randomWord(true, 40, 40),
                        createTime: moment().add(8, 'hours'),
                        expireDate: moment().add(1, 'years').add(8, 'hours'),
                        user: cb._id
                    }).save(async (err, cb) => {
                        if (cb != null) {
                            await users
                                .findOneAndUpdate({ username: req.body.username }, { $push: { codes: cb._id } })
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
}

async function updateCode(req, reply) {
    if (req.authority === 1) {
        await codes
            .findByIdAndUpdate({ code: req.body.code }, { $set: { expireDate: moment().add(1, 'years').add(8, 'hours') } })
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
    }
}

module.exports = { getUsers, delUser, signUp, getAccounts, getAllCodes, createCodes, updateCode }