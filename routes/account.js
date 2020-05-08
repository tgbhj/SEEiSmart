const { addSubAccount, delSubAccount, subAccountLogin, wowzaIps } = require('../modules/account')
const { userValidation } = require('../modules/validation')

module.exports = async fastify => {
    fastify
        /**
         * @api {post} /api/login Login(子账号登录)
         * @apiName Login(子账号登录)
         * @apiGroup SubAccount
         *
         * @apiParam {String} phone 手机号码,必填
         * @apiParam {String} password 密码,必填
         *
         * @apiSuccess {String} token 用户凭证
         * @apiSuccess {String} streamId 串流码ID
         * @apiSuccess {String} code 串流码
         * @apiSuccess {String} expireDate 串流码过期时间
         * 
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *       code: 20000,
         *       msg: 'Success',
         *       cb: {
         *                  token: 'eyJhbGciOiJIUzI1NiJ9.YWRpbm5vMTIz.yqq_jFQRpXmMsDNXR-TTs6ryqNk_ru6SkGKIRrjjfhI',
         *                  streamId: '5d6c8b1b1e562b18841b90b9',
         *                  code: 'Y7OHvLwC8w1NsMt7fMp7UToQVuA4cgIo3UY0pOjX',
         *                  expireDate: '2020-09-02'
         *              }
         *     }
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 200 OK
         *     {
         *       code: 50004,
         *       msg: '账号或密码错误',
         *       cb: {}
         *     }
         */
        .post('/login', {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        phone: {
                            type: 'string'
                        },
                        password: {
                            type: 'string'
                        }
                    },
                    required: ['phone', 'password']
                }
            }
        }, async (req, reply) => {
            await subAccountLogin(req, reply)
        })
        .post('/subAccount', {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        phone: {
                            type: 'string'
                        },
                        password: {
                            type: 'string'
                        },
                        codeId: {
                            type: 'string'
                        }
                    },
                    required: ['phone', 'password', 'codeId']
                }
            },
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await addSubAccount(req, reply)
        })
        .post('/delSubAccount', {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        subAccountId: {
                            type: 'string'
                        }
                    },
                    required: ['subAccountId']
                }
            },
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await delSubAccount(req, reply)
        })
        /**
         * @api {post} /api/ips Ips(获取推流地址)
         * @apiName Ips(获取推流地址)
         * @apiGroup SubAccount
         *
         * @apiParam {String} token 用户凭证,必填,{headers:{authorization: Bearer [token]}}
         * @apiParam {String} title 标题,必填
         *
         * @apiSuccess {String} ip wowza推流地址
         * @apiSuccess {String} cloudAddress 云直播推流地址
         * 
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *       code: 20000,
         *       msg: 'Success',
         *       cb: {
         *                  ip: '192.168.1.119', 
         *                  cloudAddress: 'rtmp://dnionpublish.seei.tv/liveTarget/'
         *              }
         *     }
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 200 OK
         *     {
         *       code: 50000,
         *       msg: 'UnKnow-Error',
         *       cb: {}
         *     }
         */
        .post('/ips', {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string'
                        }
                    },
                    required: ['title']
                }
            },
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await wowzaIps(req, reply)
        })
}