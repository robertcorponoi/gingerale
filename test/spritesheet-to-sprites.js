'use strict'

import * as gingerale from '../gingerale.js';

describe('Spritesheet to individual sprites', () => {
	it('should take a uniform spritesheet as input and returning an array of individual sprite images', async () => {
		try {
			const sprites = await gingerale.spritesheetToSprites('../test/assets/spritesheet/caveman.png', 32, 32);

			chai.expect(sprites.length).to.equal(16);
		}
		catch (err) {
			throw new Error(err);
		}
	});

	it('Individual sprite images returned should have a width and height of 16', async () => {
		try {
			const sprites = await gingerale.spritesheetToSprites('../test/assets/spritesheet/caveman.png', 32, 32);

			chai.expect(sprites[0].width).to.equal(32) &&

				chai.expect(sprites[0].height).to.equal(32) &&

				chai.expect(sprites[4].width).to.equal(32) &&

				chai.expect(sprites[4].height).to.equal(32) &&

				chai.expect(sprites[14].width).to.equal(32) &&

				chai.expect(sprites[14].height).to.equal(32);
		}
		catch (err) {
			throw new Error(err);
		}
	});

	it('The sprites should have a data property of the name set in the options', async () => {
		try {
			const sprites = await gingerale.spritesheetToSprites('../test/assets/spritesheet/caveman.png', 32, 32, { name: 'walking' });

			chai.expect(sprites[0].dataset.name).to.equal('walking0') &&

				chai.expect(sprites[4].dataset.name).to.equal('walking4') &&

				chai.expect(sprites[8].dataset.name).to.equal('walking8') &&

				chai.expect(sprites[14].dataset.name).to.equal('walking14');

		}
		catch (err) {
			throw new Error(err);
		}
	});
});

describe('Atlas to individual sprites', () => {
	it('should return 9 image elements from the `walking` texture atlas', async () => {
		try {
			const sprites = await gingerale.atlasToSprites('../test/assets/atlas/walking.png', '../test/assets/atlas/walking.json');

			chai.expect(sprites.length).to.equal(9);
		}
		catch (err) {
			throw new Error(err);
		}
	});
});