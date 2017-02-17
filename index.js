/**
 * 编译 optimizer 阶段，压缩代码插件接口
 * @param  {string} content     文件内容
 * @param  {File}   file        fis 的 File 对象
 * @param  {object} settings    插件配置属性
 * @return {string}             处理后的文件内容
 */
module.exports = function(content, file, settings) {
	'use strict';

	////   ><间的空白符，单个空格符除外
	content = content.replace(/>(\s+)</ig, function($0, $1) {
		if ($1 == ' ') {
			return $0
		} else {
			return '><'
		}
	});

	////   /* */注释
	content = content.replace(/\/\*(?:.|\s)*?\*\//g, '');

	////   <!-- -->注释
	content = content.replace(/<\!--(?:.|\s)*?-->/g, '');

	////   //注释
	content = content.replace(/(\r|\n|;|,)(\s)*\/\/.*?(?=\?>|\r|\n)/g, function($0, $1) {
		if ($1 == ';' || $1 == ',') {
			return $1
		} else {
			return ''
		}
	});

	////   连续换行符
	content = content.replace(/(\r|\n)(\t| )*?(\r|\n)/g, '$1');

	////   连续制表和空格符
	content = content.replace(/(\t| )+/g, ' ');

	////   空格和换行符相连
	content = content.replace(/\n | \n| \n /g, '\n');

	////   {(;,后的换行符
	content = content.replace(/(\{|\(|;|,)(\r|\n)/g, '$1');

	////   换行符后跟}
	content = content.replace(/(\?php)?(\r|\n)\}/g, function($0, $1) {
		if ($1) {
			return '?php }'
		} else {
			return '}'
		}
	})

	return content
};