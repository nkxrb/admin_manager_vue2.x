<template>
  <div>
    <el-select v-model="doctorId" filterable remote placeholder="请选择医生" :remote-method="remoteMethod">
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
        <span style="float: left">{{ item.name }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px;margin-left:8px;">{{item.hospitalName}}({{ item.departmentName }})</span>
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'selectDoctor',
  props: {
    value: { type: [Number, String] }
  },
  computed: {
    doctorId: {
      get: function () {
        return this.value
      },
      set: function (val) {
        this.$emit('input', val)
      }
    }
  },
  data () {
    return {
      options: []
    }
  },
  methods: {
    remoteMethod (query) {
      this.$network.post('/doc/getByName?name=' + query, {}).then(res => {
        console.log(res.data)
        this.options = res.data
      })
    }
  }
}
</script>

<style>
</style>
