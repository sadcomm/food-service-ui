## START DOCKER CONTAINERS
docker-compose -f docker-compose.dev.yml up --build

If you get error with build image or you get "exec /bin/entrypoint.sh: no such file or directory":
1. fix wrong line endings for .sh files 
Thread with error: https://stackoverflow.com/questions/40452508/docker-error-on-an-entrypoint-script-no-such-file-or-directory

