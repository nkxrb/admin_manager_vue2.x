export default {
  data () {
    return {
      isShowForm: false,
      curItem: null,
      searchParam: {},
      operateType: '编辑',
      submitExamineUrl: '',
      idkey: 'id'
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
      this.$network.post(this.submitUrl, item).then(res => {
        this.isShowForm = false
        this.$refs.table.getTableData()
      })
    },
    editItem (item) {
      this.$network.post(this.getByIdUrl + item[this.idkey], {}).then(res => {
        this.operateType = '编辑'
        this.curItem = res.data
        this.isShowForm = true
      })
    },
    submitExamine (item) {
      this.$network.post(this.submitExamineUrl + item[this.idkey], {}).then(res => {
        if (res.code === 200) {
          this.$message.success('提交成功')
          this.$refs.table.getTableData()
        }
      })
    }
  }
}
