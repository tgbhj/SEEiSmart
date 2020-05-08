const fs = require('fs')
const pump = require('pump')
const up = require('../dbs/upload')
const os = require('os')

async function upload(req, reply) {
    let name = ''
    const mp = await req.multipart(handler, err => {
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

    mp.on('field', (key, value) => {
        new up({
            name: name,
            detail: value,
            path: `${os.homedir()}/UploadFiles/`
        }).save()
    })

    function handler(field, file, filename, encoding, mimetype) {
        name = filename
        pump(file, fs.createWriteStream(`${os.homedir()}/UploadFiles/${filename}`))
    }
}

async function getUploadFiles(req, reply) {
    await up
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
                err: err,
                cb: {}
            })
        })
}

async function delUploadFiles(req, reply) {
    fs.unlinkSync(`${os.homedir()}/UploadFiles/${req.body.name}`)
    await up
        .findOneAndDelete({ name: req.body.name })
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
                err: err,
                cb: {}
            })
        })
}

module.exports = { upload, getUploadFiles, delUploadFiles }