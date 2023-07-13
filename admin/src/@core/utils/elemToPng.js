import { toBlob } from 'html-to-image';
import { saveAs } from 'file-saver';

const filter = (node) => node.className !== 'button-area';
/**
 *
 * @param {Node} node
 * @param {String} filename
 * @returns {Promise<boolean>} isSuccess
 * @description
 * 성공시 true를 반환
 * 실패시 false를 반환
 * @example
 * const node = document.querySelector('#capture');
 * elemToPng(node,'test.png').then((status:boolean)=>{
 *  console.log(status)
 * });
 */
function elemToPng(node, filename) {
  return new Promise((res) => {
    toBlob(node, { filter })
      .then((dataUrl) => {
        saveAs(dataUrl, `${filename}.png`);
        // down(dataUrl, filename);
        // const a = document.createElement("a");
        // a.download = filename;
        // a.href = dataUrl;
        // a.click();
        res(true);
      })
      .catch((error) => {
        console.log('내려받기 에러: ', error);
        res(false);
      });
  });
}

/**
 *
 * @param {Node} node
 * @returns {Promise<[boolean,Blob]>} isSuccess
 * @description
 * 성공시 true를 반환
 * 실패시 false를 반환
 * @example
 * const node = document.querySelector('#capture');
 * elemToBlob(node).then(([status:boolean,blob:Blob])=>{
 *  console.log(status)
 * });
 */
export function elemToBlob(node) {
  return new Promise((res) => {
    toBlob(node)
      .then((blob) => {
        res([true, blob]);
      })
      .catch(() => {
        res([false, null]);
      });
  });
}

export default elemToPng;
