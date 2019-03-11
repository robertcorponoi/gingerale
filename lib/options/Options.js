'use strict';
/**
 * Defines the structure of the options that can be passed to any Gingerale
 * method along with their defaults.
 * 
 * @author Robert Corponoi <robertcorponoi@gmail.com>
 * 
 * @version 0.1.0
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Options =
/**
 * The name attribute that will be passed to the sprites in the
 * `spritesheetToSprites` method.
 * 
 * @since 0.1.0
 * 
 * @property {string}
 * 
 * @default ''
 */

/**
 * The cross origin attribute to use for the image if the image
 * originates from an external source.
 * 
 * @since 0.1.0
 * 
 * @property {string}
 * 
 * @default ''
 */

/**
 * Indicates whether the image/s will download after being generated
 * or not.
 * 
 * @since 0.1.0
 * 
 * @property {boolean}
 * 
 * @default false
 */

/**
 * @param {Object} options The options passed to the Gingerale method being used.
 */
function Options(options) {
  _classCallCheck(this, Options);

  _defineProperty(this, "name", '');

  _defineProperty(this, "crossOrigin", '');

  _defineProperty(this, "download", false);

  Object.assign(this, options);
};

exports.default = Options;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcHRpb25zL09wdGlvbnMudHMiXSwibmFtZXMiOlsiT3B0aW9ucyIsIm9wdGlvbnMiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVFxQkEsTztBQUVwQjs7Ozs7Ozs7Ozs7QUFZQTs7Ozs7Ozs7Ozs7QUFZQTs7Ozs7Ozs7Ozs7QUFZQTs7O0FBR0EsaUJBQVlDLE9BQVosRUFBNkI7QUFBQTs7QUFBQSxnQ0E3QmQsRUE2QmM7O0FBQUEsdUNBakJQLEVBaUJPOztBQUFBLG9DQUxULEtBS1M7O0FBRTVCQyxFQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLEVBQW9CRixPQUFwQjtBQUVBLEMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIHRoZSBzdHJ1Y3R1cmUgb2YgdGhlIG9wdGlvbnMgdGhhdCBjYW4gYmUgcGFzc2VkIHRvIGFueSBHaW5nZXJhbGVcclxuICogbWV0aG9kIGFsb25nIHdpdGggdGhlaXIgZGVmYXVsdHMuXHJcbiAqIFxyXG4gKiBAYXV0aG9yIFJvYmVydCBDb3Jwb25vaSA8cm9iZXJ0Y29ycG9ub2lAZ21haWwuY29tPlxyXG4gKiBcclxuICogQHZlcnNpb24gMC4xLjBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wdGlvbnMge1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbmFtZSBhdHRyaWJ1dGUgdGhhdCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgc3ByaXRlcyBpbiB0aGVcclxuXHQgKiBgc3ByaXRlc2hlZXRUb1Nwcml0ZXNgIG1ldGhvZC5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge3N0cmluZ31cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCAnJ1xyXG5cdCAqL1xyXG5cdG5hbWU6IHN0cmluZyA9ICcnO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY3Jvc3Mgb3JpZ2luIGF0dHJpYnV0ZSB0byB1c2UgZm9yIHRoZSBpbWFnZSBpZiB0aGUgaW1hZ2VcclxuXHQgKiBvcmlnaW5hdGVzIGZyb20gYW4gZXh0ZXJuYWwgc291cmNlLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfVxyXG5cdCAqIFxyXG5cdCAqIEBkZWZhdWx0ICcnXHJcblx0ICovXHJcblx0Y3Jvc3NPcmlnaW46IHN0cmluZyA9ICcnO1xyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgaW1hZ2UvcyB3aWxsIGRvd25sb2FkIGFmdGVyIGJlaW5nIGdlbmVyYXRlZFxyXG5cdCAqIG9yIG5vdC5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge2Jvb2xlYW59XHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgZmFsc2VcclxuXHQgKi9cclxuXHRkb3dubG9hZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBUaGUgb3B0aW9ucyBwYXNzZWQgdG8gdGhlIEdpbmdlcmFsZSBtZXRob2QgYmVpbmcgdXNlZC5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zOiBPYmplY3QpIHtcclxuXHJcblx0XHRPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xyXG5cclxuXHR9XHJcblxyXG59Il19