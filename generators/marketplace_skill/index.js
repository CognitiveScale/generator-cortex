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
const Joi = require('joi');

function getNameAndNamespace(fullName) {
    return fullName.split('/');
}

const SkillSchema = Joi.object().keys({
    name: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required()
}).unknown();

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

        try {
            // Make sure skillDefinition is object when called from command line
            this.options.skillDefinition = JSON.parse(this.options.skillDefinition);
        } catch(e) {
            // Do nothing
        }

        const { error, value } = Joi.validate(this.options.skillDefinition, SkillSchema);
        if (error) {
            throw new Error(`Invalid skill definition: ${error.details[0].message}`);
        }

        [this.options.skillNamespace, this.options.skillName] = getNameAndNamespace(this.options.skillDefinition.name);
        this.options.skillTitle = this.options.skillDefinition.title;
        this.options.skillSummary = this.options.skillDefinition.description;

        return this.prompt([{
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
            this.options.skillIcon     = answers.skillIcon;
            this.options.skillAuthor     = answers.skillAuthor;
            this.options.skillPriceUnit     = answers.skillPriceUnit;
            this.options.skillPriceValue     = answers.skillPriceValue;
        });
    }

    writing() {
        const skillName = this.options.skillName;
        const skillDir = path.join('skills', skillName);

        const skillDefinitionPath = this.destinationPath(path.join(skillDir, 'resource.yaml'));

        this.log(`Creating resource.yaml for skill ${skillName} in`, skillDir);
        this.fs.copyTpl(this.templatePath('resource.yaml'), skillDefinitionPath, this.options);

        const skillScriptTemplate = path.join('scripts', process.platform, '**', '*');
        const skillScriptPath = this.destinationPath(path.join(skillDir));

        this.log(`Creating scripts for ${skillName} in`, skillDir);
        this.fs.copyTpl(this.templatePath(skillScriptTemplate), skillScriptPath, this.options);
    }
};
