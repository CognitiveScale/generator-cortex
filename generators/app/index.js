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

'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    _defaultProjectName() {
        return this.appname
    }

    _defaultProjectPrefix() {
        return this.appname.toLowerCase()
    }

    prompting() {
      return this.prompt([{
        type    : 'input',
        name    : 'projectName',
        message : 'Your project name',
        default : this._defaultProjectName(),
        store   : true
      }, {
        type    : 'input',
        name    : 'projectPrefix',
        message : 'Your project prefix',
        default : this._defaultProjectPrefix(),
        store   : true
      }]).then((answers) => {
        this.log('Project Name  ', answers.projectName);
        this.log('Project Prefix', answers.projectPrefix);
        this.config.set('projectName',   answers.projectName)
        this.config.set('projectPrefix', answers.projectPrefix)
      });
    }

    writing() {
        this.fs.copyTpl( this.templatePath('**/*'), this.destinationRoot(), this.config.getAll())
    }
};
