const axios = require('axios')
const qs = require('qs')
axios.defaults.withCredentials = true
const ssapiAxios = axios.create({
  baseURL: 'http://localhost:7007/',
  timeout: 10000
})
// axios.defaults.headers.common['token'] = '123'
const ssapiPath = {
  userLogin: 'userLogin',
  userRegister: 'userRegister',
  userGeneCode: 'userGeneCode',
  userCheckCode: 'userCheckCode',
  userChangeLoginPass: 'userChangeLoginPass',
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
  getUserInfoAndAssetsByAddr: 'getUserInfoAndAssetsByAddr'
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

// 重置密码
function userChangeLoginPass (addr, pwd) {
  return ssapiAxios.post(ssapiPath.userChangeLoginPass, qs.stringify({ addr, pwd }))
}

// 重置交易密码
function userChangeTradePass (addr, tradePwd) {
  return ssapiAxios.post(ssapiPath.userChangeLoginPass, qs.stringify({ addr, tradePwd }))
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

// 熊猫外出获取宝物
function getEthlandProduct (pandaGen, bamboo, direction) {
  return ssapiAxios.get(ssapiPath.getEthlandProduct, { params: { pandaGen, bamboo, direction }})
}

// 获取服务器当前时间
function serverTime () {
  return ssapiAxios.get(ssapiPath.serverTime, { params: {}})
}

// 获取熊猫外出回归的商品
function getPandaBackAssets (pandaGen) {
  return ssapiAxios.get(ssapiPath.getPandaBackAssets, { params: {pandaGen}})
}

// 查询所有售卖中的熊猫
function queryAllPandaSold () {
  return ssapiAxios.get(ssapiPath.queryAllPandaSold, { params: {}})
}

// 购买熊猫
function buyPanda (addr, pandaGen, price) {
  return ssapiAxios.post(ssapiPath.buyPanda, qs.stringify({ addr, pandaGen, price }))
}

// 出售熊猫
function sellPanda (pandaGen, price) {
  return ssapiAxios.get(ssapiPath.sellPanda, { params: { pandaGen, price }})
}

// 丢弃熊猫
function delPandaByGen (pandaGen) {
  return ssapiAxios.get(ssapiPath.delPandaByGen, { params: { pandaGen }})
}

// 获取用户详细信息和资产
function getUserInfoAndAssetsByAddr (addr) {
  return ssapiAxios.get(ssapiPath.getUserInfoAndAssetsByAddr, { params: { addr }})
}
export default {
  userGeneCode,
  userLogin,
  userRegister,
  handleRequestRes,
  userCheckCode,
  userChangeLoginPass,
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
  delPandaByGen,
  getUserInfoAndAssetsByAddr,
  setHeader,
  userChangeTradePass
}
