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

function image(path) {
  var crossOrigin,
      image,
      _args = arguments;
  return _regenerator["default"].async(function image$(_context) {
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
  });
}
/**
 * Loads data from a file asynchronously and returns it in a JSON format.
 * 
 * @param {string} path The path to the file to load.
 * 
 * @returns {Promise<any>} Returns the JSON data in a promise.
 */


function XHR(path) {
  return _regenerator["default"].async(function XHR$(_context2) {
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
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sb2FkLnRzIl0sIm5hbWVzIjpbImltYWdlIiwicGF0aCIsImNyb3NzT3JpZ2luIiwiSW1hZ2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlcnJvciIsInNyYyIsIlhIUiIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2VUZXh0Iiwib3BlbiIsInNlbmQiXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVVPLFNBQWVBLEtBQWYsQ0FBcUJDLElBQXJCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBbUNDLFVBQUFBLFdBQW5DLDJEQUF5RCxFQUF6RDtBQUVDRixVQUFBQSxLQUZELEdBRTJCLElBQUlHLEtBQUosRUFGM0I7QUFBQSwyQ0FJRSxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBRXRDTixZQUFBQSxLQUFLLENBQUNPLGdCQUFOLENBQXVCLE1BQXZCLEVBQStCLFlBQU07QUFFbkNGLGNBQUFBLE9BQU8sQ0FBQ0wsS0FBRCxDQUFQO0FBRUQsYUFKRDtBQU1BQSxZQUFBQSxLQUFLLENBQUNPLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLFVBQUNDLEtBQUQsRUFBVztBQUV6Q0YsY0FBQUEsTUFBTSxDQUFDRSxLQUFELENBQU47QUFFRCxhQUpEO0FBTUFSLFlBQUFBLEtBQUssQ0FBQ1MsR0FBTixHQUFZUixJQUFaO0FBRUEsZ0JBQUlDLFdBQUosRUFBaUJGLEtBQUssQ0FBQ0UsV0FBTixHQUFvQkEsV0FBcEI7QUFFbEIsV0FsQk0sQ0FKRjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTJCUDs7Ozs7Ozs7O0FBT08sU0FBZVEsR0FBZixDQUFtQlQsSUFBbkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRDQUVFLElBQUlHLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFFdEMsZ0JBQU1LLEdBQW1CLEdBQUcsSUFBSUMsY0FBSixFQUE1QjtBQUVBRCxZQUFBQSxHQUFHLENBQUNKLGdCQUFKLENBQXFCLGtCQUFyQixFQUF5QyxZQUFNO0FBRTdDLGtCQUFJSSxHQUFHLENBQUNFLFVBQUosS0FBbUIsQ0FBbkIsSUFBd0JGLEdBQUcsQ0FBQ0csTUFBSixLQUFlLEdBQTNDLEVBQWdEO0FBRTlDLG9CQUFNQyxRQUFhLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXTixHQUFHLENBQUNPLFlBQWYsQ0FBdEI7QUFFQWIsZ0JBQUFBLE9BQU8sQ0FBQ1UsUUFBRCxDQUFQO0FBRUQ7QUFFRixhQVZEO0FBWUFKLFlBQUFBLEdBQUcsQ0FBQ0osZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEIsVUFBQ0MsS0FBRCxFQUFXO0FBRXZDRixjQUFBQSxNQUFNLENBQUNFLEtBQUQsQ0FBTjtBQUVELGFBSkQ7QUFNQUcsWUFBQUEsR0FBRyxDQUFDUSxJQUFKLENBQVMsS0FBVCxFQUFnQmxCLElBQWhCO0FBQ0FVLFlBQUFBLEdBQUcsQ0FBQ1MsSUFBSjtBQUVELFdBekJNLENBRkY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbi8qKlxyXG4gKiBMb2FkcyBhbiBpbWFnZSBhbmQgcmV0dXJucyBhIHByb21pc2UgY29udGFpbmluZyB0aGUgaW1hZ2UuXHJcbiAqXHJcbiAqIEBhc3luY1xyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgcGF0aCB0byB0aGUgaW1hZ2UgdG8gbG9hZC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGNyb3NzT3JpZ2luIFRoZSBjcm9zcy1vcmlnaW4gcHJvcGVydHkgdG8gc2V0IGZvciB0aGlzIGltYWdlIGlmIGxvYWRpbmcgZnJvbSBhbiBvdXRzaWRlIHNvdXJjZS5cclxuICpcclxuICogQHJldHVybnMge1Byb21pc2U8SFRNTEltYWdlRWxlbWVudD59IFJldHVybnMgYSBwcm9taXNlIGNvbnRhaW5pbmcgdGhlIGxvYWRlZCBpbWFnZS5cclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbWFnZShwYXRoOiBzdHJpbmcsIGNyb3NzT3JpZ2luOiBzdHJpbmcgPSAnJyk6IFByb21pc2U8SFRNTEltYWdlRWxlbWVudD4ge1xyXG5cclxuICBjb25zdCBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cclxuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcblxyXG4gICAgICByZXNvbHZlKGltYWdlKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChlcnJvcikgPT4ge1xyXG5cclxuICAgICAgcmVqZWN0KGVycm9yKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBpbWFnZS5zcmMgPSBwYXRoO1xyXG5cclxuICAgIGlmIChjcm9zc09yaWdpbikgaW1hZ2UuY3Jvc3NPcmlnaW4gPSBjcm9zc09yaWdpbjtcclxuXHJcbiAgfSk7XHJcblxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIExvYWRzIGRhdGEgZnJvbSBhIGZpbGUgYXN5bmNocm9ub3VzbHkgYW5kIHJldHVybnMgaXQgaW4gYSBKU09OIGZvcm1hdC5cclxuICogXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIHRoZSBmaWxlIHRvIGxvYWQuXHJcbiAqIFxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBSZXR1cm5zIHRoZSBKU09OIGRhdGEgaW4gYSBwcm9taXNlLlxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFhIUihwYXRoOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG5cclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IHhocjogWE1MSHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcbiAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcigncmVhZHlzdGF0ZWNoYW5nZScsICgpID0+IHtcclxuXHJcbiAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCAmJiB4aHIuc3RhdHVzID09PSAyMDApIHtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2U6IGFueSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcblxyXG4gICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChlcnJvcikgPT4ge1xyXG5cclxuICAgICAgcmVqZWN0KGVycm9yKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICB4aHIub3BlbignR0VUJywgcGF0aCk7XHJcbiAgICB4aHIuc2VuZCgpO1xyXG5cclxuICB9KTtcclxuXHJcbn1cclxuIl19