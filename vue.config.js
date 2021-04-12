let a = require('./vue.proxy.config')
console.log(a)
module.exports = {
	outputDir: 'dist',
	publicPath: process.env.NODE_ENV === 'production'
		? './'
		: '/',
	devServer: {
		// 设置代理
		historyApiFallback: true,
		proxy: require('./vue.proxy.config')
	}
}