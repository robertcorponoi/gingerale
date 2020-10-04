'use strict'

/**
 * Loads a spritesheet image.
 * 
 * @async
 * 
 * @param {string} path The path to the spritesheet image to load.
 * @param {string} [crossOrigin=''] The cross-origin property to set for the spritesheet image if loading from an outside source.
 * 
 * @returns {Promise<HTMLImageElement>} Returns a promise containing the loaded spritesheet image. 
 */
export async function loadSpritesheet(path: string, crossOrigin?: string): Promise<HTMLImageElement> {
  const spritesheet = new Image();

  return new Promise((resolve, reject) => {
    // When the image has emitted the loaded event we resolve the promise with
    // the image.
    spritesheet.addEventListener('load', () => resolve(spritesheet));
    // If the image has emitted the error event we reject the promise with the
    // error.
    spritesheet.addEventListener('error', (error) => reject(error));

    spritesheet.src = path;
    if (crossOrigin) spritesheet.crossOrigin = crossOrigin;
  });
}

/**
 * Loads an atlas definition file as XML.
 * 
 * @async
 * 
 * @param {string} path The path to the atlas XML file to load.
 * 
 * @returns {Promise<XMLDocument>} Returns a promise containing the loaded XML file.
 */
export async function loadXML(path: string): Promise<XMLDocument> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
      // When the XHR emits the `readystatechange` event we check to see if the `readyState`
      // is 4 and the `status` is 200 to make sure that it's fully loaded. If it is, then we
      // resolve with the parsed `responseXML`.
      if (xhr.readyState === 4 && xhr.status === 200) {
        if (xhr.responseXML) resolve(xhr.responseXML);
        else reject();
      }
    });

    // If the XHR emits the `error` event we reject the Promise with error.
    xhr.addEventListener('error', (error) => reject(error));

    xhr.responseType = 'document';
    xhr.overrideMimeType('text/xml');

    xhr.open('GET', path);
    xhr.send();
  });
}

/**
 * Loads an atlas definition file as JSON.
 * 
 * @async
 * 
 * @param {string} path The path to the atlas JSON file to load.
 * 
 * @returns {Promise<Object>} Returns a promise containing the loaded JSON file.
 */
export async function loadJSON(path: string): Promise<Object> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
      // When the XHR emits the `readystatechange` event we check to see if the `readyState`
      // is 4 and the `status` is 200 to make sure that it's fully loaded. If it is, then we
      // resolve with the parsed `responseText`.
      if (xhr.readyState === 4 && xhr.status === 200) {
        if (xhr.responseText) resolve(JSON.parse(xhr.responseText));
        else reject();
      }
    });

    // If the XHR emits the `error` event we reject the Promise with the error.
    xhr.addEventListener('error', (error) => reject(error));

    xhr.open('GET', path);
    xhr.send();
  });
}