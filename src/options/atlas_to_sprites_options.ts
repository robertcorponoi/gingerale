'use strict'

/**
 * The options that can be passed to the `atlasToSprites` method.
 */
export interface AtlasToSpritesOptions {
    // The cross-origin property to set when loading the atlas if the atlas is
    // being loaded from another origin.
    crossOrigin?: string;
    // Indicates whether the sprites should be downloaded after they are retrieved
    // from the atlas or not.
    download?: boolean;
}