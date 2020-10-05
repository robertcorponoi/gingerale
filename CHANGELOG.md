## 3.1.0 / 2020-10-04
- [REMOVED] Removed the option to download sprites after parsing. There are issues with downloading so many files and it's best to leave the functionality to the user.
- [MISC] Fixed wording in error thrown in `spritesheetToSprites`.

## 3.0.0 / 2020-10-01
- [FEATURE] Removed spritesheet loading by default. The methods now take an image element and if you need to load them first you can use a loader or use the newly created `loadSpritesheet`, `loadXML` and `loadJSON` methods.
- [FEATURE] Added ability to parse texture atlas' with XML definitions and improved JSON parsing.
- [MISC] Updated dependencies to their latest versions and fixed security vulnerabilities.
- [MISC] Replaced rollup-plugin-babel, rollup-plugin-commonjs, and rollup-plugin-node-resolve with @rollup/plugin-babel, @rollup/plugin-commonjs, and @rollup/plugin-node-resolve.
- [MISC] Added rollup-plugin-terser for smaller file sizes.
- [MISC] Added fastify and fastify-static as dev dependencies to make setting up the test server easier.

## 2.5.3 / 2020-04-17
- [MISC] Updated out-of-date dependencies to their latest versions which also fixed all possible fixed security vulnerabilities.
- [MISC] Changed CHANGELOG format.

## 2.5.2 / 2020-01-17
- [MISC] Updated dev dependencies to their latest version.
- [MISC] Changed license year to reflect new year.
- [MISC] Moved logo to graphics repository and updated the link to it in the README.
- [MISC] Removed unnecessary spacing.

## 2.5.1 / 2019-11-20
=
- [FEATURE] Removed anys in favor of Sprite and SpriteData interfaces.
- [MISC] Updated dependencies to their latest versions.
- [MISC] Added badges to README.

## 2.5.0 / 2019-11-03
=
- [FEATURE] Removed interfaces for options as they just made the code more messy and it wouldn't recognize not passing the options parameter when used in outside projects.

## 2.4.1 / 2019-11-03
=
- [FEATURE] Updated dependencies to their latest versions.
- [MISC] Added more badges to README.

## 2.4.0 / 2019-11-01
=
- Changed options for spritesheet to sprites to an interface.
- Changed the default naming convention of sprites to use a name-number format.
- Changed numbering to start at 1 for readability.

## 2.3.0 / 2019-11-01
=
- [FEATURE] Updated all dev dependencies to their latest version.

## 2.2.1 / 2019-07-17
=
- [HOTFIX] Updated all dev dependencies to their latest versions and fixed any security vulnerabilities found in them.

## 2.2.0
=
- Updated dev dependencies to fix security vulnerabilities from packages.
- Added the babel runtime helper to enable re-use of Babel's injected code.
- Updated the .babelrc and rollup-configl.js file to reflect adding the babel runetime helper.

## 2.1.0
=
- Added Typescript support.

## 2.0.0
=
- Added changelog.
- Removed the class pattern and renamed functions to be more concise.
- Changed from using `on.load` and `on.error` to using `addeventListener` and `removeEventListener`.
- Refactored tests.

## 0.1.0
=
- Initial release.
