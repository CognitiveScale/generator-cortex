'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    _defaultProjectName() {
        return this.appname
    }

    _defaultProjectPrefix() {
        return this.appname.toLowerCase()
    }

    prompting() {
      return this.prompt([{
        type    : 'input',
        name    : 'projectName',
        message : 'Your project name',
        default : this._defaultProjectName(),
        store   : true
      }, {
        type    : 'input',
        name    : 'projectPrefix',
        message : 'Your project prefix',
        default : this._defaultProjectPrefix(),
        store   : true
      }]).then((answers) => {
        this.log('Project Name  ', answers.projectName);
        this.log('Project Prefix', answers.projectPrefix);
        this.config.set('projectName',   answers.projectName)
        this.config.set('projectPrefix', answers.projectPrefix)
      });
    }

    writing() {
        this.fs.copyTpl( this.templatePath('**/*'), this.destinationRoot(), this.config.getAll())
    }
};
