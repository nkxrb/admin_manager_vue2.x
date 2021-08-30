<template>
  <el-select v-model="selId" style="width:100%;" @change="selChange" placeholder="选择医院">
    <el-option v-for="(hos,i) in hospitals" :key="'hos-'+i" :label="hos.name" :value="hos.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'selectHospital',
  props: {
    value: { type: [Number, String] },
    type: { type: String, default: 'all' }
  },
  data () {
    return {
      selId: null,
      hospitals: [],
      typeMap: {
        all: 1,
        check: 2,
        online: 3
      }
    }
  },
  created () {
    this.getHospitals()
  },
  methods: {
    getHospitals () {
      this.$network.post(`/hos/getHospitalList?type=${this.typeMap[this.type]}`, {}).then(res => {
        this.hospitals = res.data
      })
    },
    selChange (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style>
</style>
