const axios = require('axios')
const qs = require('qs')

const ssapiAxios = axios.create({
  baseURL: 'http://localhost:7007/',
  timeout: 10000
})

const ssapiPath = {
  userLogin: 'user/login',
  userRegister: 'user/register',
  userGeneCode: 'user/geneCode'
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
