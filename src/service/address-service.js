/**
 *
 * @Date 2019-11-07 04:06
 * @Author zone
 */

 'use strict';

var _zm = require('util/zm.js');

var _address = {
    // 获取地址列表
    getAddressList : function(resolve, reject){
        _zm.request({
            url     : _zm.getServerUrl('/shipping/list.do'),
            data    : {
                pageSize : 50
            },
            success : resolve,
            error   : reject
        });
    },
    // 新建收货地址
    save :function(addressInfo,resolve,reject){
        _zm.request({
            url     : _zm.getServerUrl('/shipping/add.do'),
            data    : addressInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 更新地址
    update : function(addressInfo,resolve,reject){
        _zm.request({
            url     : _zm.getServerUrl('/shipping/update.do'),
            data    : addressInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 删除收货地址
    deleteAddress : function(shippingId,resolve,reject){
        _zm.request({
            url     : _zm.getServerUrl('/shipping/delete.do'),
            data    : {
                shippingId : shippingId
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 获取单条收件人信息
    getAddress : function(shippingId,resolve, reject){
        _zm.request({
            url     : _zm.getServerUrl('/shipping/select.do'),
            data    : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _address;