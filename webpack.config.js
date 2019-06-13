const path = require('path');
const Encore = require('@symfony/webpack-encore');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isProduction = Encore.isProduction();

const assetsPath = path.resolve('./src');
const outputPath = path.resolve('./dist');
const publicPath = '/dist';

const jsPath  = path.join(assetsPath, './js');
const cssPath = path.join(assetsPath, './css');

Encore
  .cleanupOutputBeforeBuild()
  .setPublicPath(publicPath)
  .setOutputPath(outputPath)
  .disableSingleRuntimeChunk()

  .addEntry('app',
    [
      path.join(jsPath, '/main.js'),
      path.join(cssPath, '/main.scss'),
    ]
  )
  .enableSassLoader()
  .enablePostCssLoader()
  .enableSourceMaps(!isProduction)
  .enableVersioning(isProduction)

  .configureFilenames({
    js  : './js/[name].bundle.js',
    css : './css/[name].bundle.css'
  })

  .addPlugin(
    new BundleAnalyzerPlugin({
      openAnalyzer: false
    })
  )
;

const config = Encore.getWebpackConfig();

config.watchOptions = {
  poll: true,
  ignored: /node_modules/
};

module.exports = config;
