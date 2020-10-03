'use strict'

import { Sprite } from './interfaces/sprite';
import { AtlasSpriteData } from './interfaces/atlas_sprite_data';

import { AtlasToSpritesOptions } from './options/atlas_to_sprites_options';
import { SpritesheetToSpritesOptions } from './options/spritesheet_to_sprites_options';

import { loadSpritesheet, loadXML, loadJSON } from './loader';

export {
  loadXML,
  loadJSON,
  loadSpritesheet,
}

/**
 * Returns the individual sprites of a uniform spritesheet. A uniform spritesheet
 * is a spritesheet in which all of the individual sprites are the same size and
 * in a uniform fashion. Even if you have a uniform spritesheet but it has a XML
 * or JSON definition file, use `atlasToSprites` instead.
 * 
 * @async
 * 
 * @param {HTMLImageElement} spritesheet The spritesheet image element to parse.
 * @param {number} spriteWidth The width of every individual sprite in the spritesheet.
 * @param {number} spriteHeight The height of every individual sprite in the spritesheet.
 * @param {SpritesheetToSpritesOptions} [options] The options that can be passed to this method.
 * @param {string} [options.name='sprite'] Sets the data-attribute to the individual sprite images and used as the name for the sprites if downloaded.
 * @param {string} [options.crossOrigin=''] Sets the cross-origin property of the spritesheet if the spritesheet is hosted elsewhere.
 * @param {boolean} [options.download=false] Indicates whether the sprites should be downloaded after they're retrieved or not.
 * 
 * @returns {Promise<Array<Sprite>>} Returns the individual sprites from the spritesheet.
 */
export async function spritesheetToSprites(spritesheet: HTMLImageElement, spriteWidth: number, spriteHeight: number, options: SpritesheetToSpritesOptions = {}): Promise<Array<Sprite>> {
  const name = options.name ? options.name : 'sprite';

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  // If the `atlas` is not a `HTMLImageElement` then we throw an error as we no
  // longer handle loading in the parse methods.
  if (spritesheet instanceof HTMLImageElement === false) {
    throw new Error('The atlas provided is not a `HTMLImageElement`. If you need to load the atlas first, use the loader methods before passing it to the parser.');
  }

  canvas.width = spriteWidth;
  canvas.height = spriteHeight;

  // We need to know how many rows and columns of images we need to download.
  // This only works if all of the individual sprites in the spritesheet are
  // the same width and height.
  let cols = Math.floor(spritesheet.width / spriteWidth);
  let rows = Math.floor(spritesheet.height / spriteHeight);

  let locX = 0;
  let locY = 0;
  let counter = 1;

  const sprites: Array<Sprite> = [];

  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      // Draw the portion of the spritesheet where the current sprite should be to the canvas.
      ctx.drawImage(spritesheet, locX, locY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

      locX += spriteWidth;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create the sprite object and add it to the `sprites` Array.
      const spriteImage = new Image();
      spriteImage.src = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

      const sprite: Sprite = {
        name: `${name}_${counter}`,
        x: locX,
        y: locY,
        width: spriteWidth,
        height: spriteHeight,
        image: spriteImage,
      };

      sprites.push(sprite);
      counter++;
    }

    locY += spriteHeight;
    locX = 0;
  }

  if (options.download) {
    sprites.forEach((sprite, index) => {
      // To download the sprites we need to create an anchor tag with the download link
      // set to the location of the sprite's `src`. We then click on the link to initiate
      // the download and then remove the link from the DOM.
      const link = document.createElement('a');
      link.href = sprite.image.src;
      link.download = `${sprite.name}_${index}.png`;

      link.click();
      link.remove();
    });
  }

  return sprites;
}

/**
 * Returns the individual sprites of an atlas. An atlas is a spritesheet in which
 * the sprites are in different orders and sizes with their positions defined by
 * a JSON or XML file.
 * 
 * @async
 * 
 * @param {HTMLImageElement} resource The texture atlas image element or the path to the texture atlas to parse.
 * @param {Object|XMLDocument} definition The file or string contents of the file that contains the positions of the sprites.
 * @param {AtlasToSpritesOptions} [options]
 * @param {string} [options.crossOrigin=''] Sets the cross-origin property of the atlas if the atlas is hosted elsewhere.
 * @param {boolean} [options.download=false] Indicates whether the sprites should be downloaded after they're retrieved or not.
 * 
 * @returns {Promise<Array<HTMLImageElement>>} Returns the individual sprites from the atlas.
 */
export async function atlasToSprites(atlas: HTMLImageElement, definition: (Object | XMLDocument), options: AtlasToSpritesOptions = {}): Promise<Array<Sprite>> {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

  // If the `atlas` is not a `HTMLImageElement` then we throw an error as we no
  // longer handle loading in the parse methods.
  if (atlas instanceof HTMLImageElement === false) {
    throw new Error('The atlas provided is not a `HTMLImageElement`. If you need to load the atlas first, use the loader methods before passing it to the parser.');
  }

  const sprites: Array<Sprite> = [];

  // Find out what type of data was provided, XML or JSON. If it's neither of
  // those then we throw an error.
  let dataType;
  if (definition instanceof XMLDocument) dataType = 'xml';
  else if (definition instanceof Object) dataType = 'json';
  else throw new Error('The definition must be either XML or JSON');

  switch (dataType) {
    case 'xml':
      const xmlDefinition = definition as XMLDocument;

      // We want to get all nodes that have a `name`, `x`, and `y`, `width`, and 
      // `height` attributes.
      let spriteEntries: NodeListOf<AtlasSpriteData> = xmlDefinition.querySelectorAll('[x][y][width][height]');

      // If the above is empty then maybe the `height` and `width` attributes are
      // actually `w` or `h` so we check for that.
      if (spriteEntries.length === 0) spriteEntries = xmlDefinition.querySelectorAll('[x][y][w][h]');

      // If both of those are still empty then we can't proceed. Maybe in later
      // updates we'll make this more flexible but I haven't found cases for it
      // yet in the atlas' I've used.
      if (spriteEntries.length === 0) throw new Error('Could not find any rows with `x`, `y`, `width`, or `height` attributes');

      spriteEntries.forEach(entry => {
        // Save keep track of the sprite's width and height and then we check to
        // see if a `rotated` attribute exists.
        const width = parseInt(entry.getAttribute('width')! || entry.getAttribute('w')!);
        const height = parseInt(entry.getAttribute('height')! || entry.getAttribute('h')!);

        const isRotated = Boolean(entry.getAttribute('rotated'));
        const spriteWidth = isRotated ? height : width;
        const spriteHeight = isRotated ? width : height;

        const x = parseInt(entry.getAttribute('x')!);
        const y = parseInt(entry.getAttribute('y')!);

        // Set the canvas to the size of the sprite and then draw the sprite onto the canvas.
        canvas.width = spriteWidth;
        canvas.height = spriteHeight;

        ctx.drawImage(atlas, x, y, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

        const spriteImage = new Image();
        spriteImage.src = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

        // Lastly we create the the Sprite object and add it to `sprites`.
        const sprite: Sprite = {
          name: entry.getAttribute('name')!,
          x: x,
          y: y,
          width: spriteWidth!,
          height: spriteHeight!,
          image: spriteImage,
        };
        sprites.push(sprite);
      });
      break;
    case 'json':
      break;
  }

  if (options.download) {
    sprites.forEach(sprite => {
      // If the `download` option is set to `true` when we go through each sprite
      // in the `sprites` Array, create an anchor element with the `href` attribute
      // set to the sprite's `src` attribute, click on it to initiate the download
      // and finally remove it from the DOM.
      const link = document.createElement('a');
      link.href = sprite.image.src;
      link.download = sprite.name;
      link.click();
      link.remove();
    });
  }

  return sprites;
}
