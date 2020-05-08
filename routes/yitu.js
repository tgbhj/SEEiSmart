const { yituLogin, getRepository, addRepository, delRepository, getCamera, addCamera, putCamera, delCamera, getTask, addTask, delTask, alert, realtime, batch_single_person } = require('../modules/yitu')
const { userValidation } = require('../modules/validation')

module.exports = async fastify => {
    fastify
        .register(require('fastify-multipart'))
        .get('/yituLogin', {
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await yituLogin(req, reply)
        })
        .get('/repository', {
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await getRepository(req, reply)
        })
        .post('/repository', {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        name: {
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
            await addRepository(req, reply)
        })
        .post('/delRepository', {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string'
                        }
                    },
                    required: ['id']
                }
            },
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await delRepository(req, reply)
        })
        .get('/camera', {
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await getCamera(req, reply)
        })
        .post('/camera', {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string'
                        },
                        url: {
                            type: 'string'
                        }
                    },
                    required: ['name', 'url']
                }
            },
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await addCamera(req, reply)
        })
        .post('/putCamera', {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string'
                        },
                        enabled: {
                            type: 'number'
                        }
                    },
                    required: ['id', 'enabled']
                }
            },
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await putCamera(req, reply)
        })
        .post('/delCamera', {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string'
                        }
                    },
                    required: ['id']
                }
            },
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await delCamera(req, reply)
        })
        .get('/task', {
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await getTask(req, reply)
        })
        .post('/task', {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string'
                        },
                        requests: {
                            type: 'array'
                        }
                    },
                    required: ['name', 'requests']
                }
            },
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await addTask(req, reply)
        })
        .post('/delTask', {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string'
                        }
                    },
                    required: ['id']
                }
            },
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await delTask(req, reply)
        })
        .post('/alert', {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        surveillance_ids: {
                            type: 'array'
                        },
                        hit_condition: {
                            type: 'object'
                        },
                        order: {
                            type: 'object'
                        },
                        start: {
                            type: 'number'
                        },
                        limit: {
                            type: 'number'
                        }
                    },
                    required: ['surveillance_ids', 'hit_condition', 'order', 'start', 'limit']
                }
            },
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await alert(req, reply)
        })
        .post('/realtime', {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        surveillance_ids: {
                            type: 'array'
                        },
                        hit_condition: {
                            type: 'object'
                        },
                        limit: {
                            type: 'number'
                        }
                    },
                    required: ['surveillance_ids', 'hit_condition', 'limit']
                }
            },
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await realtime(req, reply)
        })
        .post('/batchSinglePerson', {
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            let funPromise = time => {
                return new Promise((resolve, reject) => {
                    //Pending 进行中
                    setTimeout(() => {
                        resolve() //从 pending 变为 resolved
                    }, time)
                })
            }
            await batch_single_person(req, reply)
            await funPromise(500)
        })
}