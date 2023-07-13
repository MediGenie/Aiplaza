export function getImageSizeFromUri(uri) {
  return new Promise((res, rej) => {
    const image = new Image();
    image.onload = () => {
      res({
        width: image.width,
        height: image.height,
      });
    };
    image.onerror = (e) => {
      rej(e);
    };
    image.src = uri;
  });
}
