const { version, upload, download, save } = require('../modules/apk')
const { userValidation } = require('../modules/validation')

module.exports = async fastify => {
    fastify
        /**
         * @api {get} /api/getVersion getVersion(获取apk版本号)
         * @apiName getVersion(获取apk版本号)
         * @apiGroup Apk
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *       code: 20000,
         *       msg: 'Success',
         *       cb: {
         *              version: 111,
         *              detail: 'hfdhfg'
         *           }
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
        .get('/getVersion', async (req, reply) => {
            await version(req, reply)
        })
        .register(require('fastify-multipart'))
        .post('/apkUpload', {
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
        /**
         * @api {get} /api/apkDownload apkDownload(apk下载)
         * @apiName apkDownload(apk下载)
         * @apiGroup Apk
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     开始下载APK
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 200 OK
         *     {
         *       code: 50000,
         *       msg: 'UnKnow-Error',
         *       cb: {}
         *     }
         */
        .get('/apkDownload', async (req, reply) => {
            await download(req, reply)
        })
        .post('/apkSave', {
            preValidation: async (req, reply) => {
                await userValidation(req, reply)
            }
        }, async (req, reply) => {
            await save(req, reply)
        })
}