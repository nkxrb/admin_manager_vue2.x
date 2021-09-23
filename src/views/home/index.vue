<template>
  <div style="display: flex;">
    <ki-echarts-plus :data="dataA" style="width: 25%;height: 350px;"></ki-echarts-plus>
    <ki-echarts-plus :data="dataA" style="width: 25%;height: 350px;"></ki-echarts-plus>
    <ki-echarts-plus :data="dataA" style="width: 25%;height: 350px;"></ki-echarts-plus>
  </div>
</template>

<script>
import { EchartsPlus } from 'kidar-vue'
export default {
  components: { KiEchartsPlus: EchartsPlus },
  name: 'home',
  mounted () {
    this.init()
  },
  data () {
    return {
      dataA: [
        { name: '123', value: 123 },
        { name: '123', value: 123 },
        { name: '123', value: 123 }
      ]
    }
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
