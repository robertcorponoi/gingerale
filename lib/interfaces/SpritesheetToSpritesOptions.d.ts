import GeneralOptions from './GeneralOptions';
export default interface SpritesheetToSpritesOptions extends GeneralOptions {
    /**
     * The name to prepend to each sprite.
     *
     * By default this will use the name of the spritesheet.
     */
    name?: string;
}
