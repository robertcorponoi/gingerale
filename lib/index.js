'use strict';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spritesheetToSprites = spritesheetToSprites;
exports.atlasToSprites = atlasToSprites;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var load = _interopRequireWildcard(require("./utils/load"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Takes a spritesheet with uniform sized sprites, meaning that each individual sprite within the spritesheet has the same width and 
 * height, and it returns the sprites as individual HTMLImageElement.
 * 
 * @param {string} src The path to the spritesheet.
 * @param {number} frameWidth The width of every sprite in the spritesheet.
 * @param {number} frameHeight The height of every sprite in the spritesheet.
 * @param {Options} [options]
 * @param {string} [options.name='sprite'] Sets the data-name attribute to this and is used if downloading the images.
 * @param {string} [options.crossOrigin=null] Set the appropriate cross-origin property if the image is from another domain.
 * @param {boolean} [options.download=false] Indicates whether the sprites should also download automatically.
 * 
 * @returns {Promise<Array<HTMLImageElement>>} Returns the individual sprites.
 */
function spritesheetToSprites(_x, _x2, _x3) {
  return _spritesheetToSprites.apply(this, arguments);
}
/**
 * Takes a texture atlas spritesheet and the accompanying JSON file and it returns the sprites as individual HTMLImageElement.
 * 
 * @param {string} atlas The path to the atlas.
 * @param {string} json The path to the JSON file.
 * @param {Options} [options]
 * @param {string} [options.crossOrigin=null] Set the appropriate cross-origin property if the image is from another domain.
 * @param {boolean} [options.download=false] Indicates whether the sprites should also download automatically.
 * 
 * @returns {Promise<Array<HTMLImageElement>>} Returns the individual sprites.
 */


function _spritesheetToSprites() {
  _spritesheetToSprites = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(src, frameWidth, frameHeight) {
    var options,
        name,
        canvas,
        ctx,
        spritesheet,
        rows,
        cols,
        frame,
        frames,
        locX,
        locY,
        counter,
        i,
        j,
        _i,
        len,
        link,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
            name = options.name ? options.name : src.replace(/^.*[\\\/]/, '').substr(0, src.lastIndexOf('.'));
            canvas = document.createElement('canvas');
            ctx = canvas.getContext('2d');
            _context.next = 6;
            return load.image(src, options.crossOrigin);

          case 6:
            spritesheet = _context.sent;
            canvas.height = frameHeight;
            canvas.width = frameWidth;
            rows = Math.floor(spritesheet.height / frameHeight);
            cols = Math.floor(spritesheet.width / frameWidth);
            frames = [];
            locX = 0;
            locY = 0;
            counter = 1;

            for (i = 0; i < rows; ++i) {
              for (j = 0; j < cols; ++j) {
                ctx.drawImage(spritesheet, locX, locY, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);
                frame = new Image();
                frame.src = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
                frame.dataset.name = "".concat(name, "-").concat(counter);
                frames.push(frame);
                counter++;
                locX += frameWidth;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
              }

              locY += frameHeight;
              locX = 0;
            }

            if (options.download) {
              for (_i = 0, len = frames.length; _i < len; ++_i) {
                link = document.createElement('a');
                link.href = frames[_i].src;
                link.download = "".concat(name).concat(_i, ".png");
                link.click();
                link.remove();
              }
            }

            return _context.abrupt("return", frames);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _spritesheetToSprites.apply(this, arguments);
}

function atlasToSprites(_x4, _x5) {
  return _atlasToSprites.apply(this, arguments);
}

function _atlasToSprites() {
  _atlasToSprites = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(atlasPath, jsonPath) {
    var options,
        canvas,
        ctx,
        atlas,
        spriteData,
        frames,
        _iterator,
        _step,
        frame,
        link,
        _args2 = arguments;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
            canvas = document.createElement('canvas');
            ctx = canvas.getContext('2d');
            _context2.next = 5;
            return load.image(atlasPath, options.crossOrigin);

          case 5:
            atlas = _context2.sent;
            _context2.next = 8;
            return load.XHR(jsonPath);

          case 8:
            spriteData = _context2.sent;
            frames = [];
            Object.entries(spriteData.frames).forEach(function (_ref) {
              var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
                  name = _ref2[0],
                  details = _ref2[1];

              var _details = details;
              var sprite = {
                name: '',
                frame: new Image()
              };
              var frameWidth = _details.frame.w;
              var frameHeight = _details.frame.h;

              if (_details.rotated) {
                frameWidth = _details.frame.h;
                frameHeight = _details.frame.w;
              }

              canvas.width = frameWidth;
              canvas.height = frameHeight;
              ctx.drawImage(atlas, _details.frame.x, _details.frame.y, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);
              sprite.name = name;
              sprite.frame.src = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
              frames.push(sprite);
            });

            if (options.download) {
              _iterator = _createForOfIteratorHelper(frames);

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  frame = _step.value;
                  link = document.createElement('a');
                  link.href = frame.frame.src;
                  link.download = frame.name;
                  link.click();
                  link.remove();
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            }

            return _context2.abrupt("return", frames);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _atlasToSprites.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJzcHJpdGVzaGVldFRvU3ByaXRlcyIsInNyYyIsImZyYW1lV2lkdGgiLCJmcmFtZUhlaWdodCIsIm9wdGlvbnMiLCJuYW1lIiwicmVwbGFjZSIsInN1YnN0ciIsImxhc3RJbmRleE9mIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY3R4IiwiZ2V0Q29udGV4dCIsImxvYWQiLCJpbWFnZSIsImNyb3NzT3JpZ2luIiwic3ByaXRlc2hlZXQiLCJoZWlnaHQiLCJ3aWR0aCIsInJvd3MiLCJNYXRoIiwiZmxvb3IiLCJjb2xzIiwiZnJhbWVzIiwibG9jWCIsImxvY1kiLCJjb3VudGVyIiwiaSIsImoiLCJkcmF3SW1hZ2UiLCJmcmFtZSIsIkltYWdlIiwidG9EYXRhVVJMIiwiZGF0YXNldCIsInB1c2giLCJjbGVhclJlY3QiLCJkb3dubG9hZCIsImxlbiIsImxlbmd0aCIsImxpbmsiLCJocmVmIiwiY2xpY2siLCJyZW1vdmUiLCJhdGxhc1RvU3ByaXRlcyIsImF0bGFzUGF0aCIsImpzb25QYXRoIiwiYXRsYXMiLCJYSFIiLCJzcHJpdGVEYXRhIiwiT2JqZWN0IiwiZW50cmllcyIsImZvckVhY2giLCJkZXRhaWxzIiwiX2RldGFpbHMiLCJzcHJpdGUiLCJ3IiwiaCIsInJvdGF0ZWQiLCJ4IiwieSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7OztBQUtBOzs7Ozs7Ozs7Ozs7OztTQWNzQkEsb0I7OztBQTJEdEI7Ozs7Ozs7Ozs7Ozs7O3dHQTNETyxpQkFBb0NDLEdBQXBDLEVBQWlEQyxVQUFqRCxFQUFxRUMsV0FBckU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBMEZDLFlBQUFBLE9BQTFGLDJEQUF5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QjtBQUNwQlMsa0JBQUFBLElBRG9CLEdBQ005QixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FETjtBQUcxQjZCLGtCQUFBQSxJQUFJLENBQUNDLElBQUwsR0FBWVYsS0FBSyxDQUFDQSxLQUFOLENBQVk5QixHQUF4QjtBQUNBdUMsa0JBQUFBLElBQUksQ0FBQ0gsUUFBTCxHQUFnQk4sS0FBSyxDQUFDMUIsSUFBdEI7QUFFQW1DLGtCQUFBQSxJQUFJLENBQUNFLEtBQUw7QUFDQUYsa0JBQUFBLElBQUksQ0FBQ0csTUFBTDtBQUNEO0FBVG1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFVckI7O0FBL0NJLDhDQWlERW5CLE1BakRGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCAqIGFzIGxvYWQgZnJvbSAnLi91dGlscy9sb2FkJztcclxuXHJcbmltcG9ydCBTcHJpdGUgZnJvbSAnLi9pbnRlcmZhY2VzL1Nwcml0ZSc7XHJcbmltcG9ydCBTcHJpdGVEYXRhIGZyb20gJy4vaW50ZXJmYWNlcy9TcHJpdGVEYXRhJztcclxuXHJcbi8qKlxyXG4gKiBUYWtlcyBhIHNwcml0ZXNoZWV0IHdpdGggdW5pZm9ybSBzaXplZCBzcHJpdGVzLCBtZWFuaW5nIHRoYXQgZWFjaCBpbmRpdmlkdWFsIHNwcml0ZSB3aXRoaW4gdGhlIHNwcml0ZXNoZWV0IGhhcyB0aGUgc2FtZSB3aWR0aCBhbmQgXHJcbiAqIGhlaWdodCwgYW5kIGl0IHJldHVybnMgdGhlIHNwcml0ZXMgYXMgaW5kaXZpZHVhbCBIVE1MSW1hZ2VFbGVtZW50LlxyXG4gKiBcclxuICogQHBhcmFtIHtzdHJpbmd9IHNyYyBUaGUgcGF0aCB0byB0aGUgc3ByaXRlc2hlZXQuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBmcmFtZVdpZHRoIFRoZSB3aWR0aCBvZiBldmVyeSBzcHJpdGUgaW4gdGhlIHNwcml0ZXNoZWV0LlxyXG4gKiBAcGFyYW0ge251bWJlcn0gZnJhbWVIZWlnaHQgVGhlIGhlaWdodCBvZiBldmVyeSBzcHJpdGUgaW4gdGhlIHNwcml0ZXNoZWV0LlxyXG4gKiBAcGFyYW0ge09wdGlvbnN9IFtvcHRpb25zXVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMubmFtZT0nc3ByaXRlJ10gU2V0cyB0aGUgZGF0YS1uYW1lIGF0dHJpYnV0ZSB0byB0aGlzIGFuZCBpcyB1c2VkIGlmIGRvd25sb2FkaW5nIHRoZSBpbWFnZXMuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5jcm9zc09yaWdpbj1udWxsXSBTZXQgdGhlIGFwcHJvcHJpYXRlIGNyb3NzLW9yaWdpbiBwcm9wZXJ0eSBpZiB0aGUgaW1hZ2UgaXMgZnJvbSBhbm90aGVyIGRvbWFpbi5cclxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5kb3dubG9hZD1mYWxzZV0gSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwcml0ZXMgc2hvdWxkIGFsc28gZG93bmxvYWQgYXV0b21hdGljYWxseS5cclxuICogXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+Pn0gUmV0dXJucyB0aGUgaW5kaXZpZHVhbCBzcHJpdGVzLlxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNwcml0ZXNoZWV0VG9TcHJpdGVzKHNyYzogc3RyaW5nLCBmcmFtZVdpZHRoOiBudW1iZXIsIGZyYW1lSGVpZ2h0OiBudW1iZXIsIG9wdGlvbnM6IGFueSA9IHt9KTogUHJvbWlzZTxBcnJheTxIVE1MSW1hZ2VFbGVtZW50Pj4ge1xyXG4gIGNvbnN0IG5hbWU6IHN0cmluZyA9IG9wdGlvbnMubmFtZSA/IG9wdGlvbnMubmFtZSA6IHNyYy5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJykuc3Vic3RyKDAsIHNyYy5sYXN0SW5kZXhPZignLicpKTtcclxuXHJcbiAgY29uc3QgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gIGNvbnN0IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gY2FudmFzLmdldENvbnRleHQoJzJkJykhO1xyXG5cclxuICBjb25zdCBzcHJpdGVzaGVldDogSFRNTEltYWdlRWxlbWVudCA9IGF3YWl0IGxvYWQuaW1hZ2Uoc3JjLCBvcHRpb25zLmNyb3NzT3JpZ2luKTtcclxuXHJcbiAgY2FudmFzLmhlaWdodCA9IGZyYW1lSGVpZ2h0O1xyXG4gIGNhbnZhcy53aWR0aCA9IGZyYW1lV2lkdGg7XHJcblxyXG4gIGxldCByb3dzOiBudW1iZXIgPSBNYXRoLmZsb29yKHNwcml0ZXNoZWV0LmhlaWdodCAvIGZyYW1lSGVpZ2h0KTtcclxuICBsZXQgY29sczogbnVtYmVyID0gTWF0aC5mbG9vcihzcHJpdGVzaGVldC53aWR0aCAvIGZyYW1lV2lkdGgpO1xyXG5cclxuICBsZXQgZnJhbWU6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgbGV0IGZyYW1lczogQXJyYXk8SFRNTEltYWdlRWxlbWVudD4gPSBbXTtcclxuXHJcbiAgbGV0IGxvY1g6IG51bWJlciA9IDA7XHJcbiAgbGV0IGxvY1k6IG51bWJlciA9IDA7XHJcblxyXG4gIGxldCBjb3VudGVyOiBudW1iZXIgPSAxO1xyXG5cclxuICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgcm93czsgKytpKSB7XHJcbiAgICBmb3IgKGxldCBqOiBudW1iZXIgPSAwOyBqIDwgY29sczsgKytqKSB7XHJcbiAgICAgIGN0eC5kcmF3SW1hZ2Uoc3ByaXRlc2hlZXQsIGxvY1gsIGxvY1ksIGZyYW1lV2lkdGgsIGZyYW1lSGVpZ2h0LCAwLCAwLCBmcmFtZVdpZHRoLCBmcmFtZUhlaWdodCk7XHJcblxyXG4gICAgICBmcmFtZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICBmcmFtZS5zcmMgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKS5yZXBsYWNlKCdpbWFnZS9wbmcnLCAnaW1hZ2Uvb2N0ZXQtc3RyZWFtJyk7XHJcblxyXG4gICAgICBmcmFtZS5kYXRhc2V0Lm5hbWUgPSBgJHtuYW1lfS0ke2NvdW50ZXJ9YDtcclxuXHJcbiAgICAgIGZyYW1lcy5wdXNoKGZyYW1lKTtcclxuXHJcbiAgICAgIGNvdW50ZXIrKztcclxuXHJcbiAgICAgIGxvY1ggKz0gZnJhbWVXaWR0aDtcclxuXHJcbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBsb2NZICs9IGZyYW1lSGVpZ2h0O1xyXG4gICAgbG9jWCA9IDA7XHJcbiAgfVxyXG5cclxuICBpZiAob3B0aW9ucy5kb3dubG9hZCkge1xyXG4gICAgZm9yIChsZXQgaTogbnVtYmVyID0gMCwgbGVuOiBudW1iZXIgPSBmcmFtZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHJcbiAgICAgIGxpbmsuaHJlZiA9IGZyYW1lc1tpXS5zcmM7XHJcbiAgICAgIGxpbmsuZG93bmxvYWQgPSBgJHtuYW1lfSR7aX0ucG5nYDtcclxuXHJcbiAgICAgIGxpbmsuY2xpY2soKTtcclxuICAgICAgbGluay5yZW1vdmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBmcmFtZXM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUYWtlcyBhIHRleHR1cmUgYXRsYXMgc3ByaXRlc2hlZXQgYW5kIHRoZSBhY2NvbXBhbnlpbmcgSlNPTiBmaWxlIGFuZCBpdCByZXR1cm5zIHRoZSBzcHJpdGVzIGFzIGluZGl2aWR1YWwgSFRNTEltYWdlRWxlbWVudC5cclxuICogXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhdGxhcyBUaGUgcGF0aCB0byB0aGUgYXRsYXMuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBqc29uIFRoZSBwYXRoIHRvIHRoZSBKU09OIGZpbGUuXHJcbiAqIEBwYXJhbSB7T3B0aW9uc30gW29wdGlvbnNdXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5jcm9zc09yaWdpbj1udWxsXSBTZXQgdGhlIGFwcHJvcHJpYXRlIGNyb3NzLW9yaWdpbiBwcm9wZXJ0eSBpZiB0aGUgaW1hZ2UgaXMgZnJvbSBhbm90aGVyIGRvbWFpbi5cclxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5kb3dubG9hZD1mYWxzZV0gSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwcml0ZXMgc2hvdWxkIGFsc28gZG93bmxvYWQgYXV0b21hdGljYWxseS5cclxuICogXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+Pn0gUmV0dXJucyB0aGUgaW5kaXZpZHVhbCBzcHJpdGVzLlxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGF0bGFzVG9TcHJpdGVzKGF0bGFzUGF0aDogc3RyaW5nLCBqc29uUGF0aDogc3RyaW5nLCBvcHRpb25zOiBhbnkgPSB7fSk6IFByb21pc2U8QXJyYXk8SFRNTEltYWdlRWxlbWVudD4+IHtcclxuICBjb25zdCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgY29uc3QgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XHJcblxyXG4gIGNvbnN0IGF0bGFzOiBIVE1MSW1hZ2VFbGVtZW50ID0gYXdhaXQgbG9hZC5pbWFnZShhdGxhc1BhdGgsIG9wdGlvbnMuY3Jvc3NPcmlnaW4pO1xyXG5cclxuICBjb25zdCBzcHJpdGVEYXRhOiBTcHJpdGVEYXRhID0gYXdhaXQgbG9hZC5YSFIoanNvblBhdGgpO1xyXG5cclxuICBsZXQgZnJhbWVzOiBhbnkgPSBbXTtcclxuXHJcbiAgT2JqZWN0LmVudHJpZXMoc3ByaXRlRGF0YS5mcmFtZXMpLmZvckVhY2goKFtuYW1lLCBkZXRhaWxzXSkgPT4ge1xyXG4gICAgY29uc3QgX2RldGFpbHM6IGFueSA9IGRldGFpbHM7XHJcblxyXG4gICAgY29uc3Qgc3ByaXRlOiBTcHJpdGUgPSB7XHJcbiAgICAgIG5hbWU6ICcnLFxyXG4gICAgICBmcmFtZTogbmV3IEltYWdlKClcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGZyYW1lV2lkdGg6IG51bWJlciA9IF9kZXRhaWxzLmZyYW1lLnc7XHJcbiAgICBsZXQgZnJhbWVIZWlnaHQ6IG51bWJlciA9IF9kZXRhaWxzLmZyYW1lLmg7XHJcblxyXG4gICAgaWYgKF9kZXRhaWxzLnJvdGF0ZWQpIHtcclxuICAgICAgZnJhbWVXaWR0aCA9IF9kZXRhaWxzLmZyYW1lLmg7XHJcbiAgICAgIGZyYW1lSGVpZ2h0ID0gX2RldGFpbHMuZnJhbWUudztcclxuICAgIH1cclxuXHJcbiAgICBjYW52YXMud2lkdGggPSBmcmFtZVdpZHRoO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IGZyYW1lSGVpZ2h0O1xyXG5cclxuICAgIGN0eC5kcmF3SW1hZ2UoYXRsYXMsIF9kZXRhaWxzLmZyYW1lLngsIF9kZXRhaWxzLmZyYW1lLnksIGZyYW1lV2lkdGgsIGZyYW1lSGVpZ2h0LCAwLCAwLCBmcmFtZVdpZHRoLCBmcmFtZUhlaWdodCk7XHJcblxyXG4gICAgc3ByaXRlLm5hbWUgPSBuYW1lO1xyXG4gICAgc3ByaXRlLmZyYW1lLnNyYyA9IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpLnJlcGxhY2UoJ2ltYWdlL3BuZycsICdpbWFnZS9vY3RldC1zdHJlYW0nKTtcclxuXHJcbiAgICBmcmFtZXMucHVzaChzcHJpdGUpO1xyXG4gIH0pO1xyXG5cclxuICBpZiAob3B0aW9ucy5kb3dubG9hZCkge1xyXG4gICAgZm9yIChjb25zdCBmcmFtZSBvZiBmcmFtZXMpIHtcclxuICAgICAgY29uc3QgbGluazogSFRNTEFuY2hvckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblxyXG4gICAgICBsaW5rLmhyZWYgPSBmcmFtZS5mcmFtZS5zcmM7XHJcbiAgICAgIGxpbmsuZG93bmxvYWQgPSBmcmFtZS5uYW1lXHJcblxyXG4gICAgICBsaW5rLmNsaWNrKCk7XHJcbiAgICAgIGxpbmsucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZnJhbWVzO1xyXG59XHJcbiJdfQ==