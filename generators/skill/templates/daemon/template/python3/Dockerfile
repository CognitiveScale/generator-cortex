FROM c12e/cortex-python-lib:latest-dev
MAINTAINER CognitiveScale.com
COPY ./build/ /app
WORKDIR /app
RUN pip install --no-cache-dir -r requirements.txt
ENTRYPOINT [ "python3", "__main__.py" ]