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
export declare function spritesheetToSprites(src: string, frameWidth: number, frameHeight: number, options?: Object): Promise<Array<HTMLImageElement>>;
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
export declare function atlasToSprites(atlasPath: string, jsonPath: string, options?: Object): Promise<{}>;
