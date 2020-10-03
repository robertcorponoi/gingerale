'use strict'

import { spritesheetToSprites, loadSpritesheet } from '../gingerale.js';

describe('Getting individual sprites from a spritesheet', function () {
  it('should load a spritesheet image using the resource-loader and parse it into individual sprites', async function () {
    const loader = new Loader();

    loader
      .add('caveman', './assets/spritesheets/caveman.png')
      .load(async function(_, resources) {
        const sprites = await spritesheetToSprites(resources.caveman.data, 32, 32, { name: 'caveman_walking' }).catch(err => { throw err; });

        chai.expect(sprites.length).to.equal(16);
      });
  });

  it('Individual sprite images returned should have a width and height of 16', async function () {
    const loader = new Loader();

    loader
      .add('caveman', './assets/spritesheets/caveman.png')
      .load(async function (_, resources) {
        const sprites = await spritesheetToSprites(resources.caveman.data, 32, 32).catch(err => { throw err; });

        chai.expect(sprites[0].width).to.equal(32);
        chai.expect(sprites[0].height).to.equal(32);
        chai.expect(sprites[4].width).to.equal(32);
        chai.expect(sprites[4].height).to.equal(32);
        chai.expect(sprites[14].width).to.equal(32);
        chai.expect(sprites[14].height).to.equal(32);
      });
  });

  it('The sprites should have names attached to them defined by the options', async function () {
    const loader = new Loader();

    loader
      .add('caveman', './assets/spritesheets/caveman.png')
      .load(async function (_, resources) {
        const sprites = await spritesheetToSprites(resources.caveman.data, 32, 32, { name: 'walking' }).catch(err => { throw err; });

        chai.expect(sprites[0].name).to.equal('walking_1');
        chai.expect(sprites[4].name).to.equal('walking_5');
        chai.expect(sprites[8].name).to.equal('walking_9');
        chai.expect(sprites[14].name).to.equal('walking_15');
      });
  });

  it('should load the spritesheet loader using the `loadSpritesheet` method and then parse it', async function () {
    const cavemanSpritesheet = await loadSpritesheet('./assets/spritesheets/caveman.png');
    const sprites = await spritesheetToSprites(cavemanSpritesheet, 32, 32, { name: 'caveman_walking' }).catch(err => { throw err; });

    chai.expect(sprites.length).to.equal(16);
  });
});
