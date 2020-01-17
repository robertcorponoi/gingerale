'use strict';
/**
 * Loads an image and returns a promise containing the image.
 *
 * @async
 *
 * @param {string} path The path to the image to load.
 * @param {string} crossOrigin The cross-origin property to set for this image if loading from an outside source.
 *
 * @returns {Promise<HTMLImageElement>} Returns a promise containing the loaded image.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.image = image;
exports.XHR = XHR;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function image(_x) {
  return _image.apply(this, arguments);
}
/**
 * Loads data from a file asynchronously and returns it in a JSON format.
 * 
 * @param {string} path The path to the file to load.
 * 
 * @returns {Promise<any>} Returns the JSON data in a promise.
 */


function _image() {
  _image = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(path) {
    var crossOrigin,
        image,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            crossOrigin = _args.length > 1 && _args[1] !== undefined ? _args[1] : '';
            image = new Image();
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              image.addEventListener('load', function () {
                return resolve(image);
              });
              image.addEventListener('error', function (error) {
                return reject(error);
              });
              image.src = path;
              if (crossOrigin) image.crossOrigin = crossOrigin;
            }));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _image.apply(this, arguments);
}

function XHR(_x2) {
  return _XHR.apply(this, arguments);
}

function _XHR() {
  _XHR = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(path) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              var xhr = new XMLHttpRequest();
              xhr.addEventListener('readystatechange', function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                  var response = JSON.parse(xhr.responseText);
                  resolve(response);
                }
              });
              xhr.addEventListener('error', function (error) {
                return reject(error);
              });
              xhr.open('GET', path);
              xhr.send();
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _XHR.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sb2FkLnRzIl0sIm5hbWVzIjpbImltYWdlIiwicGF0aCIsImNyb3NzT3JpZ2luIiwiSW1hZ2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlcnJvciIsInNyYyIsIlhIUiIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2VUZXh0Iiwib3BlbiIsInNlbmQiXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBVXNCQSxLOzs7QUFjdEI7Ozs7Ozs7Ozs7OzsrQkFkTyxpQkFBcUJDLElBQXJCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBbUNDLFlBQUFBLFdBQW5DLDJEQUF5RCxFQUF6RDtBQUNDRixZQUFBQSxLQURELEdBQzJCLElBQUlHLEtBQUosRUFEM0I7QUFBQSw2Q0FHRSxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDTixjQUFBQSxLQUFLLENBQUNPLGdCQUFOLENBQXVCLE1BQXZCLEVBQStCO0FBQUEsdUJBQU1GLE9BQU8sQ0FBQ0wsS0FBRCxDQUFiO0FBQUEsZUFBL0I7QUFFQUEsY0FBQUEsS0FBSyxDQUFDTyxnQkFBTixDQUF1QixPQUF2QixFQUFnQyxVQUFDQyxLQUFEO0FBQUEsdUJBQVdGLE1BQU0sQ0FBQ0UsS0FBRCxDQUFqQjtBQUFBLGVBQWhDO0FBRUFSLGNBQUFBLEtBQUssQ0FBQ1MsR0FBTixHQUFZUixJQUFaO0FBRUEsa0JBQUlDLFdBQUosRUFBaUJGLEtBQUssQ0FBQ0UsV0FBTixHQUFvQkEsV0FBcEI7QUFDbEIsYUFSTSxDQUhGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0FxQmVRLEc7Ozs7Ozs7K0JBQWYsa0JBQW1CVCxJQUFuQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOENBQ0UsSUFBSUcsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxrQkFBTUssR0FBbUIsR0FBRyxJQUFJQyxjQUFKLEVBQTVCO0FBRUFELGNBQUFBLEdBQUcsQ0FBQ0osZ0JBQUosQ0FBcUIsa0JBQXJCLEVBQXlDLFlBQU07QUFDN0Msb0JBQUlJLEdBQUcsQ0FBQ0UsVUFBSixLQUFtQixDQUFuQixJQUF3QkYsR0FBRyxDQUFDRyxNQUFKLEtBQWUsR0FBM0MsRUFBZ0Q7QUFDOUMsc0JBQU1DLFFBQWEsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdOLEdBQUcsQ0FBQ08sWUFBZixDQUF0QjtBQUVBYixrQkFBQUEsT0FBTyxDQUFDVSxRQUFELENBQVA7QUFDRDtBQUNGLGVBTkQ7QUFRQUosY0FBQUEsR0FBRyxDQUFDSixnQkFBSixDQUFxQixPQUFyQixFQUE4QixVQUFDQyxLQUFEO0FBQUEsdUJBQVdGLE1BQU0sQ0FBQ0UsS0FBRCxDQUFqQjtBQUFBLGVBQTlCO0FBRUFHLGNBQUFBLEdBQUcsQ0FBQ1EsSUFBSixDQUFTLEtBQVQsRUFBZ0JsQixJQUFoQjtBQUNBVSxjQUFBQSxHQUFHLENBQUNTLElBQUo7QUFDRCxhQWZNLENBREY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuLyoqXHJcbiAqIExvYWRzIGFuIGltYWdlIGFuZCByZXR1cm5zIGEgcHJvbWlzZSBjb250YWluaW5nIHRoZSBpbWFnZS5cclxuICpcclxuICogQGFzeW5jXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIHRoZSBpbWFnZSB0byBsb2FkLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY3Jvc3NPcmlnaW4gVGhlIGNyb3NzLW9yaWdpbiBwcm9wZXJ0eSB0byBzZXQgZm9yIHRoaXMgaW1hZ2UgaWYgbG9hZGluZyBmcm9tIGFuIG91dHNpZGUgc291cmNlLlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxIVE1MSW1hZ2VFbGVtZW50Pn0gUmV0dXJucyBhIHByb21pc2UgY29udGFpbmluZyB0aGUgbG9hZGVkIGltYWdlLlxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltYWdlKHBhdGg6IHN0cmluZywgY3Jvc3NPcmlnaW46IHN0cmluZyA9ICcnKTogUHJvbWlzZTxIVE1MSW1hZ2VFbGVtZW50PiB7XHJcbiAgY29uc3QgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKTtcclxuXHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiByZXNvbHZlKGltYWdlKSk7XHJcblxyXG4gICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZXJyb3IpID0+IHJlamVjdChlcnJvcikpO1xyXG5cclxuICAgIGltYWdlLnNyYyA9IHBhdGg7XHJcblxyXG4gICAgaWYgKGNyb3NzT3JpZ2luKSBpbWFnZS5jcm9zc09yaWdpbiA9IGNyb3NzT3JpZ2luO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogTG9hZHMgZGF0YSBmcm9tIGEgZmlsZSBhc3luY2hyb25vdXNseSBhbmQgcmV0dXJucyBpdCBpbiBhIEpTT04gZm9ybWF0LlxyXG4gKiBcclxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gdGhlIGZpbGUgdG8gbG9hZC5cclxuICogXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFJldHVybnMgdGhlIEpTT04gZGF0YSBpbiBhIHByb21pc2UuXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gWEhSKHBhdGg6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGNvbnN0IHhocjogWE1MSHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcbiAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcigncmVhZHlzdGF0ZWNoYW5nZScsICgpID0+IHtcclxuICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0ICYmIHhoci5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlOiBhbnkgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG5cclxuICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGVycm9yKSA9PiByZWplY3QoZXJyb3IpKTtcclxuXHJcbiAgICB4aHIub3BlbignR0VUJywgcGF0aCk7XHJcbiAgICB4aHIuc2VuZCgpO1xyXG4gIH0pO1xyXG59XHJcbiJdfQ==