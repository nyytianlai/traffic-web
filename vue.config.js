const path = require('path')
const webpack = require('webpack')
const { name } = require('./package')
const port = 7103
const { VUE_APP_PUBLIC_PATH, NODE_ENV } = process.env
const resolve = (dir) => path.join(__dirname, dir)
// mars3d 三维地图包配置
const cesiumSource = 'node_modules/mars3d-cesium/Build/Cesium/'
const CopyWebpackPlugin = require('copy-webpack-plugin')
let plugins = []
if (process.env.NODE_ENV === 'production') {
  plugins = [
    new webpack.DefinePlugin({
      CESIUM_BASE_URL: JSON.stringify('./static')
    }),
    new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Workers'), to: './static/Workers' }]),
    new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: './static/Assets' }]),
    new CopyWebpackPlugin([
      { from: path.join(cesiumSource, 'ThirdParty'), to: './static/ThirdParty' }
    ]),
    new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: './static/Widgets' }])
  ]
} else {
  plugins = [
    new webpack.DefinePlugin({
      CESIUM_BASE_URL: JSON.stringify('/')
    }),
    new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Workers'), to: './Workers' }]),
    new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: './Assets' }]),
    new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty'), to: './ThirdParty' }]),
    new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: './Widgets' }])
  ]
}
const config = {
  filenameHashing: true,
  publicPath: VUE_APP_PUBLIC_PATH,
  assetsDir: 'assets',
  devServer: {
    port,
    hot: true,
    open: true,
    disableHostCheck: true, //webpack4.0 开启热更新
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/api-proxy': {
        target: 'http://10.224.156.74:8080',
        changeOrigin: true
      },
      '/sdti/': {
        target: 'https://192.168.34.96:62001/',
        changeOrigin: true
      },
      '/gw/OGC/' : {
        target: 'http://10.253.102.69/gw/OGC/',
        changeOrigin: true
      }
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        minSize: 60000,
        maxSize: 550000
      }
    },
    module: { unknownContextCritical: false },
    plugins: [...plugins],
    output: {
      // sourcePrefix: ' '
      // 把子应用打包成 umd 库格式
      library: name,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    },
    amd: {
      // 2
      toUrlUndefined: true // webpack在cesium中能友好的使用require
    }
  },
  // 设置在开发环境下每次保存代码时都开启 eslint 验证
  lintOnSave: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true)
    // 配置别名
    config.resolve.alias.set('@', resolve('src'))
    // 设置less全局变量
    config.module.rule('less').oneOfs.store.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: (() => {
            return process.env.NODE_ENV === 'development'
              ? './src/assets/styles/STATIC_URL_LOCAL.less'
              : './src/assets/styles/STATIC_URL.less'
          })()
        })
        .end()
    })
    // 设置svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    config.module
      .rule(/\.js$/)
      .include.add(resolve(__dirname, 'node_modules/mars3d-echarts'))
      .end()
      .use('babel-loader')
      .loader('babel-loader')
      .options({
        presets: ['@babel/preset-env'],
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              absoluteRuntime: false,
              corejs: false,
              helpers: false,
              regenerator: true,
              useESModules: false
            }
          ]
        ]
      })
    config.optimization
      .minimizer('terser')
      .tap((args) => {
        Object.assign(args[0].terserOptions.compress, {
          // 生产模式 console.log 去除
          pure_funcs: ['console.log']
        })
        return args
      })
      .end()
  }
}

module.exports = config
