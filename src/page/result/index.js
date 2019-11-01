/**
 *
 * @Date 2019-11-01 03:05
 * @Author zone
 */

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _zm = require('util/zm.js');

$(function(){
    var type        = _zm.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
})
