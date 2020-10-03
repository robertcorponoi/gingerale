'use strict'

/**
 * Describes the structure of a Sprite data object when a spritesheet or atlas
 * is being parsed.
 */
export interface Sprite {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
};