import GeneralOptions from './GeneralOptions';
/**
 * Options that extend the general options and apply to just the `spritesheetToSprites` function.
 */
export default class SpritesheetToSpritesOptions extends GeneralOptions {
    /**
     * Sets the name to prepend to each sprite.
     *
     * @param {string}
     *
     * @default ''
     */
    name: string;
    /**
     * @param {Object} [options] The parameters passed for the options.
     */
    constructor(options?: Object);
}
