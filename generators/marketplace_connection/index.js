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
            // Make sure connectionDefinition is object when called from command line
            this.options.connectionDefinition = JSON.parse(this.options.connectionDefinition);
        } catch(e) {
            // Do nothing
        }

        const { error, value } = Joi.validate(this.options.connectionDefinition, ConnectionSchema);
        if (error) {
            throw new Error(`Invalid connection definition: ${error.details[0].message}`);
        }

        this.options.connectionName = this.options.connectionDefinition.name;
        this.options.connectionTitle = this.options.connectionDefinition.title;
        this.options.connectionSummary = this.options.connectionDefinition.description;
        
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
            this.options.connectionAuthor     = answers.connectionAuthor;
            this.options.connectionPriceUnit     = answers.connectionPriceUnit;
            this.options.connectionPriceValue     = answers.connectionPriceValue;
        });
    }

    writing() {
        const connectionName = this.options.connectionName;
        const connectionDir = path.join('connections', connectionName);

        const connectionDefinitionPath = this.destinationPath(path.join(connectionDir, 'resource.yaml'));

        this.log(`Creating resource.yaml for connection ${connectionName} in`, connectionDir);
        this.fs.copyTpl(this.templatePath('resource.yaml'), connectionDefinitionPath, this.options);

        const buildConnectionTemplate = path.join('scripts', process.platform, 'build-connection.sh');
        const buildConnectionPath = this.destinationPath(path.join(connectionDir, 'build-connection.sh'));

        this.log(`Creating build script for ${connectionName} in`, connectionDir);
        this.fs.copyTpl(this.templatePath(buildConnectionTemplate), buildConnectionPath, this.options);

        const publishConnectionTemplate = path.join('scripts', process.platform, 'publish-connection.sh');
        const publishConnectionPath = this.destinationPath(path.join(connectionDir, 'publish-connection.sh'));

        this.log(`Creating publish script for ${connectionName} in`, connectionDir);
        this.fs.copyTpl(this.templatePath(publishConnectionTemplate), publishConnectionPath, this.options);
    }
};
