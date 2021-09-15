import EchartsPlus from './index.vue'

EchartsPlus.install = app => {
  app.component(EchartsPlus.name, EchartsPlus)
}

EchartsPlus.use = plugin => {
  EchartsPlus.PLUGINS[plugin.name] = plugin
}

export default EchartsPlus
