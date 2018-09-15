'use strict'

/**
 * Gingerale is a spritesheet manipulation tool for the browser.
 * 
 * The uniform spritesheet converter takes a spritesheet with uniform sprite sizes and
 * returns the individual sprites as an array of image elements.
 * 
 * The atlas spritesheet converter takes a spritesheet in the from of a texture atlas
 * along with the JSON reference sheet that defines the details of each sprite and returns
 * the individual sprites as an array of image elements.
 * 
 * @since 1.0.0
 */
export class Gingerale {

  constructor() {

  }

  /**
   * Takes a spritesheet with uniform sized sprites, meaning that every sprite in the
   * spritesheet has the same width and height and returns the individual sprites as
   * HTML image elements.
   * 
   * @since 1.0.0
   * 
   * @param {string} src The path to the spritesheet. 
   * @param {number} frameWidth The width of every sprite in the spritesheet.
   * @param {number} frameHeight The height of every sprite in the spritesheet.
   * 
   * @returns {Array} The individual sprites in an array.
   */
  uniform(src, frameWidth, frameHeight) {

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const spritesheet = new Image();

    return new Promise((resolve, reject) => {

      spritesheet.onload = () => {

        canvas.height = frameHeight;
        canvas.width = frameWidth;

        let rows = Math.floor(spritesheet.height / frameHeight);
        let cols = Math.floor(spritesheet.width / frameWidth);

        let frame;
        let frames = [];

        let locX = 0;
        let locY = 0;

        for (let i = 0; i < rows; ++i) {

          for (let j = 0; j < cols; ++j) {

            ctx.drawImage(spritesheet, locX, locY, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

            frame = new Image();
            frame.src = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

            frames.push(frame);

            locX += frameWidth;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

          }

          locY += frameHeight;
          locX = 0;

        }

        resolve(frames);

      }

      spritesheet.onerror = (err) => {

        reject(err);

      }

      spritesheet.src = src;

    });

  }

  /**
   * Takes a texture atlas spritesheet and the accompanying JSON file and returns the
   * individual sprites as HTML image elements.
   * 
   * @since 1.0.0
   * 
   * @param {string} image The path to the spritesheet.
   * @param {string} json The path to the JSON file.
   * 
   * @returns {Array} The individual sprites in an array.
   */
  atlas(image, json) {

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const spritesheet = new Image();

    return new Promise((resolve, reject) => {

      spritesheet.onload = () => {

        const reference = new XMLHttpRequest();

        reference.onreadystatechange = () => {

          if (reference.readyState == 4 && reference.status == 200) {

            const spriteData = JSON.parse(reference.responseText);

            let frames = [];

            Object.entries(spriteData.frames).forEach(([name, details]) => {

              let sprite = {
                name: null,
                frame: new Image()
              };

              let frameWidth = details.frame.w;
              let frameHeight = details.frame.h;

              if (details.rotated) {

                frameWidth = details.frame.h;
                frameHeight = details.frame.w;

              }

              canvas.width = frameWidth;
              canvas.height = frameHeight;

              ctx.drawImage(spritesheet, details.frame.x, details.frame.y, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

              sprite.name = name;
              sprite.frame.src = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

              frames.push(sprite);

            });

            resolve(frames);

          }

        };

        reference.onerror = (err) => {

          reject(err);

        };

        reference.open('GET', json);
        reference.send();

      };

      spritesheet.onerror = (err) => {

        reject(err);

      };

      spritesheet.src = image;

    });

    //   this.ox.load.image('tex', src);
    //   this.ox.load.json('ref', json);

    //   this.ox.pack();

    //   return new Promise((resolve, reject) => {

    //     window.addEventListener('musk-ox-load-complete', () => {

    //       const tex = this.ox.get.image('tex');
    //       const ref = this.ox.get.json('ref');

    //       const canvas = document.createElement('canvas');
    //       const ctx = canvas.getContext('2d');

    //       let frames = [];

    //       Object.entries(ref.frames).forEach(([name, details]) => {

    //         let sprite = {
    //           name: null,
    //           frame: new Image()
    //         };

    //         let frameWidth = details.frame.w;
    //         let frameHeight = details.frame.h;

    //         if (details.rotated) {

    //           frameWidth = details.frame.h;
    //           frameHeight = details.frame.w;

    //         }

    //         canvas.width = frameWidth;
    //         canvas.height = frameHeight;

    //         ctx.drawImage(tex, details.frame.x, details.frame.y, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

    //         sprite.name = name;
    //         sprite.frame.src = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

    //         frames.push(sprite);

    //       });

    //       resolve(frames);
    //     });

    //   });

    // }

  }

}