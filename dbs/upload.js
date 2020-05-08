const mongoose = require('mongoose')

const uploadSchema = mongoose.Schema({
    name: String, //上传名称
    detail: String, //上传说明
    path: String //上传路径
})

const upload = mongoose.model('upload', uploadSchema)

module.exports = upload