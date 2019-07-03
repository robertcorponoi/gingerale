/**
 * Loads an image and returns a promise containing the image.
 *
 * @async
 *
 * @param {string} path The path to the image to load.
 * @param {string} crossOrigin The cross-origin property to set for this image if loading from an outside source.
 *
 * @returns {Promise<HTMLImageElement>} Returns a promise containing the loaded image.
 */
export declare function image(path: string, crossOrigin?: string): Promise<HTMLImageElement>;
/**
 * Loads data from a file asynchronously and returns it in a JSON format.
 *
 * @param {string} path The path to the file to load.
 *
 * @returns {Promise<any>} Returns the JSON data in a promise.
 */
export declare function XHR(path: string): Promise<any>;
