# Developing functions locally
The `cortex-client` library can be installed locally to allow developers to locally develop/test their function before deploying to the cortex actions service.

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
pip install -r src/requirements.txt
```

## Unit tests

Run unit tests:
```
python test/test.py
```
