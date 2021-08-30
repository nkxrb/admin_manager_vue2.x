import { localStore } from '../storage'
import { LOGIN, LOGOUT, SET_USERINFO } from '../mutation-types'
import { TOKEN_NAME, USER_NAME, AVATAR, MENUS, PERMISSIONS, REDIRECT_URL, ROLE_ID } from '@/config'
import router, { pageRoutes } from '@/router'

const user = {
  state: {
    accessToken: localStore.get(TOKEN_NAME),
    roleId: localStore.get(ROLE_ID),
    username: localStore.get(USER_NAME),
    avatar: localStore.get(AVATAR),
    menuIds: localStore.get(MENUS) || [],
    permissions: localStore.get(PERMISSIONS)
  },
  getters: {
    isLogin: (state) => {
      return !!state.accessToken
    },
    menuList: (state) => {
      if (!state.menuIds || Array.isArray(state.menuIds)) {
        return
      }
      const pageRoute = JSON.parse(JSON.stringify(pageRoutes))
      const menus = pageRoute.filter(item => {
        if (state.menuIds.includes(item.meta.id)) {
          return true
        } else if (item.children && item.children.length > 0) {
          let count = 0
          item.children = item.children.filter(item2 => {
            if (state.menuIds.includes(item2.meta.id)) {
              count++
              return true
            } else if (item2.children && item2.children.length > 0) {
              let count2 = 0
              item2.children = item2.children.filter(item3 => {
                if (state.menuIds.includes(item3.meta.id)) {
                  count2++
                  return true
                }
                return false
              })
              return count2 > 0
            }
            return false
          })
          return count > 0
        }
        return false
      })
      return menus
    }
  },
  mutations: {
    [LOGIN] (state, userInfo) {
      state.accessToken = userInfo.accessToken
      state.roleId = userInfo.roleId
      state.permissions = userInfo.permissions
      state.menuIds = userInfo.menuIds
      localStore.set(TOKEN_NAME, userInfo.accessToken)
      localStore.set(ROLE_ID, userInfo.roleId)
      localStore.set(MENUS, userInfo.menuIds)
      localStore.set(PERMISSIONS, userInfo.permissions)
      // 登录成功后跳转页面
      router.push(localStore.get(REDIRECT_URL) || '/')
    },
    [LOGOUT] (state) {
      state.accessToken = ''
      state.permissions = []
      state.menuIds = []
      localStore.remove(TOKEN_NAME)
      localStore.remove(ROLE_ID)
      localStore.remove(MENUS)
      localStore.remove(PERMISSIONS)
    },
    [SET_USERINFO] (state, userInfo) {
      localStore.set(USER_NAME, userInfo.username)
      localStore.set(AVATAR, userInfo.avatar)
      state.username = userInfo.username
      state.avatar = userInfo.avatar
    }
  }
}

export default { ...user }
