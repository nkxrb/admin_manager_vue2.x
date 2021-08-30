<template>
  <div class="page-main">
    <!-- 查询 -->
    <div class="search-panel">
      <div class="item" style="width: 150px;">
        <el-input v-model="searchParam.name" placeholder="资源名称" clearable prefix-icon="el-icon-search"></el-input>
      </div>
      <div class="btn">
        <el-button type="primary" @click="search">查询</el-button>
      </div>
    </div>

    <k-table ref="table" :height="'100%'" :tool-btns="toolBtns" :columns="columns" :data-url="tableUrl"></k-table>
    <!-- <nk-form title="新建资源" width="500px" label-width="100px" :visible.sync="isShowForm" :fields="formProps" :data="curItem" @submit="submit"></nk-form> -->
  </div>
</template>
<script>

export default {
  name: 'permissionInfo',
  data: function () {
    return {
      isShowForm: false,
      tableUrl: '/sys/resource/search',
      submitUrl: '/sys/resource/sou',
      curItem: null,
      searchParam: {},
      toolBtns: [
        // { name: '新建', clickEvent: this.createItem }
      ],
      columns: [
        // { type: 'selection', width: 55 },
        { prop: 'id', label: '资源ID', hidden: true },
        { prop: 'name', label: '资源名称', query: true },
        { prop: 'pname', label: '上级资源名称' },
        { prop: 'flag', label: '资源KEY' },
        {
          prop: 'isCatalogue',
          label: '资源类型',
          query: true,
          type: 'select'
        },
        { prop: 'url', label: '资源URL' }
      ],
      formProps: [
        { prop: 'id', label: 'id', hidden: true },
        { prop: 'pid', span: 24, label: '上级资源', type: 'seltree', options: this.getPids },
        { prop: 'name', span: 24, label: '资源名称', type: 'input', rules: ['required'] },
        { prop: 'flag', span: 24, label: '资源KEY', type: 'input', rules: ['required'] },
        {
          prop: 'isCatalogue',
          label: '资源类型',
          type: 'select',
          span: 24,
          options: [
            { label: '目录', value: 0 }, { label: '菜单', value: 1 }, { label: '按钮', value: 2 }
          ]
        },
        { prop: 'url', span: 24, label: '资源URL', type: 'input' },
        { prop: 'order', span: 24, label: '显示顺序', type: 'number' }
      ]
    }
  },
  methods: {
    search () {
      this.$refs.table.search(this.searchParam)
    },
    getPids () {
      return new Promise((resolve, reject) => {
        const res = this.$network.post('/sys/resource/getTree?id=0&status=1').then(res => {
          return res.data
        })
        resolve(res)
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
    deleteItem (item) {
      this.$network.post(`/sys/resource/updateStatus?id=${item.id}&status=${item.status}`).then(res => {
        this.$refs.table.getTableData()
      })
    },
    updateStatus (item) {
      this.$network.post(`/sys/resource/updateStatus?id=${item.id}&status=${item.status}`).then(res => {
        this.$refs.table.getTableData()
      })
    }
  }
}
</script>
