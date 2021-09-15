const Mock = require('mockjs')
const BASE_URL = process.env.BASE_URL

Mock.setup({
  timeout: 10 // 模拟接口延时
})
Mock.XHR.prototype.withCredentials = true // 配置跨域携带cookies

const userInfo = {
  token: '123asd56asd43x2ca65weax321-856vas',
  roleId: 1,
  username: 'nkxrb',
  menuIds: [1, 2, 3, 11, 12, 13, 14]
}
const success = {
  code: 200,
  msg: 'success'
}

const userList = []

/**
  url: '/login', // 必填 要模拟的接口url
  type: 'post', // 默认post
  disable: false, // 是否禁用mock,使用真实接口，默认false
  data: userList // 必填
 */
const mockList = [
  {
    url: '/login',
    data: { ...success, result: userInfo }
  },
  {
    url: '/user/list',
    data: { ...success, 'result|20': userList }
  },
  {
    url: '/list500',
    data: {
      ...success,
      'result|15': [
        {
          'name|3-18': '@province',
          'gdp|6000-400000': 1,
          'people|20000-10000000': 1,
          'subway|0-10': 1,
          'value|20-7100000': 1
        }
      ]
    }
  }
]

mockList.forEach(item => {
  !item.disable && Mock.mock(BASE_URL + item.url, item.type || 'post', item.data)
})
