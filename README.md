<p align="center">
  <img width="250" height="250" src="https://github.com/robertcorponoi/graphics/blob/master/gingerale/gingerale-logo.png?raw=true">
</p>

<h1 align="center">Gingerale</h1>

<p align="center">Gingerale is a simple and easy to use tool for parsing spritesheets and texture atlas' into individual sprites.<p>

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/gingerale.svg?style=flat)](https://www.npmjs.com/package/gingerale)
  [![Known Vulnerabilities](https://snyk.io/test/github/robertcorponoi/gingerale/badge.svg)](https://snyk.io/test/github/robertcorponoi/gingerale)
  ![npm](https://img.shields.io/npm/dt/gingerale)
  [![NPM downloads](https://img.shields.io/npm/dm/gingerale.svg?style=flat)](https://www.npmjs.com/package/gingerale)
  <a href="https://badge.fury.io/js/gingerale"><img src="https://img.shields.io/github/issues/robertcorponoi/gingerale.svg" alt="issues" height="18"></a>
  <a href="https://badge.fury.io/js/gingerale"><img src="https://img.shields.io/github/license/robertcorponoi/gingerale.svg" alt="license" height="18"></a>
  [![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/robertcorponoi)

</div>

**Table of Contents**

- [Installation](#installation)
- [API](#api)
  - [spritesheetToSprites](#spritesheettosprites)
  - [atlasToSprites](#atlastosprites)
- [Loaders](#loaders)
  - [loadSpritesheet](#loadspritesheet)
  - [loadXML](#loadxml)
  - [loadJSON](#loadjson)
- [Tests](#tests)

## **Installation**

To install gingerale, use:

```
$ npm install gingerale
```

Then you can import the modules you need like so:

```js
import {
  // Parsers
  spritesheetToSprites,
  atlasToSprites,

  // Loaders
  loadSpritesheet,
  loadXML,
  loadJSON,
} from 'gingerale';
```

- `spritesheetToSprites` is used to parse a uniform spritesheet (all sprites same size).

- `atlasToSprites` is used to parse a texture atlas that contains a spritesheet and a definition file that defines the locations and sizes of each sprite.

- `loadSpritesheet`, `loadXML`, and `loadJSON` are helper methods to load the spritesheet images or atlas definition files before they are passed to the parser functions.

## **API**

The `spritesheetToSprites` and `atlasToSprites` methods both return the individual sprites of the spritesheet but not as images, instead as an Array of `Sprite` objects.

The `Sprite` objects contain the following data:

- **name** - The name of the sprite.
- **x** - The x position of the sprite on the spritesheet.
- **y** - The y position of the sprite on the spritesheet.
- **width** - The width of the sprite.
- **height** - The height of the sprite.
- **isRotated** - Indicates whether this sprite is rotated or not.
- **image** - The actual `HTMLImageElement` of the sprite.

So if you just care about the sprite image, then you just need the `image` property.

### **spritesheetToSprites**

Gets sprites from a uniform spritesheet. A uniform spritesheet is a spritesheet in which every individual sprite in the provided spritesheet must have the same fixed width and height and they are all in a even rows/columns.

| param  | type   | description                                   | default |
|--------|--------|-----------------------------------------------|---------|
| spritesheet | HTMLImageElement | The path to the spritesheet. | |
| width  | number | The width of each sprite in the spritesheet. | |
| height | number | The height of each sprite in the spritesheet. | |
| options | SpritesheetToSpritesOptions | The options that can be passed to this method. | |
| options.name | string | Sets the name of the individual sprites and used as the name for the file if downloaded. | 'sprite' |
| options.crossOrigin | string | Sets the cross-origin property of the spritesheet if the spritesheet is hosted elsewhere. | '' |
| options.download | boolean | Indicates whether the sprites should be downloaded after they're retrieved or not. | false |

**Example:**

```js
import { loadSpritesheet, spritesheetToSprites } from 'gingerale';

// Load your image using `loadSpritesheet` or something else such as the 'resource-loader' package.
const spritesheet = await loadSpritesheet('./path/to/uniform_spritesheet.png');

// Now you can pass the spritesheet to the method.
const sprites = spritesheetToSprites(spritesheet, 32, 32, { name: 'car' });
```

### **atlasToSprites**

Parses a texture atlas with either a XML or JSON definition file and returns the individual sprites.

| param  | type   | description                                   | default |
|--------|--------|-----------------------------------------------|---------|
| spritesheet | HTMLImageElement | The texture atlas image element to parse. | |
| definition  | (XMLDocument | Object) | The XML or JSON file that defines the locations and sizes of the individual sprites in the spritesheet. | |
| options | SpritesheetToSpritesOptions | The options that can be passed to this method. | |
| options.jsonPropertyPath | The path to the sprite details in the JSON if a JSON definition is provided. See the documentation for the `AtlasToSpritesOptions` for a more in-depth example. | 'frames.$.frame' |
| options.crossOrigin | string | Sets the cross-origin property of the spritesheet if the spritesheet is hosted elsewhere. | '' |
| options.download | boolean | Indicates whether the sprites should be downloaded after they're retrieved or not. | false |

**Important Note About Using JSON**

When parsing XML files gingerale will query the XML like the DOM and therefore it can pretty easily find all elements with a x, y, width, and height. However, since Objects from JSON can't be queried the same, gingerale needs the path to the Object that contains the sprite's x, y, widith, and height. By default, gingerale will look at the path `frames.$.frame` where `frames` is the root Object, `$` is a placeholder for the individual sprite object, and `frame` is the Object that contains the x, y, width, and height values within the individual sprite object. The data structure that this default value works for is:

```json
{
  "frames": {
    "guy_01.png": {
      "frame": { "x": 627, "y": 1083, "w": 158, "h": 316 }
    }
  }
}
```

Now if you have a structure like:

```json
{
  "sprites": {
    "guy_01.png": {
      "x": 627,
      "y": 1083,
      "w": 158,
      "h": 316
    }
  }
}
```

Then you would have to pass a custom value to the `jsonPropertyPath` option of `sprites.$` since the sprite base Object contains the x, y, width, and height values for the sprite.

**Example:**

Using XML:

```js
import { loadSpritesheet, loadXML, atlasToSprites } from 'gingerale';

// Load your image using `loadSpritesheet` and XML using `loadXML` or something else such as the 'resource-loader' package.
const spritesheet = await loadSpritesheet('./path/to/atlas_spritesheet.png');
const definition = await loadXML('./path/to/atlas_spritesheet.xml');

// Now you can pass the them to the method.
const sprites = atlastToSprites(spritesheet, definition);
```

**Example:**

Using JSON:

```js
import { loadSpritesheet, loadJSON, atlasToSprites } from 'gingerale';

// Load your image using `loadSpritesheet` and JSON using `loadJSON` or something else such as the 'resource-loader' package.
const spritesheet = await loadSpritesheet('./path/to/uniform_spritesheet.png');
const definition = await loadJSON('./path/to/atlas_spritesheet.json');

// Now you can pass them to the method.
// Make sure you check out the note about the `jsonPropertyPath` option to see if you need to pass it or not.
const sprites = atlasToSprites(spritesheet, definition);
```

## **Loaders**

The loaders provide a way to load the spritesheet images and definition XMLs and JSON files if you don't want to use an external loader like resource-loader.

### **loadSpritesheet**

Loads a spritesheet image from a path.

| param  | type   | description                                   | default |
|--------|--------|-----------------------------------------------|---------|
| path | string | The path to the spritesheet image to load. | |
| crossOrigin  | string | The cross-origin property to set for the spritesheet image if loading from an outside source. | |

**Example:**

```js
import { loadSpritesheet } from 'gingerale';

const spritesheet = await loadSpritesheet('./path/to/spritesheet.png');
```

### **loadXML**

Loads an atlas definition file as XML.

| param  | type   | description                                   | default |
|--------|--------|-----------------------------------------------|---------|
| path | string | The path to the XML file to load | |

**Example:**

```js
import { loadXML } from 'gingerale';

const xml = await loadXML('./path/to/definition.xml');
```

### **loadJSON**

Loads an atlas definition file as JSON.

| param  | type   | description                                   | default |
|--------|--------|-----------------------------------------------|---------|
| path | string | The path to the JSON file to load | |

**Example:**

```js
import { loadJSON } from 'gingerale';

const json = await loadJSON('./path/to/definition.json');
```

## **Tests**

The tests for gingerale are browser based so to run them you first need to start the local server with:

```bash
$ npm run test
```

and then navigate to `http://localhost:3000` to run the tests.

## **License**

MIT