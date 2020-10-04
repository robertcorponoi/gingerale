import { Sprite } from './interfaces/sprite';
import { AtlasToSpritesOptions } from './options/atlas_to_sprites_options';
import { SpritesheetToSpritesOptions } from './options/spritesheet_to_sprites_options';
import { loadSpritesheet, loadXML, loadJSON } from './loaders';
export { loadXML, loadJSON, loadSpritesheet, };
/**
 * Returns the individual sprites of a uniform spritesheet. A uniform spritesheet
 * is a spritesheet in which all of the individual sprites are the same size and
 * in a uniform fashion. Even if you have a uniform spritesheet but it has a XML
 * or JSON definition file, use `atlasToSprites` instead.
 *
 * @param {HTMLImageElement} spritesheet The spritesheet image element to parse.
 * @param {number} spriteWidth The width of every individual sprite in the spritesheet.
 * @param {number} spriteHeight The height of every individual sprite in the spritesheet.
 * @param {SpritesheetToSpritesOptions} [options] The options that can be passed to this method.
 * @param {string} [options.name='sprite'] Sets the name of the individual sprites and used as the name for the file if downloaded.
 * @param {string} [options.crossOrigin=''] Sets the cross-origin property of the spritesheet if the spritesheet is hosted elsewhere.
 * @param {boolean} [options.download=false] Indicates whether the sprites should be downloaded after they're retrieved or not.
 *
 * @returns {Array<Sprite>} Returns the individual sprites from the spritesheet.
 */
export declare function spritesheetToSprites(spritesheet: HTMLImageElement, spriteWidth: number, spriteHeight: number, options?: SpritesheetToSpritesOptions): Array<Sprite>;
/**
 * Returns the individual sprites of an atlas. An atlas is a spritesheet in which
 * the sprites are in different orders and sizes with their positions defined by
 * a JSON or XML file.
 *
 * @param {HTMLImageElement} spritesheet The texture atlas image element to parse.
 * @param {Object|XMLDocument} definition The XML or JSON file that defines the locations and sizes of the individual sprites in the spritesheet.
 * @param {AtlasToSpritesOptions} [options]
 * @param {string} [options.jsonPropertyPath='frames.$.frame'] The path to the sprite details in the JSON if a JSON definition is provided. See the documentation for the `AtlasToSpritesOptions` for a more in-depth example.
 * @param {string} [options.crossOrigin=''] Sets the cross-origin property of the atlas if the atlas is hosted elsewhere.
 * @param {boolean} [options.download=false] Indicates whether the sprites should be downloaded after they're retrieved or not.
 *
 * @returns {Array<Sprite>} Returns the individual sprites from the atlas.
 */
export declare function atlasToSprites(spritesheet: HTMLImageElement, definition: (Object | XMLDocument), options?: AtlasToSpritesOptions): Array<Sprite>;
