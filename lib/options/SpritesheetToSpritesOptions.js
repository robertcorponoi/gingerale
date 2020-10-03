'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _GeneralOptions2 = _interopRequireDefault(require("./GeneralOptions"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Options that extend the general options and apply to just the `spritesheetToSprites` function.
 */
var SpritesheetToSpritesOptions = /*#__PURE__*/function (_GeneralOptions) {
  (0, _inherits2["default"])(SpritesheetToSpritesOptions, _GeneralOptions);

  var _super = _createSuper(SpritesheetToSpritesOptions);

  /**
   * Sets the name to prepend to each sprite.
   * 
   * @param {string}
   * 
   * @default ''
   */

  /**
   * @param {Object} [options] The parameters passed for the options.
   */
  function SpritesheetToSpritesOptions(options) {
    var _this;

    (0, _classCallCheck2["default"])(this, SpritesheetToSpritesOptions);
    _this = _super.call(this);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "name", '');
    Object.assign((0, _assertThisInitialized2["default"])(_this), options);
    return _this;
  }

  return SpritesheetToSpritesOptions;
}(_GeneralOptions2["default"]);

exports["default"] = SpritesheetToSpritesOptions;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcHRpb25zL1Nwcml0ZXNoZWV0VG9TcHJpdGVzT3B0aW9ucy50cyJdLCJuYW1lcyI6WyJTcHJpdGVzaGVldFRvU3ByaXRlc09wdGlvbnMiLCJvcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwiR2VuZXJhbE9wdGlvbnMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7O0FBRUE7OztJQUdxQkEsMkI7Ozs7O0FBQ25COzs7Ozs7OztBQVNBOzs7QUFHQSx1Q0FBWUMsT0FBWixFQUE4QjtBQUFBOztBQUFBO0FBQzVCO0FBRDRCLDZGQUxmLEVBS2U7QUFHNUJDLElBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxpREFBb0JGLE9BQXBCO0FBSDRCO0FBSTdCOzs7RUFqQnNERywyQiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IEdlbmVyYWxPcHRpb25zIGZyb20gJy4vR2VuZXJhbE9wdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIE9wdGlvbnMgdGhhdCBleHRlbmQgdGhlIGdlbmVyYWwgb3B0aW9ucyBhbmQgYXBwbHkgdG8ganVzdCB0aGUgYHNwcml0ZXNoZWV0VG9TcHJpdGVzYCBmdW5jdGlvbi5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZXNoZWV0VG9TcHJpdGVzT3B0aW9ucyBleHRlbmRzIEdlbmVyYWxPcHRpb25zIHtcclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBuYW1lIHRvIHByZXBlbmQgdG8gZWFjaCBzcHJpdGUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9XHJcbiAgICogXHJcbiAgICogQGRlZmF1bHQgJydcclxuICAgKi9cclxuICBuYW1lOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgcGFyYW1ldGVycyBwYXNzZWQgZm9yIHRoZSBvcHRpb25zLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBPYmplY3QpIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHRpb25zKTtcclxuICB9XHJcbn0iXX0=