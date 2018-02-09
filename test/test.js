/*
 * Copyright 2018 Cognitive Scale, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the “License”);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an “AS IS” BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
