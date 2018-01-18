'use strict';

const technologies = [
    { 'display': 'Openwhisk Function', 'name': 'openwhisk' }
]

const languages = [
    { 'display': 'Python 2', 'name': 'python2' },
    { 'display': 'Python 3', 'name': 'python3' }
]

function displayStrings(table) {
    return table.reduce(function(acc, entry) {
        acc.push(entry.display)
        return acc
    }, [])
}

function lookupNameByDisplay(table, lookup) {
    return table.filter(entry => entry.display == lookup)[0].name
}

const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    prompting() {
      return this.prompt([{
        type    : 'input',
        name    : 'skillName',
        message : 'Skill name',
      }, {
        type    : 'list',
        name    : 'technology',
        message : 'Backing technology',
        choices : displayStrings(technologies),
        default : 0
      }, {
        type    : 'list',
        name    : 'language',
        message : 'Implementation language',
        choices : displayStrings(languages),
        default : 0
      }]).then((answers) => {
        this.options.projectName = this.config.get('projectName');
        this.options.skillName = answers.skillName;
        this.options.technology = answers.technology;
        this.options.language = answers.language;
      });
    }

    writing() {
        const techName = lookupNameByDisplay(technologies, this.options.technology);
        const langName = lookupNameByDisplay(languages,    this.options.language);

        const funcName = this.options.skillName
        const funcTemplate = techName + '/' + langName + '/**/*'
        const funcDir = this.destinationPath('functions/' + funcName)
        this.log('Creating', langName, 'function', funcName, 'in', funcDir)
        this.fs.copyTpl( this.templatePath(funcTemplate), funcDir, this.options)

        const skillName = this.options.skillName
        const skillTemplate = techName + '/' + 'common' + '/**/*'
        const skillDir = this.destinationPath('skills/' + skillName)
        this.log('Creating skill', skillName, 'in', skillDir)
        this.fs.copyTpl( this.templatePath(skillTemplate), skillDir, this.options)
    }
};
