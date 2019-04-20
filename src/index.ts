'use strict'

import Options from './options/Options';

import * as load from './utils/load';

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
export async function spritesheetToSprites(src: string, frameWidth: number, frameHeight: number, options: Object = {}): Promise<Array<HTMLImageElement>> {

  const _options: Options = new Options(options);

  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

  const spritesheet: HTMLImageElement = await load.image(src, _options.crossOrigin);

  canvas.height = frameHeight;
  canvas.width = frameWidth;

  let rows: number = Math.floor(spritesheet.height / frameHeight);
  let cols: number = Math.floor(spritesheet.width / frameWidth);

  let frame: HTMLImageElement;
  let frames: Array<HTMLImageElement> = [];

  let locX: number = 0;
  let locY: number = 0;

  let counter: number = 0;

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

  if (_options.download) {

    for (let i = 0, len = frames.length; i < len; ++i) {

      const link = document.createElement('a');

      link.href = frames[i].src;
      link.download = `${_options.name}${i}.png`;

      link.click();
      link.remove();

    }

  }

  return frames;

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
export async function atlasToSprites(atlasPath: string, jsonPath: string, options: Object = {}): Promise<Array<HTMLImageElement>> {

  const _options = new Options(options);

  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

  const atlas: HTMLImageElement = await load.image(atlasPath, _options.crossOrigin);

  const spriteData = await load.XHR(jsonPath);

  let frames: any = [];

  Object.entries(spriteData.frames).forEach(([name, details]) => {

    const _details: any = details;

    const sprite: any = { name: null, frame: new Image() };

    let frameWidth: number = _details.frame.w;
    let frameHeight: number = _details.frame.h;

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

  if (_options.download) {

    for (const frame of frames) {

      const link: HTMLAnchorElement = document.createElement('a');

      link.href = frame.frame.src;
      link.download = frame.name

      link.click();
      link.remove();

    }

  }

  return frames;

}
