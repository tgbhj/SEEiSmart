const mongoose = require('mongoose')

const apkSchema = mongoose.Schema({
    name: String, //apk名称
    version: Number, //apk版本号
    detail: String, //apk版本说明
    path: String //apk路径
})

const apk = mongoose.model('apk', apkSchema)

module.exports = apk