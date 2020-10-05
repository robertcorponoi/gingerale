'use strict'

/**
 * The options that can be passed to the `spritesheetToSprites` method.
 */
export interface SpritesheetToSpritesOptions {
    // The name to prepend to each sprite.
    name?: string;
    // The cross-origin property to set when loading the spritesheet if the
    // spritesheet is being loaded from another origin.
    crossOrigin?: string;
}