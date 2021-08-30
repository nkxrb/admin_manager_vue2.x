<template>
  <div class="page-main">
    <!-- 查询 -->
    <div class="search-panel">
      <div class="item" style="width: 150px;">
        <el-input v-model="searchParam.name" placeholder="用户名" clearable prefix-icon="el-icon-search"></el-input>
      </div>
      <div class="btn">
        <el-button type="primary" @click="search">查询</el-button>
      </div>
    </div>

    <k-table ref="table" :height="'100%'" :tool-btns="toolBtns" :columns="columns" :data-url="tableUrl"></k-table>
    <nk-form :title="`${operateType}用户`" width="50%" :visible.sync="isShowForm" :fields="formProps" :data="curItem" @submit="submit"></nk-form>
  </div>
</template>
<script>

export default {
  name: 'userInfo',
  data: function () {
    return {
      operateType: '编辑',
      isShowForm: false,
      tableUrl: '/sys/user/search',
      submitUrl: '/sys/user/sou',
      curItem: null,
      searchParam: {},
      toolBtns: [
        { name: '新建', clickEvent: this.createItem },
        { name: '生成医院账户', clickEvent: this.createHosAccount }
      ],
      columns: [
        { type: 'selection', width: 55 },
        { prop: 'id', label: '用户ID', hidden: true },
        { prop: 'name', label: '用户名', type: 'input', query: true },
        { prop: 'roleName', label: '所属角色' },
        { prop: 'hospitalName', label: '所属医院' },
        { prop: 'mobile', label: '手机号' },
        { prop: 'status', label: '状态' },
        {
          type: 'operator',
          label: '操作',
          width: 250,
          btnArr: [
            { name: '编辑', clickEvent: this.editItem },
            { name: '停用', type: 'danger', isShow: (row) => (row.status === 1), clickEvent: this.updateStatus, params: 2 },
            { name: '启用', type: 'success', isShow: (row) => (row.status !== 1), clickEvent: this.updateStatus, params: 1 },
            { name: '重置密码', clickEvent: this.updatePassWord }
          ]
        }
      ],
      formProps: [
        { span: 24, prop: 'roleId', label: '所属角色', type: 'select', options: this.$api.getRoles, rules: ['required'] },
        { span: 24, prop: 'name', label: '用户名', type: 'input', rules: ['required'] },
        { span: 24, prop: 'mobile', label: '手机号', type: 'input' }
      ],
      curCityId: 0,
      curProvinceId: 0
    }
  },
  methods: {
    search () {
      this.$refs.table.search(this.searchParam)
    },
    createItem () {
      this.operateType = '添加'
      this.curItem = {}
      this.isShowForm = true
    },
    createHosAccount () {
      this.$network.post('/sys/user/createHosAccount').then(res => {
        this.$message.success('生成成功！')
        this.$refs.table.getTableData()
      })
    },
    submit (item) {
      this.$network.post(this.submitUrl, item).then(res => {
        this.isShowForm = false
        this.$refs.table.getTableData()
      })
    },
    editItem (item) {
      // 判断是否需要重新查询该对象
      this.$network.post(`/sys/user/getById?id=${item.id}`).then(res => {
        this.operateType = '编辑'
        this.curItem = res.data
        this.isShowForm = true
      })
    },
    updateStatus (row, status) {
      this.$network.post(`/sys/user/updateStatus?id=${row.id}&status=${status}`).then(res => {
        this.$refs.table.getTableData()
      })
    },
    updatePassWord (row) {
      this.$network.post(`/sys/user/resetpwd?userIds=${row.id}`).then(res => {
        this.$message.success(`"${row.name}" 该账户密码重置成功！`)
      })
    }
  }
}
</script>
