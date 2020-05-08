const { upload, getUploadFiles, delUploadFiles } = require('../modules/upload')
const { userValidation } = require('../modules/validation')

module.exports = async fastify => {
    fastify
        .register(require('fastify-multipart'))
        /**
         * @api {post} /api/upload Upload(上传)
         * @apiName Upload(上传)
         * @apiGroup Upload
         *
         * @apiParam {String} token 用户凭证,必填,{headers:{authorization: Bearer [token]}}
         * @apiParam {String} filename 文件名,必填,放在multipart/form-data中
         * @apiParam {String} description 文件描述,必填,放在multipart/form-data中
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *       code: 20000,
         *       msg: 'Success',
         *       cb: {}
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
        .post('/upload', {
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
            await upload(req, reply)
            await funPromise(500)
        })
        .get('/uploadFiles', {
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await getUploadFiles(req, reply)
        })
        .post('/uploadFiles', {
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
            await delUploadFiles(req, reply)
        })
}