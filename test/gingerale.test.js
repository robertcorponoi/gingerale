"use strict"

import { sheetToSprites } from '../gingerale.js';

describe('#sheetToSprites()', function () {
  it('should create 16 image elements', async function () {
    let sheet = await sheetToSprites('../test/spritesheet_caveman.png', { frameWidth: 32, frameHeight: 32 }).catch((err) => console.log(err));

    chai.expect(sheet.length).to.equal(16);
  });
});