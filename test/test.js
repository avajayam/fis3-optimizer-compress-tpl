const ocTpl = require('../index.js');
const fs = require('fs');

console.log(ocTpl(fs.readFileSync('test.tpl', 'utf8'), {}, {}))