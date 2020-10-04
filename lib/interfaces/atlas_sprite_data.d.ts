/**
 * Describes the structure of a row detailing a sprite in the definitions file.
 */
export interface AtlasSpriteData extends Element {
    name: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
    w?: number;
    h?: number;
    rotated?: boolean;
}
