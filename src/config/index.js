const system = {
  STORAGE_PREFIX: 'leek-',
  TOKEN_NAME: 'Authorization',
  ROLE_ID: 'roleId',
  USER_NAME: 'userName',
  AVATAR: 'avatar',
  MENUS: 'menuIds',
  PERMISSIONS: 'permissions',
  BASE_URL: 'localhost:25001',
  REDIRECT_URL: 'redirect'
}

const hospitalStatus = {
  HOS_STATUS_VALID: 1, // 有效（已上线）
  HOS_STATUS_INVALID: 2, // 无效(已删除)
  HOS_STATUS_BEAUDIT: 3, // 待审核
  HOS_STATUS_OFFLINE: 4, // 已下线
  HOS_STATUS_REFUSE: 5, // 审核未通过
  HOS_STATUS_PASSED: 6, // 审核通过
  HOS_STATUS_UNSUBMIT: 7, // 未提交,
  HOS_STATUS_ALL: 9 // 所有状态
}

module.exports = { ...system, ...hospitalStatus }
