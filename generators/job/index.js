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
];

function displayStrings(table) {
    return table.reduce(function(acc, entry) {
        acc.push(entry.display);
        return acc
    }, [])
}

function lookupNameByDisplay(table, lookup) {
    return table.filter(entry => entry.display == lookup)[0].name
}

function trimAndFilterEmptyValues(values) {
    return values.split(',').filter(b => b !== '').map( c => c.trim())
}

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    
    initializing() {
        if(this.config.get('projectPrefix'))
            this.options.projectPrefix = this.config.get('projectPrefix')+'/';
        else
            this.options.projectPrefix = 'default/';
    }
    
    prompting() {
        return this.prompt([{
            type    : 'input',
            name    : 'jobName',
            message : 'Job name',
        }, {
            type    : 'list',
            name    : 'technology',
            message : 'Backing technology',
            choices : displayStrings(technologies),
            default : 0
        }, {
            type    : 'input',
            name    : 'image',
            message : 'Image',
        }, {
            type    : 'input',
            name    : 'commands',
            message : 'Commands',
            filter: function(values) {
                return trimAndFilterEmptyValues(values)
            },
            default: ""
        }, {
            type    : 'input',
            name    : 'memory',
            message : 'Memory',
            default : 4096
        }, {
            type    : 'input',
            name    : 'vcpus',
            message : 'VCPUS',
            default : 1
        }, {
            type    : 'input',
            name    : 'environment',
            message : 'Environment',
            filter: function(values) {
                return trimAndFilterEmptyValues(values)
            },
            default : ""
        }]).then((answers) => {

            this.options.projectName   = this.config.get('projectName');
            this.options.projectPrefix = this.config.get('projectPrefix');
            this.options.jobName       = answers.jobName.trim();
            this.options.technology    = answers.technology;
            this.options.image         = answers.image.trim();
            this.options.commands      = answers.commands;
            this.options.memory        = answers.memory;
            this.options.vcpus         = answers.vcpus;
            this.options.environment   = answers.environment;
        });
    }

    writing() {
        const techName = lookupNameByDisplay(technologies, this.options.technology);
        const jobName = this.options.jobName;
        const jobTemplate = techName + '/' + 'common' + '/**/*';
        const jobDir = this.destinationPath('jobs/' + jobName);
        this.log('Creating job', jobName, 'in', jobDir);
        this.fs.copyTpl( this.templatePath(jobTemplate), jobDir, this.options);
    }
};
