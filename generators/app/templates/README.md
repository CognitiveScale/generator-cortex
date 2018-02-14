# <%= projectName %>

## Developer pre-requisites
  * Obtain a Cortex account
  * Install Cortex CLI
  * For python3 use python > 3.6
  * For nodejs use nodejs > 8.x

## Adding a Skill

  1. Add the scaffolding for a skill. This will add a new function in `functions/`
     and a new skill in `skills/`

    `cortex skills generate`

  2. Implement the function:
    * For javascript, the code is in `src/index.js`
    * For python functions, the code is in `src/__main__.py`    

For more information: https://docs.cortex.insights.ai
