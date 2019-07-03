'use strict'

import GeneralOptions from './GeneralOptions';

/**
 * Options that extend the general options and apply to just the `spritesToSpritesheet` function.
 */
export default class SpritesToSpritesheetOptions extends GeneralOptions {
  /**
   * The base path that will apply to all sprite files.
   * 
   * @param {string}
   * 
   * @default ''
   */
  basePath: string = '';

  /**
   * @param {Object} [options] The parameters passed for the options.
   */
  constructor(options?: Object) {
    super();

    Object.assign(this, options);
  }
}