@echo off
IF NOT EXIST "node_modules" (
	echo Installing modules
	npm i
	cls
	node index 
	timeout /t -1
) ELSE (
	node index 
	timeout /t -1
)