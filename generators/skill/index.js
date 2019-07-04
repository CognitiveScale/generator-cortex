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

const path = require('path');

const technologies = [
    { 'display': 'Function', 'name': 'function' },
    { 'display': 'Daemon', 'name': 'daemon' }
];

const languages = [
    { 'display': 'Python 3', 'name': 'python3', 'deploymentType': 'python:3', 'command': '[ "python3", "__main__.py" ]', 'port': 5000 },
    { 'display': 'Python 2', 'name': 'python2', 'deploymentType': 'python:2', 'command': '[ "python2", "__main__.py" ]', 'port': 5000  },
    { 'display': 'Node 8', 'name': 'node8', 'deploymentType': 'nodejs:8', 'command': '[ "node", "index.js" ]', 'port': 5000  }
];

function displayStrings(table) {
    return table.reduce(function(acc, entry) {
        acc.push(entry.display)
        return acc
    }, [])
}

function lookupByDisplay(table, lookup) {
    return table.filter(entry => entry.display === lookup)[0];
}
const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    initializing() {
        this.options.projectName   = this.config.get('projectName');
        if(this.config.get('projectPrefix'))
            this.options.projectPrefix = this.config.get('projectPrefix')+'/';
        else
            this.options.projectPrefix = 'default/';
    }

    prompting() {
        // Use non-interactive mode if -i specified
        if (this.options.i) {
            return
        }

      return this.prompt([{
        type    : 'input',
        name    : 'skillName',
        message : `Skill name: ${this.options.projectPrefix}`,
        validate: (input)=> {
            const regex = new RegExp('([^:.a-zA-Z0-9_-])');
            const match = input.match(regex);
            if (match) {
                return `illegal character: ${match[1]}`;
            }
            else {
                return true;
            }
            
        },
        default : "skill"
      }, {
        type    : 'list',
        name    : 'technology',
        message : 'Backing technology',
        choices : displayStrings(technologies),
        default : 0
      },{
        when: 'technology.deamon',
        type: 'input',
        name: 'privateRegistry',
        message: 'Private Docker Registry',
        default : 'private-registry.cortex.insights.ai'
      },{
        type    : 'input',
        name    : 'profile',
        message : 'Cortex Profile',
        choices : displayStrings(languages),
        default : 'default'
      },{
        type    : 'list',
        name    : 'language',
        message : 'Implementation language',
        choices : displayStrings(languages),
        default : 0
      },{
            type    : 'input',
            name    : 'skillAuthor',
            message : 'Skill author: ',
            default : 'CognitiveScale'
        },{
            type    : 'input',
            name    : 'skillIcon',
            message : 'Skill icon: ',
            default : 'http://example-icon.png'
        }]).then((answers) => {
        this.options.skillName     = answers.skillName;
        this.options.functionName  = answers.skillName;
        this.options.technology    = answers.technology;
        this.options.language      = answers.language;
        this.options.privateRegistry      = answers.privateRegistry;
        this.options.profile      = answers.profile;
        this.options.skillAuthor      = answers.skillAuthor;
        this.options.skillIcon      = answers.skillIcon;
      });
    }

    writing() {
        const techName = lookupByDisplay(technologies, this.options.technology).name;
        const langName = lookupByDisplay(languages,    this.options.language).name;

        this.options.deploymentType = lookupByDisplay(languages, this.options.language).deploymentType;
        this.options.command = lookupByDisplay(languages, this.options.language).command;
        this.options.port = lookupByDisplay(languages, this.options.language).port;

        const funcName = this.options.functionName;
        const funcTemplate = path.join(techName,'template', langName, '**', '*');

        const skillName = this.options.skillName;
        const skillTemplate = path.join(techName,'template', 'common', '**', '*');
        const skillDir = this.destinationPath(path.join('skills', skillName));

        this.log('Creating', langName, 'function', funcName, 'in', skillDir);
        this.fs.copyTpl( this.templatePath(funcTemplate), skillDir, this.options);

        this.log('Creating skill', skillName, 'in', skillDir);
        this.fs.copyTpl( this.templatePath(skillTemplate), skillDir, this.options);

        const scriptTemplate = path.join(techName, 'scripts', langName, process.platform, '**', '*');
        const scriptCommonTemplate = path.join(techName, 'scripts', 'common', process.platform, '**', '*');

        this.log('Creating scripts for', skillName, 'in', skillDir);

        // Process common template FIRST, then allow any lang specific scripts to override.
        this.fs.copyTpl( this.templatePath(scriptCommonTemplate), skillDir, this.options);
        this.fs.copyTpl( this.templatePath(scriptTemplate), skillDir, this.options, null, { ignoreNoMatch: true });
    }
};
