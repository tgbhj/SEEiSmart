const mongoose = require('mongoose')

const codeSchema = mongoose.Schema({
    title: { type: String, default: 'title' }, //标题
    code: String, //串流码
    createTime: Date, //生成时间
    expireDate: Date, //过期时间
    user: { type: mongoose.Schema.ObjectId, ref: 'user' }, //管理账号
    subAccount: { type: mongoose.Schema.ObjectId, ref: 'account' }, //子账号
    bind: { type: Number, default: 0 } //0=未绑定，1=绑定
})

const code = mongoose.model('code', codeSchema)

module.exports = code