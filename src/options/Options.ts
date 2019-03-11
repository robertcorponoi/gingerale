'use strict'

/**
 * Defines the structure of the options that can be passed to any Gingerale
 * method along with their defaults.
 * 
 * @author Robert Corponoi <robertcorponoi@gmail.com>
 * 
 * @version 0.1.0
 */
export default class Options {

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
	name: string = '';

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
	crossOrigin: string = '';

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
	download: boolean = false;

	/**
	 * @param {Object} options The options passed to the Gingerale method being used.
	 */
	constructor(options: Object) {

		Object.assign(this, options);

	}

}