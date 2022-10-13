# Makefile
OUTPUT=gen
WORK_DIR=/repo
NPM_BIN=$(WORK_DIR)/schema/node_modules/.bin

GRPC_TOOL=$(NPM_BIN)/grpc_tools_node_protoc
TYPESCRIPT_PLUGIN=protoc-gen-ts=$(NPM_BIN)/protoc-gen-ts

COMMAND=$(GRPC_TOOL) --plugin=${TYPESCRIPT_PLUGIN} --js_out=import_style=commonjs,binary:$(OUTPUT) --grpc_out=grpc_js:$(OUTPUT) --ts_out=grpc_js:$(OUTPUT) -I . ./*.proto

.PHONY: protogen

test:
	echo `$(COMMAND)`

protogen:
	docker run --rm -it -v ${PWD}:$(WORK_DIR) -w $(WORK_DIR)/schema node:16 \
	/bin/bash -c "\
	npm install \
	&& rm -rf $(OUTPUT) \
	&& mkdir -p $(OUTPUT) \
	&& $(COMMAND) \
	&& rm -rf ../bff/proto \
	&& cp -r $(OUTPUT) ../bff/proto \
	&& rm -rf ../backend/proto \
	&& cp -r $(OUTPUT) ../backend/proto\
	"