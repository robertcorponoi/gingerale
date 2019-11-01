import GeneralOptions from './interfaces/GeneralOptions';
import SpritesheetToSpritesOptions from './interfaces/SpritesheetToSpritesOptions';
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
export declare function spritesheetToSprites(src: string, frameWidth: number, frameHeight: number, options?: SpritesheetToSpritesOptions): Promise<Array<HTMLImageElement>>;
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
export declare function atlasToSprites(atlasPath: string, jsonPath: string, options?: GeneralOptions): Promise<Array<HTMLImageElement>>;
