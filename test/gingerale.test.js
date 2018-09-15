'use strict'

import { Gingerale } from '../gingerale.js';

// Test the various conversion methods of the Gingerale module.
describe('Gingerale', () => {

  // Test the uniform spritesheet converter which takes a spritesheet with equal width and height
  // sprites and extracts them into an array.
  describe('#uniform()', () => {

    // Make sure it gets 16 image elements from the caveman spritesheet.
    it('should break down the spritesheet into an array of 16 image elements.', async () => {

      const gingerale = new Gingerale();

      const sprites = await gingerale.uniform('../test/assets/spritesheet/caveman.png', 32, 32).catch((err) => console.log(err));

      chai.expect(sprites.length).to.equal(16);

    });

    // Make sure that a random image selected from the generated sprite array has 32px width and 32px height.
    it('should pull a random image from the generated array and its width and height should be 32.', async () => {

      const gingerale = new Gingerale();

      const sprites = await gingerale.uniform('../test/assets/spritesheet/caveman.png', 32, 32).catch((err) => console.log(err));

      const random = Math.floor(Math.random() * Math.floor(15));

      const randomImage = sprites[random];

      const randomImageAttr = { width: randomImage.width, height: randomImage.height };

      chai.expect(randomImageAttr).to.deep.equal({ width: 32, height: 32 });

    });

  });

  // Test the texture atlas spritesheet converter which takes a spritesheet and a JSON file containing
  // the spritesheet's information and extracts them into an array.
  describe('#atlas()', () => {

    // Make sure it gets 9 image elements from the walking texture atlas.
    it('should break down the texture atlas into an array of 9 image elements', async () => {

      const gingerale = new Gingerale();

      const sprites = await gingerale.atlas('../test/assets/atlas/walking.png', '../test/assets/atlas/walking.json');

      console.log(sprites);

      chai.expect(sprites.length).to.equal(9);

    });

  });

});