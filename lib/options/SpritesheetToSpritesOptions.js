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
 * Options that extend the general options and apply to just the `spritesheetToSprites` function.
 */
var SpritesheetToSpritesOptions =
/*#__PURE__*/
function (_GeneralOptions) {
  (0, _inherits2["default"])(SpritesheetToSpritesOptions, _GeneralOptions);

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
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SpritesheetToSpritesOptions).call(this));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "name", '');
    Object.assign((0, _assertThisInitialized2["default"])(_this), options);
    return _this;
  }

  return SpritesheetToSpritesOptions;
}(_GeneralOptions2["default"]);

exports["default"] = SpritesheetToSpritesOptions;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcHRpb25zL1Nwcml0ZXNoZWV0VG9TcHJpdGVzT3B0aW9ucy50cyJdLCJuYW1lcyI6WyJTcHJpdGVzaGVldFRvU3ByaXRlc09wdGlvbnMiLCJvcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwiR2VuZXJhbE9wdGlvbnMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7QUFFQTs7O0lBR3FCQSwyQjs7Ozs7QUFDbkI7Ozs7Ozs7O0FBU0E7OztBQUdBLHVDQUFZQyxPQUFaLEVBQThCO0FBQUE7O0FBQUE7QUFDNUI7QUFENEIsNkZBTGYsRUFLZTtBQUc1QkMsSUFBQUEsTUFBTSxDQUFDQyxNQUFQLGlEQUFvQkYsT0FBcEI7QUFINEI7QUFJN0I7OztFQWpCc0RHLDJCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgR2VuZXJhbE9wdGlvbnMgZnJvbSAnLi9HZW5lcmFsT3B0aW9ucyc7XHJcblxyXG4vKipcclxuICogT3B0aW9ucyB0aGF0IGV4dGVuZCB0aGUgZ2VuZXJhbCBvcHRpb25zIGFuZCBhcHBseSB0byBqdXN0IHRoZSBgc3ByaXRlc2hlZXRUb1Nwcml0ZXNgIGZ1bmN0aW9uLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlc2hlZXRUb1Nwcml0ZXNPcHRpb25zIGV4dGVuZHMgR2VuZXJhbE9wdGlvbnMge1xyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIG5hbWUgdG8gcHJlcGVuZCB0byBlYWNoIHNwcml0ZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ31cclxuICAgKiBcclxuICAgKiBAZGVmYXVsdCAnJ1xyXG4gICAqL1xyXG4gIG5hbWU6IHN0cmluZyA9ICcnO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFRoZSBwYXJhbWV0ZXJzIHBhc3NlZCBmb3IgdGhlIG9wdGlvbnMuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucz86IE9iamVjdCkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xyXG4gIH1cclxufSJdfQ==