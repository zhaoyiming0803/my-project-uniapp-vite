"use strict";var common_vendor=require("../../common/vendor.js");var utils_index=require("../../utils/index.js");const _sfc_main=common_vendor.defineComponent({setup(__props){const title=common_vendor.ref("Hello");console.log("utils.fn1: ",utils_index.fn1());console.log("my.env: ",my.env);return(_ctx,_cache)=>({a:common_vendor.t(title.value)})}});my.createPage(_sfc_main);
