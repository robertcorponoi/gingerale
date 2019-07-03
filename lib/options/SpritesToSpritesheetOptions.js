'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _GeneralOptions2 = _interopRequireDefault(require("./GeneralOptions"));

/**
 * Options that extend the general options and apply to just the `spritesToSpritesheet` function.
 */
var SpritesToSpritesheetOptions =
/*#__PURE__*/
function (_GeneralOptions) {
  (0, _inherits2["default"])(SpritesToSpritesheetOptions, _GeneralOptions);

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
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SpritesToSpritesheetOptions).call(this));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "basePath", '');
    Object.assign((0, _assertThisInitialized2["default"])(_this), options);
    return _this;
  }

  return SpritesToSpritesheetOptions;
}(_GeneralOptions2["default"]);

exports["default"] = SpritesToSpritesheetOptions;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcHRpb25zL1Nwcml0ZXNUb1Nwcml0ZXNoZWV0T3B0aW9ucy50cyJdLCJuYW1lcyI6WyJTcHJpdGVzVG9TcHJpdGVzaGVldE9wdGlvbnMiLCJvcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwiR2VuZXJhbE9wdGlvbnMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7QUFFQTs7O0lBR3FCQSwyQjs7Ozs7QUFDbkI7Ozs7Ozs7O0FBU0E7OztBQUdBLHVDQUFZQyxPQUFaLEVBQThCO0FBQUE7O0FBQUE7QUFDNUI7QUFENEIsaUdBTFgsRUFLVztBQUc1QkMsSUFBQUEsTUFBTSxDQUFDQyxNQUFQLGlEQUFvQkYsT0FBcEI7QUFINEI7QUFJN0I7OztFQWpCc0RHLDJCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgR2VuZXJhbE9wdGlvbnMgZnJvbSAnLi9HZW5lcmFsT3B0aW9ucyc7XHJcblxyXG4vKipcclxuICogT3B0aW9ucyB0aGF0IGV4dGVuZCB0aGUgZ2VuZXJhbCBvcHRpb25zIGFuZCBhcHBseSB0byBqdXN0IHRoZSBgc3ByaXRlc1RvU3ByaXRlc2hlZXRgIGZ1bmN0aW9uLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlc1RvU3ByaXRlc2hlZXRPcHRpb25zIGV4dGVuZHMgR2VuZXJhbE9wdGlvbnMge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBiYXNlIHBhdGggdGhhdCB3aWxsIGFwcGx5IHRvIGFsbCBzcHJpdGUgZmlsZXMuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9XHJcbiAgICogXHJcbiAgICogQGRlZmF1bHQgJydcclxuICAgKi9cclxuICBiYXNlUGF0aDogc3RyaW5nID0gJyc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIHBhcmFtZXRlcnMgcGFzc2VkIGZvciB0aGUgb3B0aW9ucy5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zPzogT2JqZWN0KSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0aW9ucyk7XHJcbiAgfVxyXG59Il19