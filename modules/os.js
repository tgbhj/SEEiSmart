const os = require('os')
const fly = require('flyio')

async function sysInfo(req, reply) {
    await fly
        .get('http://127.0.0.1:8087/v2/machine/monitoring/current', {}, { headers: { 'accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(res => {
            reply.send({
                code: 20000,
                cpu: os.loadavg(),
                totalmem: os.totalmem() / 1024 / 1024 / 1024,
                freemem: os.freemem() / 1024 / 1024 / 1024,
                diskFree: Number((res.data.diskFree / 1024 / 1024 / 1024).toFixed(2)),
                diskUsed: Number((res.data.diskUsed / 1024 / 1024 / 1024).toFixed(2)),
                cpuUser: res.data.cpuUser
            })
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

async function homeDir(req, reply) {
    await reply.send({
        code: 20000,
        homeDir: os.homedir()
    })
}

module.exports = { sysInfo, homeDir }