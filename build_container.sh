VER=$(cat package.json | jq .version | tr -d '"')
docker build -t jdallen/randomname:$VER -t jdallen/randomname:latest .

