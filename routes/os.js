const { sysInfo, homeDir } = require('../modules/os')
const { userValidation } = require('../modules/validation')

module.exports = async fastify => {
    fastify
        .get('/os', {
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await sysInfo(req, reply)
        })
        .get('/homeDir', {
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await homeDir(req, reply)
        })
}