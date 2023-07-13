var program = require('commander');
var rimraf = require('rimraf');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');

var config = require('./config');

function dirParamToPath(dirParam) {
  switch (dirParam) {
    case 'dist':
      return config.distDir;
    case 'serve':
      return config.serveDir;
  }
  return null;
}

var commands = {
  clear: function (value) {
    var targetPath = value;

    if (targetPath) {
      const p = path.join(__dirname, '../', value);
      rimraf.sync(p);

      console.info('Cleared target directory: %s', p);
    }
  },

  create: function (value) {
    var targetPath = value;

    if (targetPath) {
      const p = path.join(__dirname, '../', value);
      mkdirp.sync(p);

      console.info('Created target directory: %s', p);
    }
  },
};

program
  .option('-c, --clear [serve/dist]')
  .option('-cr, --create [serve/dist]')
  .parse(process.argv);

for (var commandName in commands) {
  if (commands.hasOwnProperty(commandName) && program[commandName]) {
    commands[commandName](program[commandName]);
  }
}
