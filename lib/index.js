'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spritesheetToSprites = spritesheetToSprites;
exports.atlasToSprites = atlasToSprites;

var _Options = _interopRequireDefault(require("./options/Options"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * GingerAle is a simple spritesheet to sprite converter for the browser. 
 * 
 * All it needs is a path to a spritesheet and the width and height of the 
 * individual sprites and it will return an array of image elements which 
 * you can use to display or work with further.
 * 
 * @author Robert Corponoi <robertcorponoi>
 * 
 * @version 2.1.0
 */

/**
 * Takes a spritesheet with uniform sized sprites, meaning that each individual 
 * sprite within the spritesheet has the same width and height, and it returns 
 * the sprites as individual HTMLImageElement.
 * 
 * @since 0.1.0
 * 
 * @param {string} src The path to the spritesheet.
 * @param {number} frameWidth The width of every sprite in the spritesheet.
 * @param {number} frameHeight The height of every sprite in the spritesheet.
 * @param {Options} [options]
 * @param {string} [options.name='sprite'] Sets the data-name attribute to this and is used if downloading the images.
 * @param {string} [options.crossOrigin=null] Set the appropriate cross-origin property if the image is from another domain.
 * @param {boolean} [options.download=false] Set to true to also download the sprites.
 * 
 * @returns {Promise<Array<HTMLImageElement>>} Returns the individual sprites.
 */
function spritesheetToSprites(src, frameWidth, frameHeight) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var _options = new _Options.default(options);

  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var spritesheet = new Image();
  return new Promise(function (resolve, reject) {
    spritesheet.addEventListener('load', function spritesheetLoaded() {
      canvas.height = frameHeight;
      canvas.width = frameWidth;
      var rows = Math.floor(spritesheet.height / frameHeight);
      var cols = Math.floor(spritesheet.width / frameWidth);
      var frame;
      var frames = [];
      var locX = 0;
      var locY = 0;
      var counter = 0;

      for (var i = 0; i < rows; ++i) {
        for (var j = 0; j < cols; ++j) {
          ctx.drawImage(spritesheet, locX, locY, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);
          frame = new Image();
          frame.src = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
          frame.dataset.name = _options.name + counter;
          frames.push(frame);
          counter++;
          locX += frameWidth;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        locY += frameHeight;
        locX = 0;
      }

      spritesheet.removeEventListener('load', spritesheetLoaded);

      if (_options.download) {
        for (var _i = 0, len = frames.length; _i < len; ++_i) {
          var link = document.createElement('a');
          link.href = frames[_i].src;
          link.download = "".concat(_options.name).concat(_i, ".png");
          link.click();
          link.remove();
        }
      }

      resolve(frames);
    });
    spritesheet.addEventListener('error', function spritesheetLoadError(err) {
      spritesheet.removeEventListener('error', spritesheetLoadError);
      reject(err);
    });
    spritesheet.crossOrigin = _options.crossOrigin;
    spritesheet.src = src;
  });
}
/**
* Takes a texture atlas spritesheet and the accompanying JSON file and it
* returns the sprites as individual HTMLImageElement.
* 
* @since 0.1.0
* 
* @param {string} atlas The path to the atlas.
* @param {string} json The path to the JSON file.
* @param {Options} [options]
* @param {string} [options.crossOrigin=null] Set the appropriate cross-origin property if the image is from another domain.
* @param {boolean} [options.download=false] Set to true to also download the sprites.
* 
* @returns {Promise<Array<HTMLImageElement>>} Returns the individual sprites.
*/


function atlasToSprites(atlasPath, jsonPath) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _options = new _Options.default(options);

  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var atlas = new Image();
  return new Promise(function (resolve, reject) {
    atlas.addEventListener('load', function atlasLoaded(data) {
      var atlasReference = new XMLHttpRequest();
      atlasReference.addEventListener('readystatechange', function atlasReferenceLoaded(data) {
        if (atlasReference.readyState === 4 && atlasReference.status === 200) {
          var spriteData = JSON.parse(atlasReference.responseText);
          var frames = [];
          Object.entries(spriteData.frames).forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
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
          atlasReference.removeEventListener('readystatechange', atlasReferenceLoaded);

          if (_options.download) {
            for (var _i2 = 0; _i2 < frames.length; _i2++) {
              var frame = frames[_i2];
              var link = document.createElement('a');
              link.href = frame.frame.src;
              link.download = frame.name;
              link.click();
              link.remove();
            }
          }

          resolve(frames);
        }
      });
      atlasReference.addEventListener('error', function atlasReferenceError(err) {
        atlasReference.removeEventListener('error', atlasReferenceError);
        reject(err);
      });
      atlasReference.open('GET', jsonPath);
      atlasReference.send();
    });
    atlas.addEventListener('error', function atlasError(err) {
      atlas.removeEventListener('error', atlasError);
      reject(err);
    });
    atlas.crossOrigin = _options.crossOrigin;
    atlas.src = atlasPath;
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJzcHJpdGVzaGVldFRvU3ByaXRlcyIsInNyYyIsImZyYW1lV2lkdGgiLCJmcmFtZUhlaWdodCIsIm9wdGlvbnMiLCJfb3B0aW9ucyIsIk9wdGlvbnMiLCJjYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjdHgiLCJnZXRDb250ZXh0Iiwic3ByaXRlc2hlZXQiLCJJbWFnZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNwcml0ZXNoZWV0TG9hZGVkIiwiaGVpZ2h0Iiwid2lkdGgiLCJyb3dzIiwiTWF0aCIsImZsb29yIiwiY29scyIsImZyYW1lIiwiZnJhbWVzIiwibG9jWCIsImxvY1kiLCJjb3VudGVyIiwiaSIsImoiLCJkcmF3SW1hZ2UiLCJ0b0RhdGFVUkwiLCJyZXBsYWNlIiwiZGF0YXNldCIsIm5hbWUiLCJwdXNoIiwiY2xlYXJSZWN0IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRvd25sb2FkIiwibGVuIiwibGVuZ3RoIiwibGluayIsImhyZWYiLCJjbGljayIsInJlbW92ZSIsInNwcml0ZXNoZWV0TG9hZEVycm9yIiwiZXJyIiwiY3Jvc3NPcmlnaW4iLCJhdGxhc1RvU3ByaXRlcyIsImF0bGFzUGF0aCIsImpzb25QYXRoIiwiYXRsYXMiLCJhdGxhc0xvYWRlZCIsImRhdGEiLCJhdGxhc1JlZmVyZW5jZSIsIlhNTEh0dHBSZXF1ZXN0IiwiYXRsYXNSZWZlcmVuY2VMb2FkZWQiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwic3ByaXRlRGF0YSIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsIk9iamVjdCIsImVudHJpZXMiLCJmb3JFYWNoIiwiZGV0YWlscyIsIl9kZXRhaWxzIiwic3ByaXRlIiwidyIsImgiLCJyb3RhdGVkIiwieCIsInkiLCJhdGxhc1JlZmVyZW5jZUVycm9yIiwib3BlbiIsInNlbmQiLCJhdGxhc0Vycm9yIl0sIm1h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QSxJQUFJLENBQUNILFFBQUwsR0FBZ0JmLEtBQUssQ0FBQ1csSUFBdEI7QUFFQU8sY0FBQUEsSUFBSSxDQUFDRSxLQUFMO0FBQ0FGLGNBQUFBLElBQUksQ0FBQ0csTUFBTDtBQUVBO0FBRUQ7O0FBRUQvQixVQUFBQSxPQUFPLENBQUNXLE1BQUQsQ0FBUDtBQUVBO0FBRUQsT0ExREQ7QUE0REE4QixNQUFBQSxjQUFjLENBQUN2QyxnQkFBZixDQUFnQyxPQUFoQyxFQUF5QyxTQUFTMkQsbUJBQVQsQ0FBNkI1QixHQUE3QixFQUFrQztBQUUxRVEsUUFBQUEsY0FBYyxDQUFDakIsbUJBQWYsQ0FBbUMsT0FBbkMsRUFBNENxQyxtQkFBNUM7QUFFQTVELFFBQUFBLE1BQU0sQ0FBQ2dDLEdBQUQsQ0FBTjtBQUVBLE9BTkQ7QUFRQVEsTUFBQUEsY0FBYyxDQUFDcUIsSUFBZixDQUFvQixLQUFwQixFQUEyQnpCLFFBQTNCO0FBQ0FJLE1BQUFBLGNBQWMsQ0FBQ3NCLElBQWY7QUFFQSxLQTNFRDtBQTZFQXpCLElBQUFBLEtBQUssQ0FBQ3BDLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLFNBQVM4RCxVQUFULENBQW9CL0IsR0FBcEIsRUFBeUI7QUFFeERLLE1BQUFBLEtBQUssQ0FBQ2QsbUJBQU4sQ0FBMEIsT0FBMUIsRUFBbUN3QyxVQUFuQztBQUVBL0QsTUFBQUEsTUFBTSxDQUFDZ0MsR0FBRCxDQUFOO0FBRUEsS0FORDtBQVFBSyxJQUFBQSxLQUFLLENBQUNKLFdBQU4sR0FBb0I1QyxRQUFRLENBQUM0QyxXQUE3QjtBQUNBSSxJQUFBQSxLQUFLLENBQUNwRCxHQUFOLEdBQVlrRCxTQUFaO0FBRUEsR0ExRk0sQ0FBUDtBQTRGQSIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9vcHRpb25zL09wdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIEdpbmdlckFsZSBpcyBhIHNpbXBsZSBzcHJpdGVzaGVldCB0byBzcHJpdGUgY29udmVydGVyIGZvciB0aGUgYnJvd3Nlci4gXHJcbiAqIFxyXG4gKiBBbGwgaXQgbmVlZHMgaXMgYSBwYXRoIHRvIGEgc3ByaXRlc2hlZXQgYW5kIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBcclxuICogaW5kaXZpZHVhbCBzcHJpdGVzIGFuZCBpdCB3aWxsIHJldHVybiBhbiBhcnJheSBvZiBpbWFnZSBlbGVtZW50cyB3aGljaCBcclxuICogeW91IGNhbiB1c2UgdG8gZGlzcGxheSBvciB3b3JrIHdpdGggZnVydGhlci5cclxuICogXHJcbiAqIEBhdXRob3IgUm9iZXJ0IENvcnBvbm9pIDxyb2JlcnRjb3Jwb25vaT5cclxuICogXHJcbiAqIEB2ZXJzaW9uIDIuMS4wXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRha2VzIGEgc3ByaXRlc2hlZXQgd2l0aCB1bmlmb3JtIHNpemVkIHNwcml0ZXMsIG1lYW5pbmcgdGhhdCBlYWNoIGluZGl2aWR1YWwgXHJcbiAqIHNwcml0ZSB3aXRoaW4gdGhlIHNwcml0ZXNoZWV0IGhhcyB0aGUgc2FtZSB3aWR0aCBhbmQgaGVpZ2h0LCBhbmQgaXQgcmV0dXJucyBcclxuICogdGhlIHNwcml0ZXMgYXMgaW5kaXZpZHVhbCBIVE1MSW1hZ2VFbGVtZW50LlxyXG4gKiBcclxuICogQHNpbmNlIDAuMS4wXHJcbiAqIFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3JjIFRoZSBwYXRoIHRvIHRoZSBzcHJpdGVzaGVldC5cclxuICogQHBhcmFtIHtudW1iZXJ9IGZyYW1lV2lkdGggVGhlIHdpZHRoIG9mIGV2ZXJ5IHNwcml0ZSBpbiB0aGUgc3ByaXRlc2hlZXQuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBmcmFtZUhlaWdodCBUaGUgaGVpZ2h0IG9mIGV2ZXJ5IHNwcml0ZSBpbiB0aGUgc3ByaXRlc2hlZXQuXHJcbiAqIEBwYXJhbSB7T3B0aW9uc30gW29wdGlvbnNdXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5uYW1lPSdzcHJpdGUnXSBTZXRzIHRoZSBkYXRhLW5hbWUgYXR0cmlidXRlIHRvIHRoaXMgYW5kIGlzIHVzZWQgaWYgZG93bmxvYWRpbmcgdGhlIGltYWdlcy5cclxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmNyb3NzT3JpZ2luPW51bGxdIFNldCB0aGUgYXBwcm9wcmlhdGUgY3Jvc3Mtb3JpZ2luIHByb3BlcnR5IGlmIHRoZSBpbWFnZSBpcyBmcm9tIGFub3RoZXIgZG9tYWluLlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmRvd25sb2FkPWZhbHNlXSBTZXQgdG8gdHJ1ZSB0byBhbHNvIGRvd25sb2FkIHRoZSBzcHJpdGVzLlxyXG4gKiBcclxuICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8SFRNTEltYWdlRWxlbWVudD4+fSBSZXR1cm5zIHRoZSBpbmRpdmlkdWFsIHNwcml0ZXMuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3ByaXRlc2hlZXRUb1Nwcml0ZXMoc3JjOiBzdHJpbmcsIGZyYW1lV2lkdGg6IG51bWJlciwgZnJhbWVIZWlnaHQ6IG51bWJlciwgb3B0aW9uczogT2JqZWN0ID0ge30pOiBQcm9taXNlPEFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+PiB7XHJcblxyXG5cdGNvbnN0IF9vcHRpb25zOiBPcHRpb25zID0gbmV3IE9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG5cdGNvbnN0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuXHRjb25zdCBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpITtcclxuXHJcblx0Y29uc3Qgc3ByaXRlc2hlZXQ6IEhUTUxJbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKTtcclxuXHJcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcblx0XHRzcHJpdGVzaGVldC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gc3ByaXRlc2hlZXRMb2FkZWQoKSB7XHJcblxyXG5cdFx0XHRjYW52YXMuaGVpZ2h0ID0gZnJhbWVIZWlnaHQ7XHJcblx0XHRcdGNhbnZhcy53aWR0aCA9IGZyYW1lV2lkdGg7XHJcblxyXG5cdFx0XHRsZXQgcm93czogbnVtYmVyID0gTWF0aC5mbG9vcihzcHJpdGVzaGVldC5oZWlnaHQgLyBmcmFtZUhlaWdodCk7XHJcblx0XHRcdGxldCBjb2xzOiBudW1iZXIgPSBNYXRoLmZsb29yKHNwcml0ZXNoZWV0LndpZHRoIC8gZnJhbWVXaWR0aCk7XHJcblxyXG5cdFx0XHRsZXQgZnJhbWU6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcblx0XHRcdGxldCBmcmFtZXM6IEFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+ID0gW107XHJcblxyXG5cdFx0XHRsZXQgbG9jWDogbnVtYmVyID0gMDtcclxuXHRcdFx0bGV0IGxvY1k6IG51bWJlciA9IDA7XHJcblxyXG5cdFx0XHRsZXQgY291bnRlcjogbnVtYmVyID0gMDtcclxuXHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgKytpKSB7XHJcblxyXG5cdFx0XHRcdGZvciAobGV0IGogPSAwOyBqIDwgY29sczsgKytqKSB7XHJcblxyXG5cdFx0XHRcdFx0Y3R4LmRyYXdJbWFnZShzcHJpdGVzaGVldCwgbG9jWCwgbG9jWSwgZnJhbWVXaWR0aCwgZnJhbWVIZWlnaHQsIDAsIDAsIGZyYW1lV2lkdGgsIGZyYW1lSGVpZ2h0KTtcclxuXHJcblx0XHRcdFx0XHRmcmFtZSA9IG5ldyBJbWFnZSgpO1xyXG5cdFx0XHRcdFx0ZnJhbWUuc3JjID0gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJykucmVwbGFjZSgnaW1hZ2UvcG5nJywgJ2ltYWdlL29jdGV0LXN0cmVhbScpO1xyXG5cclxuXHRcdFx0XHRcdGZyYW1lLmRhdGFzZXQubmFtZSA9IF9vcHRpb25zLm5hbWUgKyBjb3VudGVyO1xyXG5cclxuXHRcdFx0XHRcdGZyYW1lcy5wdXNoKGZyYW1lKTtcclxuXHJcblx0XHRcdFx0XHRjb3VudGVyKys7XHJcblxyXG5cdFx0XHRcdFx0bG9jWCArPSBmcmFtZVdpZHRoO1xyXG5cclxuXHRcdFx0XHRcdGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRsb2NZICs9IGZyYW1lSGVpZ2h0O1xyXG5cdFx0XHRcdGxvY1ggPSAwO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c3ByaXRlc2hlZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIHNwcml0ZXNoZWV0TG9hZGVkKTtcclxuXHJcblx0XHRcdGlmIChfb3B0aW9ucy5kb3dubG9hZCkge1xyXG5cclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMCwgbGVuID0gZnJhbWVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcblxyXG5cdFx0XHRcdFx0Y29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHJcblx0XHRcdFx0XHRsaW5rLmhyZWYgPSBmcmFtZXNbaV0uc3JjO1xyXG5cdFx0XHRcdFx0bGluay5kb3dubG9hZCA9IGAke19vcHRpb25zLm5hbWV9JHtpfS5wbmdgO1xyXG5cclxuXHRcdFx0XHRcdGxpbmsuY2xpY2soKTtcclxuXHRcdFx0XHRcdGxpbmsucmVtb3ZlKCk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJlc29sdmUoZnJhbWVzKTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHRzcHJpdGVzaGVldC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uIHNwcml0ZXNoZWV0TG9hZEVycm9yKGVycikge1xyXG5cclxuXHRcdFx0c3ByaXRlc2hlZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBzcHJpdGVzaGVldExvYWRFcnJvcik7XHJcblxyXG5cdFx0XHRyZWplY3QoZXJyKTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHRzcHJpdGVzaGVldC5jcm9zc09yaWdpbiA9IF9vcHRpb25zLmNyb3NzT3JpZ2luO1xyXG5cdFx0c3ByaXRlc2hlZXQuc3JjID0gc3JjO1xyXG5cclxuXHR9KTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4qIFRha2VzIGEgdGV4dHVyZSBhdGxhcyBzcHJpdGVzaGVldCBhbmQgdGhlIGFjY29tcGFueWluZyBKU09OIGZpbGUgYW5kIGl0XHJcbiogcmV0dXJucyB0aGUgc3ByaXRlcyBhcyBpbmRpdmlkdWFsIEhUTUxJbWFnZUVsZW1lbnQuXHJcbiogXHJcbiogQHNpbmNlIDAuMS4wXHJcbiogXHJcbiogQHBhcmFtIHtzdHJpbmd9IGF0bGFzIFRoZSBwYXRoIHRvIHRoZSBhdGxhcy5cclxuKiBAcGFyYW0ge3N0cmluZ30ganNvbiBUaGUgcGF0aCB0byB0aGUgSlNPTiBmaWxlLlxyXG4qIEBwYXJhbSB7T3B0aW9uc30gW29wdGlvbnNdXHJcbiogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmNyb3NzT3JpZ2luPW51bGxdIFNldCB0aGUgYXBwcm9wcmlhdGUgY3Jvc3Mtb3JpZ2luIHByb3BlcnR5IGlmIHRoZSBpbWFnZSBpcyBmcm9tIGFub3RoZXIgZG9tYWluLlxyXG4qIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuZG93bmxvYWQ9ZmFsc2VdIFNldCB0byB0cnVlIHRvIGFsc28gZG93bmxvYWQgdGhlIHNwcml0ZXMuXHJcbiogXHJcbiogQHJldHVybnMge1Byb21pc2U8QXJyYXk8SFRNTEltYWdlRWxlbWVudD4+fSBSZXR1cm5zIHRoZSBpbmRpdmlkdWFsIHNwcml0ZXMuXHJcbiovXHJcbmV4cG9ydCBmdW5jdGlvbiBhdGxhc1RvU3ByaXRlcyhhdGxhc1BhdGg6IHN0cmluZywganNvblBhdGg6IHN0cmluZywgb3B0aW9uczogT2JqZWN0ID0ge30pIHtcclxuXHJcblx0Y29uc3QgX29wdGlvbnMgPSBuZXcgT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcblx0Y29uc3QgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG5cdGNvbnN0IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gY2FudmFzLmdldENvbnRleHQoJzJkJykhO1xyXG5cclxuXHRjb25zdCBhdGxhczogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xyXG5cclxuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cclxuXHRcdGF0bGFzLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiBhdGxhc0xvYWRlZChkYXRhKSB7XHJcblxyXG5cdFx0XHRjb25zdCBhdGxhc1JlZmVyZW5jZTogWE1MSHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcblx0XHRcdGF0bGFzUmVmZXJlbmNlLmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCBmdW5jdGlvbiBhdGxhc1JlZmVyZW5jZUxvYWRlZChkYXRhKSB7XHJcblxyXG5cdFx0XHRcdGlmIChhdGxhc1JlZmVyZW5jZS5yZWFkeVN0YXRlID09PSA0ICYmIGF0bGFzUmVmZXJlbmNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcblxyXG5cdFx0XHRcdFx0Y29uc3Qgc3ByaXRlRGF0YTogYW55ID0gSlNPTi5wYXJzZShhdGxhc1JlZmVyZW5jZS5yZXNwb25zZVRleHQpO1xyXG5cclxuXHRcdFx0XHRcdGxldCBmcmFtZXM6IGFueSA9IFtdO1xyXG5cclxuXHRcdFx0XHRcdE9iamVjdC5lbnRyaWVzKHNwcml0ZURhdGEuZnJhbWVzKS5mb3JFYWNoKChbbmFtZSwgZGV0YWlsc10pID0+IHtcclxuXHJcblx0XHRcdFx0XHRcdGNvbnN0IF9kZXRhaWxzOiBhbnkgPSBkZXRhaWxzO1xyXG5cclxuXHRcdFx0XHRcdFx0Y29uc3Qgc3ByaXRlOiBhbnkgPSB7IG5hbWU6IG51bGwsIGZyYW1lOiBuZXcgSW1hZ2UoKSB9O1xyXG5cclxuXHRcdFx0XHRcdFx0bGV0IGZyYW1lV2lkdGg6IG51bWJlciA9IF9kZXRhaWxzLmZyYW1lLnc7XHJcblx0XHRcdFx0XHRcdGxldCBmcmFtZUhlaWdodDogbnVtYmVyID0gX2RldGFpbHMuZnJhbWUuaDtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChfZGV0YWlscy5yb3RhdGVkKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGZyYW1lV2lkdGggPSBfZGV0YWlscy5mcmFtZS5oO1xyXG5cdFx0XHRcdFx0XHRcdGZyYW1lSGVpZ2h0ID0gX2RldGFpbHMuZnJhbWUudztcclxuXHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGNhbnZhcy53aWR0aCA9IGZyYW1lV2lkdGg7XHJcblx0XHRcdFx0XHRcdGNhbnZhcy5oZWlnaHQgPSBmcmFtZUhlaWdodDtcclxuXHJcblx0XHRcdFx0XHRcdGN0eC5kcmF3SW1hZ2UoYXRsYXMsIF9kZXRhaWxzLmZyYW1lLngsIF9kZXRhaWxzLmZyYW1lLnksIGZyYW1lV2lkdGgsIGZyYW1lSGVpZ2h0LCAwLCAwLCBmcmFtZVdpZHRoLCBmcmFtZUhlaWdodCk7XHJcblxyXG5cdFx0XHRcdFx0XHRzcHJpdGUubmFtZSA9IG5hbWU7XHJcblx0XHRcdFx0XHRcdHNwcml0ZS5mcmFtZS5zcmMgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKS5yZXBsYWNlKCdpbWFnZS9wbmcnLCAnaW1hZ2Uvb2N0ZXQtc3RyZWFtJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRmcmFtZXMucHVzaChzcHJpdGUpO1xyXG5cclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdGF0bGFzUmVmZXJlbmNlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCBhdGxhc1JlZmVyZW5jZUxvYWRlZCk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKF9vcHRpb25zLmRvd25sb2FkKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRmb3IgKGNvbnN0IGZyYW1lIG9mIGZyYW1lcykge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRjb25zdCBsaW5rOiBIVE1MQW5jaG9yRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0bGluay5ocmVmID0gZnJhbWUuZnJhbWUuc3JjO1xyXG5cdFx0XHRcdFx0XHRcdGxpbmsuZG93bmxvYWQgPSBmcmFtZS5uYW1lXHJcblxyXG5cdFx0XHRcdFx0XHRcdGxpbmsuY2xpY2soKTtcclxuXHRcdFx0XHRcdFx0XHRsaW5rLnJlbW92ZSgpO1xyXG5cclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXNvbHZlKGZyYW1lcyk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0YXRsYXNSZWZlcmVuY2UuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbiBhdGxhc1JlZmVyZW5jZUVycm9yKGVycikge1xyXG5cclxuXHRcdFx0XHRhdGxhc1JlZmVyZW5jZS5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIGF0bGFzUmVmZXJlbmNlRXJyb3IpO1xyXG5cclxuXHRcdFx0XHRyZWplY3QoZXJyKTtcclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0YXRsYXNSZWZlcmVuY2Uub3BlbignR0VUJywganNvblBhdGgpO1xyXG5cdFx0XHRhdGxhc1JlZmVyZW5jZS5zZW5kKCk7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0YXRsYXMuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbiBhdGxhc0Vycm9yKGVycikge1xyXG5cclxuXHRcdFx0YXRsYXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBhdGxhc0Vycm9yKTtcclxuXHJcblx0XHRcdHJlamVjdChlcnIpO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdGF0bGFzLmNyb3NzT3JpZ2luID0gX29wdGlvbnMuY3Jvc3NPcmlnaW47XHJcblx0XHRhdGxhcy5zcmMgPSBhdGxhc1BhdGg7XHJcblxyXG5cdH0pO1xyXG5cclxufVxyXG4iXX0=