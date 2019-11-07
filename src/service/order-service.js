/**
 *
 * @Date 2019-11-07 03:07
 * @Author zone
 */

'use strict';

var _zm = require('util/zm.js');

var _order = {
    // 获取商品列表
    getProductList : function(resolve, reject){
        _zm.request({
            url     : _zm.getServerUrl('/order/get_order_cart_product.do'),
            // method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 提交订单
    createOrder : function(orderInfo,resolve,reject){
        _zm.request({
            url     : _zm.getServerUrl('/order/create.do'),
            data    : orderInfo,
            // method  : 'POST',
            success : resolve,
            error   : reject
        })
    },
    // 获取订单列表
    getOrderList : function(listParam,resolve,reject){
        _zm.request({
            url     : _zm.getServerUrl('/order/list.do'),
            data    : listParam,
            // method  : 'POST',
            success : resolve,
            error   : reject
        })
    },
    // 获取订单详情
    getOrderDetail : function(orderNumber, resolve, reject){
        _zm.request({
            url     : _zm.getServerUrl('/order/detail.do'),
            data    : {
                orderNo : orderNumber
            },
            // method  : 'POST',
            success : resolve,
            error   : reject
        })
    },
    // 取消订单
    cancelOrder : function(orderNumber, resolve, reject){
        _zm.request({
            url     : _zm.getServerUrl('/order/cancel.do'),
            data    : {
                orderNo : orderNumber
            },
            // method  : 'POST',
            success : resolve,
            error   : reject
        })
    }
}
module.exports = _order;