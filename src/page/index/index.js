
'use strict';

require('./index.css');

var _zm = require('util/zm.js');

var html = '<div>{{data}}</div>';
var data = {
    data : 123
}
console.log(_zm.renderHtml(html,data));