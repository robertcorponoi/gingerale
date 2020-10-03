'use strict'

import { atlasToSprites, loadSpritesheet, loadXML } from '../gingerale.js';

describe('Getting individual sprites from an atlas', () => {
    it('should load an atlas using the resource-loader and parse it into individual sprites', async function () {
        const loader = new Loader();

        loader
            .add('foliagePackSpritesheet', './assets/atlas/xml/foilage_pack/foliagePack_default.png')
            .add('foliagePackXML', './assets/atlas/xml/foilage_pack/foliagePack_default.xml')
            .load(async function (_, resources) {
                const sprites = await atlasToSprites(resources.foliagePackSpritesheet.data, resources.foliagePackXML.data).catch(err => { throw err; });

                chai.expect(sprites.length).to.equal(106);;
            });
    });

    it('should set the correct width and heights for sprites', async function () {
        const loader = new Loader();

        loader
            .add('foliagePackSpritesheet', './assets/atlas/xml/foilage_pack/foliagePack_default.png')
            .add('foliagePackXML', './assets/atlas/xml/foilage_pack/foliagePack_default.xml')
            .load(async function (_, resources) {
                const sprites = await atlasToSprites(resources.foliagePackSpritesheet.data, resources.foliagePackXML.data).catch(err => { throw err; });

                chai.expect(sprites[4].image.width).to.equal(102);
                chai.expect(sprites[4].image.height).to.equal(207);

                chai.expect(sprites[37].image.width).to.equal(122);
                chai.expect(sprites[37].image.height).to.equal(172);

                chai.expect(sprites[90].image.width).to.equal(64);
                chai.expect(sprites[90].image.height).to.equal(64);

                chai.expect(sprites[100].image.width).to.equal(64);
                chai.expect(sprites[100].image.height).to.equal(64);

                chai.expect(sprites[105].image.width).to.equal(15);
                chai.expect(sprites[105].image.height).to.equal(15);
            });
    });

    it('should set the names for the sprites', async function () {
        const loader = new Loader();

        loader
            .add('foliagePackSpritesheet', './assets/atlas/xml/foilage_pack/foliagePack_default.png')
            .add('foliagePackXML', './assets/atlas/xml/foilage_pack/foliagePack_default.xml')
            .load(async function (_, resources) {
                const sprites = await atlasToSprites(resources.foliagePackSpritesheet.data, resources.foliagePackXML.data).catch(err => { throw err; });

                chai.expect(sprites[4].name).to.equal('foliagePack_005.png');
                chai.expect(sprites[37].name).to.equal('foliagePack_038.png');
                chai.expect(sprites[90].name).to.equal('foliagePack_leaves_029.png');
                chai.expect(sprites[100].name).to.equal('foliagePack_leaves_039.png');
                chai.expect(sprites[105].name).to.equal('foliagePack_leaves_044.png');
            });
    });

    it('should set the (x, y) for the sprites', async function () {
        const loader = new Loader();

        loader
            .add('foliagePackSpritesheet', './assets/atlas/xml/foilage_pack/foliagePack_default.png')
            .add('foliagePackXML', './assets/atlas/xml/foilage_pack/foliagePack_default.xml')
            .load(async function (_, resources) {
                const sprites = await atlasToSprites(resources.foliagePackSpritesheet.data, resources.foliagePackXML.data).catch(err => { throw err; });

                chai.expect(sprites[4].x).to.equal(483);
                chai.expect(sprites[4].y).to.equal(588);

                chai.expect(sprites[37].x).to.equal(151);
                chai.expect(sprites[37].y).to.equal(208);

                chai.expect(sprites[90].x).to.equal(889);
                chai.expect(sprites[90].y).to.equal(192);

                chai.expect(sprites[100].x).to.equal(827);
                chai.expect(sprites[100].y).to.equal(449);

                chai.expect(sprites[105].x).to.equal(500);
                chai.expect(sprites[105].y).to.equal(1000);
            });
    });

    it('should use `loadSpritesheet` and `loadXML` to load the files before they are passed to the parser', async function () {
        const spritesheet = await loadSpritesheet('./assets/atlas/xml/foilage_pack/foliagePack_default.png').catch(err => { throw err; });
        const xml = await loadXML('./assets/atlas/xml/foilage_pack/foliagePack_default.xml').catch(err => { throw err; });

        const sprites = await atlasToSprites(spritesheet, xml).catch(err => { throw err; });

        chai.expect(sprites.length).to.equal(106);
    });
});
