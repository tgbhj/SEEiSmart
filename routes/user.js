const { signIn, getUser, editPW, getCodes, userIps, unUseCodes, viewIp, addWhiteList, delWhiteList, getStreams, getFileList, delFileList } = require('../modules/user')
const { userValidation } = require('../modules/validation')

module.exports = async fastify => {
    fastify
        .post('/signIn', {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string'
                        },
                        password: {
                            type: 'string'
                        }
                    },
                    required: ['username', 'password']
                }
            }
        }, async (req, reply) => {
            await signIn(req, reply)
        })
        .get('/user', {
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await getUser(req, reply)
        })
        .get('/codes', {
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await getCodes(req, reply)
        })
        .put('/password', {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        old: {
                            type: 'string'
                        },
                        new: {
                            type: 'string'
                        }
                    },
                    required: ['old', 'new']
                }
            },
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await editPW(req, reply)
        })
        .get('/getIps', {
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await userIps(req, reply)
        })
        .get('/unUseCodes', {
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await unUseCodes(req, reply)
        })
        .get('/viewIp', {
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await viewIp(req, reply)
        })
        .post('/addWhiteList', {
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
            }
        }, async (req, reply) => {
            await addWhiteList(req, reply)
        })
        .post('/delWhiteList', {
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
            }
        }, async (req, reply) => {
            await delWhiteList(req, reply)
        })
        .get('/streams', {
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await getStreams(req, reply)
        })
        .get('/fileList', {
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await getFileList(req, reply)
        })
        .post('/fileList', {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        code: {
                            type: 'string'
                        }
                    },
                    required: ['name']
                }
            },
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await delFileList(req, reply)
        })
}