'use strict'

import { atlasToSprites, loadSpritesheet, loadJSON } from '../gingerale.js';

describe('Getting individual sprites from an atlas with a JSON definition file', function () {
    it('should load an atlas using the resource-loader and parse it into individual sprites', function () {
        const loader = new Loader();

        loader
            .add('walkingSpritesheet', './assets/atlas/json/walking/walking.png')
            .add('walkingJSON', './assets/atlas/json/walking/walking.json')
            .load(function (_, resources) {
                const sprites = atlasToSprites(resources.walkingSpritesheet.data, resources.walkingJSON.data);

                chai.expect(sprites.length).to.equal(9);
            });
    });

    it('should set the correct width and heights for sprites', function () {
        const loader = new Loader();

        loader
            .add('walkingSpritesheet', './assets/atlas/json/walking/walking.png')
            .add('walkingJSON', './assets/atlas/json/walking/walking.json')
            .load(function (_, resources) {
                const sprites = atlasToSprites(resources.walkingSpritesheet.data, resources.walkingJSON.data);

                setTimeout(function () {
                    chai.expect(sprites[0].image.width).to.equal(1920);
                    chai.expect(sprites[0].image.height).to.equal(1080);

                    chai.expect(sprites[1].image.width).to.equal(316);
                    chai.expect(sprites[1].image.height).to.equal(158);

                    chai.expect(sprites[5].image.width).to.equal(311);
                    chai.expect(sprites[5].image.height).to.equal(139);

                    chai.expect(sprites[7].image.width).to.equal(314);
                    chai.expect(sprites[7].image.height).to.equal(146);

                    chai.expect(sprites[8].image.width).to.equal(319);
                    chai.expect(sprites[8].image.height).to.equal(161);
                }, 1000);
            });
    });

    it('should set the names for the sprites', function () {
        const loader = new Loader();

        loader
            .add('walkingSpritesheet', './assets/atlas/json/walking/walking.png')
            .add('walkingJSON', './assets/atlas/json/walking/walking.json')
            .load(function (_, resources) {
                const sprites = atlasToSprites(resources.walkingSpritesheet.data, resources.walkingJSON.data);

                chai.expect(sprites[0].name).to.equal('background.png');
                chai.expect(sprites[1].name).to.equal('capguy_01.png');
                chai.expect(sprites[5].name).to.equal('capguy_05.png');
                chai.expect(sprites[7].name).to.equal('capguy_07.png');
                chai.expect(sprites[8].name).to.equal('capguy_08.png');
            });
    });

    it('should set the (x, y) for the sprites', function () {
        const loader = new Loader();

        loader
            .add('walkingSpritesheet', './assets/atlas/json/walking/walking.png')
            .add('walkingJSON', './assets/atlas/json/walking/walking.json')
            .load(function (_, resources) {
                const sprites = atlasToSprites(resources.walkingSpritesheet.data, resources.walkingJSON.data);

                chai.expect(sprites[0].x).to.equal(1);
                chai.expect(sprites[0].y).to.equal(1);

                chai.expect(sprites[1].x).to.equal(627);
                chai.expect(sprites[1].y).to.equal(1083);

                chai.expect(sprites[5].x).to.equal(1570);
                chai.expect(sprites[5].y).to.equal(1083);

                chai.expect(sprites[7].x).to.equal(1254);
                chai.expect(sprites[7].y).to.equal(1083);

                chai.expect(sprites[8].x).to.equal(306);
                chai.expect(sprites[8].y).to.equal(1083);
            });
    });

    it('should use `loadSpritesheet` and `loadJSON` to load the files before they are passed to the parser', async function () {
        const spritesheet = await loadSpritesheet('./assets/atlas/json/walking/walking.png').catch(err => { throw err; });
        const json = await loadJSON('./assets/atlas/json/walking/walking.json').catch(err => { throw err; });

        const sprites = atlasToSprites(spritesheet, json);

        chai.expect(sprites.length).to.equal(9);
    });
});
