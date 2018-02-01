
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const path = require('path');

beforeEach(function() {
  return helpers.run(path.join(__dirname, '../generators/app'))
    .withPrompts({ projectName: 'testproj', projectPrefix: 'tpx' })
});

describe('cortex:app', function() {
  it('generates a root makefile', function() {
      assert.file('Makefile');
  });
});
