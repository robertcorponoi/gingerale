'use strict'

/**
 * The options that can be passed to the `atlasToSprites` method.
 */
export interface AtlasToSpritesOptions {
    // When parsing XML files Gingerale will query the XML for rows that have
    // a x, y, width, and height property. However, since we can't query JSON
    // the same, by default Gingerale will look at the path `frames.$.frame`
    // which frames is the root object, then $ is the individual sprite and
    // finally `frame` is the object that contains the sprite's x, y, width
    // and height data.
    // For example, if you have a data structure like:
    // {
    //    "frames": {
    //       "guy_01.png": {
    //            "frame": { x: 627, y: 1083, w: 158, h: 316 },
    //            ...
    //        }
    //        ...
    //    }
    // }
    // Then you don't need to supply anything as the default path alaready
    // checks for `frames.$.frame`. However, if you you have a structure like:
    // {
    //    "sprites": {
    //       "guy_01.png": {
    //            "x": 627,
    //            "y": 1083,
    //            "w": 158,
    //            "h": 316,
    //            ...
    //        },
    //        ...
    //    }
    // }
    // Then you need to provide a value of `sprites.$` since the x, y, width
    // and height values are all under the base sprite object. Notice that
    // width and height and be w and h, Gingerale doesn't care which is used.
    jsonPropertyPath?: string;

    // The cross-origin property to set when loading the atlas if the atlas is
    // being loaded from another origin.
    crossOrigin?: string;
}