const fly = require('flyio')
const fs = require('fs')
const pump = require('pump')
const path = require('path')

async function yituLogin(req, reply) {
    await fly
        .post('http://222.73.36.73:11180/business/api/login', { name: 'admin', password: 'b1993eacdd731b805ec5ba44357c1e37' })
        .then(res => {
            if (res.data.rtn === 0) {
                reply.send({
                    code: 20000,
                    msg: 'Success',
                    err: 'Null',
                    cb: res.data.session_id
                })
            } else {
                reply.send({
                    code: 50014,
                    msg: 'Error',
                    err: res.data.message,
                    cb: {}
                })
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

async function getRepository(req, reply) {
    await fly
        .get('http://222.73.36.73:11180/business/api/repository', {}, { headers: { 'session_id': req.headers.session_id } })
        .then(res => {
            if (res.data.rtn === 0) {
                reply.send({
                    code: 20000,
                    msg: 'Success',
                    err: 'Null',
                    cb: res.data.results
                })
            } else {
                reply.send({
                    code: 50014,
                    msg: 'Error',
                    err: res.data.message,
                    cb: {}
                })
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

async function addRepository(req, reply) {
    await fly
        .post('http://222.73.36.73:11180/business/api/repository', { name: req.body.name }, { headers: { 'session_id': req.headers.session_id } })
        .then(res => {
            if (res.data.rtn === 0) {
                reply.send({
                    code: 20000,
                    msg: 'Success',
                    err: 'Null',
                    cb: res.data.id
                })
            } else {
                reply.send({
                    code: 50014,
                    msg: 'Error',
                    err: res.data.message,
                    cb: {}
                })
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

async function delRepository(req, reply) {
    await fly
        .delete(`http://222.73.36.73:11180/business/api/repository?id=${req.body.id}`, {}, { headers: { 'session_id': req.headers.session_id } })
        .then(res => {
            if (res.data.rtn === 0) {
                reply.send({
                    code: 20000,
                    msg: 'Success',
                    err: 'Null',
                    cb: {}
                })
            } else {
                reply.send({
                    code: 50014,
                    msg: 'Error',
                    err: res.data.message,
                    cb: {}
                })
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

async function getCamera(req, reply) {
    await fly
        .get('http://222.73.36.73:11180/business/api/camera?predecessor_id=2&depth=5', {}, { headers: { 'session_id': req.headers.session_id } })
        .then(res => {
            if (res.data.rtn === 0) {
                reply.send({
                    code: 20000,
                    msg: 'Success',
                    err: 'Null',
                    cb: res.data.cameras
                })
            } else {
                reply.send({
                    code: 50014,
                    msg: 'Error',
                    err: res.data.message,
                    cb: {}
                })
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

async function addCamera(req, reply) {
    await fly
        .post('http://222.73.36.73:11180/business/api/camera', { name: req.body.name, url: req.body.url }, { headers: { 'session_id': req.headers.session_id } })
        .then(res => {
            if (res.data.rtn === 0) {
                reply.send({
                    code: 20000,
                    msg: 'Success',
                    err: 'Null',
                    cb: res.data.id
                })
            } else {
                reply.send({
                    code: 50014,
                    msg: 'Error',
                    err: res.data.message,
                    cb: {}
                })
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

async function putCamera(req, reply) {
    await fly
        .put('http://222.73.36.73:11180/business/api/camera', { id: req.body.id, enabled: req.body.enabled }, { headers: { 'session_id': req.headers.session_id } })
        .then(res => {
            if (res.data.rtn === 0) {
                reply.send({
                    code: 20000,
                    msg: 'Success',
                    err: 'Null',
                    cb: {}
                })
            } else {
                reply.send({
                    code: 50014,
                    msg: 'Error',
                    err: res.data.message,
                    cb: {}
                })
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

async function delCamera(req, reply) {
    await fly
        .delete(`http://222.73.36.73:11180/business/api/camera?id=${req.body.id}`, {}, { headers: { 'session_id': req.headers.session_id } })
        .then(res => {
            if (res.data.rtn === 0) {
                reply.send({
                    code: 20000,
                    msg: 'Success',
                    err: 'Null',
                    cb: {}
                })
            } else {
                reply.send({
                    code: 50014,
                    msg: 'Error',
                    err: res.data.message,
                    cb: {}
                })
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

async function getTask(req, reply) {
    await fly
        .get('http://222.73.36.73:11180/business/api/surveillance/task', {}, { headers: { 'session_id': req.headers.session_id } })
        .then(res => {
            if (res.data.rtn === 0) {
                reply.send({
                    code: 20000,
                    msg: 'Success',
                    err: 'Null',
                    cb: res.data.surveillances
                })
            } else {
                reply.send({
                    code: 50014,
                    msg: 'Error',
                    err: res.data.message,
                    cb: {}
                })
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

async function addTask(req, reply) {
    await fly
        .post('http://222.73.36.73:11180/business/api/surveillance/task', {
            requests: [
                {
                    camera_id: req.body.requests[0].camera_id,
                    repository_id: req.body.requests[0].repository_id,
                    threshold: req.body.requests[0].threshold
                }
            ],
            name: req.body.name
        }, { headers: { 'session_id': req.headers.session_id } })
        .then(res => {
            if (res.data.rtn === 0) {
                reply.send({
                    code: 20000,
                    msg: 'Success',
                    err: 'Null',
                    cb: res.data.id
                })
            } else {
                reply.send({
                    code: 50014,
                    msg: 'Error',
                    err: res.data.message,
                    cb: {}
                })
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

async function delTask(req, reply) {
    await fly
        .delete(`http://222.73.36.73:11180/business/api/surveillance/task?id=${req.body.id}`, {}, { headers: { 'session_id': req.headers.session_id } })
        .then(res => {
            if (res.data.rtn === 0) {
                reply.send({
                    code: 20000,
                    msg: 'Success',
                    err: 'Null',
                    cb: {}
                })
            } else {
                reply.send({
                    code: 50014,
                    msg: 'Error',
                    err: res.data.message,
                    cb: {}
                })
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

async function alert(req, reply) {
    await fly
        .post('http://222.73.36.73:11180/business/api/hit/alert', {
            surveillance_ids: req.body.surveillance_ids,
            hit_condition: req.body.hit_condition,
            order: {
                timestamp: -1
            },
            start: 0,
            limit: req.body.limit
        }, { headers: { 'session_id': req.headers.session_id } })
        .then(res => {
            if (res.data.rtn === 0) {
                reply.send({
                    code: 20000,
                    msg: 'Success',
                    err: 'Null',
                    cb: res.data.pair_results
                })
            } else {
                reply.send({
                    code: 50014,
                    msg: 'Error',
                    err: res.data.message,
                    cb: {}
                })
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

async function realtime(req, reply) {
    await fly
        .post('http://222.73.36.73:11180/business/api/hit/alert/realtime', {
            surveillance_ids: req.body.surveillance_ids,
            hit_condition: req.body.hit_condition,
            limit: req.body.limit
        }, { headers: { 'session_id': req.headers.session_id } })
        .then(res => {
            if (res.data.rtn === 0) {
                reply.send({
                    code: 20000,
                    msg: 'Success',
                    err: 'Null',
                    cb: res.data.pair_results
                })
            } else {
                reply.send({
                    code: 50014,
                    msg: 'Error',
                    err: res.data.message,
                    cb: {}
                })
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

async function batch_single_person(req, reply) {
    await req.multipart(handler, err => {
        if (err) {
            reply.send({
                code: 50000,
                msg: 'UnKnow-Error',
                err: err,
                cb: {}
            })
        }
    })

    async function handler(field, file, filename, encoding, mimetype) {
        let url = path.resolve(__dirname, '../public')
        pump(file, fs.createWriteStream(url + '/' + filename))
        let funPromise = time => {
            return new Promise((resolve, reject) => {
                //Pending 进行中
                setTimeout(() => {
                    resolve() //从 pending 变为 resolved
                }, time)
            })
        }
        await funPromise(500)
        let imgBuffer = fs.readFileSync(url + '/' + filename)
        let data = Buffer.from(imgBuffer).toString('base64')
        await fly
            .post('http://222.73.36.73:11180/business/api/repository/picture/batch_single_person', {
                "images": [{
                    "repository_id": req.headers.repid,
                    "picture_image_content_base64": data,
                    "person_id": "1"
                }]
            }, { headers: { 'session_id': req.headers.session_id } })
            .then(res => {
                if (res.data.results[0].rtn === 0) {
                    fs.unlinkSync(url + '/' + filename)
                    reply.send({
                        code: 20000,
                        msg: 'Success',
                        err: 'Null',
                        cb: {}
                    })
                } else {
                    reply.send({
                        code: 50014,
                        msg: 'Error',
                        err: res.data.message,
                        cb: {}
                    })
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
}

module.exports = { yituLogin, getRepository, addRepository, delRepository, getCamera, addCamera, putCamera, delCamera, getTask, addTask, delTask, alert, realtime, batch_single_person }