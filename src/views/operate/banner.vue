<template>
  <div class="page-main">
    <k-table ref="table" :height="'100%'" :tool-btns="toolBtns" :columns="columns" :data-url="tableUrl"></k-table>
    <nk-form :title="`${operateType}banner`" :visible.sync="isShowForm" :fields="formProps" :data="curItem" @submit="submit"></nk-form>

    <el-dialog title="查看banner图" width="500px" :visible.sync="isShowImage">
      <div class="show-banner">
        <div class="item">
          <label>banner名称：</label>
          <span>{{curItem.imageName}}</span>
        </div>
        <div class="item">
          <label>展示位置：</label>
          <span>{{sites[curItem.site-1]}}</span>
        </div>
        <div class="item">
          <img width="100%" height="100%" :src="curItem.imagePath" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>

export default {
  name: 'banner',
  data: function () {
    return {
      isShowForm: false,
      isShowImage: false,
      sites: ['首页顶部', '其他'],
      operateType: '编辑',
      tableUrl: '/wrap/search',
      submitUrl: '/wrap/sou',
      curItem: {},
      searchParam: {},
      toolBtns: [
        { name: '添加Banner', clickEvent: this.createItem }
      ],
      columns: [
        { prop: 'imageName', label: 'banner名称', type: 'input' },
        { prop: 'imagePath', label: 'banner缩略图', type: 'image' },
        { prop: 'site', label: '展示位置', dict: 'sites' },
        { prop: 'orderIndex', label: 'banner顺序' },
        { prop: 'targetUrl', label: '跳转位置' },
        {
          type: 'operator',
          label: '操作',
          width: 210,
          btnArr: [
            { name: '查看', clickEvent: this.showImage },
            { name: '编辑', clickEvent: this.editItem },
            { name: '删除', type: 'danger', clickEvent: this.deleteItem }
          ]
        }
      ],
      formProps: [
        { prop: 'imageName', label: 'banner名称', type: 'input', rules: ['required'] },
        { prop: 'site', label: '展示位置', type: 'select', options: this.$api.getBannerPositions, rules: ['required'] },
        { prop: 'orderIndex', label: 'banner顺序', type: 'inputNumber', rules: ['required', 'pint'] },
        { prop: 'targetUrl', label: '跳转位置', span: 24, type: 'input', rules: ['required'] },
        { prop: 'description', label: '描述', type: 'text', span: 24 },
        { prop: 'imagePath', label: '上传图片', span: 24, type: 'image', httpRequest: this.$api.upload, rules: ['required'] }
      ]
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
    submit (item) {
      const url = this.submitUrl
      this.$network.post(url, item).then(res => {
        this.search()
        this.isShowForm = false
      })
    },
    showImage (item) {
      this.curItem = item
      this.isShowImage = true
    },
    deleteItem (item) {
      this.$confirm(`确定要删除【${item.imageName}】吗`, '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$network.post(`/wrap/del?ids=${item.id}`, {}).then(res => {
          this.$message.success('删除成功!')
          this.search()
        })
      })
    },
    editItem (item) {
      this.operateType = '编辑'
      this.curItem = item
      this.isShowForm = true
    }
  }
}
</script>

<style lang="scss">
  .show-banner {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 100%;
      margin: 12px 20px;
      text-align: left;
      label {
        font-weight: bold;
      }
      span {
        margin-left: 10px;
      }
    }
  }
</style>
