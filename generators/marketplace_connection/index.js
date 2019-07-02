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


const ConnectionSchema = Joi.object().keys({
    connectionType: Joi.string().required(),
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
            // Make sure connectionDefinition is object when called from command line in non-interactive mode
            this.options.connectionDefinition = JSON.parse(this.options.connectionDefinition);
        } catch(e) {
            // Do nothing as we don't want to show error for cortex cli generator,
            // Because from cortex cli we get connectionDefinition as an object
        }

        const { error, value } = Joi.validate(this.options.connectionDefinition, ConnectionSchema);
        if (error) {
            throw new Error(`Invalid connection definition: ${error.details[0].message}`);
        }

        this.options.connectionName = this.options.connectionDefinition.name;
        this.options.connectionSummary = this.options.connectionDefinition.description;
        this.options.connectionType = this.options.connectionDefinition.connectionType;
        
        return this.prompt([{
            type    : 'input',
            name    : 'connectionAuthor',
            message : 'Connection author: ',
            default : 'CognitiveScale'
        },{
            type    : 'input',
            name    : 'connectionIcon',
            message : 'Connection icon: ',
            default : 'http://example-icon.png'
        },{
            type    : 'input',
            name    : 'connectionPriceUnit',
            message : 'Connection price unit: ',
            default : 'CCU'
        },{
            type    : 'input',
            name    : 'connectionPriceValue',
            message : 'Connection price value: ',
            default : '0'
        }]).then((answers) => {
            this.options.connectionIcon     = answers.connectionIcon;
            const connectionAuthor = answers.connectionAuthor;
            this.options.connectionAuthor     = connectionAuthor;
            if (connectionAuthor === 'CognitiveScale') {
                this.options.connectionAuthor += ' -- Update author';
            }
            this.options.connectionPriceUnit     = answers.connectionPriceUnit;
            this.options.connectionPriceValue     = answers.connectionPriceValue;
        });
    }

    writing() {
        const connectionType = this.options.connectionType;
        const connectionDir = path.join('connections', connectionType);

        const resourceYamlPath = this.destinationPath(path.join(connectionDir, 'resource.yaml'));

        this.log(`Creating resource.yaml for connection type ${connectionType} in`, connectionDir);
        this.fs.copyTpl(this.templatePath('resource.yaml'), resourceYamlPath, this.options);

        const connectionScriptTemplate = path.join('scripts', process.platform, '**', '*');
        const connectionScriptPath = this.destinationPath(path.join(connectionDir));

        this.log(`Creating scripts for ${connectionType} in`, connectionDir);
        this.fs.copyTpl(this.templatePath(connectionScriptTemplate), connectionScriptPath, this.options);
    }
};
