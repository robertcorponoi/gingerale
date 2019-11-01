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

var _GeneralOptions = _interopRequireDefault(require("./options/GeneralOptions"));

var _SpritesheetToSpritesOptions = _interopRequireDefault(require("./options/SpritesheetToSpritesOptions"));

/**
 * GingerAle is a simple spritesheet to sprite converter for the browser. 
 * 
 * All it needs is a path to a spritesheet and the width and height of the individual sprites and it will return an array of image 
 * elements which you can use to display or work with further.
 * 
 * @author Robert Corponoi <robertcorponoi>
 * 
 * @version 2.3.0
 */

/**
 * Takes a spritesheet with uniform sized sprites, meaning that each individual sprite within the spritesheet has the same width and 
 * height, and it returns the sprites as individual HTMLImageElement.
 * 
 * @since 0.1.0
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
function spritesheetToSprites(_x, _x2, _x3, _x4) {
  return _spritesheetToSprites.apply(this, arguments);
}
/**
 * Takes a texture atlas spritesheet and the accompanying JSON file and it returns the sprites as individual HTMLImageElement.
 * 
 * @since 0.1.0
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
  _regenerator["default"].mark(function _callee(src, frameWidth, frameHeight, options) {
    var opts, canvas, ctx, spritesheet, rows, cols, frame, frames, locX, locY, counter, i, j, _i, len, link;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            opts = new _SpritesheetToSpritesOptions["default"](options);
            canvas = document.createElement('canvas');
            ctx = canvas.getContext('2d');
            _context.next = 5;
            return load.image(src, opts.crossOrigin);

          case 5:
            spritesheet = _context.sent;
            canvas.height = frameHeight;
            canvas.width = frameWidth;
            rows = Math.floor(spritesheet.height / frameHeight);
            cols = Math.floor(spritesheet.width / frameWidth);
            frames = [];
            locX = 0;
            locY = 0;
            counter = 0;

            for (i = 0; i < rows; ++i) {
              for (j = 0; j < cols; ++j) {
                ctx.drawImage(spritesheet, locX, locY, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);
                frame = new Image();
                frame.src = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
                frame.dataset.name = opts.name + counter;
                frames.push(frame);
                counter++;
                locX += frameWidth;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
              }

              locY += frameHeight;
              locX = 0;
            }

            if (opts.download) {
              for (_i = 0, len = frames.length; _i < len; ++_i) {
                link = document.createElement('a');
                link.href = frames[_i].src;
                link.download = "".concat(opts.name).concat(_i, ".png");
                link.click();
                link.remove();
              }
            }

            return _context.abrupt("return", frames);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _spritesheetToSprites.apply(this, arguments);
}

function atlasToSprites(_x5, _x6, _x7) {
  return _atlasToSprites.apply(this, arguments);
}

function _atlasToSprites() {
  _atlasToSprites = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(atlasPath, jsonPath, options) {
    var opts, canvas, ctx, atlas, spriteData, frames, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, frame, link;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            opts = new _GeneralOptions["default"](options);
            canvas = document.createElement('canvas');
            ctx = canvas.getContext('2d');
            _context2.next = 5;
            return load.image(atlasPath, opts.crossOrigin);

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

            if (!opts.download) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJzcHJpdGVzaGVldFRvU3ByaXRlcyIsInNyYyIsImZyYW1lV2lkdGgiLCJmcmFtZUhlaWdodCIsIm9wdGlvbnMiLCJvcHRzIiwiU3ByaXRlc2hlZXRUb1Nwcml0ZXNPcHRpb25zIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY3R4IiwiZ2V0Q29udGV4dCIsImxvYWQiLCJpbWFnZSIsImNyb3NzT3JpZ2luIiwic3ByaXRlc2hlZXQiLCJoZWlnaHQiLCJ3aWR0aCIsInJvd3MiLCJNYXRoIiwiZmxvb3IiLCJjb2xzIiwiZnJhbWVzIiwibG9jWCIsImxvY1kiLCJjb3VudGVyIiwiaSIsImoiLCJkcmF3SW1hZ2UiLCJmcmFtZSIsIkltYWdlIiwidG9EYXRhVVJMIiwicmVwbGFjZSIsImRhdGFzZXQiLCJuYW1lIiwicHVzaCIsImNsZWFyUmVjdCIsImRvd25sb2FkIiwibGVuIiwibGVuZ3RoIiwibGluayIsImhyZWYiLCJjbGljayIsInJlbW92ZSIsImF0bGFzVG9TcHJpdGVzIiwiYXRsYXNQYXRoIiwianNvblBhdGgiLCJHZW5lcmFsT3B0aW9ucyIsImF0bGFzIiwiWEhSIiwic3ByaXRlRGF0YSIsIk9iamVjdCIsImVudHJpZXMiLCJmb3JFYWNoIiwiZGV0YWlscyIsIl9kZXRhaWxzIiwic3ByaXRlIiwidyIsImgiLCJyb3RhdGVkIiwieCIsInkiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7QUFHQTs7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7Ozs7Ozs7OztTQWdCc0JBLG9COzs7QUFxRXRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7K0JBckVPLGlCQUFvQ0MsR0FBcEMsRUFBaURDLFVBQWpELEVBQXFFQyxXQUFyRSxFQUEwRkMsT0FBMUY7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVDQyxZQUFBQSxJQUZELEdBRXFDLElBQUlDLHVDQUFKLENB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LFFBQUwsR0FBZ0JSLEtBQUssQ0FBQ0ssSUFBdEI7QUFFQU0sY0FBQUEsSUFBSSxDQUFDRSxLQUFMO0FBQ0FGLGNBQUFBLElBQUksQ0FBQ0csTUFBTDtBQUVEOztBQXJERTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBLDhDQXlERXJCLE1BekRGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCAqIGFzIGxvYWQgZnJvbSAnLi91dGlscy9sb2FkJztcclxuXHJcbmltcG9ydCBHZW5lcmFsT3B0aW9ucyBmcm9tICcuL29wdGlvbnMvR2VuZXJhbE9wdGlvbnMnO1xyXG5pbXBvcnQgU3ByaXRlc2hlZXRUb1Nwcml0ZXNPcHRpb25zIGZyb20gJy4vb3B0aW9ucy9TcHJpdGVzaGVldFRvU3ByaXRlc09wdGlvbnMnO1xyXG5pbXBvcnQgU3ByaXRlc1RvU3ByaXRlc2hlZXRPcHRpb25zIGZyb20gJy4vb3B0aW9ucy9TcHJpdGVzVG9TcHJpdGVzaGVldE9wdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIEdpbmdlckFsZSBpcyBhIHNpbXBsZSBzcHJpdGVzaGVldCB0byBzcHJpdGUgY29udmVydGVyIGZvciB0aGUgYnJvd3Nlci4gXHJcbiAqIFxyXG4gKiBBbGwgaXQgbmVlZHMgaXMgYSBwYXRoIHRvIGEgc3ByaXRlc2hlZXQgYW5kIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBpbmRpdmlkdWFsIHNwcml0ZXMgYW5kIGl0IHdpbGwgcmV0dXJuIGFuIGFycmF5IG9mIGltYWdlIFxyXG4gKiBlbGVtZW50cyB3aGljaCB5b3UgY2FuIHVzZSB0byBkaXNwbGF5IG9yIHdvcmsgd2l0aCBmdXJ0aGVyLlxyXG4gKiBcclxuICogQGF1dGhvciBSb2JlcnQgQ29ycG9ub2kgPHJvYmVydGNvcnBvbm9pPlxyXG4gKiBcclxuICogQHZlcnNpb24gMi4zLjBcclxuICovXHJcblxyXG4vKipcclxuICogVGFrZXMgYSBzcHJpdGVzaGVldCB3aXRoIHVuaWZvcm0gc2l6ZWQgc3ByaXRlcywgbWVhbmluZyB0aGF0IGVhY2ggaW5kaXZpZHVhbCBzcHJpdGUgd2l0aGluIHRoZSBzcHJpdGVzaGVldCBoYXMgdGhlIHNhbWUgd2lkdGggYW5kIFxyXG4gKiBoZWlnaHQsIGFuZCBpdCByZXR1cm5zIHRoZSBzcHJpdGVzIGFzIGluZGl2aWR1YWwgSFRNTEltYWdlRWxlbWVudC5cclxuICogXHJcbiAqIEBzaW5jZSAwLjEuMFxyXG4gKiBcclxuICogQHBhcmFtIHtzdHJpbmd9IHNyYyBUaGUgcGF0aCB0byB0aGUgc3ByaXRlc2hlZXQuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBmcmFtZVdpZHRoIFRoZSB3aWR0aCBvZiBldmVyeSBzcHJpdGUgaW4gdGhlIHNwcml0ZXNoZWV0LlxyXG4gKiBAcGFyYW0ge251bWJlcn0gZnJhbWVIZWlnaHQgVGhlIGhlaWdodCBvZiBldmVyeSBzcHJpdGUgaW4gdGhlIHNwcml0ZXNoZWV0LlxyXG4gKiBAcGFyYW0ge09wdGlvbnN9IFtvcHRpb25zXVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMubmFtZT0nc3ByaXRlJ10gU2V0cyB0aGUgZGF0YS1uYW1lIGF0dHJpYnV0ZSB0byB0aGlzIGFuZCBpcyB1c2VkIGlmIGRvd25sb2FkaW5nIHRoZSBpbWFnZXMuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5jcm9zc09yaWdpbj1udWxsXSBTZXQgdGhlIGFwcHJvcHJpYXRlIGNyb3NzLW9yaWdpbiBwcm9wZXJ0eSBpZiB0aGUgaW1hZ2UgaXMgZnJvbSBhbm90aGVyIGRvbWFpbi5cclxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5kb3dubG9hZD1mYWxzZV0gSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwcml0ZXMgc2hvdWxkIGFsc28gZG93bmxvYWQgYXV0b21hdGljYWxseS5cclxuICogXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+Pn0gUmV0dXJucyB0aGUgaW5kaXZpZHVhbCBzcHJpdGVzLlxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNwcml0ZXNoZWV0VG9TcHJpdGVzKHNyYzogc3RyaW5nLCBmcmFtZVdpZHRoOiBudW1iZXIsIGZyYW1lSGVpZ2h0OiBudW1iZXIsIG9wdGlvbnM6IGFueSk6IFByb21pc2U8QXJyYXk8SFRNTEltYWdlRWxlbWVudD4+IHtcclxuXHJcbiAgY29uc3Qgb3B0czogU3ByaXRlc2hlZXRUb1Nwcml0ZXNPcHRpb25zID0gbmV3IFNwcml0ZXNoZWV0VG9TcHJpdGVzT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgY29uc3QgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gIGNvbnN0IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gY2FudmFzLmdldENvbnRleHQoJzJkJykhO1xyXG5cclxuICBjb25zdCBzcHJpdGVzaGVldDogSFRNTEltYWdlRWxlbWVudCA9IGF3YWl0IGxvYWQuaW1hZ2Uoc3JjLCBvcHRzLmNyb3NzT3JpZ2luKTtcclxuXHJcbiAgY2FudmFzLmhlaWdodCA9IGZyYW1lSGVpZ2h0O1xyXG4gIGNhbnZhcy53aWR0aCA9IGZyYW1lV2lkdGg7XHJcblxyXG4gIGxldCByb3dzOiBudW1iZXIgPSBNYXRoLmZsb29yKHNwcml0ZXNoZWV0LmhlaWdodCAvIGZyYW1lSGVpZ2h0KTtcclxuICBsZXQgY29sczogbnVtYmVyID0gTWF0aC5mbG9vcihzcHJpdGVzaGVldC53aWR0aCAvIGZyYW1lV2lkdGgpO1xyXG5cclxuICBsZXQgZnJhbWU6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgbGV0IGZyYW1lczogQXJyYXk8SFRNTEltYWdlRWxlbWVudD4gPSBbXTtcclxuXHJcbiAgbGV0IGxvY1g6IG51bWJlciA9IDA7XHJcbiAgbGV0IGxvY1k6IG51bWJlciA9IDA7XHJcblxyXG4gIGxldCBjb3VudGVyOiBudW1iZXIgPSAwO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3M7ICsraSkge1xyXG5cclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sczsgKytqKSB7XHJcblxyXG4gICAgICBjdHguZHJhd0ltYWdlKHNwcml0ZXNoZWV0LCBsb2NYLCBsb2NZLCBmcmFtZVdpZHRoLCBmcmFtZUhlaWdodCwgMCwgMCwgZnJhbWVXaWR0aCwgZnJhbWVIZWlnaHQpO1xyXG5cclxuICAgICAgZnJhbWUgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgZnJhbWUuc3JjID0gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJykucmVwbGFjZSgnaW1hZ2UvcG5nJywgJ2ltYWdlL29jdGV0LXN0cmVhbScpO1xyXG5cclxuICAgICAgZnJhbWUuZGF0YXNldC5uYW1lID0gb3B0cy5uYW1lISArIGNvdW50ZXI7XHJcblxyXG4gICAgICBmcmFtZXMucHVzaChmcmFtZSk7XHJcblxyXG4gICAgICBjb3VudGVyKys7XHJcblxyXG4gICAgICBsb2NYICs9IGZyYW1lV2lkdGg7XHJcblxyXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGxvY1kgKz0gZnJhbWVIZWlnaHQ7XHJcbiAgICBsb2NYID0gMDtcclxuXHJcbiAgfVxyXG5cclxuICBpZiAob3B0cy5kb3dubG9hZCkge1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBmcmFtZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuXHJcbiAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblxyXG4gICAgICBsaW5rLmhyZWYgPSBmcmFtZXNbaV0uc3JjO1xyXG4gICAgICBsaW5rLmRvd25sb2FkID0gYCR7b3B0cy5uYW1lfSR7aX0ucG5nYDtcclxuXHJcbiAgICAgIGxpbmsuY2xpY2soKTtcclxuICAgICAgbGluay5yZW1vdmUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZyYW1lcztcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUYWtlcyBhIHRleHR1cmUgYXRsYXMgc3ByaXRlc2hlZXQgYW5kIHRoZSBhY2NvbXBhbnlpbmcgSlNPTiBmaWxlIGFuZCBpdCByZXR1cm5zIHRoZSBzcHJpdGVzIGFzIGluZGl2aWR1YWwgSFRNTEltYWdlRWxlbWVudC5cclxuICogXHJcbiAqIEBzaW5jZSAwLjEuMFxyXG4gKiBcclxuICogQHBhcmFtIHtzdHJpbmd9IGF0bGFzIFRoZSBwYXRoIHRvIHRoZSBhdGxhcy5cclxuICogQHBhcmFtIHtzdHJpbmd9IGpzb24gVGhlIHBhdGggdG8gdGhlIEpTT04gZmlsZS5cclxuICogQHBhcmFtIHtPcHRpb25zfSBbb3B0aW9uc11cclxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmNyb3NzT3JpZ2luPW51bGxdIFNldCB0aGUgYXBwcm9wcmlhdGUgY3Jvc3Mtb3JpZ2luIHByb3BlcnR5IGlmIHRoZSBpbWFnZSBpcyBmcm9tIGFub3RoZXIgZG9tYWluLlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmRvd25sb2FkPWZhbHNlXSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc3ByaXRlcyBzaG91bGQgYWxzbyBkb3dubG9hZCBhdXRvbWF0aWNhbGx5LlxyXG4gKiBcclxuICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8SFRNTEltYWdlRWxlbWVudD4+fSBSZXR1cm5zIHRoZSBpbmRpdmlkdWFsIHNwcml0ZXMuXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXRsYXNUb1Nwcml0ZXMoYXRsYXNQYXRoOiBzdHJpbmcsIGpzb25QYXRoOiBzdHJpbmcsIG9wdGlvbnM6IGFueSk6IFByb21pc2U8QXJyYXk8SFRNTEltYWdlRWxlbWVudD4+IHtcclxuXHJcbiAgY29uc3Qgb3B0czogR2VuZXJhbE9wdGlvbnMgPSBuZXcgR2VuZXJhbE9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gIGNvbnN0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICBjb25zdCBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpITtcclxuXHJcbiAgY29uc3QgYXRsYXM6IEhUTUxJbWFnZUVsZW1lbnQgPSBhd2FpdCBsb2FkLmltYWdlKGF0bGFzUGF0aCwgb3B0cy5jcm9zc09yaWdpbik7XHJcblxyXG4gIGNvbnN0IHNwcml0ZURhdGEgPSBhd2FpdCBsb2FkLlhIUihqc29uUGF0aCk7XHJcblxyXG4gIGxldCBmcmFtZXM6IGFueSA9IFtdO1xyXG5cclxuICBPYmplY3QuZW50cmllcyhzcHJpdGVEYXRhLmZyYW1lcykuZm9yRWFjaCgoW25hbWUsIGRldGFpbHNdKSA9PiB7XHJcblxyXG4gICAgY29uc3QgX2RldGFpbHM6IGFueSA9IGRldGFpbHM7XHJcblxyXG4gICAgY29uc3Qgc3ByaXRlOiBhbnkgPSB7IG5hbWU6IG51bGwsIGZyYW1lOiBuZXcgSW1hZ2UoKSB9O1xyXG5cclxuICAgIGxldCBmcmFtZVdpZHRoOiBudW1iZXIgPSBfZGV0YWlscy5mcmFtZS53O1xyXG4gICAgbGV0IGZyYW1lSGVpZ2h0OiBudW1iZXIgPSBfZGV0YWlscy5mcmFtZS5oO1xyXG5cclxuICAgIGlmIChfZGV0YWlscy5yb3RhdGVkKSB7XHJcblxyXG4gICAgICBmcmFtZVdpZHRoID0gX2RldGFpbHMuZnJhbWUuaDtcclxuICAgICAgZnJhbWVIZWlnaHQgPSBfZGV0YWlscy5mcmFtZS53O1xyXG5cclxuICAgIH0gICBcclxuXHJcbiAgICBjYW52YXMud2lkdGggPSBmcmFtZVdpZHRoO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IGZyYW1lSGVpZ2h0O1xyXG5cclxuICAgIGN0eC5kcmF3SW1hZ2UoYXRsYXMsIF9kZXRhaWxzLmZyYW1lLngsIF9kZXRhaWxzLmZyYW1lLnksIGZyYW1lV2lkdGgsIGZyYW1lSGVpZ2h0LCAwLCAwLCBmcmFtZVdpZHRoLCBmcmFtZUhlaWdodCk7XHJcblxyXG4gICAgc3ByaXRlLm5hbWUgPSBuYW1lO1xyXG4gICAgc3ByaXRlLmZyYW1lLnNyYyA9IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpLnJlcGxhY2UoJ2ltYWdlL3BuZycsICdpbWFnZS9vY3RldC1zdHJlYW0nKTtcclxuXHJcbiAgICBmcmFtZXMucHVzaChzcHJpdGUpO1xyXG5cclxuICB9KTtcclxuXHJcbiAgaWYgKG9wdHMuZG93bmxvYWQpIHtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGZyYW1lIG9mIGZyYW1lcykge1xyXG5cclxuICAgICAgY29uc3QgbGluazogSFRNTEFuY2hvckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblxyXG4gICAgICBsaW5rLmhyZWYgPSBmcmFtZS5mcmFtZS5zcmM7XHJcbiAgICAgIGxpbmsuZG93bmxvYWQgPSBmcmFtZS5uYW1lXHJcblxyXG4gICAgICBsaW5rLmNsaWNrKCk7XHJcbiAgICAgIGxpbmsucmVtb3ZlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHJldHVybiBmcmFtZXM7XHJcblxyXG59Il19