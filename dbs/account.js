const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
    phone: String, //手机号作为子账号
    password: String, //密码
    code: { type: mongoose.Schema.ObjectId, ref: 'code' }, //串流码
    user: { type: mongoose.Schema.ObjectId, ref: 'user' } //管理账号
})

const account = mongoose.model('account', accountSchema)

module.exports = account