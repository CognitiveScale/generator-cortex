
FUNCTION_DIRS = ${sort ${dir ${wildcard ./functions/*/}}}
SKILL_DIRS    = ${sort ${dir ${wildcard ./skills/*/}}}

clean:
	for funcdir in $(FUNCTION_DIRS) ; do \
		cd $$funcdir && make clean && cd ../..; \
	done

publish:
	for funcdir in $(FUNCTION_DIRS) ; do \
		cd $$funcdir && make publish && cd ../..; \
	done

register:
	for skilldir in $(SKILL_DIRS) ; do \
		cd $$skilldir && make register && cd ../..; \
	done
