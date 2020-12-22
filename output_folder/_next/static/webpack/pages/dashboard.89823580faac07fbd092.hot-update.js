webpackHotUpdate_N_E("pages/dashboard",{

/***/ "./node_modules/next/dist/client/image.js":
/*!************************************************!*\
  !*** ./node_modules/next/dist/client/image.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _toConsumableArray = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/next/node_modules/@babel/runtime/helpers/toConsumableArray.js");

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports["default"] = Image;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "./node_modules/next/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js"));

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/next/node_modules/@babel/runtime/helpers/extends.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _head = _interopRequireDefault(__webpack_require__(/*! ../next-server/lib/head */ "./node_modules/next/dist/next-server/lib/head.js"));

var VALID_LOADING_VALUES = ['lazy', 'eager', undefined];
var loaders = new Map([['imgix', imgixLoader], ['cloudinary', cloudinaryLoader], ['akamai', akamaiLoader], ['default', defaultLoader]]);
var VALID_LAYOUT_VALUES = ['fill', 'fixed', 'intrinsic', 'responsive', undefined];
var imageData = {"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/_next/image","loader":"default","domains":[]};
var configDeviceSizes = imageData.deviceSizes,
    configImageSizes = imageData.imageSizes,
    configLoader = imageData.loader,
    configPath = imageData.path,
    configDomains = imageData.domains; // sort smallest to largest

var allSizes = [].concat(_toConsumableArray(configDeviceSizes), _toConsumableArray(configImageSizes));
configDeviceSizes.sort(function (a, b) {
  return a - b;
});
allSizes.sort(function (a, b) {
  return a - b;
});
var cachedObserver;

function getObserver() {
  var IntersectionObserver = true ? window.IntersectionObserver : undefined; // Return shared instance of IntersectionObserver if already created

  if (cachedObserver) {
    return cachedObserver;
  } // Only create shared IntersectionObserver if supported in browser


  if (!IntersectionObserver) {
    return undefined;
  }

  return cachedObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var lazyImage = entry.target;
        unLazifyImage(lazyImage);
        cachedObserver.unobserve(lazyImage);
      }
    });
  }, {
    rootMargin: '200px'
  });
}

function unLazifyImage(lazyImage) {
  if (lazyImage.dataset.src) {
    lazyImage.src = lazyImage.dataset.src;
  }

  if (lazyImage.dataset.srcset) {
    lazyImage.srcset = lazyImage.dataset.srcset;
  }

  lazyImage.style.visibility = 'visible';
  lazyImage.classList.remove('__lazy');
}

function getSizes(width, layout) {
  if (typeof width !== 'number' || layout === 'fill' || layout === 'responsive') {
    return {
      sizes: configDeviceSizes,
      kind: 'w'
    };
  }

  var sizes = _toConsumableArray(new Set([width, width * 2, width * 3].map(function (w) {
    return allSizes.find(function (p) {
      return p >= w;
    }) || allSizes[allSizes.length - 1];
  })));

  return {
    sizes: sizes,
    kind: 'x'
  };
}

function computeSrc(src, unoptimized, layout, width, quality) {
  if (unoptimized) {
    return src;
  }

  var _getSizes = getSizes(width, layout),
      sizes = _getSizes.sizes;

  var largest = sizes[sizes.length - 1];
  return callLoader({
    src: src,
    width: largest,
    quality: quality
  });
}

function callLoader(loaderProps) {
  var load = loaders.get(configLoader) || defaultLoader;
  return load((0, _extends2["default"])({
    root: configPath
  }, loaderProps));
}

function generateSrcSet(_ref2) {
  var src = _ref2.src,
      unoptimized = _ref2.unoptimized,
      layout = _ref2.layout,
      width = _ref2.width,
      quality = _ref2.quality;

  // At each breakpoint, generate an image url using the loader, such as:
  // ' www.example.com/foo.jpg?w=480 480w, '
  if (unoptimized) {
    return undefined;
  }

  var _getSizes2 = getSizes(width, layout),
      sizes = _getSizes2.sizes,
      kind = _getSizes2.kind;

  return sizes.map(function (size, i) {
    return "".concat(callLoader({
      src: src,
      width: size,
      quality: quality
    }), " ").concat(kind === 'w' ? size : i + 1).concat(kind);
  }).join(', ');
}

function generatePreload(_ref3) {
  var src = _ref3.src,
      _ref3$unoptimized = _ref3.unoptimized,
      unoptimized = _ref3$unoptimized === void 0 ? false : _ref3$unoptimized,
      layout = _ref3.layout,
      width = _ref3.width,
      sizes = _ref3.sizes,
      quality = _ref3.quality;
  // This function generates an image preload that makes use of the "imagesrcset" and "imagesizes"
  // attributes for preloading responsive images. They're still experimental, but fully backward
  // compatible, as the link tag includes all necessary attributes, even if the final two are ignored.
  // See: https://web.dev/preload-responsive-images/
  return /*#__PURE__*/_react["default"].createElement(_head["default"], null, /*#__PURE__*/_react["default"].createElement("link", {
    rel: "preload",
    as: "image",
    href: computeSrc(src, unoptimized, layout, width, quality) // @ts-ignore: imagesrcset and imagesizes not yet in the link element type
    ,
    imagesrcset: generateSrcSet({
      src: src,
      unoptimized: unoptimized,
      layout: layout,
      width: width,
      quality: quality
    }),
    imagesizes: sizes
  }));
}

function getInt(x) {
  if (typeof x === 'number') {
    return x;
  }

  if (typeof x === 'string') {
    return parseInt(x, 10);
  }

  return undefined;
}

function Image(_ref) {
  var src = _ref.src,
      sizes = _ref.sizes,
      _ref$unoptimized = _ref.unoptimized,
      unoptimized = _ref$unoptimized === void 0 ? false : _ref$unoptimized,
      _ref$priority = _ref.priority,
      priority = _ref$priority === void 0 ? false : _ref$priority,
      loading = _ref.loading,
      className = _ref.className,
      quality = _ref.quality,
      width = _ref.width,
      height = _ref.height,
      all = (0, _objectWithoutPropertiesLoose2["default"])(_ref, ["src", "sizes", "unoptimized", "priority", "loading", "className", "quality", "width", "height"]);
  var thisEl = (0, _react.useRef)(null);
  var rest = all;
  var layout = sizes ? 'responsive' : 'intrinsic';
  var unsized = false;

  if ('unsized' in rest) {
    unsized = Boolean(rest.unsized); // Remove property so it's not spread into image:

    delete rest['unsized'];
  } else if ('layout' in rest) {
    // Override default layout if the user specified one:
    if (rest.layout) layout = rest.layout; // Remove property so it's not spread into image:

    delete rest['layout'];
  }

  if (true) {
    if (!src) {
      throw new Error("Image is missing required \"src\" property. Make sure you pass \"src\" in props to the `next/image` component. Received: ".concat(JSON.stringify({
        width: width,
        height: height,
        quality: quality
      })));
    }

    if (!VALID_LAYOUT_VALUES.includes(layout)) {
      throw new Error("Image with src \"".concat(src, "\" has invalid \"layout\" property. Provided \"").concat(layout, "\" should be one of ").concat(VALID_LAYOUT_VALUES.map(String).join(','), "."));
    }

    if (!VALID_LOADING_VALUES.includes(loading)) {
      throw new Error("Image with src \"".concat(src, "\" has invalid \"loading\" property. Provided \"").concat(loading, "\" should be one of ").concat(VALID_LOADING_VALUES.map(String).join(','), "."));
    }

    if (priority && loading === 'lazy') {
      throw new Error("Image with src \"".concat(src, "\" has both \"priority\" and \"loading='lazy'\" properties. Only one should be used."));
    }

    if (unsized) {
      throw new Error("Image with src \"".concat(src, "\" has deprecated \"unsized\" property, which was removed in favor of the \"layout='fill'\" property"));
    }
  }

  var lazy = loading === 'lazy';

  if (!priority && typeof loading === 'undefined') {
    lazy = true;
  }

  if ( true && !window.IntersectionObserver) {
    // Rendering client side on browser without intersection observer
    lazy = false;
  }

  (0, _react.useEffect)(function () {
    var target = thisEl.current;

    if (target && lazy) {
      var observer = getObserver();

      if (observer) {
        observer.observe(target);
        return function () {
          observer.unobserve(target);
        };
      } else {
        //browsers without intersection observer
        unLazifyImage(target);
      }
    }
  }, [thisEl, lazy]);
  var widthInt = getInt(width);
  var heightInt = getInt(height);
  var qualityInt = getInt(quality);
  var wrapperStyle;
  var sizerStyle;
  var sizerSvg;
  var imgStyle = {
    visibility: lazy ? 'hidden' : 'visible',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    boxSizing: 'border-box',
    padding: 0,
    border: 'none',
    margin: 'auto',
    display: 'block',
    width: 0,
    height: 0,
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%'
  };

  if (typeof widthInt !== 'undefined' && typeof heightInt !== 'undefined' && layout !== 'fill') {
    // <Image src="i.png" width="100" height="100" />
    var quotient = heightInt / widthInt;
    var paddingTop = isNaN(quotient) ? '100%' : "".concat(quotient * 100, "%");

    if (layout === 'responsive') {
      // <Image src="i.png" width="100" height="100" layout="responsive" />
      wrapperStyle = {
        display: 'block',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        margin: 0
      };
      sizerStyle = {
        display: 'block',
        boxSizing: 'border-box',
        paddingTop: paddingTop
      };
    } else if (layout === 'intrinsic') {
      // <Image src="i.png" width="100" height="100" layout="intrinsic" />
      wrapperStyle = {
        display: 'inline-block',
        maxWidth: '100%',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        margin: 0
      };
      sizerStyle = {
        boxSizing: 'border-box',
        display: 'block',
        maxWidth: '100%'
      };
      sizerSvg = "<svg width=\"".concat(widthInt, "\" height=\"").concat(heightInt, "\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\"/>");
    } else if (layout === 'fixed') {
      // <Image src="i.png" width="100" height="100" layout="fixed" />
      wrapperStyle = {
        overflow: 'hidden',
        boxSizing: 'border-box',
        display: 'inline-block',
        position: 'relative',
        width: widthInt,
        height: heightInt
      };
    }
  } else if (typeof widthInt === 'undefined' && typeof heightInt === 'undefined' && layout === 'fill') {
    // <Image src="i.png" layout="fill" />
    wrapperStyle = {
      display: 'block',
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      boxSizing: 'border-box',
      margin: 0
    };
  } else {
    // <Image src="i.png" />
    if (true) {
      throw new Error("Image with src \"".concat(src, "\" must use \"width\" and \"height\" properties or \"layout='fill'\" property."));
    }
  } // Generate attribute values


  var imgSrc = computeSrc(src, unoptimized, layout, widthInt, qualityInt);
  var imgSrcSet = generateSrcSet({
    src: src,
    unoptimized: unoptimized,
    layout: layout,
    width: widthInt,
    quality: qualityInt
  });
  var imgAttributes;

  if (!lazy) {
    imgAttributes = {
      src: imgSrc
    };

    if (imgSrcSet) {
      imgAttributes.srcSet = imgSrcSet;
    }
  } else {
    imgAttributes = {
      'data-src': imgSrc
    };

    if (imgSrcSet) {
      imgAttributes['data-srcset'] = imgSrcSet;
    }

    className = className ? className + ' __lazy' : '__lazy';
  } // No need to add preloads on the client side--by the time the application is hydrated,
  // it's too late for preloads


  var shouldPreload = priority && false;

  if (unsized) {
    wrapperStyle = undefined;
    sizerStyle = undefined;
    imgStyle = undefined;
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: wrapperStyle
  }, shouldPreload ? generatePreload({
    src: src,
    layout: layout,
    unoptimized: unoptimized,
    width: widthInt,
    sizes: sizes,
    quality: qualityInt
  }) : null, sizerStyle ? /*#__PURE__*/_react["default"].createElement("div", {
    style: sizerStyle
  }, sizerSvg ? /*#__PURE__*/_react["default"].createElement("img", {
    style: {
      maxWidth: '100%',
      display: 'block'
    },
    alt: "",
    "aria-hidden": true,
    role: "presentation",
    src: "data:image/svg+xml;charset=utf-8,".concat(sizerSvg)
  }) : null) : null, /*#__PURE__*/_react["default"].createElement("img", Object.assign({}, rest, imgAttributes, {
    decoding: "async",
    className: className,
    sizes: sizes,
    ref: thisEl,
    style: imgStyle
  })));
} //BUILT IN LOADERS


_c = Image;

function normalizeSrc(src) {
  return src[0] === '/' ? src.slice(1) : src;
}

function imgixLoader(_ref4) {
  var root = _ref4.root,
      src = _ref4.src,
      width = _ref4.width,
      quality = _ref4.quality;
  // Demo: https://static.imgix.net/daisy.png?format=auto&fit=max&w=300
  var params = ['auto=format', 'fit=max', 'w=' + width];
  var paramsString = '';

  if (quality) {
    params.push('q=' + quality);
  }

  if (params.length) {
    paramsString = '?' + params.join('&');
  }

  return "".concat(root).concat(normalizeSrc(src)).concat(paramsString);
}

function akamaiLoader(_ref5) {
  var root = _ref5.root,
      src = _ref5.src,
      width = _ref5.width;
  return "".concat(root).concat(normalizeSrc(src), "?imwidth=").concat(width);
}

function cloudinaryLoader(_ref6) {
  var root = _ref6.root,
      src = _ref6.src,
      width = _ref6.width,
      quality = _ref6.quality;
  // Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit/turtles.jpg
  var params = ['f_auto', 'c_limit', 'w_' + width];
  var paramsString = '';

  if (quality) {
    params.push('q_' + quality);
  }

  if (params.length) {
    paramsString = params.join(',') + '/';
  }

  return "".concat(root).concat(paramsString).concat(normalizeSrc(src));
}

function defaultLoader(_ref7) {
  var root = _ref7.root,
      src = _ref7.src,
      width = _ref7.width,
      quality = _ref7.quality;

  if (true) {
    var missingValues = []; // these should always be provided but make sure they are

    if (!src) missingValues.push('src');
    if (!width) missingValues.push('width');

    if (missingValues.length > 0) {
      throw new Error("Next Image Optimization requires ".concat(missingValues.join(', '), " to be provided. Make sure you pass them as props to the `next/image` component. Received: ").concat(JSON.stringify({
        src: src,
        width: width,
        quality: quality
      })));
    }

    if (src && !src.startsWith('/') && configDomains) {
      var parsedSrc;

      try {
        parsedSrc = new URL(src);
      } catch (err) {
        console.error(err);
        throw new Error("Failed to parse \"".concat(src, "\" in \"next/image\", if using relative image it must start with a leading slash \"/\" or be an absolute URL (http:// or https://)"));
      }

      if (!configDomains.includes(parsedSrc.hostname)) {
        throw new Error("Invalid src prop (".concat(src, ") on `next/image`, hostname \"").concat(parsedSrc.hostname, "\" is not configured under images in your `next.config.js`\n") + "See more info: https://err.sh/nextjs/next-image-unconfigured-host");
      }
    }
  }

  return "".concat(root, "?url=").concat(encodeURIComponent(src), "&w=").concat(width, "&q=").concat(quality || 75);
}

var _c;

$RefreshReg$(_c, "Image");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/next/image.js":
/*!************************************!*\
  !*** ./node_modules/next/image.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/client/image */ "./node_modules/next/dist/client/image.js")


/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;

/***/ }),

/***/ "./pages/dashboard.tsx":
/*!*****************************!*\
  !*** ./pages/dashboard.tsx ***!
  \*****************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__N_SSG", function() { return __N_SSG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DashboardDashBoardPage; });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_SearchCategories_SearchCategories__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/SearchCategories/SearchCategories */ "./components/SearchCategories/SearchCategories.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/image */ "./node_modules/next/image.js");
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_3__);


var _jsxFileName = "C:\\Users\\henry\\Desktop\\food-app\\pages\\dashboard.tsx";
// import { useRequireAuth } from '../hooks/useRequireAuth'

// import RestaurantStepper from '../components/steppers/RestaurantStepper'


var __N_SSG = true;
function DashboardDashBoardPage(_ref) {
  var categories = _ref.categories;
  // const auth = useRequireAuth();
  // if (!auth.user) return null
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "h-screen w-full flex overflow-hidden select-none",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("nav", {
        className: "w-24 flex flex-col items-center bg-white dark:bg-gray-800 py-4",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(next_image__WEBPACK_IMPORTED_MODULE_3___default.a, {
            src: "/fortwo-logo.png"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 19,
            columnNumber: 25
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 17,
          columnNumber: 21
        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("ul", {
          className: "mt-2 text-gray-700 dark:text-gray-400 capitalize",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("li", {
            className: "mt-3 p-2 text-blue-600 dark:text-blue-300 rounded-lg",
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
              href: "teacher-dashboard/",
              className: " flex flex-col items-center",
              children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("svg", {
                className: "fill-current h-5 w-5",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("path", {
                  d: "M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9\r 17v2H5v-2h4M21 3h-8v6h8V3M11 3H3v10h8V3m10\r 8h-8v10h8V11m-10 4H3v6h8v-6z"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 34,
                  columnNumber: 37
                }, this)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 30,
                columnNumber: 33
              }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
                className: "text-xs mt-2",
                children: "dashBoard"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 40,
                columnNumber: 33
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 26,
              columnNumber: 29
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 25,
            columnNumber: 25
          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("li", {
            className: "mt-3 p-2 hover:text-blue-600 dark-hover:text-blue-300\r rounded-lg",
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
              href: "inbox/",
              className: " flex flex-col items-center",
              children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("svg", {
                className: "fill-current h-5 w-5",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("path", {
                  d: "M23 3v-.5a2.5 2.5 0 00-5 0V3c-.55 0-1 .45-1 1v4c0\r .55.45 1 1 1h5c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1m-1\r 0h-3v-.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V3M6\r 11h9v2H6v-2m0-4h9v2H6V7m16 4v5c0 1.11-.89 2-2 2H6l-4\r 4V4a2 2 0 012-2h11v2H4v13.17L5.17 16H20v-5h2z"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 56,
                  columnNumber: 37
                }, this)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 52,
                columnNumber: 33
              }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
                className: "text-xs mt-2",
                children: "messages"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 64,
                columnNumber: 33
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 48,
              columnNumber: 29
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 44,
            columnNumber: 25
          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("li", {
            className: "mt-3 p-2 hover:text-blue-600 dark-hover:text-blue-300\r rounded-lg",
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
              href: "expenses-dashboard/",
              className: " flex flex-col items-center",
              children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("svg", {
                className: "fill-current h-5 w-5",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("path", {
                  d: "M21 18v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0\r 012-2h14a2 2 0 012 2v1h-9a2 2 0 00-2 2v8a2 2 0 002\r 2m0-2h10V8H12m4 5.5a1.5 1.5 0 01-1.5-1.5 1.5 1.5 0\r 011.5-1.5 1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5z"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 80,
                  columnNumber: 37
                }, this)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 76,
                columnNumber: 33
              }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
                className: "text-xs mt-2",
                children: "earnings"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 87,
                columnNumber: 33
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 72,
              columnNumber: 29
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 68,
            columnNumber: 25
          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("li", {
            className: "mt-3 p-2 hover:text-blue-600 dark-hover:text-blue-300\r rounded-lg",
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
              href: "users-dashboard/",
              className: " flex flex-col items-center",
              children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("svg", {
                className: "fill-current h-5 w-5",
                viewBox: "0 0 512 512",
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("path", {
                  d: "M505 442.7L405.3\r 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7\r 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208\r 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7\r 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9\r 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7\r 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128\r 57.2 128 128 0 70.7-57.2 128-128 128z"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 103,
                  columnNumber: 37
                }, this)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 99,
                columnNumber: 33
              }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
                className: "text-xs mt-2",
                children: "jobs"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 114,
                columnNumber: 33
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 95,
              columnNumber: 29
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 91,
            columnNumber: 25
          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("li", {
            className: "mt-3 p-2 hover:text-blue-600 dark-hover:text-blue-300\r rounded-lg",
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
              href: "meetup/",
              className: " flex flex-col items-center",
              children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("svg", {
                className: "fill-current h-5 w-5",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("path", {
                  d: "M19 19H5V8h14m0-5h-1V1h-2v2H8V1H6v2H5a2 2 0 00-2\r 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2m-2.47\r 8.06L15.47 10l-4.88 4.88-2.12-2.12-1.06 1.06L10.59\r 17l5.94-5.94z"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 130,
                  columnNumber: 37
                }, this)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 126,
                columnNumber: 33
              }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
                className: "text-xs mt-2",
                children: "schedule"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 137,
                columnNumber: 33
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 122,
              columnNumber: 29
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 118,
            columnNumber: 25
          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("li", {
            className: "mt-3 p-2 hover:text-blue-600 rounded-lg",
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
              href: "social-media-dashboard/",
              className: " flex flex-col items-center",
              children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("svg", {
                className: "fill-current h-5 w-5",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("path", {
                  d: "M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0\r 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 150,
                  columnNumber: 37
                }, this)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 146,
                columnNumber: 33
              }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
                className: "text-xs mt-2",
                children: "lesson"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 155,
                columnNumber: 33
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 142,
              columnNumber: 29
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 141,
            columnNumber: 25
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 22,
          columnNumber: 21
        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "mt-auto flex items-center p-2 text-blue-700 bg-purple-200\r dark:text-blue-500 rounded-full",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
            href: "/",
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("svg", {
              className: "fill-current h-5 w-5",
              viewBox: "0 0 24 24",
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("path", {
                d: "M12 1c-5 0-9 4-9 9v7a3 3 0 003 3h3v-8H5v-2a7 7 0 017-7\r 7 7 0 017 7v2h-4v8h4v1h-7v2h6a3 3 0\r 003-3V10c0-5-4.03-9-9-9z"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 171,
                columnNumber: 33
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 167,
              columnNumber: 29
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 166,
            columnNumber: 25
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 160,
          columnNumber: 21
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 14,
        columnNumber: 17
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("main", {
        className: "my-1 pt-2 pb-2 px-10 flex-1 bg-gray-200 dark:bg-black rounded-l-lg\r transition duration-500 ease-in-out overflow-y-auto",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "flex flex-col capitalize text-3xl"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 184,
          columnNumber: 21
        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
            className: "mr-6 mt-8 py-2 flex-shrink-0 flex flex-col bg-white\r dark:bg-gray-600 rounded-lg",
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_SearchCategories_SearchCategories__WEBPACK_IMPORTED_MODULE_1__["default"], {
              categories: categories
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 192,
              columnNumber: 29
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 186,
            columnNumber: 25
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 185,
          columnNumber: 21
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 180,
        columnNumber: 17
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("aside", {
        className: "w-1/4 my-1 mr-1 px-6 py-4 flex flex-col bg-gray-200 dark:bg-black\r dark:text-gray-400 rounded-r-lg overflow-y-auto",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "flex items-center justify-between",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
            href: "inbox/",
            className: "relative",
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("svg", {
                className: "h-5 w-5 hover:text-red-600 dark-hover:text-red-400",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("path", {
                  d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 219,
                  columnNumber: 37
                }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("path", {
                  d: "M13.73 21a2 2 0 0 1-3.46 0"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 220,
                  columnNumber: 37
                }, this)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 210,
                columnNumber: 33
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 209,
              columnNumber: 29
            }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
              className: "absolute w-2 h-2 left-0 mb-6 ml-2 bottom-0",
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
                className: "px-2 py-1 bg-red-600 rounded-full text-white\r text-xs",
                children: "7"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 225,
                columnNumber: 33
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 224,
              columnNumber: 29
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 206,
            columnNumber: 25
          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
            className: "flex items-center",
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("img", {
              className: "h-10 w-10 rounded-full object-cover",
              src: "https://i.pinimg.com/originals/68/e1/e1/68e1e137959d363f172dc3cc50904669.jpg",
              alt: "tempest profile"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 237,
              columnNumber: 29
            }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("button", {
              className: "ml-1 focus:outline-none",
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("svg", {
                className: "h-4 w-4 fill-current",
                viewBox: "0 0 192 512",
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("path", {
                  d: "M96 184c39.8 0 72 32.2 72 72s-32.2 72-72\r 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72\r 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0\r 352c0 39.8 32.2 72 72 72s72-32.2\r 72-72-32.2-72-72-72-72 32.2-72 72z"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 248,
                  columnNumber: 37
                }, this)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 244,
                columnNumber: 33
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 243,
              columnNumber: 29
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 234,
            columnNumber: 25
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 203,
          columnNumber: 21
        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
          className: "mt-4 text-gray-600",
          children: "Monthly earnings"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 260,
          columnNumber: 21
        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
          className: "mt-1 text-3xl font-semibold",
          children: "$ 1,579.20"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 261,
          columnNumber: 21
        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("button", {
          className: "mt-8 flex items-center py-4 px-3 text-white rounded-lg\r bg-green-400 shadow focus:outline-none",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("svg", {
            className: "h-5 w-5 fill-current mr-2 ml-3",
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("path", {
              d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 275,
              columnNumber: 29
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 271,
            columnNumber: 25
          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
            children: "Bill your Students"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 278,
            columnNumber: 25
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 265,
          columnNumber: 21
        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "mt-12 flex items-center",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
            children: "Payments"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 283,
            columnNumber: 25
          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("button", {
            className: "ml-2 focus:outline-none",
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("svg", {
              className: "h-5 w-5 fill-current",
              viewBox: "0 0 256 512",
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("path", {
                d: "M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9\r 0l-22.6-22.6c-9.4-9.4-9.4-24.6\r 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3\r 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1\r 34z"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 289,
                columnNumber: 33
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 285,
              columnNumber: 29
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 284,
            columnNumber: 25
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 281,
          columnNumber: 21
        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
          href: "/",
          className: "mt-8 p-4 flex justify-between bg-gray-300 rounded-lg\r font-semibold capitalize",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
            className: "flex",
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("img", {
              className: "h-10 w-10 rounded-full object-cover",
              src: "https://lh3.googleusercontent.com/cX0xwvJKCNIFrl2wIwoYiIURxmZt1y7tF3wJvynqcnQG5tmYdKBLpDDvhXzmVZzrstAEkw=s151",
              alt: "veldora profile"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 308,
              columnNumber: 29
            }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
              className: "flex flex-col ml-4",
              children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
                children: "veldora"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 315,
                columnNumber: 33
              }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
                className: "text-sm text-gray-600",
                children: "english"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 316,
                columnNumber: 33
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 314,
              columnNumber: 29
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 307,
            columnNumber: 25
          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
            children: "$ 25"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 322,
            columnNumber: 25
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 300,
          columnNumber: 21
        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
          href: "/",
          className: "mt-2 p-4 flex justify-between bg-gray-300 rounded-lg\r font-semibold capitalize",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
            className: "flex",
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("img", {
              className: "h-10 w-10 rounded-full object-cover",
              src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1RZ5sKLtFG-Q2xfXlLa5DbFsmF52Gc-C49B4s63CtSxLkzQY&s",
              alt: "accelerator profile"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 332,
              columnNumber: 29
            }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
              className: "flex flex-col ml-4",
              children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
                children: "accelerator"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 339,
                columnNumber: 33
              }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
                className: "text-sm text-gray-600",
                children: "english"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 340,
                columnNumber: 33
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 338,
              columnNumber: 29
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 331,
            columnNumber: 25
          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
            children: "$ 25"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 346,
            columnNumber: 25
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 325,
          columnNumber: 21
        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
          href: "/",
          className: "mt-2 p-4 flex justify-between bg-gray-300 rounded-lg\r font-semibold capitalize",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
            className: "flex",
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("img", {
              className: "h-10 w-10 rounded-full object-cover",
              src: "data:image/jpeg;base64,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",
              alt: "syndicate profile"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 357,
              columnNumber: 29
            }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
              className: "flex flex-col ml-4",
              children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
                children: "syndicate"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 364,
                columnNumber: 33
              }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
                className: "text-sm text-gray-600",
                children: "english"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 365,
                columnNumber: 33
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 363,
              columnNumber: 29
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 356,
            columnNumber: 25
          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
            children: "$ 25"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 371,
            columnNumber: 25
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 349,
          columnNumber: 21
        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "mt-4 flex justify-center capitalize text-blue-600",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
            href: "expenses-dashboard/",
            children: "see all"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 375,
            columnNumber: 25
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 374,
          columnNumber: 21
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 197,
        columnNumber: 17
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 13
    }, this)
  }, void 0, false);
} // This gets called on every request

_c = DashboardDashBoardPage;

var _c;

$RefreshReg$(_c, "DashboardDashBoardPage");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4uLy4uL2NsaWVudC9pbWFnZS50c3giLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9uZXh0L2ltYWdlLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlLmpzIiwid2VicGFjazovL19OX0UvLi9wYWdlcy9kYXNoYm9hcmQudHN4Il0sIm5hbWVzIjpbIlZBTElEX0xPQURJTkdfVkFMVUVTIiwibG9hZGVycyIsIlZBTElEX0xBWU9VVF9WQUxVRVMiLCJpbWFnZURhdGEiLCJwcm9jZXNzIiwiZGV2aWNlU2l6ZXMiLCJpbWFnZVNpemVzIiwibG9hZGVyIiwicGF0aCIsImRvbWFpbnMiLCJhbGxTaXplcyIsImNvbmZpZ0RldmljZVNpemVzIiwiYSIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwid2luZG93IiwiY2FjaGVkT2JzZXJ2ZXIiLCJlbnRyaWVzIiwiZW50cnkiLCJsYXp5SW1hZ2UiLCJ1bkxhemlmeUltYWdlIiwicm9vdE1hcmdpbiIsImxheW91dCIsInNpemVzIiwia2luZCIsIndpZHRoIiwidyIsInAiLCJnZXRTaXplcyIsImxhcmdlc3QiLCJjYWxsTG9hZGVyIiwic3JjIiwicXVhbGl0eSIsImxvYWQiLCJyb290IiwiaSIsInVub3B0aW1pemVkIiwiY29tcHV0ZVNyYyIsImdlbmVyYXRlU3JjU2V0IiwicGFyc2VJbnQiLCJwcmlvcml0eSIsImFsbCIsInRoaXNFbCIsInJlc3QiLCJ1bnNpemVkIiwiQm9vbGVhbiIsIkpTT04iLCJoZWlnaHQiLCJsb2FkaW5nIiwibGF6eSIsInRhcmdldCIsIm9ic2VydmVyIiwiZ2V0T2JzZXJ2ZXIiLCJ3aWR0aEludCIsImdldEludCIsImhlaWdodEludCIsInF1YWxpdHlJbnQiLCJpbWdTdHlsZSIsInZpc2liaWxpdHkiLCJwb3NpdGlvbiIsInRvcCIsImxlZnQiLCJib3R0b20iLCJyaWdodCIsImJveFNpemluZyIsInBhZGRpbmciLCJib3JkZXIiLCJtYXJnaW4iLCJkaXNwbGF5IiwibWluV2lkdGgiLCJtYXhXaWR0aCIsIm1pbkhlaWdodCIsIm1heEhlaWdodCIsInF1b3RpZW50IiwicGFkZGluZ1RvcCIsImlzTmFOIiwid3JhcHBlclN0eWxlIiwib3ZlcmZsb3ciLCJzaXplclN0eWxlIiwic2l6ZXJTdmciLCJpbWdTcmMiLCJpbWdTcmNTZXQiLCJpbWdBdHRyaWJ1dGVzIiwiY2xhc3NOYW1lIiwic2hvdWxkUHJlbG9hZCIsImdlbmVyYXRlUHJlbG9hZCIsInBhcmFtcyIsInBhcmFtc1N0cmluZyIsIm5vcm1hbGl6ZVNyYyIsIm1pc3NpbmdWYWx1ZXMiLCJwYXJzZWRTcmMiLCJjb25zb2xlIiwiY29uZmlnRG9tYWlucyIsImVuY29kZVVSSUNvbXBvbmVudCIsIkRhc2hib2FyZERhc2hCb2FyZFBhZ2UiLCJjYXRlZ29yaWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUEsSUFBTUEsb0JBQW9CLEdBQUcsa0JBQTdCLFNBQTZCLENBQTdCO0FBR0EsSUFBTUMsT0FBTyxHQUFHLFFBQW1ELENBQ2pFLFVBRGlFLFdBQ2pFLENBRGlFLEVBRWpFLGVBRmlFLGdCQUVqRSxDQUZpRSxFQUdqRSxXQUhpRSxZQUdqRSxDQUhpRSxFQUlqRSxZQUpGLGFBSUUsQ0FKaUUsQ0FBbkQsQ0FBaEI7QUFTQSxJQUFNQyxtQkFBbUIsR0FBRyw2Q0FBNUIsU0FBNEIsQ0FBNUI7QUF5Q0EsSUFBTUMsU0FBb0IsR0FBR0Msc0pBQTdCO0lBQ00saUIsR0FBTixTLENBQ0VDLFc7SUFESSxnQixHQUFOLFMsQ0FFRUMsVTtJQUZJLFksR0FBTixTLENBR0VDLE07SUFISSxVLEdBQU4sUyxDQUlFQyxJO0lBSkksYSxHQUFOLFMsQ0FLRUMsTyxFQUVGOztBQUNBLElBQU1DLFFBQVEsZ0NBQUcsaUJBQUgsc0JBQWQsZ0JBQWMs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L3dlYnBhY2svcGFnZXMvZGFzaGJvYXJkLjg5ODIzNTgwZmFhYzA3ZmJkMDkyLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUmVhY3RFbGVtZW50LCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IEhlYWQgZnJvbSAnLi4vbmV4dC1zZXJ2ZXIvbGliL2hlYWQnXG5cbmNvbnN0IFZBTElEX0xPQURJTkdfVkFMVUVTID0gWydsYXp5JywgJ2VhZ2VyJywgdW5kZWZpbmVkXSBhcyBjb25zdFxudHlwZSBMb2FkaW5nVmFsdWUgPSB0eXBlb2YgVkFMSURfTE9BRElOR19WQUxVRVNbbnVtYmVyXVxuXG5jb25zdCBsb2FkZXJzID0gbmV3IE1hcDxMb2FkZXJLZXksIChwcm9wczogTG9hZGVyUHJvcHMpID0+IHN0cmluZz4oW1xuICBbJ2ltZ2l4JywgaW1naXhMb2FkZXJdLFxuICBbJ2Nsb3VkaW5hcnknLCBjbG91ZGluYXJ5TG9hZGVyXSxcbiAgWydha2FtYWknLCBha2FtYWlMb2FkZXJdLFxuICBbJ2RlZmF1bHQnLCBkZWZhdWx0TG9hZGVyXSxcbl0pXG5cbnR5cGUgTG9hZGVyS2V5ID0gJ2ltZ2l4JyB8ICdjbG91ZGluYXJ5JyB8ICdha2FtYWknIHwgJ2RlZmF1bHQnXG5cbmNvbnN0IFZBTElEX0xBWU9VVF9WQUxVRVMgPSBbXG4gICdmaWxsJyxcbiAgJ2ZpeGVkJyxcbiAgJ2ludHJpbnNpYycsXG4gICdyZXNwb25zaXZlJyxcbiAgdW5kZWZpbmVkLFxuXSBhcyBjb25zdFxudHlwZSBMYXlvdXRWYWx1ZSA9IHR5cGVvZiBWQUxJRF9MQVlPVVRfVkFMVUVTW251bWJlcl1cblxudHlwZSBJbWFnZURhdGEgPSB7XG4gIGRldmljZVNpemVzOiBudW1iZXJbXVxuICBpbWFnZVNpemVzOiBudW1iZXJbXVxuICBsb2FkZXI6IExvYWRlcktleVxuICBwYXRoOiBzdHJpbmdcbiAgZG9tYWlucz86IHN0cmluZ1tdXG59XG5cbnR5cGUgSW1hZ2VQcm9wcyA9IE9taXQ8XG4gIEpTWC5JbnRyaW5zaWNFbGVtZW50c1snaW1nJ10sXG4gICdzcmMnIHwgJ3NyY1NldCcgfCAncmVmJyB8ICd3aWR0aCcgfCAnaGVpZ2h0JyB8ICdsb2FkaW5nJ1xuPiAmIHtcbiAgc3JjOiBzdHJpbmdcbiAgcXVhbGl0eT86IG51bWJlciB8IHN0cmluZ1xuICBwcmlvcml0eT86IGJvb2xlYW5cbiAgbG9hZGluZz86IExvYWRpbmdWYWx1ZVxuICB1bm9wdGltaXplZD86IGJvb2xlYW5cbn0gJiAoXG4gICAgfCB7XG4gICAgICAgIHdpZHRoPzogbmV2ZXJcbiAgICAgICAgaGVpZ2h0PzogbmV2ZXJcbiAgICAgICAgLyoqIEBkZXByZWNhdGVkIFVzZSBgbGF5b3V0PVwiZmlsbFwiYCBpbnN0ZWFkICovXG4gICAgICAgIHVuc2l6ZWQ6IHRydWVcbiAgICAgIH1cbiAgICB8IHsgd2lkdGg/OiBuZXZlcjsgaGVpZ2h0PzogbmV2ZXI7IGxheW91dDogJ2ZpbGwnIH1cbiAgICB8IHtcbiAgICAgICAgd2lkdGg6IG51bWJlciB8IHN0cmluZ1xuICAgICAgICBoZWlnaHQ6IG51bWJlciB8IHN0cmluZ1xuICAgICAgICBsYXlvdXQ/OiBFeGNsdWRlPExheW91dFZhbHVlLCAnZmlsbCc+XG4gICAgICB9XG4gIClcblxuY29uc3QgaW1hZ2VEYXRhOiBJbWFnZURhdGEgPSBwcm9jZXNzLmVudi5fX05FWFRfSU1BR0VfT1BUUyBhcyBhbnlcbmNvbnN0IHtcbiAgZGV2aWNlU2l6ZXM6IGNvbmZpZ0RldmljZVNpemVzLFxuICBpbWFnZVNpemVzOiBjb25maWdJbWFnZVNpemVzLFxuICBsb2FkZXI6IGNvbmZpZ0xvYWRlcixcbiAgcGF0aDogY29uZmlnUGF0aCxcbiAgZG9tYWluczogY29uZmlnRG9tYWlucyxcbn0gPSBpbWFnZURhdGFcbi8vIHNvcnQgc21hbGxlc3QgdG8gbGFyZ2VzdFxuY29uc3QgYWxsU2l6ZXMgPSBbLi4uY29uZmlnRGV2aWNlU2l6ZXMsIC4uLmNvbmZpZ0ltYWdlU2l6ZXNdXG5jb25maWdEZXZpY2VTaXplcy5zb3J0KChhLCBiKSA9PiBhIC0gYilcbmFsbFNpemVzLnNvcnQoKGEsIGIpID0+IGEgLSBiKVxuXG5sZXQgY2FjaGVkT2JzZXJ2ZXI6IEludGVyc2VjdGlvbk9ic2VydmVyXG5cbmZ1bmN0aW9uIGdldE9ic2VydmVyKCk6IEludGVyc2VjdGlvbk9ic2VydmVyIHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPVxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93LkludGVyc2VjdGlvbk9ic2VydmVyIDogbnVsbFxuICAvLyBSZXR1cm4gc2hhcmVkIGluc3RhbmNlIG9mIEludGVyc2VjdGlvbk9ic2VydmVyIGlmIGFscmVhZHkgY3JlYXRlZFxuICBpZiAoY2FjaGVkT2JzZXJ2ZXIpIHtcbiAgICByZXR1cm4gY2FjaGVkT2JzZXJ2ZXJcbiAgfVxuXG4gIC8vIE9ubHkgY3JlYXRlIHNoYXJlZCBJbnRlcnNlY3Rpb25PYnNlcnZlciBpZiBzdXBwb3J0ZWQgaW4gYnJvd3NlclxuICBpZiAoIUludGVyc2VjdGlvbk9ic2VydmVyKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG4gIHJldHVybiAoY2FjaGVkT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoXG4gICAgKGVudHJpZXMpID0+IHtcbiAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgbGV0IGxhenlJbWFnZSA9IGVudHJ5LnRhcmdldCBhcyBIVE1MSW1hZ2VFbGVtZW50XG4gICAgICAgICAgdW5MYXppZnlJbWFnZShsYXp5SW1hZ2UpXG4gICAgICAgICAgY2FjaGVkT2JzZXJ2ZXIudW5vYnNlcnZlKGxhenlJbWFnZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIHsgcm9vdE1hcmdpbjogJzIwMHB4JyB9XG4gICkpXG59XG5cbmZ1bmN0aW9uIHVuTGF6aWZ5SW1hZ2UobGF6eUltYWdlOiBIVE1MSW1hZ2VFbGVtZW50KTogdm9pZCB7XG4gIGlmIChsYXp5SW1hZ2UuZGF0YXNldC5zcmMpIHtcbiAgICBsYXp5SW1hZ2Uuc3JjID0gbGF6eUltYWdlLmRhdGFzZXQuc3JjXG4gIH1cbiAgaWYgKGxhenlJbWFnZS5kYXRhc2V0LnNyY3NldCkge1xuICAgIGxhenlJbWFnZS5zcmNzZXQgPSBsYXp5SW1hZ2UuZGF0YXNldC5zcmNzZXRcbiAgfVxuICBsYXp5SW1hZ2Uuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJ1xuICBsYXp5SW1hZ2UuY2xhc3NMaXN0LnJlbW92ZSgnX19sYXp5Jylcbn1cblxuZnVuY3Rpb24gZ2V0U2l6ZXMoXG4gIHdpZHRoOiBudW1iZXIgfCB1bmRlZmluZWQsXG4gIGxheW91dDogTGF5b3V0VmFsdWVcbik6IHsgc2l6ZXM6IG51bWJlcltdOyBraW5kOiAndycgfCAneCcgfSB7XG4gIGlmIChcbiAgICB0eXBlb2Ygd2lkdGggIT09ICdudW1iZXInIHx8XG4gICAgbGF5b3V0ID09PSAnZmlsbCcgfHxcbiAgICBsYXlvdXQgPT09ICdyZXNwb25zaXZlJ1xuICApIHtcbiAgICByZXR1cm4geyBzaXplczogY29uZmlnRGV2aWNlU2l6ZXMsIGtpbmQ6ICd3JyB9XG4gIH1cblxuICBjb25zdCBzaXplcyA9IFtcbiAgICAuLi5uZXcgU2V0KFxuICAgICAgW3dpZHRoLCB3aWR0aCAqIDIsIHdpZHRoICogM10ubWFwKFxuICAgICAgICAodykgPT4gYWxsU2l6ZXMuZmluZCgocCkgPT4gcCA+PSB3KSB8fCBhbGxTaXplc1thbGxTaXplcy5sZW5ndGggLSAxXVxuICAgICAgKVxuICAgICksXG4gIF1cbiAgcmV0dXJuIHsgc2l6ZXMsIGtpbmQ6ICd4JyB9XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVTcmMoXG4gIHNyYzogc3RyaW5nLFxuICB1bm9wdGltaXplZDogYm9vbGVhbixcbiAgbGF5b3V0OiBMYXlvdXRWYWx1ZSxcbiAgd2lkdGg/OiBudW1iZXIsXG4gIHF1YWxpdHk/OiBudW1iZXJcbik6IHN0cmluZyB7XG4gIGlmICh1bm9wdGltaXplZCkge1xuICAgIHJldHVybiBzcmNcbiAgfVxuICBjb25zdCB7IHNpemVzIH0gPSBnZXRTaXplcyh3aWR0aCwgbGF5b3V0KVxuICBjb25zdCBsYXJnZXN0ID0gc2l6ZXNbc2l6ZXMubGVuZ3RoIC0gMV1cbiAgcmV0dXJuIGNhbGxMb2FkZXIoeyBzcmMsIHdpZHRoOiBsYXJnZXN0LCBxdWFsaXR5IH0pXG59XG5cbnR5cGUgQ2FsbExvYWRlclByb3BzID0ge1xuICBzcmM6IHN0cmluZ1xuICB3aWR0aDogbnVtYmVyXG4gIHF1YWxpdHk/OiBudW1iZXJcbn1cblxuZnVuY3Rpb24gY2FsbExvYWRlcihsb2FkZXJQcm9wczogQ2FsbExvYWRlclByb3BzKSB7XG4gIGNvbnN0IGxvYWQgPSBsb2FkZXJzLmdldChjb25maWdMb2FkZXIpIHx8IGRlZmF1bHRMb2FkZXJcbiAgcmV0dXJuIGxvYWQoeyByb290OiBjb25maWdQYXRoLCAuLi5sb2FkZXJQcm9wcyB9KVxufVxuXG50eXBlIFNyY1NldERhdGEgPSB7XG4gIHNyYzogc3RyaW5nXG4gIHVub3B0aW1pemVkOiBib29sZWFuXG4gIGxheW91dDogTGF5b3V0VmFsdWVcbiAgd2lkdGg/OiBudW1iZXJcbiAgcXVhbGl0eT86IG51bWJlclxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVNyY1NldCh7XG4gIHNyYyxcbiAgdW5vcHRpbWl6ZWQsXG4gIGxheW91dCxcbiAgd2lkdGgsXG4gIHF1YWxpdHksXG59OiBTcmNTZXREYXRhKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgLy8gQXQgZWFjaCBicmVha3BvaW50LCBnZW5lcmF0ZSBhbiBpbWFnZSB1cmwgdXNpbmcgdGhlIGxvYWRlciwgc3VjaCBhczpcbiAgLy8gJyB3d3cuZXhhbXBsZS5jb20vZm9vLmpwZz93PTQ4MCA0ODB3LCAnXG4gIGlmICh1bm9wdGltaXplZCkge1xuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG4gIGNvbnN0IHsgc2l6ZXMsIGtpbmQgfSA9IGdldFNpemVzKHdpZHRoLCBsYXlvdXQpXG4gIHJldHVybiBzaXplc1xuICAgIC5tYXAoXG4gICAgICAoc2l6ZSwgaSkgPT5cbiAgICAgICAgYCR7Y2FsbExvYWRlcih7IHNyYywgd2lkdGg6IHNpemUsIHF1YWxpdHkgfSl9ICR7XG4gICAgICAgICAga2luZCA9PT0gJ3cnID8gc2l6ZSA6IGkgKyAxXG4gICAgICAgIH0ke2tpbmR9YFxuICAgIClcbiAgICAuam9pbignLCAnKVxufVxuXG50eXBlIFByZWxvYWREYXRhID0ge1xuICBzcmM6IHN0cmluZ1xuICB1bm9wdGltaXplZDogYm9vbGVhblxuICBsYXlvdXQ6IExheW91dFZhbHVlXG4gIHdpZHRoOiBudW1iZXIgfCB1bmRlZmluZWRcbiAgc2l6ZXM/OiBzdHJpbmdcbiAgcXVhbGl0eT86IG51bWJlclxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVByZWxvYWQoe1xuICBzcmMsXG4gIHVub3B0aW1pemVkID0gZmFsc2UsXG4gIGxheW91dCxcbiAgd2lkdGgsXG4gIHNpemVzLFxuICBxdWFsaXR5LFxufTogUHJlbG9hZERhdGEpOiBSZWFjdEVsZW1lbnQge1xuICAvLyBUaGlzIGZ1bmN0aW9uIGdlbmVyYXRlcyBhbiBpbWFnZSBwcmVsb2FkIHRoYXQgbWFrZXMgdXNlIG9mIHRoZSBcImltYWdlc3Jjc2V0XCIgYW5kIFwiaW1hZ2VzaXplc1wiXG4gIC8vIGF0dHJpYnV0ZXMgZm9yIHByZWxvYWRpbmcgcmVzcG9uc2l2ZSBpbWFnZXMuIFRoZXkncmUgc3RpbGwgZXhwZXJpbWVudGFsLCBidXQgZnVsbHkgYmFja3dhcmRcbiAgLy8gY29tcGF0aWJsZSwgYXMgdGhlIGxpbmsgdGFnIGluY2x1ZGVzIGFsbCBuZWNlc3NhcnkgYXR0cmlidXRlcywgZXZlbiBpZiB0aGUgZmluYWwgdHdvIGFyZSBpZ25vcmVkLlxuICAvLyBTZWU6IGh0dHBzOi8vd2ViLmRldi9wcmVsb2FkLXJlc3BvbnNpdmUtaW1hZ2VzL1xuICByZXR1cm4gKFxuICAgIDxIZWFkPlxuICAgICAgPGxpbmtcbiAgICAgICAgcmVsPVwicHJlbG9hZFwiXG4gICAgICAgIGFzPVwiaW1hZ2VcIlxuICAgICAgICBocmVmPXtjb21wdXRlU3JjKHNyYywgdW5vcHRpbWl6ZWQsIGxheW91dCwgd2lkdGgsIHF1YWxpdHkpfVxuICAgICAgICAvLyBAdHMtaWdub3JlOiBpbWFnZXNyY3NldCBhbmQgaW1hZ2VzaXplcyBub3QgeWV0IGluIHRoZSBsaW5rIGVsZW1lbnQgdHlwZVxuICAgICAgICBpbWFnZXNyY3NldD17Z2VuZXJhdGVTcmNTZXQoe1xuICAgICAgICAgIHNyYyxcbiAgICAgICAgICB1bm9wdGltaXplZCxcbiAgICAgICAgICBsYXlvdXQsXG4gICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgcXVhbGl0eSxcbiAgICAgICAgfSl9XG4gICAgICAgIGltYWdlc2l6ZXM9e3NpemVzfVxuICAgICAgLz5cbiAgICA8L0hlYWQ+XG4gIClcbn1cblxuZnVuY3Rpb24gZ2V0SW50KHg6IHVua25vd24pOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICBpZiAodHlwZW9mIHggPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHhcbiAgfVxuICBpZiAodHlwZW9mIHggPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHgsIDEwKVxuICB9XG4gIHJldHVybiB1bmRlZmluZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSW1hZ2Uoe1xuICBzcmMsXG4gIHNpemVzLFxuICB1bm9wdGltaXplZCA9IGZhbHNlLFxuICBwcmlvcml0eSA9IGZhbHNlLFxuICBsb2FkaW5nLFxuICBjbGFzc05hbWUsXG4gIHF1YWxpdHksXG4gIHdpZHRoLFxuICBoZWlnaHQsXG4gIC4uLmFsbFxufTogSW1hZ2VQcm9wcykge1xuICBjb25zdCB0aGlzRWwgPSB1c2VSZWY8SFRNTEltYWdlRWxlbWVudD4obnVsbClcblxuICBsZXQgcmVzdDogUGFydGlhbDxJbWFnZVByb3BzPiA9IGFsbFxuICBsZXQgbGF5b3V0OiBOb25OdWxsYWJsZTxMYXlvdXRWYWx1ZT4gPSBzaXplcyA/ICdyZXNwb25zaXZlJyA6ICdpbnRyaW5zaWMnXG4gIGxldCB1bnNpemVkID0gZmFsc2VcbiAgaWYgKCd1bnNpemVkJyBpbiByZXN0KSB7XG4gICAgdW5zaXplZCA9IEJvb2xlYW4ocmVzdC51bnNpemVkKVxuICAgIC8vIFJlbW92ZSBwcm9wZXJ0eSBzbyBpdCdzIG5vdCBzcHJlYWQgaW50byBpbWFnZTpcbiAgICBkZWxldGUgcmVzdFsndW5zaXplZCddXG4gIH0gZWxzZSBpZiAoJ2xheW91dCcgaW4gcmVzdCkge1xuICAgIC8vIE92ZXJyaWRlIGRlZmF1bHQgbGF5b3V0IGlmIHRoZSB1c2VyIHNwZWNpZmllZCBvbmU6XG4gICAgaWYgKHJlc3QubGF5b3V0KSBsYXlvdXQgPSByZXN0LmxheW91dFxuXG4gICAgLy8gUmVtb3ZlIHByb3BlcnR5IHNvIGl0J3Mgbm90IHNwcmVhZCBpbnRvIGltYWdlOlxuICAgIGRlbGV0ZSByZXN0WydsYXlvdXQnXVxuICB9XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoIXNyYykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgSW1hZ2UgaXMgbWlzc2luZyByZXF1aXJlZCBcInNyY1wiIHByb3BlcnR5LiBNYWtlIHN1cmUgeW91IHBhc3MgXCJzcmNcIiBpbiBwcm9wcyB0byB0aGUgXFxgbmV4dC9pbWFnZVxcYCBjb21wb25lbnQuIFJlY2VpdmVkOiAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICAgIHsgd2lkdGgsIGhlaWdodCwgcXVhbGl0eSB9XG4gICAgICAgICl9YFxuICAgICAgKVxuICAgIH1cbiAgICBpZiAoIVZBTElEX0xBWU9VVF9WQUxVRVMuaW5jbHVkZXMobGF5b3V0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBoYXMgaW52YWxpZCBcImxheW91dFwiIHByb3BlcnR5LiBQcm92aWRlZCBcIiR7bGF5b3V0fVwiIHNob3VsZCBiZSBvbmUgb2YgJHtWQUxJRF9MQVlPVVRfVkFMVUVTLm1hcChcbiAgICAgICAgICBTdHJpbmdcbiAgICAgICAgKS5qb2luKCcsJyl9LmBcbiAgICAgIClcbiAgICB9XG4gICAgaWYgKCFWQUxJRF9MT0FESU5HX1ZBTFVFUy5pbmNsdWRlcyhsb2FkaW5nKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBoYXMgaW52YWxpZCBcImxvYWRpbmdcIiBwcm9wZXJ0eS4gUHJvdmlkZWQgXCIke2xvYWRpbmd9XCIgc2hvdWxkIGJlIG9uZSBvZiAke1ZBTElEX0xPQURJTkdfVkFMVUVTLm1hcChcbiAgICAgICAgICBTdHJpbmdcbiAgICAgICAgKS5qb2luKCcsJyl9LmBcbiAgICAgIClcbiAgICB9XG4gICAgaWYgKHByaW9yaXR5ICYmIGxvYWRpbmcgPT09ICdsYXp5Jykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBoYXMgYm90aCBcInByaW9yaXR5XCIgYW5kIFwibG9hZGluZz0nbGF6eSdcIiBwcm9wZXJ0aWVzLiBPbmx5IG9uZSBzaG91bGQgYmUgdXNlZC5gXG4gICAgICApXG4gICAgfVxuICAgIGlmICh1bnNpemVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIGhhcyBkZXByZWNhdGVkIFwidW5zaXplZFwiIHByb3BlcnR5LCB3aGljaCB3YXMgcmVtb3ZlZCBpbiBmYXZvciBvZiB0aGUgXCJsYXlvdXQ9J2ZpbGwnXCIgcHJvcGVydHlgXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgbGV0IGxhenkgPSBsb2FkaW5nID09PSAnbGF6eSdcbiAgaWYgKCFwcmlvcml0eSAmJiB0eXBlb2YgbG9hZGluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBsYXp5ID0gdHJ1ZVxuICB9XG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmICF3aW5kb3cuSW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIHtcbiAgICAvLyBSZW5kZXJpbmcgY2xpZW50IHNpZGUgb24gYnJvd3NlciB3aXRob3V0IGludGVyc2VjdGlvbiBvYnNlcnZlclxuICAgIGxhenkgPSBmYWxzZVxuICB9XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzRWwuY3VycmVudFxuXG4gICAgaWYgKHRhcmdldCAmJiBsYXp5KSB7XG4gICAgICBjb25zdCBvYnNlcnZlciA9IGdldE9ic2VydmVyKClcblxuICAgICAgaWYgKG9ic2VydmVyKSB7XG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0KVxuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKHRhcmdldClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9icm93c2VycyB3aXRob3V0IGludGVyc2VjdGlvbiBvYnNlcnZlclxuICAgICAgICB1bkxhemlmeUltYWdlKHRhcmdldClcbiAgICAgIH1cbiAgICB9XG4gIH0sIFt0aGlzRWwsIGxhenldKVxuXG4gIGNvbnN0IHdpZHRoSW50ID0gZ2V0SW50KHdpZHRoKVxuICBjb25zdCBoZWlnaHRJbnQgPSBnZXRJbnQoaGVpZ2h0KVxuICBjb25zdCBxdWFsaXR5SW50ID0gZ2V0SW50KHF1YWxpdHkpXG5cbiAgbGV0IHdyYXBwZXJTdHlsZTogSlNYLkludHJpbnNpY0VsZW1lbnRzWydkaXYnXVsnc3R5bGUnXSB8IHVuZGVmaW5lZFxuICBsZXQgc2l6ZXJTdHlsZTogSlNYLkludHJpbnNpY0VsZW1lbnRzWydkaXYnXVsnc3R5bGUnXSB8IHVuZGVmaW5lZFxuICBsZXQgc2l6ZXJTdmc6IHN0cmluZyB8IHVuZGVmaW5lZFxuICBsZXQgaW1nU3R5bGU6IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snaW1nJ11bJ3N0eWxlJ10gPSB7XG4gICAgdmlzaWJpbGl0eTogbGF6eSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnLFxuXG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgdG9wOiAwLFxuICAgIGxlZnQ6IDAsXG4gICAgYm90dG9tOiAwLFxuICAgIHJpZ2h0OiAwLFxuXG4gICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgcGFkZGluZzogMCxcbiAgICBib3JkZXI6ICdub25lJyxcbiAgICBtYXJnaW46ICdhdXRvJyxcblxuICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgd2lkdGg6IDAsXG4gICAgaGVpZ2h0OiAwLFxuICAgIG1pbldpZHRoOiAnMTAwJScsXG4gICAgbWF4V2lkdGg6ICcxMDAlJyxcbiAgICBtaW5IZWlnaHQ6ICcxMDAlJyxcbiAgICBtYXhIZWlnaHQ6ICcxMDAlJyxcbiAgfVxuICBpZiAoXG4gICAgdHlwZW9mIHdpZHRoSW50ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBoZWlnaHRJbnQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgbGF5b3V0ICE9PSAnZmlsbCdcbiAgKSB7XG4gICAgLy8gPEltYWdlIHNyYz1cImkucG5nXCIgd2lkdGg9XCIxMDBcIiBoZWlnaHQ9XCIxMDBcIiAvPlxuICAgIGNvbnN0IHF1b3RpZW50ID0gaGVpZ2h0SW50IC8gd2lkdGhJbnRcbiAgICBjb25zdCBwYWRkaW5nVG9wID0gaXNOYU4ocXVvdGllbnQpID8gJzEwMCUnIDogYCR7cXVvdGllbnQgKiAxMDB9JWBcbiAgICBpZiAobGF5b3V0ID09PSAncmVzcG9uc2l2ZScpIHtcbiAgICAgIC8vIDxJbWFnZSBzcmM9XCJpLnBuZ1wiIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMTAwXCIgbGF5b3V0PVwicmVzcG9uc2l2ZVwiIC8+XG4gICAgICB3cmFwcGVyU3R5bGUgPSB7XG4gICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG5cbiAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgIG1hcmdpbjogMCxcbiAgICAgIH1cbiAgICAgIHNpemVyU3R5bGUgPSB7IGRpc3BsYXk6ICdibG9jaycsIGJveFNpemluZzogJ2JvcmRlci1ib3gnLCBwYWRkaW5nVG9wIH1cbiAgICB9IGVsc2UgaWYgKGxheW91dCA9PT0gJ2ludHJpbnNpYycpIHtcbiAgICAgIC8vIDxJbWFnZSBzcmM9XCJpLnBuZ1wiIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMTAwXCIgbGF5b3V0PVwiaW50cmluc2ljXCIgLz5cbiAgICAgIHdyYXBwZXJTdHlsZSA9IHtcbiAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgICBtYXJnaW46IDAsXG4gICAgICB9XG4gICAgICBzaXplclN0eWxlID0ge1xuICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgbWF4V2lkdGg6ICcxMDAlJyxcbiAgICAgIH1cbiAgICAgIHNpemVyU3ZnID0gYDxzdmcgd2lkdGg9XCIke3dpZHRoSW50fVwiIGhlaWdodD1cIiR7aGVpZ2h0SW50fVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2ZXJzaW9uPVwiMS4xXCIvPmBcbiAgICB9IGVsc2UgaWYgKGxheW91dCA9PT0gJ2ZpeGVkJykge1xuICAgICAgLy8gPEltYWdlIHNyYz1cImkucG5nXCIgd2lkdGg9XCIxMDBcIiBoZWlnaHQ9XCIxMDBcIiBsYXlvdXQ9XCJmaXhlZFwiIC8+XG4gICAgICB3cmFwcGVyU3R5bGUgPSB7XG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgd2lkdGg6IHdpZHRoSW50LFxuICAgICAgICBoZWlnaHQ6IGhlaWdodEludCxcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoXG4gICAgdHlwZW9mIHdpZHRoSW50ID09PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBoZWlnaHRJbnQgPT09ICd1bmRlZmluZWQnICYmXG4gICAgbGF5b3V0ID09PSAnZmlsbCdcbiAgKSB7XG4gICAgLy8gPEltYWdlIHNyYz1cImkucG5nXCIgbGF5b3V0PVwiZmlsbFwiIC8+XG4gICAgd3JhcHBlclN0eWxlID0ge1xuICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcblxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB0b3A6IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgYm90dG9tOiAwLFxuICAgICAgcmlnaHQ6IDAsXG5cbiAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgbWFyZ2luOiAwLFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyA8SW1hZ2Ugc3JjPVwiaS5wbmdcIiAvPlxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIG11c3QgdXNlIFwid2lkdGhcIiBhbmQgXCJoZWlnaHRcIiBwcm9wZXJ0aWVzIG9yIFwibGF5b3V0PSdmaWxsJ1wiIHByb3BlcnR5LmBcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICAvLyBHZW5lcmF0ZSBhdHRyaWJ1dGUgdmFsdWVzXG4gIGNvbnN0IGltZ1NyYyA9IGNvbXB1dGVTcmMoc3JjLCB1bm9wdGltaXplZCwgbGF5b3V0LCB3aWR0aEludCwgcXVhbGl0eUludClcbiAgY29uc3QgaW1nU3JjU2V0ID0gZ2VuZXJhdGVTcmNTZXQoe1xuICAgIHNyYyxcbiAgICB1bm9wdGltaXplZCxcbiAgICBsYXlvdXQsXG4gICAgd2lkdGg6IHdpZHRoSW50LFxuICAgIHF1YWxpdHk6IHF1YWxpdHlJbnQsXG4gIH0pXG5cbiAgbGV0IGltZ0F0dHJpYnV0ZXM6XG4gICAgfCB7XG4gICAgICAgIHNyYzogc3RyaW5nXG4gICAgICAgIHNyY1NldD86IHN0cmluZ1xuICAgICAgfVxuICAgIHwge1xuICAgICAgICAnZGF0YS1zcmMnOiBzdHJpbmdcbiAgICAgICAgJ2RhdGEtc3Jjc2V0Jz86IHN0cmluZ1xuICAgICAgfVxuICBpZiAoIWxhenkpIHtcbiAgICBpbWdBdHRyaWJ1dGVzID0ge1xuICAgICAgc3JjOiBpbWdTcmMsXG4gICAgfVxuICAgIGlmIChpbWdTcmNTZXQpIHtcbiAgICAgIGltZ0F0dHJpYnV0ZXMuc3JjU2V0ID0gaW1nU3JjU2V0XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGltZ0F0dHJpYnV0ZXMgPSB7XG4gICAgICAnZGF0YS1zcmMnOiBpbWdTcmMsXG4gICAgfVxuICAgIGlmIChpbWdTcmNTZXQpIHtcbiAgICAgIGltZ0F0dHJpYnV0ZXNbJ2RhdGEtc3Jjc2V0J10gPSBpbWdTcmNTZXRcbiAgICB9XG4gICAgY2xhc3NOYW1lID0gY2xhc3NOYW1lID8gY2xhc3NOYW1lICsgJyBfX2xhenknIDogJ19fbGF6eSdcbiAgfVxuXG4gIC8vIE5vIG5lZWQgdG8gYWRkIHByZWxvYWRzIG9uIHRoZSBjbGllbnQgc2lkZS0tYnkgdGhlIHRpbWUgdGhlIGFwcGxpY2F0aW9uIGlzIGh5ZHJhdGVkLFxuICAvLyBpdCdzIHRvbyBsYXRlIGZvciBwcmVsb2Fkc1xuICBjb25zdCBzaG91bGRQcmVsb2FkID0gcHJpb3JpdHkgJiYgdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCdcblxuICBpZiAodW5zaXplZCkge1xuICAgIHdyYXBwZXJTdHlsZSA9IHVuZGVmaW5lZFxuICAgIHNpemVyU3R5bGUgPSB1bmRlZmluZWRcbiAgICBpbWdTdHlsZSA9IHVuZGVmaW5lZFxuICB9XG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17d3JhcHBlclN0eWxlfT5cbiAgICAgIHtzaG91bGRQcmVsb2FkXG4gICAgICAgID8gZ2VuZXJhdGVQcmVsb2FkKHtcbiAgICAgICAgICAgIHNyYyxcbiAgICAgICAgICAgIGxheW91dCxcbiAgICAgICAgICAgIHVub3B0aW1pemVkLFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoSW50LFxuICAgICAgICAgICAgc2l6ZXMsXG4gICAgICAgICAgICBxdWFsaXR5OiBxdWFsaXR5SW50LFxuICAgICAgICAgIH0pXG4gICAgICAgIDogbnVsbH1cbiAgICAgIHtzaXplclN0eWxlID8gKFxuICAgICAgICA8ZGl2IHN0eWxlPXtzaXplclN0eWxlfT5cbiAgICAgICAgICB7c2l6ZXJTdmcgPyAoXG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHN0eWxlPXt7IG1heFdpZHRoOiAnMTAwJScsIGRpc3BsYXk6ICdibG9jaycgfX1cbiAgICAgICAgICAgICAgYWx0PVwiXCJcbiAgICAgICAgICAgICAgYXJpYS1oaWRkZW49e3RydWV9XG4gICAgICAgICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgICAgICAgICBzcmM9e2BkYXRhOmltYWdlL3N2Zyt4bWw7Y2hhcnNldD11dGYtOCwke3NpemVyU3ZnfWB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuICAgICAgPGltZ1xuICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgey4uLmltZ0F0dHJpYnV0ZXN9XG4gICAgICAgIGRlY29kaW5nPVwiYXN5bmNcIlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgc2l6ZXM9e3NpemVzfVxuICAgICAgICByZWY9e3RoaXNFbH1cbiAgICAgICAgc3R5bGU9e2ltZ1N0eWxlfVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG4vL0JVSUxUIElOIExPQURFUlNcblxudHlwZSBMb2FkZXJQcm9wcyA9IENhbGxMb2FkZXJQcm9wcyAmIHsgcm9vdDogc3RyaW5nIH1cblxuZnVuY3Rpb24gbm9ybWFsaXplU3JjKHNyYzogc3RyaW5nKSB7XG4gIHJldHVybiBzcmNbMF0gPT09ICcvJyA/IHNyYy5zbGljZSgxKSA6IHNyY1xufVxuXG5mdW5jdGlvbiBpbWdpeExvYWRlcih7IHJvb3QsIHNyYywgd2lkdGgsIHF1YWxpdHkgfTogTG9hZGVyUHJvcHMpOiBzdHJpbmcge1xuICAvLyBEZW1vOiBodHRwczovL3N0YXRpYy5pbWdpeC5uZXQvZGFpc3kucG5nP2Zvcm1hdD1hdXRvJmZpdD1tYXgmdz0zMDBcbiAgY29uc3QgcGFyYW1zID0gWydhdXRvPWZvcm1hdCcsICdmaXQ9bWF4JywgJ3c9JyArIHdpZHRoXVxuICBsZXQgcGFyYW1zU3RyaW5nID0gJydcbiAgaWYgKHF1YWxpdHkpIHtcbiAgICBwYXJhbXMucHVzaCgncT0nICsgcXVhbGl0eSlcbiAgfVxuXG4gIGlmIChwYXJhbXMubGVuZ3RoKSB7XG4gICAgcGFyYW1zU3RyaW5nID0gJz8nICsgcGFyYW1zLmpvaW4oJyYnKVxuICB9XG4gIHJldHVybiBgJHtyb290fSR7bm9ybWFsaXplU3JjKHNyYyl9JHtwYXJhbXNTdHJpbmd9YFxufVxuXG5mdW5jdGlvbiBha2FtYWlMb2FkZXIoeyByb290LCBzcmMsIHdpZHRoIH06IExvYWRlclByb3BzKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke3Jvb3R9JHtub3JtYWxpemVTcmMoc3JjKX0/aW13aWR0aD0ke3dpZHRofWBcbn1cblxuZnVuY3Rpb24gY2xvdWRpbmFyeUxvYWRlcih7IHJvb3QsIHNyYywgd2lkdGgsIHF1YWxpdHkgfTogTG9hZGVyUHJvcHMpOiBzdHJpbmcge1xuICAvLyBEZW1vOiBodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kZW1vL2ltYWdlL3VwbG9hZC93XzMwMCxjX2xpbWl0L3R1cnRsZXMuanBnXG4gIGNvbnN0IHBhcmFtcyA9IFsnZl9hdXRvJywgJ2NfbGltaXQnLCAnd18nICsgd2lkdGhdXG4gIGxldCBwYXJhbXNTdHJpbmcgPSAnJ1xuICBpZiAocXVhbGl0eSkge1xuICAgIHBhcmFtcy5wdXNoKCdxXycgKyBxdWFsaXR5KVxuICB9XG4gIGlmIChwYXJhbXMubGVuZ3RoKSB7XG4gICAgcGFyYW1zU3RyaW5nID0gcGFyYW1zLmpvaW4oJywnKSArICcvJ1xuICB9XG4gIHJldHVybiBgJHtyb290fSR7cGFyYW1zU3RyaW5nfSR7bm9ybWFsaXplU3JjKHNyYyl9YFxufVxuXG5mdW5jdGlvbiBkZWZhdWx0TG9hZGVyKHsgcm9vdCwgc3JjLCB3aWR0aCwgcXVhbGl0eSB9OiBMb2FkZXJQcm9wcyk6IHN0cmluZyB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgY29uc3QgbWlzc2luZ1ZhbHVlcyA9IFtdXG5cbiAgICAvLyB0aGVzZSBzaG91bGQgYWx3YXlzIGJlIHByb3ZpZGVkIGJ1dCBtYWtlIHN1cmUgdGhleSBhcmVcbiAgICBpZiAoIXNyYykgbWlzc2luZ1ZhbHVlcy5wdXNoKCdzcmMnKVxuICAgIGlmICghd2lkdGgpIG1pc3NpbmdWYWx1ZXMucHVzaCgnd2lkdGgnKVxuXG4gICAgaWYgKG1pc3NpbmdWYWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgTmV4dCBJbWFnZSBPcHRpbWl6YXRpb24gcmVxdWlyZXMgJHttaXNzaW5nVmFsdWVzLmpvaW4oXG4gICAgICAgICAgJywgJ1xuICAgICAgICApfSB0byBiZSBwcm92aWRlZC4gTWFrZSBzdXJlIHlvdSBwYXNzIHRoZW0gYXMgcHJvcHMgdG8gdGhlIFxcYG5leHQvaW1hZ2VcXGAgY29tcG9uZW50LiBSZWNlaXZlZDogJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICB7IHNyYywgd2lkdGgsIHF1YWxpdHkgfVxuICAgICAgICApfWBcbiAgICAgIClcbiAgICB9XG5cbiAgICBpZiAoc3JjICYmICFzcmMuc3RhcnRzV2l0aCgnLycpICYmIGNvbmZpZ0RvbWFpbnMpIHtcbiAgICAgIGxldCBwYXJzZWRTcmM6IFVSTFxuICAgICAgdHJ5IHtcbiAgICAgICAgcGFyc2VkU3JjID0gbmV3IFVSTChzcmMpXG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgRmFpbGVkIHRvIHBhcnNlIFwiJHtzcmN9XCIgaW4gXCJuZXh0L2ltYWdlXCIsIGlmIHVzaW5nIHJlbGF0aXZlIGltYWdlIGl0IG11c3Qgc3RhcnQgd2l0aCBhIGxlYWRpbmcgc2xhc2ggXCIvXCIgb3IgYmUgYW4gYWJzb2x1dGUgVVJMIChodHRwOi8vIG9yIGh0dHBzOi8vKWBcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBpZiAoIWNvbmZpZ0RvbWFpbnMuaW5jbHVkZXMocGFyc2VkU3JjLmhvc3RuYW1lKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYEludmFsaWQgc3JjIHByb3AgKCR7c3JjfSkgb24gXFxgbmV4dC9pbWFnZVxcYCwgaG9zdG5hbWUgXCIke3BhcnNlZFNyYy5ob3N0bmFtZX1cIiBpcyBub3QgY29uZmlndXJlZCB1bmRlciBpbWFnZXMgaW4geW91ciBcXGBuZXh0LmNvbmZpZy5qc1xcYFxcbmAgK1xuICAgICAgICAgICAgYFNlZSBtb3JlIGluZm86IGh0dHBzOi8vZXJyLnNoL25leHRqcy9uZXh0LWltYWdlLXVuY29uZmlndXJlZC1ob3N0YFxuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGAke3Jvb3R9P3VybD0ke2VuY29kZVVSSUNvbXBvbmVudChzcmMpfSZ3PSR7d2lkdGh9JnE9JHtxdWFsaXR5IHx8IDc1fWBcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kaXN0L2NsaWVudC9pbWFnZScpXG4iLCJmdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0ge307XG4gIHZhciBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgdmFyIGtleSwgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgc291cmNlS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleSA9IHNvdXJjZUtleXNbaV07XG4gICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZTsiLCIvLyBpbXBvcnQgeyB1c2VSZXF1aXJlQXV0aCB9IGZyb20gJy4uL2hvb2tzL3VzZVJlcXVpcmVBdXRoJ1xyXG5pbXBvcnQgU2VhcmNoQ2F0ZWdvcmllcyBmcm9tICcuLi9jb21wb25lbnRzL1NlYXJjaENhdGVnb3JpZXMvU2VhcmNoQ2F0ZWdvcmllcydcclxuaW1wb3J0IHsgY2F0ZWdvcmllcyB9IGZyb20gJy4uL2hlbHBlcnMvY2F0ZWdvcmllcydcclxuLy8gaW1wb3J0IFJlc3RhdXJhbnRTdGVwcGVyIGZyb20gJy4uL2NvbXBvbmVudHMvc3RlcHBlcnMvUmVzdGF1cmFudFN0ZXBwZXInXHJcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEYXNoYm9hcmREYXNoQm9hcmRQYWdlKHsgY2F0ZWdvcmllcyB9KXtcclxuICAgIC8vIGNvbnN0IGF1dGggPSB1c2VSZXF1aXJlQXV0aCgpO1xyXG4gICAgLy8gaWYgKCFhdXRoLnVzZXIpIHJldHVybiBudWxsXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaC1zY3JlZW4gdy1mdWxsIGZsZXggb3ZlcmZsb3ctaGlkZGVuIHNlbGVjdC1ub25lXCI+XHJcbiAgICAgICAgICAgICAgICA8bmF2IGNsYXNzTmFtZT1cInctMjQgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgYmctd2hpdGUgZGFyazpiZy1ncmF5LTgwMCBweS00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgey8qIDwhLS0gTGVmdCBzaWRlIE5hdkJhciAtLT4gKi99XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiA8IS0tIEFwcCBMb2dvIC0tPiAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEltYWdlIHNyYz1cIi9mb3J0d28tbG9nby5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibXQtMiB0ZXh0LWdyYXktNzAwIGRhcms6dGV4dC1ncmF5LTQwMCBjYXBpdGFsaXplXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiA8IS0tIExpbmtzIC0tPiAqL31cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJtdC0zIHAtMiB0ZXh0LWJsdWUtNjAwIGRhcms6dGV4dC1ibHVlLTMwMCByb3VuZGVkLWxnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCJ0ZWFjaGVyLWRhc2hib2FyZC9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIiBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN2Z1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmaWxsLWN1cnJlbnQgaC01IHctNVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNMTkgNXYyaC00VjVoNE05IDV2Nkg1VjVoNG0xMCA4djZoLTR2LTZoNE05XHJcbiAgICAgICAgICAgICAgICAgIDE3djJINXYtMmg0TTIxIDNoLTh2Nmg4VjNNMTEgM0gzdjEwaDhWM20xMFxyXG4gICAgICAgICAgICAgICAgICA4aC04djEwaDhWMTFtLTEwIDRIM3Y2aDh2LTZ6XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvcGF0aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIG10LTJcIj5kYXNoQm9hcmQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm10LTMgcC0yIGhvdmVyOnRleHQtYmx1ZS02MDAgZGFyay1ob3Zlcjp0ZXh0LWJsdWUtMzAwXHJcbiAgICAgICAgICAgIHJvdW5kZWQtbGdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCJpbmJveC9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIiBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN2Z1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmaWxsLWN1cnJlbnQgaC01IHctNVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNMjMgM3YtLjVhMi41IDIuNSAwIDAwLTUgMFYzYy0uNTUgMC0xIC40NS0xIDF2NGMwXHJcbiAgICAgICAgICAgICAgICAgIC41NS40NSAxIDEgMWg1Yy41NSAwIDEtLjQ1IDEtMVY0YzAtLjU1LS40NS0xLTEtMW0tMVxyXG4gICAgICAgICAgICAgICAgICAwaC0zdi0uNWMwLS44My42Ny0xLjUgMS41LTEuNXMxLjUuNjcgMS41IDEuNVYzTTZcclxuICAgICAgICAgICAgICAgICAgMTFoOXYySDZ2LTJtMC00aDl2Mkg2VjdtMTYgNHY1YzAgMS4xMS0uODkgMi0yIDJINmwtNFxyXG4gICAgICAgICAgICAgICAgICA0VjRhMiAyIDAgMDEyLTJoMTF2Mkg0djEzLjE3TDUuMTcgMTZIMjB2LTVoMnpcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC9wYXRoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgbXQtMlwiPm1lc3NhZ2VzPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtdC0zIHAtMiBob3Zlcjp0ZXh0LWJsdWUtNjAwIGRhcmstaG92ZXI6dGV4dC1ibHVlLTMwMFxyXG4gICAgICAgICAgICByb3VuZGVkLWxnXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmPVwiZXhwZW5zZXMtZGFzaGJvYXJkL1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3ZnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZpbGwtY3VycmVudCBoLTUgdy01XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk0yMSAxOHYxYTIgMiAwIDAxLTIgMkg1YTIgMiAwIDAxLTItMlY1YTIgMiAwXHJcbiAgICAgICAgICAgICAgICAgIDAxMi0yaDE0YTIgMiAwIDAxMiAydjFoLTlhMiAyIDAgMDAtMiAydjhhMiAyIDAgMDAyXHJcbiAgICAgICAgICAgICAgICAgIDJtMC0yaDEwVjhIMTJtNCA1LjVhMS41IDEuNSAwIDAxLTEuNS0xLjUgMS41IDEuNSAwXHJcbiAgICAgICAgICAgICAgICAgIDAxMS41LTEuNSAxLjUgMS41IDAgMDExLjUgMS41IDEuNSAxLjUgMCAwMS0xLjUgMS41elwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID48L3BhdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBtdC0yXCI+ZWFybmluZ3M8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm10LTMgcC0yIGhvdmVyOnRleHQtYmx1ZS02MDAgZGFyay1ob3Zlcjp0ZXh0LWJsdWUtMzAwXHJcbiAgICAgICAgICAgIHJvdW5kZWQtbGdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCJ1c2Vycy1kYXNoYm9hcmQvXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCIgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmlsbC1jdXJyZW50IGgtNSB3LTVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNNTA1IDQ0Mi43TDQwNS4zXHJcbiAgICAgICAgICAgICAgICAgIDM0M2MtNC41LTQuNS0xMC42LTctMTctN0gzNzJjMjcuNi0zNS4zIDQ0LTc5LjdcclxuICAgICAgICAgICAgICAgICAgNDQtMTI4QzQxNiA5My4xIDMyMi45IDAgMjA4IDBTMCA5My4xIDAgMjA4czkzLjEgMjA4XHJcbiAgICAgICAgICAgICAgICAgIDIwOCAyMDhjNDguMyAwIDkyLjctMTYuNCAxMjgtNDR2MTYuM2MwIDYuNCAyLjUgMTIuNSA3XHJcbiAgICAgICAgICAgICAgICAgIDE3bDk5LjcgOTkuN2M5LjQgOS40IDI0LjYgOS40IDMzLjlcclxuICAgICAgICAgICAgICAgICAgMGwyOC4zLTI4LjNjOS40LTkuNCA5LjQtMjQuNi4xLTM0ek0yMDggMzM2Yy03MC43XHJcbiAgICAgICAgICAgICAgICAgIDAtMTI4LTU3LjItMTI4LTEyOCAwLTcwLjcgNTcuMi0xMjggMTI4LTEyOCA3MC43IDAgMTI4XHJcbiAgICAgICAgICAgICAgICAgIDU3LjIgMTI4IDEyOCAwIDcwLjctNTcuMiAxMjgtMTI4IDEyOHpcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC9wYXRoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgbXQtMlwiPmpvYnM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm10LTMgcC0yIGhvdmVyOnRleHQtYmx1ZS02MDAgZGFyay1ob3Zlcjp0ZXh0LWJsdWUtMzAwXHJcbiAgICAgICAgICAgIHJvdW5kZWQtbGdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCJtZWV0dXAvXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCIgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmlsbC1jdXJyZW50IGgtNSB3LTVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTE5IDE5SDVWOGgxNG0wLTVoLTFWMWgtMnYySDhWMUg2djJINWEyIDIgMCAwMC0yXHJcbiAgICAgICAgICAgICAgICAgIDJ2MTRhMiAyIDAgMDAyIDJoMTRhMiAyIDAgMDAyLTJWNWEyIDIgMCAwMC0yLTJtLTIuNDdcclxuICAgICAgICAgICAgICAgICAgOC4wNkwxNS40NyAxMGwtNC44OCA0Ljg4LTIuMTItMi4xMi0xLjA2IDEuMDZMMTAuNTlcclxuICAgICAgICAgICAgICAgICAgMTdsNS45NC01Ljk0elwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID48L3BhdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBtdC0yXCI+c2NoZWR1bGU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibXQtMyBwLTIgaG92ZXI6dGV4dC1ibHVlLTYwMCByb3VuZGVkLWxnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCJzb2NpYWwtbWVkaWEtZGFzaGJvYXJkL1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3ZnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZpbGwtY3VycmVudCBoLTUgdy01XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk0xNyAxMC41VjdhMSAxIDAgMDAtMS0xSDRhMSAxIDAgMDAtMSAxdjEwYTEgMSAwXHJcbiAgICAgICAgICAgICAgICAgIDAwMSAxaDEyYTEgMSAwIDAwMS0xdi0zLjVsNCA0di0xMWwtNCA0elwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID48L3BhdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBtdC0yXCI+bGVzc29uPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibXQtYXV0byBmbGV4IGl0ZW1zLWNlbnRlciBwLTIgdGV4dC1ibHVlLTcwMCBiZy1wdXJwbGUtMjAwXHJcbiAgICAgICAgICBkYXJrOnRleHQtYmx1ZS01MDAgcm91bmRlZC1mdWxsXCJcclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiA8IS0tIGltcG9ydGFudCBhY3Rpb24gLS0+ICovfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmaWxsLWN1cnJlbnQgaC01IHctNVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk0xMiAxYy01IDAtOSA0LTkgOXY3YTMgMyAwIDAwMyAzaDN2LThINXYtMmE3IDcgMCAwMTctN1xyXG4gICAgICAgICAgICAgICAgNyA3IDAgMDE3IDd2MmgtNHY4aDR2MWgtN3YyaDZhMyAzIDBcclxuICAgICAgICAgICAgICAgIDAwMy0zVjEwYzAtNS00LjAzLTktOS05elwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvcGF0aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L25hdj5cclxuICAgICAgICAgICAgICAgIDxtYWluXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibXktMSBwdC0yIHBiLTIgcHgtMTAgZmxleC0xIGJnLWdyYXktMjAwIGRhcms6YmctYmxhY2sgcm91bmRlZC1sLWxnXHJcbiAgICAgICAgdHJhbnNpdGlvbiBkdXJhdGlvbi01MDAgZWFzZS1pbi1vdXQgb3ZlcmZsb3cteS1hdXRvXCJcclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgY2FwaXRhbGl6ZSB0ZXh0LTN4bFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1yLTYgbXQtOCBweS0yIGZsZXgtc2hyaW5rLTAgZmxleCBmbGV4LWNvbCBiZy13aGl0ZVxyXG4gICAgICAgICAgICBkYXJrOmJnLWdyYXktNjAwIHJvdW5kZWQtbGdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogPCEtLSBDYXJkIGxpc3QgY29udGFpbmVyIC0tPiAqL31cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U2VhcmNoQ2F0ZWdvcmllcyBjYXRlZ29yaWVzPXtjYXRlZ29yaWVzfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvbWFpbj5cclxuXHJcbiAgICAgICAgICAgICAgICA8YXNpZGVcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTEvNCBteS0xIG1yLTEgcHgtNiBweS00IGZsZXggZmxleC1jb2wgYmctZ3JheS0yMDAgZGFyazpiZy1ibGFja1xyXG4gICAgICAgIGRhcms6dGV4dC1ncmF5LTQwMCByb3VuZGVkLXItbGcgb3ZlcmZsb3cteS1hdXRvXCJcclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7LyogPCEtLSBSaWdodCBzaWRlIE5hdkJhciAtLT4gKi99XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiA8IS0tIEluZm8gLS0+ICovfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImluYm94L1wiIGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogPCEtLSBMZWZ0IHNpZGUgLS0+ICovfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC01IHctNSBob3Zlcjp0ZXh0LXJlZC02MDAgZGFyay1ob3Zlcjp0ZXh0LXJlZC00MDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2Utd2lkdGg9XCIyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTggOEE2IDYgMCAwIDAgNiA4YzAgNy0zIDktMyA5aDE4cy0zLTItMy05XCI+PC9wYXRoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEzLjczIDIxYTIgMiAwIDAgMS0zLjQ2IDBcIj48L3BhdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB3LTIgaC0yIGxlZnQtMCBtYi02IG1sLTIgYm90dG9tLTBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTEgYmctcmVkLTYwMCByb3VuZGVkLWZ1bGwgdGV4dC13aGl0ZVxyXG4gICAgICAgICAgICAgICAgdGV4dC14c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA3XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiA8IS0tIFJpZ2h0IHNpZGUgLS0+ICovfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLTEwIHctMTAgcm91bmRlZC1mdWxsIG9iamVjdC1jb3ZlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly9pLnBpbmltZy5jb20vb3JpZ2luYWxzLzY4L2UxL2UxLzY4ZTFlMTM3OTU5ZDM2M2YxNzJkYzNjYzUwOTA0NjY5LmpwZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwidGVtcGVzdCBwcm9maWxlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJtbC0xIGZvY3VzOm91dGxpbmUtbm9uZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC00IHctNCBmaWxsLWN1cnJlbnRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDE5MiA1MTJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNOTYgMTg0YzM5LjggMCA3MiAzMi4yIDcyIDcycy0zMi4yIDcyLTcyXHJcbiAgICAgICAgICAgICAgICAgIDcyLTcyLTMyLjItNzItNzIgMzIuMi03MiA3Mi03MnpNMjQgODBjMCAzOS44IDMyLjIgNzJcclxuICAgICAgICAgICAgICAgICAgNzIgNzJzNzItMzIuMiA3Mi03MlMxMzUuOCA4IDk2IDggMjQgNDAuMiAyNCA4MHptMFxyXG4gICAgICAgICAgICAgICAgICAzNTJjMCAzOS44IDMyLjIgNzIgNzIgNzJzNzItMzIuMlxyXG4gICAgICAgICAgICAgICAgICA3Mi03Mi0zMi4yLTcyLTcyLTcyLTcyIDMyLjItNzIgNzJ6XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvcGF0aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibXQtNCB0ZXh0LWdyYXktNjAwXCI+TW9udGhseSBlYXJuaW5nczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtdC0xIHRleHQtM3hsIGZvbnQtc2VtaWJvbGRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCAxLDU3OS4yMFxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtdC04IGZsZXggaXRlbXMtY2VudGVyIHB5LTQgcHgtMyB0ZXh0LXdoaXRlIHJvdW5kZWQtbGdcclxuICAgICAgICAgIGJnLWdyZWVuLTQwMCBzaGFkb3cgZm9jdXM6b3V0bGluZS1ub25lXCJcclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiA8IS0tIEFjdGlvbiAtLT4gKi99XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3ZnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLTUgdy01IGZpbGwtY3VycmVudCBtci0yIG1sLTNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTkgMTNoLTZ2NmgtMnYtNkg1di0yaDZWNWgydjZoNnYyelwiPjwvcGF0aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5CaWxsIHlvdXIgU3R1ZGVudHM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMTIgZmxleCBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIDwhLS0gUGF5bWVudHMgLS0+ICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5QYXltZW50czwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJtbC0yIGZvY3VzOm91dGxpbmUtbm9uZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN2Z1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtNSB3LTUgZmlsbC1jdXJyZW50XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI1NiA1MTJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNMjI0LjMgMjczbC0xMzYgMTM2Yy05LjQgOS40LTI0LjYgOS40LTMzLjlcclxuICAgICAgICAgICAgICAgIDBsLTIyLjYtMjIuNmMtOS40LTkuNC05LjQtMjQuNlxyXG4gICAgICAgICAgICAgICAgMC0zMy45bDk2LjQtOTYuNC05Ni40LTk2LjRjLTkuNC05LjQtOS40LTI0LjYgMC0zMy45TDU0LjNcclxuICAgICAgICAgICAgICAgIDEwM2M5LjQtOS40IDI0LjYtOS40IDMzLjkgMGwxMzYgMTM2YzkuNSA5LjQgOS41IDI0LjYuMVxyXG4gICAgICAgICAgICAgICAgMzR6XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC9wYXRoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBocmVmPVwiL1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm10LTggcC00IGZsZXgganVzdGlmeS1iZXR3ZWVuIGJnLWdyYXktMzAwIHJvdW5kZWQtbGdcclxuICAgICAgICAgIGZvbnQtc2VtaWJvbGQgY2FwaXRhbGl6ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogPCEtLSBsaW5rIC0tPiAqL31cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtMTAgdy0xMCByb3VuZGVkLWZ1bGwgb2JqZWN0LWNvdmVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vY1gweHd2SktDTklGcmwyd0l3b1lpSVVSeG1adDF5N3RGM3dKdnlucWNuUUc1dG1ZZEtCTHBERHZoWHptVlp6cnN0QUVrdz1zMTUxXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9XCJ2ZWxkb3JhIHByb2ZpbGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWwtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnZlbGRvcmE8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktNjAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2xpc2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4kIDI1PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj1cIi9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtdC0yIHAtNCBmbGV4IGp1c3RpZnktYmV0d2VlbiBiZy1ncmF5LTMwMCByb3VuZGVkLWxnXHJcbiAgICAgICAgICBmb250LXNlbWlib2xkIGNhcGl0YWxpemVcIlxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtMTAgdy0xMCByb3VuZGVkLWZ1bGwgb2JqZWN0LWNvdmVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCJodHRwczovL2VuY3J5cHRlZC10Ym4wLmdzdGF0aWMuY29tL2ltYWdlcz9xPXRibjpBTmQ5R2NSMVJaNXNLTHRGRy1RMnhmWGxMYTVEYkZzbUY1MkdjLUM0OUI0czYzQ3RTeExrelFZJnNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cImFjY2VsZXJhdG9yIHByb2ZpbGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWwtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPmFjY2VsZXJhdG9yPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTYwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmdsaXNoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JCAyNTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2E+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCIvXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibXQtMiBwLTQgZmxleCBqdXN0aWZ5LWJldHdlZW4gYmctZ3JheS0zMDAgcm91bmRlZC1sZ1xyXG4gICAgICAgICAgZm9udC1zZW1pYm9sZCBjYXBpdGFsaXplXCJcclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiA8IS0tIGxpbmsgLS0+ICovfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC0xMCB3LTEwIHJvdW5kZWQtZnVsbCBvYmplY3QtY292ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz1cImRhdGE6aW1hZ2UvanBlZztiYXNlNjQsLzlqLzRBQVFTa1pKUmdBQkFRQUFBUUFCQUFELzJ3Q0VBQWtHQnhNUEVoVVFFaElWRlJVV0Z4Y1ZGeFVZRnhjWUZ4Z1ZHQmNXR0JjWEdCY2FIU2doR0JvbEh4Z1lJVEVpSmlrckxpNHVHQjh6T0RNdE55Z3RMaXNCQ2dvS0RnME9GUkFRRlNzZEhpQXJOeXN0TGlzckxTMHVMUzRyS3pJdExTMHRLelV0TFMwdE55c3JLeTB2TFM4dExTMHJMUzB0TFNzckxTMHRLeTB0TGYvQUFCRUlBT2dBMmdNQklnQUNFUUVERVFIL3hBQWNBQUFCQlFFQkFRQUFBQUFBQUFBQUFBQURBZ1FGQmdjQkFBai94QUEvRUFBQ0FRTUNCUU1DQlFJREJRa0JBUUFCQWdNQUJCRVNJUVVHRXpGQklsRmhNbkVIRkNOQ2dWS1JNNkd4RldMUjRmQVdKRU5qY29LU29zSHhGLy9FQUJvQkFRRUJBUUVCQVFBQUFBQUFBQUFBQUFFQUFnTUVCZ1gveEFBcEVRQUNBZ0VFQVFNREJRRUFBQUFBQUFBQUFRSVJBd1FTSVRGUlFXRnhCU0tCRXhSQ29iRXkvOW9BREFNQkFBSVJBeEVBUHdDNUpGVGhJcVZIR0tPaUN1aDUwaEtSMFZFcGFJS0tFRkZtcUJpT2lDT2lLbEVDVldLUUlSMHNKUkFsTEMwRFFIUlhRbEdDMTBMVVZBZEZlMFVmVFh0RlJVQTBWd3gwNDZmd2E1cHFLaHNZNlNZNmNsYVNVcUtocVk2UTBkT2l0SkswaFF5YU9oTkhUMWtGRFpCVFlORENTS203eFZJc2dvTWlDb0tJdVNLbTBrZnpVcExHS2F5UmlrQmhqNXIyUG1peUlLRnRVQjcrYTdqNXBPMWQycUl0Q0xSMFd1b2xGVkt5MmJTT0t0RlZhNnEwUlZvTjBjQzBvTFM4WXBZRlJVSUMwb0NsaGFVQlVOQXdLNkZwYmJBazlnQ2Y0SGV1UnVHVU91NEl5UG5iTlEwUW5OZk1sdnd5QXp6dDNCMFJnK3FSaDNWUi9iSjhDc1A1aC9GQzd1V0poa2VHTE9vanZ2c3dUSUIzeUdHY1l3Mk1ZRk0rYytZSk9LM3JHV1o0YmRXZFkxT1FzYUxrTVNGSjFPU3VENzZoVlJXWFRESkdleFpNZWtaT2t2NS9hUFVkaDN5UGFncUoyUG1lNHlrc005ekZNVzFPeXlzd2xWTUVPNmxzTXkrb2FkT25TQU8xYVJ5SitMclR5cGFYNklqTVN2NWtIUW9id0pFOFpJSTFBOXl1M21zWC9NRGZPY2s5eGdINmNaSHQ1eVBuNG9jYys0TGIrL3lENzQ3NzFFZlpCRmNLMW1INE04N1NYU2Zrcm52R3Y2VXBPN0lNS0VmT2Q5bXcyZDhFZU45VEsxV0FBclNDdE9TdElLMGhRMkswTmxwMHkwTmxxQm9hT3RCZGFlTWxCWktRYUdUclRXVktrWFNtOGtkSmxvakpVK0thU0o4VktTUjAwbGpwTXNZblB0WGFWSWxKeDgxRVhSRW95clhsV2lvS3dka2p5clMxV29IaWJTMjlqY05jM0lCSFVJblNNZ3BFU0F2b0dmV0FTTnMrS1Z5aGFTUnE3Zm1IbXQzS20zV1JXRWthS0FtbGl3Qk9kT2QvajNxRW53S1o4WDR4QlpxclR1RUR1c2ErU3pNY0FBZWFmcnYySU5RMTUwYnBuZ3VFZ21pYkt4cG5VN3Vvekl1RDlKSGJhZ2liMDBEaUYybHZHMDBtUWlEVTJGTEhBOWxYY240Rk5PRzNaa0NZVlZVTHBYOVFFYXdjR1BBN2xRUDcwQ2Zpazd2TEhEQ1ZWRWJFOG15ZFZUOUlYdXk0enZVSVNLNWE0bWREQ3l4TEdqUno2aXBMU2c2bENuc1FNYjc3bnhUdWE4VU4wOVFES0F6YWdTQ3B5b0dyc0NUajMrMjlRMXp4aU81aVltSVNRTDZwSFo5QS9UWFVXUmZxT0hBSDlqV1Uvd0RiMjl2bXRBNkxIQkpld2pxaklhUUxPcENEZlpWR0FRYzU3MUVRSE9uQ0dTOW5qQ3BxWlNXWDlvMXNDR1FmdFhidi9OUm5IZVVwN2RmU2hjS29rbUtveXJHY0tHUWx2cUlKOGU5YlZZOHNOY3JkWE10djBaWkZsUTUwa3N3WU1qakJPRkJHQU8rQnYzb2wzZWd4aTN1SXlBUUhiVUNRVGtuT00rcmVsS3pEYlI4MWFja0FBNS8vQUR4U2tpOVdNNDhaUHVSa1ovbXRRdVB3OEdyU05zYWNzZ3dHQkdvYjUyYmNaUGlvbm5ybGlPM2pWNHdGV09GZFo3Nm1lYnZuM0d2R1QzQU5GRHVUQmZoNmhkYnlQUVpNeEl1bGRKWS9yUlpSUVNBMlZ5Y1pHNmpCQjNyVlB3cjR4ZHNrY1YzSVpZNWtMMjd1RDFjS3h5cnQrOGFERytyL0FIanVjSERIOEd1REtndUxpUkFHRHBBTnNlcUlFVE12dW10OEEvN3RXeVhsNk8yYVdkWk1JWkluamkwK2lCeEpxSmowNzRkcEhMRHNkZnRVSlp5S1NSVEhnbkVWbVJ3V3kwTXJXN3NjQU02YWNrYitjamIzelVpTnpqZkl4L25tb2FCRmFHeTA0SW9aRklVTm1XaE90T21GQ1lWQTBOSFFVQjFGUFhGQWNVbVdoaElncHBLZ3FTa1dtc3EvRkpsb2k1VUZOOUFxUWxYNG9HbjRwQXVpTFJWRklPd3p2L0F6NXgycnNNTExyOVpZbG1aZFdNS01EQ0RIN1FSOTl6V0Rza011SlEzRHpRQ01SRzN5L3dDWURqSkkyTWVnZStjLzNGTHZaZFlNVVVuVGNQSGwvQUJaaVFwT3pIQ3NDUEh4VHR5UkdHa3lDb1YyQ1pPNjRKQytTdWRzZVJVR3BFUWthUjBCRHlOcFVFb1kwWm1Pb0FiTU9vZFJIMWJVRFF5NFl1bTd1WkxkNWpGcUJNSUNDSjVzWmRVWmpuVWM2ajRJcVk0bFp4S3JORVVpY0ZwV2RTTlEyR3M0R1R1QnZnVXk1cDRmTitWMWNQU05aWTFKaTlPZFNhTk9sVGthV0tuQUpxaWZodEhMYWNRRWJXczBZZTFEU3ZjTVhZbFNjc3B5UUZKUGI0K2FpTGx6UnhXMnRJTGZpanc2MGpJSUpHbVJlcDZkUVE0R3JmSjg3MUYvL3dDbE9GZWMyc2sxdHI5TWtTN29oSGFSRzlRYlBuRlJuNG1jZnR3NjhNdUN3aWswemRZblZvYldDb3hqNk5pUHRVcHhLL2dnaGlMU0JsMGgwbGpiUXI2VndNZ2JFWXFCczV4M2pYREpJMGVVZFFTNnJYcUw5Y1pLaG1ESE8rMkRqNEZZelBhSmNYc0hEN0ZtQ3BJRVNhUTRZbk9veUZleTRBMkhuRk4rWWVNTk16eHN4aWoxR1JZd3VNc1RrRWp3Zm1xMmtwREJ3U0NDQ0Q1Qkc0T2FoUjlLWHJTWFZnWVlwNDlwNTQ1VzZiZW9LN0ZUNkdHZ2thVDhocXFGbHpMSkZjcll6RjdxMlBwYzlPVm1nSTdGSk1hblU0M3puR3J2dFdjMmZNbHhEdkJLMFIyTGhUa013QUdzZzdaK2U5SDRyenZ4Q2NhWkxsZ3ZmMEJVOS8zQWF2UHZVRkd3M1BOL0RySVEyN0tieWNnWVZDR3hqSXdTNUFEYll3ZDlxUEgwT05MZDJseGFHRHBpT1ZXVjhuWldLTmdEQjlUT3UyUVNqRHhXTWN2OVI1bHU1SSt1d1paY2tsVGxNNE9vRGJmSDMwMWZySG5pZm9TeXp4aFVWNFp6SnFPb2lHUkdndDBVQVlEdEhnL0RPY2Q2ZVE0WEJhK0I4ZHQ0WXVnWkZZMjdtenVIUkdDaEFXS09DU1NvVWx4cVAxTXJuMnFYdnVMdmI2Y3RyOWY1WWdZWWw5YW1HUWU3YVhSbUh0cXhuRllUSGV2RWdkbmNOZDI4cXlTRElBdWhjeVRKa2pac2dSNUh0SWRxbmVFY3dDWmhFL29acG9tRTR6OWFJc2lNOGZiSTA2QzR3ZEp4NEZBbHgvQ0hpWW50YnFXNEgvZGxsUndYd1FIVUY1SjNQOVJjQmo3RWoyclJ1SVJMZHh2R2tyS1ZaY2xTVnljQndNOXlweU00ck52d2Z2N2VQaHNsdjFrSkZ4S0R1b0pRcUNyQkdPK29JY0NycFpYeXhtVzJhNDBTYUlwc2xQMUFoVDFNMjVESEtNRHA3ZHFoTEZFRzBycklMWUdvZ1lCYkcrQjRHZDY2UlNvM0RBTXB5R0FZSDNCM0JyeEZSQVdXaHN0T0NLRXdwQWJPdEJkYWRNS0M0cU10RFIxcHRJdFBYV20waTBveTBNSmtwdnBOUFpVRk50RmFNbHJXUTY5R2hzYVMzVTIwNnRXblQ3NnNIUHRpbkFJemp5YzQvai8raXVLS0U5N0dzblJMcUpDalNhQ2QrbXBBTG4yWEpBeWNaL2l1WjNRRXBPa1AxSzBvM1lxdXplNFJTZGpqR01uR2FZc2s3b3pGQ2NZZFZaZ2cxUmdFYWxRWklja2tqeHBBM29WenhDVlorcnIweEtvSFRiVG9ZR1RCZFpBUUdjb0FRR08ycnpuYXI4MzgzYW1pU0dhR0NZc29WQzRkNUZrMlByUWxZc1lJejZqMjdWQVhYaVUydFFyS3lSNm95WDNYMGtaR0NEa0FFQUhPMjlSdk0zR3Z5c3FPU3BoYk1UdCs2S1JobUlnNHhoaU1ZUGtpcTFjOHp3UktiVW5Tb2Rrbmlaa2xWaXhKSWFUSWJPNEhzTVZuMHZPc2x2cmhKRnhhaFpvVWoxYkZ0WkVja3JkMllBRGZ6VVNka256SmMyMzU2SzhicFNMSkN3MHpqOUpKVU9EdU1qSVBnZGo5NnBISEwxcEdEbHNxZjFBaCtnSHl1Z2JBZkZkaDRkZWNSUlgzNmVva00vb2pEdGpJVGJjc2ZiTzlSTTFnVlZpWEFkWDBHSGN1TWJGbThBVkZSSVhNaGx6R3lnT1ZYVG9JMGxtd29EazdaUHZtb1kyNEFmVTJHVTRBeG5VZDg3anRqSGY1cGNTeStxTmMrb1pZQWc1QThuN1ovd0E2YWtaT01IN2Y4dmVvMGRpTzlPNVl6ak9EOGZlbTcyN0kyZy9WM3dEbjU4Vk1jTHZvWTVJaXhjcWNheW85U25Pb0ZNN01Rd1U3KzFTQTNIaFhLMFZyYXd4c0FOTUN0SzNiMUVCaVNmQXlUV0w4Njh3aTVmb3c3VzhiWlgvekczSFVQOEhDandQdWFrdnhBL0VDYmlQNkM2NDRsMllIQ3ZLd0dBWkFvQXdCbkNqYmMrOVZ6bDdocjNFbWxGeVJ1TWtLTlFERURKMndQcVB3S3JCUnJrbGVFVHlvSTRnY2hTK3FNalVyQ1VvcFRRZStTcFU0OHI4bXI1d3o4UFhrVXVZblFTUnVTa1drc0N6RmZRMG4wZWtMc2V3WnNkcXZkbHk3YWFvTVcrOE1rS0k2cUFDRVFUQWdsc3lJRHZxM09wMitha3p6REJHNzlhNmk2Y2tqSkVvUWhoMHNMUEc1M3kydHNZd0R1TzlSZG56cmY4QWUzZ1lneHlHUGVRamNvak8wZXBQZkRJQVNPMm9lTW1yWnluekZIWkxMY1NLWjd4UW9qMEt6NkZNZURrOSttQnV3TzJvNXJWLyt6QVM0amlTenRmeWVtVHNtSkl5NjdycHhnb3pBWng4YlZobk4zQUc0ZnhWb05UMjhjc2dNVW1kUTZUN2JFWXlxazQwbnNBTSs5UW4wRnkzekF0L0Vrc1NGUTZncVRqQjdnZ1kzMngvbUtta2tWdDFJWUFrWkJCd1IzRzNtc0R2ZVdlS2N0bGJxMm5XNGgyWFlIOXdQL2hra1l4akJCN250V3NmaHh4T083c2xtUkkwTE16T3FBQWEyT1dZZ2VTVG1vaXlFVU5oUm1GRElxQUF3b1RpbkRDZ3NLU1kyY1Uya0ZQSEZONUJTakxHVW9vR0tkeUNoWXBNRmtEak9DUVBJMzN3TzUvamYvS3FEeG5tS0NXY3dQUGNSVHdCWkkraEhyYWZxaDlsUlk4eUpHR0tFSGJPY2pVTnJieDVwQkN6SXhqS3R0aVByNjF3Q3dNWUdvL3VPRndTVkh2ZzVEelJ6S3Q3ZEdGYnVhS0FLNVFvMmhYWWhuWW1Sa0pMTm5BVENnZHZPYXdkaHZ4MUk1SlpvNWxsQ1NoWllvWlpaSVpFa1AxUzlOMEFiSkI5T01aOFlxalhOekxidVlScFdOWHdkaHBEWk9KQ1VKMHRodkI3RGJOV1pPRWduTVQ4U3d3M0QyNW4xTDdCa0czYnZqRy84MVhlWjVvam9UOVZXUU1rZ2ZJY0hJS3FVYnQ1OEErL2lvQ2Nma0tFU3VyM2ZVYkN1STdkR2xkd3dCMUxnczNuSjFBVkxKeWxEYllNZHFXSUs1ZTdsVUVlK0lJeWUzZmNBMVZPRWM4MzFzaTI4ZHlCRXE2VkRJR1VMN0VZcVlUajhzNHdYc0hidWNOSkVjLzhBeFVacVJPL1FzUzhNbnVmMWVtODhTK29na1FRbFZPY3FwYkw2UVA2cXpubU9JeFhMc0NYWFVNYjc2V3lWQXh2amZIOFZwSExQRXJzbzhBanRWVlkzZU5ua1dZb0hiVEkwZlQxRTR6dXBJNzFVSW1pTG1DNEIwc2Vpcm9jTkhJckhwT003RmM0QkhzUWZGVEJjTXEzVUlEQUtkWmJKSityU1AyL0h2ODFJY0w0YjFOTXBiUm5WaDJCMElSMmxiQXlFenRuM3B2YjhNZHBSRVJseXpCZ2MrRGdrYlpCOGozcldPVHVXcDFRRU1XYndRR3pvT1FNNmV3K0R0dFVrTGRFQmJjaUpMRUpWRGlYQll0R3dlQ1U5bUNTajZOUXo2WEFJSjlxcVBIZVc1N1VFcUdlSE9rUHB3UVI2dExyM1Zodi9BR3JZcjNsZ1c1RWtjeTJjbVBVNGtTSlh6MzF4RTZUazl6Z0g1cXQ4YzVqQ1J5SVdGMTFVWkJKRkdWUnBqbEZ3emo5WEJ5Q0ZIY0RmSkZOR2JabDl2RW9iWEpwa0p3eFFsaGtNbXJKWmQrNXh0NXhWdzVINEl6WHRyYlN4T3NaSVk2a2NDWWtLWk5MQWJxQXkrb2JZVWJqVm1vbmsvbHVXK2xtRWZTVHB4ZzVsTEJRVElzUXlBcGJIY2s0d01EVmdWOURjZ1d6Slp3bVZBc3BqUXlFc3Jra0lzWFVCRE1vUmtoVEdrNFBmQTdVRzJoencrQmJaSkpKV2taSVdlWkdrR3NxZ1YxSWl4bGlBdVFOdnBaZTVKcHBhOE90ZUl6SmRHRmgwR0VrRWl5TUkzTWgxNjlBd0cxS0ViT0RrTU44Z2dNT1hPYTdKN3Y4QUtRQ2R6UExkc0xpVFUwYnlJVlo0NFhKSU1lQWNCY0FCRjI5V2F1bHBiQ0pCR0N6QURHWFl1MzNMTnVUOS9hb2tpdGxyaGI0cGJITUlrVTNLU0poY1NJZjFJcGU1STBBRlBkaDRxSi9Fdmw2UGpsb3h0U3NrOXRJUXVrcU5SQUhVaDFuYmNFZWNhZ01uYXJzUTBqUnlSeWVnRnRhNEJERFNRTjhaeUcrZmVpV2RsSERxNmFCTmJGMndNWmM0QkorVGlnU3I4UDVkbXVPRjI5cGVNVm1RUk14QkRIVkU0ZFFUMlAwZ0dtSEtuQ1p1SGNTdVlBamZscmd0Y1JzRkpRTVQ2MFp2MnNDY2dIdm5idFYvcExOZ2dlOVFDU0tRUlJEU0RTUUpoUVhGSGFoUFNERzdpbTdyVHA2QkpVWlkwa1dnNmFjU1VHdEdHU2NpVFROY1FsZWttaFJET3JnbGk2TUdPa0FORzZONXpnaGhqZk9NTTV5NEd5M3BXTlZDVE1peDI2eU1KWTNaUkdOY0dvTmxYeXczSVlPTVpIMC9RcTFuL1BQSU1YRUpaTG1aNUl1bkVzY1JqMVMrbFE3Nm5pRVpKSWR5dWhHenBBSUtuYXNIWXhPMzRRaU8wVTE0WVRHeFY5UndScE9rZ0JkUkJ6dHA5eFVqeGptSzNrMHBDYmlkSTFLOWE0OVpZbkg3UmdCUmpBWDV5ZmF2Y2U0ZEpZWEg1aUQ4dkN4MUtpcElicEE2Z0tRMGtpRmRjcFZwRXlkUUd4MGtVMnZ1YTRMb2szMWpxbVAxeXhTQ056dGpVVmRHdzNuR2NmRlNCcXlJdTd1S1ppemhkV25UaFZFUitDTWVrbng2aDJwL3lueUhlY1NJYUdJOURWaHBqcEM5OE5wMUVCeVBZVXV3YTJtQVNOR1U2c2FBWUZjakJQOEFpTW0rK081NytQSWVjajg2emNFdUpTNlBJamc2NGl4R1pmMnVjZ2dISGNnZHNiMU1rL1F0amNreWNCZUtScCt2RzhtaVFDSlkvUklORzdGeVNNNldLamJBSk5WdmovRXpiM1JtaUtaS0ZKUDAxWmM0MHNQVWU1QVUrNDhFMCtIRlg0cEJQZDNUR1J0TXBVZm0xVmJkOGhZVml0UXdiTGYxRU1EanR2Vlg0bGRvNmVvYVdKRGpBWWpVQnBrUUVIR3hHY2tlZTlTWlBzTHpUYXpDT08rVW9JSjJPQkc3TUVtUUJXVWhsVmxPMjJjL2VtVUhFYnVRQkRjUG9IZ3lnREdkOXNqT1BiTldEa1J4ZEpjY0pZNEZ3T3JCa2FnTHFFWkhwL2RxVWVUajAvTlUrYStkU1VhT0VGV0lQNlVZT1JzUmtMVVBaYmJlNXNVVS9tWjJjaFIyQ1NQbnlzUy80Y1pPM3JiV1JqYkcrWk5ZYjNpU1EvbExTYU1QcVRxeU93VUlWWUtGZGlYWUZBU3pqYkEwcUZBT2MvdCtMeXh0cmpaVllmdUNMcUgyYlRrZnhUK3k0cWJpYi92MXhPNmtEMTYzY0tRd0k2aTVER0k3ZzZTR0djakpHbGl5TGx5VndhN2g0aVZnbnRYbWtzNUhJMXQwdEVrZ2pWTW9wWUhkSkFNRFlEeHZWay9EeTd1N2ZpY3RyZXgvck5haEZpR25waEZrVG9yR0U5Q1FoWGtPdzlJVStkcWxlVitEY080Vm5pSDVZajB1L3dDYTZnbVdOV1hVeUlCSVNCb0lLTUF6RkdJSlBkcUp4SG5IcVNEaWM2TTBWemVOR0llbkhockszakNrT01ldGgxMVlLV01iTWphaHNLU05ENVpoc1E3OFl0eklOSVpQeXNaaGFGU2RFVHRiTHBVa08wUUlZRUZzSElCT21yVmFwMEpMdTZOMjl3akVNTGRlbTNUS29CcFFEY3MyblliWjg1TzlmT2R2em8xbkxQTFlEb2RaQkRxMEtDSTAwL3FpTWVsSm5JSklYQ0xxT1BEQjNGenc5c0psaG1hVldhTjE2N1NHUjVNeHYxeTBlTU9ySXAwTXhBR3BjdjNJUjlFeDNWc1orcCtZR3Rna0FqTXVGRE92VlZWanpqcU1wQnlOeUZIdFRteFF4RlVNaUFZSVdNZHpnazZnekVzM3A3OTk4bXNLNE56NEM4TVp1SGhYVkdKSkU2Z3lOUWtkaVptMERVY2hpUnNNZ0RCM3NjSFBON2RjVGFLTkxZckVrM1FDNWFPU1RwakdaMlZXWWJOc2dYYityQU5ORlpzTHVBTWtnRDNPMWRhcW55N3pwYTNrSzZiaTNFekl6bVBxbVRUZ24xTnFDc0Y4NFlLUUNPMVdUcGxndXBqa2FXSlVrQWtkeGoraysyYUNGZE02dFdvNHhqVHRwem5PZTJjK085SVNZTVdBSnlwd2RqMy9BSjcvQUhGSE5JTktJR1JRMm9yVUpxZ1lGNmJ2VGg2QkpTWlkya29POUhrRkJ4V2pMTEZuSHg1cjBNeXVOU01yREpYSUlZWlVsV0dSNUJCQkhnZ2lnWDltbHhGSkJJQ1VsUjQzQUpHVmRTckRJK0NSbW8zbGJnMzVTQm9qRkJGcWtkdE5zcklnWFpFSkpZa3lGRlVsdHQvN25CMUlIaXZCVnQyVHBLdlJsWjRaYk9PQ01JN3l4alNrODBTWmloVFQ5V2htOVo3NUFxcmkwNE02bU1laDliTCtUbU1jVFB2clYwRW8xSnFWaG9ZbEM2NEIzTld2aTFqTzk3TkhGYjNVS1N4eVArWWdsaVVUemlKRVF5UHUwSVFEU2dPeFlrNmNEZXU4UjVmbm00ZUpKN1dLNXVFaGFNbHhxdVN3ZGdpa2pVeXVvWXY2SDlaMk9NNW9OUlhLS1BCeS9ESXpyRmJ4NFhxUGh6dUVWajNMSE93eHRrK2Fidnd5QWdFaU5RcHlGMGtoODdhUUIzUG5KSUE5NmtiZTRFV29zRlpkSkRMSVBUdDVaZjJsZmpjRVZFY1hrQUViTXloTmUwWk9aMks5anBHUnBMZGoyL3Z0NHNhbExtL05uMWVzeTZmQmVKNDEwdHZIZm5rYjhYNEFHWHFRS2dZRlZaRnlHSUordGZjQTdHaThVdFloMDA2YUZuZGNuQnlWR05SL250VWxMSHFaVzlzbjJ6a2JBNUIyL3dDRkFoWVRTTVRnR0hTOGJBN3lSc0NzaWc1d1FEaHNkOC9GVUp1U1hQUTZqVFk4TTVQYXJ5U1NTcnBlclJCOGNYOG5jUlR3cUYwc3JyZ2VrT2pBakkvaXBEbkZGbFNTNTZDaDNjT3hWVDZkWDIyQXpUcmkwWlpCalRxRGpHUm5ZN0VZN1VMamQzb01hQWs2MjljWXpsbDdad3AzWWJrWjg0cGhrY2xIbjVNYXJSd3d2VXkyOE90dkhud0RGamJ4UXEwa1NiS3VwdEpZNUs5OENtL0dPRlFQQVpvMUM0WFdDdVFHWElIMG5zY240L21qYzJFZEFLVGtseDVCSndENDgvZnRUem03aUJtaW1uWUJHbVlOb3prZ3NRU29KQUp4dDRvVGZFcjdaMHpMSFdYRTRLb3dYTmMyTnJlVS9rQ0N6RkRDUVYxSFMyZ3QwOGp6cGRpd0I3RXRnRE9LVllNazFwYjlSTXBCRklnRGtNditOTE5LNmdBWXpxVWUvb3hrNW9GOStsWTZUczNUUmNIWTVKQkl4Nzl6WGgrbFlZT3g2UkdEM3pJeDIrK0RuSHdhdDBtbnoyekN3NDQ1SVhGZlpqdDhlcjhoN0sydGJnRXBFaEdRcE9ncWQ5OXQ2cVZoWmlXNEVRK25Yai8yZy84QUNwSGcvRkh0VTZaaUdkV3JMTm83Z0FaSHQzL3ZUbmxPend6ekVnZ0FxR0djWlAxYjlqZ1YwcVdOU1o0bmt3NjJlQ01VdDM4cVZJUHpIYXBER3NrU0tqQ1FZSUE3WWIzNzFKOEo0a2poMGlZK3VNSkw2Y0JrUGRTV3pzV0oyR081cHB6R3dhMjFIM1ZnTTQ4bkgzMjNwdnljbzBPK25TQ1FNNU9EamMxenR2RmJiczk3akNIMUZRakJiWkwxWHBRNS93QnBRMmNuNkFXTzRVNlZLb2RpMjIrY2hsd2V4eVBpcHU0NC9MYktNM002TGtmUzVBMURmc0RnQWI3REEzN1ZSVmRwYnNxQ1dYcUU3Wkl3RDN3TnZIZXBubXlKNUFpb2hiQlpqZ0UweVZPTWJmSnh4WnJobnpySEZ1THBLalVQdzQ1eWttbGVPU1F6UmhlbzA3M0F6SG5DckdJY2VySjdHdE5zcnFLUU1JblE2RzBPcXNyYUg3NldDazZXM3pqNXI1QnN1TjNGdTJxR1o0MjBsY29kT3pmVmpIYk9PNDNxMmNtYzZUMmlFcXlraHd6dTJwbTBZeHFDbHNFOWxZZ1owandkNjljVlNvK2N6WkhrbTV0VWZTK3JQdjU3Z2p6MysxRGFxN3lWemhGeEtKUnFVVDZjeVJoV1ZjalpqRXpiT0J0MkpJeU00TldKcTJjUUwwQjZjTlRlUTFHV041S0JnVWVRMEhOYU1zc1FOTEZEQnBUTGtZUCtwSCtsWU9wRDN3anNsdUxwNXBnSkNtZFJlWkl1eURweEQ2VnlRelk5eVNjZG1iWEVIRDNjeUowbm0vVWx1c0JZeXdKVkEwamRteGowNFBmelU0YnBPdDBmVnJNWmY2VzBGQXdVNGJHbkkxRGJ2ZzFSZnhhdW02Y0VSUWdHVFhxeXVDVkRlbnZuT04rMlBuTlluTGJGczlPa3dmcjVvWTdxMlVYbU84aG52TGpwYUNoZnNwQkRxVVVtUUwrM0p5Q2ZKMzk2enJpRmowcG53MmRMcGdFK3JTY1lQdWNkcXRWdGF1SjVaRzdNRkNIT2R0c2o0ODFIM0hDMmtacmxIK3FZUmxBZFJ5akQ2bFU3REFKOVF4N2IxNThUKzV0ZFZaKzU5UXh1T254Um12dVVxVDlrU1hGNVdXSnRDbG5ZQlFCdnVRTTl2aWg4REtHTlJvWVNBN3NSaGNIR3BVdzIvcTM3VjNqYzZ4b0dhVjR4ckgrR0NYWVozMG5ZREhmQkkvbWkybkVCY0I1RTZtZ0ZnaGswYXZweVNRZ0FCejkvdldFa3NMcjFQVGtrNS9VNFJmVUkvd0IwR2hiVW9ZanZuSDhFak5RMCtXNGhIL3VKbi82bmYrNXIzTE4wcm1WQUN1K3RRVzFIQjJPK0I1My9BSnJsa05WOUsvZ0syUDdnVmxSMk9Yc2p0a3ovQUxyRnA2N2NsZjRGOFlrWVR3QmM0Y2RKOHFwR2t1Q1FNZzc0d2M5NjV6S09vOEVYOVVtVC9MS3YrZ3A5K1dMVHM3TDZWME1qWi9jRjBzUHNRUWZqVDgwd3Z5SHZZRS9vWEorRHUzL0N0UmYvQUQ3STVaWVMyNW5OVitwa1NYd2hQTjcvQU9FdU4yZGpnNytWQSsvbWxjNlNhWWxWY2pNaEEreXIyKzNxN1VualFMM2RxbnlyZi9jay93Q1Fvdk1sakpjZE1JdVF1b25jZHlSL3dvanhzdjVIVVJsa1dyMnEzYWlWZTQ0VE5HdlVlTWhUamMvNzI0MythdFUwRFJXWWlSU3pGUU1BWjNiMU1mN2JVNTR2Q0pERkVPeGxCLzhBWkdwenY5aUtaY3c4YmVCMVZBTXNOYlpHY1pKd0J2OEFCL3ZXbk41TnZCeGhwTVdpV1dVcE5jS04rdHZzVHpXdi9kVTl3MGY4ZnBrRWY1VVhocEVkbHF4K3gyL3VLN3pDTmRvV1BmRWJmeWNEYis5Y3YvMDdISC9scVA4QTVIL25XVnpCTDNPK1JLT295NUYwc2Y4QXFJamsxUDFtYjJRLzUwOTQxekJKQkkwU2hDTWR6cXlNajRhaGNsSnZJM3dvL3dBNkZ4bmcwMGtza29UMDkrNDdBVjFlMTVYWitmQjVzZjA2THhYYms3cndSL0F1SkxieTlSNFVtUmdVZU54bktOak9rL3NmMllWeS9uZ1dSdnkzVTZiZUpWVU5wOHFkSk9SOGpCTlJ1YUpid001d295ZHovQUc1KzFlaytmZnVUSER1WnJpM1NOSTVHVllwR21UU1NHU1JnQWRKT2NMdDJPeDN5TnpXKy9oeCtJQ2NXVXhPTkZ5aTZtVWZUSXV3THA1RytNcjR6NUZmTll5dmNiRWR2aXB6aDB4Z25qbldZeGxNUDFveUdiVVJrQUxzQWZCQjJ4blBla0Q2cWVnUFVIeU54eVcvdEJQTkdVYlVVMWFkS3lnZitJaW5jQTlzZTRPQ1JVMDlLTXNCSlFhSkpRYTBZWlkxTkxCb1NtazNkMHNNYnl5TnBTTldkbVBZS29KSi9zQ2F3ZEJQRkpKVWlab0l4TElCNlVMYUF4empkc2JZNzlxaXVZZVgxdmdwY2h0Q2tDTEpDZFVnWWJVUFVBQmtmWTFNMmQyazBheXhzR1J3R1ZnZGlwODVyTVB4RjVzbGd2MGlpdVk0a2dUcmFjTTNWbUdkVU1tbnQ2U3BBODZoUTBud3pjWnlnOTBYVDhqVG1mbGhFdDJudDUwREs1aUFpU1NZczRYRHgrY01yZzRQWUR2MnJNekhQd3I5Y1BIUEhNb1dYWm1qTE42d2hieTQzT1IyTmFyWWZqSmJpQzM2eWV1VkhFdWtGVVNVRWJFSHVqWnprWnhWQjRoRGRjY3VBMGNhZE8zVm45UG9nU01NUFFoeHAzMDkvT2F5b3BkSTZaTlJsbTF1azNYUkZYbHJkWFVZbGExSVFZWVAyUlZKODVPZE9OczBLU2Q0Yk1Td3V1T284TXFoUVFya1pVcTI1S2tmdTkrMU5Pb3kzdXBaMkhxR0dJZlZvTzVUUVJxSUc2NHg0cVVMeXdRendHSUcybGZxQ04yQ01XSFowQUJJUHg3WTJwMnFxb3YzR1RkdjNjK1NDczRyaTJSTHRWd2phZ3JiRUhCMGtZKzRwdzF6TGJ5VGRPU055UFVaRkdvTU5zbFQ3RElxWHZ4aU9Jb3VxMmtMT0VZNzlYQVJ3V0E5TGpTQnR0aW85TGxDMnQwUlZHUFNvYkFRRFF3OXljSE9mY1ZiVSswWmpueVFxcFZYS0hNbkc1STJWbXdSa01WQ3FWS0FqVW1jNXo5WHR0amVvYThuZTF1bmRXeVFXSVkrb01HQjM3bk9RZTlTRWpxc1NxVTlVRHNwODVRbkl6L0dCL2VtL01jV1ZTVWZNUkdjN29CcDN6L1FWcVVJcnBHNTZyTk5weW0zWFJIWFhGSkpKRmxaaHFYR0NCakdPMVBmKzFOeDdyLzhSVUptdkNqWkY5bzFIVlpvdHRUYXZ2bnNtRHpCUHJFbVJrQXFQU01BSEdjRDNQYW1ON2R0TzVrZmRqZ2JiZGhnVW1WdzNZQmRndUI1SUFCYmZ0bkdhSkhCcFBxL2o1OEEvYlArbEtpaytFWW5ueVRUVXBOM3orUjdMeE9XU0xvc3loY0w0QTJYY2I5ODdWMjU0dExMSG9Zcm9HTStuK25BR2NmYWt3UTZpUUF6c2R3b0c1OEhiMnhSWHR0T3BUNkYyTEF0Nm5Va0VNUHNhdGlWY0U5VmxkM045VS9nWjJIRnBiY0VKakJPK1FDYVBOekpPeWxTVndSZzRVQTQrOWR1dUdPMFRTaGNkSFNzZ3lDZExmUzRIOUp6MythaTRZOVJ4UTRSdTJqVWRYbWpEYXB0THdDRlhqa25oa1RRU1hVczcyNkxyaFpocE9zRUk0UUFuSlk5dE8yZmVxYkpBUldxZmd6dyt4Y1BjT3ZVdUljbGxsMmlRTWRLRlQ5Sko3ZXJGYU9CSjhHNVhTOWdVVy9DeXAySXVidHRDSnZrZE9OVHFsWGJjSEIzcTgybklWa3ZUYVdDS1NTUGZJUXBIcnpuVm9KT1Q5emo0cTB4VEIxREtRd0k3ZzVIOGZGSmMxb0FiLzhBTDdEMkFvRG1pdWFidWFqRFlHUS9GQnpSSkNhQnFyUmhsalUxNmFGWkVhTndHVmxLc0QySVlFRUgrTTBoV3JzcGJTZEdOV0RwMVp4bnhuSGpPTTFrNm81RkRGYnhCQXFwSEdtQW93RlZGSHQ0R3hyRytaK0lSWDFwYjNjY0JsTWwxcTB1dWt4UjlRTXdRRGRpMkFHTytkUkEyRmFGek8xeEphM0VIUlVNNGpnRDZncXlhd3V0aVNmUkdDenIvVjdWblhNeTIvRElWbktsdUlaWllWeWRNY2ZwQkRSamFOQmtoVTdqUGZVV05Bam5pOXRhUjM2dGMyTWNkdEVXUFVkaUZrREtIYkVIaDFaZ05qazZSdHZRK0ljNXlYdlZoNFlpV2xxSFhxWERnRWs5bEVjZnpnWUhtcW5jeTNkMHlQSW5XdU1LQVJqUkVveGd0bllGdkpKeWNlY1Y3aDhDMlhVNjgydEpsNmNxeERLS2RYZnFiWmRTZFhwN1ZVVmptN3ZBOGtoU1IzTy9XdU5DQm93UHFZc0FGVWsvdEcvMnBuUHcvUTI1R2ZKQjNPZXh6M1B2VGVEaGp5eWZsSkM4aXg0NlVFQzZSTXAzV1JuSjBxdnVXUHVCVGppZkRzUnZLbUhXRndzdlJCYU9CU05rTGsrb2orb0RiTlNZTldTa0hDaTlxNlpCV1gxcHY5RTZIU3pBL3dCTEFZUDJGVnE0NGJLb0RPdUZQcEQrblNXT1Z4Nzc3NE9NVSt0K1lVaVFoa0xKcEthVllLd0I5WGMvNzI1cUZna2tsWm5VTTV3ZGNoWFVGUTR4dWV3SGI3VXN5a091RjJ3dUhhRXNWbTBGTkp4cFpvMExESjc1SVYvNXg3MDI0ZU9yRkpibnloWmRqL2l3Z3NNZkhUTWdQZzZSN0FVMjRieE9SWjBtMlpvbWlZTHNBVWhkV1ZjNC93QjBiOTk2VVpTa29uWEFZT0psSGZEcXhiVHVNZHgvblFiSUlDbGtZKzlQK05RS2t6YWZvYkVpZitpUUIxei9BQWFaaGd2WWZHZnYvd0JHZ1JjYTRPVG4zQUcvWVpQK1dhbDRiVTlhTkVVekZ0THFPMnZKd1FmSUM0WWZ4N1U4NWNpZkNva0xOSzdaeHBPWmJZeHQxVUp3ZEtFckdBUi9XMkt2bkxmTFRJc2NNSVNLYVVBeU9WYVNWSVdPUXBiWlkzMGtrL2JHKzFhU010a1FMTVF3bVpDeXlNaUk4MjJSa0JTc2Z5MkIvQU5OdURjRGplZDQrdDB3cmhZVEloL1ZVRDlTUEhZcXAxZHZQM3F5M3ZMOGw4MXdlcWtjVVg2TVVMZDNFVW9SNW5LL1FTMjIzd1BCcVk0WHl4ZngzRnVKM1VLd2xqMlRLMjBSQWNSeFNyZzZzS28xRWVEUTJDWGtpTEhsUzAxcHBodWd6cEptTWxDcm9wdzhSR2ZRTU5xQTc0RlYvbk94dE9IeUxCYkFra0hxcSs2OUlnQkRsaHFXVElKd05xMkxqRjlKYlNSbVdXMkZzUTZzQ0NydEtXd2lxNTJVNlRnazk4Zk5aRitLUEw3cmZPMXV6T1dWR1dKdDJDQUgvQjhQR1BqdGsxR2luU3daMndTUGZ6L2F0bi9DWkxhOHNlaVlvOEVHR1ZSMmtaU0NTNjR5Q1JnbmZGWVQwRDliNUcvMUR1VDdBKzlhRitFL0doWnpvRzB0MW0wRnl4Q3FNYkQyemtmVWZmRlJHOFFhUWloQUFvR0FvR2tERzJNZUs0NXJva3lBM3VNK0QvbU5qUW5ha3l4RG1tOGhva2pVM2RxVVpZS1EvTk45WHpTNVdGTjlWSmtzNm1tZkVieG9WVEJPVEtmMjZob1VOSXk2c2dSalN1QXpIdVY5Nk9HL21xN3pWZHdSUlNTaHRUTVZ0WFVLWjBHblV4U1NFSGJZRlN3M3hqd0t5ZEVRUFBOK0VobGx1bG1iRUNwanBnUUpNU3pJeWs1L1ZHdEJxM0dVeDVySitHOFNlNWxNanVvMUVLcXR1Y0RJVkN4T2Nlb2trK1NUVmg1cjVwdWJtMGt3NFl1b0V6QWtxWTJZa3BHcE9GR1V5U0IyKzFaN2JXTWpoaW8raFdkdmZBN2o3LzYwR3UwYWR4WGhjcUFSSVVrVTZWeW4wQnprc0pEbkJmWUhXZHNZSGZ2VmVKMmp4ZnBHUXRMOVEwNDZFY1JIcXdEdnFQZythamJIaUVrTzNVWmhqNmNrZ25Pd0krL21pWDkyeEpkWkhZeVlNcGI2dFJ5RHQ0VWJEYWt5aEUzRjdwSVJackppSVp5RitwaDNDczNjZ0RzdmJCcDN5RHhOTGFiVE8yTGE0VnJlVlRrcnBjYk9WN0hTUXUvM3BYRXJSWTdTem1KMHRLcyt0djZoRzZvakFmMWtISDgvRlIzTG5CSmVKWFVjRWFFNTMwNXhpTlNOUno0OGIvTkJvbmVPY0duNFNFWE1MeE0vVlM1akdzeUZmb0RNZGhqdUY5NnJyOFVZNnlTeDE1MWVvalVUNUlYQUgrbGFsRnloT3RoZDhObVJObWVlMUtzWFA2Wkd0QUFBUnVRZTI1WSsxWkpDcEJLc01lRDRLbnQ1K2RqVVE3TnA2ZXV2WUhKMU1OMU9BZEtqZmJPK2ZjZDZXWWd5TzQvYXk3WXg2SEdDd0pQWUZSdDc1cHRIbGhwQXlkMHdCNDc3ZjYvWVU0NFMycjlNOTJ6RWZmMTRDNVB0cUE3bkF6bW9oVDJUejIrdFZKYUJ1aXlxQ3hDeU1Yakp3TzJyV21mY0w3MWNmdy8vQUE0bHVXNjg4V2lOSEFXS1ZDdlU3Nm5aVGhpaUhUa1k5V29ET00xQmNnM3BoNGhiSEpZUExHanhnNDF0cTlDbkp4OVlEZjJyWHVMOHZ0TkhLOXpKTmJwSks4dzBPZ25ndHlzYlhQVVlram9kU05YS29DUVNtK0Rpb1FQK3hvWTNkMGVHZVY1aWpFVGRJNVJPckZFQXVkSUFQcVZkdEl6M2FwYmhOeXFSczh0c0k1TGxJblk2OGFpREpxT2tuVXZTakN1dzc0SUhmYXBybHZnRnBGQmFpRkk1RWlSdWxNUXVyMWxkVGc0M0w0eVNPK0tsTFNDRkdaRkVZY2t5T294bk1od1dJN2pPUDV4VllVaXZweDYxVzhpaWFJTE5MYTlZU3BoazBqTWpydHVjZlVDUnZxMjgxUDJsam9SRk1qdnB5U1NjYXkyU2Rhalk5NnJ5Y2hXOGQrbkVvWGtqbEJZdXBZdXJoODZsdzJkQTNPQXVBS3RGeElWUm1DNmlBU0ZIa2p3UHZVUURpSEQ0cmxlak5HSFRLeWFTUFRxVmdSbjMzQU5WUG1uaDgwL0Q3a1hMUnFWNmpSVFFoZzBjUzVNZVFOeWRzRUxpcEthOHU3bXdTV0tJeFRPTXVtUnJRWklZSnFHQysyeE8yOVIzSExXNm10WUNia1cwd1FySkhMZ3BJempTRmNJZDJ6amNaSGVvclBuczhCbDlDRmxDbUpaeXpOcFNNUG42ajc3ZUtuT0dKYnBIMDVCMVZCeHJYVUR2Mnl2aGZHZmltdkhWTWNwdFZES3NCRWVsamwyZFJ1N2VEbng0eGluM0sxeWlTTkhJTWgxT0FUajFqc2Mwb0dhaCtGdDI1VzRoMUF3SytiZkJCQVRzNnI1d0dIYjVxNnVheWo4TEpHL09Nc2FFeGxTeDBsU0JxeURrRTV4cVU5aHNmdldvdWFqTFltUnFieU1hVzUrYWJTTjgxcEdHQ21ZMDM2bGRsYW0rYVFMU2pVei9BTml4RkdUTGpWSzh3S2tLVWtZNnZRVkhiUGc5OG5PYzBaSG95TldEb21adnpUeVF5dEwwMmpDenhzUUJHd1Zad1FOU2hjNlNjNUlHeExIYkJOWjFaOEJmOHFaR1YxSUdvNnRnQVdLbHNEY2dFRUVIc2ZpdnBCMURqRERJL3dEM0dNNThHczc0OXlCZFlrYTF1Uk5rbGtpdU01Ump1ekxJcHd4OFlaZjVxR2pJSjdjVzVEU0tjdUNWRGR0SGhpUis4WStuYkhtb3k1ZjFzYzdkdDlqakhmNXA3eHVLNWdrTU4zRzhialVkTGpBSnp1d0oyY0VqdU1nMHJsM2w2ZmlNaEVTT3lLVjZqTHBKVU5zQ0FTTlIrQlFLUUNDTXpFWURGRkdGWEpQMzJIYko5aHZXNThpOGpUMmNVanFVUzRkMDB6SExEb1lWaXFBWUlCT3h6VVB5bHlPWW1XWmxaMEExWVZTc2dBUHAxSVNHUnozQ250ZzVyWVlkbEE5Z1BZZjZiVkV1eGFvUElHY1lPQjc5L3dDSytmdnhKNURudDdsNXJlQXZDMlc5R1daZDk4SVdMbnYzQXdCN1Y5QWcxRDgwd3NZUzZ1UjB3N0ZjZWhsME1HRHNBV1ZjZVZxRStXVWlPdlFRUVdCWEJ5Q3JqYkcrNFBZVUFRTXVNZ2dPRGdsU0JrZVFjYjc0TzN2Vmc0emZTWGNrbDFJNk01SWRkR1NOQUFHUDZsd3BIdjU4MDl0N1dPOW1aR0N4bUtHZTVqSUpCa01jWWRZY2JoUmdGc2I3S1FNWnlJaXVjV0xySXM2Qmw2b0VxTnZucUJnSDA1Sk9SS3BIZzdad0FSWDAzeStrUEVFaDRvVUlsbHRqQTR5d1ZmV0ROR1VPd0lrUXFUakp4aXNkNFRCSkVuRG5XM1RxTCtadTQ1VUd1TmhJb01hT3JMa3NqWXlGN0x2M0JyUmVUdVAzWCswSmJLOVlIcVFDNXRTQ21ERXNqeHRzb0c3NEVnQUdjS1NjSFlSRi9VWTJHTnFHSVZEYTlJMVkwbHNibGU0R2ZiTzlkWW4vQUkxNG1vanBha2xxNFdwQk5RSFMxVnJtM2wyUGlHalNVTTBFa2JEMWZ0REJpakFiTHF4akpHM2VwNjR1RmpWcEhJVlZCWm1QWUFkeWFndUtjU0Z6WlhiMjJlb3FPb0JVbyt0UjZUakdjRWJnKzI0cEF4WG42NWhtdjVKREVZWkRqcW84aElNbzIxTGdZSzRBR1J0VU5rS2RTYVJqZmJUZ24yNzFZT0ZPOGlDT2VQTzUvd0FSU3NnTGJuU3plb2Y5YlUyNGx3V1NBdHBqMUlweHJWVUxlNERBYjUzN2lxZ3NsYlM2dEhraW5uVzVsQkFSMGhKalpHTzMvaGtOSXgyd0FmUFk3VnJWblByaVJ5d0pjRmxVcjAzVk0ra0ZDUzJ3MkpKM05mTk4xZDZKTTRiR1JxVTVVLzhBRUg1cTZjbjgvVFdub1RSTkVkekJMNlpGQks1NmNoUHg5UGJKelVhcTBiRkkxTkpYRlJ2RE9hN1M5Vm5nZlJwT0RIS1ZSanVjRkNUK29OdXd5UWRxZFN5VnBISnFnY3JVTFdLODdValZTQlpFYWpxOU1Fa295UFEwS1krVnFLR3BtalVSV29OSmg3aUZKUnBrVlhIc3loaC85aHRRYlBnMXRDUzBWdERHeElKS1JxcEpIWW5BM0kveW9pdlN3OUZHa3cwY2FxV1lLQVdJMUVBZXJBd0N4ODQ3VVVOVGNOU2cxUldIMVVtYU5aRmFOdDFkU3BCN0VFWTNJT2NVZ1BYdFZRMllGenB5ZTFyY3lKQm82ZU05TXpLSkZVK0IxZE90TTcrbkpHZDg0elZjNFpkdFlTeFhnS3M4QkJBamtCeVZiQlJ5UWNLWTlTbkh1dStUaXR5L0ZyZzczdkRaT2tjU1JFU0FaR1dVYk11VGdnblBiTytQTllseTd3aWUrdUJZaU02NU5Ja0l3d2pVYVJMTElBd3hnYUczTzdLRkc3VUVqUytKM1VDM2x2d3hndjVlNjYwMXJjb3hWbFcrV1RDTGdBYWRiRUFBNzVpK1JVbmYvaDBZcHJHV3dkWWhiU3pTT1paSlhmRHRHVmpUdmxBRmRDdVJnT1R1U1RVWCtJZkk5ekpCYm1KNWJ1Uk5VVGpFYTRabGpNYm9qZW1PRVBFb1pTU0FIejdtdE50cEhLSVpCaHlxNndQRGFScUczalZtb2h5VzlxU1dvWmFrbDZRc0lXcEJhaGxxU1dxS3psMUVzaXRISXF1akRES3dCVmg1QkI3ajRxdGN6MnNxd3pOMXlZeGgxUlVWQ3FSakxSYXh0cFliWk9NZTlXSm5GRFo2Z01BbjVoeTVhS1VEVXhPbFd3QXZnYWM5OGJFOXlkNkJKeEdhNUlWRmttZmZBUlhaeUIzSTBlb2dlVDJyYzc3aFZ0Ti9pMnR1L3dENm9ZeWY3NmMwQ3k0VmJXekY3ZTNpaFpocExSb0ZKWDIyL3dEeW1tRm8rYitJeXlLM1RsVmdmNkpGSUkrZlVBUlFySXhoZ1pJMks1R1NwSVB5QVRrWnhYMHhmNlprTVVvRWlFRUZYQVliK1FHQndmbnZXZFgzNFdXcHlZYm1lTEk3T3FTcm5QdU5KeDhZUDNvcG1sTkZONWQ0ckRZWFMzSzIzWENZS3h1QXdYY0VNTUU0Y0VERGR0enRXcjJuNGxjT3ZHMGZrcnJxa0U0aWkxUGdkejZDQ1FNKzFVTzUvREtkU0RIZXhOOHVzcUh0c1BTRzJwTm4rSFZ3Ry9VdW9GSGdvc2toL3N5b1BiL3J2RmFORlNkWlZFa1lsRWJaMGRaUWtucE9HeW5jQUh5UU0xMythaXVYK0Vma29qRDFlb0M3UG5RRXhrS093K0FQUGp4VXB0VzBjbjJTeVNVNFNUNHIxZXFJT3IwVlgrSzlYcXlhQ0s5RVY2OVhxaFFvUFN3OWVyMUFpdGRkMTE2dlZDZExBcXlIc3dJN0J0L0J3ZStLcFBMbjRleFd0d2J5V1ZwSlNUaU5RRWdBMUJsRElSbVFxeWh3U1FBeXFRUFNDTzE2b3JMb1gvNi82RmNMVjZ2VkFjTDBrdlhxOVVRZ3ZTQzllcjFJQTJmNG9iUFhLOVVEQlBKOFUzZVQ0cjFlcEFieVNmRk5uZjRyMWVwQUN6VWhqOFZ5dlZFZS9pbGZ4WEs5VUIvLzJRPT1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cInN5bmRpY2F0ZSBwcm9maWxlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIG1sLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5zeW5kaWNhdGU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktNjAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2xpc2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4kIDI1PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IGZsZXgganVzdGlmeS1jZW50ZXIgY2FwaXRhbGl6ZSB0ZXh0LWJsdWUtNjAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJleHBlbnNlcy1kYXNoYm9hcmQvXCI+c2VlIGFsbDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvYXNpZGU+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICB7LyogPFJlc3RhdXJhbnRTdGVwcGVyIC8+ICovfVxyXG4gICAgICAgIDwvPlxyXG4gICAgKVxyXG59XHJcblxyXG4vLyBUaGlzIGdldHMgY2FsbGVkIG9uIGV2ZXJ5IHJlcXVlc3RcclxuZXhwb3J0IGNvbnN0IGdldFN0YXRpY1Byb3BzID0gYXN5bmMgKGNvbnRleHQpID0+IHtcclxuXHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgY2F0ZWdvcmllcygpO1xyXG4gICAgY29uc29sZS5sb2coJ2RhdGEnLCBkYXRhKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgY2F0ZWdvcmllczogZGF0YS5jYXRlZ29yaWVzQXJyYXlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==