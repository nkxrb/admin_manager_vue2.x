<template>
  <div class="basetable">

    <!-- 按钮部分 -->
    <div class="panel-tool-btn" v-show="toolBtns && toolBtns.length>0">
      <template v-for="(toolBtn,i) in toolBtns">
        <el-button v-bind:key="'btn-'+i" @click.stop="toolBtn.clickEvent(toolBtn.params)" :icon="toolBtn.icon" plain :type="toolBtn.type || 'primary'" size="mini">
          {{toolBtn.name}}
        </el-button>
      </template>
    </div>

    <!-- 表格部分 -->
    <div class="panel-body">
      <el-table :data="tableData" @selection-change="onBatchSelect" ref="tableName" v-loading="loadData" element-loading-text="正在加载中" :height="tableheight" border
                style="width: 100%;border-radius: 5px;">
        <template v-for="(column,index) in columns">

          <!-- 操作列 -->
          <el-table-column v-if="column.type==='operator'" :key="index" fixed="right" :label="column.label" :width="column.width || 80" :align="column.align || 'center'">
            <template slot-scope="scope">
              <template v-for="(btn,index) in column.btnArr">
                <el-button v-bind:key="index" :type="btn.type || 'primary'" v-show="btn.isShow?btn.isShow(scope.row):true" @click="btn.clickEvent(scope.row, btn.params)"
                           size="mini">
                  {{btn.name}}</el-button>
              </template>
            </template>
          </el-table-column>

          <!-- 复选框 -->
          <el-table-column v-else-if="column.type==='selection'" :key="index" type="selection" width="55"></el-table-column>

          <!-- 标签 -->
          <el-table-column v-else-if="column.hot" :key="index" :label="column.label" :prop="column.prop" :min-width="column.width || 100" :align="column.align || 'center'">
            <template slot-scope="scope">
              <div class="table-hot-mode">
                <span>{{scope.row[column.prop]}}</span>
                <span v-show="scope.row[column.hot]==1" class="table-cell-hot">Hot</span>
              </div>
            </template>
          </el-table-column>

          <!-- 枚举列 -->
          <el-table-column v-else-if="column.dict" :key="index" :label="column.label" :prop="column.prop" :min-width="column.width || 100" :align="column.align || 'center'">
            <template slot-scope="scope">
              <span>{{dictEnum[column.dict][scope.row[column.prop]]}}</span>
            </template>
          </el-table-column>

          <!-- 缩略图 -->
          <el-table-column v-else-if="column.type==='image'" :key="index" :label="column.label" :prop="column.prop" :min-width="column.width || 100"
                           :align="column.align || 'center'">
            <template slot-scope="scope">
              <div style="width: 150px;height:50px;">
                <img style="width:100%;height:100%;" :src="scope.row[column.prop]" />
              </div>
            </template>
          </el-table-column>

          <!-- 普通列 -->
          <el-table-column v-else :key="index" :label="column.label" :prop="column.prop" :type="column.type" :min-width="column.width || 100" :align="column.align || 'center'"
                           show-overflow-tooltip></el-table-column>
        </template>
      </el-table>
      <div slot="page" style="text-align: right;padding-top: 15px;" v-show="!noPage">
        <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="currentPage" :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10,20,30,40,50]" :total="totalRow"></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import ENUM from '@/config/enum.js'
export default {
  name: 'KTable',
  props: {
    height: { type: [String, Number] },
    dataUrl: { type: String },
    dataReq: { type: Function },
    columns: { type: Array, required: true },
    toolBtns: { type: Array },
    noPage: { type: Boolean }
  },
  data: function () {
    return {
      tableheight: window.innerHeight - 250,
      loadData: false,
      dictEnum: ENUM,
      tableData: [],
      queryParams: {},
      currentPage: 1, // 当前页码
      totalRow: 0, // 数据总条目
      pageSize: 20, // 每页显示多少条数据
      batchSelect: []// 批量选择数组
    }
  },
  mounted: function () {
    this.currentPage = 1
    this.getTableData()
  },
  methods: {
    search (queryParams) {
      this.queryParams = queryParams || {}
      this.currentPage = 1
      this.getTableData()
    },
    getTableData () {
      if (this.dataReq) {
        this.dataReq({
          page: this.currentPage,
          size: this.pageSize
        }).then(res => {
          this.tableData = res.tableData
          this.totalRow = res.totalRow
        })
      } else {
        this.$network.post(`${this.dataUrl}?page=${this.currentPage}&size=${this.pageSize}`, this.queryParams).then(res => {
          if (res.data && res.data.dataList && res.data.dataList.length > 0) {
            this.tableData = res.data.dataList
            this.totalRow = res.data.records
          } else {
            this.tableData = []
            this.totalRow = 0
          }
        })
      }
    },
    // 页码选择
    handleCurrentChange (val) {
      this.currentPage = val
      this.getTableData()
    },
    handleSizeChange (size) {
      this.currentPage = 1
      this.pageSize = size
      this.getTableData()
    },
    // 批量选择
    onBatchSelect (val) { this.batchSelect = val },
    getBatchSelect () {
      return this.batchSelect
    }
  }
}
</script>
<style scoped lang="scss">
  .basetable ::v-deep .el-table--enable-row-transition .el-table__body td {
    overflow: hidden;
  }
  .table-hot-mode {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .table-cell-hot {
    color: #ffffff;
    background-color: red;
    padding: 0 8px;
    margin-left: 5px;
    font-size: 12px;
    transform: rotateZ(45deg) scale(0.8);
    transform-origin: top;
    display: inline-block;
    position: absolute;
    width: 81px;
    height: 13px;
    line-height: 14px;
    top: 5px;
    right: -40px;
  }
  .panel-tool-btn {
    text-align: left;
    margin: 8px 0;
  }

  .panel-body {
    overflow: hidden;
    font-weight: normal;
  }

  .promotion-icon {
    width: 56px;
    height: 15px;
    line-height: 15px;
    transform: rotate(315deg);
    -ms-transform: rotate(315deg);
    -moz-transform: rotate(315deg);
    -webkit-transform: rotate(315deg);
    -o-transform: rotate(315deg);
    position: absolute;
    left: -16px;
    top: 0;
    color: #ffffff;
    background-color: #ff7800;
  }

  .promotion-div {
    position: absolute;
    overflow: hidden;
    width: 30px;
    height: 30px;
    font-size: 12px;
    top: 0;
    left: 0;
  }
</style>
