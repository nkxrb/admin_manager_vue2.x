/**
 * 配置参数参考以下网址
 * https://cli.vuejs.org/zh/config/
 */
const webpack = require('webpack') // 引入webpack库
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  // 发布时服务访问路径
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // 服务请求配置
  devServer: {
    port: 9000
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000/',
    //     ws: true,
    //     changeOrigin: true
    //   }
    // }
  },
  // 打包文件输出路径
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: 'index.html',
  productionSourceMap: false,

  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      scss: {
        /* sass-loader 9.0版本的写法 */
        additionalData (content, { resourcePath, rootContext }) {
          const relativePath = path.relative(rootContext, resourcePath)
          if (
            relativePath.replace(/\\/g, '/') !== 'src/assets/css/global.scss'
          ) {
            return '@import "~@/assets/css/global.scss";' + content
          }
          return content
        }
      }
    }
  },
  configureWebpack () {
    return {
      resolve: {
        alias: {
          '@': resolve('src')
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugin('contextReplacementPlugin').use(// 日期时间处理插件仅打包汉语包
      new webpack.ContextReplacementPlugin(
        /moment[/\\]locale$/,
        /zh-cn/
      )
    )
  }
}
