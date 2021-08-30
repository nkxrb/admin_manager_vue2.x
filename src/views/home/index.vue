<template>
  <div>
    <i class="el-icon-star-on home-icon"></i>
    <h1>欢迎使用私立医院挂号管理系统</h1>
  </div>
</template>

<script>
export default {
  name: 'home',
  mounted () {
    this.$network.post('/hos/getHospitalList?type=1', {}).then(res => {
      return res.data.map(item => ({ label: item.name, value: item.id }))
    })
  }
}
</script>

<style lang="scss" scoped>
  .home-icon {
    font-size: 38px;
    color: #1890ff;
  }
</style>>
