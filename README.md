# Agriboard

Agriboard is an administrative dashboard for the agriculture software stack. It is used to manage users and view advanced analytics.

## Dependencies

### NodeJS

To get started, the first thing you're going to need NodeJS (version `8.9.0` or higher). You can download this [here](https://nodejs.org/en/)

### Yarn

You will also require Yarn to manage the javascript dependencies in the application. You can view installation instructions for your OS [here](https://yarnpkg.com/lang/en/docs/install/)

To install dependencies simply run `yarn`

**Important:** Please use yarn to manage your dependencies. **You should never run any of the following commands:**

- `npm install`
- `npm install <package>`
- `npm install --dev <package>`
- `npm remove <package>`

Instead use:

- `yarn`
- `yarn add <package>`
- `yarn add --dev <package>`
- `yarn remove <package>`

## Scripts

### Development

To start developing, simply run the following command:

`npm start`

And navigate to `localhost:8080` in your browser.

Hot reloading is enabled, so there is no need to restart the server or reload the page when you make changes. They will automatically propogate to your browser, while maintaining the previous state of your application.

### Production

If you wish to build for production, you can use the command

`npm run build`

If you want to serve these files, you can install `http-server` via:

`yarn global add http-server`

and serve files using:

`http-server dist/ -p 8080`

### Style Guide

Agriboard adheres to the Airbnb style guide which can be found [here](https://github.com/airbnb/javascript). It is recommended you read over this briefly to understand the reasoning behind the linting rules.

### Tests

To perform a single run of the tests, simply run:

`npm run test`

This will run both the unit tests, and the integration tests. Keep in mind testing will fail if any of the tests do not adhere to the styleguide

To only run the unit tests, run:

`npm run test:unit:single`

And likewise to run only the integration tests:

`npm run test:inte:single`

If you want to rebuild the tests on changes, instead run:

`npm run test:unit` and `npm run test:inte`

## Typescript

This project uses [Typescript](http://www.typescriptlang.org/docs/home.html), and as such if you add a package that does not include a type definition file, you will have to add the types as a dependency as well. You can determine this if:

- Your editor complains it cannot find types for `<package>`
- The package you installed does not have a type definition at its root (ends with `.d.ts`)
- Typescript throws a compilation error complaining that `<package> is implicitly of type any`

To install types for a package, run the command:

`yarn add --dev @types/<package>`

Where `<package>` is the name of your package

## Configuration

Presently, the configuration for the agriboard server is done in the `config` directory using javascript files. A different file exists for each environment.

## Using Docker

The `./dockerize.sh` script can be used with the following arguments:
- `init` - creates a Docker image based on the Dockerfile
- `build` - installs the node modules and build the project using `npm run build`
- `run` - installs the node modules and starts a development web server at `<docker_ip>:8080`
