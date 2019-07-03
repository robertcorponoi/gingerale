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
                resolve(image);
              });
              image.addEventListener('error', function (error) {
                reject(error);
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
                reject(error);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sb2FkLnRzIl0sIm5hbWVzIjpbImltYWdlIiwicGF0aCIsImNyb3NzT3JpZ2luIiwiSW1hZ2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlcnJvciIsInNyYyIsIlhIUiIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2VUZXh0Iiwib3BlbiIsInNlbmQiXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBVXNCQSxLOzs7QUEyQnRCOzs7Ozs7Ozs7Ozs7K0JBM0JPLGlCQUFxQkMsSUFBckI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFtQ0MsWUFBQUEsV0FBbkMsMkRBQXlELEVBQXpEO0FBRUNGLFlBQUFBLEtBRkQsR0FFMkIsSUFBSUcsS0FBSixFQUYzQjtBQUFBLDZDQUlFLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFFdENOLGNBQUFBLEtBQUssQ0FBQ08sZ0JBQU4sQ0FBdUIsTUFBdkIsRUFBK0IsWUFBTTtBQUVuQ0YsZ0JBQUFBLE9BQU8sQ0FBQ0wsS0FBRCxDQUFQO0FBRUQsZUFKRDtBQU1BQSxjQUFBQSxLQUFLLENBQUNPLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLFVBQUNDLEtBQUQsRUFBVztBQUV6Q0YsZ0JBQUFBLE1BQU0sQ0FBQ0UsS0FBRCxDQUFOO0FBRUQsZUFKRDtBQU1BUixjQUFBQSxLQUFLLENBQUNTLEdBQU4sR0FBWVIsSUFBWjtBQUVBLGtCQUFJQyxXQUFKLEVBQWlCRixLQUFLLENBQUNFLFdBQU4sR0FBb0JBLFdBQXBCO0FBRWxCLGFBbEJNLENBSkY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQWtDZVEsRzs7Ozs7OzsrQkFBZixrQkFBbUJULElBQW5CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw4Q0FFRSxJQUFJRyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBRXRDLGtCQUFNSyxHQUFtQixHQUFHLElBQUlDLGNBQUosRUFBNUI7QUFFQUQsY0FBQUEsR0FBRyxDQUFDSixnQkFBSixDQUFxQixrQkFBckIsRUFBeUMsWUFBTTtBQUU3QyxvQkFBSUksR0FBRyxDQUFDRSxVQUFKLEtBQW1CLENBQW5CLElBQXdCRixHQUFHLENBQUNHLE1BQUosS0FBZSxHQUEzQyxFQUFnRDtBQUU5QyxzQkFBTUMsUUFBYSxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV04sR0FBRyxDQUFDTyxZQUFmLENBQXRCO0FBRUFiLGtCQUFBQSxPQUFPLENBQUNVLFFBQUQsQ0FBUDtBQUVEO0FBRUYsZUFWRDtBQVlBSixjQUFBQSxHQUFHLENBQUNKLGdCQUFKLENBQXFCLE9BQXJCLEVBQThCLFVBQUNDLEtBQUQsRUFBVztBQUV2Q0YsZ0JBQUFBLE1BQU0sQ0FBQ0UsS0FBRCxDQUFOO0FBRUQsZUFKRDtBQU1BRyxjQUFBQSxHQUFHLENBQUNRLElBQUosQ0FBUyxLQUFULEVBQWdCbEIsSUFBaEI7QUFDQVUsY0FBQUEsR0FBRyxDQUFDUyxJQUFKO0FBRUQsYUF6Qk0sQ0FGRjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG4vKipcclxuICogTG9hZHMgYW4gaW1hZ2UgYW5kIHJldHVybnMgYSBwcm9taXNlIGNvbnRhaW5pbmcgdGhlIGltYWdlLlxyXG4gKlxyXG4gKiBAYXN5bmNcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gdGhlIGltYWdlIHRvIGxvYWQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjcm9zc09yaWdpbiBUaGUgY3Jvc3Mtb3JpZ2luIHByb3BlcnR5IHRvIHNldCBmb3IgdGhpcyBpbWFnZSBpZiBsb2FkaW5nIGZyb20gYW4gb3V0c2lkZSBzb3VyY2UuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQ+fSBSZXR1cm5zIGEgcHJvbWlzZSBjb250YWluaW5nIHRoZSBsb2FkZWQgaW1hZ2UuXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW1hZ2UocGF0aDogc3RyaW5nLCBjcm9zc09yaWdpbjogc3RyaW5nID0gJycpOiBQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQ+IHtcclxuXHJcbiAgY29uc3QgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKTtcclxuXHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcbiAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG5cclxuICAgICAgcmVzb2x2ZShpbWFnZSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZXJyb3IpID0+IHtcclxuXHJcbiAgICAgIHJlamVjdChlcnJvcik7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgaW1hZ2Uuc3JjID0gcGF0aDtcclxuXHJcbiAgICBpZiAoY3Jvc3NPcmlnaW4pIGltYWdlLmNyb3NzT3JpZ2luID0gY3Jvc3NPcmlnaW47XHJcblxyXG4gIH0pO1xyXG5cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBMb2FkcyBkYXRhIGZyb20gYSBmaWxlIGFzeW5jaHJvbm91c2x5IGFuZCByZXR1cm5zIGl0IGluIGEgSlNPTiBmb3JtYXQuXHJcbiAqIFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgcGF0aCB0byB0aGUgZmlsZSB0byBsb2FkLlxyXG4gKiBcclxuICogQHJldHVybnMge1Byb21pc2U8YW55Pn0gUmV0dXJucyB0aGUgSlNPTiBkYXRhIGluIGEgcHJvbWlzZS5cclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBYSFIocGF0aDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcbiAgICBjb25zdCB4aHI6IFhNTEh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCAoKSA9PiB7XHJcblxyXG4gICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQgJiYgeGhyLnN0YXR1cyA9PT0gMjAwKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlOiBhbnkgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG5cclxuICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZXJyb3IpID0+IHtcclxuXHJcbiAgICAgIHJlamVjdChlcnJvcik7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgeGhyLm9wZW4oJ0dFVCcsIHBhdGgpO1xyXG4gICAgeGhyLnNlbmQoKTtcclxuXHJcbiAgfSk7XHJcblxyXG59XHJcbiJdfQ==