const { getUsers, delUser, signUp, getAccounts, getAllCodes, createCodes, updateCode } = require('../modules/admin')
const { userValidation, authority } = require('../modules/validation')

module.exports = async fastify => {
    fastify
        .get('/signUp', async (req, reply) => {
            await signUp(req, reply)
        })
        .get('/users', {
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            },
            preHandler: async (req, reply) => {
                await authority(req, reply)
            }
        }, async (req, reply) => {
            await getUsers(req, reply)
        })
        .post('/user', {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string'
                        }
                    },
                    required: ['username']
                }
            },
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            },
            preHandler: async (req, reply) => {
                await authority(req, reply)
            }
        }, async (req, reply) => {
            await delUser(req, reply);
        })
        .get('/accounts', {
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            },
            preHandler: async (req, reply) => {
                await authority(req, reply)
            }
        }, async (req, reply) => {
            await getAccounts(req, reply)
        })
        .get('/allCodes', {
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            },
            preHandler: async (req, reply) => {
                await authority(req, reply)
            }
        }, async (req, reply) => {
            await getAllCodes(req, reply)
        })
        .post('/codes', {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string'
                        }
                    },
                    required: ['username']
                }
            },
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            },
            preHandler: async (req, reply) => {
                await authority(req, reply)
            }
        }, async (req, reply) => {
            await createCodes(req, reply)
        })
        .put('/codes', {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        code: {
                            type: 'string'
                        }
                    },
                    required: ['code']
                }
            },
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            },
            preHandler: async (req, reply) => {
                await authority(req, reply)
            }
        }, async (req, reply) => {
            await updateCode(req, reply)
        })
}