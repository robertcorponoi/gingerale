'use strict'

import { Sprite } from './interfaces/sprite';

/**
 * Downloads the sprites parsed from the spritesheet.
 * 
 * @param {Array<Sprite>} sprites The sprites parsed from the spritesheet.
 */
export function downloadSprites(sprites: Array<Sprite>) {
    sprites.forEach(sprite => {
        const link = document.createElement('a');
        link.href = sprite.image.src;
        link.download = sprite.name;

        link.click();
        link.remove();
    });
}