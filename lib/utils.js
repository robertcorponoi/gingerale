'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadSprites = downloadSprites;

/**
 * Downloads the sprites parsed from the spritesheet.
 * 
 * @param {Array<Sprite>} sprites The sprites parsed from the spritesheet.
 */
function downloadSprites(sprites) {
  sprites.forEach(function (sprite) {
    var link = document.createElement('a');
    link.href = sprite.image.src;
    link.download = sprite.name;
    link.click();
    link.remove();
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy50cyJdLCJuYW1lcyI6WyJkb3dubG9hZFNwcml0ZXMiLCJzcHJpdGVzIiwiZm9yRWFjaCIsInNwcml0ZSIsImxpbmsiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJocmVmIiwiaW1hZ2UiLCJzcmMiLCJkb3dubG9hZCIsIm5hbWUiLCJjbGljayIsInJlbW92ZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFJQTs7Ozs7QUFLTyxTQUFTQSxlQUFULENBQXlCQyxPQUF6QixFQUFpRDtBQUNwREEsRUFBQUEsT0FBTyxDQUFDQyxPQUFSLENBQWdCLFVBQUFDLE1BQU0sRUFBSTtBQUN0QixRQUFNQyxJQUFJLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixHQUF2QixDQUFiO0FBQ0FGLElBQUFBLElBQUksQ0FBQ0csSUFBTCxHQUFZSixNQUFNLENBQUNLLEtBQVAsQ0FBYUMsR0FBekI7QUFDQUwsSUFBQUEsSUFBSSxDQUFDTSxRQUFMLEdBQWdCUCxNQUFNLENBQUNRLElBQXZCO0FBRUFQLElBQUFBLElBQUksQ0FBQ1EsS0FBTDtBQUNBUixJQUFBQSxJQUFJLENBQUNTLE1BQUw7QUFDSCxHQVBEO0FBUUgiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCB7IFNwcml0ZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9zcHJpdGUnO1xyXG5cclxuLyoqXHJcbiAqIERvd25sb2FkcyB0aGUgc3ByaXRlcyBwYXJzZWQgZnJvbSB0aGUgc3ByaXRlc2hlZXQuXHJcbiAqIFxyXG4gKiBAcGFyYW0ge0FycmF5PFNwcml0ZT59IHNwcml0ZXMgVGhlIHNwcml0ZXMgcGFyc2VkIGZyb20gdGhlIHNwcml0ZXNoZWV0LlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRvd25sb2FkU3ByaXRlcyhzcHJpdGVzOiBBcnJheTxTcHJpdGU+KSB7XHJcbiAgICBzcHJpdGVzLmZvckVhY2goc3ByaXRlID0+IHtcclxuICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgIGxpbmsuaHJlZiA9IHNwcml0ZS5pbWFnZS5zcmM7XHJcbiAgICAgICAgbGluay5kb3dubG9hZCA9IHNwcml0ZS5uYW1lO1xyXG5cclxuICAgICAgICBsaW5rLmNsaWNrKCk7XHJcbiAgICAgICAgbGluay5yZW1vdmUoKTtcclxuICAgIH0pO1xyXG59Il19