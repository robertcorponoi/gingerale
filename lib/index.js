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
    var opts, canvas, ctx, atlas, spriteData, frames, _i2, _frames, frame, link;

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

            if (opts.download) {
              for (_i2 = 0, _frames = frames; _i2 < _frames.length; _i2++) {
                frame = _frames[_i2];
                link = document.createElement('a');
                link.href = frame.frame.src;
                link.download = frame.name;
                link.click();
                link.remove();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJzcHJpdGVzaGVldFRvU3ByaXRlcyIsInNyYyIsImZyYW1lV2lkdGgiLCJmcmFtZUhlaWdodCIsIm9wdGlvbnMiLCJvcHRzIiwiU3ByaXRlc2hlZXRUb1Nwcml0ZXNPcHRpb25zIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY3R4IiwiZ2V0Q29udGV4dCIsImxvYWQiLCJpbWFnZSIsImNyb3NzT3JpZ2luIiwic3ByaXRlc2hlZXQiLCJoZWlnaHQiLCJ3aWR0aCIsInJvd3MiLCJNYXRoIiwiZmxvb3IiLCJjb2xzIiwiZnJhbWVzIiwibG9jWCIsImxvY1kiLCJjb3VudGVyIiwiaSIsImoiLCJkcmF3SW1hZ2UiLCJmcmFtZSIsIkltYWdlIiwidG9EYXRhVVJMIiwicmVwbGFjZSIsImRhdGFzZXQiLCJuYW1lIiwicHVzaCIsImNsZWFyUmVjdCIsImRvd25sb2FkIiwibGVuIiwibGVuZ3RoIiwibGluayIsImhyZWYiLCJjbGljayIsInJlbW92ZSIsImF0bGFzVG9TcHJpdGVzIiwiYXRsYXNQYXRoIiwianNvblBhdGgiLCJHZW5lcmFsT3B0aW9ucyIsImF0bGFzIiwiWEhSIiwic3ByaXRlRGF0YSIsIk9iamVjdCIsImVudHJpZXMiLCJmb3JFYWNoIiwiZGV0YWlscyIsIl9kZXRhaWxzIiwic3ByaXRlIiwidyIsImgiLCJyb3RhdGVkIiwieCIsInkiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7QUFHQTs7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7Ozs7Ozs7OztTQWdCc0JBLG9COzs7QUFxRXRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7K0JBckVPLGlCQUFvQ0MsR0FBcEMsRUFBaURDLFVBQWpELEVBQXFFQyxXQUFyRSxFQUEwRkMsT0FBMUY7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVDQyxZQUFBQSxJQUZELEdBRXFDLElBQUlDLHVDQUFKLENB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QjtBQUVBTSxnQkFBQUEsSUFBSSxDQUFDRSxLQUFMO0FBQ0FGLGdCQUFBQSxJQUFJLENBQUNHLE1BQUw7QUFFRDtBQUVGOztBQXZESSw4Q0F5REVyQixNQXpERjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgKiBhcyBsb2FkIGZyb20gJy4vdXRpbHMvbG9hZCc7XHJcblxyXG5pbXBvcnQgR2VuZXJhbE9wdGlvbnMgZnJvbSAnLi9vcHRpb25zL0dlbmVyYWxPcHRpb25zJztcclxuaW1wb3J0IFNwcml0ZXNoZWV0VG9TcHJpdGVzT3B0aW9ucyBmcm9tICcuL29wdGlvbnMvU3ByaXRlc2hlZXRUb1Nwcml0ZXNPcHRpb25zJztcclxuaW1wb3J0IFNwcml0ZXNUb1Nwcml0ZXNoZWV0T3B0aW9ucyBmcm9tICcuL29wdGlvbnMvU3ByaXRlc1RvU3ByaXRlc2hlZXRPcHRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBHaW5nZXJBbGUgaXMgYSBzaW1wbGUgc3ByaXRlc2hlZXQgdG8gc3ByaXRlIGNvbnZlcnRlciBmb3IgdGhlIGJyb3dzZXIuIFxyXG4gKiBcclxuICogQWxsIGl0IG5lZWRzIGlzIGEgcGF0aCB0byBhIHNwcml0ZXNoZWV0IGFuZCB0aGUgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgaW5kaXZpZHVhbCBzcHJpdGVzIGFuZCBpdCB3aWxsIHJldHVybiBhbiBhcnJheSBvZiBpbWFnZSBcclxuICogZWxlbWVudHMgd2hpY2ggeW91IGNhbiB1c2UgdG8gZGlzcGxheSBvciB3b3JrIHdpdGggZnVydGhlci5cclxuICogXHJcbiAqIEBhdXRob3IgUm9iZXJ0IENvcnBvbm9pIDxyb2JlcnRjb3Jwb25vaT5cclxuICogXHJcbiAqIEB2ZXJzaW9uIDIuMy4wXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRha2VzIGEgc3ByaXRlc2hlZXQgd2l0aCB1bmlmb3JtIHNpemVkIHNwcml0ZXMsIG1lYW5pbmcgdGhhdCBlYWNoIGluZGl2aWR1YWwgc3ByaXRlIHdpdGhpbiB0aGUgc3ByaXRlc2hlZXQgaGFzIHRoZSBzYW1lIHdpZHRoIGFuZCBcclxuICogaGVpZ2h0LCBhbmQgaXQgcmV0dXJucyB0aGUgc3ByaXRlcyBhcyBpbmRpdmlkdWFsIEhUTUxJbWFnZUVsZW1lbnQuXHJcbiAqIFxyXG4gKiBAc2luY2UgMC4xLjBcclxuICogXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzcmMgVGhlIHBhdGggdG8gdGhlIHNwcml0ZXNoZWV0LlxyXG4gKiBAcGFyYW0ge251bWJlcn0gZnJhbWVXaWR0aCBUaGUgd2lkdGggb2YgZXZlcnkgc3ByaXRlIGluIHRoZSBzcHJpdGVzaGVldC5cclxuICogQHBhcmFtIHtudW1iZXJ9IGZyYW1lSGVpZ2h0IFRoZSBoZWlnaHQgb2YgZXZlcnkgc3ByaXRlIGluIHRoZSBzcHJpdGVzaGVldC5cclxuICogQHBhcmFtIHtPcHRpb25zfSBbb3B0aW9uc11cclxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLm5hbWU9J3Nwcml0ZSddIFNldHMgdGhlIGRhdGEtbmFtZSBhdHRyaWJ1dGUgdG8gdGhpcyBhbmQgaXMgdXNlZCBpZiBkb3dubG9hZGluZyB0aGUgaW1hZ2VzLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuY3Jvc3NPcmlnaW49bnVsbF0gU2V0IHRoZSBhcHByb3ByaWF0ZSBjcm9zcy1vcmlnaW4gcHJvcGVydHkgaWYgdGhlIGltYWdlIGlzIGZyb20gYW5vdGhlciBkb21haW4uXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuZG93bmxvYWQ9ZmFsc2VdIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcHJpdGVzIHNob3VsZCBhbHNvIGRvd25sb2FkIGF1dG9tYXRpY2FsbHkuXHJcbiAqIFxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxIVE1MSW1hZ2VFbGVtZW50Pj59IFJldHVybnMgdGhlIGluZGl2aWR1YWwgc3ByaXRlcy5cclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzcHJpdGVzaGVldFRvU3ByaXRlcyhzcmM6IHN0cmluZywgZnJhbWVXaWR0aDogbnVtYmVyLCBmcmFtZUhlaWdodDogbnVtYmVyLCBvcHRpb25zOiBhbnkpOiBQcm9taXNlPEFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+PiB7XHJcblxyXG4gIGNvbnN0IG9wdHM6IFNwcml0ZXNoZWV0VG9TcHJpdGVzT3B0aW9ucyA9IG5ldyBTcHJpdGVzaGVldFRvU3ByaXRlc09wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gIGNvbnN0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICBjb25zdCBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpITtcclxuXHJcbiAgY29uc3Qgc3ByaXRlc2hlZXQ6IEhUTUxJbWFnZUVsZW1lbnQgPSBhd2FpdCBsb2FkLmltYWdlKHNyYywgb3B0cy5jcm9zc09yaWdpbik7XHJcblxyXG4gIGNhbnZhcy5oZWlnaHQgPSBmcmFtZUhlaWdodDtcclxuICBjYW52YXMud2lkdGggPSBmcmFtZVdpZHRoO1xyXG5cclxuICBsZXQgcm93czogbnVtYmVyID0gTWF0aC5mbG9vcihzcHJpdGVzaGVldC5oZWlnaHQgLyBmcmFtZUhlaWdodCk7XHJcbiAgbGV0IGNvbHM6IG51bWJlciA9IE1hdGguZmxvb3Ioc3ByaXRlc2hlZXQud2lkdGggLyBmcmFtZVdpZHRoKTtcclxuXHJcbiAgbGV0IGZyYW1lOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gIGxldCBmcmFtZXM6IEFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+ID0gW107XHJcblxyXG4gIGxldCBsb2NYOiBudW1iZXIgPSAwO1xyXG4gIGxldCBsb2NZOiBudW1iZXIgPSAwO1xyXG5cclxuICBsZXQgY291bnRlcjogbnVtYmVyID0gMDtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzOyArK2kpIHtcclxuXHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbHM7ICsraikge1xyXG5cclxuICAgICAgY3R4LmRyYXdJbWFnZShzcHJpdGVzaGVldCwgbG9jWCwgbG9jWSwgZnJhbWVXaWR0aCwgZnJhbWVIZWlnaHQsIDAsIDAsIGZyYW1lV2lkdGgsIGZyYW1lSGVpZ2h0KTtcclxuXHJcbiAgICAgIGZyYW1lID0gbmV3IEltYWdlKCk7XHJcbiAgICAgIGZyYW1lLnNyYyA9IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpLnJlcGxhY2UoJ2ltYWdlL3BuZycsICdpbWFnZS9vY3RldC1zdHJlYW0nKTtcclxuXHJcbiAgICAgIGZyYW1lLmRhdGFzZXQubmFtZSA9IG9wdHMubmFtZSEgKyBjb3VudGVyO1xyXG5cclxuICAgICAgZnJhbWVzLnB1c2goZnJhbWUpO1xyXG5cclxuICAgICAgY291bnRlcisrO1xyXG5cclxuICAgICAgbG9jWCArPSBmcmFtZVdpZHRoO1xyXG5cclxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBsb2NZICs9IGZyYW1lSGVpZ2h0O1xyXG4gICAgbG9jWCA9IDA7XHJcblxyXG4gIH1cclxuXHJcbiAgaWYgKG9wdHMuZG93bmxvYWQpIHtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gZnJhbWVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcblxyXG4gICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cclxuICAgICAgbGluay5ocmVmID0gZnJhbWVzW2ldLnNyYztcclxuICAgICAgbGluay5kb3dubG9hZCA9IGAke29wdHMubmFtZX0ke2l9LnBuZ2A7XHJcblxyXG4gICAgICBsaW5rLmNsaWNrKCk7XHJcbiAgICAgIGxpbmsucmVtb3ZlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHJldHVybiBmcmFtZXM7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogVGFrZXMgYSB0ZXh0dXJlIGF0bGFzIHNwcml0ZXNoZWV0IGFuZCB0aGUgYWNjb21wYW55aW5nIEpTT04gZmlsZSBhbmQgaXQgcmV0dXJucyB0aGUgc3ByaXRlcyBhcyBpbmRpdmlkdWFsIEhUTUxJbWFnZUVsZW1lbnQuXHJcbiAqIFxyXG4gKiBAc2luY2UgMC4xLjBcclxuICogXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhdGxhcyBUaGUgcGF0aCB0byB0aGUgYXRsYXMuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBqc29uIFRoZSBwYXRoIHRvIHRoZSBKU09OIGZpbGUuXHJcbiAqIEBwYXJhbSB7T3B0aW9uc30gW29wdGlvbnNdXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5jcm9zc09yaWdpbj1udWxsXSBTZXQgdGhlIGFwcHJvcHJpYXRlIGNyb3NzLW9yaWdpbiBwcm9wZXJ0eSBpZiB0aGUgaW1hZ2UgaXMgZnJvbSBhbm90aGVyIGRvbWFpbi5cclxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5kb3dubG9hZD1mYWxzZV0gSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwcml0ZXMgc2hvdWxkIGFsc28gZG93bmxvYWQgYXV0b21hdGljYWxseS5cclxuICogXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+Pn0gUmV0dXJucyB0aGUgaW5kaXZpZHVhbCBzcHJpdGVzLlxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGF0bGFzVG9TcHJpdGVzKGF0bGFzUGF0aDogc3RyaW5nLCBqc29uUGF0aDogc3RyaW5nLCBvcHRpb25zOiBhbnkpOiBQcm9taXNlPEFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+PiB7XHJcblxyXG4gIGNvbnN0IG9wdHM6IEdlbmVyYWxPcHRpb25zID0gbmV3IEdlbmVyYWxPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICBjb25zdCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgY29uc3QgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XHJcblxyXG4gIGNvbnN0IGF0bGFzOiBIVE1MSW1hZ2VFbGVtZW50ID0gYXdhaXQgbG9hZC5pbWFnZShhdGxhc1BhdGgsIG9wdHMuY3Jvc3NPcmlnaW4pO1xyXG5cclxuICBjb25zdCBzcHJpdGVEYXRhID0gYXdhaXQgbG9hZC5YSFIoanNvblBhdGgpO1xyXG5cclxuICBsZXQgZnJhbWVzOiBhbnkgPSBbXTtcclxuXHJcbiAgT2JqZWN0LmVudHJpZXMoc3ByaXRlRGF0YS5mcmFtZXMpLmZvckVhY2goKFtuYW1lLCBkZXRhaWxzXSkgPT4ge1xyXG5cclxuICAgIGNvbnN0IF9kZXRhaWxzOiBhbnkgPSBkZXRhaWxzO1xyXG5cclxuICAgIGNvbnN0IHNwcml0ZTogYW55ID0geyBuYW1lOiBudWxsLCBmcmFtZTogbmV3IEltYWdlKCkgfTtcclxuXHJcbiAgICBsZXQgZnJhbWVXaWR0aDogbnVtYmVyID0gX2RldGFpbHMuZnJhbWUudztcclxuICAgIGxldCBmcmFtZUhlaWdodDogbnVtYmVyID0gX2RldGFpbHMuZnJhbWUuaDtcclxuXHJcbiAgICBpZiAoX2RldGFpbHMucm90YXRlZCkge1xyXG5cclxuICAgICAgZnJhbWVXaWR0aCA9IF9kZXRhaWxzLmZyYW1lLmg7XHJcbiAgICAgIGZyYW1lSGVpZ2h0ID0gX2RldGFpbHMuZnJhbWUudztcclxuXHJcbiAgICB9ICAgXHJcblxyXG4gICAgY2FudmFzLndpZHRoID0gZnJhbWVXaWR0aDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSBmcmFtZUhlaWdodDtcclxuXHJcbiAgICBjdHguZHJhd0ltYWdlKGF0bGFzLCBfZGV0YWlscy5mcmFtZS54LCBfZGV0YWlscy5mcmFtZS55LCBmcmFtZVdpZHRoLCBmcmFtZUhlaWdodCwgMCwgMCwgZnJhbWVXaWR0aCwgZnJhbWVIZWlnaHQpO1xyXG5cclxuICAgIHNwcml0ZS5uYW1lID0gbmFtZTtcclxuICAgIHNwcml0ZS5mcmFtZS5zcmMgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKS5yZXBsYWNlKCdpbWFnZS9wbmcnLCAnaW1hZ2Uvb2N0ZXQtc3RyZWFtJyk7XHJcblxyXG4gICAgZnJhbWVzLnB1c2goc3ByaXRlKTtcclxuXHJcbiAgfSk7XHJcblxyXG4gIGlmIChvcHRzLmRvd25sb2FkKSB7XHJcblxyXG4gICAgZm9yIChjb25zdCBmcmFtZSBvZiBmcmFtZXMpIHtcclxuXHJcbiAgICAgIGNvbnN0IGxpbms6IEhUTUxBbmNob3JFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cclxuICAgICAgbGluay5ocmVmID0gZnJhbWUuZnJhbWUuc3JjO1xyXG4gICAgICBsaW5rLmRvd25sb2FkID0gZnJhbWUubmFtZVxyXG5cclxuICAgICAgbGluay5jbGljaygpO1xyXG4gICAgICBsaW5rLnJlbW92ZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4gZnJhbWVzO1xyXG5cclxufSJdfQ==