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

const DatasetSchema = Joi.object().keys({
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
            // Make sure datasetDefinition is object when called from command line
            this.options.datasetDefinition = JSON.parse(this.options.datasetDefinition);
        } catch(e) {
            // Do nothing
        }

        const { error, value } = Joi.validate(this.options.datasetDefinition, DatasetSchema);
        if (error) {
            throw new Error(`Invalid dataset definition: ${error.details[0].message}`);
        }
        
        this.options.datasetName = this.options.datasetDefinition.name;
        this.options.datasetTitle = this.options.datasetDefinition.title;
        this.options.datasetSummary = this.options.datasetDefinition.description;

        return this.prompt([{
            type    : 'input',
            name    : 'datasetAuthor',
            message : 'Dataset author: ',
            default : 'CognitiveScale'
        },{
            type    : 'input',
            name    : 'datasetIcon',
            message : 'Dataset icon: ',
            default : 'http://example-icon.png'
        },{
            type    : 'input',
            name    : 'datasetPriceUnit',
            message : 'Dataset price unit: ',
            default : 'CCU'
        },{
            type    : 'input',
            name    : 'datasetPriceValue',
            message : 'Dataset price value: ',
            default : '0'
        }]).then((answers) => {
            this.options.datasetIcon     = answers.datasetIcon;
            this.options.datasetAuthor     = answers.datasetAuthor;
            this.options.datasetPriceUnit     = answers.datasetPriceUnit;
            this.options.datasetPriceValue     = answers.datasetPriceValue;
        });
    }

    writing() {
        const datasetName = this.options.datasetName;
        const datasetDir = path.join('dataset', datasetName);

        const datasetDefinitionPath = this.destinationPath(path.join(datasetDir, 'resource.yaml'));

        this.log(`Creating resource.yaml for dataset ${datasetName} in`, datasetDir);
        this.fs.copyTpl(this.templatePath('resource.yaml'), datasetDefinitionPath, this.options);

        const datasetScriptTemplate = path.join('scripts', process.platform, '**', '*');
        const datasetScriptPath = this.destinationPath(path.join(datasetDir));

        this.log(`Creating scripts for ${datasetName} in`, datasetDir);
        this.fs.copyTpl(this.templatePath(datasetScriptTemplate), datasetScriptPath, this.options);
    }
};
