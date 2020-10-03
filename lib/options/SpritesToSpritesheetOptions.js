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
 * Options that extend the general options and apply to just the `spritesToSpritesheet` function.
 */
var SpritesToSpritesheetOptions = /*#__PURE__*/function (_GeneralOptions) {
  (0, _inherits2["default"])(SpritesToSpritesheetOptions, _GeneralOptions);

  var _super = _createSuper(SpritesToSpritesheetOptions);

  /**
   * The base path that will apply to all sprite files.
   * 
   * @param {string}
   * 
   * @default ''
   */

  /**
   * @param {Object} [options] The parameters passed for the options.
   */
  function SpritesToSpritesheetOptions(options) {
    var _this;

    (0, _classCallCheck2["default"])(this, SpritesToSpritesheetOptions);
    _this = _super.call(this);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "basePath", '');
    Object.assign((0, _assertThisInitialized2["default"])(_this), options);
    return _this;
  }

  return SpritesToSpritesheetOptions;
}(_GeneralOptions2["default"]);

exports["default"] = SpritesToSpritesheetOptions;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcHRpb25zL1Nwcml0ZXNUb1Nwcml0ZXNoZWV0T3B0aW9ucy50cyJdLCJuYW1lcyI6WyJTcHJpdGVzVG9TcHJpdGVzaGVldE9wdGlvbnMiLCJvcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwiR2VuZXJhbE9wdGlvbnMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7O0FBRUE7OztJQUdxQkEsMkI7Ozs7O0FBQ25COzs7Ozs7OztBQVNBOzs7QUFHQSx1Q0FBWUMsT0FBWixFQUE4QjtBQUFBOztBQUFBO0FBQzVCO0FBRDRCLGlHQUxYLEVBS1c7QUFHNUJDLElBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxpREFBb0JGLE9BQXBCO0FBSDRCO0FBSTdCOzs7RUFqQnNERywyQiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IEdlbmVyYWxPcHRpb25zIGZyb20gJy4vR2VuZXJhbE9wdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIE9wdGlvbnMgdGhhdCBleHRlbmQgdGhlIGdlbmVyYWwgb3B0aW9ucyBhbmQgYXBwbHkgdG8ganVzdCB0aGUgYHNwcml0ZXNUb1Nwcml0ZXNoZWV0YCBmdW5jdGlvbi5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZXNUb1Nwcml0ZXNoZWV0T3B0aW9ucyBleHRlbmRzIEdlbmVyYWxPcHRpb25zIHtcclxuICAvKipcclxuICAgKiBUaGUgYmFzZSBwYXRoIHRoYXQgd2lsbCBhcHBseSB0byBhbGwgc3ByaXRlIGZpbGVzLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0ICcnXHJcbiAgICovXHJcbiAgYmFzZVBhdGg6IHN0cmluZyA9ICcnO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFRoZSBwYXJhbWV0ZXJzIHBhc3NlZCBmb3IgdGhlIG9wdGlvbnMuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucz86IE9iamVjdCkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xyXG4gIH1cclxufSJdfQ==