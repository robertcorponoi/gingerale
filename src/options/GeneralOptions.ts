'use strict'

/**
 * Options that apply to all Gingerale functions.
 */
export default class GeneralOptions {
  /**
   * Sets the cross-origin property of the image/images if downloading from an external source.
   * 
   * @property {string}
   * 
   * @default ''
   */
  crossOrigin: string = '';

  /**
   * Indicates whether the resulting image/images should automatically download after the operation is finished.
   * 
   * @property {boolean}
   * 
   * @default false
   */
  download: boolean = false;

  /**
   * @param {Object} [options] The parameters passed for the options.
   */
  constructor(options?: Object) {
    Object.assign(this, options);
  }
}