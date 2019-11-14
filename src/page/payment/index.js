/**
 *
 * @Date 2019-11-14 06:03
 * @Author zone
 */

 'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var _zm           = require('util/zm.js');
var _payment      = require('service/payment-service.js');
var templateIndex = require('./index.string');

// page部分
var page = {
    data : {
        orderNumber : _zm.getUrlParam('orderNumber')
    },
    init : function(){
        this.onLoad();
    },
    onLoad : function(){
        
        // 加载detail数据
        this.loadPaymentInfo();
    },
    
    // 加载订单列表
    loadPaymentInfo : function(){
        var _this           = this,
            paymentHtml   = '',
            $pageWrap        = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(this.data.orderNumber, function(res){
            // 渲染html
            paymentHtml = _zm.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml);
            _this.listenOrderStatus();
        },function(errMsg){
            $pageWrap.html('<p class="err-tip">'+ errMsg +'</p>');
        });        
    },
    //监听订单状态
    listenOrderStatus : function(){
        var _this = this;
        this.paymentTimer = window.setInterval(function(){
            _payment.getPaymentStatus(_this.data.orderNumber,function(res){
                if (res == true) {
                    window.location.href 
                        = './result.html?type=payment&orderNumber='+ _this.data.orderNumber;
                }
            });
        },5e3);
    }
};


$(function(){
    page.init();
});