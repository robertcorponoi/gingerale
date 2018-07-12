# Gingerale

Gingerale is a simple browser based tool designed to work with sprites and spritesheets. Currently Gingerale supports turning spritesheets into individual sprites with more functionality being released soon.

## Installation

To use Gingerale, you can install it from npm and import it into your project

```$ npm install --save gingerale```

```js
import { Gingerale } from "./node_modules/gingerale/gingerale.js";

const gingerale = new Gingerale();
```

or you can just download the gingerale.js file and import is as above, just from a different directory.

## API

### **sheetToSprites(image, options)**

The sheetToSprites function is used to transform a single spritesheet into an array of individual sprites.

| Type   | Option | Description |
| ------ | ------ | ----------- |
| string | image  | A path to a local image file which contains the spritesheet
| number | options.frameWidth | The width of the individual sprites in the spritesheet
| number | options.frameHeight | The height of the individual sprites in the spritesheet

Examples:

```js
const gingerale = new Gingerale();

const options = {
  frameWidth: 32,
  frameHeight: 48
};

const sprites = await gingerale.sheetToSprites('./spritesheets/walking.png', options).catch((err) => console.log(err));
// => [img (walking1), img (walking2), img (walking3), img (walking4), etc.]
```

## License

MIT