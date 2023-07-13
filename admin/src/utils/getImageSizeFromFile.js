import { getImageSizeFromUri } from './getImageSizeFromUri';

export async function getImageSizeFromFile(file) {
  const uri = URL.createObjectURL(file);
  const size = await getImageSizeFromUri(uri);
  return { width: size.width, height: size.height, uri };
}
