/**
 *
 * @Date 2019-11-05 08:41
 * @Author zone
 */

'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');

var _zm           = require('util/zm.js');
var templateIndex = require('./index.string');
var _user         = require('service/user-service.js');


// page部分
var page = {
    init : function(){
        this.onLoad();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name : 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    // 加载用户信息
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _zm.renderHtml(templateIndex,res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _zm.errorTips(errMsg);
        });
    }
};


$(function(){
    page.init();
});