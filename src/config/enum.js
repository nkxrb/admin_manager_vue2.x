const examineStatus = {
  1: '已上线',
  2: '已删除',
  3: '待审核',
  4: '已下线',
  5: '审核未通过',
  6: '审核通过',
  7: '未提交'
}

const scheduleStatus = {
  1: '有效',
  2: '已删除'
}

const roleType = {
  1: '共公角色',
  2: '医院方运营角色',
  3: '医院方入驻申请角色'
}

const yesNo = {
  1: '是',
  2: '否'
}

const suspendStatus = {
  1: '有效',
  2: '无效'
}

const orderStatus = {
  1: '成功预约',
  2: '取消挂号',
  5: '已就诊',
  8: '已删除'
}

const payStatus = {
  1: '已支付',
  2: '已退款',
  3: '未支付'
}

const evaluateStatus = {
  1: '待审核',
  2: '审核通过',
  3: '审核不通过'
}

const satisfaction = {
  1: '非常满意',
  2: '满意',
  3: '一般',
  4: '不满意'
}

const sites = {
  1: '首页顶部',
  2: '其他'
}

export default {
  sites,
  satisfaction,
  evaluateStatus,
  examineStatus,
  scheduleStatus,
  roleType,
  yesNo,
  suspendStatus,
  orderStatus,
  payStatus
}
