"use strict";
var common_vendor = require("../../common/vendor.js");
var pages_index_bundle = require("./bundle.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const title = common_vendor.ref("Hello");
    console.log("Authing1: ", Object.keys(pages_index_bundle.__authing_webpack_exports__default));
    common_vendor.index.setStorage({
      key: "12321",
      data: "12321",
      success: (res) => {
        console.log("success");
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(title.value)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhaoyiming/Desktop/github/my-project-uniapp-vite/src/pages/index/index.vue"]]);
swan.createPage(MiniProgramPage);
