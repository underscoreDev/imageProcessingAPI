# Image Processing API - Udacity's Fullstack JavaScript Developer Nanodegree

## Introduction

This is a simple REST API allowing users to create, access and resize placeholder images using the [Sharp](https://sharp.pixelplumbing.com/) Node.js image processing module.

---

## Getting Started

### Installing dependencies

After cloning the repo, all the project dependencies can be installed using npm:

```
npm install
```

### Running the server

To execute the application use the following command in terminal:

```
npm run start
```

the app will then be available on port 9889 by default, but that can be changed by editing the port constant value in the index.ts file.

### Scripts

The following actions can be executed through npm scripts:

#### Transpiling typescript to javascript

```
npm run build
```

The transpiled code will be available in the `build` folder.

#### Testing

A jasmine testing suite can be used to validate the endpoint as well as the imageTransform functionality.

```
npm run test
```

#### Formatting

The code can be automatically formatted using prettier. The formatting options can be customised by editin the `.prettierrc`file.

```
npm run prettier
```

#### Linting

The code can ba automatically linted using ESlint. Note that ESlint will also use prettier to test for incorrect formatting. Rules, plugins and extensions for ESlint can be modified through the `.eslintrc` file.

```
npm run lint
```

---

## How to use

The api offers 3 endpoints

1. `/` - corresponds to the home route
2. `/api/images` corresponds to the image processing route
   This although will return a bad-request response, because for an image to be processed it needs the filename and the image dimensions(width & height)

3. The API offers one endpoint to access and resize images available in the `assets/full` folder.

The endpoint is `api/images` and requires three query params:

| Query Params |                                     Value                                     |
| ------------ | :---------------------------------------------------------------------------: |
| filename     | the filename (without extension) of one of the images available in the folder |
| width        |                        it should be a positive integer                        |
| height       |                        it should be a positive integer                        |

An example of a correct endpoint call for image processing would be:

[http://localhost:9889/api/images?filename=fjord&height=300&width=300](http://localhost:9889/api/images?filename=fjord&height=300&width=300)
