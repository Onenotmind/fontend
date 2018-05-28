const axios = require('axios')
const qs = require('qs')
axios.defaults.withCredentials = true
const ssapiAxios = axios.create({
  baseURL: 'http://47.74.183.93/',
  timeout: 10000
})
// axios.defaults.headers.common['token'] = '123'
const ssapiPath = {
  userLogin: 'userLogin',
  userRegister: 'userRegister',
  userGeneCode: 'userGeneCode',
  userCheckCode: 'userCheckCode',
  bindEmail: 'bindEmail',
  userChangeLoginPass: 'userChangeLoginPass',
  queryUserEmail: 'queryUserEmail',
  changePwdWhenForget: 'changePwdWhenForget',
  userChangeTradePass: 'userChangeTradePass',
  queryAllAssets: 'queryAllAssets',
  queryAllRollInAssets: 'queryAllRollInAssets',
  queryRollInAssetsByAddr: 'queryRollInAssetsByAddr',
  checkOverRollInOrder: 'checkOverRollInOrder',
  deleteRollInOrder: 'deleteRollInOrder',
  queryAllRollOutAssets: 'queryAllRollOutAssets',
  queryRollOutAssetsByAddr: 'queryRollOutAssetsByAddr',
  checkOverRollOutOrder: 'checkOverRollOutOrder',
  deleteRollOutOrder: 'deleteRollOutOrder',
  queryAllPandaByAddr: 'queryAllPandaByAddr',
  queryPandaInfo: 'queryPandaInfo',
  genePandaRandom: 'genePandaRandom',
  getEthlandProduct: 'getEthlandProduct',
  serverTime: 'serverTime',
  getPandaBackAssets: 'getPandaBackAssets',
  queryAllPandaSold: 'queryAllPandaSold',
  buyPanda: 'buyPanda',
  sellPanda: 'sellPanda',
  delPandaByGen: 'delPandaByGen',
  getUserInfoAndAssetsByAddr: 'getUserInfoAndAssetsByAddr',
  sirePanda: 'sirePanda',
  getCurrentStarPoint: 'getCurrentStarPoint',
  queryLandProductByAddr: 'queryLandProductByAddr',
  exchangeProduct: 'exchangeProduct',
  getCurrentProduct: 'getCurrentProduct',
  getCurrentVotedProduct: 'getCurrentVotedProduct',
  voteProduct: 'voteProduct',
  updateUserBamboo: 'updateUserBamboo',
  unSoldPanda: 'unSoldPanda'
}

function intercept () {
  ssapiAxios.interceptors.request.use(config => {
    console.log('request', config)
    return config
  }, error => {
    console.log('request error', error)
    return Promise.reject(error)
  })

  ssapiAxios.interceptors.response.use(response => {
    console.log('response', response.data)
    return response
  }, error => {
    console.log('response error', error)
    return Promise.reject(error)
  })
}

function handleRequestRes (data, succCb, errCb) { // trade项目数据回调函数封装
  console.log('data', data)
  if (data.status === 1) {
    if (data.res.status === 1) {
      if (succCb) {
        succCb(data.res.data)
      }
    } else {
      if (errCb) {
        errCb(data.res.msg)
      }
    }
  } else {
    if (errCb) {
      errCb(data.msg)
    }
  }
}

// 更改axios headers
function setHeader (type, val) {
  axios.defaults.headers.common[type] = val
}

// 用户登录
function userLogin (addr, pwd) {
  return ssapiAxios.get(ssapiPath.userLogin, { params: { addr, pwd } })
}

// 生成验证码
function userGeneCode (email) {
  return ssapiAxios.get(ssapiPath.userGeneCode, { params: { email } })
}

// 用户注册
function userRegister (addr, email, pwd, code) {
  return ssapiAxios.post(ssapiPath.userRegister, qs.stringify({ addr, email, pwd, code }))
}

// 检测验证码
function userCheckCode (email, code) {
  return ssapiAxios.get(ssapiPath.userCheckCode, { params: { email, code }})
}

function bindEmail (email, code) {
  return ssapiAxios.get(ssapiPath.bindEmail, { params: { email, code }})
}

// 重置密码
function userChangeLoginPass (addr, oldPwd, newPwd) {
  return ssapiAxios.post(ssapiPath.userChangeLoginPass, qs.stringify({ addr, oldPwd, newPwd }))
}

// 忘记密码时获取验证码
function queryUserEmail (addr) {
  return ssapiAxios.get(ssapiPath.queryUserEmail, { params: { addr }})
}

// 登陆时忘记密码
function changePwdWhenForget (addr, pwd, code) {
  return ssapiAxios.get(ssapiPath.changePwdWhenForget, { params: { addr, pwd, code }})
}

// 重置交易密码
function userChangeTradePass (addr, newPwd, code) {
  return ssapiAxios.post(ssapiPath.userChangeTradePass, qs.stringify({ addr, newPwd, code }))
}
// 查询未确定资产
function queryAllAssets () {
  return ssapiAxios.get(ssapiPath.queryAllAssets, { params: {}})
}

// 查询转入的订单
function queryAllRollInAssets () {
  return ssapiAxios.get(ssapiPath.queryAllRollInAssets, { params: {}})
}

// 查询某一特定用户的转入资产
function queryRollInAssetsByAddr (addr) {
  return ssapiAxios.get(ssapiPath.queryRollInAssetsByAddr, { params: { addr }})
}

// 转入订单确认
function checkOverRollInOrder (assetsData) {
  return ssapiAxios.post(ssapiPath.checkOverRollInOrder, qs.stringify({ assetsData }))
}

// 转入订单取消
function deleteRollInOrder (assetsData) {
  return ssapiAxios.post(ssapiPath.deleteRollInOrder, qs.stringify({ assetsData }))
}

// 查询提现的订单
function queryAllRollOutAssets () {
  return ssapiAxios.get(ssapiPath.queryAllRollOutAssets, { params: {}})
}

// 查询某一特定用户的提现订单
function queryRollOutAssetsByAddr (addr) {
  return ssapiAxios.get(ssapiPath.queryRollOutAssetsByAddr, { params: { addr }})
}

// 提现订单确认
function checkOverRollOutOrder (assetsData) {
  return ssapiAxios.post(ssapiPath.checkOverRollOutOrder, qs.stringify({ assetsData }))
}

// 提现订单取消
function deleteRollOutOrder (assetsData) {
  return ssapiAxios.post(ssapiPath.deleteRollOutOrder, qs.stringify({ assetsData }))
}

// 查询某地址下所有熊猫
function queryAllPandaByAddr (addr) {
  return ssapiAxios.get(ssapiPath.queryAllPandaByAddr, { params: { addr }})
}

// 查询某只熊猫的详细信息
function queryPandaInfo (gen) {
  return ssapiAxios.get(ssapiPath.queryPandaInfo, { params: { gen }})
}

// 随机产生一只g10熊猫
function genePandaRandom (addr) {
  return ssapiAxios.get(ssapiPath.genePandaRandom, { params: { addr }})
}

// 孵化熊猫
function sirePanda (pandaGen) {
  return ssapiAxios.get(ssapiPath.sirePanda, { params: { pandaGen }})
}

// 熊猫外出获取宝物
function getEthlandProduct (pandaGen, bamboo, direction) {
  return ssapiAxios.get(ssapiPath.getEthlandProduct, { params: { pandaGen, bamboo, direction }})
}

// 获取服务器当前时间
function serverTime () {
  return ssapiAxios.get(ssapiPath.serverTime, { params: {}})
}

// 获取熊猫外出回归的商品
function getPandaBackAssets () {
  return ssapiAxios.get(ssapiPath.getPandaBackAssets, { params: {}})
}

// 查询所有售卖中的熊猫
function queryAllPandaSold () {
  return ssapiAxios.get(ssapiPath.queryAllPandaSold, { params: {}})
}

// 购买熊猫
function buyPanda (addr, pandaGen, price) {
  return ssapiAxios.get(ssapiPath.buyPanda, { params: { addr, pandaGen, price }})
}

// 出售熊猫
function sellPanda (pandaGen, price) {
  return ssapiAxios.get(ssapiPath.sellPanda, { params: { pandaGen, price }})
}

// 取消出售熊猫
function unSoldPanda (pandaGen, addr) {
  return ssapiAxios.get(ssapiPath.unSoldPanda, { params: { pandaGen, addr }})
}

// 丢弃熊猫
function delPandaByGen (pandaGen) {
  return ssapiAxios.get(ssapiPath.delPandaByGen, { params: { pandaGen }})
}

// 获取用户详细信息和资产
function getUserInfoAndAssetsByAddr (addr) {
  return ssapiAxios.get(ssapiPath.getUserInfoAndAssetsByAddr, { params: { addr }})
}

// 获取商品中心
function getCurrentStarPoint () {
  return ssapiAxios.get(ssapiPath.getCurrentStarPoint, { params: { }})
}

// 获取用户的商品列表
function queryLandProductByAddr (addr) {
  return ssapiAxios.get(ssapiPath.queryLandProductByAddr, { params: { addr }})
}

// 兑换商品
function exchangeProduct (addr, productId, userName, userPhone, userRealAddr, pwd, code) {
  return ssapiAxios.get(ssapiPath.exchangeProduct, { params: { addr, productId, userName, userPhone, userRealAddr, pwd, code }})
}

// 获取正在活动中的商品
function getCurrentProduct () {
  return ssapiAxios.get(ssapiPath.getCurrentProduct, { params: { }})
}

// 获取正在投票中的商品
function getCurrentVotedProduct () {
  return ssapiAxios.get(ssapiPath.getCurrentVotedProduct, { params: { }})
}

// 给商品投票
function voteProduct (productId, num) {
  return ssapiAxios.get(ssapiPath.voteProduct, { params: { productId, num }})
}

// 更新用户的竹子数量
function updateUserBamboo (addr) {
  return ssapiAxios.get(ssapiPath.updateUserBamboo, { params: { addr }})
}
export default {
  userGeneCode,
  userLogin,
  userRegister,
  handleRequestRes,
  userCheckCode,
  bindEmail,
  userChangeLoginPass,
  queryUserEmail,
  changePwdWhenForget,
  queryAllAssets,
  queryAllRollInAssets,
  queryRollInAssetsByAddr,
  checkOverRollInOrder,
  deleteRollInOrder,
  queryAllRollOutAssets,
  queryRollOutAssetsByAddr,
  checkOverRollOutOrder,
  deleteRollOutOrder,
  queryAllPandaByAddr,
  queryPandaInfo,
  genePandaRandom,
  getEthlandProduct,
  serverTime,
  getPandaBackAssets,
  queryAllPandaSold,
  buyPanda,
  sellPanda,
  unSoldPanda,
  delPandaByGen,
  getUserInfoAndAssetsByAddr,
  setHeader,
  userChangeTradePass,
  sirePanda,
  getCurrentStarPoint,
  queryLandProductByAddr,
  exchangeProduct,
  getCurrentProduct,
  getCurrentVotedProduct,
  voteProduct,
  updateUserBamboo
}
