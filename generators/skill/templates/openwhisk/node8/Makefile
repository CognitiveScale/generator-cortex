
ZIP = zip

NODE_MODULES = node_modules
TARGET_DIR   = target
BINARY_NAME  = function.zip
ACTION_KIND  = nodejs:8
ACTION_NAME  = cortex/<%= projectPrefix %>_<%= functionName %>

package: $(NODE_MODULES) $(TARGET_DIR)/$(BINARY_NAME)

clean:
	rm -rf $(TARGET_DIR)

publish: package
	echo == Publishing $(ACTION_NAME) ==
	bx wsk action update $(ACTION_NAME) --kind $(ACTION_KIND) $(TARGET_DIR)/$(BINARY_NAME)

smoke_test:
	bx wsk action invoke $(ACTION_NAME) -P test/smoke_test_req.json -i -r

$(NODE_MODULES): package.json
	npm install

$(TARGET_DIR):
	mkdir $(TARGET_DIR)

$(TARGET_DIR)/$(BINARY_NAME): $(TARGET_DIR)
	zip -9ro $(TARGET_DIR)/$(BINARY_NAME) package.json src node_modules
