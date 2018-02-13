# Developing functions locally
The `cortex-client` library can be installed locally to allow developers to locally develop/test their function before deploying to the cortex functions service.

## Pre-requisites
* Python 3.6.x
* virtualenv or conda env for managing your Python environment

## Setup
Create a virtual or conda environment.

Virtualenv example:
```
virtualenv venv
./venv/bin/activate

```

Conda example:
```
conda env create -n cortex-function python=3.6
source activate cortex-function
```

Install Python dependencies:
```
pip install -r requirements.txt
```

## Deploying a function
These wrapper scripts are available to assist in deploying your function:

* `build.sh` will package the function in build/function.zip
* `deploy.sh` will build and deploy the function via Cortex's function apis
* `test.sh` will invoke the deployed function via Cortex's function api

For more information: https://docs.cortex.insights.ai