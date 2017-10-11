# apertos-frontend

A Single-Page-Application base to realize Open Data Frontends.

## Setup
##### 0. install Node.js and npm on your system following [this guide](https://nodejs.org/en/download/package-manager/)

##### 1. Download or clone this repository 

##### 2. Open a Terminal inside the ```apertos-frontend``` folder and run ```npm install``` to install dependencies.

##### 3. Ensure the following file structure:

myProject<br />
|-- apertos-frontend<br />
|-- myAdapters<br />
|-- glue-config.js ([guide](https://gitlab.fokus.fraunhofer.de/apertos/apertos-frontend/blob/develop/guides/adapters-guide.md))<br />
|-- custom_vars.sass ([guide](https://gitlab.fokus.fraunhofer.de/apertos/apertos-frontend/blob/develop/guides/style-customization-guide))<br />
`-- custom_bulma_variables.sass ([guide](https://gitlab.fokus.fraunhofer.de/apertos/apertos-frontend/blob/develop/guides/style-customization-guide))<br />

##### 4. Implement adapters to fetch data from backend following [this guide](https://gitlab.fokus.fraunhofer.de/apertos/apertos-frontend/blob/develop/guides/adapters-guide.md) and store them inside the myAdapters folder.

##### 5. Implement glue-config.js following [this guide](link-to-adapters.md).

##### 6. Open Terminal in apertos-frontend folder.

``` bash
# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Tools

#### Vue specific
* [VueJS](https://vuejs.org/)
* [VueJS Webpack bundle](http://vuejs-templates.github.io/webpack/)
* [vue-loader](http://vuejs.github.io/vue-loader)
* [vue-router](https://github.com/vuejs/vue-router)
* [vuex](https://github.com/vuejs/vuex)

#### General
* [Axios](https://github.com/mzabriskie/axios)
* [NVD3](http://nvd3.org/)

#### Design
* [Bulma](http://bulma.io/documentation/overview/start/)


## Styleguides

#### JavaScript

We are using the Airbnb [Styleguide](https://github.com/airbnb/javascript "Airbnb JavaScript Styleguide") and enforce it with [ESLint](http://eslint.org/ "esLint homepage")

#### VueJS

We are using the GitLab VueJS [Styleguide](https://docs.gitlab.com/ee/development/fe_guide/style_guide_js.html#vue-js "GitLab VueJS Styleguide")

#### Customization Guides

[Implement Adapters to fetch data](https://gitlab.fokus.fraunhofer.de/apertos/apertos-frontend/blob/develop/guides/adapters-guide.md)

[Configure glue-config.js](https://gitlab.fokus.fraunhofer.de/apertos/apertos-frontend/blob/develop/guides/adapters-guide.md)

[Customize Components](https://gitlab.fokus.fraunhofer.de/apertos/apertos-frontend/blob/develop/guides/custom-components-guide.md)

[Customize Styles](https://gitlab.fokus.fraunhofer.de/apertos/apertos-frontend/blob/develop/guides/style-customization-guide)
