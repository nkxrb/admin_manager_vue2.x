// 引入axios
import axios from 'axios'
import store from '@/store'
import { LOGOUT } from '@/store/mutation-types'
import { TOKEN_NAME } from '@/config'
import { Message } from 'element-ui'

const PREFIXURL = process.env.NODE_ENV === 'production' ? '/api' : '/'
// 创建请求合集，用于取消重复的请求
const requestMap = {}
const CancelToken = axios.CancelToken
// 请求拦截器
axios.interceptors.request.use(config => {
  const source = CancelToken.source()
  // 发起请求时，取消掉当前正在进行的相同请求
  if (requestMap[config.url]) {
    requestMap[config.url].cancel()
  }
  requestMap[config.url] = source

  // 配置取消请求标记
  config.cancelToken = source.token

  // 配置请求头中的token凭证
  if (store.state.user.accessToken) {
    config.headers[TOKEN_NAME] = store.state.user.accessToken
  }

  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器即异常处理
axios.interceptors.response.use(response => {
  // 判断接口返回的响应码是否正常
  if (response && response.data && response.data.code === 200) {
    return response.data
  } else if (response && response.data && response.data.code === 401) {
    Message.warning(response.data.msg)
    store.commit(LOGOUT)
    // 页面刷新跳转到登录页面
    location.reload()
  } else {
    // 异常弹出提示信息
    try {
      Message.warning(response.data.msg)
    } catch (error) {
      Message.warning(error.message)
    }
    return Promise.reject(response)
  }
}, err => {
  if (err && err.response) {
    // 清除登录信息，进行重新登录
    console.warn(err.response.status, err)

    switch (err.response.status) {
      case 400:
        err.message = '错误请求'
        break
      case 401:
        err.message = '未授权，请重新登录'
        store.commit(LOGOUT)
        // 页面刷新跳转到登录页面
        location.reload()
        break
      case 403:
        err.message = '拒绝访问'
        store.commit(LOGOUT)
        // 页面刷新跳转到登录页面
        location.reload()
        break
      case 404:
        err.message = '请求错误,未找到该资源'
        break
      case 405:
        err.message = '请求方法未允许'
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器端出错'
        break
      case 501:
        err.message = '网络未实现'
        break
      case 502:
        err.message = '网络错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网络超时'
        break
      case 505:
        err.message = 'http版本不支持该请求'
        break
      default:
        err.message = `连接错误${err.response.status}`
    }
    Message.error(err.message)
  }

  return Promise.reject(err)
})

// axios.defaults.baseURL = BASE_URL
// 设置默认请求头
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded'
}
axios.defaults.timeout = 10000

// get请求
export async function get (url, params) {
  // 将对象参数转换成&字符串
  if (params) {
    url += url.includes('?') ? '&' : '?'
    for (const key in params) {
      url += `${key}=${params[key]}&`
    }
    if (url.endsWith('&')) url = url.substring(0, url.length - 1)
  }

  const result = await axios.get(PREFIXURL + url).then(res => {
    return res
  })
  return Promise.resolve(result)
}
// post请求
export async function post (url, params) {
  const result = await axios.post(PREFIXURL + url, params, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json'
    }
  }).then(res => {
    console.log(123456)
    return res
  })
  return Promise.resolve(result)
}

// post请求--下载文件
export async function postdownfile (url, param) {
  url = PREFIXURL + url
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      data: param,
      responseType: 'blob',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        token: sessionStorage.seacamels_token,
        time: new Date().getTime()
      },
      onDownloadProgress: function (progressEvent) { // `onDownloadProgress`允许处理下载的进度事件
      }
    }).then(res => {
      resolve(res)
    })
  })
}

/**
   * post请求,上传多个文件，已表单形式提交
   * @param url 请求地址
   * @param param 额外参数
   * @param filesMap 文件集合
   * @return {Promise<any>}
   */
export async function postmultipart (url, dataParam) {
  url = PREFIXURL + url
  // 创建 formData 对象
  const formData = new FormData()
  if (dataParam) {
    for (const key in dataParam) {
      formData.append(key, dataParam[key])
    }
  }

  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        time: new Date().getTime()
      }
    }).then(res => {
      resolve(res)
    })
  })
}

export default axios
