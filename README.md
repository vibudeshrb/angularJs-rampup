# AngularJS Article Management System

A learning project building an article management system with AngularJS 1.x, demonstrating key concepts like routing, services, controllers, and component-based architecture.

## Prerequisites

- Node.js 18.19.0 (see `.nvmrc`)
- yarn

## Installation

```bash
yarn install
```

## Development

Start the development server:

```bash
yarn start
```

This runs Grunt tasks to:

- Copy `index-base.html` → `index.html`
- Compile SCSS styles
- Inject vendor and app scripts into `index.html`
- Watch for file changes
- Serve on a local development server

## Building

Build for production with minification:

```bash
yarn build
```

This generates:

- `dist/app.annotated.js` (ng-annotated for safe dependency injection)
- `dist/app.min.js` (minified)

## Technologies

- AngularJS 1.8.3
- Angular UI Router
- Restangular (REST API)
- ngStorage (localStorage)
- Lodash
- SCSS
- Grunt (build automation)
