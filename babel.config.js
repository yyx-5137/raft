module.exports = {
	presets: [
		["@babel/preset-env", {
			"modules": false
		}]
	],
	plugins: [
		['import', {
			libraryName: 'vant',
			libraryDirectory: 'es',
			style: true
		}, 'vant'],
		[
			"component",
			{
				"libraryName": "element-ui",
				"styleLibraryName": "theme-chalk"
			}
		]
	]
}
