const apk = require('../dbs/apk')
const path = require('path')
const fs = require('fs')
const pump = require('pump')

async function version(req, reply) {
    await apk
        .find()
        .limit(1)
        .sort({version: -1})
        .then(cb => {
            reply.send({
                code: 20000,
                msg: 'Success',
                err: 'Null',
                cb: {
                    version: cb[0].version,
                    detail: cb[0].detail
                }
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

let name = ''
const url = path.resolve(__dirname, '../public')

async function upload(req, reply) {
    await req.multipart(handler, err => {
        if (err) {
            reply.send({
                code: 50000,
                msg: 'UnKnow-Error',
                err: err,
                cb: {}
            })
        } else {
            reply.send({
                code: 20000,
                msg: 'Success',
                err: 'Null',
                cb: {}
            })
        }
    })

    function handler(field, file, filename, encoding, mimetype) {
        name = filename
        pump(file, fs.createWriteStream(`${url}/${filename}`))
    }
}

async function save(req, reply) {
    await new apk({
        name: name,
        version: req.body.version,
        detail: req.body.detail,
        path: `${url}/`
    }).save((err, cb) => {
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
    })
}

async function download(req, reply) {
    await apk
        .find()
        .limit(1)
        .sort({version: -1})
        .then(cb => {
            reply.sendFile(cb[0].name, url)
        }, err => {
            reply.send({
                code: 50000,
                msg: 'UnKnow-Error',
                err: err.message,
                cb: {}
            })
        })
}

module.exports = { version, upload, download, save }