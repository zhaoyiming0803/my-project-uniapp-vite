"use strict";
var common_vendor = require("../../common/vendor.js");
var __webpack_modules__ = [
  ,
  (__unused_webpack_module, __webpack_exports_authing__2, __webpack_require_authing__2) => {
    __webpack_require_authing__2.r(__webpack_exports_authing__2);
    __webpack_require_authing__2.d(__webpack_exports_authing__2, {
      "default": () => __WEBPACK_DEFAULT_EXPORT__
    });
    var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require_authing__2(2);
    var _global_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require_authing__2(3);
    (0, _global_api__WEBPACK_IMPORTED_MODULE_1__.initGlobalApi)(_instance__WEBPACK_IMPORTED_MODULE_0__["default"]);
    _instance__WEBPACK_IMPORTED_MODULE_0__["default"].version = "0.0.1-alpha.0";
    const __WEBPACK_DEFAULT_EXPORT__ = _instance__WEBPACK_IMPORTED_MODULE_0__["default"];
    __webpack_require_authing__2.g.AuthingMove = _instance__WEBPACK_IMPORTED_MODULE_0__["default"];
  },
  (__unused_webpack_module, __webpack_exports_authing__2, __webpack_require_authing__2) => {
    __webpack_require_authing__2.r(__webpack_exports_authing__2);
    __webpack_require_authing__2.d(__webpack_exports_authing__2, {
      "default": () => AuthingMove
    });
    function AuthingMove() {
    }
  },
  (__unused_webpack_module, __webpack_exports_authing__2, __webpack_require_authing__2) => {
    __webpack_require_authing__2.r(__webpack_exports_authing__2);
    __webpack_require_authing__2.d(__webpack_exports_authing__2, {
      "initGlobalApi": () => initGlobalApi
    });
    var _use__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require_authing__2(4);
    function initGlobalApi(AuthingMove) {
      (0, _use__WEBPACK_IMPORTED_MODULE_0__.initUse)(AuthingMove);
    }
  },
  (__unused_webpack_module, __webpack_exports_authing__2, __webpack_require_authing__2) => {
    __webpack_require_authing__2.r(__webpack_exports_authing__2);
    __webpack_require_authing__2.d(__webpack_exports_authing__2, {
      "initUse": () => initUse
    });
    function initUse(AuthingMove) {
      AuthingMove.use = function use(plugin, options = {}) {
        const installedPlugins = this._installedPlugins || (this._installedPlugins = []);
        if (installedPlugins.indexOf(plugin) > -1) {
          return this;
        }
        const args = [options];
        args.unshift(this);
        if (typeof plugin.install === "function") {
          plugin.install.apply(plugin, args);
        } else if (typeof plugin === "function") {
          plugin.apply(null, args);
        }
        installedPlugins.push(plugin);
        return this;
      };
    }
  },
  (__unused_webpack_module, __webpack_exports_authing__2, __webpack_require_authing__2) => {
    __webpack_require_authing__2.r(__webpack_exports_authing__2);
    __webpack_require_authing__2.d(__webpack_exports_authing__2, {
      "default": () => install
    });
    var _transform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require_authing__2(6);
    var _shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require_authing__2(7);
    function install(AuthingMove, options = {}) {
      if (to === "uni") {
        return;
      }
      const {
        custom = {}
      } = options;
      const from = "wx";
      const to = "uni";
      const transformedApi = (0, _transform__WEBPACK_IMPORTED_MODULE_0__["default"])({
        from,
        to,
        custom
      });
      Object.keys(transformedApi).forEach((api) => {
        try {
          if (typeof transformedApi[api] !== "function") {
            AuthingMove[api] = transformedApi[api];
            return;
          }
          AuthingMove[api] = (...args) => transformedApi[api].apply(AuthingMove, args);
        } catch (e) {
          (0, _shared__WEBPACK_IMPORTED_MODULE_1__.error)(`Call ${AuthingMove}.${api} error:` + JSON.stringify(e));
        }
      });
    }
  },
  (__unused_webpack_module, __webpack_exports_authing__2, __webpack_require_authing__2) => {
    __webpack_require_authing__2.r(__webpack_exports_authing__2);
    __webpack_require_authing__2.d(__webpack_exports_authing__2, {
      "default": () => transformApi
    });
    var _shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require_authing__2(7);
    var _platforms_wx_ali__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require_authing__2(8);
    const fromMap = (0, _shared__WEBPACK_IMPORTED_MODULE_0__.generateFromMap)();
    function joinName(from = "", to = "") {
      const _from = `__authing_move_src_mode_${from}__`;
      return `${fromMap[_from]}_${to}`;
    }
    function transformApi(options) {
      const envContext = (0, _shared__WEBPACK_IMPORTED_MODULE_0__.getEnvContext)();
      const { from, to } = options;
      const fromTo = joinName(from, to);
      const platformMap = {
        "wx_ali": (0, _platforms_wx_ali__WEBPACK_IMPORTED_MODULE_1__["default"])()
      };
      const needProxy = /* @__PURE__ */ Object.create(null);
      const transformedApi = platformMap[fromTo] || {};
      Object.keys(envContext).concat(Object.keys(transformedApi)).forEach((key) => {
        needProxy[key] = envContext[key] || transformedApi[key];
      });
      const apis = /* @__PURE__ */ Object.create(null);
      Object.keys(needProxy).forEach((api) => {
        if (typeof needProxy[api] !== "function") {
          apis[api] = needProxy[api];
          return;
        }
        apis[api] = (...args) => {
          let from2 = options.from;
          const to2 = options.to;
          if (args.length) {
            from2 = args.pop();
            if (typeof from2 !== "string" || !fromMap[from2]) {
              args.push(from2);
              from2 = options.from;
            }
          }
          const fromTo2 = joinName(from2, to2);
          if (options.custom[fromTo2] && options.custom[fromTo2][api]) {
            return options.custom[fromTo2][api].apply(this, args);
          }
          if (platformMap[fromTo2] && platformMap[fromTo2][api]) {
            return platformMap[fromTo2][api].apply(this, args);
          }
          if (envContext[api]) {
            return envContext[api].apply(this, args);
          }
          (0, _shared__WEBPACK_IMPORTED_MODULE_0__.error)(`\u5F53\u524D\u5C0F\u7A0B\u5E8F\u73AF\u5883\u4E0D\u5B58\u5728 ${api} \u65B9\u6CD5`);
        };
      });
      return apis;
    }
  },
  (__unused_webpack_module, __webpack_exports_authing__2, __webpack_require_authing__2) => {
    __webpack_require_authing__2(1).default;
    __webpack_require_authing__2.r(__webpack_exports_authing__2);
    __webpack_require_authing__2.d(__webpack_exports_authing__2, {
      "adaptOptions": () => adaptOptions,
      "error": () => error,
      "generateFromMap": () => generateFromMap,
      "getEnvContext": () => getEnvContext,
      "handleSuccess": () => handleSuccess,
      "makeMap": () => makeMap,
      "noop": () => noop,
      "warn": () => warn
    });
    function getEnvContext() {
      switch ("uni") {
        case "wx":
          return common_vendor.index;
        case "ali":
          return my;
        case "swan":
          return swan;
        case "qq":
          return qq;
        case "tt":
          return tt;
        case "jd":
          return jd;
        case "qa":
          return qa;
        case "Taro":
          return Taro;
        case "uni":
          return common_vendor.index;
      }
    }
    function generateFromMap() {
      const platforms = ["wx", "ali", "baidu", "qq", "tt", "jd", "qa"];
      return platforms.reduce((map, platform) => {
        map[`__authing_move_src_mode_${platform}__`] = platform;
        return map;
      }, {});
    }
    function makeMap(arr) {
      return arr.reduce((map, item) => {
        map[item] = true;
        return map;
      }, {});
    }
    function warn(message) {
      console.warn && console.warn(`[AuthingMove/api-proxy warn]:
 ${message}`);
    }
    function error(message) {
      console.error && console.error(`[AuthingMove/api-proxy error]:
 ${message}`);
    }
    function noop() {
    }
    function adaptOptions(originalOptions, matchedOptions, extraOptions) {
      let options = {};
      Object.keys(originalOptions).forEach((key) => {
        const _key = matchedOptions.hasOwnProperty(key) ? matchedOptions[key] : key;
        if (_key) {
          options[_key] = originalOptions[key];
        }
      });
      options = Object.assign({}, options, extraOptions);
      return options;
    }
    function handleSuccess(originalOptions, wrappedSuccess = noop, context) {
      if (!originalOptions.success) {
        return;
      }
      const _this = context || this;
      const cachedSuccess = originalOptions.success;
      originalOptions.success = (res) => cachedSuccess.call(_this, wrappedSuccess(res) || res);
    }
  },
  (__unused_webpack_module, __webpack_exports_authing__2, __webpack_require_authing__2) => {
    __webpack_require_authing__2.r(__webpack_exports_authing__2);
    __webpack_require_authing__2.d(__webpack_exports_authing__2, {
      "default": () => getWxToAliApi
    });
    var _shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require_authing__2(7);
    const envContext = (0, _shared__WEBPACK_IMPORTED_MODULE_0__.getEnvContext)();
    function getWxToAliApi() {
      return {
        request(options = {}) {
          const _options = (0, _shared__WEBPACK_IMPORTED_MODULE_0__.adaptOptions)(options, {
            header: "headers"
          });
          (0, _shared__WEBPACK_IMPORTED_MODULE_0__.handleSuccess)(_options, (res) => {
            return (0, _shared__WEBPACK_IMPORTED_MODULE_0__.adaptOptions)(res, {
              Headers: "header",
              status: "statusCode"
            });
          });
          if (envContext.canIUse("request")) {
            return envContext.request(_options);
          }
          return envContext.httpRequest(_options);
        },
        setStorageSync(key, data) {
          envContext.setStorageSync({
            key,
            data
          });
        },
        removeStorageSync(key) {
          envContext.removeStorageSync({ key });
        },
        getStorageSync(key) {
          return envContext.getStorageSync({ key }).data;
        },
        scanCode(options = {}) {
          const _options = (0, _shared__WEBPACK_IMPORTED_MODULE_0__.adaptOptions)(options, {
            onlyFromCamera: "hideAlbum",
            scanType: "type"
          });
          const typeMap = {
            barCode: "bar",
            qrCode: "qr"
          };
          if (_options.type) {
            const _type = typeMap[_options.type];
            if (_type) {
              _options.type = _type;
            } else {
              (0, _shared__WEBPACK_IMPORTED_MODULE_0__.error)("\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u53EA\u80FD\u626B\u63CF\u3010\u6761\u5F62\u7801\u3011\u548C\u3010\u4E8C\u7EF4\u7801\u3011\uFF0C\u8BF7\u5C06 type \u8BBE\u7F6E\u4E3A barCode \u6216 qrCode !!!");
              _options.type = "qr";
            }
          }
          (0, _shared__WEBPACK_IMPORTED_MODULE_0__.handleSuccess)(_options, (res) => {
            return (0, _shared__WEBPACK_IMPORTED_MODULE_0__.adaptOptions)(res, {
              code: "result"
            });
          });
          envContext.scan(_options);
        },
        login(options = {}) {
          const _options = (0, _shared__WEBPACK_IMPORTED_MODULE_0__.adaptOptions)(options);
          (0, _shared__WEBPACK_IMPORTED_MODULE_0__.handleSuccess)(_options, (res) => {
            return (0, _shared__WEBPACK_IMPORTED_MODULE_0__.adaptOptions)(res, {
              authCode: "code"
            });
          });
          envContext.getAuthCode(_options);
        }
      };
    }
  }
];
var __webpack_module_cache__ = {};
function __webpack_require_authing__(moduleId) {
  var cachedModule = __webpack_module_cache__[moduleId];
  if (cachedModule !== void 0) {
    return cachedModule.exports;
  }
  var module = __webpack_module_cache__[moduleId] = {
    exports: {}
  };
  __webpack_modules__[moduleId](module, module.exports, __webpack_require_authing__);
  return module.exports;
}
(() => {
  __webpack_require_authing__.d = (exports2, definition) => {
    for (var key in definition) {
      if (__webpack_require_authing__.o(definition, key) && !__webpack_require_authing__.o(exports2, key)) {
        Object.defineProperty(exports2, key, { enumerable: true, get: definition[key] });
      }
    }
  };
})();
(() => {
  __webpack_require_authing__.g = function() {
    if (typeof globalThis === "object")
      return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e) {
      if (typeof window === "object")
        return window;
    }
  }();
})();
(() => {
  __webpack_require_authing__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
})();
(() => {
  __webpack_require_authing__.r = (exports2) => {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports2, "__esModule", { value: true });
  };
})();
var __webpack_exports_authing__ = {};
(() => {
  __webpack_require_authing__(1).default;
  __webpack_require_authing__.r(__webpack_exports_authing__);
  __webpack_require_authing__.d(__webpack_exports_authing__, {
    "default": () => __WEBPACK_DEFAULT_EXPORT__
  });
  var _AuthingMove_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require_authing__(1);
  var _AuthingMove_api_proxy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require_authing__(5);
  _AuthingMove_core__WEBPACK_IMPORTED_MODULE_0__["default"].use(_AuthingMove_api_proxy__WEBPACK_IMPORTED_MODULE_1__["default"]);
  common_vendor.index.setStorageSync("aaa", "123");
  const __WEBPACK_DEFAULT_EXPORT__ = _AuthingMove_core__WEBPACK_IMPORTED_MODULE_0__["default"];
})();
var __webpack_exports_authing__default = __webpack_exports_authing__["default"];
exports.__webpack_exports_authing__default = __webpack_exports_authing__default;
