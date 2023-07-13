const AdmZip = require('adm-zip');
const fs = require('fs');

function main() {
  const ZIP_PATH = './server.zip';
  const custom_module = [];

  const _zipFile = fs.existsSync(ZIP_PATH);
  if (_zipFile) {
    console.log('기존에 존재하는 배포 파일을 제거합니다.');
    fs.unlinkSync(ZIP_PATH);
  }

  const distZip = new AdmZip();

  const ignore = ['node_modules', 'test', 'zip-script.js'].concat(
    custom_module,
  );

  const rootDir = fs.readdirSync('.').filter((v) => !ignore.includes(v));

  rootDir.forEach((file) => {
    const isDir = fs.lstatSync(file).isDirectory();
    if (isDir) {
      distZip.addLocalFolder('./' + file, file);
    } else {
      distZip.addLocalFile('./' + file);
    }
  });

  custom_module.forEach((module_path) => {
    const moduleDir = fs.readdirSync('./' + module_path);
    const module_ignore = ['node_modules'];
    const add_module_file = moduleDir.filter(
      (item) => !module_ignore.includes(item),
    );

    add_module_file.forEach((file) => {
      const file_path = module_path + '/' + file;
      const isDir = fs.lstatSync(file_path).isDirectory();

      if (isDir) {
        distZip.addLocalFolder('./' + file_path, file_path);
      } else {
        distZip.addLocalFile('./' + file_path, module_path);
      }
    });
  });
  try {
    distZip.writeZip(ZIP_PATH);

    console.log(`배포파일을 생성하였습니다. ${ZIP_PATH}`);
  } catch {
    console.log('배포파일을 생성에 실패하였습니다.');
  }
}

main();
