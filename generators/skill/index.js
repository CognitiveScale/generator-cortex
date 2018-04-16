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

const technologies = [
    { 'display': 'Function', 'name': 'function' }
]

const languages = [
    { 'display': 'Python 3', 'name': 'python3' },
    { 'display': 'Python 2', 'name': 'python2' },
    { 'display': 'Node 8', 'name': 'node8' }
]

function displayStrings(table) {
    return table.reduce(function(acc, entry) {
        acc.push(entry.display)
        return acc
    }, [])
}

function lookupNameByDisplay(table, lookup) {
    return table.filter(entry => entry.display == lookup)[0].name
}

const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    initializing() {
        this.options.projectName   = this.config.get('projectName');
        if(this.config.get('projectPrefix'))
            this.options.projectPrefix = this.config.get('projectPrefix') + '/';
        else
            this.options.projectPrefix = '';
    }

    prompting() {
        // Use non-interactive mode if -i specified
        if (this.options.i) {
            return
        }

      return this.prompt([{
        type    : 'input',
        name    : 'skillName',
        message : 'Skill name',
      }, {
        type    : 'list',
        name    : 'technology',
        message : 'Backing technology',
        choices : displayStrings(technologies),
        default : 0
      }, {
        type    : 'list',
        name    : 'language',
        message : 'Implementation language',
        choices : displayStrings(languages),
        default : 0
      }]).then((answers) => {
        this.options.skillName     = answers.skillName;
        this.options.functionName  = answers.skillName;
        this.options.technology    = answers.technology;
        this.options.language      = answers.language;
      });
    }

    writing() {
        const techName = lookupNameByDisplay(technologies, this.options.technology);
        const langName = lookupNameByDisplay(languages,    this.options.language);

        const funcName = this.options.functionName;
        const funcTemplate = techName + '/' + langName + '/**/*';

        const skillName = this.options.skillName;
        const skillTemplate = techName + '/' + 'common' + '/**/*';
        const skillDir = this.destinationPath('skills/' + skillName);
        this.log('Creating', langName, 'function', funcName, 'in', skillDir);
        this.fs.copyTpl( this.templatePath(funcTemplate), skillDir, this.options);
        this.log('Creating skill', skillName, 'in', skillDir);
        this.fs.copyTpl( this.templatePath(skillTemplate), skillDir, this.options);
    }
};
