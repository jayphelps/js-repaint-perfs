(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["LazyDOM"] = factory();
	else
		root["LazyDOM"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.render = exports.createElement = undefined;

	var _createElement2 = __webpack_require__(1);

	var _createElement3 = _interopRequireDefault(_createElement2);

	var _render2 = __webpack_require__(5);

	var _render3 = _interopRequireDefault(_render2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.createElement = _createElement3.default;
	exports.render = _render3.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = createElement;

	var _symbols = __webpack_require__(2);

	var _patchNode = __webpack_require__(3);

	var _patchNode2 = _interopRequireDefault(_patchNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	{
	  (function () {
	    var nodeProto = Node.prototype;

	    ['appendChild', 'removeChild'].forEach(function (key) {
	      var nativeMethod = nodeProto[key];

	      nodeProto[key] = function () {
	        for (var _len = arguments.length, elements = Array(_len), _key = 0; _key < _len; _key++) {
	          elements[_key] = arguments[_key];
	        }

	        var nodes = elements.map(function (element) {
	          if (element[_symbols.$$PROPS]) {
	            if (!element[_symbols.$$NODE]) {
	              (0, _patchNode2.default)(null, element, document.createElement('x-temp-container'));
	            }

	            return element[_symbols.$$NODE];
	          }

	          return element;
	        });

	        return nativeMethod.apply(this, nodes);
	      };
	    });
	  })();
	}

	function throwDOMException(methodName, message) {
	  throw new DOMException('Failed to execute \'' + methodName + '\' on \'Node\': ' + message);
	}

	var elementMethodHandlers = {
	  appendChild: function appendChild(childNode) {
	    var node = this[_symbols.$$NODE];
	    if (node) {
	      node.appendChild(childNode);
	    } else {
	      this[_symbols.$$PROPS].children.push(childNode);
	    }

	    return childNode;
	  },
	  removeChild: function removeChild(childNode) {
	    var node = this[_symbols.$$NODE];
	    if (node) {
	      node.removeChild(childNode);
	    } else {
	      var children = this[_symbols.$$PROPS].children;

	      var childIndex = children.indexOf(childNode);

	      if (childIndex === -1) {
	        throwDOMException('removeChild', 'The node to be removed is not a child of this node.');
	      }

	      children.splice(childIndex, 1);
	    }

	    return childNode;
	  }
	};

	var elementProxyHandler = {
	  get: function get(target, key) {
	    // Used to return the actual underlying DOM node,
	    // which is stored on a secret Symbol
	    if (key === _symbols.$$NODE) {
	      return target[_symbols.$$NODE];
	    }

	    // $$PROPS stores the props of the element that were provided or
	    // mutated at some point
	    var props = target[_symbols.$$PROPS];
	    // $$METHODS stores Element method hooks
	    var methods = target[_symbols.$$METHODS];

	    if (key === _symbols.$$PROPS) {
	      return props;
	    }

	    if (key in props) {
	      return props[key];
	    } else if (key in methods) {
	      return methods[key];
	    } else {
	      var node = target[_symbols.$$NODE] || (target[_symbols.$$NODE] = document.createElement(props.tagName));

	      return node[key];
	    }
	  },
	  set: function set(target, key, value) {
	    if (key === _symbols.$$NODE) {
	      target[_symbols.$$NODE] = value;
	    } else {
	      var node = target[_symbols.$$NODE];
	      if (node) {
	        node[key] = value;
	      } else {
	        target[_symbols.$$PROPS][key] = value;
	      }
	    }

	    return true;
	  }
	};

	function createElement(type, props) {
	  for (var _len2 = arguments.length, children = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	    children[_key2 - 2] = arguments[_key2];
	  }

	  var _ref;

	  props = props || {};

	  switch (typeof type === 'undefined' ? 'undefined' : _typeof(type)) {
	    case 'string':
	      // Theoretically we could create a mock HTMLElement with
	      // every property in the spec as a getter/setter
	      // which would have better browser support. Maybe later?
	      return new Proxy((_ref = {}, _defineProperty(_ref, _symbols.$$METHODS, elementMethodHandlers), _defineProperty(_ref, _symbols.$$PROPS, _extends({}, props, {
	        tagName: type.toUpperCase(),
	        children: children
	      })), _ref), elementProxyHandler);

	    case 'function':
	      props.children = children;
	      return type(props);

	    default:
	      throw new Error('createElement called with unknown type: ' + type);
	  }
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var $$NODE = exports.$$NODE = Symbol('$$NODE');
	var $$PROPS = exports.$$PROPS = Symbol('$$PROPS');
	var $$METHODS = exports.$$METHODS = Symbol('$$METHODS');

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = patchNode;

	var _symbols = __webpack_require__(2);

	var _patchChildren = __webpack_require__(4);

	var _patchChildren2 = _interopRequireDefault(_patchChildren);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function patchNode(prevNode, nextElement, parentNode) {
	  if (nextElement === undefined || nextElement === null) {
	    return;
	  }

	  var nextProps = nextElement[_symbols.$$PROPS];

	  if (nextProps) {
	    var children = nextProps.children;


	    if (prevNode) {
	      if (prevNode.tagName === nextProps.tagName) {
	        nextElement[_symbols.$$NODE] = prevNode;

	        (0, _patchChildren2.default)(prevNode, prevNode, children);

	        for (var key in nextProps) {
	          if (key !== 'tagName' && key !== 'children') {
	            if (prevNode[key] !== nextProps[key]) {
	              prevNode[key] = nextProps[key];
	            }
	          }
	        }

	        var nextNode = nextElement[_symbols.$$NODE];

	        if (nextNode && nextNode !== prevNode) {
	          var childNodes = nextNode.childNodes;

	          for (var i = 0, l = childNodes.length; i < l; i++) {
	            var childNode = childNodes[i];
	            prevNode.appendChild(childNode);
	          }
	        }
	      } else {
	        parentNode.removeChild(prevNode);
	        return patchNode(null, nextElement, parentNode);
	      }
	    } else {
	      var _nextNode = nextElement[_symbols.$$NODE] || (nextElement[_symbols.$$NODE] = document.createElement(nextProps.tagName));

	      (0, _patchChildren2.default)(prevNode, _nextNode, children);

	      for (var _key in nextProps) {
	        if (_key !== 'tagName' && _key !== 'children') {
	          _nextNode[_key] = nextProps[_key];
	        }
	      }

	      parentNode.appendChild(_nextNode);
	    }
	  } else {
	    if (prevNode && prevNode.nodeValue === nextElement) {
	      return;
	    }

	    var _nextNode2 = nextElement.nodeType > 0 ? nextElement : document.createTextNode(nextElement);

	    if (prevNode) {
	      parentNode.replaceChild(_nextNode2, prevNode);
	    } else {
	      parentNode.appendChild(_nextNode2);
	    }
	  }
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = patchChildren;

	var _patchNode = __webpack_require__(3);

	var _patchNode2 = _interopRequireDefault(_patchNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function patchChildren(prevNode, nextNode, children, leftOversOverride) {
	  var leftOvers = leftOversOverride || (prevNode ? [].concat(_toConsumableArray(prevNode.childNodes)) : []);

	  var offset = 0;

	  for (var i = 0, l = children.length; i < l; i++) {
	    var childElement = children[i];
	    var prevChildNode = prevNode ? prevNode.childNodes[offset + i] : null;

	    if (Array.isArray(childElement)) {
	      children = [].concat(_toConsumableArray(childElement), _toConsumableArray(children.slice(i + 1, l)));
	      offset += i;
	      l = children.length;
	      i = -1;
	    } else {
	      var prevChildNodeIndex = leftOvers.indexOf(prevChildNode);

	      if (prevChildNodeIndex !== -1) {
	        leftOvers.splice(prevChildNodeIndex, 1);
	      }

	      (0, _patchNode2.default)(prevChildNode, childElement, nextNode);
	    }
	  }

	  while (leftOvers.length > 0) {
	    var childNode = leftOvers.pop();
	    nextNode.removeChild(childNode);
	  }
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = render;

	var _patchNode = __webpack_require__(3);

	var _patchNode2 = _interopRequireDefault(_patchNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function render(nextElement, mountNode) {
	  (0, _patchNode2.default)(mountNode.firstChild, nextElement, mountNode);
	}

/***/ }
/******/ ])
});
;