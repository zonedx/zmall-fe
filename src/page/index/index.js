/**
 *
 * @Date 2019-11-01 08:15
 * @Author zone
 */

'use strict';

require('./index.css')
require('page/common/header/index.js');
require('page/common/nav/index.js');
require('util/slider/index.js');
var navSide          = require('page/common/nav-side/index.js');
var templateBanner   = require('./banner.string');
var _zm = require('util/zm.js');

$(function() {
    // 渲染banner的html
    var bannerHtml = _zm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化banner
    var $slider    = $('.banner').unslider({
        dots: true
    });
    // 前一张和后一张操作的时间绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});

