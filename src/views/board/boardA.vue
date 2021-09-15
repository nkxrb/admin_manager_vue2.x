<template>
  <div>
    <echarts-plus class="bar chart" :cols="barCols" :data="barData"></echarts-plus>
    <echarts-plus class="map chart" type="map" :cols="mapCols" :data="mapData"></echarts-plus>
    <echarts-plus class="ring chart" :cols="ringCols" :data="ringData"></echarts-plus>
    <echarts-plus class="trend chart" :cols="trendCols" :data="trendData"></echarts-plus>
  </div>
</template>

<script>
import EchartsPlus from '@/components/echarts/echartsplus/index.vue'
export default {
  components: { EchartsPlus },
  data () {
    return {
      mapCols: [],
      mapData: [],
      trendCols: [],
      trendData: [],
      barCols: [],
      barData: [],
      ringCols: [],
      ringData: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$network.post('/list500', {}).then(res => {
        console.log(res)
        this.barData = res.result
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .board-a {
    height: 100%;
  }
  .chart {
    padding: 16px;
    box-sizing: border-box;
  }
  .bar {
    width: 25%;
    height: 60%;
    display: inline-block;
  }
  .map {
    width: 50%;
    height: 60%;
    display: inline-block;
  }
  .ring {
    width: 25%;
    height: 60%;
    display: inline-block;
  }
  .trend {
    width: 100%;
    height: 40%;
  }
</style>
