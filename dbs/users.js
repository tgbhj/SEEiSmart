const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String, //用户名
    password: String, //密码
    admin: { type: Number, default: 1 }, //权限,0为账号冻结状态可以登录但没有任何操作权限,1为用户账号,2为管理员
    codes: [{ type: mongoose.Schema.ObjectId, ref: 'code' }], //串流码
    ips: [], //用户对应的wowza-ip
    cloudAddress: [], //云直播推流地址
    subAccount: [{ type: mongoose.Schema.ObjectId, ref: 'account' }] //子账号
})

const user = mongoose.model('user', userSchema)

module.exports = user