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

const AgentSchema = Joi.object().keys({
    name: Joi.string().required()
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
            // Make sure agentDefinition is object when called from command line
            this.options.agentDefinition = JSON.parse(this.options.agentDefinition);
        } catch(e) {
            // Do nothing as we don't want to show error for cortex cli generator,
            // Because from cortex cli we get agentDefinition as an object
        }

        const { error, value } = Joi.validate(this.options.agentDefinition, AgentSchema);
        if (error) {
            throw new Error(`Invalid agent definition: ${error.details[0].message}`);
        }
        this.options.agentName = this.options.agentDefinition.name;
        this.options.agentTitle = this.options.agentDefinition.title;

        return this.prompt([{
            type    : 'input',
            name    : 'agentSummary',
            message : 'Agent summary: ',
            default : 'Agent Summary'
        },{
            type    : 'input',
            name    : 'agentAuthor',
            message : 'Agent author: ',
            default : 'CognitiveScale'
        },{
            type    : 'input',
            name    : 'agentIcon',
            message : 'Agent icon: ',
            default : 'http://example-icon.png'
        },{
            type    : 'input',
            name    : 'agentPriceUnit',
            message : 'Agent price unit: ',
            default : 'CCU'
        },{
            type    : 'input',
            name    : 'agentPriceValue',
            message : 'Agent price value: ',
            default : '0'
        }]).then((answers) => {
            this.options.agentIcon     = answers.agentIcon;
            const agentAuthor = answers.agentAuthor;
            this.options.agentAuthor     = agentAuthor;
            if (agentAuthor === 'CognitiveScale') {
                this.options.agentAuthor += ' -- Update author';
            }
            this.options.agentSummary     = answers.agentSummary;
            this.options.agentPriceUnit     = answers.agentPriceUnit;
            this.options.agentPriceValue     = answers.agentPriceValue;
        });
    }

    writing() {
        const [, agentName] = getNameAndNamespace(this.options.agentName);
        const agentDir = path.join('agents', agentName);

        const resourceYamlPath = this.destinationPath(path.join(agentDir, 'resource.yaml'));
        this.log(`Creating resource.yaml for agent ${agentName} in`, agentDir);
        this.fs.copyTpl(this.templatePath('resource.yaml'), resourceYamlPath, this.options);

        const agentDescriptionPath = this.destinationPath(path.join(agentDir, 'description.md'));
        this.log(`Creating description.md for agent ${agentName} in`, agentDir);
        this.fs.copyTpl(this.templatePath('description.md'), agentDescriptionPath, this.options);

        const agentScriptTemplate = path.join('scripts', process.platform, '**', '*');
        const agentScriptPath = this.destinationPath(path.join(agentDir));

        this.log(`Creating scripts for ${agentName} in`, agentDir);
        this.fs.copyTpl(this.templatePath(agentScriptTemplate), agentScriptPath, this.options);
    }
};
