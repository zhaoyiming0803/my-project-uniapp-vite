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
    var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require_authing__2(7);
    function install(AuthingMove, options = {}) {
      const {
        custom = {}
      } = options;
      const from = "wx";
      const to = "ali";
      if (["uni"].includes(to)) {
        return;
      }
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
          (0, _utils__WEBPACK_IMPORTED_MODULE_1__.error)(`Call ${AuthingMove}.${api} error:` + JSON.stringify(e));
        }
      });
    }
  },
  (__unused_webpack_module, __webpack_exports_authing__2, __webpack_require_authing__2) => {
    __webpack_require_authing__2.r(__webpack_exports_authing__2);
    __webpack_require_authing__2.d(__webpack_exports_authing__2, {
      "default": () => transformApi
    });
    var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require_authing__2(7);
    var _apis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require_authing__2(8);
    const fromMap = (0, _utils__WEBPACK_IMPORTED_MODULE_0__.generateFromMap)();
    function joinName(from = "", to = "") {
      const _from = `__authing_move_src_mode_${from}__`;
      return `${fromMap[_from]}_${to}`;
    }
    function transformApi(options) {
      const envContext = (0, _utils__WEBPACK_IMPORTED_MODULE_0__.getEnvContext)();
      const needProxy = /* @__PURE__ */ Object.create(null);
      Object.keys(envContext).concat(Object.keys(_apis__WEBPACK_IMPORTED_MODULE_1__)).forEach((key) => {
        needProxy[key] = envContext[key] || _apis__WEBPACK_IMPORTED_MODULE_1__[key];
      });
      const apis = /* @__PURE__ */ Object.create(null);
      Object.keys(needProxy).forEach((api) => {
        if (typeof needProxy[api] !== "function") {
          apis[api] = needProxy[api];
          return;
        }
        apis[api] = (...args) => {
          let from = options.from;
          const to = options.to;
          if (args.length) {
            from = args.pop();
            if (typeof from !== "string" || !fromMap[from]) {
              args.push(from);
              from = options.from;
            }
          }
          const fromTo = joinName(from, to);
          if (options.custom[fromTo] && options.custom[fromTo][api]) {
            return options.custom[fromTo][api].apply(this, args);
          }
          if (_apis__WEBPACK_IMPORTED_MODULE_1__[api]) {
            return _apis__WEBPACK_IMPORTED_MODULE_1__[api].apply(this, args);
          }
          if (envContext[api]) {
            return envContext[api].apply(this, args);
          }
          (0, _utils__WEBPACK_IMPORTED_MODULE_0__.error)(`\u5F53\u524D\u5C0F\u7A0B\u5E8F\u73AF\u5883\u4E0D\u5B58\u5728 ${api} \u65B9\u6CD5`);
        };
      });
      return apis;
    }
  },
  (__unused_webpack_module, __webpack_exports_authing__2, __webpack_require_authing__2) => {
    __webpack_require_authing__2(1).default;
    __webpack_require_authing__2.r(__webpack_exports_authing__2);
    __webpack_require_authing__2.d(__webpack_exports_authing__2, {
      "adaptOptions": () => adaptOptions2,
      "error": () => error,
      "generateFromMap": () => generateFromMap,
      "getEnvContext": () => getEnvContext,
      "handleSuccess": () => handleSuccess2,
      "makeMap": () => makeMap,
      "noop": () => noop,
      "warn": () => warn
    });
    function getEnvContext() {
      const noopEnv = {};
      switch ("ali") {
        case "wx":
        case "Mpx":
          return my;
        case "ali":
          return my;
        case "baidu":
          return swan;
        case "qq":
          return qq;
        case "tt":
          return tt;
        case "jd":
          return jd;
        case "qa_webview":
          return qa;
        case "qa_ux":
          return noopEnv;
        case "Taro":
          return Taro;
        case "uni":
          return common_vendor.index;
      }
    }
    function generateFromMap() {
      const platforms = ["wx", "ali", "baidu", "qq", "tt", "jd", "qa_webview", "qa_ux"];
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
    function adaptOptions2(originalOptions, matchedOptions, extraOptions) {
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
    function handleSuccess2(originalOptions, wrappedSuccess = noop, context) {
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
      "clearStorage": () => _store_storage__WEBPACK_IMPORTED_MODULE_3__.clearStorage,
      "login": () => _login_login__WEBPACK_IMPORTED_MODULE_0__.login,
      "request": () => _network_request__WEBPACK_IMPORTED_MODULE_1__.request,
      "scanCode": () => _scan_scan__WEBPACK_IMPORTED_MODULE_2__.scanCode,
      "setStorage": () => _store_storage__WEBPACK_IMPORTED_MODULE_3__.setStorage
    });
    var _login_login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require_authing__2(9);
    var _network_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require_authing__2(10);
    var _scan_scan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require_authing__2(11);
    var _store_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require_authing__2(12);
  },
  (__unused_webpack_module, __webpack_exports_authing__2, __webpack_require_authing__2) => {
    __webpack_require_authing__2.r(__webpack_exports_authing__2);
    __webpack_require_authing__2.d(__webpack_exports_authing__2, {
      "login": () => login
    });
    function login(options = {}) {
      const _options = adaptOptions(options);
      handleSuccess(_options, (res) => {
        return adaptOptions(res, {
          authCode: "code"
        });
      });
      return my.getAuthCode(_options);
    }
  },
  (__unused_webpack_module, __webpack_exports_authing__2, __webpack_require_authing__2) => {
    __webpack_require_authing__2.r(__webpack_exports_authing__2);
    __webpack_require_authing__2.d(__webpack_exports_authing__2, {
      "request": () => request
    });
    var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require_authing__2(7);
    function request(options = {}) {
      const _options = (0, _utils__WEBPACK_IMPORTED_MODULE_0__.adaptOptions)(options, {
        header: "headers"
      });
      (0, _utils__WEBPACK_IMPORTED_MODULE_0__.handleSuccess)(_options, (res) => {
        return (0, _utils__WEBPACK_IMPORTED_MODULE_0__.adaptOptions)(res, {
          Headers: "header",
          status: "statusCode"
        });
      });
      if (my.canIUse("request")) {
        return my.request(_options);
      }
      return my.httpRequest(_options);
    }
  },
  (__unused_webpack_module, __webpack_exports_authing__2, __webpack_require_authing__2) => {
    __webpack_require_authing__2.r(__webpack_exports_authing__2);
    __webpack_require_authing__2.d(__webpack_exports_authing__2, {
      "scanCode": () => scanCode
    });
    var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require_authing__2(7);
    function scanCode(options) {
      const _options = (0, _utils__WEBPACK_IMPORTED_MODULE_0__.adaptOptions)(options, {
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
          (0, _utils__WEBPACK_IMPORTED_MODULE_0__.error)("\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u53EA\u80FD\u626B\u63CF\u3010\u6761\u5F62\u7801\u3011\u548C\u3010\u4E8C\u7EF4\u7801\u3011\uFF0C\u8BF7\u5C06 type \u8BBE\u7F6E\u4E3A barCode \u6216 qrCode !!!");
          _options.type = "qr";
        }
      }
      (0, _utils__WEBPACK_IMPORTED_MODULE_0__.handleSuccess)(_options, (res) => {
        return (0, _utils__WEBPACK_IMPORTED_MODULE_0__.adaptOptions)(res, {
          code: "result"
        });
      });
      return my.scan(_options);
    }
  },
  (__unused_webpack_module, __webpack_exports_authing__2, __webpack_require_authing__2) => {
    __webpack_require_authing__2.r(__webpack_exports_authing__2);
    __webpack_require_authing__2.d(__webpack_exports_authing__2, {
      "clearStorage": () => clearStorage,
      "setStorage": () => setStorage
    });
    function setStorage(options) {
      return my.setStorage(options);
    }
    function clearStorage() {
      return my.clearStorage();
    }
  },
  (__unused_webpack_module, __webpack_exports_authing__2, __webpack_require_authing__2) => {
    __webpack_require_authing__2(1).default;
    __webpack_require_authing__2.r(__webpack_exports_authing__2);
    __webpack_require_authing__2.d(__webpack_exports_authing__2, {
      "callStorage": () => callStorage,
      "funcA": () => funcA
    });
    function funcA() {
      return "this is function A";
    }
    function callStorage() {
      my.setStorage({
        key: "callStorage",
        data: "callStorage"
      });
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
  var _a__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require_authing__(13);
  _AuthingMove_core__WEBPACK_IMPORTED_MODULE_0__["default"].use(_AuthingMove_api_proxy__WEBPACK_IMPORTED_MODULE_1__["default"]);
  _AuthingMove_core__WEBPACK_IMPORTED_MODULE_0__["default"].funcA = _a__WEBPACK_IMPORTED_MODULE_2__.funcA;
  my.setStorage({
    key: "hello11111111",
    data: "123hello"
  });
  (0, _a__WEBPACK_IMPORTED_MODULE_2__.callStorage)();
  const __WEBPACK_DEFAULT_EXPORT__ = _AuthingMove_core__WEBPACK_IMPORTED_MODULE_0__["default"];
})();
var __webpack_exports_authing__default = __webpack_exports_authing__["default"];
exports.__webpack_exports_authing__default = __webpack_exports_authing__default;
