/**
 * Loads a spritesheet image.
 *
 * @async
 *
 * @param {string} path The path to the spritesheet image to load.
 * @param {string} [crossOrigin=''] The cross-origin property to set for the spritesheet image if loading from an outside source.
 *
 * @returns {Promise<HTMLImageElement>} Returns a promise containing the loaded spritesheet image.
 */
export declare function loadSpritesheet(path: string, crossOrigin?: string): Promise<HTMLImageElement>;
/**
 * Loads an atlas definition file as XML.
 *
 * @async
 *
 * @param {string} path The path to the atlas XML file to load.
 *
 * @returns {Promise<XMLDocument>} Returns a promise containing the loaded XML file.
 */
export declare function loadXML(path: string): Promise<XMLDocument>;
/**
 * Loads an atlas definition file as JSON.
 *
 * @async
 *
 * @param {string} path The path to the atlas JSON file to load.
 *
 * @returns {Promise<Object>} Returns a promise containing the loaded JSON file.
 */
export declare function loadJSON(path: string): Promise<Object>;
