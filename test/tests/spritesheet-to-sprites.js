'use strict'

import * as gingerale from '../../../gingerale.js';

describe('Spritesheet to individual sprites', () => {

  it('should take a uniform spritesheet as input and returning an array of individual sprite images', async () => {

    const sprites = await gingerale.spritesheetToSprites('../test/assets/spritesheet/caveman.png', 32, 32).catch(err => { throw err; });

    chai.expect(sprites.length).to.equal(16);

  });

  it('Individual sprite images returned should have a width and height of 16', async () => {

    const sprites = await gingerale.spritesheetToSprites('../test/assets/spritesheet/caveman.png', 32, 32).catch(err => { throw err; });

    chai.expect(sprites[0].width).to.equal(32) &&

      chai.expect(sprites[0].height).to.equal(32) &&

      chai.expect(sprites[4].width).to.equal(32) &&

      chai.expect(sprites[4].height).to.equal(32) &&

      chai.expect(sprites[14].width).to.equal(32) &&

      chai.expect(sprites[14].height).to.equal(32);

  });

  it('The sprites should have a data property of the name set in the options', async () => {

    const sprites = await gingerale.spritesheetToSprites('../test/assets/spritesheet/caveman.png', 32, 32, { name: 'walking' }).catch(err => { throw err; });

    chai.expect(sprites[0].dataset.name).to.equal('walking-1') &&

      chai.expect(sprites[4].dataset.name).to.equal('walking-5') &&

      chai.expect(sprites[8].dataset.name).to.equal('walking-9') &&

      chai.expect(sprites[14].dataset.name).to.equal('walking-15');

  });

});

describe('Atlas to individual sprites', () => {

  it('should return 9 image elements from the `walking` texture atlas', async () => {

    const sprites = await gingerale.atlasToSprites('../test/assets/atlas/walking.png', '../test/assets/atlas/walking.json').catch(err => { throw err; });

    chai.expect(sprites.length).to.equal(9);

  });

});