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


const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    prompting() {
      return this.prompt([
      {
        type    : 'input',
        name    : 'datasetName',
        message : 'Dataset Name'
      },
      {
        type    : 'input',
        name    : 'title',
        message : 'Title'
      },
      {
        type    : 'input',
        name    : 'description',
        message : 'Description'
      },
      {
        type    : 'input',
        name    : 'connectionName',
        message : 'Connetion Name'      // TODO: grab dynamic list from list connections
      },
      {
        type    : 'input',
        name    : 'typeName',
        message : 'Type Name'      // TODO: grab dynamic list from list types
      }]).then((answers) => {
        this.options.projectName    = this.config.get('projectName');
        this.options.projectPrefix  = this.config.get('projectPrefix');
        this.options.datasetName    = answers.datasetName;
        this.options.title          = answers.title.trim();
        this.options.description    = answers.description.trim();
        this.options.connectionName = answers.connectionName;
        this.options.typeName       = answers.typeName;
      });
    }

    writing() {

        // TODO before we create yml check dataset endpoint for name uniqueness.

        const connDetails = 'connectionQuery:\n  - name: query\n    value: --Insert SQL query--\n';
        this.options.connDetails = connDetails;

        const regex = /mongo/i;
        const match = regex.exec(this.options.connectionName);
        if (match) {
            const connDetails = 'connectionQuery:\n  - name: collection\n    value: --Insert Collection name--\n';
            const connDetailsMongo = '  - name: filter\n    value: --Insert Collection filter {}--\n';
            this.options.connDetails = connDetails + connDetailsMongo;
        }

        const commonPath = 'common/**/*';
        const connDir = this.destinationPath('dataset/' + this.options.datasetName);
        this.log('Creating connection', this.options.datasetName, 'in', connDir);
        this.fs.copyTpl( this.templatePath(commonPath), connDir, this.options);
    }
};
