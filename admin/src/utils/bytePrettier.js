export function BytePrettier(byte, fixed = 0) {
  let unit = 'Byte';

  let volume = byte;

  if (volume > 1024 * 100) {
    unit = 'KB';

    const multiply = Math.pow(10, fixed);

    volume = Math.floor((volume * multiply) / 1024) / multiply;
  }

  if (volume > 1024 * 100) {
    unit = 'MB';

    const multiply = Math.pow(10, fixed);

    volume = Math.floor((volume * multiply) / 1024) / multiply;
  }
  if (volume > 1024 * 100) {
    unit = 'GB';

    const multiply = Math.pow(10, fixed);

    volume = Math.floor((volume * multiply) / 1024) / multiply;
  }

  return {
    unit,
    volume,
  };
}
