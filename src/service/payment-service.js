/**
 *
 * @Date 2019-11-14 07:52
 * @Author zone
 */
 'use strict';

var _zm = require('util/zm.js');

var _payment = {
    // 获取商品列表
    getPaymentInfo : function(orderNumber,resolve, reject){
        _zm.request({
            url     : _zm.getServerUrl('/order/pay.do'),
            data    : {
                orderNo : orderNumber
            },
            // method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //获取订单状态
    getPaymentStatus : function(orderNumber,resolve, reject){
        _zm.request({
            url     : _zm.getServerUrl('/order/query_order_pay_status.do'),
            data    : {
                orderNo : orderNumber
            },
            // method  : 'POST',
            success : resolve,
            error   : reject
        });
    }

}
module.exports = _payment;