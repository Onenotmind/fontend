let CommonCodes = {
	'Net_Wrong': '网络异常，请重试！',
}
let LoginCodes = {
  'Register_Data_Null': '账号密码不为空！', // 账号密码错误
  'Code_Error': '验证码错误！',
  'Code_Not_Null': '验证码不为空！'
}

let LandProductCodes = {
  'Get_Star_Point_Succ': '获取商品生成中心'
}

function alertSuccInfo (msg) {
  this.$Message.success({
    top: 200,
    content: msg
    // content: data.res.msg
  })
}

module.exports = {
  CommonCodes: CommonCodes,
  LoginCodes: LoginCodes,
  alertSuccInfo: alertSuccInfo,
  LandProductCodes: LandProductCodes
}