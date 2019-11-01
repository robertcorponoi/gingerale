'use strict'

/**
 * Defines the structure of options that are available to all functions.
 */
export default interface GeneralOptions {

  /**
   * A cross-origin property that can be used for the image request if using images from an external source.
   */
  crossOrigin?: string;

  /**
   * Indicates whether the resulting image/images shoul download automatically.
   */
  download?: boolean;

};