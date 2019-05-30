/*
 * Copyright 2019 Cognitive Scale, Inc. All Rights Reserved.
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
        default : 'skill'
      }, {
        type    : 'input',
        name    : 'skillTitle',
        message : 'Skill title: ',
        default : 'Skill'
      },{
        type    : 'input',
        name    : 'skillSummary',
        message : 'Skill summary: ',
        default : 'Skill Summary'
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
      },{
        type    : 'input',
        name    : 'skillPriceUnit',
        message : 'Skill price unit: ',
        default : 'CCU'
      },{
        type    : 'input',
        name    : 'skillPriceValue',
        message : 'Skill price value: ',
        default : '0'
      }]).then((answers) => {
        this.options.skillName     = answers.skillName;
        this.options.skillTitle     = answers.skillTitle;
        this.options.skillIcon     = answers.skillIcon;
        this.options.skillAuthor     = answers.skillAuthor;
        this.options.skillSummary     = answers.skillSummary;
        this.options.skillPriceUnit     = answers.skillPriceUnit;
        this.options.skillPriceValue     = answers.skillPriceValue;
      });
    }

    writing() {
        const skillName = this.options.skillName;
        const skillDir = path.join('skills', skillName);

        const skillDefinitionDir = this.destinationPath(path.join(skillDir, 'resource.yaml'));

        this.log(`Creating resource.yaml for skill ${skillName} in`, skillDir);
        this.fs.copyTpl(this.templatePath('resource.yaml'), skillDefinitionDir, this.options);

        const scriptTemplate = path.join('scripts', process.platform, 'build-skill.sh');
        const skillScriptDir = this.destinationPath(path.join(skillDir, 'build-skill.sh'));

        this.log(`Creating scripts for ${skillName} in`, skillDir);
        this.fs.copyTpl(this.templatePath(scriptTemplate), skillScriptDir, this.options);
    }
};
