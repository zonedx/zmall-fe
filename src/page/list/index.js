/**
 *
 * @Date 2019-11-05 06:28
 * @Author zone
 */
 'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');

var _zm              = require('util/zm.js');
var _product         = require('service/product-service.js');
var Pagination       = require('util/pagination/index.js');
var templateIndex    = require('./index.string');


var page = {
    data : {
        listParam : {
            keyword     : _zm.getUrlParam('keyword') || '',
            categoryId  : _zm.getUrlParam('categoryId') || '',
            orderBy     : _zm.getUrlParam('orderBy') || 'default',
            pageNum     : _zm.getUrlParam('pageNum') || 1,
            pageSize    : _zm.getUrlParam('pageSize') || 20
        }
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadList();
    },
    bindEvent : function(){
        var _this = this;
        // 排序的点击事件
        $('.sort-item').click(function(){
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            // 点击默认排序
            if($this.data('type') === 'default'){
                // 已经是active样式
                if($this.hasClass('active')) {
                    return;
                }
                // 其他
                else{
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            // 点击价格排序
            else if($this.data('type') === 'price'){
                // active class 的处理
                $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                // 升序、降序的处理
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            // 重新加载列表
            _this.loadList();
        });
    },
    // 加载list数据
    loadList : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam,
            $pListCon   = $('.p-list-con');

        $pListCon.html('<div class="loading"></div>');
        _product.getProductList(listParam,function(res){
            listHtml = _zm.renderHtml(templateIndex,{
                list : res.list
            });
            $pListCon.html(listHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        },function(errMsg){
            _zm.errorTips(errMsg);
        });
    },
    // 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container  : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }

};

$(function(){
    page.init();
})