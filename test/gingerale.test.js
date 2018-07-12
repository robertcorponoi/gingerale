'use strict'

import { Gingerale } from '../gingerale.js';

describe('#sheetToSprites()', function () {
  it('should create 16 image elements', async function () {
    const gingerale = new Gingerale();

    const sprites = await gingerale.sheetToSprites('../test/spritesheet_caveman.png', { frameWidth: 32, frameHeight: 32 }).catch((err) => console.log(err));

    chai.expect(sprites.length).to.equal(16);
  });
});