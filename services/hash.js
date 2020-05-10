const bcrypt = require("bcrypt")


exports.getHashPwd=(pwdText)=>{
const salt = bcrypt.genSaltSync()
 return   bcrypt.hashSync(pwdText,salt)
}

exports.comparePwd =(pwdText,pwdEncrypt)=>{
    return bcrypt.compareSync(pwdText,pwdEncrypt)
}