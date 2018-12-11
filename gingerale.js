'use strict'

/**
 * Takes a spritesheet with uniform sized sprites, meaning that each
 * individual sprite within the spritesheet has the same width and height,
 * and it returns the sprites as individual HTMLImageElement.
 * 
 * @since 0.1.0
 * 
 * @param {string} src The path to the spritesheet.
 * @param {number} frameWidth The width of every sprite in the spritesheet.
 * @param {number} frameHeight The height of every sprite in the spritesheet.
 * @param {Object} [options]
 * @param {string} [options.name='sprite'] Sets the data-name attribute to this and is used if downloading the images.
 * @param {string} [options.crossOrigin=null] Set the appropriate cross-origin property if the image is from another domain.
 * @param {boolean} [options.download=false] Set to true to also download the sprites.
 * 
 * @returns {Array<HTMLImageElement>} Returns the individual sprites.
 */
export function spritesheetToSprites(src, frameWidth, frameHeight, options = {}) {

  const _options = Object.assign({

    name: 'sprite',

    crossOrigin: null,

    download: false

  }, options);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const spritesheet = new Image();

  return new Promise((resolve, reject) => {

    spritesheet.addEventListener('load', function spritesheetLoaded() {

      canvas.height = frameHeight;
      canvas.width = frameWidth;

      let rows = Math.floor(spritesheet.height / frameHeight);
      let cols = Math.floor(spritesheet.width / frameWidth);

      let frame;
      let frames = [];

      let locX = 0;
      let locY = 0;

      let counter = 0;

      for (let i = 0; i < rows; ++i) {

        for (let j = 0; j < cols; ++j) {

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

        for (let i = 0, len = frames.length; i < len; ++i) {

          const link = document.createElement('a');

          link.href = frames[i].src;
          link.download = `${_options.name}${i}.png`;

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
 * @param {Object} [options]
 * @param {string} [options.crossOrigin=null] Set the appropriate cross-origin property if the image is from another domain.
 * @param {boolean} [options.download=false] Set to true to also download the sprites.
 * 
 * @returns {Array<HTMLImageElement>} Returns the individual sprites.
 */
export function atlasToSprites(atlasPath, jsonPath, options = {}) {

  const _options = Object.assign({

    crossOrigin: null,

    download: false

  }, options);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const atlas = new Image();

  return new Promise((resolve, reject) => {

    atlas.addEventListener('load', function atlasLoaded(data) {

      const atlasReference = new XMLHttpRequest();

      atlasReference.addEventListener('readystatechange', function atlasReferenceLoaded(data) {

        if (atlasReference.readyState === 4 && atlasReference.status === 200) {

          const spriteData = JSON.parse(atlasReference.responseText);

          let frames = [];

          Object.entries(spriteData.frames).forEach(([name, details]) => {

            const sprite = {

              name: null,

              frame: new Image()

            };

            let frameWidth = details.frame.w;
            let frameHeight = details.frame.h;

            if (details.rotated) {

              frameWidth = details.frame.h;
              frameHeight = details.frame.w;

            }

            canvas.width = frameWidth;
            canvas.height = frameHeight;

            ctx.drawImage(atlas, details.frame.x, details.frame.y, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

            sprite.name = name;
            sprite.frame.src = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

            frames.push(sprite);

          });

          atlasReference.removeEventListener('readystatechange', atlasReferenceLoaded);

          if (_options.download) {

            for (const frame of frames) {

              const link = document.createElement('a');

              link.href = frame.frame.src;
              link.download = frame.name

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