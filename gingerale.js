"use strict"

/**
 * Creates an array of image elements generated from parsing a spritesheet
 * and 'cutting out' individual sprite frames by their height and width. The
 * returned images can easily be shown on screen or downloaded.
 * 
 * @public
 * @since 0.1.0
 * @param {string} image The spritesheet to split into individual frames.
 * @param {Object} options 
 * @param {number} options.frameWidth The width of the individual sprites.
 * @param {number} options.frameHeight The height of the individual sprites.
 * @returns {Array}
 * @example
 * 
 * sprites("./images/walking.png", { frameWidth: 32, frameHeight: 48 });
 * => [img (walking1), img (walking2), img (walking3)]
 */
export async function sheetToSprites(image, options = {}) {
  if (!image) throw new Error('A spritesheet must be provided');
  if (!options.frameHeight || !options.frameWidth) throw new Error('The height and width of each individual frame must be specified');

  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');

  let spritesheet = new Image();
  spritesheet.setAttribute('crossorigin', 'anonymous');
  spritesheet.src = image;

  return new Promise((resolve) => {
    spritesheet.onload = () => {
      canvas.height = options.frameHeight;
      canvas.width = options.frameWidth;

      let rows = (spritesheet.height / options.frameHeight);
      let cols = (spritesheet.width / options.frameWidth);

      if (rows % 0 != 0 || cols % 0 != 0) console.warn('The number of frames does not match the expected dimensions of the spritesheet. This is just a warning, only take caution if your sprites don\'t return as expected');

      let frames = [];
      let frame;

      let locX = 0;
      let locY = 0;

      rows = Math.floor(rows);
      cols = Math.floor(cols);

      for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
          ctx.drawImage(spritesheet, locX, locY, options.frameWidth, options.frameHeight, 0, 0, options.frameWidth, options.frameHeight);

          frame = new Image();
          frame.src = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
          frames.push(frame);

          locX += options.frameWidth;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        locY += options.frameHeight;
        locX = 0;
      }

      resolve(frames);
    }
  });
}