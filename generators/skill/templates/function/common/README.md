## Skill development
This skill utilizes the Cortex function service to execute custom code.
The function should be developed and tested before the skill is published to Cortex.
  
Wrapper scripts are provided to assist in developing and deploying your skill.
* `build-function.sh` will package the function in build/function.zip
* `deploy-function.sh` will build and deploy the function via Cortex's function apis
* `test-function.sh` will invoke the deployed function via Cortex's function api
* `deploy-skill.sh` will deploy the skill definition to Cortex's skill catalog

For more information: https://docs.cortex.insights.ai
