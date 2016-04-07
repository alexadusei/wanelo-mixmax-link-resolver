/**
 * Created by kig on 4/6/16.
 */

"use strict";
const fs = require('fs');
const util = require('util');
class SpecHelper {
  constructor() {
  }

  cwd() {
    return process.cwd();
  }

  fs() {
    return fs;
  }

  loadFixture(name) {
    var data = fs.readFileSync(name, { encoding: 'utf8', flags: 'r'});
    return(data);
  }
}

module.exports = SpecHelper;
