'use strict';
/**
 * Loads a spritesheet image.
 * 
 * @async
 * 
 * @param {string} path The path to the spritesheet image to load.
 * @param {string} [crossOrigin=''] The cross-origin property to set for the spritesheet image if loading from an outside source.
 * 
 * @returns {Promise<HTMLImageElement>} Returns a promise containing the loaded spritesheet image. 
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadSpritesheet = loadSpritesheet;
exports.loadXML = loadXML;
exports.loadJSON = loadJSON;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function loadSpritesheet(_x, _x2) {
  return _loadSpritesheet.apply(this, arguments);
}
/**
 * Loads an atlas definition file as XML.
 * 
 * @async
 * 
 * @param {string} path The path to the atlas XML file to load.
 * 
 * @returns {Promise<XMLDocument>} Returns a promise containing the loaded XML file.
 */


function _loadSpritesheet() {
  _loadSpritesheet = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(path, crossOrigin) {
    var spritesheet;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            spritesheet = new Image();
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              // When the image has emitted the loaded event we resolve the promise with
              // the image.
              spritesheet.addEventListener('load', function () {
                return resolve(spritesheet);
              }); // If the image has emitted the error event we reject the promise with the
              // error.

              spritesheet.addEventListener('error', function (error) {
                return reject(error);
              });
              spritesheet.src = path;
              if (crossOrigin) spritesheet.crossOrigin = crossOrigin;
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadSpritesheet.apply(this, arguments);
}

function loadXML(_x3) {
  return _loadXML.apply(this, arguments);
}
/**
 * Loads an atlas definition file as JSON.
 * 
 * @async
 * 
 * @param {string} path The path to the atlas JSON file to load.
 * 
 * @returns {Promise<Object>} Returns a promise containing the loaded JSON file.
 */


function _loadXML() {
  _loadXML = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(path) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              var xhr = new XMLHttpRequest();
              xhr.addEventListener('readystatechange', function () {
                // When the XHR emits the `readystatechange` event we check to see if the `readyState`
                // is 4 and the `status` is 200 to make sure that it's fully loaded. If it is, then we
                // resolve with the parsed `responseXML`.
                if (xhr.readyState === 4 && xhr.status === 200) {
                  if (xhr.responseXML) resolve(xhr.responseXML);else reject();
                }
              }); // If the XHR emits the `error` event we reject the Promise with error.

              xhr.addEventListener('error', function (error) {
                return reject(error);
              });
              xhr.responseType = 'document';
              xhr.overrideMimeType('text/xml');
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
  return _loadXML.apply(this, arguments);
}

function loadJSON(_x4) {
  return _loadJSON.apply(this, arguments);
}

function _loadJSON() {
  _loadJSON = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(path) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", new Promise(function (resolve, reject) {
              var xhr = new XMLHttpRequest();
              xhr.addEventListener('readystatechange', function () {
                // When the XHR emits the `readystatechange` event we check to see if the `readyState`
                // is 4 and the `status` is 200 to make sure that it's fully loaded. If it is, then we
                // resolve with the parsed `responseText`.
                if (xhr.readyState === 4 && xhr.status === 200) {
                  if (xhr.responseText) resolve(JSON.parse(xhr.responseText));else reject();
                }
              }); // If the XHR emits the `error` event we reject the Promise with the error.

              xhr.addEventListener('error', function (error) {
                return reject(error);
              });
              xhr.open('GET', path);
              xhr.send();
            }));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _loadJSON.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2FkZXJzLnRzIl0sIm5hbWVzIjpbImxvYWRTcHJpdGVzaGVldCIsInBhdGgiLCJjcm9zc09yaWdpbiIsInNwcml0ZXNoZWV0IiwiSW1hZ2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlcnJvciIsInNyYyIsImxvYWRYTUwiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZVhNTCIsInJlc3BvbnNlVHlwZSIsIm92ZXJyaWRlTWltZVR5cGUiLCJvcGVuIiwic2VuZCIsImxvYWRKU09OIiwicmVzcG9uc2VUZXh0IiwiSlNPTiIsInBhcnNlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FVc0JBLGU7OztBQWdCdEI7Ozs7Ozs7Ozs7OzttR0FoQk8saUJBQStCQyxJQUEvQixFQUE2Q0MsV0FBN0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0NDLFlBQUFBLFdBREQsR0FDZSxJQUFJQyxLQUFKLEVBRGY7QUFBQSw2Q0FHRSxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDO0FBQ0E7QUFDQUosY0FBQUEsV0FBVyxDQUFDSyxnQkFBWixDQUE2QixNQUE3QixFQUFxQztBQUFBLHVCQUFNRixPQUFPLENBQUNILFdBQUQsQ0FBYjtBQUFBLGVBQXJDLEVBSHNDLENBSXRDO0FBQ0E7O0FBQ0FBLGNBQUFBLFdBQVcsQ0FBQ0ssZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0MsVUFBQ0MsS0FBRDtBQUFBLHVCQUFXRixNQUFNLENBQUNFLEtBQUQsQ0FBakI7QUFBQSxlQUF0QztBQUVBTixjQUFBQSxXQUFXLENBQUNPLEdBQVosR0FBa0JULElBQWxCO0FBQ0Esa0JBQUlDLFdBQUosRUFBaUJDLFdBQVcsQ0FBQ0QsV0FBWixHQUEwQkEsV0FBMUI7QUFDbEIsYUFWTSxDQUhGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0F5QmVTLE87OztBQXlCdEI7Ozs7Ozs7Ozs7OzsyRkF6Qk8sa0JBQXVCVixJQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOENBQ0UsSUFBSUksT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxrQkFBTUssR0FBRyxHQUFHLElBQUlDLGNBQUosRUFBWjtBQUVBRCxjQUFBQSxHQUFHLENBQUNKLGdCQUFKLENBQXFCLGtCQUFyQixFQUF5QyxZQUFNO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLG9CQUFJSSxHQUFHLENBQUNFLFVBQUosS0FBbUIsQ0FBbkIsSUFBd0JGLEdBQUcsQ0FBQ0csTUFBSixLQUFlLEdBQTNDLEVBQWdEO0FBQzlDLHNCQUFJSCxHQUFHLENBQUNJLFdBQVIsRUFBcUJWLE9BQU8sQ0FBQ00sR0FBRyxDQUFDSSxXQUFMLENBQVAsQ0FBckIsS0FDS1QsTUFBTTtBQUNaO0FBQ0YsZUFSRCxFQUhzQyxDQWF0Qzs7QUFDQUssY0FBQUEsR0FBRyxDQUFDSixnQkFBSixDQUFxQixPQUFyQixFQUE4QixVQUFDQyxLQUFEO0FBQUEsdUJBQVdGLE1BQU0sQ0FBQ0UsS0FBRCxDQUFqQjtBQUFBLGVBQTlCO0FBRUFHLGNBQUFBLEdBQUcsQ0FBQ0ssWUFBSixHQUFtQixVQUFuQjtBQUNBTCxjQUFBQSxHQUFHLENBQUNNLGdCQUFKLENBQXFCLFVBQXJCO0FBRUFOLGNBQUFBLEdBQUcsQ0FBQ08sSUFBSixDQUFTLEtBQVQsRUFBZ0JsQixJQUFoQjtBQUNBVyxjQUFBQSxHQUFHLENBQUNRLElBQUo7QUFDRCxhQXJCTSxDQURGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0FrQ2VDLFE7Ozs7OzRGQUFmLGtCQUF3QnBCLElBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw4Q0FDRSxJQUFJSSxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLGtCQUFNSyxHQUFHLEdBQUcsSUFBSUMsY0FBSixFQUFaO0FBRUFELGNBQUFBLEdBQUcsQ0FBQ0osZ0JBQUosQ0FBcUIsa0JBQXJCLEVBQXlDLFlBQU07QUFDN0M7QUFDQTtBQUNBO0FBQ0Esb0JBQUlJLEdBQUcsQ0FBQ0UsVUFBSixLQUFtQixDQUFuQixJQUF3QkYsR0FBRyxDQUFDRyxNQUFKLEtBQWUsR0FBM0MsRUFBZ0Q7QUFDOUMsc0JBQUlILEdBQUcsQ0FBQ1UsWUFBUixFQUFzQmhCLE9BQU8sQ0FBQ2lCLElBQUksQ0FBQ0MsS0FBTCxDQUFXWixHQUFHLENBQUNVLFlBQWYsQ0FBRCxDQUFQLENBQXRCLEtBQ0tmLE1BQU07QUFDWjtBQUNGLGVBUkQsRUFIc0MsQ0FhdEM7O0FBQ0FLLGNBQUFBLEdBQUcsQ0FBQ0osZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEIsVUFBQ0MsS0FBRDtBQUFBLHVCQUFXRixNQUFNLENBQUNFLEtBQUQsQ0FBakI7QUFBQSxlQUE5QjtBQUVBRyxjQUFBQSxHQUFHLENBQUNPLElBQUosQ0FBUyxLQUFULEVBQWdCbEIsSUFBaEI7QUFDQVcsY0FBQUEsR0FBRyxDQUFDUSxJQUFKO0FBQ0QsYUFsQk0sQ0FERjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG4vKipcclxuICogTG9hZHMgYSBzcHJpdGVzaGVldCBpbWFnZS5cclxuICogXHJcbiAqIEBhc3luY1xyXG4gKiBcclxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gdGhlIHNwcml0ZXNoZWV0IGltYWdlIHRvIGxvYWQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbY3Jvc3NPcmlnaW49JyddIFRoZSBjcm9zcy1vcmlnaW4gcHJvcGVydHkgdG8gc2V0IGZvciB0aGUgc3ByaXRlc2hlZXQgaW1hZ2UgaWYgbG9hZGluZyBmcm9tIGFuIG91dHNpZGUgc291cmNlLlxyXG4gKiBcclxuICogQHJldHVybnMge1Byb21pc2U8SFRNTEltYWdlRWxlbWVudD59IFJldHVybnMgYSBwcm9taXNlIGNvbnRhaW5pbmcgdGhlIGxvYWRlZCBzcHJpdGVzaGVldCBpbWFnZS4gXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFNwcml0ZXNoZWV0KHBhdGg6IHN0cmluZywgY3Jvc3NPcmlnaW4/OiBzdHJpbmcpOiBQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQ+IHtcclxuICBjb25zdCBzcHJpdGVzaGVldCA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgLy8gV2hlbiB0aGUgaW1hZ2UgaGFzIGVtaXR0ZWQgdGhlIGxvYWRlZCBldmVudCB3ZSByZXNvbHZlIHRoZSBwcm9taXNlIHdpdGhcclxuICAgIC8vIHRoZSBpbWFnZS5cclxuICAgIHNwcml0ZXNoZWV0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiByZXNvbHZlKHNwcml0ZXNoZWV0KSk7XHJcbiAgICAvLyBJZiB0aGUgaW1hZ2UgaGFzIGVtaXR0ZWQgdGhlIGVycm9yIGV2ZW50IHdlIHJlamVjdCB0aGUgcHJvbWlzZSB3aXRoIHRoZVxyXG4gICAgLy8gZXJyb3IuXHJcbiAgICBzcHJpdGVzaGVldC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChlcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XHJcblxyXG4gICAgc3ByaXRlc2hlZXQuc3JjID0gcGF0aDtcclxuICAgIGlmIChjcm9zc09yaWdpbikgc3ByaXRlc2hlZXQuY3Jvc3NPcmlnaW4gPSBjcm9zc09yaWdpbjtcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExvYWRzIGFuIGF0bGFzIGRlZmluaXRpb24gZmlsZSBhcyBYTUwuXHJcbiAqIFxyXG4gKiBAYXN5bmNcclxuICogXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIHRoZSBhdGxhcyBYTUwgZmlsZSB0byBsb2FkLlxyXG4gKiBcclxuICogQHJldHVybnMge1Byb21pc2U8WE1MRG9jdW1lbnQ+fSBSZXR1cm5zIGEgcHJvbWlzZSBjb250YWluaW5nIHRoZSBsb2FkZWQgWE1MIGZpbGUuXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFhNTChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPFhNTERvY3VtZW50PiB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAvLyBXaGVuIHRoZSBYSFIgZW1pdHMgdGhlIGByZWFkeXN0YXRlY2hhbmdlYCBldmVudCB3ZSBjaGVjayB0byBzZWUgaWYgdGhlIGByZWFkeVN0YXRlYFxyXG4gICAgICAvLyBpcyA0IGFuZCB0aGUgYHN0YXR1c2AgaXMgMjAwIHRvIG1ha2Ugc3VyZSB0aGF0IGl0J3MgZnVsbHkgbG9hZGVkLiBJZiBpdCBpcywgdGhlbiB3ZVxyXG4gICAgICAvLyByZXNvbHZlIHdpdGggdGhlIHBhcnNlZCBgcmVzcG9uc2VYTUxgLlxyXG4gICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQgJiYgeGhyLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgaWYgKHhoci5yZXNwb25zZVhNTCkgcmVzb2x2ZSh4aHIucmVzcG9uc2VYTUwpO1xyXG4gICAgICAgIGVsc2UgcmVqZWN0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIElmIHRoZSBYSFIgZW1pdHMgdGhlIGBlcnJvcmAgZXZlbnQgd2UgcmVqZWN0IHRoZSBQcm9taXNlIHdpdGggZXJyb3IuXHJcbiAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZXJyb3IpID0+IHJlamVjdChlcnJvcikpO1xyXG5cclxuICAgIHhoci5yZXNwb25zZVR5cGUgPSAnZG9jdW1lbnQnO1xyXG4gICAgeGhyLm92ZXJyaWRlTWltZVR5cGUoJ3RleHQveG1sJyk7XHJcblxyXG4gICAgeGhyLm9wZW4oJ0dFVCcsIHBhdGgpO1xyXG4gICAgeGhyLnNlbmQoKTtcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExvYWRzIGFuIGF0bGFzIGRlZmluaXRpb24gZmlsZSBhcyBKU09OLlxyXG4gKiBcclxuICogQGFzeW5jXHJcbiAqIFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgcGF0aCB0byB0aGUgYXRsYXMgSlNPTiBmaWxlIHRvIGxvYWQuXHJcbiAqIFxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBSZXR1cm5zIGEgcHJvbWlzZSBjb250YWluaW5nIHRoZSBsb2FkZWQgSlNPTiBmaWxlLlxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRKU09OKHBhdGg6IHN0cmluZyk6IFByb21pc2U8T2JqZWN0PiB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAvLyBXaGVuIHRoZSBYSFIgZW1pdHMgdGhlIGByZWFkeXN0YXRlY2hhbmdlYCBldmVudCB3ZSBjaGVjayB0byBzZWUgaWYgdGhlIGByZWFkeVN0YXRlYFxyXG4gICAgICAvLyBpcyA0IGFuZCB0aGUgYHN0YXR1c2AgaXMgMjAwIHRvIG1ha2Ugc3VyZSB0aGF0IGl0J3MgZnVsbHkgbG9hZGVkLiBJZiBpdCBpcywgdGhlbiB3ZVxyXG4gICAgICAvLyByZXNvbHZlIHdpdGggdGhlIHBhcnNlZCBgcmVzcG9uc2VUZXh0YC5cclxuICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0ICYmIHhoci5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgIGlmICh4aHIucmVzcG9uc2VUZXh0KSByZXNvbHZlKEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCkpO1xyXG4gICAgICAgIGVsc2UgcmVqZWN0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIElmIHRoZSBYSFIgZW1pdHMgdGhlIGBlcnJvcmAgZXZlbnQgd2UgcmVqZWN0IHRoZSBQcm9taXNlIHdpdGggdGhlIGVycm9yLlxyXG4gICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGVycm9yKSA9PiByZWplY3QoZXJyb3IpKTtcclxuXHJcbiAgICB4aHIub3BlbignR0VUJywgcGF0aCk7XHJcbiAgICB4aHIuc2VuZCgpO1xyXG4gIH0pO1xyXG59Il19