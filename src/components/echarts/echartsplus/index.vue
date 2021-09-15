<template>
  <div ref="EchartsEl"></div>
</template>

<script>
import * as echarts from 'echarts'
import PIE from './pie'
import { listenElResize, removeListenElResize } from '@/utils/utils.js'
import { mergeDeepRight } from 'ramda'
self.PLUGINS = { pie: PIE }

export default {
  name: 'EchartsPlus',
  props: {
    type: { type: String, default: 'pie' },
    option: { type: Object, default: () => ({}) },
    cols: { type: Array, default: () => [] },
    data: { type: Array, default: () => [] }
  },
  data () {
    return {
      chart: null
      // PLUGINS: { pie: PIE }
    }
  },
  watch: {
    type: function (val) {
      if (self.PLUGINS[val]) {
        this.resetOption()
      } else {
        import(`./${val}.js`).then(res => {
          console.log(res)
          self.PLUGINS[val] = res.default
          this.resetOption()
        }).catch(error => {
          throw new Error(`加载【${val}.js】文件失败：${error}`)
        })
      }
    },
    data: function () {
      this.resetOption()
    }
  },
  mounted () {
    this.$nextTick(() => this.init())
  },
  beforeDestroy () {
    this.chart && removeListenElResize(this.$refs.EchartsEl) && this.chart.dispose()
  },
  methods: {
    init () {
      this.chart = echarts.init(this.$refs.EchartsEl)
      listenElResize(this.$refs.EchartsEl, () => this.chart.resize())
      this.resetOption()
    },
    resetOption () {
      const option = self.PLUGINS[this.type].resetOption(this.cols, this.data)
      this.chart.clear()
      this.chart.setOption(mergeDeepRight(option, this.option))
    }
  }
}
</script>
