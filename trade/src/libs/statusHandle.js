let CommonCodes = {
	'Net_Wrong': '网络异常，请重试！',
	'Service_Wrong': '注册人数过多，请稍后再试！'
}
let LoginCodes = {
  'Register_Data_Null': '地址密码不为空！', // 账号密码错误
  'Code_Error': '验证码错误！',
  'Code_Not_Null': '验证码不为空！',
  'Register_Succ': '注册成功',
  'Login_Succ': '登陆成功',
  'Password_Not_Null': '密码不为空！',
  'Password_Not_Repeat': '新密码设置应该一样！',
  'Set_New_Pwd_Succ': '新密码设置成功！',
  'Send_Email_Succ': '发送验证码成功！',
  'Can_Not_Change_Pwd_Because_Not_Email': '没有绑定邮箱无法重置密码！',
  'Login_Addr_Fail': '地址本地储存过期, 请重新输入',
  'Please_Bind_Email_First': '请先绑定邮箱!',
  'Set_Email_Succ': '绑定邮箱成功！'
}

let LandProductCodes = {
  'Get_Star_Point_Succ': '获取商品生成中心',
  'Get_Star_Point_Fail': '商品中心生成失败',
  'Exchange_Product_Info_Not_Null': '商品兑换信息不能为空',
  'Current_Product_Null': '当前活动商品为空！',
  'Vote_Product_Succ': '给商品投票成功'
}

function alertSuccInfo (self, msg) {
  self.$Message.success({
    top: 200,
    content: msg
    // content: data.res.msg
  })
}

function alertErrInfo (self, msg) {
  self.$Message.error({
    top: 200,
    content: msg
  })
}
module.exports = {
  CommonCodes: CommonCodes,
  LoginCodes: LoginCodes,
  alertSuccInfo: alertSuccInfo,
  alertErrInfo: alertErrInfo,
  LandProductCodes: LandProductCodes
}