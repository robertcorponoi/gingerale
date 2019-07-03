'use strict'

/**
 * Loads an image and returns a promise containing the image.
 *
 * @async
 *
 * @param {string} path The path to the image to load.
 * @param {string} crossOrigin The cross-origin property to set for this image if loading from an outside source.
 *
 * @returns {Promise<HTMLImageElement>} Returns a promise containing the loaded image.
 */
export async function image(path: string, crossOrigin: string = ''): Promise<HTMLImageElement> {

  const image: HTMLImageElement = new Image();

  return new Promise((resolve, reject) => {

    image.addEventListener('load', () => {

      resolve(image);

    });

    image.addEventListener('error', (error) => {

      reject(error);

    });

    image.src = path;

    if (crossOrigin) image.crossOrigin = crossOrigin;

  });

}


/**
 * Loads data from a file asynchronously and returns it in a JSON format.
 * 
 * @param {string} path The path to the file to load.
 * 
 * @returns {Promise<any>} Returns the JSON data in a promise.
 */
export async function XHR(path: string): Promise<any> {

  return new Promise((resolve, reject) => {

    const xhr: XMLHttpRequest = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {

      if (xhr.readyState === 4 && xhr.status === 200) {

        const response: any = JSON.parse(xhr.responseText);

        resolve(response);

      }

    });

    xhr.addEventListener('error', (error) => {

      reject(error);

    });

    xhr.open('GET', path);
    xhr.send();

  });

}
