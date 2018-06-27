# GingerAle

GingerAle is a simple spritesheet to sprite converter for the browser. All it needs is a path to a spritesheet and the width and height of the individual sprites and it will return an array of image elements which you can use to display or work with further.

GingerAle is currently expanding functionality with more spritesheet manipulation methods being added so be sure to check back soon.

## Installation

To use GingerAle, you can install it from npm and import it into your project

```$ npm install --save gingerale```

```js
import { sheetToSprites } from "./node_modules/gingerale/gingerale.js";
```

or you can just download the gingerale.js file and import is as above, just from a different directory.

## Example

To use GingerAle, simply import the (currently only) function to convert your spritesheet to individual sprites.

```js
import { sheetToSprites } from "./node_modules/gingerale/gingerale.js";

let sprites = await sheetToSprites("./spritesheets/walking.png", { frameWidth: 32, frameHeight: 48 });
// => [img (walking1), img (walking2), img (walking3), img (walking4), etc.]
```

## License

MIT