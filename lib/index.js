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
  _spritesheetToSprites = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(src, frameWidth, frameHeight) {
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
  _atlasToSprites = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(atlasPath, jsonPath) {
    var options,
        canvas,
        ctx,
        atlas,
        spriteData,
        frames,
        _iteratorNormalCompletion,
        _didIteratorError,
        _iteratorError,
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
                name: null,
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

            if (!options.download) {
              _context2.next = 31;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 15;

            for (_iterator = frames[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              frame = _step.value;
              link = document.createElement('a');
              link.href = frame.frame.src;
              link.download = frame.name;
              link.click();
              link.remove();
            }

            _context2.next = 23;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](15);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 23:
            _context2.prev = 23;
            _context2.prev = 24;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 26:
            _context2.prev = 26;

            if (!_didIteratorError) {
              _context2.next = 29;
              break;
            }

            throw _iteratorError;

          case 29:
            return _context2.finish(26);

          case 30:
            return _context2.finish(23);

          case 31:
            return _context2.abrupt("return", frames);

          case 32:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[15, 19, 23, 31], [24,, 26, 30]]);
  }));
  return _atlasToSprites.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJzcHJpdGVzaGVldFRvU3ByaXRlcyIsInNyYyIsImZyYW1lV2lkdGgiLCJmcmFtZUhlaWdodCIsIm9wdGlvbnMiLCJuYW1lIiwicmVwbGFjZSIsInN1YnN0ciIsImxhc3RJbmRleE9mIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY3R4IiwiZ2V0Q29udGV4dCIsImxvYWQiLCJpbWFnZSIsImNyb3NzT3JpZ2luIiwic3ByaXRlc2hlZXQiLCJoZWlnaHQiLCJ3aWR0aCIsInJvd3MiLCJNYXRoIiwiZmxvb3IiLCJjb2xzIiwiZnJhbWVzIiwibG9jWCIsImxvY1kiLCJjb3VudGVyIiwiaSIsImoiLCJkcmF3SW1hZ2UiLCJmcmFtZSIsIkltYWdlIiwidG9EYXRhVVJMIiwiZGF0YXNldCIsInB1c2giLCJjbGVhclJlY3QiLCJkb3dubG9hZCIsImxlbiIsImxlbmd0aCIsImxpbmsiLCJocmVmIiwiY2xpY2siLCJyZW1vdmUiLCJhdGxhc1RvU3ByaXRlcyIsImF0bGFzUGF0aCIsImpzb25QYXRoIiwiYXRsYXMiLCJYSFIiLCJzcHJpdGVEYXRhIiwiT2JqZWN0IiwiZW50cmllcyIsImZvckVhY2giLCJkZXRhaWxzIiwiX2RldGFpbHMiLCJzcHJpdGUiLCJ3IiwiaCIsInJvdGF0ZWQiLCJ4IiwieSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQVNBOzs7Ozs7Ozs7Ozs7OztTQWNzQkEsb0I7OztBQXFFdEI7Ozs7Ozs7Ozs7Ozs7Ozs7K0JBckVPLGlCQUFvQ0MsR0FBcEMsRUFBaURDLFVBQWpELEVBQXFFQyxXQUFyRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUEwRkMsWUFBQUEsT0FBMUYsMkRBQWlJLEVB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LE1BQXBCLHVIQUE0QjtBQUFqQk8sY0FBQUEsS0FBaUI7QUFFcEJTLGNBQUFBLElBRm9CLEdBRU05QixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FGTjtBQUkxQjZCLGNBQUFBLElBQUksQ0FBQ0MsSUFBTCxHQUFZVixLQUFLLENBQUNBLEtBQU4sQ0FBWTlCLEdBQXhCO0FBQ0F1QyxjQUFBQSxJQUFJLENBQUNILFFBQUwsR0FBZ0JOLEtBQUssQ0FBQzFCLElBQXRCO0FBRUFtQyxjQUFBQSxJQUFJLENBQUNFLEtBQUw7QUFDQUYsY0FBQUEsSUFBSSxDQUFDRyxNQUFMO0FBRUQ7O0FBbkRFO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUEsOENBdURFbkIsTUF2REY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0ICogYXMgbG9hZCBmcm9tICcuL3V0aWxzL2xvYWQnO1xyXG5cclxuLy8gaW1wb3J0IEdlbmVyYWxPcHRpb25zIGZyb20gJy4vb3B0aW9ucy9HZW5lcmFsT3B0aW9ucyc7XHJcbi8vIGltcG9ydCBTcHJpdGVzaGVldFRvU3ByaXRlc09wdGlvbnMgZnJvbSAnLi9vcHRpb25zL1Nwcml0ZXNoZWV0VG9TcHJpdGVzT3B0aW9ucyc7XHJcbi8vIGltcG9ydCBTcHJpdGVzVG9TcHJpdGVzaGVldE9wdGlvbnMgZnJvbSAnLi9vcHRpb25zL1Nwcml0ZXNUb1Nwcml0ZXNoZWV0T3B0aW9ucyc7XHJcblxyXG5pbXBvcnQgR2VuZXJhbE9wdGlvbnMgZnJvbSAnLi9pbnRlcmZhY2VzL0dlbmVyYWxPcHRpb25zJztcclxuaW1wb3J0IFNwcml0ZXNoZWV0VG9TcHJpdGVzT3B0aW9ucyBmcm9tICcuL2ludGVyZmFjZXMvU3ByaXRlc2hlZXRUb1Nwcml0ZXNPcHRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBUYWtlcyBhIHNwcml0ZXNoZWV0IHdpdGggdW5pZm9ybSBzaXplZCBzcHJpdGVzLCBtZWFuaW5nIHRoYXQgZWFjaCBpbmRpdmlkdWFsIHNwcml0ZSB3aXRoaW4gdGhlIHNwcml0ZXNoZWV0IGhhcyB0aGUgc2FtZSB3aWR0aCBhbmQgXHJcbiAqIGhlaWdodCwgYW5kIGl0IHJldHVybnMgdGhlIHNwcml0ZXMgYXMgaW5kaXZpZHVhbCBIVE1MSW1hZ2VFbGVtZW50LlxyXG4gKiBcclxuICogQHBhcmFtIHtzdHJpbmd9IHNyYyBUaGUgcGF0aCB0byB0aGUgc3ByaXRlc2hlZXQuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBmcmFtZVdpZHRoIFRoZSB3aWR0aCBvZiBldmVyeSBzcHJpdGUgaW4gdGhlIHNwcml0ZXNoZWV0LlxyXG4gKiBAcGFyYW0ge251bWJlcn0gZnJhbWVIZWlnaHQgVGhlIGhlaWdodCBvZiBldmVyeSBzcHJpdGUgaW4gdGhlIHNwcml0ZXNoZWV0LlxyXG4gKiBAcGFyYW0ge09wdGlvbnN9IFtvcHRpb25zXVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMubmFtZT0nc3ByaXRlJ10gU2V0cyB0aGUgZGF0YS1uYW1lIGF0dHJpYnV0ZSB0byB0aGlzIGFuZCBpcyB1c2VkIGlmIGRvd25sb2FkaW5nIHRoZSBpbWFnZXMuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5jcm9zc09yaWdpbj1udWxsXSBTZXQgdGhlIGFwcHJvcHJpYXRlIGNyb3NzLW9yaWdpbiBwcm9wZXJ0eSBpZiB0aGUgaW1hZ2UgaXMgZnJvbSBhbm90aGVyIGRvbWFpbi5cclxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5kb3dubG9hZD1mYWxzZV0gSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwcml0ZXMgc2hvdWxkIGFsc28gZG93bmxvYWQgYXV0b21hdGljYWxseS5cclxuICogXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+Pn0gUmV0dXJucyB0aGUgaW5kaXZpZHVhbCBzcHJpdGVzLlxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNwcml0ZXNoZWV0VG9TcHJpdGVzKHNyYzogc3RyaW5nLCBmcmFtZVdpZHRoOiBudW1iZXIsIGZyYW1lSGVpZ2h0OiBudW1iZXIsIG9wdGlvbnM6IFNwcml0ZXNoZWV0VG9TcHJpdGVzT3B0aW9ucyA9IHt9KTogUHJvbWlzZTxBcnJheTxIVE1MSW1hZ2VFbGVtZW50Pj4ge1xyXG5cclxuICBjb25zdCBuYW1lID0gb3B0aW9ucy5uYW1lID8gb3B0aW9ucy5uYW1lIDogc3JjLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKS5zdWJzdHIoMCwgc3JjLmxhc3RJbmRleE9mKCcuJykpO1xyXG5cclxuICBjb25zdCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgY29uc3QgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XHJcblxyXG4gIGNvbnN0IHNwcml0ZXNoZWV0OiBIVE1MSW1hZ2VFbGVtZW50ID0gYXdhaXQgbG9hZC5pbWFnZShzcmMsIG9wdGlvbnMuY3Jvc3NPcmlnaW4pO1xyXG5cclxuICBjYW52YXMuaGVpZ2h0ID0gZnJhbWVIZWlnaHQ7XHJcbiAgY2FudmFzLndpZHRoID0gZnJhbWVXaWR0aDtcclxuXHJcbiAgbGV0IHJvd3M6IG51bWJlciA9IE1hdGguZmxvb3Ioc3ByaXRlc2hlZXQuaGVpZ2h0IC8gZnJhbWVIZWlnaHQpO1xyXG4gIGxldCBjb2xzOiBudW1iZXIgPSBNYXRoLmZsb29yKHNwcml0ZXNoZWV0LndpZHRoIC8gZnJhbWVXaWR0aCk7XHJcblxyXG4gIGxldCBmcmFtZTogSFRNTEltYWdlRWxlbWVudDtcclxuICBsZXQgZnJhbWVzOiBBcnJheTxIVE1MSW1hZ2VFbGVtZW50PiA9IFtdO1xyXG5cclxuICBsZXQgbG9jWDogbnVtYmVyID0gMDtcclxuICBsZXQgbG9jWTogbnVtYmVyID0gMDtcclxuXHJcbiAgbGV0IGNvdW50ZXI6IG51bWJlciA9IDE7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgKytpKSB7XHJcblxyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2xzOyArK2opIHtcclxuXHJcbiAgICAgIGN0eC5kcmF3SW1hZ2Uoc3ByaXRlc2hlZXQsIGxvY1gsIGxvY1ksIGZyYW1lV2lkdGgsIGZyYW1lSGVpZ2h0LCAwLCAwLCBmcmFtZVdpZHRoLCBmcmFtZUhlaWdodCk7XHJcblxyXG4gICAgICBmcmFtZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICBmcmFtZS5zcmMgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKS5yZXBsYWNlKCdpbWFnZS9wbmcnLCAnaW1hZ2Uvb2N0ZXQtc3RyZWFtJyk7XHJcblxyXG4gICAgICBmcmFtZS5kYXRhc2V0Lm5hbWUgPSBgJHtuYW1lfS0ke2NvdW50ZXJ9YDtcclxuXHJcbiAgICAgIGZyYW1lcy5wdXNoKGZyYW1lKTtcclxuXHJcbiAgICAgIGNvdW50ZXIrKztcclxuXHJcbiAgICAgIGxvY1ggKz0gZnJhbWVXaWR0aDtcclxuXHJcbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbG9jWSArPSBmcmFtZUhlaWdodDtcclxuICAgIGxvY1ggPSAwO1xyXG5cclxuICB9XHJcblxyXG4gIGlmIChvcHRpb25zLmRvd25sb2FkKSB7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGZyYW1lcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG5cclxuICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHJcbiAgICAgIGxpbmsuaHJlZiA9IGZyYW1lc1tpXS5zcmM7XHJcbiAgICAgIGxpbmsuZG93bmxvYWQgPSBgJHtuYW1lfSR7aX0ucG5nYDtcclxuXHJcbiAgICAgIGxpbmsuY2xpY2soKTtcclxuICAgICAgbGluay5yZW1vdmUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZyYW1lcztcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUYWtlcyBhIHRleHR1cmUgYXRsYXMgc3ByaXRlc2hlZXQgYW5kIHRoZSBhY2NvbXBhbnlpbmcgSlNPTiBmaWxlIGFuZCBpdCByZXR1cm5zIHRoZSBzcHJpdGVzIGFzIGluZGl2aWR1YWwgSFRNTEltYWdlRWxlbWVudC5cclxuICogXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhdGxhcyBUaGUgcGF0aCB0byB0aGUgYXRsYXMuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBqc29uIFRoZSBwYXRoIHRvIHRoZSBKU09OIGZpbGUuXHJcbiAqIEBwYXJhbSB7T3B0aW9uc30gW29wdGlvbnNdXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5jcm9zc09yaWdpbj1udWxsXSBTZXQgdGhlIGFwcHJvcHJpYXRlIGNyb3NzLW9yaWdpbiBwcm9wZXJ0eSBpZiB0aGUgaW1hZ2UgaXMgZnJvbSBhbm90aGVyIGRvbWFpbi5cclxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5kb3dubG9hZD1mYWxzZV0gSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwcml0ZXMgc2hvdWxkIGFsc28gZG93bmxvYWQgYXV0b21hdGljYWxseS5cclxuICogXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+Pn0gUmV0dXJucyB0aGUgaW5kaXZpZHVhbCBzcHJpdGVzLlxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGF0bGFzVG9TcHJpdGVzKGF0bGFzUGF0aDogc3RyaW5nLCBqc29uUGF0aDogc3RyaW5nLCBvcHRpb25zOiBHZW5lcmFsT3B0aW9ucyA9IHt9KTogUHJvbWlzZTxBcnJheTxIVE1MSW1hZ2VFbGVtZW50Pj4ge1xyXG5cclxuICBjb25zdCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgY29uc3QgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XHJcblxyXG4gIGNvbnN0IGF0bGFzOiBIVE1MSW1hZ2VFbGVtZW50ID0gYXdhaXQgbG9hZC5pbWFnZShhdGxhc1BhdGgsIG9wdGlvbnMuY3Jvc3NPcmlnaW4pO1xyXG5cclxuICBjb25zdCBzcHJpdGVEYXRhID0gYXdhaXQgbG9hZC5YSFIoanNvblBhdGgpO1xyXG5cclxuICBsZXQgZnJhbWVzOiBhbnkgPSBbXTtcclxuXHJcbiAgT2JqZWN0LmVudHJpZXMoc3ByaXRlRGF0YS5mcmFtZXMpLmZvckVhY2goKFtuYW1lLCBkZXRhaWxzXSkgPT4ge1xyXG5cclxuICAgIGNvbnN0IF9kZXRhaWxzOiBhbnkgPSBkZXRhaWxzO1xyXG5cclxuICAgIGNvbnN0IHNwcml0ZTogYW55ID0geyBuYW1lOiBudWxsLCBmcmFtZTogbmV3IEltYWdlKCkgfTtcclxuXHJcbiAgICBsZXQgZnJhbWVXaWR0aDogbnVtYmVyID0gX2RldGFpbHMuZnJhbWUudztcclxuICAgIGxldCBmcmFtZUhlaWdodDogbnVtYmVyID0gX2RldGFpbHMuZnJhbWUuaDtcclxuXHJcbiAgICBpZiAoX2RldGFpbHMucm90YXRlZCkge1xyXG5cclxuICAgICAgZnJhbWVXaWR0aCA9IF9kZXRhaWxzLmZyYW1lLmg7XHJcbiAgICAgIGZyYW1lSGVpZ2h0ID0gX2RldGFpbHMuZnJhbWUudztcclxuXHJcbiAgICB9ICAgXHJcblxyXG4gICAgY2FudmFzLndpZHRoID0gZnJhbWVXaWR0aDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSBmcmFtZUhlaWdodDtcclxuXHJcbiAgICBjdHguZHJhd0ltYWdlKGF0bGFzLCBfZGV0YWlscy5mcmFtZS54LCBfZGV0YWlscy5mcmFtZS55LCBmcmFtZVdpZHRoLCBmcmFtZUhlaWdodCwgMCwgMCwgZnJhbWVXaWR0aCwgZnJhbWVIZWlnaHQpO1xyXG5cclxuICAgIHNwcml0ZS5uYW1lID0gbmFtZTtcclxuICAgIHNwcml0ZS5mcmFtZS5zcmMgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKS5yZXBsYWNlKCdpbWFnZS9wbmcnLCAnaW1hZ2Uvb2N0ZXQtc3RyZWFtJyk7XHJcblxyXG4gICAgZnJhbWVzLnB1c2goc3ByaXRlKTtcclxuXHJcbiAgfSk7XHJcblxyXG4gIGlmIChvcHRpb25zLmRvd25sb2FkKSB7XHJcblxyXG4gICAgZm9yIChjb25zdCBmcmFtZSBvZiBmcmFtZXMpIHtcclxuXHJcbiAgICAgIGNvbnN0IGxpbms6IEhUTUxBbmNob3JFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cclxuICAgICAgbGluay5ocmVmID0gZnJhbWUuZnJhbWUuc3JjO1xyXG4gICAgICBsaW5rLmRvd25sb2FkID0gZnJhbWUubmFtZVxyXG5cclxuICAgICAgbGluay5jbGljaygpO1xyXG4gICAgICBsaW5rLnJlbW92ZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4gZnJhbWVzO1xyXG5cclxufSJdfQ==