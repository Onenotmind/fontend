const axios = require('axios')
const qs = require('qs')

const ssapiAxios = axios.create({
  baseURL: 'http://localhost:7007/',
  timeout: 10000
})

const ssapiPath = {
  userLogin: 'userLogin',
  userRegister: 'userRegister',
  userGeneCode: 'userGeneCode'
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
  if (data.status === 0) {
    if (data.res.status === 0) {
      if (succCb) {
        succCb(data.res.data)
      }
    } else {
      if (errCb) {
        errCb()
      }
    }
  } else {
    if (errCb) {
      errCb()
    }
  }
}

// 用户登录
function userLogin (email, pwd) {
  return ssapiAxios.get(ssapiPath.userLogin, { params: { email, pwd } })
}

// 生成验证码
function userGeneCode (email) {
  return ssapiAxios.get(ssapiPath.userGeneCode, { params: { email } })
}

// 用户注册
function userRegister (email, pwd, code) {
  return ssapiAxios.post(ssapiPath.userRegister, qs.stringify({ email, pwd, code }))
}

export default {
  userGeneCode,
  userLogin,
  userRegister,
  handleRequestRes
}
