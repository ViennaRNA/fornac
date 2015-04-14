all: closure-compiler/build/compiler.jar js/fornac.js

js/fornac.js: src/*.js
	java -jar closure-compiler/build/compiler.jar --compilation_level=SIMPLE_OPTIMIZATIONS --js_output_file=js/fornac.js src/*.js

closure-compiler/build/compiler.jar: closure-compiler/*
	git submodule init closure-compiler
	git submodule update closure-compiler
	cd closure-compiler; ant jar

release: js/fornac.js
	zip fornac-release.zip js/fornac.js css/fornac.css example.html README.md

clean:
	rm -f closure-compiler/build/compiler.jar js/fornac.js fornac-release.zip

.PHONY: all
