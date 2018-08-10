const axios = require('axios')
const qs = require('qs')
axios.defaults.withCredentials = true
const ssapiAxios = axios.create({
  baseURL: 'http://localhost:3001/',
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
  queryRegisterByAddr: 'queryRegisterByAddr',

  queryAllRollInAssets: 'queryAllRollInAssets',
  queryRollInAssetsByAddr: 'queryRollInAssetsByAddr',
  checkOverRollInOrder: 'checkOverRollInOrder',
  deleteRollInOrder: 'deleteRollInOrder',
  queryAllRollOutAssets: 'queryAllRollOutAssets',
  queryRollOutAssetsByAddr: 'queryRollOutAssetsByAddr',
  checkOverRollOutOrder: 'checkOverRollOutOrder',
  deleteRollOutOrder: 'deleteRollOutOrder',
  clientCancelRollOutOrder: 'clientCancelRollOutOrder',
  clientCancelRollInOrder: 'clientCancelRollInOrder',
  queryAllPandaByAddr: 'queryAllPandaByAddr',
  queryPandaInfo: 'queryPandaInfo',
  genePandaRandom: 'genePandaRandom',
  getEthlandProduct: 'getEthlandProduct',

  serverTime: 'serverTime',
  getNextVoteStartTime: 'getNextVoteStartTime',

  getPandaBackAssets: 'getPandaBackAssets',
  queryAllPandaSold: 'queryAllPandaSold',
  buyPanda: 'buyPanda',
  sellPanda: 'sellPanda',
  feedPanda: 'feedPanda',
  delPandaByGen: 'delPandaByGen',
  getUserInfoAndAssetsByAddr: 'getUserInfoAndAssetsByAddr',
  sirePanda: 'sirePanda',
  getCurrentStarPoint: 'getCurrentStarPoint',
  queryLandProductByAddr: 'queryLandProductByAddr',

  exchangeProduct: 'exchangeProduct',
  deleteAssetsRollOutOrder: 'deleteAssetsRollOutOrder',
  queryUserAllProduct: 'queryUserAllProduct',

  insertAssetsRollOutOrder: 'insertAssetsRollOutOrder',
  insertAssetsRollInOrder: 'insertAssetsRollInOrder',

  getCurrentProduct: 'getCurrentProduct',
  getCurrentVotedProduct: 'getCurrentVotedProduct',
  voteProduct: 'voteProduct',
  voteProductAttr: 'voteProductAttr',
  queryCountOfProductId: 'queryCountOfProductId',
  getCurrentLeftProduct: 'getCurrentLeftProduct',
  addVoteProduct: 'addVoteProduct',
  deleteProduct: 'deleteProduct',
  productVotedOver: 'productVotedOver',
  getLeftProductInCurActivity: 'getLeftProductInCurActivity',

  updateUserBamboo: 'updateUserBamboo',
  resetUserHash: 'resetUserHash',

  unSoldPanda: 'unSoldPanda',
  getUserBamboo: 'getUserBamboo',
  checkUserLoginExpired: 'checkUserLoginExpired'
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
function userRegister (addr, email, pwd, code, invite) {
  return ssapiAxios.post(ssapiPath.userRegister, qs.stringify({ addr, email, pwd, code, invite }))
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

// 根据地址查询被邀请的数量
function queryRegisterByAddr (addr) {
  return ssapiAxios.get(ssapiPath.queryRegisterByAddr, { params: { addr }})
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

// 用户手动取消订单
function clientCancelRollOutOrder (orderId, addr) {
  return ssapiAxios.get(ssapiPath.clientCancelRollOutOrder, { params: { orderId, addr }})
}

// 用户手动取消充值订单
function clientCancelRollInOrder (orderId, addr) {
  return ssapiAxios.get(ssapiPath.clientCancelRollInOrder, { params: { orderId, addr }})
}

// 新增一个提现订单
function insertAssetsRollOutOrder (addr, type, amount, pwd) {
  return ssapiAxios.get(ssapiPath.insertAssetsRollOutOrder, { params: { addr, type, amount, pwd }})
}

// 新增一个充值订单
function insertAssetsRollInOrder (userAddr, addr, type, amount) {
  return ssapiAxios.get(ssapiPath.insertAssetsRollInOrder, { params: { userAddr, addr, type, amount }})
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
function getEthlandProduct (pandaGen, bamboo, direction, tagsStr) {
  return ssapiAxios.get(ssapiPath.getEthlandProduct, { params: { pandaGen, bamboo, direction, tagsStr }})
}

// 获取服务器当前时间
function serverTime () {
  return ssapiAxios.get(ssapiPath.serverTime, { params: {}})
}

// 获取下期商品投票开始时间
function getNextVoteStartTime () {
  return ssapiAxios.get(ssapiPath.getNextVoteStartTime, { params: {}})
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

// 喂养熊猫
function feedPanda (pandaGen, account) {
  return ssapiAxios.get(ssapiPath.feedPanda, { params: { pandaGen, account }})
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

// 取消商品订单
function deleteAssetsRollOutOrder (addr, productId) {
  return ssapiAxios.get(ssapiPath.deleteAssetsRollOutOrder, { params: { addr, productId }})
}

// 获取用户所有的兑换商品
function queryUserAllProduct (addr) {
  return ssapiAxios.get(ssapiPath.queryUserAllProduct, { params: { addr }})
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

// 给商品属性投票
function voteProductAttr (productId, attr, period, num) {
  return ssapiAxios.get(ssapiPath.voteProductAttr, { params: { productId, attr, period, num }})
}

// 获取商品属性值投票
function queryCountOfProductId () {
  return ssapiAxios.get(ssapiPath.queryCountOfProductId, { params: {}})
}

// 获取当前剩余的商品详细信息
function getCurrentLeftProduct () {
  return ssapiAxios.get(ssapiPath.getCurrentLeftProduct, { params: {}})
}

// 新增一个待投票的商品
function addVoteProduct (proInfo) {
  return ssapiAxios.post(ssapiPath.addVoteProduct, qs.stringify(proInfo) )
}

// 删除商品
function deleteProduct (productId) {
  const authPwd = 'chenye1234'
  return ssapiAxios.get(ssapiPath.deleteProduct, { params: { productId, authPwd }})
}

// 商品投票结束
function productVotedOver () {
  const authPwd = 'chenye1234'
  return ssapiAxios.get(ssapiPath.productVotedOver, { params: { authPwd }})
}

// 查看当前活动中剩余的商品列表
function getLeftProductInCurActivity () {
  return ssapiAxios.get(ssapiPath.getLeftProductInCurActivity, { params: { }})
}

// 更新用户的竹子数量
function updateUserBamboo (addr) {
  return ssapiAxios.get(ssapiPath.updateUserBamboo, { params: { addr }})
}

// 重置cookie hash值
function resetUserHash (addr) {
return ssapiAxios.get(ssapiPath.resetUserHash, { params: { addr }})
}

// 获取用户参与挖矿得到的bamboo数量
function getUserBamboo (addr, hash, acceptHash) {
  return ssapiAxios.get(ssapiPath.getUserBamboo, { params: { addr, hash, acceptHash } })
}

// 检测用户是否还在登陆状态,判断token
function checkUserLoginExpired(token) {
  return ssapiAxios.get(ssapiPath.checkUserLoginExpired, { params: { token } })
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
  queryRegisterByAddr,
  
  queryAllRollInAssets,
  queryRollInAssetsByAddr,
  checkOverRollInOrder,
  deleteRollInOrder,
  queryAllRollOutAssets,
  queryRollOutAssetsByAddr,
  checkOverRollOutOrder,
  deleteRollOutOrder,
  clientCancelRollOutOrder,
  clientCancelRollInOrder,
  queryAllPandaByAddr,
  queryPandaInfo,
  genePandaRandom,
  getEthlandProduct,
  serverTime,
  getNextVoteStartTime,
  getPandaBackAssets,
  queryAllPandaSold,
  buyPanda,
  sellPanda,
  feedPanda,
  unSoldPanda,
  delPandaByGen,
  getUserInfoAndAssetsByAddr,
  setHeader,
  userChangeTradePass,
  sirePanda,
  getCurrentStarPoint,
  queryLandProductByAddr,

  exchangeProduct,
  deleteAssetsRollOutOrder,
  getCurrentProduct,

  getCurrentVotedProduct,
  voteProduct,
  voteProductAttr,
  queryCountOfProductId,
  getCurrentLeftProduct,
  addVoteProduct,
  deleteProduct,
  productVotedOver,
  getLeftProductInCurActivity,
  updateUserBamboo,
  resetUserHash,
  getUserBamboo,
  queryUserAllProduct,
  insertAssetsRollOutOrder,
  insertAssetsRollInOrder
}
