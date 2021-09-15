<template>
  <div>
    <dynamic-bar-y class="home-echart"></dynamic-bar-y>
    <dynamic-bar-y class="home-echart"></dynamic-bar-y>
    <dynamic-bar-y class="home-echart"></dynamic-bar-y>
    <dynamic-bar-y class="home-echart"></dynamic-bar-y>
    <dynamic-bar-y class="home-echart"></dynamic-bar-y>
  </div>
</template>

<script>
import DynamicBarY from '../../components/echarts/DynamicBarY.vue'
export default {
  components: { DynamicBarY },
  name: 'home',
  mounted () {
    this.init()
  },
  methods: {
    init () {

    }
  }
}
</script>

<style lang="scss" scoped>
  .home-icon {
    font-size: 38px;
    color: #1890ff;
  }
  .home-echart {
    width: 500px;
    height: 600px;
  }
</style>>
