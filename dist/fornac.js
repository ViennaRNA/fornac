(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3"));
	else if(typeof define === 'function' && define.amd)
		define(["d3"], factory);
	else if(typeof exports === 'object')
		exports["fornac"] = factory(require("d3"));
	else
		root["fornac"] = factory(root["d3"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_d3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/slugid/index.js":
/*!**************************************!*\
  !*** ./node_modules/slugid/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// The MIT License (MIT)
//
// Copyright (c) 2014 Jonas Finnemann Jensen
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

module.exports = __webpack_require__(/*! ./slugid */ "./node_modules/slugid/slugid.js");


/***/ }),

/***/ "./node_modules/slugid/slugid.js":
/*!***************************************!*\
  !*** ./node_modules/slugid/slugid.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// The MIT License (MIT)
//
// Copyright (c) 2014 Jonas Finnemann Jensen
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var uuid = __webpack_require__(/*! uuid */ "./node_modules/uuid/uuid.js");

/**
 * Returns the given uuid as a 22 character slug. This can be a regular v4
 * slug or a "nice" slug.
 */
exports.encode = function(uuid_) {
  var bytes   = uuid.parse(uuid_);
  var base64  = (new Buffer(bytes)).toString('base64');
  var slug = base64
              .replace(/\+/g, '-')  // Replace + with - (see RFC 4648, sec. 5)
              .replace(/\//g, '_')  // Replace / with _ (see RFC 4648, sec. 5)
              .substring(0, 22);    // Drop '==' padding
  return slug;
};

/**
 * Returns the uuid represented by the given v4 or "nice" slug
 */
exports.decode = function(slug) {
  var base64 = slug
                  .replace(/-/g, '+')
                  .replace(/_/g, '/')
                  + '==';
  return uuid.unparse(new Buffer(base64, 'base64'));
};

/**
 * Returns a randomly generated uuid v4 compliant slug
 */
exports.v4 = function() {
  var bytes   = uuid.v4(null, new Buffer(16));
  var base64  = bytes.toString('base64');
  var slug = base64
              .replace(/\+/g, '-')  // Replace + with - (see RFC 4648, sec. 5)
              .replace(/\//g, '_')  // Replace / with _ (see RFC 4648, sec. 5)
              .substring(0, 22);    // Drop '==' padding
  return slug;
};

/** 
 * Returns a randomly generated uuid v4 compliant slug which conforms to a set
 * of "nice" properties, at the cost of some entropy. Currently this means one
 * extra fixed bit (the first bit of the uuid is set to 0) which guarantees the
 * slug will begin with [A-Za-f]. For example such slugs don't require special
 * handling when used as command line parameters (whereas non-nice slugs may
 * start with `-` which can confuse command line tools).
 *
 * Potentially other "nice" properties may be added in future to further
 * restrict the range of potential uuids that may be generated.
 */
exports.nice = function() {
  var bytes   = uuid.v4(null, new Buffer(16));
  bytes[0] = bytes[0] & 0x7f;  // unset first bit to ensure [A-Za-f] first char
  var base64  = bytes.toString('base64');
  var slug = base64
              .replace(/\+/g, '-')  // Replace + with - (see RFC 4648, sec. 5)
              .replace(/\//g, '_')  // Replace / with _ (see RFC 4648, sec. 5)
              .substring(0, 22);    // Drop '==' padding
  return slug;
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/uuid/rng-browser.js":
/*!******************************************!*\
  !*** ./node_modules/uuid/rng-browser.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
  // Moderately fast, high quality
  var _rnds8 = new Uint8Array(16);
  rng = function whatwgRNG() {
    crypto.getRandomValues(_rnds8);
    return _rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var  _rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return _rnds;
  };
}

module.exports = rng;


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/uuid/uuid.js":
/*!***********************************!*\
  !*** ./node_modules/uuid/uuid.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

// Unique ID creation requires a high quality random # generator.  We feature
// detect to determine the best RNG source, normalizing to a function that
// returns 128-bits of randomness, since that's what's usually required
var _rng = __webpack_require__(/*! ./rng */ "./node_modules/uuid/rng-browser.js");

// Maps for number <-> hex string conversion
var _byteToHex = [];
var _hexToByte = {};
for (var i = 0; i < 256; i++) {
  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
  _hexToByte[_byteToHex[i]] = i;
}

// **`parse()` - Parse a UUID into it's component bytes**
function parse(s, buf, offset) {
  var i = (buf && offset) || 0, ii = 0;

  buf = buf || [];
  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
    if (ii < 16) { // Don't overflow!
      buf[i + ii++] = _hexToByte[oct];
    }
  });

  // Zero out remaining bytes if string was short
  while (ii < 16) {
    buf[i + ii++] = 0;
  }

  return buf;
}

// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
function unparse(buf, offset) {
  var i = offset || 0, bth = _byteToHex;
  return  bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = _rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; n++) {
    b[i + n] = node[n];
  }

  return buf ? buf : unparse(b);
}

// **`v4()` - Generate random UUID**

// See https://github.com/broofa/node-uuid for API details
function v4(options, buf, offset) {
  // Deprecated - 'format' argument, as supported in v1.2
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || _rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ii++) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || unparse(rnds);
}

// Export public API
var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
uuid.parse = parse;
uuid.unparse = unparse;

module.exports = uuid;


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/d3-context-menu.js":
/*!********************************!*\
  !*** ./src/d3-context-menu.js ***!
  \********************************/
/*! exports provided: contextMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contextMenu", function() { return contextMenu; });
/* harmony import */ var _styles_d3_context_menu_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/d3-context-menu.css */ "./styles/d3-context-menu.css");
/* harmony import */ var _styles_d3_context_menu_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_d3_context_menu_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "d3");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(d3__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var slugid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! slugid */ "./node_modules/slugid/index.js");
/* harmony import */ var slugid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(slugid__WEBPACK_IMPORTED_MODULE_2__);



function contextMenu(menu, opts) {
  var previouslyMouseUp = false;

  var clickAway = function clickAway() {};

  var uid = slugid__WEBPACK_IMPORTED_MODULE_2___default.a.nice();
  var rootElement = null;
  var orientation = 'right'; // display the menu to the right of the mouse click
  // or parent elemement

  var initialPos = null;
  var parentStart = null;
  var openCallback, closeCallback;

  if (typeof opts === 'function') {
    openCallback = opts;
  } else {
    opts = opts || {};
    openCallback = opts.onOpen;
    closeCallback = opts.onClose;
  }

  if ('rootElement' in opts) rootElement = opts['rootElement'];

  if ('pos' in opts) {
    // do we want to place this menu somewhere specific?
    initialPos = opts.pos;
  }

  if ('orientation' in opts) {
    orientation = opts.orientation;
  }

  if ('parentStart' in opts) {
    parentStart = opts.parentStart;
  } // create the div element that will hold the context menu


  d3__WEBPACK_IMPORTED_MODULE_1___default.a.selectAll('.d3-context-menu-' + uid).data([1]).enter().append('div').classed('d3-context-menu', true).classed('d3-context-menu-' + uid, true); // close menu

  d3__WEBPACK_IMPORTED_MODULE_1___default.a.select('body').on('click.d3-context-menu-' + uid, function () {
    if (previouslyMouseUp) {
      previouslyMouseUp = false;
      return;
    }

    console.log('body click close');
    d3__WEBPACK_IMPORTED_MODULE_1___default.a.select('.d3-context-menu-' + uid).style('display', 'none');
    orientation = 'right';

    if (closeCallback) {
      closeCallback();
    }
  }); // this gets executed when a contextmenu event occurs

  return function (data, index) {
    var pMouseUp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var clickAwayFunc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
    var elm = this;
    var contextMenuPos = null;
    var mousePos = null;
    var currentThis = this;
    if (rootElement == null) mousePos = d3__WEBPACK_IMPORTED_MODULE_1___default.a.mouse(this);else mousePos = d3__WEBPACK_IMPORTED_MODULE_1___default.a.mouse(rootElement); // for recursive menus, we need the mouse
    // position relative to another element

    clickAway = clickAwayFunc;
    var openChildMenuUid = null;
    previouslyMouseUp = pMouseUp;
    d3__WEBPACK_IMPORTED_MODULE_1___default.a.selectAll('.d3-context-menu-' + uid).html('');
    var list = d3__WEBPACK_IMPORTED_MODULE_1___default.a.selectAll('.d3-context-menu-' + uid).on('contextmenu', function (d) {
      console.log('context-menu close');
      d3__WEBPACK_IMPORTED_MODULE_1___default.a.select('.d3-context-menu-' + uid).style('display', 'none');
      orientation = 'right';
      d3__WEBPACK_IMPORTED_MODULE_1___default.a.event.preventDefault();
      d3__WEBPACK_IMPORTED_MODULE_1___default.a.event.stopPropagation();
    }).append('ul');
    list.selectAll('li').data(typeof menu === 'function' ? menu(data) : menu).enter().append('li').attr('class', function (d) {
      console.log('d:', d);
      var ret = '';

      if (d.divider) {
        ret += ' is-divider';
      }

      if (d.disabled) {
        ret += ' is-disabled';
      }

      if (!d.action) {
        ret += ' is-header';
      }

      if ('children' in d) {
        ret += ' d3-context-menu-recursive';
      }

      return ret;
    }).html(function (d) {
      if (d.divider) {
        return '<hr>';
      }

      if (!d.title) {
        console.error('No title attribute set. Check the spelling of your options.');
      }

      return typeof d.title === 'string' ? d.title : d.title(data);
    }).on('click', function (d, i) {
      if (d.disabled) return; // do nothing if disabled

      if (!d.action) return; // headers have no "action"

      d.action(elm, data, index, mousePos);
      console.log('click close'); // close all context menus

      d3__WEBPACK_IMPORTED_MODULE_1___default.a.selectAll('.d3-context-menu').style('display', 'none');
      orientation = 'right';

      if (closeCallback) {
        closeCallback();
      }
    }).on('mouseenter', function (d, i) {
      d3__WEBPACK_IMPORTED_MODULE_1___default.a.select(this).classed('d3-context-menu-selected', true);

      if (openChildMenuUid != null) {
        // there's a child menu open
        // unselect all items
        d3__WEBPACK_IMPORTED_MODULE_1___default.a.select('.d3-context-menu-' + uid).selectAll('li').classed('d3-context-menu-selected', false);

        if (typeof d.children == 'undefined') {
          console.log("no children close"); // no children, so hide any open child menus

          d3__WEBPACK_IMPORTED_MODULE_1___default.a.select('.d3-context-menu-' + openChildMenuUid).style('display', 'none');
          openChildMenuUid = null;
          return;
        }

        if (d.childUid == openChildMenuUid) {
          // the correct child menu is already open
          return;
        } else {
          // need to open a different child menu
          console.log('open different child menu close'); // close the already open one

          d3__WEBPACK_IMPORTED_MODULE_1___default.a.select('.d3-context-menu-' + openChildMenuUid).style('display', 'none');
          openChildMenuUid = null;
        }
      } // there should be no menu open right now


      if (typeof d.children != 'undefined') {
        var _boundingRect = this.getBoundingClientRect();

        var childrenContextMenu = null;

        if (orientation == 'left') {
          childrenContextMenu = contextMenu(d.children, {
            'rootElement': currentThis,
            'pos': [_boundingRect.left + window.pageXOffset, _boundingRect.top - 2 + window.pageYOffset],
            'orientation': 'left'
          });
        } else {
          childrenContextMenu = contextMenu(d.children, {
            'pos': [_boundingRect.left + _boundingRect.width + window.pageXOffset, _boundingRect.top - 2 + window.pageYOffset],
            'rootElement': currentThis,
            'parentStart': [_boundingRect.left + window.pageXOffset, _boundingRect.top - 2 + window.pageYOffset]
          });
        }

        d.childUid = childrenContextMenu.apply(this, [data, i, true, function () {}]);
        openChildMenuUid = d.childUid;
      }

      d3__WEBPACK_IMPORTED_MODULE_1___default.a.select(this).classed('d3-context-menu-selected', true);
    }).on('mouseleave', function (d, i) {
      if (openChildMenuUid == null) {
        d3__WEBPACK_IMPORTED_MODULE_1___default.a.select(this).classed('d3-context-menu-selected', false);
      }
    });
    list.selectAll('.d3-context-menu-recursive').append('img').attr('src', 'images/play.svg').attr('width', '14px').attr('height', '14px').style('position', 'absolute').style('right', '5px'); // the openCallback allows an action to fire before the menu is displayed
    // an example usage would be closing a tooltip

    if (openCallback) {
      if (openCallback(data, index) === false) {
        return uid;
      }
    }

    var contextMenuSelection = d3__WEBPACK_IMPORTED_MODULE_1___default.a.select('.d3-context-menu-' + uid).style('display', 'block');

    if (initialPos == null) {
      d3__WEBPACK_IMPORTED_MODULE_1___default.a.select('.d3-context-menu-' + uid).style('left', d3__WEBPACK_IMPORTED_MODULE_1___default.a.event.pageX - 2 + 'px').style('top', d3__WEBPACK_IMPORTED_MODULE_1___default.a.event.pageY - 2 + 'px');
    } else {
      d3__WEBPACK_IMPORTED_MODULE_1___default.a.select('.d3-context-menu-' + uid).style('left', initialPos[0] + 'px').style('top', initialPos[1] + 'px');
    } // check if the menu disappears off the side of the window


    var boundingRect = contextMenuSelection.node().getBoundingClientRect();

    if (boundingRect.left + boundingRect.width > window.innerWidth || orientation == 'left') {
      orientation = 'left'; // menu goes of the end of the window, position it the other way

      if (initialPos == null) {
        // place the menu where the user clicked
        d3__WEBPACK_IMPORTED_MODULE_1___default.a.select('.d3-context-menu-' + uid).style('left', d3__WEBPACK_IMPORTED_MODULE_1___default.a.event.pageX - 2 - boundingRect.width + 'px').style('top', d3__WEBPACK_IMPORTED_MODULE_1___default.a.event.pageY - 2 + 'px');
      } else {
        if (parentStart != null) {
          d3__WEBPACK_IMPORTED_MODULE_1___default.a.select('.d3-context-menu-' + uid).style('left', parentStart[0] - boundingRect.width + 'px').style('top', parentStart[1] + 'px');
        } else {
          d3__WEBPACK_IMPORTED_MODULE_1___default.a.select('.d3-context-menu-' + uid).style('left', initialPos[0] - boundingRect.width + 'px').style('top', initialPos[1] + 'px');
        }
      }
    } // display context menu


    if (previouslyMouseUp) return uid;
    d3__WEBPACK_IMPORTED_MODULE_1___default.a.event.preventDefault();
    d3__WEBPACK_IMPORTED_MODULE_1___default.a.event.stopPropagation(); //d3.event.stopImmediatePropagation();
    //

    return uid;
  };
}
;

/***/ }),

/***/ "./src/fornac.js":
/*!***********************!*\
  !*** ./src/fornac.js ***!
  \***********************/
/*! exports provided: FornaContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FornaContainer", function() { return FornaContainer; });
/* harmony import */ var _styles_fornac_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/fornac.css */ "./styles/fornac.css");
/* harmony import */ var _styles_fornac_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_fornac_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_d3_context_menu_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/d3-context-menu.css */ "./styles/d3-context-menu.css");
/* harmony import */ var _styles_d3_context_menu_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_d3_context_menu_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3 */ "d3");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(d3__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var slugid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! slugid */ "./node_modules/slugid/index.js");
/* harmony import */ var slugid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(slugid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _d3_context_menu_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./d3-context-menu.js */ "./src/d3-context-menu.js");
/* harmony import */ var _rnagraph_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rnagraph.js */ "./src/rnagraph.js");
/* harmony import */ var _rnautils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./rnautils.js */ "./src/rnautils.js");
/* harmony import */ var _simplernaplot_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./simplernaplot.js */ "./src/simplernaplot.js");
/* harmony import */ var _naview_naview_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./naview/naview.js */ "./src/naview/naview.js");
/* Version: 0.2
* Date: 2015-03-15
*/









function FornaContainer(element, passedOptions) {
  var self = this;
  self.options = {
    'editable': false,
    'displayAllLinks': false,
    'labelInterval': 10,
    'applyForce': true,
    'chargeDistance': 110,
    'friction': 0.35,
    'middleCharge': -30,
    'otherCharge': -30,
    'linkDistanceMultiplier': 15,
    'initialSize': null,
    'layout': 'standard-polygonal',
    'allowPanningAndZooming': true,
    'transitionDuration': 500,
    'maxNodeRadius': 80,
    // the maximum radius of a node when the view is centered
    'resizeSvgOnResize': true //change the size of the svg when resizing the container
    //sometimes its beneficial to turn this off, especially when
    //performance is an issue

  };

  if (arguments.length > 1) {
    for (var option in passedOptions) {
      if (self.options.hasOwnProperty(option)) self.options[option] = passedOptions[option];
    }
  }

  if (self.options.initialSize !== null) {
    self.options.svgW = self.options.initialSize[0];
    self.options.svgH = self.options.initialSize[1];
  } else {
    self.options.svgW = 800;
    self.options.svgH = 800;
  }

  if (self.options.editable == true) {
    var backgroundMenu = [{
      title: 'Add Node',
      action: function action(elm, d, i, mousePos) {},
      children: [{
        'title': 'A',
        action: function action(elm, d, i, mousePos) {
          console.log('mousePos:', mousePos, self.options.svgW, self.options.svgH);
          var canvasMousePos = [xScale.invert(mousePos[0]), yScale.invert(mousePos[1])];
          console.log('canvasMousePos', canvasMousePos);
          self.addRNA('.', {
            'sequence': 'A',
            'centerPos': canvasMousePos
          });
        }
      }, {
        'title': 'C',
        action: function action(elm, d, i, mousePos) {
          console.log('mousePos:', mousePos, self.options.svgW, self.options.svgH);
          var canvasMousePos = [xScale.invert(mousePos[0]), yScale.invert(mousePos[1])];
          console.log('canvasMousePos', canvasMousePos);
          self.addRNA('.', {
            'sequence': 'C',
            'centerPos': canvasMousePos
          });
        }
      }, {
        'title': 'G',
        action: function action(elm, d, i, mousePos) {
          console.log('mousePos:', mousePos, self.options.svgW, self.options.svgH);
          var canvasMousePos = [xScale.invert(mousePos[0]), yScale.invert(mousePos[1])];
          console.log('canvasMousePos', canvasMousePos);
          self.addRNA('.', {
            'sequence': 'G',
            'centerPos': canvasMousePos
          });
        }
      }, {
        'title': 'U',
        action: function action(elm, d, i, mousePos) {
          console.log('mousePos:', mousePos, self.options.svgW, self.options.svgH);
          var canvasMousePos = [xScale.invert(mousePos[0]), yScale.invert(mousePos[1])];
          console.log('canvasMousePos', canvasMousePos);
          self.addRNA('.', {
            'sequence': 'U',
            'centerPos': canvasMousePos
          });
        }
      }],
      disabled: false // optional, defaults to false

    }];
    var nodeMenu = [{
      title: 'Delete Node',
      action: function action(elm, d, i) {
        self.deleteNode(d);
      },
      disabled: false // optional, defaults to false

    }, {
      title: 'Change Node',
      action: function action(elm, d, i) {
        console.log('You have clicked the second item!');
        console.log('The data for this circle is: ' + d);
      },
      children: [{
        title: 'A',
        action: function action(elm, d, i) {
          self.changeNode('A', d);
        }
      }, {
        title: 'C',
        action: function action(elm, d, i) {
          self.changeNode('C', d);
        }
      }, {
        title: 'G',
        action: function action(elm, d, i) {
          self.changeNode('G', d);
        }
      }, {
        title: 'U',
        action: function action(elm, d, i) {
          self.changeNode('U', d);
        }
      }]
    }, {
      title: 'Insert Before',
      action: function action(elm, d, i) {},
      children: [{
        title: 'A',
        action: function action(elm, d, i) {
          self.insertNodeBeforeOrAfter('A', d, -1);
        }
      }, {
        title: 'C',
        action: function action(elm, d, i) {
          self.insertNodeBeforeOrAfter('C', d, -1);
        }
      }, {
        title: 'G',
        action: function action(elm, d, i) {
          self.insertNodeBeforeOrAfter('G', d, -1);
        }
      }, {
        title: 'U',
        action: function action(elm, d, i) {
          self.insertNodeBeforeOrAfter('U', d, -1);
        }
      }]
    }, {
      title: 'Insert After',
      action: function action(elm, d, i) {
        console.log('d:', d);
      },
      children: [{
        title: 'A',
        action: function action(elm, d, i) {
          self.insertNodeBeforeOrAfter('A', d, 0);
        }
      }, {
        title: 'C',
        action: function action(elm, d, i) {
          self.insertNodeBeforeOrAfter('C', d, 0);
        }
      }, {
        title: 'G',
        action: function action(elm, d, i) {
          self.insertNodeBeforeOrAfter('G', d, 0);
        }
      }, {
        title: 'U',
        action: function action(elm, d, i) {
          self.insertNodeBeforeOrAfter('U', d, 0);
        }
      }]
    }];
    self.nodeContextMenu = Object(_d3_context_menu_js__WEBPACK_IMPORTED_MODULE_4__["contextMenu"])(nodeMenu);
    self.backgroundContextMenu = Object(_d3_context_menu_js__WEBPACK_IMPORTED_MODULE_4__["contextMenu"])(backgroundMenu);
  } else {
    console.log('empty context menu');

    self.nodeContextMenu = function () {};
  }

  var fill = d3__WEBPACK_IMPORTED_MODULE_2___default.a.scale.category20(); // mouse event vars

  var mousedownLink = null,
      mousedownNode = null,
      mouseupNode = null;
  var linkContextMenuShown = false;
  var xScale = d3__WEBPACK_IMPORTED_MODULE_2___default.a.scale.linear().domain([0, self.options.svgW]).range([0, self.options.svgW]);
  var yScale = d3__WEBPACK_IMPORTED_MODULE_2___default.a.scale.linear().domain([0, self.options.svgH]).range([0, self.options.svgH]);
  var graph = self.graph = {
    'nodes': [],
    'links': []
  };
  self.linkStrengths = {
    'pseudoknot': 0.00,
    'proteinChain': 0.00,
    'chainChain': 0.00,
    'intermolecule': 10.00,
    'external': 0.00,
    'other': 10.00
  };
  self.displayParameters = {
    'displayBackground': 'true',
    'displayNumbering': 'true',
    'displayNodeOutline': 'true',
    'displayNodeLabel': 'true',
    'displayLinks': 'true',
    'displayPseudoknotLinks': 'true',
    'displayProteinLinks': 'true'
  };
  self.colorScheme = 'structure';
  self.customColors = {};
  self.animation = self.options.applyForce; // don't listen to events because a model window is open somewhere

  self.deaf = false;
  self.rnas = {};
  self.extraLinks = []; //store links between different RNAs

  Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array) return false; // compare lengths - can save a lot of time 

    if (this.length != array.length) return false;

    for (var i = 0, l = this.length; i < l; i++) {
      // Check if we have nested arrays
      if (this[i] instanceof Array && array[i] instanceof Array) {
        // recurse into the nested arrays
        if (!this[i].equals(array[i])) return false;
      } else if (this[i] != array[i]) {
        // Warning - two different object instances will never be equal: {x:20} != {x:20}
        return false;
      }
    }

    return true;
  };

  self.createInitialLayout = function (structure, passedOptions) {
    // the default options
    var options = {
      'sequence': '',
      'name': 'empty',
      'positions': [],
      'labelInterval': self.options.labelInterval,
      'avoidOthers': true,
      'uids': [],
      'circularizeExternal': true
    };

    if (arguments.length == 2) {
      for (var option in passedOptions) {
        if (options.hasOwnProperty(option)) options[option] = passedOptions[option];
      }
    }

    console.log('options.uids:', options.uids);
    var rg = new _rnagraph_js__WEBPACK_IMPORTED_MODULE_5__["RNAGraph"](options.sequence, structure, options.name);
    rg.circularizeExternal = options.circularizeExternal;
    var rnaJson = rg.recalculateElements();

    if (options.positions.length === 0) {
      // no provided positions means we need to calculate an initial layout
      if (self.options.layout == 'naview') {
        var naview = new _naview_naview_js__WEBPACK_IMPORTED_MODULE_8__["NAView"]();
        var naViewPositions = naview.naview_xy_coordinates(rg.pairtable);
        options.positions = [];

        for (var i = 0; i < naViewPositions.nbase; i++) {
          options.positions.push([naViewPositions.x[i], naViewPositions.y[i]]);
        }
      } else {
        options.positions = Object(_simplernaplot_js__WEBPACK_IMPORTED_MODULE_7__["simpleXyCoordinates"])(rnaJson.pairtable);
      }
    }

    rnaJson = rnaJson.elementsToJson().addUids(options.uids).addPositions('nucleotide', options.positions).addLabels(1, options.labelInterval).reinforceStems().reinforceLoops().connectFakeNodes().reassignLinkUids().breakNodesToFakeNodes();
    return rnaJson;
  };

  self.addRNA = function (structure, passedOptions) {
    var rnaJson = self.createInitialLayout(structure, passedOptions);
    var centerView = false;
    /*
     * Code to display the JSONs representing the structure
     *
    rnaJson.nodes[0].rna = null;
    rnaJson.nodes[0].nextNode = null;
     rnaJson.links[0].source = null;
    rnaJson.links[0].target = null;
     console.log(rnaJson.nodes[0]);
    console.log(rnaJson.links[0]);
    console.log(JSON.stringify(rnaJson.nodes[0],null,2));
    console.log(JSON.stringify(rnaJson.links[0],null,2));
    */

    if (arguments.length === 1) passedOptions = {};

    if ('extraLinks' in passedOptions) {
      // presumably the passed in links are within the passed molecule
      var newLinks = self.addExternalLinks(rnaJson, passedOptions.extraLinks);
      self.extraLinks = self.extraLinks.concat(newLinks);
    }

    if ('centerPos' in passedOptions) self.addRNAJSON(rnaJson, {
      centerPos: passedOptions.centerPos,
      centerView: false
    });else if ('avoidOthers' in passedOptions) self.addRNAJSON(rnaJson, {
      avoidOthers: passedOptions.avoidOthers
    });else self.addRNAJSON(rnaJson, {
      centerView: passedOptions.centerView
    });
    return rnaJson;
  };

  self.changeNode = function (nodeName, referenceNode) {
    //insert a new node before or after another one
    //positionOffset specifies who far from the original to insert the new node
    var rna = referenceNode.rna;
    var dotbracket = _rnautils_js__WEBPACK_IMPORTED_MODULE_6__["rnaUtilities"].pairtableToDotbracket(rna.pairtable);
    var positions = rna.getPositions('nucleotide');
    var sequence = rna.seq;
    var uids = rna.getUids();
    var newNodeNum = referenceNode.num;
    var newDotbracket = dotbracket;
    var newSequence = sequence.slice(0, newNodeNum - 1) + nodeName + sequence.slice(newNodeNum);
    console.log('newSequence:', newSequence);
    console.log('uids:', uids);
    uids.splice(newNodeNum - 1, 1, slugid__WEBPACK_IMPORTED_MODULE_3___default.a.nice());
    var newPositions = positions;
    delete self.rnas[rna.uid];
    var newRNA = self.addRNA(newDotbracket, {
      'sequence': newSequence,
      'positions': newPositions,
      'uids': uids,
      'centerView': false
    });
  };

  self.insertNodeBeforeOrAfter = function (nodeName, referenceNode, positionOffset) {
    //insert a new node before or after another one
    //positionOffset specifies who far from the original to insert the new node
    var rna = referenceNode.rna;
    var dotbracket = _rnautils_js__WEBPACK_IMPORTED_MODULE_6__["rnaUtilities"].pairtableToDotbracket(rna.pairtable);
    var positions = rna.getPositions('nucleotide');
    var sequence = rna.seq;
    var uids = rna.getUids();
    var newNodeNum = referenceNode.num + positionOffset;
    var newDotbracket = dotbracket.slice(0, newNodeNum) + '.' + dotbracket.slice(newNodeNum);
    var newSequence = sequence.slice(0, newNodeNum) + nodeName + sequence.slice(newNodeNum);
    console.log('newSequence:', newSequence);
    uids.splice(newNodeNum, 0, slugid__WEBPACK_IMPORTED_MODULE_3___default.a.nice());
    positions.splice(newNodeNum, 0, positions[newNodeNum - positionOffset - 1]);
    var newUids = uids;
    var newPositions = positions;
    console.log('positions:', positions);
    console.log('new node positions:', newPositions);
    delete self.rnas[rna.uid];
    var newRNA = self.addRNA(newDotbracket, {
      'sequence': newSequence,
      'positions': newPositions,
      'uids': newUids,
      'centerView': false
    });
  };

  self.deleteNode = function (node) {
    console.log('deleting...', node); // get the dotbracket string for this rna

    var rna = node.rna;
    var pair = rna.pairtable[node.num]; // remove basepairs for this node

    if (pair != 0) {
      rna.pairtable[node.num] = 0;
      rna.pairtable[pair] = 0;
    }

    var dotbracket = _rnautils_js__WEBPACK_IMPORTED_MODULE_6__["rnaUtilities"].pairtableToDotbracket(rna.pairtable);
    var positions = rna.getPositions('nucleotide');
    var sequence = rna.seq;
    var uids = rna.getUids();
    var newDotbracket = dotbracket.slice(0, node.num - 1) + dotbracket.slice(node.num);
    var newPositions = positions.slice(0, node.num - 1).concat(positions.slice(node.num));
    var newSequence = sequence.slice(0, node.num - 1) + sequence.slice(node.num);
    var newUids = uids.slice(0, node.num - 1).concat(uids.slice(node.num));
    delete self.rnas[rna.uid];
    var newRNA = self.addRNA(newDotbracket, {
      'sequence': newSequence,
      'positions': newPositions,
      'uids': newUids,
      'centerView': false
    });
    console.log('new dotbracket:', newDotbracket); //self.recalculateGraph();
    //remove backbone links associated with this node
    //remove this node
  };

  self.addExternalLinks = function (rnaJson, externalLinks) {
    var newLinks = [];

    for (var i = 0; i < externalLinks.length; i++) {
      var newLink = {
        linkType: 'external',
        value: 1,
        uid: generateUUID(),
        source: null,
        target: null
      }; // check if the source node is an array

      if (Object.prototype.toString.call(externalLinks[i][0]) === '[object Array]') {
        for (var j = 0; j < rnaJson.nodes.length; j++) {
          if ('nucs' in rnaJson.nodes[j]) {
            if (rnaJson.nodes[j].nucs.equals(externalLinks[i][0])) {
              newLink.source = rnaJson.nodes[j];
              break;
            }
          }
        }
      } else {
        for (var j = 0; j < rnaJson.nodes.length; j++) {
          if (rnaJson.nodes[j].num == externalLinks[i][0]) {
            newLink.source = rnaJson.nodes[j];
          }
        }
      } // check if the target node is an array


      if (Object.prototype.toString.call(externalLinks[i][1]) === '[object Array]') {
        for (var j = 0; j < rnaJson.nodes.length; j++) {
          if ('nucs' in rnaJson.nodes[j]) {
            if (rnaJson.nodes[j].nucs.equals(externalLinks[i][1])) {
              newLink.target = rnaJson.nodes[j];
            }
          }
        }
      } else {
        for (var j = 0; j < rnaJson.nodes.length; j++) {
          if (rnaJson.nodes[j].num == externalLinks[i][1]) {
            newLink.target = rnaJson.nodes[j];
          }
        }
      }

      if (newLink.source == null || newLink.target == null) {
        console.log('ERROR: source or target of new link not found:', newLink, externalLinks[i]);
        continue;
      }

      newLinks.push(newLink);
    }

    return newLinks;
  };

  self.addRNAJSON = function (rnaGraph, _ref) {
    var _ref$avoidOthers = _ref.avoidOthers,
        avoidOthers = _ref$avoidOthers === void 0 ? false : _ref$avoidOthers,
        _ref$centerPos = _ref.centerPos,
        centerPos = _ref$centerPos === void 0 ? null : _ref$centerPos,
        _ref$centerView = _ref.centerView,
        centerView = _ref$centerView === void 0 ? true : _ref$centerView;
    // Add an RNAGraph, which contains nodes and links as part of the
    // structure
    // Each RNA will have uid to identify it
    // when it is modified, it is replaced in the global list of RNAs
    //
    var maxX, minX;
    console.log('centerView:', centerView);

    if (centerPos != null) {
      // center the newly created RNA at a given position
      var totalX = 0;
      var totalY = 0;
      var nodeCount = 0;
      rnaGraph.nodes.forEach(function (node) {
        totalX += node.x;
        totalY += node.y;
        nodeCount += 1;
      });

      if (nodeCount > 0) {
        // center the nodes at centerPos
        rnaGraph.nodes.forEach(function (node) {
          node.x = node.x + centerPos[0] - totalX / nodeCount;
          node.y = node.y + centerPos[1] - totalY / nodeCount;
          node.px = node.x;
          node.py = node.y;
        });
      }
    }

    if (avoidOthers) {
      if (self.graph.nodes.length > 0) maxX = d3__WEBPACK_IMPORTED_MODULE_2___default.a.max(self.graph.nodes.map(function (d) {
        return d.x;
      }));else maxX = 0;
      minX = d3__WEBPACK_IMPORTED_MODULE_2___default.a.min(rnaGraph.nodes.map(function (d) {
        return d.x;
      }));
      rnaGraph.nodes.forEach(function (node) {
        node.x += maxX - minX + 20;
        node.px += maxX - minX;
      });
    }

    rnaGraph.nodes.forEach(function (node) {
      node.rna = rnaGraph;
    });
    self.rnas[rnaGraph.uid] = rnaGraph;
    self.recalculateGraph();
    self.update();
    if (centerView) self.centerView();
    return rnaGraph;
  };

  function magnitude(x) {
    return Math.sqrt(x[0] * x[0] + x[1] * x[1]);
  }

  function positionAnyNode(d) {
    var endPoint = d;
    var startPoint = d.prevNode;
    var lengthMult = 6;
    if (startPoint === null) return; // does this node have a link pointing to it?

    if (!d.linked) return; // point back toward the previous node

    var u = [-(endPoint.x - startPoint.x), -(endPoint.y - startPoint.y)];
    if (u[0] == 0 && u[1] == 0) return; // will lead to a NaN error

    u = [u[0] / magnitude(u), u[1] / magnitude(u)];
    var v = [-u[1], u[0]];
    var arrowTip = [d.radius * u[0], d.radius * u[1]];
    var path = 'M' + (arrowTip[0] + lengthMult * (u[0] + v[0]) / 2) + ',' + (arrowTip[1] + lengthMult * (u[1] + v[1]) / 2) + 'L' + arrowTip[0] + ',' + arrowTip[1] + 'L' + (arrowTip[0] + lengthMult * (u[0] - v[0]) / 2) + ',' + (arrowTip[1] + lengthMult * (u[1] - v[1]) / 2);
    d3__WEBPACK_IMPORTED_MODULE_2___default.a.select(this).attr('d', path);
  }

  function realLinkFilter(d) {
    return d.linkType == 'basepair' || d.linkType == 'backbone' || d.linkType == 'intermolecule' || d.linkType == 'pseudoknot' || d.linkType == 'label_link' || d.linkType == 'external' || d.linkType == 'chain_chain';
  }

  self.transitionRNA = function (newStructure, nextFunction) {
    //transition from an RNA which is already displayed to a new structure
    var duration = self.options.transitionDuration;
    var uids = self.graph.nodes.filter(function (d) {
      return d.nodeType == 'nucleotide';
    }).map(function (d) {
      return d.uid;
    });
    var options = {
      'uids': uids
    };
    var newRNAJson = self.createInitialLayout(newStructure, options);
    var gnodes = visNodes.selectAll('g.gnode').data(newRNAJson.nodes, nodeKey);
    if (duration === 0) gnodes.attr('transform', function (d) {
      return 'translate(' + [d.x, d.y] + ')';
    });else {
      gnodes.transition().attr('transform', function (d) {
        return 'translate(' + [d.x, d.y] + ')';
      }).duration(duration);
    }
    var links = visLinks.selectAll('line.link').data(newRNAJson.links.filter(realLinkFilter), linkKey);
    var newNodes = self.createNewNodes(gnodes.enter()).attr('transform', function (d) {
      if (typeof d.x != 'undefined' && typeof d.y != 'undefined') return 'translate(' + [0, 0] + ')';else return '';
    });
    if (duration === 0) gnodes.exit().remove();else gnodes.exit().transition().attr('transform', function (d) {
      if (typeof d.x != 'undefined' && typeof d.y != 'undefined') return 'translate(' + [0, 0] + ')';else return '';
    });
    gnodes.select('path').each(positionAnyNode);
    self.graph.nodes = gnodes.data();
    self.updateStyle();
    self.centerView(duration);

    function endall(transition, callback) {
      if (transition.size() === 0) {
        setTimeout(callback, duration);
      }

      var n = 0;
      transition.each(function () {
        ++n;
      }).each('end', function () {
        if (! --n) callback.apply(this, arguments);
      });
    }

    function addNewLinks() {
      var newLinks = self.createNewLinks(links.enter());
      self.graph.links = links.data();
      self.updateStyle();
      if (typeof nextFunction != 'undefined') nextFunction();
    }

    links.exit().remove();

    if (duration === 0) {
      links.attr('x1', function (d) {
        return d.source.x;
      }).attr('y1', function (d) {
        return d.source.y;
      }).attr('x2', function (d) {
        return d.target.x;
      }).attr('y2', function (d) {
        return d.target.y;
      });
      var newLinks = self.createNewLinks(links.enter());
      self.graph.links = links.data();
      self.updateStyle();
    } else {
      links.transition().attr('x1', function (d) {
        return d.source.x;
      }).attr('y1', function (d) {
        return d.source.y;
      }).attr('x2', function (d) {
        return d.target.x;
      }).attr('y2', function (d) {
        return d.target.y;
      }).duration(duration).call(endall, addNewLinks);
    }

    if (duration === 0) {
      newNodes.attr('transform', function (d) {
        if (typeof d.x != 'undefined' && typeof d.y != 'undefined') return 'translate(' + [d.x, d.y] + ')';else return '';
      });
    } else {
      newNodes.transition().attr('transform', function (d) {
        if (typeof d.x != 'undefined' && typeof d.y != 'undefined') return 'translate(' + [d.x, d.y] + ')';else return '';
      });
    }
  };

  self.recalculateGraph = function () {
    // Condense all of the individual RNAs into one
    // collection of nodes and links
    self.graph.nodes = [];
    self.graph.links = [];

    for (var uid in self.rnas) {
      self.graph.nodes = self.graph.nodes.concat(self.rnas[uid].nodes);
      self.graph.links = self.graph.links.concat(self.rnas[uid].links);
    } // Create a lookup table so that we can access each node
    // based on its uid. This will be used to create the links
    // between different RNAs


    var uidsToNodes = {};

    for (var i = 0; i < self.graph.nodes.length; i++) {
      uidsToNodes[self.graph.nodes[i].uid] = self.graph.nodes[i];
    }

    self.graph.links.forEach(function (link) {
      link.source = uidsToNodes[link.source.uid];
      link.target = uidsToNodes[link.target.uid];
    });

    for (i = 0; i < self.extraLinks.length; i++) {
      // the actual node objects may have changed, so we hae to recreate
      // the extra links based on the uids
      if (!(self.extraLinks[i].target.uid in uidsToNodes)) {
        console.log('not there:', self.extraLinks[i]);
        continue;
      }

      self.extraLinks[i].source = uidsToNodes[self.extraLinks[i].source.uid];
      self.extraLinks[i].target = uidsToNodes[self.extraLinks[i].target.uid];

      if (self.extraLinks[i].linkType == 'intermolecule') {
        //remove links to middle nodes
        var fakeLinks = self.graph.links.filter(function (d) {
          return (d.source == self.extraLinks[i].source || d.source == self.extraLinks[i].target || d.target == self.extraLinks[i].source || d.target == self.extraLinks[i].source) && d.linkType == 'fake';
        });

        for (var j = 0; j < fakeLinks.length; j++) {
          var linkIndex = self.graph.links.indexOf(fakeLinks[j]);
          self.graph.links.splice(linkIndex, 1);
        }
      }

      graph.links.push(self.extraLinks[i]);
    }
  };

  self.addNodes = function addNodes(json) {
    // add a new set of nodes from a json file
    // Resolve the sources and targets of the links so that they
    // are not just indeces into an array
    json.links.forEach(function (entry) {
      if (typeof entry.source == 'number') entry.source = json.nodes[entry.source];
      if (typeof entry.target == 'number') entry.target = json.nodes[entry.target];
    }); // Get the maximum x and y values of the current graph
    // so that we don't place a new structure on top of the
    // old one

    if (self.graph.nodes.length > 0) {
      maxX = d3__WEBPACK_IMPORTED_MODULE_2___default.a.max(self.graph.nodes.map(function (d) {
        return d.x;
      }));
      maxY = d3__WEBPACK_IMPORTED_MODULE_2___default.a.max(self.graph.nodes.map(function (d) {
        return d.y;
      }));
    } else {
      maxX = 0;
      maxY = 0;
    }

    json.nodes.forEach(function (entry) {
      if (!(entry.rna.uid in self.rnas)) {
        self.rnas[entry.rna.uid] = entry.rna;
      }

      entry.x += maxX; //entry.y += maxY;

      entry.px += maxX; //entry.py += maxY;
    });
    r = new _rnagraph_js__WEBPACK_IMPORTED_MODULE_5__["RNAGraph"]('', '');
    r.nodes = json.nodes;
    r.links = json.links; //self.addRNA(r);

    self.recalculateGraph();
    self.update();
    self.centerView();
  };

  self.addCustomColors = function addCustomColors(json) {
    // Add a json file containing the custom colors
    self.customColors = json;
  };

  self.addCustomColorsText = function (customColorsText) {
    var cs = new _rnautils_js__WEBPACK_IMPORTED_MODULE_6__["ColorScheme"](customColorsText);
    self.customColors = cs.colorsJson;
    self.changeColorScheme('custom');
  };

  self.clearNodes = function clearNodes() {
    self.graph.nodes = [];
    self.graph.links = [];
    self.rnas = {};
    self.extraLinks = [];
    self.update();
  };

  self.toJSON = function toJSON() {
    var data = {
      'rnas': self.rnas,
      'extraLinks': self.extraLinks
    };
    var dataString = JSON.stringify(data, function (key, value) {
      //remove circular references
      if (key == 'rna') {
        return;
      } else {
        return value;
      }
    }, '\t');
    return dataString;
  };

  self.fromJSON = function (jsonString) {
    var rnas, extraLinks;

    try {
      var data = JSON.parse(jsonString);
      rnas = data.rnas;
      extraLinks = data.extraLinks;
    } catch (err) {
      throw err;
    }

    for (var uid in rnas) {
      if (rnas[uid].type == 'rna') {
        r = new _rnagraph_js__WEBPACK_IMPORTED_MODULE_5__["RNAGraph"]();
        r.seq = rnas[uid].seq;
        r.dotbracket = rnas[uid].dotbracket;
        r.circular = rnas[uid].circular;
        r.pairtable = rnas[uid].pairtable;
        r.uid = rnas[uid].uid;
        r.structName = rnas[uid].structName;
        r.nodes = rnas[uid].nodes;
        r.links = rnas[uid].links;
        r.rnaLength = rnas[uid].rnaLength;
        r.elements = rnas[uid].elements;
        r.nucsToNodes = rnas[uid].nucsToNodes;
        r.pseudoknotPairs = rnas[uid].pseudoknotPairs;
      } else {
        r = new ProteinGraph();
        r.size = rnas[uid].size;
        r.nodes = rnas[uid].nodes;
        r.uid = rnas[uid].uid;
      }

      self.addRNAJSON(r, false);
    }

    extraLinks.forEach(function (link) {
      self.extraLinks.push(link);
    });
    self.recalculateGraph();
    self.update();
  };

  self.setSize = function () {
    if (self.options.initialSize != null) return;
    var svgH = d3__WEBPACK_IMPORTED_MODULE_2___default.a.select(element).node().offsetHeight;
    var svgW = d3__WEBPACK_IMPORTED_MODULE_2___default.a.select(element).node().offsetWidth;
    self.options.svgW = svgW;
    self.options.svgH = svgH; //Set the output range of the scales

    xScale.range([0, svgW]).domain([0, svgW]);
    yScale.range([0, svgH]).domain([0, svgH]); //re-attach the scales to the zoom behaviour

    self.zoomer.x(xScale).y(yScale);
    self.brusher.x(xScale).y(yScale);
    self.centerView();

    if (!self.options.resizeSvgOnResize) {
      return;
    } //resize the background

    /*
    rect.attr('width', svgW)
    .attr('height', svgH);
    */


    svg.attr('width', svgW).attr('height', svgH);
  };

  function changeColors(moleculeColors, d, scale) {
    if (moleculeColors.hasOwnProperty(d.num)) {
      var val = parseFloat(moleculeColors[d.num]);

      if (isNaN(val)) {
        // passed in color is not a scalar, so 
        // treat it as a color
        return moleculeColors[d.num];
      } else {
        // the user passed in a float, let's use a colormap
        // to convert it to a color
        return scale(val);
      }
    } else {
      return 'white';
    }
  }

  self.setOutlineColor = function (color) {
    var nodes = visNodes.selectAll('g.gnode').select('[node_type=nucleotide]');
    nodes.style('fill', color);
  };

  self.changeColorScheme = function (newColorScheme) {
    var proteinNodes = visNodes.selectAll('[node_type=protein]');
    proteinNodes.classed('protein', true).attr('r', function (d) {
      return d.radius;
    });
    var gnodes = visNodes.selectAll('g.gnode');
    var circles = visNodes.selectAll('g.gnode').selectAll('circle');
    var nodes = visNodes.selectAll('g.gnode').select('[node_type=nucleotide]');
    self.colorScheme = newColorScheme;

    if (newColorScheme == 'sequence') {
      var scale = d3__WEBPACK_IMPORTED_MODULE_2___default.a.scale.ordinal().range(['#dbdb8d', '#98df8a', '#ff9896', '#aec7e8', '#aec7e8']).domain(['A', 'C', 'G', 'U', 'T']);
      nodes.style('fill', function (d) {
        return scale(d.name);
      });
    } else if (newColorScheme == 'structure') {
      var scale = d3__WEBPACK_IMPORTED_MODULE_2___default.a.scale.category10().domain(['s', 'm', 'i', 'e', 't', 'h', 'x']).range(['lightgreen', '#ff9896', '#dbdb8d', 'lightsalmon', 'lightcyan', 'lightblue', 'transparent']);
      nodes.style('fill', function (d) {
        return scale(d.elemType);
      });
    } else if (newColorScheme == 'positions') {
      nodes.style('fill', function (d) {
        var scale = d3__WEBPACK_IMPORTED_MODULE_2___default.a.scale.linear().range(['#98df8a', '#dbdb8d', '#ff9896']).interpolate(d3__WEBPACK_IMPORTED_MODULE_2___default.a.interpolateLab).domain([1, 1 + (d.rna.rnaLength - 1) / 2, d.rna.rnaLength]);
        return scale(d.num);
      });
    } else if (newColorScheme == 'custom') {
      // scale to be used in case the user passes scalar
      // values rather than color names
      if (typeof self.customColors != 'undefined' && 'domain' in self.customColors && 'range' in self.customColors) {
        var scale = d3__WEBPACK_IMPORTED_MODULE_2___default.a.scale.linear().interpolate(d3__WEBPACK_IMPORTED_MODULE_2___default.a.interpolateLab).domain(self.customColors.domain).range(self.customColors.range);
      }

      nodes.style('fill', function (d) {
        if (typeof self.customColors == 'undefined' || !self.customColors.hasOwnProperty('colorValues')) {
          return 'white';
        }

        if (self.customColors.colorValues.hasOwnProperty(d.structName) && self.customColors.colorValues[d.structName].hasOwnProperty(d.num)) {
          // if a molecule name is specified, it supercedes the default colors
          // (for which no molecule name has been specified)
          var moleculeColors = self.customColors.colorValues[d.structName];
          return changeColors(moleculeColors, d, scale);
        } else if (self.customColors.colorValues.hasOwnProperty('')) {
          var _moleculeColors = self.customColors.colorValues[''];
          return changeColors(_moleculeColors, d, scale);
        }

        return 'white';
      });
    }
  };

  function mousedown() {}

  function mousemove() {
    if (!mousedownNode) return;
    var mpos = d3__WEBPACK_IMPORTED_MODULE_2___default.a.mouse(vis.node()); // update drag line

    dragLine.attr('x1', mousedownNode.x).attr('y1', mousedownNode.y).attr('x2', mpos[0]).attr('y2', mpos[1]);
  }

  function mouseup() {
    if (mousedownNode) {
      if (!linkContextMenuShown) dragLine.attr('class', 'drag_line_hidden');
    } // clear mouse event vars


    resetMouseVars(); //update()
  } //adapt size to window changes:


  window.addEventListener('resize', self.setSize, false);
  self.zoomer = d3__WEBPACK_IMPORTED_MODULE_2___default.a.behavior.zoom().scaleExtent([0.1, 10]).x(xScale).y(yScale).on('zoomstart', zoomstart).on('zoom', redraw);
  d3__WEBPACK_IMPORTED_MODULE_2___default.a.select(element).select('svg').remove();
  var svg = d3__WEBPACK_IMPORTED_MODULE_2___default.a.select(element).attr('tabindex', 1).on('keydown.brush', keydown).on('keyup.brush', keyup).each(function () {
    this.focus();
  }).append('svg:svg').attr('width', self.options.svgW).attr('height', self.options.svgH).attr('id', 'plotting-area');
  self.options.svg = svg;
  var svgGraph = svg.append('svg:g').on('mousemove', mousemove).on('mousedown', mousedown).on('mouseup', mouseup);
  if (self.options.allowPanningAndZooming) svgGraph.call(self.zoomer);
  if (self.options.editable) svgGraph.on('contextmenu', self.backgroundContextMenu);
  /*
  var rect = svgGraph.append('svg:rect')
  .attr('width', self.options.svgW)
  .attr('height', self.options.svgH)
  .attr('fill', 'white')
  //.attr('stroke', 'grey')
  //.attr('stroke-width', 1)
  //.attr('pointer-events', 'all')
  .attr('id', 'zrect');
  */

  var brush = svgGraph.append('g').datum(function () {
    return {
      selected: false,
      previouslySelected: false
    };
  }).attr('class', 'brush');
  var vis = svgGraph.append('svg:g');
  var visLinks = vis.append('svg:g');
  var visNodes = vis.append('svg:g');
  self.brusher = d3__WEBPACK_IMPORTED_MODULE_2___default.a.svg.brush().x(xScale).y(yScale).on('brushstart', function (d) {
    var gnodes = visNodes.selectAll('g.gnode').selectAll('.outline_node');
    gnodes.each(function (d) {
      d.previouslySelected = ctrlKeydown && d.selected;
    });
  }).on('brush', function () {
    var gnodes = visNodes.selectAll('g.gnode').selectAll('.outline_node');
    var extent = d3__WEBPACK_IMPORTED_MODULE_2___default.a.event.target.extent();
    gnodes.classed('selected', function (d) {
      return d.selected = self.options.applyForce && d.previouslySelected ^ (extent[0][0] <= d.x && d.x < extent[1][0] && extent[0][1] <= d.y && d.y < extent[1][1]);
    });
  }).on('brushend', function () {
    d3__WEBPACK_IMPORTED_MODULE_2___default.a.event.target.clear();
    d3__WEBPACK_IMPORTED_MODULE_2___default.a.select(this).call(d3__WEBPACK_IMPORTED_MODULE_2___default.a.event.target);
  });
  brush.call(self.brusher).on('mousedown.brush', null).on('touchstart.brush', null).on('touchmove.brush', null).on('touchend.brush', null);
  brush.select('.background').style('cursor', 'auto');

  function zoomstart() {
    var node = visNodes.selectAll('g.gnode').selectAll('.outline_node');
    node.each(function (d) {
      d.selected = false;
      d.previouslySelected = false;
    });
    node.classed('selected', false);
  }

  function redraw() {
    vis.attr('transform', 'translate(' + d3__WEBPACK_IMPORTED_MODULE_2___default.a.event.translate + ')' + ' scale(' + d3__WEBPACK_IMPORTED_MODULE_2___default.a.event.scale + ')');
  }

  self.getBoundingBoxTransform = function () {
    // Center the view on the molecule(s) and scale it so that everything
    // fits in the window
    //no molecules, nothing to do
    if (self.graph.nodes.length === 0) return {
      'translate': [0, 0],
      'scale': 1
    }; // Get the bounding box

    var minX = d3__WEBPACK_IMPORTED_MODULE_2___default.a.min(self.graph.nodes.map(function (d) {
      return d.x;
    }));
    var minY = d3__WEBPACK_IMPORTED_MODULE_2___default.a.min(self.graph.nodes.map(function (d) {
      return d.y;
    }));
    var maxX = d3__WEBPACK_IMPORTED_MODULE_2___default.a.max(self.graph.nodes.map(function (d) {
      return d.x;
    }));
    var maxY = d3__WEBPACK_IMPORTED_MODULE_2___default.a.max(self.graph.nodes.map(function (d) {
      return d.y;
    }));
    var maxRadius = d3__WEBPACK_IMPORTED_MODULE_2___default.a.max(self.graph.nodes.map(function (d) {
      return d.radius;
    })); // The width and the height of the molecule

    var molWidth = maxX - minX;
    var molHeight = maxY - minY; // how much larger the drawing area is than the width and the height

    var widthRatio = self.options.svgW / (molWidth + 1);
    var heightRatio = self.options.svgH / (molHeight + 1); // we need to fit it in both directions, so we scale according to
    // the direction in which we need to shrink the most

    var minRatio = Math.min(widthRatio, heightRatio, self.options.maxNodeRadius / maxRadius) * 0.8; // the new dimensions of the molecule

    var newMolWidth = molWidth * minRatio;
    var newMolHeight = molHeight * minRatio; // translate so that it's in the center of the window

    var xTrans = -minX * minRatio + (self.options.svgW - newMolWidth) / 2;
    var yTrans = -minY * minRatio + (self.options.svgH - newMolHeight) / 2;
    return {
      'translate': [xTrans, yTrans],
      'scale': minRatio
    };
  };

  self.centerView = function (duration) {
    if (arguments.length === 0) duration = 0;
    var bbTransform = self.getBoundingBoxTransform();
    if (bbTransform === null) return; // do the actual moving

    vis.transition().attr('transform', 'translate(' + bbTransform.translate + ')' + ' scale(' + bbTransform.scale + ')').duration(duration); // tell the zoomer what we did so that next we zoom, it uses the
    // transformation we entered here

    self.zoomer.translate(bbTransform.translate);
    self.zoomer.scale(bbTransform.scale);
  };

  self.force = d3__WEBPACK_IMPORTED_MODULE_2___default.a.layout.force().charge(function (d) {
    if (d.nodeType == 'middle') {
      return self.options.middleCharge;
    } else return self.options.otherCharge;
  }).friction(self.options.friction).linkDistance(function (d) {
    return self.options.linkDistanceMultiplier * d.value;
  }).linkStrength(function (d) {
    if (d.linkType in self.linkStrengths) {
      return self.linkStrengths[d.linkType];
    } else {
      return self.linkStrengths.other;
    }
  }).gravity(0.000).nodes(self.graph.nodes).links(self.graph.links).chargeDistance(self.options.chargeDistance).size([self.options.svgW, self.options.svgH]); // line displayed when dragging new nodes

  var dragLine = vis.append('line').attr('class', 'drag_line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', 0);

  function resetMouseVars() {
    mousedownNode = null;
    mouseupNode = null;
    mousedownLink = null;
  }

  var shiftKeydown = false;
  var ctrlKeydown = false;

  function selectedNodes(mouseDownNode) {
    var gnodes = visNodes.selectAll('g.gnode');

    if (ctrlKeydown) {
      return gnodes.filter(function (d) {
        return d.selected;
      }); //return d3.selectAll('[struct_name=' + mouseDownNode.struct_name + ']');
    } else {
      return gnodes.filter(function (d) {
        return d.selected;
      }); //return d3.select(this);
    }
  }

  function dragstarted(d) {
    d3__WEBPACK_IMPORTED_MODULE_2___default.a.event.sourceEvent.stopPropagation();

    if (!d.selected && !ctrlKeydown) {
      // if this node isn't selected, then we have to unselect every other node
      var node = visNodes.selectAll('g.gnode').selectAll('.outline_node');
      node.classed('selected', function (p) {
        return p.selected = self.options.applyForce && (p.previouslySelected = false);
      });
    }

    d3__WEBPACK_IMPORTED_MODULE_2___default.a.select(this).select('.outline_node').classed('selected', function (p) {
      d.previouslySelected = d.selected;
      return d.selected = self.options.applyForce && true;
    });
    var toDrag = selectedNodes(d);
    toDrag.each(function (d1) {
      d1.fixed |= 2;
    }); //d3.event.sourceEvent.stopPropagation();
    //d3.select(self).classed('dragging', true);
    //
  }

  function dragged(d) {
    var toDrag = selectedNodes(d);
    toDrag.each(function (d1) {
      d1.x += d3__WEBPACK_IMPORTED_MODULE_2___default.a.event.dx;
      d1.y += d3__WEBPACK_IMPORTED_MODULE_2___default.a.event.dy;
      d1.px += d3__WEBPACK_IMPORTED_MODULE_2___default.a.event.dx;
      d1.py += d3__WEBPACK_IMPORTED_MODULE_2___default.a.event.dy;
    });
    self.resumeForce();
    d3__WEBPACK_IMPORTED_MODULE_2___default.a.event.sourceEvent.preventDefault();
  }

  self.resumeForce = function () {
    if (self.animation) self.force.resume();
  };

  function dragended(d) {
    var toDrag = selectedNodes(d);
    toDrag.each(function (d1) {
      d1.fixed &= ~6;
    });
  }

  function collide(node) {
    var r = node.radius + 16,
        nx1 = node.x - r,
        nx2 = node.x + r,
        ny1 = node.y - r,
        ny2 = node.y + r;
    return function (quad, x1, y1, x2, y2) {
      if (quad.point && quad.point !== node) {
        var x = node.x - quad.point.x,
            y = node.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = node.radius + quad.point.radius;

        if (l < r) {
          l = (l - r) / l * 0.1;
          node.x -= x *= l;
          node.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }

      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    };
  }

  var drag = d3__WEBPACK_IMPORTED_MODULE_2___default.a.behavior.drag() //.origin(function(d) { return d; })
  .on('dragstart', dragstarted).on('drag', dragged).on('dragend', dragended);

  function keydown() {
    if (self.deaf) // lalalalal, not listening
      return;
    if (shiftKeydown) return;

    switch (d3__WEBPACK_IMPORTED_MODULE_2___default.a.event.keyCode) {
      case 68:
        //'d' key
        console.log('dotbracket:', self.getStructuresDotBracket());
        break;

      case 16:
        shiftKeydown = true;
        break;

      case 17:
        ctrlKeydown = true;
        break;

      case 67:
        //c
        self.centerView();
        break;
    }

    if (shiftKeydown || ctrlKeydown) {
      svgGraph.call(self.zoomer).on('mousedown.zoom', null).on('touchstart.zoom', null).on('touchmove.zoom', null).on('touchend.zoom', null); //svgGraph.on('zoom', null);

      vis.selectAll('g.gnode').on('mousedown.drag', null);
    }

    if (ctrlKeydown) {
      brush.select('.background').style('cursor', 'crosshair');
      brush.call(self.brusher);
    }
  }

  function keyup() {
    shiftKeydown = false;
    ctrlKeydown = false;
    brush.call(self.brusher).on('mousedown.brush', null).on('touchstart.brush', null).on('touchmove.brush', null).on('touchend.brush', null);
    brush.select('.background').style('cursor', 'auto');
    svgGraph.call(self.zoomer);
    vis.selectAll('g.gnode').call(drag);
  }

  d3__WEBPACK_IMPORTED_MODULE_2___default.a.select(element).on('keydown', keydown).on('keyup', keyup).on('contextmenu', function () {
    d3__WEBPACK_IMPORTED_MODULE_2___default.a.event.preventDefault();
  });

  var linkKey = function linkKey(d) {
    return d.uid;
  };

  var nodeKey = function nodeKey(d) {
    var key = d.uid;
    return key;
  };

  var updateRnaGraph = function updateRnaGraph(r) {
    var nucleotidePositions = r.getPositions('nucleotide');
    var labelPositions = r.getPositions('label');
    var uids = r.getUids();
    r.recalculateElements().elementsToJson().addPseudoknots().addPositions('nucleotide', nucleotidePositions).addUids(uids).addLabels(1, self.options.labelInterval).addPositions('label', labelPositions).reinforceStems().reinforceLoops().updateLinkUids();
  };

  var removeBackBoneLink = function removeBackBoneLink(d) {
    if (d.target.num - d.source.num != 1) {
      console.log('ERROR: non adjacent nodes. Target:', d.target, 'Source:', d.source, 'Link:', d);
      return;
    }

    var rna = d.target.rna;
    var toRemove = [];

    for (var i = 0; i < rna.links.length; i++) {
      var _link = rna.links[i];
      if (_link.linkType != 'basepair') continue;

      if (_link.source.num <= d.source.num && _link.target.num >= d.target.num) {
        console.log('crossing basepair', _link);
        toRemove.push(_link);
      }
    } // Remove all base pairs that are between these two nodes and add them as extra
    // links


    console.log('toRemove:', toRemove);

    for (var _i = 0; _i < toRemove.length; _i++) {
      rna.pairtable[toRemove[_i].source.num] = 0;
      rna.pairtable[toRemove[_i].target.num] = 0;
      toRemove[_i].from = toRemove[_i].source.num;
      toRemove[_i].to = toRemove[_i].target.num - d.source.num;
    } // extract the dotbracket string of the rna
    // cut it at the position of this backbone bond


    var sequence = rna.seq;
    var sequence1 = rna.seq.slice(0, d.source.num);
    var sequence2 = rna.seq.slice(d.source.num);
    var rnaDotBracket = _rnautils_js__WEBPACK_IMPORTED_MODULE_6__["rnaUtilities"].pairtableToDotbracket(rna.pairtable);
    var dotBracket1 = rnaDotBracket.slice(0, d.source.num);
    var dotBracket2 = rnaDotBracket.slice(d.source.num); // get the nucleotide positions
    // cut them at the positions of the backbone bond

    var positions = rna.getPositions('nucleotide');
    var uids = rna.getUids();
    var positions1 = positions.slice(0, d.source.num);
    var positions2 = positions.slice(d.source.num);
    var uids1 = uids.slice(0, d.source.num);
    var uids2 = uids.slice(d.source.num);
    console.log('positions1:', positions1);
    console.log('positions2:', positions2);
    delete self.rnas[rna.uid];
    var rna1 = self.addRNA(dotBracket1, {
      'sequence': sequence1,
      'positions': positions1,
      'uids': uids1
    });
    var rna2 = self.addRNA(dotBracket2, {
      'sequence': sequence2,
      'positions': positions2,
      'uids': uids2
    });

    for (var _i2 = 0; _i2 < toRemove.length; _i2++) {
      console.log('rna1:', rna1);
      console.log('rna2:', rna2);
      console.log('toRemove[i]', toRemove[_i2]);
      self.extraLinks.push({
        'source': rna1.nodes[toRemove[_i2].from - 1],
        'target': rna2.nodes[toRemove[_i2].to - 1],
        'value': 1,
        'uid': slugid__WEBPACK_IMPORTED_MODULE_3___default.a.nice(),
        'linkType': 'intermolecule'
      });
      self.recalculateGraph();
      self.update();
    }

    console.log('self.extraLinks:', self.extraLinks); //self.extraLinks.push({'source': rna1.nodes[
    // create two new rnas
    // add their positions
    // add them back to the plot
  };

  var removeLink = function removeLink(d) {
    // remove a link between two nodes
    var index = self.graph.links.indexOf(d);
    console.log('removing link:', index);

    if (index > -1) {
      //remove a link
      //graph.links.splice(index, 1);
      // there should be two cases
      // 1. The link is within a single molecule
      if (d.source.rna == d.target.rna) {
        if (d.linkType == 'backbone') {
          console.log('trying to remove a backbone link', d.source.num, d.target.num);
          removeBackBoneLink(d);
          return;
        } else {
          var r = d.source.rna;
          r.addPseudoknots();
          r.pairtable[d.source.num] = 0;
          r.pairtable[d.target.num] = 0;
          updateRnaGraph(r);
        }
      } else {
        // 2. The link is between two different molecules
        var extraLinkIndex = self.extraLinks.indexOf(d);
        self.extraLinks.splice(extraLinkIndex, 1);
      }

      self.recalculateGraph();
    }

    self.update();
  };

  var linkClick = function linkClick(d) {
    if (!shiftKeydown) {
      return;
    }

    var invalidLinks = {
      //'backbone': true,
      'fake': true,
      'fake_fake': true,
      'label_link': true
    };
    console.log('d.linkType:', d.linkType);
    if (d.linkType in invalidLinks) return;
    removeLink(d);
  };

  self.getStructuresDotBracket = function () {
    console.log('self.rnas:', self.rnas);
    var sequence = [];
    var currIdx = 1;
    var nodeIdxs = {};
    var breaks = [];
    var pairtable = []; // add the nodes

    for (var uid in self.rnas) {
      var rna = self.rnas[uid];

      for (var j = 0; j < rna.nodes.length; j++) {
        var _node = rna.nodes[j];
        if (_node.nodeType != 'nucleotide') continue;
        console.log('node:', _node);
        nodeIdxs[_node.uid] = currIdx;
        currIdx += 1;
        sequence.push(_node.name);
      }

      breaks.push(currIdx);
    }

    pairtable = [currIdx - 1];

    for (var i = 0; i < currIdx; i++) {
      pairtable.push(0);
    } // add the links


    for (var _uid in self.rnas) {
      var _rna = self.rnas[_uid];

      for (var _j = 0; _j < _rna.links.length; _j++) {
        var _link2 = _rna.links[_j];
        if (_link2.linkType != 'basepair') continue;
        var idx1 = nodeIdxs[_link2.source.uid];
        var idx2 = nodeIdxs[_link2.target.uid];
        pairtable[idx1] = idx2;
        pairtable[idx2] = idx1;
      }
    }

    for (var _i3 = 0; _i3 < self.extraLinks.length; _i3++) {
      var _link3 = self.extraLinks[_i3];
      var _idx = nodeIdxs[_link3.source.uid];
      var _idx2 = nodeIdxs[_link3.target.uid];
      pairtable[_idx] = _idx2;
      pairtable[_idx2] = _idx;
    }

    var structure = _rnautils_js__WEBPACK_IMPORTED_MODULE_6__["rnaUtilities"].pairtableToDotbracket(pairtable).split('');

    for (var _i4 = 0; _i4 < breaks.length - 1; _i4++) {
      console.log('breaks[i]:', breaks[_i4]);
      sequence.splice(breaks[_i4] + _i4 - 1, 0, '&');
      structure.splice(breaks[_i4] + _i4 - 1, 0, '&');
    }

    console.log('sequence:', sequence, sequence.join(''));
    console.log('structure:', structure, structure.join(''));
    return [sequence.join(''), structure.join('')];
  };

  self.addBackBoneLink = function (newLink) {
    // opposite of deleting a link
    // get the two dotbracket strings
    var rna1 = newLink.source.rna;
    var rna2 = newLink.target.rna;
    var dotbracket1 = _rnautils_js__WEBPACK_IMPORTED_MODULE_6__["rnaUtilities"].pairtableToDotbracket(rna1.pairtable);
    var dotbracket2 = _rnautils_js__WEBPACK_IMPORTED_MODULE_6__["rnaUtilities"].pairtableToDotbracket(rna2.pairtable);
    var seq1 = newLink.source.rna.seq;
    var seq2 = newLink.target.rna.seq;
    var positions1 = rna1.getPositions('nucleotide');
    var positions2 = rna2.getPositions('nucleotide'); // concatenate them

    var newDotbracket = dotbracket1 + dotbracket2;
    var newSeq = seq1 + seq2;
    var newPositions = positions1.concat(positions2);
    var toAddInternal = [];
    var toAddExternal = [];
    var toDelete = {};

    for (var i = 0; i < self.extraLinks.length; i++) {
      console.log('self.extraLinks[i]', self.extraLinks[i]);
      console.log('rna1:', rna1);
      console.log('rna2:', rna2);

      if (self.extraLinks[i].source.rna == rna1) {
        if (self.extraLinks[i].target.rna == rna2) {// both ends of the extra link are within what will become the new molecule
          // need to be added as base pairs afterwards
          //self.extraLinks[i].from = self.extraLinks[i].source.num;
          //self.extraLinks[i].to = dotbracket1.length + self.extraLinks[i].target.num;
          //toAddInternal.push(self.extraLinks[i]);
        } else {
          // only one end of the extra link is within what will become the newly
          // created molecule, needs to remain an extra link
          // source will always be the unchanged molecule, whereas target will be 
          // the newly created one
          toAddExternal.push({
            'source': self.extraLinks[i].target,
            'target': self.extraLinks[i].source.num
          });
          toDelete[self.extraLinks[i].uid] = true;
        }
      } else if (self.extraLinks[i].source.rna == rna2) {
        if (self.extraLinks[i].target.rna == rna1) {// add internal link
          // both ends of the extra link are within what will become the new molecule
          // need to be added as base pairs afterwards
          //self.extraLinks[i].from = self.extraLinks[i].target.num;
          //self.extraLinks[i].to = dotbracket1.length + self.extraLinks[i].source.num;
          //toAddInternal.push(self.extraLinks[i]);
        } else {
          toAddExternal.push({
            'source': self.extraLinks[i].target,
            'target': self.extraLinks[i].source.num + dotbracket1.length
          });
          toDelete[self.extraLinks[i].uid] = true;
        }
      }

      if (self.extraLinks[i].target.rna == rna1) {
        if (self.extraLinks[i].source.rna == rna2) {// covered in previous if statement
        } else {
          // only one end of the extra link is within what will become the newly
          // created molecule, needs to remain an extra link
          toAddExternal.push({
            'source': self.extraLinks[i].source,
            'target': self.extraLinks[i].target.num
          });
          toDelete[self.extraLinks[i].uid] = true;
        }
      } else if (self.extraLinks[i].target.rna == rna2) {
        if (self.extraLinks[i].source.rna == rna1) {
          toAddExternal.push({
            'source': self.extraLinks[i].source,
            'target': self.extraLinks[i].target.num + dotbracket1.length
          });
          toDelete[self.extraLinks[i].uid] = true;
        }
      }
    }

    self.extraLinks = self.extraLinks.filter(function (e) {
      return !(e.uid in toDelete);
    });
    delete self.rnas[rna1.uid];
    delete self.rnas[rna2.uid];
    var newRna = null; // create a new RNA

    if (self.options.applyForce) newRna = self.addRNA(newDotbracket, {
      'sequence': newSeq,
      'positions': newPositions,
      'centerView': false
    });else newRna = self.addRNA(newDotbracket, {
      'sequence': newSeq,
      'centerView': false
    }); // add new external links

    for (var _i5 = 0; _i5 < toAddExternal.length; _i5++) {
      self.extraLinks.push({
        'source': toAddExternal[_i5].source,
        'target': newRna.nodes[toAddExternal[_i5].target - 1],
        'value': 1,
        'uid': slugid__WEBPACK_IMPORTED_MODULE_3___default.a.nice(),
        'linkType': 'intermolecule'
      });
    }

    self.recalculateGraph();
    self.update();
    console.log('self.extraLinks:', self.extraLinks);
  };

  self.addLink = function (newLink) {
    // this means we have a new json, which means we have
    // to recalculate the structure and change the colors
    // appropriately
    //
    console.log('adding new link');

    if (newLink.source.rna == newLink.target.rna) {
      // must be a basepair
      var _r = newLink.source.rna;
      _r.pairtable[newLink.source.num] = newLink.target.num;
      _r.pairtable[newLink.target.num] = newLink.source.num;
      updateRnaGraph(_r);
    } else {
      //Add an extra link
      console.log('intermolecule');
      newLink.linkType = 'intermolecule';
      self.extraLinks.push(newLink);
    }

    self.recalculateGraph();
    self.update();
  };

  var nodeMouseclick = function nodeMouseclick(d) {
    if (d3__WEBPACK_IMPORTED_MODULE_2___default.a.event.defaultPrevented) return;

    if (!ctrlKeydown) {
      //if the shift key isn't down, unselect everything
      var node = visNodes.selectAll('g.gnode').selectAll('.outline_node');
      node.classed('selected', function (p) {
        return p.selected = self.options.applyForce && (p.previouslySelected = false);
      });
    } // always select this node


    d3__WEBPACK_IMPORTED_MODULE_2___default.a.select(this).select('circle').classed('selected', d.selected = self.options.applyForce && !d.previouslySelected);
    d3__WEBPACK_IMPORTED_MODULE_2___default.a.event.stopPropagation();
  };

  var nodeMouseup = function nodeMouseup(d, i) {
    var backbonePossible = true,
        basepairPossible = true;

    if (mousedownNode) {
      mouseupNode = d; // if the node isn't a nucleotide, we can't create a link

      if (mouseupNode.nodeType == 'middle' || mousedownNode.nodeType == 'middle' || mouseupNode.nodeType == 'label' || mousedownNode.nodeType == 'label') return;

      if (mouseupNode == mousedownNode) {
        resetMouseVars();
        return;
      }

      var newLink = {
        source: mousedownNode,
        target: mouseupNode,
        linkType: 'basepair',
        value: 1,
        uid: slugid__WEBPACK_IMPORTED_MODULE_3___default.a.nice()
      };

      for (var _i6 = 0; _i6 < self.graph.links.length; _i6++) {
        if (self.graph.links[_i6].source == mousedownNode || self.graph.links[_i6].target == mousedownNode || self.graph.links[_i6].source == mouseupNode || self.graph.links[_i6].target == mouseupNode) {
          // either one of the nodes is already in a link
          // if any of the nodes are already involved in a basepair or a pseudoknot
          // then we can't make a basepair link
          if (self.graph.links[_i6].linkType == 'basepair' || self.graph.links[_i6].linkType == 'pseudoknot' || self.graph.links[_i6].linkType == 'intermolecule') {
            // although should be able to make a backbone link
            console.log('no basepair possible');
            basepairPossible = false;
          }
        }

        if (self.graph.links[_i6].source == mouseupNode && self.graph.links[_i6].target == mousedownNode || self.graph.links[_i6].source == mousedownNode && self.graph.links[_i6].target == mouseupNode) {
          // if we're trying to make a link between two nodes which already have
          // a backbone between them, then we can't make a link
          if (self.graph.links[_i6].linkType == 'backbone') {
            return;
          }
        }
      }

      if (newLink.source.rna != newLink.target.rna) {
        // could be either a backbone link or an intermolecule link
        if (newLink.source.num == 1 && newLink.target.num == newLink.target.rna.rnaLength || newLink.target.num == 1 && newLink.source.num == newLink.source.rna.rnaLength) {
          //
          var linkMenu = [{
            title: 'Backbone Link',
            action: function action(elm, d, i) {
              linkContextMenuShown = false;
              console.log('Item #1 clicked!');
              console.log('The data for this circle is: ' + d);
              dragLine.attr('class', 'drag_line_hidden');
              self.addBackBoneLink(newLink);
            },
            disabled: false // optional, defaults to false

          }, {
            title: 'Basepair Link',
            action: function action(elm, d, i) {
              linkContextMenuShown = false;
              console.log('You have clicked the second item!');
              console.log('The data for this circle is: ' + d);
              dragLine.attr('class', 'drag_line_hidden');
              self.addLink(newLink);
            }
          }];
          linkContextMenuShown = true;
          var linkContextMenu = Object(_d3_context_menu_js__WEBPACK_IMPORTED_MODULE_4__["contextMenu"])(linkMenu);
          console.log('newLinkMenu');
          linkContextMenu.apply(this, [d, i, true, function () {
            dragLine.attr('class', 'drag_line_hidden');
          }]);
        } else {
          // between end points but can't make a backbone
          if (basepairPossible) self.addLink(newLink);
        }
      } else {
        if (basepairPossible) self.addLink(newLink);
      }
    }
  };

  var nodeMousedown = function nodeMousedown(d) {
    if (!d.selected && !ctrlKeydown) {
      // if this node isn't selected, then we have to unselect every other node
      var node = visNodes.selectAll('g.gnode').selectAll('.outline_node');
      node.classed('selected', function (p) {
        return p.selected = p.previouslySelected = false;
      });
    }

    d3__WEBPACK_IMPORTED_MODULE_2___default.a.select(this).classed('selected', function (p) {
      d.previouslySelected = d.selected;
      return d.selected = self.options.applyForce && true;
    });

    if (!shiftKeydown) {
      return;
    }

    mousedownNode = d;
    dragLine.attr('class', 'drag_line').attr('x1', mousedownNode.x).attr('y1', mousedownNode.y).attr('x2', mousedownNode.x).attr('y2', mousedownNode.y); //gnodes.attr('pointer-events',  'none');
  };

  self.startAnimation = function () {
    self.animation = true;
    vis.selectAll('g.gnode').call(drag);
    self.force.start();
  };

  self.stopAnimation = function () {
    self.animation = false;
    vis.selectAll('g.gnode').on('mousedown.drag', null);
    self.force.stop();
  };

  self.setFriction = function (value) {
    self.force.friction(value);
    self.resumeForce();
  };

  self.setCharge = function (value) {
    self.force.charge(value);
    self.resumeForce();
  };

  self.setGravity = function (value) {
    self.force.gravity(value);
    self.resumeForce();
  };

  self.setPseudoknotStrength = function (value) {
    self.linkStrengths.pseudoknot = value;
    self.update();
  };

  self.displayBackground = function (value) {
    self.displayParameters.displayBackground = value;
    self.updateStyle();
  };

  self.displayNumbering = function (value) {
    self.displayParameters.displayNumbering = value;
    self.updateStyle();
  };

  self.displayNodeOutline = function (value) {
    self.displayParameters.displayNodeOutline = value;
    self.updateStyle();
  };

  self.displayNodeLabel = function (value) {
    self.displayParameters.displayNodeLabel = value;
    self.updateStyle();
  };

  self.displayLinks = function (value) {
    self.displayParameters.displayLinks = value;
    self.updateStyle();
  };

  self.displayPseudoknotLinks = function (value) {
    self.displayParameters.displayPseudoknotLinks = value;
    self.updateStyle();
  };

  self.displayProteinLinks = function (value) {
    self.displayParameters.displayProteinLinks = value;
    self.updateStyle();
  };

  self.updateStyle = function () {
    // Background
    //rect.classed('transparent', !self.displayParameters.displayBackground);
    // Numbering
    visNodes.selectAll('[node_type=label]').classed('transparent', !self.displayParameters.displayNumbering);
    visNodes.selectAll('[label_type=label]').classed('transparent', !self.displayParameters.displayNumbering);
    visLinks.selectAll('[linkType=label_link]').classed('transparent', !self.displayParameters.displayNumbering); // Node Outline

    svg.selectAll('circle').classed('hidden_outline', !self.displayParameters.displayNodeOutline); // Node Labels

    visNodes.selectAll('[label_type=nucleotide]').classed('transparent', !self.displayParameters.displayNodeLabel); // Links

    svg.selectAll('[link_type=real],[link_type=basepair],[link_type=backbone],[link_type=pseudoknot],[link_type=protein_chain],[link_type=chain_chain],[link_type=external]').classed('transparent', !self.displayParameters.displayLinks); // Pseudoknot Links

    svg.selectAll('[link_type=pseudoknot]').classed('transparent', !self.displayParameters.displayPseudoknotLinks); // Protein Links

    svg.selectAll('[link_type=protein_chain]').classed('transparent', !self.displayParameters.displayProteinLinks); // Fake Links

    visLinks.selectAll('[link_type=fake]').classed('transparent', !self.options.displayAllLinks);
    visLinks.selectAll('[link_type=fake_fake]').classed('transparent', !self.options.displayAllLinks);
  };

  function nudge(dx, dy) {
    node.filter(function (d) {
      return d.selected;
    }).attr('cx', function (d) {
      return d.x += dx;
    }).attr('cy', function (d) {
      return d.y += dy;
    });
    link.filter(function (d) {
      return d.source.selected;
    }).attr('x1', function (d) {
      return d.source.x;
    }).attr('y1', function (d) {
      return d.source.y;
    });
    link.filter(function (d) {
      return d.target.selected;
    }).attr('x2', function (d) {
      return d.target.x;
    }).attr('y2', function (d) {
      return d.target.y;
    });
    d3__WEBPACK_IMPORTED_MODULE_2___default.a.event.preventDefault();
  }

  self.createNewLinks = function (linksEnter) {
    var linkLines = linksEnter.append('svg:line');
    linkLines.append('svg:title').text(linkKey);
    linkLines.classed('link', true).attr('x1', function (d) {
      return d.source.x;
    }).attr('y1', function (d) {
      return d.source.y;
    }).attr('x2', function (d) {
      return d.target.x;
    }).attr('y2', function (d) {
      return d.target.y;
    }).attr('link_type', function (d) {
      return d.linkType;
    }).attr('class', function (d) {
      return d3__WEBPACK_IMPORTED_MODULE_2___default.a.select(this).attr('class') + ' ' + d.linkType;
    }).attr('pointer-events', function (d) {
      if (d.linkType == 'fake') return 'none';else return 'all';
    });
    /* We don't need to update the positions of the stabilizing links */

    /*
    basepairLinks = visLinks.selectAll('[link_type=basepair]');
    basepairLinks.classed('basepair', true);
     fakeLinks = visLinks.selectAll('[link_type=fake]')
    fakeLinks.classed('fake', true);
     intermolecule_links = vis_links.selectAll('[link_type=intermolecule]');
    intermolecule_links.classed('intermolecule', true);
     plink = vis_links.selectAll('[link_type=protein_chain],[link_type=chain_chain]');
    plink.classed('chain_chain', true);
    */

    return linkLines;
  };

  self.createNewNodes = function (gnodesEnter) {
    gnodesEnter = gnodesEnter.append('g').classed('noselect', true).classed('gnode', true).attr('struct_name', function (d) {
      return d.structName;
    }).attr('transform', function (d) {
      if (typeof d.x != 'undefined' && typeof d.y != 'undefined') return 'translate(' + [d.x, d.y] + ')';else return '';
    }).each(function (d) {
      d.selected = d.previouslySelected = false;
    });
    gnodesEnter.call(drag).on('mousedown', nodeMousedown).on('mousedrag', function (d) {}).on('mouseup', nodeMouseup).attr('num', function (d) {
      return 'n' + d.num;
    }).attr('rnum', function (d) {
      return 'n' + (d.rna.rnaLength - d.num + 1);
    }).on('click', nodeMouseclick).on('contextmenu', self.nodeContextMenu).transition().duration(750).ease('elastic'); // create nodes behind the circles which will serve to highlight them

    var labelAndProteinNodes = gnodesEnter.filter(function (d) {
      return d.nodeType == 'label' || d.nodeType == 'protein';
    });
    var nucleotideNodes = gnodesEnter.filter(function (d) {
      return d.nodeType == 'nucleotide';
    });
    labelAndProteinNodes.append('svg:circle').attr('class', 'outline_node').attr('r', function (d) {
      return d.radius + 1;
    });
    nucleotideNodes.append('svg:circle').attr('class', 'outline_node').attr('r', function (d) {
      return d.radius + 1;
    });
    labelAndProteinNodes.append('svg:circle').attr('class', 'node').classed('label', function (d) {
      return d.nodeType == 'label';
    }).attr('r', function (d) {
      if (d.nodeType == 'middle') return 0;else {
        return d.radius;
      }
    }).attr('node_type', function (d) {
      return d.nodeType;
    }).attr('node_num', function (d) {
      return d.num;
    });
    nucleotideNodes.append('svg:circle').attr('class', 'node').attr('node_type', function (d) {
      return d.nodeType;
    }).attr('node_num', function (d) {
      return d.num;
    }).attr('r', function (d) {
      return d.radius;
    }).append('svg:title').text(function (d) {
      if (d.nodeType == 'nucleotide') {
        return d.structName + ':' + d.num;
      } else {
        return '';
      }
    });
    nucleotideNodes.append('svg:path').attr('class', 'node').attr('node_type', function (d) {
      return d.nodeType;
    }).attr('node_num', function (d) {
      return d.num;
    }).append('svg:title').text(function (d) {
      if (d.nodeType == 'nucleotide') {
        return d.structName + ':' + d.num;
      } else {
        return '';
      }
    });
    var labelsEnter = gnodesEnter.append('text').text(function (d) {
      return d.name;
    }).attr('text-anchor', 'middle').attr('font-size', 8.0).attr('font-weight', 'bold').attr('y', 2.5).attr('class', 'node-label').attr('label_type', function (d) {
      return d.nodeType;
    });
    /*
    labelsEnter.text(function(d) {
        return d.num;
    });
    */

    labelsEnter.append('svg:title').text(function (d) {
      if (d.nodeType == 'nucleotide') {
        return d.structName + ':' + d.num;
      } else {
        return '';
      }
    });
    return gnodesEnter;
  };

  var nodeTooltip = function nodeTooltip(d) {
    nodeTooltips = {};
    nodeTooltips.nucleotide = d.num;
    nodeTooltips.label = '';
    nodeTooltips.pseudo = '';
    nodeTooltips.middle = '';
    nodeTooltips.protein = d.structName;
    return nodeTooltips[d.nodeType];
  };

  self.update = function () {
    self.force.nodes(self.graph.nodes).links(self.graph.links);

    if (self.animation) {
      self.force.start();
    }

    var allLinks = visLinks.selectAll('line.link').data(self.graph.links.filter(realLinkFilter), linkKey);
    allLinks.attr('class', '').classed('link', true).attr('link_type', function (d) {
      return d.linkType;
    }).attr('class', function (d) {
      return d3__WEBPACK_IMPORTED_MODULE_2___default.a.select(this).attr('class') + ' ' + d.linkType;
    });
    var linksEnter = allLinks.enter();
    self.createNewLinks(linksEnter);
    allLinks.exit().remove();
    var domain = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var colors = d3__WEBPACK_IMPORTED_MODULE_2___default.a.scale.category10().domain(domain);
    var gnodes = visNodes.selectAll('g.gnode').data(self.graph.nodes, nodeKey); //.attr('pointer-events', 'all');

    var gnodesEnter = gnodes.enter();
    self.createNewNodes(gnodesEnter);
    gnodes.exit().remove(); //fake_nodes = self.graph.nodes.filter(function(d) { return d.nodeType == 'middle'; });
    //fakeNodes = self.graph.nodes.filter(function(d) { return true; });

    var realNodes = self.graph.nodes.filter(function (d) {
      return d.nodeType == 'nucleotide' || d.nodeType == 'label';
    });
    var xlink;
    if (self.displayFakeLinks) xlink = allLinks;else xlink = visLinks.selectAll('[link_type=real],[link_type=pseudoknot],[link_type=protein_chain],[link_type=chain_chain],[link_type=label_link],[link_type=backbone],[link_type=basepair],[link_type=intermolecule],[link_type=external]');
    var position;
    gnodes.selectAll('path').each(positionAnyNode);
    xlink.on('click', linkClick);
    self.force.on('tick', function () {
      var q = d3__WEBPACK_IMPORTED_MODULE_2___default.a.geom.quadtree(realNodes);
      var i = 0;
      var n = realNodes.length;

      while (++i < n) {
        q.visit(collide(realNodes[i]));
      }

      xlink.attr('x1', function (d) {
        return d.source.x;
      }).attr('y1', function (d) {
        return d.source.y;
      }).attr('x2', function (d) {
        return d.target.x;
      }).attr('y2', function (d) {
        return d.target.y;
      }); // Translate the groups

      gnodes.attr('transform', function (d) {
        return 'translate(' + [d.x, d.y] + ')';
      });
      gnodes.select('path').each(positionAnyNode);
    });
    self.force.on('end', function () {
      gnodes.selectAll('[node_type=nucleotide]').filter(function (d, i) {
        if (i == 0) return true;else return false;
      }).each(function (d, i) {//console.log("pos", d.num, d.x, d.y);
      });

      for (var uid in self.rnas) {
        for (var i = 1; i < self.rnas[uid].pairtable[0]; i++) {//console.log('pt', i, self.rnas[uid].pairtable[i]);
        }
      }
    });
    self.changeColorScheme(self.colorScheme);

    if (self.animation) {
      self.force.start();
    }

    self.updateStyle();
  };

  self.setSize();
}
/************************* END FORNAF **********************************/

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: FornaContainer, rnaPlot, rnaTreemap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fornac_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fornac.js */ "./src/fornac.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FornaContainer", function() { return _fornac_js__WEBPACK_IMPORTED_MODULE_0__["FornaContainer"]; });

/* harmony import */ var _rnaplot_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rnaplot.js */ "./src/rnaplot.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rnaPlot", function() { return _rnaplot_js__WEBPACK_IMPORTED_MODULE_1__["rnaPlot"]; });

/* harmony import */ var _rnatreemap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rnatreemap.js */ "./src/rnatreemap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rnaTreemap", function() { return _rnatreemap_js__WEBPACK_IMPORTED_MODULE_2__["rnaTreemap"]; });



 //export {RNAUtilities, ColorScheme} from './rnautils.js';
//export {ProteinGraph, RNAGraph, moleculesToJson} from './rnagraph.js';
//export {simpleXyCoordinates} from './simplernaplot.js';

/***/ }),

/***/ "./src/naview/base.js":
/*!****************************!*\
  !*** ./src/naview/base.js ***!
  \****************************/
/*! exports provided: Base */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Base", function() { return Base; });
/* harmony import */ var _region_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./region.js */ "./src/naview/region.js");

function Base() {
  this.mate = null;
  this.x = null;
  this.y = null;
  this.extracted = null;
  this.region = new _region_js__WEBPACK_IMPORTED_MODULE_0__["Region"]();
}

Base.prototype.getMate = function () {
  return this.mate;
};

Base.prototype.setMate = function (mate) {
  this.mate = mate;
};

Base.prototype.getX = function () {
  return this.x;
};

Base.prototype.setX = function (x) {
  this.x = x;
};

Base.prototype.getY = function () {
  return this.y;
};

Base.prototype.setY = function (y) {
  this.y = y;
};

Base.prototype.isExtracted = function () {
  return this.extracted;
};

Base.prototype.setExtracted = function (extracted) {
  this.extracted = extracted;
};

Base.prototype.getRegion = function () {
  return this.region;
};

Base.prototype.setRegion = function (region) {
  this.region = region;
};

/***/ }),

/***/ "./src/naview/connection.js":
/*!**********************************!*\
  !*** ./src/naview/connection.js ***!
  \**********************************/
/*! exports provided: Connection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Connection", function() { return Connection; });
/* harmony import */ var _loop_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loop.js */ "./src/naview/loop.js");
/* harmony import */ var _region_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./region.js */ "./src/naview/region.js");


function Connection() {
  this.loop = new _loop_js__WEBPACK_IMPORTED_MODULE_0__["Loop"]();
  this.region = new _region_js__WEBPACK_IMPORTED_MODULE_1__["Region"](); // Start and end form the 1st base pair of the region.

  this.start = null;
  this.end = null;
  this.xrad = null;
  this.yrad = null;
  this.angle = null; // True if segment between this connection and the
  // next must be extruded out of the circle

  this.extruded = null; // True if the extruded segment must be drawn long.

  this.broken = null;
  this._isNull = false;
}

Connection.prototype.isNull = function () {
  return this._isNull;
};

Connection.prototype.setNull = function (isNull) {
  this._isNull = isNull;
};

Connection.prototype.getLoop = function () {
  return this.loop;
};

Connection.prototype.setLoop = function (loop) {
  this.loop = loop;
};

Connection.prototype.getRegion = function () {
  return this.region;
};

Connection.prototype.setRegion = function (region) {
  this.region = region;
};

Connection.prototype.getStart = function () {
  return this.start;
};

Connection.prototype.setStart = function (start) {
  this.start = start;
};

Connection.prototype.getEnd = function () {
  return this.end;
};

Connection.prototype.setEnd = function (end) {
  this.end = end;
};

Connection.prototype.getXrad = function () {
  return this.xrad;
};

Connection.prototype.setXrad = function (xrad) {
  this.xrad = xrad;
};

Connection.prototype.getYrad = function () {
  return this.yrad;
};

Connection.prototype.setYrad = function (yrad) {
  this.yrad = yrad;
};

Connection.prototype.getAngle = function () {
  return this.angle;
};

Connection.prototype.setAngle = function (angle) {
  this.angle = angle;
};

Connection.prototype.isExtruded = function () {
  return this.extruded;
};

Connection.prototype.setExtruded = function (extruded) {
  this.extruded = extruded;
};

Connection.prototype.isBroken = function () {
  return this.broken;
};

Connection.prototype.setBroken = function (broken) {
  this.broken = broken;
};

/***/ }),

/***/ "./src/naview/loop.js":
/*!****************************!*\
  !*** ./src/naview/loop.js ***!
  \****************************/
/*! exports provided: Loop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Loop", function() { return Loop; });
/* harmony import */ var _connection_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./connection.js */ "./src/naview/connection.js");

function Loop() {
  this.nconnection = null;
  this.connections = [];
  this._connections = [];
  this.number = null;
  this.depth = null;
  this.mark = null;
  this.x = null;
  this.y = null;
  this.radius = null;
}

Loop.prototype.getNconnection = function () {
  return this.nconnection;
};

Loop.prototype.setNconnection = function (nconnection) {
  this.nconnection = nconnection;
};

Loop.prototype.setConnection = function (i, c) {
  if (c != null) {
    this._connections[i] = c;
  } else {
    if (!this._connections[i]) {
      this._connections[i] = new _connection_js__WEBPACK_IMPORTED_MODULE_0__["Connection"]();
    }

    this._connections[i].setNull(true);
  }
};

Loop.prototype.getConnection = function (i) {
  var Connection = __webpack_require__(/*! ./connection */ "./src/naview/connection.js");

  if (!this._connections[i]) {
    this._connections[i] = new Connection();
  }

  var c = this._connections[i];

  if (c.isNull()) {
    return null;
  } else {
    return c;
  }
};

Loop.prototype.addConnection = function (i, c) {
  this._connections.push(c);
};

Loop.prototype.getNumber = function () {
  return this.number;
};

Loop.prototype.setNumber = function (number) {
  this.number = number;
};

Loop.prototype.getDepth = function () {
  return this.depth;
};

Loop.prototype.setDepth = function (depth) {
  this.depth = depth;
};

Loop.prototype.isMark = function () {
  return this.mark;
};

Loop.prototype.setMark = function (mark) {
  this.mark = mark;
};

Loop.prototype.getX = function () {
  return this.x;
};

Loop.prototype.setX = function (x) {
  this.x = x;
};

Loop.prototype.getY = function () {
  return this.y;
};

Loop.prototype.setY = function (y) {
  this.y = y;
};

Loop.prototype.getRadius = function () {
  return this.radius;
};

Loop.prototype.setRadius = function (radius) {
  this.radius = radius;
};

/***/ }),

/***/ "./src/naview/naview.js":
/*!******************************!*\
  !*** ./src/naview/naview.js ***!
  \******************************/
/*! exports provided: NAView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NAView", function() { return NAView; });
/* harmony import */ var _radloop_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./radloop.js */ "./src/naview/radloop.js");
/* harmony import */ var _connection_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./connection.js */ "./src/naview/connection.js");
/* harmony import */ var _region_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./region.js */ "./src/naview/region.js");
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base.js */ "./src/naview/base.js");
/* harmony import */ var _loop_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./loop.js */ "./src/naview/loop.js");





function NAView() {
  this.ANUM = 9999.0;
  this.MAXITER = 500;
  this.bases = [];
  this.nbase = null;
  this.nregion = null;
  this.loop_count = null;
  this.root = new _loop_js__WEBPACK_IMPORTED_MODULE_4__["Loop"]();
  this.loops = [];
  this.regions = [];
  this.rlphead = new _radloop_js__WEBPACK_IMPORTED_MODULE_0__["Radloop"]();
  this.lencut = 0.8;
  this.RADIUS_REDUCTION_FACTOR = 1.4; // show algorithm step by step

  this.angleinc = null;
  this._h = null; // private boolean noIterationFailureYet = true;

  this.HELIX_FACTOR = 0.6;
  this.BACKBONE_DISTANCE = 27;
}

NAView.prototype.naview_xy_coordinates = function (pair_table) {
  var x = [];
  var y = [];

  if (pair_table.length === 0 || pair_table[0] === 0) {
    return 0;
  }

  var i;
  this.nbase = pair_table[0];
  this.bases = [];

  for (var index = 0; index < this.nbase + 1; index++) {
    this.bases.push(new _base_js__WEBPACK_IMPORTED_MODULE_3__["Base"]());
  }

  this.regions = [];

  for (var index = 0; index < this.nbase + 1; index++) {
    this.regions.push(new _region_js__WEBPACK_IMPORTED_MODULE_2__["Region"]());
  }

  this.read_in_bases(pair_table);
  this.rlphead = null;
  this.find_regions();
  this.loop_count = 0;
  this.loops = [];

  for (var index = 0; index < this.nbase + 1; index++) {
    this.loops.push(new _loop_js__WEBPACK_IMPORTED_MODULE_4__["Loop"]());
  }

  this.construct_loop(0);
  this.find_central_loop();
  this.traverse_loop(this.root, null);

  for (i = 0; i < this.nbase; i++) {
    x.push(100 + this.BACKBONE_DISTANCE * this.bases[i + 1].getX());
    y.push(100 + this.BACKBONE_DISTANCE * this.bases[i + 1].getY());
  }

  return {
    nbase: this.nbase,
    x: x,
    y: y
  };
};

NAView.prototype.read_in_bases = function read_in_bases(pair_table) {
  var i = null;
  var npairs = null; // Set up an origin.

  this.bases.push(new _base_js__WEBPACK_IMPORTED_MODULE_3__["Base"]());
  this.bases[0].setMate(0);
  this.bases[0].setExtracted(false);
  this.bases[0].setX(this.ANUM);
  this.bases[0].setY(this.ANUM);

  for (npairs = 0, i = 1; i <= this.nbase; i++) {
    this.bases.push(new _base_js__WEBPACK_IMPORTED_MODULE_3__["Base"]());
    this.bases[i].setExtracted(false);
    this.bases[i].setX(this.ANUM);
    this.bases[i].setY(this.ANUM);
    this.bases[i].setMate(pair_table[i]);
    if (pair_table[i] > i) npairs++;
  } // must have at least 1 pair to avoid segfault


  if (npairs == 0) {
    this.bases[1].setMate(this.nbase);
    this.bases[this.nbase].setMate(1);
  }
};

NAView.prototype.find_regions = function find_regions() {
  var i = null;
  var mate = null;
  var nb1 = null;
  nb1 = this.nbase + 1;
  var mark = [];

  for (i = 0; i < nb1; i++) {
    mark.push(false);
  }

  this.nregion = 0;

  for (i = 0; i <= this.nbase; i++) {
    if ((mate = this.bases[i].getMate()) != 0 && !mark[i]) {
      this.regions[this.nregion].setStart1(i);
      this.regions[this.nregion].setEnd2(mate);
      mark[i] = true;
      mark[mate] = true;
      this.bases[i].setRegion(this.regions[this.nregion]);
      this.bases[mate].setRegion(this.regions[this.nregion]);

      for (i++, mate--; i < mate && this.bases[i].getMate() == mate; i++, mate--) {
        mark[mate] = true;
        mark[i] = true;
        this.bases[i].setRegion(this.regions[this.nregion]);
        this.bases[mate].setRegion(this.regions[this.nregion]);
      }

      this.regions[this.nregion].setEnd1(--i);
      this.regions[this.nregion].setStart2(mate + 1);
      this.nregion++;
    }
  }
};

NAView.prototype.construct_loop = function construct_loop(ibase) {
  var i = null;
  var mate = null;
  var retloop = new _loop_js__WEBPACK_IMPORTED_MODULE_4__["Loop"]();
  var lp = new _loop_js__WEBPACK_IMPORTED_MODULE_4__["Loop"]();
  var cp = new _connection_js__WEBPACK_IMPORTED_MODULE_1__["Connection"]();
  var rp = new _region_js__WEBPACK_IMPORTED_MODULE_2__["Region"]();
  var rlp = new _radloop_js__WEBPACK_IMPORTED_MODULE_0__["Radloop"]();
  retloop = this.loops[this.loop_count++];
  retloop.setNconnection(0);
  retloop.setDepth(0);
  retloop.setNumber(this.loop_count);
  retloop.setRadius(0.0);

  for (rlp = this.rlphead; rlp != null; rlp = rlp.getNext()) {
    if (rlp.getLoopnumber() == this.loop_count) retloop.setRadius(rlp.getRadius());
  }

  i = ibase;

  do {
    if ((mate = this.bases[i].getMate()) != 0) {
      rp = this.bases[i].getRegion();

      if (!this.bases[rp.getStart1()].isExtracted()) {
        if (i == rp.getStart1()) {
          this.bases[rp.getStart1()].setExtracted(true);
          this.bases[rp.getEnd1()].setExtracted(true);
          this.bases[rp.getStart2()].setExtracted(true);
          this.bases[rp.getEnd2()].setExtracted(true);
          lp = this.construct_loop(rp.getEnd1() < this.nbase ? rp.getEnd1() + 1 : 0);
        } else if (i == rp.getStart2()) {
          this.bases[rp.getStart2()].setExtracted(true);
          this.bases[rp.getEnd2()].setExtracted(true);
          this.bases[rp.getStart1()].setExtracted(true);
          this.bases[rp.getEnd1()].setExtracted(true);
          lp = this.construct_loop(rp.getEnd2() < this.nbase ? rp.getEnd2() + 1 : 0);
        } else {
          console.log("Something went terribly wrong ....");
        }

        retloop.setNconnection(retloop.getNconnection() + 1);
        cp = new _connection_js__WEBPACK_IMPORTED_MODULE_1__["Connection"]();
        retloop.setConnection(retloop.getNconnection() - 1, cp);
        retloop.setConnection(retloop.getNconnection(), null);
        cp.setLoop(lp);
        cp.setRegion(rp);

        if (i == rp.getStart1()) {
          cp.setStart(rp.getStart1());
          cp.setEnd(rp.getEnd2());
        } else {
          cp.setStart(rp.getStart2());
          cp.setEnd(rp.getEnd1());
        }

        cp.setExtruded(false);
        cp.setBroken(false);
        lp.setNconnection(lp.getNconnection() + 1);
        cp = new _connection_js__WEBPACK_IMPORTED_MODULE_1__["Connection"]();
        lp.setConnection(lp.getNconnection() - 1, cp);
        lp.setConnection(lp.getNconnection(), null);
        cp.setLoop(retloop);
        cp.setRegion(rp);

        if (i == rp.getStart1()) {
          cp.setStart(rp.getStart2());
          cp.setEnd(rp.getEnd1());
        } else {
          cp.setStart(rp.getStart1());
          cp.setEnd(rp.getEnd2());
        }

        cp.setExtruded(false);
        cp.setBroken(false);
      }

      i = mate;
    }

    if (++i > this.nbase) i = 0;
  } while (i != ibase);

  return retloop;
};

NAView.prototype.find_central_loop = function find_central_loop() {
  var lp = new _loop_js__WEBPACK_IMPORTED_MODULE_4__["Loop"]();
  var maxconn = null;
  var maxdepth = null;
  var i = null;
  determine_depths.bind(this)();
  maxconn = 0;
  maxdepth = -1;

  for (i = 0; i < this.loop_count; i++) {
    lp = this.loops[i];

    if (lp.getNconnection() > maxconn) {
      maxdepth = lp.getDepth();
      maxconn = lp.getNconnection();
      this.root = lp;
    } else if (lp.getDepth() > maxdepth && lp.getNconnection() == maxconn) {
      maxdepth = lp.getDepth();
      this.root = lp;
    }
  }
};

function determine_depths() {
  var lp = new _loop_js__WEBPACK_IMPORTED_MODULE_4__["Loop"]();
  var i = null;
  var j = null;

  for (i = 0; i < this.loop_count; i++) {
    lp = this.loops[i];

    for (j = 0; j < this.loop_count; j++) {
      this.loops[j].setMark(false);
    }

    lp.setDepth(depth(lp));
  }
}

function depth(lp) {
  var count = null;
  var ret = null;
  var d = null;

  if (lp.getNconnection() <= 1) {
    return 0;
  }

  if (lp.isMark()) {
    return -1;
  }

  lp.setMark(true);
  count = 0;
  ret = 0;

  for (var i = 0; lp.getConnection(i) != null; i++) {
    d = depth(lp.getConnection(i).getLoop());

    if (d >= 0) {
      if (++count == 1) {
        ret = d;
      } else if (ret > d) {
        ret = d;
      }
    }
  }

  lp.setMark(false);
  return ret + 1;
}

NAView.prototype.traverse_loop = function traverse_loop(lp, anchor_connection) {
  var xs, ys, xe, ye, xn, yn, angleinc, r;
  var radius, xc, yc, xo, yo, astart, aend, a;
  var cp, cpnext, acp, cpprev;
  var i, j, n, ic;
  var da, maxang;
  var count, icstart, icend, icmiddle, icroot;
  var done, done_all_connections, rooted;
  var sign;
  var midx, midy, nrx, nry, mx, my, vx, vy, dotmv, nmidx, nmidy;
  var icstart1, icup, icdown, icnext, direction;
  var dan, dx, dy, rr;
  var cpx, cpy, cpnextx, cpnexty, cnx, cny, rcn, rc, lnx, lny, rl, ac, acn, sx, sy, dcp;
  var imaxloop = 0;
  angleinc = 2 * Math.PI / (this.nbase + 1);
  acp = null;
  icroot = -1;
  var indice = 0;

  for (ic = 0; (cp = lp.getConnection(indice)) != null; indice++, ic++) {
    xs = -Math.sin(angleinc * cp.getStart());
    ys = Math.cos(angleinc * cp.getStart());
    xe = -Math.sin(angleinc * cp.getEnd());
    ye = Math.cos(angleinc * cp.getEnd());
    xn = ye - ys;
    yn = xs - xe;
    r = Math.sqrt(xn * xn + yn * yn);
    cp.setXrad(xn / r);
    cp.setYrad(yn / r);
    cp.setAngle(Math.atan2(yn, xn));

    if (cp.getAngle() < 0.0) {
      cp.setAngle(cp.getAngle() + 2 * Math.PI);
    }

    if (anchor_connection != null && anchor_connection.getRegion() == cp.getRegion()) {
      acp = cp;
      icroot = ic;
    }
  }

  set_radius: while (true) {
    this.determine_radius(lp, this.lencut);
    radius = lp.getRadius() / this.RADIUS_REDUCTION_FACTOR;

    if (anchor_connection == null) {
      xc = yc = 0.0;
    } else {
      xo = (this.bases[acp.getStart()].getX() + this.bases[acp.getEnd()].getX()) / 2.0;
      yo = (this.bases[acp.getStart()].getY() + this.bases[acp.getEnd()].getY()) / 2.0;
      xc = xo - radius * acp.getXrad();
      yc = yo - radius * acp.getYrad();
    } // The construction of the connectors will proceed in blocks of
    // connected connectors, where a connected connector pairs means two
    // connectors that are forced out of the drawn circle because they
    // are too close together in angle.
    // First, find the start of a block of connected connectors


    if (icroot == -1) {
      icstart = 0;
    } else {
      icstart = icroot;
    }

    cp = lp.getConnection(icstart);
    count = 0;
    done = false;

    do {
      j = icstart - 1;

      if (j < 0) {
        j = lp.getNconnection() - 1;
      }

      cpprev = lp.getConnection(j);

      if (!this.connected_connection(cpprev, cp)) {
        done = true;
      } else {
        icstart = j;
        cp = cpprev;
      }

      if (++count > lp.getNconnection()) {
        // Here everything is connected. Break on maximum angular
        // separation between connections.
        maxang = -1.0;

        for (ic = 0; ic < lp.getNconnection(); ic++) {
          j = ic + 1;

          if (j >= lp.getNconnection()) {
            j = 0;
          }

          cp = lp.getConnection(ic);
          cpnext = lp.getConnection(j);
          ac = cpnext.getAngle() - cp.getAngle();

          if (ac < 0.0) {
            ac += 2 * Math.PI;
          }

          if (ac > maxang) {
            maxang = ac;
            imaxloop = ic;
          }
        }

        icend = imaxloop;
        icstart = imaxloop + 1;

        if (icstart >= lp.getNconnection()) {
          icstart = 0;
        }

        cp = lp.getConnection(icend);
        cp.setBroken(true);
        done = true;
      }
    } while (!done);

    done_all_connections = false;
    icstart1 = icstart;

    while (!done_all_connections) {
      count = 0;
      done = false;
      icend = icstart;
      rooted = false;

      while (!done) {
        cp = lp.getConnection(icend);

        if (icend == icroot) {
          rooted = true;
        }

        j = icend + 1;

        if (j >= lp.getNconnection()) {
          j = 0;
        }

        cpnext = lp.getConnection(j);

        if (this.connected_connection(cp, cpnext)) {
          if (++count >= lp.getNconnection()) {
            break;
          }

          icend = j;
        } else {
          done = true;
        }
      }

      icmiddle = this.find_ic_middle(icstart, icend, anchor_connection, acp, lp);
      ic = icup = icdown = icmiddle;
      done = false;
      direction = 0;

      while (!done) {
        if (direction < 0) {
          ic = icup;
        } else if (direction == 0) {
          ic = icmiddle;
        } else {
          ic = icdown;
        }

        if (ic >= 0) {
          cp = lp.getConnection(ic);

          if (anchor_connection == null || acp != cp) {
            if (direction == 0) {
              astart = cp.getAngle() - Math.asin(1.0 / 2.0 / radius);
              aend = cp.getAngle() + Math.asin(1.0 / 2.0 / radius);
              this.bases[cp.getStart()].setX(xc + radius * Math.cos(astart));
              this.bases[cp.getStart()].setY(yc + radius * Math.sin(astart));
              this.bases[cp.getEnd()].setX(xc + radius * Math.cos(aend));
              this.bases[cp.getEnd()].setY(yc + radius * Math.sin(aend));
            } else if (direction < 0) {
              j = ic + 1;

              if (j >= lp.getNconnection()) {
                j = 0;
              }

              cp = lp.getConnection(ic);
              cpnext = lp.getConnection(j);
              cpx = cp.getXrad();
              cpy = cp.getYrad();
              ac = (cp.getAngle() + cpnext.getAngle()) / 2.0;

              if (cp.getAngle() > cpnext.getAngle()) {
                ac -= Math.PI;
              }

              cnx = Math.cos(ac);
              cny = Math.sin(ac);
              lnx = cny;
              lny = -cnx;
              da = cpnext.getAngle() - cp.getAngle();

              if (da < 0.0) {
                da += 2 * Math.PI;
              }

              if (cp.isExtruded()) {
                if (da <= Math.PI / 2) {
                  rl = 2.0;
                } else {
                  rl = 1.5;
                }
              } else {
                rl = 1.0;
              }

              this.bases[cp.getEnd()].setX(this.bases[cpnext.getStart()].getX() + rl * lnx);
              this.bases[cp.getEnd()].setY(this.bases[cpnext.getStart()].getY() + rl * lny);
              this.bases[cp.getStart()].setX(this.bases[cp.getEnd()].getX() + cpy);
              this.bases[cp.getStart()].setY(this.bases[cp.getEnd()].getY() - cpx);
            } else {
              j = ic - 1;

              if (j < 0) {
                j = lp.getNconnection() - 1;
              }

              cp = lp.getConnection(j);
              cpnext = lp.getConnection(ic);
              cpnextx = cpnext.getXrad();
              cpnexty = cpnext.getYrad();
              ac = (cp.getAngle() + cpnext.getAngle()) / 2.0;

              if (cp.getAngle() > cpnext.getAngle()) {
                ac -= Math.PI;
              }

              cnx = Math.cos(ac);
              cny = Math.sin(ac);
              lnx = -cny;
              lny = cnx;
              da = cpnext.getAngle() - cp.getAngle();

              if (da < 0.0) {
                da += 2 * Math.PI;
              }

              if (cp.isExtruded()) {
                if (da <= Math.PI / 2) {
                  rl = 2.0;
                } else {
                  rl = 1.5;
                }
              } else {
                rl = 1.0;
              }

              this.bases[cpnext.getStart()].setX(this.bases[cp.getEnd()].getX() + rl * lnx);
              this.bases[cpnext.getStart()].setY(this.bases[cp.getEnd()].getY() + rl * lny);
              this.bases[cpnext.getEnd()].setX(this.bases[cpnext.getStart()].getX() - cpnexty);
              this.bases[cpnext.getEnd()].setY(this.bases[cpnext.getStart()].getY() + cpnextx);
            }
          }
        }

        if (direction < 0) {
          if (icdown == icend) {
            icdown = -1;
          } else if (icdown >= 0) {
            if (++icdown >= lp.getNconnection()) {
              icdown = 0;
            }
          }

          direction = 1;
        } else {
          if (icup == icstart) {
            icup = -1;
          } else if (icup >= 0) {
            if (--icup < 0) {
              icup = lp.getNconnection() - 1;
            }
          }

          direction = -1;
        }

        done = icup == -1 && icdown == -1;
      }

      icnext = icend + 1;

      if (icnext >= lp.getNconnection()) {
        icnext = 0;
      }

      if (icend != icstart && !(icstart == icstart1 && icnext == icstart1)) {
        // Move the bases just constructed (or the radius) so that
        // the bisector of the end points is radius distance away
        // from the loop center.
        cp = lp.getConnection(icstart);
        cpnext = lp.getConnection(icend);
        dx = this.bases[cpnext.getEnd()].getX() - this.bases[cp.getStart()].getX();
        dy = this.bases[cpnext.getEnd()].getY() - this.bases[cp.getStart()].getY();
        midx = this.bases[cp.getStart()].getX() + dx / 2.0;
        midy = this.bases[cp.getStart()].getY() + dy / 2.0;
        rr = Math.sqrt(dx * dx + dy * dy);
        mx = dx / rr;
        my = dy / rr;
        vx = xc - midx;
        vy = yc - midy;
        rr = Math.sqrt(dx * dx + dy * dy);
        vx /= rr;
        vy /= rr;
        dotmv = vx * mx + vy * my;
        nrx = dotmv * mx - vx;
        nry = dotmv * my - vy;
        rr = Math.sqrt(nrx * nrx + nry * nry);
        nrx /= rr;
        nry /= rr; // Determine which side of the bisector the center should
        // be.

        dx = this.bases[cp.getStart()].getX() - xc;
        dy = this.bases[cp.getStart()].getY() - yc;
        ac = Math.atan2(dy, dx);

        if (ac < 0.0) {
          ac += 2 * Math.PI;
        }

        dx = this.bases[cpnext.getEnd()].getX() - xc;
        dy = this.bases[cpnext.getEnd()].getY() - yc;
        acn = Math.atan2(dy, dx);

        if (acn < 0.0) {
          acn += 2 * Math.PI;
        }

        if (acn < ac) {
          acn += 2 * Math.PI;
        }

        if (acn - ac > Math.PI) {
          sign = -1;
        } else {
          sign = 1;
        }

        nmidx = xc + sign * radius * nrx;
        nmidy = yc + sign * radius * nry;

        if (rooted) {
          xc -= nmidx - midx;
          yc -= nmidy - midy;
        } else {
          for (ic = icstart;;) {
            cp = lp.getConnection(ic);
            i = cp.getStart();
            this.bases[i].setX(this.bases[i].getX() + nmidx - midx);
            this.bases[i].setY(this.bases[i].getY() + nmidy - midy);
            i = cp.getEnd();
            this.bases[i].setX(this.bases[i].getX() + nmidx - midx);
            this.bases[i].setY(this.bases[i].getY() + nmidy - midy);

            if (ic == icend) {
              break;
            }

            if (++ic >= lp.getNconnection()) {
              ic = 0;
            }
          }
        }
      }

      icstart = icnext;
      done_all_connections = icstart == icstart1;
    }

    for (ic = 0; ic < lp.getNconnection(); ic++) {
      cp = lp.getConnection(ic);
      j = ic + 1;

      if (j >= lp.getNconnection()) {
        j = 0;
      }

      cpnext = lp.getConnection(j);
      dx = this.bases[cp.getEnd()].getX() - xc;
      dy = this.bases[cp.getEnd()].getY() - yc;
      rc = Math.sqrt(dx * dx + dy * dy);
      ac = Math.atan2(dy, dx);

      if (ac < 0.0) {
        ac += 2 * Math.PI;
      }

      dx = this.bases[cpnext.getStart()].getX() - xc;
      dy = this.bases[cpnext.getStart()].getY() - yc;
      rcn = Math.sqrt(dx * dx + dy * dy);
      acn = Math.atan2(dy, dx);

      if (acn < 0.0) {
        acn += 2 * Math.PI;
      }

      if (acn < ac) {
        acn += 2 * Math.PI;
      }

      dan = acn - ac;
      dcp = cpnext.getAngle() - cp.getAngle();

      if (dcp <= 0.0) {
        dcp += 2 * Math.PI;
      }

      if (Math.abs(dan - dcp) > Math.PI) {
        if (cp.isExtruded()) {
          console.log("Warning from traverse_loop. Loop " + lp.getNumber() + " has crossed regions\n");
        } else if (cpnext.getStart() - cp.getEnd() != 1) {
          cp.setExtruded(true);
          continue set_radius; // remplacement du goto
        }
      }

      if (cp.isExtruded()) {
        this.construct_extruded_segment(cp, cpnext);
      } else {
        n = cpnext.getStart() - cp.getEnd();

        if (n < 0) {
          n += this.nbase + 1;
        }

        angleinc = dan / n;

        for (j = 1; j < n; j++) {
          i = cp.getEnd() + j;

          if (i > this.nbase) {
            i -= this.nbase + 1;
          }

          a = ac + j * angleinc;
          rr = rc + (rcn - rc) * (a - ac) / dan;
          this.bases[i].setX(xc + rr * Math.cos(a));
          this.bases[i].setY(yc + rr * Math.sin(a));
        }
      }
    }

    break;
  }

  for (ic = 0; ic < lp.getNconnection(); ic++) {
    if (icroot != ic) {
      cp = lp.getConnection(ic); //IM HERE

      this.generate_region(cp);
      this.traverse_loop(cp.getLoop(), cp);
    }
  }

  n = 0;
  sx = 0.0;
  sy = 0.0;

  for (ic = 0; ic < lp.getNconnection(); ic++) {
    j = ic + 1;

    if (j >= lp.getNconnection()) {
      j = 0;
    }

    cp = lp.getConnection(ic);
    cpnext = lp.getConnection(j);
    n += 2;
    sx += this.bases[cp.getStart()].getX() + this.bases[cp.getEnd()].getX();
    sy += this.bases[cp.getStart()].getY() + this.bases[cp.getEnd()].getY();

    if (!cp.isExtruded()) {
      for (j = cp.getEnd() + 1; j != cpnext.getStart(); j++) {
        if (j > this.nbase) {
          j -= this.nbase + 1;
        }

        n++;
        sx += this.bases[j].getX();
        sy += this.bases[j].getY();
      }
    }
  }

  lp.setX(sx / n);
  lp.setY(sy / n);
};

NAView.prototype.determine_radius = function determine_radius(lp, lencut) {
  var mindit, ci, dt, sumn, sumd, radius, dit;
  var i,
      j,
      end,
      start,
      imindit = 0;
  var cp = new _connection_js__WEBPACK_IMPORTED_MODULE_1__["Connection"](),
      cpnext = new _connection_js__WEBPACK_IMPORTED_MODULE_1__["Connection"]();
  var rt2_2 = 0.7071068;

  do {
    mindit = 1.0e10;

    for (sumd = 0.0, sumn = 0.0, i = 0; i < lp.getNconnection(); i++) {
      cp = lp.getConnection(i);
      j = i + 1;

      if (j >= lp.getNconnection()) {
        j = 0;
      }

      cpnext = lp.getConnection(j);
      end = cp.getEnd();
      start = cpnext.getStart();

      if (start < end) {
        start += this.nbase + 1;
      }

      dt = cpnext.getAngle() - cp.getAngle();

      if (dt <= 0.0) {
        dt += 2 * Math.PI;
      }

      if (!cp.isExtruded()) {
        ci = start - end;
      } else {
        if (dt <= Math.PI / 2) {
          ci = 2.0;
        } else {
          ci = 1.5;
        }
      }

      sumn += dt * (1.0 / ci + 1.0);
      sumd += dt * dt / ci;
      dit = dt / ci;

      if (dit < mindit && !cp.isExtruded() && ci > 1.0) {
        mindit = dit;
        imindit = i;
      }
    }

    radius = sumn / sumd;

    if (radius < rt2_2) {
      radius = rt2_2;
    }

    if (mindit * radius < lencut) {
      lp.getConnection(imindit).setExtruded(true);
    }
  } while (mindit * radius < lencut);

  if (lp.getRadius() > 0.0) {
    radius = lp.getRadius();
  } else {
    lp.setRadius(radius);
  }
};

NAView.prototype.find_ic_middle = function find_ic_middle(icstart, icend, anchor_connection, acp, lp) {
  var count, ret, ic, i;
  var done;
  count = 0;
  ret = -1;
  ic = icstart;
  done = false;

  while (!done) {
    if (count++ > lp.getNconnection() * 2) {
      console.log("Infinite loop in 'find_ic_middle'");
    }

    if (anchor_connection != null && lp.getConnection(ic) == acp) {
      ret = ic;
    }

    done = ic == icend;

    if (++ic >= lp.getNconnection()) {
      ic = 0;
    }
  }

  if (ret == -1) {
    for (i = 1, ic = icstart; i < (count + 1) / 2; i++) {
      if (++ic >= lp.getNconnection()) ic = 0;
    }

    ret = ic;
  }

  return ret;
};

NAView.prototype.construct_extruded_segment = function construct_extruded_segment(cp, cpnext) {
  var astart, aend1, aend2, aave, dx, dy, a1, a2, ac, rr, da, dac;
  var start, end, n, nstart, nend;
  var collision;
  astart = cp.getAngle();
  aend2 = aend1 = cpnext.getAngle();

  if (aend2 < astart) {
    aend2 += 2 * Math.PI;
  }

  aave = (astart + aend2) / 2.0;
  start = cp.getEnd();
  end = cpnext.getStart();
  n = end - start;

  if (n < 0) {
    n += this.nbase + 1;
  }

  da = cpnext.getAngle() - cp.getAngle();

  if (da < 0.0) {
    da += 2 * Math.PI;
  }

  if (n == 2) {
    this.construct_circle_segment(start, end);
  } else {
    dx = this.bases[end].getX() - this.bases[start].getX();
    dy = this.bases[end].getY() - this.bases[start].getY();
    rr = Math.sqrt(dx * dx + dy * dy);
    dx /= rr;
    dy /= rr;

    if (rr >= 1.5 && da <= Math.PI / 2) {
      nstart = start + 1;

      if (nstart > this.nbase) {
        nstart -= this.nbase + 1;
      }

      nend = end - 1;

      if (nend < 0) {
        nend += this.nbase + 1;
      }

      this.bases[nstart].setX(this.bases[start].getX() + 0.5 * dx);
      this.bases[nstart].setY(this.bases[start].getY() + 0.5 * dy);
      this.bases[nend].setX(this.bases[end].getX() - 0.5 * dx);
      this.bases[nend].setY(this.bases[end].getY() - 0.5 * dy);
      start = nstart;
      end = nend;
    }

    do {
      collision = false;
      this.construct_circle_segment(start, end);
      nstart = start + 1;

      if (nstart > this.nbase) {
        nstart -= this.nbase + 1;
      }

      dx = this.bases[nstart].getX() - this.bases[start].getX();
      dy = this.bases[nstart].getY() - this.bases[start].getY();
      a1 = Math.atan2(dy, dx);

      if (a1 < 0.0) {
        a1 += 2 * Math.PI;
      }

      dac = a1 - astart;

      if (dac < 0.0) {
        dac += 2 * Math.PI;
      }

      if (dac > Math.PI) {
        collision = true;
      }

      nend = end - 1;

      if (nend < 0) {
        nend += this.nbase + 1;
      }

      dx = this.bases[nend].getX() - this.bases[end].getX();
      dy = this.bases[nend].getY() - this.bases[end].getY();
      a2 = Math.atan2(dy, dx);

      if (a2 < 0.0) {
        a2 += 2 * Math.PI;
      }

      dac = aend1 - a2;

      if (dac < 0.0) {
        dac += 2 * Math.PI;
      }

      if (dac > Math.PI) {
        collision = true;
      }

      if (collision) {
        ac = this.minf2(aave, astart + 0.5);
        this.bases[nstart].setX(this.bases[start].getX() + Math.cos(ac));
        this.bases[nstart].setY(this.bases[start].getY() + Math.sin(ac));
        start = nstart;
        ac = this.maxf2(aave, aend2 - 0.5);
        this.bases[nend].setX(this.bases[end].getX() + Math.cos(ac));
        this.bases[nend].setY(this.bases[end].getY() + Math.sin(ac));
        end = nend;
        n -= 2;
      }
    } while (collision && n > 1);
  }
};

NAView.prototype.construct_circle_segment = function construct_circle_segment(start, end) {
  var dx, dy, rr, midx, midy, xn, yn, nrx, nry, mx, my, a;
  var l, j, i;
  dx = this.bases[end].getX() - this.bases[start].getX();
  dy = this.bases[end].getY() - this.bases[start].getY();
  rr = Math.sqrt(dx * dx + dy * dy);
  l = end - start;

  if (l < 0) {
    l += this.nbase + 1;
  }

  if (rr >= l) {
    dx /= rr;
    dy /= rr;

    for (j = 1; j < l; j++) {
      i = start + j;

      if (i > this.nbase) {
        i -= this.nbase + 1;
      }

      this.bases[i].setX(this.bases[start].getX() + dx * j / l);
      this.bases[i].setY(this.bases[start].getY() + dy * j / l);
    }
  } else {
    this.find_center_for_arc(l - 1, rr);
    dx /= rr;
    dy /= rr;
    midx = this.bases[start].getX() + dx * rr / 2.0;
    midy = this.bases[start].getY() + dy * rr / 2.0;
    xn = dy;
    yn = -dx;
    nrx = midx + this._h * xn;
    nry = midy + this._h * yn;
    mx = this.bases[start].getX() - nrx;
    my = this.bases[start].getY() - nry;
    rr = Math.sqrt(mx * mx + my * my);
    a = Math.atan2(my, mx);

    for (j = 1; j < l; j++) {
      i = start + j;

      if (i > this.nbase) {
        i -= this.nbase + 1;
      }

      this.bases[i].setX(nrx + rr * Math.cos(a + j * this.angleinc));
      this.bases[i].setY(nry + rr * Math.sin(a + j * this.angleinc));
    }
  }
};

NAView.prototype.find_center_for_arc = function find_center_for_arc(n, b) {
  var h, hhi, hlow, r, disc, theta, e, phi;
  var iter;
  hhi = (n + 1.0) / Math.PI; // changed to prevent div by zero if (ih)

  hlow = -hhi - b / (n + 1.000001 - b);

  if (b < 1) {
    // otherwise we might fail below (ih)
    hlow = 0;
  }

  iter = 0;

  do {
    h = (hhi + hlow) / 2.0;
    r = Math.sqrt(h * h + b * b / 4.0);
    disc = 1.0 - 0.5 / (r * r);

    if (Math.abs(disc) > 1.0) {
      console.log("Unexpected large magnitude discriminant = " + disc + " " + r);
    }

    theta = Math.acos(disc);
    phi = Math.acos(h / r);
    e = theta * (n + 1) + 2 * phi - 2 * Math.PI;

    if (e > 0.0) {
      hlow = h;
    } else {
      hhi = h;
    }
  } while (Math.abs(e) > 0.0001 && ++iter < this.MAXITER);

  if (iter >= this.MAXITER) {
    if (noIterationFailureYet) {
      console.log("Iteration failed in find_center_for_arc");
      noIterationFailureYet = false;
    }

    h = 0.0;
    theta = 0.0;
  }

  this._h = h;
  this.angleinc = theta;
};

NAView.prototype.generate_region = function generate_region(cp) {
  var l, start, end, i, mate;
  var rp;
  rp = cp.getRegion();
  l = 0;

  if (cp.getStart() == rp.getStart1()) {
    start = rp.getStart1();
    end = rp.getEnd1();
  } else {
    start = rp.getStart2();
    end = rp.getEnd2();
  }

  if (this.bases[cp.getStart()].getX() > this.ANUM - 100.0 || this.bases[cp.getEnd()].getX() > this.ANUM - 100.0) {
    console.log("Bad region passed to generate_region. Coordinates not defined.");
  }

  for (i = start + 1; i <= end; i++) {
    l++;
    this.bases[i].setX(this.bases[cp.getStart()].getX() + this.HELIX_FACTOR * l * cp.getXrad());
    this.bases[i].setY(this.bases[cp.getStart()].getY() + this.HELIX_FACTOR * l * cp.getYrad());
    mate = this.bases[i].getMate();
    this.bases[mate].setX(this.bases[cp.getEnd()].getX() + this.HELIX_FACTOR * l * cp.getXrad());
    this.bases[mate].setY(this.bases[cp.getEnd()].getY() + this.HELIX_FACTOR * l * cp.getYrad());
  }
};

NAView.prototype.minf2 = function minf2(x1, x2) {
  return x1 < x2 ? x1 : x2;
};

NAView.prototype.maxf2 = function maxf2(x1, x2) {
  return x1 > x2 ? x1 : x2;
};

NAView.prototype.connected_connection = function connected_connection(cp, cpnext) {
  if (cp.isExtruded()) {
    return true;
  } else if (cp.getEnd() + 1 == cpnext.getStart()) {
    return true;
  } else {
    return false;
  }
};

/***/ }),

/***/ "./src/naview/radloop.js":
/*!*******************************!*\
  !*** ./src/naview/radloop.js ***!
  \*******************************/
/*! exports provided: Radloop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Radloop", function() { return Radloop; });
function Radloop() {
  this.radius = null;
  this.loopnumber = null;
  this.next = null;
  this.prev = null;
}

Radloop.prototype.getRadius = function () {
  return this.radius;
};

Radloop.prototype.setRadius = function (radius) {
  this.radius = radius;
};

Radloop.prototype.getLoopnumber = function () {
  return this.loopnumber;
};

Radloop.prototype.setLoopnumber = function (loopnumber) {
  this.loopnumber = loopnumber;
};

Radloop.prototype.getNext = function () {
  return this.next;
};

Radloop.prototype.setNext = function (next) {
  this.next = next;
};

Radloop.prototype.getPrev = function () {
  return this.prev;
};

Radloop.prototype.setPrev = function (prev) {
  this.prev = prev;
};

/***/ }),

/***/ "./src/naview/region.js":
/*!******************************!*\
  !*** ./src/naview/region.js ***!
  \******************************/
/*! exports provided: Region */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Region", function() { return Region; });
function Region() {
  this._start1 = null;
  this._end1 = null;
  this._start2 = null;
  this._end2 = null;
}

Region.prototype.getStart1 = function () {
  return this._start1;
};

Region.prototype.setStart1 = function (start1) {
  this._start1 = start1;
};

Region.prototype.getEnd1 = function () {
  return this._end1;
};

Region.prototype.setEnd1 = function (end1) {
  this._end1 = end1;
};

Region.prototype.getStart2 = function () {
  return this._start2;
};

Region.prototype.setStart2 = function (start2) {
  this._start2 = start2;
};

Region.prototype.getEnd2 = function () {
  return this._end2;
};

Region.prototype.setEnd2 = function (end2) {
  this._end2 = end2;
};

/***/ }),

/***/ "./src/rnagraph.js":
/*!*************************!*\
  !*** ./src/rnagraph.js ***!
  \*************************/
/*! exports provided: ProteinGraph, RNAGraph, moleculesToJson */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProteinGraph", function() { return ProteinGraph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RNAGraph", function() { return RNAGraph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moleculesToJson", function() { return moleculesToJson; });
/* harmony import */ var _rnautils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rnautils.js */ "./src/rnautils.js");
/* harmony import */ var slugid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! slugid */ "./node_modules/slugid/index.js");
/* harmony import */ var slugid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(slugid__WEBPACK_IMPORTED_MODULE_1__);



var numberSort = function numberSort(a, b) {
  return a - b;
};

if (typeof String.prototype.trim === 'undefined') {
  String.prototype.trim = function () {
    return String(this).replace(/^\s+|\s+$/g, '');
  };
}

function ProteinGraph(structName, size, uid) {
  var self = this;
  self.type = 'protein';
  self.size = size;
  self.nodes = [{
    'name': 'P',
    'num': 1,
    'radius': 3 * Math.sqrt(size),
    'rna': self,
    'nodeType': 'protein',
    'structName': structName,
    'elemType': 'p',
    'size': size,
    'uid': slugid__WEBPACK_IMPORTED_MODULE_1___default.a.nice()
  }];
  self.links = [];
  self.uid = slugid__WEBPACK_IMPORTED_MODULE_1___default.a.nice();

  self.addUids = function (uids) {
    for (var i = 0; i < uids.length; i++) {
      self.nodes[i].uid = uids[i];
    }

    return self;
  };

  self.getUids = function () {
    /* Get the positions of each node so that they
     * can be passed to elementsToJson later
     */
    uids = [];

    for (var i = 0; i < self.dotbracket.length; i++) {
      uids.push(self.nodes[i].uid);
    }

    return uids;
  };
}
function RNAGraph() {
  var seq = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var dotbracket = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var structName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var startNumber = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var self = this;
  self.type = 'rna';
  self.circularizeExternal = false;
  self.seq = seq;
  self.dotbracket = dotbracket; //i.e. ..((..))..

  self.structName = structName;
  self.circular = false;

  if (self.dotbracket.slice(-1) == '*') {
    //circular RNA
    self.dotbracket = self.dotbracket.slice(0, -1);
    self.circular = true;
  }

  self.uid = slugid__WEBPACK_IMPORTED_MODULE_1___default.a.nice();
  self.elements = []; //store the elements and the
  //nucleotides they contain

  self.pseudoknotPairs = [];
  self.nucsToNodes = {};

  self.addUids = function (uids) {
    var nucleotideNodes = self.nodes.filter(function (d) {
      return d.nodeType == 'nucleotide';
    });

    for (var i = 0; i < uids.length && i < nucleotideNodes.length; i++) {
      nucleotideNodes[i].uid = uids[i];
    }

    return self;
  };

  self.computePairtable = function () {
    self.pairtable = _rnautils_js__WEBPACK_IMPORTED_MODULE_0__["rnaUtilities"].dotbracketToPairtable(self.dotbracket);
  };

  self.removeBreaks = function (targetString) {
    // Remove all chain breaks (denoted with a '&', which indicate
    // that the input represents more than one strand)
    var breaks = [];
    var breakIndex = -1;

    while ((breakIndex = targetString.indexOf('&')) >= 0) {
      breaks.push(breakIndex);
      targetString = targetString.substring(0, breakIndex) + targetString.substring(breakIndex + 1, targetString.length);
    }

    return {
      targetString: targetString,
      breaks: breaks
    };
  };

  var ret = self.removeBreaks(self.dotbracket);
  self.dotbracket = ret.targetString;
  self.dotBracketBreaks = ret.breaks;
  ret = self.removeBreaks(self.seq);
  self.seq = ret.targetString;
  self.seqBreaks = ret.breaks;
  self.rnaLength = self.dotbracket.length;

  if (!Object(_rnautils_js__WEBPACK_IMPORTED_MODULE_0__["arraysEqual"])(self.dotBracketBreaks, self.seqBreaks)) {
    console.log('WARNING: Sequence and structure breaks not equal');
    console.log('WARNING: Using the breaks in the structure');
  }

  self.computePairtable();

  self.addPositions = function (nodeType, positions) {
    var labelNodes = self.nodes.filter(function (d) {
      return d.nodeType == nodeType;
    });

    for (var i = 0; i < labelNodes.length; i++) {
      labelNodes[i].x = positions[i][0];
      labelNodes[i].y = positions[i][1];
    }

    return self;
  };

  self.breakNodesToFakeNodes = function () {
    // convert all the nodes following breaks to fake nodes
    var labelNodes = self.nodes.filter(function (d) {
      return d.nodeType == 'nucleotide';
    }); // if a node was an artifical break node, convert it to a middle

    for (var i = 0; i < labelNodes.length; i++) {
      if (self.dotBracketBreaks.indexOf(i) >= 0) {
        labelNodes[i].nodeType = 'middle';
        labelNodes[i + 1].nodeType = 'middle';
      }
    }

    var _loop = function _loop(_i) {
      broken = false; // change the elemType of the other nodes in the element containing
      // the break

      for (var j = 0; j < self.elements[_i][2].length; j++) {
        if (self.dotBracketBreaks.indexOf(self.elements[_i][2][j]) >= 0) broken = true;
      }

      if (broken) {
        self.elements[_i][2].map(function (x) {
          if (x == 0) return;
          self.nodes[x - 1].elemType = 'e';
        });
      } else {
        self.elements[_i][2].map(function (x) {
          if (x == 0) return;
          self.nodes[x - 1].elemType = self.elements[_i][0];
        });
      }
    };

    for (var _i = 0; _i < self.elements.length; _i++) {
      var broken;

      _loop(_i);
    }

    return self;
  };

  self.getPositions = function (nodeType) {
    var positions = [];
    var nucleotideNodes = self.nodes.filter(function (d) {
      return d.nodeType == nodeType;
    });

    for (var i = 0; i < nucleotideNodes.length; i++) {
      positions.push([nucleotideNodes[i].x, nucleotideNodes[i].y]);
    }

    return positions;
  };

  self.getUids = function () {
    /* Get the positions of each node so that they
     * can be passed to elementsToJson later
     */
    var uids = [];

    for (var i = 0; i < self.dotbracket.length; i++) {
      uids.push(self.nodes[i].uid);
    }

    return uids;
  };

  self.reinforceStems = function () {
    var pt = self.pairtable;
    var relevantElements = self.elements.filter(function (d) {
      return d[0] == 's' && d[2].length >= 4;
    });

    for (var i = 0; i < relevantElements.length; i++) {
      var allNucs = relevantElements[i][2];

      var _nucs = allNucs.slice(0, allNucs.length / 2);

      for (var j = 0; j < _nucs.length - 1; j++) {
        self.addFakeNode([_nucs[j], _nucs[j + 1], pt[_nucs[j + 1]], pt[_nucs[j]]]);
      }
    }

    return self;
  };

  self.reinforceLoops = function () {
    /*
     * Add a set of fake nodes to enforce the structure
     */
    var filterNucs = function filterNucs(d) {
      return d !== 0 && d <= self.dotbracket.length;
    };

    for (var i = 0; i < self.elements.length; i++) {
      if (self.elements[i][0] == 's' || !self.circularizeExternal && self.elements[i][0] == 'e') continue;
      var nucs = self.elements[i][2].filter(filterNucs);

      if (self.elements[i][0] == 'e') {
        var newNode1 = {
          'name': '',
          'num': -3,
          //'radius': 18 * radius -6,
          'radius': 0,
          'rna': self,
          'nodeType': 'middle',
          'elemType': 'f',
          'nucs': [],
          'x': self.nodes[self.rnaLength - 1].x,
          'y': self.nodes[self.rnaLength - 1].y,
          'px': self.nodes[self.rnaLength - 1].px,
          'py': self.nodes[self.rnaLength - 1].py,
          'uid': slugid__WEBPACK_IMPORTED_MODULE_1___default.a.nice()
        };
        var newNode2 = {
          'name': '',
          'num': -2,
          //'radius': 18 * radius -6,
          'radius': 0,
          'rna': self,
          'nodeType': 'middle',
          'elemType': 'f',
          'nucs': [],
          'x': self.nodes[0].x,
          'y': self.nodes[0].y,
          'px': self.nodes[0].px,
          'py': self.nodes[0].py,
          'uid': slugid__WEBPACK_IMPORTED_MODULE_1___default.a.nice()
        };
        nucs.push(self.nodes.length + 1);
        nucs.push(self.nodes.length + 2);
        self.nodes.push(newNode1);
        self.nodes.push(newNode2);
      }

      self.addFakeNode(nucs);
    }

    return self;
  };

  self.updateLinkUids = function () {
    for (var i = 0; i < self.links.length; i++) {
      self.links[i].uid = self.links[i].source.uid + self.links[i].target.uid;
    }

    return self;
  };

  self.addFakeNode = function (nucs) {
    var linkLength = 18; //make sure this is consistent with the value in force.js

    var nodeWidth = 6;
    var angle = 3.1415 * 2 / (2 * nucs.length);
    var radius = linkLength / (2 * Math.tan(angle));
    var fakeNodeUid = '';

    for (var i = 0; i < nucs.length; i++) {
      fakeNodeUid += self.nodes[nucs[i] - 1].uid;
    }

    var newNode = {
      'name': '',
      'num': -1,
      //'radius': 18 * radius -6,
      'radius': radius,
      'rna': self,
      'nodeType': 'middle',
      'elemType': 'f',
      'nucs': nucs,
      'uid': fakeNodeUid
    };
    self.nodes.push(newNode);
    var newX = 0;
    var newY = 0;
    var coordsCounted = 0;
    angle = (nucs.length - 2) * 3.14159 / (2 * nucs.length);
    radius = 0.5 / Math.cos(angle);

    for (var j = 0; j < nucs.length; j++) {
      if (nucs[j] === 0 || nucs[j] > self.dotbracket.length) continue; //link to the center node

      self.links.push({
        'source': self.nodes[nucs[j] - 1],
        'target': self.nodes[self.nodes.length - 1],
        'linkType': 'fake',
        'value': radius,
        'uid': slugid__WEBPACK_IMPORTED_MODULE_1___default.a.nice()
      });

      if (nucs.length > 4) {
        //link across the loop
        self.links.push({
          'source': self.nodes[nucs[j] - 1],
          'target': self.nodes[nucs[(j + Math.floor(nucs.length / 2)) % nucs.length] - 1],
          'linkType': 'fake',
          'value': radius * 2,
          'uid': slugid__WEBPACK_IMPORTED_MODULE_1___default.a.nice()
        });
      }

      var ia = (nucs.length - 2) * 3.14159 / nucs.length;
      var c = 2 * Math.cos(3.14159 / 2 - ia / 2); //link to over-neighbor

      self.links.push({
        'source': self.nodes[nucs[j] - 1],
        'target': self.nodes[nucs[(j + 2) % nucs.length] - 1],
        'linkType': 'fake',
        'value': c
      }); // calculate the mean of the coordinats in this loop
      // and place the fake node there

      var fromNode = self.nodes[nucs[j] - 1];

      if ('x' in fromNode) {
        newX += fromNode.x;
        newY += fromNode.y;
        coordsCounted += 1;
      }
    }

    if (coordsCounted > 0) {
      // the nucleotides had set positions so we can calculate the position
      // of the fake node
      newNode.x = newX / coordsCounted;
      newNode.y = newY / coordsCounted;
      newNode.px = newNode.x;
      newNode.py = newNode.y;
    }

    return self;
  };

  self.connectFakeNodes = function () {
    var linkLength = 18; // We want to be able to connect all of the fake nodes
    // and create a structure consisting of just them

    var filterOutNonFakeNodes = function filterOutNonFakeNodes(d) {
      return d.nodeType == 'middle';
    };

    var nucsToNodes = {};
    var fakeNodes = self.nodes.filter(filterOutNonFakeNodes);
    var linked = {}; // initialize the nucleotides to nodes

    for (var i = 1; i <= self.nodes.length; i++) {
      nucsToNodes[i] = [];
    }

    for (var i = 0; i < fakeNodes.length; i++) {
      var thisNode = fakeNodes[i]; // each fake node represents a certain set of nucleotides (thisNode.nucs)

      for (var j = 0; j < thisNode.nucs.length; j++) {
        var thisNuc = thisNode.nucs[j]; // check to see if this nucleotide has been seen in another fake node
        // if it has, then we add a link between the two nodes

        for (var k = 0; k < nucsToNodes[thisNuc].length; k++) {
          if (JSON.stringify([nucsToNodes[thisNuc][k].uid, thisNode.uid].sort()) in linked) continue; //already linked

          var distance = nucsToNodes[thisNuc][k].radius + thisNode.radius;
          self.links.push({
            'source': nucsToNodes[thisNuc][k],
            'target': thisNode,
            'value': distance / linkLength,
            'linkType': 'fake_fake'
          }); // note that we've already seen this link

          linked[JSON.stringify([nucsToNodes[thisNuc][k].uid, thisNode.uid].sort())] = true;
        }

        nucsToNodes[thisNuc].push(thisNode);
      }
    }

    return self;
  };

  self.addExtraLinks = function (extraLinks) {
    if (typeof extraLinks == 'undefined') return self;

    for (var i = 0; i < extraLinks.length; i++) {
      var source = self.getNodeFromNucleotides(extraLinks[i].from);
      var target = self.getNodeFromNucleotides(extraLinks[i].to);
      var newLink = {
        'source': source,
        'target': target,
        'linkType': 'extra',
        'extraLinkType': extraLinks[i].linkType,
        'uid': slugid__WEBPACK_IMPORTED_MODULE_1___default.a.nice()
      };
      self.links.push(newLink);
    }

    return self;
  };

  self.elementsToJson = function () {
    /* Convert a set of secondary structure elements to a json
     * representation of the graph that can be used with d3's
     * force-directed layout to generate a visualization of
     * the structure.
     */
    var pt = self.pairtable;
    var elements = self.elements;
    self.nodes = [];
    self.links = []; //create a reverse lookup so we can find out the type
    //of element that a node is part of

    var elemTypes = {}; //sort so that we count stems last

    self.elements.sort();

    for (var i = 0; i < self.elements.length; i++) {
      var nucs = self.elements[i][2];

      for (var j = 0; j < nucs.length; j++) {
        elemTypes[nucs[j]] = self.elements[i][0];
      }
    }

    for (var _i2 = 1; _i2 <= pt[0]; _i2++) {
      var nodeName = self.seq[_i2 - 1];

      if (self.dotBracketBreaks.indexOf(_i2 - 1) >= 0 || self.dotBracketBreaks.indexOf(_i2 - 2) >= 0) {
        nodeName = '';
      } //create a node for each nucleotide


      self.nodes.push({
        'name': nodeName,
        'num': startNumber + _i2 - 1,
        'radius': 5,
        'rna': self,
        'nodeType': 'nucleotide',
        'structName': self.structName,
        'elemType': elemTypes[_i2],
        'uid': slugid__WEBPACK_IMPORTED_MODULE_1___default.a.nice(),
        'linked': false
      });
    }

    for (var _i3 = 0; _i3 < self.nodes.length; _i3++) {
      if (_i3 === 0) self.nodes[_i3].prevNode = null;else {
        self.nodes[_i3].prevNode = self.nodes[_i3 - 1];
      }
      if (_i3 == self.nodes.length - 1) self.nodes[_i3].nextNode = null;else {
        self.nodes[_i3].nextNode = self.nodes[_i3 + 1];
      }
    }

    for (var _i4 = 1; _i4 <= pt[0]; _i4++) {
      if (pt[_i4] !== 0) {
        // base-pair links
        self.links.push({
          'source': self.nodes[_i4 - 1],
          'target': self.nodes[pt[_i4] - 1],
          'linkType': 'basepair',
          'value': 1,
          'uid': slugid__WEBPACK_IMPORTED_MODULE_1___default.a.nice()
        });
      }

      if (_i4 > 1) {
        // backbone links
        if (self.dotBracketBreaks.indexOf(_i4 - 1) === -1 && self.dotBracketBreaks.indexOf(_i4 - 2) == -1 && self.dotBracketBreaks.indexOf(_i4 - 3) == -1) {
          // there is no break in the strands here
          // we can add a backbone link
          self.links.push({
            'source': self.nodes[_i4 - 2],
            'target': self.nodes[_i4 - 1],
            'linkType': 'backbone',
            'value': 1,
            'uid': slugid__WEBPACK_IMPORTED_MODULE_1___default.a.nice()
          });
          self.nodes[_i4 - 1].linked = true;
        }
      }
    } //add the pseudoknot links


    for (var _i5 = 0; _i5 < self.pseudoknotPairs.length; _i5++) {
      self.links.push({
        'source': self.nodes[self.pseudoknotPairs[_i5][0] - 1],
        'target': self.nodes[self.pseudoknotPairs[_i5][1] - 1],
        'linkType': 'pseudoknot',
        'value': 1,
        'uid': slugid__WEBPACK_IMPORTED_MODULE_1___default.a.nice()
      });
    }

    if (self.circular) {
      self.links.push({
        'source': self.nodes[0],
        'target': self.nodes[self.rnaLength - 1],
        'linkType': 'backbone',
        'value': 1,
        'uid': slugid__WEBPACK_IMPORTED_MODULE_1___default.a.nice()
      });
    }

    return self;
  };

  self.ptToElements = function (pt, level, i, j) {
    /* Convert a pair table to a list of secondary structure
     * elements:
     *
     * [['s',1,[2,3]]
     *
     * The 's' indicates that an element can be a stem. It can also be
     * an interior loop ('i'), a hairpin loop ('h') or a multiloop ('m')
     *
     * The second number (1 in this case) indicates the depth or
     * how many base pairs have to be broken to get to this element.
     *
     * Finally, there is the list of nucleotides which are part of
     * of this element.
     */
    var elements = [];
    var u5 = [i - 1];
    var u3 = [j + 1];
    if (i > j) return []; //iterate over the unpaired regions on either side
    //this is either 5' and 3' unpaired if level == 0
    //or an interior loop or a multiloop

    for (; pt[i] === 0; i++) {
      u5.push(i);
    }

    for (; pt[j] === 0; j--) {
      u3.push(j);
    }

    if (i > j) {
      //hairpin loop or one large unpaired molecule
      u5.push(i);
      if (level === 0) return [['e', level, u5.sort(numberSort)]];else {
        // check to see if we have chain breaks due
        // to multiple strands in the input
        var external = false;
        var left = [];
        var right = [];

        for (var k = 0; k < u5.length; k++) {
          if (external) right.push(u5[k]);else left.push(u5[k]);
          if (self.dotBracketBreaks.indexOf(u5[k]) >= 0) external = true;
        }

        if (external) {
          return [['h', level, u5.sort(numberSort)]];
        } else // if not, this is a simple hairpin loop
          return [['h', level, u5.sort(numberSort)]];
      }
    }

    if (pt[i] != j) {
      //multiloop
      var m = u5;
      var k = i; // the nucleotide before and the starting nucleotide

      m.push(k);

      while (k <= j) {
        // recurse into a stem
        elements = elements.concat(self.ptToElements(pt, level, k, pt[k])); // add the nucleotides between stems

        m.push(pt[k]);
        k = pt[k] + 1;

        for (; pt[k] === 0 && k <= j; k++) {
          m.push(k);
        }

        m.push(k);
      }

      m.pop();
      m = m.concat(u3);

      if (m.length > 0) {
        if (level === 0) elements.push(['e', level, m.sort(numberSort)]);else elements.push(['m', level, m.sort(numberSort)]);
      }

      return elements;
    }

    if (pt[i] === j) {
      //interior loop
      u5.push(i);
      u3.push(j);
      var combined = u5.concat(u3);

      if (combined.length > 4) {
        if (level === 0) elements.push(['e', level, u5.concat(u3).sort(numberSort)]);else elements.push(['i', level, u5.concat(u3).sort(numberSort)]);
      }
    }

    var s = []; //go through the stem

    while (pt[i] === j && i < j) {
      //one stem
      s.push(i);
      s.push(j);
      i += 1;
      j -= 1;
      level += 1;
    }

    u5 = [i - 1];
    u3 = [j + 1];
    elements.push(['s', level, s.sort(numberSort)]);
    return elements.concat(self.ptToElements(pt, level, i, j));
  };

  self.addLabels = function () {
    var startNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var labelInterval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    if (labelInterval === 0) return self;

    for (var i = 1; i <= self.rnaLength; i++) {
      // add labels
      if (i % labelInterval === 0) {
        //create a node for each label
        var newX = void 0,
            newY = void 0;
        var thisNode = self.nodes[i - 1];
        var prevNode = void 0,
            nextNode = void 0;
        var prevVec = void 0,
            nextVec = void 0;

        if (self.rnaLength == 1) {
          nextVec = [thisNode.x - 15, thisNode.y];
          prevVec = [thisNode.x - 15, thisNode.y];
        } else {
          // if we're labelling the first node, then label it in relation to the last
          if (i == 1) prevNode = self.nodes[self.rnaLength - 1];else prevNode = self.nodes[i - 2]; // if we're labelling the last node, then label it in relation to the first

          if (i == self.rnaLength) nextNode = self.nodes[0];else nextNode = self.nodes[i]; // this nucleotide and its neighbors are paired

          if (self.pairtable[nextNode.num - startNumber + 1] !== 0 && self.pairtable[prevNode.num - startNumber + 1] !== 0 && self.pairtable[thisNode.num - startNumber + 1] !== 0) {
            prevNode = nextNode = self.nodes[self.pairtable[thisNode.num - startNumber + 1] - 1];
          } // this node is paired but at least one of its neighbors is unpaired
          // place the label in the direction of the two neighbors


          if (self.pairtable[thisNode.num - startNumber + 1] !== 0 && (self.pairtable[nextNode.num - startNumber + 1] === 0 || self.pairtable[prevNode.num - startNumber + 1] === 0)) {
            nextVec = [thisNode.x - nextNode.x, thisNode.y - nextNode.y];
            prevVec = [thisNode.x - prevNode.x, thisNode.y - prevNode.y];
          } else {
            nextVec = [nextNode.x - thisNode.x, nextNode.y - thisNode.y];
            prevVec = [prevNode.x - thisNode.x, prevNode.y - thisNode.y];
          }
        }

        var combinedVec = [nextVec[0] + prevVec[0], nextVec[1] + prevVec[1]];
        var vecLength = Math.sqrt(combinedVec[0] * combinedVec[0] + combinedVec[1] * combinedVec[1]);
        var normedVec = [combinedVec[0] / vecLength, combinedVec[1] / vecLength];
        var offsetVec = [-15 * normedVec[0], -15 * normedVec[1]];
        newX = self.nodes[i - 1].x + offsetVec[0];
        newY = self.nodes[i - 1].y + offsetVec[1];
        var newNode = {
          'name': i + startNumber - 1,
          'num': -1,
          'radius': 6,
          'rna': self,
          'nodeType': 'label',
          'structName': self.structName,
          'elemType': 'l',
          'x': newX,
          'y': newY,
          'px': newX,
          'py': newY,
          'uid': slugid__WEBPACK_IMPORTED_MODULE_1___default.a.nice()
        };
        var newLink = {
          'source': self.nodes[i - 1],
          'target': newNode,
          'value': 1,
          'linkType': 'label_link',
          'uid': slugid__WEBPACK_IMPORTED_MODULE_1___default.a.nice()
        };
        self.nodes.push(newNode);
        self.links.push(newLink);
      }
    }

    return self;
  };

  self.recalculateElements = function () {
    self.removePseudoknots();
    self.elements = self.ptToElements(self.pairtable, 0, 1, self.dotbracket.length);

    if (self.circular) {
      //check to see if the external loop is a hairpin or a multiloop
      var externalLoop = self.elements.filter(function (d) {
        if (d[0] == 'e') return true;
      });

      if (externalLoop.length > 0) {
        eloop = externalLoop[0];
        nucs = eloop[2].sort(numberSort);
        prev = nucs[0];
        hloop = true;
        numGreater = 0;

        for (var i = 1; i < nucs.length; i++) {
          if (nucs[i] - prev > 1) {
            numGreater += 1;
          }

          prev = nucs[i];
        }

        if (numGreater == 1) {
          eloop[0] = 'h';
        } else if (numGreater == 2) {
          eloop[0] = 'i';
        } else {
          eloop[0] = 'm';
        }
      }
    }

    return self;
  };

  self.reassignLinkUids = function () {
    // reassign uids to the links, corresponding to the uids of the two nodes
    // they connect
    var i;

    for (var i = 0; i < self.links.length; i++) {
      self.links[i].uid = self.links[i].source.uid + self.links[i].target.uid;
    }

    return self;
  };

  self.removePseudoknots = function () {
    if (self.pairtable.length > 1) self.pseudoknotPairs = self.pseudoknotPairs.concat(_rnautils_js__WEBPACK_IMPORTED_MODULE_0__["rnaUtilities"].removePseudoknotsFromPairtable(self.pairtable));
    return self;
  };

  self.addPseudoknots = function () {
    /* Add all of the pseudoknot pairs which are stored outside
     * of the pairtable back to the pairtable
     */
    var pt = self.pairtable;
    var pseudoknotPairs = self.pseudoknotPairs;

    for (var i = 0; i < pseudoknotPairs.length; i++) {
      pt[pseudoknotPairs[i][0]] = pseudoknotPairs[i][1];
      pt[pseudoknotPairs[i][1]] = pseudoknotPairs[i][0];
    }

    self.pseudoknotPairs = [];
    return self;
  };

  self.addName = function (name) {
    if (typeof name == 'undefined') {
      self.name = '';
      return self;
    } else {
      self.name = name;
      return self;
    }
  };

  if (self.rnaLength > 0) self.recalculateElements();

  self.getNodeFromNucleotides = function (nucs) {
    /* Get a node given a nucleotide number or an array of nucleotide
     * numbers indicating an element node */
    if (Object.prototype.toString.call(nucs) === '[object Array]') {
      for (var j = 0; j < self.nodes.length; j++) {
        if ('nucs' in self.nodes[j]) {
          if (self.nodes[j].nucs.equals(nucs)) {
            return self.nodes[j];
          }
        }
      }
    } else {
      for (var _j = 0; _j < self.nodes.length; _j++) {
        if (self.nodes[_j].num == nucs) {
          return self.nodes[_j];
        }
      }
    }

    console.log('ERROR: No node found for nucs:', nucs);
    return null;
  };
}
function moleculesToJson(moleculesJson) {
  /* Convert a list of RNA and protein molecules to a list of RNAGraph
   * ProteinGraph and extraLinks structure */
  var nodes = {}; //index the nodes by uid

  var graphs = [];
  var extraLinks = []; // Create the graphs for each molecule

  for (var i = 0; i < moleculesJson.molecules.length; i++) {
    var molecule = moleculesJson.molecules[i];
    var rg;

    if (molecule.type == 'rna') {
      rg = new RNAGraph(molecule.seq, molecule.ss, molecule.header);
      rg.circularizeExternal = true;
      rg.elementsToJson().addPositions('nucleotide', molecule.positions).addLabels().reinforceStems().reinforceLoops();
    } else if (molecule.type == 'protein') {
      rg = new ProteinGraph(molecule.header, molecule.size);
    }

    rg.addUids(molecule.uids);

    for (var j = 0; j < rg.nodes.length; j++) {
      nodes[rg.nodes[j].uid] = rg.nodes[j];
    }

    graphs.push(rg);
  } //Add the extra links


  for (var i = 0; i < moleculesJson.extraLinks.length; i++) {
    link = moleculesJson.extraLinks[i];
    link.source = nodes[link.source];
    link.target = nodes[link.target];
    link.uid = slugid__WEBPACK_IMPORTED_MODULE_1___default.a.nice();
    extraLinks.push(link);
  }

  return {
    'graphs': graphs,
    'extraLinks': extraLinks
  };
}
;

/***/ }),

/***/ "./src/rnaplot.js":
/*!************************!*\
  !*** ./src/rnaplot.js ***!
  \************************/
/*! exports provided: rnaPlot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rnaPlot", function() { return rnaPlot; });
/* harmony import */ var _rnagraph_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rnagraph.js */ "./src/rnagraph.js");
/* harmony import */ var _simplernaplot_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./simplernaplot.js */ "./src/simplernaplot.js");
/* harmony import */ var _naview_naview_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./naview/naview.js */ "./src/naview/naview.js");
/* harmony import */ var _styles_rnaplot_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/rnaplot.css */ "./styles/rnaplot.css");
/* harmony import */ var _styles_rnaplot_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_rnaplot_css__WEBPACK_IMPORTED_MODULE_3__);




function rnaPlot() {
  var passedOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = {
    'width': 300,
    'height': 300,
    'nucleotideRadius': 5,
    'rnaEdgePadding': 1,
    // how far the leftmost, rightmost, topmost and bottomost
    // nucleotides are from the edge of the plot
    'labelInterval': 10,
    'showNucleotideLabels': true,
    'startNucleotideNumber': 1,
    'bundleExternalLinks': false,
    'rnaLayout': 'simple',
    // simple or naview
    'namePosition': '0 0' // for x and y either 0, 0.5 or 1

  };
  var options = Object.assign(options, passedOptions);
  var xScale, yScale;

  function createTransformToFillViewport(xValues, yValues) {
    // create transform that will scale the x and y values so that
    // they fill the available viewport
    var xExtent = d3.extent(xValues);
    var yExtent = d3.extent(yValues); // add the radius of the nucleotides

    xExtent[0] -= options.nucleotideRadius + options.rnaEdgePadding;
    yExtent[0] -= options.nucleotideRadius + options.rnaEdgePadding;
    xExtent[1] += options.nucleotideRadius + options.rnaEdgePadding;
    yExtent[1] += options.nucleotideRadius + options.rnaEdgePadding; // find out how wide and height the molecule

    var xRange = xExtent[1] - xExtent[0];
    var yRange = yExtent[1] - yExtent[0]; // how much wider / taller is it than the available viewport

    var xExtra = xRange - options.width;
    var yExtra = yRange - options.height; // once we have a scale for one dimension, we can create the scale for the other
    // keeping the same expansion / shrinking ratio

    function createOtherScale(firstScale, newDomain, newRange) {
      var scaleFactor = (firstScale.range()[1] - firstScale.range()[0]) / (firstScale.domain()[1] - firstScale.domain()[0]);
      var newWidth = (newDomain[1] - newDomain[0]) * scaleFactor;
      var newMargin = (newRange[1] - newRange[0] - newWidth) / 2;
      return {
        'scaleFactor': scaleFactor,
        'scale': d3.scale.linear().domain(newDomain).range([newRange[0] + newMargin, newRange[1] - newMargin])
      };
    }

    var ret;

    if (xExtra > yExtra) {
      // we have to shrink more in the x-dimension than the y
      xScale = d3.scale.linear().domain(xExtent).range([0, options.width]);
      ret = createOtherScale(xScale, yExtent, [0, options.height]);
      yScale = ret.scale;
    } else {
      // we have to shrink more in the x-dimension than the y
      yScale = d3.scale.linear().domain(yExtent).range([0, options.height]);
      ret = createOtherScale(yScale, xExtent, [0, options.width]);
      xScale = ret.scale;
    }

    var xOffset = xScale.range()[0] - xScale.domain()[0];
    var yOffset = yScale.range()[0] - yScale.domain()[0];
    return 'translate(' + -(xScale.domain()[0] * ret.scaleFactor - xScale.range()[0]) + ',' + -(yScale.domain()[0] * ret.scaleFactor - yScale.range()[0]) + ')' + 'scale(' + ret.scaleFactor + ')';
  }

  function createNucleotides(selection, nucleotideNodes) {
    // create groupings for each nucleotide and label
    var gs = selection.selectAll('.rna-base').data(nucleotideNodes).enter().append('svg:g').attr('transform', function (d) {
      return 'translate(' + d.x + ',' + d.y + ')';
    });
    var circles = gs.append('svg:circle').attr('data-base', function (d) {
      if (d.name) {
        return d.name.toLowerCase();
      }
    }).attr('r', options.nucleotideRadius).classed('rna-base', true);

    if (options.showNucleotideLabels) {
      var nucleotideLabels = gs.append('svg:text').text(function (d) {
        return d.name;
      }).attr('text-anchor', 'middle').attr('dominant-baseline', 'central').classed('nucleotide-label', true).append('svg:title').text(function (d) {
        return d.struct_name + ':' + d.num;
      });
    }
  }

  function createLabels(selection, labelNodes) {
    // create groupings for each nucleotide and label
    var gs = selection.selectAll('.rnaLabel').data(labelNodes).enter().append('svg:g').attr('transform', function (d) {
      return 'translate(' + d.x + ',' + d.y + ')';
    });
    var circles = gs.append('svg:circle').attr('r', options.nucleotideRadius).classed('rna-base', true).classed('label', true);
    var numberLabels = gs.append('svg:text').text(function (d) {
      return d.name;
    }).attr('text-anchor', 'middle').attr('font-weight', 'bold').attr('dominant-baseline', 'central').classed('number-label', true);
  }

  function createName(selection, name) {
    var nameLabel = selection.append('svg:text') //.attr('dy', -10)
    .classed('rna-name', true).attr('text-anchor', 'middle').attr('alignment-baseline', 'central').text(name);
    var xyPos = options.namePosition.split(" ", 2); // 0 0.5 1

    var xy = [];
    var textBBox = nameLabel.node().getBBox();
    var textSize = [textBBox.width, textBBox.height];
    var plotSize = [options.width, options.height];

    for (var p in [0, 1]) {
      switch (xyPos[p]) {
        case '0':
          xy[p] = textSize[p] / 2;
          break;

        case '1':
          xy[p] = plotSize[p] - textSize[p] / 2;
          break;

        case '0.5':
          xy[p] = plotSize[p] / 2;
          break;
      }
    }

    nameLabel.attr('x', xy[0]).attr('y', xy[1]);
  }

  function makeExternalLinksBundle(selection, links) {
    var nodesDict = {};
    var linksList = [];
    links = links.filter(function (d) {
      return d.linkType == 'correct' || d.linkType == 'incorrect' || d.linkType == 'extra';
    });
    selection.selectAll('[link-type=extra]').remove();

    for (var i = 0; i < links.length; i++) {
      if (links[i].source === null || links[i].target === null) continue;
      nodesDict[links[i].source.uid] = links[i].source;
      nodesDict[links[i].target.uid] = links[i].target;
      linksList.push({
        'source': links[i].source.uid,
        'target': links[i].target.uid,
        'linkType': links[i].linkType,
        'extraLinkType': links[i].extraLinkType
      });
    }

    var fbundling = d3.ForceEdgeBundling().nodes(nodesDict).edges(linksList).compatibility_threshold(0.8).step_size(0.2);
    var results = fbundling();
    var d3line = d3.svg.line().x(function (d) {
      return d.x;
    }).y(function (d) {
      return d.y;
    }).interpolate('linear');

    for (var i = 0; i < results.length; i++) {
      var edge_subpoint_data = results[i]; // for each of the arrays in the results
      // draw a line between the subdivions points for that edge

      selection.append('path').attr('d', d3line(edge_subpoint_data)).style('fill', 'none').attr('link-type', function (d) {
        return linksList[i].linkType;
      }).attr('extra-link-type', function (d) {
        return linksList[i].extraLinkType;
      }).style('stroke-opacity', 0.4); //use opacity as blending
    }
  }

  function createLinks(selection, links) {
    links = links.filter(function (d) {
      return d.source !== null && d.target !== null;
    });
    var gs = selection.selectAll('.rna-link').data(links).enter().append('svg:line').attr('x1', function (d) {
      return d.source.x;
    }).attr('x2', function (d) {
      return d.target.x;
    }).attr('y1', function (d) {
      return d.source.y;
    }).attr('y2', function (d) {
      return d.target.y;
    }).attr('link-type', function (d) {
      return d.linkType;
    }).attr('extra-link-type', function (d) {
      return d.extraLinkType;
    }).classed('rna-link', true);
  }

  function chart(selection) {
    selection.each(function (data) {
      var plot = d3.select(this).append('g').classed('rnaplot', true); // data should be a dictionary containing at least a structure
      // and possibly a sequence

      var rg = new _rnagraph_js__WEBPACK_IMPORTED_MODULE_0__["RNAGraph"](data.sequence, data.structure, data.name, options.startNucleotideNumber).recalculateElements().elementsToJson().addName(data.name);
      data.rnaGraph = rg; // calculate the position of each nucleotide
      // the positions of the labels will be calculated in
      // the addLabels function

      var positions = [];

      if (options.rnaLayout === 'naview') {
        var naview = new _naview_naview_js__WEBPACK_IMPORTED_MODULE_2__["NAView"]();
        var naViewPositions = naview.naview_xy_coordinates(rg.pairtable);

        for (var i = 0; i < naViewPositions.nbase; i++) {
          positions.push([naViewPositions.x[i], naViewPositions.y[i]]);
        }
      } else {
        positions = Object(_simplernaplot_js__WEBPACK_IMPORTED_MODULE_1__["simpleXyCoordinates"])(rg.pairtable);
      }

      rg.addPositions('nucleotide', positions) //.reinforceStems()
      //.reinforceLoops()
      //.addExtraLinks(data.extraLinks)
      .addLabels(options.startNucleotideNumber, options.labelInterval); // create a transform that will fit the molecule to the
      // size of the viewport (canvas, svg, whatever)            

      var fillViewportTransform = createTransformToFillViewport(rg.nodes.map(function (d) {
        return d.x;
      }), rg.nodes.map(function (d) {
        return d.y;
      }));
      plot.attr('transform', fillViewportTransform);
      var nucleotideNodes = rg.nodes.filter(function (d) {
        return d.nodeType == 'nucleotide';
      });
      var labelNodes = rg.nodes.filter(function (d) {
        return d.nodeType == 'label';
      });
      var links = rg.links;
      createLinks(plot, links);
      createNucleotides(plot, nucleotideNodes);
      createLabels(plot, labelNodes);
      createName(d3.select(this), data.name);

      if (options.bundleExternalLinks) {
        makeExternalLinksBundle(plot, links);
      }
    });
  }

  chart.width = function (_) {
    if (!arguments.length) return options.width;
    options.width = _;
    return chart;
  };

  chart.height = function (_) {
    if (!arguments.length) return options.height;
    options.height = _;
    return chart;
  };

  chart.showNucleotideLabels = function (_) {
    if (!arguments.length) return options.showNucleotideLabels;
    options.showNucleotideLabels = _;
    return chart;
  };

  chart.rnaEdgePadding = function (_) {
    if (!arguments.length) return options.rnaEdgePadding;
    options.rnaEdgePadding = _;
    return chart;
  };

  chart.nucleotideRadius = function (_) {
    if (!arguments.length) return options.nucleotideRadius;
    options.nucleotideRadius = _;
    return chart;
  };

  chart.labelInterval = function (_) {
    if (!arguments.length) return options.labelInterval;
    options.labelInterval = _;
    return chart;
  };

  chart.showNucleotideLabels = function (_) {
    if (!arguments.length) return options.showNucleotideLabels;
    options.showNucleotideLabels = _;
    return chart;
  };

  chart.startNucleotideNumber = function (_) {
    if (!arguments.length) return options.startNucleotideNumber;
    options.startNucleotideNumber = _;
    return chart;
  };

  chart.bundleExternalLinks = function (_) {
    if (!arguments.length) return options.bundleExternalLinks;
    options.bundleExternalLinks = _;
    return chart;
  };

  chart.rnaLayout = function (_) {
    if (!arguments.length) return options.rnaLayout;
    options.rnaLayout = _;
    return chart;
  };

  chart.namePosition = function (_) {
    if (!arguments.length) return options.namePosition;
    options.namePosition = _;
    return chart;
  };

  return chart;
}

/***/ }),

/***/ "./src/rnatreemap.js":
/*!***************************!*\
  !*** ./src/rnatreemap.js ***!
  \***************************/
/*! exports provided: rnaTreemap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rnaTreemap", function() { return rnaTreemap; });
/* harmony import */ var _rnaplot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rnaplot.js */ "./src/rnaplot.js");
/* harmony import */ var _styles_rnaplot_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/rnaplot.css */ "./styles/rnaplot.css");
/* harmony import */ var _styles_rnaplot_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_rnaplot_css__WEBPACK_IMPORTED_MODULE_1__);


function rnaTreemap(passedOptions) {
  var options = {
    'width': 300,
    'height': 300,
    'nucleotideRadius': 5,
    'rnaEdgePadding': 1,
    // how far the leftmost, rightmost, topmost and bottomost
    // nucleotides are from the edge of the plot
    'labelInterval': 10,
    'showNucleotideLabels': true,
    'startNucleotideNumber': 1,
    'bundleExternalLinks': false,
    'rnaLayout': 'simple',
    // simple or naview
    'namePosition': '0 0' // for x and y either 0, 0.5 or 1

  };
  var options = Object.assign(options, passedOptions);

  function rnaTreemapNode(selection) {
    // create a background rectangle for each RNA structure
    selection.each(function (d) {
      d3.select(this).attr('transform', function (d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      }).append('rect').attr('width', function (d) {
        return Math.max(0, d.dx);
      }).attr('height', function (d) {
        return Math.max(0, d.dy);
      }); // draw the actual RNA structure

      var chart = Object(_rnaplot_js__WEBPACK_IMPORTED_MODULE_0__["rnaPlot"])(options).width(Math.max(0, d.dx)).height(Math.max(0, d.dy));
      if ('structure' in d) d3.select(this).call(chart);
    });
  }

  var chart = function chart(selection) {
    selection.each(function (data) {
      console.log('data:', data); // initialize the treemap structure
      // sample input
      // { 'name': 'blah',
      // 'children: [{'structure': '..((..))',
      //               'sequence': 'ACCGGCC',
      //               'size': 50}]
      // }

      var treemap = d3.layout.treemap().size([options.width, options.height]).sticky(false).value(function (d) {
        return d.size;
      }); // create a new <g> for each node in the treemap
      // this may be a little redundant, since we expect the calling
      // selection to contain their own g elements

      var gEnter = d3.select(this).append('g').classed('rnatreemap', true);
      var treemapGnodes = gEnter.datum(data).selectAll('.treemapnode').data(treemap.nodes).enter().append('g').classed('treemapnode', true).call(rnaTreemapNode);
    });
  };

  chart.width = function (_) {
    if (!arguments.length) return options.width;
    options.width = _;
    return chart;
  };

  chart.height = function (_) {
    if (!arguments.length) return options.height;
    options.height = _;
    return chart;
  };

  chart.showNucleotideLabels = function (_) {
    if (!arguments.length) return options.showNucleotideLabels;
    options.showNucleotideLabels = _;
    return chart;
  };

  chart.rnaEdgePadding = function (_) {
    if (!arguments.length) return options.rnaEdgePadding;
    options.rnaEdgePadding = _;
    return chart;
  };

  chart.nucleotideRadius = function (_) {
    if (!arguments.length) return options.nucleotideRadius;
    options.nucleotideRadius = _;
    return chart;
  };

  chart.labelInterval = function (_) {
    if (!arguments.length) return options.labelInterval;
    options.labelInterval = _;
    return chart;
  };

  chart.showNucleotideLabels = function (_) {
    if (!arguments.length) return options.showNucleotideLabels;
    options.showNucleotideLabels = _;
    return chart;
  };

  chart.startNucleotideNumber = function (_) {
    if (!arguments.length) return options.startNucleotideNumber;
    options.startNucleotideNumber = _;
    return chart;
  };

  chart.bundleExternalLinks = function (_) {
    if (!arguments.length) return options.bundleExternalLinks;
    options.bundleExternalLinks = _;
    return chart;
  };

  chart.rnaLayout = function (_) {
    if (!arguments.length) return options.rnaLayout;
    options.rnaLayout = _;
    return chart;
  };

  chart.namePosition = function (_) {
    if (!arguments.length) return options.namePosition;
    options.namePosition = _;
    return chart;
  };

  chart.zoom = function (_) {
    if (!arguments.length) return options.zoom;
    options.zoom = _;
    return chart;
  };

  return chart;
}

/***/ }),

/***/ "./src/rnautils.js":
/*!*************************!*\
  !*** ./src/rnautils.js ***!
  \*************************/
/*! exports provided: arraysEqual, RNAUtilities, rnaUtilities, ColorScheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arraysEqual", function() { return arraysEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RNAUtilities", function() { return RNAUtilities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rnaUtilities", function() { return rnaUtilities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorScheme", function() { return ColorScheme; });
var numberSort = function numberSort(a, b) {
  return a - b;
};

function arraysEqual(a, b) {
  // courtesy of 
  // http://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (a.length != b.length) return false; // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}
function RNAUtilities() {
  var self = this; // the brackets to use when constructing dotbracket strings
  // with pseudoknots

  self.bracketLeft = "([{<ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  self.bracketRight = ")]}>abcdefghijklmnopqrstuvwxyz".split("");

  self.inverseBrackets = function (bracket) {
    var res = {};

    for (var i = 0; i < bracket.length; i++) {
      res[bracket[i]] = i;
    }

    return res;
  };

  self.maximumMatching = function maximumMatching(pt) {
    // Courtesy of the great Ronny Lorenz
    var n = pt[0];
    var TURN = 0; //minimal number of nucleotides in the hairpin

    /* array init */

    var mm = new Array(n + 1);

    for (var i = 0; i <= n; i++) {
      mm[i] = new Array(n + 1);

      for (var j = i; j <= n; j++) {
        mm[i][j] = 0;
      }
    }

    var maximum = 0;
    /* actual computation */

    for (var i = n - TURN - 1; i > 0; i--) {
      for (var j = i + TURN + 1; j <= n; j++) {
        maximum = mm[i][j - 1];

        for (var l = j - TURN - 1; l >= i; l--) {
          if (pt[l] === j) {
            // we have a base pair here
            maximum = Math.max(maximum, (l > i ? mm[i][l - 1] : 0) + 1 + (j - l - 1 > 0 ? mm[l + 1][j - 1] : 0));
          }
        }

        mm[i][j] = maximum;
      }
    }

    maximum = mm[1][n];
    return mm;
  };

  self.backtrackMaximumMatching = function (mm, oldPt) {
    var pt = Array.apply(null, Array(mm.length)).map(function () {
      return 0;
    }); //create an array containing zeros

    self.mmBt(mm, pt, oldPt, 1, mm.length - 1);
    return pt;
  };

  self.mmBt = function (mm, pt, oldPt, i, j) {
    // Create a pairtable from the backtracking
    var maximum = mm[i][j];
    var TURN = 0;
    if (j - i - 1 < TURN) return;
    /* no more pairs */

    if (mm[i][j - 1] == maximum) {
      /* j is unpaired */
      self.mmBt(mm, pt, oldPt, i, j - 1);
      return;
    }

    for (var q = j - TURN - 1; q >= i; q--) {
      /* j is paired with some q */
      if (oldPt[j] !== q) continue;
      var leftPart = q > i ? mm[i][q - 1] : 0;
      var enclosedPart = j - q - 1 > 0 ? mm[q + 1][j - 1] : 0;

      if (leftPart + enclosedPart + 1 == maximum) {
        // there's a base pair between j and q
        pt[q] = j;
        pt[j] = q;
        if (i < q) self.mmBt(mm, pt, oldPt, i, q - 1);
        self.mmBt(mm, pt, oldPt, q + 1, j - 1);
        return;
      }
    } //alert(i + "," + j + ": backtracking failed!");


    console.log('FAILED!!!' + i + ',' + j + ': backtracking failed!');
  };

  self.dotbracketToPairtable = function (dotbracket) {
    // create an array and initialize it to 0
    var pt = Array.apply(null, new Array(dotbracket.length + 1)).map(Number.prototype.valueOf, 0); //  the first element is always the length of the RNA molecule

    pt[0] = dotbracket.length; // store the pairing partners for each symbol

    var stack = {};

    for (var i = 0; i < self.bracketLeft.length; i++) {
      stack[i] = [];
    } // lookup the index of each symbol in the bracket array


    var inverseBracketLeft = self.inverseBrackets(self.bracketLeft);
    var inverseBracketRight = self.inverseBrackets(self.bracketRight);

    for (var i = 0; i < dotbracket.length; i++) {
      var a = dotbracket[i];
      var ni = i + 1;

      if (a == '.' || a == 'o') {
        // unpaired
        pt[ni] = 0;
      } else {
        if (a in inverseBracketLeft) {
          // open pair?
          stack[inverseBracketLeft[a]].push(ni);
        } else if (a in inverseBracketRight) {
          // close pair?
          var j = stack[inverseBracketRight[a]].pop();
          pt[ni] = j;
          pt[j] = ni;
        } else {
          throw "Unknown symbol in dotbracket string";
        }
      }
    }

    for (var key in stack) {
      if (stack[key].length > 0) {
        throw "Unmatched base at position " + stack[key][0];
      }
    }

    return pt;
  };

  self.insertIntoStack = function (stack, i, j) {
    var k = 0;

    while (stack[k].length > 0 && stack[k][stack[k].length - 1] < j) {
      k += 1;
    }

    stack[k].push(j);
    return k;
  };

  self.deleteFromStack = function (stack, j) {
    var k = 0;

    while (stack[k].length === 0 || stack[k][stack[k].length - 1] != j) {
      k += 1;
    }

    stack[k].pop();
    return k;
  };

  self.pairtableToDotbracket = function (pt) {
    // store the pairing partners for each symbol
    var stack = {};

    for (var i = 0; i < pt[0]; i++) {
      stack[i] = [];
    }

    var seen = {};
    var res = "";
    var i;

    for (var i = 1; i < pt[0] + 1; i++) {
      if (pt[i] !== 0 && pt[i] in seen) {
        throw "Invalid pairtable contains duplicate entries";
      }

      seen[pt[i]] = true;

      if (pt[i] === 0) {
        res += '.';
      } else {
        if (pt[i] > i) {
          res += self.bracketLeft[self.insertIntoStack(stack, i, pt[i])];
        } else {
          res += self.bracketRight[self.deleteFromStack(stack, i)];
        }
      }
    }

    return res;
  };

  self.findUnmatched = function (pt, from, to) {
    /*
     * Find unmatched nucleotides in this molecule.
     */
    var toRemove = [];
    var unmatched = [];
    var origFrom = from;
    var origTo = to;
    var i;

    for (var i = from; i <= to; i++) {
      if (pt[i] !== 0 && (pt[i] < from || pt[i] > to)) unmatched.push([i, pt[i]]);
    }

    for (var i = origFrom; i <= origTo; i++) {
      while (pt[i] === 0 && i <= origTo) {
        i++;
      }

      to = pt[i];

      while (pt[i] === to) {
        i++;
        to--;
      }

      toRemove = toRemove.concat(self.findUnmatched(pt, i, to));
    }

    if (unmatched.length > 0) toRemove.push(unmatched);
    return toRemove;
  };

  self.removePseudoknotsFromPairtable = function (pt) {
    /* Remove the pseudoknots from this structure in such a fashion
     * that the least amount of base-pairs need to be broken
     *
     * The pairtable is manipulated in place and a list of tuples
     * indicating the broken base pairs is returned.
     */
    var mm = self.maximumMatching(pt);
    var newPt = self.backtrackMaximumMatching(mm, pt);
    var removed = [];

    for (var i = 1; i < pt.length; i++) {
      if (pt[i] < i) continue;

      if (newPt[i] != pt[i]) {
        removed.push([i, pt[i]]);
        pt[pt[i]] = 0;
        pt[i] = 0;
      }
    }

    return removed;
  };

  self.ptToElements = function (pt, level, i, j, dotBracketBreaks) {
    /* Convert a pair table to a list of secondary structure 
     * elements:
     *
     * [['s',1,[2,3]]
     *
     * The 's' indicates that an element can be a stem. It can also be
     * an interior loop ('i'), a hairpin loop ('h') or a multiloop ('m')
     *
     * The second number (1 in this case) indicates the depth or
     * how many base pairs have to be broken to get to this element.
     *
     * Finally, there is the list of nucleotides which are part of
     * of this element.
     */
    var elements = [];
    var u5 = [i - 1];
    var u3 = [j + 1];
    if (arguments.length < 5) dotBracketBreaks = [];
    if (i > j) return []; //iterate over the unpaired regions on either side
    //this is either 5' and 3' unpaired if level == 0
    //or an interior loop or a multiloop

    for (; pt[i] === 0; i++) {
      u5.push(i);
    }

    for (; pt[j] === 0; j--) {
      u3.push(j);
    }

    if (i > j) {
      //hairpin loop or one large unpaired molecule
      u5.push(i);
      if (level === 0) return [['e', level, u5.sort(numberSort)]];else {
        // check to see if we have chain breaks due
        // to multiple strands in the input
        var external = false;
        var left = [];
        var right = [];

        for (var k = 0; k < u5.length; k++) {
          if (external) right.push(u5[k]);else left.push(u5[k]);
          if (dotBracketBreaks.indexOf(u5[k]) >= 0) external = true;
        }

        if (external) {
          return [['h', level, u5.sort(numberSort)]];
        } else // if not, this is a simple hairpin loop
          return [['h', level, u5.sort(numberSort)]];
      }
    }

    if (pt[i] != j) {
      //multiloop
      var m = u5;
      var k = i; // the nucleotide before and the starting nucleotide

      m.push(k);

      while (k <= j) {
        // recurse into a stem
        elements = elements.concat(self.ptToElements(pt, level, k, pt[k], dotBracketBreaks)); // add the nucleotides between stems

        m.push(pt[k]);
        k = pt[k] + 1;

        for (; pt[k] === 0 && k <= j; k++) {
          m.push(k);
        }

        m.push(k);
      }

      m.pop();
      m = m.concat(u3);

      if (m.length > 0) {
        if (level === 0) elements.push(['e', level, m.sort(numberSort)]);else elements.push(['m', level, m.sort(numberSort)]);
      }

      return elements;
    }

    if (pt[i] === j) {
      //interior loop
      u5.push(i);
      u3.push(j);
      var combined = u5.concat(u3);

      if (combined.length > 4) {
        if (level === 0) elements.push(['e', level, u5.concat(u3).sort(numberSort)]);else elements.push(['i', level, u5.concat(u3).sort(numberSort)]);
      }
    }

    var s = []; //go through the stem

    while (pt[i] === j && i < j) {
      //one stem
      s.push(i);
      s.push(j);
      i += 1;
      j -= 1;
      level += 1;
    }

    u5 = [i - 1];
    u3 = [j + 1];
    elements.push(['s', level, s.sort(numberSort)]);
    return elements.concat(self.ptToElements(pt, level, i, j, dotBracketBreaks));
  };
}
var rnaUtilities = new RNAUtilities();
function ColorScheme(colorsText) {
  var self = this;
  self.colorsText = colorsText;

  self.parseRange = function (rangeText) {
    //parse a number range such as 1-10 or 3,7,9 or just 7
    var parts = rangeText.split(',');
    var nums = [];

    for (var i = 0; i < parts.length; i++) {
      //could be 1 or 10-11  or something like that
      var parts1 = parts[i].split('-');
      if (parts1.length == 1) nums.push(parseInt(parts1[0]));else if (parts1.length == 2) {
        var from = parseInt(parts1[0]);
        var to = parseInt(parts1[1]); // add each number in this range

        for (var j = from; j <= to; j++) {
          nums.push(j);
        }
      } else {
        console.log('Malformed range (too many dashes):', rangeText);
      }
    }

    return nums;
  };

  self.parseColorText = function (colorText) {
    /* Parse the text of an RNA color string. Instructions and description
     * of the format are given below.
     *
     * The return is a json double dictionary indexed first by the 
     * molecule name, then by the nucleotide. This is then applied
     * by force.js to the RNAs it is displaying. When no molecule
     * name is specified, the color is applied to all molecules*/
    var lines = colorText.split('\n');
    var currMolecule = '';
    var counter = 1;
    var colorsJson = {
      colorValues: {
        '': {}
      },
      range: ['white', 'steelblue']
    };
    var domainValues = [];

    for (var i = 0; i < lines.length; i++) {
      if (lines[i][0] == '>') {
        // new molecule
        currMolecule = lines[i].trim().slice(1);
        counter = 1;
        colorsJson.colorValues[currMolecule] = {};
        continue;
      }

      var words = lines[i].trim().split(/[\s]+/);

      for (var j = 0; j < words.length; j++) {
        if (isNaN(words[j])) {
          if (words[j].search('range') === 0) {
            //there's a color scale in this entry
            var _parts = words[j].split('=');

            var partsRight = _parts[1].split(':');

            colorsJson.range = [partsRight[0], partsRight[1]];
            continue;
          }

          if (words[j].search('domain') == 0) {
            //there's a color scale in this entry
            var _parts2 = words[j].split('=');

            var _partsRight = _parts2[1].split(':');

            colorsJson.domain = [_partsRight[0], _partsRight[1]];
            continue;
          } // it's not a number, should be a combination 
          // of a number (nucleotide #) and a color


          var parts = words[j].split(':');
          var nums = self.parseRange(parts[0]);
          var color = parts[1];

          for (var k = 0; k < nums.length; k++) {
            if (isNaN(color)) {
              colorsJson.colorValues[currMolecule][nums[k]] = color;
            } else {
              colorsJson.colorValues[currMolecule][nums[k]] = +color;
              domainValues.push(Number(color));
            }
          }
        } else {
          //it's a number, so we add it to the list of values
          //seen for this molecule
          colorsJson.colorValues[currMolecule][counter] = Number(words[j]);
          counter += 1;
          domainValues.push(Number(words[j]));
        }
      }
    }

    if (!('domain' in colorsJson)) colorsJson.domain = [Math.min.apply(null, domainValues), Math.max.apply(null, domainValues)];
    self.colorsJson = colorsJson;
    return self;
  };

  self.normalizeColors = function () {
    /* 
     * Normalize the passed in values so that they range from
     * 0 to 1
     */
    var value;

    for (var moleculeName in self.colorsJson) {
      var minNum = Number.MAX_VALUE;
      var maxNum = Number.MIN_VALUE; // iterate once to find the min and max values;

      for (var resnum in self.colorsJson.colorValues[moleculeName]) {
        value = self.colorsJson.colorValues[moleculeName][resnum];

        if (typeof value == 'number') {
          if (value < minNum) minNum = value;
          if (value > maxNum) maxNum = value;
        }
      } // iterate again to normalize


      for (resnum in self.colorsJson.colorValues[moleculeName]) {
        value = self.colorsJson.colorValues[moleculeName][resnum];

        if (typeof value == 'number') {
          self.colorsJson.colorValues[moleculeName][resnum] = (value - minNum) / (maxNum - minNum);
        }
      }
    }

    return self;
  };

  self.parseColorText(self.colorsText);
  return self;
}

/***/ }),

/***/ "./src/simplernaplot.js":
/*!******************************!*\
  !*** ./src/simplernaplot.js ***!
  \******************************/
/*! exports provided: simpleXyCoordinates */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "simpleXyCoordinates", function() { return simpleXyCoordinates; });
function simpleXyCoordinates(pair_table) {
  var INIT_ANGLE = 0.;
  /* initial bending angle */

  var INIT_X = 100.;
  /* coordinate of first digit */

  var INIT_Y = 100.;
  /* see above */

  var RADIUS = 15.;
  var x = [],
      y = [];
  var i, len;
  var alpha;
  len = pair_table[0];
  var angle = Array.apply(null, new Array(len + 5)).map(Number.prototype.valueOf, 0);
  var loop_size = Array.apply(null, new Array(16 + Math.floor(len / 5))).map(Number.prototype.valueOf, 0);
  var stack_size = Array.apply(null, new Array(16 + Math.floor(len / 5))).map(Number.prototype.valueOf, 0);
  var lp = 0;
  var stk = 0;
  var PIHALF = Math.PI / 2;

  var loop = function loop(i, j, pair_table)
  /* i, j are the positions AFTER the last pair of a stack; i.e
     i-1 and j+1 are paired. */
  {
    var count = 2;
    /* counts the VERTICES of a loop polygon; that's
       NOT necessarily the number of unpaired bases!
       Upon entry the loop has already 2 vertices, namely
       the pair i-1/j+1.  */

    var r = 0,
        bubble = 0;
    /* bubble counts the unpaired digits in loops */

    var i_old, partner, k, l, start_k, start_l, fill, ladder;
    var begin, v, diff;
    var polygon;
    var remember = Array.apply(null, new Array(3 + Math.floor((j - i) / 5) * 2)).map(Number.prototype.valueOf, 0);
    i_old = i - 1, j++;
    /* j has now been set to the partner of the
       previous pair for correct while-loop
       termination.  */

    while (i != j) {
      partner = pair_table[i];
      if (!partner || i == 0) i++, count++, bubble++;else {
        count += 2;
        k = i, l = partner;
        /* beginning of stack */

        remember[++r] = k;
        remember[++r] = l;
        i = partner + 1;
        /* next i for the current loop */

        start_k = k, start_l = l;
        ladder = 0;

        do {
          k++, l--, ladder++;
          /* go along the stack region */
        } while (pair_table[k] == l && pair_table[k] > k);

        fill = ladder - 2;

        if (ladder >= 2) {
          angle[start_k + 1 + fill] += PIHALF;
          /*  Loop entries and    */

          angle[start_l - 1 - fill] += PIHALF;
          /*  exits get an        */

          angle[start_k] += PIHALF;
          /*  additional PI/2.    */

          angle[start_l] += PIHALF;
          /*  Why ? (exercise)    */

          if (ladder > 2) {
            for (; fill >= 1; fill--) {
              angle[start_k + fill] = Math.PI;
              /*  fill in the angles  */

              angle[start_l - fill] = Math.PI;
              /*  for the backbone    */
            }
          }
        }

        stack_size[++stk] = ladder;
        if (k <= l) loop(k, l, pair_table);
      }
    }

    polygon = Math.PI * (count - 2) / count;
    /* bending angle in loop polygon */

    remember[++r] = j;
    begin = i_old < 0 ? 0 : i_old;

    for (v = 1; v <= r; v++) {
      diff = remember[v] - begin;

      for (fill = 0; fill <= diff; fill++) {
        angle[begin + fill] += polygon;
      }

      if (v > r) break;
      begin = remember[++v];
    }

    loop_size[++lp] = bubble;
  };

  loop(0, len + 1, pair_table);
  loop_size[lp] -= 2;
  /* correct for cheating with function loop */

  alpha = INIT_ANGLE;
  x[0] = INIT_X;
  y[0] = INIT_Y;
  var poss = [];
  poss.push([x[0], y[0]]);

  for (i = 1; i < len; i++) {
    x[i] = x[i - 1] + RADIUS * Math.cos(alpha);
    y[i] = y[i - 1] + RADIUS * Math.sin(alpha);
    poss.push([x[i], y[i]]);
    alpha += Math.PI - angle[i + 1];
  }

  return poss;
}

/***/ }),

/***/ "./styles/d3-context-menu.css":
/*!************************************!*\
  !*** ./styles/d3-context-menu.css ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./styles/fornac.css":
/*!***************************!*\
  !*** ./styles/fornac.css ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./styles/rnaplot.css":
/*!****************************!*\
  !*** ./styles/rnaplot.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "d3":
/*!*********************!*\
  !*** external "d3" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_d3__;

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1tuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL3NsdWdpZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvc2x1Z2lkL3NsdWdpZC5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvdXVpZC9ybmctYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvdXVpZC91dWlkLmpzIiwid2VicGFjazovL1tuYW1lXS8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vc3JjL2QzLWNvbnRleHQtbWVudS5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zcmMvZm9ybmFjLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zcmMvbmF2aWV3L2Jhc2UuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vc3JjL25hdmlldy9jb25uZWN0aW9uLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3NyYy9uYXZpZXcvbG9vcC5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zcmMvbmF2aWV3L25hdmlldy5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zcmMvbmF2aWV3L3JhZGxvb3AuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vc3JjL25hdmlldy9yZWdpb24uanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vc3JjL3JuYWdyYXBoLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3NyYy9ybmFwbG90LmpzIiwid2VicGFjazovL1tuYW1lXS8uL3NyYy9ybmF0cmVlbWFwLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3NyYy9ybmF1dGlscy5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zcmMvc2ltcGxlcm5hcGxvdC5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zdHlsZXMvZDMtY29udGV4dC1tZW51LmNzcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zdHlsZXMvZm9ybmFjLmNzcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zdHlsZXMvcm5hcGxvdC5jc3MiLCJ3ZWJwYWNrOi8vW25hbWVdL2V4dGVybmFsIFwiZDNcIiJdLCJuYW1lcyI6WyJjb250ZXh0TWVudSIsIm1lbnUiLCJvcHRzIiwicHJldmlvdXNseU1vdXNlVXAiLCJjbGlja0F3YXkiLCJ1aWQiLCJzbHVnaWQiLCJuaWNlIiwicm9vdEVsZW1lbnQiLCJvcmllbnRhdGlvbiIsImluaXRpYWxQb3MiLCJwYXJlbnRTdGFydCIsIm9wZW5DYWxsYmFjayIsImNsb3NlQ2FsbGJhY2siLCJvbk9wZW4iLCJvbkNsb3NlIiwicG9zIiwiZDMiLCJzZWxlY3RBbGwiLCJkYXRhIiwiZW50ZXIiLCJhcHBlbmQiLCJjbGFzc2VkIiwic2VsZWN0Iiwib24iLCJjb25zb2xlIiwibG9nIiwic3R5bGUiLCJpbmRleCIsInBNb3VzZVVwIiwiY2xpY2tBd2F5RnVuYyIsImVsbSIsImNvbnRleHRNZW51UG9zIiwibW91c2VQb3MiLCJjdXJyZW50VGhpcyIsIm1vdXNlIiwib3BlbkNoaWxkTWVudVVpZCIsImh0bWwiLCJsaXN0IiwiZCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJhdHRyIiwicmV0IiwiZGl2aWRlciIsImRpc2FibGVkIiwiYWN0aW9uIiwidGl0bGUiLCJlcnJvciIsImkiLCJjaGlsZHJlbiIsImNoaWxkVWlkIiwiYm91bmRpbmdSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY2hpbGRyZW5Db250ZXh0TWVudSIsImxlZnQiLCJ3aW5kb3ciLCJwYWdlWE9mZnNldCIsInRvcCIsInBhZ2VZT2Zmc2V0Iiwid2lkdGgiLCJhcHBseSIsImNvbnRleHRNZW51U2VsZWN0aW9uIiwicGFnZVgiLCJwYWdlWSIsIm5vZGUiLCJpbm5lcldpZHRoIiwiRm9ybmFDb250YWluZXIiLCJlbGVtZW50IiwicGFzc2VkT3B0aW9ucyIsInNlbGYiLCJvcHRpb25zIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwib3B0aW9uIiwiaGFzT3duUHJvcGVydHkiLCJpbml0aWFsU2l6ZSIsInN2Z1ciLCJzdmdIIiwiZWRpdGFibGUiLCJiYWNrZ3JvdW5kTWVudSIsImNhbnZhc01vdXNlUG9zIiwieFNjYWxlIiwiaW52ZXJ0IiwieVNjYWxlIiwiYWRkUk5BIiwibm9kZU1lbnUiLCJkZWxldGVOb2RlIiwiY2hhbmdlTm9kZSIsImluc2VydE5vZGVCZWZvcmVPckFmdGVyIiwibm9kZUNvbnRleHRNZW51IiwiYmFja2dyb3VuZENvbnRleHRNZW51IiwiZmlsbCIsInNjYWxlIiwiY2F0ZWdvcnkyMCIsIm1vdXNlZG93bkxpbmsiLCJtb3VzZWRvd25Ob2RlIiwibW91c2V1cE5vZGUiLCJsaW5rQ29udGV4dE1lbnVTaG93biIsImxpbmVhciIsImRvbWFpbiIsInJhbmdlIiwiZ3JhcGgiLCJsaW5rU3RyZW5ndGhzIiwiZGlzcGxheVBhcmFtZXRlcnMiLCJjb2xvclNjaGVtZSIsImN1c3RvbUNvbG9ycyIsImFuaW1hdGlvbiIsImFwcGx5Rm9yY2UiLCJkZWFmIiwicm5hcyIsImV4dHJhTGlua3MiLCJBcnJheSIsInByb3RvdHlwZSIsImVxdWFscyIsImFycmF5IiwibCIsImNyZWF0ZUluaXRpYWxMYXlvdXQiLCJzdHJ1Y3R1cmUiLCJsYWJlbEludGVydmFsIiwidWlkcyIsInJnIiwiUk5BR3JhcGgiLCJzZXF1ZW5jZSIsIm5hbWUiLCJjaXJjdWxhcml6ZUV4dGVybmFsIiwicm5hSnNvbiIsInJlY2FsY3VsYXRlRWxlbWVudHMiLCJwb3NpdGlvbnMiLCJsYXlvdXQiLCJuYXZpZXciLCJOQVZpZXciLCJuYVZpZXdQb3NpdGlvbnMiLCJuYXZpZXdfeHlfY29vcmRpbmF0ZXMiLCJwYWlydGFibGUiLCJuYmFzZSIsInB1c2giLCJ4IiwieSIsInNpbXBsZVh5Q29vcmRpbmF0ZXMiLCJlbGVtZW50c1RvSnNvbiIsImFkZFVpZHMiLCJhZGRQb3NpdGlvbnMiLCJhZGRMYWJlbHMiLCJyZWluZm9yY2VTdGVtcyIsInJlaW5mb3JjZUxvb3BzIiwiY29ubmVjdEZha2VOb2RlcyIsInJlYXNzaWduTGlua1VpZHMiLCJicmVha05vZGVzVG9GYWtlTm9kZXMiLCJjZW50ZXJWaWV3IiwibmV3TGlua3MiLCJhZGRFeHRlcm5hbExpbmtzIiwiY29uY2F0IiwiYWRkUk5BSlNPTiIsImNlbnRlclBvcyIsImF2b2lkT3RoZXJzIiwibm9kZU5hbWUiLCJyZWZlcmVuY2VOb2RlIiwicm5hIiwiZG90YnJhY2tldCIsInJuYVV0aWxpdGllcyIsInBhaXJ0YWJsZVRvRG90YnJhY2tldCIsImdldFBvc2l0aW9ucyIsInNlcSIsImdldFVpZHMiLCJuZXdOb2RlTnVtIiwibnVtIiwibmV3RG90YnJhY2tldCIsIm5ld1NlcXVlbmNlIiwic2xpY2UiLCJzcGxpY2UiLCJuZXdQb3NpdGlvbnMiLCJuZXdSTkEiLCJwb3NpdGlvbk9mZnNldCIsIm5ld1VpZHMiLCJwYWlyIiwiZXh0ZXJuYWxMaW5rcyIsIm5ld0xpbmsiLCJsaW5rVHlwZSIsInZhbHVlIiwiZ2VuZXJhdGVVVUlEIiwic291cmNlIiwidGFyZ2V0IiwiT2JqZWN0IiwidG9TdHJpbmciLCJjYWxsIiwiaiIsIm5vZGVzIiwibnVjcyIsInJuYUdyYXBoIiwibWF4WCIsIm1pblgiLCJ0b3RhbFgiLCJ0b3RhbFkiLCJub2RlQ291bnQiLCJmb3JFYWNoIiwicHgiLCJweSIsIm1heCIsIm1hcCIsIm1pbiIsInJlY2FsY3VsYXRlR3JhcGgiLCJ1cGRhdGUiLCJtYWduaXR1ZGUiLCJNYXRoIiwic3FydCIsInBvc2l0aW9uQW55Tm9kZSIsImVuZFBvaW50Iiwic3RhcnRQb2ludCIsInByZXZOb2RlIiwibGVuZ3RoTXVsdCIsImxpbmtlZCIsInUiLCJ2IiwiYXJyb3dUaXAiLCJyYWRpdXMiLCJwYXRoIiwicmVhbExpbmtGaWx0ZXIiLCJ0cmFuc2l0aW9uUk5BIiwibmV3U3RydWN0dXJlIiwibmV4dEZ1bmN0aW9uIiwiZHVyYXRpb24iLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJmaWx0ZXIiLCJub2RlVHlwZSIsIm5ld1JOQUpzb24iLCJnbm9kZXMiLCJ2aXNOb2RlcyIsIm5vZGVLZXkiLCJ0cmFuc2l0aW9uIiwibGlua3MiLCJ2aXNMaW5rcyIsImxpbmtLZXkiLCJuZXdOb2RlcyIsImNyZWF0ZU5ld05vZGVzIiwiZXhpdCIsInJlbW92ZSIsImVhY2giLCJ1cGRhdGVTdHlsZSIsImVuZGFsbCIsImNhbGxiYWNrIiwic2l6ZSIsInNldFRpbWVvdXQiLCJuIiwiYWRkTmV3TGlua3MiLCJjcmVhdGVOZXdMaW5rcyIsInVpZHNUb05vZGVzIiwibGluayIsImZha2VMaW5rcyIsImxpbmtJbmRleCIsImluZGV4T2YiLCJhZGROb2RlcyIsImpzb24iLCJlbnRyeSIsIm1heFkiLCJyIiwiYWRkQ3VzdG9tQ29sb3JzIiwiYWRkQ3VzdG9tQ29sb3JzVGV4dCIsImN1c3RvbUNvbG9yc1RleHQiLCJjcyIsIkNvbG9yU2NoZW1lIiwiY29sb3JzSnNvbiIsImNoYW5nZUNvbG9yU2NoZW1lIiwiY2xlYXJOb2RlcyIsInRvSlNPTiIsImRhdGFTdHJpbmciLCJKU09OIiwic3RyaW5naWZ5Iiwia2V5IiwiZnJvbUpTT04iLCJqc29uU3RyaW5nIiwicGFyc2UiLCJlcnIiLCJ0eXBlIiwiY2lyY3VsYXIiLCJzdHJ1Y3ROYW1lIiwicm5hTGVuZ3RoIiwiZWxlbWVudHMiLCJudWNzVG9Ob2RlcyIsInBzZXVkb2tub3RQYWlycyIsIlByb3RlaW5HcmFwaCIsInNldFNpemUiLCJvZmZzZXRIZWlnaHQiLCJvZmZzZXRXaWR0aCIsInpvb21lciIsImJydXNoZXIiLCJyZXNpemVTdmdPblJlc2l6ZSIsInN2ZyIsImNoYW5nZUNvbG9ycyIsIm1vbGVjdWxlQ29sb3JzIiwidmFsIiwicGFyc2VGbG9hdCIsImlzTmFOIiwic2V0T3V0bGluZUNvbG9yIiwiY29sb3IiLCJuZXdDb2xvclNjaGVtZSIsInByb3RlaW5Ob2RlcyIsImNpcmNsZXMiLCJvcmRpbmFsIiwiY2F0ZWdvcnkxMCIsImVsZW1UeXBlIiwiaW50ZXJwb2xhdGUiLCJpbnRlcnBvbGF0ZUxhYiIsImNvbG9yVmFsdWVzIiwibW91c2Vkb3duIiwibW91c2Vtb3ZlIiwibXBvcyIsInZpcyIsImRyYWdMaW5lIiwibW91c2V1cCIsInJlc2V0TW91c2VWYXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJlaGF2aW9yIiwiem9vbSIsInNjYWxlRXh0ZW50Iiwiem9vbXN0YXJ0IiwicmVkcmF3Iiwia2V5ZG93biIsImtleXVwIiwiZm9jdXMiLCJzdmdHcmFwaCIsImFsbG93UGFubmluZ0FuZFpvb21pbmciLCJicnVzaCIsImRhdHVtIiwic2VsZWN0ZWQiLCJwcmV2aW91c2x5U2VsZWN0ZWQiLCJjdHJsS2V5ZG93biIsImV4dGVudCIsImNsZWFyIiwidHJhbnNsYXRlIiwiZ2V0Qm91bmRpbmdCb3hUcmFuc2Zvcm0iLCJtaW5ZIiwibWF4UmFkaXVzIiwibW9sV2lkdGgiLCJtb2xIZWlnaHQiLCJ3aWR0aFJhdGlvIiwiaGVpZ2h0UmF0aW8iLCJtaW5SYXRpbyIsIm1heE5vZGVSYWRpdXMiLCJuZXdNb2xXaWR0aCIsIm5ld01vbEhlaWdodCIsInhUcmFucyIsInlUcmFucyIsImJiVHJhbnNmb3JtIiwiZm9yY2UiLCJjaGFyZ2UiLCJtaWRkbGVDaGFyZ2UiLCJvdGhlckNoYXJnZSIsImZyaWN0aW9uIiwibGlua0Rpc3RhbmNlIiwibGlua0Rpc3RhbmNlTXVsdGlwbGllciIsImxpbmtTdHJlbmd0aCIsIm90aGVyIiwiZ3Jhdml0eSIsImNoYXJnZURpc3RhbmNlIiwic2hpZnRLZXlkb3duIiwic2VsZWN0ZWROb2RlcyIsIm1vdXNlRG93bk5vZGUiLCJkcmFnc3RhcnRlZCIsInNvdXJjZUV2ZW50IiwicCIsInRvRHJhZyIsImQxIiwiZml4ZWQiLCJkcmFnZ2VkIiwiZHgiLCJkeSIsInJlc3VtZUZvcmNlIiwicmVzdW1lIiwiZHJhZ2VuZGVkIiwiY29sbGlkZSIsIm54MSIsIm54MiIsIm55MSIsIm55MiIsInF1YWQiLCJ4MSIsInkxIiwieDIiLCJ5MiIsInBvaW50IiwiZHJhZyIsImtleUNvZGUiLCJnZXRTdHJ1Y3R1cmVzRG90QnJhY2tldCIsInVwZGF0ZVJuYUdyYXBoIiwibnVjbGVvdGlkZVBvc2l0aW9ucyIsImxhYmVsUG9zaXRpb25zIiwiYWRkUHNldWRva25vdHMiLCJ1cGRhdGVMaW5rVWlkcyIsInJlbW92ZUJhY2tCb25lTGluayIsInRvUmVtb3ZlIiwiZnJvbSIsInRvIiwic2VxdWVuY2UxIiwic2VxdWVuY2UyIiwicm5hRG90QnJhY2tldCIsImRvdEJyYWNrZXQxIiwiZG90QnJhY2tldDIiLCJwb3NpdGlvbnMxIiwicG9zaXRpb25zMiIsInVpZHMxIiwidWlkczIiLCJybmExIiwicm5hMiIsInJlbW92ZUxpbmsiLCJleHRyYUxpbmtJbmRleCIsImxpbmtDbGljayIsImludmFsaWRMaW5rcyIsImN1cnJJZHgiLCJub2RlSWR4cyIsImJyZWFrcyIsImlkeDEiLCJpZHgyIiwic3BsaXQiLCJqb2luIiwiYWRkQmFja0JvbmVMaW5rIiwiZG90YnJhY2tldDEiLCJkb3RicmFja2V0MiIsInNlcTEiLCJzZXEyIiwibmV3U2VxIiwidG9BZGRJbnRlcm5hbCIsInRvQWRkRXh0ZXJuYWwiLCJ0b0RlbGV0ZSIsImUiLCJuZXdSbmEiLCJhZGRMaW5rIiwibm9kZU1vdXNlY2xpY2siLCJkZWZhdWx0UHJldmVudGVkIiwibm9kZU1vdXNldXAiLCJiYWNrYm9uZVBvc3NpYmxlIiwiYmFzZXBhaXJQb3NzaWJsZSIsImxpbmtNZW51IiwibGlua0NvbnRleHRNZW51Iiwibm9kZU1vdXNlZG93biIsInN0YXJ0QW5pbWF0aW9uIiwic3RhcnQiLCJzdG9wQW5pbWF0aW9uIiwic3RvcCIsInNldEZyaWN0aW9uIiwic2V0Q2hhcmdlIiwic2V0R3Jhdml0eSIsInNldFBzZXVkb2tub3RTdHJlbmd0aCIsInBzZXVkb2tub3QiLCJkaXNwbGF5QmFja2dyb3VuZCIsImRpc3BsYXlOdW1iZXJpbmciLCJkaXNwbGF5Tm9kZU91dGxpbmUiLCJkaXNwbGF5Tm9kZUxhYmVsIiwiZGlzcGxheUxpbmtzIiwiZGlzcGxheVBzZXVkb2tub3RMaW5rcyIsImRpc3BsYXlQcm90ZWluTGlua3MiLCJkaXNwbGF5QWxsTGlua3MiLCJudWRnZSIsImxpbmtzRW50ZXIiLCJsaW5rTGluZXMiLCJ0ZXh0IiwiZ25vZGVzRW50ZXIiLCJlYXNlIiwibGFiZWxBbmRQcm90ZWluTm9kZXMiLCJudWNsZW90aWRlTm9kZXMiLCJsYWJlbHNFbnRlciIsIm5vZGVUb29sdGlwIiwibm9kZVRvb2x0aXBzIiwibnVjbGVvdGlkZSIsImxhYmVsIiwicHNldWRvIiwibWlkZGxlIiwicHJvdGVpbiIsImFsbExpbmtzIiwiY29sb3JzIiwicmVhbE5vZGVzIiwieGxpbmsiLCJkaXNwbGF5RmFrZUxpbmtzIiwicG9zaXRpb24iLCJxIiwiZ2VvbSIsInF1YWR0cmVlIiwidmlzaXQiLCJCYXNlIiwibWF0ZSIsImV4dHJhY3RlZCIsInJlZ2lvbiIsIlJlZ2lvbiIsImdldE1hdGUiLCJzZXRNYXRlIiwiZ2V0WCIsInNldFgiLCJnZXRZIiwic2V0WSIsImlzRXh0cmFjdGVkIiwic2V0RXh0cmFjdGVkIiwiZ2V0UmVnaW9uIiwic2V0UmVnaW9uIiwiQ29ubmVjdGlvbiIsImxvb3AiLCJMb29wIiwiZW5kIiwieHJhZCIsInlyYWQiLCJhbmdsZSIsImV4dHJ1ZGVkIiwiYnJva2VuIiwiX2lzTnVsbCIsImlzTnVsbCIsInNldE51bGwiLCJnZXRMb29wIiwic2V0TG9vcCIsImdldFN0YXJ0Iiwic2V0U3RhcnQiLCJnZXRFbmQiLCJzZXRFbmQiLCJnZXRYcmFkIiwic2V0WHJhZCIsImdldFlyYWQiLCJzZXRZcmFkIiwiZ2V0QW5nbGUiLCJzZXRBbmdsZSIsImlzRXh0cnVkZWQiLCJzZXRFeHRydWRlZCIsImlzQnJva2VuIiwic2V0QnJva2VuIiwibmNvbm5lY3Rpb24iLCJjb25uZWN0aW9ucyIsIl9jb25uZWN0aW9ucyIsIm51bWJlciIsImRlcHRoIiwibWFyayIsImdldE5jb25uZWN0aW9uIiwic2V0TmNvbm5lY3Rpb24iLCJzZXRDb25uZWN0aW9uIiwiYyIsImdldENvbm5lY3Rpb24iLCJyZXF1aXJlIiwiYWRkQ29ubmVjdGlvbiIsImdldE51bWJlciIsInNldE51bWJlciIsImdldERlcHRoIiwic2V0RGVwdGgiLCJpc01hcmsiLCJzZXRNYXJrIiwiZ2V0UmFkaXVzIiwic2V0UmFkaXVzIiwiQU5VTSIsIk1BWElURVIiLCJiYXNlcyIsIm5yZWdpb24iLCJsb29wX2NvdW50Iiwicm9vdCIsImxvb3BzIiwicmVnaW9ucyIsInJscGhlYWQiLCJSYWRsb29wIiwibGVuY3V0IiwiUkFESVVTX1JFRFVDVElPTl9GQUNUT1IiLCJhbmdsZWluYyIsIl9oIiwiSEVMSVhfRkFDVE9SIiwiQkFDS0JPTkVfRElTVEFOQ0UiLCJwYWlyX3RhYmxlIiwicmVhZF9pbl9iYXNlcyIsImZpbmRfcmVnaW9ucyIsImNvbnN0cnVjdF9sb29wIiwiZmluZF9jZW50cmFsX2xvb3AiLCJ0cmF2ZXJzZV9sb29wIiwibnBhaXJzIiwibmIxIiwic2V0U3RhcnQxIiwic2V0RW5kMiIsInNldEVuZDEiLCJzZXRTdGFydDIiLCJpYmFzZSIsInJldGxvb3AiLCJscCIsImNwIiwicnAiLCJybHAiLCJnZXROZXh0IiwiZ2V0TG9vcG51bWJlciIsImdldFN0YXJ0MSIsImdldEVuZDEiLCJnZXRTdGFydDIiLCJnZXRFbmQyIiwibWF4Y29ubiIsIm1heGRlcHRoIiwiZGV0ZXJtaW5lX2RlcHRocyIsImJpbmQiLCJjb3VudCIsImFuY2hvcl9jb25uZWN0aW9uIiwieHMiLCJ5cyIsInhlIiwieWUiLCJ4biIsInluIiwieGMiLCJ5YyIsInhvIiwieW8iLCJhc3RhcnQiLCJhZW5kIiwiYSIsImNwbmV4dCIsImFjcCIsImNwcHJldiIsImljIiwiZGEiLCJtYXhhbmciLCJpY3N0YXJ0IiwiaWNlbmQiLCJpY21pZGRsZSIsImljcm9vdCIsImRvbmUiLCJkb25lX2FsbF9jb25uZWN0aW9ucyIsInJvb3RlZCIsInNpZ24iLCJtaWR4IiwibWlkeSIsIm5yeCIsIm5yeSIsIm14IiwibXkiLCJ2eCIsInZ5IiwiZG90bXYiLCJubWlkeCIsIm5taWR5IiwiaWNzdGFydDEiLCJpY3VwIiwiaWNkb3duIiwiaWNuZXh0IiwiZGlyZWN0aW9uIiwiZGFuIiwicnIiLCJjcHgiLCJjcHkiLCJjcG5leHR4IiwiY3BuZXh0eSIsImNueCIsImNueSIsInJjbiIsInJjIiwibG54IiwibG55IiwicmwiLCJhYyIsImFjbiIsInN4Iiwic3kiLCJkY3AiLCJpbWF4bG9vcCIsIlBJIiwiaW5kaWNlIiwic2luIiwiY29zIiwiYXRhbjIiLCJzZXRfcmFkaXVzIiwiZGV0ZXJtaW5lX3JhZGl1cyIsImNvbm5lY3RlZF9jb25uZWN0aW9uIiwiZmluZF9pY19taWRkbGUiLCJhc2luIiwiYWJzIiwiY29uc3RydWN0X2V4dHJ1ZGVkX3NlZ21lbnQiLCJnZW5lcmF0ZV9yZWdpb24iLCJtaW5kaXQiLCJjaSIsImR0Iiwic3VtbiIsInN1bWQiLCJkaXQiLCJpbWluZGl0IiwicnQyXzIiLCJhZW5kMSIsImFlbmQyIiwiYWF2ZSIsImExIiwiYTIiLCJkYWMiLCJuc3RhcnQiLCJuZW5kIiwiY29sbGlzaW9uIiwiY29uc3RydWN0X2NpcmNsZV9zZWdtZW50IiwibWluZjIiLCJtYXhmMiIsImZpbmRfY2VudGVyX2Zvcl9hcmMiLCJiIiwiaCIsImhoaSIsImhsb3ciLCJkaXNjIiwidGhldGEiLCJwaGkiLCJpdGVyIiwiYWNvcyIsIm5vSXRlcmF0aW9uRmFpbHVyZVlldCIsImxvb3BudW1iZXIiLCJuZXh0IiwicHJldiIsInNldExvb3BudW1iZXIiLCJzZXROZXh0IiwiZ2V0UHJldiIsInNldFByZXYiLCJfc3RhcnQxIiwiX2VuZDEiLCJfc3RhcnQyIiwiX2VuZDIiLCJzdGFydDEiLCJlbmQxIiwic3RhcnQyIiwiZW5kMiIsIm51bWJlclNvcnQiLCJTdHJpbmciLCJ0cmltIiwicmVwbGFjZSIsInN0YXJ0TnVtYmVyIiwiY29tcHV0ZVBhaXJ0YWJsZSIsImRvdGJyYWNrZXRUb1BhaXJ0YWJsZSIsInJlbW92ZUJyZWFrcyIsInRhcmdldFN0cmluZyIsImJyZWFrSW5kZXgiLCJzdWJzdHJpbmciLCJkb3RCcmFja2V0QnJlYWtzIiwic2VxQnJlYWtzIiwiYXJyYXlzRXF1YWwiLCJsYWJlbE5vZGVzIiwicHQiLCJyZWxldmFudEVsZW1lbnRzIiwiYWxsTnVjcyIsImFkZEZha2VOb2RlIiwiZmlsdGVyTnVjcyIsIm5ld05vZGUxIiwibmV3Tm9kZTIiLCJsaW5rTGVuZ3RoIiwibm9kZVdpZHRoIiwidGFuIiwiZmFrZU5vZGVVaWQiLCJuZXdOb2RlIiwibmV3WCIsIm5ld1kiLCJjb29yZHNDb3VudGVkIiwiZmxvb3IiLCJpYSIsImZyb21Ob2RlIiwiZmlsdGVyT3V0Tm9uRmFrZU5vZGVzIiwiZmFrZU5vZGVzIiwidGhpc05vZGUiLCJ0aGlzTnVjIiwiayIsInNvcnQiLCJkaXN0YW5jZSIsImFkZEV4dHJhTGlua3MiLCJnZXROb2RlRnJvbU51Y2xlb3RpZGVzIiwiZWxlbVR5cGVzIiwibmV4dE5vZGUiLCJwdFRvRWxlbWVudHMiLCJsZXZlbCIsInU1IiwidTMiLCJleHRlcm5hbCIsInJpZ2h0IiwibSIsInBvcCIsImNvbWJpbmVkIiwicyIsInByZXZWZWMiLCJuZXh0VmVjIiwiY29tYmluZWRWZWMiLCJ2ZWNMZW5ndGgiLCJub3JtZWRWZWMiLCJvZmZzZXRWZWMiLCJyZW1vdmVQc2V1ZG9rbm90cyIsImV4dGVybmFsTG9vcCIsImVsb29wIiwiaGxvb3AiLCJudW1HcmVhdGVyIiwicmVtb3ZlUHNldWRva25vdHNGcm9tUGFpcnRhYmxlIiwiYWRkTmFtZSIsIm1vbGVjdWxlc1RvSnNvbiIsIm1vbGVjdWxlc0pzb24iLCJncmFwaHMiLCJtb2xlY3VsZXMiLCJtb2xlY3VsZSIsInNzIiwiaGVhZGVyIiwicm5hUGxvdCIsImFzc2lnbiIsImNyZWF0ZVRyYW5zZm9ybVRvRmlsbFZpZXdwb3J0IiwieFZhbHVlcyIsInlWYWx1ZXMiLCJ4RXh0ZW50IiwieUV4dGVudCIsIm51Y2xlb3RpZGVSYWRpdXMiLCJybmFFZGdlUGFkZGluZyIsInhSYW5nZSIsInlSYW5nZSIsInhFeHRyYSIsInlFeHRyYSIsImhlaWdodCIsImNyZWF0ZU90aGVyU2NhbGUiLCJmaXJzdFNjYWxlIiwibmV3RG9tYWluIiwibmV3UmFuZ2UiLCJzY2FsZUZhY3RvciIsIm5ld1dpZHRoIiwibmV3TWFyZ2luIiwieE9mZnNldCIsInlPZmZzZXQiLCJjcmVhdGVOdWNsZW90aWRlcyIsInNlbGVjdGlvbiIsImdzIiwidG9Mb3dlckNhc2UiLCJzaG93TnVjbGVvdGlkZUxhYmVscyIsIm51Y2xlb3RpZGVMYWJlbHMiLCJzdHJ1Y3RfbmFtZSIsImNyZWF0ZUxhYmVscyIsIm51bWJlckxhYmVscyIsImNyZWF0ZU5hbWUiLCJuYW1lTGFiZWwiLCJ4eVBvcyIsIm5hbWVQb3NpdGlvbiIsInh5IiwidGV4dEJCb3giLCJnZXRCQm94IiwidGV4dFNpemUiLCJwbG90U2l6ZSIsIm1ha2VFeHRlcm5hbExpbmtzQnVuZGxlIiwibm9kZXNEaWN0IiwibGlua3NMaXN0IiwiZXh0cmFMaW5rVHlwZSIsImZidW5kbGluZyIsIkZvcmNlRWRnZUJ1bmRsaW5nIiwiZWRnZXMiLCJjb21wYXRpYmlsaXR5X3RocmVzaG9sZCIsInN0ZXBfc2l6ZSIsInJlc3VsdHMiLCJkM2xpbmUiLCJsaW5lIiwiZWRnZV9zdWJwb2ludF9kYXRhIiwiY3JlYXRlTGlua3MiLCJjaGFydCIsInBsb3QiLCJzdGFydE51Y2xlb3RpZGVOdW1iZXIiLCJybmFMYXlvdXQiLCJmaWxsVmlld3BvcnRUcmFuc2Zvcm0iLCJidW5kbGVFeHRlcm5hbExpbmtzIiwiXyIsInJuYVRyZWVtYXAiLCJybmFUcmVlbWFwTm9kZSIsInRyZWVtYXAiLCJzdGlja3kiLCJnRW50ZXIiLCJ0cmVlbWFwR25vZGVzIiwiUk5BVXRpbGl0aWVzIiwiYnJhY2tldExlZnQiLCJicmFja2V0UmlnaHQiLCJpbnZlcnNlQnJhY2tldHMiLCJicmFja2V0IiwicmVzIiwibWF4aW11bU1hdGNoaW5nIiwiVFVSTiIsIm1tIiwibWF4aW11bSIsImJhY2t0cmFja01heGltdW1NYXRjaGluZyIsIm9sZFB0IiwibW1CdCIsImxlZnRQYXJ0IiwiZW5jbG9zZWRQYXJ0IiwiTnVtYmVyIiwidmFsdWVPZiIsInN0YWNrIiwiaW52ZXJzZUJyYWNrZXRMZWZ0IiwiaW52ZXJzZUJyYWNrZXRSaWdodCIsIm5pIiwiaW5zZXJ0SW50b1N0YWNrIiwiZGVsZXRlRnJvbVN0YWNrIiwic2VlbiIsImZpbmRVbm1hdGNoZWQiLCJ1bm1hdGNoZWQiLCJvcmlnRnJvbSIsIm9yaWdUbyIsIm5ld1B0IiwicmVtb3ZlZCIsImNvbG9yc1RleHQiLCJwYXJzZVJhbmdlIiwicmFuZ2VUZXh0IiwicGFydHMiLCJudW1zIiwicGFydHMxIiwicGFyc2VJbnQiLCJwYXJzZUNvbG9yVGV4dCIsImNvbG9yVGV4dCIsImxpbmVzIiwiY3Vyck1vbGVjdWxlIiwiY291bnRlciIsImRvbWFpblZhbHVlcyIsIndvcmRzIiwic2VhcmNoIiwicGFydHNSaWdodCIsIm5vcm1hbGl6ZUNvbG9ycyIsIm1vbGVjdWxlTmFtZSIsIm1pbk51bSIsIk1BWF9WQUxVRSIsIm1heE51bSIsIk1JTl9WQUxVRSIsInJlc251bSIsIklOSVRfQU5HTEUiLCJJTklUX1giLCJJTklUX1kiLCJSQURJVVMiLCJsZW4iLCJhbHBoYSIsImxvb3Bfc2l6ZSIsInN0YWNrX3NpemUiLCJzdGsiLCJQSUhBTEYiLCJidWJibGUiLCJpX29sZCIsInBhcnRuZXIiLCJzdGFydF9rIiwic3RhcnRfbCIsImxhZGRlciIsImJlZ2luIiwiZGlm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QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLHVDQUF1QyxTQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxpQkFBaUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELEVBQUU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGVBQWU7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLFFBQVE7QUFDN0I7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QU8wMUIsTUFBTSxHQUFDL3JCLElBQUksQ0FBQ2ljLEdBQUwsQ0FBU2dRLEtBQVQsQ0FBckI7QUFDQW53QixLQUFDLENBQUN6RixDQUFELENBQUQsR0FBT3lGLENBQUMsQ0FBQ3pGLENBQUMsR0FBQyxDQUFILENBQUQsR0FBTzAxQixNQUFNLEdBQUMvckIsSUFBSSxDQUFDZ2MsR0FBTCxDQUFTaVEsS0FBVCxDQUFyQjtBQUVBZSxRQUFJLENBQUNweEIsSUFBTCxDQUFVLENBQUNDLENBQUMsQ0FBQ3hGLENBQUQsQ0FBRixFQUFPeUYsQ0FBQyxDQUFDekYsQ0FBRCxDQUFSLENBQVY7QUFDQTQxQixTQUFLLElBQUlqc0IsSUFBSSxDQUFDOGIsRUFBTCxHQUFRdkosS0FBSyxDQUFDbGMsQ0FBQyxHQUFDLENBQUgsQ0FBdEI7QUFDSDs7QUFFRCxTQUFPMjJCLElBQVA7QUFDRCxDOzs7Ozs7Ozs7OztBQ2pIRCx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSxnRCIsImZpbGUiOiJmb3JuYWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJkM1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJkM1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJmb3JuYWNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJkM1wiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiZm9ybmFjXCJdID0gZmFjdG9yeShyb290W1wiZDNcIl0pO1xufSkod2luZG93LCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2QzX18pIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnRzLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5leHBvcnRzLnRvQnl0ZUFycmF5ID0gdG9CeXRlQXJyYXlcbmV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IGZyb21CeXRlQXJyYXlcblxudmFyIGxvb2t1cCA9IFtdXG52YXIgcmV2TG9va3VwID0gW11cbnZhciBBcnIgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyBVaW50OEFycmF5IDogQXJyYXlcblxudmFyIGNvZGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLydcbmZvciAodmFyIGkgPSAwLCBsZW4gPSBjb2RlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gIGxvb2t1cFtpXSA9IGNvZGVbaV1cbiAgcmV2TG9va3VwW2NvZGUuY2hhckNvZGVBdChpKV0gPSBpXG59XG5cbi8vIFN1cHBvcnQgZGVjb2RpbmcgVVJMLXNhZmUgYmFzZTY0IHN0cmluZ3MsIGFzIE5vZGUuanMgZG9lcy5cbi8vIFNlZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmFzZTY0I1VSTF9hcHBsaWNhdGlvbnNcbnJldkxvb2t1cFsnLScuY2hhckNvZGVBdCgwKV0gPSA2MlxucmV2TG9va3VwWydfJy5jaGFyQ29kZUF0KDApXSA9IDYzXG5cbmZ1bmN0aW9uIGdldExlbnMgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyBUcmltIG9mZiBleHRyYSBieXRlcyBhZnRlciBwbGFjZWhvbGRlciBieXRlcyBhcmUgZm91bmRcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vYmVhdGdhbW1pdC9iYXNlNjQtanMvaXNzdWVzLzQyXG4gIHZhciB2YWxpZExlbiA9IGI2NC5pbmRleE9mKCc9JylcbiAgaWYgKHZhbGlkTGVuID09PSAtMSkgdmFsaWRMZW4gPSBsZW5cblxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gdmFsaWRMZW4gPT09IGxlblxuICAgID8gMFxuICAgIDogNCAtICh2YWxpZExlbiAlIDQpXG5cbiAgcmV0dXJuIFt2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuXVxufVxuXG4vLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKGI2NCkge1xuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiBfYnl0ZUxlbmd0aCAoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSB7XG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiB0b0J5dGVBcnJheSAoYjY0KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuXG4gIHZhciBhcnIgPSBuZXcgQXJyKF9ieXRlTGVuZ3RoKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikpXG5cbiAgdmFyIGN1ckJ5dGUgPSAwXG5cbiAgLy8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuICB2YXIgbGVuID0gcGxhY2VIb2xkZXJzTGVuID4gMFxuICAgID8gdmFsaWRMZW4gLSA0XG4gICAgOiB2YWxpZExlblxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTgpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildIDw8IDYpIHxcbiAgICAgIHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMyldXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDE2KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAyKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA+PiA0KVxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMSkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxMCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA+PiAyKVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcbiAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDYgJiAweDNGXSArXG4gICAgbG9va3VwW251bSAmIDB4M0ZdXG59XG5cbmZ1bmN0aW9uIGVuY29kZUNodW5rICh1aW50OCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdG1wXG4gIHZhciBvdXRwdXQgPSBbXVxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMykge1xuICAgIHRtcCA9XG4gICAgICAoKHVpbnQ4W2ldIDw8IDE2KSAmIDB4RkYwMDAwKSArXG4gICAgICAoKHVpbnQ4W2kgKyAxXSA8PCA4KSAmIDB4RkYwMCkgK1xuICAgICAgKHVpbnQ4W2kgKyAyXSAmIDB4RkYpXG4gICAgb3V0cHV0LnB1c2godHJpcGxldFRvQmFzZTY0KHRtcCkpXG4gIH1cbiAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBmcm9tQnl0ZUFycmF5ICh1aW50OCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW4gPSB1aW50OC5sZW5ndGhcbiAgdmFyIGV4dHJhQnl0ZXMgPSBsZW4gJSAzIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsoXG4gICAgICB1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpXG4gICAgKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDJdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl0gK1xuICAgICAgJz09J1xuICAgIClcbiAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgdG1wID0gKHVpbnQ4W2xlbiAtIDJdIDw8IDgpICsgdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAxMF0gK1xuICAgICAgbG9va3VwWyh0bXAgPj4gNCkgJiAweDNGXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCAyKSAmIDB4M0ZdICtcbiAgICAgICc9J1xuICAgIClcbiAgfVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuIiwiLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxuLyoqXG4gKiBJZiBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAobW9zdCBjb21wYXRpYmxlLCBldmVuIElFNilcbiAqXG4gKiBCcm93c2VycyB0aGF0IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssIENocm9tZSA3KywgU2FmYXJpIDUuMSssXG4gKiBPcGVyYSAxMS42KywgaU9TIDQuMisuXG4gKlxuICogRHVlIHRvIHZhcmlvdXMgYnJvd3NlciBidWdzLCBzb21ldGltZXMgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiB3aWxsIGJlIHVzZWQgZXZlblxuICogd2hlbiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0eXBlZCBhcnJheXMuXG4gKlxuICogTm90ZTpcbiAqXG4gKiAgIC0gRmlyZWZveCA0LTI5IGxhY2tzIHN1cHBvcnQgZm9yIGFkZGluZyBuZXcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzLFxuICogICAgIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4LlxuICpcbiAqICAgLSBDaHJvbWUgOS0xMCBpcyBtaXNzaW5nIHRoZSBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uLlxuICpcbiAqICAgLSBJRTEwIGhhcyBhIGJyb2tlbiBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYXJyYXlzIG9mXG4gKiAgICAgaW5jb3JyZWN0IGxlbmd0aCBpbiBzb21lIHNpdHVhdGlvbnMuXG5cbiAqIFdlIGRldGVjdCB0aGVzZSBidWdneSBicm93c2VycyBhbmQgc2V0IGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGAgdG8gYGZhbHNlYCBzbyB0aGV5XG4gKiBnZXQgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiwgd2hpY2ggaXMgc2xvd2VyIGJ1dCBiZWhhdmVzIGNvcnJlY3RseS5cbiAqL1xuQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgPSBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVCAhPT0gdW5kZWZpbmVkXG4gID8gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgOiB0eXBlZEFycmF5U3VwcG9ydCgpXG5cbi8qXG4gKiBFeHBvcnQga01heExlbmd0aCBhZnRlciB0eXBlZCBhcnJheSBzdXBwb3J0IGlzIGRldGVybWluZWQuXG4gKi9cbmV4cG9ydHMua01heExlbmd0aCA9IGtNYXhMZW5ndGgoKVxuXG5mdW5jdGlvbiB0eXBlZEFycmF5U3VwcG9ydCAoKSB7XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KDEpXG4gICAgYXJyLl9fcHJvdG9fXyA9IHtfX3Byb3RvX186IFVpbnQ4QXJyYXkucHJvdG90eXBlLCBmb286IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDQyIH19XG4gICAgcmV0dXJuIGFyci5mb28oKSA9PT0gNDIgJiYgLy8gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWRcbiAgICAgICAgdHlwZW9mIGFyci5zdWJhcnJheSA9PT0gJ2Z1bmN0aW9uJyAmJiAvLyBjaHJvbWUgOS0xMCBsYWNrIGBzdWJhcnJheWBcbiAgICAgICAgYXJyLnN1YmFycmF5KDEsIDEpLmJ5dGVMZW5ndGggPT09IDAgLy8gaWUxMCBoYXMgYnJva2VuIGBzdWJhcnJheWBcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIGtNYXhMZW5ndGggKCkge1xuICByZXR1cm4gQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgICA/IDB4N2ZmZmZmZmZcbiAgICA6IDB4M2ZmZmZmZmZcbn1cblxuZnVuY3Rpb24gY3JlYXRlQnVmZmVyICh0aGF0LCBsZW5ndGgpIHtcbiAgaWYgKGtNYXhMZW5ndGgoKSA8IGxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHR5cGVkIGFycmF5IGxlbmd0aCcpXG4gIH1cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgaWYgKHRoYXQgPT09IG51bGwpIHtcbiAgICAgIHRoYXQgPSBuZXcgQnVmZmVyKGxlbmd0aClcbiAgICB9XG4gICAgdGhhdC5sZW5ndGggPSBsZW5ndGhcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBoYXZlIHRoZWlyXG4gKiBwcm90b3R5cGUgY2hhbmdlZCB0byBgQnVmZmVyLnByb3RvdHlwZWAuIEZ1cnRoZXJtb3JlLCBgQnVmZmVyYCBpcyBhIHN1YmNsYXNzIG9mXG4gKiBgVWludDhBcnJheWAsIHNvIHRoZSByZXR1cm5lZCBpbnN0YW5jZXMgd2lsbCBoYXZlIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBtZXRob2RzXG4gKiBhbmQgdGhlIGBVaW50OEFycmF5YCBtZXRob2RzLiBTcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdFxuICogcmV0dXJucyBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBUaGUgYFVpbnQ4QXJyYXlgIHByb3RvdHlwZSByZW1haW5zIHVubW9kaWZpZWQuXG4gKi9cblxuZnVuY3Rpb24gQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmICEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdJZiBlbmNvZGluZyBpcyBzcGVjaWZpZWQgdGhlbiB0aGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZydcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIGFsbG9jVW5zYWZlKHRoaXMsIGFyZylcbiAgfVxuICByZXR1cm4gZnJvbSh0aGlzLCBhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnBvb2xTaXplID0gODE5MiAvLyBub3QgdXNlZCBieSB0aGlzIGltcGxlbWVudGF0aW9uXG5cbi8vIFRPRE86IExlZ2FjeSwgbm90IG5lZWRlZCBhbnltb3JlLiBSZW1vdmUgaW4gbmV4dCBtYWpvciB2ZXJzaW9uLlxuQnVmZmVyLl9hdWdtZW50ID0gZnVuY3Rpb24gKGFycikge1xuICBhcnIuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIGZyb20gKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQpXG4gIH1cblxuICByZXR1cm4gZnJvbU9iamVjdCh0aGF0LCB2YWx1ZSlcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbShudWxsLCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5pZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgQnVmZmVyLnByb3RvdHlwZS5fX3Byb3RvX18gPSBVaW50OEFycmF5LnByb3RvdHlwZVxuICBCdWZmZXIuX19wcm90b19fID0gVWludDhBcnJheVxuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnNwZWNpZXMgJiZcbiAgICAgIEJ1ZmZlcltTeW1ib2wuc3BlY2llc10gPT09IEJ1ZmZlcikge1xuICAgIC8vIEZpeCBzdWJhcnJheSgpIGluIEVTMjAxNi4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzk3XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlciwgU3ltYm9sLnNwZWNpZXMsIHtcbiAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRTaXplIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfSBlbHNlIGlmIChzaXplIDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBuZWdhdGl2ZScpXG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsb2MgKHRoYXQsIHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgaWYgKHNpemUgPD0gMCkge1xuICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbiAgfVxuICBpZiAoZmlsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT25seSBwYXkgYXR0ZW50aW9uIHRvIGVuY29kaW5nIGlmIGl0J3MgYSBzdHJpbmcuIFRoaXNcbiAgICAvLyBwcmV2ZW50cyBhY2NpZGVudGFsbHkgc2VuZGluZyBpbiBhIG51bWJlciB0aGF0IHdvdWxkXG4gICAgLy8gYmUgaW50ZXJwcmV0dGVkIGFzIGEgc3RhcnQgb2Zmc2V0LlxuICAgIHJldHVybiB0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnXG4gICAgICA/IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwsIGVuY29kaW5nKVxuICAgICAgOiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsKVxuICB9XG4gIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiBhbGxvYyhzaXplWywgZmlsbFssIGVuY29kaW5nXV0pXG4gKiovXG5CdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGFsbG9jKG51bGwsIHNpemUsIGZpbGwsIGVuY29kaW5nKVxufVxuXG5mdW5jdGlvbiBhbGxvY1Vuc2FmZSAodGhhdCwgc2l6ZSkge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSA8IDAgPyAwIDogY2hlY2tlZChzaXplKSB8IDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7ICsraSkge1xuICAgICAgdGhhdFtpXSA9IDBcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIEJ1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIFNsb3dCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuXG5mdW5jdGlvbiBmcm9tU3RyaW5nICh0aGF0LCBzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnIHx8IGVuY29kaW5nID09PSAnJykge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gIH1cblxuICBpZiAoIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZW5jb2RpbmdcIiBtdXN0IGJlIGEgdmFsaWQgc3RyaW5nIGVuY29kaW5nJylcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBieXRlTGVuZ3RoKHN0cmluZywgZW5jb2RpbmcpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcblxuICB2YXIgYWN0dWFsID0gdGhhdC53cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuXG4gIGlmIChhY3R1YWwgIT09IGxlbmd0aCkge1xuICAgIC8vIFdyaXRpbmcgYSBoZXggc3RyaW5nLCBmb3IgZXhhbXBsZSwgdGhhdCBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMgd2lsbFxuICAgIC8vIGNhdXNlIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IGludmFsaWQgY2hhcmFjdGVyIHRvIGJlIGlnbm9yZWQuIChlLmcuXG4gICAgLy8gJ2FieHhjZCcgd2lsbCBiZSB0cmVhdGVkIGFzICdhYicpXG4gICAgdGhhdCA9IHRoYXQuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5TGlrZSAodGhhdCwgYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCA8IDAgPyAwIDogY2hlY2tlZChhcnJheS5sZW5ndGgpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIHRoYXRbaV0gPSBhcnJheVtpXSAmIDI1NVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUJ1ZmZlciAodGhhdCwgYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aCkge1xuICBhcnJheS5ieXRlTGVuZ3RoIC8vIHRoaXMgdGhyb3dzIGlmIGBhcnJheWAgaXMgbm90IGEgdmFsaWQgQXJyYXlCdWZmZXJcblxuICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnb2Zmc2V0XFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0ICsgKGxlbmd0aCB8fCAwKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdsZW5ndGhcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSlcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQpXG4gIH0gZWxzZSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IGFycmF5XG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIHRoYXQgPSBmcm9tQXJyYXlMaWtlKHRoYXQsIGFycmF5KVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKHRoYXQsIG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICB2YXIgbGVuID0gY2hlY2tlZChvYmoubGVuZ3RoKSB8IDBcbiAgICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbilcblxuICAgIGlmICh0aGF0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoYXRcbiAgICB9XG5cbiAgICBvYmouY29weSh0aGF0LCAwLCAwLCBsZW4pXG4gICAgcmV0dXJuIHRoYXRcbiAgfVxuXG4gIGlmIChvYmopIHtcbiAgICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgb2JqLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB8fCAnbGVuZ3RoJyBpbiBvYmopIHtcbiAgICAgIGlmICh0eXBlb2Ygb2JqLmxlbmd0aCAhPT0gJ251bWJlcicgfHwgaXNuYW4ob2JqLmxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCAwKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqKVxuICAgIH1cblxuICAgIGlmIChvYmoudHlwZSA9PT0gJ0J1ZmZlcicgJiYgaXNBcnJheShvYmouZGF0YSkpIHtcbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iai5kYXRhKVxuICAgIH1cbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCBvciBhcnJheS1saWtlIG9iamVjdC4nKVxufVxuXG5mdW5jdGlvbiBjaGVja2VkIChsZW5ndGgpIHtcbiAgLy8gTm90ZTogY2Fubm90IHVzZSBgbGVuZ3RoIDwga01heExlbmd0aCgpYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IGtNYXhMZW5ndGgoKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBrTWF4TGVuZ3RoKCkudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAobGVuZ3RoKSB7XG4gIGlmICgrbGVuZ3RoICE9IGxlbmd0aCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgIGxlbmd0aCA9IDBcbiAgfVxuICByZXR1cm4gQnVmZmVyLmFsbG9jKCtsZW5ndGgpXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyIChiKSB7XG4gIHJldHVybiAhIShiICE9IG51bGwgJiYgYi5faXNCdWZmZXIpXG59XG5cbkJ1ZmZlci5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAoYSwgYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihhKSB8fCAhQnVmZmVyLmlzQnVmZmVyKGIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIG11c3QgYmUgQnVmZmVycycpXG4gIH1cblxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDBcblxuICB2YXIgeCA9IGEubGVuZ3RoXG4gIHZhciB5ID0gYi5sZW5ndGhcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXVxuICAgICAgeSA9IGJbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIGlzRW5jb2RpbmcgKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0IChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFpc0FycmF5KGxpc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMClcbiAgfVxuXG4gIHZhciBpXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShsZW5ndGgpXG4gIHZhciBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGJ1ZiA9IGxpc3RbaV1cbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICAgIH1cbiAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICBwb3MgKz0gYnVmLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZmZXJcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN0cmluZykpIHtcbiAgICByZXR1cm4gc3RyaW5nLmxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIChBcnJheUJ1ZmZlci5pc1ZpZXcoc3RyaW5nKSB8fCBzdHJpbmcgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikpIHtcbiAgICByZXR1cm4gc3RyaW5nLmJ5dGVMZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICBzdHJpbmcgPSAnJyArIHN0cmluZ1xuICB9XG5cbiAgdmFyIGxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGVuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiBsZW4gKiAyXG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gbGVuID4+PiAxXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGggLy8gYXNzdW1lIHV0ZjhcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgLy8gTm8gbmVlZCB0byB2ZXJpZnkgdGhhdCBcInRoaXMubGVuZ3RoIDw9IE1BWF9VSU5UMzJcIiBzaW5jZSBpdCdzIGEgcmVhZC1vbmx5XG4gIC8vIHByb3BlcnR5IG9mIGEgdHlwZWQgYXJyYXkuXG5cbiAgLy8gVGhpcyBiZWhhdmVzIG5laXRoZXIgbGlrZSBTdHJpbmcgbm9yIFVpbnQ4QXJyYXkgaW4gdGhhdCB3ZSBzZXQgc3RhcnQvZW5kXG4gIC8vIHRvIHRoZWlyIHVwcGVyL2xvd2VyIGJvdW5kcyBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG91dCBvZiByYW5nZS5cbiAgLy8gdW5kZWZpbmVkIGlzIGhhbmRsZWQgc3BlY2lhbGx5IGFzIHBlciBFQ01BLTI2MiA2dGggRWRpdGlvbixcbiAgLy8gU2VjdGlvbiAxMy4zLjMuNyBSdW50aW1lIFNlbWFudGljczogS2V5ZWRCaW5kaW5nSW5pdGlhbGl6YXRpb24uXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIC8vIFJldHVybiBlYXJseSBpZiBzdGFydCA+IHRoaXMubGVuZ3RoLiBEb25lIGhlcmUgdG8gcHJldmVudCBwb3RlbnRpYWwgdWludDMyXG4gIC8vIGNvZXJjaW9uIGZhaWwgYmVsb3cuXG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKGVuZCA8PSAwKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICAvLyBGb3JjZSBjb2Vyc2lvbiB0byB1aW50MzIuIFRoaXMgd2lsbCBhbHNvIGNvZXJjZSBmYWxzZXkvTmFOIHZhbHVlcyB0byAwLlxuICBlbmQgPj4+PSAwXG4gIHN0YXJ0ID4+Pj0gMFxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGUgcHJvcGVydHkgaXMgdXNlZCBieSBgQnVmZmVyLmlzQnVmZmVyYCBhbmQgYGlzLWJ1ZmZlcmAgKGluIFNhZmFyaSA1LTcpIHRvIGRldGVjdFxuLy8gQnVmZmVyIGluc3RhbmNlcy5cbkJ1ZmZlci5wcm90b3R5cGUuX2lzQnVmZmVyID0gdHJ1ZVxuXG5mdW5jdGlvbiBzd2FwIChiLCBuLCBtKSB7XG4gIHZhciBpID0gYltuXVxuICBiW25dID0gYlttXVxuICBiW21dID0gaVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAxNiA9IGZ1bmN0aW9uIHN3YXAxNiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgMiAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMTYtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDEpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMzIgPSBmdW5jdGlvbiBzd2FwMzIgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAzKVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyAyKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDY0ID0gZnVuY3Rpb24gc3dhcDY0ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA4ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA2NC1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA4KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgNylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgNilcbiAgICBzd2FwKHRoaXMsIGkgKyAyLCBpICsgNSlcbiAgICBzd2FwKHRoaXMsIGkgKyAzLCBpICsgNClcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGggfCAwXG4gIGlmIChsZW5ndGggPT09IDApIHJldHVybiAnJ1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCAwLCBsZW5ndGgpXG4gIHJldHVybiBzbG93VG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gIHZhciBzdHIgPSAnJ1xuICB2YXIgbWF4ID0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFU1xuICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgc3RyID0gdGhpcy50b1N0cmluZygnaGV4JywgMCwgbWF4KS5tYXRjaCgvLnsyfS9nKS5qb2luKCcgJylcbiAgICBpZiAodGhpcy5sZW5ndGggPiBtYXgpIHN0ciArPSAnIC4uLiAnXG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBzdHIgKyAnPidcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAodGFyZ2V0LCBzdGFydCwgZW5kLCB0aGlzU3RhcnQsIHRoaXNFbmQpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGFyZ2V0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICB9XG5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmQgPSB0YXJnZXQgPyB0YXJnZXQubGVuZ3RoIDogMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNTdGFydCA9IDBcbiAgfVxuICBpZiAodGhpc0VuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc0VuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoc3RhcnQgPCAwIHx8IGVuZCA+IHRhcmdldC5sZW5ndGggfHwgdGhpc1N0YXJ0IDwgMCB8fCB0aGlzRW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCAmJiBzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCkge1xuICAgIHJldHVybiAtMVxuICB9XG4gIGlmIChzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMVxuICB9XG5cbiAgc3RhcnQgPj4+PSAwXG4gIGVuZCA+Pj49IDBcbiAgdGhpc1N0YXJ0ID4+Pj0gMFxuICB0aGlzRW5kID4+Pj0gMFxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQpIHJldHVybiAwXG5cbiAgdmFyIHggPSB0aGlzRW5kIC0gdGhpc1N0YXJ0XG4gIHZhciB5ID0gZW5kIC0gc3RhcnRcbiAgdmFyIGxlbiA9IE1hdGgubWluKHgsIHkpXG5cbiAgdmFyIHRoaXNDb3B5ID0gdGhpcy5zbGljZSh0aGlzU3RhcnQsIHRoaXNFbmQpXG4gIHZhciB0YXJnZXRDb3B5ID0gdGFyZ2V0LnNsaWNlKHN0YXJ0LCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIGlmICh0aGlzQ29weVtpXSAhPT0gdGFyZ2V0Q29weVtpXSkge1xuICAgICAgeCA9IHRoaXNDb3B5W2ldXG4gICAgICB5ID0gdGFyZ2V0Q29weVtpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbi8vIEZpbmRzIGVpdGhlciB0aGUgZmlyc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0ID49IGBieXRlT2Zmc2V0YCxcbi8vIE9SIHRoZSBsYXN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA8PSBgYnl0ZU9mZnNldGAuXG4vL1xuLy8gQXJndW1lbnRzOlxuLy8gLSBidWZmZXIgLSBhIEJ1ZmZlciB0byBzZWFyY2hcbi8vIC0gdmFsIC0gYSBzdHJpbmcsIEJ1ZmZlciwgb3IgbnVtYmVyXG4vLyAtIGJ5dGVPZmZzZXQgLSBhbiBpbmRleCBpbnRvIGBidWZmZXJgOyB3aWxsIGJlIGNsYW1wZWQgdG8gYW4gaW50MzJcbi8vIC0gZW5jb2RpbmcgLSBhbiBvcHRpb25hbCBlbmNvZGluZywgcmVsZXZhbnQgaXMgdmFsIGlzIGEgc3RyaW5nXG4vLyAtIGRpciAtIHRydWUgZm9yIGluZGV4T2YsIGZhbHNlIGZvciBsYXN0SW5kZXhPZlxuZnVuY3Rpb24gYmlkaXJlY3Rpb25hbEluZGV4T2YgKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIC8vIEVtcHR5IGJ1ZmZlciBtZWFucyBubyBtYXRjaFxuICBpZiAoYnVmZmVyLmxlbmd0aCA9PT0gMCkgcmV0dXJuIC0xXG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXRcbiAgaWYgKHR5cGVvZiBieXRlT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gYnl0ZU9mZnNldFxuICAgIGJ5dGVPZmZzZXQgPSAwXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA+IDB4N2ZmZmZmZmYpIHtcbiAgICBieXRlT2Zmc2V0ID0gMHg3ZmZmZmZmZlxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAtMHg4MDAwMDAwMCkge1xuICAgIGJ5dGVPZmZzZXQgPSAtMHg4MDAwMDAwMFxuICB9XG4gIGJ5dGVPZmZzZXQgPSArYnl0ZU9mZnNldCAgLy8gQ29lcmNlIHRvIE51bWJlci5cbiAgaWYgKGlzTmFOKGJ5dGVPZmZzZXQpKSB7XG4gICAgLy8gYnl0ZU9mZnNldDogaXQgaXQncyB1bmRlZmluZWQsIG51bGwsIE5hTiwgXCJmb29cIiwgZXRjLCBzZWFyY2ggd2hvbGUgYnVmZmVyXG4gICAgYnl0ZU9mZnNldCA9IGRpciA/IDAgOiAoYnVmZmVyLmxlbmd0aCAtIDEpXG4gIH1cblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldDogbmVnYXRpdmUgb2Zmc2V0cyBzdGFydCBmcm9tIHRoZSBlbmQgb2YgdGhlIGJ1ZmZlclxuICBpZiAoYnl0ZU9mZnNldCA8IDApIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoICsgYnl0ZU9mZnNldFxuICBpZiAoYnl0ZU9mZnNldCA+PSBidWZmZXIubGVuZ3RoKSB7XG4gICAgaWYgKGRpcikgcmV0dXJuIC0xXG4gICAgZWxzZSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCAtIDFcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgMCkge1xuICAgIGlmIChkaXIpIGJ5dGVPZmZzZXQgPSAwXG4gICAgZWxzZSByZXR1cm4gLTFcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSB2YWxcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gQnVmZmVyLmZyb20odmFsLCBlbmNvZGluZylcbiAgfVxuXG4gIC8vIEZpbmFsbHksIHNlYXJjaCBlaXRoZXIgaW5kZXhPZiAoaWYgZGlyIGlzIHRydWUpIG9yIGxhc3RJbmRleE9mXG4gIGlmIChCdWZmZXIuaXNCdWZmZXIodmFsKSkge1xuICAgIC8vIFNwZWNpYWwgY2FzZTogbG9va2luZyBmb3IgZW1wdHkgc3RyaW5nL2J1ZmZlciBhbHdheXMgZmFpbHNcbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAweEZGIC8vIFNlYXJjaCBmb3IgYSBieXRlIHZhbHVlIFswLTI1NV1cbiAgICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiZcbiAgICAgICAgdHlwZW9mIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChkaXIpIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgWyB2YWwgXSwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZhbCBtdXN0IGJlIHN0cmluZywgbnVtYmVyIG9yIEJ1ZmZlcicpXG59XG5cbmZ1bmN0aW9uIGFycmF5SW5kZXhPZiAoYXJyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgdmFyIGluZGV4U2l6ZSA9IDFcbiAgdmFyIGFyckxlbmd0aCA9IGFyci5sZW5ndGhcbiAgdmFyIHZhbExlbmd0aCA9IHZhbC5sZW5ndGhcblxuICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKGVuY29kaW5nID09PSAndWNzMicgfHwgZW5jb2RpbmcgPT09ICd1Y3MtMicgfHxcbiAgICAgICAgZW5jb2RpbmcgPT09ICd1dGYxNmxlJyB8fCBlbmNvZGluZyA9PT0gJ3V0Zi0xNmxlJykge1xuICAgICAgaWYgKGFyci5sZW5ndGggPCAyIHx8IHZhbC5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfVxuICAgICAgaW5kZXhTaXplID0gMlxuICAgICAgYXJyTGVuZ3RoIC89IDJcbiAgICAgIHZhbExlbmd0aCAvPSAyXG4gICAgICBieXRlT2Zmc2V0IC89IDJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChidWYsIGkpIHtcbiAgICBpZiAoaW5kZXhTaXplID09PSAxKSB7XG4gICAgICByZXR1cm4gYnVmW2ldXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBidWYucmVhZFVJbnQxNkJFKGkgKiBpbmRleFNpemUpXG4gICAgfVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGRpcikge1xuICAgIHZhciBmb3VuZEluZGV4ID0gLTFcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChyZWFkKGFyciwgaSkgPT09IHJlYWQodmFsLCBmb3VuZEluZGV4ID09PSAtMSA/IDAgOiBpIC0gZm91bmRJbmRleCkpIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKSBmb3VuZEluZGV4ID0gaVxuICAgICAgICBpZiAoaSAtIGZvdW5kSW5kZXggKyAxID09PSB2YWxMZW5ndGgpIHJldHVybiBmb3VuZEluZGV4ICogaW5kZXhTaXplXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIGkgLT0gaSAtIGZvdW5kSW5kZXhcbiAgICAgICAgZm91bmRJbmRleCA9IC0xXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChieXRlT2Zmc2V0ICsgdmFsTGVuZ3RoID4gYXJyTGVuZ3RoKSBieXRlT2Zmc2V0ID0gYXJyTGVuZ3RoIC0gdmFsTGVuZ3RoXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBmb3VuZCA9IHRydWVcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdmFsTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKHJlYWQoYXJyLCBpICsgaikgIT09IHJlYWQodmFsLCBqKSkge1xuICAgICAgICAgIGZvdW5kID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gdGhpcy5pbmRleE9mKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpICE9PSAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCB0cnVlKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmxhc3RJbmRleE9mID0gZnVuY3Rpb24gbGFzdEluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGZhbHNlKVxufVxuXG5mdW5jdGlvbiBoZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChzdHJMZW4gJSAyICE9PSAwKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGhleCBzdHJpbmcnKVxuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMlxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgcGFyc2VkID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGlmIChpc05hTihwYXJzZWQpKSByZXR1cm4gaVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHBhcnNlZFxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIHV0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGFzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gbGF0aW4xV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGJhc2U2NFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiB1Y3MyV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gd3JpdGUgKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcpXG4gIGlmIChvZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgb2Zmc2V0WywgbGVuZ3RoXVssIGVuY29kaW5nXSlcbiAgfSBlbHNlIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICAgIGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBsZW5ndGggPSBsZW5ndGggfCAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgLy8gbGVnYWN5IHdyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKSAtIHJlbW92ZSBpbiB2MC4xM1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdCdWZmZXIud3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0WywgbGVuZ3RoXSkgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCdcbiAgICApXG4gIH1cblxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIHZhciByZXMgPSBbXVxuXG4gIHZhciBpID0gc3RhcnRcbiAgd2hpbGUgKGkgPCBlbmQpIHtcbiAgICB2YXIgZmlyc3RCeXRlID0gYnVmW2ldXG4gICAgdmFyIGNvZGVQb2ludCA9IG51bGxcbiAgICB2YXIgYnl0ZXNQZXJTZXF1ZW5jZSA9IChmaXJzdEJ5dGUgPiAweEVGKSA/IDRcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4REYpID8gM1xuICAgICAgOiAoZmlyc3RCeXRlID4gMHhCRikgPyAyXG4gICAgICA6IDFcblxuICAgIGlmIChpICsgYnl0ZXNQZXJTZXF1ZW5jZSA8PSBlbmQpIHtcbiAgICAgIHZhciBzZWNvbmRCeXRlLCB0aGlyZEJ5dGUsIGZvdXJ0aEJ5dGUsIHRlbXBDb2RlUG9pbnRcblxuICAgICAgc3dpdGNoIChieXRlc1BlclNlcXVlbmNlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBpZiAoZmlyc3RCeXRlIDwgMHg4MCkge1xuICAgICAgICAgICAgY29kZVBvaW50ID0gZmlyc3RCeXRlXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4MUYpIDw8IDB4NiB8IChzZWNvbmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3Rikge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweEMgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4NiB8ICh0aGlyZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGRiAmJiAodGVtcENvZGVQb2ludCA8IDB4RDgwMCB8fCB0ZW1wQ29kZVBvaW50ID4gMHhERkZGKSkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBmb3VydGhCeXRlID0gYnVmW2kgKyAzXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAoZm91cnRoQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHgxMiB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHhDIHwgKHRoaXJkQnl0ZSAmIDB4M0YpIDw8IDB4NiB8IChmb3VydGhCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHhGRkZGICYmIHRlbXBDb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlUG9pbnQgPT09IG51bGwpIHtcbiAgICAgIC8vIHdlIGRpZCBub3QgZ2VuZXJhdGUgYSB2YWxpZCBjb2RlUG9pbnQgc28gaW5zZXJ0IGFcbiAgICAgIC8vIHJlcGxhY2VtZW50IGNoYXIgKFUrRkZGRCkgYW5kIGFkdmFuY2Ugb25seSAxIGJ5dGVcbiAgICAgIGNvZGVQb2ludCA9IDB4RkZGRFxuICAgICAgYnl0ZXNQZXJTZXF1ZW5jZSA9IDFcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA+IDB4RkZGRikge1xuICAgICAgLy8gZW5jb2RlIHRvIHV0ZjE2IChzdXJyb2dhdGUgcGFpciBkYW5jZSlcbiAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwXG4gICAgICByZXMucHVzaChjb2RlUG9pbnQgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApXG4gICAgICBjb2RlUG9pbnQgPSAweERDMDAgfCBjb2RlUG9pbnQgJiAweDNGRlxuICAgIH1cblxuICAgIHJlcy5wdXNoKGNvZGVQb2ludClcbiAgICBpICs9IGJ5dGVzUGVyU2VxdWVuY2VcbiAgfVxuXG4gIHJldHVybiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkocmVzKVxufVxuXG4vLyBCYXNlZCBvbiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMjc0NzI3Mi82ODA3NDIsIHRoZSBicm93c2VyIHdpdGhcbi8vIHRoZSBsb3dlc3QgbGltaXQgaXMgQ2hyb21lLCB3aXRoIDB4MTAwMDAgYXJncy5cbi8vIFdlIGdvIDEgbWFnbml0dWRlIGxlc3MsIGZvciBzYWZldHlcbnZhciBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgdmFyIGxlbiA9IGNvZGVQb2ludHMubGVuZ3RoXG4gIGlmIChsZW4gPD0gTUFYX0FSR1VNRU5UU19MRU5HVEgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNvZGVQb2ludHMpIC8vIGF2b2lkIGV4dHJhIHNsaWNlKClcbiAgfVxuXG4gIC8vIERlY29kZSBpbiBjaHVua3MgdG8gYXZvaWQgXCJjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRcIi5cbiAgdmFyIHJlcyA9ICcnXG4gIHZhciBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFxuICAgICAgU3RyaW5nLFxuICAgICAgY29kZVBvaW50cy5zbGljZShpLCBpICs9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKVxuICAgIClcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldICYgMHg3RilcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGxhdGluMVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGhleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpICsgMV0gKiAyNTYpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgdmFyIG5ld0J1ZlxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBuZXdCdWYgPSB0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpXG4gICAgbmV3QnVmLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydFxuICAgIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZClcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyArK2kpIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdCdWZcbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRMRSA9IGZ1bmN0aW9uIHJlYWRVSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG4gIH1cblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdXG4gIHZhciBtdWwgPSAxXG4gIHdoaWxlIChieXRlTGVuZ3RoID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiByZWFkVUludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgOCkgfCB0aGlzW29mZnNldCArIDFdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICgodGhpc1tvZmZzZXRdKSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikpICtcbiAgICAgICh0aGlzW29mZnNldCArIDNdICogMHgxMDAwMDAwKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludExFID0gZnVuY3Rpb24gcmVhZEludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludEJFID0gZnVuY3Rpb24gcmVhZEludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoXG4gIHZhciBtdWwgPSAxXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0taV1cbiAgd2hpbGUgKGkgPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1pXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiByZWFkSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICBpZiAoISh0aGlzW29mZnNldF0gJiAweDgwKSkgcmV0dXJuICh0aGlzW29mZnNldF0pXG4gIHJldHVybiAoKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gcmVhZEludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIDFdIHwgKHRoaXNbb2Zmc2V0XSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiByZWFkSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdKSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10gPDwgMjQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiByZWFkSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiByZWFkRmxvYXRMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiByZWFkRmxvYXRCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gcmVhZERvdWJsZUJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJidWZmZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyIGluc3RhbmNlJylcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IGlzIG91dCBvZiBib3VuZHMnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uIHdyaXRlVUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHhmZiwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCAyKTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSAmICgweGZmIDw8ICg4ICogKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkpKSkgPj4+XG4gICAgICAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSAqIDhcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgNCk7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMyAtIGkpICogOCkgJiAweGZmXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gMFxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgLSAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50QkUgPSBmdW5jdGlvbiB3cml0ZUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweDdmLCAtMHg4MClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuZnVuY3Rpb24gY2hlY2tJRUVFNzU0IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxuICBpZiAob2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgNCwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gd3JpdGVGbG9hdExFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgOCwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbiAgcmV0dXJuIG9mZnNldCArIDhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiBjb3B5ICh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXRTdGFydCA+PSB0YXJnZXQubGVuZ3RoKSB0YXJnZXRTdGFydCA9IHRhcmdldC5sZW5ndGhcbiAgaWYgKCF0YXJnZXRTdGFydCkgdGFyZ2V0U3RhcnQgPSAwXG4gIGlmIChlbmQgPiAwICYmIGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuIDBcbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgdGhpcy5sZW5ndGggPT09IDApIHJldHVybiAwXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBpZiAodGFyZ2V0U3RhcnQgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICB9XG4gIGlmIChzdGFydCA8IDAgfHwgc3RhcnQgPj0gdGhpcy5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgaWYgKGVuZCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgZW5kIC0gc3RhcnQpIHtcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgKyBzdGFydFxuICB9XG5cbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0XG4gIHZhciBpXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCAmJiBzdGFydCA8IHRhcmdldFN0YXJ0ICYmIHRhcmdldFN0YXJ0IDwgZW5kKSB7XG4gICAgLy8gZGVzY2VuZGluZyBjb3B5IGZyb20gZW5kXG4gICAgZm9yIChpID0gbGVuIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2UgaWYgKGxlbiA8IDEwMDAgfHwgIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gYXNjZW5kaW5nIGNvcHkgZnJvbSBzdGFydFxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICB0YXJnZXQsXG4gICAgICB0aGlzLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIGxlbiksXG4gICAgICB0YXJnZXRTdGFydFxuICAgIClcbiAgfVxuXG4gIHJldHVybiBsZW5cbn1cblxuLy8gVXNhZ2U6XG4vLyAgICBidWZmZXIuZmlsbChudW1iZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKGJ1ZmZlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoc3RyaW5nWywgb2Zmc2V0WywgZW5kXV1bLCBlbmNvZGluZ10pXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiBmaWxsICh2YWwsIHN0YXJ0LCBlbmQsIGVuY29kaW5nKSB7XG4gIC8vIEhhbmRsZSBzdHJpbmcgY2FzZXM6XG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IHN0YXJ0XG4gICAgICBzdGFydCA9IDBcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBlbmRcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfVxuICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XG4gICAgICB2YXIgY29kZSA9IHZhbC5jaGFyQ29kZUF0KDApXG4gICAgICBpZiAoY29kZSA8IDI1Nikge1xuICAgICAgICB2YWwgPSBjb2RlXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2VuY29kaW5nIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJyAmJiAhQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMjU1XG4gIH1cblxuICAvLyBJbnZhbGlkIHJhbmdlcyBhcmUgbm90IHNldCB0byBhIGRlZmF1bHQsIHNvIGNhbiByYW5nZSBjaGVjayBlYXJseS5cbiAgaWYgKHN0YXJ0IDwgMCB8fCB0aGlzLmxlbmd0aCA8IHN0YXJ0IHx8IHRoaXMubGVuZ3RoIDwgZW5kKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ091dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHN0YXJ0ID0gc3RhcnQgPj4+IDBcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyB0aGlzLmxlbmd0aCA6IGVuZCA+Pj4gMFxuXG4gIGlmICghdmFsKSB2YWwgPSAwXG5cbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgdGhpc1tpXSA9IHZhbFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgYnl0ZXMgPSBCdWZmZXIuaXNCdWZmZXIodmFsKVxuICAgICAgPyB2YWxcbiAgICAgIDogdXRmOFRvQnl0ZXMobmV3IEJ1ZmZlcih2YWwsIGVuY29kaW5nKS50b1N0cmluZygpKVxuICAgIHZhciBsZW4gPSBieXRlcy5sZW5ndGhcbiAgICBmb3IgKGkgPSAwOyBpIDwgZW5kIC0gc3RhcnQ7ICsraSkge1xuICAgICAgdGhpc1tpICsgc3RhcnRdID0gYnl0ZXNbaSAlIGxlbl1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbnZhciBJTlZBTElEX0JBU0U2NF9SRSA9IC9bXitcXC8wLTlBLVphLXotX10vZ1xuXG5mdW5jdGlvbiBiYXNlNjRjbGVhbiAoc3RyKSB7XG4gIC8vIE5vZGUgc3RyaXBzIG91dCBpbnZhbGlkIGNoYXJhY3RlcnMgbGlrZSBcXG4gYW5kIFxcdCBmcm9tIHRoZSBzdHJpbmcsIGJhc2U2NC1qcyBkb2VzIG5vdFxuICBzdHIgPSBzdHJpbmd0cmltKHN0cikucmVwbGFjZShJTlZBTElEX0JBU0U2NF9SRSwgJycpXG4gIC8vIE5vZGUgY29udmVydHMgc3RyaW5ncyB3aXRoIGxlbmd0aCA8IDIgdG8gJydcbiAgaWYgKHN0ci5sZW5ndGggPCAyKSByZXR1cm4gJydcbiAgLy8gTm9kZSBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgYmFzZTY0IHN0cmluZ3MgKG1pc3NpbmcgdHJhaWxpbmcgPT09KSwgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHdoaWxlIChzdHIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHN0ciA9IHN0ciArICc9J1xuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gc3RyaW5ndHJpbSAoc3RyKSB7XG4gIGlmIChzdHIudHJpbSkgcmV0dXJuIHN0ci50cmltKClcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIHZhciBjb2RlUG9pbnRcbiAgdmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGhcbiAgdmFyIGxlYWRTdXJyb2dhdGUgPSBudWxsXG4gIHZhciBieXRlcyA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvZGVQb2ludCA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG5cbiAgICAvLyBpcyBzdXJyb2dhdGUgY29tcG9uZW50XG4gICAgaWYgKGNvZGVQb2ludCA+IDB4RDdGRiAmJiBjb2RlUG9pbnQgPCAweEUwMDApIHtcbiAgICAgIC8vIGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoIWxlYWRTdXJyb2dhdGUpIHtcbiAgICAgICAgLy8gbm8gbGVhZCB5ZXRcbiAgICAgICAgaWYgKGNvZGVQb2ludCA+IDB4REJGRikge1xuICAgICAgICAgIC8vIHVuZXhwZWN0ZWQgdHJhaWxcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2UgaWYgKGkgKyAxID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAvLyB1bnBhaXJlZCBsZWFkXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkIGxlYWRcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIDIgbGVhZHMgaW4gYSByb3dcbiAgICAgIGlmIChjb2RlUG9pbnQgPCAweERDMDApIHtcbiAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gdmFsaWQgc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNvZGVQb2ludCA9IChsZWFkU3Vycm9nYXRlIC0gMHhEODAwIDw8IDEwIHwgY29kZVBvaW50IC0gMHhEQzAwKSArIDB4MTAwMDBcbiAgICB9IGVsc2UgaWYgKGxlYWRTdXJyb2dhdGUpIHtcbiAgICAgIC8vIHZhbGlkIGJtcCBjaGFyLCBidXQgbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgIH1cblxuICAgIGxlYWRTdXJyb2dhdGUgPSBudWxsXG5cbiAgICAvLyBlbmNvZGUgdXRmOFxuICAgIGlmIChjb2RlUG9pbnQgPCAweDgwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDEpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goY29kZVBvaW50KVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHg4MDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiB8IDB4QzAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDMpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgfCAweEUwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSA0KSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHgxMiB8IDB4RjAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG5cbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShiYXNlNjRjbGVhbihzdHIpKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSkgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBpc25hbiAodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IHZhbCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxufVxuIiwiZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSAoZSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSAobSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICgodmFsdWUgKiBjKSAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTQgSm9uYXMgRmlubmVtYW5uIEplbnNlblxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9zbHVnaWQnKTtcbiIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxNCBKb25hcyBGaW5uZW1hbm4gSmVuc2VuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxudmFyIHV1aWQgPSByZXF1aXJlKCd1dWlkJyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZ2l2ZW4gdXVpZCBhcyBhIDIyIGNoYXJhY3RlciBzbHVnLiBUaGlzIGNhbiBiZSBhIHJlZ3VsYXIgdjRcbiAqIHNsdWcgb3IgYSBcIm5pY2VcIiBzbHVnLlxuICovXG5leHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uKHV1aWRfKSB7XG4gIHZhciBieXRlcyAgID0gdXVpZC5wYXJzZSh1dWlkXyk7XG4gIHZhciBiYXNlNjQgID0gKG5ldyBCdWZmZXIoYnl0ZXMpKS50b1N0cmluZygnYmFzZTY0Jyk7XG4gIHZhciBzbHVnID0gYmFzZTY0XG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9cXCsvZywgJy0nKSAgLy8gUmVwbGFjZSArIHdpdGggLSAoc2VlIFJGQyA0NjQ4LCBzZWMuIDUpXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9cXC8vZywgJ18nKSAgLy8gUmVwbGFjZSAvIHdpdGggXyAoc2VlIFJGQyA0NjQ4LCBzZWMuIDUpXG4gICAgICAgICAgICAgIC5zdWJzdHJpbmcoMCwgMjIpOyAgICAvLyBEcm9wICc9PScgcGFkZGluZ1xuICByZXR1cm4gc2x1Zztcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdXVpZCByZXByZXNlbnRlZCBieSB0aGUgZ2l2ZW4gdjQgb3IgXCJuaWNlXCIgc2x1Z1xuICovXG5leHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uKHNsdWcpIHtcbiAgdmFyIGJhc2U2NCA9IHNsdWdcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csICcrJylcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9fL2csICcvJylcbiAgICAgICAgICAgICAgICAgICsgJz09JztcbiAgcmV0dXJuIHV1aWQudW5wYXJzZShuZXcgQnVmZmVyKGJhc2U2NCwgJ2Jhc2U2NCcpKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHJhbmRvbWx5IGdlbmVyYXRlZCB1dWlkIHY0IGNvbXBsaWFudCBzbHVnXG4gKi9cbmV4cG9ydHMudjQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJ5dGVzICAgPSB1dWlkLnY0KG51bGwsIG5ldyBCdWZmZXIoMTYpKTtcbiAgdmFyIGJhc2U2NCAgPSBieXRlcy50b1N0cmluZygnYmFzZTY0Jyk7XG4gIHZhciBzbHVnID0gYmFzZTY0XG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9cXCsvZywgJy0nKSAgLy8gUmVwbGFjZSArIHdpdGggLSAoc2VlIFJGQyA0NjQ4LCBzZWMuIDUpXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9cXC8vZywgJ18nKSAgLy8gUmVwbGFjZSAvIHdpdGggXyAoc2VlIFJGQyA0NjQ4LCBzZWMuIDUpXG4gICAgICAgICAgICAgIC5zdWJzdHJpbmcoMCwgMjIpOyAgICAvLyBEcm9wICc9PScgcGFkZGluZ1xuICByZXR1cm4gc2x1Zztcbn07XG5cbi8qKiBcbiAqIFJldHVybnMgYSByYW5kb21seSBnZW5lcmF0ZWQgdXVpZCB2NCBjb21wbGlhbnQgc2x1ZyB3aGljaCBjb25mb3JtcyB0byBhIHNldFxuICogb2YgXCJuaWNlXCIgcHJvcGVydGllcywgYXQgdGhlIGNvc3Qgb2Ygc29tZSBlbnRyb3B5LiBDdXJyZW50bHkgdGhpcyBtZWFucyBvbmVcbiAqIGV4dHJhIGZpeGVkIGJpdCAodGhlIGZpcnN0IGJpdCBvZiB0aGUgdXVpZCBpcyBzZXQgdG8gMCkgd2hpY2ggZ3VhcmFudGVlcyB0aGVcbiAqIHNsdWcgd2lsbCBiZWdpbiB3aXRoIFtBLVphLWZdLiBGb3IgZXhhbXBsZSBzdWNoIHNsdWdzIGRvbid0IHJlcXVpcmUgc3BlY2lhbFxuICogaGFuZGxpbmcgd2hlbiB1c2VkIGFzIGNvbW1hbmQgbGluZSBwYXJhbWV0ZXJzICh3aGVyZWFzIG5vbi1uaWNlIHNsdWdzIG1heVxuICogc3RhcnQgd2l0aCBgLWAgd2hpY2ggY2FuIGNvbmZ1c2UgY29tbWFuZCBsaW5lIHRvb2xzKS5cbiAqXG4gKiBQb3RlbnRpYWxseSBvdGhlciBcIm5pY2VcIiBwcm9wZXJ0aWVzIG1heSBiZSBhZGRlZCBpbiBmdXR1cmUgdG8gZnVydGhlclxuICogcmVzdHJpY3QgdGhlIHJhbmdlIG9mIHBvdGVudGlhbCB1dWlkcyB0aGF0IG1heSBiZSBnZW5lcmF0ZWQuXG4gKi9cbmV4cG9ydHMubmljZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYnl0ZXMgICA9IHV1aWQudjQobnVsbCwgbmV3IEJ1ZmZlcigxNikpO1xuICBieXRlc1swXSA9IGJ5dGVzWzBdICYgMHg3ZjsgIC8vIHVuc2V0IGZpcnN0IGJpdCB0byBlbnN1cmUgW0EtWmEtZl0gZmlyc3QgY2hhclxuICB2YXIgYmFzZTY0ICA9IGJ5dGVzLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgdmFyIHNsdWcgPSBiYXNlNjRcbiAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcKy9nLCAnLScpICAvLyBSZXBsYWNlICsgd2l0aCAtIChzZWUgUkZDIDQ2NDgsIHNlYy4gNSlcbiAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcLy9nLCAnXycpICAvLyBSZXBsYWNlIC8gd2l0aCBfIChzZWUgUkZDIDQ2NDgsIHNlYy4gNSlcbiAgICAgICAgICAgICAgLnN1YnN0cmluZygwLCAyMik7ICAgIC8vIERyb3AgJz09JyBwYWRkaW5nXG4gIHJldHVybiBzbHVnO1xufTtcbiIsIlxudmFyIHJuZztcblxudmFyIGNyeXB0byA9IGdsb2JhbC5jcnlwdG8gfHwgZ2xvYmFsLm1zQ3J5cHRvOyAvLyBmb3IgSUUgMTFcbmlmIChjcnlwdG8gJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAvLyBXSEFUV0cgY3J5cHRvLWJhc2VkIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cbiAgLy8gTW9kZXJhdGVseSBmYXN0LCBoaWdoIHF1YWxpdHlcbiAgdmFyIF9ybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbiAgcm5nID0gZnVuY3Rpb24gd2hhdHdnUk5HKCkge1xuICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMoX3JuZHM4KTtcbiAgICByZXR1cm4gX3JuZHM4O1xuICB9O1xufVxuXG5pZiAoIXJuZykge1xuICAvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG4gIC8vXG4gIC8vIElmIGFsbCBlbHNlIGZhaWxzLCB1c2UgTWF0aC5yYW5kb20oKS4gIEl0J3MgZmFzdCwgYnV0IGlzIG9mIHVuc3BlY2lmaWVkXG4gIC8vIHF1YWxpdHkuXG4gIHZhciAgX3JuZHMgPSBuZXcgQXJyYXkoMTYpO1xuICBybmcgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IDE2OyBpKyspIHtcbiAgICAgIGlmICgoaSAmIDB4MDMpID09PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgX3JuZHNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9ybmRzO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJuZztcblxuIiwiLy8gICAgIHV1aWQuanNcbi8vXG4vLyAgICAgQ29weXJpZ2h0IChjKSAyMDEwLTIwMTIgUm9iZXJ0IEtpZWZmZXJcbi8vICAgICBNSVQgTGljZW5zZSAtIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblxuLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gIFdlIGZlYXR1cmVcbi8vIGRldGVjdCB0byBkZXRlcm1pbmUgdGhlIGJlc3QgUk5HIHNvdXJjZSwgbm9ybWFsaXppbmcgdG8gYSBmdW5jdGlvbiB0aGF0XG4vLyByZXR1cm5zIDEyOC1iaXRzIG9mIHJhbmRvbW5lc3MsIHNpbmNlIHRoYXQncyB3aGF0J3MgdXN1YWxseSByZXF1aXJlZFxudmFyIF9ybmcgPSByZXF1aXJlKCcuL3JuZycpO1xuXG4vLyBNYXBzIGZvciBudW1iZXIgPC0+IGhleCBzdHJpbmcgY29udmVyc2lvblxudmFyIF9ieXRlVG9IZXggPSBbXTtcbnZhciBfaGV4VG9CeXRlID0ge307XG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gIF9ieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xuICBfaGV4VG9CeXRlW19ieXRlVG9IZXhbaV1dID0gaTtcbn1cblxuLy8gKipgcGFyc2UoKWAgLSBQYXJzZSBhIFVVSUQgaW50byBpdCdzIGNvbXBvbmVudCBieXRlcyoqXG5mdW5jdGlvbiBwYXJzZShzLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IChidWYgJiYgb2Zmc2V0KSB8fCAwLCBpaSA9IDA7XG5cbiAgYnVmID0gYnVmIHx8IFtdO1xuICBzLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWzAtOWEtZl17Mn0vZywgZnVuY3Rpb24ob2N0KSB7XG4gICAgaWYgKGlpIDwgMTYpIHsgLy8gRG9uJ3Qgb3ZlcmZsb3chXG4gICAgICBidWZbaSArIGlpKytdID0gX2hleFRvQnl0ZVtvY3RdO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gWmVybyBvdXQgcmVtYWluaW5nIGJ5dGVzIGlmIHN0cmluZyB3YXMgc2hvcnRcbiAgd2hpbGUgKGlpIDwgMTYpIHtcbiAgICBidWZbaSArIGlpKytdID0gMDtcbiAgfVxuXG4gIHJldHVybiBidWY7XG59XG5cbi8vICoqYHVucGFyc2UoKWAgLSBDb252ZXJ0IFVVSUQgYnl0ZSBhcnJheSAoYWxhIHBhcnNlKCkpIGludG8gYSBzdHJpbmcqKlxuZnVuY3Rpb24gdW5wYXJzZShidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IG9mZnNldCB8fCAwLCBidGggPSBfYnl0ZVRvSGV4O1xuICByZXR1cm4gIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXTtcbn1cblxuLy8gKipgdjEoKWAgLSBHZW5lcmF0ZSB0aW1lLWJhc2VkIFVVSUQqKlxuLy9cbi8vIEluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9MaW9zSy9VVUlELmpzXG4vLyBhbmQgaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L3V1aWQuaHRtbFxuXG4vLyByYW5kb20gIydzIHdlIG5lZWQgdG8gaW5pdCBub2RlIGFuZCBjbG9ja3NlcVxudmFyIF9zZWVkQnl0ZXMgPSBfcm5nKCk7XG5cbi8vIFBlciA0LjUsIGNyZWF0ZSBhbmQgNDgtYml0IG5vZGUgaWQsICg0NyByYW5kb20gYml0cyArIG11bHRpY2FzdCBiaXQgPSAxKVxudmFyIF9ub2RlSWQgPSBbXG4gIF9zZWVkQnl0ZXNbMF0gfCAweDAxLFxuICBfc2VlZEJ5dGVzWzFdLCBfc2VlZEJ5dGVzWzJdLCBfc2VlZEJ5dGVzWzNdLCBfc2VlZEJ5dGVzWzRdLCBfc2VlZEJ5dGVzWzVdXG5dO1xuXG4vLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxudmFyIF9jbG9ja3NlcSA9IChfc2VlZEJ5dGVzWzZdIDw8IDggfCBfc2VlZEJ5dGVzWzddKSAmIDB4M2ZmZjtcblxuLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG52YXIgX2xhc3RNU2VjcyA9IDAsIF9sYXN0TlNlY3MgPSAwO1xuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG5mdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgdmFyIGIgPSBidWYgfHwgW107XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIGNsb2Nrc2VxID0gb3B0aW9ucy5jbG9ja3NlcSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jbG9ja3NlcSA6IF9jbG9ja3NlcTtcblxuICAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzb1xuICAvLyB0aW1lIGlzIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cbiAgdmFyIG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tc2VjcyA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gIC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcbiAgdmFyIG5zZWNzID0gb3B0aW9ucy5uc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxO1xuXG4gIC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcbiAgdmFyIGR0ID0gKG1zZWNzIC0gX2xhc3RNU2VjcykgKyAobnNlY3MgLSBfbGFzdE5TZWNzKS8xMDAwMDtcblxuICAvLyBQZXIgNC4yLjEuMiwgQnVtcCBjbG9ja3NlcSBvbiBjbG9jayByZWdyZXNzaW9uXG4gIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gIH1cblxuICAvLyBSZXNldCBuc2VjcyBpZiBjbG9jayByZWdyZXNzZXMgKG5ldyBjbG9ja3NlcSkgb3Igd2UndmUgbW92ZWQgb250byBhIG5ld1xuICAvLyB0aW1lIGludGVydmFsXG4gIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbnNlY3MgPSAwO1xuICB9XG5cbiAgLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuICBpZiAobnNlY3MgPj0gMTAwMDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3V1aWQudjEoKTogQ2FuXFwndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWMnKTtcbiAgfVxuXG4gIF9sYXN0TVNlY3MgPSBtc2VjcztcbiAgX2xhc3ROU2VjcyA9IG5zZWNzO1xuICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcblxuICAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcbiAgbXNlY3MgKz0gMTIyMTkyOTI4MDAwMDA7XG5cbiAgLy8gYHRpbWVfbG93YFxuICB2YXIgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdGwgJiAweGZmO1xuXG4gIC8vIGB0aW1lX21pZGBcbiAgdmFyIHRtaCA9IChtc2VjcyAvIDB4MTAwMDAwMDAwICogMTAwMDApICYgMHhmZmZmZmZmO1xuICBiW2krK10gPSB0bWggPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bWggJiAweGZmO1xuXG4gIC8vIGB0aW1lX2hpZ2hfYW5kX3ZlcnNpb25gXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMjQgJiAweGYgfCAweDEwOyAvLyBpbmNsdWRlIHZlcnNpb25cbiAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7XG5cbiAgLy8gYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgIChQZXIgNC4yLjIgLSBpbmNsdWRlIHZhcmlhbnQpXG4gIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDtcblxuICAvLyBgY2xvY2tfc2VxX2xvd2BcbiAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmO1xuXG4gIC8vIGBub2RlYFxuICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICBmb3IgKHZhciBuID0gMDsgbiA8IDY7IG4rKykge1xuICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgfVxuXG4gIHJldHVybiBidWYgPyBidWYgOiB1bnBhcnNlKGIpO1xufVxuXG4vLyAqKmB2NCgpYCAtIEdlbmVyYXRlIHJhbmRvbSBVVUlEKipcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgLy8gRGVwcmVjYXRlZCAtICdmb3JtYXQnIGFyZ3VtZW50LCBhcyBzdXBwb3J0ZWQgaW4gdjEuMlxuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgYnVmID0gb3B0aW9ucyA9PSAnYmluYXJ5JyA/IG5ldyBBcnJheSgxNikgOiBudWxsO1xuICAgIG9wdGlvbnMgPSBudWxsO1xuICB9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IF9ybmcpKCk7XG5cbiAgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XG4gIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcblxuICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgaWYgKGJ1Zikge1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgaWkrKykge1xuICAgICAgYnVmW2kgKyBpaV0gPSBybmRzW2lpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmIHx8IHVucGFyc2Uocm5kcyk7XG59XG5cbi8vIEV4cG9ydCBwdWJsaWMgQVBJXG52YXIgdXVpZCA9IHY0O1xudXVpZC52MSA9IHYxO1xudXVpZC52NCA9IHY0O1xudXVpZC5wYXJzZSA9IHBhcnNlO1xudXVpZC51bnBhcnNlID0gdW5wYXJzZTtcblxubW9kdWxlLmV4cG9ydHMgPSB1dWlkO1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiaW1wb3J0ICcuLi9zdHlsZXMvZDMtY29udGV4dC1tZW51LmNzcyc7XG5cbmltcG9ydCBkMyBmcm9tICdkMyc7XG5pbXBvcnQgc2x1Z2lkIGZyb20gJ3NsdWdpZCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb250ZXh0TWVudShtZW51LCBvcHRzKSB7XG4gICAgbGV0IHByZXZpb3VzbHlNb3VzZVVwID0gZmFsc2U7XG4gICAgbGV0IGNsaWNrQXdheSA9ICgpID0+IHt9O1xuICAgIGxldCB1aWQgPSBzbHVnaWQubmljZSgpO1xuICAgIGxldCByb290RWxlbWVudCA9IG51bGw7XG4gICAgbGV0IG9yaWVudGF0aW9uID0gJ3JpZ2h0JzsgICAvLyBkaXNwbGF5IHRoZSBtZW51IHRvIHRoZSByaWdodCBvZiB0aGUgbW91c2UgY2xpY2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9yIHBhcmVudCBlbGVtZW1lbnRcbiAgICBsZXQgaW5pdGlhbFBvcyA9IG51bGw7XG4gICAgbGV0IHBhcmVudFN0YXJ0ID0gbnVsbDtcblxuICAgIHZhciBvcGVuQ2FsbGJhY2ssXG4gICAgICAgIGNsb3NlQ2FsbGJhY2s7XG5cbiAgICBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb3BlbkNhbGxiYWNrID0gb3B0cztcbiAgICB9IGVsc2Uge1xuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgb3BlbkNhbGxiYWNrID0gb3B0cy5vbk9wZW47XG4gICAgICAgIGNsb3NlQ2FsbGJhY2sgPSBvcHRzLm9uQ2xvc2U7XG4gICAgfVxuXG4gICAgaWYgKCdyb290RWxlbWVudCcgaW4gb3B0cylcbiAgICAgICAgcm9vdEVsZW1lbnQgPSBvcHRzWydyb290RWxlbWVudCddXG5cbiAgICBpZiAoJ3BvcycgaW4gb3B0cykge1xuICAgICAgICAvLyBkbyB3ZSB3YW50IHRvIHBsYWNlIHRoaXMgbWVudSBzb21ld2hlcmUgc3BlY2lmaWM/XG4gICAgICAgIGluaXRpYWxQb3MgPSBvcHRzLnBvcztcbiAgICB9XG5cbiAgICBpZiAoJ29yaWVudGF0aW9uJyBpbiBvcHRzKSB7XG4gICAgICAgIG9yaWVudGF0aW9uID0gb3B0cy5vcmllbnRhdGlvbjtcbiAgICB9XG5cbiAgICBpZiAoJ3BhcmVudFN0YXJ0JyBpbiBvcHRzKSB7XG4gICAgICAgIHBhcmVudFN0YXJ0ID0gb3B0cy5wYXJlbnRTdGFydDtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgdGhlIGRpdiBlbGVtZW50IHRoYXQgd2lsbCBob2xkIHRoZSBjb250ZXh0IG1lbnVcbiAgICBkMy5zZWxlY3RBbGwoJy5kMy1jb250ZXh0LW1lbnUtJyArIHVpZCkuZGF0YShbMV0pXG4gICAgICAgIC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgIC5jbGFzc2VkKCdkMy1jb250ZXh0LW1lbnUnLCB0cnVlKVxuICAgICAgICAuY2xhc3NlZCgnZDMtY29udGV4dC1tZW51LScgKyB1aWQsIHRydWUpXG5cbiAgICAvLyBjbG9zZSBtZW51XG4gICAgZDMuc2VsZWN0KCdib2R5Jykub24oJ2NsaWNrLmQzLWNvbnRleHQtbWVudS0nICsgdWlkLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHByZXZpb3VzbHlNb3VzZVVwKSB7XG4gICAgICAgICAgICBwcmV2aW91c2x5TW91c2VVcCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgY29uc29sZS5sb2coJ2JvZHkgY2xpY2sgY2xvc2UnKTtcblxuICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUtJyArIHVpZCkuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgIG9yaWVudGF0aW9uID0gJ3JpZ2h0JztcblxuICAgICAgICBpZiAoY2xvc2VDYWxsYmFjaykge1xuICAgICAgICAgICAgY2xvc2VDYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyB0aGlzIGdldHMgZXhlY3V0ZWQgd2hlbiBhIGNvbnRleHRtZW51IGV2ZW50IG9jY3Vyc1xuICAgIHJldHVybiBmdW5jdGlvbihkYXRhLCBpbmRleCwgcE1vdXNlVXA9ZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrQXdheUZ1bmMgPSBmdW5jdGlvbigpIHsgfSApIHtcbiAgICAgICAgdmFyIGVsbSA9IHRoaXM7XG4gICAgICAgIHZhciBjb250ZXh0TWVudVBvcyA9IG51bGw7XG4gICAgICAgIGxldCBtb3VzZVBvcyA9IG51bGw7XG4gICAgICAgIGxldCBjdXJyZW50VGhpcyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHJvb3RFbGVtZW50ID09IG51bGwpXG4gICAgICAgICAgICBtb3VzZVBvcyA9IGQzLm1vdXNlKHRoaXMpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBtb3VzZVBvcyA9IGQzLm1vdXNlKHJvb3RFbGVtZW50KTsgLy8gZm9yIHJlY3Vyc2l2ZSBtZW51cywgd2UgbmVlZCB0aGUgbW91c2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3NpdGlvbiByZWxhdGl2ZSB0byBhbm90aGVyIGVsZW1lbnRcblxuICAgICAgICBjbGlja0F3YXkgPSBjbGlja0F3YXlGdW5jO1xuICAgICAgICBsZXQgb3BlbkNoaWxkTWVudVVpZCA9IG51bGw7XG5cbiAgICAgICAgcHJldmlvdXNseU1vdXNlVXAgPSBwTW91c2VVcDtcblxuICAgICAgICBkMy5zZWxlY3RBbGwoJy5kMy1jb250ZXh0LW1lbnUtJyArIHVpZCkuaHRtbCgnJyk7XG4gICAgICAgIHZhciBsaXN0ID0gZDMuc2VsZWN0QWxsKCcuZDMtY29udGV4dC1tZW51LScgKyB1aWQpXG4gICAgICAgICAgICAub24oJ2NvbnRleHRtZW51JywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb250ZXh0LW1lbnUgY2xvc2UnKTtcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUtJyArIHVpZCkuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpOyBcbiAgICAgICAgICAgICAgICBvcmllbnRhdGlvbiA9ICdyaWdodCc7XG5cbiAgICAgICAgICAgICAgICBkMy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGQzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJyk7XG5cbiAgICAgICAgbGlzdC5zZWxlY3RBbGwoJ2xpJykuZGF0YSh0eXBlb2YgbWVudSA9PT0gJ2Z1bmN0aW9uJyA/IG1lbnUoZGF0YSkgOiBtZW51KS5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Q6JywgZCk7XG4gICAgICAgICAgICAgICAgdmFyIHJldCA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChkLmRpdmlkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0ICs9ICcgaXMtZGl2aWRlcic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldCArPSAnIGlzLWRpc2FibGVkJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFkLmFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICByZXQgKz0gJyBpcy1oZWFkZXInO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoJ2NoaWxkcmVuJyBpbiBkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldCArPSAnIGQzLWNvbnRleHQtbWVudS1yZWN1cnNpdmUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5odG1sKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZC5kaXZpZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGhyPic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZC50aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyB0aXRsZSBhdHRyaWJ1dGUgc2V0LiBDaGVjayB0aGUgc3BlbGxpbmcgb2YgeW91ciBvcHRpb25zLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gKHR5cGVvZiBkLnRpdGxlID09PSAnc3RyaW5nJykgPyBkLnRpdGxlIDogZC50aXRsZShkYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgICAgIGlmIChkLmRpc2FibGVkKSByZXR1cm47IC8vIGRvIG5vdGhpbmcgaWYgZGlzYWJsZWRcbiAgICAgICAgICAgICAgICBpZiAoIWQuYWN0aW9uKSByZXR1cm47IC8vIGhlYWRlcnMgaGF2ZSBubyBcImFjdGlvblwiXG4gICAgICAgICAgICAgICAgZC5hY3Rpb24oZWxtLCBkYXRhLCBpbmRleCwgbW91c2VQb3MpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjbGljayBjbG9zZScpO1xuXG4gICAgICAgICAgICAgICAgLy8gY2xvc2UgYWxsIGNvbnRleHQgbWVudXNcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3RBbGwoJy5kMy1jb250ZXh0LW1lbnUnKS5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgb3JpZW50YXRpb24gPSAncmlnaHQnO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNsb3NlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdkMy1jb250ZXh0LW1lbnUtc2VsZWN0ZWQnLCB0cnVlKVxuXG4gICAgICAgICAgICAgICAgaWYgKG9wZW5DaGlsZE1lbnVVaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGVyZSdzIGEgY2hpbGQgbWVudSBvcGVuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdW5zZWxlY3QgYWxsIGl0ZW1zXG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudS0nICsgdWlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgnbGknKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2QzLWNvbnRleHQtbWVudS1zZWxlY3RlZCcsIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGQuY2hpbGRyZW4gPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm8gY2hpbGRyZW4gY2xvc2VcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBubyBjaGlsZHJlbiwgc28gaGlkZSBhbnkgb3BlbiBjaGlsZCBtZW51c1xuICAgICAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51LScgKyBvcGVuQ2hpbGRNZW51VWlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlbkNoaWxkTWVudVVpZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoZC5jaGlsZFVpZCA9PSBvcGVuQ2hpbGRNZW51VWlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgY29ycmVjdCBjaGlsZCBtZW51IGlzIGFscmVhZHkgb3BlblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZWVkIHRvIG9wZW4gYSBkaWZmZXJlbnQgY2hpbGQgbWVudVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29wZW4gZGlmZmVyZW50IGNoaWxkIG1lbnUgY2xvc2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xvc2UgdGhlIGFscmVhZHkgb3BlbiBvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudS0nICsgb3BlbkNoaWxkTWVudVVpZClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5DaGlsZE1lbnVVaWQgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgLy8gdGhlcmUgc2hvdWxkIGJlIG5vIG1lbnUgb3BlbiByaWdodCBub3dcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGQuY2hpbGRyZW4gIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJvdW5kaW5nUmVjdCA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkcmVuQ29udGV4dE1lbnUgPSBudWxsXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmllbnRhdGlvbiA9PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuQ29udGV4dE1lbnUgPSBjb250ZXh0TWVudShkLmNoaWxkcmVuLCB7J3Jvb3RFbGVtZW50JzogY3VycmVudFRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncG9zJzogWyBib3VuZGluZ1JlY3QubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kaW5nUmVjdC50b3AgLSAyICsgd2luZG93LnBhZ2VZT2Zmc2V0XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdvcmllbnRhdGlvbic6ICdsZWZ0J30pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5Db250ZXh0TWVudSA9IGNvbnRleHRNZW51KGQuY2hpbGRyZW4sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncG9zJzogWyBib3VuZGluZ1JlY3QubGVmdCArIGJvdW5kaW5nUmVjdC53aWR0aCArIHdpbmRvdy5wYWdlWE9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kaW5nUmVjdC50b3AgLSAyICsgd2luZG93LnBhZ2VZT2Zmc2V0XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyb290RWxlbWVudCc6IGN1cnJlbnRUaGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3BhcmVudFN0YXJ0JzogW2JvdW5kaW5nUmVjdC5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3VuZGluZ1JlY3QudG9wIC0gMiArIHdpbmRvdy5wYWdlWU9mZnNldF19KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGQuY2hpbGRVaWQgPSBjaGlsZHJlbkNvbnRleHRNZW51LmFwcGx5KHRoaXMsIFtkYXRhLGksdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7IH1dKTtcbiAgICAgICAgICAgICAgICAgICAgb3BlbkNoaWxkTWVudVVpZCA9IGQuY2hpbGRVaWQ7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2QzLWNvbnRleHQtbWVudS1zZWxlY3RlZCcsIHRydWUpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbihkLCBpKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAob3BlbkNoaWxkTWVudVVpZCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2QzLWNvbnRleHQtbWVudS1zZWxlY3RlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGlzdC5zZWxlY3RBbGwoJy5kMy1jb250ZXh0LW1lbnUtcmVjdXJzaXZlJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2ltZycpXG4gICAgICAgICAgICAuYXR0cignc3JjJywgJ2ltYWdlcy9wbGF5LnN2ZycpXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCAnMTRweCcpXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgJzE0cHgnKVxuICAgICAgICAgICAgLnN0eWxlKCdwb3NpdGlvbicsICdhYnNvbHV0ZScpXG4gICAgICAgICAgICAuc3R5bGUoJ3JpZ2h0JywgJzVweCcpXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgLy8gdGhlIG9wZW5DYWxsYmFjayBhbGxvd3MgYW4gYWN0aW9uIHRvIGZpcmUgYmVmb3JlIHRoZSBtZW51IGlzIGRpc3BsYXllZFxuICAgICAgICAvLyBhbiBleGFtcGxlIHVzYWdlIHdvdWxkIGJlIGNsb3NpbmcgYSB0b29sdGlwXG4gICAgICAgIGlmIChvcGVuQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmIChvcGVuQ2FsbGJhY2soZGF0YSwgaW5kZXgpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1aWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY29udGV4dE1lbnVTZWxlY3Rpb24gPSBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUtJyArIHVpZClcbiAgICAgICAgICAgIC5zdHlsZSgnZGlzcGxheScsICdibG9jaycpO1xuXG4gICAgICAgIGlmIChpbml0aWFsUG9zID09IG51bGwpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudS0nICsgdWlkKVxuICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JywgKGQzLmV2ZW50LnBhZ2VYIC0gMikgKyAncHgnKVxuICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCAoZDMuZXZlbnQucGFnZVkgLSAyKSArICdweCcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUtJyArIHVpZClcbiAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIGluaXRpYWxQb3NbMF0gKyAncHgnKVxuICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCBpbml0aWFsUG9zWzFdICsgJ3B4JylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBtZW51IGRpc2FwcGVhcnMgb2ZmIHRoZSBzaWRlIG9mIHRoZSB3aW5kb3dcbiAgICAgICAgbGV0IGJvdW5kaW5nUmVjdCA9IGNvbnRleHRNZW51U2VsZWN0aW9uLm5vZGUoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICBpZiAoYm91bmRpbmdSZWN0LmxlZnQgKyBib3VuZGluZ1JlY3Qud2lkdGggPiB3aW5kb3cuaW5uZXJXaWR0aCB8fCBvcmllbnRhdGlvbiA9PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIG9yaWVudGF0aW9uID0gJ2xlZnQnO1xuXG4gICAgICAgICAgICAvLyBtZW51IGdvZXMgb2YgdGhlIGVuZCBvZiB0aGUgd2luZG93LCBwb3NpdGlvbiBpdCB0aGUgb3RoZXIgd2F5XG4gICAgICAgICAgICBpZiAoaW5pdGlhbFBvcyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gcGxhY2UgdGhlIG1lbnUgd2hlcmUgdGhlIHVzZXIgY2xpY2tlZFxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudS0nICsgdWlkKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIChkMy5ldmVudC5wYWdlWCAtIDIgLSBib3VuZGluZ1JlY3Qud2lkdGgpICsgJ3B4JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3RvcCcsIChkMy5ldmVudC5wYWdlWSAtIDIpICsgJ3B4JylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudFN0YXJ0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51LScgKyB1aWQpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIChwYXJlbnRTdGFydFswXSAtIGJvdW5kaW5nUmVjdC53aWR0aCkgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3RvcCcsIHBhcmVudFN0YXJ0WzFdICsgJ3B4JylcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUtJyArIHVpZClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JywgKGluaXRpYWxQb3NbMF0gLSBib3VuZGluZ1JlY3Qud2lkdGgpICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCBpbml0aWFsUG9zWzFdICsgJ3B4JylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRpc3BsYXkgY29udGV4dCBtZW51XG5cbiAgICAgICAgaWYgKHByZXZpb3VzbHlNb3VzZVVwKVxuICAgICAgICAgICAgcmV0dXJuIHVpZDtcblxuICAgICAgICBkMy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBkMy5ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgLy9kMy5ldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgLy9cbiAgICAgICAgcmV0dXJuIHVpZDtcbiAgICB9O1xufTtcbiIsIi8qIFZlcnNpb246IDAuMlxuKiBEYXRlOiAyMDE1LTAzLTE1XG4qL1xuXG5pbXBvcnQgJy4uL3N0eWxlcy9mb3JuYWMuY3NzJztcbmltcG9ydCAnLi4vc3R5bGVzL2QzLWNvbnRleHQtbWVudS5jc3MnO1xuXG5pbXBvcnQgZDMgZnJvbSAnZDMnO1xuaW1wb3J0IHNsdWdpZCBmcm9tICdzbHVnaWQnO1xuaW1wb3J0IHtjb250ZXh0TWVudX0gZnJvbSAnLi9kMy1jb250ZXh0LW1lbnUuanMnO1xuXG5pbXBvcnQge1JOQUdyYXBofSBmcm9tICcuL3JuYWdyYXBoLmpzJztcbmltcG9ydCB7Q29sb3JTY2hlbWUsIHJuYVV0aWxpdGllc30gZnJvbSAnLi9ybmF1dGlscy5qcyc7XG5cbmltcG9ydCB7c2ltcGxlWHlDb29yZGluYXRlc30gZnJvbSAnLi9zaW1wbGVybmFwbG90LmpzJztcbmltcG9ydCB7TkFWaWV3fSBmcm9tICcuL25hdmlldy9uYXZpZXcuanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gRm9ybmFDb250YWluZXIoZWxlbWVudCwgcGFzc2VkT3B0aW9ucykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHNlbGYub3B0aW9ucyA9IHtcbiAgICAgICAgJ2VkaXRhYmxlJzogZmFsc2UsXG4gICAgICAgICdkaXNwbGF5QWxsTGlua3MnOiBmYWxzZSxcbiAgICAgICAgJ2xhYmVsSW50ZXJ2YWwnOiAxMCxcbiAgICAgICAgJ2FwcGx5Rm9yY2UnOiB0cnVlLFxuICAgICAgICAnY2hhcmdlRGlzdGFuY2UnOiAxMTAsXG4gICAgICAgICdmcmljdGlvbic6IDAuMzUsXG4gICAgICAgICdtaWRkbGVDaGFyZ2UnOiAtMzAsXG4gICAgICAgICdvdGhlckNoYXJnZSc6IC0zMCxcbiAgICAgICAgJ2xpbmtEaXN0YW5jZU11bHRpcGxpZXInOiAxNSxcbiAgICAgICAgJ2luaXRpYWxTaXplJzogbnVsbCxcbiAgICAgICAgJ2xheW91dCc6ICdzdGFuZGFyZC1wb2x5Z29uYWwnLFxuICAgICAgICAnYWxsb3dQYW5uaW5nQW5kWm9vbWluZyc6IHRydWUsXG4gICAgICAgICd0cmFuc2l0aW9uRHVyYXRpb24nOiA1MDAsXG4gICAgICAgICdtYXhOb2RlUmFkaXVzJzogODAsICAgIC8vIHRoZSBtYXhpbXVtIHJhZGl1cyBvZiBhIG5vZGUgd2hlbiB0aGUgdmlldyBpcyBjZW50ZXJlZFxuICAgICAgICAncmVzaXplU3ZnT25SZXNpemUnOiB0cnVlICAgLy9jaGFuZ2UgdGhlIHNpemUgb2YgdGhlIHN2ZyB3aGVuIHJlc2l6aW5nIHRoZSBjb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc29tZXRpbWVzIGl0cyBiZW5lZmljaWFsIHRvIHR1cm4gdGhpcyBvZmYsIGVzcGVjaWFsbHkgd2hlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9wZXJmb3JtYW5jZSBpcyBhbiBpc3N1ZVxuICAgIH07XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgb3B0aW9uIGluIHBhc3NlZE9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuaGFzT3duUHJvcGVydHkob3B0aW9uKSlcbiAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnNbb3B0aW9uXSA9IHBhc3NlZE9wdGlvbnNbb3B0aW9uXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzZWxmLm9wdGlvbnMuaW5pdGlhbFNpemUgIT09IG51bGwpIHtcbiAgICAgICAgc2VsZi5vcHRpb25zLnN2Z1cgPSBzZWxmLm9wdGlvbnMuaW5pdGlhbFNpemVbMF07XG4gICAgICAgIHNlbGYub3B0aW9ucy5zdmdIID0gc2VsZi5vcHRpb25zLmluaXRpYWxTaXplWzFdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYub3B0aW9ucy5zdmdXID0gODAwO1xuICAgICAgICBzZWxmLm9wdGlvbnMuc3ZnSCA9IDgwMDtcbiAgICB9XG5cbiAgICBpZiAoc2VsZi5vcHRpb25zLmVkaXRhYmxlID09IHRydWUpIHtcbiAgICAgICAgbGV0IGJhY2tncm91bmRNZW51ID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnQWRkIE5vZGUnLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oZWxtLCBkLCBpLCBtb3VzZVBvcykge1xuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW3tcbiAgICAgICAgICAgICAgICAgICAgJ3RpdGxlJzogJ0EnLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKGVsbSwgZCwgaSwgbW91c2VQb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtb3VzZVBvczonLCBtb3VzZVBvcywgc2VsZi5vcHRpb25zLnN2Z1csIHNlbGYub3B0aW9ucy5zdmdIKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYW52YXNNb3VzZVBvcyA9IFt4U2NhbGUuaW52ZXJ0KG1vdXNlUG9zWzBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5U2NhbGUuaW52ZXJ0KG1vdXNlUG9zWzFdKV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2FudmFzTW91c2VQb3MnLCBjYW52YXNNb3VzZVBvcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWRkUk5BKCcuJywgeydzZXF1ZW5jZSc6ICdBJywgJ2NlbnRlclBvcyc6IGNhbnZhc01vdXNlUG9zfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICd0aXRsZSc6ICdDJyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbihlbG0sIGQsIGksIG1vdXNlUG9zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbW91c2VQb3M6JywgbW91c2VQb3MsIHNlbGYub3B0aW9ucy5zdmdXLCBzZWxmLm9wdGlvbnMuc3ZnSCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FudmFzTW91c2VQb3MgPSBbeFNjYWxlLmludmVydChtb3VzZVBvc1swXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeVNjYWxlLmludmVydChtb3VzZVBvc1sxXSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbnZhc01vdXNlUG9zJywgY2FudmFzTW91c2VQb3MpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkZFJOQSgnLicsIHsnc2VxdWVuY2UnOiAnQycsICdjZW50ZXJQb3MnOiBjYW52YXNNb3VzZVBvc30pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICd0aXRsZSc6ICdHJyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbihlbG0sIGQsIGksIG1vdXNlUG9zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbW91c2VQb3M6JywgbW91c2VQb3MsIHNlbGYub3B0aW9ucy5zdmdXLCBzZWxmLm9wdGlvbnMuc3ZnSCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FudmFzTW91c2VQb3MgPSBbeFNjYWxlLmludmVydChtb3VzZVBvc1swXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeVNjYWxlLmludmVydChtb3VzZVBvc1sxXSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbnZhc01vdXNlUG9zJywgY2FudmFzTW91c2VQb3MpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkZFJOQSgnLicsIHsnc2VxdWVuY2UnOiAnRycsICdjZW50ZXJQb3MnOiBjYW52YXNNb3VzZVBvc30pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICd0aXRsZSc6ICdVJyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbihlbG0sIGQsIGksIG1vdXNlUG9zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbW91c2VQb3M6JywgbW91c2VQb3MsIHNlbGYub3B0aW9ucy5zdmdXLCBzZWxmLm9wdGlvbnMuc3ZnSCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FudmFzTW91c2VQb3MgPSBbeFNjYWxlLmludmVydChtb3VzZVBvc1swXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeVNjYWxlLmludmVydChtb3VzZVBvc1sxXSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbnZhc01vdXNlUG9zJywgY2FudmFzTW91c2VQb3MpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkZFJOQSgnLicsIHsnc2VxdWVuY2UnOiAnVScsICdjZW50ZXJQb3MnOiBjYW52YXNNb3VzZVBvc30pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UgLy8gb3B0aW9uYWwsIGRlZmF1bHRzIHRvIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cblxuICAgICAgICBsZXQgbm9kZU1lbnUgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdEZWxldGUgTm9kZScsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbihlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kZWxldGVOb2RlKGQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlIC8vIG9wdGlvbmFsLCBkZWZhdWx0cyB0byBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0NoYW5nZSBOb2RlJyxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnWW91IGhhdmUgY2xpY2tlZCB0aGUgc2Vjb25kIGl0ZW0hJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUaGUgZGF0YSBmb3IgdGhpcyBjaXJjbGUgaXM6ICcgKyBkKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQScsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlTm9kZSgnQScsIGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbihlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZU5vZGUoJ0MnLCBkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0cnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbihlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZU5vZGUoJ0cnLCBkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ1UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbihlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZU5vZGUoJ1UnLCBkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0luc2VydCBCZWZvcmUnLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oZWxtLCBkLCBpKSB7XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQScsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW5zZXJ0Tm9kZUJlZm9yZU9yQWZ0ZXIoJ0EnLCBkLCAtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQycsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW5zZXJ0Tm9kZUJlZm9yZU9yQWZ0ZXIoJ0MnLCBkLCAtMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdHJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbnNlcnROb2RlQmVmb3JlT3JBZnRlcignRycsIGQsIC0xKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ1UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbihlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmluc2VydE5vZGVCZWZvcmVPckFmdGVyKCdVJywgZCwgLTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdJbnNlcnQgQWZ0ZXInLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkOicsIGQpO1xuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0EnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbihlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmluc2VydE5vZGVCZWZvcmVPckFmdGVyKCdBJywgZCwgMCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdDJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbnNlcnROb2RlQmVmb3JlT3JBZnRlcignQycsIGQsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0cnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbihlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmluc2VydE5vZGVCZWZvcmVPckFmdGVyKCdHJywgZCwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnVScsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW5zZXJ0Tm9kZUJlZm9yZU9yQWZ0ZXIoJ1UnLCBkLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cblxuICAgICAgICBzZWxmLm5vZGVDb250ZXh0TWVudSA9IGNvbnRleHRNZW51KG5vZGVNZW51KTtcbiAgICAgICAgc2VsZi5iYWNrZ3JvdW5kQ29udGV4dE1lbnUgPSBjb250ZXh0TWVudShiYWNrZ3JvdW5kTWVudSk7XG5cbiAgICB9ICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2VtcHR5IGNvbnRleHQgbWVudScpO1xuICAgICAgICBzZWxmLm5vZGVDb250ZXh0TWVudSA9IGZ1bmN0aW9uKCkge307XG4gICAgfVxuXG4gICAgdmFyIGZpbGwgPSBkMy5zY2FsZS5jYXRlZ29yeTIwKCk7XG5cbiAgICAvLyBtb3VzZSBldmVudCB2YXJzXG4gICAgdmFyIG1vdXNlZG93bkxpbmsgPSBudWxsLFxuICAgICAgICBtb3VzZWRvd25Ob2RlID0gbnVsbCxcbiAgICAgICAgbW91c2V1cE5vZGUgPSBudWxsO1xuICAgIGxldCBsaW5rQ29udGV4dE1lbnVTaG93biA9IGZhbHNlO1xuXG4gICAgdmFyIHhTY2FsZSA9IGQzLnNjYWxlLmxpbmVhcigpXG4gICAgLmRvbWFpbihbMCxzZWxmLm9wdGlvbnMuc3ZnV10pLnJhbmdlKFswLHNlbGYub3B0aW9ucy5zdmdXXSk7XG4gICAgdmFyIHlTY2FsZSA9IGQzLnNjYWxlLmxpbmVhcigpXG4gICAgLmRvbWFpbihbMCxzZWxmLm9wdGlvbnMuc3ZnSF0pLnJhbmdlKFswLCBzZWxmLm9wdGlvbnMuc3ZnSF0pO1xuXG4gICAgdmFyIGdyYXBoID0gc2VsZi5ncmFwaCA9IHtcbiAgICAgICAgJ25vZGVzJzpbXSxcbiAgICAgICAgJ2xpbmtzJzpbXVxuICAgIH07XG4gICAgXG4gICAgc2VsZi5saW5rU3RyZW5ndGhzID0ge1xuICAgICAgICAncHNldWRva25vdCc6IDAuMDAsXG4gICAgICAgICdwcm90ZWluQ2hhaW4nOiAwLjAwLFxuICAgICAgICAnY2hhaW5DaGFpbic6IDAuMDAsXG4gICAgICAgICdpbnRlcm1vbGVjdWxlJzogMTAuMDAsXG4gICAgICAgICdleHRlcm5hbCc6IDAuMDAsXG4gICAgICAgICdvdGhlcic6IDEwLjAwXG4gICAgfTtcbiAgICBcbiAgICBzZWxmLmRpc3BsYXlQYXJhbWV0ZXJzID0ge1xuICAgICAgICAnZGlzcGxheUJhY2tncm91bmQnOiAndHJ1ZScsXG4gICAgICAgICdkaXNwbGF5TnVtYmVyaW5nJzogJ3RydWUnLFxuICAgICAgICAnZGlzcGxheU5vZGVPdXRsaW5lJzogJ3RydWUnLFxuICAgICAgICAnZGlzcGxheU5vZGVMYWJlbCc6ICd0cnVlJyxcbiAgICAgICAgJ2Rpc3BsYXlMaW5rcyc6ICd0cnVlJyxcbiAgICAgICAgJ2Rpc3BsYXlQc2V1ZG9rbm90TGlua3MnOiAndHJ1ZScsXG4gICAgICAgICdkaXNwbGF5UHJvdGVpbkxpbmtzJzogJ3RydWUnXG4gICAgfTtcblxuICAgIHNlbGYuY29sb3JTY2hlbWUgPSAnc3RydWN0dXJlJztcbiAgICBzZWxmLmN1c3RvbUNvbG9ycyA9IHt9O1xuICAgIHNlbGYuYW5pbWF0aW9uID0gc2VsZi5vcHRpb25zLmFwcGx5Rm9yY2U7XG4gICAgLy8gZG9uJ3QgbGlzdGVuIHRvIGV2ZW50cyBiZWNhdXNlIGEgbW9kZWwgd2luZG93IGlzIG9wZW4gc29tZXdoZXJlXG4gICAgc2VsZi5kZWFmID0gZmFsc2U7XG4gICAgc2VsZi5ybmFzID0ge307XG4gICAgc2VsZi5leHRyYUxpbmtzID0gW107IC8vc3RvcmUgbGlua3MgYmV0d2VlbiBkaWZmZXJlbnQgUk5Bc1xuXG4gICAgQXJyYXkucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIChhcnJheSkge1xuICAgICAgICAvLyBpZiB0aGUgb3RoZXIgYXJyYXkgaXMgYSBmYWxzeSB2YWx1ZSwgcmV0dXJuXG4gICAgICAgIGlmICghYXJyYXkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgLy8gY29tcGFyZSBsZW5ndGhzIC0gY2FuIHNhdmUgYSBsb3Qgb2YgdGltZSBcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoICE9IGFycmF5Lmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbD10aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgd2UgaGF2ZSBuZXN0ZWQgYXJyYXlzXG4gICAgICAgICAgICBpZiAodGhpc1tpXSBpbnN0YW5jZW9mIEFycmF5ICYmIGFycmF5W2ldIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAvLyByZWN1cnNlIGludG8gdGhlIG5lc3RlZCBhcnJheXNcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXNbaV0uZXF1YWxzKGFycmF5W2ldKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAgICAgICBcbiAgICAgICAgICAgIH0gICAgICAgICAgIFxuICAgICAgICAgICAgZWxzZSBpZiAodGhpc1tpXSAhPSBhcnJheVtpXSkgeyBcbiAgICAgICAgICAgICAgICAvLyBXYXJuaW5nIC0gdHdvIGRpZmZlcmVudCBvYmplY3QgaW5zdGFuY2VzIHdpbGwgbmV2ZXIgYmUgZXF1YWw6IHt4OjIwfSAhPSB7eDoyMH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7ICAgXG4gICAgICAgICAgICB9ICAgICAgICAgICBcbiAgICAgICAgfSAgICAgICBcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuXG4gICAgc2VsZi5jcmVhdGVJbml0aWFsTGF5b3V0ID0gZnVuY3Rpb24oc3RydWN0dXJlLCBwYXNzZWRPcHRpb25zKSB7XG4gICAgICAgIC8vIHRoZSBkZWZhdWx0IG9wdGlvbnNcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3NlcXVlbmNlJzogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnbmFtZSc6ICdlbXB0eScsXG4gICAgICAgICAgICAgICAgICAgICAgICAncG9zaXRpb25zJzogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAnbGFiZWxJbnRlcnZhbCc6IHNlbGYub3B0aW9ucy5sYWJlbEludGVydmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2F2b2lkT3RoZXJzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aWRzJzogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAnY2lyY3VsYXJpemVFeHRlcm5hbCc6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgIGZvciAodmFyIG9wdGlvbiBpbiBwYXNzZWRPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkob3B0aW9uKSlcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1tvcHRpb25dID0gcGFzc2VkT3B0aW9uc1tvcHRpb25dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coJ29wdGlvbnMudWlkczonLCBvcHRpb25zLnVpZHMpO1xuICAgICAgICB2YXIgcmcgPSBuZXcgUk5BR3JhcGgob3B0aW9ucy5zZXF1ZW5jZSwgc3RydWN0dXJlLCBvcHRpb25zLm5hbWUpO1xuICAgICAgICByZy5jaXJjdWxhcml6ZUV4dGVybmFsID0gb3B0aW9ucy5jaXJjdWxhcml6ZUV4dGVybmFsO1xuXG4gICAgICAgIHZhciBybmFKc29uID0gcmcucmVjYWxjdWxhdGVFbGVtZW50cygpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLnBvc2l0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIG5vIHByb3ZpZGVkIHBvc2l0aW9ucyBtZWFucyB3ZSBuZWVkIHRvIGNhbGN1bGF0ZSBhbiBpbml0aWFsIGxheW91dFxuXG4gICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLmxheW91dCA9PSAnbmF2aWV3Jykge1xuICAgICAgICAgICAgICAgIHZhciBuYXZpZXcgPSBuZXcgTkFWaWV3KCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgbmFWaWV3UG9zaXRpb25zID0gbmF2aWV3Lm5hdmlld194eV9jb29yZGluYXRlcyhyZy5wYWlydGFibGUpO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucG9zaXRpb25zID0gW11cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hVmlld1Bvc2l0aW9ucy5uYmFzZTsgaSsrKVxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnBvc2l0aW9ucy5wdXNoKFtuYVZpZXdQb3NpdGlvbnMueFtpXSwgbmFWaWV3UG9zaXRpb25zLnlbaV1dKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wb3NpdGlvbnMgPSBzaW1wbGVYeUNvb3JkaW5hdGVzKHJuYUpzb24ucGFpcnRhYmxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJuYUpzb24gPSBybmFKc29uLmVsZW1lbnRzVG9Kc29uKClcbiAgICAgICAgLmFkZFVpZHMob3B0aW9ucy51aWRzKVxuICAgICAgICAuYWRkUG9zaXRpb25zKCdudWNsZW90aWRlJywgb3B0aW9ucy5wb3NpdGlvbnMpXG4gICAgICAgIC5hZGRMYWJlbHMoMSwgb3B0aW9ucy5sYWJlbEludGVydmFsKVxuICAgICAgICAucmVpbmZvcmNlU3RlbXMoKVxuICAgICAgICAucmVpbmZvcmNlTG9vcHMoKVxuICAgICAgICAuY29ubmVjdEZha2VOb2RlcygpXG4gICAgICAgIC5yZWFzc2lnbkxpbmtVaWRzKClcbiAgICAgICAgLmJyZWFrTm9kZXNUb0Zha2VOb2RlcygpO1xuXG4gICAgICAgIHJldHVybiBybmFKc29uO1xuICAgIH07XG5cbiAgICBzZWxmLmFkZFJOQSA9IGZ1bmN0aW9uKHN0cnVjdHVyZSwgcGFzc2VkT3B0aW9ucykge1xuICAgICAgICB2YXIgcm5hSnNvbiA9IHNlbGYuY3JlYXRlSW5pdGlhbExheW91dChzdHJ1Y3R1cmUsIHBhc3NlZE9wdGlvbnMpO1xuICAgICAgICBsZXQgY2VudGVyVmlldyA9IGZhbHNlO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAqIENvZGUgdG8gZGlzcGxheSB0aGUgSlNPTnMgcmVwcmVzZW50aW5nIHRoZSBzdHJ1Y3R1cmVcbiAgICAgICAgICpcbiAgICAgICAgcm5hSnNvbi5ub2Rlc1swXS5ybmEgPSBudWxsO1xuICAgICAgICBybmFKc29uLm5vZGVzWzBdLm5leHROb2RlID0gbnVsbDtcblxuICAgICAgICBybmFKc29uLmxpbmtzWzBdLnNvdXJjZSA9IG51bGw7XG4gICAgICAgIHJuYUpzb24ubGlua3NbMF0udGFyZ2V0ID0gbnVsbDtcblxuICAgICAgICBjb25zb2xlLmxvZyhybmFKc29uLm5vZGVzWzBdKTtcbiAgICAgICAgY29uc29sZS5sb2cocm5hSnNvbi5saW5rc1swXSk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJuYUpzb24ubm9kZXNbMF0sbnVsbCwyKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJuYUpzb24ubGlua3NbMF0sbnVsbCwyKSk7XG4gICAgICAgICovXG5cbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpXG4gICAgICAgICAgICBwYXNzZWRPcHRpb25zID0ge307XG5cbiAgICAgICAgaWYgKCdleHRyYUxpbmtzJyBpbiBwYXNzZWRPcHRpb25zKSB7XG4gICAgICAgICAgICAvLyBwcmVzdW1hYmx5IHRoZSBwYXNzZWQgaW4gbGlua3MgYXJlIHdpdGhpbiB0aGUgcGFzc2VkIG1vbGVjdWxlXG4gICAgICAgICAgICB2YXIgbmV3TGlua3MgPSBzZWxmLmFkZEV4dGVybmFsTGlua3Mocm5hSnNvbiwgcGFzc2VkT3B0aW9ucy5leHRyYUxpbmtzKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2VsZi5leHRyYUxpbmtzID0gc2VsZi5leHRyYUxpbmtzLmNvbmNhdChuZXdMaW5rcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJ2NlbnRlclBvcycgaW4gcGFzc2VkT3B0aW9ucylcbiAgICAgICAgICAgIHNlbGYuYWRkUk5BSlNPTihybmFKc29uLCB7Y2VudGVyUG9zOiBwYXNzZWRPcHRpb25zLmNlbnRlclBvcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyVmlldzogZmFsc2V9KVxuICAgICAgICBlbHNlIGlmICgnYXZvaWRPdGhlcnMnIGluIHBhc3NlZE9wdGlvbnMpXG4gICAgICAgICAgICBzZWxmLmFkZFJOQUpTT04ocm5hSnNvbiwge2F2b2lkT3RoZXJzOiBwYXNzZWRPcHRpb25zLmF2b2lkT3RoZXJzfSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHNlbGYuYWRkUk5BSlNPTihybmFKc29uLCB7Y2VudGVyVmlldzogcGFzc2VkT3B0aW9ucy5jZW50ZXJWaWV3fSk7XG5cbiAgICAgICAgcmV0dXJuIHJuYUpzb247XG4gICAgfTtcblxuICAgIHNlbGYuY2hhbmdlTm9kZSA9IGZ1bmN0aW9uKG5vZGVOYW1lLCByZWZlcmVuY2VOb2RlKSB7XG4gICAgICAgIC8vaW5zZXJ0IGEgbmV3IG5vZGUgYmVmb3JlIG9yIGFmdGVyIGFub3RoZXIgb25lXG4gICAgICAgIC8vcG9zaXRpb25PZmZzZXQgc3BlY2lmaWVzIHdobyBmYXIgZnJvbSB0aGUgb3JpZ2luYWwgdG8gaW5zZXJ0IHRoZSBuZXcgbm9kZVxuICAgICAgICBsZXQgcm5hID0gcmVmZXJlbmNlTm9kZS5ybmE7XG5cbiAgICAgICAgbGV0IGRvdGJyYWNrZXQgPSBybmFVdGlsaXRpZXMucGFpcnRhYmxlVG9Eb3RicmFja2V0KHJuYS5wYWlydGFibGUpO1xuICAgICAgICBsZXQgcG9zaXRpb25zID0gcm5hLmdldFBvc2l0aW9ucygnbnVjbGVvdGlkZScpO1xuICAgICAgICBsZXQgc2VxdWVuY2UgPSBybmEuc2VxXG4gICAgICAgIGxldCB1aWRzID0gcm5hLmdldFVpZHMoKTtcblxuICAgICAgICBsZXQgbmV3Tm9kZU51bSA9IHJlZmVyZW5jZU5vZGUubnVtO1xuXG4gICAgICAgIGxldCBuZXdEb3RicmFja2V0ID0gZG90YnJhY2tldDtcbiAgICAgICAgbGV0IG5ld1NlcXVlbmNlID0gc2VxdWVuY2Uuc2xpY2UoMCxuZXdOb2RlTnVtLTEpICsgIG5vZGVOYW1lICsgc2VxdWVuY2Uuc2xpY2UobmV3Tm9kZU51bSk7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ25ld1NlcXVlbmNlOicsIG5ld1NlcXVlbmNlKTtcblxuICAgICAgICBjb25zb2xlLmxvZygndWlkczonLCB1aWRzKTtcbiAgICAgICAgdWlkcy5zcGxpY2UobmV3Tm9kZU51bS0xLCAxLCBzbHVnaWQubmljZSgpKTtcbiAgICAgICAgbGV0IG5ld1Bvc2l0aW9ucyA9IHBvc2l0aW9ucztcblxuXG4gICAgICAgIGRlbGV0ZSBzZWxmLnJuYXNbcm5hLnVpZF07XG4gICAgICAgIGxldCBuZXdSTkEgPSBzZWxmLmFkZFJOQShuZXdEb3RicmFja2V0LCB7J3NlcXVlbmNlJzogbmV3U2VxdWVuY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncG9zaXRpb25zJzogbmV3UG9zaXRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpZHMnOiB1aWRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NlbnRlclZpZXcnOiBmYWxzZX0pO1xuXG4gICAgfVxuXG4gICAgc2VsZi5pbnNlcnROb2RlQmVmb3JlT3JBZnRlciA9IGZ1bmN0aW9uKG5vZGVOYW1lLCByZWZlcmVuY2VOb2RlLCBwb3NpdGlvbk9mZnNldCkge1xuICAgICAgICAvL2luc2VydCBhIG5ldyBub2RlIGJlZm9yZSBvciBhZnRlciBhbm90aGVyIG9uZVxuICAgICAgICAvL3Bvc2l0aW9uT2Zmc2V0IHNwZWNpZmllcyB3aG8gZmFyIGZyb20gdGhlIG9yaWdpbmFsIHRvIGluc2VydCB0aGUgbmV3IG5vZGVcbiAgICAgICAgbGV0IHJuYSA9IHJlZmVyZW5jZU5vZGUucm5hO1xuXG4gICAgICAgIGxldCBkb3RicmFja2V0ID0gcm5hVXRpbGl0aWVzLnBhaXJ0YWJsZVRvRG90YnJhY2tldChybmEucGFpcnRhYmxlKTtcbiAgICAgICAgbGV0IHBvc2l0aW9ucyA9IHJuYS5nZXRQb3NpdGlvbnMoJ251Y2xlb3RpZGUnKTtcbiAgICAgICAgbGV0IHNlcXVlbmNlID0gcm5hLnNlcVxuICAgICAgICBsZXQgdWlkcyA9IHJuYS5nZXRVaWRzKCk7XG5cbiAgICAgICAgbGV0IG5ld05vZGVOdW0gPSByZWZlcmVuY2VOb2RlLm51bSArIHBvc2l0aW9uT2Zmc2V0O1xuXG4gICAgICAgIGxldCBuZXdEb3RicmFja2V0ID0gZG90YnJhY2tldC5zbGljZSgwLG5ld05vZGVOdW0pICsgJy4nICsgZG90YnJhY2tldC5zbGljZShuZXdOb2RlTnVtKTtcbiAgICAgICAgbGV0IG5ld1NlcXVlbmNlID0gc2VxdWVuY2Uuc2xpY2UoMCxuZXdOb2RlTnVtKSArICBub2RlTmFtZSArIHNlcXVlbmNlLnNsaWNlKG5ld05vZGVOdW0pO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCduZXdTZXF1ZW5jZTonLCBuZXdTZXF1ZW5jZSk7XG5cbiAgICAgICAgdWlkcy5zcGxpY2UobmV3Tm9kZU51bSwgMCwgc2x1Z2lkLm5pY2UoKSk7XG4gICAgICAgIHBvc2l0aW9ucy5zcGxpY2UobmV3Tm9kZU51bSwgMCwgcG9zaXRpb25zW25ld05vZGVOdW0gLSBwb3NpdGlvbk9mZnNldC0xXSk7XG5cbiAgICAgICAgbGV0IG5ld1VpZHMgPSB1aWRzO1xuICAgICAgICBsZXQgbmV3UG9zaXRpb25zID0gcG9zaXRpb25zO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdwb3NpdGlvbnM6JywgcG9zaXRpb25zKTtcbiAgICAgICAgY29uc29sZS5sb2coJ25ldyBub2RlIHBvc2l0aW9uczonLCBuZXdQb3NpdGlvbnMpO1xuXG4gICAgICAgIGRlbGV0ZSBzZWxmLnJuYXNbcm5hLnVpZF07XG4gICAgICAgIGxldCBuZXdSTkEgPSBzZWxmLmFkZFJOQShuZXdEb3RicmFja2V0LCB7J3NlcXVlbmNlJzogbmV3U2VxdWVuY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncG9zaXRpb25zJzogbmV3UG9zaXRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpZHMnOiBuZXdVaWRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NlbnRlclZpZXcnOiBmYWxzZX0pO1xuXG4gICAgfVxuXG4gICAgc2VsZi5kZWxldGVOb2RlID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZGVsZXRpbmcuLi4nLCBub2RlKTtcbiAgICAgICAgLy8gZ2V0IHRoZSBkb3RicmFja2V0IHN0cmluZyBmb3IgdGhpcyBybmFcbiAgICAgICAgbGV0IHJuYSA9IG5vZGUucm5hO1xuICAgICAgICBsZXQgcGFpciA9IHJuYS5wYWlydGFibGVbbm9kZS5udW1dO1xuXG4gICAgICAgIC8vIHJlbW92ZSBiYXNlcGFpcnMgZm9yIHRoaXMgbm9kZVxuICAgICAgICBpZiAocGFpciAhPSAwKSB7XG4gICAgICAgICAgICBybmEucGFpcnRhYmxlW25vZGUubnVtXSA9IDA7XG4gICAgICAgICAgICBybmEucGFpcnRhYmxlW3BhaXJdID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkb3RicmFja2V0ID0gcm5hVXRpbGl0aWVzLnBhaXJ0YWJsZVRvRG90YnJhY2tldChybmEucGFpcnRhYmxlKTtcbiAgICAgICAgbGV0IHBvc2l0aW9ucyA9IHJuYS5nZXRQb3NpdGlvbnMoJ251Y2xlb3RpZGUnKTtcbiAgICAgICAgbGV0IHNlcXVlbmNlID0gcm5hLnNlcVxuICAgICAgICBsZXQgdWlkcyA9IHJuYS5nZXRVaWRzKCk7XG5cbiAgICAgICAgbGV0IG5ld0RvdGJyYWNrZXQgPSBkb3RicmFja2V0LnNsaWNlKDAsIG5vZGUubnVtLTEpICsgZG90YnJhY2tldC5zbGljZShub2RlLm51bSlcbiAgICAgICAgbGV0IG5ld1Bvc2l0aW9ucyA9IHBvc2l0aW9ucy5zbGljZSgwLCBub2RlLm51bS0xKVxuICAgICAgICAgICAgICAgIC5jb25jYXQocG9zaXRpb25zLnNsaWNlKG5vZGUubnVtKSk7XG4gICAgICAgIGxldCBuZXdTZXF1ZW5jZSA9IHNlcXVlbmNlLnNsaWNlKDAsIG5vZGUubnVtLTEpICsgc2VxdWVuY2Uuc2xpY2Uobm9kZS5udW0pXG4gICAgICAgIGxldCBuZXdVaWRzID0gdWlkcy5zbGljZSgwLCBub2RlLm51bS0xKVxuICAgICAgICAgICAgICAgIC5jb25jYXQodWlkcy5zbGljZShub2RlLm51bSkpO1xuXG4gICAgICAgIGRlbGV0ZSBzZWxmLnJuYXNbcm5hLnVpZF07XG4gICAgICAgIGxldCBuZXdSTkEgPSBzZWxmLmFkZFJOQShuZXdEb3RicmFja2V0LCB7J3NlcXVlbmNlJzogbmV3U2VxdWVuY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncG9zaXRpb25zJzogbmV3UG9zaXRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpZHMnOiBuZXdVaWRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjZW50ZXJWaWV3JzogZmFsc2V9KTtcblxuICAgICAgICBjb25zb2xlLmxvZygnbmV3IGRvdGJyYWNrZXQ6JywgbmV3RG90YnJhY2tldCk7XG4gICAgICAgIC8vc2VsZi5yZWNhbGN1bGF0ZUdyYXBoKCk7XG4gICAgICAgIFxuICAgICAgICAvL3JlbW92ZSBiYWNrYm9uZSBsaW5rcyBhc3NvY2lhdGVkIHdpdGggdGhpcyBub2RlXG4gICAgICAgIFxuICAgICAgICAvL3JlbW92ZSB0aGlzIG5vZGVcbiAgICAgICAgXG4gICAgfVxuXG4gICAgc2VsZi5hZGRFeHRlcm5hbExpbmtzID0gZnVuY3Rpb24ocm5hSnNvbiwgZXh0ZXJuYWxMaW5rcykge1xuICAgICAgICB2YXIgbmV3TGlua3MgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4dGVybmFsTGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBuZXdMaW5rID0ge2xpbmtUeXBlOiAnZXh0ZXJuYWwnLCB2YWx1ZTogMSwgdWlkOiBnZW5lcmF0ZVVVSUQoKSxcbiAgICAgICAgICAgICAgICBzb3VyY2U6IG51bGwsIHRhcmdldDogbnVsbH07XG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgc291cmNlIG5vZGUgaXMgYW4gYXJyYXlcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZXh0ZXJuYWxMaW5rc1tpXVswXSkgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJuYUpzb24ubm9kZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCdudWNzJyBpbiBybmFKc29uLm5vZGVzW2pdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm5hSnNvbi5ub2Rlc1tqXS5udWNzLmVxdWFscyhleHRlcm5hbExpbmtzW2ldWzBdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0xpbmsuc291cmNlID0gcm5hSnNvbi5ub2Rlc1tqXTsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcm5hSnNvbi5ub2Rlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocm5hSnNvbi5ub2Rlc1tqXS5udW0gPT0gZXh0ZXJuYWxMaW5rc1tpXVswXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3TGluay5zb3VyY2UgPSBybmFKc29uLm5vZGVzW2pdOyBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHRhcmdldCBub2RlIGlzIGFuIGFycmF5XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGV4dGVybmFsTGlua3NbaV1bMV0pID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBybmFKc29uLm5vZGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgnbnVjcycgaW4gcm5hSnNvbi5ub2Rlc1tqXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJuYUpzb24ubm9kZXNbal0ubnVjcy5lcXVhbHMoZXh0ZXJuYWxMaW5rc1tpXVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdMaW5rLnRhcmdldCA9IHJuYUpzb24ubm9kZXNbal07IFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJuYUpzb24ubm9kZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJuYUpzb24ubm9kZXNbal0ubnVtID09IGV4dGVybmFsTGlua3NbaV1bMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0xpbmsudGFyZ2V0ID0gcm5hSnNvbi5ub2Rlc1tqXTsgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChuZXdMaW5rLnNvdXJjZSA9PSBudWxsIHx8IG5ld0xpbmsudGFyZ2V0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRVJST1I6IHNvdXJjZSBvciB0YXJnZXQgb2YgbmV3IGxpbmsgbm90IGZvdW5kOicsIG5ld0xpbmssIGV4dGVybmFsTGlua3NbaV0pO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBuZXdMaW5rcy5wdXNoKG5ld0xpbmspO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ld0xpbmtzO1xuICAgIH07XG5cbiAgICBzZWxmLmFkZFJOQUpTT04gPSBmdW5jdGlvbihybmFHcmFwaCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdm9pZE90aGVycyA9IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXJQb3MgPSBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXJWaWV3ID0gdHJ1ZX0gKSB7XG4gICAgICAgIC8vIEFkZCBhbiBSTkFHcmFwaCwgd2hpY2ggY29udGFpbnMgbm9kZXMgYW5kIGxpbmtzIGFzIHBhcnQgb2YgdGhlXG4gICAgICAgIC8vIHN0cnVjdHVyZVxuICAgICAgICAvLyBFYWNoIFJOQSB3aWxsIGhhdmUgdWlkIHRvIGlkZW50aWZ5IGl0XG4gICAgICAgIC8vIHdoZW4gaXQgaXMgbW9kaWZpZWQsIGl0IGlzIHJlcGxhY2VkIGluIHRoZSBnbG9iYWwgbGlzdCBvZiBSTkFzXG4gICAgICAgIC8vXG4gICAgICAgIHZhciBtYXhYLCBtaW5YO1xuICAgICAgICBjb25zb2xlLmxvZygnY2VudGVyVmlldzonLCBjZW50ZXJWaWV3KTtcblxuICAgICAgICBpZiAoY2VudGVyUG9zICE9IG51bGwpIHtcbiAgICAgICAgICAgIC8vIGNlbnRlciB0aGUgbmV3bHkgY3JlYXRlZCBSTkEgYXQgYSBnaXZlbiBwb3NpdGlvblxuICAgICAgICAgICAgbGV0IHRvdGFsWCA9IDA7XG4gICAgICAgICAgICBsZXQgdG90YWxZID0gMDtcbiAgICAgICAgICAgIGxldCBub2RlQ291bnQgPSAwO1xuXG4gICAgICAgICAgICBybmFHcmFwaC5ub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICAgICAgICB0b3RhbFggKz0gbm9kZS54O1xuICAgICAgICAgICAgICAgIHRvdGFsWSArPSBub2RlLnk7XG4gICAgICAgICAgICAgICAgbm9kZUNvdW50ICs9IDE7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG5vZGVDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBjZW50ZXIgdGhlIG5vZGVzIGF0IGNlbnRlclBvc1xuXG4gICAgICAgICAgICAgICAgcm5hR3JhcGgubm9kZXMuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUueCA9IG5vZGUueCArIGNlbnRlclBvc1swXSAtIHRvdGFsWCAvIG5vZGVDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS55ID0gbm9kZS55ICsgY2VudGVyUG9zWzFdIC0gdG90YWxZIC8gbm9kZUNvdW50O1xuXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucHggPSBub2RlLng7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucHkgPSBub2RlLnk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXZvaWRPdGhlcnMpIHtcbiAgICAgICAgICAgIGlmIChzZWxmLmdyYXBoLm5vZGVzLmxlbmd0aCA+IDApXG4gICAgICAgICAgICAgICAgbWF4WCA9IGQzLm1heChzZWxmLmdyYXBoLm5vZGVzLm1hcChmdW5jdGlvbihkKSB7IHJldHVybiBkLng7IH0pKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBtYXhYID0gMDtcblxuICAgICAgICAgICAgbWluWCA9IGQzLm1pbihybmFHcmFwaC5ub2Rlcy5tYXAoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC54OyB9KSk7IFxuXG4gICAgICAgICAgICBybmFHcmFwaC5ub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBub2RlLnggKz0gKG1heFggLSBtaW5YKSArIDIwO1xuICAgICAgICAgICAgICAgIG5vZGUucHggKz0gKG1heFggLSBtaW5YKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcm5hR3JhcGgubm9kZXMuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICBub2RlLnJuYSA9IHJuYUdyYXBoO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZWxmLnJuYXNbcm5hR3JhcGgudWlkXSA9IHJuYUdyYXBoO1xuICAgICAgICBzZWxmLnJlY2FsY3VsYXRlR3JhcGgoKTtcblxuICAgICAgICBzZWxmLnVwZGF0ZSgpO1xuXG4gICAgICAgIGlmIChjZW50ZXJWaWV3KVxuICAgICAgICAgICAgc2VsZi5jZW50ZXJWaWV3KCk7XG5cbiAgICAgICAgcmV0dXJuIHJuYUdyYXBoO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBtYWduaXR1ZGUoeCkge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHhbMF0gKiB4WzBdICsgeFsxXSAqIHhbMV0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBvc2l0aW9uQW55Tm9kZShkKSB7XG4gICAgICAgIHZhciBlbmRQb2ludCA9IGQ7XG4gICAgICAgIHZhciBzdGFydFBvaW50ID0gZC5wcmV2Tm9kZTtcbiAgICAgICAgdmFyIGxlbmd0aE11bHQgPSA2O1xuXG4gICAgICAgIGlmIChzdGFydFBvaW50ID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIC8vIGRvZXMgdGhpcyBub2RlIGhhdmUgYSBsaW5rIHBvaW50aW5nIHRvIGl0P1xuICAgICAgICBpZiAoIWQubGlua2VkKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIC8vIHBvaW50IGJhY2sgdG93YXJkIHRoZSBwcmV2aW91cyBub2RlXG4gICAgICAgIHZhciB1ID0gWy0oZW5kUG9pbnQueCAtIHN0YXJ0UG9pbnQueCksIC0oZW5kUG9pbnQueSAtIHN0YXJ0UG9pbnQueSldO1xuXG4gICAgICAgIGlmICh1WzBdID09IDAgJiYgdVsxXSA9PSAwKVxuICAgICAgICAgICAgcmV0dXJuOyAgICAgLy8gd2lsbCBsZWFkIHRvIGEgTmFOIGVycm9yXG5cbiAgICAgICAgdSA9IFt1WzBdIC8gbWFnbml0dWRlKHUpLCB1WzFdIC8gbWFnbml0dWRlKHUpXTtcbiAgICAgICAgdmFyIHYgPSBbLXVbMV0sIHVbMF1dO1xuXG4gICAgICAgIHZhciBhcnJvd1RpcCA9IFtkLnJhZGl1cyAqIHVbMF0sIGQucmFkaXVzICogdVsxXV07XG5cbiAgICAgICAgdmFyIHBhdGggPSAnTScgKyBcbiAgICAgICAgICAgICAgICAgICAgKGFycm93VGlwWzBdICsgbGVuZ3RoTXVsdCAqICh1WzBdICsgdlswXSkgLyAyKSArICcsJyArIChhcnJvd1RpcFsxXSArIGxlbmd0aE11bHQgKiAodVsxXSArIHZbMV0pIC8gMikgKyAnTCcgK1xuICAgICAgICAgICAgICAgICAgICAoYXJyb3dUaXBbMF0pICsgJywnICsgKGFycm93VGlwWzFdKSArICdMJyArXG4gICAgICAgICAgICAgICAgICAgIChhcnJvd1RpcFswXSArIGxlbmd0aE11bHQgKiAodVswXSAtIHZbMF0pIC8gMikgKyAnLCcgKyAoYXJyb3dUaXBbMV0gKyBsZW5ndGhNdWx0ICogKHVbMV0gLSB2WzFdKSAvIDIpO1xuXG4gICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdkJywgcGF0aCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVhbExpbmtGaWx0ZXIoZCkge1xuICAgICAgICByZXR1cm4gZC5saW5rVHlwZSA9PSAnYmFzZXBhaXInIHx8XG4gICAgICAgICAgICAgICBkLmxpbmtUeXBlID09ICdiYWNrYm9uZScgfHxcbiAgICAgICAgICAgICAgIGQubGlua1R5cGUgPT0gJ2ludGVybW9sZWN1bGUnIHx8XG4gICAgICAgICAgICAgICBkLmxpbmtUeXBlID09ICdwc2V1ZG9rbm90JyB8fFxuICAgICAgICAgICAgICAgZC5saW5rVHlwZSA9PSAnbGFiZWxfbGluaycgfHxcbiAgICAgICAgICAgICAgIGQubGlua1R5cGUgPT0gJ2V4dGVybmFsJyB8fFxuICAgICAgICAgICAgICAgZC5saW5rVHlwZSA9PSAnY2hhaW5fY2hhaW4nO1xuICAgIH1cblxuICAgIHNlbGYudHJhbnNpdGlvblJOQSA9IGZ1bmN0aW9uKG5ld1N0cnVjdHVyZSwgbmV4dEZ1bmN0aW9uKSB7XG4gICAgICAgIC8vdHJhbnNpdGlvbiBmcm9tIGFuIFJOQSB3aGljaCBpcyBhbHJlYWR5IGRpc3BsYXllZCB0byBhIG5ldyBzdHJ1Y3R1cmVcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gc2VsZi5vcHRpb25zLnRyYW5zaXRpb25EdXJhdGlvbjtcblxuICAgICAgICB2YXIgdWlkcyA9IHNlbGYuZ3JhcGgubm9kZXNcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkLm5vZGVUeXBlID09ICdudWNsZW90aWRlJzsgfSlcbiAgICAgICAgLm1hcChmdW5jdGlvbihkKSB7IHJldHVybiBkLnVpZDsgfSk7XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7J3VpZHMnOiB1aWRzfTtcbiAgICAgICAgdmFyIG5ld1JOQUpzb24gPSBzZWxmLmNyZWF0ZUluaXRpYWxMYXlvdXQobmV3U3RydWN0dXJlLCBvcHRpb25zKTtcblxuICAgICAgICB2YXIgZ25vZGVzID0gdmlzTm9kZXMuc2VsZWN0QWxsKCdnLmdub2RlJykuZGF0YShuZXdSTkFKc29uLm5vZGVzLCBub2RlS2V5KTtcblxuICAgICAgICBpZiAoZHVyYXRpb24gPT09IDApXG4gICAgICAgICAgICBnbm9kZXMuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkgeyBcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgW2QueCwgZC55XSArICcpJzsgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnbm9kZXMudHJhbnNpdGlvbigpLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHsgXG4gICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIFtkLngsIGQueV0gKyAnKSc7IH0pLmR1cmF0aW9uKGR1cmF0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsaW5rcyA9IHZpc0xpbmtzLnNlbGVjdEFsbCgnbGluZS5saW5rJylcbiAgICAgICAgLmRhdGEobmV3Uk5BSnNvbi5saW5rcy5maWx0ZXIocmVhbExpbmtGaWx0ZXIpLCBsaW5rS2V5KTtcbiAgICAgICAgdmFyIG5ld05vZGVzID0gc2VsZi5jcmVhdGVOZXdOb2Rlcyhnbm9kZXMuZW50ZXIoKSlcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHsgXG4gICAgICAgICAgICBpZiAodHlwZW9mIGQueCAhPSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZC55ICE9ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyBbMCwgMF0gKyAnKSc7IFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfSk7XG5cblxuICAgICAgICBpZiAoZHVyYXRpb24gPT09IDApXG4gICAgICAgICAgICBnbm9kZXMuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBnbm9kZXMuZXhpdCgpLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHsgXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkLnggIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGQueSAhPSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIFswLCAwXSArICcpJzsgXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBnbm9kZXMuc2VsZWN0KCdwYXRoJylcbiAgICAgICAgLmVhY2gocG9zaXRpb25BbnlOb2RlKTtcblxuICAgICAgICBzZWxmLmdyYXBoLm5vZGVzID0gZ25vZGVzLmRhdGEoKTtcbiAgICAgICAgc2VsZi51cGRhdGVTdHlsZSgpO1xuICAgICAgICBzZWxmLmNlbnRlclZpZXcoZHVyYXRpb24pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGVuZGFsbCh0cmFuc2l0aW9uLCBjYWxsYmFjaykgeyBcbiAgICAgICAgICAgIGlmICh0cmFuc2l0aW9uLnNpemUoKSA9PT0gMCkgeyBzZXRUaW1lb3V0KGNhbGxiYWNrLCBkdXJhdGlvbik7IH1cbiAgICAgICAgICAgIHZhciBuID0gMDsgXG4gICAgICAgICAgICB0cmFuc2l0aW9uIFxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7ICsrbjsgfSkgXG4gICAgICAgICAgICAuZWFjaCgnZW5kJywgZnVuY3Rpb24oKSB7IGlmICghLS1uKSBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9KTsgXG4gICAgICAgIH0gXG5cbiAgICAgICAgZnVuY3Rpb24gYWRkTmV3TGlua3MoKSB7XG4gICAgICAgICAgICB2YXIgbmV3TGlua3MgPSBzZWxmLmNyZWF0ZU5ld0xpbmtzKGxpbmtzLmVudGVyKCkpO1xuICAgICAgICAgICAgc2VsZi5ncmFwaC5saW5rcyA9IGxpbmtzLmRhdGEoKTtcblxuICAgICAgICAgICAgc2VsZi51cGRhdGVTdHlsZSgpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIG5leHRGdW5jdGlvbiAhPSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICBuZXh0RnVuY3Rpb24oKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgbGlua3MuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgICAgIGlmIChkdXJhdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgbGlua3NcbiAgICAgICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuc291cmNlLng7IH0pXG4gICAgICAgICAgICAuYXR0cigneTEnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnNvdXJjZS55OyB9KVxuICAgICAgICAgICAgLmF0dHIoJ3gyJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC50YXJnZXQueDsgfSlcbiAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudGFyZ2V0Lnk7IH0pO1xuXG4gICAgICAgICAgICB2YXIgbmV3TGlua3MgPSBzZWxmLmNyZWF0ZU5ld0xpbmtzKGxpbmtzLmVudGVyKCkpO1xuICAgICAgICAgICAgc2VsZi5ncmFwaC5saW5rcyA9IGxpbmtzLmRhdGEoKTtcblxuICAgICAgICAgICAgc2VsZi51cGRhdGVTdHlsZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGlua3MudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuYXR0cigneDEnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnNvdXJjZS54OyB9KVxuICAgICAgICAgICAgLmF0dHIoJ3kxJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zb3VyY2UueTsgfSlcbiAgICAgICAgICAgIC5hdHRyKCd4MicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudGFyZ2V0Lng7IH0pXG4gICAgICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnRhcmdldC55OyB9KVxuICAgICAgICAgICAgLmR1cmF0aW9uKGR1cmF0aW9uKVxuICAgICAgICAgICAgLmNhbGwoZW5kYWxsLCBhZGROZXdMaW5rcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZHVyYXRpb24gPT09IDApIHtcbiAgICAgICAgICAgIG5ld05vZGVzXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkgeyBcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGQueCAhPSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZC55ICE9ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgW2QueCwgZC55XSArICcpJzsgXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld05vZGVzLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHsgXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkLnggIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGQueSAhPSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIFtkLngsIGQueV0gKyAnKSc7IFxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBzZWxmLnJlY2FsY3VsYXRlR3JhcGggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gQ29uZGVuc2UgYWxsIG9mIHRoZSBpbmRpdmlkdWFsIFJOQXMgaW50byBvbmVcbiAgICAgICAgLy8gY29sbGVjdGlvbiBvZiBub2RlcyBhbmQgbGlua3NcbiAgICAgICAgc2VsZi5ncmFwaC5ub2RlcyA9IFtdO1xuICAgICAgICBzZWxmLmdyYXBoLmxpbmtzID0gW107XG4gICAgICAgIGZvciAodmFyIHVpZCBpbiBzZWxmLnJuYXMpIHtcbiAgICAgICAgICAgIHNlbGYuZ3JhcGgubm9kZXMgPSBzZWxmLmdyYXBoLm5vZGVzLmNvbmNhdChzZWxmLnJuYXNbdWlkXS5ub2Rlcyk7XG4gICAgICAgICAgICBzZWxmLmdyYXBoLmxpbmtzID0gc2VsZi5ncmFwaC5saW5rcy5jb25jYXQoc2VsZi5ybmFzW3VpZF0ubGlua3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgbG9va3VwIHRhYmxlIHNvIHRoYXQgd2UgY2FuIGFjY2VzcyBlYWNoIG5vZGVcbiAgICAgICAgLy8gYmFzZWQgb24gaXRzIHVpZC4gVGhpcyB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlIHRoZSBsaW5rc1xuICAgICAgICAvLyBiZXR3ZWVuIGRpZmZlcmVudCBSTkFzXG4gICAgICAgIHZhciB1aWRzVG9Ob2RlcyA9IHt9O1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VsZi5ncmFwaC5ub2Rlcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHVpZHNUb05vZGVzW3NlbGYuZ3JhcGgubm9kZXNbaV0udWlkXSA9IHNlbGYuZ3JhcGgubm9kZXNbaV07XG5cbiAgICAgICAgc2VsZi5ncmFwaC5saW5rcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmspIHtcbiAgICAgICAgICAgIGxpbmsuc291cmNlID0gdWlkc1RvTm9kZXNbbGluay5zb3VyY2UudWlkXTtcbiAgICAgICAgICAgIGxpbmsudGFyZ2V0ID0gdWlkc1RvTm9kZXNbbGluay50YXJnZXQudWlkXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHNlbGYuZXh0cmFMaW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8gdGhlIGFjdHVhbCBub2RlIG9iamVjdHMgbWF5IGhhdmUgY2hhbmdlZCwgc28gd2UgaGFlIHRvIHJlY3JlYXRlXG4gICAgICAgICAgICAvLyB0aGUgZXh0cmEgbGlua3MgYmFzZWQgb24gdGhlIHVpZHNcbiAgICAgICAgICAgIGlmICghKHNlbGYuZXh0cmFMaW5rc1tpXS50YXJnZXQudWlkIGluIHVpZHNUb05vZGVzKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdub3QgdGhlcmU6Jywgc2VsZi5leHRyYUxpbmtzW2ldKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5leHRyYUxpbmtzW2ldLnNvdXJjZSA9IHVpZHNUb05vZGVzW3NlbGYuZXh0cmFMaW5rc1tpXS5zb3VyY2UudWlkXTtcbiAgICAgICAgICAgIHNlbGYuZXh0cmFMaW5rc1tpXS50YXJnZXQgPSB1aWRzVG9Ob2Rlc1tzZWxmLmV4dHJhTGlua3NbaV0udGFyZ2V0LnVpZF07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChzZWxmLmV4dHJhTGlua3NbaV0ubGlua1R5cGUgPT0gJ2ludGVybW9sZWN1bGUnKSB7XG4gICAgICAgICAgICAgICAgLy9yZW1vdmUgbGlua3MgdG8gbWlkZGxlIG5vZGVzXG4gICAgICAgICAgICAgICAgbGV0IGZha2VMaW5rcyA9IHNlbGYuZ3JhcGgubGlua3MuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoKGQuc291cmNlID09IHNlbGYuZXh0cmFMaW5rc1tpXS5zb3VyY2UgfHwgZC5zb3VyY2UgPT0gc2VsZi5leHRyYUxpbmtzW2ldLnRhcmdldCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQudGFyZ2V0ID09IHNlbGYuZXh0cmFMaW5rc1tpXS5zb3VyY2UgfHwgZC50YXJnZXQgPT0gc2VsZi5leHRyYUxpbmtzW2ldLnNvdXJjZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkLmxpbmtUeXBlID09ICdmYWtlJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGZha2VMaW5rcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGlua0luZGV4ID0gc2VsZi5ncmFwaC5saW5rcy5pbmRleE9mKGZha2VMaW5rc1tqXSk7IFxuICAgICAgICAgICAgICAgICAgICBzZWxmLmdyYXBoLmxpbmtzLnNwbGljZShsaW5rSW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ3JhcGgubGlua3MucHVzaChzZWxmLmV4dHJhTGlua3NbaV0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHNlbGYuYWRkTm9kZXMgPSBmdW5jdGlvbiBhZGROb2Rlcyhqc29uKSB7XG4gICAgICAgIC8vIGFkZCBhIG5ldyBzZXQgb2Ygbm9kZXMgZnJvbSBhIGpzb24gZmlsZVxuXG4gICAgICAgIC8vIFJlc29sdmUgdGhlIHNvdXJjZXMgYW5kIHRhcmdldHMgb2YgdGhlIGxpbmtzIHNvIHRoYXQgdGhleVxuICAgICAgICAvLyBhcmUgbm90IGp1c3QgaW5kZWNlcyBpbnRvIGFuIGFycmF5XG4gICAgICAgIGpzb24ubGlua3MuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlbnRyeS5zb3VyY2UgPT0gJ251bWJlcicpIGVudHJ5LnNvdXJjZSA9IGpzb24ubm9kZXNbZW50cnkuc291cmNlXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZW50cnkudGFyZ2V0ID09ICdudW1iZXInKSBlbnRyeS50YXJnZXQgPSBqc29uLm5vZGVzW2VudHJ5LnRhcmdldF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEdldCB0aGUgbWF4aW11bSB4IGFuZCB5IHZhbHVlcyBvZiB0aGUgY3VycmVudCBncmFwaFxuICAgICAgICAvLyBzbyB0aGF0IHdlIGRvbid0IHBsYWNlIGEgbmV3IHN0cnVjdHVyZSBvbiB0b3Agb2YgdGhlXG4gICAgICAgIC8vIG9sZCBvbmVcbiAgICAgICAgaWYgKHNlbGYuZ3JhcGgubm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbWF4WCA9IGQzLm1heChzZWxmLmdyYXBoLm5vZGVzLm1hcChmdW5jdGlvbihkKSB7cmV0dXJuIGQueDt9KSk7XG4gICAgICAgICAgICBtYXhZID0gZDMubWF4KHNlbGYuZ3JhcGgubm9kZXMubWFwKGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC55O30pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1heFggPSAwO1xuICAgICAgICAgICAgbWF4WSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBqc29uLm5vZGVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAgIGlmICghKGVudHJ5LnJuYS51aWQgaW4gc2VsZi5ybmFzKSkge1xuICAgICAgICAgICAgICAgIHNlbGYucm5hc1tlbnRyeS5ybmEudWlkXSA9IGVudHJ5LnJuYTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZW50cnkueCArPSBtYXhYO1xuICAgICAgICAgICAgLy9lbnRyeS55ICs9IG1heFk7XG5cbiAgICAgICAgICAgIGVudHJ5LnB4ICs9IG1heFg7XG4gICAgICAgICAgICAvL2VudHJ5LnB5ICs9IG1heFk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHIgPSBuZXcgUk5BR3JhcGgoJycsJycpO1xuICAgICAgICByLm5vZGVzID0ganNvbi5ub2RlcztcbiAgICAgICAgci5saW5rcyA9IGpzb24ubGlua3M7XG5cbiAgICAgICAgLy9zZWxmLmFkZFJOQShyKTtcbiAgICAgICAgc2VsZi5yZWNhbGN1bGF0ZUdyYXBoKCk7XG5cbiAgICAgICAgc2VsZi51cGRhdGUoKTtcbiAgICAgICAgc2VsZi5jZW50ZXJWaWV3KCk7XG4gICAgfTtcblxuICAgIHNlbGYuYWRkQ3VzdG9tQ29sb3JzID0gZnVuY3Rpb24gYWRkQ3VzdG9tQ29sb3JzKGpzb24pIHtcbiAgICAgICAgLy8gQWRkIGEganNvbiBmaWxlIGNvbnRhaW5pbmcgdGhlIGN1c3RvbSBjb2xvcnNcbiAgICAgICAgc2VsZi5jdXN0b21Db2xvcnMgPSBqc29uO1xuICAgIH07XG5cbiAgICBzZWxmLmFkZEN1c3RvbUNvbG9yc1RleHQgPSBmdW5jdGlvbihjdXN0b21Db2xvcnNUZXh0KSB7XG4gICAgICAgIGxldCBjcyA9IG5ldyBDb2xvclNjaGVtZShjdXN0b21Db2xvcnNUZXh0KTtcbiAgICAgICAgc2VsZi5jdXN0b21Db2xvcnMgPSBjcy5jb2xvcnNKc29uO1xuICAgICAgICBzZWxmLmNoYW5nZUNvbG9yU2NoZW1lKCdjdXN0b20nKTtcbiAgICB9O1xuXG4gICAgc2VsZi5jbGVhck5vZGVzID0gZnVuY3Rpb24gY2xlYXJOb2RlcygpIHtcbiAgICAgICAgc2VsZi5ncmFwaC5ub2RlcyA9IFtdO1xuICAgICAgICBzZWxmLmdyYXBoLmxpbmtzID0gW107XG5cbiAgICAgICAgc2VsZi5ybmFzID0ge307XG4gICAgICAgIHNlbGYuZXh0cmFMaW5rcyA9IFtdO1xuXG4gICAgICAgIHNlbGYudXBkYXRlKCk7XG4gICAgfTtcbiAgICBcbiAgICBzZWxmLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICAgICB2YXIgZGF0YSA9IHsncm5hcyc6IHNlbGYucm5hcywgJ2V4dHJhTGlua3MnOiBzZWxmLmV4dHJhTGlua3N9O1xuICAgICAgICAgICAgdmFyIGRhdGFTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShkYXRhLCBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAvL3JlbW92ZSBjaXJjdWxhciByZWZlcmVuY2VzXG4gICAgICAgICAgICBpZiAoa2V5ID09ICdybmEnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgfSwgJ1xcdCcpO1xuICAgICAgIHJldHVybiBkYXRhU3RyaW5nO1xuICAgIH07XG5cbiAgICBzZWxmLmZyb21KU09OID0gZnVuY3Rpb24oanNvblN0cmluZykge1xuICAgICAgICB2YXIgcm5hcywgZXh0cmFMaW5rcztcblxuICAgICAgICB0cnl7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UoanNvblN0cmluZyk7XG4gICAgICAgICAgICBybmFzID0gZGF0YS5ybmFzO1xuICAgICAgICAgICAgZXh0cmFMaW5rcyA9IGRhdGEuZXh0cmFMaW5rcztcbiAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIHVpZCBpbiBybmFzKSB7XG4gICAgICAgICAgICBpZiAocm5hc1t1aWRdLnR5cGUgPT0gJ3JuYScpIHtcbiAgICAgICAgICAgICAgICByID0gbmV3IFJOQUdyYXBoKCk7XG5cbiAgICAgICAgICAgICAgICByLnNlcSA9IHJuYXNbdWlkXS5zZXE7XG4gICAgICAgICAgICAgICAgci5kb3RicmFja2V0ID0gcm5hc1t1aWRdLmRvdGJyYWNrZXQ7XG4gICAgICAgICAgICAgICAgci5jaXJjdWxhciA9IHJuYXNbdWlkXS5jaXJjdWxhcjtcbiAgICAgICAgICAgICAgICByLnBhaXJ0YWJsZSA9IHJuYXNbdWlkXS5wYWlydGFibGU7XG4gICAgICAgICAgICAgICAgci51aWQgPSBybmFzW3VpZF0udWlkO1xuICAgICAgICAgICAgICAgIHIuc3RydWN0TmFtZSA9IHJuYXNbdWlkXS5zdHJ1Y3ROYW1lO1xuICAgICAgICAgICAgICAgIHIubm9kZXMgPSBybmFzW3VpZF0ubm9kZXM7XG4gICAgICAgICAgICAgICAgci5saW5rcyA9IHJuYXNbdWlkXS5saW5rcztcbiAgICAgICAgICAgICAgICByLnJuYUxlbmd0aCA9IHJuYXNbdWlkXS5ybmFMZW5ndGg7XG4gICAgICAgICAgICAgICAgci5lbGVtZW50cyA9IHJuYXNbdWlkXS5lbGVtZW50cztcbiAgICAgICAgICAgICAgICByLm51Y3NUb05vZGVzID0gcm5hc1t1aWRdLm51Y3NUb05vZGVzO1xuICAgICAgICAgICAgICAgIHIucHNldWRva25vdFBhaXJzID0gcm5hc1t1aWRdLnBzZXVkb2tub3RQYWlycztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgciA9IG5ldyBQcm90ZWluR3JhcGgoKTtcbiAgICAgICAgICAgICAgICByLnNpemUgPSBybmFzW3VpZF0uc2l6ZTtcbiAgICAgICAgICAgICAgICByLm5vZGVzID0gcm5hc1t1aWRdLm5vZGVzO1xuICAgICAgICAgICAgICAgIHIudWlkID0gcm5hc1t1aWRdLnVpZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5hZGRSTkFKU09OKHIsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV4dHJhTGlua3MuZm9yRWFjaChmdW5jdGlvbihsaW5rKSB7XG4gICAgICAgICAgICBzZWxmLmV4dHJhTGlua3MucHVzaChsaW5rKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZi5yZWNhbGN1bGF0ZUdyYXBoKCk7XG4gICAgICAgIHNlbGYudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIHNlbGYuc2V0U2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoc2VsZi5vcHRpb25zLmluaXRpYWxTaXplICE9IG51bGwpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIHN2Z0ggPSBkMy5zZWxlY3QoZWxlbWVudCkubm9kZSgpLm9mZnNldEhlaWdodDtcbiAgICAgICAgdmFyIHN2Z1cgPSBkMy5zZWxlY3QoZWxlbWVudCkubm9kZSgpLm9mZnNldFdpZHRoO1xuICAgICAgICBcbiAgICAgICAgc2VsZi5vcHRpb25zLnN2Z1cgPSBzdmdXO1xuICAgICAgICBzZWxmLm9wdGlvbnMuc3ZnSCA9IHN2Z0g7XG5cbiAgICAgICAgLy9TZXQgdGhlIG91dHB1dCByYW5nZSBvZiB0aGUgc2NhbGVzXG4gICAgICAgIHhTY2FsZS5yYW5nZShbMCwgc3ZnV10pLmRvbWFpbihbMCwgc3ZnV10pO1xuICAgICAgICB5U2NhbGUucmFuZ2UoWzAsIHN2Z0hdKS5kb21haW4oWzAsIHN2Z0hdKTtcblxuICAgICAgICAvL3JlLWF0dGFjaCB0aGUgc2NhbGVzIHRvIHRoZSB6b29tIGJlaGF2aW91clxuICAgICAgICBzZWxmLnpvb21lci54KHhTY2FsZSlcbiAgICAgICAgLnkoeVNjYWxlKTtcblxuICAgICAgICBzZWxmLmJydXNoZXIueCh4U2NhbGUpXG4gICAgICAgIC55KHlTY2FsZSk7XG5cbiAgICAgICAgc2VsZi5jZW50ZXJWaWV3KCk7XG5cbiAgICAgICAgaWYgKCFzZWxmLm9wdGlvbnMucmVzaXplU3ZnT25SZXNpemUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vcmVzaXplIHRoZSBiYWNrZ3JvdW5kXG4gICAgICAgIC8qXG4gICAgICAgIHJlY3QuYXR0cignd2lkdGgnLCBzdmdXKVxuICAgICAgICAuYXR0cignaGVpZ2h0Jywgc3ZnSCk7XG4gICAgICAgICovXG5cbiAgICAgICAgc3ZnLmF0dHIoJ3dpZHRoJywgc3ZnVylcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHN2Z0gpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoYW5nZUNvbG9ycyhtb2xlY3VsZUNvbG9ycywgZCwgc2NhbGUpIHtcbiAgICAgICAgaWYgKG1vbGVjdWxlQ29sb3JzLmhhc093blByb3BlcnR5KGQubnVtKSkge1xuICAgICAgICAgICAgbGV0IHZhbCA9IHBhcnNlRmxvYXQobW9sZWN1bGVDb2xvcnNbZC5udW1dKTtcblxuICAgICAgICAgICAgaWYgKGlzTmFOKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAvLyBwYXNzZWQgaW4gY29sb3IgaXMgbm90IGEgc2NhbGFyLCBzbyBcbiAgICAgICAgICAgICAgICAvLyB0cmVhdCBpdCBhcyBhIGNvbG9yXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vbGVjdWxlQ29sb3JzW2QubnVtXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gdGhlIHVzZXIgcGFzc2VkIGluIGEgZmxvYXQsIGxldCdzIHVzZSBhIGNvbG9ybWFwXG4gICAgICAgICAgICAgICAgLy8gdG8gY29udmVydCBpdCB0byBhIGNvbG9yXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjYWxlKHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ3doaXRlJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGYuc2V0T3V0bGluZUNvbG9yID0gZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgdmFyIG5vZGVzID0gdmlzTm9kZXMuc2VsZWN0QWxsKCdnLmdub2RlJykuc2VsZWN0KCdbbm9kZV90eXBlPW51Y2xlb3RpZGVdJyk7XG4gICAgICAgIG5vZGVzLnN0eWxlKCdmaWxsJywgY29sb3IpO1xuICAgIH1cblxuICAgIHNlbGYuY2hhbmdlQ29sb3JTY2hlbWUgPSBmdW5jdGlvbihuZXdDb2xvclNjaGVtZSkge1xuICAgICAgICB2YXIgcHJvdGVpbk5vZGVzID0gdmlzTm9kZXMuc2VsZWN0QWxsKCdbbm9kZV90eXBlPXByb3RlaW5dJyk7XG5cbiAgICAgICAgcHJvdGVpbk5vZGVzLmNsYXNzZWQoJ3Byb3RlaW4nLCB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQucmFkaXVzOyB9KTtcblxuICAgICAgICB2YXIgZ25vZGVzID0gdmlzTm9kZXMuc2VsZWN0QWxsKCdnLmdub2RlJyk7XG4gICAgICAgIHZhciBjaXJjbGVzID0gdmlzTm9kZXMuc2VsZWN0QWxsKCdnLmdub2RlJykuc2VsZWN0QWxsKCdjaXJjbGUnKTtcbiAgICAgICAgdmFyIG5vZGVzID0gdmlzTm9kZXMuc2VsZWN0QWxsKCdnLmdub2RlJykuc2VsZWN0KCdbbm9kZV90eXBlPW51Y2xlb3RpZGVdJyk7XG4gICAgICAgIHNlbGYuY29sb3JTY2hlbWUgPSBuZXdDb2xvclNjaGVtZTtcblxuXG4gICAgICAgIGlmIChuZXdDb2xvclNjaGVtZSA9PSAnc2VxdWVuY2UnKSB7XG4gICAgICAgICAgICB2YXIgc2NhbGUgPSBkMy5zY2FsZS5vcmRpbmFsKClcbiAgICAgICAgICAgIC5yYW5nZShbJyNkYmRiOGQnLCAnIzk4ZGY4YScsICcjZmY5ODk2JywgJyNhZWM3ZTgnLCAnI2FlYzdlOCddKVxuICAgICAgICAgICAgLmRvbWFpbihbJ0EnLCdDJywnRycsJ1UnLCdUJ10pO1xuICAgICAgICAgICAgbm9kZXMuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7IFxuICAgICAgICAgICAgICAgIHJldHVybiBzY2FsZShkLm5hbWUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChuZXdDb2xvclNjaGVtZSA9PSAnc3RydWN0dXJlJykge1xuICAgICAgICAgICAgdmFyIHNjYWxlID0gZDMuc2NhbGUuY2F0ZWdvcnkxMCgpXG4gICAgICAgICAgICAuZG9tYWluKFsncycsJ20nLCdpJywnZScsJ3QnLCdoJywneCddKVxuICAgICAgICAgICAgLnJhbmdlKFsnbGlnaHRncmVlbicsICcjZmY5ODk2JywgJyNkYmRiOGQnLCAnbGlnaHRzYWxtb24nLFxuICAgICAgICAgICAgICAgICAgICdsaWdodGN5YW4nLCAnbGlnaHRibHVlJywgJ3RyYW5zcGFyZW50J10pO1xuXG4gICAgICAgICAgICAgICAgICAgbm9kZXMuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7IFxuICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2NhbGUoZC5lbGVtVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChuZXdDb2xvclNjaGVtZSA9PSAncG9zaXRpb25zJykge1xuICAgICAgICAgICAgbm9kZXMuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7IFxuICAgICAgICAgICAgICAgIHZhciBzY2FsZSA9IGQzLnNjYWxlLmxpbmVhcigpXG4gICAgICAgICAgICAgICAgLnJhbmdlKFsnIzk4ZGY4YScsICcjZGJkYjhkJywgJyNmZjk4OTYnXSlcbiAgICAgICAgICAgICAgICAuaW50ZXJwb2xhdGUoZDMuaW50ZXJwb2xhdGVMYWIpXG4gICAgICAgICAgICAgICAgLmRvbWFpbihbMSwgMSArIChkLnJuYS5ybmFMZW5ndGggLSAxKSAvIDIsIGQucm5hLnJuYUxlbmd0aF0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjYWxlKGQubnVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG5ld0NvbG9yU2NoZW1lID09ICdjdXN0b20nKSB7XG4gICAgICAgICAgICAvLyBzY2FsZSB0byBiZSB1c2VkIGluIGNhc2UgdGhlIHVzZXIgcGFzc2VzIHNjYWxhclxuICAgICAgICAgICAgLy8gdmFsdWVzIHJhdGhlciB0aGFuIGNvbG9yIG5hbWVzXG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlbGYuY3VzdG9tQ29sb3JzICE9ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgJ2RvbWFpbicgaW4gc2VsZi5jdXN0b21Db2xvcnMgJiZcbiAgICAgICAgICAgICAgICdyYW5nZScgaW4gc2VsZi5jdXN0b21Db2xvcnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2NhbGUgPSBkMy5zY2FsZS5saW5lYXIoKVxuICAgICAgICAgICAgICAgIC5pbnRlcnBvbGF0ZShkMy5pbnRlcnBvbGF0ZUxhYilcbiAgICAgICAgICAgICAgICAuZG9tYWluKHNlbGYuY3VzdG9tQ29sb3JzLmRvbWFpbilcbiAgICAgICAgICAgICAgICAucmFuZ2Uoc2VsZi5jdXN0b21Db2xvcnMucmFuZ2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBub2Rlcy5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNlbGYuY3VzdG9tQ29sb3JzID09ICd1bmRlZmluZWQnIHx8XG4gICAgICAgICAgICAgICAgICAgIXNlbGYuY3VzdG9tQ29sb3JzLmhhc093blByb3BlcnR5KCdjb2xvclZhbHVlcycpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnd2hpdGUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5jdXN0b21Db2xvcnMuY29sb3JWYWx1ZXMuaGFzT3duUHJvcGVydHkoZC5zdHJ1Y3ROYW1lKSAmJlxuICAgICAgICAgICAgICAgICAgICBzZWxmLmN1c3RvbUNvbG9ycy5jb2xvclZhbHVlc1tkLnN0cnVjdE5hbWVdLmhhc093blByb3BlcnR5KGQubnVtKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiBhIG1vbGVjdWxlIG5hbWUgaXMgc3BlY2lmaWVkLCBpdCBzdXBlcmNlZGVzIHRoZSBkZWZhdWx0IGNvbG9yc1xuICAgICAgICAgICAgICAgICAgICAvLyAoZm9yIHdoaWNoIG5vIG1vbGVjdWxlIG5hbWUgaGFzIGJlZW4gc3BlY2lmaWVkKVxuICAgICAgICAgICAgICAgICAgICBsZXQgbW9sZWN1bGVDb2xvcnMgPSBzZWxmLmN1c3RvbUNvbG9ycy5jb2xvclZhbHVlc1tkLnN0cnVjdE5hbWVdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2hhbmdlQ29sb3JzKG1vbGVjdWxlQ29sb3JzLCBkLCBzY2FsZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxmLmN1c3RvbUNvbG9ycy5jb2xvclZhbHVlcy5oYXNPd25Qcm9wZXJ0eSgnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vbGVjdWxlQ29sb3JzID0gc2VsZi5jdXN0b21Db2xvcnMuY29sb3JWYWx1ZXNbJyddO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2hhbmdlQ29sb3JzKG1vbGVjdWxlQ29sb3JzLCBkLCBzY2FsZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICd3aGl0ZSc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBtb3VzZWRvd24oKSB7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3VzZW1vdmUoKSB7XG4gICAgICAgIGlmICghbW91c2Vkb3duTm9kZSkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBtcG9zID0gZDMubW91c2UodmlzLm5vZGUoKSk7XG4gICAgICAgIC8vIHVwZGF0ZSBkcmFnIGxpbmVcbiAgICAgICAgZHJhZ0xpbmVcbiAgICAgICAgLmF0dHIoJ3gxJywgbW91c2Vkb3duTm9kZS54KVxuICAgICAgICAuYXR0cigneTEnLCBtb3VzZWRvd25Ob2RlLnkpXG4gICAgICAgIC5hdHRyKCd4MicsIG1wb3NbMF0pXG4gICAgICAgIC5hdHRyKCd5MicsIG1wb3NbMV0pO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW91c2V1cCgpIHtcbiAgICAgICAgaWYgKG1vdXNlZG93bk5vZGUpIHtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIWxpbmtDb250ZXh0TWVudVNob3duKVxuICAgICAgICAgICAgICAgIGRyYWdMaW5lXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2RyYWdfbGluZV9oaWRkZW4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNsZWFyIG1vdXNlIGV2ZW50IHZhcnNcbiAgICAgICAgcmVzZXRNb3VzZVZhcnMoKTtcbiAgICAgICAgLy91cGRhdGUoKVxuICAgIH1cbiAgICAvL2FkYXB0IHNpemUgdG8gd2luZG93IGNoYW5nZXM6XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHNlbGYuc2V0U2l6ZSwgZmFsc2UpO1xuXG4gICAgc2VsZi56b29tZXIgPSBkMy5iZWhhdmlvci56b29tKClcbiAgICAgICAgLnNjYWxlRXh0ZW50KFswLjEsMTBdKVxuICAgICAgICAueCh4U2NhbGUpXG4gICAgICAgIC55KHlTY2FsZSlcbiAgICAgICAgLm9uKCd6b29tc3RhcnQnLCB6b29tc3RhcnQpXG4gICAgICAgIC5vbignem9vbScsIHJlZHJhdyk7XG5cbiAgICBkMy5zZWxlY3QoZWxlbWVudCkuc2VsZWN0KCdzdmcnKS5yZW1vdmUoKTtcblxuICAgIHZhciBzdmcgPSBkMy5zZWxlY3QoZWxlbWVudClcbiAgICAuYXR0cigndGFiaW5kZXgnLCAxKVxuICAgIC5vbigna2V5ZG93bi5icnVzaCcsIGtleWRvd24pXG4gICAgLm9uKCdrZXl1cC5icnVzaCcsIGtleXVwKVxuICAgIC5lYWNoKGZ1bmN0aW9uKCkgeyB0aGlzLmZvY3VzKCk7IH0pXG4gICAgLmFwcGVuZCgnc3ZnOnN2ZycpXG4gICAgLmF0dHIoJ3dpZHRoJywgc2VsZi5vcHRpb25zLnN2Z1cpXG4gICAgLmF0dHIoJ2hlaWdodCcsIHNlbGYub3B0aW9ucy5zdmdIKVxuICAgIC5hdHRyKCdpZCcsICdwbG90dGluZy1hcmVhJyk7XG5cbiAgICBzZWxmLm9wdGlvbnMuc3ZnID0gc3ZnO1xuXG4gICAgdmFyIHN2Z0dyYXBoID0gc3ZnLmFwcGVuZCgnc3ZnOmcnKVxuICAgIC5vbignbW91c2Vtb3ZlJywgbW91c2Vtb3ZlKVxuICAgIC5vbignbW91c2Vkb3duJywgbW91c2Vkb3duKVxuICAgIC5vbignbW91c2V1cCcsIG1vdXNldXApO1xuXG4gICAgaWYgKHNlbGYub3B0aW9ucy5hbGxvd1Bhbm5pbmdBbmRab29taW5nKVxuICAgICAgICBzdmdHcmFwaC5jYWxsKHNlbGYuem9vbWVyKTtcblxuICAgIGlmIChzZWxmLm9wdGlvbnMuZWRpdGFibGUpXG4gICAgICAgIHN2Z0dyYXBoLm9uKCdjb250ZXh0bWVudScsIHNlbGYuYmFja2dyb3VuZENvbnRleHRNZW51KTtcblxuICAgIC8qXG4gICAgdmFyIHJlY3QgPSBzdmdHcmFwaC5hcHBlbmQoJ3N2ZzpyZWN0JylcbiAgICAuYXR0cignd2lkdGgnLCBzZWxmLm9wdGlvbnMuc3ZnVylcbiAgICAuYXR0cignaGVpZ2h0Jywgc2VsZi5vcHRpb25zLnN2Z0gpXG4gICAgLmF0dHIoJ2ZpbGwnLCAnd2hpdGUnKVxuICAgIC8vLmF0dHIoJ3N0cm9rZScsICdncmV5JylcbiAgICAvLy5hdHRyKCdzdHJva2Utd2lkdGgnLCAxKVxuICAgIC8vLmF0dHIoJ3BvaW50ZXItZXZlbnRzJywgJ2FsbCcpXG4gICAgLmF0dHIoJ2lkJywgJ3pyZWN0Jyk7XG4gICAgKi9cblxuICAgIHZhciBicnVzaCA9IHN2Z0dyYXBoLmFwcGVuZCgnZycpXG4gICAgLmRhdHVtKGZ1bmN0aW9uKCkgeyByZXR1cm4ge3NlbGVjdGVkOiBmYWxzZSwgcHJldmlvdXNseVNlbGVjdGVkOiBmYWxzZX07IH0pXG4gICAgLmF0dHIoJ2NsYXNzJywgJ2JydXNoJyk7XG5cbiAgICB2YXIgdmlzID0gc3ZnR3JhcGguYXBwZW5kKCdzdmc6ZycpO1xuICAgIHZhciB2aXNMaW5rcyA9IHZpcy5hcHBlbmQoJ3N2ZzpnJyk7XG4gICAgdmFyIHZpc05vZGVzID0gdmlzLmFwcGVuZCgnc3ZnOmcnKTtcblxuICAgIHNlbGYuYnJ1c2hlciA9IGQzLnN2Zy5icnVzaCgpXG4gICAgICAgICAgICAgICAgLngoeFNjYWxlKVxuICAgICAgICAgICAgICAgIC55KHlTY2FsZSlcbiAgICAgICAgICAgICAgIC5vbignYnJ1c2hzdGFydCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICAgICB2YXIgZ25vZGVzID0gdmlzTm9kZXMuc2VsZWN0QWxsKCdnLmdub2RlJykuc2VsZWN0QWxsKCcub3V0bGluZV9ub2RlJyk7XG4gICAgICAgICAgICAgICAgICAgZ25vZGVzLmVhY2goZnVuY3Rpb24oZCkgeyBkLnByZXZpb3VzbHlTZWxlY3RlZCA9IGN0cmxLZXlkb3duICYmIGQuc2VsZWN0ZWQ7IH0pO1xuICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgIC5vbignYnJ1c2gnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICB2YXIgZ25vZGVzID0gdmlzTm9kZXMuc2VsZWN0QWxsKCdnLmdub2RlJykuc2VsZWN0QWxsKCcub3V0bGluZV9ub2RlJyk7XG4gICAgICAgICAgICAgICAgICAgdmFyIGV4dGVudCA9IGQzLmV2ZW50LnRhcmdldC5leHRlbnQoKTtcblxuICAgICAgICAgICAgICAgICAgIGdub2Rlcy5jbGFzc2VkKCdzZWxlY3RlZCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuc2VsZWN0ZWQgPSBzZWxmLm9wdGlvbnMuYXBwbHlGb3JjZSAmJiBkLnByZXZpb3VzbHlTZWxlY3RlZCBeXG4gICAgICAgICAgICAgICAgICAgICAgIChleHRlbnRbMF1bMF0gPD0gZC54ICYmIGQueCA8IGV4dGVudFsxXVswXVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgZXh0ZW50WzBdWzFdIDw9IGQueSAmJiBkLnkgPCBleHRlbnRbMV1bMV0pO1xuICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgIC5vbignYnJ1c2hlbmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICBkMy5ldmVudC50YXJnZXQuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2FsbChkMy5ldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgIGJydXNoLmNhbGwoc2VsZi5icnVzaGVyKVxuICAgICAgICAgIC5vbignbW91c2Vkb3duLmJydXNoJywgbnVsbClcbiAgICAgICAgICAub24oJ3RvdWNoc3RhcnQuYnJ1c2gnLCBudWxsKSBcbiAgICAgICAgICAub24oJ3RvdWNobW92ZS5icnVzaCcsIG51bGwpXG4gICAgICAgICAgLm9uKCd0b3VjaGVuZC5icnVzaCcsIG51bGwpO1xuICAgICAgYnJ1c2guc2VsZWN0KCcuYmFja2dyb3VuZCcpLnN0eWxlKCdjdXJzb3InLCAnYXV0bycpO1xuXG4gICAgZnVuY3Rpb24gem9vbXN0YXJ0KCkge1xuICAgICAgICB2YXIgbm9kZSA9IHZpc05vZGVzLnNlbGVjdEFsbCgnZy5nbm9kZScpLnNlbGVjdEFsbCgnLm91dGxpbmVfbm9kZScpO1xuICAgICAgICBub2RlLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIGQuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBkLnByZXZpb3VzbHlTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICBub2RlLmNsYXNzZWQoJ3NlbGVjdGVkJywgZmFsc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZHJhdygpIHtcbiAgICAgICAgdmlzLmF0dHIoJ3RyYW5zZm9ybScsXG4gICAgICAgICAgICAgICAgICd0cmFuc2xhdGUoJyArIGQzLmV2ZW50LnRyYW5zbGF0ZSArICcpJyArICcgc2NhbGUoJyArIGQzLmV2ZW50LnNjYWxlICsgJyknKTtcbiAgICB9XG5cbiAgICBzZWxmLmdldEJvdW5kaW5nQm94VHJhbnNmb3JtID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIENlbnRlciB0aGUgdmlldyBvbiB0aGUgbW9sZWN1bGUocykgYW5kIHNjYWxlIGl0IHNvIHRoYXQgZXZlcnl0aGluZ1xuICAgICAgICAvLyBmaXRzIGluIHRoZSB3aW5kb3dcblxuICAgICAgICAvL25vIG1vbGVjdWxlcywgbm90aGluZyB0byBkb1xuICAgICAgICBpZiAoc2VsZi5ncmFwaC5ub2Rlcy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4geyd0cmFuc2xhdGUnOiBbMCwwXSwgJ3NjYWxlJzogMX07XG5cbiAgICAgICAgLy8gR2V0IHRoZSBib3VuZGluZyBib3hcbiAgICAgICAgdmFyIG1pblggPSBkMy5taW4oc2VsZi5ncmFwaC5ub2Rlcy5tYXAoZnVuY3Rpb24oZCkge3JldHVybiBkLng7fSkpO1xuICAgICAgICB2YXIgbWluWSA9IGQzLm1pbihzZWxmLmdyYXBoLm5vZGVzLm1hcChmdW5jdGlvbihkKSB7cmV0dXJuIGQueTt9KSk7XG5cbiAgICAgICAgdmFyIG1heFggPSBkMy5tYXgoc2VsZi5ncmFwaC5ub2Rlcy5tYXAoZnVuY3Rpb24oZCkge3JldHVybiBkLng7fSkpO1xuICAgICAgICB2YXIgbWF4WSA9IGQzLm1heChzZWxmLmdyYXBoLm5vZGVzLm1hcChmdW5jdGlvbihkKSB7cmV0dXJuIGQueTt9KSk7XG5cbiAgICAgICAgdmFyIG1heFJhZGl1cyA9IGQzLm1heChzZWxmLmdyYXBoLm5vZGVzLm1hcChmdW5jdGlvbihkKSB7IHJldHVybiBkLnJhZGl1czsgfSkpO1xuXG4gICAgICAgIC8vIFRoZSB3aWR0aCBhbmQgdGhlIGhlaWdodCBvZiB0aGUgbW9sZWN1bGVcbiAgICAgICAgdmFyIG1vbFdpZHRoID0gbWF4WCAtIG1pblg7XG4gICAgICAgIHZhciBtb2xIZWlnaHQgPSBtYXhZIC0gbWluWTtcblxuICAgICAgICAvLyBob3cgbXVjaCBsYXJnZXIgdGhlIGRyYXdpbmcgYXJlYSBpcyB0aGFuIHRoZSB3aWR0aCBhbmQgdGhlIGhlaWdodFxuICAgICAgICB2YXIgd2lkdGhSYXRpbyA9IHNlbGYub3B0aW9ucy5zdmdXIC8gKG1vbFdpZHRoICsgMSk7XG4gICAgICAgIHZhciBoZWlnaHRSYXRpbyA9IHNlbGYub3B0aW9ucy5zdmdIIC8gKG1vbEhlaWdodCArIDEpO1xuXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gZml0IGl0IGluIGJvdGggZGlyZWN0aW9ucywgc28gd2Ugc2NhbGUgYWNjb3JkaW5nIHRvXG4gICAgICAgIC8vIHRoZSBkaXJlY3Rpb24gaW4gd2hpY2ggd2UgbmVlZCB0byBzaHJpbmsgdGhlIG1vc3RcbiAgICAgICAgdmFyIG1pblJhdGlvID0gTWF0aC5taW4od2lkdGhSYXRpbywgaGVpZ2h0UmF0aW8sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnMubWF4Tm9kZVJhZGl1cyAvIG1heFJhZGl1cykgKiAwLjg7XG5cbiAgICAgICAgLy8gdGhlIG5ldyBkaW1lbnNpb25zIG9mIHRoZSBtb2xlY3VsZVxuICAgICAgICB2YXIgbmV3TW9sV2lkdGggPSBtb2xXaWR0aCAqIG1pblJhdGlvO1xuICAgICAgICB2YXIgbmV3TW9sSGVpZ2h0ID0gbW9sSGVpZ2h0ICogbWluUmF0aW87XG5cbiAgICAgICAgLy8gdHJhbnNsYXRlIHNvIHRoYXQgaXQncyBpbiB0aGUgY2VudGVyIG9mIHRoZSB3aW5kb3dcbiAgICAgICAgdmFyIHhUcmFucyA9IC0obWluWCkgKiBtaW5SYXRpbyArIChzZWxmLm9wdGlvbnMuc3ZnVyAtIG5ld01vbFdpZHRoKSAvIDI7XG4gICAgICAgIHZhciB5VHJhbnMgPSAtKG1pblkpICogbWluUmF0aW8gKyAoc2VsZi5vcHRpb25zLnN2Z0ggLSBuZXdNb2xIZWlnaHQpIC8gMjtcblxuICAgICAgICByZXR1cm4geyd0cmFuc2xhdGUnOiBbeFRyYW5zLCB5VHJhbnNdLCAnc2NhbGUnOiBtaW5SYXRpb307XG4gICAgfTtcblxuICAgIHNlbGYuY2VudGVyVmlldyA9IGZ1bmN0aW9uKGR1cmF0aW9uKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgZHVyYXRpb24gPSAwO1xuXG4gICAgICAgIHZhciBiYlRyYW5zZm9ybSA9IHNlbGYuZ2V0Qm91bmRpbmdCb3hUcmFuc2Zvcm0oKTtcblxuICAgICAgICBpZiAoYmJUcmFuc2Zvcm0gPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgLy8gZG8gdGhlIGFjdHVhbCBtb3ZpbmdcbiAgICAgICAgdmlzLnRyYW5zaXRpb24oKS5hdHRyKCd0cmFuc2Zvcm0nLFxuICAgICAgICAgICAgICAgICAndHJhbnNsYXRlKCcgKyBiYlRyYW5zZm9ybS50cmFuc2xhdGUgKyAnKScgKyAnIHNjYWxlKCcgKyBiYlRyYW5zZm9ybS5zY2FsZSArICcpJykuZHVyYXRpb24oZHVyYXRpb24pO1xuXG4gICAgICAgIC8vIHRlbGwgdGhlIHpvb21lciB3aGF0IHdlIGRpZCBzbyB0aGF0IG5leHQgd2Ugem9vbSwgaXQgdXNlcyB0aGVcbiAgICAgICAgLy8gdHJhbnNmb3JtYXRpb24gd2UgZW50ZXJlZCBoZXJlXG4gICAgICAgIHNlbGYuem9vbWVyLnRyYW5zbGF0ZShiYlRyYW5zZm9ybS50cmFuc2xhdGUpO1xuICAgICAgICBzZWxmLnpvb21lci5zY2FsZShiYlRyYW5zZm9ybS5zY2FsZSk7XG4gICAgfTtcblxuICAgIHNlbGYuZm9yY2UgPSBkMy5sYXlvdXQuZm9yY2UoKVxuICAgIC5jaGFyZ2UoZnVuY3Rpb24oZCkgeyBpZiAoZC5ub2RlVHlwZSA9PSAnbWlkZGxlJykgIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLm9wdGlvbnMubWlkZGxlQ2hhcmdlOyBcbiAgICB9XG4gICAgICAgIGVsc2UgXG4gICAgICAgICAgICByZXR1cm4gc2VsZi5vcHRpb25zLm90aGVyQ2hhcmdlO30pXG4gICAgLmZyaWN0aW9uKHNlbGYub3B0aW9ucy5mcmljdGlvbilcbiAgICAubGlua0Rpc3RhbmNlKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHNlbGYub3B0aW9ucy5saW5rRGlzdGFuY2VNdWx0aXBsaWVyICogZC52YWx1ZTsgfSlcbiAgICAubGlua1N0cmVuZ3RoKGZ1bmN0aW9uKGQpIHsgaWYgKGQubGlua1R5cGUgaW4gc2VsZi5saW5rU3RyZW5ndGhzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYubGlua1N0cmVuZ3Roc1tkLmxpbmtUeXBlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5saW5rU3RyZW5ndGhzLm90aGVyOyB9XG4gICAgfSlcbiAgICAuZ3Jhdml0eSgwLjAwMClcbiAgICAubm9kZXMoc2VsZi5ncmFwaC5ub2RlcylcbiAgICAubGlua3Moc2VsZi5ncmFwaC5saW5rcylcbiAgICAuY2hhcmdlRGlzdGFuY2Uoc2VsZi5vcHRpb25zLmNoYXJnZURpc3RhbmNlKVxuICAgIC5zaXplKFtzZWxmLm9wdGlvbnMuc3ZnVywgc2VsZi5vcHRpb25zLnN2Z0hdKTtcblxuICAgIC8vIGxpbmUgZGlzcGxheWVkIHdoZW4gZHJhZ2dpbmcgbmV3IG5vZGVzXG4gICAgdmFyIGRyYWdMaW5lID0gdmlzLmFwcGVuZCgnbGluZScpXG4gICAgLmF0dHIoJ2NsYXNzJywgJ2RyYWdfbGluZScpXG4gICAgLmF0dHIoJ3gxJywgMClcbiAgICAuYXR0cigneTEnLCAwKVxuICAgIC5hdHRyKCd4MicsIDApXG4gICAgLmF0dHIoJ3kyJywgMCk7XG5cbiAgICBmdW5jdGlvbiByZXNldE1vdXNlVmFycygpIHtcbiAgICAgICAgbW91c2Vkb3duTm9kZSA9IG51bGw7XG4gICAgICAgIG1vdXNldXBOb2RlID0gbnVsbDtcbiAgICAgICAgbW91c2Vkb3duTGluayA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIHNoaWZ0S2V5ZG93biA9IGZhbHNlO1xuICAgIHZhciBjdHJsS2V5ZG93biA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gc2VsZWN0ZWROb2Rlcyhtb3VzZURvd25Ob2RlKSB7XG4gICAgICAgIHZhciBnbm9kZXMgPSB2aXNOb2Rlcy5zZWxlY3RBbGwoJ2cuZ25vZGUnKTtcblxuICAgICAgICBpZiAoY3RybEtleWRvd24pIHtcbiAgICAgICAgICAgIHJldHVybiBnbm9kZXMuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuc2VsZWN0ZWQ7IH0pO1xuXG4gICAgICAgICAgICAvL3JldHVybiBkMy5zZWxlY3RBbGwoJ1tzdHJ1Y3RfbmFtZT0nICsgbW91c2VEb3duTm9kZS5zdHJ1Y3RfbmFtZSArICddJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZ25vZGVzLmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkLnNlbGVjdGVkIDsgfSk7XG4gICAgICAgICAgICAvL3JldHVybiBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmFnc3RhcnRlZChkKSB7XG4gICAgICAgIGQzLmV2ZW50LnNvdXJjZUV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBpZiAoIWQuc2VsZWN0ZWQgJiYgIWN0cmxLZXlkb3duKSB7XG4gICAgICAgICAgLy8gaWYgdGhpcyBub2RlIGlzbid0IHNlbGVjdGVkLCB0aGVuIHdlIGhhdmUgdG8gdW5zZWxlY3QgZXZlcnkgb3RoZXIgbm9kZVxuICAgICAgICAgICAgdmFyIG5vZGUgPSB2aXNOb2Rlcy5zZWxlY3RBbGwoJ2cuZ25vZGUnKS5zZWxlY3RBbGwoJy5vdXRsaW5lX25vZGUnKTtcbiAgICAgICAgICAgIG5vZGUuY2xhc3NlZCgnc2VsZWN0ZWQnLCBmdW5jdGlvbihwKSB7IHJldHVybiBwLnNlbGVjdGVkID0gIHNlbGYub3B0aW9ucy5hcHBseUZvcmNlICYmIChwLnByZXZpb3VzbHlTZWxlY3RlZCA9IGZhbHNlKTsgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIGQzLnNlbGVjdCh0aGlzKS5zZWxlY3QoJy5vdXRsaW5lX25vZGUnKS5jbGFzc2VkKCdzZWxlY3RlZCcsIGZ1bmN0aW9uKHApIHsgZC5wcmV2aW91c2x5U2VsZWN0ZWQgPSBkLnNlbGVjdGVkOyByZXR1cm4gZC5zZWxlY3RlZCA9IHNlbGYub3B0aW9ucy5hcHBseUZvcmNlICYmIHRydWU7IH0pO1xuXG4gICAgICAgIHZhciB0b0RyYWcgPSBzZWxlY3RlZE5vZGVzKGQpO1xuICAgICAgICB0b0RyYWcuZWFjaChmdW5jdGlvbihkMSkge1xuICAgICAgICAgICAgZDEuZml4ZWQgfD0gMjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9kMy5ldmVudC5zb3VyY2VFdmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgLy9kMy5zZWxlY3Qoc2VsZikuY2xhc3NlZCgnZHJhZ2dpbmcnLCB0cnVlKTtcbiAgICAgICAgLy9cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmFnZ2VkKGQpIHtcblxuICAgICAgICB2YXIgdG9EcmFnID0gc2VsZWN0ZWROb2RlcyhkKTtcblxuICAgICAgICB0b0RyYWcuZWFjaChmdW5jdGlvbihkMSkge1xuICAgICAgICAgICAgZDEueCArPSBkMy5ldmVudC5keDtcbiAgICAgICAgICAgIGQxLnkgKz0gZDMuZXZlbnQuZHk7XG5cbiAgICAgICAgICAgIGQxLnB4ICs9IGQzLmV2ZW50LmR4O1xuICAgICAgICAgICAgZDEucHkgKz0gZDMuZXZlbnQuZHk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYucmVzdW1lRm9yY2UoKTtcbiAgICAgICAgZDMuZXZlbnQuc291cmNlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBzZWxmLnJlc3VtZUZvcmNlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChzZWxmLmFuaW1hdGlvbilcbiAgICAgICAgICAgIHNlbGYuZm9yY2UucmVzdW1lKCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGRyYWdlbmRlZChkKSB7XG4gICAgICAgIHZhciB0b0RyYWcgPSBzZWxlY3RlZE5vZGVzKGQpO1xuXG4gICAgICAgIHRvRHJhZy5lYWNoKGZ1bmN0aW9uKGQxKSB7XG4gICAgICAgICAgICBkMS5maXhlZCAmPSB+NjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29sbGlkZShub2RlKSB7XG4gICAgICAgIHZhciByID0gbm9kZS5yYWRpdXMgKyAxNixcbiAgICAgICAgbngxID0gbm9kZS54IC0gcixcbiAgICAgICAgbngyID0gbm9kZS54ICsgcixcbiAgICAgICAgbnkxID0gbm9kZS55IC0gcixcbiAgICAgICAgbnkyID0gbm9kZS55ICsgcjtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHF1YWQsIHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgICAgICAgICBpZiAocXVhZC5wb2ludCAmJiAocXVhZC5wb2ludCAhPT0gbm9kZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgeCA9IG5vZGUueCAtIHF1YWQucG9pbnQueCxcbiAgICAgICAgICAgICAgICB5ID0gbm9kZS55IC0gcXVhZC5wb2ludC55LFxuICAgICAgICAgICAgICAgIGwgPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSksXG4gICAgICAgICAgICAgICAgciA9IG5vZGUucmFkaXVzICsgcXVhZC5wb2ludC5yYWRpdXM7XG4gICAgICAgICAgICAgICAgaWYgKGwgPCByKSB7XG4gICAgICAgICAgICAgICAgICAgIGwgPSAobCAtIHIpIC8gbCAqIDAuMTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS54IC09IHggKj0gbDtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS55IC09IHkgKj0gbDtcbiAgICAgICAgICAgICAgICAgICAgcXVhZC5wb2ludC54ICs9IHg7XG4gICAgICAgICAgICAgICAgICAgIHF1YWQucG9pbnQueSArPSB5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB4MSA+IG54MiB8fCB4MiA8IG54MSB8fCB5MSA+IG55MiB8fCB5MiA8IG55MTtcbiAgICAgICAgfTtcbiAgICB9XG5cblxuICAgIHZhciBkcmFnID0gZDMuYmVoYXZpb3IuZHJhZygpXG4gICAgLy8ub3JpZ2luKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQ7IH0pXG4gICAgLm9uKCdkcmFnc3RhcnQnLCBkcmFnc3RhcnRlZClcbiAgICAub24oJ2RyYWcnLCBkcmFnZ2VkKVxuICAgIC5vbignZHJhZ2VuZCcsIGRyYWdlbmRlZCk7XG5cbiAgICBmdW5jdGlvbiBrZXlkb3duKCkge1xuICAgICAgICBpZiAoc2VsZi5kZWFmKVxuICAgICAgICAgICAgLy8gbGFsYWxhbGFsLCBub3QgbGlzdGVuaW5nXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgaWYgKHNoaWZ0S2V5ZG93bikgcmV0dXJuO1xuXG4gICAgICAgIHN3aXRjaCAoZDMuZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSA2ODogICAgLy8nZCcga2V5XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RvdGJyYWNrZXQ6Jywgc2VsZi5nZXRTdHJ1Y3R1cmVzRG90QnJhY2tldCgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTY6XG4gICAgICAgICAgICAgICAgc2hpZnRLZXlkb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTc6XG4gICAgICAgICAgICAgICAgY3RybEtleWRvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2NzogLy9jXG4gICAgICAgICAgICAgICAgc2VsZi5jZW50ZXJWaWV3KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2hpZnRLZXlkb3duIHx8IGN0cmxLZXlkb3duKSB7XG4gICAgICAgICAgICBzdmdHcmFwaC5jYWxsKHNlbGYuem9vbWVyKVxuICAgICAgICAgICAgLm9uKCdtb3VzZWRvd24uem9vbScsIG51bGwpXG4gICAgICAgICAgICAub24oJ3RvdWNoc3RhcnQuem9vbScsIG51bGwpXG4gICAgICAgICAgICAub24oJ3RvdWNobW92ZS56b29tJywgbnVsbClcbiAgICAgICAgICAgIC5vbigndG91Y2hlbmQuem9vbScsIG51bGwpO1xuXG4gICAgICAgICAgICAvL3N2Z0dyYXBoLm9uKCd6b29tJywgbnVsbCk7XG4gICAgICAgICAgICB2aXMuc2VsZWN0QWxsKCdnLmdub2RlJylcbiAgICAgICAgICAgIC5vbignbW91c2Vkb3duLmRyYWcnLCBudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdHJsS2V5ZG93bikge1xuICAgICAgICAgIGJydXNoLnNlbGVjdCgnLmJhY2tncm91bmQnKS5zdHlsZSgnY3Vyc29yJywgJ2Nyb3NzaGFpcicpO1xuICAgICAgICAgIGJydXNoLmNhbGwoc2VsZi5icnVzaGVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGtleXVwKCkge1xuICAgICAgICBzaGlmdEtleWRvd24gPSBmYWxzZTtcbiAgICAgICAgY3RybEtleWRvd24gPSBmYWxzZTtcblxuICAgICAgICBicnVzaC5jYWxsKHNlbGYuYnJ1c2hlcilcbiAgICAgICAgLm9uKCdtb3VzZWRvd24uYnJ1c2gnLCBudWxsKVxuICAgICAgICAub24oJ3RvdWNoc3RhcnQuYnJ1c2gnLCBudWxsKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgLm9uKCd0b3VjaG1vdmUuYnJ1c2gnLCBudWxsKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIC5vbigndG91Y2hlbmQuYnJ1c2gnLCBudWxsKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgIGJydXNoLnNlbGVjdCgnLmJhY2tncm91bmQnKS5zdHlsZSgnY3Vyc29yJywgJ2F1dG8nKTtcbiAgICAgICAgc3ZnR3JhcGguY2FsbChzZWxmLnpvb21lcik7XG5cbiAgICAgICAgdmlzLnNlbGVjdEFsbCgnZy5nbm9kZScpXG4gICAgICAgIC5jYWxsKGRyYWcpO1xuICAgIH1cblxuICAgIGQzLnNlbGVjdChlbGVtZW50KVxuICAgIC5vbigna2V5ZG93bicsIGtleWRvd24pXG4gICAgLm9uKCdrZXl1cCcsIGtleXVwKVxuICAgIC5vbignY29udGV4dG1lbnUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGQzLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7IFxuICAgIH0pO1xuXG4gICAgdmFyIGxpbmtLZXkgPSBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkLnVpZDtcbiAgICB9O1xuXG4gICAgdmFyIG5vZGVLZXkgPSBmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciBrZXkgPSBkLnVpZDtcbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICB9O1xuXG4gICAgXG4gICAgdmFyIHVwZGF0ZVJuYUdyYXBoID0gZnVuY3Rpb24ocikge1xuICAgICAgICB2YXIgbnVjbGVvdGlkZVBvc2l0aW9ucyA9IHIuZ2V0UG9zaXRpb25zKCdudWNsZW90aWRlJyk7XG4gICAgICAgIHZhciBsYWJlbFBvc2l0aW9ucyA9IHIuZ2V0UG9zaXRpb25zKCdsYWJlbCcpO1xuXG4gICAgICAgIHZhciB1aWRzID0gci5nZXRVaWRzKCk7XG5cbiAgICAgICAgci5yZWNhbGN1bGF0ZUVsZW1lbnRzKClcbiAgICAgICAgLmVsZW1lbnRzVG9Kc29uKClcbiAgICAgICAgLmFkZFBzZXVkb2tub3RzKClcbiAgICAgICAgLmFkZFBvc2l0aW9ucygnbnVjbGVvdGlkZScsIG51Y2xlb3RpZGVQb3NpdGlvbnMpXG4gICAgICAgIC5hZGRVaWRzKHVpZHMpXG4gICAgICAgIC5hZGRMYWJlbHMoMSwgc2VsZi5vcHRpb25zLmxhYmVsSW50ZXJ2YWwpXG4gICAgICAgIC5hZGRQb3NpdGlvbnMoJ2xhYmVsJywgbGFiZWxQb3NpdGlvbnMpXG4gICAgICAgIC5yZWluZm9yY2VTdGVtcygpXG4gICAgICAgIC5yZWluZm9yY2VMb29wcygpXG4gICAgICAgIC51cGRhdGVMaW5rVWlkcygpO1xuICAgIH07XG5cbiAgICB2YXIgcmVtb3ZlQmFja0JvbmVMaW5rID0gZnVuY3Rpb24oZCkge1xuICAgICAgICBpZiAoZC50YXJnZXQubnVtIC0gZC5zb3VyY2UubnVtICE9IDEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFUlJPUjogbm9uIGFkamFjZW50IG5vZGVzLiBUYXJnZXQ6JywgZC50YXJnZXQsIFxuICAgICAgICAgICAgICAgICAgICAgICAgJ1NvdXJjZTonLCBkLnNvdXJjZSwgJ0xpbms6JywgZCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcm5hID0gZC50YXJnZXQucm5hO1xuICAgICAgICBsZXQgdG9SZW1vdmUgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJuYS5saW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGxpbmsgPSBybmEubGlua3NbaV07XG5cbiAgICAgICAgICAgIGlmIChsaW5rLmxpbmtUeXBlICE9ICdiYXNlcGFpcicpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIGlmIChsaW5rLnNvdXJjZS5udW0gPD0gZC5zb3VyY2UubnVtICYmIGxpbmsudGFyZ2V0Lm51bSA+PSBkLnRhcmdldC5udW0pIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY3Jvc3NpbmcgYmFzZXBhaXInLCBsaW5rKTsgXG4gICAgICAgICAgICAgICAgdG9SZW1vdmUucHVzaChsaW5rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBiYXNlIHBhaXJzIHRoYXQgYXJlIGJldHdlZW4gdGhlc2UgdHdvIG5vZGVzIGFuZCBhZGQgdGhlbSBhcyBleHRyYVxuICAgICAgICAvLyBsaW5rc1xuICAgICAgICBjb25zb2xlLmxvZygndG9SZW1vdmU6JywgdG9SZW1vdmUpO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b1JlbW92ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcm5hLnBhaXJ0YWJsZVt0b1JlbW92ZVtpXS5zb3VyY2UubnVtXSA9IDA7XG4gICAgICAgICAgICBybmEucGFpcnRhYmxlW3RvUmVtb3ZlW2ldLnRhcmdldC5udW1dID0gMDtcblxuICAgICAgICAgICAgdG9SZW1vdmVbaV0uZnJvbSA9IHRvUmVtb3ZlW2ldLnNvdXJjZS5udW07XG4gICAgICAgICAgICB0b1JlbW92ZVtpXS50byA9IHRvUmVtb3ZlW2ldLnRhcmdldC5udW0gLSBkLnNvdXJjZS5udW07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIGV4dHJhY3QgdGhlIGRvdGJyYWNrZXQgc3RyaW5nIG9mIHRoZSBybmFcbiAgICAgICAgLy8gY3V0IGl0IGF0IHRoZSBwb3NpdGlvbiBvZiB0aGlzIGJhY2tib25lIGJvbmRcbiAgICAgICAgbGV0IHNlcXVlbmNlID0gcm5hLnNlcTtcbiAgICAgICAgbGV0IHNlcXVlbmNlMSA9IHJuYS5zZXEuc2xpY2UoMCwgZC5zb3VyY2UubnVtKTtcbiAgICAgICAgbGV0IHNlcXVlbmNlMiA9IHJuYS5zZXEuc2xpY2UoZC5zb3VyY2UubnVtKTtcblxuICAgICAgICBsZXQgcm5hRG90QnJhY2tldCA9IHJuYVV0aWxpdGllcy5wYWlydGFibGVUb0RvdGJyYWNrZXQocm5hLnBhaXJ0YWJsZSk7XG4gICAgICAgIGxldCBkb3RCcmFja2V0MSA9IHJuYURvdEJyYWNrZXQuc2xpY2UoMCwgZC5zb3VyY2UubnVtKTtcbiAgICAgICAgbGV0IGRvdEJyYWNrZXQyID0gcm5hRG90QnJhY2tldC5zbGljZShkLnNvdXJjZS5udW0pXG5cbiAgICAgICAgLy8gZ2V0IHRoZSBudWNsZW90aWRlIHBvc2l0aW9uc1xuICAgICAgICAvLyBjdXQgdGhlbSBhdCB0aGUgcG9zaXRpb25zIG9mIHRoZSBiYWNrYm9uZSBib25kXG4gICAgICAgIGxldCBwb3NpdGlvbnMgPSBybmEuZ2V0UG9zaXRpb25zKCdudWNsZW90aWRlJylcbiAgICAgICAgbGV0IHVpZHMgPSBybmEuZ2V0VWlkcygpO1xuXG4gICAgICAgIGxldCBwb3NpdGlvbnMxID0gcG9zaXRpb25zLnNsaWNlKDAsIGQuc291cmNlLm51bSk7XG4gICAgICAgIGxldCBwb3NpdGlvbnMyID0gcG9zaXRpb25zLnNsaWNlKGQuc291cmNlLm51bSk7XG5cbiAgICAgICAgbGV0IHVpZHMxID0gdWlkcy5zbGljZSgwLCBkLnNvdXJjZS5udW0pO1xuICAgICAgICBsZXQgdWlkczIgPSB1aWRzLnNsaWNlKGQuc291cmNlLm51bSk7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ3Bvc2l0aW9uczE6JywgcG9zaXRpb25zMSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwb3NpdGlvbnMyOicsIHBvc2l0aW9uczIpO1xuXG4gICAgICAgIGRlbGV0ZSBzZWxmLnJuYXNbcm5hLnVpZF07XG4gICAgICAgIGxldCBybmExID0gc2VsZi5hZGRSTkEoZG90QnJhY2tldDEsIHsgJ3NlcXVlbmNlJzogc2VxdWVuY2UxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncG9zaXRpb25zJzogcG9zaXRpb25zMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpZHMnOiB1aWRzMSB9KTtcbiAgICAgICAgbGV0IHJuYTIgPSBzZWxmLmFkZFJOQShkb3RCcmFja2V0MiwgeyAnc2VxdWVuY2UnOiBzZXF1ZW5jZTIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwb3NpdGlvbnMnOiBwb3NpdGlvbnMyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWlkcyc6IHVpZHMyIH0pO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvUmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncm5hMTonLCBybmExKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdybmEyOicsIHJuYTIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RvUmVtb3ZlW2ldJywgdG9SZW1vdmVbaV0pO1xuICAgICAgICAgICAgc2VsZi5leHRyYUxpbmtzLnB1c2goXG4gICAgICAgICAgICAgICAgeydzb3VyY2UnOiBybmExLm5vZGVzW3RvUmVtb3ZlW2ldLmZyb20tMV0sXG4gICAgICAgICAgICAgICAgICd0YXJnZXQnOiBybmEyLm5vZGVzW3RvUmVtb3ZlW2ldLnRvLTFdLFxuICAgICAgICAgICAgICAgICAndmFsdWUnOiAxLFxuICAgICAgICAgICAgICAgICAndWlkJzogc2x1Z2lkLm5pY2UoKSxcbiAgICAgICAgICAgICAgICAgJ2xpbmtUeXBlJzogJ2ludGVybW9sZWN1bGUnfSk7XG4gICAgICAgICAgICAgICAgc2VsZi5yZWNhbGN1bGF0ZUdyYXBoKCk7XG4gICAgICAgICAgICAgICAgc2VsZi51cGRhdGUoKTtcblxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZWxmLmV4dHJhTGlua3M6Jywgc2VsZi5leHRyYUxpbmtzKTtcbiAgICAgICAgLy9zZWxmLmV4dHJhTGlua3MucHVzaCh7J3NvdXJjZSc6IHJuYTEubm9kZXNbXG4gICAgICAgIFxuICAgICAgICAvLyBjcmVhdGUgdHdvIG5ldyBybmFzXG4gICAgICAgIC8vIGFkZCB0aGVpciBwb3NpdGlvbnNcbiAgICAgICAgLy8gYWRkIHRoZW0gYmFjayB0byB0aGUgcGxvdFxuICAgIH1cblxuICAgIHZhciByZW1vdmVMaW5rID0gZnVuY3Rpb24oZCkge1xuICAgICAgICAvLyByZW1vdmUgYSBsaW5rIGJldHdlZW4gdHdvIG5vZGVzXG4gICAgICAgIGxldCBpbmRleCA9IHNlbGYuZ3JhcGgubGlua3MuaW5kZXhPZihkKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlbW92aW5nIGxpbms6JywgaW5kZXgpO1xuXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAvL3JlbW92ZSBhIGxpbmtcbiAgICAgICAgICAgIC8vZ3JhcGgubGlua3Muc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICAgICAgLy8gdGhlcmUgc2hvdWxkIGJlIHR3byBjYXNlc1xuICAgICAgICAgICAgLy8gMS4gVGhlIGxpbmsgaXMgd2l0aGluIGEgc2luZ2xlIG1vbGVjdWxlXG5cbiAgICAgICAgICAgIGlmIChkLnNvdXJjZS5ybmEgPT0gZC50YXJnZXQucm5hKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQubGlua1R5cGUgPT0gJ2JhY2tib25lJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndHJ5aW5nIHRvIHJlbW92ZSBhIGJhY2tib25lIGxpbmsnLCBkLnNvdXJjZS5udW0sIGQudGFyZ2V0Lm51bSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQmFja0JvbmVMaW5rKGQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSBkLnNvdXJjZS5ybmE7XG5cbiAgICAgICAgICAgICAgICAgICAgci5hZGRQc2V1ZG9rbm90cygpO1xuICAgICAgICAgICAgICAgICAgICByLnBhaXJ0YWJsZVtkLnNvdXJjZS5udW1dID0gMDtcbiAgICAgICAgICAgICAgICAgICAgci5wYWlydGFibGVbZC50YXJnZXQubnVtXSA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlUm5hR3JhcGgocik7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gMi4gVGhlIGxpbmsgaXMgYmV0d2VlbiB0d28gZGlmZmVyZW50IG1vbGVjdWxlc1xuICAgICAgICAgICAgICAgIGxldCBleHRyYUxpbmtJbmRleCA9IHNlbGYuZXh0cmFMaW5rcy5pbmRleE9mKGQpO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5leHRyYUxpbmtzLnNwbGljZShleHRyYUxpbmtJbmRleCwgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYucmVjYWxjdWxhdGVHcmFwaCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgdmFyIGxpbmtDbGljayA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgaWYgKCFzaGlmdEtleWRvd24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpbnZhbGlkTGlua3MgPSB7IC8vJ2JhY2tib25lJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2Zha2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZmFrZV9mYWtlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xhYmVsX2xpbmsnOiB0cnVlfTtcblxuICAgICAgICBjb25zb2xlLmxvZygnZC5saW5rVHlwZTonLCBkLmxpbmtUeXBlKTtcbiAgICAgICAgaWYgKGQubGlua1R5cGUgaW4gaW52YWxpZExpbmtzICkgXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgcmVtb3ZlTGluayhkKTtcbiAgICB9O1xuXG4gICAgc2VsZi5nZXRTdHJ1Y3R1cmVzRG90QnJhY2tldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnc2VsZi5ybmFzOicsIHNlbGYucm5hcyk7XG4gICAgICAgIGxldCBzZXF1ZW5jZSA9IFtdO1xuICAgICAgICBsZXQgY3VycklkeCA9IDE7XG4gICAgICAgIGxldCBub2RlSWR4cyA9IHt9O1xuICAgICAgICBsZXQgYnJlYWtzID0gW107XG4gICAgICAgIGxldCBwYWlydGFibGUgPSBbXTtcblxuICAgICAgICAvLyBhZGQgdGhlIG5vZGVzXG4gICAgICAgIGZvciAobGV0IHVpZCBpbiBzZWxmLnJuYXMpIHtcbiAgICAgICAgICAgIGxldCBybmEgPSBzZWxmLnJuYXNbdWlkXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBybmEubm9kZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IHJuYS5ub2Rlc1tqXTtcblxuICAgICAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlICE9ICdudWNsZW90aWRlJylcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbm9kZTonLCBub2RlKTtcbiAgICAgICAgICAgICAgICBub2RlSWR4c1tub2RlLnVpZF0gPSBjdXJySWR4O1xuICAgICAgICAgICAgICAgIGN1cnJJZHggKz0gMTtcblxuICAgICAgICAgICAgICAgIHNlcXVlbmNlLnB1c2gobm9kZS5uYW1lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWtzLnB1c2goY3VycklkeCk7XG4gICAgICAgIH1cblxuICAgICAgICBwYWlydGFibGUgPSBbY3VycklkeC0xXVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJJZHg7IGkrKylcbiAgICAgICAgICAgIHBhaXJ0YWJsZS5wdXNoKDApXG5cbiAgICAgICAgLy8gYWRkIHRoZSBsaW5rc1xuICAgICAgICBmb3IgKGxldCB1aWQgaW4gc2VsZi5ybmFzKSB7XG4gICAgICAgICAgICBsZXQgcm5hID0gc2VsZi5ybmFzW3VpZF07XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcm5hLmxpbmtzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxpbmsgPSBybmEubGlua3Nbal07XG5cbiAgICAgICAgICAgICAgICBpZiAobGluay5saW5rVHlwZSAhPSAnYmFzZXBhaXInKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGxldCBpZHgxID0gbm9kZUlkeHNbbGluay5zb3VyY2UudWlkXTtcbiAgICAgICAgICAgICAgICBsZXQgaWR4MiA9IG5vZGVJZHhzW2xpbmsudGFyZ2V0LnVpZF07XG4gICAgICAgICAgICAgICAgcGFpcnRhYmxlW2lkeDFdID0gaWR4MjtcbiAgICAgICAgICAgICAgICBwYWlydGFibGVbaWR4Ml0gPSBpZHgxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLmV4dHJhTGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBsaW5rID0gc2VsZi5leHRyYUxpbmtzW2ldO1xuXG4gICAgICAgICAgICBsZXQgaWR4MSA9IG5vZGVJZHhzW2xpbmsuc291cmNlLnVpZF07XG4gICAgICAgICAgICBsZXQgaWR4MiA9IG5vZGVJZHhzW2xpbmsudGFyZ2V0LnVpZF07XG5cbiAgICAgICAgICAgIHBhaXJ0YWJsZVtpZHgxXSA9IGlkeDI7XG4gICAgICAgICAgICBwYWlydGFibGVbaWR4Ml0gPSBpZHgxO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHN0cnVjdHVyZSA9IHJuYVV0aWxpdGllcy5wYWlydGFibGVUb0RvdGJyYWNrZXQocGFpcnRhYmxlKS5zcGxpdCgnJyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBicmVha3MubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYnJlYWtzW2ldOicsIGJyZWFrc1tpXSk7XG4gICAgICAgICAgICBzZXF1ZW5jZS5zcGxpY2UoYnJlYWtzW2ldICsgaSAtIDEsIDAsICcmJyk7XG4gICAgICAgICAgICBzdHJ1Y3R1cmUuc3BsaWNlKGJyZWFrc1tpXSArIGkgLSAxLCAwLCAnJicpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coJ3NlcXVlbmNlOicsIHNlcXVlbmNlLCBzZXF1ZW5jZS5qb2luKCcnKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzdHJ1Y3R1cmU6Jywgc3RydWN0dXJlLCBzdHJ1Y3R1cmUuam9pbignJykpO1xuICAgICAgICByZXR1cm4gW3NlcXVlbmNlLmpvaW4oJycpLCBzdHJ1Y3R1cmUuam9pbignJyldO1xuICAgIH07XG5cbiAgICBzZWxmLmFkZEJhY2tCb25lTGluayA9IGZ1bmN0aW9uKG5ld0xpbmspIHtcbiAgICAgICAgLy8gb3Bwb3NpdGUgb2YgZGVsZXRpbmcgYSBsaW5rXG4gICAgICAgIC8vIGdldCB0aGUgdHdvIGRvdGJyYWNrZXQgc3RyaW5nc1xuICAgICAgICBsZXQgcm5hMSA9IG5ld0xpbmsuc291cmNlLnJuYTtcbiAgICAgICAgbGV0IHJuYTIgPSBuZXdMaW5rLnRhcmdldC5ybmE7XG5cbiAgICAgICAgbGV0IGRvdGJyYWNrZXQxID0gcm5hVXRpbGl0aWVzLnBhaXJ0YWJsZVRvRG90YnJhY2tldChybmExLnBhaXJ0YWJsZSk7XG4gICAgICAgIGxldCBkb3RicmFja2V0MiA9IHJuYVV0aWxpdGllcy5wYWlydGFibGVUb0RvdGJyYWNrZXQocm5hMi5wYWlydGFibGUpO1xuXG4gICAgICAgIGxldCBzZXExID0gbmV3TGluay5zb3VyY2Uucm5hLnNlcTtcbiAgICAgICAgbGV0IHNlcTIgPSBuZXdMaW5rLnRhcmdldC5ybmEuc2VxO1xuXG4gICAgICAgIGxldCBwb3NpdGlvbnMxID0gcm5hMS5nZXRQb3NpdGlvbnMoJ251Y2xlb3RpZGUnKTtcbiAgICAgICAgbGV0IHBvc2l0aW9uczIgPSBybmEyLmdldFBvc2l0aW9ucygnbnVjbGVvdGlkZScpO1xuXG4gICAgICAgIC8vIGNvbmNhdGVuYXRlIHRoZW1cbiAgICAgICAgbGV0IG5ld0RvdGJyYWNrZXQgPSBkb3RicmFja2V0MSArIGRvdGJyYWNrZXQyO1xuICAgICAgICBsZXQgbmV3U2VxID0gc2VxMSArIHNlcTI7XG4gICAgICAgIGxldCBuZXdQb3NpdGlvbnMgPSBwb3NpdGlvbnMxLmNvbmNhdChwb3NpdGlvbnMyKTtcblxuICAgICAgICBsZXQgdG9BZGRJbnRlcm5hbCA9IFtdO1xuICAgICAgICBsZXQgdG9BZGRFeHRlcm5hbCA9IFtdO1xuICAgICAgICBsZXQgdG9EZWxldGUgPSB7fTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYuZXh0cmFMaW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NlbGYuZXh0cmFMaW5rc1tpXScsIHNlbGYuZXh0cmFMaW5rc1tpXSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncm5hMTonLCBybmExKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdybmEyOicsIHJuYTIpO1xuICAgICAgICAgICAgaWYgKHNlbGYuZXh0cmFMaW5rc1tpXS5zb3VyY2Uucm5hID09IHJuYTEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIHNlbGYuZXh0cmFMaW5rc1tpXS50YXJnZXQucm5hID09IHJuYTIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYm90aCBlbmRzIG9mIHRoZSBleHRyYSBsaW5rIGFyZSB3aXRoaW4gd2hhdCB3aWxsIGJlY29tZSB0aGUgbmV3IG1vbGVjdWxlXG4gICAgICAgICAgICAgICAgICAgIC8vIG5lZWQgdG8gYmUgYWRkZWQgYXMgYmFzZSBwYWlycyBhZnRlcndhcmRzXG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZi5leHRyYUxpbmtzW2ldLmZyb20gPSBzZWxmLmV4dHJhTGlua3NbaV0uc291cmNlLm51bTtcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxmLmV4dHJhTGlua3NbaV0udG8gPSBkb3RicmFja2V0MS5sZW5ndGggKyBzZWxmLmV4dHJhTGlua3NbaV0udGFyZ2V0Lm51bTtcbiAgICAgICAgICAgICAgICAgICAgLy90b0FkZEludGVybmFsLnB1c2goc2VsZi5leHRyYUxpbmtzW2ldKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IG9uZSBlbmQgb2YgdGhlIGV4dHJhIGxpbmsgaXMgd2l0aGluIHdoYXQgd2lsbCBiZWNvbWUgdGhlIG5ld2x5XG4gICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZWQgbW9sZWN1bGUsIG5lZWRzIHRvIHJlbWFpbiBhbiBleHRyYSBsaW5rXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvdXJjZSB3aWxsIGFsd2F5cyBiZSB0aGUgdW5jaGFuZ2VkIG1vbGVjdWxlLCB3aGVyZWFzIHRhcmdldCB3aWxsIGJlIFxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgbmV3bHkgY3JlYXRlZCBvbmVcbiAgICAgICAgICAgICAgICAgICAgdG9BZGRFeHRlcm5hbC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdzb3VyY2UnOiBzZWxmLmV4dHJhTGlua3NbaV0udGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RhcmdldCc6IHNlbGYuZXh0cmFMaW5rc1tpXS5zb3VyY2UubnVtXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRvRGVsZXRlW3NlbGYuZXh0cmFMaW5rc1tpXS51aWRdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuZXh0cmFMaW5rc1tpXS5zb3VyY2Uucm5hID09IHJuYTIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIHNlbGYuZXh0cmFMaW5rc1tpXS50YXJnZXQucm5hID09IHJuYTEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGludGVybmFsIGxpbmtcbiAgICAgICAgICAgICAgICAgICAgLy8gYm90aCBlbmRzIG9mIHRoZSBleHRyYSBsaW5rIGFyZSB3aXRoaW4gd2hhdCB3aWxsIGJlY29tZSB0aGUgbmV3IG1vbGVjdWxlXG4gICAgICAgICAgICAgICAgICAgIC8vIG5lZWQgdG8gYmUgYWRkZWQgYXMgYmFzZSBwYWlycyBhZnRlcndhcmRzXG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZi5leHRyYUxpbmtzW2ldLmZyb20gPSBzZWxmLmV4dHJhTGlua3NbaV0udGFyZ2V0Lm51bTtcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxmLmV4dHJhTGlua3NbaV0udG8gPSBkb3RicmFja2V0MS5sZW5ndGggKyBzZWxmLmV4dHJhTGlua3NbaV0uc291cmNlLm51bTtcblxuICAgICAgICAgICAgICAgICAgICAvL3RvQWRkSW50ZXJuYWwucHVzaChzZWxmLmV4dHJhTGlua3NbaV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRvQWRkRXh0ZXJuYWwucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAnc291cmNlJzogc2VsZi5leHRyYUxpbmtzW2ldLnRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICd0YXJnZXQnOiBzZWxmLmV4dHJhTGlua3NbaV0uc291cmNlLm51bSArIGRvdGJyYWNrZXQxLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdG9EZWxldGVbc2VsZi5leHRyYUxpbmtzW2ldLnVpZF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHNlbGYuZXh0cmFMaW5rc1tpXS50YXJnZXQucm5hID09IHJuYTEpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5leHRyYUxpbmtzW2ldLnNvdXJjZS5ybmEgPT0gcm5hMikge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb3ZlcmVkIGluIHByZXZpb3VzIGlmIHN0YXRlbWVudFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG9ubHkgb25lIGVuZCBvZiB0aGUgZXh0cmEgbGluayBpcyB3aXRoaW4gd2hhdCB3aWxsIGJlY29tZSB0aGUgbmV3bHlcbiAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlZCBtb2xlY3VsZSwgbmVlZHMgdG8gcmVtYWluIGFuIGV4dHJhIGxpbmtcbiAgICAgICAgICAgICAgICAgICAgdG9BZGRFeHRlcm5hbC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdzb3VyY2UnOiBzZWxmLmV4dHJhTGlua3NbaV0uc291cmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RhcmdldCc6IHNlbGYuZXh0cmFMaW5rc1tpXS50YXJnZXQubnVtXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRvRGVsZXRlW3NlbGYuZXh0cmFMaW5rc1tpXS51aWRdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuZXh0cmFMaW5rc1tpXS50YXJnZXQucm5hID09IHJuYTIpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5leHRyYUxpbmtzW2ldLnNvdXJjZS5ybmEgPT0gcm5hMSkge1xuICAgICAgICAgICAgICAgICAgICB0b0FkZEV4dGVybmFsLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3NvdXJjZSc6IHNlbGYuZXh0cmFMaW5rc1tpXS5zb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAndGFyZ2V0Jzogc2VsZi5leHRyYUxpbmtzW2ldLnRhcmdldC5udW0gKyBkb3RicmFja2V0MS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdG9EZWxldGVbc2VsZi5leHRyYUxpbmtzW2ldLnVpZF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIFxuXG4gICAgICAgIHNlbGYuZXh0cmFMaW5rcyA9IHNlbGYuZXh0cmFMaW5rcy5maWx0ZXIoKGUpID0+IHsgcmV0dXJuICEoZS51aWQgaW4gdG9EZWxldGUpIH0pO1xuXG4gICAgICAgIGRlbGV0ZSBzZWxmLnJuYXNbcm5hMS51aWRdO1xuICAgICAgICBkZWxldGUgc2VsZi5ybmFzW3JuYTIudWlkXTtcblxuICAgICAgICBsZXQgbmV3Um5hID0gbnVsbDtcbiAgICAgICAgLy8gY3JlYXRlIGEgbmV3IFJOQVxuICAgICAgICBpZiAoc2VsZi5vcHRpb25zLmFwcGx5Rm9yY2UpXG4gICAgICAgICAgICBuZXdSbmEgPSBzZWxmLmFkZFJOQShuZXdEb3RicmFja2V0LCB7ICdzZXF1ZW5jZSc6IG5ld1NlcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Bvc2l0aW9ucyc6IG5ld1Bvc2l0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NlbnRlclZpZXcnOiBmYWxzZX0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBuZXdSbmEgPSBzZWxmLmFkZFJOQShuZXdEb3RicmFja2V0LCB7ICdzZXF1ZW5jZSc6IG5ld1NlcSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAnY2VudGVyVmlldyc6IGZhbHNlIH0pO1xuXG5cblxuICAgICAgICAvLyBhZGQgbmV3IGV4dGVybmFsIGxpbmtzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9BZGRFeHRlcm5hbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc2VsZi5leHRyYUxpbmtzLnB1c2goe1xuICAgICAgICAgICAgICAgICdzb3VyY2UnOiB0b0FkZEV4dGVybmFsW2ldLnNvdXJjZSxcbiAgICAgICAgICAgICAgICAndGFyZ2V0JzogbmV3Um5hLm5vZGVzW3RvQWRkRXh0ZXJuYWxbaV0udGFyZ2V0LTFdLFxuICAgICAgICAgICAgICAgICd2YWx1ZSc6IDEsXG4gICAgICAgICAgICAgICAgJ3VpZCc6IHNsdWdpZC5uaWNlKCksXG4gICAgICAgICAgICAgICAgJ2xpbmtUeXBlJzogJ2ludGVybW9sZWN1bGUnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYucmVjYWxjdWxhdGVHcmFwaCgpO1xuICAgICAgICBzZWxmLnVwZGF0ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZygnc2VsZi5leHRyYUxpbmtzOicsIHNlbGYuZXh0cmFMaW5rcyk7XG4gICAgfTtcblxuICAgIHNlbGYuYWRkTGluayA9ICBmdW5jdGlvbihuZXdMaW5rKSB7XG4gICAgICAgIC8vIHRoaXMgbWVhbnMgd2UgaGF2ZSBhIG5ldyBqc29uLCB3aGljaCBtZWFucyB3ZSBoYXZlXG4gICAgICAgIC8vIHRvIHJlY2FsY3VsYXRlIHRoZSBzdHJ1Y3R1cmUgYW5kIGNoYW5nZSB0aGUgY29sb3JzXG4gICAgICAgIC8vIGFwcHJvcHJpYXRlbHlcbiAgICAgICAgLy9cbiAgICAgICAgY29uc29sZS5sb2coJ2FkZGluZyBuZXcgbGluaycpO1xuICAgICAgICBpZiAobmV3TGluay5zb3VyY2Uucm5hID09IG5ld0xpbmsudGFyZ2V0LnJuYSkge1xuICAgICAgICAgICAgLy8gbXVzdCBiZSBhIGJhc2VwYWlyXG4gICAgICAgICAgICBsZXQgciA9IG5ld0xpbmsuc291cmNlLnJuYTtcblxuICAgICAgICAgICAgci5wYWlydGFibGVbbmV3TGluay5zb3VyY2UubnVtXSA9IG5ld0xpbmsudGFyZ2V0Lm51bTtcbiAgICAgICAgICAgIHIucGFpcnRhYmxlW25ld0xpbmsudGFyZ2V0Lm51bV0gPSBuZXdMaW5rLnNvdXJjZS5udW07XG5cbiAgICAgICAgICAgIHVwZGF0ZVJuYUdyYXBoKHIpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL0FkZCBhbiBleHRyYSBsaW5rXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW50ZXJtb2xlY3VsZScpO1xuICAgICAgICAgICAgbmV3TGluay5saW5rVHlwZSA9ICdpbnRlcm1vbGVjdWxlJztcbiAgICAgICAgICAgIHNlbGYuZXh0cmFMaW5rcy5wdXNoKG5ld0xpbmspO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYucmVjYWxjdWxhdGVHcmFwaCgpO1xuICAgICAgICBzZWxmLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICB2YXIgbm9kZU1vdXNlY2xpY2sgPSBmdW5jdGlvbihkKSB7XG4gICAgICAgIGlmIChkMy5ldmVudC5kZWZhdWx0UHJldmVudGVkKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCFjdHJsS2V5ZG93bikge1xuICAgICAgICAgICAgLy9pZiB0aGUgc2hpZnQga2V5IGlzbid0IGRvd24sIHVuc2VsZWN0IGV2ZXJ5dGhpbmdcbiAgICAgICAgICAgIHZhciBub2RlID0gdmlzTm9kZXMuc2VsZWN0QWxsKCdnLmdub2RlJykuc2VsZWN0QWxsKCcub3V0bGluZV9ub2RlJyk7XG4gICAgICAgICAgICBub2RlLmNsYXNzZWQoJ3NlbGVjdGVkJywgZnVuY3Rpb24ocCkgeyByZXR1cm4gcC5zZWxlY3RlZCA9ICBzZWxmLm9wdGlvbnMuYXBwbHlGb3JjZSAmJiAocC5wcmV2aW91c2x5U2VsZWN0ZWQgPSBmYWxzZSk7IH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWx3YXlzIHNlbGVjdCB0aGlzIG5vZGVcbiAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnNlbGVjdCgnY2lyY2xlJykuY2xhc3NlZCgnc2VsZWN0ZWQnLCBkLnNlbGVjdGVkID0gc2VsZi5vcHRpb25zLmFwcGx5Rm9yY2UgJiYgIWQucHJldmlvdXNseVNlbGVjdGVkKTtcbiAgICAgICAgZDMuZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfTtcblxuICAgIHZhciBub2RlTW91c2V1cCA9IGZ1bmN0aW9uKGQsaSkge1xuICAgICAgICBsZXQgYmFja2JvbmVQb3NzaWJsZSA9IHRydWUsIGJhc2VwYWlyUG9zc2libGUgPSB0cnVlO1xuXG4gICAgICAgIGlmIChtb3VzZWRvd25Ob2RlKSB7XG4gICAgICAgICAgICBtb3VzZXVwTm9kZSA9IGQ7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBub2RlIGlzbid0IGEgbnVjbGVvdGlkZSwgd2UgY2FuJ3QgY3JlYXRlIGEgbGlua1xuICAgICAgICAgICAgaWYgKG1vdXNldXBOb2RlLm5vZGVUeXBlID09ICdtaWRkbGUnIHx8IG1vdXNlZG93bk5vZGUubm9kZVR5cGUgPT0gJ21pZGRsZScgfHwgbW91c2V1cE5vZGUubm9kZVR5cGUgPT0gJ2xhYmVsJyB8fCBtb3VzZWRvd25Ob2RlLm5vZGVUeXBlID09ICdsYWJlbCcpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAobW91c2V1cE5vZGUgPT0gbW91c2Vkb3duTm9kZSkgeyByZXNldE1vdXNlVmFycygpOyByZXR1cm47IH1cbiAgICAgICAgICAgIHZhciBuZXdMaW5rID0ge3NvdXJjZTogbW91c2Vkb3duTm9kZSwgdGFyZ2V0OiBtb3VzZXVwTm9kZSwgbGlua1R5cGU6ICdiYXNlcGFpcicsIHZhbHVlOiAxLCB1aWQ6IHNsdWdpZC5uaWNlKCl9O1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYuZ3JhcGgubGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoKHNlbGYuZ3JhcGgubGlua3NbaV0uc291cmNlID09IG1vdXNlZG93bk5vZGUpICB8fCBcbiAgICAgICAgICAgICAgICAgICAgKHNlbGYuZ3JhcGgubGlua3NbaV0udGFyZ2V0ID09IG1vdXNlZG93bk5vZGUpIHx8XG4gICAgICAgICAgICAgICAgICAgIChzZWxmLmdyYXBoLmxpbmtzW2ldLnNvdXJjZSA9PSBtb3VzZXVwTm9kZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgKHNlbGYuZ3JhcGgubGlua3NbaV0udGFyZ2V0ID09IG1vdXNldXBOb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBlaXRoZXIgb25lIG9mIHRoZSBub2RlcyBpcyBhbHJlYWR5IGluIGEgbGlua1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGFueSBvZiB0aGUgbm9kZXMgYXJlIGFscmVhZHkgaW52b2x2ZWQgaW4gYSBiYXNlcGFpciBvciBhIHBzZXVkb2tub3RcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlbiB3ZSBjYW4ndCBtYWtlIGEgYmFzZXBhaXIgbGlua1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5ncmFwaC5saW5rc1tpXS5saW5rVHlwZSA9PSAnYmFzZXBhaXInIHx8IFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5ncmFwaC5saW5rc1tpXS5saW5rVHlwZSA9PSAncHNldWRva25vdCcgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZ3JhcGgubGlua3NbaV0ubGlua1R5cGUgPT0gJ2ludGVybW9sZWN1bGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhbHRob3VnaCBzaG91bGQgYmUgYWJsZSB0byBtYWtlIGEgYmFja2JvbmUgbGlua1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25vIGJhc2VwYWlyIHBvc3NpYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYXNlcGFpclBvc3NpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoKChzZWxmLmdyYXBoLmxpbmtzW2ldLnNvdXJjZSA9PSBtb3VzZXVwTm9kZSkgICYmIFxuICAgICAgICAgICAgICAgICAgICAgKHNlbGYuZ3JhcGgubGlua3NbaV0udGFyZ2V0ID09IG1vdXNlZG93bk5vZGUpKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICgoc2VsZi5ncmFwaC5saW5rc1tpXS5zb3VyY2UgPT0gbW91c2Vkb3duTm9kZSkgICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoc2VsZi5ncmFwaC5saW5rc1tpXS50YXJnZXQgPT0gbW91c2V1cE5vZGUpKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHdlJ3JlIHRyeWluZyB0byBtYWtlIGEgbGluayBiZXR3ZWVuIHR3byBub2RlcyB3aGljaCBhbHJlYWR5IGhhdmVcbiAgICAgICAgICAgICAgICAgICAgLy8gYSBiYWNrYm9uZSBiZXR3ZWVuIHRoZW0sIHRoZW4gd2UgY2FuJ3QgbWFrZSBhIGxpbmtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuZ3JhcGgubGlua3NbaV0ubGlua1R5cGUgPT0gJ2JhY2tib25lJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmIChuZXdMaW5rLnNvdXJjZS5ybmEgIT0gbmV3TGluay50YXJnZXQucm5hKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvdWxkIGJlIGVpdGhlciBhIGJhY2tib25lIGxpbmsgb3IgYW4gaW50ZXJtb2xlY3VsZSBsaW5rXG5cbiAgICAgICAgICAgICAgICBpZiAoKG5ld0xpbmsuc291cmNlLm51bSA9PSAxICYmIFxuICAgICAgICAgICAgICAgICAgICAgbmV3TGluay50YXJnZXQubnVtID09IG5ld0xpbmsudGFyZ2V0LnJuYS5ybmFMZW5ndGgpIHx8XG4gICAgICAgICAgICAgICAgICAgICAobmV3TGluay50YXJnZXQubnVtID09IDEgJiZcbiAgICAgICAgICAgICAgICAgICAgICBuZXdMaW5rLnNvdXJjZS5udW0gPT0gbmV3TGluay5zb3VyY2Uucm5hLnJuYUxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmtNZW51ID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQmFja2JvbmUgTGluaycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbihlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlua0NvbnRleHRNZW51U2hvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0l0ZW0gIzEgY2xpY2tlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RoZSBkYXRhIGZvciB0aGlzIGNpcmNsZSBpczogJyArIGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmFnTGluZS5hdHRyKCdjbGFzcycsICdkcmFnX2xpbmVfaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWRkQmFja0JvbmVMaW5rKG5ld0xpbmspO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlIC8vIG9wdGlvbmFsLCBkZWZhdWx0cyB0byBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0Jhc2VwYWlyIExpbmsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtDb250ZXh0TWVudVNob3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdZb3UgaGF2ZSBjbGlja2VkIHRoZSBzZWNvbmQgaXRlbSEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RoZSBkYXRhIGZvciB0aGlzIGNpcmNsZSBpczogJyArIGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmFnTGluZS5hdHRyKCdjbGFzcycsICdkcmFnX2xpbmVfaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWRkTGluayhuZXdMaW5rKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGlua0NvbnRleHRNZW51U2hvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGlua0NvbnRleHRNZW51ID0gY29udGV4dE1lbnUobGlua01lbnUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbmV3TGlua01lbnUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGlua0NvbnRleHRNZW51LmFwcGx5KHRoaXMsIFtkLGksdHJ1ZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHsgZHJhZ0xpbmUuYXR0cignY2xhc3MnLCAnZHJhZ19saW5lX2hpZGRlbicpIH1dKTtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBiZXR3ZWVuIGVuZCBwb2ludHMgYnV0IGNhbid0IG1ha2UgYSBiYWNrYm9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZXBhaXJQb3NzaWJsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkZExpbmsobmV3TGluayk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoYmFzZXBhaXJQb3NzaWJsZSlcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGRMaW5rKG5ld0xpbmspO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIG5vZGVNb3VzZWRvd24gPSBmdW5jdGlvbihkKSB7XG4gICAgICBpZiAoIWQuc2VsZWN0ZWQgJiYgIWN0cmxLZXlkb3duKSB7XG4gICAgICAgICAgLy8gaWYgdGhpcyBub2RlIGlzbid0IHNlbGVjdGVkLCB0aGVuIHdlIGhhdmUgdG8gdW5zZWxlY3QgZXZlcnkgb3RoZXIgbm9kZVxuICAgICAgICAgICAgdmFyIG5vZGUgPSB2aXNOb2Rlcy5zZWxlY3RBbGwoJ2cuZ25vZGUnKS5zZWxlY3RBbGwoJy5vdXRsaW5lX25vZGUnKTtcbiAgICAgICAgICAgIG5vZGUuY2xhc3NlZCgnc2VsZWN0ZWQnLCBmdW5jdGlvbihwKSB7IHJldHVybiBwLnNlbGVjdGVkID0gIHAucHJldmlvdXNseVNlbGVjdGVkID0gZmFsc2U7IH0pXG4gICAgICAgICAgfVxuXG5cbiAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2xhc3NlZCgnc2VsZWN0ZWQnLCBmdW5jdGlvbihwKSB7IGQucHJldmlvdXNseVNlbGVjdGVkID0gZC5zZWxlY3RlZDsgcmV0dXJuIGQuc2VsZWN0ZWQgPSBzZWxmLm9wdGlvbnMuYXBwbHlGb3JjZSAmJiB0cnVlOyB9KTtcblxuICAgICAgICBpZiAoIXNoaWZ0S2V5ZG93bikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbW91c2Vkb3duTm9kZSA9IGQ7XG5cbiAgICAgICAgZHJhZ0xpbmVcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2RyYWdfbGluZScpXG4gICAgICAgIC5hdHRyKCd4MScsIG1vdXNlZG93bk5vZGUueClcbiAgICAgICAgLmF0dHIoJ3kxJywgbW91c2Vkb3duTm9kZS55KVxuICAgICAgICAuYXR0cigneDInLCBtb3VzZWRvd25Ob2RlLngpXG4gICAgICAgIC5hdHRyKCd5MicsIG1vdXNlZG93bk5vZGUueSk7XG5cbiAgICAgICAgLy9nbm9kZXMuYXR0cigncG9pbnRlci1ldmVudHMnLCAgJ25vbmUnKTtcblxuICAgIH07XG5cbiAgICBzZWxmLnN0YXJ0QW5pbWF0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLmFuaW1hdGlvbiA9IHRydWU7XG4gICAgICB2aXMuc2VsZWN0QWxsKCdnLmdub2RlJylcbiAgICAgICAgLmNhbGwoZHJhZyk7XG4gICAgICBzZWxmLmZvcmNlLnN0YXJ0KCk7XG4gICAgfTtcbiAgICBcbiAgICBzZWxmLnN0b3BBbmltYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYuYW5pbWF0aW9uID0gZmFsc2U7XG4gICAgICB2aXMuc2VsZWN0QWxsKCdnLmdub2RlJylcbiAgICAgICAgICAgLm9uKCdtb3VzZWRvd24uZHJhZycsIG51bGwpO1xuICAgICAgc2VsZi5mb3JjZS5zdG9wKCk7XG4gICAgfTtcbiAgICBcbiAgICBzZWxmLnNldEZyaWN0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHNlbGYuZm9yY2UuZnJpY3Rpb24odmFsdWUpO1xuICAgICAgc2VsZi5yZXN1bWVGb3JjZSgpO1xuICAgIH07XG5cbiAgICBzZWxmLnNldENoYXJnZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBzZWxmLmZvcmNlLmNoYXJnZSh2YWx1ZSk7XG4gICAgICBzZWxmLnJlc3VtZUZvcmNlKCk7XG4gICAgfTtcbiAgICBcbiAgICBzZWxmLnNldEdyYXZpdHkgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgc2VsZi5mb3JjZS5ncmF2aXR5KHZhbHVlKTtcbiAgICAgIHNlbGYucmVzdW1lRm9yY2UoKTtcbiAgICB9O1xuICAgIFxuICAgIHNlbGYuc2V0UHNldWRva25vdFN0cmVuZ3RoID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHNlbGYubGlua1N0cmVuZ3Rocy5wc2V1ZG9rbm90ID0gdmFsdWU7XG4gICAgICBzZWxmLnVwZGF0ZSgpO1xuICAgIH07XG4gICAgXG4gICAgc2VsZi5kaXNwbGF5QmFja2dyb3VuZCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBzZWxmLmRpc3BsYXlQYXJhbWV0ZXJzLmRpc3BsYXlCYWNrZ3JvdW5kID0gdmFsdWU7XG4gICAgICBzZWxmLnVwZGF0ZVN0eWxlKCk7XG4gICAgfTtcbiAgICBcbiAgICBzZWxmLmRpc3BsYXlOdW1iZXJpbmcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgc2VsZi5kaXNwbGF5UGFyYW1ldGVycy5kaXNwbGF5TnVtYmVyaW5nID0gdmFsdWU7XG4gICAgICBzZWxmLnVwZGF0ZVN0eWxlKCk7XG4gICAgfTtcblxuICAgIHNlbGYuZGlzcGxheU5vZGVPdXRsaW5lID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHNlbGYuZGlzcGxheVBhcmFtZXRlcnMuZGlzcGxheU5vZGVPdXRsaW5lID0gdmFsdWU7XG4gICAgICBzZWxmLnVwZGF0ZVN0eWxlKCk7XG4gICAgfTtcbiAgICBcbiAgICBzZWxmLmRpc3BsYXlOb2RlTGFiZWwgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgc2VsZi5kaXNwbGF5UGFyYW1ldGVycy5kaXNwbGF5Tm9kZUxhYmVsID0gdmFsdWU7XG4gICAgICBzZWxmLnVwZGF0ZVN0eWxlKCk7XG4gICAgfTtcbiAgICBcbiAgICBzZWxmLmRpc3BsYXlMaW5rcyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBzZWxmLmRpc3BsYXlQYXJhbWV0ZXJzLmRpc3BsYXlMaW5rcyA9IHZhbHVlO1xuICAgICAgc2VsZi51cGRhdGVTdHlsZSgpO1xuICAgIH07XG5cbiAgICBzZWxmLmRpc3BsYXlQc2V1ZG9rbm90TGlua3MgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgc2VsZi5kaXNwbGF5UGFyYW1ldGVycy5kaXNwbGF5UHNldWRva25vdExpbmtzID0gdmFsdWU7XG4gICAgICBzZWxmLnVwZGF0ZVN0eWxlKCk7XG4gICAgfTtcblxuICAgIHNlbGYuZGlzcGxheVByb3RlaW5MaW5rcyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBzZWxmLmRpc3BsYXlQYXJhbWV0ZXJzLmRpc3BsYXlQcm90ZWluTGlua3MgPSB2YWx1ZTtcbiAgICAgIHNlbGYudXBkYXRlU3R5bGUoKTtcbiAgICB9O1xuICAgIFxuICAgIHNlbGYudXBkYXRlU3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gQmFja2dyb3VuZFxuICAgICAgICAvL3JlY3QuY2xhc3NlZCgndHJhbnNwYXJlbnQnLCAhc2VsZi5kaXNwbGF5UGFyYW1ldGVycy5kaXNwbGF5QmFja2dyb3VuZCk7XG4gICAgICAgIC8vIE51bWJlcmluZ1xuICAgICAgICB2aXNOb2Rlcy5zZWxlY3RBbGwoJ1tub2RlX3R5cGU9bGFiZWxdJykuY2xhc3NlZCgndHJhbnNwYXJlbnQnLCAhc2VsZi5kaXNwbGF5UGFyYW1ldGVycy5kaXNwbGF5TnVtYmVyaW5nKTtcbiAgICAgICAgdmlzTm9kZXMuc2VsZWN0QWxsKCdbbGFiZWxfdHlwZT1sYWJlbF0nKS5jbGFzc2VkKCd0cmFuc3BhcmVudCcsICFzZWxmLmRpc3BsYXlQYXJhbWV0ZXJzLmRpc3BsYXlOdW1iZXJpbmcpO1xuICAgICAgICB2aXNMaW5rcy5zZWxlY3RBbGwoJ1tsaW5rVHlwZT1sYWJlbF9saW5rXScpLmNsYXNzZWQoJ3RyYW5zcGFyZW50JywgIXNlbGYuZGlzcGxheVBhcmFtZXRlcnMuZGlzcGxheU51bWJlcmluZyk7XG4gICAgICAgIC8vIE5vZGUgT3V0bGluZVxuICAgICAgICBzdmcuc2VsZWN0QWxsKCdjaXJjbGUnKS5jbGFzc2VkKCdoaWRkZW5fb3V0bGluZScsICFzZWxmLmRpc3BsYXlQYXJhbWV0ZXJzLmRpc3BsYXlOb2RlT3V0bGluZSk7XG4gICAgICAgIC8vIE5vZGUgTGFiZWxzXG4gICAgICAgIHZpc05vZGVzLnNlbGVjdEFsbCgnW2xhYmVsX3R5cGU9bnVjbGVvdGlkZV0nKS5jbGFzc2VkKCd0cmFuc3BhcmVudCcsICFzZWxmLmRpc3BsYXlQYXJhbWV0ZXJzLmRpc3BsYXlOb2RlTGFiZWwpO1xuICAgICAgICAvLyBMaW5rc1xuICAgICAgICBzdmcuc2VsZWN0QWxsKCdbbGlua190eXBlPXJlYWxdLFtsaW5rX3R5cGU9YmFzZXBhaXJdLFtsaW5rX3R5cGU9YmFja2JvbmVdLFtsaW5rX3R5cGU9cHNldWRva25vdF0sW2xpbmtfdHlwZT1wcm90ZWluX2NoYWluXSxbbGlua190eXBlPWNoYWluX2NoYWluXSxbbGlua190eXBlPWV4dGVybmFsXScpLmNsYXNzZWQoJ3RyYW5zcGFyZW50JywgIXNlbGYuZGlzcGxheVBhcmFtZXRlcnMuZGlzcGxheUxpbmtzKTtcbiAgICAgICAgLy8gUHNldWRva25vdCBMaW5rc1xuICAgICAgICBzdmcuc2VsZWN0QWxsKCdbbGlua190eXBlPXBzZXVkb2tub3RdJykuY2xhc3NlZCgndHJhbnNwYXJlbnQnLCAhc2VsZi5kaXNwbGF5UGFyYW1ldGVycy5kaXNwbGF5UHNldWRva25vdExpbmtzKTtcbiAgICAgICAgLy8gUHJvdGVpbiBMaW5rc1xuICAgICAgICBzdmcuc2VsZWN0QWxsKCdbbGlua190eXBlPXByb3RlaW5fY2hhaW5dJykuY2xhc3NlZCgndHJhbnNwYXJlbnQnLCAhc2VsZi5kaXNwbGF5UGFyYW1ldGVycy5kaXNwbGF5UHJvdGVpbkxpbmtzKTtcbiAgICAgICAgLy8gRmFrZSBMaW5rc1xuICAgICAgICB2aXNMaW5rcy5zZWxlY3RBbGwoJ1tsaW5rX3R5cGU9ZmFrZV0nKS5jbGFzc2VkKCd0cmFuc3BhcmVudCcsICFzZWxmLm9wdGlvbnMuZGlzcGxheUFsbExpbmtzKTtcbiAgICAgICAgdmlzTGlua3Muc2VsZWN0QWxsKCdbbGlua190eXBlPWZha2VfZmFrZV0nKS5jbGFzc2VkKCd0cmFuc3BhcmVudCcsICFzZWxmLm9wdGlvbnMuZGlzcGxheUFsbExpbmtzKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbnVkZ2UoZHgsIGR5KSB7XG4gICAgICAgIG5vZGUuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuc2VsZWN0ZWQ7IH0pXG4gICAgICAgIC5hdHRyKCdjeCcsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQueCArPSBkeDsgfSlcbiAgICAgICAgLmF0dHIoJ2N5JywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC55ICs9IGR5OyB9KTtcblxuICAgICAgICBsaW5rLmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkLnNvdXJjZS5zZWxlY3RlZDsgfSlcbiAgICAgICAgLmF0dHIoJ3gxJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zb3VyY2UueDsgfSlcbiAgICAgICAgLmF0dHIoJ3kxJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zb3VyY2UueTsgfSk7XG5cbiAgICAgICAgbGluay5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC50YXJnZXQuc2VsZWN0ZWQ7IH0pXG4gICAgICAgIC5hdHRyKCd4MicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudGFyZ2V0Lng7IH0pXG4gICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudGFyZ2V0Lnk7IH0pO1xuXG4gICAgICAgIGQzLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgc2VsZi5jcmVhdGVOZXdMaW5rcyA9IGZ1bmN0aW9uKGxpbmtzRW50ZXIpIHtcbiAgICAgICAgdmFyIGxpbmtMaW5lcyA9IGxpbmtzRW50ZXIuYXBwZW5kKCdzdmc6bGluZScpO1xuXG4gICAgICAgIGxpbmtMaW5lcy5hcHBlbmQoJ3N2Zzp0aXRsZScpXG4gICAgICAgIC50ZXh0KGxpbmtLZXkpO1xuXG4gICAgICAgIGxpbmtMaW5lc1xuICAgICAgICAuY2xhc3NlZCgnbGluaycsIHRydWUpXG4gICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuc291cmNlLng7IH0pXG4gICAgICAgIC5hdHRyKCd5MScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuc291cmNlLnk7IH0pXG4gICAgICAgIC5hdHRyKCd4MicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudGFyZ2V0Lng7IH0pXG4gICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudGFyZ2V0Lnk7IH0pXG4gICAgICAgIC5hdHRyKCdsaW5rX3R5cGUnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLmxpbmtUeXBlOyB9IClcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2NsYXNzJykgKyAnICcgKyBkLmxpbmtUeXBlOyB9KVxuICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCBmdW5jdGlvbihkKSB7IGlmIChkLmxpbmtUeXBlID09ICdmYWtlJykgcmV0dXJuICdub25lJzsgZWxzZSByZXR1cm4gJ2FsbCc7fSk7XG5cbiAgICAgICAgLyogV2UgZG9uJ3QgbmVlZCB0byB1cGRhdGUgdGhlIHBvc2l0aW9ucyBvZiB0aGUgc3RhYmlsaXppbmcgbGlua3MgKi9cbiAgICAgICAgLypcbiAgICAgICAgYmFzZXBhaXJMaW5rcyA9IHZpc0xpbmtzLnNlbGVjdEFsbCgnW2xpbmtfdHlwZT1iYXNlcGFpcl0nKTtcbiAgICAgICAgYmFzZXBhaXJMaW5rcy5jbGFzc2VkKCdiYXNlcGFpcicsIHRydWUpO1xuXG4gICAgICAgIGZha2VMaW5rcyA9IHZpc0xpbmtzLnNlbGVjdEFsbCgnW2xpbmtfdHlwZT1mYWtlXScpXG4gICAgICAgIGZha2VMaW5rcy5jbGFzc2VkKCdmYWtlJywgdHJ1ZSk7XG5cbiAgICAgICAgaW50ZXJtb2xlY3VsZV9saW5rcyA9IHZpc19saW5rcy5zZWxlY3RBbGwoJ1tsaW5rX3R5cGU9aW50ZXJtb2xlY3VsZV0nKTtcbiAgICAgICAgaW50ZXJtb2xlY3VsZV9saW5rcy5jbGFzc2VkKCdpbnRlcm1vbGVjdWxlJywgdHJ1ZSk7XG5cbiAgICAgICAgcGxpbmsgPSB2aXNfbGlua3Muc2VsZWN0QWxsKCdbbGlua190eXBlPXByb3RlaW5fY2hhaW5dLFtsaW5rX3R5cGU9Y2hhaW5fY2hhaW5dJyk7XG4gICAgICAgIHBsaW5rLmNsYXNzZWQoJ2NoYWluX2NoYWluJywgdHJ1ZSk7XG4gICAgICAgICovXG5cbiAgICAgICByZXR1cm4gbGlua0xpbmVzO1xuICAgIH07XG5cbiAgICBzZWxmLmNyZWF0ZU5ld05vZGVzID0gZnVuY3Rpb24oZ25vZGVzRW50ZXIpIHtcbiAgICAgICAgZ25vZGVzRW50ZXIgPSBnbm9kZXNFbnRlci5hcHBlbmQoJ2cnKVxuICAgICAgICAuY2xhc3NlZCgnbm9zZWxlY3QnLCB0cnVlKVxuICAgICAgICAuY2xhc3NlZCgnZ25vZGUnLCB0cnVlKVxuICAgICAgICAuYXR0cignc3RydWN0X25hbWUnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnN0cnVjdE5hbWU7IH0pXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7IFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkLnggIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGQueSAhPSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgW2QueCwgZC55XSArICcpJzsgXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9KVxuICAgICAgICAuZWFjaCggZnVuY3Rpb24oZCkgeyBkLnNlbGVjdGVkID0gZC5wcmV2aW91c2x5U2VsZWN0ZWQgPSBmYWxzZTsgfSk7XG5cbiAgICAgICAgZ25vZGVzRW50ZXJcbiAgICAgICAgLmNhbGwoZHJhZylcbiAgICAgICAgLm9uKCdtb3VzZWRvd24nLCBub2RlTW91c2Vkb3duKVxuICAgICAgICAub24oJ21vdXNlZHJhZycsIGZ1bmN0aW9uKGQpIHt9KVxuICAgICAgICAub24oJ21vdXNldXAnLCBub2RlTW91c2V1cClcbiAgICAgICAgLmF0dHIoJ251bScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuICduJyArIGQubnVtOyB9KVxuICAgICAgICAuYXR0cigncm51bScsIGZ1bmN0aW9uKGQpIHsgXG4gICAgICAgICAgICByZXR1cm4gJ24nICsgKGQucm5hLnJuYUxlbmd0aCAtIGQubnVtICsgMSk7IH0pXG4gICAgICAgIC5vbignY2xpY2snLCBub2RlTW91c2VjbGljaylcbiAgICAgICAgLm9uKCdjb250ZXh0bWVudScsIHNlbGYubm9kZUNvbnRleHRNZW51KVxuICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgIC5kdXJhdGlvbig3NTApXG4gICAgICAgIC5lYXNlKCdlbGFzdGljJyk7XG5cbiAgICAgICAgLy8gY3JlYXRlIG5vZGVzIGJlaGluZCB0aGUgY2lyY2xlcyB3aGljaCB3aWxsIHNlcnZlIHRvIGhpZ2hsaWdodCB0aGVtXG4gICAgICAgIHZhciBsYWJlbEFuZFByb3RlaW5Ob2RlcyA9IGdub2Rlc0VudGVyLmZpbHRlcihmdW5jdGlvbihkKSB7IFxuICAgICAgICAgICAgcmV0dXJuIGQubm9kZVR5cGUgPT0gJ2xhYmVsJyB8fCBkLm5vZGVUeXBlID09ICdwcm90ZWluJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG51Y2xlb3RpZGVOb2RlcyA9IGdub2Rlc0VudGVyLmZpbHRlcihmdW5jdGlvbihkKSB7IFxuICAgICAgICAgICAgcmV0dXJuIGQubm9kZVR5cGUgPT0gJ251Y2xlb3RpZGUnO1xuICAgICAgICB9KTtcblxuICAgICAgICBsYWJlbEFuZFByb3RlaW5Ob2Rlcy5hcHBlbmQoJ3N2ZzpjaXJjbGUnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnb3V0bGluZV9ub2RlJylcbiAgICAgICAgLmF0dHIoJ3InLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnJhZGl1cysxOyB9KTtcblxuICAgICAgICBudWNsZW90aWRlTm9kZXMuYXBwZW5kKCdzdmc6Y2lyY2xlJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ291dGxpbmVfbm9kZScpXG4gICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5yYWRpdXMrMTsgfSk7XG5cbiAgICAgICAgbGFiZWxBbmRQcm90ZWluTm9kZXMuYXBwZW5kKCdzdmc6Y2lyY2xlJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ25vZGUnKVxuICAgICAgICAuY2xhc3NlZCgnbGFiZWwnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLm5vZGVUeXBlID09ICdsYWJlbCc7IH0pXG4gICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24oZCkgeyBcbiAgICAgICAgICAgIGlmIChkLm5vZGVUeXBlID09ICdtaWRkbGUnKSByZXR1cm4gMDsgXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5yYWRpdXM7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuYXR0cignbm9kZV90eXBlJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5ub2RlVHlwZTsgfSlcbiAgICAgICAgLmF0dHIoJ25vZGVfbnVtJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5udW07IH0pO1xuXG4gICAgICAgIG51Y2xlb3RpZGVOb2Rlcy5hcHBlbmQoJ3N2ZzpjaXJjbGUnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbm9kZScpXG4gICAgICAgIC5hdHRyKCdub2RlX3R5cGUnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLm5vZGVUeXBlOyB9KVxuICAgICAgICAuYXR0cignbm9kZV9udW0nLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLm51bTsgfSlcbiAgICAgICAgLmF0dHIoJ3InLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnJhZGl1czsgfSlcbiAgICAgICAgLmFwcGVuZCgnc3ZnOnRpdGxlJylcbiAgICAgICAgLnRleHQoZnVuY3Rpb24oZCkgeyBcbiAgICAgICAgICAgIGlmIChkLm5vZGVUeXBlID09ICdudWNsZW90aWRlJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0cnVjdE5hbWUgKyAnOicgKyBkLm51bTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBudWNsZW90aWRlTm9kZXMuYXBwZW5kKCdzdmc6cGF0aCcpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdub2RlJylcbiAgICAgICAgLmF0dHIoJ25vZGVfdHlwZScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQubm9kZVR5cGU7IH0pXG4gICAgICAgIC5hdHRyKCdub2RlX251bScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQubnVtOyB9KVxuICAgICAgICAuYXBwZW5kKCdzdmc6dGl0bGUnKVxuICAgICAgICAudGV4dChmdW5jdGlvbihkKSB7IFxuICAgICAgICAgICAgaWYgKGQubm9kZVR5cGUgPT0gJ251Y2xlb3RpZGUnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc3RydWN0TmFtZSArICc6JyArIGQubnVtO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdmFyIGxhYmVsc0VudGVyID0gZ25vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgLnRleHQoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5uYW1lOyB9KVxuICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsIDguMClcbiAgICAgICAgLmF0dHIoJ2ZvbnQtd2VpZ2h0JywgJ2JvbGQnKVxuICAgICAgICAuYXR0cigneScsIDIuNSlcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ25vZGUtbGFiZWwnKVxuICAgICAgICAuYXR0cignbGFiZWxfdHlwZScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQubm9kZVR5cGU7IH0pXG5cbiAgICAgICAgLypcbiAgICAgICAgbGFiZWxzRW50ZXIudGV4dChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5udW07XG4gICAgICAgIH0pO1xuICAgICAgICAqL1xuXG4gICAgICAgIGxhYmVsc0VudGVyLmFwcGVuZCgnc3ZnOnRpdGxlJylcbiAgICAgICAgLnRleHQoZnVuY3Rpb24oZCkgeyBcbiAgICAgICAgICAgIGlmIChkLm5vZGVUeXBlID09ICdudWNsZW90aWRlJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0cnVjdE5hbWUgKyAnOicgKyBkLm51bTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgICAgIHJldHVybiBnbm9kZXNFbnRlcjtcbiAgICB9O1xuXG4gICAgdmFyIG5vZGVUb29sdGlwID0gZnVuY3Rpb24oZCkge1xuICAgICAgICBub2RlVG9vbHRpcHMgPSB7fTtcblxuICAgICAgICBub2RlVG9vbHRpcHMubnVjbGVvdGlkZSA9IGQubnVtO1xuICAgICAgICBub2RlVG9vbHRpcHMubGFiZWwgPSAnJztcbiAgICAgICAgbm9kZVRvb2x0aXBzLnBzZXVkbyA9ICcnO1xuICAgICAgICBub2RlVG9vbHRpcHMubWlkZGxlID0gJyc7XG4gICAgICAgIG5vZGVUb29sdGlwcy5wcm90ZWluID0gZC5zdHJ1Y3ROYW1lO1xuXG4gICAgICAgIHJldHVybiBub2RlVG9vbHRpcHNbZC5ub2RlVHlwZV07XG4gICAgfTtcblxuICAgIHNlbGYudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmZvcmNlLm5vZGVzKHNlbGYuZ3JhcGgubm9kZXMpXG4gICAgICAgIC5saW5rcyhzZWxmLmdyYXBoLmxpbmtzKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChzZWxmLmFuaW1hdGlvbikge1xuICAgICAgICAgIHNlbGYuZm9yY2Uuc3RhcnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhbGxMaW5rcyA9IHZpc0xpbmtzLnNlbGVjdEFsbCgnbGluZS5saW5rJykgXG4gICAgICAgIC5kYXRhKHNlbGYuZ3JhcGgubGlua3MuZmlsdGVyKHJlYWxMaW5rRmlsdGVyKSwgbGlua0tleSk7XG5cbiAgICAgICAgYWxsTGlua3MuYXR0cignY2xhc3MnLCAnJylcbiAgICAgICAgLmNsYXNzZWQoJ2xpbmsnLCB0cnVlKVxuICAgICAgICAuYXR0cignbGlua190eXBlJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5saW5rVHlwZTsgfSApXG4gICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdjbGFzcycpICsgJyAnICsgZC5saW5rVHlwZTsgfSk7XG5cbiAgICAgICAgdmFyIGxpbmtzRW50ZXIgPSBhbGxMaW5rcy5lbnRlcigpO1xuICAgICAgICBzZWxmLmNyZWF0ZU5ld0xpbmtzKGxpbmtzRW50ZXIpO1xuXG4gICAgICAgIGFsbExpbmtzLmV4aXQoKS5yZW1vdmUoKTtcblxuXG4gICAgICAgIHZhciBkb21haW4gPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOV07XG4gICAgICAgIHZhciBjb2xvcnMgPSBkMy5zY2FsZS5jYXRlZ29yeTEwKCkuZG9tYWluKGRvbWFpbik7XG5cbiAgICAgICAgICAgIHZhciBnbm9kZXMgPSB2aXNOb2Rlcy5zZWxlY3RBbGwoJ2cuZ25vZGUnKVxuICAgICAgICAgICAgLmRhdGEoc2VsZi5ncmFwaC5ub2Rlcywgbm9kZUtleSk7XG4gICAgICAgICAgICAvLy5hdHRyKCdwb2ludGVyLWV2ZW50cycsICdhbGwnKTtcblxuICAgICAgICAgICAgdmFyIGdub2Rlc0VudGVyID0gZ25vZGVzLmVudGVyKCk7XG5cbiAgICAgICAgICAgIHNlbGYuY3JlYXRlTmV3Tm9kZXMoZ25vZGVzRW50ZXIpO1xuICAgICAgICAgICAgZ25vZGVzLmV4aXQoKS5yZW1vdmUoKTtcblxuXG4gICAgICAgICAgICAvL2Zha2Vfbm9kZXMgPSBzZWxmLmdyYXBoLm5vZGVzLmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkLm5vZGVUeXBlID09ICdtaWRkbGUnOyB9KTtcbiAgICAgICAgICAgIC8vZmFrZU5vZGVzID0gc2VsZi5ncmFwaC5ub2Rlcy5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gdHJ1ZTsgfSk7XG4gICAgICAgICAgICB2YXIgcmVhbE5vZGVzID0gc2VsZi5ncmFwaC5ub2Rlcy5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5ub2RlVHlwZSA9PSAnbnVjbGVvdGlkZScgfHwgZC5ub2RlVHlwZSA9PSAnbGFiZWwnO30pO1xuXG4gICAgICAgICAgICB2YXIgeGxpbms7XG4gICAgICAgICAgICBpZiAoc2VsZi5kaXNwbGF5RmFrZUxpbmtzKVxuICAgICAgICAgICAgICAgIHhsaW5rID0gYWxsTGlua3M7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgeGxpbmsgPSB2aXNMaW5rcy5zZWxlY3RBbGwoJ1tsaW5rX3R5cGU9cmVhbF0sW2xpbmtfdHlwZT1wc2V1ZG9rbm90XSxbbGlua190eXBlPXByb3RlaW5fY2hhaW5dLFtsaW5rX3R5cGU9Y2hhaW5fY2hhaW5dLFtsaW5rX3R5cGU9bGFiZWxfbGlua10sW2xpbmtfdHlwZT1iYWNrYm9uZV0sW2xpbmtfdHlwZT1iYXNlcGFpcl0sW2xpbmtfdHlwZT1pbnRlcm1vbGVjdWxlXSxbbGlua190eXBlPWV4dGVybmFsXScpO1xuXG4gICAgICAgICAgICB2YXIgcG9zaXRpb247XG5cbiAgICAgICAgICAgIGdub2Rlcy5zZWxlY3RBbGwoJ3BhdGgnKVxuICAgICAgICAgICAgLmVhY2gocG9zaXRpb25BbnlOb2RlKTtcblxuICAgICAgICAgICAgeGxpbmsub24oJ2NsaWNrJywgbGlua0NsaWNrKTtcblxuICAgICAgICAgICAgc2VsZi5mb3JjZS5vbigndGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBxID0gZDMuZ2VvbS5xdWFkdHJlZShyZWFsTm9kZXMpO1xuICAgICAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgICAgICB2YXIgbiA9IHJlYWxOb2Rlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICB3aGlsZSAoKytpIDwgbikgcS52aXNpdChjb2xsaWRlKHJlYWxOb2Rlc1tpXSkpO1xuXG4gICAgICAgICAgICAgICAgeGxpbmsuYXR0cigneDEnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnNvdXJjZS54OyB9KVxuICAgICAgICAgICAgICAgIC5hdHRyKCd5MScsIGZ1bmN0aW9uKGQpIHsgIHJldHVybiBkLnNvdXJjZS55OyB9KVxuICAgICAgICAgICAgICAgIC5hdHRyKCd4MicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudGFyZ2V0Lng7IH0pXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3kyJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC50YXJnZXQueTsgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBUcmFuc2xhdGUgdGhlIGdyb3Vwc1xuICAgICAgICAgICAgICAgIGdub2Rlcy5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7IFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgW2QueCwgZC55XSArICcpJzsgXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBnbm9kZXMuc2VsZWN0KCdwYXRoJylcbiAgICAgICAgICAgICAgICAuZWFjaChwb3NpdGlvbkFueU5vZGUpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2VsZi5mb3JjZS5vbignZW5kJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGdub2Rlcy5zZWxlY3RBbGwoJ1tub2RlX3R5cGU9bnVjbGVvdGlkZV0nKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKGQsaSkgPT4geyBpZiAoaSA9PSAwKSByZXR1cm4gdHJ1ZTsgZWxzZSByZXR1cm4gZmFsc2U7IH0pXG4gICAgICAgICAgICAgICAgLmVhY2goKGQsaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwicG9zXCIsIGQubnVtLCBkLngsIGQueSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCB1aWQgaW4gc2VsZi5ybmFzKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2VsZi5ybmFzW3VpZF0ucGFpcnRhYmxlWzBdOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3B0JywgaSwgc2VsZi5ybmFzW3VpZF0ucGFpcnRhYmxlW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgc2VsZi5jaGFuZ2VDb2xvclNjaGVtZShzZWxmLmNvbG9yU2NoZW1lKTtcblxuICAgICAgICBpZiAoc2VsZi5hbmltYXRpb24pIHtcbiAgICAgICAgICBzZWxmLmZvcmNlLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHNlbGYudXBkYXRlU3R5bGUoKTtcbiAgICB9O1xuICAgIFxuICAgIHNlbGYuc2V0U2l6ZSgpO1xufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKiBFTkQgRk9STkFGICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4iLCJleHBvcnQge0Zvcm5hQ29udGFpbmVyfSBmcm9tICcuL2Zvcm5hYy5qcyc7XG5leHBvcnQge3JuYVBsb3R9IGZyb20gJy4vcm5hcGxvdC5qcyc7XG5leHBvcnQge3JuYVRyZWVtYXB9IGZyb20gJy4vcm5hdHJlZW1hcC5qcyc7XG5cbi8vZXhwb3J0IHtSTkFVdGlsaXRpZXMsIENvbG9yU2NoZW1lfSBmcm9tICcuL3JuYXV0aWxzLmpzJztcbi8vZXhwb3J0IHtQcm90ZWluR3JhcGgsIFJOQUdyYXBoLCBtb2xlY3VsZXNUb0pzb259IGZyb20gJy4vcm5hZ3JhcGguanMnO1xuLy9leHBvcnQge3NpbXBsZVh5Q29vcmRpbmF0ZXN9IGZyb20gJy4vc2ltcGxlcm5hcGxvdC5qcyc7IiwiaW1wb3J0IHtSZWdpb259IGZyb20gJy4vcmVnaW9uLmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIEJhc2UoKSB7XG5cdHRoaXMubWF0ZSA9IG51bGw7XG5cdHRoaXMueCA9IG51bGw7XG4gICAgdGhpcy55ID0gbnVsbDtcblx0dGhpcy5leHRyYWN0ZWQgPSBudWxsO1xuXHR0aGlzLnJlZ2lvbiA9IG5ldyBSZWdpb24oKTtcbn1cblxuQmFzZS5wcm90b3R5cGUuZ2V0TWF0ZSA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLm1hdGU7XG59XG5cbkJhc2UucHJvdG90eXBlLnNldE1hdGUgPSBmdW5jdGlvbihtYXRlKXtcblx0dGhpcy5tYXRlID0gbWF0ZTtcbn1cblxuQmFzZS5wcm90b3R5cGUuZ2V0WCA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLng7XG59XG5cbkJhc2UucHJvdG90eXBlLnNldFggPSBmdW5jdGlvbih4KXtcblx0dGhpcy54ID0geDtcbn1cblxuQmFzZS5wcm90b3R5cGUuZ2V0WSA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLnk7XG59XG5cbkJhc2UucHJvdG90eXBlLnNldFkgPSBmdW5jdGlvbih5KXtcblx0dGhpcy55ID0geTtcbn1cblxuQmFzZS5wcm90b3R5cGUuaXNFeHRyYWN0ZWQgPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5leHRyYWN0ZWQ7XG59XG5cbkJhc2UucHJvdG90eXBlLnNldEV4dHJhY3RlZCA9IGZ1bmN0aW9uKGV4dHJhY3RlZCl7XG5cdHRoaXMuZXh0cmFjdGVkID0gZXh0cmFjdGVkO1xufVxuXG5CYXNlLnByb3RvdHlwZS5nZXRSZWdpb24gPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5yZWdpb247XG59XG5cbkJhc2UucHJvdG90eXBlLnNldFJlZ2lvbiA9IGZ1bmN0aW9uKHJlZ2lvbil7XG5cdHRoaXMucmVnaW9uID0gcmVnaW9uO1xufVxuIiwiaW1wb3J0IHtMb29wfSBmcm9tICcuL2xvb3AuanMnO1xuaW1wb3J0IHtSZWdpb259IGZyb20gJy4vcmVnaW9uLmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIENvbm5lY3Rpb24oKSB7XG5cdHRoaXMubG9vcCA9IG5ldyBMb29wKCk7XG5cdHRoaXMucmVnaW9uID0gbmV3IFJlZ2lvbigpO1xuXHQvLyBTdGFydCBhbmQgZW5kIGZvcm0gdGhlIDFzdCBiYXNlIHBhaXIgb2YgdGhlIHJlZ2lvbi5cblx0dGhpcy5zdGFydCA9IG51bGw7XG4gICAgdGhpcy5lbmQgPSBudWxsO1xuXHR0aGlzLnhyYWQgPSBudWxsO1xuICAgIHRoaXMueXJhZCA9IG51bGw7XG4gICAgdGhpcy5hbmdsZSA9IG51bGw7XG5cdC8vIFRydWUgaWYgc2VnbWVudCBiZXR3ZWVuIHRoaXMgY29ubmVjdGlvbiBhbmQgdGhlXG5cdC8vIG5leHQgbXVzdCBiZSBleHRydWRlZCBvdXQgb2YgdGhlIGNpcmNsZVxuXHR0aGlzLmV4dHJ1ZGVkID0gbnVsbDtcblx0Ly8gVHJ1ZSBpZiB0aGUgZXh0cnVkZWQgc2VnbWVudCBtdXN0IGJlIGRyYXduIGxvbmcuXG5cdHRoaXMuYnJva2VuID0gbnVsbDtcblxuXHR0aGlzLl9pc051bGwgPSBmYWxzZTtcbn1cblxuQ29ubmVjdGlvbi5wcm90b3R5cGUuaXNOdWxsID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMuX2lzTnVsbDtcbn1cblxuQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0TnVsbCA9IGZ1bmN0aW9uKGlzTnVsbCl7XG5cdHRoaXMuX2lzTnVsbCA9IGlzTnVsbDtcbn1cblxuQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TG9vcCA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLmxvb3A7XG59XG5cbkNvbm5lY3Rpb24ucHJvdG90eXBlLnNldExvb3AgPSBmdW5jdGlvbihsb29wKSB7XG5cdHRoaXMubG9vcCA9IGxvb3A7XG59XG5cbkNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFJlZ2lvbiA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLnJlZ2lvbjtcbn1cblxuQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVnaW9uID0gZnVuY3Rpb24ocmVnaW9uKXtcblx0dGhpcy5yZWdpb24gPSByZWdpb247XG59XG5cbkNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXJ0ID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMuc3RhcnQ7XG59XG5cbkNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFN0YXJ0ID0gZnVuY3Rpb24oc3RhcnQpIHtcblx0dGhpcy5zdGFydCA9IHN0YXJ0O1xufVxuXG5Db25uZWN0aW9uLnByb3RvdHlwZS5nZXRFbmQgPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5lbmQ7XG59XG5cbkNvbm5lY3Rpb24ucHJvdG90eXBlLnNldEVuZCA9IGZ1bmN0aW9uKGVuZCl7XG5cdHRoaXMuZW5kID0gZW5kO1xufVxuXG5Db25uZWN0aW9uLnByb3RvdHlwZS5nZXRYcmFkID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMueHJhZDtcbn1cblxuQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0WHJhZCA9IGZ1bmN0aW9uKHhyYWQpe1xuXHR0aGlzLnhyYWQgPSB4cmFkO1xufVxuXG5Db25uZWN0aW9uLnByb3RvdHlwZS5nZXRZcmFkID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMueXJhZDtcbn1cblxuQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0WXJhZCA9IGZ1bmN0aW9uKHlyYWQpIHtcblx0dGhpcy55cmFkID0geXJhZDtcbn1cblxuQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0QW5nbGUgPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5hbmdsZTtcbn1cblxuQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0QW5nbGUgPSBmdW5jdGlvbihhbmdsZSl7XG5cdHRoaXMuYW5nbGUgPSBhbmdsZTtcbn1cblxuQ29ubmVjdGlvbi5wcm90b3R5cGUuaXNFeHRydWRlZCA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLmV4dHJ1ZGVkO1xufVxuXG5Db25uZWN0aW9uLnByb3RvdHlwZS5zZXRFeHRydWRlZCA9IGZ1bmN0aW9uKGV4dHJ1ZGVkKXtcblx0dGhpcy5leHRydWRlZCA9IGV4dHJ1ZGVkO1xufVxuXG5Db25uZWN0aW9uLnByb3RvdHlwZS5pc0Jyb2tlbiA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLmJyb2tlbjtcbn1cblxuQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0QnJva2VuID0gZnVuY3Rpb24oYnJva2VuKXtcblx0dGhpcy5icm9rZW4gPSBicm9rZW47XG59XG4iLCJpbXBvcnQge0Nvbm5lY3Rpb259IGZyb20gJy4vY29ubmVjdGlvbi5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBMb29wKCkge1xuXHR0aGlzLm5jb25uZWN0aW9uID0gbnVsbDtcblx0dGhpcy5jb25uZWN0aW9ucyA9IFtdO1xuXHR0aGlzLl9jb25uZWN0aW9ucyA9IFtdO1xuXHR0aGlzLm51bWJlciA9IG51bGw7XG5cdHRoaXMuZGVwdGggPSBudWxsO1xuXHR0aGlzLm1hcmsgPSBudWxsO1xuXHR0aGlzLnggPSBudWxsO1xuICAgIHRoaXMueSA9IG51bGw7XG4gICAgdGhpcy5yYWRpdXMgPSBudWxsO1xufVxuXG5Mb29wLnByb3RvdHlwZS5nZXROY29ubmVjdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5uY29ubmVjdGlvbjtcbn1cblxuTG9vcC5wcm90b3R5cGUuc2V0TmNvbm5lY3Rpb24gPSBmdW5jdGlvbihuY29ubmVjdGlvbikge1xuXHR0aGlzLm5jb25uZWN0aW9uID0gbmNvbm5lY3Rpb247XG59XG5cbkxvb3AucHJvdG90eXBlLnNldENvbm5lY3Rpb24gPSBmdW5jdGlvbihpLCBjKXtcblx0aWYgKGMgIT0gbnVsbCl7XG5cdFx0dGhpcy5fY29ubmVjdGlvbnNbaV0gPSBjO1xuICAgIH1cblx0ZWxzZSB7XG5cdFx0aWYgKCF0aGlzLl9jb25uZWN0aW9uc1tpXSl7XG5cdFx0XHR0aGlzLl9jb25uZWN0aW9uc1tpXSA9IG5ldyBDb25uZWN0aW9uKCk7XG5cdFx0fVxuXHRcdHRoaXMuX2Nvbm5lY3Rpb25zW2ldLnNldE51bGwodHJ1ZSk7XG5cdH1cbn1cblxuTG9vcC5wcm90b3R5cGUuZ2V0Q29ubmVjdGlvbiA9IGZ1bmN0aW9uKGkpe1xuXHR2YXIgQ29ubmVjdGlvbiA9IHJlcXVpcmUoXCIuL2Nvbm5lY3Rpb25cIik7XG5cdGlmICghdGhpcy5fY29ubmVjdGlvbnNbaV0pe1xuICAgICAgICB0aGlzLl9jb25uZWN0aW9uc1tpXSA9IG5ldyBDb25uZWN0aW9uKCk7XG4gICAgfVxuXHR2YXIgYyA9IHRoaXMuX2Nvbm5lY3Rpb25zW2ldO1xuXHRpZiAoYy5pc051bGwoKSl7XG5cdFx0cmV0dXJuIG51bGw7XG4gICAgfVxuXHRlbHNlIHtcblx0XHRyZXR1cm4gYztcbiAgICB9XG59XG5cbkxvb3AucHJvdG90eXBlLmFkZENvbm5lY3Rpb24gPSBmdW5jdGlvbihpLCBjKXtcblx0dGhpcy5fY29ubmVjdGlvbnMucHVzaChjKTtcbn1cblxuTG9vcC5wcm90b3R5cGUuZ2V0TnVtYmVyID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMubnVtYmVyO1xufVxuXG5Mb29wLnByb3RvdHlwZS5zZXROdW1iZXIgPSBmdW5jdGlvbihudW1iZXIpe1xuXHR0aGlzLm51bWJlciA9IG51bWJlcjtcbn1cblxuTG9vcC5wcm90b3R5cGUuZ2V0RGVwdGggPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5kZXB0aDtcbn1cblxuTG9vcC5wcm90b3R5cGUuc2V0RGVwdGggPSBmdW5jdGlvbihkZXB0aCl7XG5cdHRoaXMuZGVwdGggPSBkZXB0aDtcbn1cblxuTG9vcC5wcm90b3R5cGUuaXNNYXJrID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMubWFyaztcbn1cblxuTG9vcC5wcm90b3R5cGUuc2V0TWFyayA9IGZ1bmN0aW9uKG1hcmspe1xuXHR0aGlzLm1hcmsgPSBtYXJrO1xufVxuXG5Mb29wLnByb3RvdHlwZS5nZXRYID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMueDtcbn1cblxuTG9vcC5wcm90b3R5cGUuc2V0WCA9IGZ1bmN0aW9uKHgpe1xuXHR0aGlzLnggPSB4O1xufVxuXG5Mb29wLnByb3RvdHlwZS5nZXRZID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMueTtcbn1cblxuTG9vcC5wcm90b3R5cGUuc2V0WSA9IGZ1bmN0aW9uKHkpe1xuXHR0aGlzLnkgPSB5O1xufVxuXG5Mb29wLnByb3RvdHlwZS5nZXRSYWRpdXMgPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5yYWRpdXM7XG59XG5cbkxvb3AucHJvdG90eXBlLnNldFJhZGl1cyA9IGZ1bmN0aW9uKHJhZGl1cyl7XG5cdHRoaXMucmFkaXVzID0gcmFkaXVzO1xufVxuIiwiaW1wb3J0IHtSYWRsb29wfSBmcm9tICcuL3JhZGxvb3AuanMnO1xuaW1wb3J0IHtDb25uZWN0aW9ufSBmcm9tICcuL2Nvbm5lY3Rpb24uanMnO1xuaW1wb3J0IHtSZWdpb259IGZyb20gJy4vcmVnaW9uLmpzJztcbmltcG9ydCB7QmFzZX0gZnJvbSAnLi9iYXNlLmpzJztcbmltcG9ydCB7TG9vcH0gZnJvbSAnLi9sb29wLmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIE5BVmlldygpe1xuICAgIHRoaXMuQU5VTSA9IDk5OTkuMDtcblx0dGhpcy5NQVhJVEVSID0gNTAwO1xuXG5cdHRoaXMuYmFzZXMgPSBbXTtcblx0dGhpcy5uYmFzZSA9IG51bGw7XG4gICAgdGhpcy5ucmVnaW9uID0gbnVsbDtcbiAgICB0aGlzLmxvb3BfY291bnQgPSBudWxsO1xuXG5cdHRoaXMucm9vdCA9IG5ldyBMb29wKCk7XG5cdHRoaXMubG9vcHMgPSBbXTtcblxuXHR0aGlzLnJlZ2lvbnMgPSBbXTtcblxuXHR0aGlzLnJscGhlYWQgPSBuZXcgUmFkbG9vcCgpO1xuXG5cdHRoaXMubGVuY3V0ID0gMC44O1xuXHR0aGlzLlJBRElVU19SRURVQ1RJT05fRkFDVE9SID0gMS40O1xuXG5cdC8vIHNob3cgYWxnb3JpdGhtIHN0ZXAgYnkgc3RlcFxuXHR0aGlzLmFuZ2xlaW5jID0gbnVsbDtcblxuXHR0aGlzLl9oID0gbnVsbDtcblxuXHQvLyBwcml2YXRlIGJvb2xlYW4gbm9JdGVyYXRpb25GYWlsdXJlWWV0ID0gdHJ1ZTtcblxuXHR0aGlzLkhFTElYX0ZBQ1RPUiA9IDAuNjtcblx0dGhpcy5CQUNLQk9ORV9ESVNUQU5DRSA9IDI3O1xufVxuXG5OQVZpZXcucHJvdG90eXBlLm5hdmlld194eV9jb29yZGluYXRlcyA9IGZ1bmN0aW9uKHBhaXJfdGFibGUpe1xuICAgIHZhciB4ID0gW107XG5cdHZhciB5ID0gW107XG4gICAgaWYgKHBhaXJfdGFibGUubGVuZ3RoID09PSAwIHx8IHBhaXJfdGFibGVbMF0gPT09IDApe1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgdmFyIGk7XG4gICAgdGhpcy5uYmFzZSA9IHBhaXJfdGFibGVbMF07XG4gICAgdGhpcy5iYXNlcyA9IFtdO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLm5iYXNlICsgMTsgaW5kZXgrKyl7XG4gICAgICAgIHRoaXMuYmFzZXMucHVzaChuZXcgQmFzZSgpKTtcbiAgICB9XG4gICAgdGhpcy5yZWdpb25zID0gW107XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubmJhc2UgKyAxOyBpbmRleCsrKXtcbiAgICAgICAgdGhpcy5yZWdpb25zLnB1c2gobmV3IFJlZ2lvbigpKTtcbiAgICB9XG4gICAgdGhpcy5yZWFkX2luX2Jhc2VzKHBhaXJfdGFibGUpO1xuICAgIHRoaXMucmxwaGVhZCA9IG51bGw7XG4gICAgdGhpcy5maW5kX3JlZ2lvbnMoKTtcbiAgICB0aGlzLmxvb3BfY291bnQgPSAwO1xuICAgIHRoaXMubG9vcHMgPSBbXTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5uYmFzZSArIDE7IGluZGV4Kyspe1xuICAgICAgICB0aGlzLmxvb3BzLnB1c2gobmV3IExvb3AoKSk7XG4gICAgfVxuICAgIHRoaXMuY29uc3RydWN0X2xvb3AoMCk7XG4gICAgdGhpcy5maW5kX2NlbnRyYWxfbG9vcCgpO1xuICAgIHRoaXMudHJhdmVyc2VfbG9vcCh0aGlzLnJvb3QsIG51bGwpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMubmJhc2U7IGkrKyl7XG4gICAgICAgIHgucHVzaCgxMDAgKyB0aGlzLkJBQ0tCT05FX0RJU1RBTkNFICogdGhpcy5iYXNlc1tpICsgMV0uZ2V0WCgpKTtcbiAgICAgICAgeS5wdXNoKDEwMCArIHRoaXMuQkFDS0JPTkVfRElTVEFOQ0UgKiB0aGlzLmJhc2VzW2kgKyAxXS5nZXRZKCkpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIG5iYXNlOiB0aGlzLm5iYXNlLFxuICAgICAgICB4OiB4LFxuICAgICAgICB5OiB5XG4gICAgfVxufVxuXG5OQVZpZXcucHJvdG90eXBlLnJlYWRfaW5fYmFzZXMgPSBmdW5jdGlvbiByZWFkX2luX2Jhc2VzKHBhaXJfdGFibGUpe1xuICAgIHZhciBpID0gbnVsbDtcbiAgICB2YXIgbnBhaXJzID0gbnVsbDtcblxuICAgIC8vIFNldCB1cCBhbiBvcmlnaW4uXG4gICAgdGhpcy5iYXNlcy5wdXNoKG5ldyBCYXNlKCkpO1xuICAgIHRoaXMuYmFzZXNbMF0uc2V0TWF0ZSgwKTtcbiAgICB0aGlzLmJhc2VzWzBdLnNldEV4dHJhY3RlZChmYWxzZSk7XG4gICAgdGhpcy5iYXNlc1swXS5zZXRYKHRoaXMuQU5VTSk7XG4gICAgdGhpcy5iYXNlc1swXS5zZXRZKHRoaXMuQU5VTSk7XG5cbiAgICBmb3IgKG5wYWlycyA9IDAsIGkgPSAxOyBpIDw9IHRoaXMubmJhc2U7IGkrKyl7XG4gICAgICAgIHRoaXMuYmFzZXMucHVzaChuZXcgQmFzZSgpKTtcbiAgICAgICAgdGhpcy5iYXNlc1tpXS5zZXRFeHRyYWN0ZWQoZmFsc2UpO1xuICAgICAgICB0aGlzLmJhc2VzW2ldLnNldFgodGhpcy5BTlVNKTtcbiAgICAgICAgdGhpcy5iYXNlc1tpXS5zZXRZKHRoaXMuQU5VTSk7XG4gICAgICAgIHRoaXMuYmFzZXNbaV0uc2V0TWF0ZShwYWlyX3RhYmxlW2ldKTtcbiAgICAgICAgaWYgKHBhaXJfdGFibGVbaV0gPiBpKVxuICAgICAgICAgICAgbnBhaXJzKys7XG4gICAgfVxuICAgIC8vIG11c3QgaGF2ZSBhdCBsZWFzdCAxIHBhaXIgdG8gYXZvaWQgc2VnZmF1bHRcbiAgICBpZiAobnBhaXJzID09IDApe1xuICAgICAgICB0aGlzLmJhc2VzWzFdLnNldE1hdGUodGhpcy5uYmFzZSk7XG4gICAgICAgIHRoaXMuYmFzZXNbdGhpcy5uYmFzZV0uc2V0TWF0ZSgxKTtcbiAgICB9XG59XG5cbk5BVmlldy5wcm90b3R5cGUuZmluZF9yZWdpb25zID0gZnVuY3Rpb24gZmluZF9yZWdpb25zKCl7XG4gICAgdmFyIGkgPSBudWxsO1xuICAgIHZhciBtYXRlID0gbnVsbDtcbiAgICB2YXIgbmIxID0gbnVsbDtcblxuICAgIG5iMSA9IHRoaXMubmJhc2UgKyAxO1xuICAgIHZhciBtYXJrID0gW107XG4gICAgZm9yIChpID0gMDsgaSA8IG5iMTsgaSsrKXtcbiAgICAgICAgbWFyay5wdXNoKGZhbHNlKTtcbiAgICB9XG4gICAgdGhpcy5ucmVnaW9uID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDw9IHRoaXMubmJhc2U7IGkrKykge1xuICAgICAgICBpZiAoKG1hdGUgPSB0aGlzLmJhc2VzW2ldLmdldE1hdGUoKSkgIT0gMCAmJiAhbWFya1tpXSkge1xuICAgICAgICAgICAgdGhpcy5yZWdpb25zW3RoaXMubnJlZ2lvbl0uc2V0U3RhcnQxKGkpO1xuICAgICAgICAgICAgdGhpcy5yZWdpb25zW3RoaXMubnJlZ2lvbl0uc2V0RW5kMihtYXRlKTtcbiAgICAgICAgICAgIG1hcmtbaV0gPSB0cnVlO1xuICAgICAgICAgICAgbWFya1ttYXRlXSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmJhc2VzW2ldLnNldFJlZ2lvbih0aGlzLnJlZ2lvbnNbdGhpcy5ucmVnaW9uXSk7XG4gICAgICAgICAgICB0aGlzLmJhc2VzW21hdGVdLnNldFJlZ2lvbih0aGlzLnJlZ2lvbnNbdGhpcy5ucmVnaW9uXSk7XG4gICAgICAgICAgICBmb3IgKGkrKywgbWF0ZS0tOyBpIDwgbWF0ZSAmJiB0aGlzLmJhc2VzW2ldLmdldE1hdGUoKSA9PSBtYXRlOyBpKyssIG1hdGUtLSkge1xuICAgICAgICAgICAgICAgIG1hcmtbbWF0ZV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIG1hcmtbaV09IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tpXS5zZXRSZWdpb24odGhpcy5yZWdpb25zW3RoaXMubnJlZ2lvbl0pO1xuICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbbWF0ZV0uc2V0UmVnaW9uKHRoaXMucmVnaW9uc1t0aGlzLm5yZWdpb25dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVnaW9uc1t0aGlzLm5yZWdpb25dLnNldEVuZDEoLS1pKTtcbiAgICAgICAgICAgIHRoaXMucmVnaW9uc1t0aGlzLm5yZWdpb25dLnNldFN0YXJ0MihtYXRlICsgMSk7XG5cbiAgICAgICAgICAgIHRoaXMubnJlZ2lvbisrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5OQVZpZXcucHJvdG90eXBlLmNvbnN0cnVjdF9sb29wID0gZnVuY3Rpb24gY29uc3RydWN0X2xvb3AoaWJhc2Upe1xuICAgIHZhciBpID0gbnVsbDtcbiAgICB2YXIgbWF0ZSA9IG51bGw7XG4gICAgdmFyIHJldGxvb3AgPSBuZXcgTG9vcCgpO1xuICAgIHZhciBscCA9IG5ldyBMb29wKCk7XG4gICAgdmFyIGNwID0gbmV3IENvbm5lY3Rpb24oKTtcbiAgICB2YXIgcnAgPSBuZXcgUmVnaW9uKCk7XG4gICAgdmFyIHJscCA9IG5ldyBSYWRsb29wKCk7XG4gICAgcmV0bG9vcCA9IHRoaXMubG9vcHNbdGhpcy5sb29wX2NvdW50KytdO1xuICAgIHJldGxvb3Auc2V0TmNvbm5lY3Rpb24oMCk7XG4gICAgcmV0bG9vcC5zZXREZXB0aCgwKTtcbiAgICByZXRsb29wLnNldE51bWJlcih0aGlzLmxvb3BfY291bnQpO1xuICAgIHJldGxvb3Auc2V0UmFkaXVzKDAuMCk7XG5cbiAgICBmb3IgKHJscCA9IHRoaXMucmxwaGVhZDsgcmxwICE9IG51bGw7IHJscCA9IHJscC5nZXROZXh0KCkpXG4gICAgICAgIGlmIChybHAuZ2V0TG9vcG51bWJlcigpID09IHRoaXMubG9vcF9jb3VudClcbiAgICAgICAgICAgIHJldGxvb3Auc2V0UmFkaXVzKHJscC5nZXRSYWRpdXMoKSk7XG4gICAgaSA9IGliYXNlO1xuICAgIGRvIHtcbiAgICAgICAgaWYgKChtYXRlID0gdGhpcy5iYXNlc1tpXS5nZXRNYXRlKCkpICE9IDApIHtcbiAgICAgICAgICAgIHJwID0gdGhpcy5iYXNlc1tpXS5nZXRSZWdpb24oKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5iYXNlc1tycC5nZXRTdGFydDEoKV0uaXNFeHRyYWN0ZWQoKSkge1xuICAgICAgICAgICAgICAgIGlmIChpID09IHJwLmdldFN0YXJ0MSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbcnAuZ2V0U3RhcnQxKCldLnNldEV4dHJhY3RlZCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tycC5nZXRFbmQxKCldLnNldEV4dHJhY3RlZCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tycC5nZXRTdGFydDIoKV0uc2V0RXh0cmFjdGVkKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW3JwLmdldEVuZDIoKV0uc2V0RXh0cmFjdGVkKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBscCA9IHRoaXMuY29uc3RydWN0X2xvb3AocnAuZ2V0RW5kMSgpIDwgdGhpcy5uYmFzZSA/IHJwLmdldEVuZDEoKSArIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PSBycC5nZXRTdGFydDIoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW3JwLmdldFN0YXJ0MigpXS5zZXRFeHRyYWN0ZWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbcnAuZ2V0RW5kMigpXS5zZXRFeHRyYWN0ZWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbcnAuZ2V0U3RhcnQxKCldLnNldEV4dHJhY3RlZCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tycC5nZXRFbmQxKCldLnNldEV4dHJhY3RlZCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgbHAgPSB0aGlzLmNvbnN0cnVjdF9sb29wKHJwLmdldEVuZDIoKSA8IHRoaXMubmJhc2UgPyBycC5nZXRFbmQyKCkgKyAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNvbWV0aGluZyB3ZW50IHRlcnJpYmx5IHdyb25nIC4uLi5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldGxvb3Auc2V0TmNvbm5lY3Rpb24ocmV0bG9vcC5nZXROY29ubmVjdGlvbigpICsgMSk7XG4gICAgICAgICAgICAgICAgY3AgPSBuZXcgQ29ubmVjdGlvbigpO1xuICAgICAgICAgICAgICAgIHJldGxvb3Auc2V0Q29ubmVjdGlvbihyZXRsb29wLmdldE5jb25uZWN0aW9uKCkgLSAxLFx0Y3ApO1xuICAgICAgICAgICAgICAgIHJldGxvb3Auc2V0Q29ubmVjdGlvbihyZXRsb29wLmdldE5jb25uZWN0aW9uKCksIG51bGwpO1xuICAgICAgICAgICAgICAgIGNwLnNldExvb3AobHApO1xuICAgICAgICAgICAgICAgIGNwLnNldFJlZ2lvbihycCk7XG4gICAgICAgICAgICAgICAgaWYoaSA9PSBycC5nZXRTdGFydDEoKSkge1xuICAgICAgICAgICAgICAgICAgICBjcC5zZXRTdGFydChycC5nZXRTdGFydDEoKSk7XG4gICAgICAgICAgICAgICAgICAgIGNwLnNldEVuZChycC5nZXRFbmQyKCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNwLnNldFN0YXJ0KHJwLmdldFN0YXJ0MigpKTtcbiAgICAgICAgICAgICAgICAgICAgY3Auc2V0RW5kKHJwLmdldEVuZDEoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNwLnNldEV4dHJ1ZGVkKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBjcC5zZXRCcm9rZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgIGxwLnNldE5jb25uZWN0aW9uKGxwLmdldE5jb25uZWN0aW9uKCkgKyAxKTtcbiAgICAgICAgICAgICAgICBjcCA9IG5ldyBDb25uZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgbHAuc2V0Q29ubmVjdGlvbihscC5nZXROY29ubmVjdGlvbigpIC0gMSwgY3ApO1xuICAgICAgICAgICAgICAgIGxwLnNldENvbm5lY3Rpb24obHAuZ2V0TmNvbm5lY3Rpb24oKSwgbnVsbCk7XG4gICAgICAgICAgICAgICAgY3Auc2V0TG9vcChyZXRsb29wKTtcbiAgICAgICAgICAgICAgICBjcC5zZXRSZWdpb24ocnApO1xuICAgICAgICAgICAgICAgIGlmIChpID09IHJwLmdldFN0YXJ0MSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNwLnNldFN0YXJ0KHJwLmdldFN0YXJ0MigpKTtcbiAgICAgICAgICAgICAgICAgICAgY3Auc2V0RW5kKHJwLmdldEVuZDEoKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY3Auc2V0U3RhcnQocnAuZ2V0U3RhcnQxKCkpO1xuICAgICAgICAgICAgICAgICAgICBjcC5zZXRFbmQocnAuZ2V0RW5kMigpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3Auc2V0RXh0cnVkZWQoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGNwLnNldEJyb2tlbihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpID0gbWF0ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKytpID4gdGhpcy5uYmFzZSlcbiAgICAgICAgICAgIGkgPSAwO1xuICAgIH0gd2hpbGUgKGkgIT0gaWJhc2UpO1xuICAgIHJldHVybiByZXRsb29wO1xufVxuXG5OQVZpZXcucHJvdG90eXBlLmZpbmRfY2VudHJhbF9sb29wID0gZnVuY3Rpb24gZmluZF9jZW50cmFsX2xvb3AoKXtcbiAgICB2YXIgbHAgPSBuZXcgTG9vcCgpO1xuICAgIHZhciBtYXhjb25uID0gbnVsbDtcbiAgICB2YXIgbWF4ZGVwdGggPSBudWxsO1xuICAgIHZhciBpID0gbnVsbDtcblxuICAgIGRldGVybWluZV9kZXB0aHMuYmluZCh0aGlzKSgpO1xuICAgIG1heGNvbm4gPSAwO1xuICAgIG1heGRlcHRoID0gLTE7XG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMubG9vcF9jb3VudDsgaSsrKSB7XG4gICAgICAgIGxwID0gdGhpcy5sb29wc1tpXTtcbiAgICAgICAgaWYgKGxwLmdldE5jb25uZWN0aW9uKCkgPiBtYXhjb25uKSB7XG4gICAgICAgICAgICBtYXhkZXB0aCA9IGxwLmdldERlcHRoKCk7XG4gICAgICAgICAgICBtYXhjb25uID0gbHAuZ2V0TmNvbm5lY3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMucm9vdCA9IGxwO1xuICAgICAgICB9IGVsc2UgaWYgKGxwLmdldERlcHRoKCkgPiBtYXhkZXB0aFxuICAgICAgICAgICAgICAgICYmIGxwLmdldE5jb25uZWN0aW9uKCkgPT0gbWF4Y29ubikge1xuICAgICAgICAgICAgbWF4ZGVwdGggPSBscC5nZXREZXB0aCgpO1xuICAgICAgICAgICAgdGhpcy5yb290ID0gbHA7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRldGVybWluZV9kZXB0aHMoKSB7XG4gICAgdmFyIGxwID0gbmV3IExvb3AoKTtcbiAgICB2YXIgaSA9IG51bGw7XG4gICAgdmFyIGogPSBudWxsO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMubG9vcF9jb3VudDsgaSsrKSB7XG4gICAgICAgIGxwID0gdGhpcy5sb29wc1tpXTtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IHRoaXMubG9vcF9jb3VudDsgaisrKXtcbiAgICAgICAgICAgIHRoaXMubG9vcHNbal0uc2V0TWFyayhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgbHAuc2V0RGVwdGgoZGVwdGgobHApKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRlcHRoKGxwKXtcbiAgICB2YXIgY291bnQgPSBudWxsO1xuICAgIHZhciByZXQgPSBudWxsO1xuICAgIHZhciBkID0gbnVsbDtcblxuICAgIGlmIChscC5nZXROY29ubmVjdGlvbigpIDw9IDEpe1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKGxwLmlzTWFyaygpKXtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBscC5zZXRNYXJrKHRydWUpO1xuICAgIGNvdW50ID0gMDtcbiAgICByZXQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBscC5nZXRDb25uZWN0aW9uKGkpICE9IG51bGw7IGkrKykge1xuICAgICAgICBkID0gZGVwdGgobHAuZ2V0Q29ubmVjdGlvbihpKS5nZXRMb29wKCkpO1xuICAgICAgICBpZiAoZCA+PSAwKSB7XG4gICAgICAgICAgICBpZiAoKytjb3VudCA9PSAxKXtcbiAgICAgICAgICAgICAgICByZXQgPSBkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocmV0ID4gZCl7XG4gICAgICAgICAgICAgICAgcmV0ID0gZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBscC5zZXRNYXJrKGZhbHNlKTtcbiAgICByZXR1cm4gcmV0ICsgMTtcbn1cblxuTkFWaWV3LnByb3RvdHlwZS50cmF2ZXJzZV9sb29wID0gZnVuY3Rpb24gdHJhdmVyc2VfbG9vcChscCwgYW5jaG9yX2Nvbm5lY3Rpb24pe1xuICAgIHZhciB4cywgeXMsIHhlLCB5ZSwgeG4sIHluLCBhbmdsZWluYywgcjtcbiAgICB2YXIgcmFkaXVzLCB4YywgeWMsIHhvLCB5bywgYXN0YXJ0LCBhZW5kLCBhO1xuICAgIHZhciBjcCwgY3BuZXh0LCBhY3AsIGNwcHJldjtcbiAgICB2YXIgaSwgaiwgbiwgaWM7XG4gICAgdmFyIGRhLCBtYXhhbmc7XG4gICAgdmFyIGNvdW50LCBpY3N0YXJ0LCBpY2VuZCwgaWNtaWRkbGUsIGljcm9vdDtcbiAgICB2YXIgZG9uZSwgZG9uZV9hbGxfY29ubmVjdGlvbnMsIHJvb3RlZDtcbiAgICB2YXIgc2lnbjtcbiAgICB2YXIgbWlkeCwgbWlkeSwgbnJ4LCBucnksIG14LCBteSwgdngsIHZ5LCBkb3Rtdiwgbm1pZHgsIG5taWR5O1xuICAgIHZhciBpY3N0YXJ0MSwgaWN1cCwgaWNkb3duLCBpY25leHQsIGRpcmVjdGlvbjtcbiAgICB2YXIgZGFuLCBkeCwgZHksIHJyO1xuICAgIHZhciBjcHgsIGNweSwgY3BuZXh0eCwgY3BuZXh0eSwgY254LCBjbnksIHJjbiwgcmMsIGxueCwgbG55LCBybCwgYWMsIGFjbiwgc3gsIHN5LCBkY3A7XG4gICAgdmFyIGltYXhsb29wID0gMDtcblxuICAgIGFuZ2xlaW5jID0gMiAqIE1hdGguUEkgLyAodGhpcy5uYmFzZSArIDEpO1xuICAgIGFjcCA9IG51bGw7XG4gICAgaWNyb290ID0gLTE7XG4gICAgdmFyIGluZGljZSA9IDA7XG5cbiAgICBmb3IgKGljID0gMDsgKGNwID0gbHAuZ2V0Q29ubmVjdGlvbihpbmRpY2UpKSAhPSBudWxsOyBpbmRpY2UrKywgaWMrKykge1xuICAgICAgICB4cyA9IC1NYXRoLnNpbihhbmdsZWluYyAqIGNwLmdldFN0YXJ0KCkpO1xuICAgICAgICB5cyA9IE1hdGguY29zKGFuZ2xlaW5jICogY3AuZ2V0U3RhcnQoKSk7XG4gICAgICAgIHhlID0gLU1hdGguc2luKGFuZ2xlaW5jICogY3AuZ2V0RW5kKCkpO1xuICAgICAgICB5ZSA9IE1hdGguY29zKGFuZ2xlaW5jICogY3AuZ2V0RW5kKCkpO1xuICAgICAgICB4biA9IHllIC0geXM7XG4gICAgICAgIHluID0geHMgLSB4ZTtcbiAgICAgICAgciA9IE1hdGguc3FydCh4biAqIHhuICsgeW4gKiB5bik7XG4gICAgICAgIGNwLnNldFhyYWQoeG4gLyByKTtcbiAgICAgICAgY3Auc2V0WXJhZCh5biAvIHIpO1xuICAgICAgICBjcC5zZXRBbmdsZShNYXRoLmF0YW4yKHluLCB4bikpO1xuICAgICAgICBpZiAoY3AuZ2V0QW5nbGUoKSA8IDAuMCl7XG4gICAgICAgICAgICBjcC5zZXRBbmdsZShjcC5nZXRBbmdsZSgpICsgMiAqIE1hdGguUEkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbmNob3JfY29ubmVjdGlvbiAhPSBudWxsXG4gICAgICAgICAgICAgICAgJiYgYW5jaG9yX2Nvbm5lY3Rpb24uZ2V0UmVnaW9uKCkgPT0gY3AuZ2V0UmVnaW9uKCkpIHtcbiAgICAgICAgICAgIGFjcCA9IGNwO1xuICAgICAgICAgICAgaWNyb290ID0gaWM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0X3JhZGl1czogd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdGhpcy5kZXRlcm1pbmVfcmFkaXVzKGxwLCB0aGlzLmxlbmN1dCk7XG4gICAgICAgIHJhZGl1cyA9IGxwLmdldFJhZGl1cygpL3RoaXMuUkFESVVTX1JFRFVDVElPTl9GQUNUT1I7XG4gICAgICAgIGlmIChhbmNob3JfY29ubmVjdGlvbiA9PSBudWxsKXtcbiAgICAgICAgICAgIHhjID0geWMgPSAwLjA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB4byA9ICh0aGlzLmJhc2VzW2FjcC5nZXRTdGFydCgpXS5nZXRYKCkgKyB0aGlzLmJhc2VzXG4gICAgICAgICAgICAgICAgICAgIFthY3AuZ2V0RW5kKCldLmdldFgoKSkgLyAyLjA7XG4gICAgICAgICAgICB5byA9ICh0aGlzLmJhc2VzW2FjcC5nZXRTdGFydCgpXS5nZXRZKCkgKyB0aGlzLmJhc2VzXG4gICAgICAgICAgICAgICAgICAgIFthY3AuZ2V0RW5kKCldLmdldFkoKSkgLyAyLjA7XG4gICAgICAgICAgICB4YyA9IHhvIC0gcmFkaXVzICogYWNwLmdldFhyYWQoKTtcbiAgICAgICAgICAgIHljID0geW8gLSByYWRpdXMgKiBhY3AuZ2V0WXJhZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIGNvbnN0cnVjdGlvbiBvZiB0aGUgY29ubmVjdG9ycyB3aWxsIHByb2NlZWQgaW4gYmxvY2tzIG9mXG4gICAgICAgIC8vIGNvbm5lY3RlZCBjb25uZWN0b3JzLCB3aGVyZSBhIGNvbm5lY3RlZCBjb25uZWN0b3IgcGFpcnMgbWVhbnMgdHdvXG4gICAgICAgIC8vIGNvbm5lY3RvcnMgdGhhdCBhcmUgZm9yY2VkIG91dCBvZiB0aGUgZHJhd24gY2lyY2xlIGJlY2F1c2UgdGhleVxuICAgICAgICAvLyBhcmUgdG9vIGNsb3NlIHRvZ2V0aGVyIGluIGFuZ2xlLlxuXG4gICAgICAgIC8vIEZpcnN0LCBmaW5kIHRoZSBzdGFydCBvZiBhIGJsb2NrIG9mIGNvbm5lY3RlZCBjb25uZWN0b3JzXG5cbiAgICAgICAgaWYgKGljcm9vdCA9PSAtMSl7XG4gICAgICAgICAgICBpY3N0YXJ0ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGljc3RhcnQgPSBpY3Jvb3Q7XG4gICAgICAgIH1cbiAgICAgICAgY3AgPSBscC5nZXRDb25uZWN0aW9uKGljc3RhcnQpO1xuICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgIGRvbmUgPSBmYWxzZTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaiA9IGljc3RhcnQgLSAxO1xuICAgICAgICAgICAgaWYgKGogPCAwKXtcbiAgICAgICAgICAgICAgICBqID0gbHAuZ2V0TmNvbm5lY3Rpb24oKSAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjcHByZXYgPSBscC5nZXRDb25uZWN0aW9uKGopO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RlZF9jb25uZWN0aW9uKGNwcHJldiwgY3ApKSB7XG4gICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpY3N0YXJ0ID0gajtcbiAgICAgICAgICAgICAgICBjcCA9IGNwcHJldjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgrK2NvdW50ID4gbHAuZ2V0TmNvbm5lY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgIC8vIEhlcmUgZXZlcnl0aGluZyBpcyBjb25uZWN0ZWQuIEJyZWFrIG9uIG1heGltdW0gYW5ndWxhclxuICAgICAgICAgICAgICAgIC8vIHNlcGFyYXRpb24gYmV0d2VlbiBjb25uZWN0aW9ucy5cbiAgICAgICAgICAgICAgICBtYXhhbmcgPSAtMS4wO1xuICAgICAgICAgICAgICAgIGZvciAoaWMgPSAwOyBpYyA8IGxwLmdldE5jb25uZWN0aW9uKCk7IGljKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaiA9IGljICsgMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGogPj0gbHAuZ2V0TmNvbm5lY3Rpb24oKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBqID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjcCA9IGxwLmdldENvbm5lY3Rpb24oaWMpO1xuICAgICAgICAgICAgICAgICAgICBjcG5leHQgPSBscC5nZXRDb25uZWN0aW9uKGopO1xuICAgICAgICAgICAgICAgICAgICBhYyA9IGNwbmV4dC5nZXRBbmdsZSgpIC0gY3AuZ2V0QW5nbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjIDwgMC4wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjICs9IDIgKiBNYXRoLlBJO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChhYyA+IG1heGFuZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4YW5nID0gYWM7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbWF4bG9vcCA9IGljO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGljZW5kID0gaW1heGxvb3A7XG4gICAgICAgICAgICAgICAgaWNzdGFydCA9IGltYXhsb29wICsgMTtcbiAgICAgICAgICAgICAgICBpZiAoaWNzdGFydCA+PSBscC5nZXROY29ubmVjdGlvbigpKXtcbiAgICAgICAgICAgICAgICAgICAgaWNzdGFydCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNwID0gbHAuZ2V0Q29ubmVjdGlvbihpY2VuZCk7XG4gICAgICAgICAgICAgICAgY3Auc2V0QnJva2VuKHRydWUpO1xuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICghZG9uZSk7XG4gICAgICAgIGRvbmVfYWxsX2Nvbm5lY3Rpb25zID0gZmFsc2U7XG4gICAgICAgIGljc3RhcnQxID0gaWNzdGFydDtcbiAgICAgICAgd2hpbGUgKCFkb25lX2FsbF9jb25uZWN0aW9ucykge1xuICAgICAgICAgICAgY291bnQgPSAwO1xuICAgICAgICAgICAgZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWNlbmQgPSBpY3N0YXJ0O1xuICAgICAgICAgICAgcm9vdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB3aGlsZSAoIWRvbmUpIHtcbiAgICAgICAgICAgICAgICBjcCA9IGxwLmdldENvbm5lY3Rpb24oaWNlbmQpO1xuICAgICAgICAgICAgICAgIGlmIChpY2VuZCA9PSBpY3Jvb3Qpe1xuICAgICAgICAgICAgICAgICAgICByb290ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBqID0gaWNlbmQgKyAxO1xuICAgICAgICAgICAgICAgIGlmIChqID49IGxwLmdldE5jb25uZWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaiA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNwbmV4dCA9IGxwLmdldENvbm5lY3Rpb24oaik7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkX2Nvbm5lY3Rpb24oY3AsIGNwbmV4dCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCsrY291bnQgPj0gbHAuZ2V0TmNvbm5lY3Rpb24oKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpY2VuZCA9IGo7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpY21pZGRsZSA9IHRoaXMuZmluZF9pY19taWRkbGUoaWNzdGFydCwgaWNlbmQsIGFuY2hvcl9jb25uZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICBhY3AsIGxwKTtcbiAgICAgICAgICAgIGljID0gaWN1cCA9IGljZG93biA9IGljbWlkZGxlO1xuICAgICAgICAgICAgZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gMDtcbiAgICAgICAgICAgIHdoaWxlICghZG9uZSkge1xuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGljID0gaWN1cDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWMgPSBpY21pZGRsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGljID0gaWNkb3duO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaWMgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjcCA9IGxwLmdldENvbm5lY3Rpb24oaWMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYW5jaG9yX2Nvbm5lY3Rpb24gPT0gbnVsbCB8fCBhY3AgIT0gY3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzdGFydCA9IGNwLmdldEFuZ2xlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gTWF0aC5hc2luKDEuMCAvIDIuMCAvIHJhZGl1cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWVuZCA9IGNwLmdldEFuZ2xlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgTWF0aC5hc2luKDEuMCAvIDIuMCAvIHJhZGl1cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tjcC5nZXRTdGFydCgpXS5zZXRYKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGMgKyByYWRpdXMgKiBNYXRoLmNvcyhhc3RhcnQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2NwLmdldFN0YXJ0KCldLnNldFkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5YyArIHJhZGl1cyAqIE1hdGguc2luKGFzdGFydCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbY3AuZ2V0RW5kKCldLnNldFgoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4YyArIHJhZGl1cyAqIE1hdGguY29zKGFlbmQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2NwLmdldEVuZCgpXS5zZXRZKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWMgKyByYWRpdXMgKiBNYXRoLnNpbihhZW5kKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaiA9IGljICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiA+PSBscC5nZXROY29ubmVjdGlvbigpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNwID0gbHAuZ2V0Q29ubmVjdGlvbihpYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3BuZXh0ID0gbHAuZ2V0Q29ubmVjdGlvbihqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcHggPSBjcC5nZXRYcmFkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3B5ID0gY3AuZ2V0WXJhZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjID0gKGNwLmdldEFuZ2xlKCkgKyBjcG5leHQuZ2V0QW5nbGUoKSkgLyAyLjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNwLmdldEFuZ2xlKCkgPiBjcG5leHQuZ2V0QW5nbGUoKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjIC09IE1hdGguUEk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNueCA9IE1hdGguY29zKGFjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnkgPSBNYXRoLnNpbihhYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG54ID0gY255O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxueSA9IC1jbng7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGEgPSBjcG5leHQuZ2V0QW5nbGUoKSAtIGNwLmdldEFuZ2xlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhIDwgMC4wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGEgKz0gMiAqIE1hdGguUEk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjcC5pc0V4dHJ1ZGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhIDw9IE1hdGguUEkgLyAyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJsID0gMi4wO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmwgPSAxLjU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJsID0gMS4wO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2NwLmdldEVuZCgpXS5zZXRYKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tjcG5leHQuZ2V0U3RhcnQoKV0uZ2V0WCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgcmwgKiBsbngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbY3AuZ2V0RW5kKCldLnNldFkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2NwbmV4dC5nZXRTdGFydCgpXS5nZXRZKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBybCAqIGxueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tjcC5nZXRTdGFydCgpXS5zZXRYKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tjcC5nZXRFbmQoKV0uZ2V0WCgpICsgY3B5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2NwLmdldFN0YXJ0KCldLnNldFkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2NwLmdldEVuZCgpXS5nZXRZKCkgLSBjcHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqID0gaWMgLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqIDwgMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogPSBscC5nZXROY29ubmVjdGlvbigpIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3AgPSBscC5nZXRDb25uZWN0aW9uKGopO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNwbmV4dCA9IGxwLmdldENvbm5lY3Rpb24oaWMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNwbmV4dHggPSBjcG5leHQuZ2V0WHJhZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNwbmV4dHkgPSBjcG5leHQuZ2V0WXJhZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjID0gKGNwLmdldEFuZ2xlKCkgKyBjcG5leHQuZ2V0QW5nbGUoKSkgLyAyLjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNwLmdldEFuZ2xlKCkgPiBjcG5leHQuZ2V0QW5nbGUoKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjIC09IE1hdGguUEk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNueCA9IE1hdGguY29zKGFjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnkgPSBNYXRoLnNpbihhYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG54ID0gLWNueTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsbnkgPSBjbng7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGEgPSBjcG5leHQuZ2V0QW5nbGUoKSAtIGNwLmdldEFuZ2xlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhIDwgMC4wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGEgKz0gMiAqIE1hdGguUEk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjcC5pc0V4dHJ1ZGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhIDw9IE1hdGguUEkgLyAyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJsID0gMi4wO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmwgPSAxLjU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJsID0gMS4wO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2NwbmV4dC5nZXRTdGFydCgpXS5zZXRYKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tjcC5nZXRFbmQoKV0uZ2V0WCgpICsgcmxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBsbngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbY3BuZXh0LmdldFN0YXJ0KCldLnNldFkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2NwLmdldEVuZCgpXS5nZXRZKCkgKyBybFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGxueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tjcG5leHQuZ2V0RW5kKCldLnNldFgoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2NwbmV4dC5nZXRTdGFydCgpXS5nZXRYKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLSBjcG5leHR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2NwbmV4dC5nZXRFbmQoKV0uc2V0WShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbY3BuZXh0LmdldFN0YXJ0KCldLmdldFkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIGNwbmV4dHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpY2Rvd24gPT0gaWNlbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGljZG93biA9IC0xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGljZG93biA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKytpY2Rvd24gPj0gbHAuZ2V0TmNvbm5lY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljZG93biA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpY3VwID09IGljc3RhcnQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWN1cCA9IC0xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGljdXAgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC0taWN1cCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY3VwID0gbHAuZ2V0TmNvbm5lY3Rpb24oKSAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRvbmUgPSBpY3VwID09IC0xICYmIGljZG93biA9PSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGljbmV4dCA9IGljZW5kICsgMTtcbiAgICAgICAgICAgIGlmIChpY25leHQgPj0gbHAuZ2V0TmNvbm5lY3Rpb24oKSl7XG4gICAgICAgICAgICAgICAgaWNuZXh0ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpY2VuZCAhPSBpY3N0YXJ0XG4gICAgICAgICAgICAgICAgICAgICYmICghKGljc3RhcnQgPT0gaWNzdGFydDEgJiYgaWNuZXh0ID09IGljc3RhcnQxKSkpIHtcblxuICAgICAgICAgICAgICAgIC8vIE1vdmUgdGhlIGJhc2VzIGp1c3QgY29uc3RydWN0ZWQgKG9yIHRoZSByYWRpdXMpIHNvIHRoYXRcbiAgICAgICAgICAgICAgICAvLyB0aGUgYmlzZWN0b3Igb2YgdGhlIGVuZCBwb2ludHMgaXMgcmFkaXVzIGRpc3RhbmNlIGF3YXlcbiAgICAgICAgICAgICAgICAvLyBmcm9tIHRoZSBsb29wIGNlbnRlci5cblxuICAgICAgICAgICAgICAgIGNwID0gbHAuZ2V0Q29ubmVjdGlvbihpY3N0YXJ0KTtcbiAgICAgICAgICAgICAgICBjcG5leHQgPSBscC5nZXRDb25uZWN0aW9uKGljZW5kKTtcbiAgICAgICAgICAgICAgICBkeCA9IHRoaXMuYmFzZXNbY3BuZXh0LmdldEVuZCgpXS5nZXRYKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC0gdGhpcy5iYXNlc1tjcC5nZXRTdGFydCgpXS5nZXRYKCk7XG4gICAgICAgICAgICAgICAgZHkgPSB0aGlzLmJhc2VzW2NwbmV4dC5nZXRFbmQoKV0uZ2V0WSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAtIHRoaXMuYmFzZXNbY3AuZ2V0U3RhcnQoKV0uZ2V0WSgpO1xuICAgICAgICAgICAgICAgIG1pZHggPSB0aGlzLmJhc2VzW2NwLmdldFN0YXJ0KCldLmdldFgoKSArIGR4IC8gMi4wO1xuICAgICAgICAgICAgICAgIG1pZHkgPSB0aGlzLmJhc2VzW2NwLmdldFN0YXJ0KCldLmdldFkoKSArIGR5IC8gMi4wO1xuICAgICAgICAgICAgICAgIHJyID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgICAgICAgICBteCA9IGR4IC8gcnI7XG4gICAgICAgICAgICAgICAgbXkgPSBkeSAvIHJyO1xuICAgICAgICAgICAgICAgIHZ4ID0geGMgLSBtaWR4O1xuICAgICAgICAgICAgICAgIHZ5ID0geWMgLSBtaWR5O1xuICAgICAgICAgICAgICAgIHJyID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgICAgICAgICB2eCAvPSBycjtcbiAgICAgICAgICAgICAgICB2eSAvPSBycjtcbiAgICAgICAgICAgICAgICBkb3RtdiA9IHZ4ICogbXggKyB2eSAqIG15O1xuICAgICAgICAgICAgICAgIG5yeCA9IGRvdG12ICogbXggLSB2eDtcbiAgICAgICAgICAgICAgICBucnkgPSBkb3RtdiAqIG15IC0gdnk7XG4gICAgICAgICAgICAgICAgcnIgPSBNYXRoLnNxcnQobnJ4ICogbnJ4ICsgbnJ5ICogbnJ5KTtcbiAgICAgICAgICAgICAgICBucnggLz0gcnI7XG4gICAgICAgICAgICAgICAgbnJ5IC89IHJyO1xuXG4gICAgICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHdoaWNoIHNpZGUgb2YgdGhlIGJpc2VjdG9yIHRoZSBjZW50ZXIgc2hvdWxkXG4gICAgICAgICAgICAgICAgLy8gYmUuXG5cbiAgICAgICAgICAgICAgICBkeCA9IHRoaXMuYmFzZXNbY3AuZ2V0U3RhcnQoKV0uZ2V0WCgpIC0geGM7XG4gICAgICAgICAgICAgICAgZHkgPSB0aGlzLmJhc2VzW2NwLmdldFN0YXJ0KCldLmdldFkoKSAtIHljO1xuICAgICAgICAgICAgICAgIGFjID0gTWF0aC5hdGFuMihkeSwgZHgpO1xuICAgICAgICAgICAgICAgIGlmIChhYyA8IDAuMCl7XG4gICAgICAgICAgICAgICAgICAgIGFjICs9IDIgKiBNYXRoLlBJO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkeCA9IHRoaXMuYmFzZXNbY3BuZXh0LmdldEVuZCgpXS5nZXRYKCkgLSB4YztcbiAgICAgICAgICAgICAgICBkeSA9IHRoaXMuYmFzZXNbY3BuZXh0LmdldEVuZCgpXS5nZXRZKCkgLSB5YztcbiAgICAgICAgICAgICAgICBhY24gPSBNYXRoLmF0YW4yKGR5LCBkeCk7XG4gICAgICAgICAgICAgICAgaWYgKGFjbiA8IDAuMCl7XG4gICAgICAgICAgICAgICAgICAgIGFjbiArPSAyICogTWF0aC5QSTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFjbiA8IGFjKXtcbiAgICAgICAgICAgICAgICAgICAgYWNuICs9IDIgKiBNYXRoLlBJO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYWNuIC0gYWMgPiBNYXRoLlBJKXtcbiAgICAgICAgICAgICAgICAgICAgc2lnbiA9IC0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2lnbiA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5taWR4ID0geGMgKyBzaWduICogcmFkaXVzICogbnJ4O1xuICAgICAgICAgICAgICAgIG5taWR5ID0geWMgKyBzaWduICogcmFkaXVzICogbnJ5O1xuICAgICAgICAgICAgICAgIGlmIChyb290ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgeGMgLT0gbm1pZHggLSBtaWR4O1xuICAgICAgICAgICAgICAgICAgICB5YyAtPSBubWlkeSAtIG1pZHk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGljID0gaWNzdGFydDs7KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcCA9IGxwLmdldENvbm5lY3Rpb24oaWMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGNwLmdldFN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2ldLnNldFgoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbaV0uZ2V0WCgpICsgbm1pZHggLSBtaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbaV0uc2V0WShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tpXS5nZXRZKCkgKyBubWlkeSAtIG1pZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGNwLmdldEVuZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tpXS5zZXRYKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2ldLmdldFgoKSArIG5taWR4IC0gbWlkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2ldLnNldFkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbaV0uZ2V0WSgpICsgbm1pZHkgLSBtaWR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpYyA9PSBpY2VuZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKytpYyA+PSBscC5nZXROY29ubmVjdGlvbigpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpYyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpY3N0YXJ0ID0gaWNuZXh0O1xuICAgICAgICAgICAgZG9uZV9hbGxfY29ubmVjdGlvbnMgPSBpY3N0YXJ0ID09IGljc3RhcnQxO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaWMgPSAwOyBpYyA8IGxwLmdldE5jb25uZWN0aW9uKCk7IGljKyspIHtcbiAgICAgICAgICAgIGNwID0gbHAuZ2V0Q29ubmVjdGlvbihpYyk7XG4gICAgICAgICAgICBqID0gaWMgKyAxO1xuICAgICAgICAgICAgaWYgKGogPj0gbHAuZ2V0TmNvbm5lY3Rpb24oKSl7XG4gICAgICAgICAgICAgICAgaiA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjcG5leHQgPSBscC5nZXRDb25uZWN0aW9uKGopO1xuICAgICAgICAgICAgZHggPSB0aGlzLmJhc2VzW2NwLmdldEVuZCgpXS5nZXRYKCkgLSB4YztcbiAgICAgICAgICAgIGR5ID0gdGhpcy5iYXNlc1tjcC5nZXRFbmQoKV0uZ2V0WSgpIC0geWM7XG4gICAgICAgICAgICByYyA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICBhYyA9IE1hdGguYXRhbjIoZHksIGR4KTtcbiAgICAgICAgICAgIGlmIChhYyA8IDAuMCl7XG4gICAgICAgICAgICAgICAgYWMgKz0gMiAqIE1hdGguUEk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkeCA9IHRoaXMuYmFzZXNbY3BuZXh0LmdldFN0YXJ0KCldLmdldFgoKSAtIHhjO1xuICAgICAgICAgICAgZHkgPSB0aGlzLmJhc2VzW2NwbmV4dC5nZXRTdGFydCgpXS5nZXRZKCkgLSB5YztcbiAgICAgICAgICAgIHJjbiA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICBhY24gPSBNYXRoLmF0YW4yKGR5LCBkeCk7XG4gICAgICAgICAgICBpZiAoYWNuIDwgMC4wKXtcbiAgICAgICAgICAgICAgICBhY24gKz0gMiAqIE1hdGguUEk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWNuIDwgYWMpe1xuICAgICAgICAgICAgICAgIGFjbiArPSAyICogTWF0aC5QSTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhbiA9IGFjbiAtIGFjO1xuICAgICAgICAgICAgZGNwID0gY3BuZXh0LmdldEFuZ2xlKCkgLSBjcC5nZXRBbmdsZSgpO1xuICAgICAgICAgICAgaWYgKGRjcCA8PSAwLjApe1xuICAgICAgICAgICAgICAgIGRjcCArPSAyICogTWF0aC5QSTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhkYW4gLSBkY3ApID4gTWF0aC5QSSkge1xuICAgICAgICAgICAgICAgIGlmIChjcC5pc0V4dHJ1ZGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXYXJuaW5nIGZyb20gdHJhdmVyc2VfbG9vcC4gTG9vcCBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgbHAuZ2V0TnVtYmVyKCkgKyBcIiBoYXMgY3Jvc3NlZCByZWdpb25zXFxuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICgoY3BuZXh0LmdldFN0YXJ0KCkgLSBjcC5nZXRFbmQoKSkgIT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjcC5zZXRFeHRydWRlZCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWUgc2V0X3JhZGl1czsgLy8gcmVtcGxhY2VtZW50IGR1IGdvdG9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3AuaXNFeHRydWRlZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3RfZXh0cnVkZWRfc2VnbWVudChjcCwgY3BuZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG4gPSBjcG5leHQuZ2V0U3RhcnQoKSAtIGNwLmdldEVuZCgpO1xuICAgICAgICAgICAgICAgIGlmIChuIDwgMCl7XG4gICAgICAgICAgICAgICAgICAgIG4gKz0gdGhpcy5uYmFzZSArIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFuZ2xlaW5jID0gZGFuIC8gbjtcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAxOyBqIDwgbjsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGkgPSBjcC5nZXRFbmQoKSArIGo7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpID4gdGhpcy5uYmFzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpIC09IHRoaXMubmJhc2UgKyAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGEgPSBhYyArIGogKiBhbmdsZWluYztcbiAgICAgICAgICAgICAgICAgICAgcnIgPSByYyArIChyY24gLSByYykgKiAoYSAtIGFjKSAvIGRhbjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tpXS5zZXRYKHhjICsgcnIgKiBNYXRoLmNvcyhhKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbaV0uc2V0WSh5YyArIHJyICogTWF0aC5zaW4oYSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgZm9yIChpYyA9IDA7IGljIDwgbHAuZ2V0TmNvbm5lY3Rpb24oKTsgaWMrKykge1xuICAgICAgICBpZiAoaWNyb290ICE9IGljKSB7XG4gICAgICAgICAgICBjcCA9IGxwLmdldENvbm5lY3Rpb24oaWMpO1xuICAgICAgICAgICAgLy9JTSBIRVJFXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlX3JlZ2lvbihjcCk7XG4gICAgICAgICAgICB0aGlzLnRyYXZlcnNlX2xvb3AoY3AuZ2V0TG9vcCgpLCBjcCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbiA9IDA7XG4gICAgc3ggPSAwLjA7XG4gICAgc3kgPSAwLjA7XG4gICAgZm9yIChpYyA9IDA7IGljIDwgbHAuZ2V0TmNvbm5lY3Rpb24oKTsgaWMrKykge1xuICAgICAgICBqID0gaWMgKyAxO1xuICAgICAgICBpZiAoaiA+PSBscC5nZXROY29ubmVjdGlvbigpKXtcbiAgICAgICAgICAgIGogPSAwO1xuICAgICAgICB9XG4gICAgICAgIGNwID0gbHAuZ2V0Q29ubmVjdGlvbihpYyk7XG4gICAgICAgIGNwbmV4dCA9IGxwLmdldENvbm5lY3Rpb24oaik7XG4gICAgICAgIG4gKz0gMjtcbiAgICAgICAgc3ggKz0gdGhpcy5iYXNlc1tjcC5nZXRTdGFydCgpXS5nZXRYKClcbiAgICAgICAgICAgICAgICArIHRoaXMuYmFzZXNbY3AuZ2V0RW5kKCldLmdldFgoKTtcbiAgICAgICAgc3kgKz0gdGhpcy5iYXNlc1tjcC5nZXRTdGFydCgpXS5nZXRZKClcbiAgICAgICAgICAgICAgICArIHRoaXMuYmFzZXNbY3AuZ2V0RW5kKCldLmdldFkoKTtcbiAgICAgICAgaWYgKCFjcC5pc0V4dHJ1ZGVkKCkpIHtcbiAgICAgICAgICAgIGZvciAoaiA9IGNwLmdldEVuZCgpICsgMTsgaiAhPSBjcG5leHQuZ2V0U3RhcnQoKTsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGogPiB0aGlzLm5iYXNlKXtcbiAgICAgICAgICAgICAgICAgICAgaiAtPSB0aGlzLm5iYXNlICsgMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbisrO1xuICAgICAgICAgICAgICAgIHN4ICs9IHRoaXMuYmFzZXNbal0uZ2V0WCgpO1xuICAgICAgICAgICAgICAgIHN5ICs9IHRoaXMuYmFzZXNbal0uZ2V0WSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGxwLnNldFgoc3ggLyBuKTtcbiAgICBscC5zZXRZKHN5IC8gbik7XG59XG5cbk5BVmlldy5wcm90b3R5cGUuZGV0ZXJtaW5lX3JhZGl1cyA9IGZ1bmN0aW9uIGRldGVybWluZV9yYWRpdXMobHAsIGxlbmN1dCl7XG4gICAgdmFyIG1pbmRpdCwgY2ksIGR0LCBzdW1uLCBzdW1kLCByYWRpdXMsIGRpdDtcbiAgICB2YXIgaSwgaiwgZW5kLCBzdGFydCwgaW1pbmRpdCA9IDA7XG4gICAgdmFyIGNwID0gbmV3IENvbm5lY3Rpb24oKSwgY3BuZXh0ID0gbmV3IENvbm5lY3Rpb24oKTtcbiAgICB2YXIgcnQyXzIgPSAwLjcwNzEwNjg7XG5cbiAgICBkbyB7XG4gICAgICAgIG1pbmRpdCA9IDEuMGUxMDtcbiAgICAgICAgZm9yIChzdW1kID0gMC4wLCBzdW1uID0gMC4wLCBpID0gMDsgaSA8IGxwLmdldE5jb25uZWN0aW9uKCk7IGkrKykge1xuICAgICAgICAgICAgY3AgPSBscC5nZXRDb25uZWN0aW9uKGkpO1xuICAgICAgICAgICAgaiA9IGkgKyAxO1xuICAgICAgICAgICAgaWYgKGogPj0gbHAuZ2V0TmNvbm5lY3Rpb24oKSl7XG4gICAgICAgICAgICAgICAgaiA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjcG5leHQgPSBscC5nZXRDb25uZWN0aW9uKGopO1xuICAgICAgICAgICAgZW5kID0gY3AuZ2V0RW5kKCk7XG4gICAgICAgICAgICBzdGFydCA9IGNwbmV4dC5nZXRTdGFydCgpO1xuICAgICAgICAgICAgaWYgKHN0YXJ0IDwgZW5kKXtcbiAgICAgICAgICAgICAgICBzdGFydCArPSB0aGlzLm5iYXNlICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGR0ID0gY3BuZXh0LmdldEFuZ2xlKCkgLSBjcC5nZXRBbmdsZSgpO1xuICAgICAgICAgICAgaWYgKGR0IDw9IDAuMCl7XG4gICAgICAgICAgICAgICAgZHQgKz0gMiAqIE1hdGguUEk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNwLmlzRXh0cnVkZWQoKSl7XG4gICAgICAgICAgICAgICAgY2kgPSBzdGFydCAtIGVuZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChkdCA8PSBNYXRoLlBJIC8gMil7XG4gICAgICAgICAgICAgICAgICAgIGNpID0gMi4wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2kgPSAxLjU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3VtbiArPSBkdCAqICgxLjAgLyBjaSArIDEuMCk7XG4gICAgICAgICAgICBzdW1kICs9IGR0ICogZHQgLyBjaTtcbiAgICAgICAgICAgIGRpdCA9IGR0IC8gY2k7XG4gICAgICAgICAgICBpZiAoZGl0IDwgbWluZGl0ICYmICFjcC5pc0V4dHJ1ZGVkKCkgJiYgY2kgPiAxLjApIHtcbiAgICAgICAgICAgICAgICBtaW5kaXQgPSBkaXQ7XG4gICAgICAgICAgICAgICAgaW1pbmRpdCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmFkaXVzID0gc3VtbiAvIHN1bWQ7XG4gICAgICAgIGlmIChyYWRpdXMgPCBydDJfMil7XG4gICAgICAgICAgICByYWRpdXMgPSBydDJfMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWluZGl0ICogcmFkaXVzIDwgbGVuY3V0KSB7XG4gICAgICAgICAgICBscC5nZXRDb25uZWN0aW9uKGltaW5kaXQpLnNldEV4dHJ1ZGVkKHRydWUpO1xuICAgICAgICB9XG4gICAgfSB3aGlsZSAobWluZGl0ICogcmFkaXVzIDwgbGVuY3V0KTtcbiAgICBpZiAobHAuZ2V0UmFkaXVzKCkgPiAwLjApe1xuICAgICAgICByYWRpdXMgPSBscC5nZXRSYWRpdXMoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGxwLnNldFJhZGl1cyhyYWRpdXMpO1xuICAgIH1cbn1cblxuTkFWaWV3LnByb3RvdHlwZS5maW5kX2ljX21pZGRsZSA9IGZ1bmN0aW9uIGZpbmRfaWNfbWlkZGxlKGljc3RhcnQsIGljZW5kLCBhbmNob3JfY29ubmVjdGlvbiwgYWNwLCBscCl7XG4gICAgdmFyIGNvdW50LCByZXQsIGljLCBpO1xuICAgIHZhciBkb25lO1xuXG4gICAgY291bnQgPSAwO1xuICAgIHJldCA9IC0xO1xuICAgIGljID0gaWNzdGFydDtcbiAgICBkb25lID0gZmFsc2U7XG4gICAgd2hpbGUgKCFkb25lKSB7XG4gICAgICAgIGlmIChjb3VudCsrID4gbHAuZ2V0TmNvbm5lY3Rpb24oKSAqIDIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSW5maW5pdGUgbG9vcCBpbiAnZmluZF9pY19taWRkbGUnXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbmNob3JfY29ubmVjdGlvbiAhPSBudWxsICYmIGxwLmdldENvbm5lY3Rpb24oaWMpID09IGFjcCkge1xuICAgICAgICAgICAgcmV0ID0gaWM7XG4gICAgICAgIH1cbiAgICAgICAgZG9uZSA9IGljID09IGljZW5kO1xuICAgICAgICBpZiAoKytpYyA+PSBscC5nZXROY29ubmVjdGlvbigpKSB7XG4gICAgICAgICAgICBpYyA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJldCA9PSAtMSkge1xuICAgICAgICBmb3IgKGkgPSAxLCBpYyA9IGljc3RhcnQ7IGkgPCAoY291bnQgKyAxKSAvIDI7IGkrKykge1xuICAgICAgICAgICAgaWYgKCsraWMgPj0gbHAuZ2V0TmNvbm5lY3Rpb24oKSlcbiAgICAgICAgICAgICAgICBpYyA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0ID0gaWM7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59XG5cbk5BVmlldy5wcm90b3R5cGUuY29uc3RydWN0X2V4dHJ1ZGVkX3NlZ21lbnQgPSBmdW5jdGlvbiBjb25zdHJ1Y3RfZXh0cnVkZWRfc2VnbWVudChjcCwgY3BuZXh0KXtcbiAgICB2YXIgYXN0YXJ0LCBhZW5kMSwgYWVuZDIsIGFhdmUsIGR4LCBkeSwgYTEsIGEyLCBhYywgcnIsIGRhLCBkYWM7XG4gICAgdmFyIHN0YXJ0LCBlbmQsIG4sIG5zdGFydCwgbmVuZDtcbiAgICB2YXIgY29sbGlzaW9uO1xuXG4gICAgYXN0YXJ0ID0gY3AuZ2V0QW5nbGUoKTtcbiAgICBhZW5kMiA9IGFlbmQxID0gY3BuZXh0LmdldEFuZ2xlKCk7XG4gICAgaWYgKGFlbmQyIDwgYXN0YXJ0KXtcbiAgICAgICAgYWVuZDIgKz0gMiAqIE1hdGguUEk7XG4gICAgfVxuICAgIGFhdmUgPSAoYXN0YXJ0ICsgYWVuZDIpIC8gMi4wO1xuICAgIHN0YXJ0ID0gY3AuZ2V0RW5kKCk7XG4gICAgZW5kID0gY3BuZXh0LmdldFN0YXJ0KCk7XG4gICAgbiA9IGVuZCAtIHN0YXJ0O1xuICAgIGlmIChuIDwgMCl7XG4gICAgICAgIG4gKz0gdGhpcy5uYmFzZSArIDE7XG4gICAgfVxuICAgIGRhID0gY3BuZXh0LmdldEFuZ2xlKCkgLSBjcC5nZXRBbmdsZSgpO1xuICAgIGlmIChkYSA8IDAuMCkge1xuICAgICAgICBkYSArPSAyICogTWF0aC5QSTtcbiAgICB9XG4gICAgaWYgKG4gPT0gMikge1xuICAgICAgICB0aGlzLmNvbnN0cnVjdF9jaXJjbGVfc2VnbWVudChzdGFydCwgZW5kKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGR4ID0gdGhpcy5iYXNlc1tlbmRdLmdldFgoKSAtIHRoaXMuYmFzZXNbc3RhcnRdLmdldFgoKTtcbiAgICAgICAgZHkgPSB0aGlzLmJhc2VzW2VuZF0uZ2V0WSgpIC0gdGhpcy5iYXNlc1tzdGFydF0uZ2V0WSgpO1xuICAgICAgICByciA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgIGR4IC89IHJyO1xuICAgICAgICBkeSAvPSBycjtcbiAgICAgICAgaWYgKHJyID49IDEuNSAmJiBkYSA8PSBNYXRoLlBJIC8gMikge1xuICAgICAgICAgICAgbnN0YXJ0ID0gc3RhcnQgKyAxO1xuICAgICAgICAgICAgaWYgKG5zdGFydCA+IHRoaXMubmJhc2Upe1xuICAgICAgICAgICAgICAgIG5zdGFydCAtPSB0aGlzLm5iYXNlICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5lbmQgPSBlbmQgLSAxO1xuICAgICAgICAgICAgaWYgKG5lbmQgPCAwKXtcbiAgICAgICAgICAgICAgICBuZW5kICs9IHRoaXMubmJhc2UgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5iYXNlc1tuc3RhcnRdLnNldFgodGhpcy5iYXNlc1tzdGFydF0uZ2V0WCgpICsgMC41ICogZHgpO1xuICAgICAgICAgICAgdGhpcy5iYXNlc1tuc3RhcnRdLnNldFkodGhpcy5iYXNlc1tzdGFydF0uZ2V0WSgpICsgMC41ICogZHkpO1xuICAgICAgICAgICAgdGhpcy5iYXNlc1tuZW5kXS5zZXRYKHRoaXMuYmFzZXNbZW5kXS5nZXRYKCkgLSAwLjUgKiBkeCk7XG4gICAgICAgICAgICB0aGlzLmJhc2VzW25lbmRdLnNldFkodGhpcy5iYXNlc1tlbmRdLmdldFkoKSAtIDAuNSAqIGR5KTtcbiAgICAgICAgICAgIHN0YXJ0ID0gbnN0YXJ0O1xuICAgICAgICAgICAgZW5kID0gbmVuZDtcbiAgICAgICAgfVxuICAgICAgICBkbyB7XG4gICAgICAgICAgICBjb2xsaXNpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY29uc3RydWN0X2NpcmNsZV9zZWdtZW50KHN0YXJ0LCBlbmQpO1xuICAgICAgICAgICAgbnN0YXJ0ID0gc3RhcnQgKyAxO1xuICAgICAgICAgICAgaWYgKG5zdGFydCA+IHRoaXMubmJhc2UpIHtcbiAgICAgICAgICAgICAgICBuc3RhcnQgLT0gdGhpcy5uYmFzZSArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkeCA9IHRoaXMuYmFzZXNbbnN0YXJ0XS5nZXRYKCkgLSB0aGlzLmJhc2VzW3N0YXJ0XS5nZXRYKCk7XG4gICAgICAgICAgICBkeSA9IHRoaXMuYmFzZXNbbnN0YXJ0XS5nZXRZKCkgLSB0aGlzLmJhc2VzW3N0YXJ0XS5nZXRZKCk7XG4gICAgICAgICAgICBhMSA9IE1hdGguYXRhbjIoZHksIGR4KTtcbiAgICAgICAgICAgIGlmIChhMSA8IDAuMCl7XG4gICAgICAgICAgICAgICAgYTEgKz0gMiAqIE1hdGguUEk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYWMgPSBhMSAtIGFzdGFydDtcbiAgICAgICAgICAgIGlmIChkYWMgPCAwLjApe1xuICAgICAgICAgICAgICAgIGRhYyArPSAyICogTWF0aC5QSTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYWMgPiBNYXRoLlBJKXtcbiAgICAgICAgICAgICAgICBjb2xsaXNpb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmVuZCA9IGVuZCAtIDE7XG4gICAgICAgICAgICBpZiAobmVuZCA8IDApe1xuICAgICAgICAgICAgICAgIG5lbmQgKz0gdGhpcy5uYmFzZSArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkeCA9IHRoaXMuYmFzZXNbbmVuZF0uZ2V0WCgpIC0gdGhpcy5iYXNlc1tlbmRdLmdldFgoKTtcbiAgICAgICAgICAgIGR5ID0gdGhpcy5iYXNlc1tuZW5kXS5nZXRZKCkgLSB0aGlzLmJhc2VzW2VuZF0uZ2V0WSgpO1xuICAgICAgICAgICAgYTIgPSBNYXRoLmF0YW4yKGR5LCBkeCk7XG4gICAgICAgICAgICBpZiAoYTIgPCAwLjApe1xuICAgICAgICAgICAgICAgIGEyICs9IDIgKiBNYXRoLlBJO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGFjID0gYWVuZDEgLSBhMjtcbiAgICAgICAgICAgIGlmIChkYWMgPCAwLjApe1xuICAgICAgICAgICAgICAgIGRhYyArPSAyICogTWF0aC5QSTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYWMgPiBNYXRoLlBJKXtcbiAgICAgICAgICAgICAgICBjb2xsaXNpb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbGxpc2lvbikge1xuICAgICAgICAgICAgICAgIGFjID0gdGhpcy5taW5mMihhYXZlLCBhc3RhcnQgKyAwLjUpO1xuICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbbnN0YXJ0XS5zZXRYKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tzdGFydF0uZ2V0WCgpICsgTWF0aC5jb3MoYWMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW25zdGFydF0uc2V0WShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbc3RhcnRdLmdldFkoKSArIE1hdGguc2luKGFjKSk7XG4gICAgICAgICAgICAgICAgc3RhcnQgPSBuc3RhcnQ7XG4gICAgICAgICAgICAgICAgYWMgPSB0aGlzLm1heGYyKGFhdmUsIGFlbmQyIC0gMC41KTtcbiAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW25lbmRdLnNldFgodGhpcy5iYXNlc1tlbmRdLmdldFgoKSArIE1hdGguY29zKGFjKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tuZW5kXS5zZXRZKHRoaXMuYmFzZXNbZW5kXS5nZXRZKCkgKyBNYXRoLnNpbihhYykpO1xuICAgICAgICAgICAgICAgIGVuZCA9IG5lbmQ7XG4gICAgICAgICAgICAgICAgbiAtPSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlIChjb2xsaXNpb24gJiYgbiA+IDEpO1xuICAgIH1cbn1cblxuTkFWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RfY2lyY2xlX3NlZ21lbnQgPSBmdW5jdGlvbiBjb25zdHJ1Y3RfY2lyY2xlX3NlZ21lbnQoc3RhcnQsIGVuZCl7XG4gICAgdmFyIGR4LCBkeSwgcnIsIG1pZHgsIG1pZHksIHhuLCB5biwgbnJ4LCBucnksIG14LCBteSwgYTtcbiAgICB2YXIgbCwgaiwgaTtcblxuICAgIGR4ID0gdGhpcy5iYXNlc1tlbmRdLmdldFgoKSAtIHRoaXMuYmFzZXNbc3RhcnRdLmdldFgoKTtcbiAgICBkeSA9IHRoaXMuYmFzZXNbZW5kXS5nZXRZKCkgLSB0aGlzLmJhc2VzW3N0YXJ0XS5nZXRZKCk7XG4gICAgcnIgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgIGwgPSBlbmQgLSBzdGFydDtcbiAgICBpZiAobCA8IDApe1xuICAgICAgICBsICs9IHRoaXMubmJhc2UgKyAxO1xuICAgIH1cbiAgICBpZiAocnIgPj0gbCkge1xuICAgICAgICBkeCAvPSBycjtcbiAgICAgICAgZHkgLz0gcnI7XG4gICAgICAgIGZvciAoaiA9IDE7IGogPCBsOyBqKyspIHtcbiAgICAgICAgICAgIGkgPSBzdGFydCArIGo7XG4gICAgICAgICAgICBpZiAoaSA+IHRoaXMubmJhc2Upe1xuICAgICAgICAgICAgICAgIGkgLT0gdGhpcy5uYmFzZSArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmJhc2VzW2ldLnNldFgoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbc3RhcnRdLmdldFgoKSArIGR4ICogaiAvIGwpO1xuICAgICAgICAgICAgdGhpcy5iYXNlc1tpXS5zZXRZKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW3N0YXJ0XS5nZXRZKCkgKyBkeSAqIGogLyBsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5maW5kX2NlbnRlcl9mb3JfYXJjKChsIC0gMSksIHJyKTtcbiAgICAgICAgZHggLz0gcnI7XG4gICAgICAgIGR5IC89IHJyO1xuICAgICAgICBtaWR4ID0gdGhpcy5iYXNlc1tzdGFydF0uZ2V0WCgpICsgZHggKiByciAvIDIuMDtcbiAgICAgICAgbWlkeSA9IHRoaXMuYmFzZXNbc3RhcnRdLmdldFkoKSArIGR5ICogcnIgLyAyLjA7XG4gICAgICAgIHhuID0gZHk7XG4gICAgICAgIHluID0gLWR4O1xuICAgICAgICBucnggPSBtaWR4ICsgdGhpcy5faCAqIHhuO1xuICAgICAgICBucnkgPSBtaWR5ICsgdGhpcy5faCAqIHluO1xuICAgICAgICBteCA9IHRoaXMuYmFzZXNbc3RhcnRdLmdldFgoKSAtIG5yeDtcbiAgICAgICAgbXkgPSB0aGlzLmJhc2VzW3N0YXJ0XS5nZXRZKCkgLSBucnk7XG4gICAgICAgIHJyID0gTWF0aC5zcXJ0KG14ICogbXggKyBteSAqIG15KTtcbiAgICAgICAgYSA9IE1hdGguYXRhbjIobXksIG14KTtcbiAgICAgICAgZm9yIChqID0gMTsgaiA8IGw7IGorKykge1xuICAgICAgICAgICAgaSA9IHN0YXJ0ICsgajtcbiAgICAgICAgICAgIGlmIChpID4gdGhpcy5uYmFzZSl7XG4gICAgICAgICAgICAgICAgaSAtPSB0aGlzLm5iYXNlICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYmFzZXNbaV0uc2V0WChucnggKyByciAqIE1hdGguY29zKGEgKyBqICogdGhpcy5hbmdsZWluYykpO1xuICAgICAgICAgICAgdGhpcy5iYXNlc1tpXS5zZXRZKG5yeSArIHJyICogTWF0aC5zaW4oYSArIGogKiB0aGlzLmFuZ2xlaW5jKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbk5BVmlldy5wcm90b3R5cGUuZmluZF9jZW50ZXJfZm9yX2FyYyA9IGZ1bmN0aW9uIGZpbmRfY2VudGVyX2Zvcl9hcmMobiwgYil7XG4gICAgdmFyIGgsIGhoaSwgaGxvdywgciwgZGlzYywgdGhldGEsIGUsIHBoaTtcbiAgICB2YXIgaXRlcjtcblxuICAgIGhoaSA9IChuICsgMS4wKSAvIE1hdGguUEk7XG4gICAgLy8gY2hhbmdlZCB0byBwcmV2ZW50IGRpdiBieSB6ZXJvIGlmIChpaClcbiAgICBobG93ID0gLWhoaSAtIGIgLyAobiArIDEuMDAwMDAxIC0gYik7XG4gICAgaWYgKGIgPCAxKXtcbiAgICAgICAgLy8gb3RoZXJ3aXNlIHdlIG1pZ2h0IGZhaWwgYmVsb3cgKGloKVxuICAgICAgICBobG93ID0gMDtcbiAgICB9XG4gICAgaXRlciA9IDA7XG4gICAgZG8ge1xuICAgICAgICBoID0gKGhoaSArIGhsb3cpIC8gMi4wO1xuICAgICAgICByID0gTWF0aC5zcXJ0KGggKiBoICsgYiAqIGIgLyA0LjApO1xuICAgICAgICBkaXNjID0gMS4wIC0gMC41IC8gKHIgKiByKTtcbiAgICAgICAgaWYgKE1hdGguYWJzKGRpc2MpID4gMS4wKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVuZXhwZWN0ZWQgbGFyZ2UgbWFnbml0dWRlIGRpc2NyaW1pbmFudCA9IFwiICsgZGlzY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCIgXCIgKyByKTtcbiAgICAgICAgfVxuICAgICAgICB0aGV0YSA9IE1hdGguYWNvcyhkaXNjKTtcbiAgICAgICAgcGhpID0gTWF0aC5hY29zKGggLyByKTtcbiAgICAgICAgZSA9IHRoZXRhICogKG4gKyAxKSArIDIgKiBwaGkgLSAyICogTWF0aC5QSTtcbiAgICAgICAgaWYgKGUgPiAwLjApIHtcbiAgICAgICAgICAgIGhsb3cgPSBoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaGhpID0gaDtcbiAgICAgICAgfVxuICAgIH0gd2hpbGUgKE1hdGguYWJzKGUpID4gMC4wMDAxICYmICsraXRlciA8IHRoaXMuTUFYSVRFUik7XG4gICAgaWYgKGl0ZXIgPj0gdGhpcy5NQVhJVEVSKSB7XG4gICAgICAgIGlmIChub0l0ZXJhdGlvbkZhaWx1cmVZZXQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSXRlcmF0aW9uIGZhaWxlZCBpbiBmaW5kX2NlbnRlcl9mb3JfYXJjXCIpO1xuICAgICAgICAgICAgbm9JdGVyYXRpb25GYWlsdXJlWWV0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaCA9IDAuMDtcbiAgICAgICAgdGhldGEgPSAwLjA7XG4gICAgfVxuICAgIHRoaXMuX2ggPSBoO1xuICAgIHRoaXMuYW5nbGVpbmMgPSB0aGV0YTtcbn1cblxuTkFWaWV3LnByb3RvdHlwZS5nZW5lcmF0ZV9yZWdpb24gPSBmdW5jdGlvbiBnZW5lcmF0ZV9yZWdpb24oY3Ape1xuICAgIHZhciBsLCBzdGFydCwgZW5kLCBpLCBtYXRlO1xuICAgIHZhciBycDtcblxuICAgIHJwID0gY3AuZ2V0UmVnaW9uKCk7XG4gICAgbCA9IDA7XG4gICAgaWYgKGNwLmdldFN0YXJ0KCkgPT0gcnAuZ2V0U3RhcnQxKCkpIHtcbiAgICAgICAgc3RhcnQgPSBycC5nZXRTdGFydDEoKTtcbiAgICAgICAgZW5kID0gcnAuZ2V0RW5kMSgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc3RhcnQgPSBycC5nZXRTdGFydDIoKTtcbiAgICAgICAgZW5kID0gcnAuZ2V0RW5kMigpO1xuICAgIH1cbiAgICBpZiAodGhpcy5iYXNlc1tjcC5nZXRTdGFydCgpXS5nZXRYKCkgPiB0aGlzLkFOVU0gLSAxMDAuMFxuICAgICAgICAgICAgfHwgdGhpcy5iYXNlc1tjcC5nZXRFbmQoKV0uZ2V0WCgpID4gdGhpcy5BTlVNIC0gMTAwLjApIHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgXCJCYWQgcmVnaW9uIHBhc3NlZCB0byBnZW5lcmF0ZV9yZWdpb24uIENvb3JkaW5hdGVzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICB9XG4gICAgZm9yIChpID0gc3RhcnQgKyAxOyBpIDw9IGVuZDsgaSsrKSB7XG4gICAgICAgIGwrKztcbiAgICAgICAgdGhpcy5iYXNlc1tpXS5zZXRYKFxuICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbY3AuZ2V0U3RhcnQoKV0uZ2V0WCgpICsgdGhpcy5IRUxJWF9GQUNUT1IgKiBsXG4gICAgICAgICAgICAgICAgICAgICAgICAqIGNwLmdldFhyYWQoKSk7XG4gICAgICAgIHRoaXMuYmFzZXNbaV0uc2V0WShcbiAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2NwLmdldFN0YXJ0KCldLmdldFkoKSArIHRoaXMuSEVMSVhfRkFDVE9SICogbFxuICAgICAgICAgICAgICAgICAgICAgICAgKiBjcC5nZXRZcmFkKCkpO1xuICAgICAgICBtYXRlID0gdGhpcy5iYXNlc1tpXS5nZXRNYXRlKCk7XG4gICAgICAgIHRoaXMuYmFzZXNbbWF0ZV0uc2V0WChcbiAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2NwLmdldEVuZCgpXS5nZXRYKCkgKyB0aGlzLkhFTElYX0ZBQ1RPUiAqIGxcbiAgICAgICAgICAgICAgICAgICAgICAgICogY3AuZ2V0WHJhZCgpKTtcbiAgICAgICAgdGhpcy5iYXNlc1ttYXRlXS5zZXRZKFxuICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbY3AuZ2V0RW5kKCldLmdldFkoKSArIHRoaXMuSEVMSVhfRkFDVE9SICogbFxuICAgICAgICAgICAgICAgICAgICAgICAgKiBjcC5nZXRZcmFkKCkpO1xuXG4gICAgfVxufVxuXG5OQVZpZXcucHJvdG90eXBlLm1pbmYyID0gZnVuY3Rpb24gbWluZjIoeDEsIHgyKSB7XG4gICAgcmV0dXJuICgoeDEpIDwgKHgyKSkgPyAoeDEpIDogKHgyKTtcbn1cblxuTkFWaWV3LnByb3RvdHlwZS5tYXhmMiA9IGZ1bmN0aW9uIG1heGYyKHgxLCB4Mikge1xuICAgIHJldHVybiAoKHgxKSA+ICh4MikpID8gKHgxKSA6ICh4Mik7XG59XG5cbk5BVmlldy5wcm90b3R5cGUuY29ubmVjdGVkX2Nvbm5lY3Rpb24gPSBmdW5jdGlvbiBjb25uZWN0ZWRfY29ubmVjdGlvbihjcCwgY3BuZXh0KSB7XG4gICAgaWYgKGNwLmlzRXh0cnVkZWQoKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY3AuZ2V0RW5kKCkgKyAxID09IGNwbmV4dC5nZXRTdGFydCgpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBSYWRsb29wKCkge1xuXHR0aGlzLnJhZGl1cyA9IG51bGw7XG5cdHRoaXMubG9vcG51bWJlciA9IG51bGw7XG5cdHRoaXMubmV4dCA9IG51bGw7XG4gICAgdGhpcy5wcmV2ID0gbnVsbDtcbn1cblxuUmFkbG9vcC5wcm90b3R5cGUuZ2V0UmFkaXVzID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMucmFkaXVzO1xufVxuXG5SYWRsb29wLnByb3RvdHlwZS5zZXRSYWRpdXMgPSBmdW5jdGlvbihyYWRpdXMpe1xuXHR0aGlzLnJhZGl1cyA9IHJhZGl1cztcbn1cblxuUmFkbG9vcC5wcm90b3R5cGUuZ2V0TG9vcG51bWJlciA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLmxvb3BudW1iZXI7XG59XG5cblJhZGxvb3AucHJvdG90eXBlLnNldExvb3BudW1iZXIgPSBmdW5jdGlvbihsb29wbnVtYmVyKXtcblx0dGhpcy5sb29wbnVtYmVyID0gbG9vcG51bWJlcjtcbn1cblxuUmFkbG9vcC5wcm90b3R5cGUuZ2V0TmV4dCA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLm5leHQ7XG59XG5cblJhZGxvb3AucHJvdG90eXBlLnNldE5leHQgPSBmdW5jdGlvbihuZXh0KXtcblx0dGhpcy5uZXh0ID0gbmV4dDtcbn1cblxuUmFkbG9vcC5wcm90b3R5cGUuZ2V0UHJldiA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLnByZXY7XG59XG5cblJhZGxvb3AucHJvdG90eXBlLnNldFByZXYgPSBmdW5jdGlvbihwcmV2KXtcblx0dGhpcy5wcmV2ID0gcHJldjtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBSZWdpb24oKSB7XG5cdHRoaXMuX3N0YXJ0MSA9IG51bGw7XG4gICAgdGhpcy5fZW5kMSA9IG51bGw7XG4gICAgdGhpcy5fc3RhcnQyID0gbnVsbDtcbiAgICB0aGlzLl9lbmQyID0gbnVsbDtcbn1cblxuUmVnaW9uLnByb3RvdHlwZS5nZXRTdGFydDEgPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5fc3RhcnQxO1xufVxuXG5SZWdpb24ucHJvdG90eXBlLnNldFN0YXJ0MSA9IGZ1bmN0aW9uKHN0YXJ0MSl7XG5cdHRoaXMuX3N0YXJ0MSA9IHN0YXJ0MTtcbn1cblxuUmVnaW9uLnByb3RvdHlwZS5nZXRFbmQxID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMuX2VuZDE7XG59XG5cblJlZ2lvbi5wcm90b3R5cGUuc2V0RW5kMSA9IGZ1bmN0aW9uKGVuZDEpe1xuXHR0aGlzLl9lbmQxID0gZW5kMTtcbn1cblxuUmVnaW9uLnByb3RvdHlwZS5nZXRTdGFydDIgPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5fc3RhcnQyO1xufVxuXG5SZWdpb24ucHJvdG90eXBlLnNldFN0YXJ0MiA9IGZ1bmN0aW9uKHN0YXJ0Mil7XG5cdHRoaXMuX3N0YXJ0MiA9IHN0YXJ0Mjtcbn1cblxuUmVnaW9uLnByb3RvdHlwZS5nZXRFbmQyID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMuX2VuZDI7XG59XG5cblJlZ2lvbi5wcm90b3R5cGUuc2V0RW5kMiA9IGZ1bmN0aW9uKGVuZDIpe1xuXHR0aGlzLl9lbmQyID0gZW5kMjtcbn1cbiIsImltcG9ydCB7YXJyYXlzRXF1YWwsUk5BVXRpbGl0aWVzLHJuYVV0aWxpdGllc30gZnJvbSAnLi9ybmF1dGlscy5qcyc7XG5pbXBvcnQgc2x1Z2lkIGZyb20gJ3NsdWdpZCc7XG5cbnZhciBudW1iZXJTb3J0ID0gZnVuY3Rpb24oYSxiKSB7IHJldHVybiBhIC0gYjsgfTtcblxuaWYgKHR5cGVvZihTdHJpbmcucHJvdG90eXBlLnRyaW0pID09PSAndW5kZWZpbmVkJykge1xuICAgIFN0cmluZy5wcm90b3R5cGUudHJpbSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKHRoaXMpLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUHJvdGVpbkdyYXBoKHN0cnVjdE5hbWUsIHNpemUsIHVpZCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHNlbGYudHlwZSA9ICdwcm90ZWluJztcbiAgICBzZWxmLnNpemUgPSBzaXplO1xuICAgIHNlbGYubm9kZXMgPSBbeyduYW1lJzogJ1AnLFxuICAgICAgICAgICAgICAgICAgICdudW0nOiAxLFxuICAgICAgICAgICAgICAgICAgICdyYWRpdXMnOiAzICogIE1hdGguc3FydChzaXplKSxcbiAgICAgICAgICAgICAgICAgICAncm5hJzogc2VsZixcbiAgICAgICAgICAgICAgICAgICAnbm9kZVR5cGUnOiAncHJvdGVpbicsXG4gICAgICAgICAgICAgICAgICAgJ3N0cnVjdE5hbWUnOiBzdHJ1Y3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICdlbGVtVHlwZSc6ICdwJyxcbiAgICAgICAgICAgICAgICAgICAnc2l6ZSc6IHNpemUsXG4gICAgICAgICAgICAgICAgICAgJ3VpZCc6IHNsdWdpZC5uaWNlKCl9XTtcblxuICAgIHNlbGYubGlua3MgPSBbXTtcbiAgICBzZWxmLnVpZCA9IHNsdWdpZC5uaWNlKCk7XG5cbiAgICBzZWxmLmFkZFVpZHMgPSBmdW5jdGlvbih1aWRzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdWlkcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHNlbGYubm9kZXNbaV0udWlkID0gdWlkc1tpXTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5nZXRVaWRzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8qIEdldCB0aGUgcG9zaXRpb25zIG9mIGVhY2ggbm9kZSBzbyB0aGF0IHRoZXlcbiAgICAgICAgICogY2FuIGJlIHBhc3NlZCB0byBlbGVtZW50c1RvSnNvbiBsYXRlclxuICAgICAgICAgKi9cbiAgICAgICAgdWlkcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYuZG90YnJhY2tldC5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHVpZHMucHVzaChzZWxmLm5vZGVzW2ldLnVpZCk7XG5cbiAgICAgICAgcmV0dXJuIHVpZHM7XG4gICAgfTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gUk5BR3JhcGgoc2VxID0gJycsIGRvdGJyYWNrZXQgPSAnJywgc3RydWN0TmFtZSA9ICcnLCBzdGFydE51bWJlciA9IDEpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBzZWxmLnR5cGUgPSAncm5hJztcbiAgICBzZWxmLmNpcmN1bGFyaXplRXh0ZXJuYWwgPSBmYWxzZTtcbiAgICBzZWxmLnNlcSA9IHNlcTtcbiAgICBzZWxmLmRvdGJyYWNrZXQgPSBkb3RicmFja2V0OyAgLy9pLmUuIC4uKCguLikpLi5cbiAgICBzZWxmLnN0cnVjdE5hbWUgPSBzdHJ1Y3ROYW1lO1xuICAgIHNlbGYuY2lyY3VsYXIgPSBmYWxzZTtcblxuICAgIGlmIChzZWxmLmRvdGJyYWNrZXQuc2xpY2UoLTEpID09ICcqJykge1xuICAgICAgICAvL2NpcmN1bGFyIFJOQVxuICAgICAgICBzZWxmLmRvdGJyYWNrZXQgPSBzZWxmLmRvdGJyYWNrZXQuc2xpY2UoMCwgLTEpO1xuICAgICAgICBzZWxmLmNpcmN1bGFyID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzZWxmLnVpZCA9IHNsdWdpZC5uaWNlKCk7XG5cbiAgICBzZWxmLmVsZW1lbnRzID0gW107ICAgICAgICAgICAgLy9zdG9yZSB0aGUgZWxlbWVudHMgYW5kIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL251Y2xlb3RpZGVzIHRoZXkgY29udGFpblxuICAgIHNlbGYucHNldWRva25vdFBhaXJzID0gW107XG4gICAgc2VsZi5udWNzVG9Ob2RlcyA9IHt9O1xuXG4gICAgc2VsZi5hZGRVaWRzID0gZnVuY3Rpb24odWlkcykge1xuICAgICAgICBsZXQgbnVjbGVvdGlkZU5vZGVzID0gc2VsZi5ub2Rlcy5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5ub2RlVHlwZSA9PSAnbnVjbGVvdGlkZSc7IH0pO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdWlkcy5sZW5ndGggJiYgaSA8IG51Y2xlb3RpZGVOb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbnVjbGVvdGlkZU5vZGVzW2ldLnVpZCA9IHVpZHNbaV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5jb21wdXRlUGFpcnRhYmxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYucGFpcnRhYmxlID0gcm5hVXRpbGl0aWVzLmRvdGJyYWNrZXRUb1BhaXJ0YWJsZShzZWxmLmRvdGJyYWNrZXQpO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbW92ZUJyZWFrcyA9IGZ1bmN0aW9uKHRhcmdldFN0cmluZykge1xuICAgICAgICAvLyBSZW1vdmUgYWxsIGNoYWluIGJyZWFrcyAoZGVub3RlZCB3aXRoIGEgJyYnLCB3aGljaCBpbmRpY2F0ZVxuICAgICAgICAvLyB0aGF0IHRoZSBpbnB1dCByZXByZXNlbnRzIG1vcmUgdGhhbiBvbmUgc3RyYW5kKVxuICAgICAgICB2YXIgYnJlYWtzID0gW107XG4gICAgICAgIHZhciBicmVha0luZGV4ID0gLTE7XG5cbiAgICAgICAgd2hpbGUgKChicmVha0luZGV4ID0gdGFyZ2V0U3RyaW5nLmluZGV4T2YoJyYnKSkgPj0gMCkge1xuICAgICAgICAgICAgYnJlYWtzLnB1c2goYnJlYWtJbmRleCk7XG4gICAgICAgICAgICB0YXJnZXRTdHJpbmcgPSB0YXJnZXRTdHJpbmcuc3Vic3RyaW5nKDAsIGJyZWFrSW5kZXgpICsgdGFyZ2V0U3RyaW5nLnN1YnN0cmluZyhicmVha0luZGV4KzEsIHRhcmdldFN0cmluZy5sZW5ndGgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge3RhcmdldFN0cmluZzogdGFyZ2V0U3RyaW5nLCAgYnJlYWtzOiBicmVha3N9O1xuICAgIH07XG5cbiAgICB2YXIgcmV0ID0gc2VsZi5yZW1vdmVCcmVha3Moc2VsZi5kb3RicmFja2V0KTtcbiAgICBzZWxmLmRvdGJyYWNrZXQgPSByZXQudGFyZ2V0U3RyaW5nO1xuICAgIHNlbGYuZG90QnJhY2tldEJyZWFrcyA9IHJldC5icmVha3M7XG5cbiAgICByZXQgPSBzZWxmLnJlbW92ZUJyZWFrcyhzZWxmLnNlcSk7XG4gICAgc2VsZi5zZXEgPSByZXQudGFyZ2V0U3RyaW5nO1xuICAgIHNlbGYuc2VxQnJlYWtzID0gcmV0LmJyZWFrcztcblxuICAgIHNlbGYucm5hTGVuZ3RoID0gc2VsZi5kb3RicmFja2V0Lmxlbmd0aDtcblxuICAgIGlmICghYXJyYXlzRXF1YWwoc2VsZi5kb3RCcmFja2V0QnJlYWtzLCBzZWxmLnNlcUJyZWFrcykpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1dBUk5JTkc6IFNlcXVlbmNlIGFuZCBzdHJ1Y3R1cmUgYnJlYWtzIG5vdCBlcXVhbCcpO1xuICAgICAgICBjb25zb2xlLmxvZygnV0FSTklORzogVXNpbmcgdGhlIGJyZWFrcyBpbiB0aGUgc3RydWN0dXJlJyk7XG4gICAgfVxuXG4gICAgc2VsZi5jb21wdXRlUGFpcnRhYmxlKCk7XG5cbiAgICBzZWxmLmFkZFBvc2l0aW9ucyA9IGZ1bmN0aW9uKG5vZGVUeXBlLCBwb3NpdGlvbnMpIHtcbiAgICAgICAgbGV0IGxhYmVsTm9kZXMgPSBzZWxmLm5vZGVzLmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkLm5vZGVUeXBlID09IG5vZGVUeXBlOyB9KTtcblxuICAgICAgICBmb3IgIChsZXQgaSA9IDA7IGkgPCBsYWJlbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsYWJlbE5vZGVzW2ldLnggPSBwb3NpdGlvbnNbaV1bMF07XG4gICAgICAgICAgICBsYWJlbE5vZGVzW2ldLnkgPSBwb3NpdGlvbnNbaV1bMV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5icmVha05vZGVzVG9GYWtlTm9kZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gY29udmVydCBhbGwgdGhlIG5vZGVzIGZvbGxvd2luZyBicmVha3MgdG8gZmFrZSBub2Rlc1xuICAgICAgICBsZXQgbGFiZWxOb2RlcyA9IHNlbGYubm9kZXMuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQubm9kZVR5cGUgPT0gJ251Y2xlb3RpZGUnOyB9KTtcblxuICAgICAgICAvLyBpZiBhIG5vZGUgd2FzIGFuIGFydGlmaWNhbCBicmVhayBub2RlLCBjb252ZXJ0IGl0IHRvIGEgbWlkZGxlXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFiZWxOb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNlbGYuZG90QnJhY2tldEJyZWFrcy5pbmRleE9mKGkpID49IDApIHtcbiAgICAgICAgICAgICAgICBsYWJlbE5vZGVzW2ldLm5vZGVUeXBlID0gJ21pZGRsZSc7XG4gICAgICAgICAgICAgICAgbGFiZWxOb2Rlc1tpKzFdLm5vZGVUeXBlID0gJ21pZGRsZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYuZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBicm9rZW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gY2hhbmdlIHRoZSBlbGVtVHlwZSBvZiB0aGUgb3RoZXIgbm9kZXMgaW4gdGhlIGVsZW1lbnQgY29udGFpbmluZ1xuICAgICAgICAgICAgLy8gdGhlIGJyZWFrXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNlbGYuZWxlbWVudHNbaV1bMl0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5kb3RCcmFja2V0QnJlYWtzLmluZGV4T2Yoc2VsZi5lbGVtZW50c1tpXVsyXVtqXSkgPj0gMClcbiAgICAgICAgICAgICAgICAgICAgYnJva2VuID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGJyb2tlbikge1xuICAgICAgICAgICAgICAgIHNlbGYuZWxlbWVudHNbaV1bMl0ubWFwKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHggPT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ub2Rlc1t4LTFdLmVsZW1UeXBlID0gJ2UnO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLmVsZW1lbnRzW2ldWzJdLm1hcChmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh4ID09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZXNbeC0xXS5lbGVtVHlwZSA9IHNlbGYuZWxlbWVudHNbaV1bMF07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZ2V0UG9zaXRpb25zID0gZnVuY3Rpb24obm9kZVR5cGUpIHtcbiAgICAgICAgdmFyIHBvc2l0aW9ucyA9IFtdO1xuICAgICAgICBsZXQgbnVjbGVvdGlkZU5vZGVzID0gc2VsZi5ub2Rlcy5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5ub2RlVHlwZSA9PSBub2RlVHlwZTsgfSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudWNsZW90aWRlTm9kZXMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBwb3NpdGlvbnMucHVzaChbbnVjbGVvdGlkZU5vZGVzW2ldLngsIG51Y2xlb3RpZGVOb2Rlc1tpXS55XSk7XG5cbiAgICAgICAgcmV0dXJuIHBvc2l0aW9ucztcbiAgICB9O1xuXG4gICAgc2VsZi5nZXRVaWRzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8qIEdldCB0aGUgcG9zaXRpb25zIG9mIGVhY2ggbm9kZSBzbyB0aGF0IHRoZXlcbiAgICAgICAgICogY2FuIGJlIHBhc3NlZCB0byBlbGVtZW50c1RvSnNvbiBsYXRlclxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIHVpZHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLmRvdGJyYWNrZXQubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICB1aWRzLnB1c2goc2VsZi5ub2Rlc1tpXS51aWQpO1xuXG4gICAgICAgIHJldHVybiB1aWRzO1xuICAgIH07XG5cbiAgICBzZWxmLnJlaW5mb3JjZVN0ZW1zID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwdCA9IHNlbGYucGFpcnRhYmxlO1xuICAgICAgICBsZXQgcmVsZXZhbnRFbGVtZW50cyA9IHNlbGYuZWxlbWVudHMuZmlsdGVyKCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZFswXSA9PSAncycgJiYgZFsyXS5sZW5ndGggPj0gNDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWxldmFudEVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgYWxsTnVjcyA9IHJlbGV2YW50RWxlbWVudHNbaV1bMl07XG4gICAgICAgICAgICBsZXQgbnVjcyA9IGFsbE51Y3Muc2xpY2UoMCwgYWxsTnVjcy5sZW5ndGggLyAyKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBudWNzLmxlbmd0aC0xOyBqKyspIHtcbiAgICAgICAgICAgICAgICBzZWxmLmFkZEZha2VOb2RlKFtudWNzW2pdLCBudWNzW2orMV0sIHB0W251Y3NbaisxXV0sIHB0W251Y3Nbal1dXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZWluZm9yY2VMb29wcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvKlxuICAgICAgICAgKiBBZGQgYSBzZXQgb2YgZmFrZSBub2RlcyB0byBlbmZvcmNlIHRoZSBzdHJ1Y3R1cmVcbiAgICAgICAgICovXG4gICAgICAgIHZhciBmaWx0ZXJOdWNzID0gZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIGQgIT09IDAgJiYgZCA8PSBzZWxmLmRvdGJyYWNrZXQubGVuZ3RoO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZi5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNlbGYuZWxlbWVudHNbaV1bMF0gPT0gJ3MnIHx8ICghc2VsZi5jaXJjdWxhcml6ZUV4dGVybmFsICYmIHNlbGYuZWxlbWVudHNbaV1bMF0gPT0gJ2UnKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgdmFyIG51Y3MgPSBzZWxmLmVsZW1lbnRzW2ldWzJdLmZpbHRlcihmaWx0ZXJOdWNzKTtcblxuICAgICAgICAgICAgaWYgKHNlbGYuZWxlbWVudHNbaV1bMF0gPT0gJ2UnKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld05vZGUxID0geyduYW1lJzogJycsXG4gICAgICAgICAgICAgICAgICAgICdudW0nOiAtMyxcbiAgICAgICAgICAgICAgICAgICAgLy8ncmFkaXVzJzogMTggKiByYWRpdXMgLTYsXG4gICAgICAgICAgICAgICAgICAgICdyYWRpdXMnOiAwLFxuICAgICAgICAgICAgICAgICAgICAncm5hJzogc2VsZixcbiAgICAgICAgICAgICAgICAgICAgJ25vZGVUeXBlJzogJ21pZGRsZScsXG4gICAgICAgICAgICAgICAgICAgICdlbGVtVHlwZSc6ICdmJyxcbiAgICAgICAgICAgICAgICAgICAgJ251Y3MnOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgJ3gnOiBzZWxmLm5vZGVzW3NlbGYucm5hTGVuZ3RoLTFdLngsXG4gICAgICAgICAgICAgICAgICAgICd5Jzogc2VsZi5ub2Rlc1tzZWxmLnJuYUxlbmd0aC0xXS55LFxuICAgICAgICAgICAgICAgICAgICAncHgnOiBzZWxmLm5vZGVzW3NlbGYucm5hTGVuZ3RoLTFdLnB4LFxuICAgICAgICAgICAgICAgICAgICAncHknOiBzZWxmLm5vZGVzW3NlbGYucm5hTGVuZ3RoLTFdLnB5LFxuICAgICAgICAgICAgICAgICAgICAndWlkJzogc2x1Z2lkLm5pY2UoKSB9O1xuICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlMiA9IHsnbmFtZSc6ICcnLFxuICAgICAgICAgICAgICAgICAgICAnbnVtJzogLTIsXG4gICAgICAgICAgICAgICAgICAgIC8vJ3JhZGl1cyc6IDE4ICogcmFkaXVzIC02LFxuICAgICAgICAgICAgICAgICAgICAncmFkaXVzJzogMCxcbiAgICAgICAgICAgICAgICAgICAgJ3JuYSc6IHNlbGYsXG4gICAgICAgICAgICAgICAgICAgICdub2RlVHlwZSc6ICdtaWRkbGUnLFxuICAgICAgICAgICAgICAgICAgICAnZWxlbVR5cGUnOiAnZicsXG4gICAgICAgICAgICAgICAgICAgICdudWNzJzogW10sXG4gICAgICAgICAgICAgICAgICAgICd4Jzogc2VsZi5ub2Rlc1swXS54LFxuICAgICAgICAgICAgICAgICAgICAneSc6IHNlbGYubm9kZXNbMF0ueSxcbiAgICAgICAgICAgICAgICAgICAgJ3B4Jzogc2VsZi5ub2Rlc1swXS5weCxcbiAgICAgICAgICAgICAgICAgICAgJ3B5Jzogc2VsZi5ub2Rlc1swXS5weSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpZCc6IHNsdWdpZC5uaWNlKCkgfTtcblxuICAgICAgICAgICAgICAgICAgICBudWNzLnB1c2goc2VsZi5ub2Rlcy5sZW5ndGgrMSk7XG4gICAgICAgICAgICAgICAgICAgIG51Y3MucHVzaChzZWxmLm5vZGVzLmxlbmd0aCsyKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ub2Rlcy5wdXNoKG5ld05vZGUxKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ub2Rlcy5wdXNoKG5ld05vZGUyKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBzZWxmLmFkZEZha2VOb2RlKG51Y3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYudXBkYXRlTGlua1VpZHMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLmxpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzZWxmLmxpbmtzW2ldLnVpZCA9IHNlbGYubGlua3NbaV0uc291cmNlLnVpZCArIHNlbGYubGlua3NbaV0udGFyZ2V0LnVpZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmFkZEZha2VOb2RlID0gZnVuY3Rpb24obnVjcykge1xuICAgICAgICB2YXIgbGlua0xlbmd0aCA9IDE4OyAvL21ha2Ugc3VyZSB0aGlzIGlzIGNvbnNpc3RlbnQgd2l0aCB0aGUgdmFsdWUgaW4gZm9yY2UuanNcbiAgICAgICAgdmFyIG5vZGVXaWR0aCA9IDY7XG4gICAgICAgIHZhciBhbmdsZSA9ICgzLjE0MTUgKiAyKSAvICgyICogbnVjcy5sZW5ndGgpO1xuICAgICAgICB2YXIgcmFkaXVzID0gIGxpbmtMZW5ndGggLyAoMiAqIE1hdGgudGFuKGFuZ2xlKSk7XG5cbiAgICAgICAgdmFyIGZha2VOb2RlVWlkID0gJyc7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudWNzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgZmFrZU5vZGVVaWQgKz0gc2VsZi5ub2Rlc1tudWNzW2ldLTFdLnVpZDtcblxuICAgICAgICB2YXIgbmV3Tm9kZSA9IHsnbmFtZSc6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICdudW0nOiAtMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAvLydyYWRpdXMnOiAxOCAqIHJhZGl1cyAtNixcbiAgICAgICAgICAgICAgICAgICAgICAgICAncmFkaXVzJzogcmFkaXVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICdybmEnOiBzZWxmLFxuICAgICAgICAgICAgICAgICAgICAgICAgICdub2RlVHlwZSc6ICdtaWRkbGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICdlbGVtVHlwZSc6ICdmJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAnbnVjcyc6IG51Y3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3VpZCc6IGZha2VOb2RlVWlkIH07XG4gICAgICAgIHNlbGYubm9kZXMucHVzaChuZXdOb2RlKTtcblxuICAgICAgICB2YXIgbmV3WCA9IDA7XG4gICAgICAgIHZhciBuZXdZID0gMDtcbiAgICAgICAgdmFyIGNvb3Jkc0NvdW50ZWQgPSAwO1xuXG4gICAgICAgIGFuZ2xlID0gKG51Y3MubGVuZ3RoIC0gMikgKiAzLjE0MTU5IC8gKDIgKiBudWNzLmxlbmd0aCk7XG4gICAgICAgIHJhZGl1cyA9IDAuNSAvIE1hdGguY29zKGFuZ2xlKTtcblxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG51Y3MubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChudWNzW2pdID09PSAwIHx8IG51Y3Nbal0gPiBzZWxmLmRvdGJyYWNrZXQubGVuZ3RoKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAvL2xpbmsgdG8gdGhlIGNlbnRlciBub2RlXG4gICAgICAgICAgICBzZWxmLmxpbmtzLnB1c2goeydzb3VyY2UnOiBzZWxmLm5vZGVzW251Y3Nbal0gLSAxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RhcmdldCc6IHNlbGYubm9kZXNbc2VsZi5ub2Rlcy5sZW5ndGgtMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsaW5rVHlwZSc6ICdmYWtlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogcmFkaXVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWlkJzogc2x1Z2lkLm5pY2UoKSB9KTtcblxuICAgICAgICAgICAgaWYgKG51Y3MubGVuZ3RoID4gNCkge1xuICAgICAgICAgICAgICAgIC8vbGluayBhY3Jvc3MgdGhlIGxvb3BcbiAgICAgICAgICAgICAgICBzZWxmLmxpbmtzLnB1c2goeydzb3VyY2UnOiBzZWxmLm5vZGVzW251Y3Nbal0gLSAxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0YXJnZXQnOiBzZWxmLm5vZGVzW251Y3NbKGogKyBNYXRoLmZsb29yKG51Y3MubGVuZ3RoIC8gMikpICUgbnVjcy5sZW5ndGhdIC0gMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGlua1R5cGUnOiAnZmFrZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiByYWRpdXMgKiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpZCc6IHNsdWdpZC5uaWNlKCkgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBpYSA9ICgobnVjcy5sZW5ndGggLSAyKSAqIDMuMTQxNTkpIC8gbnVjcy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgYyA9IDIgKiBNYXRoLmNvcygzLjE0MTU5IC8gMiAtIGlhIC8gMik7XG4gICAgICAgICAgICAvL2xpbmsgdG8gb3Zlci1uZWlnaGJvclxuICAgICAgICAgICAgc2VsZi5saW5rcy5wdXNoKHsnc291cmNlJzogc2VsZi5ub2Rlc1tudWNzW2pdIC0gMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0YXJnZXQnOiBzZWxmLm5vZGVzW251Y3NbKGogKyAyKSAlIG51Y3MubGVuZ3RoXSAtIDFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGlua1R5cGUnOiAnZmFrZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IGN9KTtcblxuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBtZWFuIG9mIHRoZSBjb29yZGluYXRzIGluIHRoaXMgbG9vcFxuICAgICAgICAgICAgLy8gYW5kIHBsYWNlIHRoZSBmYWtlIG5vZGUgdGhlcmVcbiAgICAgICAgICAgIHZhciBmcm9tTm9kZSA9IHNlbGYubm9kZXNbbnVjc1tqXS0xXTtcbiAgICAgICAgICAgIGlmICgneCcgaW4gZnJvbU5vZGUpIHtcbiAgICAgICAgICAgICAgICBuZXdYICs9IGZyb21Ob2RlLng7XG4gICAgICAgICAgICAgICAgbmV3WSArPSBmcm9tTm9kZS55O1xuXG4gICAgICAgICAgICAgICAgY29vcmRzQ291bnRlZCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvb3Jkc0NvdW50ZWQgPiAwKSB7XG4gICAgICAgICAgICAvLyB0aGUgbnVjbGVvdGlkZXMgaGFkIHNldCBwb3NpdGlvbnMgc28gd2UgY2FuIGNhbGN1bGF0ZSB0aGUgcG9zaXRpb25cbiAgICAgICAgICAgIC8vIG9mIHRoZSBmYWtlIG5vZGVcbiAgICAgICAgICAgIG5ld05vZGUueCA9IG5ld1ggLyBjb29yZHNDb3VudGVkO1xuICAgICAgICAgICAgbmV3Tm9kZS55ID0gbmV3WSAvIGNvb3Jkc0NvdW50ZWQ7XG4gICAgICAgICAgICBuZXdOb2RlLnB4ID0gbmV3Tm9kZS54O1xuICAgICAgICAgICAgbmV3Tm9kZS5weSA9IG5ld05vZGUueTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmNvbm5lY3RGYWtlTm9kZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxpbmtMZW5ndGggPSAxODtcblxuICAgICAgICAvLyBXZSB3YW50IHRvIGJlIGFibGUgdG8gY29ubmVjdCBhbGwgb2YgdGhlIGZha2Ugbm9kZXNcbiAgICAgICAgLy8gYW5kIGNyZWF0ZSBhIHN0cnVjdHVyZSBjb25zaXN0aW5nIG9mIGp1c3QgdGhlbVxuICAgICAgICB2YXIgZmlsdGVyT3V0Tm9uRmFrZU5vZGVzID0gZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIGQubm9kZVR5cGUgPT0gJ21pZGRsZSc7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbnVjc1RvTm9kZXMgPSB7fTtcbiAgICAgICAgdmFyIGZha2VOb2RlcyA9IHNlbGYubm9kZXMuZmlsdGVyKGZpbHRlck91dE5vbkZha2VOb2Rlcyk7XG4gICAgICAgIHZhciBsaW5rZWQgPSB7fTtcblxuICAgICAgICAvLyBpbml0aWFsaXplIHRoZSBudWNsZW90aWRlcyB0byBub2Rlc1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBzZWxmLm5vZGVzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgbnVjc1RvTm9kZXNbaV0gPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZha2VOb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRoaXNOb2RlID0gZmFrZU5vZGVzW2ldO1xuXG4gICAgICAgICAgICAvLyBlYWNoIGZha2Ugbm9kZSByZXByZXNlbnRzIGEgY2VydGFpbiBzZXQgb2YgbnVjbGVvdGlkZXMgKHRoaXNOb2RlLm51Y3MpXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXNOb2RlLm51Y3MubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpc051YyA9IHRoaXNOb2RlLm51Y3Nbal07XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgdGhpcyBudWNsZW90aWRlIGhhcyBiZWVuIHNlZW4gaW4gYW5vdGhlciBmYWtlIG5vZGVcbiAgICAgICAgICAgICAgICAvLyBpZiBpdCBoYXMsIHRoZW4gd2UgYWRkIGEgbGluayBiZXR3ZWVuIHRoZSB0d28gbm9kZXNcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IG51Y3NUb05vZGVzW3RoaXNOdWNdLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeShbbnVjc1RvTm9kZXNbdGhpc051Y11ba10udWlkLCB0aGlzTm9kZS51aWRdLnNvcnQoKSkgaW4gbGlua2VkKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7IC8vYWxyZWFkeSBsaW5rZWRcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBudWNzVG9Ob2Rlc1t0aGlzTnVjXVtrXS5yYWRpdXMgKyB0aGlzTm9kZS5yYWRpdXM7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5saW5rcy5wdXNoKHsnc291cmNlJzogbnVjc1RvTm9kZXNbdGhpc051Y11ba10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0YXJnZXQnOiB0aGlzTm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogZGlzdGFuY2UgLyBsaW5rTGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGlua1R5cGUnOiAnZmFrZV9mYWtlJ30pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIG5vdGUgdGhhdCB3ZSd2ZSBhbHJlYWR5IHNlZW4gdGhpcyBsaW5rXG4gICAgICAgICAgICAgICAgICAgIGxpbmtlZFtKU09OLnN0cmluZ2lmeShbbnVjc1RvTm9kZXNbdGhpc051Y11ba10udWlkLCB0aGlzTm9kZS51aWRdLnNvcnQoKSldID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBudWNzVG9Ob2Rlc1t0aGlzTnVjXS5wdXNoKHRoaXNOb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuXG4gICAgfTtcblxuICAgIHNlbGYuYWRkRXh0cmFMaW5rcyA9IGZ1bmN0aW9uKGV4dHJhTGlua3MpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBleHRyYUxpbmtzID09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHRyYUxpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gc2VsZi5nZXROb2RlRnJvbU51Y2xlb3RpZGVzKGV4dHJhTGlua3NbaV0uZnJvbSk7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gc2VsZi5nZXROb2RlRnJvbU51Y2xlb3RpZGVzKGV4dHJhTGlua3NbaV0udG8pO1xuXG4gICAgICAgICAgICB2YXIgbmV3TGluayA9IHsnc291cmNlJzogc291cmNlLCAndGFyZ2V0JzogdGFyZ2V0LCAnbGlua1R5cGUnOiAnZXh0cmEnLFxuICAgICAgICAgICAgICAgICdleHRyYUxpbmtUeXBlJzogZXh0cmFMaW5rc1tpXS5saW5rVHlwZSwgJ3VpZCc6IHNsdWdpZC5uaWNlKCkgfTtcblxuICAgICAgICAgICAgICAgIHNlbGYubGlua3MucHVzaChuZXdMaW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cblxuXG4gICAgc2VsZi5lbGVtZW50c1RvSnNvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvKiBDb252ZXJ0IGEgc2V0IG9mIHNlY29uZGFyeSBzdHJ1Y3R1cmUgZWxlbWVudHMgdG8gYSBqc29uXG4gICAgICAgICAqIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBncmFwaCB0aGF0IGNhbiBiZSB1c2VkIHdpdGggZDMnc1xuICAgICAgICAgKiBmb3JjZS1kaXJlY3RlZCBsYXlvdXQgdG8gZ2VuZXJhdGUgYSB2aXN1YWxpemF0aW9uIG9mXG4gICAgICAgICAqIHRoZSBzdHJ1Y3R1cmUuXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgcHQgPSBzZWxmLnBhaXJ0YWJsZTtcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gc2VsZi5lbGVtZW50cztcblxuICAgICAgICBzZWxmLm5vZGVzID0gW107XG4gICAgICAgIHNlbGYubGlua3MgPSBbXTtcblxuICAgICAgICAvL2NyZWF0ZSBhIHJldmVyc2UgbG9va3VwIHNvIHdlIGNhbiBmaW5kIG91dCB0aGUgdHlwZVxuICAgICAgICAvL29mIGVsZW1lbnQgdGhhdCBhIG5vZGUgaXMgcGFydCBvZlxuICAgICAgICB2YXIgZWxlbVR5cGVzID0ge307XG5cbiAgICAgICAgLy9zb3J0IHNvIHRoYXQgd2UgY291bnQgc3RlbXMgbGFzdFxuICAgICAgICBzZWxmLmVsZW1lbnRzLnNvcnQoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYuZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBudWNzID0gc2VsZi5lbGVtZW50c1tpXVsyXTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVjcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGVsZW1UeXBlc1tudWNzW2pdXSA9IHNlbGYuZWxlbWVudHNbaV1bMF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBwdFswXTsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbm9kZU5hbWUgPSBzZWxmLnNlcVtpLTFdO1xuXG4gICAgICAgICAgICBpZiAoc2VsZi5kb3RCcmFja2V0QnJlYWtzLmluZGV4T2YoaS0xKSA+PSAwIHx8XG4gICAgICAgICAgICAgICAgc2VsZi5kb3RCcmFja2V0QnJlYWtzLmluZGV4T2YoaS0yKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgbm9kZU5hbWUgPSAnJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9jcmVhdGUgYSBub2RlIGZvciBlYWNoIG51Y2xlb3RpZGVcbiAgICAgICAgICAgIHNlbGYubm9kZXMucHVzaCh7J25hbWUnOiBub2RlTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ251bSc6IHN0YXJ0TnVtYmVyICsgaSAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyYWRpdXMnOiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncm5hJzogc2VsZixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ25vZGVUeXBlJzogJ251Y2xlb3RpZGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3RydWN0TmFtZSc6IHNlbGYuc3RydWN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2VsZW1UeXBlJzogZWxlbVR5cGVzW2ldLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWlkJzogc2x1Z2lkLm5pY2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xpbmtlZCc6IGZhbHNlfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYubm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpID09PSAwKVxuICAgICAgICAgICAgICAgIHNlbGYubm9kZXNbaV0ucHJldk5vZGUgPSBudWxsO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5ub2Rlc1tpXS5wcmV2Tm9kZSA9IHNlbGYubm9kZXNbaS0xXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGkgPT0gc2VsZi5ub2Rlcy5sZW5ndGgtMSlcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGVzW2ldLm5leHROb2RlID0gbnVsbDtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYubm9kZXNbaV0ubmV4dE5vZGUgPSBzZWxmLm5vZGVzW2krMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBwdFswXTsgaSsrKSB7XG5cbiAgICAgICAgICAgIGlmIChwdFtpXSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIGJhc2UtcGFpciBsaW5rc1xuICAgICAgICAgICAgICAgIHNlbGYubGlua3MucHVzaCh7J3NvdXJjZSc6IHNlbGYubm9kZXNbaS0xXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0YXJnZXQnOiBzZWxmLm5vZGVzW3B0W2ldLTFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xpbmtUeXBlJzogJ2Jhc2VwYWlyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWlkJzogc2x1Z2lkLm5pY2UoKSB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGkgPiAxKSB7XG4gICAgICAgICAgICAgICAgLy8gYmFja2JvbmUgbGlua3NcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5kb3RCcmFja2V0QnJlYWtzLmluZGV4T2YoaS0xKSA9PT0gLTEgJiZcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kb3RCcmFja2V0QnJlYWtzLmluZGV4T2YoaS0yKSA9PSAtMSAmJlxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRvdEJyYWNrZXRCcmVha3MuaW5kZXhPZihpLTMpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZXJlIGlzIG5vIGJyZWFrIGluIHRoZSBzdHJhbmRzIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgLy8gd2UgY2FuIGFkZCBhIGJhY2tib25lIGxpbmtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5saW5rcy5wdXNoKHsnc291cmNlJzogc2VsZi5ub2Rlc1tpLTJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RhcmdldCc6IHNlbGYubm9kZXNbaS0xXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsaW5rVHlwZSc6ICdiYWNrYm9uZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpZCc6IHNsdWdpZC5uaWNlKCkgfSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZXNbaS0xXS5saW5rZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vYWRkIHRoZSBwc2V1ZG9rbm90IGxpbmtzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZi5wc2V1ZG9rbm90UGFpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHNlbGYubGlua3MucHVzaCh7J3NvdXJjZSc6IHNlbGYubm9kZXNbc2VsZi5wc2V1ZG9rbm90UGFpcnNbaV1bMF0tMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RhcmdldCc6IHNlbGYubm9kZXNbc2VsZi5wc2V1ZG9rbm90UGFpcnNbaV1bMV0tMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xpbmtUeXBlJzogJ3BzZXVkb2tub3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpZCc6IHNsdWdpZC5uaWNlKCl9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxmLmNpcmN1bGFyKSB7XG4gICAgICAgICAgICBzZWxmLmxpbmtzLnB1c2goeydzb3VyY2UnOiBzZWxmLm5vZGVzWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0YXJnZXQnOiBzZWxmLm5vZGVzW3NlbGYucm5hTGVuZ3RoLTFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsaW5rVHlwZSc6ICdiYWNrYm9uZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWlkJzogc2x1Z2lkLm5pY2UoKSB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucHRUb0VsZW1lbnRzID0gZnVuY3Rpb24ocHQsIGxldmVsLCBpLCBqKSB7XG4gICAgICAgIC8qIENvbnZlcnQgYSBwYWlyIHRhYmxlIHRvIGEgbGlzdCBvZiBzZWNvbmRhcnkgc3RydWN0dXJlXG4gICAgICAgICAqIGVsZW1lbnRzOlxuICAgICAgICAgKlxuICAgICAgICAgKiBbWydzJywxLFsyLDNdXVxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGUgJ3MnIGluZGljYXRlcyB0aGF0IGFuIGVsZW1lbnQgY2FuIGJlIGEgc3RlbS4gSXQgY2FuIGFsc28gYmVcbiAgICAgICAgICogYW4gaW50ZXJpb3IgbG9vcCAoJ2knKSwgYSBoYWlycGluIGxvb3AgKCdoJykgb3IgYSBtdWx0aWxvb3AgKCdtJylcbiAgICAgICAgICpcbiAgICAgICAgICogVGhlIHNlY29uZCBudW1iZXIgKDEgaW4gdGhpcyBjYXNlKSBpbmRpY2F0ZXMgdGhlIGRlcHRoIG9yXG4gICAgICAgICAqIGhvdyBtYW55IGJhc2UgcGFpcnMgaGF2ZSB0byBiZSBicm9rZW4gdG8gZ2V0IHRvIHRoaXMgZWxlbWVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogRmluYWxseSwgdGhlcmUgaXMgdGhlIGxpc3Qgb2YgbnVjbGVvdGlkZXMgd2hpY2ggYXJlIHBhcnQgb2ZcbiAgICAgICAgICogb2YgdGhpcyBlbGVtZW50LlxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGVsZW1lbnRzID0gW107XG4gICAgICAgIHZhciB1NSA9IFtpLTFdO1xuICAgICAgICB2YXIgdTMgPSBbaisxXTtcblxuICAgICAgICBpZiAoaSA+IGopXG4gICAgICAgICAgICByZXR1cm4gW107XG5cbiAgICAgICAgICAgIC8vaXRlcmF0ZSBvdmVyIHRoZSB1bnBhaXJlZCByZWdpb25zIG9uIGVpdGhlciBzaWRlXG4gICAgICAgICAgICAvL3RoaXMgaXMgZWl0aGVyIDUnIGFuZCAzJyB1bnBhaXJlZCBpZiBsZXZlbCA9PSAwXG4gICAgICAgICAgICAvL29yIGFuIGludGVyaW9yIGxvb3Agb3IgYSBtdWx0aWxvb3BcbiAgICAgICAgICAgIGZvciAoOyBwdFtpXSA9PT0gMDsgaSsrKSB7IHU1LnB1c2goaSk7IH1cbiAgICAgICAgICAgIGZvciAoOyBwdFtqXSA9PT0gMDsgai0tKSB7IHUzLnB1c2goaik7IH1cblxuICAgICAgICAgICAgaWYgKGkgPiBqKSB7XG4gICAgICAgICAgICAgICAgLy9oYWlycGluIGxvb3Agb3Igb25lIGxhcmdlIHVucGFpcmVkIG1vbGVjdWxlXG4gICAgICAgICAgICAgICAgdTUucHVzaChpKTtcbiAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbWydlJyxsZXZlbCwgdTUuc29ydChudW1iZXJTb3J0KV1dO1xuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgd2UgaGF2ZSBjaGFpbiBicmVha3MgZHVlXG4gICAgICAgICAgICAgICAgICAgIC8vIHRvIG11bHRpcGxlIHN0cmFuZHMgaW4gdGhlIGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHZhciBleHRlcm5hbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGVmdCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmlnaHQgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB1NS5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4dGVybmFsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0LnB1c2godTVba10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQucHVzaCh1NVtrXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmRvdEJyYWNrZXRCcmVha3MuaW5kZXhPZih1NVtrXSkgPj0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRlcm5hbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoZXh0ZXJuYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbWydoJyxsZXZlbCwgdTUuc29ydChudW1iZXJTb3J0KV1dO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIG5vdCwgdGhpcyBpcyBhIHNpbXBsZSBoYWlycGluIGxvb3BcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbWydoJyxsZXZlbCwgdTUuc29ydChudW1iZXJTb3J0KV1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHB0W2ldICE9IGopIHtcbiAgICAgICAgICAgICAgICAvL211bHRpbG9vcFxuICAgICAgICAgICAgICAgIHZhciBtID0gdTU7XG4gICAgICAgICAgICAgICAgdmFyIGsgPSBpO1xuXG4gICAgICAgICAgICAgICAgLy8gdGhlIG51Y2xlb3RpZGUgYmVmb3JlIGFuZCB0aGUgc3RhcnRpbmcgbnVjbGVvdGlkZVxuICAgICAgICAgICAgICAgIG0ucHVzaChrKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoayA8PSBqKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlY3Vyc2UgaW50byBhIHN0ZW1cbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMgPSBlbGVtZW50cy5jb25jYXQoc2VsZi5wdFRvRWxlbWVudHMocHQsIGxldmVsLCBrLCBwdFtrXSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgbnVjbGVvdGlkZXMgYmV0d2VlbiBzdGVtc1xuICAgICAgICAgICAgICAgICAgICBtLnB1c2gocHRba10pO1xuICAgICAgICAgICAgICAgICAgICBrID0gcHRba10gKyAxO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKDsgcHRba10gPT09IDAgJiYgayA8PSBqOyBrKyspIHsgbS5wdXNoKGspO31cbiAgICAgICAgICAgICAgICAgICAgbS5wdXNoKGspO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtLnBvcCgpO1xuICAgICAgICAgICAgICAgIG0gPSBtLmNvbmNhdCh1Myk7XG5cbiAgICAgICAgICAgICAgICBpZiAobS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goWydlJywgbGV2ZWwsIG0uc29ydChudW1iZXJTb3J0KV0pO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cy5wdXNoKFsnbScsIGxldmVsLCBtLnNvcnQobnVtYmVyU29ydCldKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudHM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwdFtpXSA9PT0gaikge1xuICAgICAgICAgICAgICAgIC8vaW50ZXJpb3IgbG9vcFxuICAgICAgICAgICAgICAgIHU1LnB1c2goaSk7XG4gICAgICAgICAgICAgICAgdTMucHVzaChqKTtcblxuICAgICAgICAgICAgICAgIHZhciBjb21iaW5lZCA9IHU1LmNvbmNhdCh1Myk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbWJpbmVkLmxlbmd0aCA+IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChbJ2UnLGxldmVsLCB1NS5jb25jYXQodTMpLnNvcnQobnVtYmVyU29ydCldKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChbJ2knLGxldmVsLCB1NS5jb25jYXQodTMpLnNvcnQobnVtYmVyU29ydCldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzID0gW107XG4gICAgICAgICAgICAvL2dvIHRocm91Z2ggdGhlIHN0ZW1cbiAgICAgICAgICAgIHdoaWxlIChwdFtpXSA9PT0gaiAmJiBpIDwgaikge1xuICAgICAgICAgICAgICAgIC8vb25lIHN0ZW1cbiAgICAgICAgICAgICAgICBzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgcy5wdXNoKGopO1xuXG4gICAgICAgICAgICAgICAgaSArPSAxO1xuICAgICAgICAgICAgICAgIGogLT0gMTtcblxuICAgICAgICAgICAgICAgIGxldmVsICs9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHU1ID0gW2ktMV07XG4gICAgICAgICAgICB1MyA9IFtqKzFdO1xuICAgICAgICAgICAgZWxlbWVudHMucHVzaChbJ3MnLCBsZXZlbCwgcy5zb3J0KG51bWJlclNvcnQpXSk7XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnRzLmNvbmNhdChzZWxmLnB0VG9FbGVtZW50cyhwdCwgbGV2ZWwsIGksIGopKTtcbiAgICB9O1xuXG4gICAgc2VsZi5hZGRMYWJlbHMgPSBmdW5jdGlvbihzdGFydE51bWJlciA9IDEsIGxhYmVsSW50ZXJ2YWwgPSAxMCkge1xuICAgICAgICBpZiAobGFiZWxJbnRlcnZhbCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHNlbGYucm5hTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vIGFkZCBsYWJlbHNcbiAgICAgICAgICAgIGlmIChpICUgbGFiZWxJbnRlcnZhbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vY3JlYXRlIGEgbm9kZSBmb3IgZWFjaCBsYWJlbFxuICAgICAgICAgICAgICAgIGxldCBuZXdYLCBuZXdZO1xuXG4gICAgICAgICAgICAgICAgbGV0IHRoaXNOb2RlID0gc2VsZi5ub2Rlc1tpLTFdO1xuICAgICAgICAgICAgICAgIGxldCBwcmV2Tm9kZSwgbmV4dE5vZGU7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZWZWMsIG5leHRWZWM7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5ybmFMZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0VmVjID0gW3RoaXNOb2RlLnggLSAxNSwgdGhpc05vZGUueV07XG4gICAgICAgICAgICAgICAgICAgIHByZXZWZWMgPSBbdGhpc05vZGUueCAtIDE1LCB0aGlzTm9kZS55XTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB3ZSdyZSBsYWJlbGxpbmcgdGhlIGZpcnN0IG5vZGUsIHRoZW4gbGFiZWwgaXQgaW4gcmVsYXRpb24gdG8gdGhlIGxhc3RcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZOb2RlID0gc2VsZi5ub2Rlc1tzZWxmLnJuYUxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2Tm9kZSA9IHNlbGYubm9kZXNbaSAtIDJdO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHdlJ3JlIGxhYmVsbGluZyB0aGUgbGFzdCBub2RlLCB0aGVuIGxhYmVsIGl0IGluIHJlbGF0aW9uIHRvIHRoZSBmaXJzdFxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSBzZWxmLnJuYUxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHROb2RlID0gc2VsZi5ub2Rlc1swXTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dE5vZGUgPSBzZWxmLm5vZGVzW2ldO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgbnVjbGVvdGlkZSBhbmQgaXRzIG5laWdoYm9ycyBhcmUgcGFpcmVkXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnBhaXJ0YWJsZVtuZXh0Tm9kZS5udW0gLSBzdGFydE51bWJlcisxXSAhPT0gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wYWlydGFibGVbcHJldk5vZGUubnVtIC0gc3RhcnROdW1iZXIrMV0gIT09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucGFpcnRhYmxlW3RoaXNOb2RlLm51bSAtIHN0YXJ0TnVtYmVyKzFdICE9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZOb2RlID0gbmV4dE5vZGUgPSBzZWxmLm5vZGVzW3NlbGYucGFpcnRhYmxlW3RoaXNOb2RlLm51bSAtIHN0YXJ0TnVtYmVyKzFdLTFdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBub2RlIGlzIHBhaXJlZCBidXQgYXQgbGVhc3Qgb25lIG9mIGl0cyBuZWlnaGJvcnMgaXMgdW5wYWlyZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gcGxhY2UgdGhlIGxhYmVsIGluIHRoZSBkaXJlY3Rpb24gb2YgdGhlIHR3byBuZWlnaGJvcnNcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYucGFpcnRhYmxlW3RoaXNOb2RlLm51bSAtIHN0YXJ0TnVtYmVyKzFdICE9PSAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucGFpcnRhYmxlW25leHROb2RlLm51bSAtIHN0YXJ0TnVtYmVyKzFdID09PSAwIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBhaXJ0YWJsZVtwcmV2Tm9kZS5udW0gLSBzdGFydE51bWJlcisxXSA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRWZWMgPSBbdGhpc05vZGUueCAtIG5leHROb2RlLngsIHRoaXNOb2RlLnkgLSBuZXh0Tm9kZS55XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZWZWMgPSBbdGhpc05vZGUueCAtIHByZXZOb2RlLngsIHRoaXNOb2RlLnkgLSBwcmV2Tm9kZS55XTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFZlYyA9IFtuZXh0Tm9kZS54IC0gdGhpc05vZGUueCwgbmV4dE5vZGUueSAtIHRoaXNOb2RlLnldO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlZlYyA9IFtwcmV2Tm9kZS54IC0gdGhpc05vZGUueCwgcHJldk5vZGUueSAtIHRoaXNOb2RlLnldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGNvbWJpbmVkVmVjID0gW25leHRWZWNbMF0gKyBwcmV2VmVjWzBdLCBuZXh0VmVjWzFdICsgcHJldlZlY1sxXV07XG4gICAgICAgICAgICAgICAgdmFyIHZlY0xlbmd0aCA9IE1hdGguc3FydChjb21iaW5lZFZlY1swXSAqIGNvbWJpbmVkVmVjWzBdICsgY29tYmluZWRWZWNbMV0gKiBjb21iaW5lZFZlY1sxXSk7XG4gICAgICAgICAgICAgICAgdmFyIG5vcm1lZFZlYyA9IFtjb21iaW5lZFZlY1swXSAvIHZlY0xlbmd0aCwgY29tYmluZWRWZWNbMV0gLyB2ZWNMZW5ndGhdO1xuICAgICAgICAgICAgICAgIHZhciBvZmZzZXRWZWMgPSBbLTE1ICogbm9ybWVkVmVjWzBdLCAtMTUgKiBub3JtZWRWZWNbMV1dO1xuXG4gICAgICAgICAgICAgICAgbmV3WCA9IHNlbGYubm9kZXNbaS0xXS54ICsgb2Zmc2V0VmVjWzBdO1xuICAgICAgICAgICAgICAgIG5ld1kgPSBzZWxmLm5vZGVzW2ktMV0ueSArIG9mZnNldFZlY1sxXTtcblxuICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlID0geyduYW1lJzogaSArIHN0YXJ0TnVtYmVyIC0xLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ251bSc6IC0xLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3JhZGl1cyc6IDYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncm5hJzogc2VsZixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdub2RlVHlwZSc6ICdsYWJlbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3RydWN0TmFtZSc6IHNlbGYuc3RydWN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdlbGVtVHlwZSc6ICdsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd4JzogbmV3WCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd5JzogbmV3WSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdweCc6IG5ld1gsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHknOiBuZXdZLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpZCc6IHNsdWdpZC5uaWNlKCkgfTtcbiAgICAgICAgICAgICAgICB2YXIgbmV3TGluayA9IHsnc291cmNlJzogc2VsZi5ub2Rlc1tpLTFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0YXJnZXQnOiBuZXdOb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xpbmtUeXBlJzogJ2xhYmVsX2xpbmsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aWQnOiBzbHVnaWQubmljZSgpIH07XG5cbiAgICAgICAgICAgICAgICBzZWxmLm5vZGVzLnB1c2gobmV3Tm9kZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5saW5rcy5wdXNoKG5ld0xpbmspO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVjYWxjdWxhdGVFbGVtZW50cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLnJlbW92ZVBzZXVkb2tub3RzKCk7XG4gICAgICAgIHNlbGYuZWxlbWVudHMgPSBzZWxmLnB0VG9FbGVtZW50cyhzZWxmLnBhaXJ0YWJsZSwgMCwgMSwgc2VsZi5kb3RicmFja2V0Lmxlbmd0aCk7XG5cbiAgICAgICAgaWYgKHNlbGYuY2lyY3VsYXIpIHtcbiAgICAgICAgICAgIC8vY2hlY2sgdG8gc2VlIGlmIHRoZSBleHRlcm5hbCBsb29wIGlzIGEgaGFpcnBpbiBvciBhIG11bHRpbG9vcFxuICAgICAgICAgICAgbGV0IGV4dGVybmFsTG9vcCA9IHNlbGYuZWxlbWVudHMuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgaWYgKGRbMF0gPT0gJ2UnKSByZXR1cm4gdHJ1ZTsgfSk7XG5cbiAgICAgICAgICAgIGlmIChleHRlcm5hbExvb3AubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGVsb29wID0gZXh0ZXJuYWxMb29wWzBdO1xuICAgICAgICAgICAgICAgIG51Y3MgPSBlbG9vcFsyXS5zb3J0KG51bWJlclNvcnQpO1xuXG4gICAgICAgICAgICAgICAgcHJldiA9IG51Y3NbMF07XG4gICAgICAgICAgICAgICAgaGxvb3AgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG51bUdyZWF0ZXIgPSAwO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbnVjcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobnVjc1tpXSAtIHByZXYgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBudW1HcmVhdGVyICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcHJldiA9IG51Y3NbaV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG51bUdyZWF0ZXIgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBlbG9vcFswXSA9ICdoJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG51bUdyZWF0ZXIgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICBlbG9vcFswXSA9ICdpJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbG9vcFswXSA9ICdtJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZWFzc2lnbkxpbmtVaWRzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIHJlYXNzaWduIHVpZHMgdG8gdGhlIGxpbmtzLCBjb3JyZXNwb25kaW5nIHRvIHRoZSB1aWRzIG9mIHRoZSB0d28gbm9kZXNcbiAgICAgICAgLy8gdGhleSBjb25uZWN0XG4gICAgICAgIHZhciBpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VsZi5saW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc2VsZi5saW5rc1tpXS51aWQgPSBzZWxmLmxpbmtzW2ldLnNvdXJjZS51aWQgKyBzZWxmLmxpbmtzW2ldLnRhcmdldC51aWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG5cbiAgICBzZWxmLnJlbW92ZVBzZXVkb2tub3RzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChzZWxmLnBhaXJ0YWJsZS5sZW5ndGggPiAxKVxuICAgICAgICAgICAgc2VsZi5wc2V1ZG9rbm90UGFpcnMgPSBzZWxmLnBzZXVkb2tub3RQYWlycy5jb25jYXQocm5hVXRpbGl0aWVzLnJlbW92ZVBzZXVkb2tub3RzRnJvbVBhaXJ0YWJsZShzZWxmLnBhaXJ0YWJsZSkpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmFkZFBzZXVkb2tub3RzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8qIEFkZCBhbGwgb2YgdGhlIHBzZXVkb2tub3QgcGFpcnMgd2hpY2ggYXJlIHN0b3JlZCBvdXRzaWRlXG4gICAgICAgICAqIG9mIHRoZSBwYWlydGFibGUgYmFjayB0byB0aGUgcGFpcnRhYmxlXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgcHQgPSBzZWxmLnBhaXJ0YWJsZTtcbiAgICAgICAgdmFyIHBzZXVkb2tub3RQYWlycyA9IHNlbGYucHNldWRva25vdFBhaXJzO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHNldWRva25vdFBhaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwdFtwc2V1ZG9rbm90UGFpcnNbaV1bMF1dID0gcHNldWRva25vdFBhaXJzW2ldWzFdO1xuICAgICAgICAgICAgcHRbcHNldWRva25vdFBhaXJzW2ldWzFdXSA9IHBzZXVkb2tub3RQYWlyc1tpXVswXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYucHNldWRva25vdFBhaXJzID0gW107XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmFkZE5hbWUgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgc2VsZi5uYW1lID0gJyc7XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYubmFtZSA9IG5hbWU7XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIGlmIChzZWxmLnJuYUxlbmd0aCA+IDApXG4gICAgICAgIHNlbGYucmVjYWxjdWxhdGVFbGVtZW50cygpO1xuXG4gICAgc2VsZi5nZXROb2RlRnJvbU51Y2xlb3RpZGVzID0gZnVuY3Rpb24obnVjcykge1xuICAgICAgICAvKiBHZXQgYSBub2RlIGdpdmVuIGEgbnVjbGVvdGlkZSBudW1iZXIgb3IgYW4gYXJyYXkgb2YgbnVjbGVvdGlkZVxuICAgICAgICAgKiBudW1iZXJzIGluZGljYXRpbmcgYW4gZWxlbWVudCBub2RlICovXG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobnVjcykgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2VsZi5ub2Rlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmICgnbnVjcycgaW4gc2VsZi5ub2Rlc1tqXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5ub2Rlc1tqXS5udWNzLmVxdWFscyhudWNzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYubm9kZXNbal07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNlbGYubm9kZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5ub2Rlc1tqXS5udW0gPT0gbnVjcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5ub2Rlc1tqXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZygnRVJST1I6IE5vIG5vZGUgZm91bmQgZm9yIG51Y3M6JywgbnVjcyk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vbGVjdWxlc1RvSnNvbihtb2xlY3VsZXNKc29uKSB7XG4gICAgLyogQ29udmVydCBhIGxpc3Qgb2YgUk5BIGFuZCBwcm90ZWluIG1vbGVjdWxlcyB0byBhIGxpc3Qgb2YgUk5BR3JhcGhcbiAgICAgKiBQcm90ZWluR3JhcGggYW5kIGV4dHJhTGlua3Mgc3RydWN0dXJlICovXG5cbiAgICB2YXIgbm9kZXMgPSB7fTsgLy9pbmRleCB0aGUgbm9kZXMgYnkgdWlkXG4gICAgdmFyIGdyYXBocyA9IFtdO1xuICAgIHZhciBleHRyYUxpbmtzID0gW107XG5cblxuICAgIC8vIENyZWF0ZSB0aGUgZ3JhcGhzIGZvciBlYWNoIG1vbGVjdWxlXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb2xlY3VsZXNKc29uLm1vbGVjdWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbW9sZWN1bGUgPSBtb2xlY3VsZXNKc29uLm1vbGVjdWxlc1tpXTtcbiAgICAgICAgdmFyIHJnO1xuXG4gICAgICAgIGlmIChtb2xlY3VsZS50eXBlID09ICdybmEnKSB7XG4gICAgICAgICAgICByZyA9IG5ldyBSTkFHcmFwaChtb2xlY3VsZS5zZXEsIG1vbGVjdWxlLnNzLCBtb2xlY3VsZS5oZWFkZXIpO1xuICAgICAgICAgICAgcmcuY2lyY3VsYXJpemVFeHRlcm5hbCA9IHRydWU7XG4gICAgICAgICAgICByZy5lbGVtZW50c1RvSnNvbigpXG4gICAgICAgICAgICAuYWRkUG9zaXRpb25zKCdudWNsZW90aWRlJywgbW9sZWN1bGUucG9zaXRpb25zKVxuICAgICAgICAgICAgLmFkZExhYmVscygpXG4gICAgICAgICAgICAucmVpbmZvcmNlU3RlbXMoKVxuICAgICAgICAgICAgLnJlaW5mb3JjZUxvb3BzKCk7XG5cblxuICAgICAgICB9IGVsc2UgaWYgKG1vbGVjdWxlLnR5cGUgPT0gJ3Byb3RlaW4nKSB7XG4gICAgICAgICAgICByZyA9IG5ldyBQcm90ZWluR3JhcGgobW9sZWN1bGUuaGVhZGVyLCBtb2xlY3VsZS5zaXplKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmcuYWRkVWlkcyhtb2xlY3VsZS51aWRzKTtcblxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJnLm5vZGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBub2Rlc1tyZy5ub2Rlc1tqXS51aWRdID0gcmcubm9kZXNbal07XG4gICAgICAgIH1cblxuICAgICAgICBncmFwaHMucHVzaChyZyk7XG4gICAgfVxuXG4gICAgLy9BZGQgdGhlIGV4dHJhIGxpbmtzXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb2xlY3VsZXNKc29uLmV4dHJhTGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGluayA9IG1vbGVjdWxlc0pzb24uZXh0cmFMaW5rc1tpXTtcblxuICAgICAgICBsaW5rLnNvdXJjZSA9IG5vZGVzW2xpbmsuc291cmNlXTtcbiAgICAgICAgbGluay50YXJnZXQgPSBub2Rlc1tsaW5rLnRhcmdldF07XG4gICAgICAgIGxpbmsudWlkID0gc2x1Z2lkLm5pY2UoKTtcblxuICAgICAgICBleHRyYUxpbmtzLnB1c2gobGluayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsnZ3JhcGhzJzogZ3JhcGhzLCAnZXh0cmFMaW5rcyc6IGV4dHJhTGlua3N9O1xufTtcbiIsImltcG9ydCB7Uk5BR3JhcGh9IGZyb20gJy4vcm5hZ3JhcGguanMnO1xuXG5pbXBvcnQge3NpbXBsZVh5Q29vcmRpbmF0ZXN9IGZyb20gJy4vc2ltcGxlcm5hcGxvdC5qcyc7XG5pbXBvcnQge05BVmlld30gZnJvbSAnLi9uYXZpZXcvbmF2aWV3LmpzJ1xuXG5pbXBvcnQgJy4uL3N0eWxlcy9ybmFwbG90LmNzcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBybmFQbG90KHBhc3NlZE9wdGlvbnMgPSB7fSkge1xuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAnd2lkdGgnOiAzMDAsXG4gICAgICAgICdoZWlnaHQnOiAzMDAsXG4gICAgICAgICdudWNsZW90aWRlUmFkaXVzJzogNSxcbiAgICAgICAgJ3JuYUVkZ2VQYWRkaW5nJzogMSwgICAgIC8vIGhvdyBmYXIgdGhlIGxlZnRtb3N0LCByaWdodG1vc3QsIHRvcG1vc3QgYW5kIGJvdHRvbW9zdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBudWNsZW90aWRlcyBhcmUgZnJvbSB0aGUgZWRnZSBvZiB0aGUgcGxvdFxuICAgICAgICAnbGFiZWxJbnRlcnZhbCc6IDEwLFxuICAgICAgICAnc2hvd051Y2xlb3RpZGVMYWJlbHMnOiB0cnVlLFxuICAgICAgICAnc3RhcnROdWNsZW90aWRlTnVtYmVyJzogMSxcbiAgICAgICAgJ2J1bmRsZUV4dGVybmFsTGlua3MnOiBmYWxzZSxcbiAgICAgICAgXG4gICAgICAgICdybmFMYXlvdXQnOiAnc2ltcGxlJywgLy8gc2ltcGxlIG9yIG5hdmlld1xuICAgICAgICAnbmFtZVBvc2l0aW9uJzogJzAgMCcgLy8gZm9yIHggYW5kIHkgZWl0aGVyIDAsIDAuNSBvciAxXG4gICAgfTtcbiAgICB2YXIgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24ob3B0aW9ucywgcGFzc2VkT3B0aW9ucyk7XG5cbiAgICB2YXIgeFNjYWxlLCB5U2NhbGU7XG4gICAgXG4gICAgZnVuY3Rpb24gY3JlYXRlVHJhbnNmb3JtVG9GaWxsVmlld3BvcnQoeFZhbHVlcywgeVZhbHVlcykge1xuICAgICAgICAvLyBjcmVhdGUgdHJhbnNmb3JtIHRoYXQgd2lsbCBzY2FsZSB0aGUgeCBhbmQgeSB2YWx1ZXMgc28gdGhhdFxuICAgICAgICAvLyB0aGV5IGZpbGwgdGhlIGF2YWlsYWJsZSB2aWV3cG9ydFxuICAgICAgICBsZXQgeEV4dGVudCA9IGQzLmV4dGVudCh4VmFsdWVzKTtcbiAgICAgICAgbGV0IHlFeHRlbnQgPSBkMy5leHRlbnQoeVZhbHVlcyk7XG5cbiAgICAgICAgLy8gYWRkIHRoZSByYWRpdXMgb2YgdGhlIG51Y2xlb3RpZGVzXG4gICAgICAgIHhFeHRlbnRbMF0gLT0gb3B0aW9ucy5udWNsZW90aWRlUmFkaXVzICsgb3B0aW9ucy5ybmFFZGdlUGFkZGluZztcbiAgICAgICAgeUV4dGVudFswXSAtPSBvcHRpb25zLm51Y2xlb3RpZGVSYWRpdXMgKyBvcHRpb25zLnJuYUVkZ2VQYWRkaW5nO1xuXG4gICAgICAgIHhFeHRlbnRbMV0gKz0gb3B0aW9ucy5udWNsZW90aWRlUmFkaXVzICsgb3B0aW9ucy5ybmFFZGdlUGFkZGluZztcbiAgICAgICAgeUV4dGVudFsxXSArPSBvcHRpb25zLm51Y2xlb3RpZGVSYWRpdXMgKyBvcHRpb25zLnJuYUVkZ2VQYWRkaW5nO1xuXG4gICAgICAgIC8vIGZpbmQgb3V0IGhvdyB3aWRlIGFuZCBoZWlnaHQgdGhlIG1vbGVjdWxlXG4gICAgICAgIHZhciB4UmFuZ2UgPSB4RXh0ZW50WzFdIC0geEV4dGVudFswXTtcbiAgICAgICAgdmFyIHlSYW5nZSA9IHlFeHRlbnRbMV0gLSB5RXh0ZW50WzBdO1xuXG4gICAgICAgIC8vIGhvdyBtdWNoIHdpZGVyIC8gdGFsbGVyIGlzIGl0IHRoYW4gdGhlIGF2YWlsYWJsZSB2aWV3cG9ydFxuICAgICAgICB2YXIgeEV4dHJhID0geFJhbmdlIC0gb3B0aW9ucy53aWR0aDtcbiAgICAgICAgdmFyIHlFeHRyYSA9IHlSYW5nZSAtIG9wdGlvbnMuaGVpZ2h0O1xuXG4gICAgICAgIC8vIG9uY2Ugd2UgaGF2ZSBhIHNjYWxlIGZvciBvbmUgZGltZW5zaW9uLCB3ZSBjYW4gY3JlYXRlIHRoZSBzY2FsZSBmb3IgdGhlIG90aGVyXG4gICAgICAgIC8vIGtlZXBpbmcgdGhlIHNhbWUgZXhwYW5zaW9uIC8gc2hyaW5raW5nIHJhdGlvXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZU90aGVyU2NhbGUoZmlyc3RTY2FsZSwgbmV3RG9tYWluLCBuZXdSYW5nZSkge1xuICAgICAgICAgICAgdmFyIHNjYWxlRmFjdG9yID0gKGZpcnN0U2NhbGUucmFuZ2UoKVsxXSAtIGZpcnN0U2NhbGUucmFuZ2UoKVswXSkgL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZpcnN0U2NhbGUuZG9tYWluKClbMV0gLSBmaXJzdFNjYWxlLmRvbWFpbigpWzBdKTtcbiAgICAgICAgICAgIHZhciBuZXdXaWR0aCA9IChuZXdEb21haW5bMV0gLSBuZXdEb21haW5bMF0pICogc2NhbGVGYWN0b3JcbiAgICAgICAgICAgIHZhciBuZXdNYXJnaW4gPSAoKG5ld1JhbmdlWzFdIC0gbmV3UmFuZ2VbMF0pIC0gbmV3V2lkdGgpIC8gMjtcblxuICAgICAgICAgICAgcmV0dXJuIHsnc2NhbGVGYWN0b3InOiBzY2FsZUZhY3RvcixcbiAgICAgICAgICAgICAgICAgICAgJ3NjYWxlJzogZDMuc2NhbGUubGluZWFyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9tYWluKG5ld0RvbWFpbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmFuZ2UoW25ld1JhbmdlWzBdICsgbmV3TWFyZ2luLCBuZXdSYW5nZVsxXSAtIG5ld01hcmdpbl0pfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXQ7XG5cbiAgICAgICAgaWYgKHhFeHRyYSA+IHlFeHRyYSkge1xuICAgICAgICAgICAgLy8gd2UgaGF2ZSB0byBzaHJpbmsgbW9yZSBpbiB0aGUgeC1kaW1lbnNpb24gdGhhbiB0aGUgeVxuICAgICAgICAgICAgeFNjYWxlID0gZDMuc2NhbGUubGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oeEV4dGVudClcbiAgICAgICAgICAgIC5yYW5nZShbMCwgb3B0aW9ucy53aWR0aF0pXG5cbiAgICAgICAgICAgIHJldCA9IGNyZWF0ZU90aGVyU2NhbGUoeFNjYWxlLCB5RXh0ZW50LCBbMCwgb3B0aW9ucy5oZWlnaHRdKTtcbiAgICAgICAgICAgIHlTY2FsZSA9IHJldC5zY2FsZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHdlIGhhdmUgdG8gc2hyaW5rIG1vcmUgaW4gdGhlIHgtZGltZW5zaW9uIHRoYW4gdGhlIHlcbiAgICAgICAgICAgIHlTY2FsZSA9IGQzLnNjYWxlLmxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKHlFeHRlbnQpXG4gICAgICAgICAgICAucmFuZ2UoWzAsIG9wdGlvbnMuaGVpZ2h0XSlcblxuICAgICAgICAgICAgcmV0ID0gY3JlYXRlT3RoZXJTY2FsZSh5U2NhbGUsIHhFeHRlbnQsIFswLCBvcHRpb25zLndpZHRoXSk7XG4gICAgICAgICAgICB4U2NhbGUgPSByZXQuc2NhbGU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgeE9mZnNldCA9IHhTY2FsZS5yYW5nZSgpWzBdIC0geFNjYWxlLmRvbWFpbigpWzBdO1xuICAgICAgICB2YXIgeU9mZnNldCA9IHlTY2FsZS5yYW5nZSgpWzBdIC0geVNjYWxlLmRvbWFpbigpWzBdO1xuXG4gICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyAtKHhTY2FsZS5kb21haW4oKVswXSAqIHJldC5zY2FsZUZhY3RvciAtIHhTY2FsZS5yYW5nZSgpWzBdKSArXG4gICAgICAgICAgICAgICAgICAnLCcgKyAtKHlTY2FsZS5kb21haW4oKVswXSAqIHJldC5zY2FsZUZhY3RvciAtIHlTY2FsZS5yYW5nZSgpWzBdKSArICcpJyArXG4gICAgICAgICAgICAnc2NhbGUoJyArIHJldC5zY2FsZUZhY3RvciArICcpJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVOdWNsZW90aWRlcyhzZWxlY3Rpb24sIG51Y2xlb3RpZGVOb2Rlcykge1xuICAgICAgICAvLyBjcmVhdGUgZ3JvdXBpbmdzIGZvciBlYWNoIG51Y2xlb3RpZGUgYW5kIGxhYmVsXG4gICAgICAgIHZhciBncyA9IHNlbGVjdGlvblxuICAgICAgICAuc2VsZWN0QWxsKCcucm5hLWJhc2UnKVxuICAgICAgICAuZGF0YShudWNsZW90aWRlTm9kZXMpXG4gICAgICAgIC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyBkLnggKyAnLCcgKyBkLnkgKyAnKSc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBjaXJjbGVzID0gZ3MuYXBwZW5kKCdzdmc6Y2lyY2xlJylcbiAgICAgICAgLmF0dHIoJ2RhdGEtYmFzZScsIChkKSA9PiB7IGlmIChkLm5hbWUpIHsgcmV0dXJuIGQubmFtZS50b0xvd2VyQ2FzZSgpOyB9fSlcbiAgICAgICAgLmF0dHIoJ3InLCBvcHRpb25zLm51Y2xlb3RpZGVSYWRpdXMpXG4gICAgICAgIC5jbGFzc2VkKCdybmEtYmFzZScsIHRydWUpXG4gICAgICAgIFxuXG4gICAgICAgIGlmIChvcHRpb25zLnNob3dOdWNsZW90aWRlTGFiZWxzKSB7XG4gICAgICAgICAgICB2YXIgbnVjbGVvdGlkZUxhYmVscyA9IGdzLmFwcGVuZCgnc3ZnOnRleHQnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5uYW1lOyB9KVxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgICAgICAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnY2VudHJhbCcpXG4gICAgICAgICAgICAuY2xhc3NlZCgnbnVjbGVvdGlkZS1sYWJlbCcsIHRydWUpXG4gICAgICAgICAgICAuYXBwZW5kKCdzdmc6dGl0bGUnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zdHJ1Y3RfbmFtZSArICc6JyArIGQubnVtOyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUxhYmVscyhzZWxlY3Rpb24sIGxhYmVsTm9kZXMpIHtcbiAgICAgICAgLy8gY3JlYXRlIGdyb3VwaW5ncyBmb3IgZWFjaCBudWNsZW90aWRlIGFuZCBsYWJlbFxuXG4gICAgICAgIHZhciBncyA9IHNlbGVjdGlvblxuICAgICAgICAuc2VsZWN0QWxsKCcucm5hTGFiZWwnKVxuICAgICAgICAuZGF0YShsYWJlbE5vZGVzKVxuICAgICAgICAuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdzdmc6ZycpXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgZC54ICsgJywnICsgZC55ICsgJyknO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHZhciBjaXJjbGVzID0gZ3MuYXBwZW5kKCdzdmc6Y2lyY2xlJylcbiAgICAgICAgLmF0dHIoJ3InLCBvcHRpb25zLm51Y2xlb3RpZGVSYWRpdXMpXG4gICAgICAgIC5jbGFzc2VkKCdybmEtYmFzZScsIHRydWUpXG4gICAgICAgIC5jbGFzc2VkKCdsYWJlbCcsIHRydWUpXG5cbiAgICAgICAgdmFyIG51bWJlckxhYmVscyA9IGdzLmFwcGVuZCgnc3ZnOnRleHQnKVxuICAgICAgICAudGV4dChmdW5jdGlvbihkKSB7IHJldHVybiBkLm5hbWU7IH0pXG4gICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgICAuYXR0cignZm9udC13ZWlnaHQnLCAnYm9sZCcpXG4gICAgICAgIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdjZW50cmFsJylcbiAgICAgICAgLmNsYXNzZWQoJ251bWJlci1sYWJlbCcsIHRydWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU5hbWUoc2VsZWN0aW9uLCBuYW1lKSB7XG4gICAgICAgIGxldCBuYW1lTGFiZWwgPSBzZWxlY3Rpb24uYXBwZW5kKCdzdmc6dGV4dCcpXG4gICAgICAgIC8vLmF0dHIoJ2R5JywgLTEwKVxuICAgICAgICAuY2xhc3NlZCgncm5hLW5hbWUnLCB0cnVlKVxuICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgLmF0dHIoJ2FsaWdubWVudC1iYXNlbGluZScsICdjZW50cmFsJylcbiAgICAgICAgLnRleHQobmFtZSk7XG4gICAgXG4gICAgICAgIGxldCB4eVBvcyA9IG9wdGlvbnMubmFtZVBvc2l0aW9uLnNwbGl0KFwiIFwiLCAyKSAvLyAwIDAuNSAxXG4gICAgICAgIGxldCB4eSA9IFtdXG4gICAgICAgIGxldCB0ZXh0QkJveCA9IG5hbWVMYWJlbC5ub2RlKCkuZ2V0QkJveCgpXG4gICAgICAgIGxldCB0ZXh0U2l6ZSA9IFt0ZXh0QkJveC53aWR0aCwgdGV4dEJCb3guaGVpZ2h0XVxuICAgICAgICBsZXQgcGxvdFNpemUgPSBbb3B0aW9ucy53aWR0aCwgb3B0aW9ucy5oZWlnaHRdXG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBwIGluIFswLCAxXSkge1xuICAgICAgICAgICAgc3dpdGNoICh4eVBvc1twXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJzAnOlxuICAgICAgICAgICAgICAgICAgICB4eVtwXSA9IHRleHRTaXplW3BdIC8gMlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgICAgICAgICAgeHlbcF0gPSBwbG90U2l6ZVtwXSAtIHRleHRTaXplW3BdIC8gMlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICcwLjUnOlxuICAgICAgICAgICAgICAgICAgICB4eVtwXSA9IHBsb3RTaXplW3BdIC8gMlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBuYW1lTGFiZWwuYXR0cigneCcsIHh5WzBdKS5hdHRyKCd5JywgeHlbMV0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZUV4dGVybmFsTGlua3NCdW5kbGUoc2VsZWN0aW9uLCBsaW5rcykge1xuICAgICAgICB2YXIgbm9kZXNEaWN0ID0ge307XG4gICAgICAgIHZhciBsaW5rc0xpc3QgPSBbXTtcbiAgICAgICAgbGlua3MgPSBsaW5rcy5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5saW5rVHlwZSA9PSAnY29ycmVjdCcgfHwgZC5saW5rVHlwZSA9PSAnaW5jb3JyZWN0JyB8fCBkLmxpbmtUeXBlID09ICdleHRyYSc7IH0pO1xuICAgICAgICBcbiAgICAgICAgc2VsZWN0aW9uLnNlbGVjdEFsbCgnW2xpbmstdHlwZT1leHRyYV0nKVxuICAgICAgICAucmVtb3ZlKCk7XG5cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAobGlua3NbaV0uc291cmNlID09PSBudWxsIHx8IGxpbmtzW2ldLnRhcmdldCA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgbm9kZXNEaWN0W2xpbmtzW2ldLnNvdXJjZS51aWRdID0gbGlua3NbaV0uc291cmNlO1xuICAgICAgICAgICAgbm9kZXNEaWN0W2xpbmtzW2ldLnRhcmdldC51aWRdID0gbGlua3NbaV0udGFyZ2V0O1xuXG4gICAgICAgICAgICBsaW5rc0xpc3QucHVzaCh7J3NvdXJjZSc6IGxpbmtzW2ldLnNvdXJjZS51aWQsICd0YXJnZXQnOiBsaW5rc1tpXS50YXJnZXQudWlkLCAnbGlua1R5cGUnOiBsaW5rc1tpXS5saW5rVHlwZSwgJ2V4dHJhTGlua1R5cGUnOiBsaW5rc1tpXS5leHRyYUxpbmtUeXBlfSkgO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZidW5kbGluZyA9IGQzLkZvcmNlRWRnZUJ1bmRsaW5nKCkubm9kZXMobm9kZXNEaWN0KS5lZGdlcyhsaW5rc0xpc3QpXG4gICAgICAgIC5jb21wYXRpYmlsaXR5X3RocmVzaG9sZCgwLjgpLnN0ZXBfc2l6ZSgwLjIpO1xuICAgICAgICB2YXIgcmVzdWx0cyAgID0gZmJ1bmRsaW5nKCk7XG5cbiAgICAgICAgdmFyIGQzbGluZSA9IGQzLnN2Zy5saW5lKClcbiAgICAgICAgICAgIC54KGZ1bmN0aW9uKGQpe3JldHVybiBkLng7fSlcbiAgICAgICAgICAgIC55KGZ1bmN0aW9uKGQpe3JldHVybiBkLnk7fSlcbiAgICAgICAgICAgIC5pbnRlcnBvbGF0ZSgnbGluZWFyJyk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWRnZV9zdWJwb2ludF9kYXRhID0gcmVzdWx0c1tpXTtcbiAgICAgICAgICAgIC8vIGZvciBlYWNoIG9mIHRoZSBhcnJheXMgaW4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIC8vIGRyYXcgYSBsaW5lIGJldHdlZW4gdGhlIHN1YmRpdmlvbnMgcG9pbnRzIGZvciB0aGF0IGVkZ2VcblxuICAgICAgICAgICAgc2VsZWN0aW9uLmFwcGVuZCgncGF0aCcpLmF0dHIoJ2QnLCBkM2xpbmUoZWRnZV9zdWJwb2ludF9kYXRhKSlcbiAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICdub25lJylcbiAgICAgICAgICAgIC5hdHRyKCdsaW5rLXR5cGUnLCBmdW5jdGlvbihkKSB7IHJldHVybiBsaW5rc0xpc3RbaV0ubGlua1R5cGU7IH0pXG4gICAgICAgICAgICAuYXR0cignZXh0cmEtbGluay10eXBlJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gbGlua3NMaXN0W2ldLmV4dHJhTGlua1R5cGU7IH0pXG4gICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZS1vcGFjaXR5JywwLjQpOyAvL3VzZSBvcGFjaXR5IGFzIGJsZW5kaW5nXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUxpbmtzKHNlbGVjdGlvbiwgbGlua3MpIHtcbiAgICAgICAgbGlua3MgPSBsaW5rcy5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zb3VyY2UgIT09IG51bGwgJiYgZC50YXJnZXQgIT09IG51bGw7IH0pO1xuICAgICAgICB2YXIgZ3MgPSBzZWxlY3Rpb24uc2VsZWN0QWxsKCcucm5hLWxpbmsnKVxuICAgICAgICAuZGF0YShsaW5rcylcbiAgICAgICAgLmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgnc3ZnOmxpbmUnKVxuICAgICAgICAuYXR0cigneDEnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnNvdXJjZS54OyB9KVxuICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnRhcmdldC54OyB9KVxuICAgICAgICAuYXR0cigneTEnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnNvdXJjZS55OyB9KVxuICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnRhcmdldC55OyB9KVxuICAgICAgICAuYXR0cignbGluay10eXBlJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5saW5rVHlwZTsgfSlcbiAgICAgICAgLmF0dHIoJ2V4dHJhLWxpbmstdHlwZScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuZXh0cmFMaW5rVHlwZTsgfSlcbiAgICAgICAgLmNsYXNzZWQoJ3JuYS1saW5rJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hhcnQoc2VsZWN0aW9uKSB7XG4gICAgICAgIHNlbGVjdGlvbi5lYWNoKGZ1bmN0aW9uKGRhdGEpIHsgICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBwbG90ID0gZDMuc2VsZWN0KHRoaXMpLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuY2xhc3NlZCgncm5hcGxvdCcsIHRydWUpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGRhdGEgc2hvdWxkIGJlIGEgZGljdGlvbmFyeSBjb250YWluaW5nIGF0IGxlYXN0IGEgc3RydWN0dXJlXG4gICAgICAgICAgICAvLyBhbmQgcG9zc2libHkgYSBzZXF1ZW5jZVxuICAgICAgICAgICAgbGV0IHJnID0gbmV3IFJOQUdyYXBoKGRhdGEuc2VxdWVuY2UsIGRhdGEuc3RydWN0dXJlLCBkYXRhLm5hbWUsIG9wdGlvbnMuc3RhcnROdWNsZW90aWRlTnVtYmVyKVxuICAgICAgICAgICAgICAgICAgICAucmVjYWxjdWxhdGVFbGVtZW50cygpXG4gICAgICAgICAgICAgICAgICAgIC5lbGVtZW50c1RvSnNvbigpXG4gICAgICAgICAgICAgICAgICAgIC5hZGROYW1lKGRhdGEubmFtZSk7XG5cbiAgICAgICAgICAgIGRhdGEucm5hR3JhcGggPSByZztcbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgcG9zaXRpb24gb2YgZWFjaCBudWNsZW90aWRlXG4gICAgICAgICAgICAvLyB0aGUgcG9zaXRpb25zIG9mIHRoZSBsYWJlbHMgd2lsbCBiZSBjYWxjdWxhdGVkIGluXG4gICAgICAgICAgICAvLyB0aGUgYWRkTGFiZWxzIGZ1bmN0aW9uXG4gICAgICAgICAgICBsZXQgcG9zaXRpb25zID0gW107XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnJuYUxheW91dCA9PT0gJ25hdmlldycpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmF2aWV3ID0gbmV3IE5BVmlldygpO1xuICAgICAgICAgICAgICAgIHZhciBuYVZpZXdQb3NpdGlvbnMgPSBuYXZpZXcubmF2aWV3X3h5X2Nvb3JkaW5hdGVzKHJnLnBhaXJ0YWJsZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYVZpZXdQb3NpdGlvbnMubmJhc2U7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnMucHVzaChbbmFWaWV3UG9zaXRpb25zLnhbaV0sIG5hVmlld1Bvc2l0aW9ucy55W2ldXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnMgPSBzaW1wbGVYeUNvb3JkaW5hdGVzKHJnLnBhaXJ0YWJsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJnLmFkZFBvc2l0aW9ucygnbnVjbGVvdGlkZScsIHBvc2l0aW9ucylcbiAgICAgICAgICAgIC8vLnJlaW5mb3JjZVN0ZW1zKClcbiAgICAgICAgICAgIC8vLnJlaW5mb3JjZUxvb3BzKClcbiAgICAgICAgICAgIC8vLmFkZEV4dHJhTGlua3MoZGF0YS5leHRyYUxpbmtzKVxuICAgICAgICAgICAgLmFkZExhYmVscyhvcHRpb25zLnN0YXJ0TnVjbGVvdGlkZU51bWJlciwgb3B0aW9ucy5sYWJlbEludGVydmFsKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgdHJhbnNmb3JtIHRoYXQgd2lsbCBmaXQgdGhlIG1vbGVjdWxlIHRvIHRoZVxuICAgICAgICAgICAgLy8gc2l6ZSBvZiB0aGUgdmlld3BvcnQgKGNhbnZhcywgc3ZnLCB3aGF0ZXZlcikgICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBmaWxsVmlld3BvcnRUcmFuc2Zvcm0gPSBjcmVhdGVUcmFuc2Zvcm1Ub0ZpbGxWaWV3cG9ydChcbiAgICAgICAgICAgICAgICByZy5ub2Rlcy5tYXAoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC54OyB9KSxcbiAgICAgICAgICAgICAgICByZy5ub2Rlcy5tYXAoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC55OyB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHBsb3QuYXR0cigndHJhbnNmb3JtJywgZmlsbFZpZXdwb3J0VHJhbnNmb3JtKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IG51Y2xlb3RpZGVOb2RlcyA9IHJnLm5vZGVzLmZpbHRlcihmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubm9kZVR5cGUgPT0gJ251Y2xlb3RpZGUnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGxldCBsYWJlbE5vZGVzID0gcmcubm9kZXMuZmlsdGVyKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5ub2RlVHlwZSA9PSAnbGFiZWwnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBsaW5rcyA9IHJnLmxpbmtzO1xuXG4gICAgICAgICAgICBjcmVhdGVMaW5rcyhwbG90LCBsaW5rcyk7XG4gICAgICAgICAgICBjcmVhdGVOdWNsZW90aWRlcyhwbG90LCBudWNsZW90aWRlTm9kZXMpO1xuICAgICAgICAgICAgY3JlYXRlTGFiZWxzKHBsb3QsIGxhYmVsTm9kZXMpO1xuICAgICAgICAgICAgY3JlYXRlTmFtZShkMy5zZWxlY3QodGhpcyksIGRhdGEubmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmJ1bmRsZUV4dGVybmFsTGlua3MpIHtcbiAgICAgICAgICAgICAgICBtYWtlRXh0ZXJuYWxMaW5rc0J1bmRsZShwbG90LCBsaW5rcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2hhcnQud2lkdGggPSBmdW5jdGlvbihfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG9wdGlvbnMud2lkdGg7XG4gICAgICAgIG9wdGlvbnMud2lkdGggPSBfO1xuICAgICAgICByZXR1cm4gY2hhcnQ7XG4gICAgfTtcblxuICAgIGNoYXJ0LmhlaWdodCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3B0aW9ucy5oZWlnaHQ7XG4gICAgICAgIG9wdGlvbnMuaGVpZ2h0ID0gXztcbiAgICAgICAgcmV0dXJuIGNoYXJ0O1xuICAgIH07XG5cbiAgICBjaGFydC5zaG93TnVjbGVvdGlkZUxhYmVscyA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3B0aW9ucy5zaG93TnVjbGVvdGlkZUxhYmVscztcbiAgICAgICAgb3B0aW9ucy5zaG93TnVjbGVvdGlkZUxhYmVscyA9IF87XG4gICAgICAgIHJldHVybiBjaGFydDtcbiAgICB9O1xuXG4gICAgY2hhcnQucm5hRWRnZVBhZGRpbmcgPSBmdW5jdGlvbihfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG9wdGlvbnMucm5hRWRnZVBhZGRpbmc7XG4gICAgICAgIG9wdGlvbnMucm5hRWRnZVBhZGRpbmcgPSBfO1xuICAgICAgICByZXR1cm4gY2hhcnQ7XG4gICAgfTtcblxuICAgIGNoYXJ0Lm51Y2xlb3RpZGVSYWRpdXMgPSBmdW5jdGlvbihfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG9wdGlvbnMubnVjbGVvdGlkZVJhZGl1cztcbiAgICAgICAgb3B0aW9ucy5udWNsZW90aWRlUmFkaXVzID0gXztcbiAgICAgICAgcmV0dXJuIGNoYXJ0O1xuICAgIH07XG5cbiAgICBjaGFydC5sYWJlbEludGVydmFsID0gZnVuY3Rpb24oXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvcHRpb25zLmxhYmVsSW50ZXJ2YWw7XG4gICAgICAgIG9wdGlvbnMubGFiZWxJbnRlcnZhbCA9IF87XG4gICAgICAgIHJldHVybiBjaGFydDtcbiAgICB9O1xuXG4gICAgY2hhcnQuc2hvd051Y2xlb3RpZGVMYWJlbHMgPSBmdW5jdGlvbihfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG9wdGlvbnMuc2hvd051Y2xlb3RpZGVMYWJlbHM7XG4gICAgICAgIG9wdGlvbnMuc2hvd051Y2xlb3RpZGVMYWJlbHMgPSBfO1xuICAgICAgICByZXR1cm4gY2hhcnQ7XG4gICAgfTtcblxuICAgIGNoYXJ0LnN0YXJ0TnVjbGVvdGlkZU51bWJlciA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3B0aW9ucy5zdGFydE51Y2xlb3RpZGVOdW1iZXI7XG4gICAgICAgIG9wdGlvbnMuc3RhcnROdWNsZW90aWRlTnVtYmVyID0gXztcbiAgICAgICAgcmV0dXJuIGNoYXJ0O1xuICAgIH07XG5cbiAgICBjaGFydC5idW5kbGVFeHRlcm5hbExpbmtzID0gZnVuY3Rpb24oXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvcHRpb25zLmJ1bmRsZUV4dGVybmFsTGlua3M7XG4gICAgICAgIG9wdGlvbnMuYnVuZGxlRXh0ZXJuYWxMaW5rcyA9IF87XG4gICAgICAgIHJldHVybiBjaGFydDtcbiAgICB9O1xuICAgIFxuICAgIGNoYXJ0LnJuYUxheW91dCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3B0aW9ucy5ybmFMYXlvdXQ7XG4gICAgICAgIG9wdGlvbnMucm5hTGF5b3V0ID0gXztcbiAgICAgICAgcmV0dXJuIGNoYXJ0O1xuICAgIH07XG4gICAgXG4gICAgY2hhcnQubmFtZVBvc2l0aW9uID0gZnVuY3Rpb24oXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvcHRpb25zLm5hbWVQb3NpdGlvbjtcbiAgICAgICAgb3B0aW9ucy5uYW1lUG9zaXRpb24gPSBfO1xuICAgICAgICByZXR1cm4gY2hhcnQ7XG4gICAgfTtcbiAgICBcbiAgICByZXR1cm4gY2hhcnQ7XG59IiwiaW1wb3J0IHtybmFQbG90fSBmcm9tICcuL3JuYXBsb3QuanMnO1xuXG5pbXBvcnQgJy4uL3N0eWxlcy9ybmFwbG90LmNzcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBybmFUcmVlbWFwKHBhc3NlZE9wdGlvbnMpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgJ3dpZHRoJzogMzAwLFxuICAgICAgICAnaGVpZ2h0JzogMzAwLFxuICAgICAgICAnbnVjbGVvdGlkZVJhZGl1cyc6IDUsXG4gICAgICAgICdybmFFZGdlUGFkZGluZyc6IDEsICAgICAvLyBob3cgZmFyIHRoZSBsZWZ0bW9zdCwgcmlnaHRtb3N0LCB0b3Btb3N0IGFuZCBib3R0b21vc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbnVjbGVvdGlkZXMgYXJlIGZyb20gdGhlIGVkZ2Ugb2YgdGhlIHBsb3RcbiAgICAgICAgJ2xhYmVsSW50ZXJ2YWwnOiAxMCxcbiAgICAgICAgJ3Nob3dOdWNsZW90aWRlTGFiZWxzJzogdHJ1ZSxcbiAgICAgICAgJ3N0YXJ0TnVjbGVvdGlkZU51bWJlcic6IDEsXG4gICAgICAgICdidW5kbGVFeHRlcm5hbExpbmtzJzogZmFsc2UsXG4gICAgICAgIFxuICAgICAgICAncm5hTGF5b3V0JzogJ3NpbXBsZScsIC8vIHNpbXBsZSBvciBuYXZpZXdcbiAgICAgICAgJ25hbWVQb3NpdGlvbic6ICcwIDAnLCAvLyBmb3IgeCBhbmQgeSBlaXRoZXIgMCwgMC41IG9yIDFcbiAgICB9O1xuICAgIFxuICAgIHZhciBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihvcHRpb25zLCBwYXNzZWRPcHRpb25zKTtcblxuICAgIGZ1bmN0aW9uIHJuYVRyZWVtYXBOb2RlKHNlbGVjdGlvbikge1xuICAgICAgICAvLyBjcmVhdGUgYSBiYWNrZ3JvdW5kIHJlY3RhbmdsZSBmb3IgZWFjaCBSTkEgc3RydWN0dXJlXG4gICAgICAgIHNlbGVjdGlvbi5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuICd0cmFuc2xhdGUoJyArIGQueCArICcsJyArIGQueSArICcpJyB9KVxuICAgICAgICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCBmdW5jdGlvbihkKSB7IHJldHVybiBNYXRoLm1heCgwLCBkLmR4KTsgfSlcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBmdW5jdGlvbihkKSB7IHJldHVybiBNYXRoLm1heCgwLCBkLmR5KTsgfSlcblxuICAgICAgICAgICAgLy8gZHJhdyB0aGUgYWN0dWFsIFJOQSBzdHJ1Y3R1cmVcbiAgICAgICAgICAgIHZhciBjaGFydCA9IHJuYVBsb3Qob3B0aW9ucylcbiAgICAgICAgICAgIC53aWR0aCggTWF0aC5tYXgoMCwgZC5keCkpXG4gICAgICAgICAgICAuaGVpZ2h0KCBNYXRoLm1heCgwLCBkLmR5KSlcblxuICAgICAgICAgICAgaWYgKCdzdHJ1Y3R1cmUnIGluIGQpIGQzLnNlbGVjdCh0aGlzKS5jYWxsKGNoYXJ0KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgY2hhcnQgPSBmdW5jdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgc2VsZWN0aW9uLmVhY2goZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGE6JywgZGF0YSlcbiAgICAgICAgICAgIC8vIGluaXRpYWxpemUgdGhlIHRyZWVtYXAgc3RydWN0dXJlXG4gICAgICAgICAgICAvLyBzYW1wbGUgaW5wdXRcbiAgICAgICAgICAgIC8vIHsgJ25hbWUnOiAnYmxhaCcsXG4gICAgICAgICAgICAvLyAnY2hpbGRyZW46IFt7J3N0cnVjdHVyZSc6ICcuLigoLi4pKScsXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICdzZXF1ZW5jZSc6ICdBQ0NHR0NDJyxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgJ3NpemUnOiA1MH1dXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB2YXIgdHJlZW1hcCA9IGQzLmxheW91dC50cmVlbWFwKClcbiAgICAgICAgICAgIC5zaXplKFtvcHRpb25zLndpZHRoLCBvcHRpb25zLmhlaWdodF0pXG4gICAgICAgICAgICAuc3RpY2t5KGZhbHNlKVxuICAgICAgICAgICAgLnZhbHVlKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuc2l6ZTsgfSk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyA8Zz4gZm9yIGVhY2ggbm9kZSBpbiB0aGUgdHJlZW1hcFxuICAgICAgICAgICAgLy8gdGhpcyBtYXkgYmUgYSBsaXR0bGUgcmVkdW5kYW50LCBzaW5jZSB3ZSBleHBlY3QgdGhlIGNhbGxpbmdcbiAgICAgICAgICAgIC8vIHNlbGVjdGlvbiB0byBjb250YWluIHRoZWlyIG93biBnIGVsZW1lbnRzXG4gICAgICAgICAgICB2YXIgZ0VudGVyID0gZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ3JuYXRyZWVtYXAnLCB0cnVlKVxuICAgICAgICAgICAgdmFyIHRyZWVtYXBHbm9kZXMgPSBnRW50ZXIuZGF0dW0oZGF0YSkuc2VsZWN0QWxsKCcudHJlZW1hcG5vZGUnKVxuICAgICAgICAgICAgICAgIC5kYXRhKHRyZWVtYXAubm9kZXMpXG4gICAgICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAgICAgICAuY2xhc3NlZCgndHJlZW1hcG5vZGUnLCB0cnVlKVxuICAgICAgICAgICAgICAgIC5jYWxsKHJuYVRyZWVtYXBOb2RlKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNoYXJ0LndpZHRoID0gZnVuY3Rpb24oXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvcHRpb25zLndpZHRoO1xuICAgICAgICBvcHRpb25zLndpZHRoID0gXztcbiAgICAgICAgcmV0dXJuIGNoYXJ0O1xuICAgIH07XG5cbiAgICBjaGFydC5oZWlnaHQgPSBmdW5jdGlvbihfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG9wdGlvbnMuaGVpZ2h0O1xuICAgICAgICBvcHRpb25zLmhlaWdodCA9IF87XG4gICAgICAgIHJldHVybiBjaGFydDtcbiAgICB9O1xuICAgIFxuICAgIGNoYXJ0LnNob3dOdWNsZW90aWRlTGFiZWxzID0gZnVuY3Rpb24oXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvcHRpb25zLnNob3dOdWNsZW90aWRlTGFiZWxzO1xuICAgICAgICBvcHRpb25zLnNob3dOdWNsZW90aWRlTGFiZWxzID0gXztcbiAgICAgICAgcmV0dXJuIGNoYXJ0O1xuICAgIH07XG5cbiAgICBjaGFydC5ybmFFZGdlUGFkZGluZyA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3B0aW9ucy5ybmFFZGdlUGFkZGluZztcbiAgICAgICAgb3B0aW9ucy5ybmFFZGdlUGFkZGluZyA9IF87XG4gICAgICAgIHJldHVybiBjaGFydDtcbiAgICB9O1xuXG4gICAgY2hhcnQubnVjbGVvdGlkZVJhZGl1cyA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3B0aW9ucy5udWNsZW90aWRlUmFkaXVzO1xuICAgICAgICBvcHRpb25zLm51Y2xlb3RpZGVSYWRpdXMgPSBfO1xuICAgICAgICByZXR1cm4gY2hhcnQ7XG4gICAgfTtcblxuICAgIGNoYXJ0LmxhYmVsSW50ZXJ2YWwgPSBmdW5jdGlvbihfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG9wdGlvbnMubGFiZWxJbnRlcnZhbDtcbiAgICAgICAgb3B0aW9ucy5sYWJlbEludGVydmFsID0gXztcbiAgICAgICAgcmV0dXJuIGNoYXJ0O1xuICAgIH07XG5cbiAgICBjaGFydC5zaG93TnVjbGVvdGlkZUxhYmVscyA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3B0aW9ucy5zaG93TnVjbGVvdGlkZUxhYmVscztcbiAgICAgICAgb3B0aW9ucy5zaG93TnVjbGVvdGlkZUxhYmVscyA9IF87XG4gICAgICAgIHJldHVybiBjaGFydDtcbiAgICB9O1xuXG4gICAgY2hhcnQuc3RhcnROdWNsZW90aWRlTnVtYmVyID0gZnVuY3Rpb24oXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvcHRpb25zLnN0YXJ0TnVjbGVvdGlkZU51bWJlcjtcbiAgICAgICAgb3B0aW9ucy5zdGFydE51Y2xlb3RpZGVOdW1iZXIgPSBfO1xuICAgICAgICByZXR1cm4gY2hhcnQ7XG4gICAgfTtcblxuICAgIGNoYXJ0LmJ1bmRsZUV4dGVybmFsTGlua3MgPSBmdW5jdGlvbihfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG9wdGlvbnMuYnVuZGxlRXh0ZXJuYWxMaW5rcztcbiAgICAgICAgb3B0aW9ucy5idW5kbGVFeHRlcm5hbExpbmtzID0gXztcbiAgICAgICAgcmV0dXJuIGNoYXJ0O1xuICAgIH07XG4gICAgXG4gICAgY2hhcnQucm5hTGF5b3V0ID0gZnVuY3Rpb24oXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvcHRpb25zLnJuYUxheW91dDtcbiAgICAgICAgb3B0aW9ucy5ybmFMYXlvdXQgPSBfO1xuICAgICAgICByZXR1cm4gY2hhcnQ7XG4gICAgfTtcbiAgICBcbiAgICBjaGFydC5uYW1lUG9zaXRpb24gPSBmdW5jdGlvbihfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG9wdGlvbnMubmFtZVBvc2l0aW9uO1xuICAgICAgICBvcHRpb25zLm5hbWVQb3NpdGlvbiA9IF87XG4gICAgICAgIHJldHVybiBjaGFydDtcbiAgICB9O1xuICAgIFxuICAgIGNoYXJ0Lnpvb20gPSBmdW5jdGlvbihfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG9wdGlvbnMuem9vbTtcbiAgICAgICAgb3B0aW9ucy56b29tID0gXztcbiAgICAgICAgcmV0dXJuIGNoYXJ0O1xuICAgIH07XG5cbiAgICByZXR1cm4gY2hhcnQ7XG59XG4iLCJ2YXIgbnVtYmVyU29ydCA9IGZ1bmN0aW9uKGEsYikgeyByZXR1cm4gYSAtIGI7IH07XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheXNFcXVhbChhLCBiKSB7XG4gICAgLy8gY291cnRlc3kgb2YgXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMTE1OTgyL2hvdy10by1jaGVjay1pZi10d28tYXJyYXlzLWFyZS1lcXVhbC13aXRoLWphdmFzY3JpcHRcbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlO1xuICBpZiAoYSA9PT0gbnVsbCB8fCBiID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gIGlmIChhLmxlbmd0aCAhPSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHlvdSBkb24ndCBjYXJlIGFib3V0IHRoZSBvcmRlciBvZiB0aGUgZWxlbWVudHMgaW5zaWRlXG4gIC8vIHRoZSBhcnJheSwgeW91IHNob3VsZCBzb3J0IGJvdGggYXJyYXlzIGhlcmUuXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJOQVV0aWxpdGllcygpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyB0aGUgYnJhY2tldHMgdG8gdXNlIHdoZW4gY29uc3RydWN0aW5nIGRvdGJyYWNrZXQgc3RyaW5nc1xuICAgIC8vIHdpdGggcHNldWRva25vdHNcbiAgICBzZWxmLmJyYWNrZXRMZWZ0ID0gIFwiKFt7PEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCIuc3BsaXQoXCJcIik7XG4gICAgc2VsZi5icmFja2V0UmlnaHQgPSBcIildfT5hYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5elwiLnNwbGl0KFwiXCIpO1xuXG4gICAgc2VsZi5pbnZlcnNlQnJhY2tldHMgPSBmdW5jdGlvbihicmFja2V0KSB7XG4gICAgICAgIHZhciByZXMgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBicmFja2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZXNbYnJhY2tldFtpXV0gPSBpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfTtcblxuICAgIHNlbGYubWF4aW11bU1hdGNoaW5nID0gZnVuY3Rpb24gbWF4aW11bU1hdGNoaW5nKHB0KXtcbiAgICAgICAgLy8gQ291cnRlc3kgb2YgdGhlIGdyZWF0IFJvbm55IExvcmVuelxuXG4gICAgICAgIHZhciBuID0gcHRbMF07XG4gICAgICAgIHZhciBUVVJOID0gMDsgICAgLy9taW5pbWFsIG51bWJlciBvZiBudWNsZW90aWRlcyBpbiB0aGUgaGFpcnBpblxuXG4gICAgICAgIC8qIGFycmF5IGluaXQgKi9cbiAgICAgICAgdmFyIG1tID0gbmV3IEFycmF5KG4gKyAxKTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8PSBuOyBpKyspe1xuICAgICAgICAgICAgbW1baV0gPSBuZXcgQXJyYXkobiArIDEpO1xuICAgICAgICAgICAgZm9yKHZhciBqID0gaTsgaiA8PSBuOyBqKyspXG4gICAgICAgICAgICBtbVtpXVtqXSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1heGltdW0gPSAwO1xuXG4gICAgICAgIC8qIGFjdHVhbCBjb21wdXRhdGlvbiAqL1xuICAgICAgICBmb3IodmFyIGkgPSBuIC0gVFVSTiAtIDE7IGkgPiAwOyBpLS0pXG5cbiAgICAgICAgZm9yKHZhciBqID0gaSArIFRVUk4gKyAxOyBqIDw9IG47IGorKyl7XG4gICAgICAgICAgICBtYXhpbXVtID0gbW1baV1bai0xXTtcblxuICAgICAgICAgICAgZm9yKHZhciBsID0gaiAtIFRVUk4gLSAxOyBsID49IGk7IGwtLSkge1xuICAgICAgICAgICAgICAgIGlmKHB0W2xdID09PSBqKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIGJhc2UgcGFpciBoZXJlXG4gICAgICAgICAgICAgICAgICAgIG1heGltdW0gPSBNYXRoLm1heChtYXhpbXVtLCAoKGwgPiBpKSA/IG1tW2ldW2wtMV0gOiAwKSArIDEgKyAoKGogLSBsIC0gMSA+IDApID8gbW1bbCsxXVtqLTFdIDogMCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW1baV1bal0gPSBtYXhpbXVtO1xuICAgICAgICB9XG5cbiAgICAgICAgbWF4aW11bSA9IG1tWzFdW25dO1xuXG4gICAgICAgIHJldHVybiBtbTtcbiAgICB9O1xuXG4gICAgc2VsZi5iYWNrdHJhY2tNYXhpbXVtTWF0Y2hpbmcgPSBmdW5jdGlvbihtbSwgb2xkUHQpIHtcbiAgICAgIHZhciBwdCA9IEFycmF5LmFwcGx5KG51bGwsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXkobW0ubGVuZ3RoKSkubWFwKGZ1bmN0aW9uKCkgeyByZXR1cm4gMCB9KTsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NyZWF0ZSBhbiBhcnJheSBjb250YWluaW5nIHplcm9zXG5cbiAgICAgIHNlbGYubW1CdChtbSwgcHQsIG9sZFB0LCAxLCBtbS5sZW5ndGgtMSk7XG4gICAgICByZXR1cm4gcHQ7XG4gICAgfVxuXG4gICAgc2VsZi5tbUJ0ID0gZnVuY3Rpb24obW0sIHB0LCBvbGRQdCwgaSwgail7XG4gICAgICAgIC8vIENyZWF0ZSBhIHBhaXJ0YWJsZSBmcm9tIHRoZSBiYWNrdHJhY2tpbmdcbiAgICAgIHZhciBtYXhpbXVtID0gbW1baV1bal07XG4gICAgICB2YXIgVFVSTiA9IDA7XG5cbiAgICAgIGlmKGogLSBpIC0gMSA8IFRVUk4pIHJldHVybjsgICAgLyogbm8gbW9yZSBwYWlycyAqL1xuXG4gICAgICBpZihtbVtpXVtqLTFdID09IG1heGltdW0peyAgICAgIC8qIGogaXMgdW5wYWlyZWQgKi9cbiAgICAgICAgc2VsZi5tbUJ0KG1tLCBwdCwgb2xkUHQsIGksIGotMSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZm9yKHZhciBxID0gaiAtIFRVUk4gLSAxOyBxID49IGk7IHEtLSl7ICAvKiBqIGlzIHBhaXJlZCB3aXRoIHNvbWUgcSAqL1xuICAgICAgICBpZiAob2xkUHRbal0gIT09IHEpXG4gICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICB2YXIgbGVmdFBhcnQgICAgID0gKHEgPiBpKSA/IG1tW2ldW3EtMV0gOiAwO1xuICAgICAgICB2YXIgZW5jbG9zZWRQYXJ0ID0gKGogLSBxIC0gMSA+IDApID8gbW1bcSsxXVtqLTFdIDogMDtcblxuICAgICAgICBpZihsZWZ0UGFydCArIGVuY2xvc2VkUGFydCArIDEgPT0gbWF4aW11bSkge1xuICAgICAgICAgICAgLy8gdGhlcmUncyBhIGJhc2UgcGFpciBiZXR3ZWVuIGogYW5kIHFcbiAgICAgICAgICAgIHB0W3FdID0gajtcbiAgICAgICAgICAgIHB0W2pdID0gcTtcblxuICAgICAgICAgICAgaWYoaSA8IHEpIFxuICAgICAgICAgICAgICAgIHNlbGYubW1CdChtbSwgcHQsIG9sZFB0LCBpLCBxIC0gMSk7XG5cbiAgICAgICAgICAgIHNlbGYubW1CdChtbSwgcHQsIG9sZFB0LCBxICsgMSwgaiAtIDEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vYWxlcnQoaSArIFwiLFwiICsgaiArIFwiOiBiYWNrdHJhY2tpbmcgZmFpbGVkIVwiKTtcbiAgICAgIGNvbnNvbGUubG9nKCdGQUlMRUQhISEnICsgaSArICcsJyArIGogKyAnOiBiYWNrdHJhY2tpbmcgZmFpbGVkIScpO1xuXG4gICAgfTtcblxuICAgIHNlbGYuZG90YnJhY2tldFRvUGFpcnRhYmxlID0gZnVuY3Rpb24oZG90YnJhY2tldCkge1xuICAgICAgICAvLyBjcmVhdGUgYW4gYXJyYXkgYW5kIGluaXRpYWxpemUgaXQgdG8gMFxuICAgICAgICB2YXIgcHQgPSBBcnJheS5hcHBseShudWxsLCBuZXcgQXJyYXkoZG90YnJhY2tldC5sZW5ndGggKyAxKSkubWFwKE51bWJlci5wcm90b3R5cGUudmFsdWVPZiwwKTtcbiAgICAgICAgXG4gICAgICAgIC8vICB0aGUgZmlyc3QgZWxlbWVudCBpcyBhbHdheXMgdGhlIGxlbmd0aCBvZiB0aGUgUk5BIG1vbGVjdWxlXG4gICAgICAgIHB0WzBdID0gZG90YnJhY2tldC5sZW5ndGg7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIHBhaXJpbmcgcGFydG5lcnMgZm9yIGVhY2ggc3ltYm9sXG4gICAgICAgIHZhciBzdGFjayA9IHt9O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbGYuYnJhY2tldExlZnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHN0YWNrW2ldID0gW107XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsb29rdXAgdGhlIGluZGV4IG9mIGVhY2ggc3ltYm9sIGluIHRoZSBicmFja2V0IGFycmF5XG4gICAgICAgIHZhciBpbnZlcnNlQnJhY2tldExlZnQgPSBzZWxmLmludmVyc2VCcmFja2V0cyhzZWxmLmJyYWNrZXRMZWZ0KTtcbiAgICAgICAgdmFyIGludmVyc2VCcmFja2V0UmlnaHQgPSBzZWxmLmludmVyc2VCcmFja2V0cyhzZWxmLmJyYWNrZXRSaWdodCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb3RicmFja2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYSA9IGRvdGJyYWNrZXRbaV07XG4gICAgICAgICAgICB2YXIgbmkgPSBpICsgMTtcblxuICAgICAgICAgICAgaWYgKGEgPT0gJy4nIHx8IGEgPT0gJ28nKSB7XG4gICAgICAgICAgICAgICAgLy8gdW5wYWlyZWRcbiAgICAgICAgICAgICAgICBwdFtuaV0gPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoYSBpbiBpbnZlcnNlQnJhY2tldExlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gb3BlbiBwYWlyP1xuICAgICAgICAgICAgICAgICAgICBzdGFja1tpbnZlcnNlQnJhY2tldExlZnRbYV1dLnB1c2gobmkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYSBpbiBpbnZlcnNlQnJhY2tldFJpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xvc2UgcGFpcj9cbiAgICAgICAgICAgICAgICAgICAgdmFyIGogPSBzdGFja1tpbnZlcnNlQnJhY2tldFJpZ2h0W2FdXS5wb3AoKTtcblxuICAgICAgICAgICAgICAgICAgICBwdFtuaV0gPSBqO1xuICAgICAgICAgICAgICAgICAgICBwdFtqXSA9IG5pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IFwiVW5rbm93biBzeW1ib2wgaW4gZG90YnJhY2tldCBzdHJpbmdcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc3RhY2spIHtcbiAgICAgICAgICAgIGlmIChzdGFja1trZXldLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBcIlVubWF0Y2hlZCBiYXNlIGF0IHBvc2l0aW9uIFwiICsgc3RhY2tba2V5XVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwdDtcbiAgICB9O1xuXG4gICAgc2VsZi5pbnNlcnRJbnRvU3RhY2sgPSBmdW5jdGlvbihzdGFjaywgaSwgaikge1xuICAgICAgICB2YXIgayA9IDA7XG4gICAgICAgIHdoaWxlIChzdGFja1trXS5sZW5ndGggPiAwICYmIHN0YWNrW2tdW3N0YWNrW2tdLmxlbmd0aCAtIDFdIDwgaikge1xuICAgICAgICAgICAgayArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhY2tba10ucHVzaChqKTtcbiAgICAgICAgcmV0dXJuIGs7XG4gICAgfTtcblxuICAgIHNlbGYuZGVsZXRlRnJvbVN0YWNrID0gZnVuY3Rpb24oc3RhY2ssIGopIHtcbiAgICAgICAgdmFyIGsgPSAwO1xuICAgICAgICB3aGlsZSAoc3RhY2tba10ubGVuZ3RoID09PSAwIHx8IHN0YWNrW2tdW3N0YWNrW2tdLmxlbmd0aC0xXSAhPSBqKSB7XG4gICAgICAgICAgICBrICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgc3RhY2tba10ucG9wKCk7XG4gICAgICAgIHJldHVybiBrO1xuICAgIH07XG5cbiAgICBzZWxmLnBhaXJ0YWJsZVRvRG90YnJhY2tldCA9IGZ1bmN0aW9uKHB0KSB7XG4gICAgICAgIC8vIHN0b3JlIHRoZSBwYWlyaW5nIHBhcnRuZXJzIGZvciBlYWNoIHN5bWJvbFxuICAgICAgICB2YXIgc3RhY2sgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwdFswXTsgaSsrKSB7XG4gICAgICAgICAgICBzdGFja1tpXSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNlZW4gPSB7fTtcbiAgICAgICAgdmFyIHJlcyA9IFwiXCI7XG4gICAgICAgIHZhciBpO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHB0WzBdICsgMTsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocHRbaV0gIT09IDAgJiYgcHRbaV0gaW4gc2Vlbikge1xuICAgICAgICAgICAgICAgIHRocm93IFwiSW52YWxpZCBwYWlydGFibGUgY29udGFpbnMgZHVwbGljYXRlIGVudHJpZXNcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlZW5bcHRbaV1dID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHB0W2ldID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzICs9ICcuJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHB0W2ldID4gaSkge1xuICAgICAgICAgICAgICAgICAgICByZXMgKz0gc2VsZi5icmFja2V0TGVmdFtzZWxmLmluc2VydEludG9TdGFjayhzdGFjaywgaSwgcHRbaV0pXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXMgKz0gc2VsZi5icmFja2V0UmlnaHRbc2VsZi5kZWxldGVGcm9tU3RhY2soc3RhY2ssIGkpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH07XG5cbiAgICBzZWxmLmZpbmRVbm1hdGNoZWQgPSBmdW5jdGlvbihwdCwgZnJvbSwgdG8pIHtcbiAgICAgICAgLypcbiAgICAgICAgICogRmluZCB1bm1hdGNoZWQgbnVjbGVvdGlkZXMgaW4gdGhpcyBtb2xlY3VsZS5cbiAgICAgICAgICovXG4gICAgICAgIHZhciB0b1JlbW92ZSA9IFtdO1xuICAgICAgICB2YXIgdW5tYXRjaGVkID0gW107XG5cbiAgICAgICAgdmFyIG9yaWdGcm9tID0gZnJvbTtcbiAgICAgICAgdmFyIG9yaWdUbyA9IHRvO1xuICAgICAgICB2YXIgaTtcblxuICAgICAgICBmb3IgKHZhciBpID0gZnJvbTsgaSA8PSB0bzsgaSsrKVxuICAgICAgICAgICAgaWYgKHB0W2ldICE9PSAwICYmIChwdFtpXSA8IGZyb20gfHwgcHRbaV0gPiB0bykpXG4gICAgICAgICAgICAgICAgdW5tYXRjaGVkLnB1c2goW2kscHRbaV1dKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gb3JpZ0Zyb207IGkgPD0gb3JpZ1RvOyBpKyspIHtcbiAgICAgICAgICAgIHdoaWxlIChwdFtpXSA9PT0gMCAmJiBpIDw9IG9yaWdUbykgaSsrO1xuXG4gICAgICAgICAgICB0byA9IHB0W2ldO1xuXG4gICAgICAgICAgICB3aGlsZSAocHRbaV0gPT09IHRvKSB7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIHRvLS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRvUmVtb3ZlID0gdG9SZW1vdmUuY29uY2F0KHNlbGYuZmluZFVubWF0Y2hlZChwdCwgaSwgdG8pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1bm1hdGNoZWQubGVuZ3RoID4gMClcbiAgICAgICAgICAgIHRvUmVtb3ZlLnB1c2godW5tYXRjaGVkKTtcblxuICAgICAgICByZXR1cm4gdG9SZW1vdmU7XG4gICAgfTtcblxuICAgIHNlbGYucmVtb3ZlUHNldWRva25vdHNGcm9tUGFpcnRhYmxlID0gZnVuY3Rpb24ocHQpIHtcbiAgICAgICAgLyogUmVtb3ZlIHRoZSBwc2V1ZG9rbm90cyBmcm9tIHRoaXMgc3RydWN0dXJlIGluIHN1Y2ggYSBmYXNoaW9uXG4gICAgICAgICAqIHRoYXQgdGhlIGxlYXN0IGFtb3VudCBvZiBiYXNlLXBhaXJzIG5lZWQgdG8gYmUgYnJva2VuXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSBwYWlydGFibGUgaXMgbWFuaXB1bGF0ZWQgaW4gcGxhY2UgYW5kIGEgbGlzdCBvZiB0dXBsZXNcbiAgICAgICAgICogaW5kaWNhdGluZyB0aGUgYnJva2VuIGJhc2UgcGFpcnMgaXMgcmV0dXJuZWQuXG4gICAgICAgICAqL1xuXG4gICAgICAgIHZhciBtbSA9IHNlbGYubWF4aW11bU1hdGNoaW5nKHB0KTtcbiAgICAgICAgdmFyIG5ld1B0ID0gc2VsZi5iYWNrdHJhY2tNYXhpbXVtTWF0Y2hpbmcobW0sIHB0KTtcbiAgICAgICAgdmFyIHJlbW92ZWQgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHB0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocHRbaV0gPCBpKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBpZiAobmV3UHRbaV0gIT0gcHRbaV0pICB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlZC5wdXNoKFtpLCBwdFtpXV0pO1xuICAgICAgICAgICAgICAgIHB0W3B0W2ldXSA9IDA7XG4gICAgICAgICAgICAgICAgcHRbaV0gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XG4gICAgfTtcblxuICAgIHNlbGYucHRUb0VsZW1lbnRzID0gZnVuY3Rpb24ocHQsIGxldmVsLCBpLCBqLCBkb3RCcmFja2V0QnJlYWtzKSB7XG4gICAgICAgIC8qIENvbnZlcnQgYSBwYWlyIHRhYmxlIHRvIGEgbGlzdCBvZiBzZWNvbmRhcnkgc3RydWN0dXJlIFxuICAgICAgICAgKiBlbGVtZW50czpcbiAgICAgICAgICpcbiAgICAgICAgICogW1sncycsMSxbMiwzXV1cbiAgICAgICAgICpcbiAgICAgICAgICogVGhlICdzJyBpbmRpY2F0ZXMgdGhhdCBhbiBlbGVtZW50IGNhbiBiZSBhIHN0ZW0uIEl0IGNhbiBhbHNvIGJlXG4gICAgICAgICAqIGFuIGludGVyaW9yIGxvb3AgKCdpJyksIGEgaGFpcnBpbiBsb29wICgnaCcpIG9yIGEgbXVsdGlsb29wICgnbScpXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSBzZWNvbmQgbnVtYmVyICgxIGluIHRoaXMgY2FzZSkgaW5kaWNhdGVzIHRoZSBkZXB0aCBvclxuICAgICAgICAgKiBob3cgbWFueSBiYXNlIHBhaXJzIGhhdmUgdG8gYmUgYnJva2VuIHRvIGdldCB0byB0aGlzIGVsZW1lbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEZpbmFsbHksIHRoZXJlIGlzIHRoZSBsaXN0IG9mIG51Y2xlb3RpZGVzIHdoaWNoIGFyZSBwYXJ0IG9mXG4gICAgICAgICAqIG9mIHRoaXMgZWxlbWVudC5cbiAgICAgICAgICovXG4gICAgICAgIHZhciBlbGVtZW50cyA9IFtdO1xuICAgICAgICB2YXIgdTUgPSBbaS0xXTtcbiAgICAgICAgdmFyIHUzID0gW2orMV07XG5cbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCA1KVxuICAgICAgICAgICAgZG90QnJhY2tldEJyZWFrcyA9IFtdO1xuXG4gICAgICAgIGlmIChpID4gailcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9pdGVyYXRlIG92ZXIgdGhlIHVucGFpcmVkIHJlZ2lvbnMgb24gZWl0aGVyIHNpZGVcbiAgICAgICAgICAgIC8vdGhpcyBpcyBlaXRoZXIgNScgYW5kIDMnIHVucGFpcmVkIGlmIGxldmVsID09IDBcbiAgICAgICAgICAgIC8vb3IgYW4gaW50ZXJpb3IgbG9vcCBvciBhIG11bHRpbG9vcFxuICAgICAgICAgICAgZm9yICg7IHB0W2ldID09PSAwOyBpKyspIHsgdTUucHVzaChpKTsgfVxuICAgICAgICAgICAgZm9yICg7IHB0W2pdID09PSAwOyBqLS0pIHsgdTMucHVzaChqKTsgfVxuXG4gICAgICAgICAgICBpZiAoaSA+IGopIHtcbiAgICAgICAgICAgICAgICAvL2hhaXJwaW4gbG9vcCBvciBvbmUgbGFyZ2UgdW5wYWlyZWQgbW9sZWN1bGVcbiAgICAgICAgICAgICAgICB1NS5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtbJ2UnLGxldmVsLCB1NS5zb3J0KG51bWJlclNvcnQpXV07XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiB3ZSBoYXZlIGNoYWluIGJyZWFrcyBkdWVcbiAgICAgICAgICAgICAgICAgICAgLy8gdG8gbXVsdGlwbGUgc3RyYW5kcyBpbiB0aGUgaW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4dGVybmFsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsZWZ0ID0gW107XG4gICAgICAgICAgICAgICAgICAgIHZhciByaWdodCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHU1Lmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXh0ZXJuYWwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQucHVzaCh1NVtrXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdC5wdXNoKHU1W2tdKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRvdEJyYWNrZXRCcmVha3MuaW5kZXhPZih1NVtrXSkgPj0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRlcm5hbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoZXh0ZXJuYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbWydoJyxsZXZlbCwgdTUuc29ydChudW1iZXJTb3J0KV1dO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIG5vdCwgdGhpcyBpcyBhIHNpbXBsZSBoYWlycGluIGxvb3BcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbWydoJyxsZXZlbCwgdTUuc29ydChudW1iZXJTb3J0KV1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHB0W2ldICE9IGopIHtcbiAgICAgICAgICAgICAgICAvL211bHRpbG9vcFxuICAgICAgICAgICAgICAgIHZhciBtID0gdTU7XG4gICAgICAgICAgICAgICAgdmFyIGsgPSBpO1xuXG4gICAgICAgICAgICAgICAgLy8gdGhlIG51Y2xlb3RpZGUgYmVmb3JlIGFuZCB0aGUgc3RhcnRpbmcgbnVjbGVvdGlkZVxuICAgICAgICAgICAgICAgIG0ucHVzaChrKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoayA8PSBqKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlY3Vyc2UgaW50byBhIHN0ZW1cbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMgPSBlbGVtZW50cy5jb25jYXQoc2VsZi5wdFRvRWxlbWVudHMocHQsIGxldmVsLCBrLCBwdFtrXSwgZG90QnJhY2tldEJyZWFrcykpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgbnVjbGVvdGlkZXMgYmV0d2VlbiBzdGVtc1xuICAgICAgICAgICAgICAgICAgICBtLnB1c2gocHRba10pO1xuICAgICAgICAgICAgICAgICAgICBrID0gcHRba10gKyAxO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKDsgcHRba10gPT09IDAgJiYgayA8PSBqOyBrKyspIHsgbS5wdXNoKGspO31cbiAgICAgICAgICAgICAgICAgICAgbS5wdXNoKGspO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtLnBvcCgpO1xuICAgICAgICAgICAgICAgIG0gPSBtLmNvbmNhdCh1Myk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKG0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cy5wdXNoKFsnZScsIGxldmVsLCBtLnNvcnQobnVtYmVyU29ydCldKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChbJ20nLCBsZXZlbCwgbS5zb3J0KG51bWJlclNvcnQpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50cztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHB0W2ldID09PSBqKSB7XG4gICAgICAgICAgICAgICAgLy9pbnRlcmlvciBsb29wXG4gICAgICAgICAgICAgICAgdTUucHVzaChpKTtcbiAgICAgICAgICAgICAgICB1My5wdXNoKGopO1xuXG4gICAgICAgICAgICAgICAgdmFyIGNvbWJpbmVkID0gdTUuY29uY2F0KHUzKTtcbiAgICAgICAgICAgICAgICBpZiAoY29tYmluZWQubGVuZ3RoID4gNCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cy5wdXNoKFsnZScsbGV2ZWwsIHU1LmNvbmNhdCh1Mykuc29ydChudW1iZXJTb3J0KV0pO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cy5wdXNoKFsnaScsbGV2ZWwsIHU1LmNvbmNhdCh1Mykuc29ydChudW1iZXJTb3J0KV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgIHZhciBzID0gW107XG4gICAgICAgICAgICAvL2dvIHRocm91Z2ggdGhlIHN0ZW1cbiAgICAgICAgICAgIHdoaWxlIChwdFtpXSA9PT0gaiAmJiBpIDwgaikge1xuICAgICAgICAgICAgICAgIC8vb25lIHN0ZW1cbiAgICAgICAgICAgICAgICBzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgcy5wdXNoKGopO1xuXG4gICAgICAgICAgICAgICAgaSArPSAxO1xuICAgICAgICAgICAgICAgIGogLT0gMTtcblxuICAgICAgICAgICAgICAgIGxldmVsICs9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHU1ID0gW2ktMV07XG4gICAgICAgICAgICB1MyA9IFtqKzFdO1xuICAgICAgICAgICAgZWxlbWVudHMucHVzaChbJ3MnLCBsZXZlbCwgcy5zb3J0KG51bWJlclNvcnQpXSk7XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnRzLmNvbmNhdChzZWxmLnB0VG9FbGVtZW50cyhwdCwgbGV2ZWwsIGksIGosIGRvdEJyYWNrZXRCcmVha3MpKTtcbiAgICB9O1xuXG59XG5cbmV4cG9ydCB2YXIgcm5hVXRpbGl0aWVzID0gbmV3IFJOQVV0aWxpdGllcygpO1xuXG5leHBvcnQgZnVuY3Rpb24gQ29sb3JTY2hlbWUoY29sb3JzVGV4dCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZWxmLmNvbG9yc1RleHQgPSBjb2xvcnNUZXh0O1xuXG4gICAgc2VsZi5wYXJzZVJhbmdlID0gZnVuY3Rpb24ocmFuZ2VUZXh0KSB7XG4gICAgICAgIC8vcGFyc2UgYSBudW1iZXIgcmFuZ2Ugc3VjaCBhcyAxLTEwIG9yIDMsNyw5IG9yIGp1c3QgN1xuICAgICAgICB2YXIgcGFydHMgPSByYW5nZVRleHQuc3BsaXQoJywnKVxuICAgICAgICB2YXIgbnVtcyA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vY291bGQgYmUgMSBvciAxMC0xMSAgb3Igc29tZXRoaW5nIGxpa2UgdGhhdFxuICAgICAgICAgICAgdmFyIHBhcnRzMSA9IHBhcnRzW2ldLnNwbGl0KCctJyk7XG5cbiAgICAgICAgICAgIGlmIChwYXJ0czEubGVuZ3RoID09IDEpXG4gICAgICAgICAgICAgICAgbnVtcy5wdXNoKHBhcnNlSW50KHBhcnRzMVswXSkpO1xuICAgICAgICAgICAgZWxzZSBpZiAocGFydHMxLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZyb20gPSBwYXJzZUludChwYXJ0czFbMF0pO1xuICAgICAgICAgICAgICAgIHZhciB0byA9IHBhcnNlSW50KHBhcnRzMVsxXSk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgZWFjaCBudW1iZXIgaW4gdGhpcyByYW5nZVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSBmcm9tOyBqIDw9IHRvOyBqKyspIFxuICAgICAgICAgICAgICAgICAgICBudW1zLnB1c2goailcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ01hbGZvcm1lZCByYW5nZSAodG9vIG1hbnkgZGFzaGVzKTonLCByYW5nZVRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bXM7XG4gICAgfVxuXG4gICAgc2VsZi5wYXJzZUNvbG9yVGV4dCA9IGZ1bmN0aW9uKGNvbG9yVGV4dCkge1xuICAgICAgICAvKiBQYXJzZSB0aGUgdGV4dCBvZiBhbiBSTkEgY29sb3Igc3RyaW5nLiBJbnN0cnVjdGlvbnMgYW5kIGRlc2NyaXB0aW9uXG4gICAgICAgICAqIG9mIHRoZSBmb3JtYXQgYXJlIGdpdmVuIGJlbG93LlxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGUgcmV0dXJuIGlzIGEganNvbiBkb3VibGUgZGljdGlvbmFyeSBpbmRleGVkIGZpcnN0IGJ5IHRoZSBcbiAgICAgICAgICogbW9sZWN1bGUgbmFtZSwgdGhlbiBieSB0aGUgbnVjbGVvdGlkZS4gVGhpcyBpcyB0aGVuIGFwcGxpZWRcbiAgICAgICAgICogYnkgZm9yY2UuanMgdG8gdGhlIFJOQXMgaXQgaXMgZGlzcGxheWluZy4gV2hlbiBubyBtb2xlY3VsZVxuICAgICAgICAgKiBuYW1lIGlzIHNwZWNpZmllZCwgdGhlIGNvbG9yIGlzIGFwcGxpZWQgdG8gYWxsIG1vbGVjdWxlcyovXG4gICAgICAgIHZhciBsaW5lcyA9IGNvbG9yVGV4dC5zcGxpdCgnXFxuJyk7XG4gICAgICAgIHZhciBjdXJyTW9sZWN1bGUgPSAnJztcbiAgICAgICAgdmFyIGNvdW50ZXIgPSAxO1xuICAgICAgICB2YXIgY29sb3JzSnNvbiA9IHtjb2xvclZhbHVlczogeycnOnt9fSwgcmFuZ2U6Wyd3aGl0ZScsICdzdGVlbGJsdWUnXX07XG4gICAgICAgIHZhciBkb21haW5WYWx1ZXMgPSBbXTtcblxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgaWYgKGxpbmVzW2ldWzBdID09ICc+Jykge1xuICAgICAgICAgICAgICAgIC8vIG5ldyBtb2xlY3VsZVxuICAgICAgICAgICAgICAgIGN1cnJNb2xlY3VsZSA9IGxpbmVzW2ldLnRyaW0oKS5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICBjb3VudGVyID0gMTtcblxuICAgICAgICAgICAgICAgIGNvbG9yc0pzb24uY29sb3JWYWx1ZXNbY3Vyck1vbGVjdWxlXSA9IHt9O1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgd29yZHMgPSBsaW5lc1tpXS50cmltKCkuc3BsaXQoL1tcXHNdKy8pO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHdvcmRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKHdvcmRzW2pdKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAod29yZHNbal0uc2VhcmNoKCdyYW5nZScpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoZXJlJ3MgYSBjb2xvciBzY2FsZSBpbiB0aGlzIGVudHJ5XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFydHMgPSB3b3Jkc1tqXS5zcGxpdCgnPScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnRzUmlnaHQgPSBwYXJ0c1sxXS5zcGxpdCgnOicpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcnNKc29uLnJhbmdlID0gW3BhcnRzUmlnaHRbMF0sIHBhcnRzUmlnaHRbMV1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAod29yZHNbal0uc2VhcmNoKCdkb21haW4nKSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoZXJlJ3MgYSBjb2xvciBzY2FsZSBpbiB0aGlzIGVudHJ5XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFydHMgPSB3b3Jkc1tqXS5zcGxpdCgnPScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnRzUmlnaHQgPSBwYXJ0c1sxXS5zcGxpdCgnOicpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcnNKc29uLmRvbWFpbiA9IFtwYXJ0c1JpZ2h0WzBdLCBwYXJ0c1JpZ2h0WzFdXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaXQncyBub3QgYSBudW1iZXIsIHNob3VsZCBiZSBhIGNvbWJpbmF0aW9uIFxuICAgICAgICAgICAgICAgICAgICAvLyBvZiBhIG51bWJlciAobnVjbGVvdGlkZSAjKSBhbmQgYSBjb2xvclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFydHMgPSB3b3Jkc1tqXS5zcGxpdCgnOicpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbnVtcyA9IHNlbGYucGFyc2VSYW5nZShwYXJ0c1swXSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IHBhcnRzWzFdXG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBudW1zLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNOYU4oY29sb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JzSnNvbi5jb2xvclZhbHVlc1tjdXJyTW9sZWN1bGVdW251bXNba11dID0gY29sb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yc0pzb24uY29sb3JWYWx1ZXNbY3Vyck1vbGVjdWxlXVtudW1zW2tdXSA9ICtjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21haW5WYWx1ZXMucHVzaChOdW1iZXIoY29sb3IpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vaXQncyBhIG51bWJlciwgc28gd2UgYWRkIGl0IHRvIHRoZSBsaXN0IG9mIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAvL3NlZW4gZm9yIHRoaXMgbW9sZWN1bGVcbiAgICAgICAgICAgICAgICAgICAgY29sb3JzSnNvbi5jb2xvclZhbHVlc1tjdXJyTW9sZWN1bGVdW2NvdW50ZXJdID0gTnVtYmVyKHdvcmRzW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlciArPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIGRvbWFpblZhbHVlcy5wdXNoKE51bWJlcih3b3Jkc1tqXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKCdkb21haW4nIGluIGNvbG9yc0pzb24pKVxuICAgICAgICAgICAgY29sb3JzSnNvbi5kb21haW4gPSBbTWF0aC5taW4uYXBwbHkobnVsbCwgZG9tYWluVmFsdWVzKSwgTWF0aC5tYXguYXBwbHkobnVsbCwgZG9tYWluVmFsdWVzKV07XG5cbiAgICAgICAgc2VsZi5jb2xvcnNKc29uID0gY29sb3JzSnNvbjtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5ub3JtYWxpemVDb2xvcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLyogXG4gICAgICAgICAqIE5vcm1hbGl6ZSB0aGUgcGFzc2VkIGluIHZhbHVlcyBzbyB0aGF0IHRoZXkgcmFuZ2UgZnJvbVxuICAgICAgICAgKiAwIHRvIDFcbiAgICAgICAgICovXG4gICAgICAgIHZhciB2YWx1ZTtcblxuICAgICAgICBmb3IgKHZhciBtb2xlY3VsZU5hbWUgaW4gc2VsZi5jb2xvcnNKc29uKSB7XG4gICAgICAgICAgICB2YXIgbWluTnVtID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgICAgIHZhciBtYXhOdW0gPSBOdW1iZXIuTUlOX1ZBTFVFO1xuXG4gICAgICAgICAgICAvLyBpdGVyYXRlIG9uY2UgdG8gZmluZCB0aGUgbWluIGFuZCBtYXggdmFsdWVzO1xuICAgICAgICAgICAgZm9yICh2YXIgcmVzbnVtIGluIHNlbGYuY29sb3JzSnNvbi5jb2xvclZhbHVlc1ttb2xlY3VsZU5hbWVdKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBzZWxmLmNvbG9yc0pzb24uY29sb3JWYWx1ZXNbbW9sZWN1bGVOYW1lXVtyZXNudW1dO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgbWluTnVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgbWluTnVtID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA+IG1heE51bSlcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heE51bSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaXRlcmF0ZSBhZ2FpbiB0byBub3JtYWxpemVcbiAgICAgICAgICAgIGZvciAocmVzbnVtIGluIHNlbGYuY29sb3JzSnNvbi5jb2xvclZhbHVlc1ttb2xlY3VsZU5hbWVdKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBzZWxmLmNvbG9yc0pzb24uY29sb3JWYWx1ZXNbbW9sZWN1bGVOYW1lXVtyZXNudW1dO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb2xvcnNKc29uLmNvbG9yVmFsdWVzW21vbGVjdWxlTmFtZV1bcmVzbnVtXSA9ICh2YWx1ZSAtIG1pbk51bSApIC8gKG1heE51bSAtIG1pbk51bSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucGFyc2VDb2xvclRleHQoc2VsZi5jb2xvcnNUZXh0KTtcbiAgICByZXR1cm4gc2VsZjtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBzaW1wbGVYeUNvb3JkaW5hdGVzIChwYWlyX3RhYmxlKSB7XG4gIHZhciBJTklUX0FOR0xFPTAuOyAgICAgLyogaW5pdGlhbCBiZW5kaW5nIGFuZ2xlICovXG4gIHZhciBJTklUX1ggPSAxMDAuOyAgICAgLyogY29vcmRpbmF0ZSBvZiBmaXJzdCBkaWdpdCAqL1xuICB2YXIgSU5JVF9ZID0gMTAwLjsgICAgIC8qIHNlZSBhYm92ZSAqL1xuICB2YXIgUkFESVVTID0gIDE1LjtcblxuICB2YXIgeCA9IFtdLCB5ID0gW107XG5cbiAgdmFyIGksIGxlbjtcbiAgdmFyICBhbHBoYTtcblxuICBsZW4gPSBwYWlyX3RhYmxlWzBdO1xuICB2YXIgYW5nbGUgPSBBcnJheS5hcHBseShudWxsLCBuZXcgQXJyYXkobGVuKzUpKS5tYXAoTnVtYmVyLnByb3RvdHlwZS52YWx1ZU9mLDApOyBcbiAgdmFyIGxvb3Bfc2l6ZSA9IEFycmF5LmFwcGx5KG51bGwsIG5ldyBBcnJheSgxNitNYXRoLmZsb29yKGxlbi81KSkpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoTnVtYmVyLnByb3RvdHlwZS52YWx1ZU9mLCAwKTsgXG4gIHZhciBzdGFja19zaXplID0gQXJyYXkuYXBwbHkobnVsbCwgbmV3IEFycmF5KDE2K01hdGguZmxvb3IobGVuLzUpKSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcChOdW1iZXIucHJvdG90eXBlLnZhbHVlT2YsIDApOyBcblxuICB2YXIgbHAgPSAwO1xuICB2YXIgc3RrID0gMDtcbiAgdmFyIFBJSEFMRiA9IE1hdGguUEkgLyAyO1xuXG5cbiAgdmFyIGxvb3AgPSBmdW5jdGlvbihpLCBqLCBwYWlyX3RhYmxlKVxuICAvKiBpLCBqIGFyZSB0aGUgcG9zaXRpb25zIEFGVEVSIHRoZSBsYXN0IHBhaXIgb2YgYSBzdGFjazsgaS5lXG4gICAgIGktMSBhbmQgaisxIGFyZSBwYWlyZWQuICovXG4gIHtcbiAgICAgIHZhciBjb3VudCA9IDI7ICAgLyogY291bnRzIHRoZSBWRVJUSUNFUyBvZiBhIGxvb3AgcG9seWdvbjsgdGhhdCdzXG4gICAgICAgICAgICAgICAgICAgICAgICAgIE5PVCBuZWNlc3NhcmlseSB0aGUgbnVtYmVyIG9mIHVucGFpcmVkIGJhc2VzIVxuICAgICAgICAgICAgICAgICAgICAgICAgICBVcG9uIGVudHJ5IHRoZSBsb29wIGhhcyBhbHJlYWR5IDIgdmVydGljZXMsIG5hbWVseVxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgcGFpciBpLTEvaisxLiAgKi9cblxuICB2YXIgICAgciA9IDAsIGJ1YmJsZSA9IDA7IC8qIGJ1YmJsZSBjb3VudHMgdGhlIHVucGFpcmVkIGRpZ2l0cyBpbiBsb29wcyAqL1xuXG4gIHZhciAgICBpX29sZCwgcGFydG5lciwgaywgbCwgc3RhcnRfaywgc3RhcnRfbCwgZmlsbCwgbGFkZGVyO1xuICB2YXIgICAgYmVnaW4sIHYsIGRpZmY7XG4gIHZhciAgcG9seWdvbjtcblxuICB2YXIgcmVtZW1iZXIgPSBBcnJheS5hcHBseShudWxsLCBuZXcgQXJyYXkoKDMrTWF0aC5mbG9vcigoai1pKS81KSoyKSkpLm1hcChOdW1iZXIucHJvdG90eXBlLnZhbHVlT2YsIDApO1xuXG4gIGlfb2xkID0gaS0xLCBqKys7ICAgICAgICAgLyogaiBoYXMgbm93IGJlZW4gc2V0IHRvIHRoZSBwYXJ0bmVyIG9mIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzIHBhaXIgZm9yIGNvcnJlY3Qgd2hpbGUtbG9vcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlcm1pbmF0aW9uLiAgKi9cbiAgd2hpbGUgKGkgIT0gaikge1xuICAgICAgcGFydG5lciA9IHBhaXJfdGFibGVbaV07XG4gICAgICBpZiAoKCFwYXJ0bmVyKSB8fCAoaT09MCkpXG4gICAgICAgICAgaSsrLCBjb3VudCsrLCBidWJibGUrKztcbiAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvdW50ICs9IDI7XG4gICAgICAgICAgayA9IGksIGwgPSBwYXJ0bmVyOyAgICAvKiBiZWdpbm5pbmcgb2Ygc3RhY2sgKi9cbiAgICAgICAgICByZW1lbWJlclsrK3JdID0gaztcbiAgICAgICAgICByZW1lbWJlclsrK3JdID0gbDtcbiAgICAgICAgICBpID0gcGFydG5lcisxOyAgICAgICAgIC8qIG5leHQgaSBmb3IgdGhlIGN1cnJlbnQgbG9vcCAqL1xuXG4gICAgICAgICAgc3RhcnRfayA9IGssIHN0YXJ0X2wgPSBsO1xuICAgICAgICAgIGxhZGRlciA9IDA7XG4gICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICBrKyssIGwtLSwgbGFkZGVyKys7ICAgICAgICAvKiBnbyBhbG9uZyB0aGUgc3RhY2sgcmVnaW9uICovXG4gICAgICAgICAgfVxuICAgICAgICAgIHdoaWxlICgocGFpcl90YWJsZVtrXSA9PSBsKSAmJiAocGFpcl90YWJsZVtrXSA+IGspKTtcblxuICAgICAgICAgIGZpbGwgPSBsYWRkZXItMjtcbiAgICAgICAgICBpZiAobGFkZGVyID49IDIpIHtcbiAgICAgICAgICAgICAgYW5nbGVbc3RhcnRfaysxK2ZpbGxdICs9IFBJSEFMRjsgICAvKiAgTG9vcCBlbnRyaWVzIGFuZCAgICAqL1xuICAgICAgICAgICAgICBhbmdsZVtzdGFydF9sLTEtZmlsbF0gKz0gUElIQUxGOyAgIC8qICBleGl0cyBnZXQgYW4gICAgICAgICovXG4gICAgICAgICAgICAgIGFuZ2xlW3N0YXJ0X2tdICAgICAgICArPSBQSUhBTEY7ICAgLyogIGFkZGl0aW9uYWwgUEkvMi4gICAgKi9cbiAgICAgICAgICAgICAgYW5nbGVbc3RhcnRfbF0gICAgICAgICs9IFBJSEFMRjsgICAvKiAgV2h5ID8gKGV4ZXJjaXNlKSAgICAqL1xuICAgICAgICAgICAgICBpZiAobGFkZGVyID4gMikge1xuICAgICAgICAgICAgICAgICAgZm9yICg7IGZpbGwgPj0gMTsgZmlsbC0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgYW5nbGVbc3RhcnRfaytmaWxsXSA9IE1hdGguUEk7ICAgIC8qICBmaWxsIGluIHRoZSBhbmdsZXMgICovXG4gICAgICAgICAgICAgICAgICAgICAgYW5nbGVbc3RhcnRfbC1maWxsXSA9IE1hdGguUEk7ICAgIC8qICBmb3IgdGhlIGJhY2tib25lICAgICovXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgc3RhY2tfc2l6ZVsrK3N0a10gPSBsYWRkZXI7XG4gICAgICAgICAgaWYgKGsgPD0gbClcbiAgICAgICAgICAgIGxvb3AoaywgbCwgcGFpcl90YWJsZSk7XG4gICAgICB9XG4gIH1cblxuICBwb2x5Z29uID0gTWF0aC5QSSooY291bnQtMikvY291bnQ7IC8qIGJlbmRpbmcgYW5nbGUgaW4gbG9vcCBwb2x5Z29uICovXG4gIHJlbWVtYmVyWysrcl0gPSBqO1xuICBiZWdpbiA9IGlfb2xkIDwgMCA/IDAgOiBpX29sZDtcbiAgZm9yICh2ID0gMTsgdiA8PSByOyB2KyspIHtcbiAgICAgIGRpZmYgID0gcmVtZW1iZXJbdl0tYmVnaW47XG4gICAgICBmb3IgKGZpbGwgPSAwOyBmaWxsIDw9IGRpZmY7IGZpbGwrKylcbiAgICAgIGFuZ2xlW2JlZ2luK2ZpbGxdICs9IHBvbHlnb247XG4gICAgICBpZiAodiA+IHIpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICBiZWdpbiA9IHJlbWVtYmVyWysrdl07XG4gIH1cbiAgbG9vcF9zaXplWysrbHBdID0gYnViYmxlO1xuICB9XG5cbiAgbG9vcCgwLCBsZW4rMSwgcGFpcl90YWJsZSk7XG4gIGxvb3Bfc2l6ZVtscF0gLT0gMjsgICAgIC8qIGNvcnJlY3QgZm9yIGNoZWF0aW5nIHdpdGggZnVuY3Rpb24gbG9vcCAqL1xuXG4gIGFscGhhID0gSU5JVF9BTkdMRTtcbiAgeFswXSAgPSBJTklUX1g7XG4gIHlbMF0gID0gSU5JVF9ZO1xuXG4gIHZhciBwb3NzID0gW107XG5cbiAgcG9zcy5wdXNoKFt4WzBdLCB5WzBdXSk7XG4gIGZvciAoaSA9IDE7IGkgPCBsZW47IGkrKykge1xuICAgICAgeFtpXSA9IHhbaS0xXStSQURJVVMqTWF0aC5jb3MoYWxwaGEpO1xuICAgICAgeVtpXSA9IHlbaS0xXStSQURJVVMqTWF0aC5zaW4oYWxwaGEpO1xuXG4gICAgICBwb3NzLnB1c2goW3hbaV0sIHlbaV1dKTtcbiAgICAgIGFscGhhICs9IE1hdGguUEktYW5nbGVbaSsxXTtcbiAgfVxuXG4gIHJldHVybiBwb3NzO1xufVxuIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2QzX187Il0sInNvdXJjZVJvb3QiOiIifQ==