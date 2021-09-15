<template>
  <div ref="EchartsEl"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'EchartsPlus',
  props: {
    data: { type: Array, default: () => [] }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    data: function () {
      this.resetOption()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  beforeDestroy () {
    this.chart && this.chart.dispose()
  },
  methods: {
    init () {
      this.chart = echarts.init(this.$refs.EchartsEl)
      const option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
      this.chart.setOption(option)
    },
    resetOption () {

    }
  }
}
</script>
