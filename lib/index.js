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
function spritesheetToSprites(src, frameWidth, frameHeight) {
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

  return _regenerator["default"].async(function spritesheetToSprites$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          options = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
          name = options.name ? options.name : src.replace(/^.*[\\\/]/, '').substr(0, src.lastIndexOf('.'));
          canvas = document.createElement('canvas');
          ctx = canvas.getContext('2d');
          _context.next = 6;
          return _regenerator["default"].awrap(load.image(src, options.crossOrigin));

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
  });
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


function atlasToSprites(atlasPath, jsonPath) {
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

  return _regenerator["default"].async(function atlasToSprites$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
          canvas = document.createElement('canvas');
          ctx = canvas.getContext('2d');
          _context2.next = 5;
          return _regenerator["default"].awrap(load.image(atlasPath, options.crossOrigin));

        case 5:
          atlas = _context2.sent;
          _context2.next = 8;
          return _regenerator["default"].awrap(load.XHR(jsonPath));

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
  }, null, null, [[15, 19, 23, 31], [24,, 26, 30]]);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJzcHJpdGVzaGVldFRvU3ByaXRlcyIsInNyYyIsImZyYW1lV2lkdGgiLCJmcmFtZUhlaWdodCIsIm9wdGlvbnMiLCJuYW1lIiwicmVwbGFjZSIsInN1YnN0ciIsImxhc3RJbmRleE9mIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY3R4IiwiZ2V0Q29udGV4dCIsImxvYWQiLCJpbWFnZSIsImNyb3NzT3JpZ2luIiwic3ByaXRlc2hlZXQiLCJoZWlnaHQiLCJ3aWR0aCIsInJvd3MiLCJNYXRoIiwiZmxvb3IiLCJjb2xzIiwiZnJhbWVzIiwibG9jWCIsImxvY1kiLCJjb3VudGVyIiwiaSIsImoiLCJkcmF3SW1hZ2UiLCJmcmFtZSIsIkltYWdlIiwidG9EYXRhVVJMIiwiZGF0YXNldCIsInB1c2giLCJjbGVhclJlY3QiLCJkb3dubG9hZCIsImxlbiIsImxlbmd0aCIsImxpbmsiLCJocmVmIiwiY2xpY2siLCJyZW1vdmUiLCJhdGxhc1RvU3ByaXRlcyIsImF0bGFzUGF0aCIsImpzb25QYXRoIiwiYXRsYXMiLCJYSFIiLCJzcHJpdGVEYXRhIiwiT2JqZWN0IiwiZW50cmllcyIsImZvckVhY2giLCJkZXRhaWxzIiwiX2RldGFpbHMiLCJzcHJpdGUiLCJ3IiwiaCIsInJvdGF0ZWQiLCJ4IiwieSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7QUFLQTs7Ozs7Ozs7Ozs7Ozs7QUFjTyxTQUFlQSxvQkFBZixDQUFvQ0MsR0FBcEMsRUFBaURDLFVBQWpELEVBQXFFQyxXQUFyRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUEwRkMsVUFBQUEsT0FBMUYsMkRBQXlHLEVBQXpHO0FBRUNDLFVBQUFBLElBRkQsR0FFZ0JELE9BQU8sQ0FBQ0MsSUFBUixHQUFlRCxPQUFPLENBQUNDLElBQXZCLEdBQThCSixHQUFHLENBQUNLLE9BQUosQ0FBWSxXQUFaLEVBQXlCLEVBQXpCLEVBQTZCQyxNQUE3QixDQUFvQyxDQUFwQyxFQUF1Q04sR0FBRyxDQUFDTyxXQUFKLENBQWdCLEdBQWhCLENBQXZDLENBRjlDO0FBSUNDLFVBQUFBLE1BSkQsR0FJNkJDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixRQUF2QixDQUo3QjtBQUtDQyxVQUFBQSxHQUxELEdBS2lDSCxNQUFNLENBQUNJLFVBQVAsQ0FBa0IsSUFBbEIsQ0FMakM7QUFBQTtBQUFBLCtDQU91Q0MsSUFBSSxDQUFDQyxLQUFMLENBQVdkLEdBQVgsRUFBZ0JHLE9BQU8sQ0FBQ1ksV0FBeEIsQ0FQdkM7O0FBQUE7QUFPQ0MsVUFBQUEsV0FQRDtBQVNMUixVQUFBQSxNQUFNLENBQUNTLE1BQVAsR0FBZ0JmLFdBQWhCO0FBQ0FNLFVBQUFBLE1BQU0sQ0FBQ1UsS0FBUCxHQUFlakIsVUFBZjtBQUVJa0IsVUFBQUEsSUFaQyxHQVljQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0wsV0FBVyxDQUFDQyxNQUFaLEdBQXFCZixXQUFoQyxDQVpkO0FBYURvQixVQUFBQSxJQWJDLEdBYWNGLElBQUksQ0FBQ0MsS0FBTCxDQUFXTCxXQUFXLENBQUNFLEtBQVosR0FBb0JqQixVQUEvQixDQWJkO0FBZ0JEc0IsVUFBQUEsTUFoQkMsR0FnQmlDLEVBaEJqQztBQWtCREMsVUFBQUEsSUFsQkMsR0FrQmMsQ0FsQmQ7QUFtQkRDLFVBQUFBLElBbkJDLEdBbUJjLENBbkJkO0FBcUJEQyxVQUFBQSxPQXJCQyxHQXFCaUIsQ0FyQmpCOztBQXVCTCxlQUFTQyxDQUFULEdBQXFCLENBQXJCLEVBQXdCQSxDQUFDLEdBQUdSLElBQTVCLEVBQWtDLEVBQUVRLENBQXBDLEVBQXVDO0FBRXJDLGlCQUFTQyxDQUFULEdBQXFCLENBQXJCLEVBQXdCQSxDQUFDLEdBQUdOLElBQTVCLEVBQWtDLEVBQUVNLENBQXBDLEVBQXVDO0FBRXJDakIsY0FBQUEsR0FBRyxDQUFDa0IsU0FBSixDQUFjYixXQUFkLEVBQTJCUSxJQUEzQixFQUFpQ0MsSUFBakMsRUFBdUN4QixVQUF2QyxFQUFtREMsV0FBbkQsRUFBZ0UsQ0FBaEUsRUFBbUUsQ0FBbkUsRUFBc0VELFVBQXRFLEVBQWtGQyxXQUFsRjtBQUVBNEIsY0FBQUEsS0FBSyxHQUFHLElBQUlDLEtBQUosRUFBUjtBQUNBRCxjQUFBQSxLQUFLLENBQUM5QixHQUFOLEdBQVlRLE1BQU0sQ0FBQ3dCLFNBQVAsQ0FBaUIsV0FBakIsRUFBOEIzQixPQUE5QixDQUFzQyxXQUF0QyxFQUFtRCxvQkFBbkQsQ0FBWjtBQUVBeUIsY0FBQUEsS0FBSyxDQUFDRyxPQUFOLENBQWM3QixJQUFkLGFBQXdCQSxJQUF4QixjQUFnQ3NCLE9BQWhDO0FBRUFILGNBQUFBLE1BQU0sQ0FBQ1csSUFBUCxDQUFZSixLQUFaO0FBRUFKLGNBQUFBLE9BQU87QUFFUEYsY0FBQUEsSUFBSSxJQUFJdkIsVUFBUjtBQUVBVSxjQUFBQSxHQUFHLENBQUN3QixTQUFKLENBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQjNCLE1BQU0sQ0FBQ1UsS0FBM0IsRUFBa0NWLE1BQU0sQ0FBQ1MsTUFBekM7QUFFRDs7QUFFRFEsWUFBQUEsSUFBSSxJQUFJdkIsV0FBUjtBQUNBc0IsWUFBQUEsSUFBSSxHQUFHLENBQVA7QUFFRDs7QUFFRCxjQUFJckIsT0FBTyxDQUFDaUMsUUFBWixFQUFzQjtBQUVwQixpQkFBU1QsRUFBVCxHQUFxQixDQUFyQixFQUF3QlUsR0FBeEIsR0FBc0NkLE1BQU0sQ0FBQ2UsTUFBN0MsRUFBcURYLEVBQUMsR0FBR1UsR0FBekQsRUFBOEQsRUFBRVYsRUFBaEUsRUFBbUU7QUFFM0RZLGNBQUFBLElBRjJELEdBRXBEOUIsUUFBUSxDQUFDQyxhQUFULENBQXVCLEdBQXZCLENBRm9EO0FBSWpFNkIsY0FBQUEsSUFBSSxDQUFDQyxJQUFMLEdBQVlqQixNQUFNLENBQUNJLEVBQUQsQ0FBTixDQUFVM0IsR0FBdEI7QUFDQXVDLGNBQUFBLElBQUksQ0FBQ0gsUUFBTCxhQUFtQmhDLElBQW5CLFNBQTBCdUIsRUFBMUI7QUFFQVksY0FBQUEsSUFBSSxDQUFDRSxLQUFMO0FBQ0FGLGNBQUFBLElBQUksQ0FBQ0csTUFBTDtBQUVEO0FBRUY7O0FBL0RJLDJDQWlFRW5CLE1BakVGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBcUVQOzs7Ozs7Ozs7Ozs7O0FBV08sU0FBZW9CLGNBQWYsQ0FBOEJDLFNBQTlCLEVBQWlEQyxRQUFqRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBbUUxQyxVQUFBQSxPQUFuRSw4REFBa0YsRUFBbEY7QUFFQ0ssVUFBQUEsTUFGRCxHQUU2QkMsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBRjdCO0FBR0NDLFVBQUFBLEdBSEQsR0FHaUNILE1BQU0sQ0FBQ0ksVUFBUCxDQUFrQixJQUFsQixDQUhqQztBQUFBO0FBQUEsK0NBS2lDQyxJQUFJLENBQUNDLEtBQUwsQ0FBVzhCLFNBQVgsRUFBc0J6QyxPQUFPLENBQUNZLFdBQTlCLENBTGpDOztBQUFBO0FBS0MrQixVQUFBQSxLQUxEO0FBQUE7QUFBQSwrQ0FPZ0NqQyxJQUFJLENBQUNrQyxHQUFMLENBQVNGLFFBQVQsQ0FQaEM7O0FBQUE7QUFPQ0csVUFBQUEsVUFQRDtBQVNEekIsVUFBQUEsTUFUQyxHQVNhLEVBVGI7QUFXTDBCLFVBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlRixVQUFVLENBQUN6QixNQUExQixFQUFrQzRCLE9BQWxDLENBQTBDLGdCQUFxQjtBQUFBO0FBQUEsZ0JBQW5CL0MsSUFBbUI7QUFBQSxnQkFBYmdELE9BQWE7O0FBRTdELGdCQUFNQyxRQUFhLEdBQUdELE9BQXRCO0FBRUEsZ0JBQU1FLE1BQWMsR0FBRztBQUNyQmxELGNBQUFBLElBQUksRUFBRSxFQURlO0FBRXJCMEIsY0FBQUEsS0FBSyxFQUFFLElBQUlDLEtBQUo7QUFGYyxhQUF2QjtBQUtBLGdCQUFJOUIsVUFBa0IsR0FBR29ELFFBQVEsQ0FBQ3ZCLEtBQVQsQ0FBZXlCLENBQXhDO0FBQ0EsZ0JBQUlyRCxXQUFtQixHQUFHbUQsUUFBUSxDQUFDdkIsS0FBVCxDQUFlMEIsQ0FBekM7O0FBRUEsZ0JBQUlILFFBQVEsQ0FBQ0ksT0FBYixFQUFzQjtBQUNwQnhELGNBQUFBLFVBQVUsR0FBR29ELFFBQVEsQ0FBQ3ZCLEtBQVQsQ0FBZTBCLENBQTVCO0FBQ0F0RCxjQUFBQSxXQUFXLEdBQUdtRCxRQUFRLENBQUN2QixLQUFULENBQWV5QixDQUE3QjtBQUNEOztBQUVEL0MsWUFBQUEsTUFBTSxDQUFDVSxLQUFQLEdBQWVqQixVQUFmO0FBQ0FPLFlBQUFBLE1BQU0sQ0FBQ1MsTUFBUCxHQUFnQmYsV0FBaEI7QUFFQVMsWUFBQUEsR0FBRyxDQUFDa0IsU0FBSixDQUFjaUIsS0FBZCxFQUFxQk8sUUFBUSxDQUFDdkIsS0FBVCxDQUFlNEIsQ0FBcEMsRUFBdUNMLFFBQVEsQ0FBQ3ZCLEtBQVQsQ0FBZTZCLENBQXRELEVBQXlEMUQsVUFBekQsRUFBcUVDLFdBQXJFLEVBQWtGLENBQWxGLEVBQXFGLENBQXJGLEVBQXdGRCxVQUF4RixFQUFvR0MsV0FBcEc7QUFFQW9ELFlBQUFBLE1BQU0sQ0FBQ2xELElBQVAsR0FBY0EsSUFBZDtBQUNBa0QsWUFBQUEsTUFBTSxDQUFDeEIsS0FBUCxDQUFhOUIsR0FBYixHQUFtQlEsTUFBTSxDQUFDd0IsU0FBUCxDQUFpQixXQUFqQixFQUE4QjNCLE9BQTlCLENBQXNDLFdBQXRDLEVBQW1ELG9CQUFuRCxDQUFuQjtBQUVBa0IsWUFBQUEsTUFBTSxDQUFDVyxJQUFQLENBQVlvQixNQUFaO0FBRUQsV0EzQkQ7O0FBWEssZUF3Q0RuRCxPQUFPLENBQUNpQyxRQXhDUDtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUEwQ0gsMkJBQW9CYixNQUFwQix1SEFBNEI7QUFBakJPLFlBQUFBLEtBQWlCO0FBRXBCUyxZQUFBQSxJQUZvQixHQUVNOUIsUUFBUSxDQUFDQyxhQUFULENBQXVCLEdBQXZCLENBRk47QUFJMUI2QixZQUFBQSxJQUFJLENBQUNDLElBQUwsR0FBWVYsS0FBSyxDQUFDQSxLQUFOLENBQVk5QixHQUF4QjtBQUNBdUMsWUFBQUEsSUFBSSxDQUFDSCxRQUFMLEdBQWdCTixLQUFLLENBQUMxQixJQUF0QjtBQUVBbUMsWUFBQUEsSUFBSSxDQUFDRSxLQUFMO0FBQ0FGLFlBQUFBLElBQUksQ0FBQ0csTUFBTDtBQUVEOztBQXBERTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBLDRDQXdERW5CLE1BeERGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgKiBhcyBsb2FkIGZyb20gJy4vdXRpbHMvbG9hZCc7XHJcblxyXG5pbXBvcnQgU3ByaXRlIGZyb20gJy4vaW50ZXJmYWNlcy9TcHJpdGUnO1xyXG5pbXBvcnQgU3ByaXRlRGF0YSBmcm9tICcuL2ludGVyZmFjZXMvU3ByaXRlRGF0YSc7XHJcblxyXG4vKipcclxuICogVGFrZXMgYSBzcHJpdGVzaGVldCB3aXRoIHVuaWZvcm0gc2l6ZWQgc3ByaXRlcywgbWVhbmluZyB0aGF0IGVhY2ggaW5kaXZpZHVhbCBzcHJpdGUgd2l0aGluIHRoZSBzcHJpdGVzaGVldCBoYXMgdGhlIHNhbWUgd2lkdGggYW5kIFxyXG4gKiBoZWlnaHQsIGFuZCBpdCByZXR1cm5zIHRoZSBzcHJpdGVzIGFzIGluZGl2aWR1YWwgSFRNTEltYWdlRWxlbWVudC5cclxuICogXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzcmMgVGhlIHBhdGggdG8gdGhlIHNwcml0ZXNoZWV0LlxyXG4gKiBAcGFyYW0ge251bWJlcn0gZnJhbWVXaWR0aCBUaGUgd2lkdGggb2YgZXZlcnkgc3ByaXRlIGluIHRoZSBzcHJpdGVzaGVldC5cclxuICogQHBhcmFtIHtudW1iZXJ9IGZyYW1lSGVpZ2h0IFRoZSBoZWlnaHQgb2YgZXZlcnkgc3ByaXRlIGluIHRoZSBzcHJpdGVzaGVldC5cclxuICogQHBhcmFtIHtPcHRpb25zfSBbb3B0aW9uc11cclxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLm5hbWU9J3Nwcml0ZSddIFNldHMgdGhlIGRhdGEtbmFtZSBhdHRyaWJ1dGUgdG8gdGhpcyBhbmQgaXMgdXNlZCBpZiBkb3dubG9hZGluZyB0aGUgaW1hZ2VzLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuY3Jvc3NPcmlnaW49bnVsbF0gU2V0IHRoZSBhcHByb3ByaWF0ZSBjcm9zcy1vcmlnaW4gcHJvcGVydHkgaWYgdGhlIGltYWdlIGlzIGZyb20gYW5vdGhlciBkb21haW4uXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuZG93bmxvYWQ9ZmFsc2VdIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcHJpdGVzIHNob3VsZCBhbHNvIGRvd25sb2FkIGF1dG9tYXRpY2FsbHkuXHJcbiAqIFxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxIVE1MSW1hZ2VFbGVtZW50Pj59IFJldHVybnMgdGhlIGluZGl2aWR1YWwgc3ByaXRlcy5cclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzcHJpdGVzaGVldFRvU3ByaXRlcyhzcmM6IHN0cmluZywgZnJhbWVXaWR0aDogbnVtYmVyLCBmcmFtZUhlaWdodDogbnVtYmVyLCBvcHRpb25zOiBhbnkgPSB7fSk6IFByb21pc2U8QXJyYXk8SFRNTEltYWdlRWxlbWVudD4+IHtcclxuXHJcbiAgY29uc3QgbmFtZTogc3RyaW5nID0gb3B0aW9ucy5uYW1lID8gb3B0aW9ucy5uYW1lIDogc3JjLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKS5zdWJzdHIoMCwgc3JjLmxhc3RJbmRleE9mKCcuJykpO1xyXG5cclxuICBjb25zdCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgY29uc3QgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XHJcblxyXG4gIGNvbnN0IHNwcml0ZXNoZWV0OiBIVE1MSW1hZ2VFbGVtZW50ID0gYXdhaXQgbG9hZC5pbWFnZShzcmMsIG9wdGlvbnMuY3Jvc3NPcmlnaW4pO1xyXG5cclxuICBjYW52YXMuaGVpZ2h0ID0gZnJhbWVIZWlnaHQ7XHJcbiAgY2FudmFzLndpZHRoID0gZnJhbWVXaWR0aDtcclxuXHJcbiAgbGV0IHJvd3M6IG51bWJlciA9IE1hdGguZmxvb3Ioc3ByaXRlc2hlZXQuaGVpZ2h0IC8gZnJhbWVIZWlnaHQpO1xyXG4gIGxldCBjb2xzOiBudW1iZXIgPSBNYXRoLmZsb29yKHNwcml0ZXNoZWV0LndpZHRoIC8gZnJhbWVXaWR0aCk7XHJcblxyXG4gIGxldCBmcmFtZTogSFRNTEltYWdlRWxlbWVudDtcclxuICBsZXQgZnJhbWVzOiBBcnJheTxIVE1MSW1hZ2VFbGVtZW50PiA9IFtdO1xyXG5cclxuICBsZXQgbG9jWDogbnVtYmVyID0gMDtcclxuICBsZXQgbG9jWTogbnVtYmVyID0gMDtcclxuXHJcbiAgbGV0IGNvdW50ZXI6IG51bWJlciA9IDE7XHJcblxyXG4gIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCByb3dzOyArK2kpIHtcclxuXHJcbiAgICBmb3IgKGxldCBqOiBudW1iZXIgPSAwOyBqIDwgY29sczsgKytqKSB7XHJcblxyXG4gICAgICBjdHguZHJhd0ltYWdlKHNwcml0ZXNoZWV0LCBsb2NYLCBsb2NZLCBmcmFtZVdpZHRoLCBmcmFtZUhlaWdodCwgMCwgMCwgZnJhbWVXaWR0aCwgZnJhbWVIZWlnaHQpO1xyXG5cclxuICAgICAgZnJhbWUgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgZnJhbWUuc3JjID0gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJykucmVwbGFjZSgnaW1hZ2UvcG5nJywgJ2ltYWdlL29jdGV0LXN0cmVhbScpO1xyXG5cclxuICAgICAgZnJhbWUuZGF0YXNldC5uYW1lID0gYCR7bmFtZX0tJHtjb3VudGVyfWA7XHJcblxyXG4gICAgICBmcmFtZXMucHVzaChmcmFtZSk7XHJcblxyXG4gICAgICBjb3VudGVyKys7XHJcblxyXG4gICAgICBsb2NYICs9IGZyYW1lV2lkdGg7XHJcblxyXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGxvY1kgKz0gZnJhbWVIZWlnaHQ7XHJcbiAgICBsb2NYID0gMDtcclxuXHJcbiAgfVxyXG5cclxuICBpZiAob3B0aW9ucy5kb3dubG9hZCkge1xyXG5cclxuICAgIGZvciAobGV0IGk6IG51bWJlciA9IDAsIGxlbjogbnVtYmVyID0gZnJhbWVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcblxyXG4gICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cclxuICAgICAgbGluay5ocmVmID0gZnJhbWVzW2ldLnNyYztcclxuICAgICAgbGluay5kb3dubG9hZCA9IGAke25hbWV9JHtpfS5wbmdgO1xyXG5cclxuICAgICAgbGluay5jbGljaygpO1xyXG4gICAgICBsaW5rLnJlbW92ZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4gZnJhbWVzO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFRha2VzIGEgdGV4dHVyZSBhdGxhcyBzcHJpdGVzaGVldCBhbmQgdGhlIGFjY29tcGFueWluZyBKU09OIGZpbGUgYW5kIGl0IHJldHVybnMgdGhlIHNwcml0ZXMgYXMgaW5kaXZpZHVhbCBIVE1MSW1hZ2VFbGVtZW50LlxyXG4gKiBcclxuICogQHBhcmFtIHtzdHJpbmd9IGF0bGFzIFRoZSBwYXRoIHRvIHRoZSBhdGxhcy5cclxuICogQHBhcmFtIHtzdHJpbmd9IGpzb24gVGhlIHBhdGggdG8gdGhlIEpTT04gZmlsZS5cclxuICogQHBhcmFtIHtPcHRpb25zfSBbb3B0aW9uc11cclxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmNyb3NzT3JpZ2luPW51bGxdIFNldCB0aGUgYXBwcm9wcmlhdGUgY3Jvc3Mtb3JpZ2luIHByb3BlcnR5IGlmIHRoZSBpbWFnZSBpcyBmcm9tIGFub3RoZXIgZG9tYWluLlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmRvd25sb2FkPWZhbHNlXSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc3ByaXRlcyBzaG91bGQgYWxzbyBkb3dubG9hZCBhdXRvbWF0aWNhbGx5LlxyXG4gKiBcclxuICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8SFRNTEltYWdlRWxlbWVudD4+fSBSZXR1cm5zIHRoZSBpbmRpdmlkdWFsIHNwcml0ZXMuXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXRsYXNUb1Nwcml0ZXMoYXRsYXNQYXRoOiBzdHJpbmcsIGpzb25QYXRoOiBzdHJpbmcsIG9wdGlvbnM6IGFueSA9IHt9KTogUHJvbWlzZTxBcnJheTxIVE1MSW1hZ2VFbGVtZW50Pj4ge1xyXG5cclxuICBjb25zdCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgY29uc3QgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XHJcblxyXG4gIGNvbnN0IGF0bGFzOiBIVE1MSW1hZ2VFbGVtZW50ID0gYXdhaXQgbG9hZC5pbWFnZShhdGxhc1BhdGgsIG9wdGlvbnMuY3Jvc3NPcmlnaW4pO1xyXG5cclxuICBjb25zdCBzcHJpdGVEYXRhOiBTcHJpdGVEYXRhID0gYXdhaXQgbG9hZC5YSFIoanNvblBhdGgpO1xyXG5cclxuICBsZXQgZnJhbWVzOiBhbnkgPSBbXTtcclxuXHJcbiAgT2JqZWN0LmVudHJpZXMoc3ByaXRlRGF0YS5mcmFtZXMpLmZvckVhY2goKFtuYW1lLCBkZXRhaWxzXSkgPT4ge1xyXG5cclxuICAgIGNvbnN0IF9kZXRhaWxzOiBhbnkgPSBkZXRhaWxzO1xyXG5cclxuICAgIGNvbnN0IHNwcml0ZTogU3ByaXRlID0ge1xyXG4gICAgICBuYW1lOiAnJyxcclxuICAgICAgZnJhbWU6IG5ldyBJbWFnZSgpXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBmcmFtZVdpZHRoOiBudW1iZXIgPSBfZGV0YWlscy5mcmFtZS53O1xyXG4gICAgbGV0IGZyYW1lSGVpZ2h0OiBudW1iZXIgPSBfZGV0YWlscy5mcmFtZS5oO1xyXG5cclxuICAgIGlmIChfZGV0YWlscy5yb3RhdGVkKSB7XHJcbiAgICAgIGZyYW1lV2lkdGggPSBfZGV0YWlscy5mcmFtZS5oO1xyXG4gICAgICBmcmFtZUhlaWdodCA9IF9kZXRhaWxzLmZyYW1lLnc7XHJcbiAgICB9XHJcblxyXG4gICAgY2FudmFzLndpZHRoID0gZnJhbWVXaWR0aDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSBmcmFtZUhlaWdodDtcclxuXHJcbiAgICBjdHguZHJhd0ltYWdlKGF0bGFzLCBfZGV0YWlscy5mcmFtZS54LCBfZGV0YWlscy5mcmFtZS55LCBmcmFtZVdpZHRoLCBmcmFtZUhlaWdodCwgMCwgMCwgZnJhbWVXaWR0aCwgZnJhbWVIZWlnaHQpO1xyXG5cclxuICAgIHNwcml0ZS5uYW1lID0gbmFtZTtcclxuICAgIHNwcml0ZS5mcmFtZS5zcmMgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKS5yZXBsYWNlKCdpbWFnZS9wbmcnLCAnaW1hZ2Uvb2N0ZXQtc3RyZWFtJyk7XHJcblxyXG4gICAgZnJhbWVzLnB1c2goc3ByaXRlKTtcclxuXHJcbiAgfSk7XHJcblxyXG4gIGlmIChvcHRpb25zLmRvd25sb2FkKSB7XHJcblxyXG4gICAgZm9yIChjb25zdCBmcmFtZSBvZiBmcmFtZXMpIHtcclxuXHJcbiAgICAgIGNvbnN0IGxpbms6IEhUTUxBbmNob3JFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cclxuICAgICAgbGluay5ocmVmID0gZnJhbWUuZnJhbWUuc3JjO1xyXG4gICAgICBsaW5rLmRvd25sb2FkID0gZnJhbWUubmFtZVxyXG5cclxuICAgICAgbGluay5jbGljaygpO1xyXG4gICAgICBsaW5rLnJlbW92ZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4gZnJhbWVzO1xyXG5cclxufSJdfQ==