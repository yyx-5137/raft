module.exports = {
	devServer: {
		open: true,
		host: 'localhost',
		port: 8080,
		https: false,
		//以上的ip和端口是我们本机的;下面为需要跨域的
		proxy: { //配置跨域
			'/GetBasicInfo': {
				target: 'http://192.168.43.105:8080/GetBasicInfo', //这里后台的地址模拟的;应该填写你们真实的后台接口
				ws: true,
				changOrigin: true, //允许跨域
				pathRewrite: {
					'^/GetBasicInfo': ''
				}
			},
			'/GetMasterInfo': {
				target: 'http://192.168.43.105:8080/GetMasterInfo', //这里后台的地址模拟的;应该填写你们真实的后台接口
				ws: true,
				changOrigin: true, //允许跨域
				pathRewrite: {
					'^/GetMasterInfo': ''
				}
			},
			'/GetEntityInfo': {
				target: 'http://192.168.43.105:8080/GetEntityInfo', //这里后台的地址模拟的;应该填写你们真实的后台接口
				ws: true,
				changOrigin: true, //允许跨域
				pathRewrite: {
					'^/GetEntityInfo': ''
				}
			},

		}
	}
}
