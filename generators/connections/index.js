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

const path = require('path');

const connTypes = [
    { 'display': 'MongoDB', 'name': 'mongo' },
    { 'display': 'S3 Connection', 'name': 's3' },
    { 'display': 'Postgres SQL', 'name': 'postgresql' },
    { 'display': 'Microsoft SQL Server', 'name': 'mssql' },
    { 'display': 'MySQL', 'name': 'mysql' },
    { 'display': 'Generic JDBC Connection', 'name': 'generic_jdbc', 'contentType' : 'Basic' },
    { 'display': 'Advanced JDBC Connection', 'name': 'generic_jdbc' , 'contentType': 'Advanced'},
    { 'display': 'Hive', 'name': 'hive' } // Fix me dont have one for hive yet
];

const isJdbc = ['postgresql', 'mssql', 'mysql', 'hive', 'generic_jdbc'];

function displayStrings(table) {
    return table.reduce(function(acc, entry) {
        acc.push(entry.display);
        return acc;
    }, [])
}

function lookupNameByDisplay(table, lookup) {
    return table.filter(entry => entry.display === lookup)[0].name
}
function lookupContentType(table, lookup) {
    return table.filter(entry => entry.display === lookup)[0].contentType
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
        name    : 'connTitle',
        message : 'Title'
      },
      {
        when: function (response) {
            return lookupContentType(connTypes, response.connType) !== 'Advanced';
        },
        type    : 'input',
        name    : 'uri',
        message : 'Connection URI'
      },
      {
        when: function (response) {
            return lookupContentType(connTypes, response.connType) === 'Advanced';
        },
        type    : 'input',
        name    : 'plugin_jar',
        message : 'Plugin Jar Managed Content Key'
      },
      {
        type    : 'input',
        name    : 'connAuthor',
        message : 'Connection author: ',
        default : 'CognitiveScale'
      }]).then((answers) => {
        this.options.projectName   = this.config.get('projectName');
        this.options.projectPrefix = this.config.get('projectPrefix');
        this.options.connType      = answers.connType;
        this.options.connName      = answers.connName;
        this.options.connTitle     = answers.connTitle.trim();
        this.options.uri           = answers.uri;
        this.options.plugin_jar    = answers.plugin_jar;
        this.options.contentType   = lookupContentType(connTypes, this.options.connType);

        if(this.options.contentType){
            this.options.contentType = `contentType: ${this.options.contentType}`;
        }
        this.options.connAuthor    = answers.connAuthor;
        this.options.connIcon    = answers.connIcon;
      });
    }

    writing() {
        const connTypeShort = lookupNameByDisplay(connTypes, this.options.connType);

        let templateName = connTypeShort;
        this.options.connTypeShort = connTypeShort;
        if(lookupContentType(connTypes, this.options.connType) === 'Advanced') {
            templateName = 'advanced_jdbc';
        } else if (isJdbc.includes(connTypeShort)) {
            this.options.classname = `org.${connTypeShort}.Driver`;
            templateName = 'jdbc';
        }

        // TODO before we create yml check conneciton endpoint for name uniqueness.

        const scriptPath = path.join('scripts', process.platform, '**','*');
        const connTemplate = path.join('template', templateName, '**', '*');
        const connDir = this.destinationPath(path.join('connections', connTypeShort));
        this.log('Creating connection', connTypeShort, 'in', connDir);
        this.fs.copyTpl( this.templatePath(scriptPath), connDir, this.options);
        this.fs.copyTpl( this.templatePath(connTemplate), connDir, this.options);

        const commonTemplate = path.join('template', 'common', '**', '*');
        this.fs.copyTpl( this.templatePath(commonTemplate), connDir, this.options);
    }
};
