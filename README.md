# Dashboard
## Using Docker
The `./dockerize.sh` script can be used with the following arguments:
- `init` - creates a Docker image based on the Dockerfile
- `build` - installs the node modules and build the project using `npm run build`
- `run` - installs the node modules and starts a development web server at `<docker_ip>:8080`