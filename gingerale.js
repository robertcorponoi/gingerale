function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var Options =
/**
 * The name attribute that will be passed to the sprites in the
 * `spritesheetToSprites` method.
 * 
 * @since 0.1.0
 * 
 * @property {string}
 * 
 * @default ''
 */

/**
 * The cross origin attribute to use for the image if the image
 * originates from an external source.
 * 
 * @since 0.1.0
 * 
 * @property {string}
 * 
 * @default ''
 */

/**
 * Indicates whether the image/s will download after being generated
 * or not.
 * 
 * @since 0.1.0
 * 
 * @property {boolean}
 * 
 * @default false
 */

/**
 * @param {Object} options The options passed to the Gingerale method being used.
 */
function Options(options) {
  _classCallCheck(this, Options);

  _defineProperty(this, "name", '');

  _defineProperty(this, "crossOrigin", '');

  _defineProperty(this, "download", false);

  Object.assign(this, options);
};

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

  var _options = new Options(options);

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

  var _options = new Options(options);

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

export { spritesheetToSprites, atlasToSprites };
