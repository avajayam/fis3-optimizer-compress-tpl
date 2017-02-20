/**
 * 编译 optimizer 阶段，压缩代码插件接口
 * @param  {string} content     文件内容
 * @param  {File}   file        fis 的 File 对象
 * @param  {object} settings    插件配置属性
 * @return {string}             处理后的文件内容
 */
module.exports = function(content, file, settings) {
	'use strict';

	var newContent = '';
	var _indexStart = -1;
	var _indexEnd = -1;

	while (content !== '') {
		content = split(content);
	}

	return newContent;


	// php 代码不做处理
	// 返回一次完整php分割后的代码，...<?(php)?...?> + ...
	function split(content) {
		_indexStart = content.indexOf('<?');
		if (_indexStart !== -1) {
			newContent += compress(content.substring(0, _indexStart));
			content = content.substr(_indexStart);
			_indexEnd = content.indexOf('?>');
			if (_indexEnd !== -1) {
				newContent += content.substring(0, _indexEnd + 2);
				return content.substr(_indexEnd + 2)
			} else {
				newContent += content;
				return ''
			}
		} else {
			newContent += compress(content);
			return ''
		}

	}

	// 压缩
	function compress(content) {

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
		content = content.replace(/(\r|\n|;|,)(\s)*\/\/.*?(?=\r|\n)/g, function($0, $1) {
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
		content = content.replace(/(\r|\n)\}/g, '}');

		return content
	}
};