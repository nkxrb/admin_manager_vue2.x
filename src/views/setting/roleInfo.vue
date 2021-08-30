<template>
  <div class="page-main">
    <!-- 查询 -->
    <div class="search-panel">
      <div class="item" style="width: 150px;">
        <el-input v-model="searchParam.name" placeholder="角色名称" clearable prefix-icon="el-icon-search"></el-input>
      </div>
      <div class="btn">
        <el-button type="primary" @click="search">查询</el-button>
      </div>
    </div>

    <k-table ref="table" :height="'100%'" :tool-btns="toolBtns" :columns="columns" :data-url="tableUrl"></k-table>
    <nk-form title="新建角色" width="500px" :visible.sync="isShowForm" :fields="formProps" :data="curItem" @submit="submit"></nk-form>

    <!-- 菜单树 -->
    <el-dialog :title="`修改“${curItem.name}”菜单`" :visible.sync="isShowMenuTree">
      <el-tree ref="menuTree" :data="allMenu" :default-checked-keys="curRoleMenu" show-checkbox node-key="value"></el-tree>
      <el-button type="primary" @click="setMenu">确认</el-button>
    </el-dialog>

    <!-- 权限树 -->
    <el-dialog :title="`修改“${curItem.name}”权限`" :visible.sync="isShowTree">
      <el-tree ref="permissionTree" :data="allPermission" :default-checked-keys="curRolePerms" show-checkbox node-key="value"></el-tree>
      <el-button type="primary" @click="setPermission">确认</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'userInfo',
  data: function () {
    return {
      isShowForm: false,
      isShowTree: false,
      isShowMenuTree: false,
      tableUrl: '/sys/role/search',
      submitUrl: '/sys/role/sou',
      curItem: {},
      searchParam: {},
      allMenu: [],
      curRoleMenu: [],
      allPermission: [],
      curRolePerms: [],
      toolBtns: [
        // { name: '新建', clickEvent: this.createItem },
        { name: '分配菜单', type: 'warning', clickEvent: this.showMenuTree },
        { name: '分配权限', type: 'warning', clickEvent: this.showPermission }
      ],
      columns: [
        { type: 'selection', width: 55 },
        { prop: 'name', label: '角色名称', type: 'input', query: true },
        { prop: 'description', label: '角色描述' },
        { prop: 'type', label: '角色类型', type: 'select', dict: 'roleType', query: true },
        { prop: 'createTime', label: '创建时间' }
        // { prop: 'lastModifyTime', label: '修改时间' }
        // {
        //   type: 'operator',
        //   label: '操作',
        //   width: 260,
        //   btnArr: [
        //     { name: '修改', clickEvent: this.editItem },
        //     { name: '删除', type: 'danger', clickEvent: this.deleteItem }
        //   ]
        // }
      ],
      formProps: [
        { prop: 'name', span: 24, label: '角色名称', type: 'input', rules: ['required'] },
        {
          prop: 'type',
          label: '角色类型',
          type: 'select',
          span: 24,
          options: [
            { label: '公共角色', value: 1 },
            { label: '医院角色', value: 2 },
            { label: '预上线数据录入', value: 3 }
          ],
          rules: ['required']
        },
        { prop: 'description', span: 24, label: '角色描述', type: 'text' }
      ]
    }
  },
  created: function () {
    this.getAllPermission()
    this.getAllMenus()
  },
  methods: {
    search () {
      this.$refs.table.search(this.searchParam)
    },
    getAllMenus () {
      this.$network.post('/sys/menu/getTree').then(res => {
        this.allMenu = res.data
      })
    },
    getAllPermission () {
      this.$network.post('/sys/resource/getTree?id=0&status=1').then(res => {
        this.allPermission = res.data
      })
    },
    createItem () {
      this.curItem = {}
      this.isShowForm = true
    },
    submit (item) {
      this.$network.post(this.submitUrl, item).then(res => {
        this.isShowForm = false
        this.$refs.table.getTableData()
      })
    },
    editItem (item) {
      // 判断是否需要重新查询该对象
      this.curItem = item
      this.isShowForm = true
    },
    updateStatus (item, status) {
      this.$network.post(`/sys/user/updateStatus?id=${item.id}&status=${status}`).then(res => {
        this.$refs.table.getTableData()
      })
    },
    deleteItem (item) {
      this.$network.post(`/sys/role/delete?id=${item.id}`).then(res => {
        this.$message.success('删除角色成功')
        this.$refs.table.getTableData()
      })
    },
    showMenuTree (item) {
      const batchSelect = this.$refs.table.batchSelect
      if (batchSelect && batchSelect.length === 1) {
        this.curItem = batchSelect[0]
        this.$network.post(`/sys/menu/getByRoleId?roleId=${batchSelect[0].id}`).then(res => {
          if (this.$refs.menuTree) {
            this.$refs.menuTree.setCheckedKeys(res.data || [])
          } else {
            this.curRoleMenu = res.data
          }
          this.isShowMenuTree = true
        })
      } else {
        this.$message.warning('请选择一条记录进行操作')
      }
    },
    setMenu () {
      const resourceIds = this.$refs.menuTree.getCheckedKeys()
      this.$network.post(`/sys/menu/privilege?roleId=${this.curItem.id}&menuIds=${resourceIds.join(',')}`).then(res => {
        this.isShowMenuTree = false
      })
    },
    showPermission (item) {
      const batchSelect = this.$refs.table.batchSelect
      if (batchSelect && batchSelect.length === 1) {
        this.curItem = batchSelect[0]
        this.$network.post(`/sys/resource/getByRoleId?roleId=${batchSelect[0].id}`).then(res => {
          if (this.$refs.permissionTree) {
            this.$refs.permissionTree.setCheckedKeys(res.data || [])
          } else {
            this.curRolePerms = res.data
          }
          this.isShowTree = true
        })
      } else {
        this.$message.warning('请选择一条记录进行操作')
      }
    },
    setPermission () {
      const resourceIds = this.$refs.permissionTree.getCheckedKeys()

      this.$network.post(`/sys/role/privilege?roleId=${this.curItem.id}&resourceIds=${resourceIds.join(',')}`).then(res => {
        this.isShowTree = false
      })
    }
  }
}
</script>
