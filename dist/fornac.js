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

/***/ "./node_modules/slugid/node_modules/uuid/rng-browser.js":
/*!**************************************************************!*\
  !*** ./node_modules/slugid/node_modules/uuid/rng-browser.js ***!
  \**************************************************************/
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


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/slugid/node_modules/uuid/uuid.js":
/*!*******************************************************!*\
  !*** ./node_modules/slugid/node_modules/uuid/uuid.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

// Unique ID creation requires a high quality random # generator.  We feature
// detect to determine the best RNG source, normalizing to a function that
// returns 128-bits of randomness, since that's what's usually required
var _rng = __webpack_require__(/*! ./rng */ "./node_modules/slugid/node_modules/uuid/rng-browser.js");

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

var uuid = __webpack_require__(/*! uuid */ "./node_modules/slugid/node_modules/uuid/uuid.js");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1tuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL3NsdWdpZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvc2x1Z2lkL25vZGVfbW9kdWxlcy91dWlkL3JuZy1icm93c2VyLmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9zbHVnaWQvbm9kZV9tb2R1bGVzL3V1aWQvdXVpZC5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvc2x1Z2lkL3NsdWdpZC5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3NyYy9kMy1jb250ZXh0LW1lbnUuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vc3JjL2Zvcm5hYy5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vc3JjL25hdmlldy9iYXNlLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3NyYy9uYXZpZXcvY29ubmVjdGlvbi5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zcmMvbmF2aWV3L2xvb3AuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vc3JjL25hdmlldy9uYXZpZXcuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vc3JjL25hdmlldy9yYWRsb29wLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3NyYy9uYXZpZXcvcmVnaW9uLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3NyYy9ybmFncmFwaC5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zcmMvcm5hcGxvdC5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zcmMvcm5hdHJlZW1hcC5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zcmMvcm5hdXRpbHMuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vc3JjL3NpbXBsZXJuYXBsb3QuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vc3R5bGVzL2QzLWNvbnRleHQtbWVudS5jc3MiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vc3R5bGVzL2Zvcm5hYy5jc3MiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vc3R5bGVzL3JuYXBsb3QuY3NzIiwid2VicGFjazovL1tuYW1lXS9leHRlcm5hbCBcImQzXCIiXSwibmFtZXMiOlsiY29udGV4dE1lbnUiLCJtZW51Iiwib3B0cyIsInByZXZpb3VzbHlNb3VzZVVwIiwiY2xpY2tBd2F5IiwidWlkIiwic2x1Z2lkIiwibmljZSIsInJvb3RFbGVtZW50Iiwib3JpZW50YXRpb24iLCJpbml0aWFsUG9zIiwicGFyZW50U3RhcnQiLCJvcGVuQ2FsbGJhY2siLCJjbG9zZUNhbGxiYWNrIiwib25PcGVuIiwib25DbG9zZSIsInBvcyIsImQzIiwic2VsZWN0QWxsIiwiZGF0YSIsImVudGVyIiwiYXBwZW5kIiwiY2xhc3NlZCIsInNlbGVjdCIsIm9uIiwiY29uc29sZSIsImxvZyIsInN0eWxlIiwiaW5kZXgiLCJwTW91c2VVcCIsImNsaWNrQXdheUZ1bmMiLCJlbG0iLCJjb250ZXh0TWVudVBvcyIsIm1vdXNlUG9zIiwiY3VycmVudFRoaXMiLCJtb3VzZSIsIm9wZW5DaGlsZE1lbnVVaWQiLCJodG1sIiwibGlzdCIsImQiLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiYXR0ciIsInJldCIsImRpdmlkZXIiLCJkaXNhYmxlZCIsImFjdGlvbiIsInRpdGxlIiwiZXJyb3IiLCJpIiwiY2hpbGRyZW4iLCJjaGlsZFVpZCIsImJvdW5kaW5nUmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNoaWxkcmVuQ29udGV4dE1lbnUiLCJsZWZ0Iiwid2luZG93IiwicGFnZVhPZmZzZXQiLCJ0b3AiLCJwYWdlWU9mZnNldCIsIndpZHRoIiwiYXBwbHkiLCJjb250ZXh0TWVudVNlbGVjdGlvbiIsInBhZ2VYIiwicGFnZVkiLCJub2RlIiwiaW5uZXJXaWR0aCIsIkZvcm5hQ29udGFpbmVyIiwiZWxlbWVudCIsInBhc3NlZE9wdGlvbnMiLCJzZWxmIiwib3B0aW9ucyIsImFyZ3VtZW50cyIsImxlbmd0aCIsIm9wdGlvbiIsImhhc093blByb3BlcnR5IiwiaW5pdGlhbFNpemUiLCJzdmdXIiwic3ZnSCIsImVkaXRhYmxlIiwiYmFja2dyb3VuZE1lbnUiLCJjYW52YXNNb3VzZVBvcyIsInhTY2FsZSIsImludmVydCIsInlTY2FsZSIsImFkZFJOQSIsIm5vZGVNZW51IiwiZGVsZXRlTm9kZSIsImNoYW5nZU5vZGUiLCJpbnNlcnROb2RlQmVmb3JlT3JBZnRlciIsIm5vZGVDb250ZXh0TWVudSIsImJhY2tncm91bmRDb250ZXh0TWVudSIsImZpbGwiLCJzY2FsZSIsImNhdGVnb3J5MjAiLCJtb3VzZWRvd25MaW5rIiwibW91c2Vkb3duTm9kZSIsIm1vdXNldXBOb2RlIiwibGlua0NvbnRleHRNZW51U2hvd24iLCJsaW5lYXIiLCJkb21haW4iLCJyYW5nZSIsImdyYXBoIiwibGlua1N0cmVuZ3RocyIsImRpc3BsYXlQYXJhbWV0ZXJzIiwiY29sb3JTY2hlbWUiLCJjdXN0b21Db2xvcnMiLCJhbmltYXRpb24iLCJhcHBseUZvcmNlIiwiZGVhZiIsInJuYXMiLCJleHRyYUxpbmtzIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJlcXVhbHMiLCJhcnJheSIsImwiLCJjcmVhdGVJbml0aWFsTGF5b3V0Iiwic3RydWN0dXJlIiwibGFiZWxJbnRlcnZhbCIsInVpZHMiLCJyZyIsIlJOQUdyYXBoIiwic2VxdWVuY2UiLCJuYW1lIiwiY2lyY3VsYXJpemVFeHRlcm5hbCIsInJuYUpzb24iLCJyZWNhbGN1bGF0ZUVsZW1lbnRzIiwicG9zaXRpb25zIiwibGF5b3V0IiwibmF2aWV3IiwiTkFWaWV3IiwibmFWaWV3UG9zaXRpb25zIiwibmF2aWV3X3h5X2Nvb3JkaW5hdGVzIiwicGFpcnRhYmxlIiwibmJhc2UiLCJwdXNoIiwieCIsInkiLCJzaW1wbGVYeUNvb3JkaW5hdGVzIiwiZWxlbWVudHNUb0pzb24iLCJhZGRVaWRzIiwiYWRkUG9zaXRpb25zIiwiYWRkTGFiZWxzIiwicmVpbmZvcmNlU3RlbXMiLCJyZWluZm9yY2VMb29wcyIsImNvbm5lY3RGYWtlTm9kZXMiLCJyZWFzc2lnbkxpbmtVaWRzIiwiYnJlYWtOb2Rlc1RvRmFrZU5vZGVzIiwiY2VudGVyVmlldyIsIm5ld0xpbmtzIiwiYWRkRXh0ZXJuYWxMaW5rcyIsImNvbmNhdCIsImFkZFJOQUpTT04iLCJjZW50ZXJQb3MiLCJhdm9pZE90aGVycyIsIm5vZGVOYW1lIiwicmVmZXJlbmNlTm9kZSIsInJuYSIsImRvdGJyYWNrZXQiLCJybmFVdGlsaXRpZXMiLCJwYWlydGFibGVUb0RvdGJyYWNrZXQiLCJnZXRQb3NpdGlvbnMiLCJzZXEiLCJnZXRVaWRzIiwibmV3Tm9kZU51bSIsIm51bSIsIm5ld0RvdGJyYWNrZXQiLCJuZXdTZXF1ZW5jZSIsInNsaWNlIiwic3BsaWNlIiwibmV3UG9zaXRpb25zIiwibmV3Uk5BIiwicG9zaXRpb25PZmZzZXQiLCJuZXdVaWRzIiwicGFpciIsImV4dGVybmFsTGlua3MiLCJuZXdMaW5rIiwibGlua1R5cGUiLCJ2YWx1ZSIsImdlbmVyYXRlVVVJRCIsInNvdXJjZSIsInRhcmdldCIsIk9iamVjdCIsInRvU3RyaW5nIiwiY2FsbCIsImoiLCJub2RlcyIsIm51Y3MiLCJybmFHcmFwaCIsIm1heFgiLCJtaW5YIiwidG90YWxYIiwidG90YWxZIiwibm9kZUNvdW50IiwiZm9yRWFjaCIsInB4IiwicHkiLCJtYXgiLCJtYXAiLCJtaW4iLCJyZWNhbGN1bGF0ZUdyYXBoIiwidXBkYXRlIiwibWFnbml0dWRlIiwiTWF0aCIsInNxcnQiLCJwb3NpdGlvbkFueU5vZGUiLCJlbmRQb2ludCIsInN0YXJ0UG9pbnQiLCJwcmV2Tm9kZSIsImxlbmd0aE11bHQiLCJsaW5rZWQiLCJ1IiwidiIsImFycm93VGlwIiwicmFkaXVzIiwicGF0aCIsInJlYWxMaW5rRmlsdGVyIiwidHJhbnNpdGlvblJOQSIsIm5ld1N0cnVjdHVyZSIsIm5leHRGdW5jdGlvbiIsImR1cmF0aW9uIiwidHJhbnNpdGlvbkR1cmF0aW9uIiwiZmlsdGVyIiwibm9kZVR5cGUiLCJuZXdSTkFKc29uIiwiZ25vZGVzIiwidmlzTm9kZXMiLCJub2RlS2V5IiwidHJhbnNpdGlvbiIsImxpbmtzIiwidmlzTGlua3MiLCJsaW5rS2V5IiwibmV3Tm9kZXMiLCJjcmVhdGVOZXdOb2RlcyIsImV4aXQiLCJyZW1vdmUiLCJlYWNoIiwidXBkYXRlU3R5bGUiLCJlbmRhbGwiLCJjYWxsYmFjayIsInNpemUiLCJzZXRUaW1lb3V0IiwibiIsImFkZE5ld0xpbmtzIiwiY3JlYXRlTmV3TGlua3MiLCJ1aWRzVG9Ob2RlcyIsImxpbmsiLCJmYWtlTGlua3MiLCJsaW5rSW5kZXgiLCJpbmRleE9mIiwiYWRkTm9kZXMiLCJqc29uIiwiZW50cnkiLCJtYXhZIiwiciIsImFkZEN1c3RvbUNvbG9ycyIsImFkZEN1c3RvbUNvbG9yc1RleHQiLCJjdXN0b21Db2xvcnNUZXh0IiwiY3MiLCJDb2xvclNjaGVtZSIsImNvbG9yc0pzb24iLCJjaGFuZ2VDb2xvclNjaGVtZSIsImNsZWFyTm9kZXMiLCJ0b0pTT04iLCJkYXRhU3RyaW5nIiwiSlNPTiIsInN0cmluZ2lmeSIsImtleSIsImZyb21KU09OIiwianNvblN0cmluZyIsInBhcnNlIiwiZXJyIiwidHlwZSIsImNpcmN1bGFyIiwic3RydWN0TmFtZSIsInJuYUxlbmd0aCIsImVsZW1lbnRzIiwibnVjc1RvTm9kZXMiLCJwc2V1ZG9rbm90UGFpcnMiLCJQcm90ZWluR3JhcGgiLCJzZXRTaXplIiwib2Zmc2V0SGVpZ2h0Iiwib2Zmc2V0V2lkdGgiLCJ6b29tZXIiLCJicnVzaGVyIiwicmVzaXplU3ZnT25SZXNpemUiLCJzdmciLCJjaGFuZ2VDb2xvcnMiLCJtb2xlY3VsZUNvbG9ycyIsInZhbCIsInBhcnNlRmxvYXQiLCJpc05hTiIsInNldE91dGxpbmVDb2xvciIsImNvbG9yIiwibmV3Q29sb3JTY2hlbWUiLCJwcm90ZWluTm9kZXMiLCJjaXJjbGVzIiwib3JkaW5hbCIsImNhdGVnb3J5MTAiLCJlbGVtVHlwZSIsImludGVycG9sYXRlIiwiaW50ZXJwb2xhdGVMYWIiLCJjb2xvclZhbHVlcyIsIm1vdXNlZG93biIsIm1vdXNlbW92ZSIsIm1wb3MiLCJ2aXMiLCJkcmFnTGluZSIsIm1vdXNldXAiLCJyZXNldE1vdXNlVmFycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJiZWhhdmlvciIsInpvb20iLCJzY2FsZUV4dGVudCIsInpvb21zdGFydCIsInJlZHJhdyIsImtleWRvd24iLCJrZXl1cCIsImZvY3VzIiwic3ZnR3JhcGgiLCJhbGxvd1Bhbm5pbmdBbmRab29taW5nIiwiYnJ1c2giLCJkYXR1bSIsInNlbGVjdGVkIiwicHJldmlvdXNseVNlbGVjdGVkIiwiY3RybEtleWRvd24iLCJleHRlbnQiLCJjbGVhciIsInRyYW5zbGF0ZSIsImdldEJvdW5kaW5nQm94VHJhbnNmb3JtIiwibWluWSIsIm1heFJhZGl1cyIsIm1vbFdpZHRoIiwibW9sSGVpZ2h0Iiwid2lkdGhSYXRpbyIsImhlaWdodFJhdGlvIiwibWluUmF0aW8iLCJtYXhOb2RlUmFkaXVzIiwibmV3TW9sV2lkdGgiLCJuZXdNb2xIZWlnaHQiLCJ4VHJhbnMiLCJ5VHJhbnMiLCJiYlRyYW5zZm9ybSIsImZvcmNlIiwiY2hhcmdlIiwibWlkZGxlQ2hhcmdlIiwib3RoZXJDaGFyZ2UiLCJmcmljdGlvbiIsImxpbmtEaXN0YW5jZSIsImxpbmtEaXN0YW5jZU11bHRpcGxpZXIiLCJsaW5rU3RyZW5ndGgiLCJvdGhlciIsImdyYXZpdHkiLCJjaGFyZ2VEaXN0YW5jZSIsInNoaWZ0S2V5ZG93biIsInNlbGVjdGVkTm9kZXMiLCJtb3VzZURvd25Ob2RlIiwiZHJhZ3N0YXJ0ZWQiLCJzb3VyY2VFdmVudCIsInAiLCJ0b0RyYWciLCJkMSIsImZpeGVkIiwiZHJhZ2dlZCIsImR4IiwiZHkiLCJyZXN1bWVGb3JjZSIsInJlc3VtZSIsImRyYWdlbmRlZCIsImNvbGxpZGUiLCJueDEiLCJueDIiLCJueTEiLCJueTIiLCJxdWFkIiwieDEiLCJ5MSIsIngyIiwieTIiLCJwb2ludCIsImRyYWciLCJrZXlDb2RlIiwiZ2V0U3RydWN0dXJlc0RvdEJyYWNrZXQiLCJ1cGRhdGVSbmFHcmFwaCIsIm51Y2xlb3RpZGVQb3NpdGlvbnMiLCJsYWJlbFBvc2l0aW9ucyIsImFkZFBzZXVkb2tub3RzIiwidXBkYXRlTGlua1VpZHMiLCJyZW1vdmVCYWNrQm9uZUxpbmsiLCJ0b1JlbW92ZSIsImZyb20iLCJ0byIsInNlcXVlbmNlMSIsInNlcXVlbmNlMiIsInJuYURvdEJyYWNrZXQiLCJkb3RCcmFja2V0MSIsImRvdEJyYWNrZXQyIiwicG9zaXRpb25zMSIsInBvc2l0aW9uczIiLCJ1aWRzMSIsInVpZHMyIiwicm5hMSIsInJuYTIiLCJyZW1vdmVMaW5rIiwiZXh0cmFMaW5rSW5kZXgiLCJsaW5rQ2xpY2siLCJpbnZhbGlkTGlua3MiLCJjdXJySWR4Iiwibm9kZUlkeHMiLCJicmVha3MiLCJpZHgxIiwiaWR4MiIsInNwbGl0Iiwiam9pbiIsImFkZEJhY2tCb25lTGluayIsImRvdGJyYWNrZXQxIiwiZG90YnJhY2tldDIiLCJzZXExIiwic2VxMiIsIm5ld1NlcSIsInRvQWRkSW50ZXJuYWwiLCJ0b0FkZEV4dGVybmFsIiwidG9EZWxldGUiLCJlIiwibmV3Um5hIiwiYWRkTGluayIsIm5vZGVNb3VzZWNsaWNrIiwiZGVmYXVsdFByZXZlbnRlZCIsIm5vZGVNb3VzZXVwIiwiYmFja2JvbmVQb3NzaWJsZSIsImJhc2VwYWlyUG9zc2libGUiLCJsaW5rTWVudSIsImxpbmtDb250ZXh0TWVudSIsIm5vZGVNb3VzZWRvd24iLCJzdGFydEFuaW1hdGlvbiIsInN0YXJ0Iiwic3RvcEFuaW1hdGlvbiIsInN0b3AiLCJzZXRGcmljdGlvbiIsInNldENoYXJnZSIsInNldEdyYXZpdHkiLCJzZXRQc2V1ZG9rbm90U3RyZW5ndGgiLCJwc2V1ZG9rbm90IiwiZGlzcGxheUJhY2tncm91bmQiLCJkaXNwbGF5TnVtYmVyaW5nIiwiZGlzcGxheU5vZGVPdXRsaW5lIiwiZGlzcGxheU5vZGVMYWJlbCIsImRpc3BsYXlMaW5rcyIsImRpc3BsYXlQc2V1ZG9rbm90TGlua3MiLCJkaXNwbGF5UHJvdGVpbkxpbmtzIiwiZGlzcGxheUFsbExpbmtzIiwibnVkZ2UiLCJsaW5rc0VudGVyIiwibGlua0xpbmVzIiwidGV4dCIsImdub2Rlc0VudGVyIiwiZWFzZSIsImxhYmVsQW5kUHJvdGVpbk5vZGVzIiwibnVjbGVvdGlkZU5vZGVzIiwibGFiZWxzRW50ZXIiLCJub2RlVG9vbHRpcCIsIm5vZGVUb29sdGlwcyIsIm51Y2xlb3RpZGUiLCJsYWJlbCIsInBzZXVkbyIsIm1pZGRsZSIsInByb3RlaW4iLCJhbGxMaW5rcyIsImNvbG9ycyIsInJlYWxOb2RlcyIsInhsaW5rIiwiZGlzcGxheUZha2VMaW5rcyIsInBvc2l0aW9uIiwicSIsImdlb20iLCJxdWFkdHJlZSIsInZpc2l0IiwiQmFzZSIsIm1hdGUiLCJleHRyYWN0ZWQiLCJyZWdpb24iLCJSZWdpb24iLCJnZXRNYXRlIiwic2V0TWF0ZSIsImdldFgiLCJzZXRYIiwiZ2V0WSIsInNldFkiLCJpc0V4dHJhY3RlZCIsInNldEV4dHJhY3RlZCIsImdldFJlZ2lvbiIsInNldFJlZ2lvbiIsIkNvbm5lY3Rpb24iLCJsb29wIiwiTG9vcCIsImVuZCIsInhyYWQiLCJ5cmFkIiwiYW5nbGUiLCJleHRydWRlZCIsImJyb2tlbiIsIl9pc051bGwiLCJpc051bGwiLCJzZXROdWxsIiwiZ2V0TG9vcCIsInNldExvb3AiLCJnZXRTdGFydCIsInNldFN0YXJ0IiwiZ2V0RW5kIiwic2V0RW5kIiwiZ2V0WHJhZCIsInNldFhyYWQiLCJnZXRZcmFkIiwic2V0WXJhZCIsImdldEFuZ2xlIiwic2V0QW5nbGUiLCJpc0V4dHJ1ZGVkIiwic2V0RXh0cnVkZWQiLCJpc0Jyb2tlbiIsInNldEJyb2tlbiIsIm5jb25uZWN0aW9uIiwiY29ubmVjdGlvbnMiLCJfY29ubmVjdGlvbnMiLCJudW1iZXIiLCJkZXB0aCIsIm1hcmsiLCJnZXROY29ubmVjdGlvbiIsInNldE5jb25uZWN0aW9uIiwic2V0Q29ubmVjdGlvbiIsImMiLCJnZXRDb25uZWN0aW9uIiwicmVxdWlyZSIsImFkZENvbm5lY3Rpb24iLCJnZXROdW1iZXIiLCJzZXROdW1iZXIiLCJnZXREZXB0aCIsInNldERlcHRoIiwiaXNNYXJrIiwic2V0TWFyayIsImdldFJhZGl1cyIsInNldFJhZGl1cyIsIkFOVU0iLCJNQVhJVEVSIiwiYmFzZXMiLCJucmVnaW9uIiwibG9vcF9jb3VudCIsInJvb3QiLCJsb29wcyIsInJlZ2lvbnMiLCJybHBoZWFkIiwiUmFkbG9vcCIsImxlbmN1dCIsIlJBRElVU19SRURVQ1RJT05fRkFDVE9SIiwiYW5nbGVpbmMiLCJfaCIsIkhFTElYX0ZBQ1RPUiIsIkJBQ0tCT05FX0RJU1RBTkNFIiwicGFpcl90YWJsZSIsInJlYWRfaW5fYmFzZXMiLCJmaW5kX3JlZ2lvbnMiLCJjb25zdHJ1Y3RfbG9vcCIsImZpbmRfY2VudHJhbF9sb29wIiwidHJhdmVyc2VfbG9vcCIsIm5wYWlycyIsIm5iMSIsInNldFN0YXJ0MSIsInNldEVuZDIiLCJzZXRFbmQxIiwic2V0U3RhcnQyIiwiaWJhc2UiLCJyZXRsb29wIiwibHAiLCJjcCIsInJwIiwicmxwIiwiZ2V0TmV4dCIsImdldExvb3BudW1iZXIiLCJnZXRTdGFydDEiLCJnZXRFbmQxIiwiZ2V0U3RhcnQyIiwiZ2V0RW5kMiIsIm1heGNvbm4iLCJtYXhkZXB0aCIsImRldGVybWluZV9kZXB0aHMiLCJiaW5kIiwiY291bnQiLCJhbmNob3JfY29ubmVjdGlvbiIsInhzIiwieXMiLCJ4ZSIsInllIiwieG4iLCJ5biIsInhjIiwieWMiLCJ4byIsInlvIiwiYXN0YXJ0IiwiYWVuZCIsImEiLCJjcG5leHQiLCJhY3AiLCJjcHByZXYiLCJpYyIsImRhIiwibWF4YW5nIiwiaWNzdGFydCIsImljZW5kIiwiaWNtaWRkbGUiLCJpY3Jvb3QiLCJkb25lIiwiZG9uZV9hbGxfY29ubmVjdGlvbnMiLCJyb290ZWQiLCJzaWduIiwibWlkeCIsIm1pZHkiLCJucngiLCJucnkiLCJteCIsIm15IiwidngiLCJ2eSIsImRvdG12Iiwibm1pZHgiLCJubWlkeSIsImljc3RhcnQxIiwiaWN1cCIsImljZG93biIsImljbmV4dCIsImRpcmVjdGlvbiIsImRhbiIsInJyIiwiY3B4IiwiY3B5IiwiY3BuZXh0eCIsImNwbmV4dHkiLCJjbngiLCJjbnkiLCJyY24iLCJyYyIsImxueCIsImxueSIsInJsIiwiYWMiLCJhY24iLCJzeCIsInN5IiwiZGNwIiwiaW1heGxvb3AiLCJQSSIsImluZGljZSIsInNpbiIsImNvcyIsImF0YW4yIiwic2V0X3JhZGl1cyIsImRldGVybWluZV9yYWRpdXMiLCJjb25uZWN0ZWRfY29ubmVjdGlvbiIsImZpbmRfaWNfbWlkZGxlIiwiYXNpbiIsImFicyIsImNvbnN0cnVjdF9leHRydWRlZF9zZWdtZW50IiwiZ2VuZXJhdGVfcmVnaW9uIiwibWluZGl0IiwiY2kiLCJkdCIsInN1bW4iLCJzdW1kIiwiZGl0IiwiaW1pbmRpdCIsInJ0Ml8yIiwiYWVuZDEiLCJhZW5kMiIsImFhdmUiLCJhMSIsImEyIiwiZGFjIiwibnN0YXJ0IiwibmVuZCIsImNvbGxpc2lvbiIsImNvbnN0cnVjdF9jaXJjbGVfc2VnbWVudCIsIm1pbmYyIiwibWF4ZjIiLCJmaW5kX2NlbnRlcl9mb3JfYXJjIiwiYiIsImgiLCJoaGkiLCJobG93IiwiZGlzYyIsInRoZXRhIiwicGhpIiwiaXRlciIsImFjb3MiLCJub0l0ZXJhdGlvbkZhaWx1cmVZZXQiLCJsb29wbnVtYmVyIiwibmV4dCIsInByZXYiLCJzZXRMb29wbnVtYmVyIiwic2V0TmV4dCIsImdldFByZXYiLCJzZXRQcmV2IiwiX3N0YXJ0MSIsIl9lbmQxIiwiX3N0YXJ0MiIsIl9lbmQyIiwic3RhcnQxIiwiZW5kMSIsInN0YXJ0MiIsImVuZDIiLCJudW1iZXJTb3J0IiwiU3RyaW5nIiwidHJpbSIsInJlcGxhY2UiLCJzdGFydE51bWJlciIsImNvbXB1dGVQYWlydGFibGUiLCJkb3RicmFja2V0VG9QYWlydGFibGUiLCJyZW1vdmVCcmVha3MiLCJ0YXJnZXRTdHJpbmciLCJicmVha0luZGV4Iiwic3Vic3RyaW5nIiwiZG90QnJhY2tldEJyZWFrcyIsInNlcUJyZWFrcyIsImFycmF5c0VxdWFsIiwibGFiZWxOb2RlcyIsInB0IiwicmVsZXZhbnRFbGVtZW50cyIsImFsbE51Y3MiLCJhZGRGYWtlTm9kZSIsImZpbHRlck51Y3MiLCJuZXdOb2RlMSIsIm5ld05vZGUyIiwibGlua0xlbmd0aCIsIm5vZGVXaWR0aCIsInRhbiIsImZha2VOb2RlVWlkIiwibmV3Tm9kZSIsIm5ld1giLCJuZXdZIiwiY29vcmRzQ291bnRlZCIsImZsb29yIiwiaWEiLCJmcm9tTm9kZSIsImZpbHRlck91dE5vbkZha2VOb2RlcyIsImZha2VOb2RlcyIsInRoaXNOb2RlIiwidGhpc051YyIsImsiLCJzb3J0IiwiZGlzdGFuY2UiLCJhZGRFeHRyYUxpbmtzIiwiZ2V0Tm9kZUZyb21OdWNsZW90aWRlcyIsImVsZW1UeXBlcyIsIm5leHROb2RlIiwicHRUb0VsZW1lbnRzIiwibGV2ZWwiLCJ1NSIsInUzIiwiZXh0ZXJuYWwiLCJyaWdodCIsIm0iLCJwb3AiLCJjb21iaW5lZCIsInMiLCJwcmV2VmVjIiwibmV4dFZlYyIsImNvbWJpbmVkVmVjIiwidmVjTGVuZ3RoIiwibm9ybWVkVmVjIiwib2Zmc2V0VmVjIiwicmVtb3ZlUHNldWRva25vdHMiLCJleHRlcm5hbExvb3AiLCJlbG9vcCIsImhsb29wIiwibnVtR3JlYXRlciIsInJlbW92ZVBzZXVkb2tub3RzRnJvbVBhaXJ0YWJsZSIsImFkZE5hbWUiLCJtb2xlY3VsZXNUb0pzb24iLCJtb2xlY3VsZXNKc29uIiwiZ3JhcGhzIiwibW9sZWN1bGVzIiwibW9sZWN1bGUiLCJzcyIsImhlYWRlciIsInJuYVBsb3QiLCJhc3NpZ24iLCJjcmVhdGVUcmFuc2Zvcm1Ub0ZpbGxWaWV3cG9ydCIsInhWYWx1ZXMiLCJ5VmFsdWVzIiwieEV4dGVudCIsInlFeHRlbnQiLCJudWNsZW90aWRlUmFkaXVzIiwicm5hRWRnZVBhZGRpbmciLCJ4UmFuZ2UiLCJ5UmFuZ2UiLCJ4RXh0cmEiLCJ5RXh0cmEiLCJoZWlnaHQiLCJjcmVhdGVPdGhlclNjYWxlIiwiZmlyc3RTY2FsZSIsIm5ld0RvbWFpbiIsIm5ld1JhbmdlIiwic2NhbGVGYWN0b3IiLCJuZXdXaWR0aCIsIm5ld01hcmdpbiIsInhPZmZzZXQiLCJ5T2Zmc2V0IiwiY3JlYXRlTnVjbGVvdGlkZXMiLCJzZWxlY3Rpb24iLCJncyIsInRvTG93ZXJDYXNlIiwic2hvd051Y2xlb3RpZGVMYWJlbHMiLCJudWNsZW90aWRlTGFiZWxzIiwic3RydWN0X25hbWUiLCJjcmVhdGVMYWJlbHMiLCJudW1iZXJMYWJlbHMiLCJjcmVhdGVOYW1lIiwibmFtZUxhYmVsIiwieHlQb3MiLCJuYW1lUG9zaXRpb24iLCJ4eSIsInRleHRCQm94IiwiZ2V0QkJveCIsInRleHRTaXplIiwicGxvdFNpemUiLCJtYWtlRXh0ZXJuYWxMaW5rc0J1bmRsZSIsIm5vZGVzRGljdCIsImxpbmtzTGlzdCIsImV4dHJhTGlua1R5cGUiLCJmYnVuZGxpbmciLCJGb3JjZUVkZ2VCdW5kbGluZyIsImVkZ2VzIiwiY29tcGF0aWJpbGl0eV90aHJlc2hvbGQiLCJzdGVwX3NpemUiLCJyZXN1bHRzIiwiZDNsaW5lIiwibGluZSIsImVkZ2Vfc3VicG9pbnRfZGF0YSIsImNyZWF0ZUxpbmtzIiwiY2hhcnQiLCJwbG90Iiwic3RhcnROdWNsZW90aWRlTnVtYmVyIiwicm5hTGF5b3V0IiwiZmlsbFZpZXdwb3J0VHJhbnNmb3JtIiwiYnVuZGxlRXh0ZXJuYWxMaW5rcyIsIl8iLCJybmFUcmVlbWFwIiwicm5hVHJlZW1hcE5vZGUiLCJ0cmVlbWFwIiwic3RpY2t5IiwiZ0VudGVyIiwidHJlZW1hcEdub2RlcyIsIlJOQVV0aWxpdGllcyIsImJyYWNrZXRMZWZ0IiwiYnJhY2tldFJpZ2h0IiwiaW52ZXJzZUJyYWNrZXRzIiwiYnJhY2tldCIsInJlcyIsIm1heGltdW1NYXRjaGluZyIsIlRVUk4iLCJtbSIsIm1heGltdW0iLCJiYWNrdHJhY2tNYXhpbXVtTWF0Y2hpbmciLCJvbGRQdCIsIm1tQnQiLCJsZWZ0UGFydCIsImVuY2xvc2VkUGFydCIsIk51bWJlciIsInZhbHVlT2YiLCJzdGFjayIsImludmVyc2VCcmFja2V0TGVmdCIsImludmVyc2VCcmFja2V0UmlnaHQiLCJuaSIsImluc2VydEludG9TdGFjayIsImRlbGV0ZUZyb21TdGFjayIsInNlZW4iLCJmaW5kVW5tYXRjaGVkIiwidW5tYXRjaGVkIiwib3JpZ0Zyb20iLCJvcmlnVG8iLCJuZXdQdCIsInJlbW92ZWQiLCJjb2xvcnNUZXh0IiwicGFyc2VSYW5nZSIsInJhbmdlVGV4dCIsInBhcnRzIiwibnVtcyIsInBhcnRzMSIsInBhcnNlSW50IiwicGFyc2VDb2xvclRleHQiLCJjb2xvclRleHQiLCJsaW5lcyIsImN1cnJNb2xlY3VsZSIsImNvdW50ZXIiLCJkb21haW5WYWx1ZXMiLCJ3b3JkcyIsInNlYXJjaCIsInBhcnRzUmlnaHQiLCJub3JtYWxpemVDb2xvcnMiLCJtb2xlY3VsZU5hbWUiLCJtaW5OdW0iLCJNQVhfVkFMVUUiLCJtYXhOdW0iLCJNSU5fVkFMVUUiLCJyZXNudW0iLCJJTklUX0FOR0xFIiwiSU5JVF9YIiwiSU5JVF9ZIiwiUkFESVVTIiwibGVuIiwiYWxwaGEiLCJsb29wX3NpemUiLCJzdGFja19zaXplIiwic3RrIiwiUElIQUxGIiwiYnViYmxlIiwiaV9vbGQiLCJwYXJ0bmVyIiwic3RhcnRfayIsInN0YXJ0X2wiLCJsYWRkZXIiLCJiZWdpbiIsImRpZmYiLCJwb2x5Z29uIiwicmVtZW1iZXIiLCJwb3NzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGWTs7QUFFWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDLFNBQVM7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBDQUEwQyxVQUFVO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVZOztBQUVaLGFBQWEsbUJBQU8sQ0FBQyxvREFBVztBQUNoQyxjQUFjLG1CQUFPLENBQUMsZ0RBQVM7QUFDL0IsY0FBYyxtQkFBTyxDQUFDLGdEQUFTOztBQUUvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG1EQUFtRDtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFVBQVU7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSx1Q0FBdUMsU0FBUztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsaUJBQWlCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxFQUFFO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0EscUJBQXFCLGVBQWU7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxPQUFPO0FBQzlEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQjtBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsWUFBWTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7O0FBRUE7QUFDQTtBQUNBO0FB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QUFPd0YsQ0FBQyxDQUFDeEYsQ0FBQyxHQUFDLENBQUgsQ0FBRCxHQUFPMDFCLE1BQU0sR0FBQy9yQixJQUFJLENBQUNpYyxHQUFMLENBQVNnUSxLQUFULENBQXJCO0FBQ0Fud0IsS0FBQyxDQUFDekYsQ0FBRCxDQUFELEdBQU95RixDQUFDLENBQUN6RixDQUFDLEdBQUMsQ0FBSCxDQUFELEdBQU8wMUIsTUFBTSxHQUFDL3JCLElBQUksQ0FBQ2djLEdBQUwsQ0FBU2lRLEtBQVQsQ0FBckI7QUFFQWUsUUFBSSxDQUFDcHhCLElBQUwsQ0FBVSxDQUFDQyxDQUFDLENBQUN4RixDQUFELENBQUYsRUFBT3lGLENBQUMsQ0FBQ3pGLENBQUQsQ0FBUixDQUFWO0FBQ0E0MUIsU0FBSyxJQUFJanNCLElBQUksQ0FBQzhiLEVBQUwsR0FBUXZKLEtBQUssQ0FBQ2xjLENBQUMsR0FBQyxDQUFILENBQXRCO0FBQ0g7O0FBRUQsU0FBTzIyQixJQUFQO0FBQ0QsQzs7Ozs7Ozs7Ozs7QUNqSEQseUM7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEsZ0QiLCJmaWxlIjoiZm9ybmFjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiZDNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiZDNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZm9ybmFjXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiZDNcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImZvcm5hY1wiXSA9IGZhY3Rvcnkocm9vdFtcImQzXCJdKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9kM19fKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG4vLyBTdXBwb3J0IGRlY29kaW5nIFVSTC1zYWZlIGJhc2U2NCBzdHJpbmdzLCBhcyBOb2RlLmpzIGRvZXMuXG4vLyBTZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NCNVUkxfYXBwbGljYXRpb25zXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBnZXRMZW5zIChiNjQpIHtcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcblxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gVHJpbSBvZmYgZXh0cmEgYnl0ZXMgYWZ0ZXIgcGxhY2Vob2xkZXIgYnl0ZXMgYXJlIGZvdW5kXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2JlYXRnYW1taXQvYmFzZTY0LWpzL2lzc3Vlcy80MlxuICB2YXIgdmFsaWRMZW4gPSBiNjQuaW5kZXhPZignPScpXG4gIGlmICh2YWxpZExlbiA9PT0gLTEpIHZhbGlkTGVuID0gbGVuXG5cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IHZhbGlkTGVuID09PSBsZW5cbiAgICA/IDBcbiAgICA6IDQgLSAodmFsaWRMZW4gJSA0KVxuXG4gIHJldHVybiBbdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbl1cbn1cblxuLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gX2J5dGVMZW5ndGggKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikge1xuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cblxuICB2YXIgYXJyID0gbmV3IEFycihfYnl0ZUxlbmd0aChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pKVxuXG4gIHZhciBjdXJCeXRlID0gMFxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgdmFyIGxlbiA9IHBsYWNlSG9sZGVyc0xlbiA+IDBcbiAgICA/IHZhbGlkTGVuIC0gNFxuICAgIDogdmFsaWRMZW5cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgMTIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA8PCA2KSB8XG4gICAgICByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMikge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPj4gNClcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDEpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCA0KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPj4gMilcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG4gIHJldHVybiBsb29rdXBbbnVtID4+IDE4ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gMTIgJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gJiAweDNGXVxufVxuXG5mdW5jdGlvbiBlbmNvZGVDaHVuayAodWludDgsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHRtcFxuICB2YXIgb3V0cHV0ID0gW11cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IDMpIHtcbiAgICB0bXAgPVxuICAgICAgKCh1aW50OFtpXSA8PCAxNikgJiAweEZGMDAwMCkgK1xuICAgICAgKCh1aW50OFtpICsgMV0gPDwgOCkgJiAweEZGMDApICtcbiAgICAgICh1aW50OFtpICsgMl0gJiAweEZGKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgcGFydHMgPSBbXVxuICB2YXIgbWF4Q2h1bmtMZW5ndGggPSAxNjM4MyAvLyBtdXN0IGJlIG11bHRpcGxlIG9mIDNcblxuICAvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG4gIGZvciAodmFyIGkgPSAwLCBsZW4yID0gbGVuIC0gZXh0cmFCeXRlczsgaSA8IGxlbjI7IGkgKz0gbWF4Q2h1bmtMZW5ndGgpIHtcbiAgICBwYXJ0cy5wdXNoKGVuY29kZUNodW5rKFxuICAgICAgdWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKVxuICAgICkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAyXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdICtcbiAgICAgICc9PSdcbiAgICApXG4gIH0gZWxzZSBpZiAoZXh0cmFCeXRlcyA9PT0gMikge1xuICAgIHRtcCA9ICh1aW50OFtsZW4gLSAyXSA8PCA4KSArIHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMTBdICtcbiAgICAgIGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXSArXG4gICAgICAnPSdcbiAgICApXG4gIH1cblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cbiIsIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5cbid1c2Ugc3RyaWN0J1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKVxuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5TbG93QnVmZmVyID0gU2xvd0J1ZmZlclxuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFVzZSBPYmplY3QgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIER1ZSB0byB2YXJpb3VzIGJyb3dzZXIgYnVncywgc29tZXRpbWVzIHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24gd2lsbCBiZSB1c2VkIGV2ZW5cbiAqIHdoZW4gdGhlIGJyb3dzZXIgc3VwcG9ydHMgdHlwZWQgYXJyYXlzLlxuICpcbiAqIE5vdGU6XG4gKlxuICogICAtIEZpcmVmb3ggNC0yOSBsYWNrcyBzdXBwb3J0IGZvciBhZGRpbmcgbmV3IHByb3BlcnRpZXMgdG8gYFVpbnQ4QXJyYXlgIGluc3RhbmNlcyxcbiAqICAgICBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOC5cbiAqXG4gKiAgIC0gQ2hyb21lIDktMTAgaXMgbWlzc2luZyB0aGUgYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbi5cbiAqXG4gKiAgIC0gSUUxMCBoYXMgYSBicm9rZW4gYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFycmF5cyBvZlxuICogICAgIGluY29ycmVjdCBsZW5ndGggaW4gc29tZSBzaXR1YXRpb25zLlxuXG4gKiBXZSBkZXRlY3QgdGhlc2UgYnVnZ3kgYnJvd3NlcnMgYW5kIHNldCBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgIHRvIGBmYWxzZWAgc28gdGhleVxuICogZ2V0IHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24sIHdoaWNoIGlzIHNsb3dlciBidXQgYmVoYXZlcyBjb3JyZWN0bHkuXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlQgIT09IHVuZGVmaW5lZFxuICA/IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gIDogdHlwZWRBcnJheVN1cHBvcnQoKVxuXG4vKlxuICogRXhwb3J0IGtNYXhMZW5ndGggYWZ0ZXIgdHlwZWQgYXJyYXkgc3VwcG9ydCBpcyBkZXRlcm1pbmVkLlxuICovXG5leHBvcnRzLmtNYXhMZW5ndGggPSBrTWF4TGVuZ3RoKClcblxuZnVuY3Rpb24gdHlwZWRBcnJheVN1cHBvcnQgKCkge1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheSgxKVxuICAgIGFyci5fX3Byb3RvX18gPSB7X19wcm90b19fOiBVaW50OEFycmF5LnByb3RvdHlwZSwgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9fVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyICYmIC8vIHR5cGVkIGFycmF5IGluc3RhbmNlcyBjYW4gYmUgYXVnbWVudGVkXG4gICAgICAgIHR5cGVvZiBhcnIuc3ViYXJyYXkgPT09ICdmdW5jdGlvbicgJiYgLy8gY2hyb21lIDktMTAgbGFjayBgc3ViYXJyYXlgXG4gICAgICAgIGFyci5zdWJhcnJheSgxLCAxKS5ieXRlTGVuZ3RoID09PSAwIC8vIGllMTAgaGFzIGJyb2tlbiBgc3ViYXJyYXlgXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBrTWF4TGVuZ3RoICgpIHtcbiAgcmV0dXJuIEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gICAgPyAweDdmZmZmZmZmXG4gICAgOiAweDNmZmZmZmZmXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1ZmZlciAodGhhdCwgbGVuZ3RoKSB7XG4gIGlmIChrTWF4TGVuZ3RoKCkgPCBsZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCB0eXBlZCBhcnJheSBsZW5ndGgnKVxuICB9XG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIGlmICh0aGF0ID09PSBudWxsKSB7XG4gICAgICB0aGF0ID0gbmV3IEJ1ZmZlcihsZW5ndGgpXG4gICAgfVxuICAgIHRoYXQubGVuZ3RoID0gbGVuZ3RoXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIFRoZSBCdWZmZXIgY29uc3RydWN0b3IgcmV0dXJucyBpbnN0YW5jZXMgb2YgYFVpbnQ4QXJyYXlgIHRoYXQgaGF2ZSB0aGVpclxuICogcHJvdG90eXBlIGNoYW5nZWQgdG8gYEJ1ZmZlci5wcm90b3R5cGVgLiBGdXJ0aGVybW9yZSwgYEJ1ZmZlcmAgaXMgYSBzdWJjbGFzcyBvZlxuICogYFVpbnQ4QXJyYXlgLCBzbyB0aGUgcmV0dXJuZWQgaW5zdGFuY2VzIHdpbGwgaGF2ZSBhbGwgdGhlIG5vZGUgYEJ1ZmZlcmAgbWV0aG9kc1xuICogYW5kIHRoZSBgVWludDhBcnJheWAgbWV0aG9kcy4gU3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXRcbiAqIHJldHVybnMgYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogVGhlIGBVaW50OEFycmF5YCBwcm90b3R5cGUgcmVtYWlucyB1bm1vZGlmaWVkLlxuICovXG5cbmZ1bmN0aW9uIEJ1ZmZlciAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJiAhKHRoaXMgaW5zdGFuY2VvZiBCdWZmZXIpKSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICAvLyBDb21tb24gY2FzZS5cbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZ09yT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnSWYgZW5jb2RpbmcgaXMgc3BlY2lmaWVkIHRoZW4gdGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcnXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZSh0aGlzLCBhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20odGhpcywgYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG4vLyBUT0RPOiBMZWdhY3ksIG5vdCBuZWVkZWQgYW55bW9yZS4gUmVtb3ZlIGluIG5leHQgbWFqb3IgdmVyc2lvbi5cbkJ1ZmZlci5fYXVnbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgYXJyLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiBmcm9tICh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJylcbiAgfVxuXG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5QnVmZmVyKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmcm9tU3RyaW5nKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0KVxuICB9XG5cbiAgcmV0dXJuIGZyb21PYmplY3QodGhhdCwgdmFsdWUpXG59XG5cbi8qKlxuICogRnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdG8gQnVmZmVyKGFyZywgZW5jb2RpbmcpIGJ1dCB0aHJvd3MgYSBUeXBlRXJyb3JcbiAqIGlmIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQnVmZmVyLmZyb20oc3RyWywgZW5jb2RpbmddKVxuICogQnVmZmVyLmZyb20oYXJyYXkpXG4gKiBCdWZmZXIuZnJvbShidWZmZXIpXG4gKiBCdWZmZXIuZnJvbShhcnJheUJ1ZmZlclssIGJ5dGVPZmZzZXRbLCBsZW5ndGhdXSlcbiAqKi9cbkJ1ZmZlci5mcm9tID0gZnVuY3Rpb24gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGZyb20obnVsbCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gIEJ1ZmZlci5wcm90b3R5cGUuX19wcm90b19fID0gVWludDhBcnJheS5wcm90b3R5cGVcbiAgQnVmZmVyLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXlcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC5zcGVjaWVzICYmXG4gICAgICBCdWZmZXJbU3ltYm9sLnNwZWNpZXNdID09PSBCdWZmZXIpIHtcbiAgICAvLyBGaXggc3ViYXJyYXkoKSBpbiBFUzIwMTYuIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvcHVsbC85N1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdWZmZXIsIFN5bWJvbC5zcGVjaWVzLCB7XG4gICAgICB2YWx1ZTogbnVsbCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH0gZWxzZSBpZiAoc2l6ZSA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgbmVnYXRpdmUnKVxuICB9XG59XG5cbmZ1bmN0aW9uIGFsbG9jICh0aGF0LCBzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIGlmIChzaXplIDw9IDApIHtcbiAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpXG4gIH1cbiAgaWYgKGZpbGwgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9ubHkgcGF5IGF0dGVudGlvbiB0byBlbmNvZGluZyBpZiBpdCdzIGEgc3RyaW5nLiBUaGlzXG4gICAgLy8gcHJldmVudHMgYWNjaWRlbnRhbGx5IHNlbmRpbmcgaW4gYSBudW1iZXIgdGhhdCB3b3VsZFxuICAgIC8vIGJlIGludGVycHJldHRlZCBhcyBhIHN0YXJ0IG9mZnNldC5cbiAgICByZXR1cm4gdHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJ1xuICAgICAgPyBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICAgIDogY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbClcbiAgfVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBmaWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogYWxsb2Moc2l6ZVssIGZpbGxbLCBlbmNvZGluZ11dKVxuICoqL1xuQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIHJldHVybiBhbGxvYyhudWxsLCBzaXplLCBmaWxsLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gYWxsb2NVbnNhZmUgKHRoYXQsIHNpemUpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUgPCAwID8gMCA6IGNoZWNrZWQoc2l6ZSkgfCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyArK2kpIHtcbiAgICAgIHRoYXRbaV0gPSAwXG4gICAgfVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogRXF1aXZhbGVudCB0byBCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqICovXG5CdWZmZXIuYWxsb2NVbnNhZmUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUobnVsbCwgc2l6ZSlcbn1cbi8qKlxuICogRXF1aXZhbGVudCB0byBTbG93QnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUobnVsbCwgc2l6ZSlcbn1cblxuZnVuY3Rpb24gZnJvbVN0cmluZyAodGhhdCwgc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAodHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJyB8fCBlbmNvZGluZyA9PT0gJycpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICB9XG5cbiAgaWYgKCFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImVuY29kaW5nXCIgbXVzdCBiZSBhIHZhbGlkIHN0cmluZyBlbmNvZGluZycpXG4gIH1cblxuICB2YXIgbGVuZ3RoID0gYnl0ZUxlbmd0aChzdHJpbmcsIGVuY29kaW5nKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG5cbiAgdmFyIGFjdHVhbCA9IHRoYXQud3JpdGUoc3RyaW5nLCBlbmNvZGluZylcblxuICBpZiAoYWN0dWFsICE9PSBsZW5ndGgpIHtcbiAgICAvLyBXcml0aW5nIGEgaGV4IHN0cmluZywgZm9yIGV4YW1wbGUsIHRoYXQgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzIHdpbGxcbiAgICAvLyBjYXVzZSBldmVyeXRoaW5nIGFmdGVyIHRoZSBmaXJzdCBpbnZhbGlkIGNoYXJhY3RlciB0byBiZSBpZ25vcmVkLiAoZS5nLlxuICAgIC8vICdhYnh4Y2QnIHdpbGwgYmUgdHJlYXRlZCBhcyAnYWInKVxuICAgIHRoYXQgPSB0aGF0LnNsaWNlKDAsIGFjdHVhbClcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUxpa2UgKHRoYXQsIGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGggPCAwID8gMCA6IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICB0aGF0W2ldID0gYXJyYXlbaV0gJiAyNTVcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKHRoYXQsIGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgYXJyYXkuYnl0ZUxlbmd0aCAvLyB0aGlzIHRocm93cyBpZiBgYXJyYXlgIGlzIG5vdCBhIHZhbGlkIEFycmF5QnVmZmVyXG5cbiAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ29mZnNldFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCArIChsZW5ndGggfHwgMCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnbGVuZ3RoXFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGJ5dGVPZmZzZXQgPT09IHVuZGVmaW5lZCAmJiBsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0KVxuICB9IGVsc2Uge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBhcnJheVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICB0aGF0ID0gZnJvbUFycmF5TGlrZSh0aGF0LCBhcnJheSlcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tT2JqZWN0ICh0aGF0LCBvYmopIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihvYmopKSB7XG4gICAgdmFyIGxlbiA9IGNoZWNrZWQob2JqLmxlbmd0aCkgfCAwXG4gICAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW4pXG5cbiAgICBpZiAodGhhdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGF0XG4gICAgfVxuXG4gICAgb2JqLmNvcHkodGhhdCwgMCwgMCwgbGVuKVxuICAgIHJldHVybiB0aGF0XG4gIH1cblxuICBpZiAob2JqKSB7XG4gICAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgfHwgJ2xlbmd0aCcgaW4gb2JqKSB7XG4gICAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggIT09ICdudW1iZXInIHx8IGlzbmFuKG9iai5sZW5ndGgpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgMClcbiAgICAgIH1cbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iailcbiAgICB9XG5cbiAgICBpZiAob2JqLnR5cGUgPT09ICdCdWZmZXInICYmIGlzQXJyYXkob2JqLmRhdGEpKSB7XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmouZGF0YSlcbiAgICB9XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nLCBCdWZmZXIsIEFycmF5QnVmZmVyLCBBcnJheSwgb3IgYXJyYXktbGlrZSBvYmplY3QuJylcbn1cblxuZnVuY3Rpb24gY2hlY2tlZCAobGVuZ3RoKSB7XG4gIC8vIE5vdGU6IGNhbm5vdCB1c2UgYGxlbmd0aCA8IGtNYXhMZW5ndGgoKWAgaGVyZSBiZWNhdXNlIHRoYXQgZmFpbHMgd2hlblxuICAvLyBsZW5ndGggaXMgTmFOICh3aGljaCBpcyBvdGhlcndpc2UgY29lcmNlZCB0byB6ZXJvLilcbiAgaWYgKGxlbmd0aCA+PSBrTWF4TGVuZ3RoKCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byBhbGxvY2F0ZSBCdWZmZXIgbGFyZ2VyIHRoYW4gbWF4aW11bSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnc2l6ZTogMHgnICsga01heExlbmd0aCgpLnRvU3RyaW5nKDE2KSArICcgYnl0ZXMnKVxuICB9XG4gIHJldHVybiBsZW5ndGggfCAwXG59XG5cbmZ1bmN0aW9uIFNsb3dCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAoK2xlbmd0aCAhPSBsZW5ndGgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcWVxZXFcbiAgICBsZW5ndGggPSAwXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlci5hbGxvYygrbGVuZ3RoKVxufVxuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlciAoYikge1xuICByZXR1cm4gISEoYiAhPSBudWxsICYmIGIuX2lzQnVmZmVyKVxufVxuXG5CdWZmZXIuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKGEsIGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkgfHwgIUJ1ZmZlci5pc0J1ZmZlcihiKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyBtdXN0IGJlIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGEgPT09IGIpIHJldHVybiAwXG5cbiAgdmFyIHggPSBhLmxlbmd0aFxuICB2YXIgeSA9IGIubGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IE1hdGgubWluKHgsIHkpOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgeCA9IGFbaV1cbiAgICAgIHkgPSBiW2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiBpc0VuY29kaW5nIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdsYXRpbjEnOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIGNvbmNhdCAobGlzdCwgbGVuZ3RoKSB7XG4gIGlmICghaXNBcnJheShsaXN0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gIH1cblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gQnVmZmVyLmFsbG9jKDApXG4gIH1cblxuICB2YXIgaVxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBsZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgIGxlbmd0aCArPSBsaXN0W2ldLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIHZhciBidWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUobGVuZ3RoKVxuICB2YXIgcG9zID0gMFxuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBidWYgPSBsaXN0W2ldXG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgICB9XG4gICAgYnVmLmNvcHkoYnVmZmVyLCBwb3MpXG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAoQXJyYXlCdWZmZXIuaXNWaWV3KHN0cmluZykgfHwgc3RyaW5nIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5ieXRlTGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmdcbiAgfVxuXG4gIHZhciBsZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChsZW4gPT09IDApIHJldHVybiAwXG5cbiAgLy8gVXNlIGEgZm9yIGxvb3AgdG8gYXZvaWQgcmVjdXJzaW9uXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxlblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gbGVuICogMlxuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGxlbiA+Pj4gMVxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoIC8vIGFzc3VtZSB1dGY4XG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcblxuZnVuY3Rpb24gc2xvd1RvU3RyaW5nIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuXG4gIC8vIE5vIG5lZWQgdG8gdmVyaWZ5IHRoYXQgXCJ0aGlzLmxlbmd0aCA8PSBNQVhfVUlOVDMyXCIgc2luY2UgaXQncyBhIHJlYWQtb25seVxuICAvLyBwcm9wZXJ0eSBvZiBhIHR5cGVkIGFycmF5LlxuXG4gIC8vIFRoaXMgYmVoYXZlcyBuZWl0aGVyIGxpa2UgU3RyaW5nIG5vciBVaW50OEFycmF5IGluIHRoYXQgd2Ugc2V0IHN0YXJ0L2VuZFxuICAvLyB0byB0aGVpciB1cHBlci9sb3dlciBib3VuZHMgaWYgdGhlIHZhbHVlIHBhc3NlZCBpcyBvdXQgb2YgcmFuZ2UuXG4gIC8vIHVuZGVmaW5lZCBpcyBoYW5kbGVkIHNwZWNpYWxseSBhcyBwZXIgRUNNQS0yNjIgNnRoIEVkaXRpb24sXG4gIC8vIFNlY3Rpb24gMTMuMy4zLjcgUnVudGltZSBTZW1hbnRpY3M6IEtleWVkQmluZGluZ0luaXRpYWxpemF0aW9uLlxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCB8fCBzdGFydCA8IDApIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICAvLyBSZXR1cm4gZWFybHkgaWYgc3RhcnQgPiB0aGlzLmxlbmd0aC4gRG9uZSBoZXJlIHRvIHByZXZlbnQgcG90ZW50aWFsIHVpbnQzMlxuICAvLyBjb2VyY2lvbiBmYWlsIGJlbG93LlxuICBpZiAoc3RhcnQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkIHx8IGVuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChlbmQgPD0gMCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgLy8gRm9yY2UgY29lcnNpb24gdG8gdWludDMyLiBUaGlzIHdpbGwgYWxzbyBjb2VyY2UgZmFsc2V5L05hTiB2YWx1ZXMgdG8gMC5cbiAgZW5kID4+Pj0gMFxuICBzdGFydCA+Pj49IDBcblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHV0ZjE2bGVTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoZW5jb2RpbmcgKyAnJykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuLy8gVGhlIHByb3BlcnR5IGlzIHVzZWQgYnkgYEJ1ZmZlci5pc0J1ZmZlcmAgYW5kIGBpcy1idWZmZXJgIChpbiBTYWZhcmkgNS03KSB0byBkZXRlY3Rcbi8vIEJ1ZmZlciBpbnN0YW5jZXMuXG5CdWZmZXIucHJvdG90eXBlLl9pc0J1ZmZlciA9IHRydWVcblxuZnVuY3Rpb24gc3dhcCAoYiwgbiwgbSkge1xuICB2YXIgaSA9IGJbbl1cbiAgYltuXSA9IGJbbV1cbiAgYlttXSA9IGlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMTYgPSBmdW5jdGlvbiBzd2FwMTYgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDIgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDE2LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAxKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDMyID0gZnVuY3Rpb24gc3dhcDMyICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA0ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAzMi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgMilcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXA2NCA9IGZ1bmN0aW9uIHN3YXA2NCAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgOCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNjQtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gOCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDcpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDYpXG4gICAgc3dhcCh0aGlzLCBpICsgMiwgaSArIDUpXG4gICAgc3dhcCh0aGlzLCBpICsgMywgaSArIDQpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoIHwgMFxuICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm4gJydcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB1dGY4U2xpY2UodGhpcywgMCwgbGVuZ3RoKVxuICByZXR1cm4gc2xvd1RvU3RyaW5nLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMgKGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICBpZiAodGhpcyA9PT0gYikgcmV0dXJuIHRydWVcbiAgcmV0dXJuIEJ1ZmZlci5jb21wYXJlKHRoaXMsIGIpID09PSAwXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICB2YXIgc3RyID0gJydcbiAgdmFyIG1heCA9IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVNcbiAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkubWF0Y2goLy57Mn0vZykuam9pbignICcpXG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgc3RyICsgJz4nXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKHRhcmdldCwgc3RhcnQsIGVuZCwgdGhpc1N0YXJ0LCB0aGlzRW5kKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKHRhcmdldCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgfVxuXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5kID0gdGFyZ2V0ID8gdGFyZ2V0Lmxlbmd0aCA6IDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzU3RhcnQgPSAwXG4gIH1cbiAgaWYgKHRoaXNFbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNFbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKHN0YXJ0IDwgMCB8fCBlbmQgPiB0YXJnZXQubGVuZ3RoIHx8IHRoaXNTdGFydCA8IDAgfHwgdGhpc0VuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ291dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQgJiYgc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuICBpZiAoc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIHN0YXJ0ID4+Pj0gMFxuICBlbmQgPj4+PSAwXG4gIHRoaXNTdGFydCA+Pj49IDBcbiAgdGhpc0VuZCA+Pj49IDBcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0KSByZXR1cm4gMFxuXG4gIHZhciB4ID0gdGhpc0VuZCAtIHRoaXNTdGFydFxuICB2YXIgeSA9IGVuZCAtIHN0YXJ0XG4gIHZhciBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIHZhciB0aGlzQ29weSA9IHRoaXMuc2xpY2UodGhpc1N0YXJ0LCB0aGlzRW5kKVxuICB2YXIgdGFyZ2V0Q29weSA9IHRhcmdldC5zbGljZShzdGFydCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAodGhpc0NvcHlbaV0gIT09IHRhcmdldENvcHlbaV0pIHtcbiAgICAgIHggPSB0aGlzQ29weVtpXVxuICAgICAgeSA9IHRhcmdldENvcHlbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG4vLyBGaW5kcyBlaXRoZXIgdGhlIGZpcnN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA+PSBgYnl0ZU9mZnNldGAsXG4vLyBPUiB0aGUgbGFzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPD0gYGJ5dGVPZmZzZXRgLlxuLy9cbi8vIEFyZ3VtZW50czpcbi8vIC0gYnVmZmVyIC0gYSBCdWZmZXIgdG8gc2VhcmNoXG4vLyAtIHZhbCAtIGEgc3RyaW5nLCBCdWZmZXIsIG9yIG51bWJlclxuLy8gLSBieXRlT2Zmc2V0IC0gYW4gaW5kZXggaW50byBgYnVmZmVyYDsgd2lsbCBiZSBjbGFtcGVkIHRvIGFuIGludDMyXG4vLyAtIGVuY29kaW5nIC0gYW4gb3B0aW9uYWwgZW5jb2RpbmcsIHJlbGV2YW50IGlzIHZhbCBpcyBhIHN0cmluZ1xuLy8gLSBkaXIgLSB0cnVlIGZvciBpbmRleE9mLCBmYWxzZSBmb3IgbGFzdEluZGV4T2ZcbmZ1bmN0aW9uIGJpZGlyZWN0aW9uYWxJbmRleE9mIChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICAvLyBFbXB0eSBidWZmZXIgbWVhbnMgbm8gbWF0Y2hcbiAgaWYgKGJ1ZmZlci5sZW5ndGggPT09IDApIHJldHVybiAtMVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0XG4gIGlmICh0eXBlb2YgYnl0ZU9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IGJ5dGVPZmZzZXRcbiAgICBieXRlT2Zmc2V0ID0gMFxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPiAweDdmZmZmZmZmKSB7XG4gICAgYnl0ZU9mZnNldCA9IDB4N2ZmZmZmZmZcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgLTB4ODAwMDAwMDApIHtcbiAgICBieXRlT2Zmc2V0ID0gLTB4ODAwMDAwMDBcbiAgfVxuICBieXRlT2Zmc2V0ID0gK2J5dGVPZmZzZXQgIC8vIENvZXJjZSB0byBOdW1iZXIuXG4gIGlmIChpc05hTihieXRlT2Zmc2V0KSkge1xuICAgIC8vIGJ5dGVPZmZzZXQ6IGl0IGl0J3MgdW5kZWZpbmVkLCBudWxsLCBOYU4sIFwiZm9vXCIsIGV0Yywgc2VhcmNoIHdob2xlIGJ1ZmZlclxuICAgIGJ5dGVPZmZzZXQgPSBkaXIgPyAwIDogKGJ1ZmZlci5sZW5ndGggLSAxKVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXQ6IG5lZ2F0aXZlIG9mZnNldHMgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSBidWZmZXJcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwKSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCArIGJ5dGVPZmZzZXRcbiAgaWYgKGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgIGlmIChkaXIpIHJldHVybiAtMVxuICAgIGVsc2UgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggLSAxXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IDApIHtcbiAgICBpZiAoZGlyKSBieXRlT2Zmc2V0ID0gMFxuICAgIGVsc2UgcmV0dXJuIC0xXG4gIH1cblxuICAvLyBOb3JtYWxpemUgdmFsXG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gIH1cblxuICAvLyBGaW5hbGx5LCBzZWFyY2ggZWl0aGVyIGluZGV4T2YgKGlmIGRpciBpcyB0cnVlKSBvciBsYXN0SW5kZXhPZlxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IGxvb2tpbmcgZm9yIGVtcHR5IHN0cmluZy9idWZmZXIgYWx3YXlzIGZhaWxzXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMHhGRiAvLyBTZWFyY2ggZm9yIGEgYnl0ZSB2YWx1ZSBbMC0yNTVdXG4gICAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmXG4gICAgICAgIHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIFsgdmFsIF0sIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2YWwgbXVzdCBiZSBzdHJpbmcsIG51bWJlciBvciBCdWZmZXInKVxufVxuXG5mdW5jdGlvbiBhcnJheUluZGV4T2YgKGFyciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIHZhciBpbmRleFNpemUgPSAxXG4gIHZhciBhcnJMZW5ndGggPSBhcnIubGVuZ3RoXG4gIHZhciB2YWxMZW5ndGggPSB2YWwubGVuZ3RoXG5cbiAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgIGlmIChlbmNvZGluZyA9PT0gJ3VjczInIHx8IGVuY29kaW5nID09PSAndWNzLTInIHx8XG4gICAgICAgIGVuY29kaW5nID09PSAndXRmMTZsZScgfHwgZW5jb2RpbmcgPT09ICd1dGYtMTZsZScpIHtcbiAgICAgIGlmIChhcnIubGVuZ3RoIDwgMiB8fCB2YWwubGVuZ3RoIDwgMikge1xuICAgICAgICByZXR1cm4gLTFcbiAgICAgIH1cbiAgICAgIGluZGV4U2l6ZSA9IDJcbiAgICAgIGFyckxlbmd0aCAvPSAyXG4gICAgICB2YWxMZW5ndGggLz0gMlxuICAgICAgYnl0ZU9mZnNldCAvPSAyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZCAoYnVmLCBpKSB7XG4gICAgaWYgKGluZGV4U2l6ZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIGJ1ZltpXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYnVmLnJlYWRVSW50MTZCRShpICogaW5kZXhTaXplKVxuICAgIH1cbiAgfVxuXG4gIHZhciBpXG4gIGlmIChkaXIpIHtcbiAgICB2YXIgZm91bmRJbmRleCA9IC0xXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA8IGFyckxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocmVhZChhcnIsIGkpID09PSByZWFkKHZhbCwgZm91bmRJbmRleCA9PT0gLTEgPyAwIDogaSAtIGZvdW5kSW5kZXgpKSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSkgZm91bmRJbmRleCA9IGlcbiAgICAgICAgaWYgKGkgLSBmb3VuZEluZGV4ICsgMSA9PT0gdmFsTGVuZ3RoKSByZXR1cm4gZm91bmRJbmRleCAqIGluZGV4U2l6ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSBpIC09IGkgLSBmb3VuZEluZGV4XG4gICAgICAgIGZvdW5kSW5kZXggPSAtMVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoYnl0ZU9mZnNldCArIHZhbExlbmd0aCA+IGFyckxlbmd0aCkgYnl0ZU9mZnNldCA9IGFyckxlbmd0aCAtIHZhbExlbmd0aFxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZm91bmQgPSB0cnVlXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbExlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChyZWFkKGFyciwgaSArIGopICE9PSByZWFkKHZhbCwgaikpIHtcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gaVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIHRoaXMuaW5kZXhPZih2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSAhPT0gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgdHJ1ZSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uIGxhc3RJbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBmYWxzZSlcbn1cblxuZnVuY3Rpb24gaGV4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAoc3RyTGVuICUgMiAhPT0gMCkgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBoZXggc3RyaW5nJylcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHBhcnNlZCA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBpZiAoaXNOYU4ocGFyc2VkKSkgcmV0dXJuIGlcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBwYXJzZWRcbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiB1dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBhc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGxhdGluMVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGFzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBiYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gdWNzMldyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIHdyaXRlIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nKVxuICBpZiAob2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIG9mZnNldFssIGxlbmd0aF1bLCBlbmNvZGluZ10pXG4gIH0gZWxzZSBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgMFxuICAgICAgaWYgKGVuY29kaW5nID09PSB1bmRlZmluZWQpIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgfSBlbHNlIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoXG4gICAgICBsZW5ndGggPSB1bmRlZmluZWRcbiAgICB9XG4gIC8vIGxlZ2FjeSB3cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXQsIGxlbmd0aCkgLSByZW1vdmUgaW4gdjAuMTNcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQnXG4gICAgKVxuICB9XG5cbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCB8fCBsZW5ndGggPiByZW1haW5pbmcpIGxlbmd0aCA9IHJlbWFpbmluZ1xuXG4gIGlmICgoc3RyaW5nLmxlbmd0aCA+IDAgJiYgKGxlbmd0aCA8IDAgfHwgb2Zmc2V0IDwgMCkpIHx8IG9mZnNldCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gd3JpdGUgb3V0c2lkZSBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgLy8gV2FybmluZzogbWF4TGVuZ3RoIG5vdCB0YWtlbiBpbnRvIGFjY291bnQgaW4gYmFzZTY0V3JpdGVcbiAgICAgICAgcmV0dXJuIGJhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1Y3MyV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG5mdW5jdGlvbiBiYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuICB2YXIgcmVzID0gW11cblxuICB2YXIgaSA9IHN0YXJ0XG4gIHdoaWxlIChpIDwgZW5kKSB7XG4gICAgdmFyIGZpcnN0Qnl0ZSA9IGJ1ZltpXVxuICAgIHZhciBjb2RlUG9pbnQgPSBudWxsXG4gICAgdmFyIGJ5dGVzUGVyU2VxdWVuY2UgPSAoZmlyc3RCeXRlID4gMHhFRikgPyA0XG4gICAgICA6IChmaXJzdEJ5dGUgPiAweERGKSA/IDNcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4QkYpID8gMlxuICAgICAgOiAxXG5cbiAgICBpZiAoaSArIGJ5dGVzUGVyU2VxdWVuY2UgPD0gZW5kKSB7XG4gICAgICB2YXIgc2Vjb25kQnl0ZSwgdGhpcmRCeXRlLCBmb3VydGhCeXRlLCB0ZW1wQ29kZVBvaW50XG5cbiAgICAgIHN3aXRjaCAoYnl0ZXNQZXJTZXF1ZW5jZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKGZpcnN0Qnl0ZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCA9IGZpcnN0Qnl0ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweDFGKSA8PCAweDYgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0YpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHhDIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAodGhpcmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3RkYgJiYgKHRlbXBDb2RlUG9pbnQgPCAweEQ4MDAgfHwgdGVtcENvZGVQb2ludCA+IDB4REZGRikpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgZm91cnRoQnl0ZSA9IGJ1ZltpICsgM11cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKGZvdXJ0aEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4MTIgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4QyB8ICh0aGlyZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAoZm91cnRoQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4RkZGRiAmJiB0ZW1wQ29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIGEgdmFsaWQgY29kZVBvaW50IHNvIGluc2VydCBhXG4gICAgICAvLyByZXBsYWNlbWVudCBjaGFyIChVK0ZGRkQpIGFuZCBhZHZhbmNlIG9ubHkgMSBieXRlXG4gICAgICBjb2RlUG9pbnQgPSAweEZGRkRcbiAgICAgIGJ5dGVzUGVyU2VxdWVuY2UgPSAxXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPiAweEZGRkYpIHtcbiAgICAgIC8vIGVuY29kZSB0byB1dGYxNiAoc3Vycm9nYXRlIHBhaXIgZGFuY2UpXG4gICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgcmVzLnB1c2goY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKVxuICAgICAgY29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkZcbiAgICB9XG5cbiAgICByZXMucHVzaChjb2RlUG9pbnQpXG4gICAgaSArPSBieXRlc1BlclNlcXVlbmNlXG4gIH1cblxuICByZXR1cm4gZGVjb2RlQ29kZVBvaW50c0FycmF5KHJlcylcbn1cblxuLy8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjI3NDcyNzIvNjgwNzQyLCB0aGUgYnJvd3NlciB3aXRoXG4vLyB0aGUgbG93ZXN0IGxpbWl0IGlzIENocm9tZSwgd2l0aCAweDEwMDAwIGFyZ3MuXG4vLyBXZSBnbyAxIG1hZ25pdHVkZSBsZXNzLCBmb3Igc2FmZXR5XG52YXIgTUFYX0FSR1VNRU5UU19MRU5HVEggPSAweDEwMDBcblxuZnVuY3Rpb24gZGVjb2RlQ29kZVBvaW50c0FycmF5IChjb2RlUG9pbnRzKSB7XG4gIHZhciBsZW4gPSBjb2RlUG9pbnRzLmxlbmd0aFxuICBpZiAobGVuIDw9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjb2RlUG9pbnRzKSAvLyBhdm9pZCBleHRyYSBzbGljZSgpXG4gIH1cblxuICAvLyBEZWNvZGUgaW4gY2h1bmtzIHRvIGF2b2lkIFwiY2FsbCBzdGFjayBzaXplIGV4Y2VlZGVkXCIuXG4gIHZhciByZXMgPSAnJ1xuICB2YXIgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShcbiAgICAgIFN0cmluZyxcbiAgICAgIGNvZGVQb2ludHMuc2xpY2UoaSwgaSArPSBNQVhfQVJHVU1FTlRTX0xFTkdUSClcbiAgICApXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSAmIDB4N0YpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBsYXRpbjFTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBoZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgdmFyIG91dCA9ICcnXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKVxuICB2YXIgcmVzID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgYnl0ZXNbaSArIDFdICogMjU2KVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBzdGFydCA9IH5+c3RhcnRcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiB+fmVuZFxuXG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCArPSBsZW5cbiAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgfSBlbHNlIGlmIChzdGFydCA+IGxlbikge1xuICAgIHN0YXJ0ID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgMCkge1xuICAgIGVuZCArPSBsZW5cbiAgICBpZiAoZW5kIDwgMCkgZW5kID0gMFxuICB9IGVsc2UgaWYgKGVuZCA+IGxlbikge1xuICAgIGVuZCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIHZhciBuZXdCdWZcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgbmV3QnVmID0gdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKVxuICAgIG5ld0J1Zi5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgdmFyIHNsaWNlTGVuID0gZW5kIC0gc3RhcnRcbiAgICBuZXdCdWYgPSBuZXcgQnVmZmVyKHNsaWNlTGVuLCB1bmRlZmluZWQpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGljZUxlbjsgKytpKSB7XG4gICAgICBuZXdCdWZbaV0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3QnVmXG59XG5cbi8qXG4gKiBOZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IGJ1ZmZlciBpc24ndCB0cnlpbmcgdG8gd3JpdGUgb3V0IG9mIGJvdW5kcy5cbiAqL1xuZnVuY3Rpb24gY2hlY2tPZmZzZXQgKG9mZnNldCwgZXh0LCBsZW5ndGgpIHtcbiAgaWYgKChvZmZzZXQgJSAxKSAhPT0gMCB8fCBvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb2Zmc2V0IGlzIG5vdCB1aW50JylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RyeWluZyB0byBhY2Nlc3MgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50TEUgPSBmdW5jdGlvbiByZWFkVUludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50QkUgPSBmdW5jdGlvbiByZWFkVUludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuICB9XG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXVxuICB2YXIgbXVsID0gMVxuICB3aGlsZSAoYnl0ZUxlbmd0aCA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gcmVhZFVJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiByZWFkVUludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAoKHRoaXNbb2Zmc2V0XSkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpKSArXG4gICAgICAodGhpc1tvZmZzZXQgKyAzXSAqIDB4MTAwMDAwMClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiByZWFkVUludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSAqIDB4MTAwMDAwMCkgK1xuICAgICgodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICB0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRMRSA9IGZ1bmN0aW9uIHJlYWRJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRCRSA9IGZ1bmN0aW9uIHJlYWRJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aFxuICB2YXIgbXVsID0gMVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWldXG4gIHdoaWxlIChpID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0taV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gcmVhZEludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgaWYgKCEodGhpc1tvZmZzZXRdICYgMHg4MCkpIHJldHVybiAodGhpc1tvZmZzZXRdKVxuICByZXR1cm4gKCgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiByZWFkSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gcmVhZEludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDNdIDw8IDI0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkJFID0gZnVuY3Rpb24gcmVhZEludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCAyNCkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gcmVhZEZsb2F0TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gcmVhZEZsb2F0QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiByZWFkRG91YmxlTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDUyLCA4KVxufVxuXG5mdW5jdGlvbiBjaGVja0ludCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYnVmZmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlciBpbnN0YW5jZScpXG4gIGlmICh2YWx1ZSA+IG1heCB8fCB2YWx1ZSA8IG1pbikgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBpcyBvdXQgb2YgYm91bmRzJylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludExFID0gZnVuY3Rpb24gd3JpdGVVSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludEJFID0gZnVuY3Rpb24gd3JpdGVVSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiB3cml0ZVVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4ZmYsIDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgMik7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgJiAoMHhmZiA8PCAoOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSkpID4+PlxuICAgICAgKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDQpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDMgLSBpKSAqIDgpICYgMHhmZlxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludExFID0gZnVuY3Rpb24gd3JpdGVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IDBcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpIC0gMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludEJFID0gZnVuY3Rpb24gd3JpdGVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpICsgMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiB3cml0ZUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHg3ZiwgLTB4ODApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmICsgdmFsdWUgKyAxXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbmZ1bmN0aW9uIGNoZWNrSUVFRTc1NCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5mdW5jdGlvbiB3cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDQsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gd3JpdGVGbG9hdEJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDgsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gY29weSAodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0U3RhcnQgPj0gdGFyZ2V0Lmxlbmd0aCkgdGFyZ2V0U3RhcnQgPSB0YXJnZXQubGVuZ3RoXG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMFxuICBpZiAoZW5kID4gMCAmJiBlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAwXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgaWYgKHRhcmdldFN0YXJ0IDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgfVxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChlbmQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlRW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCA8IGVuZCAtIHN0YXJ0KSB7XG4gICAgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0ICsgc3RhcnRcbiAgfVxuXG4gIHZhciBsZW4gPSBlbmQgLSBzdGFydFxuICB2YXIgaVxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQgJiYgc3RhcnQgPCB0YXJnZXRTdGFydCAmJiB0YXJnZXRTdGFydCA8IGVuZCkge1xuICAgIC8vIGRlc2NlbmRpbmcgY29weSBmcm9tIGVuZFxuICAgIGZvciAoaSA9IGxlbiAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIGlmIChsZW4gPCAxMDAwIHx8ICFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIGFzY2VuZGluZyBjb3B5IGZyb20gc3RhcnRcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNldC5jYWxsKFxuICAgICAgdGFyZ2V0LFxuICAgICAgdGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLFxuICAgICAgdGFyZ2V0U3RhcnRcbiAgICApXG4gIH1cblxuICByZXR1cm4gbGVuXG59XG5cbi8vIFVzYWdlOlxuLy8gICAgYnVmZmVyLmZpbGwobnVtYmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChidWZmZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKHN0cmluZ1ssIG9mZnNldFssIGVuZF1dWywgZW5jb2RpbmddKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gZmlsbCAodmFsLCBzdGFydCwgZW5kLCBlbmNvZGluZykge1xuICAvLyBIYW5kbGUgc3RyaW5nIGNhc2VzOlxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBzdGFydFxuICAgICAgc3RhcnQgPSAwXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gZW5kXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH1cbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdmFyIGNvZGUgPSB2YWwuY2hhckNvZGVBdCgwKVxuICAgICAgaWYgKGNvZGUgPCAyNTYpIHtcbiAgICAgICAgdmFsID0gY29kZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdlbmNvZGluZyBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycgJiYgIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDI1NVxuICB9XG5cbiAgLy8gSW52YWxpZCByYW5nZXMgYXJlIG5vdCBzZXQgdG8gYSBkZWZhdWx0LCBzbyBjYW4gcmFuZ2UgY2hlY2sgZWFybHkuXG4gIGlmIChzdGFydCA8IDAgfHwgdGhpcy5sZW5ndGggPCBzdGFydCB8fCB0aGlzLmxlbmd0aCA8IGVuZCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdPdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdGFydCA9IHN0YXJ0ID4+PiAwXG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gdGhpcy5sZW5ndGggOiBlbmQgPj4+IDBcblxuICBpZiAoIXZhbCkgdmFsID0gMFxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICAgIHRoaXNbaV0gPSB2YWxcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGJ5dGVzID0gQnVmZmVyLmlzQnVmZmVyKHZhbClcbiAgICAgID8gdmFsXG4gICAgICA6IHV0ZjhUb0J5dGVzKG5ldyBCdWZmZXIodmFsLCBlbmNvZGluZykudG9TdHJpbmcoKSlcbiAgICB2YXIgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgZm9yIChpID0gMDsgaSA8IGVuZCAtIHN0YXJ0OyArK2kpIHtcbiAgICAgIHRoaXNbaSArIHN0YXJ0XSA9IGJ5dGVzW2kgJSBsZW5dXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG52YXIgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rXFwvMC05QS1aYS16LV9dL2dcblxuZnVuY3Rpb24gYmFzZTY0Y2xlYW4gKHN0cikge1xuICAvLyBOb2RlIHN0cmlwcyBvdXQgaW52YWxpZCBjaGFyYWN0ZXJzIGxpa2UgXFxuIGFuZCBcXHQgZnJvbSB0aGUgc3RyaW5nLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgc3RyID0gc3RyaW5ndHJpbShzdHIpLnJlcGxhY2UoSU5WQUxJRF9CQVNFNjRfUkUsICcnKVxuICAvLyBOb2RlIGNvbnZlcnRzIHN0cmluZ3Mgd2l0aCBsZW5ndGggPCAyIHRvICcnXG4gIGlmIChzdHIubGVuZ3RoIDwgMikgcmV0dXJuICcnXG4gIC8vIE5vZGUgYWxsb3dzIGZvciBub24tcGFkZGVkIGJhc2U2NCBzdHJpbmdzIChtaXNzaW5nIHRyYWlsaW5nID09PSksIGJhc2U2NC1qcyBkb2VzIG5vdFxuICB3aGlsZSAoc3RyLmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICBzdHIgPSBzdHIgKyAnPSdcbiAgfVxuICByZXR1cm4gc3RyXG59XG5cbmZ1bmN0aW9uIHN0cmluZ3RyaW0gKHN0cikge1xuICBpZiAoc3RyLnRyaW0pIHJldHVybiBzdHIudHJpbSgpXG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG59XG5cbmZ1bmN0aW9uIHRvSGV4IChuKSB7XG4gIGlmIChuIDwgMTYpIHJldHVybiAnMCcgKyBuLnRvU3RyaW5nKDE2KVxuICByZXR1cm4gbi50b1N0cmluZygxNilcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMgKHN0cmluZywgdW5pdHMpIHtcbiAgdW5pdHMgPSB1bml0cyB8fCBJbmZpbml0eVxuICB2YXIgY29kZVBvaW50XG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoXG4gIHZhciBsZWFkU3Vycm9nYXRlID0gbnVsbFxuICB2YXIgYnl0ZXMgPSBbXVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlUG9pbnQgPSBzdHJpbmcuY2hhckNvZGVBdChpKVxuXG4gICAgLy8gaXMgc3Vycm9nYXRlIGNvbXBvbmVudFxuICAgIGlmIChjb2RlUG9pbnQgPiAweEQ3RkYgJiYgY29kZVBvaW50IDwgMHhFMDAwKSB7XG4gICAgICAvLyBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCFsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAgIC8vIG5vIGxlYWQgeWV0XG4gICAgICAgIGlmIChjb2RlUG9pbnQgPiAweERCRkYpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIHRyYWlsXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpICsgMSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgLy8gdW5wYWlyZWQgbGVhZFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZCBsZWFkXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyAyIGxlYWRzIGluIGEgcm93XG4gICAgICBpZiAoY29kZVBvaW50IDwgMHhEQzAwKSB7XG4gICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjb2RlUG9pbnQgPSAobGVhZFN1cnJvZ2F0ZSAtIDB4RDgwMCA8PCAxMCB8IGNvZGVQb2ludCAtIDB4REMwMCkgKyAweDEwMDAwXG4gICAgfSBlbHNlIGlmIChsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAvLyB2YWxpZCBibXAgY2hhciwgYnV0IGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICB9XG5cbiAgICBsZWFkU3Vycm9nYXRlID0gbnVsbFxuXG4gICAgLy8gZW5jb2RlIHV0ZjhcbiAgICBpZiAoY29kZVBvaW50IDwgMHg4MCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAxKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKGNvZGVQb2ludClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4ODAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgfCAweEMwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAzKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDIHwgMHhFMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gNCkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4MTIgfCAweEYwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBieXRlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyLCB1bml0cykge1xuICB2YXIgYywgaGksIGxvXG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuXG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaGkgPSBjID4+IDhcbiAgICBsbyA9IGMgJSAyNTZcbiAgICBieXRlQXJyYXkucHVzaChsbylcbiAgICBieXRlQXJyYXkucHVzaChoaSlcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoYmFzZTY0Y2xlYW4oc3RyKSlcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlciAoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gaXNuYW4gKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSB2YWwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cbiIsImV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBuQml0cyA9IC03XG4gIHZhciBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDBcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxXG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldXG5cbiAgaSArPSBkXG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgcyA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gZUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gKGUgKiAyNTYpICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgZSA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gbUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gKG0gKiAyNTYpICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzXG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KVxuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbilcbiAgICBlID0gZSAtIGVCaWFzXG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbilcbn1cblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgY1xuICB2YXIgZUxlbiA9IChuQnl0ZXMgKiA4KSAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApXG4gIHZhciBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSlcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xXG4gIHZhciBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwXG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMFxuICAgIGUgPSBlTWF4XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpXG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tXG4gICAgICBjICo9IDJcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpXG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrXG4gICAgICBjIC89IDJcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwXG4gICAgICBlID0gZU1heFxuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAoKHZhbHVlICogYykgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gZSArIGVCaWFzXG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IDBcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG1cbiAgZUxlbiArPSBtTGVuXG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjhcbn1cbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE0IEpvbmFzIEZpbm5lbWFubiBKZW5zZW5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vc2x1Z2lkJyk7XG4iLCJcbnZhciBybmc7XG5cbnZhciBjcnlwdG8gPSBnbG9iYWwuY3J5cHRvIHx8IGdsb2JhbC5tc0NyeXB0bzsgLy8gZm9yIElFIDExXG5pZiAoY3J5cHRvICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgLy8gV0hBVFdHIGNyeXB0by1iYXNlZCBSTkcgLSBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvQ3J5cHRvXG4gIC8vIE1vZGVyYXRlbHkgZmFzdCwgaGlnaCBxdWFsaXR5XG4gIHZhciBfcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG4gIHJuZyA9IGZ1bmN0aW9uIHdoYXR3Z1JORygpIHtcbiAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKF9ybmRzOCk7XG4gICAgcmV0dXJuIF9ybmRzODtcbiAgfTtcbn1cblxuaWYgKCFybmcpIHtcbiAgLy8gTWF0aC5yYW5kb20oKS1iYXNlZCAoUk5HKVxuICAvL1xuICAvLyBJZiBhbGwgZWxzZSBmYWlscywgdXNlIE1hdGgucmFuZG9tKCkuICBJdCdzIGZhc3QsIGJ1dCBpcyBvZiB1bnNwZWNpZmllZFxuICAvLyBxdWFsaXR5LlxuICB2YXIgIF9ybmRzID0gbmV3IEFycmF5KDE2KTtcbiAgcm5nID0gZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIHI7IGkgPCAxNjsgaSsrKSB7XG4gICAgICBpZiAoKGkgJiAweDAzKSA9PT0gMCkgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcbiAgICAgIF9ybmRzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xuICAgIH1cblxuICAgIHJldHVybiBfcm5kcztcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBybmc7XG5cbiIsIi8vICAgICB1dWlkLmpzXG4vL1xuLy8gICAgIENvcHlyaWdodCAoYykgMjAxMC0yMDEyIFJvYmVydCBLaWVmZmVyXG4vLyAgICAgTUlUIExpY2Vuc2UgLSBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cbi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBXZSBmZWF0dXJlXG4vLyBkZXRlY3QgdG8gZGV0ZXJtaW5lIHRoZSBiZXN0IFJORyBzb3VyY2UsIG5vcm1hbGl6aW5nIHRvIGEgZnVuY3Rpb24gdGhhdFxuLy8gcmV0dXJucyAxMjgtYml0cyBvZiByYW5kb21uZXNzLCBzaW5jZSB0aGF0J3Mgd2hhdCdzIHVzdWFsbHkgcmVxdWlyZWRcbnZhciBfcm5nID0gcmVxdWlyZSgnLi9ybmcnKTtcblxuLy8gTWFwcyBmb3IgbnVtYmVyIDwtPiBoZXggc3RyaW5nIGNvbnZlcnNpb25cbnZhciBfYnl0ZVRvSGV4ID0gW107XG52YXIgX2hleFRvQnl0ZSA9IHt9O1xuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICBfYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcbiAgX2hleFRvQnl0ZVtfYnl0ZVRvSGV4W2ldXSA9IGk7XG59XG5cbi8vICoqYHBhcnNlKClgIC0gUGFyc2UgYSBVVUlEIGludG8gaXQncyBjb21wb25lbnQgYnl0ZXMqKlxuZnVuY3Rpb24gcGFyc2UocywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSAoYnVmICYmIG9mZnNldCkgfHwgMCwgaWkgPSAwO1xuXG4gIGJ1ZiA9IGJ1ZiB8fCBbXTtcbiAgcy50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1swLTlhLWZdezJ9L2csIGZ1bmN0aW9uKG9jdCkge1xuICAgIGlmIChpaSA8IDE2KSB7IC8vIERvbid0IG92ZXJmbG93IVxuICAgICAgYnVmW2kgKyBpaSsrXSA9IF9oZXhUb0J5dGVbb2N0XTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIFplcm8gb3V0IHJlbWFpbmluZyBieXRlcyBpZiBzdHJpbmcgd2FzIHNob3J0XG4gIHdoaWxlIChpaSA8IDE2KSB7XG4gICAgYnVmW2kgKyBpaSsrXSA9IDA7XG4gIH1cblxuICByZXR1cm4gYnVmO1xufVxuXG4vLyAqKmB1bnBhcnNlKClgIC0gQ29udmVydCBVVUlEIGJ5dGUgYXJyYXkgKGFsYSBwYXJzZSgpKSBpbnRvIGEgc3RyaW5nKipcbmZ1bmN0aW9uIHVucGFyc2UoYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBvZmZzZXQgfHwgMCwgYnRoID0gX2J5dGVUb0hleDtcbiAgcmV0dXJuICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV07XG59XG5cbi8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxuLy8gcmFuZG9tICMncyB3ZSBuZWVkIHRvIGluaXQgbm9kZSBhbmQgY2xvY2tzZXFcbnZhciBfc2VlZEJ5dGVzID0gX3JuZygpO1xuXG4vLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbnZhciBfbm9kZUlkID0gW1xuICBfc2VlZEJ5dGVzWzBdIHwgMHgwMSxcbiAgX3NlZWRCeXRlc1sxXSwgX3NlZWRCeXRlc1syXSwgX3NlZWRCeXRlc1szXSwgX3NlZWRCeXRlc1s0XSwgX3NlZWRCeXRlc1s1XVxuXTtcblxuLy8gUGVyIDQuMi4yLCByYW5kb21pemUgKDE0IGJpdCkgY2xvY2tzZXFcbnZhciBfY2xvY2tzZXEgPSAoX3NlZWRCeXRlc1s2XSA8PCA4IHwgX3NlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG5cbi8vIFByZXZpb3VzIHV1aWQgY3JlYXRpb24gdGltZVxudmFyIF9sYXN0TVNlY3MgPSAwLCBfbGFzdE5TZWNzID0gMDtcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gIHZhciBiID0gYnVmIHx8IFtdO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7XG5cbiAgLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG4gIHZhciBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTtcblxuICAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG4gIHZhciBkdCA9IChtc2VjcyAtIF9sYXN0TVNlY3MpICsgKG5zZWNzIC0gX2xhc3ROU2VjcykvMTAwMDA7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9XG5cbiAgLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgLy8gdGltZSBpbnRlcnZhbFxuICBpZiAoKGR0IDwgMCB8fCBtc2VjcyA+IF9sYXN0TVNlY3MpICYmIG9wdGlvbnMubnNlY3MgPT09IHVuZGVmaW5lZCkge1xuICAgIG5zZWNzID0gMDtcbiAgfVxuXG4gIC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcbiAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1dWlkLnYxKCk6IENhblxcJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjJyk7XG4gIH1cblxuICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7XG5cbiAgLy8gUGVyIDQuMS40IC0gQ29udmVydCBmcm9tIHVuaXggZXBvY2ggdG8gR3JlZ29yaWFuIGVwb2NoXG4gIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwO1xuXG4gIC8vIGB0aW1lX2xvd2BcbiAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjtcblxuICAvLyBgdGltZV9taWRgXG4gIHZhciB0bWggPSAobXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwKSAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjtcblxuICAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmO1xuXG4gIC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgLy8gYGNsb2NrX3NlcV9sb3dgXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcblxuICAvLyBgbm9kZWBcbiAgdmFyIG5vZGUgPSBvcHRpb25zLm5vZGUgfHwgX25vZGVJZDtcbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyBuKyspIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cblxuICByZXR1cm4gYnVmID8gYnVmIDogdW5wYXJzZShiKTtcbn1cblxuLy8gKipgdjQoKWAgLSBHZW5lcmF0ZSByYW5kb20gVVVJRCoqXG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYnJvb2ZhL25vZGUtdXVpZCBmb3IgQVBJIGRldGFpbHNcbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIC8vIERlcHJlY2F0ZWQgLSAnZm9ybWF0JyBhcmd1bWVudCwgYXMgc3VwcG9ydGVkIGluIHYxLjJcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG5cbiAgaWYgKHR5cGVvZihvcHRpb25zKSA9PSAnc3RyaW5nJykge1xuICAgIGJ1ZiA9IG9wdGlvbnMgPT0gJ2JpbmFyeScgPyBuZXcgQXJyYXkoMTYpIDogbnVsbDtcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBfcm5nKSgpO1xuXG4gIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XG5cbiAgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG4gIGlmIChidWYpIHtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgMTY7IGlpKyspIHtcbiAgICAgIGJ1ZltpICsgaWldID0gcm5kc1tpaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZiB8fCB1bnBhcnNlKHJuZHMpO1xufVxuXG4vLyBFeHBvcnQgcHVibGljIEFQSVxudmFyIHV1aWQgPSB2NDtcbnV1aWQudjEgPSB2MTtcbnV1aWQudjQgPSB2NDtcbnV1aWQucGFyc2UgPSBwYXJzZTtcbnV1aWQudW5wYXJzZSA9IHVucGFyc2U7XG5cbm1vZHVsZS5leHBvcnRzID0gdXVpZDtcbiIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxNCBKb25hcyBGaW5uZW1hbm4gSmVuc2VuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxudmFyIHV1aWQgPSByZXF1aXJlKCd1dWlkJyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZ2l2ZW4gdXVpZCBhcyBhIDIyIGNoYXJhY3RlciBzbHVnLiBUaGlzIGNhbiBiZSBhIHJlZ3VsYXIgdjRcbiAqIHNsdWcgb3IgYSBcIm5pY2VcIiBzbHVnLlxuICovXG5leHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uKHV1aWRfKSB7XG4gIHZhciBieXRlcyAgID0gdXVpZC5wYXJzZSh1dWlkXyk7XG4gIHZhciBiYXNlNjQgID0gKG5ldyBCdWZmZXIoYnl0ZXMpKS50b1N0cmluZygnYmFzZTY0Jyk7XG4gIHZhciBzbHVnID0gYmFzZTY0XG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9cXCsvZywgJy0nKSAgLy8gUmVwbGFjZSArIHdpdGggLSAoc2VlIFJGQyA0NjQ4LCBzZWMuIDUpXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9cXC8vZywgJ18nKSAgLy8gUmVwbGFjZSAvIHdpdGggXyAoc2VlIFJGQyA0NjQ4LCBzZWMuIDUpXG4gICAgICAgICAgICAgIC5zdWJzdHJpbmcoMCwgMjIpOyAgICAvLyBEcm9wICc9PScgcGFkZGluZ1xuICByZXR1cm4gc2x1Zztcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdXVpZCByZXByZXNlbnRlZCBieSB0aGUgZ2l2ZW4gdjQgb3IgXCJuaWNlXCIgc2x1Z1xuICovXG5leHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uKHNsdWcpIHtcbiAgdmFyIGJhc2U2NCA9IHNsdWdcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csICcrJylcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9fL2csICcvJylcbiAgICAgICAgICAgICAgICAgICsgJz09JztcbiAgcmV0dXJuIHV1aWQudW5wYXJzZShuZXcgQnVmZmVyKGJhc2U2NCwgJ2Jhc2U2NCcpKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHJhbmRvbWx5IGdlbmVyYXRlZCB1dWlkIHY0IGNvbXBsaWFudCBzbHVnXG4gKi9cbmV4cG9ydHMudjQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJ5dGVzICAgPSB1dWlkLnY0KG51bGwsIG5ldyBCdWZmZXIoMTYpKTtcbiAgdmFyIGJhc2U2NCAgPSBieXRlcy50b1N0cmluZygnYmFzZTY0Jyk7XG4gIHZhciBzbHVnID0gYmFzZTY0XG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9cXCsvZywgJy0nKSAgLy8gUmVwbGFjZSArIHdpdGggLSAoc2VlIFJGQyA0NjQ4LCBzZWMuIDUpXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9cXC8vZywgJ18nKSAgLy8gUmVwbGFjZSAvIHdpdGggXyAoc2VlIFJGQyA0NjQ4LCBzZWMuIDUpXG4gICAgICAgICAgICAgIC5zdWJzdHJpbmcoMCwgMjIpOyAgICAvLyBEcm9wICc9PScgcGFkZGluZ1xuICByZXR1cm4gc2x1Zztcbn07XG5cbi8qKiBcbiAqIFJldHVybnMgYSByYW5kb21seSBnZW5lcmF0ZWQgdXVpZCB2NCBjb21wbGlhbnQgc2x1ZyB3aGljaCBjb25mb3JtcyB0byBhIHNldFxuICogb2YgXCJuaWNlXCIgcHJvcGVydGllcywgYXQgdGhlIGNvc3Qgb2Ygc29tZSBlbnRyb3B5LiBDdXJyZW50bHkgdGhpcyBtZWFucyBvbmVcbiAqIGV4dHJhIGZpeGVkIGJpdCAodGhlIGZpcnN0IGJpdCBvZiB0aGUgdXVpZCBpcyBzZXQgdG8gMCkgd2hpY2ggZ3VhcmFudGVlcyB0aGVcbiAqIHNsdWcgd2lsbCBiZWdpbiB3aXRoIFtBLVphLWZdLiBGb3IgZXhhbXBsZSBzdWNoIHNsdWdzIGRvbid0IHJlcXVpcmUgc3BlY2lhbFxuICogaGFuZGxpbmcgd2hlbiB1c2VkIGFzIGNvbW1hbmQgbGluZSBwYXJhbWV0ZXJzICh3aGVyZWFzIG5vbi1uaWNlIHNsdWdzIG1heVxuICogc3RhcnQgd2l0aCBgLWAgd2hpY2ggY2FuIGNvbmZ1c2UgY29tbWFuZCBsaW5lIHRvb2xzKS5cbiAqXG4gKiBQb3RlbnRpYWxseSBvdGhlciBcIm5pY2VcIiBwcm9wZXJ0aWVzIG1heSBiZSBhZGRlZCBpbiBmdXR1cmUgdG8gZnVydGhlclxuICogcmVzdHJpY3QgdGhlIHJhbmdlIG9mIHBvdGVudGlhbCB1dWlkcyB0aGF0IG1heSBiZSBnZW5lcmF0ZWQuXG4gKi9cbmV4cG9ydHMubmljZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYnl0ZXMgICA9IHV1aWQudjQobnVsbCwgbmV3IEJ1ZmZlcigxNikpO1xuICBieXRlc1swXSA9IGJ5dGVzWzBdICYgMHg3ZjsgIC8vIHVuc2V0IGZpcnN0IGJpdCB0byBlbnN1cmUgW0EtWmEtZl0gZmlyc3QgY2hhclxuICB2YXIgYmFzZTY0ICA9IGJ5dGVzLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgdmFyIHNsdWcgPSBiYXNlNjRcbiAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcKy9nLCAnLScpICAvLyBSZXBsYWNlICsgd2l0aCAtIChzZWUgUkZDIDQ2NDgsIHNlYy4gNSlcbiAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcLy9nLCAnXycpICAvLyBSZXBsYWNlIC8gd2l0aCBfIChzZWUgUkZDIDQ2NDgsIHNlYy4gNSlcbiAgICAgICAgICAgICAgLnN1YnN0cmluZygwLCAyMik7ICAgIC8vIERyb3AgJz09JyBwYWRkaW5nXG4gIHJldHVybiBzbHVnO1xufTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsImltcG9ydCAnLi4vc3R5bGVzL2QzLWNvbnRleHQtbWVudS5jc3MnO1xuXG5pbXBvcnQgZDMgZnJvbSAnZDMnO1xuaW1wb3J0IHNsdWdpZCBmcm9tICdzbHVnaWQnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udGV4dE1lbnUobWVudSwgb3B0cykge1xuICAgIGxldCBwcmV2aW91c2x5TW91c2VVcCA9IGZhbHNlO1xuICAgIGxldCBjbGlja0F3YXkgPSAoKSA9PiB7fTtcbiAgICBsZXQgdWlkID0gc2x1Z2lkLm5pY2UoKTtcbiAgICBsZXQgcm9vdEVsZW1lbnQgPSBudWxsO1xuICAgIGxldCBvcmllbnRhdGlvbiA9ICdyaWdodCc7ICAgLy8gZGlzcGxheSB0aGUgbWVudSB0byB0aGUgcmlnaHQgb2YgdGhlIG1vdXNlIGNsaWNrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvciBwYXJlbnQgZWxlbWVtZW50XG4gICAgbGV0IGluaXRpYWxQb3MgPSBudWxsO1xuICAgIGxldCBwYXJlbnRTdGFydCA9IG51bGw7XG5cbiAgICB2YXIgb3BlbkNhbGxiYWNrLFxuICAgICAgICBjbG9zZUNhbGxiYWNrO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG9wZW5DYWxsYmFjayA9IG9wdHM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgICAgIG9wZW5DYWxsYmFjayA9IG9wdHMub25PcGVuO1xuICAgICAgICBjbG9zZUNhbGxiYWNrID0gb3B0cy5vbkNsb3NlO1xuICAgIH1cblxuICAgIGlmICgncm9vdEVsZW1lbnQnIGluIG9wdHMpXG4gICAgICAgIHJvb3RFbGVtZW50ID0gb3B0c1sncm9vdEVsZW1lbnQnXVxuXG4gICAgaWYgKCdwb3MnIGluIG9wdHMpIHtcbiAgICAgICAgLy8gZG8gd2Ugd2FudCB0byBwbGFjZSB0aGlzIG1lbnUgc29tZXdoZXJlIHNwZWNpZmljP1xuICAgICAgICBpbml0aWFsUG9zID0gb3B0cy5wb3M7XG4gICAgfVxuXG4gICAgaWYgKCdvcmllbnRhdGlvbicgaW4gb3B0cykge1xuICAgICAgICBvcmllbnRhdGlvbiA9IG9wdHMub3JpZW50YXRpb247XG4gICAgfVxuXG4gICAgaWYgKCdwYXJlbnRTdGFydCcgaW4gb3B0cykge1xuICAgICAgICBwYXJlbnRTdGFydCA9IG9wdHMucGFyZW50U3RhcnQ7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIHRoZSBkaXYgZWxlbWVudCB0aGF0IHdpbGwgaG9sZCB0aGUgY29udGV4dCBtZW51XG4gICAgZDMuc2VsZWN0QWxsKCcuZDMtY29udGV4dC1tZW51LScgKyB1aWQpLmRhdGEoWzFdKVxuICAgICAgICAuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAuY2xhc3NlZCgnZDMtY29udGV4dC1tZW51JywgdHJ1ZSlcbiAgICAgICAgLmNsYXNzZWQoJ2QzLWNvbnRleHQtbWVudS0nICsgdWlkLCB0cnVlKVxuXG4gICAgLy8gY2xvc2UgbWVudVxuICAgIGQzLnNlbGVjdCgnYm9keScpLm9uKCdjbGljay5kMy1jb250ZXh0LW1lbnUtJyArIHVpZCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChwcmV2aW91c2x5TW91c2VVcCkge1xuICAgICAgICAgICAgcHJldmlvdXNseU1vdXNlVXAgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgIGNvbnNvbGUubG9nKCdib2R5IGNsaWNrIGNsb3NlJyk7XG5cbiAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51LScgKyB1aWQpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICBvcmllbnRhdGlvbiA9ICdyaWdodCc7XG5cbiAgICAgICAgaWYgKGNsb3NlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNsb3NlQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gdGhpcyBnZXRzIGV4ZWN1dGVkIHdoZW4gYSBjb250ZXh0bWVudSBldmVudCBvY2N1cnNcbiAgICByZXR1cm4gZnVuY3Rpb24oZGF0YSwgaW5kZXgsIHBNb3VzZVVwPWZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjbGlja0F3YXlGdW5jID0gZnVuY3Rpb24oKSB7IH0gKSB7XG4gICAgICAgIHZhciBlbG0gPSB0aGlzO1xuICAgICAgICB2YXIgY29udGV4dE1lbnVQb3MgPSBudWxsO1xuICAgICAgICBsZXQgbW91c2VQb3MgPSBudWxsO1xuICAgICAgICBsZXQgY3VycmVudFRoaXMgPSB0aGlzO1xuXG4gICAgICAgIGlmIChyb290RWxlbWVudCA9PSBudWxsKVxuICAgICAgICAgICAgbW91c2VQb3MgPSBkMy5tb3VzZSh0aGlzKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgbW91c2VQb3MgPSBkMy5tb3VzZShyb290RWxlbWVudCk7IC8vIGZvciByZWN1cnNpdmUgbWVudXMsIHdlIG5lZWQgdGhlIG1vdXNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9zaXRpb24gcmVsYXRpdmUgdG8gYW5vdGhlciBlbGVtZW50XG5cbiAgICAgICAgY2xpY2tBd2F5ID0gY2xpY2tBd2F5RnVuYztcbiAgICAgICAgbGV0IG9wZW5DaGlsZE1lbnVVaWQgPSBudWxsO1xuXG4gICAgICAgIHByZXZpb3VzbHlNb3VzZVVwID0gcE1vdXNlVXA7XG5cbiAgICAgICAgZDMuc2VsZWN0QWxsKCcuZDMtY29udGV4dC1tZW51LScgKyB1aWQpLmh0bWwoJycpO1xuICAgICAgICB2YXIgbGlzdCA9IGQzLnNlbGVjdEFsbCgnLmQzLWNvbnRleHQtbWVudS0nICsgdWlkKVxuICAgICAgICAgICAgLm9uKCdjb250ZXh0bWVudScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY29udGV4dC1tZW51IGNsb3NlJyk7XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51LScgKyB1aWQpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTsgXG4gICAgICAgICAgICAgICAgb3JpZW50YXRpb24gPSAncmlnaHQnO1xuXG4gICAgICAgICAgICAgICAgZDMuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBkMy5ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCd1bCcpO1xuXG4gICAgICAgIGxpc3Quc2VsZWN0QWxsKCdsaScpLmRhdGEodHlwZW9mIG1lbnUgPT09ICdmdW5jdGlvbicgPyBtZW51KGRhdGEpIDogbWVudSkuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkOicsIGQpO1xuICAgICAgICAgICAgICAgIHZhciByZXQgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAoZC5kaXZpZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldCArPSAnIGlzLWRpdmlkZXInO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXQgKz0gJyBpcy1kaXNhYmxlZCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZC5hY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0ICs9ICcgaXMtaGVhZGVyJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCdjaGlsZHJlbicgaW4gZCkge1xuICAgICAgICAgICAgICAgICAgICByZXQgKz0gJyBkMy1jb250ZXh0LW1lbnUtcmVjdXJzaXZlJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuaHRtbChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQuZGl2aWRlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxocj4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWQudGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm8gdGl0bGUgYXR0cmlidXRlIHNldC4gQ2hlY2sgdGhlIHNwZWxsaW5nIG9mIHlvdXIgb3B0aW9ucy4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgZC50aXRsZSA9PT0gJ3N0cmluZycpID8gZC50aXRsZSA6IGQudGl0bGUoZGF0YSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZC5kaXNhYmxlZCkgcmV0dXJuOyAvLyBkbyBub3RoaW5nIGlmIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgaWYgKCFkLmFjdGlvbikgcmV0dXJuOyAvLyBoZWFkZXJzIGhhdmUgbm8gXCJhY3Rpb25cIlxuICAgICAgICAgICAgICAgIGQuYWN0aW9uKGVsbSwgZGF0YSwgaW5kZXgsIG1vdXNlUG9zKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2xpY2sgY2xvc2UnKTtcblxuICAgICAgICAgICAgICAgIC8vIGNsb3NlIGFsbCBjb250ZXh0IG1lbnVzXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcuZDMtY29udGV4dC1tZW51Jykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uID0gJ3JpZ2h0JztcblxuICAgICAgICAgICAgICAgIGlmIChjbG9zZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZCgnZDMtY29udGV4dC1tZW51LXNlbGVjdGVkJywgdHJ1ZSlcblxuICAgICAgICAgICAgICAgIGlmIChvcGVuQ2hpbGRNZW51VWlkICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlcmUncyBhIGNoaWxkIG1lbnUgb3BlblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHVuc2VsZWN0IGFsbCBpdGVtc1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUtJyArIHVpZClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJ2xpJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdkMy1jb250ZXh0LW1lbnUtc2VsZWN0ZWQnLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkLmNoaWxkcmVuID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vIGNoaWxkcmVuIGNsb3NlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm8gY2hpbGRyZW4sIHNvIGhpZGUgYW55IG9wZW4gY2hpbGQgbWVudXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudS0nICsgb3BlbkNoaWxkTWVudVVpZClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5DaGlsZE1lbnVVaWQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuY2hpbGRVaWQgPT0gb3BlbkNoaWxkTWVudVVpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGNvcnJlY3QgY2hpbGQgbWVudSBpcyBhbHJlYWR5IG9wZW5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmVlZCB0byBvcGVuIGEgZGlmZmVyZW50IGNoaWxkIG1lbnVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvcGVuIGRpZmZlcmVudCBjaGlsZCBtZW51IGNsb3NlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIHRoZSBhbHJlYWR5IG9wZW4gb25lXG4gICAgICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUtJyArIG9wZW5DaGlsZE1lbnVVaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuQ2hpbGRNZW51VWlkID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIC8vIHRoZXJlIHNob3VsZCBiZSBubyBtZW51IG9wZW4gcmlnaHQgbm93XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkLmNoaWxkcmVuICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBib3VuZGluZ1JlY3QgPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZHJlbkNvbnRleHRNZW51ID0gbnVsbFxuICAgICAgICAgICAgICAgICAgICBpZiAob3JpZW50YXRpb24gPT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbkNvbnRleHRNZW51ID0gY29udGV4dE1lbnUoZC5jaGlsZHJlbiwgeydyb290RWxlbWVudCc6IGN1cnJlbnRUaGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Bvcyc6IFsgYm91bmRpbmdSZWN0LmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3VuZGluZ1JlY3QudG9wIC0gMiArIHdpbmRvdy5wYWdlWU9mZnNldF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnb3JpZW50YXRpb24nOiAnbGVmdCd9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuQ29udGV4dE1lbnUgPSBjb250ZXh0TWVudShkLmNoaWxkcmVuLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Bvcyc6IFsgYm91bmRpbmdSZWN0LmxlZnQgKyBib3VuZGluZ1JlY3Qud2lkdGggKyB3aW5kb3cucGFnZVhPZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3VuZGluZ1JlY3QudG9wIC0gMiArIHdpbmRvdy5wYWdlWU9mZnNldF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncm9vdEVsZW1lbnQnOiBjdXJyZW50VGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwYXJlbnRTdGFydCc6IFtib3VuZGluZ1JlY3QubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm91bmRpbmdSZWN0LnRvcCAtIDIgKyB3aW5kb3cucGFnZVlPZmZzZXRdfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBkLmNoaWxkVWlkID0gY2hpbGRyZW5Db250ZXh0TWVudS5hcHBseSh0aGlzLCBbZGF0YSxpLHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkgeyB9XSk7XG4gICAgICAgICAgICAgICAgICAgIG9wZW5DaGlsZE1lbnVVaWQgPSBkLmNoaWxkVWlkO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdkMy1jb250ZXh0LW1lbnUtc2VsZWN0ZWQnLCB0cnVlKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oZCwgaSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKG9wZW5DaGlsZE1lbnVVaWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdkMy1jb250ZXh0LW1lbnUtc2VsZWN0ZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGxpc3Quc2VsZWN0QWxsKCcuZDMtY29udGV4dC1tZW51LXJlY3Vyc2l2ZScpXG4gICAgICAgICAgICAuYXBwZW5kKCdpbWcnKVxuICAgICAgICAgICAgLmF0dHIoJ3NyYycsICdpbWFnZXMvcGxheS5zdmcnKVxuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgJzE0cHgnKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsICcxNHB4JylcbiAgICAgICAgICAgIC5zdHlsZSgncG9zaXRpb24nLCAnYWJzb2x1dGUnKVxuICAgICAgICAgICAgLnN0eWxlKCdyaWdodCcsICc1cHgnKVxuICAgICAgICAgICAgO1xuXG4gICAgICAgIC8vIHRoZSBvcGVuQ2FsbGJhY2sgYWxsb3dzIGFuIGFjdGlvbiB0byBmaXJlIGJlZm9yZSB0aGUgbWVudSBpcyBkaXNwbGF5ZWRcbiAgICAgICAgLy8gYW4gZXhhbXBsZSB1c2FnZSB3b3VsZCBiZSBjbG9zaW5nIGEgdG9vbHRpcFxuICAgICAgICBpZiAob3BlbkNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAob3BlbkNhbGxiYWNrKGRhdGEsIGluZGV4KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdWlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNvbnRleHRNZW51U2VsZWN0aW9uID0gZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51LScgKyB1aWQpXG4gICAgICAgICAgICAuc3R5bGUoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgICAgICBpZiAoaW5pdGlhbFBvcyA9PSBudWxsKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUtJyArIHVpZClcbiAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIChkMy5ldmVudC5wYWdlWCAtIDIpICsgJ3B4JylcbiAgICAgICAgICAgIC5zdHlsZSgndG9wJywgKGQzLmV2ZW50LnBhZ2VZIC0gMikgKyAncHgnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51LScgKyB1aWQpXG4gICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCBpbml0aWFsUG9zWzBdICsgJ3B4JylcbiAgICAgICAgICAgIC5zdHlsZSgndG9wJywgaW5pdGlhbFBvc1sxXSArICdweCcpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgbWVudSBkaXNhcHBlYXJzIG9mZiB0aGUgc2lkZSBvZiB0aGUgd2luZG93XG4gICAgICAgIGxldCBib3VuZGluZ1JlY3QgPSBjb250ZXh0TWVudVNlbGVjdGlvbi5ub2RlKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgaWYgKGJvdW5kaW5nUmVjdC5sZWZ0ICsgYm91bmRpbmdSZWN0LndpZHRoID4gd2luZG93LmlubmVyV2lkdGggfHwgb3JpZW50YXRpb24gPT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICBvcmllbnRhdGlvbiA9ICdsZWZ0JztcblxuICAgICAgICAgICAgLy8gbWVudSBnb2VzIG9mIHRoZSBlbmQgb2YgdGhlIHdpbmRvdywgcG9zaXRpb24gaXQgdGhlIG90aGVyIHdheVxuICAgICAgICAgICAgaWYgKGluaXRpYWxQb3MgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIHBsYWNlIHRoZSBtZW51IHdoZXJlIHRoZSB1c2VyIGNsaWNrZWRcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUtJyArIHVpZClcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCAoZDMuZXZlbnQucGFnZVggLSAyIC0gYm91bmRpbmdSZWN0LndpZHRoKSArICdweCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCAoZDMuZXZlbnQucGFnZVkgLSAyKSArICdweCcpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnRTdGFydCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudS0nICsgdWlkKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCAocGFyZW50U3RhcnRbMF0gLSBib3VuZGluZ1JlY3Qud2lkdGgpICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCBwYXJlbnRTdGFydFsxXSArICdweCcpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51LScgKyB1aWQpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIChpbml0aWFsUG9zWzBdIC0gYm91bmRpbmdSZWN0LndpZHRoKSArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgndG9wJywgaW5pdGlhbFBvc1sxXSArICdweCcpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICAvLyBkaXNwbGF5IGNvbnRleHQgbWVudVxuXG4gICAgICAgIGlmIChwcmV2aW91c2x5TW91c2VVcClcbiAgICAgICAgICAgIHJldHVybiB1aWQ7XG5cbiAgICAgICAgZDMuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZDMuZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIC8vZDMuZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIC8vXG4gICAgICAgIHJldHVybiB1aWQ7XG4gICAgfTtcbn07XG4iLCIvKiBWZXJzaW9uOiAwLjJcbiogRGF0ZTogMjAxNS0wMy0xNVxuKi9cblxuaW1wb3J0ICcuLi9zdHlsZXMvZm9ybmFjLmNzcyc7XG5pbXBvcnQgJy4uL3N0eWxlcy9kMy1jb250ZXh0LW1lbnUuY3NzJztcblxuaW1wb3J0IGQzIGZyb20gJ2QzJztcbmltcG9ydCBzbHVnaWQgZnJvbSAnc2x1Z2lkJztcbmltcG9ydCB7Y29udGV4dE1lbnV9IGZyb20gJy4vZDMtY29udGV4dC1tZW51LmpzJztcblxuaW1wb3J0IHtSTkFHcmFwaH0gZnJvbSAnLi9ybmFncmFwaC5qcyc7XG5pbXBvcnQge0NvbG9yU2NoZW1lLCBybmFVdGlsaXRpZXN9IGZyb20gJy4vcm5hdXRpbHMuanMnO1xuXG5pbXBvcnQge3NpbXBsZVh5Q29vcmRpbmF0ZXN9IGZyb20gJy4vc2ltcGxlcm5hcGxvdC5qcyc7XG5pbXBvcnQge05BVmlld30gZnJvbSAnLi9uYXZpZXcvbmF2aWV3LmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIEZvcm5hQ29udGFpbmVyKGVsZW1lbnQsIHBhc3NlZE9wdGlvbnMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBzZWxmLm9wdGlvbnMgPSB7XG4gICAgICAgICdlZGl0YWJsZSc6IGZhbHNlLFxuICAgICAgICAnZGlzcGxheUFsbExpbmtzJzogZmFsc2UsXG4gICAgICAgICdsYWJlbEludGVydmFsJzogMTAsXG4gICAgICAgICdhcHBseUZvcmNlJzogdHJ1ZSxcbiAgICAgICAgJ2NoYXJnZURpc3RhbmNlJzogMTEwLFxuICAgICAgICAnZnJpY3Rpb24nOiAwLjM1LFxuICAgICAgICAnbWlkZGxlQ2hhcmdlJzogLTMwLFxuICAgICAgICAnb3RoZXJDaGFyZ2UnOiAtMzAsXG4gICAgICAgICdsaW5rRGlzdGFuY2VNdWx0aXBsaWVyJzogMTUsXG4gICAgICAgICdpbml0aWFsU2l6ZSc6IG51bGwsXG4gICAgICAgICdsYXlvdXQnOiAnc3RhbmRhcmQtcG9seWdvbmFsJyxcbiAgICAgICAgJ2FsbG93UGFubmluZ0FuZFpvb21pbmcnOiB0cnVlLFxuICAgICAgICAndHJhbnNpdGlvbkR1cmF0aW9uJzogNTAwLFxuICAgICAgICAnbWF4Tm9kZVJhZGl1cyc6IDgwLCAgICAvLyB0aGUgbWF4aW11bSByYWRpdXMgb2YgYSBub2RlIHdoZW4gdGhlIHZpZXcgaXMgY2VudGVyZWRcbiAgICAgICAgJ3Jlc2l6ZVN2Z09uUmVzaXplJzogdHJ1ZSAgIC8vY2hhbmdlIHRoZSBzaXplIG9mIHRoZSBzdmcgd2hlbiByZXNpemluZyB0aGUgY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NvbWV0aW1lcyBpdHMgYmVuZWZpY2lhbCB0byB0dXJuIHRoaXMgb2ZmLCBlc3BlY2lhbGx5IHdoZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcGVyZm9ybWFuY2UgaXMgYW4gaXNzdWVcbiAgICB9O1xuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIG9wdGlvbiBpbiBwYXNzZWRPcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLmhhc093blByb3BlcnR5KG9wdGlvbikpXG4gICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zW29wdGlvbl0gPSBwYXNzZWRPcHRpb25zW29wdGlvbl07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2VsZi5vcHRpb25zLmluaXRpYWxTaXplICE9PSBudWxsKSB7XG4gICAgICAgIHNlbGYub3B0aW9ucy5zdmdXID0gc2VsZi5vcHRpb25zLmluaXRpYWxTaXplWzBdO1xuICAgICAgICBzZWxmLm9wdGlvbnMuc3ZnSCA9IHNlbGYub3B0aW9ucy5pbml0aWFsU2l6ZVsxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLm9wdGlvbnMuc3ZnVyA9IDgwMDtcbiAgICAgICAgc2VsZi5vcHRpb25zLnN2Z0ggPSA4MDA7XG4gICAgfVxuXG4gICAgaWYgKHNlbGYub3B0aW9ucy5lZGl0YWJsZSA9PSB0cnVlKSB7XG4gICAgICAgIGxldCBiYWNrZ3JvdW5kTWVudSA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0FkZCBOb2RlJyxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKGVsbSwgZCwgaSwgbW91c2VQb3MpIHtcblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFt7XG4gICAgICAgICAgICAgICAgICAgICd0aXRsZSc6ICdBJyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbihlbG0sIGQsIGksIG1vdXNlUG9zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbW91c2VQb3M6JywgbW91c2VQb3MsIHNlbGYub3B0aW9ucy5zdmdXLCBzZWxmLm9wdGlvbnMuc3ZnSCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FudmFzTW91c2VQb3MgPSBbeFNjYWxlLmludmVydChtb3VzZVBvc1swXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeVNjYWxlLmludmVydChtb3VzZVBvc1sxXSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbnZhc01vdXNlUG9zJywgY2FudmFzTW91c2VQb3MpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkZFJOQSgnLicsIHsnc2VxdWVuY2UnOiAnQScsICdjZW50ZXJQb3MnOiBjYW52YXNNb3VzZVBvc30pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGl0bGUnOiAnQycsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oZWxtLCBkLCBpLCBtb3VzZVBvcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21vdXNlUG9zOicsIG1vdXNlUG9zLCBzZWxmLm9wdGlvbnMuc3ZnVywgc2VsZi5vcHRpb25zLnN2Z0gpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhbnZhc01vdXNlUG9zID0gW3hTY2FsZS5pbnZlcnQobW91c2VQb3NbMF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlTY2FsZS5pbnZlcnQobW91c2VQb3NbMV0pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYW52YXNNb3VzZVBvcycsIGNhbnZhc01vdXNlUG9zKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGRSTkEoJy4nLCB7J3NlcXVlbmNlJzogJ0MnLCAnY2VudGVyUG9zJzogY2FudmFzTW91c2VQb3N9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGl0bGUnOiAnRycsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oZWxtLCBkLCBpLCBtb3VzZVBvcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21vdXNlUG9zOicsIG1vdXNlUG9zLCBzZWxmLm9wdGlvbnMuc3ZnVywgc2VsZi5vcHRpb25zLnN2Z0gpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhbnZhc01vdXNlUG9zID0gW3hTY2FsZS5pbnZlcnQobW91c2VQb3NbMF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlTY2FsZS5pbnZlcnQobW91c2VQb3NbMV0pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYW52YXNNb3VzZVBvcycsIGNhbnZhc01vdXNlUG9zKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGRSTkEoJy4nLCB7J3NlcXVlbmNlJzogJ0cnLCAnY2VudGVyUG9zJzogY2FudmFzTW91c2VQb3N9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGl0bGUnOiAnVScsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oZWxtLCBkLCBpLCBtb3VzZVBvcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21vdXNlUG9zOicsIG1vdXNlUG9zLCBzZWxmLm9wdGlvbnMuc3ZnVywgc2VsZi5vcHRpb25zLnN2Z0gpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhbnZhc01vdXNlUG9zID0gW3hTY2FsZS5pbnZlcnQobW91c2VQb3NbMF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlTY2FsZS5pbnZlcnQobW91c2VQb3NbMV0pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYW52YXNNb3VzZVBvcycsIGNhbnZhc01vdXNlUG9zKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGRSTkEoJy4nLCB7J3NlcXVlbmNlJzogJ1UnLCAnY2VudGVyUG9zJzogY2FudmFzTW91c2VQb3N9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlIC8vIG9wdGlvbmFsLCBkZWZhdWx0cyB0byBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG5cbiAgICAgICAgbGV0IG5vZGVNZW51ID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnRGVsZXRlIE5vZGUnLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGVsZXRlTm9kZShkKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSAvLyBvcHRpb25hbCwgZGVmYXVsdHMgdG8gZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdDaGFuZ2UgTm9kZScsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbihlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1lvdSBoYXZlIGNsaWNrZWQgdGhlIHNlY29uZCBpdGVtIScpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVGhlIGRhdGEgZm9yIHRoaXMgY2lyY2xlIGlzOiAnICsgZCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0EnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbihlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZU5vZGUoJ0EnLCBkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdDJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VOb2RlKCdDJywgZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdHJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VOb2RlKCdHJywgZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdVJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VOb2RlKCdVJywgZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdJbnNlcnQgQmVmb3JlJyxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKGVsbSwgZCwgaSkge1xuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0EnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbihlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmluc2VydE5vZGVCZWZvcmVPckFmdGVyKCdBJywgZCwgLTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbihlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmluc2VydE5vZGVCZWZvcmVPckFmdGVyKCdDJywgZCwgLTEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnRycsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW5zZXJ0Tm9kZUJlZm9yZU9yQWZ0ZXIoJ0cnLCBkLCAtMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdVJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbnNlcnROb2RlQmVmb3JlT3JBZnRlcignVScsIGQsIC0xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnSW5zZXJ0IEFmdGVyJyxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZDonLCBkKTtcblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdBJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbnNlcnROb2RlQmVmb3JlT3JBZnRlcignQScsIGQsIDApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQycsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW5zZXJ0Tm9kZUJlZm9yZU9yQWZ0ZXIoJ0MnLCBkLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdHJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbnNlcnROb2RlQmVmb3JlT3JBZnRlcignRycsIGQsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ1UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbihlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmluc2VydE5vZGVCZWZvcmVPckFmdGVyKCdVJywgZCwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG5cbiAgICAgICAgc2VsZi5ub2RlQ29udGV4dE1lbnUgPSBjb250ZXh0TWVudShub2RlTWVudSk7XG4gICAgICAgIHNlbGYuYmFja2dyb3VuZENvbnRleHRNZW51ID0gY29udGV4dE1lbnUoYmFja2dyb3VuZE1lbnUpO1xuXG4gICAgfSAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlbXB0eSBjb250ZXh0IG1lbnUnKTtcbiAgICAgICAgc2VsZi5ub2RlQ29udGV4dE1lbnUgPSBmdW5jdGlvbigpIHt9O1xuICAgIH1cblxuICAgIHZhciBmaWxsID0gZDMuc2NhbGUuY2F0ZWdvcnkyMCgpO1xuXG4gICAgLy8gbW91c2UgZXZlbnQgdmFyc1xuICAgIHZhciBtb3VzZWRvd25MaW5rID0gbnVsbCxcbiAgICAgICAgbW91c2Vkb3duTm9kZSA9IG51bGwsXG4gICAgICAgIG1vdXNldXBOb2RlID0gbnVsbDtcbiAgICBsZXQgbGlua0NvbnRleHRNZW51U2hvd24gPSBmYWxzZTtcblxuICAgIHZhciB4U2NhbGUgPSBkMy5zY2FsZS5saW5lYXIoKVxuICAgIC5kb21haW4oWzAsc2VsZi5vcHRpb25zLnN2Z1ddKS5yYW5nZShbMCxzZWxmLm9wdGlvbnMuc3ZnV10pO1xuICAgIHZhciB5U2NhbGUgPSBkMy5zY2FsZS5saW5lYXIoKVxuICAgIC5kb21haW4oWzAsc2VsZi5vcHRpb25zLnN2Z0hdKS5yYW5nZShbMCwgc2VsZi5vcHRpb25zLnN2Z0hdKTtcblxuICAgIHZhciBncmFwaCA9IHNlbGYuZ3JhcGggPSB7XG4gICAgICAgICdub2Rlcyc6W10sXG4gICAgICAgICdsaW5rcyc6W11cbiAgICB9O1xuICAgIFxuICAgIHNlbGYubGlua1N0cmVuZ3RocyA9IHtcbiAgICAgICAgJ3BzZXVkb2tub3QnOiAwLjAwLFxuICAgICAgICAncHJvdGVpbkNoYWluJzogMC4wMCxcbiAgICAgICAgJ2NoYWluQ2hhaW4nOiAwLjAwLFxuICAgICAgICAnaW50ZXJtb2xlY3VsZSc6IDEwLjAwLFxuICAgICAgICAnZXh0ZXJuYWwnOiAwLjAwLFxuICAgICAgICAnb3RoZXInOiAxMC4wMFxuICAgIH07XG4gICAgXG4gICAgc2VsZi5kaXNwbGF5UGFyYW1ldGVycyA9IHtcbiAgICAgICAgJ2Rpc3BsYXlCYWNrZ3JvdW5kJzogJ3RydWUnLFxuICAgICAgICAnZGlzcGxheU51bWJlcmluZyc6ICd0cnVlJyxcbiAgICAgICAgJ2Rpc3BsYXlOb2RlT3V0bGluZSc6ICd0cnVlJyxcbiAgICAgICAgJ2Rpc3BsYXlOb2RlTGFiZWwnOiAndHJ1ZScsXG4gICAgICAgICdkaXNwbGF5TGlua3MnOiAndHJ1ZScsXG4gICAgICAgICdkaXNwbGF5UHNldWRva25vdExpbmtzJzogJ3RydWUnLFxuICAgICAgICAnZGlzcGxheVByb3RlaW5MaW5rcyc6ICd0cnVlJ1xuICAgIH07XG5cbiAgICBzZWxmLmNvbG9yU2NoZW1lID0gJ3N0cnVjdHVyZSc7XG4gICAgc2VsZi5jdXN0b21Db2xvcnMgPSB7fTtcbiAgICBzZWxmLmFuaW1hdGlvbiA9IHNlbGYub3B0aW9ucy5hcHBseUZvcmNlO1xuICAgIC8vIGRvbid0IGxpc3RlbiB0byBldmVudHMgYmVjYXVzZSBhIG1vZGVsIHdpbmRvdyBpcyBvcGVuIHNvbWV3aGVyZVxuICAgIHNlbGYuZGVhZiA9IGZhbHNlO1xuICAgIHNlbGYucm5hcyA9IHt9O1xuICAgIHNlbGYuZXh0cmFMaW5rcyA9IFtdOyAvL3N0b3JlIGxpbmtzIGJldHdlZW4gZGlmZmVyZW50IFJOQXNcblxuICAgIEFycmF5LnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICAgICAgLy8gaWYgdGhlIG90aGVyIGFycmF5IGlzIGEgZmFsc3kgdmFsdWUsIHJldHVyblxuICAgICAgICBpZiAoIWFycmF5KVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIC8vIGNvbXBhcmUgbGVuZ3RocyAtIGNhbiBzYXZlIGEgbG90IG9mIHRpbWUgXG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCAhPSBhcnJheS5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGw9dGhpcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHdlIGhhdmUgbmVzdGVkIGFycmF5c1xuICAgICAgICAgICAgaWYgKHRoaXNbaV0gaW5zdGFuY2VvZiBBcnJheSAmJiBhcnJheVtpXSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgLy8gcmVjdXJzZSBpbnRvIHRoZSBuZXN0ZWQgYXJyYXlzXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzW2ldLmVxdWFscyhhcnJheVtpXSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgICAgICAgXG4gICAgICAgICAgICB9ICAgICAgICAgICBcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXNbaV0gIT0gYXJyYXlbaV0pIHsgXG4gICAgICAgICAgICAgICAgLy8gV2FybmluZyAtIHR3byBkaWZmZXJlbnQgb2JqZWN0IGluc3RhbmNlcyB3aWxsIG5ldmVyIGJlIGVxdWFsOiB7eDoyMH0gIT0ge3g6MjB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAgIFxuICAgICAgICAgICAgfSAgICAgICAgICAgXG4gICAgICAgIH0gICAgICAgXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cblxuICAgIHNlbGYuY3JlYXRlSW5pdGlhbExheW91dCA9IGZ1bmN0aW9uKHN0cnVjdHVyZSwgcGFzc2VkT3B0aW9ucykge1xuICAgICAgICAvLyB0aGUgZGVmYXVsdCBvcHRpb25zXG4gICAgICAgIHZhciBvcHRpb25zID0geyBcbiAgICAgICAgICAgICAgICAgICAgICAgICdzZXF1ZW5jZSc6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ25hbWUnOiAnZW1wdHknLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3Bvc2l0aW9ucyc6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2xhYmVsSW50ZXJ2YWwnOiBzZWxmLm9wdGlvbnMubGFiZWxJbnRlcnZhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICdhdm9pZE90aGVycyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWlkcyc6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NpcmN1bGFyaXplRXh0ZXJuYWwnOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBvcHRpb24gaW4gcGFzc2VkT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KG9wdGlvbikpXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNbb3B0aW9uXSA9IHBhc3NlZE9wdGlvbnNbb3B0aW9uXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKCdvcHRpb25zLnVpZHM6Jywgb3B0aW9ucy51aWRzKTtcbiAgICAgICAgdmFyIHJnID0gbmV3IFJOQUdyYXBoKG9wdGlvbnMuc2VxdWVuY2UsIHN0cnVjdHVyZSwgb3B0aW9ucy5uYW1lKTtcbiAgICAgICAgcmcuY2lyY3VsYXJpemVFeHRlcm5hbCA9IG9wdGlvbnMuY2lyY3VsYXJpemVFeHRlcm5hbDtcblxuICAgICAgICB2YXIgcm5hSnNvbiA9IHJnLnJlY2FsY3VsYXRlRWxlbWVudHMoKTtcblxuICAgICAgICBpZiAob3B0aW9ucy5wb3NpdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBubyBwcm92aWRlZCBwb3NpdGlvbnMgbWVhbnMgd2UgbmVlZCB0byBjYWxjdWxhdGUgYW4gaW5pdGlhbCBsYXlvdXRcblxuICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5sYXlvdXQgPT0gJ25hdmlldycpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmF2aWV3ID0gbmV3IE5BVmlldygpO1xuXG4gICAgICAgICAgICAgICAgbGV0IG5hVmlld1Bvc2l0aW9ucyA9IG5hdmlldy5uYXZpZXdfeHlfY29vcmRpbmF0ZXMocmcucGFpcnRhYmxlKTtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnBvc2l0aW9ucyA9IFtdXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYVZpZXdQb3NpdGlvbnMubmJhc2U7IGkrKylcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wb3NpdGlvbnMucHVzaChbbmFWaWV3UG9zaXRpb25zLnhbaV0sIG5hVmlld1Bvc2l0aW9ucy55W2ldXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucG9zaXRpb25zID0gc2ltcGxlWHlDb29yZGluYXRlcyhybmFKc29uLnBhaXJ0YWJsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBybmFKc29uID0gcm5hSnNvbi5lbGVtZW50c1RvSnNvbigpXG4gICAgICAgIC5hZGRVaWRzKG9wdGlvbnMudWlkcylcbiAgICAgICAgLmFkZFBvc2l0aW9ucygnbnVjbGVvdGlkZScsIG9wdGlvbnMucG9zaXRpb25zKVxuICAgICAgICAuYWRkTGFiZWxzKDEsIG9wdGlvbnMubGFiZWxJbnRlcnZhbClcbiAgICAgICAgLnJlaW5mb3JjZVN0ZW1zKClcbiAgICAgICAgLnJlaW5mb3JjZUxvb3BzKClcbiAgICAgICAgLmNvbm5lY3RGYWtlTm9kZXMoKVxuICAgICAgICAucmVhc3NpZ25MaW5rVWlkcygpXG4gICAgICAgIC5icmVha05vZGVzVG9GYWtlTm9kZXMoKTtcblxuICAgICAgICByZXR1cm4gcm5hSnNvbjtcbiAgICB9O1xuXG4gICAgc2VsZi5hZGRSTkEgPSBmdW5jdGlvbihzdHJ1Y3R1cmUsIHBhc3NlZE9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHJuYUpzb24gPSBzZWxmLmNyZWF0ZUluaXRpYWxMYXlvdXQoc3RydWN0dXJlLCBwYXNzZWRPcHRpb25zKTtcbiAgICAgICAgbGV0IGNlbnRlclZpZXcgPSBmYWxzZTtcblxuICAgICAgICAvKlxuICAgICAgICAgKiBDb2RlIHRvIGRpc3BsYXkgdGhlIEpTT05zIHJlcHJlc2VudGluZyB0aGUgc3RydWN0dXJlXG4gICAgICAgICAqXG4gICAgICAgIHJuYUpzb24ubm9kZXNbMF0ucm5hID0gbnVsbDtcbiAgICAgICAgcm5hSnNvbi5ub2Rlc1swXS5uZXh0Tm9kZSA9IG51bGw7XG5cbiAgICAgICAgcm5hSnNvbi5saW5rc1swXS5zb3VyY2UgPSBudWxsO1xuICAgICAgICBybmFKc29uLmxpbmtzWzBdLnRhcmdldCA9IG51bGw7XG5cbiAgICAgICAgY29uc29sZS5sb2cocm5hSnNvbi5ub2Rlc1swXSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJuYUpzb24ubGlua3NbMF0pO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShybmFKc29uLm5vZGVzWzBdLG51bGwsMikpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShybmFKc29uLmxpbmtzWzBdLG51bGwsMikpO1xuICAgICAgICAqL1xuXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKVxuICAgICAgICAgICAgcGFzc2VkT3B0aW9ucyA9IHt9O1xuXG4gICAgICAgIGlmICgnZXh0cmFMaW5rcycgaW4gcGFzc2VkT3B0aW9ucykge1xuICAgICAgICAgICAgLy8gcHJlc3VtYWJseSB0aGUgcGFzc2VkIGluIGxpbmtzIGFyZSB3aXRoaW4gdGhlIHBhc3NlZCBtb2xlY3VsZVxuICAgICAgICAgICAgdmFyIG5ld0xpbmtzID0gc2VsZi5hZGRFeHRlcm5hbExpbmtzKHJuYUpzb24sIHBhc3NlZE9wdGlvbnMuZXh0cmFMaW5rcyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNlbGYuZXh0cmFMaW5rcyA9IHNlbGYuZXh0cmFMaW5rcy5jb25jYXQobmV3TGlua3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCdjZW50ZXJQb3MnIGluIHBhc3NlZE9wdGlvbnMpXG4gICAgICAgICAgICBzZWxmLmFkZFJOQUpTT04ocm5hSnNvbiwge2NlbnRlclBvczogcGFzc2VkT3B0aW9ucy5jZW50ZXJQb3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlclZpZXc6IGZhbHNlfSlcbiAgICAgICAgZWxzZSBpZiAoJ2F2b2lkT3RoZXJzJyBpbiBwYXNzZWRPcHRpb25zKVxuICAgICAgICAgICAgc2VsZi5hZGRSTkFKU09OKHJuYUpzb24sIHthdm9pZE90aGVyczogcGFzc2VkT3B0aW9ucy5hdm9pZE90aGVyc30pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBzZWxmLmFkZFJOQUpTT04ocm5hSnNvbiwge2NlbnRlclZpZXc6IHBhc3NlZE9wdGlvbnMuY2VudGVyVmlld30pO1xuXG4gICAgICAgIHJldHVybiBybmFKc29uO1xuICAgIH07XG5cbiAgICBzZWxmLmNoYW5nZU5vZGUgPSBmdW5jdGlvbihub2RlTmFtZSwgcmVmZXJlbmNlTm9kZSkge1xuICAgICAgICAvL2luc2VydCBhIG5ldyBub2RlIGJlZm9yZSBvciBhZnRlciBhbm90aGVyIG9uZVxuICAgICAgICAvL3Bvc2l0aW9uT2Zmc2V0IHNwZWNpZmllcyB3aG8gZmFyIGZyb20gdGhlIG9yaWdpbmFsIHRvIGluc2VydCB0aGUgbmV3IG5vZGVcbiAgICAgICAgbGV0IHJuYSA9IHJlZmVyZW5jZU5vZGUucm5hO1xuXG4gICAgICAgIGxldCBkb3RicmFja2V0ID0gcm5hVXRpbGl0aWVzLnBhaXJ0YWJsZVRvRG90YnJhY2tldChybmEucGFpcnRhYmxlKTtcbiAgICAgICAgbGV0IHBvc2l0aW9ucyA9IHJuYS5nZXRQb3NpdGlvbnMoJ251Y2xlb3RpZGUnKTtcbiAgICAgICAgbGV0IHNlcXVlbmNlID0gcm5hLnNlcVxuICAgICAgICBsZXQgdWlkcyA9IHJuYS5nZXRVaWRzKCk7XG5cbiAgICAgICAgbGV0IG5ld05vZGVOdW0gPSByZWZlcmVuY2VOb2RlLm51bTtcblxuICAgICAgICBsZXQgbmV3RG90YnJhY2tldCA9IGRvdGJyYWNrZXQ7XG4gICAgICAgIGxldCBuZXdTZXF1ZW5jZSA9IHNlcXVlbmNlLnNsaWNlKDAsbmV3Tm9kZU51bS0xKSArICBub2RlTmFtZSArIHNlcXVlbmNlLnNsaWNlKG5ld05vZGVOdW0pO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCduZXdTZXF1ZW5jZTonLCBuZXdTZXF1ZW5jZSk7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ3VpZHM6JywgdWlkcyk7XG4gICAgICAgIHVpZHMuc3BsaWNlKG5ld05vZGVOdW0tMSwgMSwgc2x1Z2lkLm5pY2UoKSk7XG4gICAgICAgIGxldCBuZXdQb3NpdGlvbnMgPSBwb3NpdGlvbnM7XG5cblxuICAgICAgICBkZWxldGUgc2VsZi5ybmFzW3JuYS51aWRdO1xuICAgICAgICBsZXQgbmV3Uk5BID0gc2VsZi5hZGRSTkEobmV3RG90YnJhY2tldCwgeydzZXF1ZW5jZSc6IG5ld1NlcXVlbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Bvc2l0aW9ucyc6IG5ld1Bvc2l0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aWRzJzogdWlkcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjZW50ZXJWaWV3JzogZmFsc2V9KTtcblxuICAgIH1cblxuICAgIHNlbGYuaW5zZXJ0Tm9kZUJlZm9yZU9yQWZ0ZXIgPSBmdW5jdGlvbihub2RlTmFtZSwgcmVmZXJlbmNlTm9kZSwgcG9zaXRpb25PZmZzZXQpIHtcbiAgICAgICAgLy9pbnNlcnQgYSBuZXcgbm9kZSBiZWZvcmUgb3IgYWZ0ZXIgYW5vdGhlciBvbmVcbiAgICAgICAgLy9wb3NpdGlvbk9mZnNldCBzcGVjaWZpZXMgd2hvIGZhciBmcm9tIHRoZSBvcmlnaW5hbCB0byBpbnNlcnQgdGhlIG5ldyBub2RlXG4gICAgICAgIGxldCBybmEgPSByZWZlcmVuY2VOb2RlLnJuYTtcblxuICAgICAgICBsZXQgZG90YnJhY2tldCA9IHJuYVV0aWxpdGllcy5wYWlydGFibGVUb0RvdGJyYWNrZXQocm5hLnBhaXJ0YWJsZSk7XG4gICAgICAgIGxldCBwb3NpdGlvbnMgPSBybmEuZ2V0UG9zaXRpb25zKCdudWNsZW90aWRlJyk7XG4gICAgICAgIGxldCBzZXF1ZW5jZSA9IHJuYS5zZXFcbiAgICAgICAgbGV0IHVpZHMgPSBybmEuZ2V0VWlkcygpO1xuXG4gICAgICAgIGxldCBuZXdOb2RlTnVtID0gcmVmZXJlbmNlTm9kZS5udW0gKyBwb3NpdGlvbk9mZnNldDtcblxuICAgICAgICBsZXQgbmV3RG90YnJhY2tldCA9IGRvdGJyYWNrZXQuc2xpY2UoMCxuZXdOb2RlTnVtKSArICcuJyArIGRvdGJyYWNrZXQuc2xpY2UobmV3Tm9kZU51bSk7XG4gICAgICAgIGxldCBuZXdTZXF1ZW5jZSA9IHNlcXVlbmNlLnNsaWNlKDAsbmV3Tm9kZU51bSkgKyAgbm9kZU5hbWUgKyBzZXF1ZW5jZS5zbGljZShuZXdOb2RlTnVtKTtcblxuICAgICAgICBjb25zb2xlLmxvZygnbmV3U2VxdWVuY2U6JywgbmV3U2VxdWVuY2UpO1xuXG4gICAgICAgIHVpZHMuc3BsaWNlKG5ld05vZGVOdW0sIDAsIHNsdWdpZC5uaWNlKCkpO1xuICAgICAgICBwb3NpdGlvbnMuc3BsaWNlKG5ld05vZGVOdW0sIDAsIHBvc2l0aW9uc1tuZXdOb2RlTnVtIC0gcG9zaXRpb25PZmZzZXQtMV0pO1xuXG4gICAgICAgIGxldCBuZXdVaWRzID0gdWlkcztcbiAgICAgICAgbGV0IG5ld1Bvc2l0aW9ucyA9IHBvc2l0aW9ucztcblxuICAgICAgICBjb25zb2xlLmxvZygncG9zaXRpb25zOicsIHBvc2l0aW9ucyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCduZXcgbm9kZSBwb3NpdGlvbnM6JywgbmV3UG9zaXRpb25zKTtcblxuICAgICAgICBkZWxldGUgc2VsZi5ybmFzW3JuYS51aWRdO1xuICAgICAgICBsZXQgbmV3Uk5BID0gc2VsZi5hZGRSTkEobmV3RG90YnJhY2tldCwgeydzZXF1ZW5jZSc6IG5ld1NlcXVlbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Bvc2l0aW9ucyc6IG5ld1Bvc2l0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aWRzJzogbmV3VWlkcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjZW50ZXJWaWV3JzogZmFsc2V9KTtcblxuICAgIH1cblxuICAgIHNlbGYuZGVsZXRlTm9kZSA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2RlbGV0aW5nLi4uJywgbm9kZSk7XG4gICAgICAgIC8vIGdldCB0aGUgZG90YnJhY2tldCBzdHJpbmcgZm9yIHRoaXMgcm5hXG4gICAgICAgIGxldCBybmEgPSBub2RlLnJuYTtcbiAgICAgICAgbGV0IHBhaXIgPSBybmEucGFpcnRhYmxlW25vZGUubnVtXTtcblxuICAgICAgICAvLyByZW1vdmUgYmFzZXBhaXJzIGZvciB0aGlzIG5vZGVcbiAgICAgICAgaWYgKHBhaXIgIT0gMCkge1xuICAgICAgICAgICAgcm5hLnBhaXJ0YWJsZVtub2RlLm51bV0gPSAwO1xuICAgICAgICAgICAgcm5hLnBhaXJ0YWJsZVtwYWlyXSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZG90YnJhY2tldCA9IHJuYVV0aWxpdGllcy5wYWlydGFibGVUb0RvdGJyYWNrZXQocm5hLnBhaXJ0YWJsZSk7XG4gICAgICAgIGxldCBwb3NpdGlvbnMgPSBybmEuZ2V0UG9zaXRpb25zKCdudWNsZW90aWRlJyk7XG4gICAgICAgIGxldCBzZXF1ZW5jZSA9IHJuYS5zZXFcbiAgICAgICAgbGV0IHVpZHMgPSBybmEuZ2V0VWlkcygpO1xuXG4gICAgICAgIGxldCBuZXdEb3RicmFja2V0ID0gZG90YnJhY2tldC5zbGljZSgwLCBub2RlLm51bS0xKSArIGRvdGJyYWNrZXQuc2xpY2Uobm9kZS5udW0pXG4gICAgICAgIGxldCBuZXdQb3NpdGlvbnMgPSBwb3NpdGlvbnMuc2xpY2UoMCwgbm9kZS5udW0tMSlcbiAgICAgICAgICAgICAgICAuY29uY2F0KHBvc2l0aW9ucy5zbGljZShub2RlLm51bSkpO1xuICAgICAgICBsZXQgbmV3U2VxdWVuY2UgPSBzZXF1ZW5jZS5zbGljZSgwLCBub2RlLm51bS0xKSArIHNlcXVlbmNlLnNsaWNlKG5vZGUubnVtKVxuICAgICAgICBsZXQgbmV3VWlkcyA9IHVpZHMuc2xpY2UoMCwgbm9kZS5udW0tMSlcbiAgICAgICAgICAgICAgICAuY29uY2F0KHVpZHMuc2xpY2Uobm9kZS5udW0pKTtcblxuICAgICAgICBkZWxldGUgc2VsZi5ybmFzW3JuYS51aWRdO1xuICAgICAgICBsZXQgbmV3Uk5BID0gc2VsZi5hZGRSTkEobmV3RG90YnJhY2tldCwgeydzZXF1ZW5jZSc6IG5ld1NlcXVlbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Bvc2l0aW9ucyc6IG5ld1Bvc2l0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aWRzJzogbmV3VWlkcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2VudGVyVmlldyc6IGZhbHNlfSk7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ25ldyBkb3RicmFja2V0OicsIG5ld0RvdGJyYWNrZXQpO1xuICAgICAgICAvL3NlbGYucmVjYWxjdWxhdGVHcmFwaCgpO1xuICAgICAgICBcbiAgICAgICAgLy9yZW1vdmUgYmFja2JvbmUgbGlua3MgYXNzb2NpYXRlZCB3aXRoIHRoaXMgbm9kZVxuICAgICAgICBcbiAgICAgICAgLy9yZW1vdmUgdGhpcyBub2RlXG4gICAgICAgIFxuICAgIH1cblxuICAgIHNlbGYuYWRkRXh0ZXJuYWxMaW5rcyA9IGZ1bmN0aW9uKHJuYUpzb24sIGV4dGVybmFsTGlua3MpIHtcbiAgICAgICAgdmFyIG5ld0xpbmtzID0gW107XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHRlcm5hbExpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbmV3TGluayA9IHtsaW5rVHlwZTogJ2V4dGVybmFsJywgdmFsdWU6IDEsIHVpZDogZ2VuZXJhdGVVVUlEKCksXG4gICAgICAgICAgICAgICAgc291cmNlOiBudWxsLCB0YXJnZXQ6IG51bGx9O1xuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHNvdXJjZSBub2RlIGlzIGFuIGFycmF5XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGV4dGVybmFsTGlua3NbaV1bMF0pID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBybmFKc29uLm5vZGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgnbnVjcycgaW4gcm5hSnNvbi5ub2Rlc1tqXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJuYUpzb24ubm9kZXNbal0ubnVjcy5lcXVhbHMoZXh0ZXJuYWxMaW5rc1tpXVswXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdMaW5rLnNvdXJjZSA9IHJuYUpzb24ubm9kZXNbal07IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJuYUpzb24ubm9kZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJuYUpzb24ubm9kZXNbal0ubnVtID09IGV4dGVybmFsTGlua3NbaV1bMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0xpbmsuc291cmNlID0gcm5hSnNvbi5ub2Rlc1tqXTsgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSB0YXJnZXQgbm9kZSBpcyBhbiBhcnJheVxuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChleHRlcm5hbExpbmtzW2ldWzFdKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcm5hSnNvbi5ub2Rlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJ251Y3MnIGluIHJuYUpzb24ubm9kZXNbal0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChybmFKc29uLm5vZGVzW2pdLm51Y3MuZXF1YWxzKGV4dGVybmFsTGlua3NbaV1bMV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3TGluay50YXJnZXQgPSBybmFKc29uLm5vZGVzW2pdOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBybmFKc29uLm5vZGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChybmFKc29uLm5vZGVzW2pdLm51bSA9PSBleHRlcm5hbExpbmtzW2ldWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdMaW5rLnRhcmdldCA9IHJuYUpzb24ubm9kZXNbal07IFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAobmV3TGluay5zb3VyY2UgPT0gbnVsbCB8fCBuZXdMaW5rLnRhcmdldCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0VSUk9SOiBzb3VyY2Ugb3IgdGFyZ2V0IG9mIG5ldyBsaW5rIG5vdCBmb3VuZDonLCBuZXdMaW5rLCBleHRlcm5hbExpbmtzW2ldKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV3TGlua3MucHVzaChuZXdMaW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXdMaW5rcztcbiAgICB9O1xuXG4gICAgc2VsZi5hZGRSTkFKU09OID0gZnVuY3Rpb24ocm5hR3JhcGgsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXZvaWRPdGhlcnMgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyUG9zID0gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyVmlldyA9IHRydWV9ICkge1xuICAgICAgICAvLyBBZGQgYW4gUk5BR3JhcGgsIHdoaWNoIGNvbnRhaW5zIG5vZGVzIGFuZCBsaW5rcyBhcyBwYXJ0IG9mIHRoZVxuICAgICAgICAvLyBzdHJ1Y3R1cmVcbiAgICAgICAgLy8gRWFjaCBSTkEgd2lsbCBoYXZlIHVpZCB0byBpZGVudGlmeSBpdFxuICAgICAgICAvLyB3aGVuIGl0IGlzIG1vZGlmaWVkLCBpdCBpcyByZXBsYWNlZCBpbiB0aGUgZ2xvYmFsIGxpc3Qgb2YgUk5Bc1xuICAgICAgICAvL1xuICAgICAgICB2YXIgbWF4WCwgbWluWDtcbiAgICAgICAgY29uc29sZS5sb2coJ2NlbnRlclZpZXc6JywgY2VudGVyVmlldyk7XG5cbiAgICAgICAgaWYgKGNlbnRlclBvcyAhPSBudWxsKSB7XG4gICAgICAgICAgICAvLyBjZW50ZXIgdGhlIG5ld2x5IGNyZWF0ZWQgUk5BIGF0IGEgZ2l2ZW4gcG9zaXRpb25cbiAgICAgICAgICAgIGxldCB0b3RhbFggPSAwO1xuICAgICAgICAgICAgbGV0IHRvdGFsWSA9IDA7XG4gICAgICAgICAgICBsZXQgbm9kZUNvdW50ID0gMDtcblxuICAgICAgICAgICAgcm5hR3JhcGgubm9kZXMuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICAgICAgdG90YWxYICs9IG5vZGUueDtcbiAgICAgICAgICAgICAgICB0b3RhbFkgKz0gbm9kZS55O1xuICAgICAgICAgICAgICAgIG5vZGVDb3VudCArPSAxO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChub2RlQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gY2VudGVyIHRoZSBub2RlcyBhdCBjZW50ZXJQb3NcblxuICAgICAgICAgICAgICAgIHJuYUdyYXBoLm5vZGVzLmZvckVhY2goZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnggPSBub2RlLnggKyBjZW50ZXJQb3NbMF0gLSB0b3RhbFggLyBub2RlQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUueSA9IG5vZGUueSArIGNlbnRlclBvc1sxXSAtIHRvdGFsWSAvIG5vZGVDb3VudDtcblxuICAgICAgICAgICAgICAgICAgICBub2RlLnB4ID0gbm9kZS54O1xuICAgICAgICAgICAgICAgICAgICBub2RlLnB5ID0gbm9kZS55O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGF2b2lkT3RoZXJzKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5ncmFwaC5ub2Rlcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgIG1heFggPSBkMy5tYXgoc2VsZi5ncmFwaC5ub2Rlcy5tYXAoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC54OyB9KSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgbWF4WCA9IDA7XG5cbiAgICAgICAgICAgIG1pblggPSBkMy5taW4ocm5hR3JhcGgubm9kZXMubWFwKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQueDsgfSkpOyBcblxuICAgICAgICAgICAgcm5hR3JhcGgubm9kZXMuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICAgICAgbm9kZS54ICs9IChtYXhYIC0gbWluWCkgKyAyMDtcbiAgICAgICAgICAgICAgICBub2RlLnB4ICs9IChtYXhYIC0gbWluWCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJuYUdyYXBoLm5vZGVzLmZvckVhY2goZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgICAgbm9kZS5ybmEgPSBybmFHcmFwaDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZi5ybmFzW3JuYUdyYXBoLnVpZF0gPSBybmFHcmFwaDtcbiAgICAgICAgc2VsZi5yZWNhbGN1bGF0ZUdyYXBoKCk7XG5cbiAgICAgICAgc2VsZi51cGRhdGUoKTtcblxuICAgICAgICBpZiAoY2VudGVyVmlldylcbiAgICAgICAgICAgIHNlbGYuY2VudGVyVmlldygpO1xuXG4gICAgICAgIHJldHVybiBybmFHcmFwaDtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbWFnbml0dWRlKHgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh4WzBdICogeFswXSArIHhbMV0gKiB4WzFdKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3NpdGlvbkFueU5vZGUoZCkge1xuICAgICAgICB2YXIgZW5kUG9pbnQgPSBkO1xuICAgICAgICB2YXIgc3RhcnRQb2ludCA9IGQucHJldk5vZGU7XG4gICAgICAgIHZhciBsZW5ndGhNdWx0ID0gNjtcblxuICAgICAgICBpZiAoc3RhcnRQb2ludCA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAvLyBkb2VzIHRoaXMgbm9kZSBoYXZlIGEgbGluayBwb2ludGluZyB0byBpdD9cbiAgICAgICAgaWYgKCFkLmxpbmtlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAvLyBwb2ludCBiYWNrIHRvd2FyZCB0aGUgcHJldmlvdXMgbm9kZVxuICAgICAgICB2YXIgdSA9IFstKGVuZFBvaW50LnggLSBzdGFydFBvaW50LngpLCAtKGVuZFBvaW50LnkgLSBzdGFydFBvaW50LnkpXTtcblxuICAgICAgICBpZiAodVswXSA9PSAwICYmIHVbMV0gPT0gMClcbiAgICAgICAgICAgIHJldHVybjsgICAgIC8vIHdpbGwgbGVhZCB0byBhIE5hTiBlcnJvclxuXG4gICAgICAgIHUgPSBbdVswXSAvIG1hZ25pdHVkZSh1KSwgdVsxXSAvIG1hZ25pdHVkZSh1KV07XG4gICAgICAgIHZhciB2ID0gWy11WzFdLCB1WzBdXTtcblxuICAgICAgICB2YXIgYXJyb3dUaXAgPSBbZC5yYWRpdXMgKiB1WzBdLCBkLnJhZGl1cyAqIHVbMV1dO1xuXG4gICAgICAgIHZhciBwYXRoID0gJ00nICsgXG4gICAgICAgICAgICAgICAgICAgIChhcnJvd1RpcFswXSArIGxlbmd0aE11bHQgKiAodVswXSArIHZbMF0pIC8gMikgKyAnLCcgKyAoYXJyb3dUaXBbMV0gKyBsZW5ndGhNdWx0ICogKHVbMV0gKyB2WzFdKSAvIDIpICsgJ0wnICtcbiAgICAgICAgICAgICAgICAgICAgKGFycm93VGlwWzBdKSArICcsJyArIChhcnJvd1RpcFsxXSkgKyAnTCcgK1xuICAgICAgICAgICAgICAgICAgICAoYXJyb3dUaXBbMF0gKyBsZW5ndGhNdWx0ICogKHVbMF0gLSB2WzBdKSAvIDIpICsgJywnICsgKGFycm93VGlwWzFdICsgbGVuZ3RoTXVsdCAqICh1WzFdIC0gdlsxXSkgLyAyKTtcblxuICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cignZCcsIHBhdGgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlYWxMaW5rRmlsdGVyKGQpIHtcbiAgICAgICAgcmV0dXJuIGQubGlua1R5cGUgPT0gJ2Jhc2VwYWlyJyB8fFxuICAgICAgICAgICAgICAgZC5saW5rVHlwZSA9PSAnYmFja2JvbmUnIHx8XG4gICAgICAgICAgICAgICBkLmxpbmtUeXBlID09ICdpbnRlcm1vbGVjdWxlJyB8fFxuICAgICAgICAgICAgICAgZC5saW5rVHlwZSA9PSAncHNldWRva25vdCcgfHxcbiAgICAgICAgICAgICAgIGQubGlua1R5cGUgPT0gJ2xhYmVsX2xpbmsnIHx8XG4gICAgICAgICAgICAgICBkLmxpbmtUeXBlID09ICdleHRlcm5hbCcgfHxcbiAgICAgICAgICAgICAgIGQubGlua1R5cGUgPT0gJ2NoYWluX2NoYWluJztcbiAgICB9XG5cbiAgICBzZWxmLnRyYW5zaXRpb25STkEgPSBmdW5jdGlvbihuZXdTdHJ1Y3R1cmUsIG5leHRGdW5jdGlvbikge1xuICAgICAgICAvL3RyYW5zaXRpb24gZnJvbSBhbiBSTkEgd2hpY2ggaXMgYWxyZWFkeSBkaXNwbGF5ZWQgdG8gYSBuZXcgc3RydWN0dXJlXG4gICAgICAgIHZhciBkdXJhdGlvbiA9IHNlbGYub3B0aW9ucy50cmFuc2l0aW9uRHVyYXRpb247XG5cbiAgICAgICAgdmFyIHVpZHMgPSBzZWxmLmdyYXBoLm5vZGVzXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5ub2RlVHlwZSA9PSAnbnVjbGVvdGlkZSc7IH0pXG4gICAgICAgIC5tYXAoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC51aWQ7IH0pO1xuXG4gICAgICAgIHZhciBvcHRpb25zID0geyd1aWRzJzogdWlkc307XG4gICAgICAgIHZhciBuZXdSTkFKc29uID0gc2VsZi5jcmVhdGVJbml0aWFsTGF5b3V0KG5ld1N0cnVjdHVyZSwgb3B0aW9ucyk7XG5cbiAgICAgICAgdmFyIGdub2RlcyA9IHZpc05vZGVzLnNlbGVjdEFsbCgnZy5nbm9kZScpLmRhdGEobmV3Uk5BSnNvbi5ub2Rlcywgbm9kZUtleSk7XG5cbiAgICAgICAgaWYgKGR1cmF0aW9uID09PSAwKVxuICAgICAgICAgICAgZ25vZGVzLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHsgXG4gICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIFtkLngsIGQueV0gKyAnKSc7IFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZ25vZGVzLnRyYW5zaXRpb24oKS5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7IFxuICAgICAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyBbZC54LCBkLnldICsgJyknOyB9KS5kdXJhdGlvbihkdXJhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGlua3MgPSB2aXNMaW5rcy5zZWxlY3RBbGwoJ2xpbmUubGluaycpXG4gICAgICAgIC5kYXRhKG5ld1JOQUpzb24ubGlua3MuZmlsdGVyKHJlYWxMaW5rRmlsdGVyKSwgbGlua0tleSk7XG4gICAgICAgIHZhciBuZXdOb2RlcyA9IHNlbGYuY3JlYXRlTmV3Tm9kZXMoZ25vZGVzLmVudGVyKCkpXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7IFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkLnggIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGQueSAhPSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgWzAsIDBdICsgJyknOyBcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgaWYgKGR1cmF0aW9uID09PSAwKVxuICAgICAgICAgICAgZ25vZGVzLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZ25vZGVzLmV4aXQoKS50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7IFxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZC54ICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkLnkgIT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyBbMCwgMF0gKyAnKSc7IFxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgZ25vZGVzLnNlbGVjdCgncGF0aCcpXG4gICAgICAgIC5lYWNoKHBvc2l0aW9uQW55Tm9kZSk7XG5cbiAgICAgICAgc2VsZi5ncmFwaC5ub2RlcyA9IGdub2Rlcy5kYXRhKCk7XG4gICAgICAgIHNlbGYudXBkYXRlU3R5bGUoKTtcbiAgICAgICAgc2VsZi5jZW50ZXJWaWV3KGR1cmF0aW9uKTtcblxuICAgICAgICBmdW5jdGlvbiBlbmRhbGwodHJhbnNpdGlvbiwgY2FsbGJhY2spIHsgXG4gICAgICAgICAgICBpZiAodHJhbnNpdGlvbi5zaXplKCkgPT09IDApIHsgc2V0VGltZW91dChjYWxsYmFjaywgZHVyYXRpb24pOyB9XG4gICAgICAgICAgICB2YXIgbiA9IDA7IFxuICAgICAgICAgICAgdHJhbnNpdGlvbiBcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkgeyArK247IH0pIFxuICAgICAgICAgICAgLmVhY2goJ2VuZCcsIGZ1bmN0aW9uKCkgeyBpZiAoIS0tbikgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfSk7IFxuICAgICAgICB9IFxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZE5ld0xpbmtzKCkge1xuICAgICAgICAgICAgdmFyIG5ld0xpbmtzID0gc2VsZi5jcmVhdGVOZXdMaW5rcyhsaW5rcy5lbnRlcigpKTtcbiAgICAgICAgICAgIHNlbGYuZ3JhcGgubGlua3MgPSBsaW5rcy5kYXRhKCk7XG5cbiAgICAgICAgICAgIHNlbGYudXBkYXRlU3R5bGUoKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXh0RnVuY3Rpb24gIT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgbmV4dEZ1bmN0aW9uKCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGxpbmtzLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgICAgICBpZiAoZHVyYXRpb24gPT09IDApIHtcbiAgICAgICAgICAgIGxpbmtzXG4gICAgICAgICAgICAuYXR0cigneDEnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnNvdXJjZS54OyB9KVxuICAgICAgICAgICAgLmF0dHIoJ3kxJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zb3VyY2UueTsgfSlcbiAgICAgICAgICAgIC5hdHRyKCd4MicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudGFyZ2V0Lng7IH0pXG4gICAgICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnRhcmdldC55OyB9KTtcblxuICAgICAgICAgICAgdmFyIG5ld0xpbmtzID0gc2VsZi5jcmVhdGVOZXdMaW5rcyhsaW5rcy5lbnRlcigpKTtcbiAgICAgICAgICAgIHNlbGYuZ3JhcGgubGlua3MgPSBsaW5rcy5kYXRhKCk7XG5cbiAgICAgICAgICAgIHNlbGYudXBkYXRlU3R5bGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxpbmtzLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmF0dHIoJ3gxJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zb3VyY2UueDsgfSlcbiAgICAgICAgICAgIC5hdHRyKCd5MScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuc291cmNlLnk7IH0pXG4gICAgICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnRhcmdldC54OyB9KVxuICAgICAgICAgICAgLmF0dHIoJ3kyJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC50YXJnZXQueTsgfSlcbiAgICAgICAgICAgIC5kdXJhdGlvbihkdXJhdGlvbilcbiAgICAgICAgICAgIC5jYWxsKGVuZGFsbCwgYWRkTmV3TGlua3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGR1cmF0aW9uID09PSAwKSB7XG4gICAgICAgICAgICBuZXdOb2Rlc1xuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHsgXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkLnggIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGQueSAhPSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIFtkLngsIGQueV0gKyAnKSc7IFxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdOb2Rlcy50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7IFxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZC54ICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkLnkgIT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyBbZC54LCBkLnldICsgJyknOyBcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgc2VsZi5yZWNhbGN1bGF0ZUdyYXBoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIENvbmRlbnNlIGFsbCBvZiB0aGUgaW5kaXZpZHVhbCBSTkFzIGludG8gb25lXG4gICAgICAgIC8vIGNvbGxlY3Rpb24gb2Ygbm9kZXMgYW5kIGxpbmtzXG4gICAgICAgIHNlbGYuZ3JhcGgubm9kZXMgPSBbXTtcbiAgICAgICAgc2VsZi5ncmFwaC5saW5rcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciB1aWQgaW4gc2VsZi5ybmFzKSB7XG4gICAgICAgICAgICBzZWxmLmdyYXBoLm5vZGVzID0gc2VsZi5ncmFwaC5ub2Rlcy5jb25jYXQoc2VsZi5ybmFzW3VpZF0ubm9kZXMpO1xuICAgICAgICAgICAgc2VsZi5ncmFwaC5saW5rcyA9IHNlbGYuZ3JhcGgubGlua3MuY29uY2F0KHNlbGYucm5hc1t1aWRdLmxpbmtzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBhIGxvb2t1cCB0YWJsZSBzbyB0aGF0IHdlIGNhbiBhY2Nlc3MgZWFjaCBub2RlXG4gICAgICAgIC8vIGJhc2VkIG9uIGl0cyB1aWQuIFRoaXMgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZSB0aGUgbGlua3NcbiAgICAgICAgLy8gYmV0d2VlbiBkaWZmZXJlbnQgUk5Bc1xuICAgICAgICB2YXIgdWlkc1RvTm9kZXMgPSB7fTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbGYuZ3JhcGgubm9kZXMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICB1aWRzVG9Ob2Rlc1tzZWxmLmdyYXBoLm5vZGVzW2ldLnVpZF0gPSBzZWxmLmdyYXBoLm5vZGVzW2ldO1xuXG4gICAgICAgIHNlbGYuZ3JhcGgubGlua3MuZm9yRWFjaChmdW5jdGlvbihsaW5rKSB7XG4gICAgICAgICAgICBsaW5rLnNvdXJjZSA9IHVpZHNUb05vZGVzW2xpbmsuc291cmNlLnVpZF07XG4gICAgICAgICAgICBsaW5rLnRhcmdldCA9IHVpZHNUb05vZGVzW2xpbmsudGFyZ2V0LnVpZF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBzZWxmLmV4dHJhTGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vIHRoZSBhY3R1YWwgbm9kZSBvYmplY3RzIG1heSBoYXZlIGNoYW5nZWQsIHNvIHdlIGhhZSB0byByZWNyZWF0ZVxuICAgICAgICAgICAgLy8gdGhlIGV4dHJhIGxpbmtzIGJhc2VkIG9uIHRoZSB1aWRzXG4gICAgICAgICAgICBpZiAoIShzZWxmLmV4dHJhTGlua3NbaV0udGFyZ2V0LnVpZCBpbiB1aWRzVG9Ob2RlcykpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbm90IHRoZXJlOicsIHNlbGYuZXh0cmFMaW5rc1tpXSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuZXh0cmFMaW5rc1tpXS5zb3VyY2UgPSB1aWRzVG9Ob2Rlc1tzZWxmLmV4dHJhTGlua3NbaV0uc291cmNlLnVpZF07XG4gICAgICAgICAgICBzZWxmLmV4dHJhTGlua3NbaV0udGFyZ2V0ID0gdWlkc1RvTm9kZXNbc2VsZi5leHRyYUxpbmtzW2ldLnRhcmdldC51aWRdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc2VsZi5leHRyYUxpbmtzW2ldLmxpbmtUeXBlID09ICdpbnRlcm1vbGVjdWxlJykge1xuICAgICAgICAgICAgICAgIC8vcmVtb3ZlIGxpbmtzIHRvIG1pZGRsZSBub2Rlc1xuICAgICAgICAgICAgICAgIGxldCBmYWtlTGlua3MgPSBzZWxmLmdyYXBoLmxpbmtzLmZpbHRlcihmdW5jdGlvbihkKSB7IFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKChkLnNvdXJjZSA9PSBzZWxmLmV4dHJhTGlua3NbaV0uc291cmNlIHx8IGQuc291cmNlID09IHNlbGYuZXh0cmFMaW5rc1tpXS50YXJnZXQgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkLnRhcmdldCA9PSBzZWxmLmV4dHJhTGlua3NbaV0uc291cmNlIHx8IGQudGFyZ2V0ID09IHNlbGYuZXh0cmFMaW5rc1tpXS5zb3VyY2UpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5saW5rVHlwZSA9PSAnZmFrZScpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBmYWtlTGlua3MubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmtJbmRleCA9IHNlbGYuZ3JhcGgubGlua3MuaW5kZXhPZihmYWtlTGlua3Nbal0pOyBcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ncmFwaC5saW5rcy5zcGxpY2UobGlua0luZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGdyYXBoLmxpbmtzLnB1c2goc2VsZi5leHRyYUxpbmtzW2ldKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBzZWxmLmFkZE5vZGVzID0gZnVuY3Rpb24gYWRkTm9kZXMoanNvbikge1xuICAgICAgICAvLyBhZGQgYSBuZXcgc2V0IG9mIG5vZGVzIGZyb20gYSBqc29uIGZpbGVcblxuICAgICAgICAvLyBSZXNvbHZlIHRoZSBzb3VyY2VzIGFuZCB0YXJnZXRzIG9mIHRoZSBsaW5rcyBzbyB0aGF0IHRoZXlcbiAgICAgICAgLy8gYXJlIG5vdCBqdXN0IGluZGVjZXMgaW50byBhbiBhcnJheVxuICAgICAgICBqc29uLmxpbmtzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZW50cnkuc291cmNlID09ICdudW1iZXInKSBlbnRyeS5zb3VyY2UgPSBqc29uLm5vZGVzW2VudHJ5LnNvdXJjZV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIGVudHJ5LnRhcmdldCA9PSAnbnVtYmVyJykgZW50cnkudGFyZ2V0ID0ganNvbi5ub2Rlc1tlbnRyeS50YXJnZXRdO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBHZXQgdGhlIG1heGltdW0geCBhbmQgeSB2YWx1ZXMgb2YgdGhlIGN1cnJlbnQgZ3JhcGhcbiAgICAgICAgLy8gc28gdGhhdCB3ZSBkb24ndCBwbGFjZSBhIG5ldyBzdHJ1Y3R1cmUgb24gdG9wIG9mIHRoZVxuICAgICAgICAvLyBvbGQgb25lXG4gICAgICAgIGlmIChzZWxmLmdyYXBoLm5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG1heFggPSBkMy5tYXgoc2VsZi5ncmFwaC5ub2Rlcy5tYXAoZnVuY3Rpb24oZCkge3JldHVybiBkLng7fSkpO1xuICAgICAgICAgICAgbWF4WSA9IGQzLm1heChzZWxmLmdyYXBoLm5vZGVzLm1hcChmdW5jdGlvbihkKSB7cmV0dXJuIGQueTt9KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXhYID0gMDtcbiAgICAgICAgICAgIG1heFkgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAganNvbi5ub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgICBpZiAoIShlbnRyeS5ybmEudWlkIGluIHNlbGYucm5hcykpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnJuYXNbZW50cnkucm5hLnVpZF0gPSBlbnRyeS5ybmE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVudHJ5LnggKz0gbWF4WDtcbiAgICAgICAgICAgIC8vZW50cnkueSArPSBtYXhZO1xuXG4gICAgICAgICAgICBlbnRyeS5weCArPSBtYXhYO1xuICAgICAgICAgICAgLy9lbnRyeS5weSArPSBtYXhZO1xuICAgICAgICB9KTtcblxuICAgICAgICByID0gbmV3IFJOQUdyYXBoKCcnLCcnKTtcbiAgICAgICAgci5ub2RlcyA9IGpzb24ubm9kZXM7XG4gICAgICAgIHIubGlua3MgPSBqc29uLmxpbmtzO1xuXG4gICAgICAgIC8vc2VsZi5hZGRSTkEocik7XG4gICAgICAgIHNlbGYucmVjYWxjdWxhdGVHcmFwaCgpO1xuXG4gICAgICAgIHNlbGYudXBkYXRlKCk7XG4gICAgICAgIHNlbGYuY2VudGVyVmlldygpO1xuICAgIH07XG5cbiAgICBzZWxmLmFkZEN1c3RvbUNvbG9ycyA9IGZ1bmN0aW9uIGFkZEN1c3RvbUNvbG9ycyhqc29uKSB7XG4gICAgICAgIC8vIEFkZCBhIGpzb24gZmlsZSBjb250YWluaW5nIHRoZSBjdXN0b20gY29sb3JzXG4gICAgICAgIHNlbGYuY3VzdG9tQ29sb3JzID0ganNvbjtcbiAgICB9O1xuXG4gICAgc2VsZi5hZGRDdXN0b21Db2xvcnNUZXh0ID0gZnVuY3Rpb24oY3VzdG9tQ29sb3JzVGV4dCkge1xuICAgICAgICBsZXQgY3MgPSBuZXcgQ29sb3JTY2hlbWUoY3VzdG9tQ29sb3JzVGV4dCk7XG4gICAgICAgIHNlbGYuY3VzdG9tQ29sb3JzID0gY3MuY29sb3JzSnNvbjtcbiAgICAgICAgc2VsZi5jaGFuZ2VDb2xvclNjaGVtZSgnY3VzdG9tJyk7XG4gICAgfTtcblxuICAgIHNlbGYuY2xlYXJOb2RlcyA9IGZ1bmN0aW9uIGNsZWFyTm9kZXMoKSB7XG4gICAgICAgIHNlbGYuZ3JhcGgubm9kZXMgPSBbXTtcbiAgICAgICAgc2VsZi5ncmFwaC5saW5rcyA9IFtdO1xuXG4gICAgICAgIHNlbGYucm5hcyA9IHt9O1xuICAgICAgICBzZWxmLmV4dHJhTGlua3MgPSBbXTtcblxuICAgICAgICBzZWxmLnVwZGF0ZSgpO1xuICAgIH07XG4gICAgXG4gICAgc2VsZi50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgICAgdmFyIGRhdGEgPSB7J3JuYXMnOiBzZWxmLnJuYXMsICdleHRyYUxpbmtzJzogc2VsZi5leHRyYUxpbmtzfTtcbiAgICAgICAgICAgIHZhciBkYXRhU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZGF0YSwgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgLy9yZW1vdmUgY2lyY3VsYXIgcmVmZXJlbmNlc1xuICAgICAgICAgICAgaWYgKGtleSA9PSAncm5hJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgIH0sICdcXHQnKTtcbiAgICAgICByZXR1cm4gZGF0YVN0cmluZztcbiAgICB9O1xuXG4gICAgc2VsZi5mcm9tSlNPTiA9IGZ1bmN0aW9uKGpzb25TdHJpbmcpIHtcbiAgICAgICAgdmFyIHJuYXMsIGV4dHJhTGlua3M7XG5cbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKGpzb25TdHJpbmcpO1xuICAgICAgICAgICAgcm5hcyA9IGRhdGEucm5hcztcbiAgICAgICAgICAgIGV4dHJhTGlua3MgPSBkYXRhLmV4dHJhTGlua3M7XG4gICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciB1aWQgaW4gcm5hcykge1xuICAgICAgICAgICAgaWYgKHJuYXNbdWlkXS50eXBlID09ICdybmEnKSB7XG4gICAgICAgICAgICAgICAgciA9IG5ldyBSTkFHcmFwaCgpO1xuXG4gICAgICAgICAgICAgICAgci5zZXEgPSBybmFzW3VpZF0uc2VxO1xuICAgICAgICAgICAgICAgIHIuZG90YnJhY2tldCA9IHJuYXNbdWlkXS5kb3RicmFja2V0O1xuICAgICAgICAgICAgICAgIHIuY2lyY3VsYXIgPSBybmFzW3VpZF0uY2lyY3VsYXI7XG4gICAgICAgICAgICAgICAgci5wYWlydGFibGUgPSBybmFzW3VpZF0ucGFpcnRhYmxlO1xuICAgICAgICAgICAgICAgIHIudWlkID0gcm5hc1t1aWRdLnVpZDtcbiAgICAgICAgICAgICAgICByLnN0cnVjdE5hbWUgPSBybmFzW3VpZF0uc3RydWN0TmFtZTtcbiAgICAgICAgICAgICAgICByLm5vZGVzID0gcm5hc1t1aWRdLm5vZGVzO1xuICAgICAgICAgICAgICAgIHIubGlua3MgPSBybmFzW3VpZF0ubGlua3M7XG4gICAgICAgICAgICAgICAgci5ybmFMZW5ndGggPSBybmFzW3VpZF0ucm5hTGVuZ3RoO1xuICAgICAgICAgICAgICAgIHIuZWxlbWVudHMgPSBybmFzW3VpZF0uZWxlbWVudHM7XG4gICAgICAgICAgICAgICAgci5udWNzVG9Ob2RlcyA9IHJuYXNbdWlkXS5udWNzVG9Ob2RlcztcbiAgICAgICAgICAgICAgICByLnBzZXVkb2tub3RQYWlycyA9IHJuYXNbdWlkXS5wc2V1ZG9rbm90UGFpcnM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHIgPSBuZXcgUHJvdGVpbkdyYXBoKCk7XG4gICAgICAgICAgICAgICAgci5zaXplID0gcm5hc1t1aWRdLnNpemU7XG4gICAgICAgICAgICAgICAgci5ub2RlcyA9IHJuYXNbdWlkXS5ub2RlcztcbiAgICAgICAgICAgICAgICByLnVpZCA9IHJuYXNbdWlkXS51aWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuYWRkUk5BSlNPTihyLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBleHRyYUxpbmtzLmZvckVhY2goZnVuY3Rpb24obGluaykge1xuICAgICAgICAgICAgc2VsZi5leHRyYUxpbmtzLnB1c2gobGluayk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYucmVjYWxjdWxhdGVHcmFwaCgpO1xuICAgICAgICBzZWxmLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBzZWxmLnNldFNpemUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5pbml0aWFsU2l6ZSAhPSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzdmdIID0gZDMuc2VsZWN0KGVsZW1lbnQpLm5vZGUoKS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIHZhciBzdmdXID0gZDMuc2VsZWN0KGVsZW1lbnQpLm5vZGUoKS5vZmZzZXRXaWR0aDtcbiAgICAgICAgXG4gICAgICAgIHNlbGYub3B0aW9ucy5zdmdXID0gc3ZnVztcbiAgICAgICAgc2VsZi5vcHRpb25zLnN2Z0ggPSBzdmdIO1xuXG4gICAgICAgIC8vU2V0IHRoZSBvdXRwdXQgcmFuZ2Ugb2YgdGhlIHNjYWxlc1xuICAgICAgICB4U2NhbGUucmFuZ2UoWzAsIHN2Z1ddKS5kb21haW4oWzAsIHN2Z1ddKTtcbiAgICAgICAgeVNjYWxlLnJhbmdlKFswLCBzdmdIXSkuZG9tYWluKFswLCBzdmdIXSk7XG5cbiAgICAgICAgLy9yZS1hdHRhY2ggdGhlIHNjYWxlcyB0byB0aGUgem9vbSBiZWhhdmlvdXJcbiAgICAgICAgc2VsZi56b29tZXIueCh4U2NhbGUpXG4gICAgICAgIC55KHlTY2FsZSk7XG5cbiAgICAgICAgc2VsZi5icnVzaGVyLngoeFNjYWxlKVxuICAgICAgICAueSh5U2NhbGUpO1xuXG4gICAgICAgIHNlbGYuY2VudGVyVmlldygpO1xuXG4gICAgICAgIGlmICghc2VsZi5vcHRpb25zLnJlc2l6ZVN2Z09uUmVzaXplKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL3Jlc2l6ZSB0aGUgYmFja2dyb3VuZFxuICAgICAgICAvKlxuICAgICAgICByZWN0LmF0dHIoJ3dpZHRoJywgc3ZnVylcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHN2Z0gpO1xuICAgICAgICAqL1xuXG4gICAgICAgIHN2Zy5hdHRyKCd3aWR0aCcsIHN2Z1cpXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBzdmdIKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGFuZ2VDb2xvcnMobW9sZWN1bGVDb2xvcnMsIGQsIHNjYWxlKSB7XG4gICAgICAgIGlmIChtb2xlY3VsZUNvbG9ycy5oYXNPd25Qcm9wZXJ0eShkLm51bSkpIHtcbiAgICAgICAgICAgIGxldCB2YWwgPSBwYXJzZUZsb2F0KG1vbGVjdWxlQ29sb3JzW2QubnVtXSk7XG5cbiAgICAgICAgICAgIGlmIChpc05hTih2YWwpKSB7XG4gICAgICAgICAgICAgICAgLy8gcGFzc2VkIGluIGNvbG9yIGlzIG5vdCBhIHNjYWxhciwgc28gXG4gICAgICAgICAgICAgICAgLy8gdHJlYXQgaXQgYXMgYSBjb2xvclxuICAgICAgICAgICAgICAgIHJldHVybiBtb2xlY3VsZUNvbG9yc1tkLm51bV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHRoZSB1c2VyIHBhc3NlZCBpbiBhIGZsb2F0LCBsZXQncyB1c2UgYSBjb2xvcm1hcFxuICAgICAgICAgICAgICAgIC8vIHRvIGNvbnZlcnQgaXQgdG8gYSBjb2xvclxuICAgICAgICAgICAgICAgIHJldHVybiBzY2FsZSh2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICd3aGl0ZSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxmLnNldE91dGxpbmVDb2xvciA9IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgIHZhciBub2RlcyA9IHZpc05vZGVzLnNlbGVjdEFsbCgnZy5nbm9kZScpLnNlbGVjdCgnW25vZGVfdHlwZT1udWNsZW90aWRlXScpO1xuICAgICAgICBub2Rlcy5zdHlsZSgnZmlsbCcsIGNvbG9yKTtcbiAgICB9XG5cbiAgICBzZWxmLmNoYW5nZUNvbG9yU2NoZW1lID0gZnVuY3Rpb24obmV3Q29sb3JTY2hlbWUpIHtcbiAgICAgICAgdmFyIHByb3RlaW5Ob2RlcyA9IHZpc05vZGVzLnNlbGVjdEFsbCgnW25vZGVfdHlwZT1wcm90ZWluXScpO1xuXG4gICAgICAgIHByb3RlaW5Ob2Rlcy5jbGFzc2VkKCdwcm90ZWluJywgdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3InLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnJhZGl1czsgfSk7XG5cbiAgICAgICAgdmFyIGdub2RlcyA9IHZpc05vZGVzLnNlbGVjdEFsbCgnZy5nbm9kZScpO1xuICAgICAgICB2YXIgY2lyY2xlcyA9IHZpc05vZGVzLnNlbGVjdEFsbCgnZy5nbm9kZScpLnNlbGVjdEFsbCgnY2lyY2xlJyk7XG4gICAgICAgIHZhciBub2RlcyA9IHZpc05vZGVzLnNlbGVjdEFsbCgnZy5nbm9kZScpLnNlbGVjdCgnW25vZGVfdHlwZT1udWNsZW90aWRlXScpO1xuICAgICAgICBzZWxmLmNvbG9yU2NoZW1lID0gbmV3Q29sb3JTY2hlbWU7XG5cblxuICAgICAgICBpZiAobmV3Q29sb3JTY2hlbWUgPT0gJ3NlcXVlbmNlJykge1xuICAgICAgICAgICAgdmFyIHNjYWxlID0gZDMuc2NhbGUub3JkaW5hbCgpXG4gICAgICAgICAgICAucmFuZ2UoWycjZGJkYjhkJywgJyM5OGRmOGEnLCAnI2ZmOTg5NicsICcjYWVjN2U4JywgJyNhZWM3ZTgnXSlcbiAgICAgICAgICAgIC5kb21haW4oWydBJywnQycsJ0cnLCdVJywnVCddKTtcbiAgICAgICAgICAgIG5vZGVzLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkgeyBcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NhbGUoZC5uYW1lKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobmV3Q29sb3JTY2hlbWUgPT0gJ3N0cnVjdHVyZScpIHtcbiAgICAgICAgICAgIHZhciBzY2FsZSA9IGQzLnNjYWxlLmNhdGVnb3J5MTAoKVxuICAgICAgICAgICAgLmRvbWFpbihbJ3MnLCdtJywnaScsJ2UnLCd0JywnaCcsJ3gnXSlcbiAgICAgICAgICAgIC5yYW5nZShbJ2xpZ2h0Z3JlZW4nLCAnI2ZmOTg5NicsICcjZGJkYjhkJywgJ2xpZ2h0c2FsbW9uJyxcbiAgICAgICAgICAgICAgICAgICAnbGlnaHRjeWFuJywgJ2xpZ2h0Ymx1ZScsICd0cmFuc3BhcmVudCddKTtcblxuICAgICAgICAgICAgICAgICAgIG5vZGVzLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjYWxlKGQuZWxlbVR5cGUpO1xuICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobmV3Q29sb3JTY2hlbWUgPT0gJ3Bvc2l0aW9ucycpIHtcbiAgICAgICAgICAgIG5vZGVzLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkgeyBcbiAgICAgICAgICAgICAgICB2YXIgc2NhbGUgPSBkMy5zY2FsZS5saW5lYXIoKVxuICAgICAgICAgICAgICAgIC5yYW5nZShbJyM5OGRmOGEnLCAnI2RiZGI4ZCcsICcjZmY5ODk2J10pXG4gICAgICAgICAgICAgICAgLmludGVycG9sYXRlKGQzLmludGVycG9sYXRlTGFiKVxuICAgICAgICAgICAgICAgIC5kb21haW4oWzEsIDEgKyAoZC5ybmEucm5hTGVuZ3RoIC0gMSkgLyAyLCBkLnJuYS5ybmFMZW5ndGhdKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBzY2FsZShkLm51bSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChuZXdDb2xvclNjaGVtZSA9PSAnY3VzdG9tJykge1xuICAgICAgICAgICAgLy8gc2NhbGUgdG8gYmUgdXNlZCBpbiBjYXNlIHRoZSB1c2VyIHBhc3NlcyBzY2FsYXJcbiAgICAgICAgICAgIC8vIHZhbHVlcyByYXRoZXIgdGhhbiBjb2xvciBuYW1lc1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxmLmN1c3RvbUNvbG9ycyAhPSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgICdkb21haW4nIGluIHNlbGYuY3VzdG9tQ29sb3JzICYmXG4gICAgICAgICAgICAgICAncmFuZ2UnIGluIHNlbGYuY3VzdG9tQ29sb3JzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNjYWxlID0gZDMuc2NhbGUubGluZWFyKClcbiAgICAgICAgICAgICAgICAuaW50ZXJwb2xhdGUoZDMuaW50ZXJwb2xhdGVMYWIpXG4gICAgICAgICAgICAgICAgLmRvbWFpbihzZWxmLmN1c3RvbUNvbG9ycy5kb21haW4pXG4gICAgICAgICAgICAgICAgLnJhbmdlKHNlbGYuY3VzdG9tQ29sb3JzLnJhbmdlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbm9kZXMuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxmLmN1c3RvbUNvbG9ycyA9PSAndW5kZWZpbmVkJyB8fFxuICAgICAgICAgICAgICAgICAgICFzZWxmLmN1c3RvbUNvbG9ycy5oYXNPd25Qcm9wZXJ0eSgnY29sb3JWYWx1ZXMnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3doaXRlJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuY3VzdG9tQ29sb3JzLmNvbG9yVmFsdWVzLmhhc093blByb3BlcnR5KGQuc3RydWN0TmFtZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jdXN0b21Db2xvcnMuY29sb3JWYWx1ZXNbZC5zdHJ1Y3ROYW1lXS5oYXNPd25Qcm9wZXJ0eShkLm51bSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgYSBtb2xlY3VsZSBuYW1lIGlzIHNwZWNpZmllZCwgaXQgc3VwZXJjZWRlcyB0aGUgZGVmYXVsdCBjb2xvcnNcbiAgICAgICAgICAgICAgICAgICAgLy8gKGZvciB3aGljaCBubyBtb2xlY3VsZSBuYW1lIGhhcyBiZWVuIHNwZWNpZmllZClcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vbGVjdWxlQ29sb3JzID0gc2VsZi5jdXN0b21Db2xvcnMuY29sb3JWYWx1ZXNbZC5zdHJ1Y3ROYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoYW5nZUNvbG9ycyhtb2xlY3VsZUNvbG9ycywgZCwgc2NhbGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5jdXN0b21Db2xvcnMuY29sb3JWYWx1ZXMuaGFzT3duUHJvcGVydHkoJycpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb2xlY3VsZUNvbG9ycyA9IHNlbGYuY3VzdG9tQ29sb3JzLmNvbG9yVmFsdWVzWycnXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoYW5nZUNvbG9ycyhtb2xlY3VsZUNvbG9ycywgZCwgc2NhbGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAnd2hpdGUnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbW91c2Vkb3duKCkge1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW91c2Vtb3ZlKCkge1xuICAgICAgICBpZiAoIW1vdXNlZG93bk5vZGUpIHJldHVybjtcblxuICAgICAgICBsZXQgbXBvcyA9IGQzLm1vdXNlKHZpcy5ub2RlKCkpO1xuICAgICAgICAvLyB1cGRhdGUgZHJhZyBsaW5lXG4gICAgICAgIGRyYWdMaW5lXG4gICAgICAgIC5hdHRyKCd4MScsIG1vdXNlZG93bk5vZGUueClcbiAgICAgICAgLmF0dHIoJ3kxJywgbW91c2Vkb3duTm9kZS55KVxuICAgICAgICAuYXR0cigneDInLCBtcG9zWzBdKVxuICAgICAgICAuYXR0cigneTInLCBtcG9zWzFdKTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdXNldXAoKSB7XG4gICAgICAgIGlmIChtb3VzZWRvd25Ob2RlKSB7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFsaW5rQ29udGV4dE1lbnVTaG93bilcbiAgICAgICAgICAgICAgICBkcmFnTGluZVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdkcmFnX2xpbmVfaGlkZGVuJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjbGVhciBtb3VzZSBldmVudCB2YXJzXG4gICAgICAgIHJlc2V0TW91c2VWYXJzKCk7XG4gICAgICAgIC8vdXBkYXRlKClcbiAgICB9XG4gICAgLy9hZGFwdCBzaXplIHRvIHdpbmRvdyBjaGFuZ2VzOlxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzZWxmLnNldFNpemUsIGZhbHNlKTtcblxuICAgIHNlbGYuem9vbWVyID0gZDMuYmVoYXZpb3Iuem9vbSgpXG4gICAgICAgIC5zY2FsZUV4dGVudChbMC4xLDEwXSlcbiAgICAgICAgLngoeFNjYWxlKVxuICAgICAgICAueSh5U2NhbGUpXG4gICAgICAgIC5vbignem9vbXN0YXJ0Jywgem9vbXN0YXJ0KVxuICAgICAgICAub24oJ3pvb20nLCByZWRyYXcpO1xuXG4gICAgZDMuc2VsZWN0KGVsZW1lbnQpLnNlbGVjdCgnc3ZnJykucmVtb3ZlKCk7XG5cbiAgICB2YXIgc3ZnID0gZDMuc2VsZWN0KGVsZW1lbnQpXG4gICAgLmF0dHIoJ3RhYmluZGV4JywgMSlcbiAgICAub24oJ2tleWRvd24uYnJ1c2gnLCBrZXlkb3duKVxuICAgIC5vbigna2V5dXAuYnJ1c2gnLCBrZXl1cClcbiAgICAuZWFjaChmdW5jdGlvbigpIHsgdGhpcy5mb2N1cygpOyB9KVxuICAgIC5hcHBlbmQoJ3N2ZzpzdmcnKVxuICAgIC5hdHRyKCd3aWR0aCcsIHNlbGYub3B0aW9ucy5zdmdXKVxuICAgIC5hdHRyKCdoZWlnaHQnLCBzZWxmLm9wdGlvbnMuc3ZnSClcbiAgICAuYXR0cignaWQnLCAncGxvdHRpbmctYXJlYScpO1xuXG4gICAgc2VsZi5vcHRpb25zLnN2ZyA9IHN2ZztcblxuICAgIHZhciBzdmdHcmFwaCA9IHN2Zy5hcHBlbmQoJ3N2ZzpnJylcbiAgICAub24oJ21vdXNlbW92ZScsIG1vdXNlbW92ZSlcbiAgICAub24oJ21vdXNlZG93bicsIG1vdXNlZG93bilcbiAgICAub24oJ21vdXNldXAnLCBtb3VzZXVwKTtcblxuICAgIGlmIChzZWxmLm9wdGlvbnMuYWxsb3dQYW5uaW5nQW5kWm9vbWluZylcbiAgICAgICAgc3ZnR3JhcGguY2FsbChzZWxmLnpvb21lcik7XG5cbiAgICBpZiAoc2VsZi5vcHRpb25zLmVkaXRhYmxlKVxuICAgICAgICBzdmdHcmFwaC5vbignY29udGV4dG1lbnUnLCBzZWxmLmJhY2tncm91bmRDb250ZXh0TWVudSk7XG5cbiAgICAvKlxuICAgIHZhciByZWN0ID0gc3ZnR3JhcGguYXBwZW5kKCdzdmc6cmVjdCcpXG4gICAgLmF0dHIoJ3dpZHRoJywgc2VsZi5vcHRpb25zLnN2Z1cpXG4gICAgLmF0dHIoJ2hlaWdodCcsIHNlbGYub3B0aW9ucy5zdmdIKVxuICAgIC5hdHRyKCdmaWxsJywgJ3doaXRlJylcbiAgICAvLy5hdHRyKCdzdHJva2UnLCAnZ3JleScpXG4gICAgLy8uYXR0cignc3Ryb2tlLXdpZHRoJywgMSlcbiAgICAvLy5hdHRyKCdwb2ludGVyLWV2ZW50cycsICdhbGwnKVxuICAgIC5hdHRyKCdpZCcsICd6cmVjdCcpO1xuICAgICovXG5cbiAgICB2YXIgYnJ1c2ggPSBzdmdHcmFwaC5hcHBlbmQoJ2cnKVxuICAgIC5kYXR1bShmdW5jdGlvbigpIHsgcmV0dXJuIHtzZWxlY3RlZDogZmFsc2UsIHByZXZpb3VzbHlTZWxlY3RlZDogZmFsc2V9OyB9KVxuICAgIC5hdHRyKCdjbGFzcycsICdicnVzaCcpO1xuXG4gICAgdmFyIHZpcyA9IHN2Z0dyYXBoLmFwcGVuZCgnc3ZnOmcnKTtcbiAgICB2YXIgdmlzTGlua3MgPSB2aXMuYXBwZW5kKCdzdmc6ZycpO1xuICAgIHZhciB2aXNOb2RlcyA9IHZpcy5hcHBlbmQoJ3N2ZzpnJyk7XG5cbiAgICBzZWxmLmJydXNoZXIgPSBkMy5zdmcuYnJ1c2goKVxuICAgICAgICAgICAgICAgIC54KHhTY2FsZSlcbiAgICAgICAgICAgICAgICAueSh5U2NhbGUpXG4gICAgICAgICAgICAgICAub24oJ2JydXNoc3RhcnQnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgICAgdmFyIGdub2RlcyA9IHZpc05vZGVzLnNlbGVjdEFsbCgnZy5nbm9kZScpLnNlbGVjdEFsbCgnLm91dGxpbmVfbm9kZScpO1xuICAgICAgICAgICAgICAgICAgIGdub2Rlcy5lYWNoKGZ1bmN0aW9uKGQpIHsgZC5wcmV2aW91c2x5U2VsZWN0ZWQgPSBjdHJsS2V5ZG93biAmJiBkLnNlbGVjdGVkOyB9KTtcbiAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAub24oJ2JydXNoJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgdmFyIGdub2RlcyA9IHZpc05vZGVzLnNlbGVjdEFsbCgnZy5nbm9kZScpLnNlbGVjdEFsbCgnLm91dGxpbmVfbm9kZScpO1xuICAgICAgICAgICAgICAgICAgIHZhciBleHRlbnQgPSBkMy5ldmVudC50YXJnZXQuZXh0ZW50KCk7XG5cbiAgICAgICAgICAgICAgICAgICBnbm9kZXMuY2xhc3NlZCgnc2VsZWN0ZWQnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkLnNlbGVjdGVkID0gc2VsZi5vcHRpb25zLmFwcGx5Rm9yY2UgJiYgZC5wcmV2aW91c2x5U2VsZWN0ZWQgXlxuICAgICAgICAgICAgICAgICAgICAgICAoZXh0ZW50WzBdWzBdIDw9IGQueCAmJiBkLnggPCBleHRlbnRbMV1bMF1cbiAgICAgICAgICAgICAgICAgICAgICAgICYmIGV4dGVudFswXVsxXSA8PSBkLnkgJiYgZC55IDwgZXh0ZW50WzFdWzFdKTtcbiAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAub24oJ2JydXNoZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgZDMuZXZlbnQudGFyZ2V0LmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNhbGwoZDMuZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICBicnVzaC5jYWxsKHNlbGYuYnJ1c2hlcilcbiAgICAgICAgICAub24oJ21vdXNlZG93bi5icnVzaCcsIG51bGwpXG4gICAgICAgICAgLm9uKCd0b3VjaHN0YXJ0LmJydXNoJywgbnVsbCkgXG4gICAgICAgICAgLm9uKCd0b3VjaG1vdmUuYnJ1c2gnLCBudWxsKVxuICAgICAgICAgIC5vbigndG91Y2hlbmQuYnJ1c2gnLCBudWxsKTtcbiAgICAgIGJydXNoLnNlbGVjdCgnLmJhY2tncm91bmQnKS5zdHlsZSgnY3Vyc29yJywgJ2F1dG8nKTtcblxuICAgIGZ1bmN0aW9uIHpvb21zdGFydCgpIHtcbiAgICAgICAgdmFyIG5vZGUgPSB2aXNOb2Rlcy5zZWxlY3RBbGwoJ2cuZ25vZGUnKS5zZWxlY3RBbGwoJy5vdXRsaW5lX25vZGUnKTtcbiAgICAgICAgbm9kZS5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICBkLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZC5wcmV2aW91c2x5U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgbm9kZS5jbGFzc2VkKCdzZWxlY3RlZCcsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWRyYXcoKSB7XG4gICAgICAgIHZpcy5hdHRyKCd0cmFuc2Zvcm0nLFxuICAgICAgICAgICAgICAgICAndHJhbnNsYXRlKCcgKyBkMy5ldmVudC50cmFuc2xhdGUgKyAnKScgKyAnIHNjYWxlKCcgKyBkMy5ldmVudC5zY2FsZSArICcpJyk7XG4gICAgfVxuXG4gICAgc2VsZi5nZXRCb3VuZGluZ0JveFRyYW5zZm9ybSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBDZW50ZXIgdGhlIHZpZXcgb24gdGhlIG1vbGVjdWxlKHMpIGFuZCBzY2FsZSBpdCBzbyB0aGF0IGV2ZXJ5dGhpbmdcbiAgICAgICAgLy8gZml0cyBpbiB0aGUgd2luZG93XG5cbiAgICAgICAgLy9ubyBtb2xlY3VsZXMsIG5vdGhpbmcgdG8gZG9cbiAgICAgICAgaWYgKHNlbGYuZ3JhcGgubm9kZXMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIHsndHJhbnNsYXRlJzogWzAsMF0sICdzY2FsZSc6IDF9O1xuXG4gICAgICAgIC8vIEdldCB0aGUgYm91bmRpbmcgYm94XG4gICAgICAgIHZhciBtaW5YID0gZDMubWluKHNlbGYuZ3JhcGgubm9kZXMubWFwKGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC54O30pKTtcbiAgICAgICAgdmFyIG1pblkgPSBkMy5taW4oc2VsZi5ncmFwaC5ub2Rlcy5tYXAoZnVuY3Rpb24oZCkge3JldHVybiBkLnk7fSkpO1xuXG4gICAgICAgIHZhciBtYXhYID0gZDMubWF4KHNlbGYuZ3JhcGgubm9kZXMubWFwKGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC54O30pKTtcbiAgICAgICAgdmFyIG1heFkgPSBkMy5tYXgoc2VsZi5ncmFwaC5ub2Rlcy5tYXAoZnVuY3Rpb24oZCkge3JldHVybiBkLnk7fSkpO1xuXG4gICAgICAgIHZhciBtYXhSYWRpdXMgPSBkMy5tYXgoc2VsZi5ncmFwaC5ub2Rlcy5tYXAoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5yYWRpdXM7IH0pKTtcblxuICAgICAgICAvLyBUaGUgd2lkdGggYW5kIHRoZSBoZWlnaHQgb2YgdGhlIG1vbGVjdWxlXG4gICAgICAgIHZhciBtb2xXaWR0aCA9IG1heFggLSBtaW5YO1xuICAgICAgICB2YXIgbW9sSGVpZ2h0ID0gbWF4WSAtIG1pblk7XG5cbiAgICAgICAgLy8gaG93IG11Y2ggbGFyZ2VyIHRoZSBkcmF3aW5nIGFyZWEgaXMgdGhhbiB0aGUgd2lkdGggYW5kIHRoZSBoZWlnaHRcbiAgICAgICAgdmFyIHdpZHRoUmF0aW8gPSBzZWxmLm9wdGlvbnMuc3ZnVyAvIChtb2xXaWR0aCArIDEpO1xuICAgICAgICB2YXIgaGVpZ2h0UmF0aW8gPSBzZWxmLm9wdGlvbnMuc3ZnSCAvIChtb2xIZWlnaHQgKyAxKTtcblxuICAgICAgICAvLyB3ZSBuZWVkIHRvIGZpdCBpdCBpbiBib3RoIGRpcmVjdGlvbnMsIHNvIHdlIHNjYWxlIGFjY29yZGluZyB0b1xuICAgICAgICAvLyB0aGUgZGlyZWN0aW9uIGluIHdoaWNoIHdlIG5lZWQgdG8gc2hyaW5rIHRoZSBtb3N0XG4gICAgICAgIHZhciBtaW5SYXRpbyA9IE1hdGgubWluKHdpZHRoUmF0aW8sIGhlaWdodFJhdGlvLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zLm1heE5vZGVSYWRpdXMgLyBtYXhSYWRpdXMpICogMC44O1xuXG4gICAgICAgIC8vIHRoZSBuZXcgZGltZW5zaW9ucyBvZiB0aGUgbW9sZWN1bGVcbiAgICAgICAgdmFyIG5ld01vbFdpZHRoID0gbW9sV2lkdGggKiBtaW5SYXRpbztcbiAgICAgICAgdmFyIG5ld01vbEhlaWdodCA9IG1vbEhlaWdodCAqIG1pblJhdGlvO1xuXG4gICAgICAgIC8vIHRyYW5zbGF0ZSBzbyB0aGF0IGl0J3MgaW4gdGhlIGNlbnRlciBvZiB0aGUgd2luZG93XG4gICAgICAgIHZhciB4VHJhbnMgPSAtKG1pblgpICogbWluUmF0aW8gKyAoc2VsZi5vcHRpb25zLnN2Z1cgLSBuZXdNb2xXaWR0aCkgLyAyO1xuICAgICAgICB2YXIgeVRyYW5zID0gLShtaW5ZKSAqIG1pblJhdGlvICsgKHNlbGYub3B0aW9ucy5zdmdIIC0gbmV3TW9sSGVpZ2h0KSAvIDI7XG5cbiAgICAgICAgcmV0dXJuIHsndHJhbnNsYXRlJzogW3hUcmFucywgeVRyYW5zXSwgJ3NjYWxlJzogbWluUmF0aW99O1xuICAgIH07XG5cbiAgICBzZWxmLmNlbnRlclZpZXcgPSBmdW5jdGlvbihkdXJhdGlvbikge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIGR1cmF0aW9uID0gMDtcblxuICAgICAgICB2YXIgYmJUcmFuc2Zvcm0gPSBzZWxmLmdldEJvdW5kaW5nQm94VHJhbnNmb3JtKCk7XG5cbiAgICAgICAgaWYgKGJiVHJhbnNmb3JtID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIC8vIGRvIHRoZSBhY3R1YWwgbW92aW5nXG4gICAgICAgIHZpcy50cmFuc2l0aW9uKCkuYXR0cigndHJhbnNmb3JtJyxcbiAgICAgICAgICAgICAgICAgJ3RyYW5zbGF0ZSgnICsgYmJUcmFuc2Zvcm0udHJhbnNsYXRlICsgJyknICsgJyBzY2FsZSgnICsgYmJUcmFuc2Zvcm0uc2NhbGUgKyAnKScpLmR1cmF0aW9uKGR1cmF0aW9uKTtcblxuICAgICAgICAvLyB0ZWxsIHRoZSB6b29tZXIgd2hhdCB3ZSBkaWQgc28gdGhhdCBuZXh0IHdlIHpvb20sIGl0IHVzZXMgdGhlXG4gICAgICAgIC8vIHRyYW5zZm9ybWF0aW9uIHdlIGVudGVyZWQgaGVyZVxuICAgICAgICBzZWxmLnpvb21lci50cmFuc2xhdGUoYmJUcmFuc2Zvcm0udHJhbnNsYXRlKTtcbiAgICAgICAgc2VsZi56b29tZXIuc2NhbGUoYmJUcmFuc2Zvcm0uc2NhbGUpO1xuICAgIH07XG5cbiAgICBzZWxmLmZvcmNlID0gZDMubGF5b3V0LmZvcmNlKClcbiAgICAuY2hhcmdlKGZ1bmN0aW9uKGQpIHsgaWYgKGQubm9kZVR5cGUgPT0gJ21pZGRsZScpICB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5vcHRpb25zLm1pZGRsZUNoYXJnZTsgXG4gICAgfVxuICAgICAgICBlbHNlIFxuICAgICAgICAgICAgcmV0dXJuIHNlbGYub3B0aW9ucy5vdGhlckNoYXJnZTt9KVxuICAgIC5mcmljdGlvbihzZWxmLm9wdGlvbnMuZnJpY3Rpb24pXG4gICAgLmxpbmtEaXN0YW5jZShmdW5jdGlvbihkKSB7IHJldHVybiBzZWxmLm9wdGlvbnMubGlua0Rpc3RhbmNlTXVsdGlwbGllciAqIGQudmFsdWU7IH0pXG4gICAgLmxpbmtTdHJlbmd0aChmdW5jdGlvbihkKSB7IGlmIChkLmxpbmtUeXBlIGluIHNlbGYubGlua1N0cmVuZ3Rocykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmxpbmtTdHJlbmd0aHNbZC5saW5rVHlwZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYubGlua1N0cmVuZ3Rocy5vdGhlcjsgfVxuICAgIH0pXG4gICAgLmdyYXZpdHkoMC4wMDApXG4gICAgLm5vZGVzKHNlbGYuZ3JhcGgubm9kZXMpXG4gICAgLmxpbmtzKHNlbGYuZ3JhcGgubGlua3MpXG4gICAgLmNoYXJnZURpc3RhbmNlKHNlbGYub3B0aW9ucy5jaGFyZ2VEaXN0YW5jZSlcbiAgICAuc2l6ZShbc2VsZi5vcHRpb25zLnN2Z1csIHNlbGYub3B0aW9ucy5zdmdIXSk7XG5cbiAgICAvLyBsaW5lIGRpc3BsYXllZCB3aGVuIGRyYWdnaW5nIG5ldyBub2Rlc1xuICAgIHZhciBkcmFnTGluZSA9IHZpcy5hcHBlbmQoJ2xpbmUnKVxuICAgIC5hdHRyKCdjbGFzcycsICdkcmFnX2xpbmUnKVxuICAgIC5hdHRyKCd4MScsIDApXG4gICAgLmF0dHIoJ3kxJywgMClcbiAgICAuYXR0cigneDInLCAwKVxuICAgIC5hdHRyKCd5MicsIDApO1xuXG4gICAgZnVuY3Rpb24gcmVzZXRNb3VzZVZhcnMoKSB7XG4gICAgICAgIG1vdXNlZG93bk5vZGUgPSBudWxsO1xuICAgICAgICBtb3VzZXVwTm9kZSA9IG51bGw7XG4gICAgICAgIG1vdXNlZG93bkxpbmsgPSBudWxsO1xuICAgIH1cblxuICAgIHZhciBzaGlmdEtleWRvd24gPSBmYWxzZTtcbiAgICB2YXIgY3RybEtleWRvd24gPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIHNlbGVjdGVkTm9kZXMobW91c2VEb3duTm9kZSkge1xuICAgICAgICB2YXIgZ25vZGVzID0gdmlzTm9kZXMuc2VsZWN0QWxsKCdnLmdub2RlJyk7XG5cbiAgICAgICAgaWYgKGN0cmxLZXlkb3duKSB7XG4gICAgICAgICAgICByZXR1cm4gZ25vZGVzLmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkLnNlbGVjdGVkOyB9KTtcblxuICAgICAgICAgICAgLy9yZXR1cm4gZDMuc2VsZWN0QWxsKCdbc3RydWN0X25hbWU9JyArIG1vdXNlRG93bk5vZGUuc3RydWN0X25hbWUgKyAnXScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGdub2Rlcy5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zZWxlY3RlZCA7IH0pO1xuICAgICAgICAgICAgLy9yZXR1cm4gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhZ3N0YXJ0ZWQoZCkge1xuICAgICAgICBkMy5ldmVudC5zb3VyY2VFdmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgaWYgKCFkLnNlbGVjdGVkICYmICFjdHJsS2V5ZG93bikge1xuICAgICAgICAgIC8vIGlmIHRoaXMgbm9kZSBpc24ndCBzZWxlY3RlZCwgdGhlbiB3ZSBoYXZlIHRvIHVuc2VsZWN0IGV2ZXJ5IG90aGVyIG5vZGVcbiAgICAgICAgICAgIHZhciBub2RlID0gdmlzTm9kZXMuc2VsZWN0QWxsKCdnLmdub2RlJykuc2VsZWN0QWxsKCcub3V0bGluZV9ub2RlJyk7XG4gICAgICAgICAgICBub2RlLmNsYXNzZWQoJ3NlbGVjdGVkJywgZnVuY3Rpb24ocCkgeyByZXR1cm4gcC5zZWxlY3RlZCA9ICBzZWxmLm9wdGlvbnMuYXBwbHlGb3JjZSAmJiAocC5wcmV2aW91c2x5U2VsZWN0ZWQgPSBmYWxzZSk7IH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICBkMy5zZWxlY3QodGhpcykuc2VsZWN0KCcub3V0bGluZV9ub2RlJykuY2xhc3NlZCgnc2VsZWN0ZWQnLCBmdW5jdGlvbihwKSB7IGQucHJldmlvdXNseVNlbGVjdGVkID0gZC5zZWxlY3RlZDsgcmV0dXJuIGQuc2VsZWN0ZWQgPSBzZWxmLm9wdGlvbnMuYXBwbHlGb3JjZSAmJiB0cnVlOyB9KTtcblxuICAgICAgICB2YXIgdG9EcmFnID0gc2VsZWN0ZWROb2RlcyhkKTtcbiAgICAgICAgdG9EcmFnLmVhY2goZnVuY3Rpb24oZDEpIHtcbiAgICAgICAgICAgIGQxLmZpeGVkIHw9IDI7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vZDMuZXZlbnQuc291cmNlRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIC8vZDMuc2VsZWN0KHNlbGYpLmNsYXNzZWQoJ2RyYWdnaW5nJywgdHJ1ZSk7XG4gICAgICAgIC8vXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhZ2dlZChkKSB7XG5cbiAgICAgICAgdmFyIHRvRHJhZyA9IHNlbGVjdGVkTm9kZXMoZCk7XG5cbiAgICAgICAgdG9EcmFnLmVhY2goZnVuY3Rpb24oZDEpIHtcbiAgICAgICAgICAgIGQxLnggKz0gZDMuZXZlbnQuZHg7XG4gICAgICAgICAgICBkMS55ICs9IGQzLmV2ZW50LmR5O1xuXG4gICAgICAgICAgICBkMS5weCArPSBkMy5ldmVudC5keDtcbiAgICAgICAgICAgIGQxLnB5ICs9IGQzLmV2ZW50LmR5O1xuICAgICAgICB9KTtcblxuICAgICAgICBzZWxmLnJlc3VtZUZvcmNlKCk7XG4gICAgICAgIGQzLmV2ZW50LnNvdXJjZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgc2VsZi5yZXN1bWVGb3JjZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoc2VsZi5hbmltYXRpb24pXG4gICAgICAgICAgICBzZWxmLmZvcmNlLnJlc3VtZSgpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBkcmFnZW5kZWQoZCkge1xuICAgICAgICB2YXIgdG9EcmFnID0gc2VsZWN0ZWROb2RlcyhkKTtcblxuICAgICAgICB0b0RyYWcuZWFjaChmdW5jdGlvbihkMSkge1xuICAgICAgICAgICAgZDEuZml4ZWQgJj0gfjY7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbGxpZGUobm9kZSkge1xuICAgICAgICB2YXIgciA9IG5vZGUucmFkaXVzICsgMTYsXG4gICAgICAgIG54MSA9IG5vZGUueCAtIHIsXG4gICAgICAgIG54MiA9IG5vZGUueCArIHIsXG4gICAgICAgIG55MSA9IG5vZGUueSAtIHIsXG4gICAgICAgIG55MiA9IG5vZGUueSArIHI7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihxdWFkLCB4MSwgeTEsIHgyLCB5Mikge1xuICAgICAgICAgICAgaWYgKHF1YWQucG9pbnQgJiYgKHF1YWQucG9pbnQgIT09IG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHggPSBub2RlLnggLSBxdWFkLnBvaW50LngsXG4gICAgICAgICAgICAgICAgeSA9IG5vZGUueSAtIHF1YWQucG9pbnQueSxcbiAgICAgICAgICAgICAgICBsID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpLFxuICAgICAgICAgICAgICAgIHIgPSBub2RlLnJhZGl1cyArIHF1YWQucG9pbnQucmFkaXVzO1xuICAgICAgICAgICAgICAgIGlmIChsIDwgcikge1xuICAgICAgICAgICAgICAgICAgICBsID0gKGwgLSByKSAvIGwgKiAwLjE7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUueCAtPSB4ICo9IGw7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUueSAtPSB5ICo9IGw7XG4gICAgICAgICAgICAgICAgICAgIHF1YWQucG9pbnQueCArPSB4O1xuICAgICAgICAgICAgICAgICAgICBxdWFkLnBvaW50LnkgKz0geTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geDEgPiBueDIgfHwgeDIgPCBueDEgfHwgeTEgPiBueTIgfHwgeTIgPCBueTE7XG4gICAgICAgIH07XG4gICAgfVxuXG5cbiAgICB2YXIgZHJhZyA9IGQzLmJlaGF2aW9yLmRyYWcoKVxuICAgIC8vLm9yaWdpbihmdW5jdGlvbihkKSB7IHJldHVybiBkOyB9KVxuICAgIC5vbignZHJhZ3N0YXJ0JywgZHJhZ3N0YXJ0ZWQpXG4gICAgLm9uKCdkcmFnJywgZHJhZ2dlZClcbiAgICAub24oJ2RyYWdlbmQnLCBkcmFnZW5kZWQpO1xuXG4gICAgZnVuY3Rpb24ga2V5ZG93bigpIHtcbiAgICAgICAgaWYgKHNlbGYuZGVhZilcbiAgICAgICAgICAgIC8vIGxhbGFsYWxhbCwgbm90IGxpc3RlbmluZ1xuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGlmIChzaGlmdEtleWRvd24pIHJldHVybjtcblxuICAgICAgICBzd2l0Y2ggKGQzLmV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgNjg6ICAgIC8vJ2QnIGtleVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkb3RicmFja2V0OicsIHNlbGYuZ2V0U3RydWN0dXJlc0RvdEJyYWNrZXQoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE2OlxuICAgICAgICAgICAgICAgIHNoaWZ0S2V5ZG93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE3OlxuICAgICAgICAgICAgICAgIGN0cmxLZXlkb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjc6IC8vY1xuICAgICAgICAgICAgICAgIHNlbGYuY2VudGVyVmlldygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNoaWZ0S2V5ZG93biB8fCBjdHJsS2V5ZG93bikge1xuICAgICAgICAgICAgc3ZnR3JhcGguY2FsbChzZWxmLnpvb21lcilcbiAgICAgICAgICAgIC5vbignbW91c2Vkb3duLnpvb20nLCBudWxsKVxuICAgICAgICAgICAgLm9uKCd0b3VjaHN0YXJ0Lnpvb20nLCBudWxsKVxuICAgICAgICAgICAgLm9uKCd0b3VjaG1vdmUuem9vbScsIG51bGwpXG4gICAgICAgICAgICAub24oJ3RvdWNoZW5kLnpvb20nLCBudWxsKTtcblxuICAgICAgICAgICAgLy9zdmdHcmFwaC5vbignem9vbScsIG51bGwpO1xuICAgICAgICAgICAgdmlzLnNlbGVjdEFsbCgnZy5nbm9kZScpXG4gICAgICAgICAgICAub24oJ21vdXNlZG93bi5kcmFnJywgbnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3RybEtleWRvd24pIHtcbiAgICAgICAgICBicnVzaC5zZWxlY3QoJy5iYWNrZ3JvdW5kJykuc3R5bGUoJ2N1cnNvcicsICdjcm9zc2hhaXInKTtcbiAgICAgICAgICBicnVzaC5jYWxsKHNlbGYuYnJ1c2hlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBrZXl1cCgpIHtcbiAgICAgICAgc2hpZnRLZXlkb3duID0gZmFsc2U7XG4gICAgICAgIGN0cmxLZXlkb3duID0gZmFsc2U7XG5cbiAgICAgICAgYnJ1c2guY2FsbChzZWxmLmJydXNoZXIpXG4gICAgICAgIC5vbignbW91c2Vkb3duLmJydXNoJywgbnVsbClcbiAgICAgICAgLm9uKCd0b3VjaHN0YXJ0LmJydXNoJywgbnVsbCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIC5vbigndG91Y2htb3ZlLmJydXNoJywgbnVsbCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAub24oJ3RvdWNoZW5kLmJydXNoJywgbnVsbCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICBicnVzaC5zZWxlY3QoJy5iYWNrZ3JvdW5kJykuc3R5bGUoJ2N1cnNvcicsICdhdXRvJyk7XG4gICAgICAgIHN2Z0dyYXBoLmNhbGwoc2VsZi56b29tZXIpO1xuXG4gICAgICAgIHZpcy5zZWxlY3RBbGwoJ2cuZ25vZGUnKVxuICAgICAgICAuY2FsbChkcmFnKTtcbiAgICB9XG5cbiAgICBkMy5zZWxlY3QoZWxlbWVudClcbiAgICAub24oJ2tleWRvd24nLCBrZXlkb3duKVxuICAgIC5vbigna2V5dXAnLCBrZXl1cClcbiAgICAub24oJ2NvbnRleHRtZW51JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkMy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpOyBcbiAgICB9KTtcblxuICAgIHZhciBsaW5rS2V5ID0gZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC51aWQ7XG4gICAgfTtcblxuICAgIHZhciBub2RlS2V5ID0gZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIga2V5ID0gZC51aWQ7XG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgfTtcblxuICAgIFxuICAgIHZhciB1cGRhdGVSbmFHcmFwaCA9IGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgdmFyIG51Y2xlb3RpZGVQb3NpdGlvbnMgPSByLmdldFBvc2l0aW9ucygnbnVjbGVvdGlkZScpO1xuICAgICAgICB2YXIgbGFiZWxQb3NpdGlvbnMgPSByLmdldFBvc2l0aW9ucygnbGFiZWwnKTtcblxuICAgICAgICB2YXIgdWlkcyA9IHIuZ2V0VWlkcygpO1xuXG4gICAgICAgIHIucmVjYWxjdWxhdGVFbGVtZW50cygpXG4gICAgICAgIC5lbGVtZW50c1RvSnNvbigpXG4gICAgICAgIC5hZGRQc2V1ZG9rbm90cygpXG4gICAgICAgIC5hZGRQb3NpdGlvbnMoJ251Y2xlb3RpZGUnLCBudWNsZW90aWRlUG9zaXRpb25zKVxuICAgICAgICAuYWRkVWlkcyh1aWRzKVxuICAgICAgICAuYWRkTGFiZWxzKDEsIHNlbGYub3B0aW9ucy5sYWJlbEludGVydmFsKVxuICAgICAgICAuYWRkUG9zaXRpb25zKCdsYWJlbCcsIGxhYmVsUG9zaXRpb25zKVxuICAgICAgICAucmVpbmZvcmNlU3RlbXMoKVxuICAgICAgICAucmVpbmZvcmNlTG9vcHMoKVxuICAgICAgICAudXBkYXRlTGlua1VpZHMoKTtcbiAgICB9O1xuXG4gICAgdmFyIHJlbW92ZUJhY2tCb25lTGluayA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgaWYgKGQudGFyZ2V0Lm51bSAtIGQuc291cmNlLm51bSAhPSAxKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRVJST1I6IG5vbiBhZGphY2VudCBub2Rlcy4gVGFyZ2V0OicsIGQudGFyZ2V0LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICdTb3VyY2U6JywgZC5zb3VyY2UsICdMaW5rOicsIGQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJuYSA9IGQudGFyZ2V0LnJuYTtcbiAgICAgICAgbGV0IHRvUmVtb3ZlID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBybmEubGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBsaW5rID0gcm5hLmxpbmtzW2ldO1xuXG4gICAgICAgICAgICBpZiAobGluay5saW5rVHlwZSAhPSAnYmFzZXBhaXInKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBpZiAobGluay5zb3VyY2UubnVtIDw9IGQuc291cmNlLm51bSAmJiBsaW5rLnRhcmdldC5udW0gPj0gZC50YXJnZXQubnVtKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Nyb3NzaW5nIGJhc2VwYWlyJywgbGluayk7IFxuICAgICAgICAgICAgICAgIHRvUmVtb3ZlLnB1c2gobGluayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIFJlbW92ZSBhbGwgYmFzZSBwYWlycyB0aGF0IGFyZSBiZXR3ZWVuIHRoZXNlIHR3byBub2RlcyBhbmQgYWRkIHRoZW0gYXMgZXh0cmFcbiAgICAgICAgLy8gbGlua3NcbiAgICAgICAgY29uc29sZS5sb2coJ3RvUmVtb3ZlOicsIHRvUmVtb3ZlKTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9SZW1vdmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJuYS5wYWlydGFibGVbdG9SZW1vdmVbaV0uc291cmNlLm51bV0gPSAwO1xuICAgICAgICAgICAgcm5hLnBhaXJ0YWJsZVt0b1JlbW92ZVtpXS50YXJnZXQubnVtXSA9IDA7XG5cbiAgICAgICAgICAgIHRvUmVtb3ZlW2ldLmZyb20gPSB0b1JlbW92ZVtpXS5zb3VyY2UubnVtO1xuICAgICAgICAgICAgdG9SZW1vdmVbaV0udG8gPSB0b1JlbW92ZVtpXS50YXJnZXQubnVtIC0gZC5zb3VyY2UubnVtO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBleHRyYWN0IHRoZSBkb3RicmFja2V0IHN0cmluZyBvZiB0aGUgcm5hXG4gICAgICAgIC8vIGN1dCBpdCBhdCB0aGUgcG9zaXRpb24gb2YgdGhpcyBiYWNrYm9uZSBib25kXG4gICAgICAgIGxldCBzZXF1ZW5jZSA9IHJuYS5zZXE7XG4gICAgICAgIGxldCBzZXF1ZW5jZTEgPSBybmEuc2VxLnNsaWNlKDAsIGQuc291cmNlLm51bSk7XG4gICAgICAgIGxldCBzZXF1ZW5jZTIgPSBybmEuc2VxLnNsaWNlKGQuc291cmNlLm51bSk7XG5cbiAgICAgICAgbGV0IHJuYURvdEJyYWNrZXQgPSBybmFVdGlsaXRpZXMucGFpcnRhYmxlVG9Eb3RicmFja2V0KHJuYS5wYWlydGFibGUpO1xuICAgICAgICBsZXQgZG90QnJhY2tldDEgPSBybmFEb3RCcmFja2V0LnNsaWNlKDAsIGQuc291cmNlLm51bSk7XG4gICAgICAgIGxldCBkb3RCcmFja2V0MiA9IHJuYURvdEJyYWNrZXQuc2xpY2UoZC5zb3VyY2UubnVtKVxuXG4gICAgICAgIC8vIGdldCB0aGUgbnVjbGVvdGlkZSBwb3NpdGlvbnNcbiAgICAgICAgLy8gY3V0IHRoZW0gYXQgdGhlIHBvc2l0aW9ucyBvZiB0aGUgYmFja2JvbmUgYm9uZFxuICAgICAgICBsZXQgcG9zaXRpb25zID0gcm5hLmdldFBvc2l0aW9ucygnbnVjbGVvdGlkZScpXG4gICAgICAgIGxldCB1aWRzID0gcm5hLmdldFVpZHMoKTtcblxuICAgICAgICBsZXQgcG9zaXRpb25zMSA9IHBvc2l0aW9ucy5zbGljZSgwLCBkLnNvdXJjZS5udW0pO1xuICAgICAgICBsZXQgcG9zaXRpb25zMiA9IHBvc2l0aW9ucy5zbGljZShkLnNvdXJjZS5udW0pO1xuXG4gICAgICAgIGxldCB1aWRzMSA9IHVpZHMuc2xpY2UoMCwgZC5zb3VyY2UubnVtKTtcbiAgICAgICAgbGV0IHVpZHMyID0gdWlkcy5zbGljZShkLnNvdXJjZS5udW0pO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdwb3NpdGlvbnMxOicsIHBvc2l0aW9uczEpO1xuICAgICAgICBjb25zb2xlLmxvZygncG9zaXRpb25zMjonLCBwb3NpdGlvbnMyKTtcblxuICAgICAgICBkZWxldGUgc2VsZi5ybmFzW3JuYS51aWRdO1xuICAgICAgICBsZXQgcm5hMSA9IHNlbGYuYWRkUk5BKGRvdEJyYWNrZXQxLCB7ICdzZXF1ZW5jZSc6IHNlcXVlbmNlMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Bvc2l0aW9ucyc6IHBvc2l0aW9uczEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aWRzJzogdWlkczEgfSk7XG4gICAgICAgIGxldCBybmEyID0gc2VsZi5hZGRSTkEoZG90QnJhY2tldDIsIHsgJ3NlcXVlbmNlJzogc2VxdWVuY2UyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncG9zaXRpb25zJzogcG9zaXRpb25zMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpZHMnOiB1aWRzMiB9KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b1JlbW92ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3JuYTE6Jywgcm5hMSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncm5hMjonLCBybmEyKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0b1JlbW92ZVtpXScsIHRvUmVtb3ZlW2ldKTtcbiAgICAgICAgICAgIHNlbGYuZXh0cmFMaW5rcy5wdXNoKFxuICAgICAgICAgICAgICAgIHsnc291cmNlJzogcm5hMS5ub2Rlc1t0b1JlbW92ZVtpXS5mcm9tLTFdLFxuICAgICAgICAgICAgICAgICAndGFyZ2V0Jzogcm5hMi5ub2Rlc1t0b1JlbW92ZVtpXS50by0xXSxcbiAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogMSxcbiAgICAgICAgICAgICAgICAgJ3VpZCc6IHNsdWdpZC5uaWNlKCksXG4gICAgICAgICAgICAgICAgICdsaW5rVHlwZSc6ICdpbnRlcm1vbGVjdWxlJ30pO1xuICAgICAgICAgICAgICAgIHNlbGYucmVjYWxjdWxhdGVHcmFwaCgpO1xuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlKCk7XG5cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygnc2VsZi5leHRyYUxpbmtzOicsIHNlbGYuZXh0cmFMaW5rcyk7XG4gICAgICAgIC8vc2VsZi5leHRyYUxpbmtzLnB1c2goeydzb3VyY2UnOiBybmExLm5vZGVzW1xuICAgICAgICBcbiAgICAgICAgLy8gY3JlYXRlIHR3byBuZXcgcm5hc1xuICAgICAgICAvLyBhZGQgdGhlaXIgcG9zaXRpb25zXG4gICAgICAgIC8vIGFkZCB0aGVtIGJhY2sgdG8gdGhlIHBsb3RcbiAgICB9XG5cbiAgICB2YXIgcmVtb3ZlTGluayA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgLy8gcmVtb3ZlIGEgbGluayBiZXR3ZWVuIHR3byBub2Rlc1xuICAgICAgICBsZXQgaW5kZXggPSBzZWxmLmdyYXBoLmxpbmtzLmluZGV4T2YoZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZW1vdmluZyBsaW5rOicsIGluZGV4KTtcblxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgLy9yZW1vdmUgYSBsaW5rXG4gICAgICAgICAgICAvL2dyYXBoLmxpbmtzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgICAgIC8vIHRoZXJlIHNob3VsZCBiZSB0d28gY2FzZXNcbiAgICAgICAgICAgIC8vIDEuIFRoZSBsaW5rIGlzIHdpdGhpbiBhIHNpbmdsZSBtb2xlY3VsZVxuXG4gICAgICAgICAgICBpZiAoZC5zb3VyY2Uucm5hID09IGQudGFyZ2V0LnJuYSkge1xuICAgICAgICAgICAgICAgIGlmIChkLmxpbmtUeXBlID09ICdiYWNrYm9uZScpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RyeWluZyB0byByZW1vdmUgYSBiYWNrYm9uZSBsaW5rJywgZC5zb3VyY2UubnVtLCBkLnRhcmdldC5udW0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUJhY2tCb25lTGluayhkKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG5cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByID0gZC5zb3VyY2Uucm5hO1xuXG4gICAgICAgICAgICAgICAgICAgIHIuYWRkUHNldWRva25vdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgci5wYWlydGFibGVbZC5zb3VyY2UubnVtXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHIucGFpcnRhYmxlW2QudGFyZ2V0Lm51bV0gPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVJuYUdyYXBoKHIpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIDIuIFRoZSBsaW5rIGlzIGJldHdlZW4gdHdvIGRpZmZlcmVudCBtb2xlY3VsZXNcbiAgICAgICAgICAgICAgICBsZXQgZXh0cmFMaW5rSW5kZXggPSBzZWxmLmV4dHJhTGlua3MuaW5kZXhPZihkKTtcblxuICAgICAgICAgICAgICAgIHNlbGYuZXh0cmFMaW5rcy5zcGxpY2UoZXh0cmFMaW5rSW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxmLnJlY2FsY3VsYXRlR3JhcGgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIHZhciBsaW5rQ2xpY2sgPSBmdW5jdGlvbihkKSB7XG4gICAgICAgIGlmICghc2hpZnRLZXlkb3duKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW52YWxpZExpbmtzID0geyAvLydiYWNrYm9uZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmYWtlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2Zha2VfZmFrZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsYWJlbF9saW5rJzogdHJ1ZX07XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2QubGlua1R5cGU6JywgZC5saW5rVHlwZSk7XG4gICAgICAgIGlmIChkLmxpbmtUeXBlIGluIGludmFsaWRMaW5rcyApIFxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHJlbW92ZUxpbmsoZCk7XG4gICAgfTtcblxuICAgIHNlbGYuZ2V0U3RydWN0dXJlc0RvdEJyYWNrZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NlbGYucm5hczonLCBzZWxmLnJuYXMpO1xuICAgICAgICBsZXQgc2VxdWVuY2UgPSBbXTtcbiAgICAgICAgbGV0IGN1cnJJZHggPSAxO1xuICAgICAgICBsZXQgbm9kZUlkeHMgPSB7fTtcbiAgICAgICAgbGV0IGJyZWFrcyA9IFtdO1xuICAgICAgICBsZXQgcGFpcnRhYmxlID0gW107XG5cbiAgICAgICAgLy8gYWRkIHRoZSBub2Rlc1xuICAgICAgICBmb3IgKGxldCB1aWQgaW4gc2VsZi5ybmFzKSB7XG4gICAgICAgICAgICBsZXQgcm5hID0gc2VsZi5ybmFzW3VpZF07XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcm5hLm5vZGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBybmEubm9kZXNbal07XG5cbiAgICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSAhPSAnbnVjbGVvdGlkZScpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25vZGU6Jywgbm9kZSk7XG4gICAgICAgICAgICAgICAgbm9kZUlkeHNbbm9kZS51aWRdID0gY3VycklkeDtcbiAgICAgICAgICAgICAgICBjdXJySWR4ICs9IDE7XG5cbiAgICAgICAgICAgICAgICBzZXF1ZW5jZS5wdXNoKG5vZGUubmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrcy5wdXNoKGN1cnJJZHgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFpcnRhYmxlID0gW2N1cnJJZHgtMV1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJySWR4OyBpKyspXG4gICAgICAgICAgICBwYWlydGFibGUucHVzaCgwKVxuXG4gICAgICAgIC8vIGFkZCB0aGUgbGlua3NcbiAgICAgICAgZm9yIChsZXQgdWlkIGluIHNlbGYucm5hcykge1xuICAgICAgICAgICAgbGV0IHJuYSA9IHNlbGYucm5hc1t1aWRdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJuYS5saW5rcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGxldCBsaW5rID0gcm5hLmxpbmtzW2pdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxpbmsubGlua1R5cGUgIT0gJ2Jhc2VwYWlyJylcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBsZXQgaWR4MSA9IG5vZGVJZHhzW2xpbmsuc291cmNlLnVpZF07XG4gICAgICAgICAgICAgICAgbGV0IGlkeDIgPSBub2RlSWR4c1tsaW5rLnRhcmdldC51aWRdO1xuICAgICAgICAgICAgICAgIHBhaXJ0YWJsZVtpZHgxXSA9IGlkeDI7XG4gICAgICAgICAgICAgICAgcGFpcnRhYmxlW2lkeDJdID0gaWR4MTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZi5leHRyYUxpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbGluayA9IHNlbGYuZXh0cmFMaW5rc1tpXTtcblxuICAgICAgICAgICAgbGV0IGlkeDEgPSBub2RlSWR4c1tsaW5rLnNvdXJjZS51aWRdO1xuICAgICAgICAgICAgbGV0IGlkeDIgPSBub2RlSWR4c1tsaW5rLnRhcmdldC51aWRdO1xuXG4gICAgICAgICAgICBwYWlydGFibGVbaWR4MV0gPSBpZHgyO1xuICAgICAgICAgICAgcGFpcnRhYmxlW2lkeDJdID0gaWR4MTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzdHJ1Y3R1cmUgPSBybmFVdGlsaXRpZXMucGFpcnRhYmxlVG9Eb3RicmFja2V0KHBhaXJ0YWJsZSkuc3BsaXQoJycpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnJlYWtzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2JyZWFrc1tpXTonLCBicmVha3NbaV0pO1xuICAgICAgICAgICAgc2VxdWVuY2Uuc3BsaWNlKGJyZWFrc1tpXSArIGkgLSAxLCAwLCAnJicpO1xuICAgICAgICAgICAgc3RydWN0dXJlLnNwbGljZShicmVha3NbaV0gKyBpIC0gMSwgMCwgJyYnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXF1ZW5jZTonLCBzZXF1ZW5jZSwgc2VxdWVuY2Uuam9pbignJykpO1xuICAgICAgICBjb25zb2xlLmxvZygnc3RydWN0dXJlOicsIHN0cnVjdHVyZSwgc3RydWN0dXJlLmpvaW4oJycpKTtcbiAgICAgICAgcmV0dXJuIFtzZXF1ZW5jZS5qb2luKCcnKSwgc3RydWN0dXJlLmpvaW4oJycpXTtcbiAgICB9O1xuXG4gICAgc2VsZi5hZGRCYWNrQm9uZUxpbmsgPSBmdW5jdGlvbihuZXdMaW5rKSB7XG4gICAgICAgIC8vIG9wcG9zaXRlIG9mIGRlbGV0aW5nIGEgbGlua1xuICAgICAgICAvLyBnZXQgdGhlIHR3byBkb3RicmFja2V0IHN0cmluZ3NcbiAgICAgICAgbGV0IHJuYTEgPSBuZXdMaW5rLnNvdXJjZS5ybmE7XG4gICAgICAgIGxldCBybmEyID0gbmV3TGluay50YXJnZXQucm5hO1xuXG4gICAgICAgIGxldCBkb3RicmFja2V0MSA9IHJuYVV0aWxpdGllcy5wYWlydGFibGVUb0RvdGJyYWNrZXQocm5hMS5wYWlydGFibGUpO1xuICAgICAgICBsZXQgZG90YnJhY2tldDIgPSBybmFVdGlsaXRpZXMucGFpcnRhYmxlVG9Eb3RicmFja2V0KHJuYTIucGFpcnRhYmxlKTtcblxuICAgICAgICBsZXQgc2VxMSA9IG5ld0xpbmsuc291cmNlLnJuYS5zZXE7XG4gICAgICAgIGxldCBzZXEyID0gbmV3TGluay50YXJnZXQucm5hLnNlcTtcblxuICAgICAgICBsZXQgcG9zaXRpb25zMSA9IHJuYTEuZ2V0UG9zaXRpb25zKCdudWNsZW90aWRlJyk7XG4gICAgICAgIGxldCBwb3NpdGlvbnMyID0gcm5hMi5nZXRQb3NpdGlvbnMoJ251Y2xlb3RpZGUnKTtcblxuICAgICAgICAvLyBjb25jYXRlbmF0ZSB0aGVtXG4gICAgICAgIGxldCBuZXdEb3RicmFja2V0ID0gZG90YnJhY2tldDEgKyBkb3RicmFja2V0MjtcbiAgICAgICAgbGV0IG5ld1NlcSA9IHNlcTEgKyBzZXEyO1xuICAgICAgICBsZXQgbmV3UG9zaXRpb25zID0gcG9zaXRpb25zMS5jb25jYXQocG9zaXRpb25zMik7XG5cbiAgICAgICAgbGV0IHRvQWRkSW50ZXJuYWwgPSBbXTtcbiAgICAgICAgbGV0IHRvQWRkRXh0ZXJuYWwgPSBbXTtcbiAgICAgICAgbGV0IHRvRGVsZXRlID0ge307XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLmV4dHJhTGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZWxmLmV4dHJhTGlua3NbaV0nLCBzZWxmLmV4dHJhTGlua3NbaV0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3JuYTE6Jywgcm5hMSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncm5hMjonLCBybmEyKTtcbiAgICAgICAgICAgIGlmIChzZWxmLmV4dHJhTGlua3NbaV0uc291cmNlLnJuYSA9PSBybmExKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBzZWxmLmV4dHJhTGlua3NbaV0udGFyZ2V0LnJuYSA9PSBybmEyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGJvdGggZW5kcyBvZiB0aGUgZXh0cmEgbGluayBhcmUgd2l0aGluIHdoYXQgd2lsbCBiZWNvbWUgdGhlIG5ldyBtb2xlY3VsZVxuICAgICAgICAgICAgICAgICAgICAvLyBuZWVkIHRvIGJlIGFkZGVkIGFzIGJhc2UgcGFpcnMgYWZ0ZXJ3YXJkc1xuICAgICAgICAgICAgICAgICAgICAvL3NlbGYuZXh0cmFMaW5rc1tpXS5mcm9tID0gc2VsZi5leHRyYUxpbmtzW2ldLnNvdXJjZS5udW07XG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZi5leHRyYUxpbmtzW2ldLnRvID0gZG90YnJhY2tldDEubGVuZ3RoICsgc2VsZi5leHRyYUxpbmtzW2ldLnRhcmdldC5udW07XG4gICAgICAgICAgICAgICAgICAgIC8vdG9BZGRJbnRlcm5hbC5wdXNoKHNlbGYuZXh0cmFMaW5rc1tpXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gb25seSBvbmUgZW5kIG9mIHRoZSBleHRyYSBsaW5rIGlzIHdpdGhpbiB3aGF0IHdpbGwgYmVjb21lIHRoZSBuZXdseVxuICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGVkIG1vbGVjdWxlLCBuZWVkcyB0byByZW1haW4gYW4gZXh0cmEgbGlua1xuICAgICAgICAgICAgICAgICAgICAvLyBzb3VyY2Ugd2lsbCBhbHdheXMgYmUgdGhlIHVuY2hhbmdlZCBtb2xlY3VsZSwgd2hlcmVhcyB0YXJnZXQgd2lsbCBiZSBcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIG5ld2x5IGNyZWF0ZWQgb25lXG4gICAgICAgICAgICAgICAgICAgIHRvQWRkRXh0ZXJuYWwucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAnc291cmNlJzogc2VsZi5leHRyYUxpbmtzW2ldLnRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICd0YXJnZXQnOiBzZWxmLmV4dHJhTGlua3NbaV0uc291cmNlLm51bVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB0b0RlbGV0ZVtzZWxmLmV4dHJhTGlua3NbaV0udWlkXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxmLmV4dHJhTGlua3NbaV0uc291cmNlLnJuYSA9PSBybmEyKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBzZWxmLmV4dHJhTGlua3NbaV0udGFyZ2V0LnJuYSA9PSBybmExKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCBpbnRlcm5hbCBsaW5rXG4gICAgICAgICAgICAgICAgICAgIC8vIGJvdGggZW5kcyBvZiB0aGUgZXh0cmEgbGluayBhcmUgd2l0aGluIHdoYXQgd2lsbCBiZWNvbWUgdGhlIG5ldyBtb2xlY3VsZVxuICAgICAgICAgICAgICAgICAgICAvLyBuZWVkIHRvIGJlIGFkZGVkIGFzIGJhc2UgcGFpcnMgYWZ0ZXJ3YXJkc1xuICAgICAgICAgICAgICAgICAgICAvL3NlbGYuZXh0cmFMaW5rc1tpXS5mcm9tID0gc2VsZi5leHRyYUxpbmtzW2ldLnRhcmdldC5udW07XG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZi5leHRyYUxpbmtzW2ldLnRvID0gZG90YnJhY2tldDEubGVuZ3RoICsgc2VsZi5leHRyYUxpbmtzW2ldLnNvdXJjZS5udW07XG5cbiAgICAgICAgICAgICAgICAgICAgLy90b0FkZEludGVybmFsLnB1c2goc2VsZi5leHRyYUxpbmtzW2ldKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0b0FkZEV4dGVybmFsLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3NvdXJjZSc6IHNlbGYuZXh0cmFMaW5rc1tpXS50YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAndGFyZ2V0Jzogc2VsZi5leHRyYUxpbmtzW2ldLnNvdXJjZS5udW0gKyBkb3RicmFja2V0MS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRvRGVsZXRlW3NlbGYuZXh0cmFMaW5rc1tpXS51aWRdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChzZWxmLmV4dHJhTGlua3NbaV0udGFyZ2V0LnJuYSA9PSBybmExKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuZXh0cmFMaW5rc1tpXS5zb3VyY2Uucm5hID09IHJuYTIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY292ZXJlZCBpbiBwcmV2aW91cyBpZiBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IG9uZSBlbmQgb2YgdGhlIGV4dHJhIGxpbmsgaXMgd2l0aGluIHdoYXQgd2lsbCBiZWNvbWUgdGhlIG5ld2x5XG4gICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZWQgbW9sZWN1bGUsIG5lZWRzIHRvIHJlbWFpbiBhbiBleHRyYSBsaW5rXG4gICAgICAgICAgICAgICAgICAgIHRvQWRkRXh0ZXJuYWwucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAnc291cmNlJzogc2VsZi5leHRyYUxpbmtzW2ldLnNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd0YXJnZXQnOiBzZWxmLmV4dHJhTGlua3NbaV0udGFyZ2V0Lm51bVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB0b0RlbGV0ZVtzZWxmLmV4dHJhTGlua3NbaV0udWlkXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxmLmV4dHJhTGlua3NbaV0udGFyZ2V0LnJuYSA9PSBybmEyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuZXh0cmFMaW5rc1tpXS5zb3VyY2Uucm5hID09IHJuYTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9BZGRFeHRlcm5hbC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdzb3VyY2UnOiBzZWxmLmV4dHJhTGlua3NbaV0uc291cmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RhcmdldCc6IHNlbGYuZXh0cmFMaW5rc1tpXS50YXJnZXQubnVtICsgZG90YnJhY2tldDEubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRvRGVsZXRlW3NlbGYuZXh0cmFMaW5rc1tpXS51aWRdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBcblxuICAgICAgICBzZWxmLmV4dHJhTGlua3MgPSBzZWxmLmV4dHJhTGlua3MuZmlsdGVyKChlKSA9PiB7IHJldHVybiAhKGUudWlkIGluIHRvRGVsZXRlKSB9KTtcblxuICAgICAgICBkZWxldGUgc2VsZi5ybmFzW3JuYTEudWlkXTtcbiAgICAgICAgZGVsZXRlIHNlbGYucm5hc1tybmEyLnVpZF07XG5cbiAgICAgICAgbGV0IG5ld1JuYSA9IG51bGw7XG4gICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBSTkFcbiAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5hcHBseUZvcmNlKVxuICAgICAgICAgICAgbmV3Um5hID0gc2VsZi5hZGRSTkEobmV3RG90YnJhY2tldCwgeyAnc2VxdWVuY2UnOiBuZXdTZXEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwb3NpdGlvbnMnOiBuZXdQb3NpdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjZW50ZXJWaWV3JzogZmFsc2V9KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgbmV3Um5hID0gc2VsZi5hZGRSTkEobmV3RG90YnJhY2tldCwgeyAnc2VxdWVuY2UnOiBuZXdTZXEsIFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NlbnRlclZpZXcnOiBmYWxzZSB9KTtcblxuXG5cbiAgICAgICAgLy8gYWRkIG5ldyBleHRlcm5hbCBsaW5rc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvQWRkRXh0ZXJuYWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHNlbGYuZXh0cmFMaW5rcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAnc291cmNlJzogdG9BZGRFeHRlcm5hbFtpXS5zb3VyY2UsXG4gICAgICAgICAgICAgICAgJ3RhcmdldCc6IG5ld1JuYS5ub2Rlc1t0b0FkZEV4dGVybmFsW2ldLnRhcmdldC0xXSxcbiAgICAgICAgICAgICAgICAndmFsdWUnOiAxLFxuICAgICAgICAgICAgICAgICd1aWQnOiBzbHVnaWQubmljZSgpLFxuICAgICAgICAgICAgICAgICdsaW5rVHlwZSc6ICdpbnRlcm1vbGVjdWxlJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLnJlY2FsY3VsYXRlR3JhcGgoKTtcbiAgICAgICAgc2VsZi51cGRhdGUoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3NlbGYuZXh0cmFMaW5rczonLCBzZWxmLmV4dHJhTGlua3MpO1xuICAgIH07XG5cbiAgICBzZWxmLmFkZExpbmsgPSAgZnVuY3Rpb24obmV3TGluaykge1xuICAgICAgICAvLyB0aGlzIG1lYW5zIHdlIGhhdmUgYSBuZXcganNvbiwgd2hpY2ggbWVhbnMgd2UgaGF2ZVxuICAgICAgICAvLyB0byByZWNhbGN1bGF0ZSB0aGUgc3RydWN0dXJlIGFuZCBjaGFuZ2UgdGhlIGNvbG9yc1xuICAgICAgICAvLyBhcHByb3ByaWF0ZWx5XG4gICAgICAgIC8vXG4gICAgICAgIGNvbnNvbGUubG9nKCdhZGRpbmcgbmV3IGxpbmsnKTtcbiAgICAgICAgaWYgKG5ld0xpbmsuc291cmNlLnJuYSA9PSBuZXdMaW5rLnRhcmdldC5ybmEpIHtcbiAgICAgICAgICAgIC8vIG11c3QgYmUgYSBiYXNlcGFpclxuICAgICAgICAgICAgbGV0IHIgPSBuZXdMaW5rLnNvdXJjZS5ybmE7XG5cbiAgICAgICAgICAgIHIucGFpcnRhYmxlW25ld0xpbmsuc291cmNlLm51bV0gPSBuZXdMaW5rLnRhcmdldC5udW07XG4gICAgICAgICAgICByLnBhaXJ0YWJsZVtuZXdMaW5rLnRhcmdldC5udW1dID0gbmV3TGluay5zb3VyY2UubnVtO1xuXG4gICAgICAgICAgICB1cGRhdGVSbmFHcmFwaChyKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9BZGQgYW4gZXh0cmEgbGlua1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ludGVybW9sZWN1bGUnKTtcbiAgICAgICAgICAgIG5ld0xpbmsubGlua1R5cGUgPSAnaW50ZXJtb2xlY3VsZSc7XG4gICAgICAgICAgICBzZWxmLmV4dHJhTGlua3MucHVzaChuZXdMaW5rKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLnJlY2FsY3VsYXRlR3JhcGgoKTtcbiAgICAgICAgc2VsZi51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgdmFyIG5vZGVNb3VzZWNsaWNrID0gZnVuY3Rpb24oZCkge1xuICAgICAgICBpZiAoZDMuZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghY3RybEtleWRvd24pIHtcbiAgICAgICAgICAgIC8vaWYgdGhlIHNoaWZ0IGtleSBpc24ndCBkb3duLCB1bnNlbGVjdCBldmVyeXRoaW5nXG4gICAgICAgICAgICB2YXIgbm9kZSA9IHZpc05vZGVzLnNlbGVjdEFsbCgnZy5nbm9kZScpLnNlbGVjdEFsbCgnLm91dGxpbmVfbm9kZScpO1xuICAgICAgICAgICAgbm9kZS5jbGFzc2VkKCdzZWxlY3RlZCcsIGZ1bmN0aW9uKHApIHsgcmV0dXJuIHAuc2VsZWN0ZWQgPSAgc2VsZi5vcHRpb25zLmFwcGx5Rm9yY2UgJiYgKHAucHJldmlvdXNseVNlbGVjdGVkID0gZmFsc2UpOyB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFsd2F5cyBzZWxlY3QgdGhpcyBub2RlXG4gICAgICAgIGQzLnNlbGVjdCh0aGlzKS5zZWxlY3QoJ2NpcmNsZScpLmNsYXNzZWQoJ3NlbGVjdGVkJywgZC5zZWxlY3RlZCA9IHNlbGYub3B0aW9ucy5hcHBseUZvcmNlICYmICFkLnByZXZpb3VzbHlTZWxlY3RlZCk7XG4gICAgICAgIGQzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH07XG5cbiAgICB2YXIgbm9kZU1vdXNldXAgPSBmdW5jdGlvbihkLGkpIHtcbiAgICAgICAgbGV0IGJhY2tib25lUG9zc2libGUgPSB0cnVlLCBiYXNlcGFpclBvc3NpYmxlID0gdHJ1ZTtcblxuICAgICAgICBpZiAobW91c2Vkb3duTm9kZSkge1xuICAgICAgICAgICAgbW91c2V1cE5vZGUgPSBkO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgbm9kZSBpc24ndCBhIG51Y2xlb3RpZGUsIHdlIGNhbid0IGNyZWF0ZSBhIGxpbmtcbiAgICAgICAgICAgIGlmIChtb3VzZXVwTm9kZS5ub2RlVHlwZSA9PSAnbWlkZGxlJyB8fCBtb3VzZWRvd25Ob2RlLm5vZGVUeXBlID09ICdtaWRkbGUnIHx8IG1vdXNldXBOb2RlLm5vZGVUeXBlID09ICdsYWJlbCcgfHwgbW91c2Vkb3duTm9kZS5ub2RlVHlwZSA9PSAnbGFiZWwnKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKG1vdXNldXBOb2RlID09IG1vdXNlZG93bk5vZGUpIHsgcmVzZXRNb3VzZVZhcnMoKTsgcmV0dXJuOyB9XG4gICAgICAgICAgICB2YXIgbmV3TGluayA9IHtzb3VyY2U6IG1vdXNlZG93bk5vZGUsIHRhcmdldDogbW91c2V1cE5vZGUsIGxpbmtUeXBlOiAnYmFzZXBhaXInLCB2YWx1ZTogMSwgdWlkOiBzbHVnaWQubmljZSgpfTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLmdyYXBoLmxpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKChzZWxmLmdyYXBoLmxpbmtzW2ldLnNvdXJjZSA9PSBtb3VzZWRvd25Ob2RlKSAgfHwgXG4gICAgICAgICAgICAgICAgICAgIChzZWxmLmdyYXBoLmxpbmtzW2ldLnRhcmdldCA9PSBtb3VzZWRvd25Ob2RlKSB8fFxuICAgICAgICAgICAgICAgICAgICAoc2VsZi5ncmFwaC5saW5rc1tpXS5zb3VyY2UgPT0gbW91c2V1cE5vZGUpIHx8XG4gICAgICAgICAgICAgICAgICAgIChzZWxmLmdyYXBoLmxpbmtzW2ldLnRhcmdldCA9PSBtb3VzZXVwTm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZWl0aGVyIG9uZSBvZiB0aGUgbm9kZXMgaXMgYWxyZWFkeSBpbiBhIGxpbmtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBhbnkgb2YgdGhlIG5vZGVzIGFyZSBhbHJlYWR5IGludm9sdmVkIGluIGEgYmFzZXBhaXIgb3IgYSBwc2V1ZG9rbm90XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZW4gd2UgY2FuJ3QgbWFrZSBhIGJhc2VwYWlyIGxpbmtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuZ3JhcGgubGlua3NbaV0ubGlua1R5cGUgPT0gJ2Jhc2VwYWlyJyB8fCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZ3JhcGgubGlua3NbaV0ubGlua1R5cGUgPT0gJ3BzZXVkb2tub3QnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdyYXBoLmxpbmtzW2ldLmxpbmtUeXBlID09ICdpbnRlcm1vbGVjdWxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWx0aG91Z2ggc2hvdWxkIGJlIGFibGUgdG8gbWFrZSBhIGJhY2tib25lIGxpbmtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBiYXNlcGFpciBwb3NzaWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZXBhaXJQb3NzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCgoc2VsZi5ncmFwaC5saW5rc1tpXS5zb3VyY2UgPT0gbW91c2V1cE5vZGUpICAmJiBcbiAgICAgICAgICAgICAgICAgICAgIChzZWxmLmdyYXBoLmxpbmtzW2ldLnRhcmdldCA9PSBtb3VzZWRvd25Ob2RlKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAoKHNlbGYuZ3JhcGgubGlua3NbaV0uc291cmNlID09IG1vdXNlZG93bk5vZGUpICAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKHNlbGYuZ3JhcGgubGlua3NbaV0udGFyZ2V0ID09IG1vdXNldXBOb2RlKSkpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiB3ZSdyZSB0cnlpbmcgdG8gbWFrZSBhIGxpbmsgYmV0d2VlbiB0d28gbm9kZXMgd2hpY2ggYWxyZWFkeSBoYXZlXG4gICAgICAgICAgICAgICAgICAgIC8vIGEgYmFja2JvbmUgYmV0d2VlbiB0aGVtLCB0aGVuIHdlIGNhbid0IG1ha2UgYSBsaW5rXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmdyYXBoLmxpbmtzW2ldLmxpbmtUeXBlID09ICdiYWNrYm9uZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZiAobmV3TGluay5zb3VyY2Uucm5hICE9IG5ld0xpbmsudGFyZ2V0LnJuYSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb3VsZCBiZSBlaXRoZXIgYSBiYWNrYm9uZSBsaW5rIG9yIGFuIGludGVybW9sZWN1bGUgbGlua1xuXG4gICAgICAgICAgICAgICAgaWYgKChuZXdMaW5rLnNvdXJjZS5udW0gPT0gMSAmJiBcbiAgICAgICAgICAgICAgICAgICAgIG5ld0xpbmsudGFyZ2V0Lm51bSA9PSBuZXdMaW5rLnRhcmdldC5ybmEucm5hTGVuZ3RoKSB8fFxuICAgICAgICAgICAgICAgICAgICAgKG5ld0xpbmsudGFyZ2V0Lm51bSA9PSAxICYmXG4gICAgICAgICAgICAgICAgICAgICAgbmV3TGluay5zb3VyY2UubnVtID09IG5ld0xpbmsuc291cmNlLnJuYS5ybmFMZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaW5rTWVudSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0JhY2tib25lIExpbmsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtDb250ZXh0TWVudVNob3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJdGVtICMxIGNsaWNrZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUaGUgZGF0YSBmb3IgdGhpcyBjaXJjbGUgaXM6ICcgKyBkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ0xpbmUuYXR0cignY2xhc3MnLCAnZHJhZ19saW5lX2hpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkZEJhY2tCb25lTGluayhuZXdMaW5rKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSAvLyBvcHRpb25hbCwgZGVmYXVsdHMgdG8gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdCYXNlcGFpciBMaW5rJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rQ29udGV4dE1lbnVTaG93biA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnWW91IGhhdmUgY2xpY2tlZCB0aGUgc2Vjb25kIGl0ZW0hJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUaGUgZGF0YSBmb3IgdGhpcyBjaXJjbGUgaXM6ICcgKyBkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ0xpbmUuYXR0cignY2xhc3MnLCAnZHJhZ19saW5lX2hpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkZExpbmsobmV3TGluayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtDb250ZXh0TWVudVNob3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmtDb250ZXh0TWVudSA9IGNvbnRleHRNZW51KGxpbmtNZW51KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25ld0xpbmtNZW51Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtDb250ZXh0TWVudS5hcHBseSh0aGlzLCBbZCxpLHRydWUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7IGRyYWdMaW5lLmF0dHIoJ2NsYXNzJywgJ2RyYWdfbGluZV9oaWRkZW4nKSB9XSk7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmV0d2VlbiBlbmQgcG9pbnRzIGJ1dCBjYW4ndCBtYWtlIGEgYmFja2JvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VwYWlyUG9zc2libGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGRMaW5rKG5ld0xpbmspO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGJhc2VwYWlyUG9zc2libGUpXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYWRkTGluayhuZXdMaW5rKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBub2RlTW91c2Vkb3duID0gZnVuY3Rpb24oZCkge1xuICAgICAgaWYgKCFkLnNlbGVjdGVkICYmICFjdHJsS2V5ZG93bikge1xuICAgICAgICAgIC8vIGlmIHRoaXMgbm9kZSBpc24ndCBzZWxlY3RlZCwgdGhlbiB3ZSBoYXZlIHRvIHVuc2VsZWN0IGV2ZXJ5IG90aGVyIG5vZGVcbiAgICAgICAgICAgIHZhciBub2RlID0gdmlzTm9kZXMuc2VsZWN0QWxsKCdnLmdub2RlJykuc2VsZWN0QWxsKCcub3V0bGluZV9ub2RlJyk7XG4gICAgICAgICAgICBub2RlLmNsYXNzZWQoJ3NlbGVjdGVkJywgZnVuY3Rpb24ocCkgeyByZXR1cm4gcC5zZWxlY3RlZCA9ICBwLnByZXZpb3VzbHlTZWxlY3RlZCA9IGZhbHNlOyB9KVxuICAgICAgICAgIH1cblxuXG4gICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNsYXNzZWQoJ3NlbGVjdGVkJywgZnVuY3Rpb24ocCkgeyBkLnByZXZpb3VzbHlTZWxlY3RlZCA9IGQuc2VsZWN0ZWQ7IHJldHVybiBkLnNlbGVjdGVkID0gc2VsZi5vcHRpb25zLmFwcGx5Rm9yY2UgJiYgdHJ1ZTsgfSk7XG5cbiAgICAgICAgaWYgKCFzaGlmdEtleWRvd24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG1vdXNlZG93bk5vZGUgPSBkO1xuXG4gICAgICAgIGRyYWdMaW5lXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdkcmFnX2xpbmUnKVxuICAgICAgICAuYXR0cigneDEnLCBtb3VzZWRvd25Ob2RlLngpXG4gICAgICAgIC5hdHRyKCd5MScsIG1vdXNlZG93bk5vZGUueSlcbiAgICAgICAgLmF0dHIoJ3gyJywgbW91c2Vkb3duTm9kZS54KVxuICAgICAgICAuYXR0cigneTInLCBtb3VzZWRvd25Ob2RlLnkpO1xuXG4gICAgICAgIC8vZ25vZGVzLmF0dHIoJ3BvaW50ZXItZXZlbnRzJywgICdub25lJyk7XG5cbiAgICB9O1xuXG4gICAgc2VsZi5zdGFydEFuaW1hdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5hbmltYXRpb24gPSB0cnVlO1xuICAgICAgdmlzLnNlbGVjdEFsbCgnZy5nbm9kZScpXG4gICAgICAgIC5jYWxsKGRyYWcpO1xuICAgICAgc2VsZi5mb3JjZS5zdGFydCgpO1xuICAgIH07XG4gICAgXG4gICAgc2VsZi5zdG9wQW5pbWF0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLmFuaW1hdGlvbiA9IGZhbHNlO1xuICAgICAgdmlzLnNlbGVjdEFsbCgnZy5nbm9kZScpXG4gICAgICAgICAgIC5vbignbW91c2Vkb3duLmRyYWcnLCBudWxsKTtcbiAgICAgIHNlbGYuZm9yY2Uuc3RvcCgpO1xuICAgIH07XG4gICAgXG4gICAgc2VsZi5zZXRGcmljdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBzZWxmLmZvcmNlLmZyaWN0aW9uKHZhbHVlKTtcbiAgICAgIHNlbGYucmVzdW1lRm9yY2UoKTtcbiAgICB9O1xuXG4gICAgc2VsZi5zZXRDaGFyZ2UgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgc2VsZi5mb3JjZS5jaGFyZ2UodmFsdWUpO1xuICAgICAgc2VsZi5yZXN1bWVGb3JjZSgpO1xuICAgIH07XG4gICAgXG4gICAgc2VsZi5zZXRHcmF2aXR5ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHNlbGYuZm9yY2UuZ3Jhdml0eSh2YWx1ZSk7XG4gICAgICBzZWxmLnJlc3VtZUZvcmNlKCk7XG4gICAgfTtcbiAgICBcbiAgICBzZWxmLnNldFBzZXVkb2tub3RTdHJlbmd0aCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBzZWxmLmxpbmtTdHJlbmd0aHMucHNldWRva25vdCA9IHZhbHVlO1xuICAgICAgc2VsZi51cGRhdGUoKTtcbiAgICB9O1xuICAgIFxuICAgIHNlbGYuZGlzcGxheUJhY2tncm91bmQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgc2VsZi5kaXNwbGF5UGFyYW1ldGVycy5kaXNwbGF5QmFja2dyb3VuZCA9IHZhbHVlO1xuICAgICAgc2VsZi51cGRhdGVTdHlsZSgpO1xuICAgIH07XG4gICAgXG4gICAgc2VsZi5kaXNwbGF5TnVtYmVyaW5nID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHNlbGYuZGlzcGxheVBhcmFtZXRlcnMuZGlzcGxheU51bWJlcmluZyA9IHZhbHVlO1xuICAgICAgc2VsZi51cGRhdGVTdHlsZSgpO1xuICAgIH07XG5cbiAgICBzZWxmLmRpc3BsYXlOb2RlT3V0bGluZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBzZWxmLmRpc3BsYXlQYXJhbWV0ZXJzLmRpc3BsYXlOb2RlT3V0bGluZSA9IHZhbHVlO1xuICAgICAgc2VsZi51cGRhdGVTdHlsZSgpO1xuICAgIH07XG4gICAgXG4gICAgc2VsZi5kaXNwbGF5Tm9kZUxhYmVsID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHNlbGYuZGlzcGxheVBhcmFtZXRlcnMuZGlzcGxheU5vZGVMYWJlbCA9IHZhbHVlO1xuICAgICAgc2VsZi51cGRhdGVTdHlsZSgpO1xuICAgIH07XG4gICAgXG4gICAgc2VsZi5kaXNwbGF5TGlua3MgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgc2VsZi5kaXNwbGF5UGFyYW1ldGVycy5kaXNwbGF5TGlua3MgPSB2YWx1ZTtcbiAgICAgIHNlbGYudXBkYXRlU3R5bGUoKTtcbiAgICB9O1xuXG4gICAgc2VsZi5kaXNwbGF5UHNldWRva25vdExpbmtzID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHNlbGYuZGlzcGxheVBhcmFtZXRlcnMuZGlzcGxheVBzZXVkb2tub3RMaW5rcyA9IHZhbHVlO1xuICAgICAgc2VsZi51cGRhdGVTdHlsZSgpO1xuICAgIH07XG5cbiAgICBzZWxmLmRpc3BsYXlQcm90ZWluTGlua3MgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgc2VsZi5kaXNwbGF5UGFyYW1ldGVycy5kaXNwbGF5UHJvdGVpbkxpbmtzID0gdmFsdWU7XG4gICAgICBzZWxmLnVwZGF0ZVN0eWxlKCk7XG4gICAgfTtcbiAgICBcbiAgICBzZWxmLnVwZGF0ZVN0eWxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIEJhY2tncm91bmRcbiAgICAgICAgLy9yZWN0LmNsYXNzZWQoJ3RyYW5zcGFyZW50JywgIXNlbGYuZGlzcGxheVBhcmFtZXRlcnMuZGlzcGxheUJhY2tncm91bmQpO1xuICAgICAgICAvLyBOdW1iZXJpbmdcbiAgICAgICAgdmlzTm9kZXMuc2VsZWN0QWxsKCdbbm9kZV90eXBlPWxhYmVsXScpLmNsYXNzZWQoJ3RyYW5zcGFyZW50JywgIXNlbGYuZGlzcGxheVBhcmFtZXRlcnMuZGlzcGxheU51bWJlcmluZyk7XG4gICAgICAgIHZpc05vZGVzLnNlbGVjdEFsbCgnW2xhYmVsX3R5cGU9bGFiZWxdJykuY2xhc3NlZCgndHJhbnNwYXJlbnQnLCAhc2VsZi5kaXNwbGF5UGFyYW1ldGVycy5kaXNwbGF5TnVtYmVyaW5nKTtcbiAgICAgICAgdmlzTGlua3Muc2VsZWN0QWxsKCdbbGlua1R5cGU9bGFiZWxfbGlua10nKS5jbGFzc2VkKCd0cmFuc3BhcmVudCcsICFzZWxmLmRpc3BsYXlQYXJhbWV0ZXJzLmRpc3BsYXlOdW1iZXJpbmcpO1xuICAgICAgICAvLyBOb2RlIE91dGxpbmVcbiAgICAgICAgc3ZnLnNlbGVjdEFsbCgnY2lyY2xlJykuY2xhc3NlZCgnaGlkZGVuX291dGxpbmUnLCAhc2VsZi5kaXNwbGF5UGFyYW1ldGVycy5kaXNwbGF5Tm9kZU91dGxpbmUpO1xuICAgICAgICAvLyBOb2RlIExhYmVsc1xuICAgICAgICB2aXNOb2Rlcy5zZWxlY3RBbGwoJ1tsYWJlbF90eXBlPW51Y2xlb3RpZGVdJykuY2xhc3NlZCgndHJhbnNwYXJlbnQnLCAhc2VsZi5kaXNwbGF5UGFyYW1ldGVycy5kaXNwbGF5Tm9kZUxhYmVsKTtcbiAgICAgICAgLy8gTGlua3NcbiAgICAgICAgc3ZnLnNlbGVjdEFsbCgnW2xpbmtfdHlwZT1yZWFsXSxbbGlua190eXBlPWJhc2VwYWlyXSxbbGlua190eXBlPWJhY2tib25lXSxbbGlua190eXBlPXBzZXVkb2tub3RdLFtsaW5rX3R5cGU9cHJvdGVpbl9jaGFpbl0sW2xpbmtfdHlwZT1jaGFpbl9jaGFpbl0sW2xpbmtfdHlwZT1leHRlcm5hbF0nKS5jbGFzc2VkKCd0cmFuc3BhcmVudCcsICFzZWxmLmRpc3BsYXlQYXJhbWV0ZXJzLmRpc3BsYXlMaW5rcyk7XG4gICAgICAgIC8vIFBzZXVkb2tub3QgTGlua3NcbiAgICAgICAgc3ZnLnNlbGVjdEFsbCgnW2xpbmtfdHlwZT1wc2V1ZG9rbm90XScpLmNsYXNzZWQoJ3RyYW5zcGFyZW50JywgIXNlbGYuZGlzcGxheVBhcmFtZXRlcnMuZGlzcGxheVBzZXVkb2tub3RMaW5rcyk7XG4gICAgICAgIC8vIFByb3RlaW4gTGlua3NcbiAgICAgICAgc3ZnLnNlbGVjdEFsbCgnW2xpbmtfdHlwZT1wcm90ZWluX2NoYWluXScpLmNsYXNzZWQoJ3RyYW5zcGFyZW50JywgIXNlbGYuZGlzcGxheVBhcmFtZXRlcnMuZGlzcGxheVByb3RlaW5MaW5rcyk7XG4gICAgICAgIC8vIEZha2UgTGlua3NcbiAgICAgICAgdmlzTGlua3Muc2VsZWN0QWxsKCdbbGlua190eXBlPWZha2VdJykuY2xhc3NlZCgndHJhbnNwYXJlbnQnLCAhc2VsZi5vcHRpb25zLmRpc3BsYXlBbGxMaW5rcyk7XG4gICAgICAgIHZpc0xpbmtzLnNlbGVjdEFsbCgnW2xpbmtfdHlwZT1mYWtlX2Zha2VdJykuY2xhc3NlZCgndHJhbnNwYXJlbnQnLCAhc2VsZi5vcHRpb25zLmRpc3BsYXlBbGxMaW5rcyk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG51ZGdlKGR4LCBkeSkge1xuICAgICAgICBub2RlLmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkLnNlbGVjdGVkOyB9KVxuICAgICAgICAuYXR0cignY3gnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnggKz0gZHg7IH0pXG4gICAgICAgIC5hdHRyKCdjeScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQueSArPSBkeTsgfSk7XG5cbiAgICAgICAgbGluay5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zb3VyY2Uuc2VsZWN0ZWQ7IH0pXG4gICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuc291cmNlLng7IH0pXG4gICAgICAgIC5hdHRyKCd5MScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuc291cmNlLnk7IH0pO1xuXG4gICAgICAgIGxpbmsuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudGFyZ2V0LnNlbGVjdGVkOyB9KVxuICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnRhcmdldC54OyB9KVxuICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnRhcmdldC55OyB9KTtcblxuICAgICAgICBkMy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHNlbGYuY3JlYXRlTmV3TGlua3MgPSBmdW5jdGlvbihsaW5rc0VudGVyKSB7XG4gICAgICAgIHZhciBsaW5rTGluZXMgPSBsaW5rc0VudGVyLmFwcGVuZCgnc3ZnOmxpbmUnKTtcblxuICAgICAgICBsaW5rTGluZXMuYXBwZW5kKCdzdmc6dGl0bGUnKVxuICAgICAgICAudGV4dChsaW5rS2V5KTtcblxuICAgICAgICBsaW5rTGluZXNcbiAgICAgICAgLmNsYXNzZWQoJ2xpbmsnLCB0cnVlKVxuICAgICAgICAuYXR0cigneDEnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnNvdXJjZS54OyB9KVxuICAgICAgICAuYXR0cigneTEnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnNvdXJjZS55OyB9KVxuICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnRhcmdldC54OyB9KVxuICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnRhcmdldC55OyB9KVxuICAgICAgICAuYXR0cignbGlua190eXBlJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5saW5rVHlwZTsgfSApXG4gICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdjbGFzcycpICsgJyAnICsgZC5saW5rVHlwZTsgfSlcbiAgICAgICAgLmF0dHIoJ3BvaW50ZXItZXZlbnRzJywgZnVuY3Rpb24oZCkgeyBpZiAoZC5saW5rVHlwZSA9PSAnZmFrZScpIHJldHVybiAnbm9uZSc7IGVsc2UgcmV0dXJuICdhbGwnO30pO1xuXG4gICAgICAgIC8qIFdlIGRvbid0IG5lZWQgdG8gdXBkYXRlIHRoZSBwb3NpdGlvbnMgb2YgdGhlIHN0YWJpbGl6aW5nIGxpbmtzICovXG4gICAgICAgIC8qXG4gICAgICAgIGJhc2VwYWlyTGlua3MgPSB2aXNMaW5rcy5zZWxlY3RBbGwoJ1tsaW5rX3R5cGU9YmFzZXBhaXJdJyk7XG4gICAgICAgIGJhc2VwYWlyTGlua3MuY2xhc3NlZCgnYmFzZXBhaXInLCB0cnVlKTtcblxuICAgICAgICBmYWtlTGlua3MgPSB2aXNMaW5rcy5zZWxlY3RBbGwoJ1tsaW5rX3R5cGU9ZmFrZV0nKVxuICAgICAgICBmYWtlTGlua3MuY2xhc3NlZCgnZmFrZScsIHRydWUpO1xuXG4gICAgICAgIGludGVybW9sZWN1bGVfbGlua3MgPSB2aXNfbGlua3Muc2VsZWN0QWxsKCdbbGlua190eXBlPWludGVybW9sZWN1bGVdJyk7XG4gICAgICAgIGludGVybW9sZWN1bGVfbGlua3MuY2xhc3NlZCgnaW50ZXJtb2xlY3VsZScsIHRydWUpO1xuXG4gICAgICAgIHBsaW5rID0gdmlzX2xpbmtzLnNlbGVjdEFsbCgnW2xpbmtfdHlwZT1wcm90ZWluX2NoYWluXSxbbGlua190eXBlPWNoYWluX2NoYWluXScpO1xuICAgICAgICBwbGluay5jbGFzc2VkKCdjaGFpbl9jaGFpbicsIHRydWUpO1xuICAgICAgICAqL1xuXG4gICAgICAgcmV0dXJuIGxpbmtMaW5lcztcbiAgICB9O1xuXG4gICAgc2VsZi5jcmVhdGVOZXdOb2RlcyA9IGZ1bmN0aW9uKGdub2Rlc0VudGVyKSB7XG4gICAgICAgIGdub2Rlc0VudGVyID0gZ25vZGVzRW50ZXIuYXBwZW5kKCdnJylcbiAgICAgICAgLmNsYXNzZWQoJ25vc2VsZWN0JywgdHJ1ZSlcbiAgICAgICAgLmNsYXNzZWQoJ2dub2RlJywgdHJ1ZSlcbiAgICAgICAgLmF0dHIoJ3N0cnVjdF9uYW1lJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zdHJ1Y3ROYW1lOyB9KVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkgeyBcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZC54ICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkLnkgIT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIFtkLngsIGQueV0gKyAnKSc7IFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfSlcbiAgICAgICAgLmVhY2goIGZ1bmN0aW9uKGQpIHsgZC5zZWxlY3RlZCA9IGQucHJldmlvdXNseVNlbGVjdGVkID0gZmFsc2U7IH0pO1xuXG4gICAgICAgIGdub2Rlc0VudGVyXG4gICAgICAgIC5jYWxsKGRyYWcpXG4gICAgICAgIC5vbignbW91c2Vkb3duJywgbm9kZU1vdXNlZG93bilcbiAgICAgICAgLm9uKCdtb3VzZWRyYWcnLCBmdW5jdGlvbihkKSB7fSlcbiAgICAgICAgLm9uKCdtb3VzZXVwJywgbm9kZU1vdXNldXApXG4gICAgICAgIC5hdHRyKCdudW0nLCBmdW5jdGlvbihkKSB7IHJldHVybiAnbicgKyBkLm51bTsgfSlcbiAgICAgICAgLmF0dHIoJ3JudW0nLCBmdW5jdGlvbihkKSB7IFxuICAgICAgICAgICAgcmV0dXJuICduJyArIChkLnJuYS5ybmFMZW5ndGggLSBkLm51bSArIDEpOyB9KVxuICAgICAgICAub24oJ2NsaWNrJywgbm9kZU1vdXNlY2xpY2spXG4gICAgICAgIC5vbignY29udGV4dG1lbnUnLCBzZWxmLm5vZGVDb250ZXh0TWVudSlcbiAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAuZHVyYXRpb24oNzUwKVxuICAgICAgICAuZWFzZSgnZWxhc3RpYycpO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBub2RlcyBiZWhpbmQgdGhlIGNpcmNsZXMgd2hpY2ggd2lsbCBzZXJ2ZSB0byBoaWdobGlnaHQgdGhlbVxuICAgICAgICB2YXIgbGFiZWxBbmRQcm90ZWluTm9kZXMgPSBnbm9kZXNFbnRlci5maWx0ZXIoZnVuY3Rpb24oZCkgeyBcbiAgICAgICAgICAgIHJldHVybiBkLm5vZGVUeXBlID09ICdsYWJlbCcgfHwgZC5ub2RlVHlwZSA9PSAncHJvdGVpbic7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBudWNsZW90aWRlTm9kZXMgPSBnbm9kZXNFbnRlci5maWx0ZXIoZnVuY3Rpb24oZCkgeyBcbiAgICAgICAgICAgIHJldHVybiBkLm5vZGVUeXBlID09ICdudWNsZW90aWRlJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGFiZWxBbmRQcm90ZWluTm9kZXMuYXBwZW5kKCdzdmc6Y2lyY2xlJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ291dGxpbmVfbm9kZScpXG4gICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5yYWRpdXMrMTsgfSk7XG5cbiAgICAgICAgbnVjbGVvdGlkZU5vZGVzLmFwcGVuZCgnc3ZnOmNpcmNsZScpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdvdXRsaW5lX25vZGUnKVxuICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQucmFkaXVzKzE7IH0pO1xuXG4gICAgICAgIGxhYmVsQW5kUHJvdGVpbk5vZGVzLmFwcGVuZCgnc3ZnOmNpcmNsZScpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdub2RlJylcbiAgICAgICAgLmNsYXNzZWQoJ2xhYmVsJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5ub2RlVHlwZSA9PSAnbGFiZWwnOyB9KVxuICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uKGQpIHsgXG4gICAgICAgICAgICBpZiAoZC5ub2RlVHlwZSA9PSAnbWlkZGxlJykgcmV0dXJuIDA7IFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQucmFkaXVzOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ25vZGVfdHlwZScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQubm9kZVR5cGU7IH0pXG4gICAgICAgIC5hdHRyKCdub2RlX251bScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQubnVtOyB9KTtcblxuICAgICAgICBudWNsZW90aWRlTm9kZXMuYXBwZW5kKCdzdmc6Y2lyY2xlJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ25vZGUnKVxuICAgICAgICAuYXR0cignbm9kZV90eXBlJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5ub2RlVHlwZTsgfSlcbiAgICAgICAgLmF0dHIoJ25vZGVfbnVtJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5udW07IH0pXG4gICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5yYWRpdXM7IH0pXG4gICAgICAgIC5hcHBlbmQoJ3N2Zzp0aXRsZScpXG4gICAgICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHsgXG4gICAgICAgICAgICBpZiAoZC5ub2RlVHlwZSA9PSAnbnVjbGVvdGlkZScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zdHJ1Y3ROYW1lICsgJzonICsgZC5udW07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbnVjbGVvdGlkZU5vZGVzLmFwcGVuZCgnc3ZnOnBhdGgnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbm9kZScpXG4gICAgICAgIC5hdHRyKCdub2RlX3R5cGUnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLm5vZGVUeXBlOyB9KVxuICAgICAgICAuYXR0cignbm9kZV9udW0nLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLm51bTsgfSlcbiAgICAgICAgLmFwcGVuZCgnc3ZnOnRpdGxlJylcbiAgICAgICAgLnRleHQoZnVuY3Rpb24oZCkgeyBcbiAgICAgICAgICAgIGlmIChkLm5vZGVUeXBlID09ICdudWNsZW90aWRlJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0cnVjdE5hbWUgKyAnOicgKyBkLm51bTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgICAgIHZhciBsYWJlbHNFbnRlciA9IGdub2Rlc0VudGVyLmFwcGVuZCgndGV4dCcpXG4gICAgICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQubmFtZTsgfSlcbiAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgIC5hdHRyKCdmb250LXNpemUnLCA4LjApXG4gICAgICAgIC5hdHRyKCdmb250LXdlaWdodCcsICdib2xkJylcbiAgICAgICAgLmF0dHIoJ3knLCAyLjUpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdub2RlLWxhYmVsJylcbiAgICAgICAgLmF0dHIoJ2xhYmVsX3R5cGUnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLm5vZGVUeXBlOyB9KVxuXG4gICAgICAgIC8qXG4gICAgICAgIGxhYmVsc0VudGVyLnRleHQoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIGQubnVtO1xuICAgICAgICB9KTtcbiAgICAgICAgKi9cblxuICAgICAgICBsYWJlbHNFbnRlci5hcHBlbmQoJ3N2Zzp0aXRsZScpXG4gICAgICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHsgXG4gICAgICAgICAgICBpZiAoZC5ub2RlVHlwZSA9PSAnbnVjbGVvdGlkZScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zdHJ1Y3ROYW1lICsgJzonICsgZC5udW07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgICAgICByZXR1cm4gZ25vZGVzRW50ZXI7XG4gICAgfTtcblxuICAgIHZhciBub2RlVG9vbHRpcCA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgbm9kZVRvb2x0aXBzID0ge307XG5cbiAgICAgICAgbm9kZVRvb2x0aXBzLm51Y2xlb3RpZGUgPSBkLm51bTtcbiAgICAgICAgbm9kZVRvb2x0aXBzLmxhYmVsID0gJyc7XG4gICAgICAgIG5vZGVUb29sdGlwcy5wc2V1ZG8gPSAnJztcbiAgICAgICAgbm9kZVRvb2x0aXBzLm1pZGRsZSA9ICcnO1xuICAgICAgICBub2RlVG9vbHRpcHMucHJvdGVpbiA9IGQuc3RydWN0TmFtZTtcblxuICAgICAgICByZXR1cm4gbm9kZVRvb2x0aXBzW2Qubm9kZVR5cGVdO1xuICAgIH07XG5cbiAgICBzZWxmLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5mb3JjZS5ub2RlcyhzZWxmLmdyYXBoLm5vZGVzKVxuICAgICAgICAubGlua3Moc2VsZi5ncmFwaC5saW5rcyk7XG4gICAgICAgIFxuICAgICAgICBpZiAoc2VsZi5hbmltYXRpb24pIHtcbiAgICAgICAgICBzZWxmLmZvcmNlLnN0YXJ0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWxsTGlua3MgPSB2aXNMaW5rcy5zZWxlY3RBbGwoJ2xpbmUubGluaycpIFxuICAgICAgICAuZGF0YShzZWxmLmdyYXBoLmxpbmtzLmZpbHRlcihyZWFsTGlua0ZpbHRlciksIGxpbmtLZXkpO1xuXG4gICAgICAgIGFsbExpbmtzLmF0dHIoJ2NsYXNzJywgJycpXG4gICAgICAgIC5jbGFzc2VkKCdsaW5rJywgdHJ1ZSlcbiAgICAgICAgLmF0dHIoJ2xpbmtfdHlwZScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQubGlua1R5cGU7IH0gKVxuICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkMy5zZWxlY3QodGhpcykuYXR0cignY2xhc3MnKSArICcgJyArIGQubGlua1R5cGU7IH0pO1xuXG4gICAgICAgIHZhciBsaW5rc0VudGVyID0gYWxsTGlua3MuZW50ZXIoKTtcbiAgICAgICAgc2VsZi5jcmVhdGVOZXdMaW5rcyhsaW5rc0VudGVyKTtcblxuICAgICAgICBhbGxMaW5rcy5leGl0KCkucmVtb3ZlKCk7XG5cblxuICAgICAgICB2YXIgZG9tYWluID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDldO1xuICAgICAgICB2YXIgY29sb3JzID0gZDMuc2NhbGUuY2F0ZWdvcnkxMCgpLmRvbWFpbihkb21haW4pO1xuXG4gICAgICAgICAgICB2YXIgZ25vZGVzID0gdmlzTm9kZXMuc2VsZWN0QWxsKCdnLmdub2RlJylcbiAgICAgICAgICAgIC5kYXRhKHNlbGYuZ3JhcGgubm9kZXMsIG5vZGVLZXkpO1xuICAgICAgICAgICAgLy8uYXR0cigncG9pbnRlci1ldmVudHMnLCAnYWxsJyk7XG5cbiAgICAgICAgICAgIHZhciBnbm9kZXNFbnRlciA9IGdub2Rlcy5lbnRlcigpO1xuXG4gICAgICAgICAgICBzZWxmLmNyZWF0ZU5ld05vZGVzKGdub2Rlc0VudGVyKTtcbiAgICAgICAgICAgIGdub2Rlcy5leGl0KCkucmVtb3ZlKCk7XG5cblxuICAgICAgICAgICAgLy9mYWtlX25vZGVzID0gc2VsZi5ncmFwaC5ub2Rlcy5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5ub2RlVHlwZSA9PSAnbWlkZGxlJzsgfSk7XG4gICAgICAgICAgICAvL2Zha2VOb2RlcyA9IHNlbGYuZ3JhcGgubm9kZXMuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHRydWU7IH0pO1xuICAgICAgICAgICAgdmFyIHJlYWxOb2RlcyA9IHNlbGYuZ3JhcGgubm9kZXMuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQubm9kZVR5cGUgPT0gJ251Y2xlb3RpZGUnIHx8IGQubm9kZVR5cGUgPT0gJ2xhYmVsJzt9KTtcblxuICAgICAgICAgICAgdmFyIHhsaW5rO1xuICAgICAgICAgICAgaWYgKHNlbGYuZGlzcGxheUZha2VMaW5rcylcbiAgICAgICAgICAgICAgICB4bGluayA9IGFsbExpbmtzO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHhsaW5rID0gdmlzTGlua3Muc2VsZWN0QWxsKCdbbGlua190eXBlPXJlYWxdLFtsaW5rX3R5cGU9cHNldWRva25vdF0sW2xpbmtfdHlwZT1wcm90ZWluX2NoYWluXSxbbGlua190eXBlPWNoYWluX2NoYWluXSxbbGlua190eXBlPWxhYmVsX2xpbmtdLFtsaW5rX3R5cGU9YmFja2JvbmVdLFtsaW5rX3R5cGU9YmFzZXBhaXJdLFtsaW5rX3R5cGU9aW50ZXJtb2xlY3VsZV0sW2xpbmtfdHlwZT1leHRlcm5hbF0nKTtcblxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uO1xuXG4gICAgICAgICAgICBnbm9kZXMuc2VsZWN0QWxsKCdwYXRoJylcbiAgICAgICAgICAgIC5lYWNoKHBvc2l0aW9uQW55Tm9kZSk7XG5cbiAgICAgICAgICAgIHhsaW5rLm9uKCdjbGljaycsIGxpbmtDbGljayk7XG5cbiAgICAgICAgICAgIHNlbGYuZm9yY2Uub24oJ3RpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgcSA9IGQzLmdlb20ucXVhZHRyZWUocmVhbE5vZGVzKTtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIG4gPSByZWFsTm9kZXMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgd2hpbGUgKCsraSA8IG4pIHEudmlzaXQoY29sbGlkZShyZWFsTm9kZXNbaV0pKTtcblxuICAgICAgICAgICAgICAgIHhsaW5rLmF0dHIoJ3gxJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zb3VyY2UueDsgfSlcbiAgICAgICAgICAgICAgICAuYXR0cigneTEnLCBmdW5jdGlvbihkKSB7ICByZXR1cm4gZC5zb3VyY2UueTsgfSlcbiAgICAgICAgICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnRhcmdldC54OyB9KVxuICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudGFyZ2V0Lnk7IH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gVHJhbnNsYXRlIHRoZSBncm91cHNcbiAgICAgICAgICAgICAgICBnbm9kZXMuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkgeyBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIFtkLngsIGQueV0gKyAnKSc7IFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZ25vZGVzLnNlbGVjdCgncGF0aCcpXG4gICAgICAgICAgICAgICAgLmVhY2gocG9zaXRpb25BbnlOb2RlKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNlbGYuZm9yY2Uub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBnbm9kZXMuc2VsZWN0QWxsKCdbbm9kZV90eXBlPW51Y2xlb3RpZGVdJylcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChkLGkpID0+IHsgaWYgKGkgPT0gMCkgcmV0dXJuIHRydWU7IGVsc2UgcmV0dXJuIGZhbHNlOyB9KVxuICAgICAgICAgICAgICAgIC5lYWNoKChkLGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInBvc1wiLCBkLm51bSwgZC54LCBkLnkpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdWlkIGluIHNlbGYucm5hcykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNlbGYucm5hc1t1aWRdLnBhaXJ0YWJsZVswXTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdwdCcsIGksIHNlbGYucm5hc1t1aWRdLnBhaXJ0YWJsZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIHNlbGYuY2hhbmdlQ29sb3JTY2hlbWUoc2VsZi5jb2xvclNjaGVtZSk7XG5cbiAgICAgICAgaWYgKHNlbGYuYW5pbWF0aW9uKSB7XG4gICAgICAgICAgc2VsZi5mb3JjZS5zdGFydCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzZWxmLnVwZGF0ZVN0eWxlKCk7XG4gICAgfTtcbiAgICBcbiAgICBzZWxmLnNldFNpemUoKTtcbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKiogRU5EIEZPUk5BRiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuIiwiZXhwb3J0IHtGb3JuYUNvbnRhaW5lcn0gZnJvbSAnLi9mb3JuYWMuanMnO1xuZXhwb3J0IHtybmFQbG90fSBmcm9tICcuL3JuYXBsb3QuanMnO1xuZXhwb3J0IHtybmFUcmVlbWFwfSBmcm9tICcuL3JuYXRyZWVtYXAuanMnO1xuXG4vL2V4cG9ydCB7Uk5BVXRpbGl0aWVzLCBDb2xvclNjaGVtZX0gZnJvbSAnLi9ybmF1dGlscy5qcyc7XG4vL2V4cG9ydCB7UHJvdGVpbkdyYXBoLCBSTkFHcmFwaCwgbW9sZWN1bGVzVG9Kc29ufSBmcm9tICcuL3JuYWdyYXBoLmpzJztcbi8vZXhwb3J0IHtzaW1wbGVYeUNvb3JkaW5hdGVzfSBmcm9tICcuL3NpbXBsZXJuYXBsb3QuanMnOyIsImltcG9ydCB7UmVnaW9ufSBmcm9tICcuL3JlZ2lvbi5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBCYXNlKCkge1xuXHR0aGlzLm1hdGUgPSBudWxsO1xuXHR0aGlzLnggPSBudWxsO1xuICAgIHRoaXMueSA9IG51bGw7XG5cdHRoaXMuZXh0cmFjdGVkID0gbnVsbDtcblx0dGhpcy5yZWdpb24gPSBuZXcgUmVnaW9uKCk7XG59XG5cbkJhc2UucHJvdG90eXBlLmdldE1hdGUgPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5tYXRlO1xufVxuXG5CYXNlLnByb3RvdHlwZS5zZXRNYXRlID0gZnVuY3Rpb24obWF0ZSl7XG5cdHRoaXMubWF0ZSA9IG1hdGU7XG59XG5cbkJhc2UucHJvdG90eXBlLmdldFggPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy54O1xufVxuXG5CYXNlLnByb3RvdHlwZS5zZXRYID0gZnVuY3Rpb24oeCl7XG5cdHRoaXMueCA9IHg7XG59XG5cbkJhc2UucHJvdG90eXBlLmdldFkgPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy55O1xufVxuXG5CYXNlLnByb3RvdHlwZS5zZXRZID0gZnVuY3Rpb24oeSl7XG5cdHRoaXMueSA9IHk7XG59XG5cbkJhc2UucHJvdG90eXBlLmlzRXh0cmFjdGVkID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMuZXh0cmFjdGVkO1xufVxuXG5CYXNlLnByb3RvdHlwZS5zZXRFeHRyYWN0ZWQgPSBmdW5jdGlvbihleHRyYWN0ZWQpe1xuXHR0aGlzLmV4dHJhY3RlZCA9IGV4dHJhY3RlZDtcbn1cblxuQmFzZS5wcm90b3R5cGUuZ2V0UmVnaW9uID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMucmVnaW9uO1xufVxuXG5CYXNlLnByb3RvdHlwZS5zZXRSZWdpb24gPSBmdW5jdGlvbihyZWdpb24pe1xuXHR0aGlzLnJlZ2lvbiA9IHJlZ2lvbjtcbn1cbiIsImltcG9ydCB7TG9vcH0gZnJvbSAnLi9sb29wLmpzJztcbmltcG9ydCB7UmVnaW9ufSBmcm9tICcuL3JlZ2lvbi5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBDb25uZWN0aW9uKCkge1xuXHR0aGlzLmxvb3AgPSBuZXcgTG9vcCgpO1xuXHR0aGlzLnJlZ2lvbiA9IG5ldyBSZWdpb24oKTtcblx0Ly8gU3RhcnQgYW5kIGVuZCBmb3JtIHRoZSAxc3QgYmFzZSBwYWlyIG9mIHRoZSByZWdpb24uXG5cdHRoaXMuc3RhcnQgPSBudWxsO1xuICAgIHRoaXMuZW5kID0gbnVsbDtcblx0dGhpcy54cmFkID0gbnVsbDtcbiAgICB0aGlzLnlyYWQgPSBudWxsO1xuICAgIHRoaXMuYW5nbGUgPSBudWxsO1xuXHQvLyBUcnVlIGlmIHNlZ21lbnQgYmV0d2VlbiB0aGlzIGNvbm5lY3Rpb24gYW5kIHRoZVxuXHQvLyBuZXh0IG11c3QgYmUgZXh0cnVkZWQgb3V0IG9mIHRoZSBjaXJjbGVcblx0dGhpcy5leHRydWRlZCA9IG51bGw7XG5cdC8vIFRydWUgaWYgdGhlIGV4dHJ1ZGVkIHNlZ21lbnQgbXVzdCBiZSBkcmF3biBsb25nLlxuXHR0aGlzLmJyb2tlbiA9IG51bGw7XG5cblx0dGhpcy5faXNOdWxsID0gZmFsc2U7XG59XG5cbkNvbm5lY3Rpb24ucHJvdG90eXBlLmlzTnVsbCA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLl9pc051bGw7XG59XG5cbkNvbm5lY3Rpb24ucHJvdG90eXBlLnNldE51bGwgPSBmdW5jdGlvbihpc051bGwpe1xuXHR0aGlzLl9pc051bGwgPSBpc051bGw7XG59XG5cbkNvbm5lY3Rpb24ucHJvdG90eXBlLmdldExvb3AgPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5sb29wO1xufVxuXG5Db25uZWN0aW9uLnByb3RvdHlwZS5zZXRMb29wID0gZnVuY3Rpb24obG9vcCkge1xuXHR0aGlzLmxvb3AgPSBsb29wO1xufVxuXG5Db25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZWdpb24gPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5yZWdpb247XG59XG5cbkNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlZ2lvbiA9IGZ1bmN0aW9uKHJlZ2lvbil7XG5cdHRoaXMucmVnaW9uID0gcmVnaW9uO1xufVxuXG5Db25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGFydCA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLnN0YXJ0O1xufVxuXG5Db25uZWN0aW9uLnByb3RvdHlwZS5zZXRTdGFydCA9IGZ1bmN0aW9uKHN0YXJ0KSB7XG5cdHRoaXMuc3RhcnQgPSBzdGFydDtcbn1cblxuQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0RW5kID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMuZW5kO1xufVxuXG5Db25uZWN0aW9uLnByb3RvdHlwZS5zZXRFbmQgPSBmdW5jdGlvbihlbmQpe1xuXHR0aGlzLmVuZCA9IGVuZDtcbn1cblxuQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0WHJhZCA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLnhyYWQ7XG59XG5cbkNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFhyYWQgPSBmdW5jdGlvbih4cmFkKXtcblx0dGhpcy54cmFkID0geHJhZDtcbn1cblxuQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0WXJhZCA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLnlyYWQ7XG59XG5cbkNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFlyYWQgPSBmdW5jdGlvbih5cmFkKSB7XG5cdHRoaXMueXJhZCA9IHlyYWQ7XG59XG5cbkNvbm5lY3Rpb24ucHJvdG90eXBlLmdldEFuZ2xlID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMuYW5nbGU7XG59XG5cbkNvbm5lY3Rpb24ucHJvdG90eXBlLnNldEFuZ2xlID0gZnVuY3Rpb24oYW5nbGUpe1xuXHR0aGlzLmFuZ2xlID0gYW5nbGU7XG59XG5cbkNvbm5lY3Rpb24ucHJvdG90eXBlLmlzRXh0cnVkZWQgPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5leHRydWRlZDtcbn1cblxuQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0RXh0cnVkZWQgPSBmdW5jdGlvbihleHRydWRlZCl7XG5cdHRoaXMuZXh0cnVkZWQgPSBleHRydWRlZDtcbn1cblxuQ29ubmVjdGlvbi5wcm90b3R5cGUuaXNCcm9rZW4gPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5icm9rZW47XG59XG5cbkNvbm5lY3Rpb24ucHJvdG90eXBlLnNldEJyb2tlbiA9IGZ1bmN0aW9uKGJyb2tlbil7XG5cdHRoaXMuYnJva2VuID0gYnJva2VuO1xufVxuIiwiaW1wb3J0IHtDb25uZWN0aW9ufSBmcm9tICcuL2Nvbm5lY3Rpb24uanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gTG9vcCgpIHtcblx0dGhpcy5uY29ubmVjdGlvbiA9IG51bGw7XG5cdHRoaXMuY29ubmVjdGlvbnMgPSBbXTtcblx0dGhpcy5fY29ubmVjdGlvbnMgPSBbXTtcblx0dGhpcy5udW1iZXIgPSBudWxsO1xuXHR0aGlzLmRlcHRoID0gbnVsbDtcblx0dGhpcy5tYXJrID0gbnVsbDtcblx0dGhpcy54ID0gbnVsbDtcbiAgICB0aGlzLnkgPSBudWxsO1xuICAgIHRoaXMucmFkaXVzID0gbnVsbDtcbn1cblxuTG9vcC5wcm90b3R5cGUuZ2V0TmNvbm5lY3Rpb24gPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMubmNvbm5lY3Rpb247XG59XG5cbkxvb3AucHJvdG90eXBlLnNldE5jb25uZWN0aW9uID0gZnVuY3Rpb24obmNvbm5lY3Rpb24pIHtcblx0dGhpcy5uY29ubmVjdGlvbiA9IG5jb25uZWN0aW9uO1xufVxuXG5Mb29wLnByb3RvdHlwZS5zZXRDb25uZWN0aW9uID0gZnVuY3Rpb24oaSwgYyl7XG5cdGlmIChjICE9IG51bGwpe1xuXHRcdHRoaXMuX2Nvbm5lY3Rpb25zW2ldID0gYztcbiAgICB9XG5cdGVsc2Uge1xuXHRcdGlmICghdGhpcy5fY29ubmVjdGlvbnNbaV0pe1xuXHRcdFx0dGhpcy5fY29ubmVjdGlvbnNbaV0gPSBuZXcgQ29ubmVjdGlvbigpO1xuXHRcdH1cblx0XHR0aGlzLl9jb25uZWN0aW9uc1tpXS5zZXROdWxsKHRydWUpO1xuXHR9XG59XG5cbkxvb3AucHJvdG90eXBlLmdldENvbm5lY3Rpb24gPSBmdW5jdGlvbihpKXtcblx0dmFyIENvbm5lY3Rpb24gPSByZXF1aXJlKFwiLi9jb25uZWN0aW9uXCIpO1xuXHRpZiAoIXRoaXMuX2Nvbm5lY3Rpb25zW2ldKXtcbiAgICAgICAgdGhpcy5fY29ubmVjdGlvbnNbaV0gPSBuZXcgQ29ubmVjdGlvbigpO1xuICAgIH1cblx0dmFyIGMgPSB0aGlzLl9jb25uZWN0aW9uc1tpXTtcblx0aWYgKGMuaXNOdWxsKCkpe1xuXHRcdHJldHVybiBudWxsO1xuICAgIH1cblx0ZWxzZSB7XG5cdFx0cmV0dXJuIGM7XG4gICAgfVxufVxuXG5Mb29wLnByb3RvdHlwZS5hZGRDb25uZWN0aW9uID0gZnVuY3Rpb24oaSwgYyl7XG5cdHRoaXMuX2Nvbm5lY3Rpb25zLnB1c2goYyk7XG59XG5cbkxvb3AucHJvdG90eXBlLmdldE51bWJlciA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLm51bWJlcjtcbn1cblxuTG9vcC5wcm90b3R5cGUuc2V0TnVtYmVyID0gZnVuY3Rpb24obnVtYmVyKXtcblx0dGhpcy5udW1iZXIgPSBudW1iZXI7XG59XG5cbkxvb3AucHJvdG90eXBlLmdldERlcHRoID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMuZGVwdGg7XG59XG5cbkxvb3AucHJvdG90eXBlLnNldERlcHRoID0gZnVuY3Rpb24oZGVwdGgpe1xuXHR0aGlzLmRlcHRoID0gZGVwdGg7XG59XG5cbkxvb3AucHJvdG90eXBlLmlzTWFyayA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLm1hcms7XG59XG5cbkxvb3AucHJvdG90eXBlLnNldE1hcmsgPSBmdW5jdGlvbihtYXJrKXtcblx0dGhpcy5tYXJrID0gbWFyaztcbn1cblxuTG9vcC5wcm90b3R5cGUuZ2V0WCA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLng7XG59XG5cbkxvb3AucHJvdG90eXBlLnNldFggPSBmdW5jdGlvbih4KXtcblx0dGhpcy54ID0geDtcbn1cblxuTG9vcC5wcm90b3R5cGUuZ2V0WSA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLnk7XG59XG5cbkxvb3AucHJvdG90eXBlLnNldFkgPSBmdW5jdGlvbih5KXtcblx0dGhpcy55ID0geTtcbn1cblxuTG9vcC5wcm90b3R5cGUuZ2V0UmFkaXVzID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMucmFkaXVzO1xufVxuXG5Mb29wLnByb3RvdHlwZS5zZXRSYWRpdXMgPSBmdW5jdGlvbihyYWRpdXMpe1xuXHR0aGlzLnJhZGl1cyA9IHJhZGl1cztcbn1cbiIsImltcG9ydCB7UmFkbG9vcH0gZnJvbSAnLi9yYWRsb29wLmpzJztcbmltcG9ydCB7Q29ubmVjdGlvbn0gZnJvbSAnLi9jb25uZWN0aW9uLmpzJztcbmltcG9ydCB7UmVnaW9ufSBmcm9tICcuL3JlZ2lvbi5qcyc7XG5pbXBvcnQge0Jhc2V9IGZyb20gJy4vYmFzZS5qcyc7XG5pbXBvcnQge0xvb3B9IGZyb20gJy4vbG9vcC5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBOQVZpZXcoKXtcbiAgICB0aGlzLkFOVU0gPSA5OTk5LjA7XG5cdHRoaXMuTUFYSVRFUiA9IDUwMDtcblxuXHR0aGlzLmJhc2VzID0gW107XG5cdHRoaXMubmJhc2UgPSBudWxsO1xuICAgIHRoaXMubnJlZ2lvbiA9IG51bGw7XG4gICAgdGhpcy5sb29wX2NvdW50ID0gbnVsbDtcblxuXHR0aGlzLnJvb3QgPSBuZXcgTG9vcCgpO1xuXHR0aGlzLmxvb3BzID0gW107XG5cblx0dGhpcy5yZWdpb25zID0gW107XG5cblx0dGhpcy5ybHBoZWFkID0gbmV3IFJhZGxvb3AoKTtcblxuXHR0aGlzLmxlbmN1dCA9IDAuODtcblx0dGhpcy5SQURJVVNfUkVEVUNUSU9OX0ZBQ1RPUiA9IDEuNDtcblxuXHQvLyBzaG93IGFsZ29yaXRobSBzdGVwIGJ5IHN0ZXBcblx0dGhpcy5hbmdsZWluYyA9IG51bGw7XG5cblx0dGhpcy5faCA9IG51bGw7XG5cblx0Ly8gcHJpdmF0ZSBib29sZWFuIG5vSXRlcmF0aW9uRmFpbHVyZVlldCA9IHRydWU7XG5cblx0dGhpcy5IRUxJWF9GQUNUT1IgPSAwLjY7XG5cdHRoaXMuQkFDS0JPTkVfRElTVEFOQ0UgPSAyNztcbn1cblxuTkFWaWV3LnByb3RvdHlwZS5uYXZpZXdfeHlfY29vcmRpbmF0ZXMgPSBmdW5jdGlvbihwYWlyX3RhYmxlKXtcbiAgICB2YXIgeCA9IFtdO1xuXHR2YXIgeSA9IFtdO1xuICAgIGlmIChwYWlyX3RhYmxlLmxlbmd0aCA9PT0gMCB8fCBwYWlyX3RhYmxlWzBdID09PSAwKXtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHZhciBpO1xuICAgIHRoaXMubmJhc2UgPSBwYWlyX3RhYmxlWzBdO1xuICAgIHRoaXMuYmFzZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5uYmFzZSArIDE7IGluZGV4Kyspe1xuICAgICAgICB0aGlzLmJhc2VzLnB1c2gobmV3IEJhc2UoKSk7XG4gICAgfVxuICAgIHRoaXMucmVnaW9ucyA9IFtdO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLm5iYXNlICsgMTsgaW5kZXgrKyl7XG4gICAgICAgIHRoaXMucmVnaW9ucy5wdXNoKG5ldyBSZWdpb24oKSk7XG4gICAgfVxuICAgIHRoaXMucmVhZF9pbl9iYXNlcyhwYWlyX3RhYmxlKTtcbiAgICB0aGlzLnJscGhlYWQgPSBudWxsO1xuICAgIHRoaXMuZmluZF9yZWdpb25zKCk7XG4gICAgdGhpcy5sb29wX2NvdW50ID0gMDtcbiAgICB0aGlzLmxvb3BzID0gW107XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubmJhc2UgKyAxOyBpbmRleCsrKXtcbiAgICAgICAgdGhpcy5sb29wcy5wdXNoKG5ldyBMb29wKCkpO1xuICAgIH1cbiAgICB0aGlzLmNvbnN0cnVjdF9sb29wKDApO1xuICAgIHRoaXMuZmluZF9jZW50cmFsX2xvb3AoKTtcbiAgICB0aGlzLnRyYXZlcnNlX2xvb3AodGhpcy5yb290LCBudWxsKTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLm5iYXNlOyBpKyspe1xuICAgICAgICB4LnB1c2goMTAwICsgdGhpcy5CQUNLQk9ORV9ESVNUQU5DRSAqIHRoaXMuYmFzZXNbaSArIDFdLmdldFgoKSk7XG4gICAgICAgIHkucHVzaCgxMDAgKyB0aGlzLkJBQ0tCT05FX0RJU1RBTkNFICogdGhpcy5iYXNlc1tpICsgMV0uZ2V0WSgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBuYmFzZTogdGhpcy5uYmFzZSxcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeVxuICAgIH1cbn1cblxuTkFWaWV3LnByb3RvdHlwZS5yZWFkX2luX2Jhc2VzID0gZnVuY3Rpb24gcmVhZF9pbl9iYXNlcyhwYWlyX3RhYmxlKXtcbiAgICB2YXIgaSA9IG51bGw7XG4gICAgdmFyIG5wYWlycyA9IG51bGw7XG5cbiAgICAvLyBTZXQgdXAgYW4gb3JpZ2luLlxuICAgIHRoaXMuYmFzZXMucHVzaChuZXcgQmFzZSgpKTtcbiAgICB0aGlzLmJhc2VzWzBdLnNldE1hdGUoMCk7XG4gICAgdGhpcy5iYXNlc1swXS5zZXRFeHRyYWN0ZWQoZmFsc2UpO1xuICAgIHRoaXMuYmFzZXNbMF0uc2V0WCh0aGlzLkFOVU0pO1xuICAgIHRoaXMuYmFzZXNbMF0uc2V0WSh0aGlzLkFOVU0pO1xuXG4gICAgZm9yIChucGFpcnMgPSAwLCBpID0gMTsgaSA8PSB0aGlzLm5iYXNlOyBpKyspe1xuICAgICAgICB0aGlzLmJhc2VzLnB1c2gobmV3IEJhc2UoKSk7XG4gICAgICAgIHRoaXMuYmFzZXNbaV0uc2V0RXh0cmFjdGVkKGZhbHNlKTtcbiAgICAgICAgdGhpcy5iYXNlc1tpXS5zZXRYKHRoaXMuQU5VTSk7XG4gICAgICAgIHRoaXMuYmFzZXNbaV0uc2V0WSh0aGlzLkFOVU0pO1xuICAgICAgICB0aGlzLmJhc2VzW2ldLnNldE1hdGUocGFpcl90YWJsZVtpXSk7XG4gICAgICAgIGlmIChwYWlyX3RhYmxlW2ldID4gaSlcbiAgICAgICAgICAgIG5wYWlycysrO1xuICAgIH1cbiAgICAvLyBtdXN0IGhhdmUgYXQgbGVhc3QgMSBwYWlyIHRvIGF2b2lkIHNlZ2ZhdWx0XG4gICAgaWYgKG5wYWlycyA9PSAwKXtcbiAgICAgICAgdGhpcy5iYXNlc1sxXS5zZXRNYXRlKHRoaXMubmJhc2UpO1xuICAgICAgICB0aGlzLmJhc2VzW3RoaXMubmJhc2VdLnNldE1hdGUoMSk7XG4gICAgfVxufVxuXG5OQVZpZXcucHJvdG90eXBlLmZpbmRfcmVnaW9ucyA9IGZ1bmN0aW9uIGZpbmRfcmVnaW9ucygpe1xuICAgIHZhciBpID0gbnVsbDtcbiAgICB2YXIgbWF0ZSA9IG51bGw7XG4gICAgdmFyIG5iMSA9IG51bGw7XG5cbiAgICBuYjEgPSB0aGlzLm5iYXNlICsgMTtcbiAgICB2YXIgbWFyayA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCBuYjE7IGkrKyl7XG4gICAgICAgIG1hcmsucHVzaChmYWxzZSk7XG4gICAgfVxuICAgIHRoaXMubnJlZ2lvbiA9IDA7XG4gICAgZm9yIChpID0gMDsgaSA8PSB0aGlzLm5iYXNlOyBpKyspIHtcbiAgICAgICAgaWYgKChtYXRlID0gdGhpcy5iYXNlc1tpXS5nZXRNYXRlKCkpICE9IDAgJiYgIW1hcmtbaV0pIHtcbiAgICAgICAgICAgIHRoaXMucmVnaW9uc1t0aGlzLm5yZWdpb25dLnNldFN0YXJ0MShpKTtcbiAgICAgICAgICAgIHRoaXMucmVnaW9uc1t0aGlzLm5yZWdpb25dLnNldEVuZDIobWF0ZSk7XG4gICAgICAgICAgICBtYXJrW2ldID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hcmtbbWF0ZV0gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5iYXNlc1tpXS5zZXRSZWdpb24odGhpcy5yZWdpb25zW3RoaXMubnJlZ2lvbl0pO1xuICAgICAgICAgICAgdGhpcy5iYXNlc1ttYXRlXS5zZXRSZWdpb24odGhpcy5yZWdpb25zW3RoaXMubnJlZ2lvbl0pO1xuICAgICAgICAgICAgZm9yIChpKyssIG1hdGUtLTsgaSA8IG1hdGUgJiYgdGhpcy5iYXNlc1tpXS5nZXRNYXRlKCkgPT0gbWF0ZTsgaSsrLCBtYXRlLS0pIHtcbiAgICAgICAgICAgICAgICBtYXJrW21hdGVdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBtYXJrW2ldPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbaV0uc2V0UmVnaW9uKHRoaXMucmVnaW9uc1t0aGlzLm5yZWdpb25dKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW21hdGVdLnNldFJlZ2lvbih0aGlzLnJlZ2lvbnNbdGhpcy5ucmVnaW9uXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlZ2lvbnNbdGhpcy5ucmVnaW9uXS5zZXRFbmQxKC0taSk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lvbnNbdGhpcy5ucmVnaW9uXS5zZXRTdGFydDIobWF0ZSArIDEpO1xuXG4gICAgICAgICAgICB0aGlzLm5yZWdpb24rKztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuTkFWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RfbG9vcCA9IGZ1bmN0aW9uIGNvbnN0cnVjdF9sb29wKGliYXNlKXtcbiAgICB2YXIgaSA9IG51bGw7XG4gICAgdmFyIG1hdGUgPSBudWxsO1xuICAgIHZhciByZXRsb29wID0gbmV3IExvb3AoKTtcbiAgICB2YXIgbHAgPSBuZXcgTG9vcCgpO1xuICAgIHZhciBjcCA9IG5ldyBDb25uZWN0aW9uKCk7XG4gICAgdmFyIHJwID0gbmV3IFJlZ2lvbigpO1xuICAgIHZhciBybHAgPSBuZXcgUmFkbG9vcCgpO1xuICAgIHJldGxvb3AgPSB0aGlzLmxvb3BzW3RoaXMubG9vcF9jb3VudCsrXTtcbiAgICByZXRsb29wLnNldE5jb25uZWN0aW9uKDApO1xuICAgIHJldGxvb3Auc2V0RGVwdGgoMCk7XG4gICAgcmV0bG9vcC5zZXROdW1iZXIodGhpcy5sb29wX2NvdW50KTtcbiAgICByZXRsb29wLnNldFJhZGl1cygwLjApO1xuXG4gICAgZm9yIChybHAgPSB0aGlzLnJscGhlYWQ7IHJscCAhPSBudWxsOyBybHAgPSBybHAuZ2V0TmV4dCgpKVxuICAgICAgICBpZiAocmxwLmdldExvb3BudW1iZXIoKSA9PSB0aGlzLmxvb3BfY291bnQpXG4gICAgICAgICAgICByZXRsb29wLnNldFJhZGl1cyhybHAuZ2V0UmFkaXVzKCkpO1xuICAgIGkgPSBpYmFzZTtcbiAgICBkbyB7XG4gICAgICAgIGlmICgobWF0ZSA9IHRoaXMuYmFzZXNbaV0uZ2V0TWF0ZSgpKSAhPSAwKSB7XG4gICAgICAgICAgICBycCA9IHRoaXMuYmFzZXNbaV0uZ2V0UmVnaW9uKCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuYmFzZXNbcnAuZ2V0U3RhcnQxKCldLmlzRXh0cmFjdGVkKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSBycC5nZXRTdGFydDEoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW3JwLmdldFN0YXJ0MSgpXS5zZXRFeHRyYWN0ZWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbcnAuZ2V0RW5kMSgpXS5zZXRFeHRyYWN0ZWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbcnAuZ2V0U3RhcnQyKCldLnNldEV4dHJhY3RlZCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tycC5nZXRFbmQyKCldLnNldEV4dHJhY3RlZCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgbHAgPSB0aGlzLmNvbnN0cnVjdF9sb29wKHJwLmdldEVuZDEoKSA8IHRoaXMubmJhc2UgPyBycC5nZXRFbmQxKCkgKyAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT0gcnAuZ2V0U3RhcnQyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tycC5nZXRTdGFydDIoKV0uc2V0RXh0cmFjdGVkKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW3JwLmdldEVuZDIoKV0uc2V0RXh0cmFjdGVkKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW3JwLmdldFN0YXJ0MSgpXS5zZXRFeHRyYWN0ZWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbcnAuZ2V0RW5kMSgpXS5zZXRFeHRyYWN0ZWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGxwID0gdGhpcy5jb25zdHJ1Y3RfbG9vcChycC5nZXRFbmQyKCkgPCB0aGlzLm5iYXNlID8gcnAuZ2V0RW5kMigpICsgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTb21ldGhpbmcgd2VudCB0ZXJyaWJseSB3cm9uZyAuLi4uXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXRsb29wLnNldE5jb25uZWN0aW9uKHJldGxvb3AuZ2V0TmNvbm5lY3Rpb24oKSArIDEpO1xuICAgICAgICAgICAgICAgIGNwID0gbmV3IENvbm5lY3Rpb24oKTtcbiAgICAgICAgICAgICAgICByZXRsb29wLnNldENvbm5lY3Rpb24ocmV0bG9vcC5nZXROY29ubmVjdGlvbigpIC0gMSxcdGNwKTtcbiAgICAgICAgICAgICAgICByZXRsb29wLnNldENvbm5lY3Rpb24ocmV0bG9vcC5nZXROY29ubmVjdGlvbigpLCBudWxsKTtcbiAgICAgICAgICAgICAgICBjcC5zZXRMb29wKGxwKTtcbiAgICAgICAgICAgICAgICBjcC5zZXRSZWdpb24ocnApO1xuICAgICAgICAgICAgICAgIGlmKGkgPT0gcnAuZ2V0U3RhcnQxKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3Auc2V0U3RhcnQocnAuZ2V0U3RhcnQxKCkpO1xuICAgICAgICAgICAgICAgICAgICBjcC5zZXRFbmQocnAuZ2V0RW5kMigpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjcC5zZXRTdGFydChycC5nZXRTdGFydDIoKSk7XG4gICAgICAgICAgICAgICAgICAgIGNwLnNldEVuZChycC5nZXRFbmQxKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjcC5zZXRFeHRydWRlZChmYWxzZSk7XG4gICAgICAgICAgICAgICAgY3Auc2V0QnJva2VuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBscC5zZXROY29ubmVjdGlvbihscC5nZXROY29ubmVjdGlvbigpICsgMSk7XG4gICAgICAgICAgICAgICAgY3AgPSBuZXcgQ29ubmVjdGlvbigpO1xuICAgICAgICAgICAgICAgIGxwLnNldENvbm5lY3Rpb24obHAuZ2V0TmNvbm5lY3Rpb24oKSAtIDEsIGNwKTtcbiAgICAgICAgICAgICAgICBscC5zZXRDb25uZWN0aW9uKGxwLmdldE5jb25uZWN0aW9uKCksIG51bGwpO1xuICAgICAgICAgICAgICAgIGNwLnNldExvb3AocmV0bG9vcCk7XG4gICAgICAgICAgICAgICAgY3Auc2V0UmVnaW9uKHJwKTtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSBycC5nZXRTdGFydDEoKSkge1xuICAgICAgICAgICAgICAgICAgICBjcC5zZXRTdGFydChycC5nZXRTdGFydDIoKSk7XG4gICAgICAgICAgICAgICAgICAgIGNwLnNldEVuZChycC5nZXRFbmQxKCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNwLnNldFN0YXJ0KHJwLmdldFN0YXJ0MSgpKTtcbiAgICAgICAgICAgICAgICAgICAgY3Auc2V0RW5kKHJwLmdldEVuZDIoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNwLnNldEV4dHJ1ZGVkKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBjcC5zZXRCcm9rZW4oZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSA9IG1hdGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCsraSA+IHRoaXMubmJhc2UpXG4gICAgICAgICAgICBpID0gMDtcbiAgICB9IHdoaWxlIChpICE9IGliYXNlKTtcbiAgICByZXR1cm4gcmV0bG9vcDtcbn1cblxuTkFWaWV3LnByb3RvdHlwZS5maW5kX2NlbnRyYWxfbG9vcCA9IGZ1bmN0aW9uIGZpbmRfY2VudHJhbF9sb29wKCl7XG4gICAgdmFyIGxwID0gbmV3IExvb3AoKTtcbiAgICB2YXIgbWF4Y29ubiA9IG51bGw7XG4gICAgdmFyIG1heGRlcHRoID0gbnVsbDtcbiAgICB2YXIgaSA9IG51bGw7XG5cbiAgICBkZXRlcm1pbmVfZGVwdGhzLmJpbmQodGhpcykoKTtcbiAgICBtYXhjb25uID0gMDtcbiAgICBtYXhkZXB0aCA9IC0xO1xuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxvb3BfY291bnQ7IGkrKykge1xuICAgICAgICBscCA9IHRoaXMubG9vcHNbaV07XG4gICAgICAgIGlmIChscC5nZXROY29ubmVjdGlvbigpID4gbWF4Y29ubikge1xuICAgICAgICAgICAgbWF4ZGVwdGggPSBscC5nZXREZXB0aCgpO1xuICAgICAgICAgICAgbWF4Y29ubiA9IGxwLmdldE5jb25uZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLnJvb3QgPSBscDtcbiAgICAgICAgfSBlbHNlIGlmIChscC5nZXREZXB0aCgpID4gbWF4ZGVwdGhcbiAgICAgICAgICAgICAgICAmJiBscC5nZXROY29ubmVjdGlvbigpID09IG1heGNvbm4pIHtcbiAgICAgICAgICAgIG1heGRlcHRoID0gbHAuZ2V0RGVwdGgoKTtcbiAgICAgICAgICAgIHRoaXMucm9vdCA9IGxwO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZXRlcm1pbmVfZGVwdGhzKCkge1xuICAgIHZhciBscCA9IG5ldyBMb29wKCk7XG4gICAgdmFyIGkgPSBudWxsO1xuICAgIHZhciBqID0gbnVsbDtcblxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxvb3BfY291bnQ7IGkrKykge1xuICAgICAgICBscCA9IHRoaXMubG9vcHNbaV07XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCB0aGlzLmxvb3BfY291bnQ7IGorKyl7XG4gICAgICAgICAgICB0aGlzLmxvb3BzW2pdLnNldE1hcmsoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGxwLnNldERlcHRoKGRlcHRoKGxwKSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZXB0aChscCl7XG4gICAgdmFyIGNvdW50ID0gbnVsbDtcbiAgICB2YXIgcmV0ID0gbnVsbDtcbiAgICB2YXIgZCA9IG51bGw7XG5cbiAgICBpZiAobHAuZ2V0TmNvbm5lY3Rpb24oKSA8PSAxKXtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGlmIChscC5pc01hcmsoKSl7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgbHAuc2V0TWFyayh0cnVlKTtcbiAgICBjb3VudCA9IDA7XG4gICAgcmV0ID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgbHAuZ2V0Q29ubmVjdGlvbihpKSAhPSBudWxsOyBpKyspIHtcbiAgICAgICAgZCA9IGRlcHRoKGxwLmdldENvbm5lY3Rpb24oaSkuZ2V0TG9vcCgpKTtcbiAgICAgICAgaWYgKGQgPj0gMCkge1xuICAgICAgICAgICAgaWYgKCsrY291bnQgPT0gMSl7XG4gICAgICAgICAgICAgICAgcmV0ID0gZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHJldCA+IGQpe1xuICAgICAgICAgICAgICAgIHJldCA9IGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgbHAuc2V0TWFyayhmYWxzZSk7XG4gICAgcmV0dXJuIHJldCArIDE7XG59XG5cbk5BVmlldy5wcm90b3R5cGUudHJhdmVyc2VfbG9vcCA9IGZ1bmN0aW9uIHRyYXZlcnNlX2xvb3AobHAsIGFuY2hvcl9jb25uZWN0aW9uKXtcbiAgICB2YXIgeHMsIHlzLCB4ZSwgeWUsIHhuLCB5biwgYW5nbGVpbmMsIHI7XG4gICAgdmFyIHJhZGl1cywgeGMsIHljLCB4bywgeW8sIGFzdGFydCwgYWVuZCwgYTtcbiAgICB2YXIgY3AsIGNwbmV4dCwgYWNwLCBjcHByZXY7XG4gICAgdmFyIGksIGosIG4sIGljO1xuICAgIHZhciBkYSwgbWF4YW5nO1xuICAgIHZhciBjb3VudCwgaWNzdGFydCwgaWNlbmQsIGljbWlkZGxlLCBpY3Jvb3Q7XG4gICAgdmFyIGRvbmUsIGRvbmVfYWxsX2Nvbm5lY3Rpb25zLCByb290ZWQ7XG4gICAgdmFyIHNpZ247XG4gICAgdmFyIG1pZHgsIG1pZHksIG5yeCwgbnJ5LCBteCwgbXksIHZ4LCB2eSwgZG90bXYsIG5taWR4LCBubWlkeTtcbiAgICB2YXIgaWNzdGFydDEsIGljdXAsIGljZG93biwgaWNuZXh0LCBkaXJlY3Rpb247XG4gICAgdmFyIGRhbiwgZHgsIGR5LCBycjtcbiAgICB2YXIgY3B4LCBjcHksIGNwbmV4dHgsIGNwbmV4dHksIGNueCwgY255LCByY24sIHJjLCBsbngsIGxueSwgcmwsIGFjLCBhY24sIHN4LCBzeSwgZGNwO1xuICAgIHZhciBpbWF4bG9vcCA9IDA7XG5cbiAgICBhbmdsZWluYyA9IDIgKiBNYXRoLlBJIC8gKHRoaXMubmJhc2UgKyAxKTtcbiAgICBhY3AgPSBudWxsO1xuICAgIGljcm9vdCA9IC0xO1xuICAgIHZhciBpbmRpY2UgPSAwO1xuXG4gICAgZm9yIChpYyA9IDA7IChjcCA9IGxwLmdldENvbm5lY3Rpb24oaW5kaWNlKSkgIT0gbnVsbDsgaW5kaWNlKyssIGljKyspIHtcbiAgICAgICAgeHMgPSAtTWF0aC5zaW4oYW5nbGVpbmMgKiBjcC5nZXRTdGFydCgpKTtcbiAgICAgICAgeXMgPSBNYXRoLmNvcyhhbmdsZWluYyAqIGNwLmdldFN0YXJ0KCkpO1xuICAgICAgICB4ZSA9IC1NYXRoLnNpbihhbmdsZWluYyAqIGNwLmdldEVuZCgpKTtcbiAgICAgICAgeWUgPSBNYXRoLmNvcyhhbmdsZWluYyAqIGNwLmdldEVuZCgpKTtcbiAgICAgICAgeG4gPSB5ZSAtIHlzO1xuICAgICAgICB5biA9IHhzIC0geGU7XG4gICAgICAgIHIgPSBNYXRoLnNxcnQoeG4gKiB4biArIHluICogeW4pO1xuICAgICAgICBjcC5zZXRYcmFkKHhuIC8gcik7XG4gICAgICAgIGNwLnNldFlyYWQoeW4gLyByKTtcbiAgICAgICAgY3Auc2V0QW5nbGUoTWF0aC5hdGFuMih5biwgeG4pKTtcbiAgICAgICAgaWYgKGNwLmdldEFuZ2xlKCkgPCAwLjApe1xuICAgICAgICAgICAgY3Auc2V0QW5nbGUoY3AuZ2V0QW5nbGUoKSArIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYW5jaG9yX2Nvbm5lY3Rpb24gIT0gbnVsbFxuICAgICAgICAgICAgICAgICYmIGFuY2hvcl9jb25uZWN0aW9uLmdldFJlZ2lvbigpID09IGNwLmdldFJlZ2lvbigpKSB7XG4gICAgICAgICAgICBhY3AgPSBjcDtcbiAgICAgICAgICAgIGljcm9vdCA9IGljO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldF9yYWRpdXM6IHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHRoaXMuZGV0ZXJtaW5lX3JhZGl1cyhscCwgdGhpcy5sZW5jdXQpO1xuICAgICAgICByYWRpdXMgPSBscC5nZXRSYWRpdXMoKS90aGlzLlJBRElVU19SRURVQ1RJT05fRkFDVE9SO1xuICAgICAgICBpZiAoYW5jaG9yX2Nvbm5lY3Rpb24gPT0gbnVsbCl7XG4gICAgICAgICAgICB4YyA9IHljID0gMC4wO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeG8gPSAodGhpcy5iYXNlc1thY3AuZ2V0U3RhcnQoKV0uZ2V0WCgpICsgdGhpcy5iYXNlc1xuICAgICAgICAgICAgICAgICAgICBbYWNwLmdldEVuZCgpXS5nZXRYKCkpIC8gMi4wO1xuICAgICAgICAgICAgeW8gPSAodGhpcy5iYXNlc1thY3AuZ2V0U3RhcnQoKV0uZ2V0WSgpICsgdGhpcy5iYXNlc1xuICAgICAgICAgICAgICAgICAgICBbYWNwLmdldEVuZCgpXS5nZXRZKCkpIC8gMi4wO1xuICAgICAgICAgICAgeGMgPSB4byAtIHJhZGl1cyAqIGFjcC5nZXRYcmFkKCk7XG4gICAgICAgICAgICB5YyA9IHlvIC0gcmFkaXVzICogYWNwLmdldFlyYWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSBjb25zdHJ1Y3Rpb24gb2YgdGhlIGNvbm5lY3RvcnMgd2lsbCBwcm9jZWVkIGluIGJsb2NrcyBvZlxuICAgICAgICAvLyBjb25uZWN0ZWQgY29ubmVjdG9ycywgd2hlcmUgYSBjb25uZWN0ZWQgY29ubmVjdG9yIHBhaXJzIG1lYW5zIHR3b1xuICAgICAgICAvLyBjb25uZWN0b3JzIHRoYXQgYXJlIGZvcmNlZCBvdXQgb2YgdGhlIGRyYXduIGNpcmNsZSBiZWNhdXNlIHRoZXlcbiAgICAgICAgLy8gYXJlIHRvbyBjbG9zZSB0b2dldGhlciBpbiBhbmdsZS5cblxuICAgICAgICAvLyBGaXJzdCwgZmluZCB0aGUgc3RhcnQgb2YgYSBibG9jayBvZiBjb25uZWN0ZWQgY29ubmVjdG9yc1xuXG4gICAgICAgIGlmIChpY3Jvb3QgPT0gLTEpe1xuICAgICAgICAgICAgaWNzdGFydCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpY3N0YXJ0ID0gaWNyb290O1xuICAgICAgICB9XG4gICAgICAgIGNwID0gbHAuZ2V0Q29ubmVjdGlvbihpY3N0YXJ0KTtcbiAgICAgICAgY291bnQgPSAwO1xuICAgICAgICBkb25lID0gZmFsc2U7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGogPSBpY3N0YXJ0IC0gMTtcbiAgICAgICAgICAgIGlmIChqIDwgMCl7XG4gICAgICAgICAgICAgICAgaiA9IGxwLmdldE5jb25uZWN0aW9uKCkgLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3BwcmV2ID0gbHAuZ2V0Q29ubmVjdGlvbihqKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5jb25uZWN0ZWRfY29ubmVjdGlvbihjcHByZXYsIGNwKSkge1xuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWNzdGFydCA9IGo7XG4gICAgICAgICAgICAgICAgY3AgPSBjcHByZXY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKytjb3VudCA+IGxwLmdldE5jb25uZWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICAvLyBIZXJlIGV2ZXJ5dGhpbmcgaXMgY29ubmVjdGVkLiBCcmVhayBvbiBtYXhpbXVtIGFuZ3VsYXJcbiAgICAgICAgICAgICAgICAvLyBzZXBhcmF0aW9uIGJldHdlZW4gY29ubmVjdGlvbnMuXG4gICAgICAgICAgICAgICAgbWF4YW5nID0gLTEuMDtcbiAgICAgICAgICAgICAgICBmb3IgKGljID0gMDsgaWMgPCBscC5nZXROY29ubmVjdGlvbigpOyBpYysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGogPSBpYyArIDE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChqID49IGxwLmdldE5jb25uZWN0aW9uKCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaiA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY3AgPSBscC5nZXRDb25uZWN0aW9uKGljKTtcbiAgICAgICAgICAgICAgICAgICAgY3BuZXh0ID0gbHAuZ2V0Q29ubmVjdGlvbihqKTtcbiAgICAgICAgICAgICAgICAgICAgYWMgPSBjcG5leHQuZ2V0QW5nbGUoKSAtIGNwLmdldEFuZ2xlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhYyA8IDAuMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBhYyArPSAyICogTWF0aC5QSTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoYWMgPiBtYXhhbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heGFuZyA9IGFjO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1heGxvb3AgPSBpYztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpY2VuZCA9IGltYXhsb29wO1xuICAgICAgICAgICAgICAgIGljc3RhcnQgPSBpbWF4bG9vcCArIDE7XG4gICAgICAgICAgICAgICAgaWYgKGljc3RhcnQgPj0gbHAuZ2V0TmNvbm5lY3Rpb24oKSl7XG4gICAgICAgICAgICAgICAgICAgIGljc3RhcnQgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjcCA9IGxwLmdldENvbm5lY3Rpb24oaWNlbmQpO1xuICAgICAgICAgICAgICAgIGNwLnNldEJyb2tlbih0cnVlKTtcbiAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoIWRvbmUpO1xuICAgICAgICBkb25lX2FsbF9jb25uZWN0aW9ucyA9IGZhbHNlO1xuICAgICAgICBpY3N0YXJ0MSA9IGljc3RhcnQ7XG4gICAgICAgIHdoaWxlICghZG9uZV9hbGxfY29ubmVjdGlvbnMpIHtcbiAgICAgICAgICAgIGNvdW50ID0gMDtcbiAgICAgICAgICAgIGRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGljZW5kID0gaWNzdGFydDtcbiAgICAgICAgICAgIHJvb3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgd2hpbGUgKCFkb25lKSB7XG4gICAgICAgICAgICAgICAgY3AgPSBscC5nZXRDb25uZWN0aW9uKGljZW5kKTtcbiAgICAgICAgICAgICAgICBpZiAoaWNlbmQgPT0gaWNyb290KXtcbiAgICAgICAgICAgICAgICAgICAgcm9vdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaiA9IGljZW5kICsgMTtcbiAgICAgICAgICAgICAgICBpZiAoaiA+PSBscC5nZXROY29ubmVjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgICAgIGogPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjcG5leHQgPSBscC5nZXRDb25uZWN0aW9uKGopO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZF9jb25uZWN0aW9uKGNwLCBjcG5leHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgrK2NvdW50ID49IGxwLmdldE5jb25uZWN0aW9uKCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWNlbmQgPSBqO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWNtaWRkbGUgPSB0aGlzLmZpbmRfaWNfbWlkZGxlKGljc3RhcnQsIGljZW5kLCBhbmNob3JfY29ubmVjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgYWNwLCBscCk7XG4gICAgICAgICAgICBpYyA9IGljdXAgPSBpY2Rvd24gPSBpY21pZGRsZTtcbiAgICAgICAgICAgIGRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoIWRvbmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBpYyA9IGljdXA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGljID0gaWNtaWRkbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpYyA9IGljZG93bjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGljID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY3AgPSBscC5nZXRDb25uZWN0aW9uKGljKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuY2hvcl9jb25uZWN0aW9uID09IG51bGwgfHwgYWNwICE9IGNwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3RhcnQgPSBjcC5nZXRBbmdsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIE1hdGguYXNpbigxLjAgLyAyLjAgLyByYWRpdXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFlbmQgPSBjcC5nZXRBbmdsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIE1hdGguYXNpbigxLjAgLyAyLjAgLyByYWRpdXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbY3AuZ2V0U3RhcnQoKV0uc2V0WChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhjICsgcmFkaXVzICogTWF0aC5jb3MoYXN0YXJ0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tjcC5nZXRTdGFydCgpXS5zZXRZKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWMgKyByYWRpdXMgKiBNYXRoLnNpbihhc3RhcnQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2NwLmdldEVuZCgpXS5zZXRYKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGMgKyByYWRpdXMgKiBNYXRoLmNvcyhhZW5kKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tjcC5nZXRFbmQoKV0uc2V0WShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHljICsgcmFkaXVzICogTWF0aC5zaW4oYWVuZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogPSBpYyArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogPj0gbHAuZ2V0TmNvbm5lY3Rpb24oKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcCA9IGxwLmdldENvbm5lY3Rpb24oaWMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNwbmV4dCA9IGxwLmdldENvbm5lY3Rpb24oaik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3B4ID0gY3AuZ2V0WHJhZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNweSA9IGNwLmdldFlyYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYyA9IChjcC5nZXRBbmdsZSgpICsgY3BuZXh0LmdldEFuZ2xlKCkpIC8gMi4wO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjcC5nZXRBbmdsZSgpID4gY3BuZXh0LmdldEFuZ2xlKCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYyAtPSBNYXRoLlBJO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnggPSBNYXRoLmNvcyhhYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY255ID0gTWF0aC5zaW4oYWMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxueCA9IGNueTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsbnkgPSAtY254O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhID0gY3BuZXh0LmdldEFuZ2xlKCkgLSBjcC5nZXRBbmdsZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYSA8IDAuMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhICs9IDIgKiBNYXRoLlBJO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3AuaXNFeHRydWRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYSA8PSBNYXRoLlBJIC8gMil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBybCA9IDIuMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJsID0gMS41O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBybCA9IDEuMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tjcC5nZXRFbmQoKV0uc2V0WChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbY3BuZXh0LmdldFN0YXJ0KCldLmdldFgoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIHJsICogbG54KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2NwLmdldEVuZCgpXS5zZXRZKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tjcG5leHQuZ2V0U3RhcnQoKV0uZ2V0WSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgcmwgKiBsbnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbY3AuZ2V0U3RhcnQoKV0uc2V0WChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbY3AuZ2V0RW5kKCldLmdldFgoKSArIGNweSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tjcC5nZXRTdGFydCgpXS5zZXRZKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tjcC5nZXRFbmQoKV0uZ2V0WSgpIC0gY3B4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaiA9IGljIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiA8IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqID0gbHAuZ2V0TmNvbm5lY3Rpb24oKSAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNwID0gbHAuZ2V0Q29ubmVjdGlvbihqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcG5leHQgPSBscC5nZXRDb25uZWN0aW9uKGljKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcG5leHR4ID0gY3BuZXh0LmdldFhyYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcG5leHR5ID0gY3BuZXh0LmdldFlyYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYyA9IChjcC5nZXRBbmdsZSgpICsgY3BuZXh0LmdldEFuZ2xlKCkpIC8gMi4wO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjcC5nZXRBbmdsZSgpID4gY3BuZXh0LmdldEFuZ2xlKCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYyAtPSBNYXRoLlBJO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnggPSBNYXRoLmNvcyhhYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY255ID0gTWF0aC5zaW4oYWMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxueCA9IC1jbnk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG55ID0gY254O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhID0gY3BuZXh0LmdldEFuZ2xlKCkgLSBjcC5nZXRBbmdsZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYSA8IDAuMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhICs9IDIgKiBNYXRoLlBJO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3AuaXNFeHRydWRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYSA8PSBNYXRoLlBJIC8gMil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBybCA9IDIuMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJsID0gMS41O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBybCA9IDEuMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tjcG5leHQuZ2V0U3RhcnQoKV0uc2V0WChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbY3AuZ2V0RW5kKCldLmdldFgoKSArIHJsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogbG54KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2NwbmV4dC5nZXRTdGFydCgpXS5zZXRZKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tjcC5nZXRFbmQoKV0uZ2V0WSgpICsgcmxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBsbnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbY3BuZXh0LmdldEVuZCgpXS5zZXRYKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tjcG5leHQuZ2V0U3RhcnQoKV0uZ2V0WCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gY3BuZXh0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tjcG5leHQuZ2V0RW5kKCldLnNldFkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2NwbmV4dC5nZXRTdGFydCgpXS5nZXRZKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBjcG5leHR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaWNkb3duID09IGljZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpY2Rvd24gPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpY2Rvd24gPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCsraWNkb3duID49IGxwLmdldE5jb25uZWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY2Rvd24gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaWN1cCA9PSBpY3N0YXJ0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGljdXAgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpY3VwID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgtLWljdXAgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWN1cCA9IGxwLmdldE5jb25uZWN0aW9uKCkgLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IC0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkb25lID0gaWN1cCA9PSAtMSAmJiBpY2Rvd24gPT0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpY25leHQgPSBpY2VuZCArIDE7XG4gICAgICAgICAgICBpZiAoaWNuZXh0ID49IGxwLmdldE5jb25uZWN0aW9uKCkpe1xuICAgICAgICAgICAgICAgIGljbmV4dCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaWNlbmQgIT0gaWNzdGFydFxuICAgICAgICAgICAgICAgICAgICAmJiAoIShpY3N0YXJ0ID09IGljc3RhcnQxICYmIGljbmV4dCA9PSBpY3N0YXJ0MSkpKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBNb3ZlIHRoZSBiYXNlcyBqdXN0IGNvbnN0cnVjdGVkIChvciB0aGUgcmFkaXVzKSBzbyB0aGF0XG4gICAgICAgICAgICAgICAgLy8gdGhlIGJpc2VjdG9yIG9mIHRoZSBlbmQgcG9pbnRzIGlzIHJhZGl1cyBkaXN0YW5jZSBhd2F5XG4gICAgICAgICAgICAgICAgLy8gZnJvbSB0aGUgbG9vcCBjZW50ZXIuXG5cbiAgICAgICAgICAgICAgICBjcCA9IGxwLmdldENvbm5lY3Rpb24oaWNzdGFydCk7XG4gICAgICAgICAgICAgICAgY3BuZXh0ID0gbHAuZ2V0Q29ubmVjdGlvbihpY2VuZCk7XG4gICAgICAgICAgICAgICAgZHggPSB0aGlzLmJhc2VzW2NwbmV4dC5nZXRFbmQoKV0uZ2V0WCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAtIHRoaXMuYmFzZXNbY3AuZ2V0U3RhcnQoKV0uZ2V0WCgpO1xuICAgICAgICAgICAgICAgIGR5ID0gdGhpcy5iYXNlc1tjcG5leHQuZ2V0RW5kKCldLmdldFkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLSB0aGlzLmJhc2VzW2NwLmdldFN0YXJ0KCldLmdldFkoKTtcbiAgICAgICAgICAgICAgICBtaWR4ID0gdGhpcy5iYXNlc1tjcC5nZXRTdGFydCgpXS5nZXRYKCkgKyBkeCAvIDIuMDtcbiAgICAgICAgICAgICAgICBtaWR5ID0gdGhpcy5iYXNlc1tjcC5nZXRTdGFydCgpXS5nZXRZKCkgKyBkeSAvIDIuMDtcbiAgICAgICAgICAgICAgICByciA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICAgICAgbXggPSBkeCAvIHJyO1xuICAgICAgICAgICAgICAgIG15ID0gZHkgLyBycjtcbiAgICAgICAgICAgICAgICB2eCA9IHhjIC0gbWlkeDtcbiAgICAgICAgICAgICAgICB2eSA9IHljIC0gbWlkeTtcbiAgICAgICAgICAgICAgICByciA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICAgICAgdnggLz0gcnI7XG4gICAgICAgICAgICAgICAgdnkgLz0gcnI7XG4gICAgICAgICAgICAgICAgZG90bXYgPSB2eCAqIG14ICsgdnkgKiBteTtcbiAgICAgICAgICAgICAgICBucnggPSBkb3RtdiAqIG14IC0gdng7XG4gICAgICAgICAgICAgICAgbnJ5ID0gZG90bXYgKiBteSAtIHZ5O1xuICAgICAgICAgICAgICAgIHJyID0gTWF0aC5zcXJ0KG5yeCAqIG5yeCArIG5yeSAqIG5yeSk7XG4gICAgICAgICAgICAgICAgbnJ4IC89IHJyO1xuICAgICAgICAgICAgICAgIG5yeSAvPSBycjtcblxuICAgICAgICAgICAgICAgIC8vIERldGVybWluZSB3aGljaCBzaWRlIG9mIHRoZSBiaXNlY3RvciB0aGUgY2VudGVyIHNob3VsZFxuICAgICAgICAgICAgICAgIC8vIGJlLlxuXG4gICAgICAgICAgICAgICAgZHggPSB0aGlzLmJhc2VzW2NwLmdldFN0YXJ0KCldLmdldFgoKSAtIHhjO1xuICAgICAgICAgICAgICAgIGR5ID0gdGhpcy5iYXNlc1tjcC5nZXRTdGFydCgpXS5nZXRZKCkgLSB5YztcbiAgICAgICAgICAgICAgICBhYyA9IE1hdGguYXRhbjIoZHksIGR4KTtcbiAgICAgICAgICAgICAgICBpZiAoYWMgPCAwLjApe1xuICAgICAgICAgICAgICAgICAgICBhYyArPSAyICogTWF0aC5QSTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZHggPSB0aGlzLmJhc2VzW2NwbmV4dC5nZXRFbmQoKV0uZ2V0WCgpIC0geGM7XG4gICAgICAgICAgICAgICAgZHkgPSB0aGlzLmJhc2VzW2NwbmV4dC5nZXRFbmQoKV0uZ2V0WSgpIC0geWM7XG4gICAgICAgICAgICAgICAgYWNuID0gTWF0aC5hdGFuMihkeSwgZHgpO1xuICAgICAgICAgICAgICAgIGlmIChhY24gPCAwLjApe1xuICAgICAgICAgICAgICAgICAgICBhY24gKz0gMiAqIE1hdGguUEk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhY24gPCBhYyl7XG4gICAgICAgICAgICAgICAgICAgIGFjbiArPSAyICogTWF0aC5QSTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFjbiAtIGFjID4gTWF0aC5QSSl7XG4gICAgICAgICAgICAgICAgICAgIHNpZ24gPSAtMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNpZ24gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBubWlkeCA9IHhjICsgc2lnbiAqIHJhZGl1cyAqIG5yeDtcbiAgICAgICAgICAgICAgICBubWlkeSA9IHljICsgc2lnbiAqIHJhZGl1cyAqIG5yeTtcbiAgICAgICAgICAgICAgICBpZiAocm9vdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHhjIC09IG5taWR4IC0gbWlkeDtcbiAgICAgICAgICAgICAgICAgICAgeWMgLT0gbm1pZHkgLSBtaWR5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpYyA9IGljc3RhcnQ7Oykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3AgPSBscC5nZXRDb25uZWN0aW9uKGljKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBjcC5nZXRTdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tpXS5zZXRYKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2ldLmdldFgoKSArIG5taWR4IC0gbWlkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2ldLnNldFkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbaV0uZ2V0WSgpICsgbm1pZHkgLSBtaWR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBjcC5nZXRFbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbaV0uc2V0WChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tpXS5nZXRYKCkgKyBubWlkeCAtIG1pZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tpXS5zZXRZKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2ldLmdldFkoKSArIG5taWR5IC0gbWlkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWMgPT0gaWNlbmQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCsraWMgPj0gbHAuZ2V0TmNvbm5lY3Rpb24oKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWMgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWNzdGFydCA9IGljbmV4dDtcbiAgICAgICAgICAgIGRvbmVfYWxsX2Nvbm5lY3Rpb25zID0gaWNzdGFydCA9PSBpY3N0YXJ0MTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGljID0gMDsgaWMgPCBscC5nZXROY29ubmVjdGlvbigpOyBpYysrKSB7XG4gICAgICAgICAgICBjcCA9IGxwLmdldENvbm5lY3Rpb24oaWMpO1xuICAgICAgICAgICAgaiA9IGljICsgMTtcbiAgICAgICAgICAgIGlmIChqID49IGxwLmdldE5jb25uZWN0aW9uKCkpe1xuICAgICAgICAgICAgICAgIGogPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3BuZXh0ID0gbHAuZ2V0Q29ubmVjdGlvbihqKTtcbiAgICAgICAgICAgIGR4ID0gdGhpcy5iYXNlc1tjcC5nZXRFbmQoKV0uZ2V0WCgpIC0geGM7XG4gICAgICAgICAgICBkeSA9IHRoaXMuYmFzZXNbY3AuZ2V0RW5kKCldLmdldFkoKSAtIHljO1xuICAgICAgICAgICAgcmMgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICAgICAgYWMgPSBNYXRoLmF0YW4yKGR5LCBkeCk7XG4gICAgICAgICAgICBpZiAoYWMgPCAwLjApe1xuICAgICAgICAgICAgICAgIGFjICs9IDIgKiBNYXRoLlBJO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZHggPSB0aGlzLmJhc2VzW2NwbmV4dC5nZXRTdGFydCgpXS5nZXRYKCkgLSB4YztcbiAgICAgICAgICAgIGR5ID0gdGhpcy5iYXNlc1tjcG5leHQuZ2V0U3RhcnQoKV0uZ2V0WSgpIC0geWM7XG4gICAgICAgICAgICByY24gPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICAgICAgYWNuID0gTWF0aC5hdGFuMihkeSwgZHgpO1xuICAgICAgICAgICAgaWYgKGFjbiA8IDAuMCl7XG4gICAgICAgICAgICAgICAgYWNuICs9IDIgKiBNYXRoLlBJO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFjbiA8IGFjKXtcbiAgICAgICAgICAgICAgICBhY24gKz0gMiAqIE1hdGguUEk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYW4gPSBhY24gLSBhYztcbiAgICAgICAgICAgIGRjcCA9IGNwbmV4dC5nZXRBbmdsZSgpIC0gY3AuZ2V0QW5nbGUoKTtcbiAgICAgICAgICAgIGlmIChkY3AgPD0gMC4wKXtcbiAgICAgICAgICAgICAgICBkY3AgKz0gMiAqIE1hdGguUEk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGFuIC0gZGNwKSA+IE1hdGguUEkpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3AuaXNFeHRydWRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2FybmluZyBmcm9tIHRyYXZlcnNlX2xvb3AuIExvb3AgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArIGxwLmdldE51bWJlcigpICsgXCIgaGFzIGNyb3NzZWQgcmVnaW9uc1xcblwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoKGNwbmV4dC5nZXRTdGFydCgpIC0gY3AuZ2V0RW5kKCkpICE9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY3Auc2V0RXh0cnVkZWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIHNldF9yYWRpdXM7IC8vIHJlbXBsYWNlbWVudCBkdSBnb3RvXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNwLmlzRXh0cnVkZWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uc3RydWN0X2V4dHJ1ZGVkX3NlZ21lbnQoY3AsIGNwbmV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBuID0gY3BuZXh0LmdldFN0YXJ0KCkgLSBjcC5nZXRFbmQoKTtcbiAgICAgICAgICAgICAgICBpZiAobiA8IDApe1xuICAgICAgICAgICAgICAgICAgICBuICs9IHRoaXMubmJhc2UgKyAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhbmdsZWluYyA9IGRhbiAvIG47XG4gICAgICAgICAgICAgICAgZm9yIChqID0gMTsgaiA8IG47IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpID0gY3AuZ2V0RW5kKCkgKyBqO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IHRoaXMubmJhc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgaSAtPSB0aGlzLm5iYXNlICsgMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhID0gYWMgKyBqICogYW5nbGVpbmM7XG4gICAgICAgICAgICAgICAgICAgIHJyID0gcmMgKyAocmNuIC0gcmMpICogKGEgLSBhYykgLyBkYW47XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbaV0uc2V0WCh4YyArIHJyICogTWF0aC5jb3MoYSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2ldLnNldFkoeWMgKyByciAqIE1hdGguc2luKGEpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGZvciAoaWMgPSAwOyBpYyA8IGxwLmdldE5jb25uZWN0aW9uKCk7IGljKyspIHtcbiAgICAgICAgaWYgKGljcm9vdCAhPSBpYykge1xuICAgICAgICAgICAgY3AgPSBscC5nZXRDb25uZWN0aW9uKGljKTtcbiAgICAgICAgICAgIC8vSU0gSEVSRVxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZV9yZWdpb24oY3ApO1xuICAgICAgICAgICAgdGhpcy50cmF2ZXJzZV9sb29wKGNwLmdldExvb3AoKSwgY3ApO1xuICAgICAgICB9XG4gICAgfVxuICAgIG4gPSAwO1xuICAgIHN4ID0gMC4wO1xuICAgIHN5ID0gMC4wO1xuICAgIGZvciAoaWMgPSAwOyBpYyA8IGxwLmdldE5jb25uZWN0aW9uKCk7IGljKyspIHtcbiAgICAgICAgaiA9IGljICsgMTtcbiAgICAgICAgaWYgKGogPj0gbHAuZ2V0TmNvbm5lY3Rpb24oKSl7XG4gICAgICAgICAgICBqID0gMDtcbiAgICAgICAgfVxuICAgICAgICBjcCA9IGxwLmdldENvbm5lY3Rpb24oaWMpO1xuICAgICAgICBjcG5leHQgPSBscC5nZXRDb25uZWN0aW9uKGopO1xuICAgICAgICBuICs9IDI7XG4gICAgICAgIHN4ICs9IHRoaXMuYmFzZXNbY3AuZ2V0U3RhcnQoKV0uZ2V0WCgpXG4gICAgICAgICAgICAgICAgKyB0aGlzLmJhc2VzW2NwLmdldEVuZCgpXS5nZXRYKCk7XG4gICAgICAgIHN5ICs9IHRoaXMuYmFzZXNbY3AuZ2V0U3RhcnQoKV0uZ2V0WSgpXG4gICAgICAgICAgICAgICAgKyB0aGlzLmJhc2VzW2NwLmdldEVuZCgpXS5nZXRZKCk7XG4gICAgICAgIGlmICghY3AuaXNFeHRydWRlZCgpKSB7XG4gICAgICAgICAgICBmb3IgKGogPSBjcC5nZXRFbmQoKSArIDE7IGogIT0gY3BuZXh0LmdldFN0YXJ0KCk7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChqID4gdGhpcy5uYmFzZSl7XG4gICAgICAgICAgICAgICAgICAgIGogLT0gdGhpcy5uYmFzZSArIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG4rKztcbiAgICAgICAgICAgICAgICBzeCArPSB0aGlzLmJhc2VzW2pdLmdldFgoKTtcbiAgICAgICAgICAgICAgICBzeSArPSB0aGlzLmJhc2VzW2pdLmdldFkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBscC5zZXRYKHN4IC8gbik7XG4gICAgbHAuc2V0WShzeSAvIG4pO1xufVxuXG5OQVZpZXcucHJvdG90eXBlLmRldGVybWluZV9yYWRpdXMgPSBmdW5jdGlvbiBkZXRlcm1pbmVfcmFkaXVzKGxwLCBsZW5jdXQpe1xuICAgIHZhciBtaW5kaXQsIGNpLCBkdCwgc3Vtbiwgc3VtZCwgcmFkaXVzLCBkaXQ7XG4gICAgdmFyIGksIGosIGVuZCwgc3RhcnQsIGltaW5kaXQgPSAwO1xuICAgIHZhciBjcCA9IG5ldyBDb25uZWN0aW9uKCksIGNwbmV4dCA9IG5ldyBDb25uZWN0aW9uKCk7XG4gICAgdmFyIHJ0Ml8yID0gMC43MDcxMDY4O1xuXG4gICAgZG8ge1xuICAgICAgICBtaW5kaXQgPSAxLjBlMTA7XG4gICAgICAgIGZvciAoc3VtZCA9IDAuMCwgc3VtbiA9IDAuMCwgaSA9IDA7IGkgPCBscC5nZXROY29ubmVjdGlvbigpOyBpKyspIHtcbiAgICAgICAgICAgIGNwID0gbHAuZ2V0Q29ubmVjdGlvbihpKTtcbiAgICAgICAgICAgIGogPSBpICsgMTtcbiAgICAgICAgICAgIGlmIChqID49IGxwLmdldE5jb25uZWN0aW9uKCkpe1xuICAgICAgICAgICAgICAgIGogPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3BuZXh0ID0gbHAuZ2V0Q29ubmVjdGlvbihqKTtcbiAgICAgICAgICAgIGVuZCA9IGNwLmdldEVuZCgpO1xuICAgICAgICAgICAgc3RhcnQgPSBjcG5leHQuZ2V0U3RhcnQoKTtcbiAgICAgICAgICAgIGlmIChzdGFydCA8IGVuZCl7XG4gICAgICAgICAgICAgICAgc3RhcnQgKz0gdGhpcy5uYmFzZSArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkdCA9IGNwbmV4dC5nZXRBbmdsZSgpIC0gY3AuZ2V0QW5nbGUoKTtcbiAgICAgICAgICAgIGlmIChkdCA8PSAwLjApe1xuICAgICAgICAgICAgICAgIGR0ICs9IDIgKiBNYXRoLlBJO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjcC5pc0V4dHJ1ZGVkKCkpe1xuICAgICAgICAgICAgICAgIGNpID0gc3RhcnQgLSBlbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoZHQgPD0gTWF0aC5QSSAvIDIpe1xuICAgICAgICAgICAgICAgICAgICBjaSA9IDIuMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNpID0gMS41O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN1bW4gKz0gZHQgKiAoMS4wIC8gY2kgKyAxLjApO1xuICAgICAgICAgICAgc3VtZCArPSBkdCAqIGR0IC8gY2k7XG4gICAgICAgICAgICBkaXQgPSBkdCAvIGNpO1xuICAgICAgICAgICAgaWYgKGRpdCA8IG1pbmRpdCAmJiAhY3AuaXNFeHRydWRlZCgpICYmIGNpID4gMS4wKSB7XG4gICAgICAgICAgICAgICAgbWluZGl0ID0gZGl0O1xuICAgICAgICAgICAgICAgIGltaW5kaXQgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJhZGl1cyA9IHN1bW4gLyBzdW1kO1xuICAgICAgICBpZiAocmFkaXVzIDwgcnQyXzIpe1xuICAgICAgICAgICAgcmFkaXVzID0gcnQyXzI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1pbmRpdCAqIHJhZGl1cyA8IGxlbmN1dCkge1xuICAgICAgICAgICAgbHAuZ2V0Q29ubmVjdGlvbihpbWluZGl0KS5zZXRFeHRydWRlZCh0cnVlKTtcbiAgICAgICAgfVxuICAgIH0gd2hpbGUgKG1pbmRpdCAqIHJhZGl1cyA8IGxlbmN1dCk7XG4gICAgaWYgKGxwLmdldFJhZGl1cygpID4gMC4wKXtcbiAgICAgICAgcmFkaXVzID0gbHAuZ2V0UmFkaXVzKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBscC5zZXRSYWRpdXMocmFkaXVzKTtcbiAgICB9XG59XG5cbk5BVmlldy5wcm90b3R5cGUuZmluZF9pY19taWRkbGUgPSBmdW5jdGlvbiBmaW5kX2ljX21pZGRsZShpY3N0YXJ0LCBpY2VuZCwgYW5jaG9yX2Nvbm5lY3Rpb24sIGFjcCwgbHApe1xuICAgIHZhciBjb3VudCwgcmV0LCBpYywgaTtcbiAgICB2YXIgZG9uZTtcblxuICAgIGNvdW50ID0gMDtcbiAgICByZXQgPSAtMTtcbiAgICBpYyA9IGljc3RhcnQ7XG4gICAgZG9uZSA9IGZhbHNlO1xuICAgIHdoaWxlICghZG9uZSkge1xuICAgICAgICBpZiAoY291bnQrKyA+IGxwLmdldE5jb25uZWN0aW9uKCkgKiAyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkluZmluaXRlIGxvb3AgaW4gJ2ZpbmRfaWNfbWlkZGxlJ1wiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYW5jaG9yX2Nvbm5lY3Rpb24gIT0gbnVsbCAmJiBscC5nZXRDb25uZWN0aW9uKGljKSA9PSBhY3ApIHtcbiAgICAgICAgICAgIHJldCA9IGljO1xuICAgICAgICB9XG4gICAgICAgIGRvbmUgPSBpYyA9PSBpY2VuZDtcbiAgICAgICAgaWYgKCsraWMgPj0gbHAuZ2V0TmNvbm5lY3Rpb24oKSkge1xuICAgICAgICAgICAgaWMgPSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChyZXQgPT0gLTEpIHtcbiAgICAgICAgZm9yIChpID0gMSwgaWMgPSBpY3N0YXJ0OyBpIDwgKGNvdW50ICsgMSkgLyAyOyBpKyspIHtcbiAgICAgICAgICAgIGlmICgrK2ljID49IGxwLmdldE5jb25uZWN0aW9uKCkpXG4gICAgICAgICAgICAgICAgaWMgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldCA9IGljO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufVxuXG5OQVZpZXcucHJvdG90eXBlLmNvbnN0cnVjdF9leHRydWRlZF9zZWdtZW50ID0gZnVuY3Rpb24gY29uc3RydWN0X2V4dHJ1ZGVkX3NlZ21lbnQoY3AsIGNwbmV4dCl7XG4gICAgdmFyIGFzdGFydCwgYWVuZDEsIGFlbmQyLCBhYXZlLCBkeCwgZHksIGExLCBhMiwgYWMsIHJyLCBkYSwgZGFjO1xuICAgIHZhciBzdGFydCwgZW5kLCBuLCBuc3RhcnQsIG5lbmQ7XG4gICAgdmFyIGNvbGxpc2lvbjtcblxuICAgIGFzdGFydCA9IGNwLmdldEFuZ2xlKCk7XG4gICAgYWVuZDIgPSBhZW5kMSA9IGNwbmV4dC5nZXRBbmdsZSgpO1xuICAgIGlmIChhZW5kMiA8IGFzdGFydCl7XG4gICAgICAgIGFlbmQyICs9IDIgKiBNYXRoLlBJO1xuICAgIH1cbiAgICBhYXZlID0gKGFzdGFydCArIGFlbmQyKSAvIDIuMDtcbiAgICBzdGFydCA9IGNwLmdldEVuZCgpO1xuICAgIGVuZCA9IGNwbmV4dC5nZXRTdGFydCgpO1xuICAgIG4gPSBlbmQgLSBzdGFydDtcbiAgICBpZiAobiA8IDApe1xuICAgICAgICBuICs9IHRoaXMubmJhc2UgKyAxO1xuICAgIH1cbiAgICBkYSA9IGNwbmV4dC5nZXRBbmdsZSgpIC0gY3AuZ2V0QW5nbGUoKTtcbiAgICBpZiAoZGEgPCAwLjApIHtcbiAgICAgICAgZGEgKz0gMiAqIE1hdGguUEk7XG4gICAgfVxuICAgIGlmIChuID09IDIpIHtcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RfY2lyY2xlX3NlZ21lbnQoc3RhcnQsIGVuZCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkeCA9IHRoaXMuYmFzZXNbZW5kXS5nZXRYKCkgLSB0aGlzLmJhc2VzW3N0YXJ0XS5nZXRYKCk7XG4gICAgICAgIGR5ID0gdGhpcy5iYXNlc1tlbmRdLmdldFkoKSAtIHRoaXMuYmFzZXNbc3RhcnRdLmdldFkoKTtcbiAgICAgICAgcnIgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICBkeCAvPSBycjtcbiAgICAgICAgZHkgLz0gcnI7XG4gICAgICAgIGlmIChyciA+PSAxLjUgJiYgZGEgPD0gTWF0aC5QSSAvIDIpIHtcbiAgICAgICAgICAgIG5zdGFydCA9IHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIGlmIChuc3RhcnQgPiB0aGlzLm5iYXNlKXtcbiAgICAgICAgICAgICAgICBuc3RhcnQgLT0gdGhpcy5uYmFzZSArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZW5kID0gZW5kIC0gMTtcbiAgICAgICAgICAgIGlmIChuZW5kIDwgMCl7XG4gICAgICAgICAgICAgICAgbmVuZCArPSB0aGlzLm5iYXNlICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYmFzZXNbbnN0YXJ0XS5zZXRYKHRoaXMuYmFzZXNbc3RhcnRdLmdldFgoKSArIDAuNSAqIGR4KTtcbiAgICAgICAgICAgIHRoaXMuYmFzZXNbbnN0YXJ0XS5zZXRZKHRoaXMuYmFzZXNbc3RhcnRdLmdldFkoKSArIDAuNSAqIGR5KTtcbiAgICAgICAgICAgIHRoaXMuYmFzZXNbbmVuZF0uc2V0WCh0aGlzLmJhc2VzW2VuZF0uZ2V0WCgpIC0gMC41ICogZHgpO1xuICAgICAgICAgICAgdGhpcy5iYXNlc1tuZW5kXS5zZXRZKHRoaXMuYmFzZXNbZW5kXS5nZXRZKCkgLSAwLjUgKiBkeSk7XG4gICAgICAgICAgICBzdGFydCA9IG5zdGFydDtcbiAgICAgICAgICAgIGVuZCA9IG5lbmQ7XG4gICAgICAgIH1cbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgY29sbGlzaW9uID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdF9jaXJjbGVfc2VnbWVudChzdGFydCwgZW5kKTtcbiAgICAgICAgICAgIG5zdGFydCA9IHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIGlmIChuc3RhcnQgPiB0aGlzLm5iYXNlKSB7XG4gICAgICAgICAgICAgICAgbnN0YXJ0IC09IHRoaXMubmJhc2UgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZHggPSB0aGlzLmJhc2VzW25zdGFydF0uZ2V0WCgpIC0gdGhpcy5iYXNlc1tzdGFydF0uZ2V0WCgpO1xuICAgICAgICAgICAgZHkgPSB0aGlzLmJhc2VzW25zdGFydF0uZ2V0WSgpIC0gdGhpcy5iYXNlc1tzdGFydF0uZ2V0WSgpO1xuICAgICAgICAgICAgYTEgPSBNYXRoLmF0YW4yKGR5LCBkeCk7XG4gICAgICAgICAgICBpZiAoYTEgPCAwLjApe1xuICAgICAgICAgICAgICAgIGExICs9IDIgKiBNYXRoLlBJO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGFjID0gYTEgLSBhc3RhcnQ7XG4gICAgICAgICAgICBpZiAoZGFjIDwgMC4wKXtcbiAgICAgICAgICAgICAgICBkYWMgKz0gMiAqIE1hdGguUEk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGFjID4gTWF0aC5QSSl7XG4gICAgICAgICAgICAgICAgY29sbGlzaW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5lbmQgPSBlbmQgLSAxO1xuICAgICAgICAgICAgaWYgKG5lbmQgPCAwKXtcbiAgICAgICAgICAgICAgICBuZW5kICs9IHRoaXMubmJhc2UgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZHggPSB0aGlzLmJhc2VzW25lbmRdLmdldFgoKSAtIHRoaXMuYmFzZXNbZW5kXS5nZXRYKCk7XG4gICAgICAgICAgICBkeSA9IHRoaXMuYmFzZXNbbmVuZF0uZ2V0WSgpIC0gdGhpcy5iYXNlc1tlbmRdLmdldFkoKTtcbiAgICAgICAgICAgIGEyID0gTWF0aC5hdGFuMihkeSwgZHgpO1xuICAgICAgICAgICAgaWYgKGEyIDwgMC4wKXtcbiAgICAgICAgICAgICAgICBhMiArPSAyICogTWF0aC5QSTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhYyA9IGFlbmQxIC0gYTI7XG4gICAgICAgICAgICBpZiAoZGFjIDwgMC4wKXtcbiAgICAgICAgICAgICAgICBkYWMgKz0gMiAqIE1hdGguUEk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGFjID4gTWF0aC5QSSl7XG4gICAgICAgICAgICAgICAgY29sbGlzaW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb2xsaXNpb24pIHtcbiAgICAgICAgICAgICAgICBhYyA9IHRoaXMubWluZjIoYWF2ZSwgYXN0YXJ0ICsgMC41KTtcbiAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW25zdGFydF0uc2V0WChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbc3RhcnRdLmdldFgoKSArIE1hdGguY29zKGFjKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tuc3RhcnRdLnNldFkoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW3N0YXJ0XS5nZXRZKCkgKyBNYXRoLnNpbihhYykpO1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gbnN0YXJ0O1xuICAgICAgICAgICAgICAgIGFjID0gdGhpcy5tYXhmMihhYXZlLCBhZW5kMiAtIDAuNSk7XG4gICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tuZW5kXS5zZXRYKHRoaXMuYmFzZXNbZW5kXS5nZXRYKCkgKyBNYXRoLmNvcyhhYykpO1xuICAgICAgICAgICAgICAgIHRoaXMuYmFzZXNbbmVuZF0uc2V0WSh0aGlzLmJhc2VzW2VuZF0uZ2V0WSgpICsgTWF0aC5zaW4oYWMpKTtcbiAgICAgICAgICAgICAgICBlbmQgPSBuZW5kO1xuICAgICAgICAgICAgICAgIG4gLT0gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoY29sbGlzaW9uICYmIG4gPiAxKTtcbiAgICB9XG59XG5cbk5BVmlldy5wcm90b3R5cGUuY29uc3RydWN0X2NpcmNsZV9zZWdtZW50ID0gZnVuY3Rpb24gY29uc3RydWN0X2NpcmNsZV9zZWdtZW50KHN0YXJ0LCBlbmQpe1xuICAgIHZhciBkeCwgZHksIHJyLCBtaWR4LCBtaWR5LCB4biwgeW4sIG5yeCwgbnJ5LCBteCwgbXksIGE7XG4gICAgdmFyIGwsIGosIGk7XG5cbiAgICBkeCA9IHRoaXMuYmFzZXNbZW5kXS5nZXRYKCkgLSB0aGlzLmJhc2VzW3N0YXJ0XS5nZXRYKCk7XG4gICAgZHkgPSB0aGlzLmJhc2VzW2VuZF0uZ2V0WSgpIC0gdGhpcy5iYXNlc1tzdGFydF0uZ2V0WSgpO1xuICAgIHJyID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICBsID0gZW5kIC0gc3RhcnQ7XG4gICAgaWYgKGwgPCAwKXtcbiAgICAgICAgbCArPSB0aGlzLm5iYXNlICsgMTtcbiAgICB9XG4gICAgaWYgKHJyID49IGwpIHtcbiAgICAgICAgZHggLz0gcnI7XG4gICAgICAgIGR5IC89IHJyO1xuICAgICAgICBmb3IgKGogPSAxOyBqIDwgbDsgaisrKSB7XG4gICAgICAgICAgICBpID0gc3RhcnQgKyBqO1xuICAgICAgICAgICAgaWYgKGkgPiB0aGlzLm5iYXNlKXtcbiAgICAgICAgICAgICAgICBpIC09IHRoaXMubmJhc2UgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5iYXNlc1tpXS5zZXRYKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW3N0YXJ0XS5nZXRYKCkgKyBkeCAqIGogLyBsKTtcbiAgICAgICAgICAgIHRoaXMuYmFzZXNbaV0uc2V0WShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tzdGFydF0uZ2V0WSgpICsgZHkgKiBqIC8gbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuZmluZF9jZW50ZXJfZm9yX2FyYygobCAtIDEpLCBycik7XG4gICAgICAgIGR4IC89IHJyO1xuICAgICAgICBkeSAvPSBycjtcbiAgICAgICAgbWlkeCA9IHRoaXMuYmFzZXNbc3RhcnRdLmdldFgoKSArIGR4ICogcnIgLyAyLjA7XG4gICAgICAgIG1pZHkgPSB0aGlzLmJhc2VzW3N0YXJ0XS5nZXRZKCkgKyBkeSAqIHJyIC8gMi4wO1xuICAgICAgICB4biA9IGR5O1xuICAgICAgICB5biA9IC1keDtcbiAgICAgICAgbnJ4ID0gbWlkeCArIHRoaXMuX2ggKiB4bjtcbiAgICAgICAgbnJ5ID0gbWlkeSArIHRoaXMuX2ggKiB5bjtcbiAgICAgICAgbXggPSB0aGlzLmJhc2VzW3N0YXJ0XS5nZXRYKCkgLSBucng7XG4gICAgICAgIG15ID0gdGhpcy5iYXNlc1tzdGFydF0uZ2V0WSgpIC0gbnJ5O1xuICAgICAgICByciA9IE1hdGguc3FydChteCAqIG14ICsgbXkgKiBteSk7XG4gICAgICAgIGEgPSBNYXRoLmF0YW4yKG15LCBteCk7XG4gICAgICAgIGZvciAoaiA9IDE7IGogPCBsOyBqKyspIHtcbiAgICAgICAgICAgIGkgPSBzdGFydCArIGo7XG4gICAgICAgICAgICBpZiAoaSA+IHRoaXMubmJhc2Upe1xuICAgICAgICAgICAgICAgIGkgLT0gdGhpcy5uYmFzZSArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmJhc2VzW2ldLnNldFgobnJ4ICsgcnIgKiBNYXRoLmNvcyhhICsgaiAqIHRoaXMuYW5nbGVpbmMpKTtcbiAgICAgICAgICAgIHRoaXMuYmFzZXNbaV0uc2V0WShucnkgKyByciAqIE1hdGguc2luKGEgKyBqICogdGhpcy5hbmdsZWluYykpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5OQVZpZXcucHJvdG90eXBlLmZpbmRfY2VudGVyX2Zvcl9hcmMgPSBmdW5jdGlvbiBmaW5kX2NlbnRlcl9mb3JfYXJjKG4sIGIpe1xuICAgIHZhciBoLCBoaGksIGhsb3csIHIsIGRpc2MsIHRoZXRhLCBlLCBwaGk7XG4gICAgdmFyIGl0ZXI7XG5cbiAgICBoaGkgPSAobiArIDEuMCkgLyBNYXRoLlBJO1xuICAgIC8vIGNoYW5nZWQgdG8gcHJldmVudCBkaXYgYnkgemVybyBpZiAoaWgpXG4gICAgaGxvdyA9IC1oaGkgLSBiIC8gKG4gKyAxLjAwMDAwMSAtIGIpO1xuICAgIGlmIChiIDwgMSl7XG4gICAgICAgIC8vIG90aGVyd2lzZSB3ZSBtaWdodCBmYWlsIGJlbG93IChpaClcbiAgICAgICAgaGxvdyA9IDA7XG4gICAgfVxuICAgIGl0ZXIgPSAwO1xuICAgIGRvIHtcbiAgICAgICAgaCA9IChoaGkgKyBobG93KSAvIDIuMDtcbiAgICAgICAgciA9IE1hdGguc3FydChoICogaCArIGIgKiBiIC8gNC4wKTtcbiAgICAgICAgZGlzYyA9IDEuMCAtIDAuNSAvIChyICogcik7XG4gICAgICAgIGlmIChNYXRoLmFicyhkaXNjKSA+IDEuMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmV4cGVjdGVkIGxhcmdlIG1hZ25pdHVkZSBkaXNjcmltaW5hbnQgPSBcIiArIGRpc2NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiIFwiICsgcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhldGEgPSBNYXRoLmFjb3MoZGlzYyk7XG4gICAgICAgIHBoaSA9IE1hdGguYWNvcyhoIC8gcik7XG4gICAgICAgIGUgPSB0aGV0YSAqIChuICsgMSkgKyAyICogcGhpIC0gMiAqIE1hdGguUEk7XG4gICAgICAgIGlmIChlID4gMC4wKSB7XG4gICAgICAgICAgICBobG93ID0gaDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGhoaSA9IGg7XG4gICAgICAgIH1cbiAgICB9IHdoaWxlIChNYXRoLmFicyhlKSA+IDAuMDAwMSAmJiArK2l0ZXIgPCB0aGlzLk1BWElURVIpO1xuICAgIGlmIChpdGVyID49IHRoaXMuTUFYSVRFUikge1xuICAgICAgICBpZiAobm9JdGVyYXRpb25GYWlsdXJlWWV0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkl0ZXJhdGlvbiBmYWlsZWQgaW4gZmluZF9jZW50ZXJfZm9yX2FyY1wiKTtcbiAgICAgICAgICAgIG5vSXRlcmF0aW9uRmFpbHVyZVlldCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGggPSAwLjA7XG4gICAgICAgIHRoZXRhID0gMC4wO1xuICAgIH1cbiAgICB0aGlzLl9oID0gaDtcbiAgICB0aGlzLmFuZ2xlaW5jID0gdGhldGE7XG59XG5cbk5BVmlldy5wcm90b3R5cGUuZ2VuZXJhdGVfcmVnaW9uID0gZnVuY3Rpb24gZ2VuZXJhdGVfcmVnaW9uKGNwKXtcbiAgICB2YXIgbCwgc3RhcnQsIGVuZCwgaSwgbWF0ZTtcbiAgICB2YXIgcnA7XG5cbiAgICBycCA9IGNwLmdldFJlZ2lvbigpO1xuICAgIGwgPSAwO1xuICAgIGlmIChjcC5nZXRTdGFydCgpID09IHJwLmdldFN0YXJ0MSgpKSB7XG4gICAgICAgIHN0YXJ0ID0gcnAuZ2V0U3RhcnQxKCk7XG4gICAgICAgIGVuZCA9IHJwLmdldEVuZDEoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHN0YXJ0ID0gcnAuZ2V0U3RhcnQyKCk7XG4gICAgICAgIGVuZCA9IHJwLmdldEVuZDIoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuYmFzZXNbY3AuZ2V0U3RhcnQoKV0uZ2V0WCgpID4gdGhpcy5BTlVNIC0gMTAwLjBcbiAgICAgICAgICAgIHx8IHRoaXMuYmFzZXNbY3AuZ2V0RW5kKCldLmdldFgoKSA+IHRoaXMuQU5VTSAtIDEwMC4wKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgIFwiQmFkIHJlZ2lvbiBwYXNzZWQgdG8gZ2VuZXJhdGVfcmVnaW9uLiBDb29yZGluYXRlcyBub3QgZGVmaW5lZC5cIik7XG4gICAgfVxuICAgIGZvciAoaSA9IHN0YXJ0ICsgMTsgaSA8PSBlbmQ7IGkrKykge1xuICAgICAgICBsKys7XG4gICAgICAgIHRoaXMuYmFzZXNbaV0uc2V0WChcbiAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2NwLmdldFN0YXJ0KCldLmdldFgoKSArIHRoaXMuSEVMSVhfRkFDVE9SICogbFxuICAgICAgICAgICAgICAgICAgICAgICAgKiBjcC5nZXRYcmFkKCkpO1xuICAgICAgICB0aGlzLmJhc2VzW2ldLnNldFkoXG4gICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tjcC5nZXRTdGFydCgpXS5nZXRZKCkgKyB0aGlzLkhFTElYX0ZBQ1RPUiAqIGxcbiAgICAgICAgICAgICAgICAgICAgICAgICogY3AuZ2V0WXJhZCgpKTtcbiAgICAgICAgbWF0ZSA9IHRoaXMuYmFzZXNbaV0uZ2V0TWF0ZSgpO1xuICAgICAgICB0aGlzLmJhc2VzW21hdGVdLnNldFgoXG4gICAgICAgICAgICAgICAgdGhpcy5iYXNlc1tjcC5nZXRFbmQoKV0uZ2V0WCgpICsgdGhpcy5IRUxJWF9GQUNUT1IgKiBsXG4gICAgICAgICAgICAgICAgICAgICAgICAqIGNwLmdldFhyYWQoKSk7XG4gICAgICAgIHRoaXMuYmFzZXNbbWF0ZV0uc2V0WShcbiAgICAgICAgICAgICAgICB0aGlzLmJhc2VzW2NwLmdldEVuZCgpXS5nZXRZKCkgKyB0aGlzLkhFTElYX0ZBQ1RPUiAqIGxcbiAgICAgICAgICAgICAgICAgICAgICAgICogY3AuZ2V0WXJhZCgpKTtcblxuICAgIH1cbn1cblxuTkFWaWV3LnByb3RvdHlwZS5taW5mMiA9IGZ1bmN0aW9uIG1pbmYyKHgxLCB4Mikge1xuICAgIHJldHVybiAoKHgxKSA8ICh4MikpID8gKHgxKSA6ICh4Mik7XG59XG5cbk5BVmlldy5wcm90b3R5cGUubWF4ZjIgPSBmdW5jdGlvbiBtYXhmMih4MSwgeDIpIHtcbiAgICByZXR1cm4gKCh4MSkgPiAoeDIpKSA/ICh4MSkgOiAoeDIpO1xufVxuXG5OQVZpZXcucHJvdG90eXBlLmNvbm5lY3RlZF9jb25uZWN0aW9uID0gZnVuY3Rpb24gY29ubmVjdGVkX2Nvbm5lY3Rpb24oY3AsIGNwbmV4dCkge1xuICAgIGlmIChjcC5pc0V4dHJ1ZGVkKCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNwLmdldEVuZCgpICsgMSA9PSBjcG5leHQuZ2V0U3RhcnQoKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gUmFkbG9vcCgpIHtcblx0dGhpcy5yYWRpdXMgPSBudWxsO1xuXHR0aGlzLmxvb3BudW1iZXIgPSBudWxsO1xuXHR0aGlzLm5leHQgPSBudWxsO1xuICAgIHRoaXMucHJldiA9IG51bGw7XG59XG5cblJhZGxvb3AucHJvdG90eXBlLmdldFJhZGl1cyA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLnJhZGl1cztcbn1cblxuUmFkbG9vcC5wcm90b3R5cGUuc2V0UmFkaXVzID0gZnVuY3Rpb24ocmFkaXVzKXtcblx0dGhpcy5yYWRpdXMgPSByYWRpdXM7XG59XG5cblJhZGxvb3AucHJvdG90eXBlLmdldExvb3BudW1iZXIgPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5sb29wbnVtYmVyO1xufVxuXG5SYWRsb29wLnByb3RvdHlwZS5zZXRMb29wbnVtYmVyID0gZnVuY3Rpb24obG9vcG51bWJlcil7XG5cdHRoaXMubG9vcG51bWJlciA9IGxvb3BudW1iZXI7XG59XG5cblJhZGxvb3AucHJvdG90eXBlLmdldE5leHQgPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5uZXh0O1xufVxuXG5SYWRsb29wLnByb3RvdHlwZS5zZXROZXh0ID0gZnVuY3Rpb24obmV4dCl7XG5cdHRoaXMubmV4dCA9IG5leHQ7XG59XG5cblJhZGxvb3AucHJvdG90eXBlLmdldFByZXYgPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5wcmV2O1xufVxuXG5SYWRsb29wLnByb3RvdHlwZS5zZXRQcmV2ID0gZnVuY3Rpb24ocHJldil7XG5cdHRoaXMucHJldiA9IHByZXY7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gUmVnaW9uKCkge1xuXHR0aGlzLl9zdGFydDEgPSBudWxsO1xuICAgIHRoaXMuX2VuZDEgPSBudWxsO1xuICAgIHRoaXMuX3N0YXJ0MiA9IG51bGw7XG4gICAgdGhpcy5fZW5kMiA9IG51bGw7XG59XG5cblJlZ2lvbi5wcm90b3R5cGUuZ2V0U3RhcnQxID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMuX3N0YXJ0MTtcbn1cblxuUmVnaW9uLnByb3RvdHlwZS5zZXRTdGFydDEgPSBmdW5jdGlvbihzdGFydDEpe1xuXHR0aGlzLl9zdGFydDEgPSBzdGFydDE7XG59XG5cblJlZ2lvbi5wcm90b3R5cGUuZ2V0RW5kMSA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLl9lbmQxO1xufVxuXG5SZWdpb24ucHJvdG90eXBlLnNldEVuZDEgPSBmdW5jdGlvbihlbmQxKXtcblx0dGhpcy5fZW5kMSA9IGVuZDE7XG59XG5cblJlZ2lvbi5wcm90b3R5cGUuZ2V0U3RhcnQyID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMuX3N0YXJ0Mjtcbn1cblxuUmVnaW9uLnByb3RvdHlwZS5zZXRTdGFydDIgPSBmdW5jdGlvbihzdGFydDIpe1xuXHR0aGlzLl9zdGFydDIgPSBzdGFydDI7XG59XG5cblJlZ2lvbi5wcm90b3R5cGUuZ2V0RW5kMiA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLl9lbmQyO1xufVxuXG5SZWdpb24ucHJvdG90eXBlLnNldEVuZDIgPSBmdW5jdGlvbihlbmQyKXtcblx0dGhpcy5fZW5kMiA9IGVuZDI7XG59XG4iLCJpbXBvcnQge2FycmF5c0VxdWFsLFJOQVV0aWxpdGllcyxybmFVdGlsaXRpZXN9IGZyb20gJy4vcm5hdXRpbHMuanMnO1xuaW1wb3J0IHNsdWdpZCBmcm9tICdzbHVnaWQnO1xuXG52YXIgbnVtYmVyU29ydCA9IGZ1bmN0aW9uKGEsYikgeyByZXR1cm4gYSAtIGI7IH07XG5cbmlmICh0eXBlb2YoU3RyaW5nLnByb3RvdHlwZS50cmltKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBTdHJpbmcucHJvdG90eXBlLnRyaW0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyh0aGlzKS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFByb3RlaW5HcmFwaChzdHJ1Y3ROYW1lLCBzaXplLCB1aWQpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBzZWxmLnR5cGUgPSAncHJvdGVpbic7XG4gICAgc2VsZi5zaXplID0gc2l6ZTtcbiAgICBzZWxmLm5vZGVzID0gW3snbmFtZSc6ICdQJyxcbiAgICAgICAgICAgICAgICAgICAnbnVtJzogMSxcbiAgICAgICAgICAgICAgICAgICAncmFkaXVzJzogMyAqICBNYXRoLnNxcnQoc2l6ZSksXG4gICAgICAgICAgICAgICAgICAgJ3JuYSc6IHNlbGYsXG4gICAgICAgICAgICAgICAgICAgJ25vZGVUeXBlJzogJ3Byb3RlaW4nLFxuICAgICAgICAgICAgICAgICAgICdzdHJ1Y3ROYW1lJzogc3RydWN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAnZWxlbVR5cGUnOiAncCcsXG4gICAgICAgICAgICAgICAgICAgJ3NpemUnOiBzaXplLFxuICAgICAgICAgICAgICAgICAgICd1aWQnOiBzbHVnaWQubmljZSgpfV07XG5cbiAgICBzZWxmLmxpbmtzID0gW107XG4gICAgc2VsZi51aWQgPSBzbHVnaWQubmljZSgpO1xuXG4gICAgc2VsZi5hZGRVaWRzID0gZnVuY3Rpb24odWlkcykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVpZHMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBzZWxmLm5vZGVzW2ldLnVpZCA9IHVpZHNbaV07XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZ2V0VWlkcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvKiBHZXQgdGhlIHBvc2l0aW9ucyBvZiBlYWNoIG5vZGUgc28gdGhhdCB0aGV5XG4gICAgICAgICAqIGNhbiBiZSBwYXNzZWQgdG8gZWxlbWVudHNUb0pzb24gbGF0ZXJcbiAgICAgICAgICovXG4gICAgICAgIHVpZHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLmRvdGJyYWNrZXQubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICB1aWRzLnB1c2goc2VsZi5ub2Rlc1tpXS51aWQpO1xuXG4gICAgICAgIHJldHVybiB1aWRzO1xuICAgIH07XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJOQUdyYXBoKHNlcSA9ICcnLCBkb3RicmFja2V0ID0gJycsIHN0cnVjdE5hbWUgPSAnJywgc3RhcnROdW1iZXIgPSAxKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgc2VsZi50eXBlID0gJ3JuYSc7XG4gICAgc2VsZi5jaXJjdWxhcml6ZUV4dGVybmFsID0gZmFsc2U7XG4gICAgc2VsZi5zZXEgPSBzZXE7XG4gICAgc2VsZi5kb3RicmFja2V0ID0gZG90YnJhY2tldDsgIC8vaS5lLiAuLigoLi4pKS4uXG4gICAgc2VsZi5zdHJ1Y3ROYW1lID0gc3RydWN0TmFtZTtcbiAgICBzZWxmLmNpcmN1bGFyID0gZmFsc2U7XG5cbiAgICBpZiAoc2VsZi5kb3RicmFja2V0LnNsaWNlKC0xKSA9PSAnKicpIHtcbiAgICAgICAgLy9jaXJjdWxhciBSTkFcbiAgICAgICAgc2VsZi5kb3RicmFja2V0ID0gc2VsZi5kb3RicmFja2V0LnNsaWNlKDAsIC0xKTtcbiAgICAgICAgc2VsZi5jaXJjdWxhciA9IHRydWU7XG4gICAgfVxuXG4gICAgc2VsZi51aWQgPSBzbHVnaWQubmljZSgpO1xuXG4gICAgc2VsZi5lbGVtZW50cyA9IFtdOyAgICAgICAgICAgIC8vc3RvcmUgdGhlIGVsZW1lbnRzIGFuZCB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9udWNsZW90aWRlcyB0aGV5IGNvbnRhaW5cbiAgICBzZWxmLnBzZXVkb2tub3RQYWlycyA9IFtdO1xuICAgIHNlbGYubnVjc1RvTm9kZXMgPSB7fTtcblxuICAgIHNlbGYuYWRkVWlkcyA9IGZ1bmN0aW9uKHVpZHMpIHtcbiAgICAgICAgbGV0IG51Y2xlb3RpZGVOb2RlcyA9IHNlbGYubm9kZXMuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQubm9kZVR5cGUgPT0gJ251Y2xlb3RpZGUnOyB9KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVpZHMubGVuZ3RoICYmIGkgPCBudWNsZW90aWRlTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG51Y2xlb3RpZGVOb2Rlc1tpXS51aWQgPSB1aWRzW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuY29tcHV0ZVBhaXJ0YWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLnBhaXJ0YWJsZSA9IHJuYVV0aWxpdGllcy5kb3RicmFja2V0VG9QYWlydGFibGUoc2VsZi5kb3RicmFja2V0KTtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW1vdmVCcmVha3MgPSBmdW5jdGlvbih0YXJnZXRTdHJpbmcpIHtcbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBjaGFpbiBicmVha3MgKGRlbm90ZWQgd2l0aCBhICcmJywgd2hpY2ggaW5kaWNhdGVcbiAgICAgICAgLy8gdGhhdCB0aGUgaW5wdXQgcmVwcmVzZW50cyBtb3JlIHRoYW4gb25lIHN0cmFuZClcbiAgICAgICAgdmFyIGJyZWFrcyA9IFtdO1xuICAgICAgICB2YXIgYnJlYWtJbmRleCA9IC0xO1xuXG4gICAgICAgIHdoaWxlICgoYnJlYWtJbmRleCA9IHRhcmdldFN0cmluZy5pbmRleE9mKCcmJykpID49IDApIHtcbiAgICAgICAgICAgIGJyZWFrcy5wdXNoKGJyZWFrSW5kZXgpO1xuICAgICAgICAgICAgdGFyZ2V0U3RyaW5nID0gdGFyZ2V0U3RyaW5nLnN1YnN0cmluZygwLCBicmVha0luZGV4KSArIHRhcmdldFN0cmluZy5zdWJzdHJpbmcoYnJlYWtJbmRleCsxLCB0YXJnZXRTdHJpbmcubGVuZ3RoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHt0YXJnZXRTdHJpbmc6IHRhcmdldFN0cmluZywgIGJyZWFrczogYnJlYWtzfTtcbiAgICB9O1xuXG4gICAgdmFyIHJldCA9IHNlbGYucmVtb3ZlQnJlYWtzKHNlbGYuZG90YnJhY2tldCk7XG4gICAgc2VsZi5kb3RicmFja2V0ID0gcmV0LnRhcmdldFN0cmluZztcbiAgICBzZWxmLmRvdEJyYWNrZXRCcmVha3MgPSByZXQuYnJlYWtzO1xuXG4gICAgcmV0ID0gc2VsZi5yZW1vdmVCcmVha3Moc2VsZi5zZXEpO1xuICAgIHNlbGYuc2VxID0gcmV0LnRhcmdldFN0cmluZztcbiAgICBzZWxmLnNlcUJyZWFrcyA9IHJldC5icmVha3M7XG5cbiAgICBzZWxmLnJuYUxlbmd0aCA9IHNlbGYuZG90YnJhY2tldC5sZW5ndGg7XG5cbiAgICBpZiAoIWFycmF5c0VxdWFsKHNlbGYuZG90QnJhY2tldEJyZWFrcywgc2VsZi5zZXFCcmVha3MpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdXQVJOSU5HOiBTZXF1ZW5jZSBhbmQgc3RydWN0dXJlIGJyZWFrcyBub3QgZXF1YWwnKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1dBUk5JTkc6IFVzaW5nIHRoZSBicmVha3MgaW4gdGhlIHN0cnVjdHVyZScpO1xuICAgIH1cblxuICAgIHNlbGYuY29tcHV0ZVBhaXJ0YWJsZSgpO1xuXG4gICAgc2VsZi5hZGRQb3NpdGlvbnMgPSBmdW5jdGlvbihub2RlVHlwZSwgcG9zaXRpb25zKSB7XG4gICAgICAgIGxldCBsYWJlbE5vZGVzID0gc2VsZi5ub2Rlcy5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5ub2RlVHlwZSA9PSBub2RlVHlwZTsgfSk7XG5cbiAgICAgICAgZm9yICAobGV0IGkgPSAwOyBpIDwgbGFiZWxOb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGFiZWxOb2Rlc1tpXS54ID0gcG9zaXRpb25zW2ldWzBdO1xuICAgICAgICAgICAgbGFiZWxOb2Rlc1tpXS55ID0gcG9zaXRpb25zW2ldWzFdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYnJlYWtOb2Rlc1RvRmFrZU5vZGVzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGNvbnZlcnQgYWxsIHRoZSBub2RlcyBmb2xsb3dpbmcgYnJlYWtzIHRvIGZha2Ugbm9kZXNcbiAgICAgICAgbGV0IGxhYmVsTm9kZXMgPSBzZWxmLm5vZGVzLmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkLm5vZGVUeXBlID09ICdudWNsZW90aWRlJzsgfSk7XG5cbiAgICAgICAgLy8gaWYgYSBub2RlIHdhcyBhbiBhcnRpZmljYWwgYnJlYWsgbm9kZSwgY29udmVydCBpdCB0byBhIG1pZGRsZVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxhYmVsTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzZWxmLmRvdEJyYWNrZXRCcmVha3MuaW5kZXhPZihpKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgbGFiZWxOb2Rlc1tpXS5ub2RlVHlwZSA9ICdtaWRkbGUnO1xuICAgICAgICAgICAgICAgIGxhYmVsTm9kZXNbaSsxXS5ub2RlVHlwZSA9ICdtaWRkbGUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYnJva2VuID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIGNoYW5nZSB0aGUgZWxlbVR5cGUgb2YgdGhlIG90aGVyIG5vZGVzIGluIHRoZSBlbGVtZW50IGNvbnRhaW5pbmdcbiAgICAgICAgICAgIC8vIHRoZSBicmVha1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzZWxmLmVsZW1lbnRzW2ldWzJdLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuZG90QnJhY2tldEJyZWFrcy5pbmRleE9mKHNlbGYuZWxlbWVudHNbaV1bMl1bal0pID49IDApXG4gICAgICAgICAgICAgICAgICAgIGJyb2tlbiA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChicm9rZW4pIHtcbiAgICAgICAgICAgICAgICBzZWxmLmVsZW1lbnRzW2ldWzJdLm1hcChmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh4ID09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZXNbeC0xXS5lbGVtVHlwZSA9ICdlJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5lbGVtZW50c1tpXVsyXS5tYXAoZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoeCA9PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vZGVzW3gtMV0uZWxlbVR5cGUgPSBzZWxmLmVsZW1lbnRzW2ldWzBdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmdldFBvc2l0aW9ucyA9IGZ1bmN0aW9uKG5vZGVUeXBlKSB7XG4gICAgICAgIHZhciBwb3NpdGlvbnMgPSBbXTtcbiAgICAgICAgbGV0IG51Y2xlb3RpZGVOb2RlcyA9IHNlbGYubm9kZXMuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQubm9kZVR5cGUgPT0gbm9kZVR5cGU7IH0pO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVjbGVvdGlkZU5vZGVzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgcG9zaXRpb25zLnB1c2goW251Y2xlb3RpZGVOb2Rlc1tpXS54LCBudWNsZW90aWRlTm9kZXNbaV0ueV0pO1xuXG4gICAgICAgIHJldHVybiBwb3NpdGlvbnM7XG4gICAgfTtcblxuICAgIHNlbGYuZ2V0VWlkcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvKiBHZXQgdGhlIHBvc2l0aW9ucyBvZiBlYWNoIG5vZGUgc28gdGhhdCB0aGV5XG4gICAgICAgICAqIGNhbiBiZSBwYXNzZWQgdG8gZWxlbWVudHNUb0pzb24gbGF0ZXJcbiAgICAgICAgICovXG4gICAgICAgIHZhciB1aWRzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZi5kb3RicmFja2V0Lmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgdWlkcy5wdXNoKHNlbGYubm9kZXNbaV0udWlkKTtcblxuICAgICAgICByZXR1cm4gdWlkcztcbiAgICB9O1xuXG4gICAgc2VsZi5yZWluZm9yY2VTdGVtcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcHQgPSBzZWxmLnBhaXJ0YWJsZTtcbiAgICAgICAgbGV0IHJlbGV2YW50RWxlbWVudHMgPSBzZWxmLmVsZW1lbnRzLmZpbHRlciggZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIGRbMF0gPT0gJ3MnICYmIGRbMl0ubGVuZ3RoID49IDQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVsZXZhbnRFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGFsbE51Y3MgPSByZWxldmFudEVsZW1lbnRzW2ldWzJdO1xuICAgICAgICAgICAgbGV0IG51Y3MgPSBhbGxOdWNzLnNsaWNlKDAsIGFsbE51Y3MubGVuZ3RoIC8gMik7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVjcy5sZW5ndGgtMTsgaisrKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5hZGRGYWtlTm9kZShbbnVjc1tqXSwgbnVjc1tqKzFdLCBwdFtudWNzW2orMV1dLCBwdFtudWNzW2pdXV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVpbmZvcmNlTG9vcHMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLypcbiAgICAgICAgICogQWRkIGEgc2V0IG9mIGZha2Ugbm9kZXMgdG8gZW5mb3JjZSB0aGUgc3RydWN0dXJlXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgZmlsdGVyTnVjcyA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkICE9PSAwICYmIGQgPD0gc2VsZi5kb3RicmFja2V0Lmxlbmd0aDtcbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYuZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzZWxmLmVsZW1lbnRzW2ldWzBdID09ICdzJyB8fCAoIXNlbGYuY2lyY3VsYXJpemVFeHRlcm5hbCAmJiBzZWxmLmVsZW1lbnRzW2ldWzBdID09ICdlJykpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIHZhciBudWNzID0gc2VsZi5lbGVtZW50c1tpXVsyXS5maWx0ZXIoZmlsdGVyTnVjcyk7XG5cbiAgICAgICAgICAgIGlmIChzZWxmLmVsZW1lbnRzW2ldWzBdID09ICdlJykge1xuICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlMSA9IHsnbmFtZSc6ICcnLFxuICAgICAgICAgICAgICAgICAgICAnbnVtJzogLTMsXG4gICAgICAgICAgICAgICAgICAgIC8vJ3JhZGl1cyc6IDE4ICogcmFkaXVzIC02LFxuICAgICAgICAgICAgICAgICAgICAncmFkaXVzJzogMCxcbiAgICAgICAgICAgICAgICAgICAgJ3JuYSc6IHNlbGYsXG4gICAgICAgICAgICAgICAgICAgICdub2RlVHlwZSc6ICdtaWRkbGUnLFxuICAgICAgICAgICAgICAgICAgICAnZWxlbVR5cGUnOiAnZicsXG4gICAgICAgICAgICAgICAgICAgICdudWNzJzogW10sXG4gICAgICAgICAgICAgICAgICAgICd4Jzogc2VsZi5ub2Rlc1tzZWxmLnJuYUxlbmd0aC0xXS54LFxuICAgICAgICAgICAgICAgICAgICAneSc6IHNlbGYubm9kZXNbc2VsZi5ybmFMZW5ndGgtMV0ueSxcbiAgICAgICAgICAgICAgICAgICAgJ3B4Jzogc2VsZi5ub2Rlc1tzZWxmLnJuYUxlbmd0aC0xXS5weCxcbiAgICAgICAgICAgICAgICAgICAgJ3B5Jzogc2VsZi5ub2Rlc1tzZWxmLnJuYUxlbmd0aC0xXS5weSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpZCc6IHNsdWdpZC5uaWNlKCkgfTtcbiAgICAgICAgICAgICAgICB2YXIgbmV3Tm9kZTIgPSB7J25hbWUnOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgJ251bSc6IC0yLFxuICAgICAgICAgICAgICAgICAgICAvLydyYWRpdXMnOiAxOCAqIHJhZGl1cyAtNixcbiAgICAgICAgICAgICAgICAgICAgJ3JhZGl1cyc6IDAsXG4gICAgICAgICAgICAgICAgICAgICdybmEnOiBzZWxmLFxuICAgICAgICAgICAgICAgICAgICAnbm9kZVR5cGUnOiAnbWlkZGxlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VsZW1UeXBlJzogJ2YnLFxuICAgICAgICAgICAgICAgICAgICAnbnVjcyc6IFtdLFxuICAgICAgICAgICAgICAgICAgICAneCc6IHNlbGYubm9kZXNbMF0ueCxcbiAgICAgICAgICAgICAgICAgICAgJ3knOiBzZWxmLm5vZGVzWzBdLnksXG4gICAgICAgICAgICAgICAgICAgICdweCc6IHNlbGYubm9kZXNbMF0ucHgsXG4gICAgICAgICAgICAgICAgICAgICdweSc6IHNlbGYubm9kZXNbMF0ucHksXG4gICAgICAgICAgICAgICAgICAgICd1aWQnOiBzbHVnaWQubmljZSgpIH07XG5cbiAgICAgICAgICAgICAgICAgICAgbnVjcy5wdXNoKHNlbGYubm9kZXMubGVuZ3RoKzEpO1xuICAgICAgICAgICAgICAgICAgICBudWNzLnB1c2goc2VsZi5ub2Rlcy5sZW5ndGgrMik7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZXMucHVzaChuZXdOb2RlMSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZXMucHVzaChuZXdOb2RlMik7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgc2VsZi5hZGRGYWtlTm9kZShudWNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnVwZGF0ZUxpbmtVaWRzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZi5saW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc2VsZi5saW5rc1tpXS51aWQgPSBzZWxmLmxpbmtzW2ldLnNvdXJjZS51aWQgKyBzZWxmLmxpbmtzW2ldLnRhcmdldC51aWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5hZGRGYWtlTm9kZSA9IGZ1bmN0aW9uKG51Y3MpIHtcbiAgICAgICAgdmFyIGxpbmtMZW5ndGggPSAxODsgLy9tYWtlIHN1cmUgdGhpcyBpcyBjb25zaXN0ZW50IHdpdGggdGhlIHZhbHVlIGluIGZvcmNlLmpzXG4gICAgICAgIHZhciBub2RlV2lkdGggPSA2O1xuICAgICAgICB2YXIgYW5nbGUgPSAoMy4xNDE1ICogMikgLyAoMiAqIG51Y3MubGVuZ3RoKTtcbiAgICAgICAgdmFyIHJhZGl1cyA9ICBsaW5rTGVuZ3RoIC8gKDIgKiBNYXRoLnRhbihhbmdsZSkpO1xuXG4gICAgICAgIHZhciBmYWtlTm9kZVVpZCA9ICcnO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVjcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIGZha2VOb2RlVWlkICs9IHNlbGYubm9kZXNbbnVjc1tpXS0xXS51aWQ7XG5cbiAgICAgICAgdmFyIG5ld05vZGUgPSB7J25hbWUnOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAnbnVtJzogLTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgLy8ncmFkaXVzJzogMTggKiByYWRpdXMgLTYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3JhZGl1cyc6IHJhZGl1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAncm5hJzogc2VsZixcbiAgICAgICAgICAgICAgICAgICAgICAgICAnbm9kZVR5cGUnOiAnbWlkZGxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAnZWxlbVR5cGUnOiAnZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ251Y3MnOiBudWNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICd1aWQnOiBmYWtlTm9kZVVpZCB9O1xuICAgICAgICBzZWxmLm5vZGVzLnB1c2gobmV3Tm9kZSk7XG5cbiAgICAgICAgdmFyIG5ld1ggPSAwO1xuICAgICAgICB2YXIgbmV3WSA9IDA7XG4gICAgICAgIHZhciBjb29yZHNDb3VudGVkID0gMDtcblxuICAgICAgICBhbmdsZSA9IChudWNzLmxlbmd0aCAtIDIpICogMy4xNDE1OSAvICgyICogbnVjcy5sZW5ndGgpO1xuICAgICAgICByYWRpdXMgPSAwLjUgLyBNYXRoLmNvcyhhbmdsZSk7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBudWNzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAobnVjc1tqXSA9PT0gMCB8fCBudWNzW2pdID4gc2VsZi5kb3RicmFja2V0Lmxlbmd0aClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgLy9saW5rIHRvIHRoZSBjZW50ZXIgbm9kZVxuICAgICAgICAgICAgc2VsZi5saW5rcy5wdXNoKHsnc291cmNlJzogc2VsZi5ub2Rlc1tudWNzW2pdIC0gMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0YXJnZXQnOiBzZWxmLm5vZGVzW3NlbGYubm9kZXMubGVuZ3RoLTFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGlua1R5cGUnOiAnZmFrZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IHJhZGl1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpZCc6IHNsdWdpZC5uaWNlKCkgfSk7XG5cbiAgICAgICAgICAgIGlmIChudWNzLmxlbmd0aCA+IDQpIHtcbiAgICAgICAgICAgICAgICAvL2xpbmsgYWNyb3NzIHRoZSBsb29wXG4gICAgICAgICAgICAgICAgc2VsZi5saW5rcy5wdXNoKHsnc291cmNlJzogc2VsZi5ub2Rlc1tudWNzW2pdIC0gMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGFyZ2V0Jzogc2VsZi5ub2Rlc1tudWNzWyhqICsgTWF0aC5mbG9vcihudWNzLmxlbmd0aCAvIDIpKSAlIG51Y3MubGVuZ3RoXSAtIDFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xpbmtUeXBlJzogJ2Zha2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogcmFkaXVzICogMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aWQnOiBzbHVnaWQubmljZSgpIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgaWEgPSAoKG51Y3MubGVuZ3RoIC0gMikgKiAzLjE0MTU5KSAvIG51Y3MubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGMgPSAyICogTWF0aC5jb3MoMy4xNDE1OSAvIDIgLSBpYSAvIDIpO1xuICAgICAgICAgICAgLy9saW5rIHRvIG92ZXItbmVpZ2hib3JcbiAgICAgICAgICAgIHNlbGYubGlua3MucHVzaCh7J3NvdXJjZSc6IHNlbGYubm9kZXNbbnVjc1tqXSAtIDFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGFyZ2V0Jzogc2VsZi5ub2Rlc1tudWNzWyhqICsgMikgJSBudWNzLmxlbmd0aF0gLSAxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xpbmtUeXBlJzogJ2Zha2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiBjfSk7XG5cbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgbWVhbiBvZiB0aGUgY29vcmRpbmF0cyBpbiB0aGlzIGxvb3BcbiAgICAgICAgICAgIC8vIGFuZCBwbGFjZSB0aGUgZmFrZSBub2RlIHRoZXJlXG4gICAgICAgICAgICB2YXIgZnJvbU5vZGUgPSBzZWxmLm5vZGVzW251Y3Nbal0tMV07XG4gICAgICAgICAgICBpZiAoJ3gnIGluIGZyb21Ob2RlKSB7XG4gICAgICAgICAgICAgICAgbmV3WCArPSBmcm9tTm9kZS54O1xuICAgICAgICAgICAgICAgIG5ld1kgKz0gZnJvbU5vZGUueTtcblxuICAgICAgICAgICAgICAgIGNvb3Jkc0NvdW50ZWQgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb29yZHNDb3VudGVkID4gMCkge1xuICAgICAgICAgICAgLy8gdGhlIG51Y2xlb3RpZGVzIGhhZCBzZXQgcG9zaXRpb25zIHNvIHdlIGNhbiBjYWxjdWxhdGUgdGhlIHBvc2l0aW9uXG4gICAgICAgICAgICAvLyBvZiB0aGUgZmFrZSBub2RlXG4gICAgICAgICAgICBuZXdOb2RlLnggPSBuZXdYIC8gY29vcmRzQ291bnRlZDtcbiAgICAgICAgICAgIG5ld05vZGUueSA9IG5ld1kgLyBjb29yZHNDb3VudGVkO1xuICAgICAgICAgICAgbmV3Tm9kZS5weCA9IG5ld05vZGUueDtcbiAgICAgICAgICAgIG5ld05vZGUucHkgPSBuZXdOb2RlLnk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5jb25uZWN0RmFrZU5vZGVzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsaW5rTGVuZ3RoID0gMTg7XG5cbiAgICAgICAgLy8gV2Ugd2FudCB0byBiZSBhYmxlIHRvIGNvbm5lY3QgYWxsIG9mIHRoZSBmYWtlIG5vZGVzXG4gICAgICAgIC8vIGFuZCBjcmVhdGUgYSBzdHJ1Y3R1cmUgY29uc2lzdGluZyBvZiBqdXN0IHRoZW1cbiAgICAgICAgdmFyIGZpbHRlck91dE5vbkZha2VOb2RlcyA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkLm5vZGVUeXBlID09ICdtaWRkbGUnO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG51Y3NUb05vZGVzID0ge307XG4gICAgICAgIHZhciBmYWtlTm9kZXMgPSBzZWxmLm5vZGVzLmZpbHRlcihmaWx0ZXJPdXROb25GYWtlTm9kZXMpO1xuICAgICAgICB2YXIgbGlua2VkID0ge307XG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZSB0aGUgbnVjbGVvdGlkZXMgdG8gbm9kZXNcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gc2VsZi5ub2Rlcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIG51Y3NUb05vZGVzW2ldID0gW107XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmYWtlTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB0aGlzTm9kZSA9IGZha2VOb2Rlc1tpXTtcblxuICAgICAgICAgICAgLy8gZWFjaCBmYWtlIG5vZGUgcmVwcmVzZW50cyBhIGNlcnRhaW4gc2V0IG9mIG51Y2xlb3RpZGVzICh0aGlzTm9kZS5udWNzKVxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzTm9kZS5udWNzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXNOdWMgPSB0aGlzTm9kZS5udWNzW2pdO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgdG8gc2VlIGlmIHRoaXMgbnVjbGVvdGlkZSBoYXMgYmVlbiBzZWVuIGluIGFub3RoZXIgZmFrZSBub2RlXG4gICAgICAgICAgICAgICAgLy8gaWYgaXQgaGFzLCB0aGVuIHdlIGFkZCBhIGxpbmsgYmV0d2VlbiB0aGUgdHdvIG5vZGVzXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBudWNzVG9Ob2Rlc1t0aGlzTnVjXS5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkoW251Y3NUb05vZGVzW3RoaXNOdWNdW2tdLnVpZCwgdGhpc05vZGUudWlkXS5zb3J0KCkpIGluIGxpbmtlZClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlOyAvL2FscmVhZHkgbGlua2VkXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gbnVjc1RvTm9kZXNbdGhpc051Y11ba10ucmFkaXVzICsgdGhpc05vZGUucmFkaXVzO1xuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGlua3MucHVzaCh7J3NvdXJjZSc6IG51Y3NUb05vZGVzW3RoaXNOdWNdW2tdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGFyZ2V0JzogdGhpc05vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IGRpc3RhbmNlIC8gbGlua0xlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xpbmtUeXBlJzogJ2Zha2VfZmFrZSd9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBub3RlIHRoYXQgd2UndmUgYWxyZWFkeSBzZWVuIHRoaXMgbGlua1xuICAgICAgICAgICAgICAgICAgICBsaW5rZWRbSlNPTi5zdHJpbmdpZnkoW251Y3NUb05vZGVzW3RoaXNOdWNdW2tdLnVpZCwgdGhpc05vZGUudWlkXS5zb3J0KCkpXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbnVjc1RvTm9kZXNbdGhpc051Y10ucHVzaCh0aGlzTm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcblxuICAgIH07XG5cbiAgICBzZWxmLmFkZEV4dHJhTGlua3MgPSBmdW5jdGlvbihleHRyYUxpbmtzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZXh0cmFMaW5rcyA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXh0cmFMaW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IHNlbGYuZ2V0Tm9kZUZyb21OdWNsZW90aWRlcyhleHRyYUxpbmtzW2ldLmZyb20pO1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHNlbGYuZ2V0Tm9kZUZyb21OdWNsZW90aWRlcyhleHRyYUxpbmtzW2ldLnRvKTtcblxuICAgICAgICAgICAgdmFyIG5ld0xpbmsgPSB7J3NvdXJjZSc6IHNvdXJjZSwgJ3RhcmdldCc6IHRhcmdldCwgJ2xpbmtUeXBlJzogJ2V4dHJhJyxcbiAgICAgICAgICAgICAgICAnZXh0cmFMaW5rVHlwZSc6IGV4dHJhTGlua3NbaV0ubGlua1R5cGUsICd1aWQnOiBzbHVnaWQubmljZSgpIH07XG5cbiAgICAgICAgICAgICAgICBzZWxmLmxpbmtzLnB1c2gobmV3TGluayk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG5cblxuICAgIHNlbGYuZWxlbWVudHNUb0pzb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLyogQ29udmVydCBhIHNldCBvZiBzZWNvbmRhcnkgc3RydWN0dXJlIGVsZW1lbnRzIHRvIGEganNvblxuICAgICAgICAgKiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ3JhcGggdGhhdCBjYW4gYmUgdXNlZCB3aXRoIGQzJ3NcbiAgICAgICAgICogZm9yY2UtZGlyZWN0ZWQgbGF5b3V0IHRvIGdlbmVyYXRlIGEgdmlzdWFsaXphdGlvbiBvZlxuICAgICAgICAgKiB0aGUgc3RydWN0dXJlLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIHB0ID0gc2VsZi5wYWlydGFibGU7XG4gICAgICAgIHZhciBlbGVtZW50cyA9IHNlbGYuZWxlbWVudHM7XG5cbiAgICAgICAgc2VsZi5ub2RlcyA9IFtdO1xuICAgICAgICBzZWxmLmxpbmtzID0gW107XG5cbiAgICAgICAgLy9jcmVhdGUgYSByZXZlcnNlIGxvb2t1cCBzbyB3ZSBjYW4gZmluZCBvdXQgdGhlIHR5cGVcbiAgICAgICAgLy9vZiBlbGVtZW50IHRoYXQgYSBub2RlIGlzIHBhcnQgb2ZcbiAgICAgICAgdmFyIGVsZW1UeXBlcyA9IHt9O1xuXG4gICAgICAgIC8vc29ydCBzbyB0aGF0IHdlIGNvdW50IHN0ZW1zIGxhc3RcbiAgICAgICAgc2VsZi5lbGVtZW50cy5zb3J0KCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbnVjcyA9IHNlbGYuZWxlbWVudHNbaV1bMl07XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG51Y3MubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBlbGVtVHlwZXNbbnVjc1tqXV0gPSBzZWxmLmVsZW1lbnRzW2ldWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gcHRbMF07IGkrKykge1xuICAgICAgICAgICAgdmFyIG5vZGVOYW1lID0gc2VsZi5zZXFbaS0xXTtcblxuICAgICAgICAgICAgaWYgKHNlbGYuZG90QnJhY2tldEJyZWFrcy5pbmRleE9mKGktMSkgPj0gMCB8fFxuICAgICAgICAgICAgICAgIHNlbGYuZG90QnJhY2tldEJyZWFrcy5pbmRleE9mKGktMikgPj0gMCkge1xuICAgICAgICAgICAgICAgIG5vZGVOYW1lID0gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vY3JlYXRlIGEgbm9kZSBmb3IgZWFjaCBudWNsZW90aWRlXG4gICAgICAgICAgICBzZWxmLm5vZGVzLnB1c2goeyduYW1lJzogbm9kZU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICdudW0nOiBzdGFydE51bWJlciArIGkgLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmFkaXVzJzogNSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3JuYSc6IHNlbGYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICdub2RlVHlwZSc6ICdudWNsZW90aWRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0cnVjdE5hbWUnOiBzZWxmLnN0cnVjdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICdlbGVtVHlwZSc6IGVsZW1UeXBlc1tpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpZCc6IHNsdWdpZC5uaWNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsaW5rZWQnOiBmYWxzZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLm5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMClcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGVzW2ldLnByZXZOb2RlID0gbnVsbDtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYubm9kZXNbaV0ucHJldk5vZGUgPSBzZWxmLm5vZGVzW2ktMV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpID09IHNlbGYubm9kZXMubGVuZ3RoLTEpXG4gICAgICAgICAgICAgICAgc2VsZi5ub2Rlc1tpXS5uZXh0Tm9kZSA9IG51bGw7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGVzW2ldLm5leHROb2RlID0gc2VsZi5ub2Rlc1tpKzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gcHRbMF07IGkrKykge1xuXG4gICAgICAgICAgICBpZiAocHRbaV0gIT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBiYXNlLXBhaXIgbGlua3NcbiAgICAgICAgICAgICAgICBzZWxmLmxpbmtzLnB1c2goeydzb3VyY2UnOiBzZWxmLm5vZGVzW2ktMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGFyZ2V0Jzogc2VsZi5ub2Rlc1twdFtpXS0xXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsaW5rVHlwZSc6ICdiYXNlcGFpcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpZCc6IHNsdWdpZC5uaWNlKCkgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpID4gMSkge1xuICAgICAgICAgICAgICAgIC8vIGJhY2tib25lIGxpbmtzXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuZG90QnJhY2tldEJyZWFrcy5pbmRleE9mKGktMSkgPT09IC0xICYmXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZG90QnJhY2tldEJyZWFrcy5pbmRleE9mKGktMikgPT0gLTEgJiZcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kb3RCcmFja2V0QnJlYWtzLmluZGV4T2YoaS0zKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGVyZSBpcyBubyBicmVhayBpbiB0aGUgc3RyYW5kcyBoZXJlXG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIGNhbiBhZGQgYSBiYWNrYm9uZSBsaW5rXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGlua3MucHVzaCh7J3NvdXJjZSc6IHNlbGYubm9kZXNbaS0yXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0YXJnZXQnOiBzZWxmLm5vZGVzW2ktMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGlua1R5cGUnOiAnYmFja2JvbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aWQnOiBzbHVnaWQubmljZSgpIH0pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vZGVzW2ktMV0ubGlua2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL2FkZCB0aGUgcHNldWRva25vdCBsaW5rc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYucHNldWRva25vdFBhaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzZWxmLmxpbmtzLnB1c2goeydzb3VyY2UnOiBzZWxmLm5vZGVzW3NlbGYucHNldWRva25vdFBhaXJzW2ldWzBdLTFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0YXJnZXQnOiBzZWxmLm5vZGVzW3NlbGYucHNldWRva25vdFBhaXJzW2ldWzFdLTFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsaW5rVHlwZSc6ICdwc2V1ZG9rbm90JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aWQnOiBzbHVnaWQubmljZSgpfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZi5jaXJjdWxhcikge1xuICAgICAgICAgICAgc2VsZi5saW5rcy5wdXNoKHsnc291cmNlJzogc2VsZi5ub2Rlc1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGFyZ2V0Jzogc2VsZi5ub2Rlc1tzZWxmLnJuYUxlbmd0aC0xXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGlua1R5cGUnOiAnYmFja2JvbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpZCc6IHNsdWdpZC5uaWNlKCkgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnB0VG9FbGVtZW50cyA9IGZ1bmN0aW9uKHB0LCBsZXZlbCwgaSwgaikge1xuICAgICAgICAvKiBDb252ZXJ0IGEgcGFpciB0YWJsZSB0byBhIGxpc3Qgb2Ygc2Vjb25kYXJ5IHN0cnVjdHVyZVxuICAgICAgICAgKiBlbGVtZW50czpcbiAgICAgICAgICpcbiAgICAgICAgICogW1sncycsMSxbMiwzXV1cbiAgICAgICAgICpcbiAgICAgICAgICogVGhlICdzJyBpbmRpY2F0ZXMgdGhhdCBhbiBlbGVtZW50IGNhbiBiZSBhIHN0ZW0uIEl0IGNhbiBhbHNvIGJlXG4gICAgICAgICAqIGFuIGludGVyaW9yIGxvb3AgKCdpJyksIGEgaGFpcnBpbiBsb29wICgnaCcpIG9yIGEgbXVsdGlsb29wICgnbScpXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSBzZWNvbmQgbnVtYmVyICgxIGluIHRoaXMgY2FzZSkgaW5kaWNhdGVzIHRoZSBkZXB0aCBvclxuICAgICAgICAgKiBob3cgbWFueSBiYXNlIHBhaXJzIGhhdmUgdG8gYmUgYnJva2VuIHRvIGdldCB0byB0aGlzIGVsZW1lbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEZpbmFsbHksIHRoZXJlIGlzIHRoZSBsaXN0IG9mIG51Y2xlb3RpZGVzIHdoaWNoIGFyZSBwYXJ0IG9mXG4gICAgICAgICAqIG9mIHRoaXMgZWxlbWVudC5cbiAgICAgICAgICovXG4gICAgICAgIHZhciBlbGVtZW50cyA9IFtdO1xuICAgICAgICB2YXIgdTUgPSBbaS0xXTtcbiAgICAgICAgdmFyIHUzID0gW2orMV07XG5cbiAgICAgICAgaWYgKGkgPiBqKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuXG4gICAgICAgICAgICAvL2l0ZXJhdGUgb3ZlciB0aGUgdW5wYWlyZWQgcmVnaW9ucyBvbiBlaXRoZXIgc2lkZVxuICAgICAgICAgICAgLy90aGlzIGlzIGVpdGhlciA1JyBhbmQgMycgdW5wYWlyZWQgaWYgbGV2ZWwgPT0gMFxuICAgICAgICAgICAgLy9vciBhbiBpbnRlcmlvciBsb29wIG9yIGEgbXVsdGlsb29wXG4gICAgICAgICAgICBmb3IgKDsgcHRbaV0gPT09IDA7IGkrKykgeyB1NS5wdXNoKGkpOyB9XG4gICAgICAgICAgICBmb3IgKDsgcHRbal0gPT09IDA7IGotLSkgeyB1My5wdXNoKGopOyB9XG5cbiAgICAgICAgICAgIGlmIChpID4gaikge1xuICAgICAgICAgICAgICAgIC8vaGFpcnBpbiBsb29wIG9yIG9uZSBsYXJnZSB1bnBhaXJlZCBtb2xlY3VsZVxuICAgICAgICAgICAgICAgIHU1LnB1c2goaSk7XG4gICAgICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1snZScsbGV2ZWwsIHU1LnNvcnQobnVtYmVyU29ydCldXTtcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgY2hhaW4gYnJlYWtzIGR1ZVxuICAgICAgICAgICAgICAgICAgICAvLyB0byBtdWx0aXBsZSBzdHJhbmRzIGluIHRoZSBpbnB1dFxuICAgICAgICAgICAgICAgICAgICB2YXIgZXh0ZXJuYWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxlZnQgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJpZ2h0ID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdTUubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleHRlcm5hbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodC5wdXNoKHU1W2tdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0LnB1c2godTVba10pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5kb3RCcmFja2V0QnJlYWtzLmluZGV4T2YodTVba10pID49IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZXJuYWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4dGVybmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1snaCcsbGV2ZWwsIHU1LnNvcnQobnVtYmVyU29ydCldXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBub3QsIHRoaXMgaXMgYSBzaW1wbGUgaGFpcnBpbiBsb29wXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1snaCcsbGV2ZWwsIHU1LnNvcnQobnVtYmVyU29ydCldXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwdFtpXSAhPSBqKSB7XG4gICAgICAgICAgICAgICAgLy9tdWx0aWxvb3BcbiAgICAgICAgICAgICAgICB2YXIgbSA9IHU1O1xuICAgICAgICAgICAgICAgIHZhciBrID0gaTtcblxuICAgICAgICAgICAgICAgIC8vIHRoZSBudWNsZW90aWRlIGJlZm9yZSBhbmQgdGhlIHN0YXJ0aW5nIG51Y2xlb3RpZGVcbiAgICAgICAgICAgICAgICBtLnB1c2goayk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGsgPD0gaikge1xuICAgICAgICAgICAgICAgICAgICAvLyByZWN1cnNlIGludG8gYSBzdGVtXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gZWxlbWVudHMuY29uY2F0KHNlbGYucHRUb0VsZW1lbnRzKHB0LCBsZXZlbCwgaywgcHRba10pKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIG51Y2xlb3RpZGVzIGJldHdlZW4gc3RlbXNcbiAgICAgICAgICAgICAgICAgICAgbS5wdXNoKHB0W2tdKTtcbiAgICAgICAgICAgICAgICAgICAgayA9IHB0W2tdICsgMTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICg7IHB0W2tdID09PSAwICYmIGsgPD0gajsgaysrKSB7IG0ucHVzaChrKTt9XG4gICAgICAgICAgICAgICAgICAgIG0ucHVzaChrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbS5wb3AoKTtcbiAgICAgICAgICAgICAgICBtID0gbS5jb25jYXQodTMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cy5wdXNoKFsnZScsIGxldmVsLCBtLnNvcnQobnVtYmVyU29ydCldKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChbJ20nLCBsZXZlbCwgbS5zb3J0KG51bWJlclNvcnQpXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHRbaV0gPT09IGopIHtcbiAgICAgICAgICAgICAgICAvL2ludGVyaW9yIGxvb3BcbiAgICAgICAgICAgICAgICB1NS5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIHUzLnB1c2goaik7XG5cbiAgICAgICAgICAgICAgICB2YXIgY29tYmluZWQgPSB1NS5jb25jYXQodTMpO1xuICAgICAgICAgICAgICAgIGlmIChjb21iaW5lZC5sZW5ndGggPiA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goWydlJyxsZXZlbCwgdTUuY29uY2F0KHUzKS5zb3J0KG51bWJlclNvcnQpXSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goWydpJyxsZXZlbCwgdTUuY29uY2F0KHUzKS5zb3J0KG51bWJlclNvcnQpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcyA9IFtdO1xuICAgICAgICAgICAgLy9nbyB0aHJvdWdoIHRoZSBzdGVtXG4gICAgICAgICAgICB3aGlsZSAocHRbaV0gPT09IGogJiYgaSA8IGopIHtcbiAgICAgICAgICAgICAgICAvL29uZSBzdGVtXG4gICAgICAgICAgICAgICAgcy5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIHMucHVzaChqKTtcblxuICAgICAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgICAgICBqIC09IDE7XG5cbiAgICAgICAgICAgICAgICBsZXZlbCArPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1NSA9IFtpLTFdO1xuICAgICAgICAgICAgdTMgPSBbaisxXTtcbiAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goWydzJywgbGV2ZWwsIHMuc29ydChudW1iZXJTb3J0KV0pO1xuXG4gICAgICAgIHJldHVybiBlbGVtZW50cy5jb25jYXQoc2VsZi5wdFRvRWxlbWVudHMocHQsIGxldmVsLCBpLCBqKSk7XG4gICAgfTtcblxuICAgIHNlbGYuYWRkTGFiZWxzID0gZnVuY3Rpb24oc3RhcnROdW1iZXIgPSAxLCBsYWJlbEludGVydmFsID0gMTApIHtcbiAgICAgICAgaWYgKGxhYmVsSW50ZXJ2YWwgPT09IDApXG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcblxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBzZWxmLnJuYUxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBhZGQgbGFiZWxzXG4gICAgICAgICAgICBpZiAoaSAlIGxhYmVsSW50ZXJ2YWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAvL2NyZWF0ZSBhIG5vZGUgZm9yIGVhY2ggbGFiZWxcbiAgICAgICAgICAgICAgICBsZXQgbmV3WCwgbmV3WTtcblxuICAgICAgICAgICAgICAgIGxldCB0aGlzTm9kZSA9IHNlbGYubm9kZXNbaS0xXTtcbiAgICAgICAgICAgICAgICBsZXQgcHJldk5vZGUsIG5leHROb2RlO1xuICAgICAgICAgICAgICAgIGxldCBwcmV2VmVjLCBuZXh0VmVjO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYucm5hTGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dFZlYyA9IFt0aGlzTm9kZS54IC0gMTUsIHRoaXNOb2RlLnldO1xuICAgICAgICAgICAgICAgICAgICBwcmV2VmVjID0gW3RoaXNOb2RlLnggLSAxNSwgdGhpc05vZGUueV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgd2UncmUgbGFiZWxsaW5nIHRoZSBmaXJzdCBub2RlLCB0aGVuIGxhYmVsIGl0IGluIHJlbGF0aW9uIHRvIHRoZSBsYXN0XG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2Tm9kZSA9IHNlbGYubm9kZXNbc2VsZi5ybmFMZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldk5vZGUgPSBzZWxmLm5vZGVzW2kgLSAyXTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiB3ZSdyZSBsYWJlbGxpbmcgdGhlIGxhc3Qgbm9kZSwgdGhlbiBsYWJlbCBpdCBpbiByZWxhdGlvbiB0byB0aGUgZmlyc3RcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gc2VsZi5ybmFMZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0Tm9kZSA9IHNlbGYubm9kZXNbMF07XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHROb2RlID0gc2VsZi5ub2Rlc1tpXTtcblxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIG51Y2xlb3RpZGUgYW5kIGl0cyBuZWlnaGJvcnMgYXJlIHBhaXJlZFxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5wYWlydGFibGVbbmV4dE5vZGUubnVtIC0gc3RhcnROdW1iZXIrMV0gIT09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucGFpcnRhYmxlW3ByZXZOb2RlLm51bSAtIHN0YXJ0TnVtYmVyKzFdICE9PSAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBhaXJ0YWJsZVt0aGlzTm9kZS5udW0gLSBzdGFydE51bWJlcisxXSAhPT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2Tm9kZSA9IG5leHROb2RlID0gc2VsZi5ub2Rlc1tzZWxmLnBhaXJ0YWJsZVt0aGlzTm9kZS5udW0gLSBzdGFydE51bWJlcisxXS0xXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgbm9kZSBpcyBwYWlyZWQgYnV0IGF0IGxlYXN0IG9uZSBvZiBpdHMgbmVpZ2hib3JzIGlzIHVucGFpcmVkXG4gICAgICAgICAgICAgICAgICAgIC8vIHBsYWNlIHRoZSBsYWJlbCBpbiB0aGUgZGlyZWN0aW9uIG9mIHRoZSB0d28gbmVpZ2hib3JzXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnBhaXJ0YWJsZVt0aGlzTm9kZS5udW0gLSBzdGFydE51bWJlcisxXSAhPT0gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBhaXJ0YWJsZVtuZXh0Tm9kZS5udW0gLSBzdGFydE51bWJlcisxXSA9PT0gMCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wYWlydGFibGVbcHJldk5vZGUubnVtIC0gc3RhcnROdW1iZXIrMV0gPT09IDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0VmVjID0gW3RoaXNOb2RlLnggLSBuZXh0Tm9kZS54LCB0aGlzTm9kZS55IC0gbmV4dE5vZGUueV07XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2VmVjID0gW3RoaXNOb2RlLnggLSBwcmV2Tm9kZS54LCB0aGlzTm9kZS55IC0gcHJldk5vZGUueV07XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRWZWMgPSBbbmV4dE5vZGUueCAtIHRoaXNOb2RlLngsIG5leHROb2RlLnkgLSB0aGlzTm9kZS55XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZWZWMgPSBbcHJldk5vZGUueCAtIHRoaXNOb2RlLngsIHByZXZOb2RlLnkgLSB0aGlzTm9kZS55XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBjb21iaW5lZFZlYyA9IFtuZXh0VmVjWzBdICsgcHJldlZlY1swXSwgbmV4dFZlY1sxXSArIHByZXZWZWNbMV1dO1xuICAgICAgICAgICAgICAgIHZhciB2ZWNMZW5ndGggPSBNYXRoLnNxcnQoY29tYmluZWRWZWNbMF0gKiBjb21iaW5lZFZlY1swXSArIGNvbWJpbmVkVmVjWzFdICogY29tYmluZWRWZWNbMV0pO1xuICAgICAgICAgICAgICAgIHZhciBub3JtZWRWZWMgPSBbY29tYmluZWRWZWNbMF0gLyB2ZWNMZW5ndGgsIGNvbWJpbmVkVmVjWzFdIC8gdmVjTGVuZ3RoXTtcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0VmVjID0gWy0xNSAqIG5vcm1lZFZlY1swXSwgLTE1ICogbm9ybWVkVmVjWzFdXTtcblxuICAgICAgICAgICAgICAgIG5ld1ggPSBzZWxmLm5vZGVzW2ktMV0ueCArIG9mZnNldFZlY1swXTtcbiAgICAgICAgICAgICAgICBuZXdZID0gc2VsZi5ub2Rlc1tpLTFdLnkgKyBvZmZzZXRWZWNbMV07XG5cbiAgICAgICAgICAgICAgICB2YXIgbmV3Tm9kZSA9IHsnbmFtZSc6IGkgKyBzdGFydE51bWJlciAtMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdudW0nOiAtMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyYWRpdXMnOiA2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3JuYSc6IHNlbGYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbm9kZVR5cGUnOiAnbGFiZWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0cnVjdE5hbWUnOiBzZWxmLnN0cnVjdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZWxlbVR5cGUnOiAnbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAneCc6IG5ld1gsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAneSc6IG5ld1ksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHgnOiBuZXdYLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3B5JzogbmV3WSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aWQnOiBzbHVnaWQubmljZSgpIH07XG4gICAgICAgICAgICAgICAgdmFyIG5ld0xpbmsgPSB7J3NvdXJjZSc6IHNlbGYubm9kZXNbaS0xXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGFyZ2V0JzogbmV3Tm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsaW5rVHlwZSc6ICdsYWJlbF9saW5rJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWlkJzogc2x1Z2lkLm5pY2UoKSB9O1xuXG4gICAgICAgICAgICAgICAgc2VsZi5ub2Rlcy5wdXNoKG5ld05vZGUpO1xuICAgICAgICAgICAgICAgIHNlbGYubGlua3MucHVzaChuZXdMaW5rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlY2FsY3VsYXRlRWxlbWVudHMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5yZW1vdmVQc2V1ZG9rbm90cygpO1xuICAgICAgICBzZWxmLmVsZW1lbnRzID0gc2VsZi5wdFRvRWxlbWVudHMoc2VsZi5wYWlydGFibGUsIDAsIDEsIHNlbGYuZG90YnJhY2tldC5sZW5ndGgpO1xuXG4gICAgICAgIGlmIChzZWxmLmNpcmN1bGFyKSB7XG4gICAgICAgICAgICAvL2NoZWNrIHRvIHNlZSBpZiB0aGUgZXh0ZXJuYWwgbG9vcCBpcyBhIGhhaXJwaW4gb3IgYSBtdWx0aWxvb3BcbiAgICAgICAgICAgIGxldCBleHRlcm5hbExvb3AgPSBzZWxmLmVsZW1lbnRzLmZpbHRlcihmdW5jdGlvbihkKSB7IGlmIChkWzBdID09ICdlJykgcmV0dXJuIHRydWU7IH0pO1xuXG4gICAgICAgICAgICBpZiAoZXh0ZXJuYWxMb29wLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBlbG9vcCA9IGV4dGVybmFsTG9vcFswXTtcbiAgICAgICAgICAgICAgICBudWNzID0gZWxvb3BbMl0uc29ydChudW1iZXJTb3J0KTtcblxuICAgICAgICAgICAgICAgIHByZXYgPSBudWNzWzBdO1xuICAgICAgICAgICAgICAgIGhsb29wID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBudW1HcmVhdGVyID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IG51Y3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG51Y3NbaV0gLSBwcmV2ID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbnVtR3JlYXRlciArPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHByZXYgPSBudWNzW2ldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChudW1HcmVhdGVyID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxvb3BbMF0gPSAnaCc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChudW1HcmVhdGVyID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxvb3BbMF0gPSAnaSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxvb3BbMF0gPSAnbSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVhc3NpZ25MaW5rVWlkcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyByZWFzc2lnbiB1aWRzIHRvIHRoZSBsaW5rcywgY29ycmVzcG9uZGluZyB0byB0aGUgdWlkcyBvZiB0aGUgdHdvIG5vZGVzXG4gICAgICAgIC8vIHRoZXkgY29ubmVjdFxuICAgICAgICB2YXIgaTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbGYubGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHNlbGYubGlua3NbaV0udWlkID0gc2VsZi5saW5rc1tpXS5zb3VyY2UudWlkICsgc2VsZi5saW5rc1tpXS50YXJnZXQudWlkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfVxuXG4gICAgc2VsZi5yZW1vdmVQc2V1ZG9rbm90cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoc2VsZi5wYWlydGFibGUubGVuZ3RoID4gMSlcbiAgICAgICAgICAgIHNlbGYucHNldWRva25vdFBhaXJzID0gc2VsZi5wc2V1ZG9rbm90UGFpcnMuY29uY2F0KHJuYVV0aWxpdGllcy5yZW1vdmVQc2V1ZG9rbm90c0Zyb21QYWlydGFibGUoc2VsZi5wYWlydGFibGUpKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5hZGRQc2V1ZG9rbm90cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvKiBBZGQgYWxsIG9mIHRoZSBwc2V1ZG9rbm90IHBhaXJzIHdoaWNoIGFyZSBzdG9yZWQgb3V0c2lkZVxuICAgICAgICAgKiBvZiB0aGUgcGFpcnRhYmxlIGJhY2sgdG8gdGhlIHBhaXJ0YWJsZVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIHB0ID0gc2VsZi5wYWlydGFibGU7XG4gICAgICAgIHZhciBwc2V1ZG9rbm90UGFpcnMgPSBzZWxmLnBzZXVkb2tub3RQYWlycztcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBzZXVkb2tub3RQYWlycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcHRbcHNldWRva25vdFBhaXJzW2ldWzBdXSA9IHBzZXVkb2tub3RQYWlyc1tpXVsxXTtcbiAgICAgICAgICAgIHB0W3BzZXVkb2tub3RQYWlyc1tpXVsxXV0gPSBwc2V1ZG9rbm90UGFpcnNbaV1bMF07XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLnBzZXVkb2tub3RQYWlycyA9IFtdO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5hZGROYW1lID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHNlbGYubmFtZSA9ICcnO1xuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICBpZiAoc2VsZi5ybmFMZW5ndGggPiAwKVxuICAgICAgICBzZWxmLnJlY2FsY3VsYXRlRWxlbWVudHMoKTtcblxuICAgIHNlbGYuZ2V0Tm9kZUZyb21OdWNsZW90aWRlcyA9IGZ1bmN0aW9uKG51Y3MpIHtcbiAgICAgICAgLyogR2V0IGEgbm9kZSBnaXZlbiBhIG51Y2xlb3RpZGUgbnVtYmVyIG9yIGFuIGFycmF5IG9mIG51Y2xlb3RpZGVcbiAgICAgICAgICogbnVtYmVycyBpbmRpY2F0aW5nIGFuIGVsZW1lbnQgbm9kZSAqL1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG51Y3MpID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNlbGYubm9kZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoJ251Y3MnIGluIHNlbGYubm9kZXNbal0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYubm9kZXNbal0ubnVjcy5lcXVhbHMobnVjcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLm5vZGVzW2pdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzZWxmLm5vZGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYubm9kZXNbal0ubnVtID09IG51Y3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYubm9kZXNbal07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coJ0VSUk9SOiBObyBub2RlIGZvdW5kIGZvciBudWNzOicsIG51Y3MpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb2xlY3VsZXNUb0pzb24obW9sZWN1bGVzSnNvbikge1xuICAgIC8qIENvbnZlcnQgYSBsaXN0IG9mIFJOQSBhbmQgcHJvdGVpbiBtb2xlY3VsZXMgdG8gYSBsaXN0IG9mIFJOQUdyYXBoXG4gICAgICogUHJvdGVpbkdyYXBoIGFuZCBleHRyYUxpbmtzIHN0cnVjdHVyZSAqL1xuXG4gICAgdmFyIG5vZGVzID0ge307IC8vaW5kZXggdGhlIG5vZGVzIGJ5IHVpZFxuICAgIHZhciBncmFwaHMgPSBbXTtcbiAgICB2YXIgZXh0cmFMaW5rcyA9IFtdO1xuXG5cbiAgICAvLyBDcmVhdGUgdGhlIGdyYXBocyBmb3IgZWFjaCBtb2xlY3VsZVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbW9sZWN1bGVzSnNvbi5tb2xlY3VsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIG1vbGVjdWxlID0gbW9sZWN1bGVzSnNvbi5tb2xlY3VsZXNbaV07XG4gICAgICAgIHZhciByZztcblxuICAgICAgICBpZiAobW9sZWN1bGUudHlwZSA9PSAncm5hJykge1xuICAgICAgICAgICAgcmcgPSBuZXcgUk5BR3JhcGgobW9sZWN1bGUuc2VxLCBtb2xlY3VsZS5zcywgbW9sZWN1bGUuaGVhZGVyKTtcbiAgICAgICAgICAgIHJnLmNpcmN1bGFyaXplRXh0ZXJuYWwgPSB0cnVlO1xuICAgICAgICAgICAgcmcuZWxlbWVudHNUb0pzb24oKVxuICAgICAgICAgICAgLmFkZFBvc2l0aW9ucygnbnVjbGVvdGlkZScsIG1vbGVjdWxlLnBvc2l0aW9ucylcbiAgICAgICAgICAgIC5hZGRMYWJlbHMoKVxuICAgICAgICAgICAgLnJlaW5mb3JjZVN0ZW1zKClcbiAgICAgICAgICAgIC5yZWluZm9yY2VMb29wcygpO1xuXG5cbiAgICAgICAgfSBlbHNlIGlmIChtb2xlY3VsZS50eXBlID09ICdwcm90ZWluJykge1xuICAgICAgICAgICAgcmcgPSBuZXcgUHJvdGVpbkdyYXBoKG1vbGVjdWxlLmhlYWRlciwgbW9sZWN1bGUuc2l6ZSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJnLmFkZFVpZHMobW9sZWN1bGUudWlkcyk7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByZy5ub2Rlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgbm9kZXNbcmcubm9kZXNbal0udWlkXSA9IHJnLm5vZGVzW2pdO1xuICAgICAgICB9XG5cbiAgICAgICAgZ3JhcGhzLnB1c2gocmcpO1xuICAgIH1cblxuICAgIC8vQWRkIHRoZSBleHRyYSBsaW5rc1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbW9sZWN1bGVzSnNvbi5leHRyYUxpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxpbmsgPSBtb2xlY3VsZXNKc29uLmV4dHJhTGlua3NbaV07XG5cbiAgICAgICAgbGluay5zb3VyY2UgPSBub2Rlc1tsaW5rLnNvdXJjZV07XG4gICAgICAgIGxpbmsudGFyZ2V0ID0gbm9kZXNbbGluay50YXJnZXRdO1xuICAgICAgICBsaW5rLnVpZCA9IHNsdWdpZC5uaWNlKCk7XG5cbiAgICAgICAgZXh0cmFMaW5rcy5wdXNoKGxpbmspO1xuICAgIH1cblxuICAgIHJldHVybiB7J2dyYXBocyc6IGdyYXBocywgJ2V4dHJhTGlua3MnOiBleHRyYUxpbmtzfTtcbn07XG4iLCJpbXBvcnQge1JOQUdyYXBofSBmcm9tICcuL3JuYWdyYXBoLmpzJztcblxuaW1wb3J0IHtzaW1wbGVYeUNvb3JkaW5hdGVzfSBmcm9tICcuL3NpbXBsZXJuYXBsb3QuanMnO1xuaW1wb3J0IHtOQVZpZXd9IGZyb20gJy4vbmF2aWV3L25hdmlldy5qcydcblxuaW1wb3J0ICcuLi9zdHlsZXMvcm5hcGxvdC5jc3MnO1xuXG5leHBvcnQgZnVuY3Rpb24gcm5hUGxvdChwYXNzZWRPcHRpb25zID0ge30pIHtcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgJ3dpZHRoJzogMzAwLFxuICAgICAgICAnaGVpZ2h0JzogMzAwLFxuICAgICAgICAnbnVjbGVvdGlkZVJhZGl1cyc6IDUsXG4gICAgICAgICdybmFFZGdlUGFkZGluZyc6IDEsICAgICAvLyBob3cgZmFyIHRoZSBsZWZ0bW9zdCwgcmlnaHRtb3N0LCB0b3Btb3N0IGFuZCBib3R0b21vc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbnVjbGVvdGlkZXMgYXJlIGZyb20gdGhlIGVkZ2Ugb2YgdGhlIHBsb3RcbiAgICAgICAgJ2xhYmVsSW50ZXJ2YWwnOiAxMCxcbiAgICAgICAgJ3Nob3dOdWNsZW90aWRlTGFiZWxzJzogdHJ1ZSxcbiAgICAgICAgJ3N0YXJ0TnVjbGVvdGlkZU51bWJlcic6IDEsXG4gICAgICAgICdidW5kbGVFeHRlcm5hbExpbmtzJzogZmFsc2UsXG4gICAgICAgIFxuICAgICAgICAncm5hTGF5b3V0JzogJ3NpbXBsZScsIC8vIHNpbXBsZSBvciBuYXZpZXdcbiAgICAgICAgJ25hbWVQb3NpdGlvbic6ICcwIDAnIC8vIGZvciB4IGFuZCB5IGVpdGhlciAwLCAwLjUgb3IgMVxuICAgIH07XG4gICAgdmFyIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHBhc3NlZE9wdGlvbnMpO1xuXG4gICAgdmFyIHhTY2FsZSwgeVNjYWxlO1xuICAgIFxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRyYW5zZm9ybVRvRmlsbFZpZXdwb3J0KHhWYWx1ZXMsIHlWYWx1ZXMpIHtcbiAgICAgICAgLy8gY3JlYXRlIHRyYW5zZm9ybSB0aGF0IHdpbGwgc2NhbGUgdGhlIHggYW5kIHkgdmFsdWVzIHNvIHRoYXRcbiAgICAgICAgLy8gdGhleSBmaWxsIHRoZSBhdmFpbGFibGUgdmlld3BvcnRcbiAgICAgICAgbGV0IHhFeHRlbnQgPSBkMy5leHRlbnQoeFZhbHVlcyk7XG4gICAgICAgIGxldCB5RXh0ZW50ID0gZDMuZXh0ZW50KHlWYWx1ZXMpO1xuXG4gICAgICAgIC8vIGFkZCB0aGUgcmFkaXVzIG9mIHRoZSBudWNsZW90aWRlc1xuICAgICAgICB4RXh0ZW50WzBdIC09IG9wdGlvbnMubnVjbGVvdGlkZVJhZGl1cyArIG9wdGlvbnMucm5hRWRnZVBhZGRpbmc7XG4gICAgICAgIHlFeHRlbnRbMF0gLT0gb3B0aW9ucy5udWNsZW90aWRlUmFkaXVzICsgb3B0aW9ucy5ybmFFZGdlUGFkZGluZztcblxuICAgICAgICB4RXh0ZW50WzFdICs9IG9wdGlvbnMubnVjbGVvdGlkZVJhZGl1cyArIG9wdGlvbnMucm5hRWRnZVBhZGRpbmc7XG4gICAgICAgIHlFeHRlbnRbMV0gKz0gb3B0aW9ucy5udWNsZW90aWRlUmFkaXVzICsgb3B0aW9ucy5ybmFFZGdlUGFkZGluZztcblxuICAgICAgICAvLyBmaW5kIG91dCBob3cgd2lkZSBhbmQgaGVpZ2h0IHRoZSBtb2xlY3VsZVxuICAgICAgICB2YXIgeFJhbmdlID0geEV4dGVudFsxXSAtIHhFeHRlbnRbMF07XG4gICAgICAgIHZhciB5UmFuZ2UgPSB5RXh0ZW50WzFdIC0geUV4dGVudFswXTtcblxuICAgICAgICAvLyBob3cgbXVjaCB3aWRlciAvIHRhbGxlciBpcyBpdCB0aGFuIHRoZSBhdmFpbGFibGUgdmlld3BvcnRcbiAgICAgICAgdmFyIHhFeHRyYSA9IHhSYW5nZSAtIG9wdGlvbnMud2lkdGg7XG4gICAgICAgIHZhciB5RXh0cmEgPSB5UmFuZ2UgLSBvcHRpb25zLmhlaWdodDtcblxuICAgICAgICAvLyBvbmNlIHdlIGhhdmUgYSBzY2FsZSBmb3Igb25lIGRpbWVuc2lvbiwgd2UgY2FuIGNyZWF0ZSB0aGUgc2NhbGUgZm9yIHRoZSBvdGhlclxuICAgICAgICAvLyBrZWVwaW5nIHRoZSBzYW1lIGV4cGFuc2lvbiAvIHNocmlua2luZyByYXRpb1xuICAgICAgICBmdW5jdGlvbiBjcmVhdGVPdGhlclNjYWxlKGZpcnN0U2NhbGUsIG5ld0RvbWFpbiwgbmV3UmFuZ2UpIHtcbiAgICAgICAgICAgIHZhciBzY2FsZUZhY3RvciA9IChmaXJzdFNjYWxlLnJhbmdlKClbMV0gLSBmaXJzdFNjYWxlLnJhbmdlKClbMF0pIC9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmaXJzdFNjYWxlLmRvbWFpbigpWzFdIC0gZmlyc3RTY2FsZS5kb21haW4oKVswXSk7XG4gICAgICAgICAgICB2YXIgbmV3V2lkdGggPSAobmV3RG9tYWluWzFdIC0gbmV3RG9tYWluWzBdKSAqIHNjYWxlRmFjdG9yXG4gICAgICAgICAgICB2YXIgbmV3TWFyZ2luID0gKChuZXdSYW5nZVsxXSAtIG5ld1JhbmdlWzBdKSAtIG5ld1dpZHRoKSAvIDI7XG5cbiAgICAgICAgICAgIHJldHVybiB7J3NjYWxlRmFjdG9yJzogc2NhbGVGYWN0b3IsXG4gICAgICAgICAgICAgICAgICAgICdzY2FsZSc6IGQzLnNjYWxlLmxpbmVhcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbWFpbihuZXdEb21haW4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJhbmdlKFtuZXdSYW5nZVswXSArIG5ld01hcmdpbiwgbmV3UmFuZ2VbMV0gLSBuZXdNYXJnaW5dKX07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmV0O1xuXG4gICAgICAgIGlmICh4RXh0cmEgPiB5RXh0cmEpIHtcbiAgICAgICAgICAgIC8vIHdlIGhhdmUgdG8gc2hyaW5rIG1vcmUgaW4gdGhlIHgtZGltZW5zaW9uIHRoYW4gdGhlIHlcbiAgICAgICAgICAgIHhTY2FsZSA9IGQzLnNjYWxlLmxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKHhFeHRlbnQpXG4gICAgICAgICAgICAucmFuZ2UoWzAsIG9wdGlvbnMud2lkdGhdKVxuXG4gICAgICAgICAgICByZXQgPSBjcmVhdGVPdGhlclNjYWxlKHhTY2FsZSwgeUV4dGVudCwgWzAsIG9wdGlvbnMuaGVpZ2h0XSk7XG4gICAgICAgICAgICB5U2NhbGUgPSByZXQuc2NhbGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIHNocmluayBtb3JlIGluIHRoZSB4LWRpbWVuc2lvbiB0aGFuIHRoZSB5XG4gICAgICAgICAgICB5U2NhbGUgPSBkMy5zY2FsZS5saW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbih5RXh0ZW50KVxuICAgICAgICAgICAgLnJhbmdlKFswLCBvcHRpb25zLmhlaWdodF0pXG5cbiAgICAgICAgICAgIHJldCA9IGNyZWF0ZU90aGVyU2NhbGUoeVNjYWxlLCB4RXh0ZW50LCBbMCwgb3B0aW9ucy53aWR0aF0pO1xuICAgICAgICAgICAgeFNjYWxlID0gcmV0LnNjYWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHhPZmZzZXQgPSB4U2NhbGUucmFuZ2UoKVswXSAtIHhTY2FsZS5kb21haW4oKVswXTtcbiAgICAgICAgdmFyIHlPZmZzZXQgPSB5U2NhbGUucmFuZ2UoKVswXSAtIHlTY2FsZS5kb21haW4oKVswXTtcblxuICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgLSh4U2NhbGUuZG9tYWluKClbMF0gKiByZXQuc2NhbGVGYWN0b3IgLSB4U2NhbGUucmFuZ2UoKVswXSkgK1xuICAgICAgICAgICAgICAgICAgJywnICsgLSh5U2NhbGUuZG9tYWluKClbMF0gKiByZXQuc2NhbGVGYWN0b3IgLSB5U2NhbGUucmFuZ2UoKVswXSkgKyAnKScgK1xuICAgICAgICAgICAgJ3NjYWxlKCcgKyByZXQuc2NhbGVGYWN0b3IgKyAnKSc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlTnVjbGVvdGlkZXMoc2VsZWN0aW9uLCBudWNsZW90aWRlTm9kZXMpIHtcbiAgICAgICAgLy8gY3JlYXRlIGdyb3VwaW5ncyBmb3IgZWFjaCBudWNsZW90aWRlIGFuZCBsYWJlbFxuICAgICAgICB2YXIgZ3MgPSBzZWxlY3Rpb25cbiAgICAgICAgLnNlbGVjdEFsbCgnLnJuYS1iYXNlJylcbiAgICAgICAgLmRhdGEobnVjbGVvdGlkZU5vZGVzKVxuICAgICAgICAuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdzdmc6ZycpXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgZC54ICsgJywnICsgZC55ICsgJyknO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgY2lyY2xlcyA9IGdzLmFwcGVuZCgnc3ZnOmNpcmNsZScpXG4gICAgICAgIC5hdHRyKCdkYXRhLWJhc2UnLCAoZCkgPT4geyBpZiAoZC5uYW1lKSB7IHJldHVybiBkLm5hbWUudG9Mb3dlckNhc2UoKTsgfX0pXG4gICAgICAgIC5hdHRyKCdyJywgb3B0aW9ucy5udWNsZW90aWRlUmFkaXVzKVxuICAgICAgICAuY2xhc3NlZCgncm5hLWJhc2UnLCB0cnVlKVxuICAgICAgICBcblxuICAgICAgICBpZiAob3B0aW9ucy5zaG93TnVjbGVvdGlkZUxhYmVscykge1xuICAgICAgICAgICAgdmFyIG51Y2xlb3RpZGVMYWJlbHMgPSBncy5hcHBlbmQoJ3N2Zzp0ZXh0JylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQubmFtZTsgfSlcbiAgICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgICAgICAgLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2NlbnRyYWwnKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ251Y2xlb3RpZGUtbGFiZWwnLCB0cnVlKVxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnOnRpdGxlJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuc3RydWN0X25hbWUgKyAnOicgKyBkLm51bTsgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVMYWJlbHMoc2VsZWN0aW9uLCBsYWJlbE5vZGVzKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBncm91cGluZ3MgZm9yIGVhY2ggbnVjbGVvdGlkZSBhbmQgbGFiZWxcblxuICAgICAgICB2YXIgZ3MgPSBzZWxlY3Rpb25cbiAgICAgICAgLnNlbGVjdEFsbCgnLnJuYUxhYmVsJylcbiAgICAgICAgLmRhdGEobGFiZWxOb2RlcylcbiAgICAgICAgLmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIGQueCArICcsJyArIGQueSArICcpJztcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB2YXIgY2lyY2xlcyA9IGdzLmFwcGVuZCgnc3ZnOmNpcmNsZScpXG4gICAgICAgIC5hdHRyKCdyJywgb3B0aW9ucy5udWNsZW90aWRlUmFkaXVzKVxuICAgICAgICAuY2xhc3NlZCgncm5hLWJhc2UnLCB0cnVlKVxuICAgICAgICAuY2xhc3NlZCgnbGFiZWwnLCB0cnVlKVxuXG4gICAgICAgIHZhciBudW1iZXJMYWJlbHMgPSBncy5hcHBlbmQoJ3N2Zzp0ZXh0JylcbiAgICAgICAgLnRleHQoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5uYW1lOyB9KVxuICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgLmF0dHIoJ2ZvbnQtd2VpZ2h0JywgJ2JvbGQnKVxuICAgICAgICAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnY2VudHJhbCcpXG4gICAgICAgIC5jbGFzc2VkKCdudW1iZXItbGFiZWwnLCB0cnVlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVOYW1lKHNlbGVjdGlvbiwgbmFtZSkge1xuICAgICAgICBsZXQgbmFtZUxhYmVsID0gc2VsZWN0aW9uLmFwcGVuZCgnc3ZnOnRleHQnKVxuICAgICAgICAvLy5hdHRyKCdkeScsIC0xMClcbiAgICAgICAgLmNsYXNzZWQoJ3JuYS1uYW1lJywgdHJ1ZSlcbiAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgIC5hdHRyKCdhbGlnbm1lbnQtYmFzZWxpbmUnLCAnY2VudHJhbCcpXG4gICAgICAgIC50ZXh0KG5hbWUpO1xuICAgIFxuICAgICAgICBsZXQgeHlQb3MgPSBvcHRpb25zLm5hbWVQb3NpdGlvbi5zcGxpdChcIiBcIiwgMikgLy8gMCAwLjUgMVxuICAgICAgICBsZXQgeHkgPSBbXVxuICAgICAgICBsZXQgdGV4dEJCb3ggPSBuYW1lTGFiZWwubm9kZSgpLmdldEJCb3goKVxuICAgICAgICBsZXQgdGV4dFNpemUgPSBbdGV4dEJCb3gud2lkdGgsIHRleHRCQm94LmhlaWdodF1cbiAgICAgICAgbGV0IHBsb3RTaXplID0gW29wdGlvbnMud2lkdGgsIG9wdGlvbnMuaGVpZ2h0XVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgcCBpbiBbMCwgMV0pIHtcbiAgICAgICAgICAgIHN3aXRjaCAoeHlQb3NbcF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlICcwJzpcbiAgICAgICAgICAgICAgICAgICAgeHlbcF0gPSB0ZXh0U2l6ZVtwXSAvIDJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgICAgICAgICAgIHh5W3BdID0gcGxvdFNpemVbcF0gLSB0ZXh0U2l6ZVtwXSAvIDJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnMC41JzpcbiAgICAgICAgICAgICAgICAgICAgeHlbcF0gPSBwbG90U2l6ZVtwXSAvIDJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbmFtZUxhYmVsLmF0dHIoJ3gnLCB4eVswXSkuYXR0cigneScsIHh5WzFdKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ha2VFeHRlcm5hbExpbmtzQnVuZGxlKHNlbGVjdGlvbiwgbGlua3MpIHtcbiAgICAgICAgdmFyIG5vZGVzRGljdCA9IHt9O1xuICAgICAgICB2YXIgbGlua3NMaXN0ID0gW107XG4gICAgICAgIGxpbmtzID0gbGlua3MuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQubGlua1R5cGUgPT0gJ2NvcnJlY3QnIHx8IGQubGlua1R5cGUgPT0gJ2luY29ycmVjdCcgfHwgZC5saW5rVHlwZSA9PSAnZXh0cmEnOyB9KTtcbiAgICAgICAgXG4gICAgICAgIHNlbGVjdGlvbi5zZWxlY3RBbGwoJ1tsaW5rLXR5cGU9ZXh0cmFdJylcbiAgICAgICAgLnJlbW92ZSgpO1xuXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGxpbmtzW2ldLnNvdXJjZSA9PT0gbnVsbCB8fCBsaW5rc1tpXS50YXJnZXQgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIG5vZGVzRGljdFtsaW5rc1tpXS5zb3VyY2UudWlkXSA9IGxpbmtzW2ldLnNvdXJjZTtcbiAgICAgICAgICAgIG5vZGVzRGljdFtsaW5rc1tpXS50YXJnZXQudWlkXSA9IGxpbmtzW2ldLnRhcmdldDtcblxuICAgICAgICAgICAgbGlua3NMaXN0LnB1c2goeydzb3VyY2UnOiBsaW5rc1tpXS5zb3VyY2UudWlkLCAndGFyZ2V0JzogbGlua3NbaV0udGFyZ2V0LnVpZCwgJ2xpbmtUeXBlJzogbGlua3NbaV0ubGlua1R5cGUsICdleHRyYUxpbmtUeXBlJzogbGlua3NbaV0uZXh0cmFMaW5rVHlwZX0pIDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmYnVuZGxpbmcgPSBkMy5Gb3JjZUVkZ2VCdW5kbGluZygpLm5vZGVzKG5vZGVzRGljdCkuZWRnZXMobGlua3NMaXN0KVxuICAgICAgICAuY29tcGF0aWJpbGl0eV90aHJlc2hvbGQoMC44KS5zdGVwX3NpemUoMC4yKTtcbiAgICAgICAgdmFyIHJlc3VsdHMgICA9IGZidW5kbGluZygpO1xuXG4gICAgICAgIHZhciBkM2xpbmUgPSBkMy5zdmcubGluZSgpXG4gICAgICAgICAgICAueChmdW5jdGlvbihkKXtyZXR1cm4gZC54O30pXG4gICAgICAgICAgICAueShmdW5jdGlvbihkKXtyZXR1cm4gZC55O30pXG4gICAgICAgICAgICAuaW50ZXJwb2xhdGUoJ2xpbmVhcicpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGVkZ2Vfc3VicG9pbnRfZGF0YSA9IHJlc3VsdHNbaV07XG4gICAgICAgICAgICAvLyBmb3IgZWFjaCBvZiB0aGUgYXJyYXlzIGluIHRoZSByZXN1bHRzXG4gICAgICAgICAgICAvLyBkcmF3IGEgbGluZSBiZXR3ZWVuIHRoZSBzdWJkaXZpb25zIHBvaW50cyBmb3IgdGhhdCBlZGdlXG5cbiAgICAgICAgICAgIHNlbGVjdGlvbi5hcHBlbmQoJ3BhdGgnKS5hdHRyKCdkJywgZDNsaW5lKGVkZ2Vfc3VicG9pbnRfZGF0YSkpXG4gICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnbm9uZScpXG4gICAgICAgICAgICAuYXR0cignbGluay10eXBlJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gbGlua3NMaXN0W2ldLmxpbmtUeXBlOyB9KVxuICAgICAgICAgICAgLmF0dHIoJ2V4dHJhLWxpbmstdHlwZScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGxpbmtzTGlzdFtpXS5leHRyYUxpbmtUeXBlOyB9KVxuICAgICAgICAgICAgLnN0eWxlKCdzdHJva2Utb3BhY2l0eScsMC40KTsgLy91c2Ugb3BhY2l0eSBhcyBibGVuZGluZ1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVMaW5rcyhzZWxlY3Rpb24sIGxpbmtzKSB7XG4gICAgICAgIGxpbmtzID0gbGlua3MuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuc291cmNlICE9PSBudWxsICYmIGQudGFyZ2V0ICE9PSBudWxsOyB9KTtcbiAgICAgICAgdmFyIGdzID0gc2VsZWN0aW9uLnNlbGVjdEFsbCgnLnJuYS1saW5rJylcbiAgICAgICAgLmRhdGEobGlua3MpXG4gICAgICAgIC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzpsaW5lJylcbiAgICAgICAgLmF0dHIoJ3gxJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zb3VyY2UueDsgfSlcbiAgICAgICAgLmF0dHIoJ3gyJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC50YXJnZXQueDsgfSlcbiAgICAgICAgLmF0dHIoJ3kxJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zb3VyY2UueTsgfSlcbiAgICAgICAgLmF0dHIoJ3kyJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC50YXJnZXQueTsgfSlcbiAgICAgICAgLmF0dHIoJ2xpbmstdHlwZScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQubGlua1R5cGU7IH0pXG4gICAgICAgIC5hdHRyKCdleHRyYS1saW5rLXR5cGUnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLmV4dHJhTGlua1R5cGU7IH0pXG4gICAgICAgIC5jbGFzc2VkKCdybmEtbGluaycsIHRydWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoYXJ0KHNlbGVjdGlvbikge1xuICAgICAgICBzZWxlY3Rpb24uZWFjaChmdW5jdGlvbihkYXRhKSB7ICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgcGxvdCA9IGQzLnNlbGVjdCh0aGlzKS5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3JuYXBsb3QnLCB0cnVlKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBkYXRhIHNob3VsZCBiZSBhIGRpY3Rpb25hcnkgY29udGFpbmluZyBhdCBsZWFzdCBhIHN0cnVjdHVyZVxuICAgICAgICAgICAgLy8gYW5kIHBvc3NpYmx5IGEgc2VxdWVuY2VcbiAgICAgICAgICAgIGxldCByZyA9IG5ldyBSTkFHcmFwaChkYXRhLnNlcXVlbmNlLCBkYXRhLnN0cnVjdHVyZSwgZGF0YS5uYW1lLCBvcHRpb25zLnN0YXJ0TnVjbGVvdGlkZU51bWJlcilcbiAgICAgICAgICAgICAgICAgICAgLnJlY2FsY3VsYXRlRWxlbWVudHMoKVxuICAgICAgICAgICAgICAgICAgICAuZWxlbWVudHNUb0pzb24oKVxuICAgICAgICAgICAgICAgICAgICAuYWRkTmFtZShkYXRhLm5hbWUpO1xuXG4gICAgICAgICAgICBkYXRhLnJuYUdyYXBoID0gcmc7XG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHBvc2l0aW9uIG9mIGVhY2ggbnVjbGVvdGlkZVxuICAgICAgICAgICAgLy8gdGhlIHBvc2l0aW9ucyBvZiB0aGUgbGFiZWxzIHdpbGwgYmUgY2FsY3VsYXRlZCBpblxuICAgICAgICAgICAgLy8gdGhlIGFkZExhYmVscyBmdW5jdGlvblxuICAgICAgICAgICAgbGV0IHBvc2l0aW9ucyA9IFtdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5ybmFMYXlvdXQgPT09ICduYXZpZXcnKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5hdmlldyA9IG5ldyBOQVZpZXcoKTtcbiAgICAgICAgICAgICAgICB2YXIgbmFWaWV3UG9zaXRpb25zID0gbmF2aWV3Lm5hdmlld194eV9jb29yZGluYXRlcyhyZy5wYWlydGFibGUpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFWaWV3UG9zaXRpb25zLm5iYXNlOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zLnB1c2goW25hVmlld1Bvc2l0aW9ucy54W2ldLCBuYVZpZXdQb3NpdGlvbnMueVtpXV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25zID0gc2ltcGxlWHlDb29yZGluYXRlcyhyZy5wYWlydGFibGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZy5hZGRQb3NpdGlvbnMoJ251Y2xlb3RpZGUnLCBwb3NpdGlvbnMpXG4gICAgICAgICAgICAvLy5yZWluZm9yY2VTdGVtcygpXG4gICAgICAgICAgICAvLy5yZWluZm9yY2VMb29wcygpXG4gICAgICAgICAgICAvLy5hZGRFeHRyYUxpbmtzKGRhdGEuZXh0cmFMaW5rcylcbiAgICAgICAgICAgIC5hZGRMYWJlbHMob3B0aW9ucy5zdGFydE51Y2xlb3RpZGVOdW1iZXIsIG9wdGlvbnMubGFiZWxJbnRlcnZhbCk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIHRyYW5zZm9ybSB0aGF0IHdpbGwgZml0IHRoZSBtb2xlY3VsZSB0byB0aGVcbiAgICAgICAgICAgIC8vIHNpemUgb2YgdGhlIHZpZXdwb3J0IChjYW52YXMsIHN2Zywgd2hhdGV2ZXIpICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgZmlsbFZpZXdwb3J0VHJhbnNmb3JtID0gY3JlYXRlVHJhbnNmb3JtVG9GaWxsVmlld3BvcnQoXG4gICAgICAgICAgICAgICAgcmcubm9kZXMubWFwKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQueDsgfSksXG4gICAgICAgICAgICAgICAgcmcubm9kZXMubWFwKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQueTsgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwbG90LmF0dHIoJ3RyYW5zZm9ybScsIGZpbGxWaWV3cG9ydFRyYW5zZm9ybSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBudWNsZW90aWRlTm9kZXMgPSByZy5ub2Rlcy5maWx0ZXIoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLm5vZGVUeXBlID09ICdudWNsZW90aWRlJztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBsZXQgbGFiZWxOb2RlcyA9IHJnLm5vZGVzLmZpbHRlcihmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubm9kZVR5cGUgPT0gJ2xhYmVsJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgbGlua3MgPSByZy5saW5rcztcblxuICAgICAgICAgICAgY3JlYXRlTGlua3MocGxvdCwgbGlua3MpO1xuICAgICAgICAgICAgY3JlYXRlTnVjbGVvdGlkZXMocGxvdCwgbnVjbGVvdGlkZU5vZGVzKTtcbiAgICAgICAgICAgIGNyZWF0ZUxhYmVscyhwbG90LCBsYWJlbE5vZGVzKTtcbiAgICAgICAgICAgIGNyZWF0ZU5hbWUoZDMuc2VsZWN0KHRoaXMpLCBkYXRhLm5hbWUpO1xuXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5idW5kbGVFeHRlcm5hbExpbmtzKSB7XG4gICAgICAgICAgICAgICAgbWFrZUV4dGVybmFsTGlua3NCdW5kbGUocGxvdCwgbGlua3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNoYXJ0LndpZHRoID0gZnVuY3Rpb24oXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvcHRpb25zLndpZHRoO1xuICAgICAgICBvcHRpb25zLndpZHRoID0gXztcbiAgICAgICAgcmV0dXJuIGNoYXJ0O1xuICAgIH07XG5cbiAgICBjaGFydC5oZWlnaHQgPSBmdW5jdGlvbihfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG9wdGlvbnMuaGVpZ2h0O1xuICAgICAgICBvcHRpb25zLmhlaWdodCA9IF87XG4gICAgICAgIHJldHVybiBjaGFydDtcbiAgICB9O1xuXG4gICAgY2hhcnQuc2hvd051Y2xlb3RpZGVMYWJlbHMgPSBmdW5jdGlvbihfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG9wdGlvbnMuc2hvd051Y2xlb3RpZGVMYWJlbHM7XG4gICAgICAgIG9wdGlvbnMuc2hvd051Y2xlb3RpZGVMYWJlbHMgPSBfO1xuICAgICAgICByZXR1cm4gY2hhcnQ7XG4gICAgfTtcblxuICAgIGNoYXJ0LnJuYUVkZ2VQYWRkaW5nID0gZnVuY3Rpb24oXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvcHRpb25zLnJuYUVkZ2VQYWRkaW5nO1xuICAgICAgICBvcHRpb25zLnJuYUVkZ2VQYWRkaW5nID0gXztcbiAgICAgICAgcmV0dXJuIGNoYXJ0O1xuICAgIH07XG5cbiAgICBjaGFydC5udWNsZW90aWRlUmFkaXVzID0gZnVuY3Rpb24oXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvcHRpb25zLm51Y2xlb3RpZGVSYWRpdXM7XG4gICAgICAgIG9wdGlvbnMubnVjbGVvdGlkZVJhZGl1cyA9IF87XG4gICAgICAgIHJldHVybiBjaGFydDtcbiAgICB9O1xuXG4gICAgY2hhcnQubGFiZWxJbnRlcnZhbCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3B0aW9ucy5sYWJlbEludGVydmFsO1xuICAgICAgICBvcHRpb25zLmxhYmVsSW50ZXJ2YWwgPSBfO1xuICAgICAgICByZXR1cm4gY2hhcnQ7XG4gICAgfTtcblxuICAgIGNoYXJ0LnNob3dOdWNsZW90aWRlTGFiZWxzID0gZnVuY3Rpb24oXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvcHRpb25zLnNob3dOdWNsZW90aWRlTGFiZWxzO1xuICAgICAgICBvcHRpb25zLnNob3dOdWNsZW90aWRlTGFiZWxzID0gXztcbiAgICAgICAgcmV0dXJuIGNoYXJ0O1xuICAgIH07XG5cbiAgICBjaGFydC5zdGFydE51Y2xlb3RpZGVOdW1iZXIgPSBmdW5jdGlvbihfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG9wdGlvbnMuc3RhcnROdWNsZW90aWRlTnVtYmVyO1xuICAgICAgICBvcHRpb25zLnN0YXJ0TnVjbGVvdGlkZU51bWJlciA9IF87XG4gICAgICAgIHJldHVybiBjaGFydDtcbiAgICB9O1xuXG4gICAgY2hhcnQuYnVuZGxlRXh0ZXJuYWxMaW5rcyA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3B0aW9ucy5idW5kbGVFeHRlcm5hbExpbmtzO1xuICAgICAgICBvcHRpb25zLmJ1bmRsZUV4dGVybmFsTGlua3MgPSBfO1xuICAgICAgICByZXR1cm4gY2hhcnQ7XG4gICAgfTtcbiAgICBcbiAgICBjaGFydC5ybmFMYXlvdXQgPSBmdW5jdGlvbihfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG9wdGlvbnMucm5hTGF5b3V0O1xuICAgICAgICBvcHRpb25zLnJuYUxheW91dCA9IF87XG4gICAgICAgIHJldHVybiBjaGFydDtcbiAgICB9O1xuICAgIFxuICAgIGNoYXJ0Lm5hbWVQb3NpdGlvbiA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3B0aW9ucy5uYW1lUG9zaXRpb247XG4gICAgICAgIG9wdGlvbnMubmFtZVBvc2l0aW9uID0gXztcbiAgICAgICAgcmV0dXJuIGNoYXJ0O1xuICAgIH07XG4gICAgXG4gICAgcmV0dXJuIGNoYXJ0O1xufSIsImltcG9ydCB7cm5hUGxvdH0gZnJvbSAnLi9ybmFwbG90LmpzJztcblxuaW1wb3J0ICcuLi9zdHlsZXMvcm5hcGxvdC5jc3MnO1xuXG5leHBvcnQgZnVuY3Rpb24gcm5hVHJlZW1hcChwYXNzZWRPcHRpb25zKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICd3aWR0aCc6IDMwMCxcbiAgICAgICAgJ2hlaWdodCc6IDMwMCxcbiAgICAgICAgJ251Y2xlb3RpZGVSYWRpdXMnOiA1LFxuICAgICAgICAncm5hRWRnZVBhZGRpbmcnOiAxLCAgICAgLy8gaG93IGZhciB0aGUgbGVmdG1vc3QsIHJpZ2h0bW9zdCwgdG9wbW9zdCBhbmQgYm90dG9tb3N0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG51Y2xlb3RpZGVzIGFyZSBmcm9tIHRoZSBlZGdlIG9mIHRoZSBwbG90XG4gICAgICAgICdsYWJlbEludGVydmFsJzogMTAsXG4gICAgICAgICdzaG93TnVjbGVvdGlkZUxhYmVscyc6IHRydWUsXG4gICAgICAgICdzdGFydE51Y2xlb3RpZGVOdW1iZXInOiAxLFxuICAgICAgICAnYnVuZGxlRXh0ZXJuYWxMaW5rcyc6IGZhbHNlLFxuICAgICAgICBcbiAgICAgICAgJ3JuYUxheW91dCc6ICdzaW1wbGUnLCAvLyBzaW1wbGUgb3IgbmF2aWV3XG4gICAgICAgICduYW1lUG9zaXRpb24nOiAnMCAwJywgLy8gZm9yIHggYW5kIHkgZWl0aGVyIDAsIDAuNSBvciAxXG4gICAgfTtcbiAgICBcbiAgICB2YXIgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24ob3B0aW9ucywgcGFzc2VkT3B0aW9ucyk7XG5cbiAgICBmdW5jdGlvbiBybmFUcmVlbWFwTm9kZShzZWxlY3Rpb24pIHtcbiAgICAgICAgLy8gY3JlYXRlIGEgYmFja2dyb3VuZCByZWN0YW5nbGUgZm9yIGVhY2ggUk5BIHN0cnVjdHVyZVxuICAgICAgICBzZWxlY3Rpb24uZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7IHJldHVybiAndHJhbnNsYXRlKCcgKyBkLnggKyAnLCcgKyBkLnkgKyAnKScgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gTWF0aC5tYXgoMCwgZC5keCk7IH0pXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgZnVuY3Rpb24oZCkgeyByZXR1cm4gTWF0aC5tYXgoMCwgZC5keSk7IH0pXG5cbiAgICAgICAgICAgIC8vIGRyYXcgdGhlIGFjdHVhbCBSTkEgc3RydWN0dXJlXG4gICAgICAgICAgICB2YXIgY2hhcnQgPSBybmFQbG90KG9wdGlvbnMpXG4gICAgICAgICAgICAud2lkdGgoIE1hdGgubWF4KDAsIGQuZHgpKVxuICAgICAgICAgICAgLmhlaWdodCggTWF0aC5tYXgoMCwgZC5keSkpXG5cbiAgICAgICAgICAgIGlmICgnc3RydWN0dXJlJyBpbiBkKSBkMy5zZWxlY3QodGhpcykuY2FsbChjaGFydClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIGNoYXJ0ID0gZnVuY3Rpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHNlbGVjdGlvbi5lYWNoKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXRhOicsIGRhdGEpXG4gICAgICAgICAgICAvLyBpbml0aWFsaXplIHRoZSB0cmVlbWFwIHN0cnVjdHVyZVxuICAgICAgICAgICAgLy8gc2FtcGxlIGlucHV0XG4gICAgICAgICAgICAvLyB7ICduYW1lJzogJ2JsYWgnLFxuICAgICAgICAgICAgLy8gJ2NoaWxkcmVuOiBbeydzdHJ1Y3R1cmUnOiAnLi4oKC4uKSknLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAnc2VxdWVuY2UnOiAnQUNDR0dDQycsXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICdzaXplJzogNTB9XVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgdmFyIHRyZWVtYXAgPSBkMy5sYXlvdXQudHJlZW1hcCgpXG4gICAgICAgICAgICAuc2l6ZShbb3B0aW9ucy53aWR0aCwgb3B0aW9ucy5oZWlnaHRdKVxuICAgICAgICAgICAgLnN0aWNreShmYWxzZSlcbiAgICAgICAgICAgIC52YWx1ZShmdW5jdGlvbihkKSB7IHJldHVybiBkLnNpemU7IH0pO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBuZXcgPGc+IGZvciBlYWNoIG5vZGUgaW4gdGhlIHRyZWVtYXBcbiAgICAgICAgICAgIC8vIHRoaXMgbWF5IGJlIGEgbGl0dGxlIHJlZHVuZGFudCwgc2luY2Ugd2UgZXhwZWN0IHRoZSBjYWxsaW5nXG4gICAgICAgICAgICAvLyBzZWxlY3Rpb24gdG8gY29udGFpbiB0aGVpciBvd24gZyBlbGVtZW50c1xuICAgICAgICAgICAgdmFyIGdFbnRlciA9IGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdybmF0cmVlbWFwJywgdHJ1ZSlcbiAgICAgICAgICAgIHZhciB0cmVlbWFwR25vZGVzID0gZ0VudGVyLmRhdHVtKGRhdGEpLnNlbGVjdEFsbCgnLnRyZWVtYXBub2RlJylcbiAgICAgICAgICAgICAgICAuZGF0YSh0cmVlbWFwLm5vZGVzKVxuICAgICAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ3RyZWVtYXBub2RlJywgdHJ1ZSlcbiAgICAgICAgICAgICAgICAuY2FsbChybmFUcmVlbWFwTm9kZSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjaGFydC53aWR0aCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3B0aW9ucy53aWR0aDtcbiAgICAgICAgb3B0aW9ucy53aWR0aCA9IF87XG4gICAgICAgIHJldHVybiBjaGFydDtcbiAgICB9O1xuXG4gICAgY2hhcnQuaGVpZ2h0ID0gZnVuY3Rpb24oXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvcHRpb25zLmhlaWdodDtcbiAgICAgICAgb3B0aW9ucy5oZWlnaHQgPSBfO1xuICAgICAgICByZXR1cm4gY2hhcnQ7XG4gICAgfTtcbiAgICBcbiAgICBjaGFydC5zaG93TnVjbGVvdGlkZUxhYmVscyA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3B0aW9ucy5zaG93TnVjbGVvdGlkZUxhYmVscztcbiAgICAgICAgb3B0aW9ucy5zaG93TnVjbGVvdGlkZUxhYmVscyA9IF87XG4gICAgICAgIHJldHVybiBjaGFydDtcbiAgICB9O1xuXG4gICAgY2hhcnQucm5hRWRnZVBhZGRpbmcgPSBmdW5jdGlvbihfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG9wdGlvbnMucm5hRWRnZVBhZGRpbmc7XG4gICAgICAgIG9wdGlvbnMucm5hRWRnZVBhZGRpbmcgPSBfO1xuICAgICAgICByZXR1cm4gY2hhcnQ7XG4gICAgfTtcblxuICAgIGNoYXJ0Lm51Y2xlb3RpZGVSYWRpdXMgPSBmdW5jdGlvbihfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG9wdGlvbnMubnVjbGVvdGlkZVJhZGl1cztcbiAgICAgICAgb3B0aW9ucy5udWNsZW90aWRlUmFkaXVzID0gXztcbiAgICAgICAgcmV0dXJuIGNoYXJ0O1xuICAgIH07XG5cbiAgICBjaGFydC5sYWJlbEludGVydmFsID0gZnVuY3Rpb24oXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvcHRpb25zLmxhYmVsSW50ZXJ2YWw7XG4gICAgICAgIG9wdGlvbnMubGFiZWxJbnRlcnZhbCA9IF87XG4gICAgICAgIHJldHVybiBjaGFydDtcbiAgICB9O1xuXG4gICAgY2hhcnQuc2hvd051Y2xlb3RpZGVMYWJlbHMgPSBmdW5jdGlvbihfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG9wdGlvbnMuc2hvd051Y2xlb3RpZGVMYWJlbHM7XG4gICAgICAgIG9wdGlvbnMuc2hvd051Y2xlb3RpZGVMYWJlbHMgPSBfO1xuICAgICAgICByZXR1cm4gY2hhcnQ7XG4gICAgfTtcblxuICAgIGNoYXJ0LnN0YXJ0TnVjbGVvdGlkZU51bWJlciA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3B0aW9ucy5zdGFydE51Y2xlb3RpZGVOdW1iZXI7XG4gICAgICAgIG9wdGlvbnMuc3RhcnROdWNsZW90aWRlTnVtYmVyID0gXztcbiAgICAgICAgcmV0dXJuIGNoYXJ0O1xuICAgIH07XG5cbiAgICBjaGFydC5idW5kbGVFeHRlcm5hbExpbmtzID0gZnVuY3Rpb24oXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvcHRpb25zLmJ1bmRsZUV4dGVybmFsTGlua3M7XG4gICAgICAgIG9wdGlvbnMuYnVuZGxlRXh0ZXJuYWxMaW5rcyA9IF87XG4gICAgICAgIHJldHVybiBjaGFydDtcbiAgICB9O1xuICAgIFxuICAgIGNoYXJ0LnJuYUxheW91dCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3B0aW9ucy5ybmFMYXlvdXQ7XG4gICAgICAgIG9wdGlvbnMucm5hTGF5b3V0ID0gXztcbiAgICAgICAgcmV0dXJuIGNoYXJ0O1xuICAgIH07XG4gICAgXG4gICAgY2hhcnQubmFtZVBvc2l0aW9uID0gZnVuY3Rpb24oXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvcHRpb25zLm5hbWVQb3NpdGlvbjtcbiAgICAgICAgb3B0aW9ucy5uYW1lUG9zaXRpb24gPSBfO1xuICAgICAgICByZXR1cm4gY2hhcnQ7XG4gICAgfTtcbiAgICBcbiAgICBjaGFydC56b29tID0gZnVuY3Rpb24oXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvcHRpb25zLnpvb207XG4gICAgICAgIG9wdGlvbnMuem9vbSA9IF87XG4gICAgICAgIHJldHVybiBjaGFydDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGNoYXJ0O1xufVxuIiwidmFyIG51bWJlclNvcnQgPSBmdW5jdGlvbihhLGIpIHsgcmV0dXJuIGEgLSBiOyB9O1xuXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlzRXF1YWwoYSwgYikge1xuICAgIC8vIGNvdXJ0ZXN5IG9mIFxuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzExNTk4Mi9ob3ctdG8tY2hlY2staWYtdHdvLWFycmF5cy1hcmUtZXF1YWwtd2l0aC1qYXZhc2NyaXB0XG4gIGlmIChhID09PSBiKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKGEgPT09IG51bGwgfHwgYiA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoYS5sZW5ndGggIT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB5b3UgZG9uJ3QgY2FyZSBhYm91dCB0aGUgb3JkZXIgb2YgdGhlIGVsZW1lbnRzIGluc2lkZVxuICAvLyB0aGUgYXJyYXksIHlvdSBzaG91bGQgc29ydCBib3RoIGFycmF5cyBoZXJlLlxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSTkFVdGlsaXRpZXMoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gdGhlIGJyYWNrZXRzIHRvIHVzZSB3aGVuIGNvbnN0cnVjdGluZyBkb3RicmFja2V0IHN0cmluZ3NcbiAgICAvLyB3aXRoIHBzZXVkb2tub3RzXG4gICAgc2VsZi5icmFja2V0TGVmdCA9ICBcIihbezxBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlwiLnNwbGl0KFwiXCIpO1xuICAgIHNlbGYuYnJhY2tldFJpZ2h0ID0gXCIpXX0+YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcIi5zcGxpdChcIlwiKTtcblxuICAgIHNlbGYuaW52ZXJzZUJyYWNrZXRzID0gZnVuY3Rpb24oYnJhY2tldCkge1xuICAgICAgICB2YXIgcmVzID0ge307XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnJhY2tldC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzW2JyYWNrZXRbaV1dID0gaTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH07XG5cbiAgICBzZWxmLm1heGltdW1NYXRjaGluZyA9IGZ1bmN0aW9uIG1heGltdW1NYXRjaGluZyhwdCl7XG4gICAgICAgIC8vIENvdXJ0ZXN5IG9mIHRoZSBncmVhdCBSb25ueSBMb3JlbnpcblxuICAgICAgICB2YXIgbiA9IHB0WzBdO1xuICAgICAgICB2YXIgVFVSTiA9IDA7ICAgIC8vbWluaW1hbCBudW1iZXIgb2YgbnVjbGVvdGlkZXMgaW4gdGhlIGhhaXJwaW5cblxuICAgICAgICAvKiBhcnJheSBpbml0ICovXG4gICAgICAgIHZhciBtbSA9IG5ldyBBcnJheShuICsgMSk7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPD0gbjsgaSsrKXtcbiAgICAgICAgICAgIG1tW2ldID0gbmV3IEFycmF5KG4gKyAxKTtcbiAgICAgICAgICAgIGZvcih2YXIgaiA9IGk7IGogPD0gbjsgaisrKVxuICAgICAgICAgICAgbW1baV1bal0gPSAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtYXhpbXVtID0gMDtcblxuICAgICAgICAvKiBhY3R1YWwgY29tcHV0YXRpb24gKi9cbiAgICAgICAgZm9yKHZhciBpID0gbiAtIFRVUk4gLSAxOyBpID4gMDsgaS0tKVxuXG4gICAgICAgIGZvcih2YXIgaiA9IGkgKyBUVVJOICsgMTsgaiA8PSBuOyBqKyspe1xuICAgICAgICAgICAgbWF4aW11bSA9IG1tW2ldW2otMV07XG5cbiAgICAgICAgICAgIGZvcih2YXIgbCA9IGogLSBUVVJOIC0gMTsgbCA+PSBpOyBsLS0pIHtcbiAgICAgICAgICAgICAgICBpZihwdFtsXSA9PT0gaikge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIGhhdmUgYSBiYXNlIHBhaXIgaGVyZVxuICAgICAgICAgICAgICAgICAgICBtYXhpbXVtID0gTWF0aC5tYXgobWF4aW11bSwgKChsID4gaSkgPyBtbVtpXVtsLTFdIDogMCkgKyAxICsgKChqIC0gbCAtIDEgPiAwKSA/IG1tW2wrMV1bai0xXSA6IDApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1tW2ldW2pdID0gbWF4aW11bTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1heGltdW0gPSBtbVsxXVtuXTtcblxuICAgICAgICByZXR1cm4gbW07XG4gICAgfTtcblxuICAgIHNlbGYuYmFja3RyYWNrTWF4aW11bU1hdGNoaW5nID0gZnVuY3Rpb24obW0sIG9sZFB0KSB7XG4gICAgICB2YXIgcHQgPSBBcnJheS5hcHBseShudWxsLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5KG1tLmxlbmd0aCkpLm1hcChmdW5jdGlvbigpIHsgcmV0dXJuIDAgfSk7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jcmVhdGUgYW4gYXJyYXkgY29udGFpbmluZyB6ZXJvc1xuXG4gICAgICBzZWxmLm1tQnQobW0sIHB0LCBvbGRQdCwgMSwgbW0ubGVuZ3RoLTEpO1xuICAgICAgcmV0dXJuIHB0O1xuICAgIH1cblxuICAgIHNlbGYubW1CdCA9IGZ1bmN0aW9uKG1tLCBwdCwgb2xkUHQsIGksIGope1xuICAgICAgICAvLyBDcmVhdGUgYSBwYWlydGFibGUgZnJvbSB0aGUgYmFja3RyYWNraW5nXG4gICAgICB2YXIgbWF4aW11bSA9IG1tW2ldW2pdO1xuICAgICAgdmFyIFRVUk4gPSAwO1xuXG4gICAgICBpZihqIC0gaSAtIDEgPCBUVVJOKSByZXR1cm47ICAgIC8qIG5vIG1vcmUgcGFpcnMgKi9cblxuICAgICAgaWYobW1baV1bai0xXSA9PSBtYXhpbXVtKXsgICAgICAvKiBqIGlzIHVucGFpcmVkICovXG4gICAgICAgIHNlbGYubW1CdChtbSwgcHQsIG9sZFB0LCBpLCBqLTEpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGZvcih2YXIgcSA9IGogLSBUVVJOIC0gMTsgcSA+PSBpOyBxLS0peyAgLyogaiBpcyBwYWlyZWQgd2l0aCBzb21lIHEgKi9cbiAgICAgICAgaWYgKG9sZFB0W2pdICE9PSBxKVxuICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgdmFyIGxlZnRQYXJ0ICAgICA9IChxID4gaSkgPyBtbVtpXVtxLTFdIDogMDtcbiAgICAgICAgdmFyIGVuY2xvc2VkUGFydCA9IChqIC0gcSAtIDEgPiAwKSA/IG1tW3ErMV1bai0xXSA6IDA7XG5cbiAgICAgICAgaWYobGVmdFBhcnQgKyBlbmNsb3NlZFBhcnQgKyAxID09IG1heGltdW0pIHtcbiAgICAgICAgICAgIC8vIHRoZXJlJ3MgYSBiYXNlIHBhaXIgYmV0d2VlbiBqIGFuZCBxXG4gICAgICAgICAgICBwdFtxXSA9IGo7XG4gICAgICAgICAgICBwdFtqXSA9IHE7XG5cbiAgICAgICAgICAgIGlmKGkgPCBxKSBcbiAgICAgICAgICAgICAgICBzZWxmLm1tQnQobW0sIHB0LCBvbGRQdCwgaSwgcSAtIDEpO1xuXG4gICAgICAgICAgICBzZWxmLm1tQnQobW0sIHB0LCBvbGRQdCwgcSArIDEsIGogLSAxKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvL2FsZXJ0KGkgKyBcIixcIiArIGogKyBcIjogYmFja3RyYWNraW5nIGZhaWxlZCFcIik7XG4gICAgICBjb25zb2xlLmxvZygnRkFJTEVEISEhJyArIGkgKyAnLCcgKyBqICsgJzogYmFja3RyYWNraW5nIGZhaWxlZCEnKTtcblxuICAgIH07XG5cbiAgICBzZWxmLmRvdGJyYWNrZXRUb1BhaXJ0YWJsZSA9IGZ1bmN0aW9uKGRvdGJyYWNrZXQpIHtcbiAgICAgICAgLy8gY3JlYXRlIGFuIGFycmF5IGFuZCBpbml0aWFsaXplIGl0IHRvIDBcbiAgICAgICAgdmFyIHB0ID0gQXJyYXkuYXBwbHkobnVsbCwgbmV3IEFycmF5KGRvdGJyYWNrZXQubGVuZ3RoICsgMSkpLm1hcChOdW1iZXIucHJvdG90eXBlLnZhbHVlT2YsMCk7XG4gICAgICAgIFxuICAgICAgICAvLyAgdGhlIGZpcnN0IGVsZW1lbnQgaXMgYWx3YXlzIHRoZSBsZW5ndGggb2YgdGhlIFJOQSBtb2xlY3VsZVxuICAgICAgICBwdFswXSA9IGRvdGJyYWNrZXQubGVuZ3RoO1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBwYWlyaW5nIHBhcnRuZXJzIGZvciBlYWNoIHN5bWJvbFxuICAgICAgICB2YXIgc3RhY2sgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxmLmJyYWNrZXRMZWZ0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzdGFja1tpXSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbG9va3VwIHRoZSBpbmRleCBvZiBlYWNoIHN5bWJvbCBpbiB0aGUgYnJhY2tldCBhcnJheVxuICAgICAgICB2YXIgaW52ZXJzZUJyYWNrZXRMZWZ0ID0gc2VsZi5pbnZlcnNlQnJhY2tldHMoc2VsZi5icmFja2V0TGVmdCk7XG4gICAgICAgIHZhciBpbnZlcnNlQnJhY2tldFJpZ2h0ID0gc2VsZi5pbnZlcnNlQnJhY2tldHMoc2VsZi5icmFja2V0UmlnaHQpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZG90YnJhY2tldC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGEgPSBkb3RicmFja2V0W2ldO1xuICAgICAgICAgICAgdmFyIG5pID0gaSArIDE7XG5cbiAgICAgICAgICAgIGlmIChhID09ICcuJyB8fCBhID09ICdvJykge1xuICAgICAgICAgICAgICAgIC8vIHVucGFpcmVkXG4gICAgICAgICAgICAgICAgcHRbbmldID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGEgaW4gaW52ZXJzZUJyYWNrZXRMZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG9wZW4gcGFpcj9cbiAgICAgICAgICAgICAgICAgICAgc3RhY2tbaW52ZXJzZUJyYWNrZXRMZWZ0W2FdXS5wdXNoKG5pKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGEgaW4gaW52ZXJzZUJyYWNrZXRSaWdodCl7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIHBhaXI/XG4gICAgICAgICAgICAgICAgICAgIHZhciBqID0gc3RhY2tbaW52ZXJzZUJyYWNrZXRSaWdodFthXV0ucG9wKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcHRbbmldID0gajtcbiAgICAgICAgICAgICAgICAgICAgcHRbal0gPSBuaTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBcIlVua25vd24gc3ltYm9sIGluIGRvdGJyYWNrZXQgc3RyaW5nXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHN0YWNrKSB7XG4gICAgICAgICAgICBpZiAoc3RhY2tba2V5XS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgXCJVbm1hdGNoZWQgYmFzZSBhdCBwb3NpdGlvbiBcIiArIHN0YWNrW2tleV1bMF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHQ7XG4gICAgfTtcblxuICAgIHNlbGYuaW5zZXJ0SW50b1N0YWNrID0gZnVuY3Rpb24oc3RhY2ssIGksIGopIHtcbiAgICAgICAgdmFyIGsgPSAwO1xuICAgICAgICB3aGlsZSAoc3RhY2tba10ubGVuZ3RoID4gMCAmJiBzdGFja1trXVtzdGFja1trXS5sZW5ndGggLSAxXSA8IGopIHtcbiAgICAgICAgICAgIGsgKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YWNrW2tdLnB1c2goaik7XG4gICAgICAgIHJldHVybiBrO1xuICAgIH07XG5cbiAgICBzZWxmLmRlbGV0ZUZyb21TdGFjayA9IGZ1bmN0aW9uKHN0YWNrLCBqKSB7XG4gICAgICAgIHZhciBrID0gMDtcbiAgICAgICAgd2hpbGUgKHN0YWNrW2tdLmxlbmd0aCA9PT0gMCB8fCBzdGFja1trXVtzdGFja1trXS5sZW5ndGgtMV0gIT0gaikge1xuICAgICAgICAgICAgayArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHN0YWNrW2tdLnBvcCgpO1xuICAgICAgICByZXR1cm4gaztcbiAgICB9O1xuXG4gICAgc2VsZi5wYWlydGFibGVUb0RvdGJyYWNrZXQgPSBmdW5jdGlvbihwdCkge1xuICAgICAgICAvLyBzdG9yZSB0aGUgcGFpcmluZyBwYXJ0bmVycyBmb3IgZWFjaCBzeW1ib2xcbiAgICAgICAgdmFyIHN0YWNrID0ge307XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHRbMF07IGkrKykge1xuICAgICAgICAgICAgc3RhY2tbaV0gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzZWVuID0ge307XG4gICAgICAgIHZhciByZXMgPSBcIlwiO1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBwdFswXSArIDE7IGkrKykge1xuICAgICAgICAgICAgaWYgKHB0W2ldICE9PSAwICYmIHB0W2ldIGluIHNlZW4pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkludmFsaWQgcGFpcnRhYmxlIGNvbnRhaW5zIGR1cGxpY2F0ZSBlbnRyaWVzXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWVuW3B0W2ldXSA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmIChwdFtpXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlcyArPSAnLic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChwdFtpXSA+IGkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzICs9IHNlbGYuYnJhY2tldExlZnRbc2VsZi5pbnNlcnRJbnRvU3RhY2soc3RhY2ssIGksIHB0W2ldKV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzICs9IHNlbGYuYnJhY2tldFJpZ2h0W3NlbGYuZGVsZXRlRnJvbVN0YWNrKHN0YWNrLCBpKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9O1xuXG4gICAgc2VsZi5maW5kVW5tYXRjaGVkID0gZnVuY3Rpb24ocHQsIGZyb20sIHRvKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAqIEZpbmQgdW5tYXRjaGVkIG51Y2xlb3RpZGVzIGluIHRoaXMgbW9sZWN1bGUuXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgdG9SZW1vdmUgPSBbXTtcbiAgICAgICAgdmFyIHVubWF0Y2hlZCA9IFtdO1xuXG4gICAgICAgIHZhciBvcmlnRnJvbSA9IGZyb207XG4gICAgICAgIHZhciBvcmlnVG8gPSB0bztcbiAgICAgICAgdmFyIGk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IGZyb207IGkgPD0gdG87IGkrKylcbiAgICAgICAgICAgIGlmIChwdFtpXSAhPT0gMCAmJiAocHRbaV0gPCBmcm9tIHx8IHB0W2ldID4gdG8pKVxuICAgICAgICAgICAgICAgIHVubWF0Y2hlZC5wdXNoKFtpLHB0W2ldXSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IG9yaWdGcm9tOyBpIDw9IG9yaWdUbzsgaSsrKSB7XG4gICAgICAgICAgICB3aGlsZSAocHRbaV0gPT09IDAgJiYgaSA8PSBvcmlnVG8pIGkrKztcblxuICAgICAgICAgICAgdG8gPSBwdFtpXTtcblxuICAgICAgICAgICAgd2hpbGUgKHB0W2ldID09PSB0bykge1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICB0by0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0b1JlbW92ZSA9IHRvUmVtb3ZlLmNvbmNhdChzZWxmLmZpbmRVbm1hdGNoZWQocHQsIGksIHRvKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodW5tYXRjaGVkLmxlbmd0aCA+IDApXG4gICAgICAgICAgICB0b1JlbW92ZS5wdXNoKHVubWF0Y2hlZCk7XG5cbiAgICAgICAgcmV0dXJuIHRvUmVtb3ZlO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbW92ZVBzZXVkb2tub3RzRnJvbVBhaXJ0YWJsZSA9IGZ1bmN0aW9uKHB0KSB7XG4gICAgICAgIC8qIFJlbW92ZSB0aGUgcHNldWRva25vdHMgZnJvbSB0aGlzIHN0cnVjdHVyZSBpbiBzdWNoIGEgZmFzaGlvblxuICAgICAgICAgKiB0aGF0IHRoZSBsZWFzdCBhbW91bnQgb2YgYmFzZS1wYWlycyBuZWVkIHRvIGJlIGJyb2tlblxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGUgcGFpcnRhYmxlIGlzIG1hbmlwdWxhdGVkIGluIHBsYWNlIGFuZCBhIGxpc3Qgb2YgdHVwbGVzXG4gICAgICAgICAqIGluZGljYXRpbmcgdGhlIGJyb2tlbiBiYXNlIHBhaXJzIGlzIHJldHVybmVkLlxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgbW0gPSBzZWxmLm1heGltdW1NYXRjaGluZyhwdCk7XG4gICAgICAgIHZhciBuZXdQdCA9IHNlbGYuYmFja3RyYWNrTWF4aW11bU1hdGNoaW5nKG1tLCBwdCk7XG4gICAgICAgIHZhciByZW1vdmVkID0gW107XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBwdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHB0W2ldIDwgaSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgaWYgKG5ld1B0W2ldICE9IHB0W2ldKSAge1xuICAgICAgICAgICAgICAgIHJlbW92ZWQucHVzaChbaSwgcHRbaV1dKTtcbiAgICAgICAgICAgICAgICBwdFtwdFtpXV0gPSAwO1xuICAgICAgICAgICAgICAgIHB0W2ldID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgIH07XG5cbiAgICBzZWxmLnB0VG9FbGVtZW50cyA9IGZ1bmN0aW9uKHB0LCBsZXZlbCwgaSwgaiwgZG90QnJhY2tldEJyZWFrcykge1xuICAgICAgICAvKiBDb252ZXJ0IGEgcGFpciB0YWJsZSB0byBhIGxpc3Qgb2Ygc2Vjb25kYXJ5IHN0cnVjdHVyZSBcbiAgICAgICAgICogZWxlbWVudHM6XG4gICAgICAgICAqXG4gICAgICAgICAqIFtbJ3MnLDEsWzIsM11dXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSAncycgaW5kaWNhdGVzIHRoYXQgYW4gZWxlbWVudCBjYW4gYmUgYSBzdGVtLiBJdCBjYW4gYWxzbyBiZVxuICAgICAgICAgKiBhbiBpbnRlcmlvciBsb29wICgnaScpLCBhIGhhaXJwaW4gbG9vcCAoJ2gnKSBvciBhIG11bHRpbG9vcCAoJ20nKVxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGUgc2Vjb25kIG51bWJlciAoMSBpbiB0aGlzIGNhc2UpIGluZGljYXRlcyB0aGUgZGVwdGggb3JcbiAgICAgICAgICogaG93IG1hbnkgYmFzZSBwYWlycyBoYXZlIHRvIGJlIGJyb2tlbiB0byBnZXQgdG8gdGhpcyBlbGVtZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBGaW5hbGx5LCB0aGVyZSBpcyB0aGUgbGlzdCBvZiBudWNsZW90aWRlcyB3aGljaCBhcmUgcGFydCBvZlxuICAgICAgICAgKiBvZiB0aGlzIGVsZW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgZWxlbWVudHMgPSBbXTtcbiAgICAgICAgdmFyIHU1ID0gW2ktMV07XG4gICAgICAgIHZhciB1MyA9IFtqKzFdO1xuXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgNSlcbiAgICAgICAgICAgIGRvdEJyYWNrZXRCcmVha3MgPSBbXTtcblxuICAgICAgICBpZiAoaSA+IGopXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vaXRlcmF0ZSBvdmVyIHRoZSB1bnBhaXJlZCByZWdpb25zIG9uIGVpdGhlciBzaWRlXG4gICAgICAgICAgICAvL3RoaXMgaXMgZWl0aGVyIDUnIGFuZCAzJyB1bnBhaXJlZCBpZiBsZXZlbCA9PSAwXG4gICAgICAgICAgICAvL29yIGFuIGludGVyaW9yIGxvb3Agb3IgYSBtdWx0aWxvb3BcbiAgICAgICAgICAgIGZvciAoOyBwdFtpXSA9PT0gMDsgaSsrKSB7IHU1LnB1c2goaSk7IH1cbiAgICAgICAgICAgIGZvciAoOyBwdFtqXSA9PT0gMDsgai0tKSB7IHUzLnB1c2goaik7IH1cblxuICAgICAgICAgICAgaWYgKGkgPiBqKSB7XG4gICAgICAgICAgICAgICAgLy9oYWlycGluIGxvb3Agb3Igb25lIGxhcmdlIHVucGFpcmVkIG1vbGVjdWxlXG4gICAgICAgICAgICAgICAgdTUucHVzaChpKTtcbiAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbWydlJyxsZXZlbCwgdTUuc29ydChudW1iZXJTb3J0KV1dO1xuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgd2UgaGF2ZSBjaGFpbiBicmVha3MgZHVlXG4gICAgICAgICAgICAgICAgICAgIC8vIHRvIG11bHRpcGxlIHN0cmFuZHMgaW4gdGhlIGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHZhciBleHRlcm5hbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGVmdCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmlnaHQgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB1NS5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4dGVybmFsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0LnB1c2godTVba10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQucHVzaCh1NVtrXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkb3RCcmFja2V0QnJlYWtzLmluZGV4T2YodTVba10pID49IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZXJuYWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4dGVybmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1snaCcsbGV2ZWwsIHU1LnNvcnQobnVtYmVyU29ydCldXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBub3QsIHRoaXMgaXMgYSBzaW1wbGUgaGFpcnBpbiBsb29wXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1snaCcsbGV2ZWwsIHU1LnNvcnQobnVtYmVyU29ydCldXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwdFtpXSAhPSBqKSB7XG4gICAgICAgICAgICAgICAgLy9tdWx0aWxvb3BcbiAgICAgICAgICAgICAgICB2YXIgbSA9IHU1O1xuICAgICAgICAgICAgICAgIHZhciBrID0gaTtcblxuICAgICAgICAgICAgICAgIC8vIHRoZSBudWNsZW90aWRlIGJlZm9yZSBhbmQgdGhlIHN0YXJ0aW5nIG51Y2xlb3RpZGVcbiAgICAgICAgICAgICAgICBtLnB1c2goayk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGsgPD0gaikge1xuICAgICAgICAgICAgICAgICAgICAvLyByZWN1cnNlIGludG8gYSBzdGVtXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gZWxlbWVudHMuY29uY2F0KHNlbGYucHRUb0VsZW1lbnRzKHB0LCBsZXZlbCwgaywgcHRba10sIGRvdEJyYWNrZXRCcmVha3MpKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIG51Y2xlb3RpZGVzIGJldHdlZW4gc3RlbXNcbiAgICAgICAgICAgICAgICAgICAgbS5wdXNoKHB0W2tdKTtcbiAgICAgICAgICAgICAgICAgICAgayA9IHB0W2tdICsgMTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICg7IHB0W2tdID09PSAwICYmIGsgPD0gajsgaysrKSB7IG0ucHVzaChrKTt9XG4gICAgICAgICAgICAgICAgICAgIG0ucHVzaChrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbS5wb3AoKTtcbiAgICAgICAgICAgICAgICBtID0gbS5jb25jYXQodTMpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChtLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChbJ2UnLCBsZXZlbCwgbS5zb3J0KG51bWJlclNvcnQpXSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goWydtJywgbGV2ZWwsIG0uc29ydChudW1iZXJTb3J0KV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudHM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwdFtpXSA9PT0gaikge1xuICAgICAgICAgICAgICAgIC8vaW50ZXJpb3IgbG9vcFxuICAgICAgICAgICAgICAgIHU1LnB1c2goaSk7XG4gICAgICAgICAgICAgICAgdTMucHVzaChqKTtcblxuICAgICAgICAgICAgICAgIHZhciBjb21iaW5lZCA9IHU1LmNvbmNhdCh1Myk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbWJpbmVkLmxlbmd0aCA+IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChbJ2UnLGxldmVsLCB1NS5jb25jYXQodTMpLnNvcnQobnVtYmVyU29ydCldKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChbJ2knLGxldmVsLCB1NS5jb25jYXQodTMpLnNvcnQobnVtYmVyU29ydCldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICB2YXIgcyA9IFtdO1xuICAgICAgICAgICAgLy9nbyB0aHJvdWdoIHRoZSBzdGVtXG4gICAgICAgICAgICB3aGlsZSAocHRbaV0gPT09IGogJiYgaSA8IGopIHtcbiAgICAgICAgICAgICAgICAvL29uZSBzdGVtXG4gICAgICAgICAgICAgICAgcy5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIHMucHVzaChqKTtcblxuICAgICAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgICAgICBqIC09IDE7XG5cbiAgICAgICAgICAgICAgICBsZXZlbCArPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1NSA9IFtpLTFdO1xuICAgICAgICAgICAgdTMgPSBbaisxXTtcbiAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goWydzJywgbGV2ZWwsIHMuc29ydChudW1iZXJTb3J0KV0pO1xuXG4gICAgICAgIHJldHVybiBlbGVtZW50cy5jb25jYXQoc2VsZi5wdFRvRWxlbWVudHMocHQsIGxldmVsLCBpLCBqLCBkb3RCcmFja2V0QnJlYWtzKSk7XG4gICAgfTtcblxufVxuXG5leHBvcnQgdmFyIHJuYVV0aWxpdGllcyA9IG5ldyBSTkFVdGlsaXRpZXMoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIENvbG9yU2NoZW1lKGNvbG9yc1RleHQpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb2xvcnNUZXh0ID0gY29sb3JzVGV4dDtcblxuICAgIHNlbGYucGFyc2VSYW5nZSA9IGZ1bmN0aW9uKHJhbmdlVGV4dCkge1xuICAgICAgICAvL3BhcnNlIGEgbnVtYmVyIHJhbmdlIHN1Y2ggYXMgMS0xMCBvciAzLDcsOSBvciBqdXN0IDdcbiAgICAgICAgdmFyIHBhcnRzID0gcmFuZ2VUZXh0LnNwbGl0KCcsJylcbiAgICAgICAgdmFyIG51bXMgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvL2NvdWxkIGJlIDEgb3IgMTAtMTEgIG9yIHNvbWV0aGluZyBsaWtlIHRoYXRcbiAgICAgICAgICAgIHZhciBwYXJ0czEgPSBwYXJ0c1tpXS5zcGxpdCgnLScpO1xuXG4gICAgICAgICAgICBpZiAocGFydHMxLmxlbmd0aCA9PSAxKVxuICAgICAgICAgICAgICAgIG51bXMucHVzaChwYXJzZUludChwYXJ0czFbMF0pKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHBhcnRzMS5sZW5ndGggPT0gMikge1xuICAgICAgICAgICAgICAgIHZhciBmcm9tID0gcGFyc2VJbnQocGFydHMxWzBdKTtcbiAgICAgICAgICAgICAgICB2YXIgdG8gPSBwYXJzZUludChwYXJ0czFbMV0pO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIGVhY2ggbnVtYmVyIGluIHRoaXMgcmFuZ2VcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gZnJvbTsgaiA8PSB0bzsgaisrKSBcbiAgICAgICAgICAgICAgICAgICAgbnVtcy5wdXNoKGopXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdNYWxmb3JtZWQgcmFuZ2UgKHRvbyBtYW55IGRhc2hlcyk6JywgcmFuZ2VUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudW1zO1xuICAgIH1cblxuICAgIHNlbGYucGFyc2VDb2xvclRleHQgPSBmdW5jdGlvbihjb2xvclRleHQpIHtcbiAgICAgICAgLyogUGFyc2UgdGhlIHRleHQgb2YgYW4gUk5BIGNvbG9yIHN0cmluZy4gSW5zdHJ1Y3Rpb25zIGFuZCBkZXNjcmlwdGlvblxuICAgICAgICAgKiBvZiB0aGUgZm9ybWF0IGFyZSBnaXZlbiBiZWxvdy5cbiAgICAgICAgICpcbiAgICAgICAgICogVGhlIHJldHVybiBpcyBhIGpzb24gZG91YmxlIGRpY3Rpb25hcnkgaW5kZXhlZCBmaXJzdCBieSB0aGUgXG4gICAgICAgICAqIG1vbGVjdWxlIG5hbWUsIHRoZW4gYnkgdGhlIG51Y2xlb3RpZGUuIFRoaXMgaXMgdGhlbiBhcHBsaWVkXG4gICAgICAgICAqIGJ5IGZvcmNlLmpzIHRvIHRoZSBSTkFzIGl0IGlzIGRpc3BsYXlpbmcuIFdoZW4gbm8gbW9sZWN1bGVcbiAgICAgICAgICogbmFtZSBpcyBzcGVjaWZpZWQsIHRoZSBjb2xvciBpcyBhcHBsaWVkIHRvIGFsbCBtb2xlY3VsZXMqL1xuICAgICAgICB2YXIgbGluZXMgPSBjb2xvclRleHQuc3BsaXQoJ1xcbicpO1xuICAgICAgICB2YXIgY3Vyck1vbGVjdWxlID0gJyc7XG4gICAgICAgIHZhciBjb3VudGVyID0gMTtcbiAgICAgICAgdmFyIGNvbG9yc0pzb24gPSB7Y29sb3JWYWx1ZXM6IHsnJzp7fX0sIHJhbmdlOlsnd2hpdGUnLCAnc3RlZWxibHVlJ119O1xuICAgICAgICB2YXIgZG9tYWluVmFsdWVzID0gW107XG5cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGlmIChsaW5lc1tpXVswXSA9PSAnPicpIHtcbiAgICAgICAgICAgICAgICAvLyBuZXcgbW9sZWN1bGVcbiAgICAgICAgICAgICAgICBjdXJyTW9sZWN1bGUgPSBsaW5lc1tpXS50cmltKCkuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgY291bnRlciA9IDE7XG5cbiAgICAgICAgICAgICAgICBjb2xvcnNKc29uLmNvbG9yVmFsdWVzW2N1cnJNb2xlY3VsZV0gPSB7fTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHdvcmRzID0gbGluZXNbaV0udHJpbSgpLnNwbGl0KC9bXFxzXSsvKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB3b3Jkcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChpc05hTih3b3Jkc1tqXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdvcmRzW2pdLnNlYXJjaCgncmFuZ2UnKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGVyZSdzIGEgY29sb3Igc2NhbGUgaW4gdGhpcyBlbnRyeVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnRzID0gd29yZHNbal0uc3BsaXQoJz0nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXJ0c1JpZ2h0ID0gcGFydHNbMV0uc3BsaXQoJzonKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JzSnNvbi5yYW5nZSA9IFtwYXJ0c1JpZ2h0WzBdLCBwYXJ0c1JpZ2h0WzFdXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHdvcmRzW2pdLnNlYXJjaCgnZG9tYWluJykgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGVyZSdzIGEgY29sb3Igc2NhbGUgaW4gdGhpcyBlbnRyeVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnRzID0gd29yZHNbal0uc3BsaXQoJz0nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXJ0c1JpZ2h0ID0gcGFydHNbMV0uc3BsaXQoJzonKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JzSnNvbi5kb21haW4gPSBbcGFydHNSaWdodFswXSwgcGFydHNSaWdodFsxXV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGl0J3Mgbm90IGEgbnVtYmVyLCBzaG91bGQgYmUgYSBjb21iaW5hdGlvbiBcbiAgICAgICAgICAgICAgICAgICAgLy8gb2YgYSBudW1iZXIgKG51Y2xlb3RpZGUgIykgYW5kIGEgY29sb3JcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnRzID0gd29yZHNbal0uc3BsaXQoJzonKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG51bXMgPSBzZWxmLnBhcnNlUmFuZ2UocGFydHNbMF0pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSBwYXJ0c1sxXVxuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgbnVtcy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKGNvbG9yKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yc0pzb24uY29sb3JWYWx1ZXNbY3Vyck1vbGVjdWxlXVtudW1zW2tdXSA9IGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcnNKc29uLmNvbG9yVmFsdWVzW2N1cnJNb2xlY3VsZV1bbnVtc1trXV0gPSArY29sb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tYWluVmFsdWVzLnB1c2goTnVtYmVyKGNvbG9yKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL2l0J3MgYSBudW1iZXIsIHNvIHdlIGFkZCBpdCB0byB0aGUgbGlzdCBvZiB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgLy9zZWVuIGZvciB0aGlzIG1vbGVjdWxlXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yc0pzb24uY29sb3JWYWx1ZXNbY3Vyck1vbGVjdWxlXVtjb3VudGVyXSA9IE51bWJlcih3b3Jkc1tqXSk7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXIgKz0gMTtcblxuICAgICAgICAgICAgICAgICAgICBkb21haW5WYWx1ZXMucHVzaChOdW1iZXIod29yZHNbal0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoISgnZG9tYWluJyBpbiBjb2xvcnNKc29uKSlcbiAgICAgICAgICAgIGNvbG9yc0pzb24uZG9tYWluID0gW01hdGgubWluLmFwcGx5KG51bGwsIGRvbWFpblZhbHVlcyksIE1hdGgubWF4LmFwcGx5KG51bGwsIGRvbWFpblZhbHVlcyldO1xuXG4gICAgICAgIHNlbGYuY29sb3JzSnNvbiA9IGNvbG9yc0pzb247XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYubm9ybWFsaXplQ29sb3JzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8qIFxuICAgICAgICAgKiBOb3JtYWxpemUgdGhlIHBhc3NlZCBpbiB2YWx1ZXMgc28gdGhhdCB0aGV5IHJhbmdlIGZyb21cbiAgICAgICAgICogMCB0byAxXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgdmFsdWU7XG5cbiAgICAgICAgZm9yICh2YXIgbW9sZWN1bGVOYW1lIGluIHNlbGYuY29sb3JzSnNvbikge1xuICAgICAgICAgICAgdmFyIG1pbk51bSA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICAgICAgICB2YXIgbWF4TnVtID0gTnVtYmVyLk1JTl9WQUxVRTtcblxuICAgICAgICAgICAgLy8gaXRlcmF0ZSBvbmNlIHRvIGZpbmQgdGhlIG1pbiBhbmQgbWF4IHZhbHVlcztcbiAgICAgICAgICAgIGZvciAodmFyIHJlc251bSBpbiBzZWxmLmNvbG9yc0pzb24uY29sb3JWYWx1ZXNbbW9sZWN1bGVOYW1lXSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gc2VsZi5jb2xvcnNKc29uLmNvbG9yVmFsdWVzW21vbGVjdWxlTmFtZV1bcmVzbnVtXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IG1pbk51bSlcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbk51bSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPiBtYXhOdW0pXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhOdW0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGl0ZXJhdGUgYWdhaW4gdG8gbm9ybWFsaXplXG4gICAgICAgICAgICBmb3IgKHJlc251bSBpbiBzZWxmLmNvbG9yc0pzb24uY29sb3JWYWx1ZXNbbW9sZWN1bGVOYW1lXSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gc2VsZi5jb2xvcnNKc29uLmNvbG9yVmFsdWVzW21vbGVjdWxlTmFtZV1bcmVzbnVtXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29sb3JzSnNvbi5jb2xvclZhbHVlc1ttb2xlY3VsZU5hbWVdW3Jlc251bV0gPSAodmFsdWUgLSBtaW5OdW0gKSAvIChtYXhOdW0gLSBtaW5OdW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnBhcnNlQ29sb3JUZXh0KHNlbGYuY29sb3JzVGV4dCk7XG4gICAgcmV0dXJuIHNlbGY7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gc2ltcGxlWHlDb29yZGluYXRlcyAocGFpcl90YWJsZSkge1xuICB2YXIgSU5JVF9BTkdMRT0wLjsgICAgIC8qIGluaXRpYWwgYmVuZGluZyBhbmdsZSAqL1xuICB2YXIgSU5JVF9YID0gMTAwLjsgICAgIC8qIGNvb3JkaW5hdGUgb2YgZmlyc3QgZGlnaXQgKi9cbiAgdmFyIElOSVRfWSA9IDEwMC47ICAgICAvKiBzZWUgYWJvdmUgKi9cbiAgdmFyIFJBRElVUyA9ICAxNS47XG5cbiAgdmFyIHggPSBbXSwgeSA9IFtdO1xuXG4gIHZhciBpLCBsZW47XG4gIHZhciAgYWxwaGE7XG5cbiAgbGVuID0gcGFpcl90YWJsZVswXTtcbiAgdmFyIGFuZ2xlID0gQXJyYXkuYXBwbHkobnVsbCwgbmV3IEFycmF5KGxlbis1KSkubWFwKE51bWJlci5wcm90b3R5cGUudmFsdWVPZiwwKTsgXG4gIHZhciBsb29wX3NpemUgPSBBcnJheS5hcHBseShudWxsLCBuZXcgQXJyYXkoMTYrTWF0aC5mbG9vcihsZW4vNSkpKVxuICAgICAgICAgICAgICAgICAgICAubWFwKE51bWJlci5wcm90b3R5cGUudmFsdWVPZiwgMCk7IFxuICB2YXIgc3RhY2tfc2l6ZSA9IEFycmF5LmFwcGx5KG51bGwsIG5ldyBBcnJheSgxNitNYXRoLmZsb29yKGxlbi81KSkpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoTnVtYmVyLnByb3RvdHlwZS52YWx1ZU9mLCAwKTsgXG5cbiAgdmFyIGxwID0gMDtcbiAgdmFyIHN0ayA9IDA7XG4gIHZhciBQSUhBTEYgPSBNYXRoLlBJIC8gMjtcblxuXG4gIHZhciBsb29wID0gZnVuY3Rpb24oaSwgaiwgcGFpcl90YWJsZSlcbiAgLyogaSwgaiBhcmUgdGhlIHBvc2l0aW9ucyBBRlRFUiB0aGUgbGFzdCBwYWlyIG9mIGEgc3RhY2s7IGkuZVxuICAgICBpLTEgYW5kIGorMSBhcmUgcGFpcmVkLiAqL1xuICB7XG4gICAgICB2YXIgY291bnQgPSAyOyAgIC8qIGNvdW50cyB0aGUgVkVSVElDRVMgb2YgYSBsb29wIHBvbHlnb247IHRoYXQnc1xuICAgICAgICAgICAgICAgICAgICAgICAgICBOT1QgbmVjZXNzYXJpbHkgdGhlIG51bWJlciBvZiB1bnBhaXJlZCBiYXNlcyFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgVXBvbiBlbnRyeSB0aGUgbG9vcCBoYXMgYWxyZWFkeSAyIHZlcnRpY2VzLCBuYW1lbHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIHBhaXIgaS0xL2orMS4gICovXG5cbiAgdmFyICAgIHIgPSAwLCBidWJibGUgPSAwOyAvKiBidWJibGUgY291bnRzIHRoZSB1bnBhaXJlZCBkaWdpdHMgaW4gbG9vcHMgKi9cblxuICB2YXIgICAgaV9vbGQsIHBhcnRuZXIsIGssIGwsIHN0YXJ0X2ssIHN0YXJ0X2wsIGZpbGwsIGxhZGRlcjtcbiAgdmFyICAgIGJlZ2luLCB2LCBkaWZmO1xuICB2YXIgIHBvbHlnb247XG5cbiAgdmFyIHJlbWVtYmVyID0gQXJyYXkuYXBwbHkobnVsbCwgbmV3IEFycmF5KCgzK01hdGguZmxvb3IoKGotaSkvNSkqMikpKS5tYXAoTnVtYmVyLnByb3RvdHlwZS52YWx1ZU9mLCAwKTtcblxuICBpX29sZCA9IGktMSwgaisrOyAgICAgICAgIC8qIGogaGFzIG5vdyBiZWVuIHNldCB0byB0aGUgcGFydG5lciBvZiB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyBwYWlyIGZvciBjb3JyZWN0IHdoaWxlLWxvb3BcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXJtaW5hdGlvbi4gICovXG4gIHdoaWxlIChpICE9IGopIHtcbiAgICAgIHBhcnRuZXIgPSBwYWlyX3RhYmxlW2ldO1xuICAgICAgaWYgKCghcGFydG5lcikgfHwgKGk9PTApKVxuICAgICAgICAgIGkrKywgY291bnQrKywgYnViYmxlKys7XG4gICAgICBlbHNlIHtcbiAgICAgICAgICBjb3VudCArPSAyO1xuICAgICAgICAgIGsgPSBpLCBsID0gcGFydG5lcjsgICAgLyogYmVnaW5uaW5nIG9mIHN0YWNrICovXG4gICAgICAgICAgcmVtZW1iZXJbKytyXSA9IGs7XG4gICAgICAgICAgcmVtZW1iZXJbKytyXSA9IGw7XG4gICAgICAgICAgaSA9IHBhcnRuZXIrMTsgICAgICAgICAvKiBuZXh0IGkgZm9yIHRoZSBjdXJyZW50IGxvb3AgKi9cblxuICAgICAgICAgIHN0YXJ0X2sgPSBrLCBzdGFydF9sID0gbDtcbiAgICAgICAgICBsYWRkZXIgPSAwO1xuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgaysrLCBsLS0sIGxhZGRlcisrOyAgICAgICAgLyogZ28gYWxvbmcgdGhlIHN0YWNrIHJlZ2lvbiAqL1xuICAgICAgICAgIH1cbiAgICAgICAgICB3aGlsZSAoKHBhaXJfdGFibGVba10gPT0gbCkgJiYgKHBhaXJfdGFibGVba10gPiBrKSk7XG5cbiAgICAgICAgICBmaWxsID0gbGFkZGVyLTI7XG4gICAgICAgICAgaWYgKGxhZGRlciA+PSAyKSB7XG4gICAgICAgICAgICAgIGFuZ2xlW3N0YXJ0X2srMStmaWxsXSArPSBQSUhBTEY7ICAgLyogIExvb3AgZW50cmllcyBhbmQgICAgKi9cbiAgICAgICAgICAgICAgYW5nbGVbc3RhcnRfbC0xLWZpbGxdICs9IFBJSEFMRjsgICAvKiAgZXhpdHMgZ2V0IGFuICAgICAgICAqL1xuICAgICAgICAgICAgICBhbmdsZVtzdGFydF9rXSAgICAgICAgKz0gUElIQUxGOyAgIC8qICBhZGRpdGlvbmFsIFBJLzIuICAgICovXG4gICAgICAgICAgICAgIGFuZ2xlW3N0YXJ0X2xdICAgICAgICArPSBQSUhBTEY7ICAgLyogIFdoeSA/IChleGVyY2lzZSkgICAgKi9cbiAgICAgICAgICAgICAgaWYgKGxhZGRlciA+IDIpIHtcbiAgICAgICAgICAgICAgICAgIGZvciAoOyBmaWxsID49IDE7IGZpbGwtLSkge1xuICAgICAgICAgICAgICAgICAgICAgIGFuZ2xlW3N0YXJ0X2srZmlsbF0gPSBNYXRoLlBJOyAgICAvKiAgZmlsbCBpbiB0aGUgYW5nbGVzICAqL1xuICAgICAgICAgICAgICAgICAgICAgIGFuZ2xlW3N0YXJ0X2wtZmlsbF0gPSBNYXRoLlBJOyAgICAvKiAgZm9yIHRoZSBiYWNrYm9uZSAgICAqL1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0YWNrX3NpemVbKytzdGtdID0gbGFkZGVyO1xuICAgICAgICAgIGlmIChrIDw9IGwpXG4gICAgICAgICAgICBsb29wKGssIGwsIHBhaXJfdGFibGUpO1xuICAgICAgfVxuICB9XG5cbiAgcG9seWdvbiA9IE1hdGguUEkqKGNvdW50LTIpL2NvdW50OyAvKiBiZW5kaW5nIGFuZ2xlIGluIGxvb3AgcG9seWdvbiAqL1xuICByZW1lbWJlclsrK3JdID0gajtcbiAgYmVnaW4gPSBpX29sZCA8IDAgPyAwIDogaV9vbGQ7XG4gIGZvciAodiA9IDE7IHYgPD0gcjsgdisrKSB7XG4gICAgICBkaWZmICA9IHJlbWVtYmVyW3ZdLWJlZ2luO1xuICAgICAgZm9yIChmaWxsID0gMDsgZmlsbCA8PSBkaWZmOyBmaWxsKyspXG4gICAgICBhbmdsZVtiZWdpbitmaWxsXSArPSBwb2x5Z29uO1xuICAgICAgaWYgKHYgPiByKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgYmVnaW4gPSByZW1lbWJlclsrK3ZdO1xuICB9XG4gIGxvb3Bfc2l6ZVsrK2xwXSA9IGJ1YmJsZTtcbiAgfVxuXG4gIGxvb3AoMCwgbGVuKzEsIHBhaXJfdGFibGUpO1xuICBsb29wX3NpemVbbHBdIC09IDI7ICAgICAvKiBjb3JyZWN0IGZvciBjaGVhdGluZyB3aXRoIGZ1bmN0aW9uIGxvb3AgKi9cblxuICBhbHBoYSA9IElOSVRfQU5HTEU7XG4gIHhbMF0gID0gSU5JVF9YO1xuICB5WzBdICA9IElOSVRfWTtcblxuICB2YXIgcG9zcyA9IFtdO1xuXG4gIHBvc3MucHVzaChbeFswXSwgeVswXV0pO1xuICBmb3IgKGkgPSAxOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHhbaV0gPSB4W2ktMV0rUkFESVVTKk1hdGguY29zKGFscGhhKTtcbiAgICAgIHlbaV0gPSB5W2ktMV0rUkFESVVTKk1hdGguc2luKGFscGhhKTtcblxuICAgICAgcG9zcy5wdXNoKFt4W2ldLCB5W2ldXSk7XG4gICAgICBhbHBoYSArPSBNYXRoLlBJLWFuZ2xlW2krMV07XG4gIH1cblxuICByZXR1cm4gcG9zcztcbn1cbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9kM19fOyJdLCJzb3VyY2VSb290IjoiIn0=