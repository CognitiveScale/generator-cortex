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


const connTypes = [
    { 'display': 'MongoDB', 'name': 'mongo' },
    { 'display': 'Managed Content Storage', 'name': 'managedContent' },
    { 'display': 'Postgres SQL', 'name': 'jdbc' },
    { 'display': 'Microsoft SQL Server', 'name': 'jdbc' },
    { 'display': 'MySQL', 'name': 'jdbc' },
    { 'display': 'Hive', 'name': 'jdbc' }
];

function displayStrings(table) {
    return table.reduce(function(acc, entry) {
        acc.push(entry.display);
        return acc;
    }, [])
}

function lookupNameByDisplay(table, lookup) {
    return table.filter(entry => entry.display === lookup)[0].name
}

const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    prompting() {
      return this.prompt([
      {
        type    : 'list',
        name    : 'connType',
        message : 'Connection Type',
        choices : displayStrings(connTypes),
        default : 0
      },
      {
        type    : 'input',
        name    : 'connName',
        message : 'Connection Name'
      },
      {
        type    : 'input',
        name    : 'title',
        message : 'Title'
      },
      {
        type    : 'input',
        name    : 'uri',
        message : 'Connetion URI'
      }]).then((answers) => {
        this.options.projectName   = this.config.get('projectName');
        this.options.projectPrefix = this.config.get('projectPrefix');
        this.options.connType      = answers.connType;
        this.options.connName      = answers.connName;
        this.options.title         = answers.title.trim();
        this.options.uri           = answers.uri;
      });
    }

    writing() {
        const connName = lookupNameByDisplay(connTypes, this.options.connType);

        const commonPath = 'common/**/*';
        const connTemplate = connName + '/**/*';
        const connDir = this.destinationPath('connections/' + connName);
        this.log('Creating connection', connName, 'in', connDir);
        this.fs.copyTpl( this.templatePath(commonPath), connDir, {});
        this.fs.copyTpl( this.templatePath(connTemplate), connDir, this.options);
    }
};
