const { wowzaIp } = require('../modules/stream')
const { userValidation } = require('../modules/validation')

module.exports = async fastify => {
    fastify
        .post('/ip', {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string'
                        }
                    },
                    required: ['email']
                }
            },
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await wowzaIp(req, reply)
        })
}