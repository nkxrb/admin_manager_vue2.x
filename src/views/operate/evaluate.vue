<template>
  <div class="page-main">
    <!-- 查询 -->
    <div class="search-panel">
      <div class="item" style="width: 150px;">
        <el-select v-model="searchParam.satisfaction" style="width:100%;" clearable placeholder="满意度-全部">
          <el-option v-for="(item, i) in satisfaction" :key="i" :label="item" :value="i"></el-option>
        </el-select>
      </div>
      <div class="item" style="width: 150px;">
        <el-select v-model="searchParam.status" style="width:100%;" clearable placeholder="评价状态-全部">
          <el-option v-for="(item, i) in evaluateStatus" :key="i" :label="item" :value="i"></el-option>
        </el-select>
      </div>
      <div class="item" style="width: 150px;">
        <select-doctor v-model="searchParam.doctorId"></select-doctor>
      </div>
      <div class="item" style="width: 350px;">
        <el-date-picker v-model="searchParam.evaluateDate" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="评价时间" end-placeholder="评价时间">
        </el-date-picker>
      </div>
      <div class="btn">
        <el-button type="primary" @click="search">查询</el-button>
      </div>
    </div>

    <k-table ref="table" :height="'100%'" :tool-btns="toolBtns" :columns="columns" :data-url="tableUrl"></k-table>

    <el-dialog title="绑定医生" width="500px" :visible.sync="isShowForm" :close-on-click-modal="false">
      <el-form ref="bindDoctorForm" :model="bindDoctorItem" class="off-form" label-width="150px">
        <el-form-item label="选择医生" :rules="bindDoctorRules" prop="doctorId">
          <select-doctor v-model="bindDoctorItem.doctorId"></select-doctor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowForm = false">取消</el-button>
        <el-button type="primary" @click="bindDoctors">绑定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import ENUM from '@/config/enum.js'
import SelectDoctor from '../../components/SelectDoctor.vue'
export default {
  name: 'evaluate',
  components: { SelectDoctor },
  data () {
    return {
      isShowForm: false,
      operateType: '编辑',
      selIds: [],
      tableUrl: '/estimate/search',
      submitUrl: '/dep/apply/sou',
      curItem: null,
      bindDoctorItem: {
        doctorId: ''
      },
      searchParam: {},
      evaluateStatus: ENUM.evaluateStatus,
      satisfaction: ENUM.satisfaction,
      toolBtns: [
        { name: '批量绑定医生', clickEvent: this.showBindDoctor },
        { name: '批量删除', clickEvent: this.deleteBatch }
      ],
      bindDoctorRules: [
        { required: true, message: '请选择', trigger: 'change' }
      ],
      columns: [
        { type: 'selection' },
        { prop: 'phone', label: '账号', type: 'input', query: true },
        { prop: 'doctorName', label: '评价医生' },
        { prop: 'satisfaction', label: '满意度', dict: 'satisfaction' },
        { prop: 'estimate', label: '评价详情' },
        { prop: 'createTime', label: '评价时间' },
        { prop: 'status', label: '审核状态', dict: 'evaluateStatus' },
        {
          type: 'operator',
          label: '操作',
          width: 210,
          btnArr: [
            { name: '审核', clickEvent: this.review },
            { name: '删除', type: 'danger', clickEvent: this.deleteItem }
          ]
        }
      ]
    }
  },
  methods: {
    search () {
      if (this.searchParam.evaluateDate && this.searchParam.evaluateDate.length > 0) {
        this.searchParam.startDate = this.searchParam.evaluateDate[0]
        this.searchParam.endDate = this.searchParam.evaluateDate[1]
      } else {
        delete this.searchParam.startDate
        delete this.searchParam.endDate
      }
      this.$refs.table.search(this.searchParam)
    },
    showBindDoctor () {
      // 判断是否选中一个医生
      const batchSelect = this.$refs.table.batchSelect
      if (batchSelect && batchSelect.length > 0) {
        this.selIds = batchSelect.map(item => item.id)
        this.isShowForm = true
      } else {
        this.$message.warning('请至少选择一条评价进行操作')
      }
    },
    bindDoctors () {
      this.$refs.bindDoctorForm.validate(valid => {
        if (valid) {
          this.$network.post(`/estimate/updateDoctorId?ids=${this.selIds.join()}&doctorId=${this.bindDoctorItem.doctorId}`, {}).then(res => {
            this.$message.success('操作成功!')
            this.search()
            this.isShowForm = false
          })
        } else {
          this.$message.warning('请选择一名医生后再进行操作！')
        }
      })
    },
    deleteBatch () {
      // 判断是否选中一个医生
      const batchSelect = this.$refs.table.batchSelect
      if (batchSelect && batchSelect.length > 0) {
        const ids = batchSelect.map(item => item.id)
        this.delete(ids)
      } else {
        this.$message.warning('请至少选择一条评价进行操作')
      }
    },
    delete (ids) {
      const len = ids.length
      this.$confirm(`确认删除${len === 1 ? '此' : ('当前选中的' + len + '条')}用户评价？`, '信息提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        this.$network.post('/estimate/delete?ids=' + ids.join(), {}).then(res => {
          this.$message.success('操作成功!')
          this.search()
        })
      })
    },
    deleteItem (item) {
      this.delete([item.id])
    },
    submit (item) {
      const url = this.submitUrl
      this.$network.post(url, item).then(res => {
        this.$refs.table.getTableData()
        this.isShowForm = false
      })
    },
    editItem (item) {
      this.$set(this.formProps, 0, { prop: 'hospitalName', label: '所属医院', type: 'input', disabled: true })
      this.$set(this.formProps, 1, { prop: 'name', label: '科室名称', type: 'input', disabled: true })
      this.$network.post(`/dep/apply/getById?id=${item.departmentId}`, {}).then(res => {
        this.operateType = '编辑'
        this.curItem = res.data
        this.isShowForm = true
      })
    },
    review (item) {
      this.$confirm('留言审核通过，前端可显示，所有人可见', '信息提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '审核通过',
        cancelButtonText: '审核不通过',
        type: 'warning'
      }).then(() => {
        this.updateStatus(item, 2)
      }).catch(action => {
        action === 'cancel' && this.updateStatus(item, 3)
      })
    },
    updateStatus (item, status) {
      this.$network.post(`/estimate/updateStatus?id=${item.id}&status=${status}`, {}).then(res => {
        this.$message.success('操作成功!')
        this.search()
      })
    }
  }
}
</script>
