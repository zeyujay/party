module.exports = {
	// '/upms-provider': {
	//   target: process.env.VUE_APP_PLATFROM_API, // 域名
	//   pathRewrite: { '^/platform': '' }, // 本地代理请求重定向的问题：https://github.com/webpack/webpack-dev-server/issues/793#issuecomment-329223834
	//   ws: false, // 是否启用websockets
	//   changOrigin: true // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
	// },
	'/business': {
		target: 'https://htoh.webmaster.me:8081',
		ws: false,
		changOrigin: true
	}
}