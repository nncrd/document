@echo off
start cmd /k "cd/d ./child-app01 && npm run serve"
start cmd /k "cd/d ./child-app02 && npm run serve"
start cmd /k "cd/d ./main-app && npm run serve"