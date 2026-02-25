'use strict';

const sass = require('sass');
const modRewrite = require('connect-modrewrite');

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        prettier: {
            options: {
                configFile: '.prettierrc',
            },
            files: {
                src: [
                    'src/**/*.js',
                    'src/**/*.html',
                    '*.json',
                    '!src/styles/styles.css', // Don't format compiled CSS
                ],
            },
        },

        // ── Copy index-base.html → index.html (index.html is gitignored) ──
        copy: {
            app: {
                src: 'src/index-base.html',
                dest: 'src/index.html',
            },
        },

        // ── Inject everything into index.html (no hardcoded tags anywhere) ─
        injector: {
            // 1. Vendor scripts from node_modules
            vendors: {
                options: {
                    addRootSlash: false,
                    ignorePath: '',
                    starttag: '<!-- injector:vendor -->',
                    endtag: '<!-- endinjector -->',
                },
                files: {
                    'src/index.html': [
                        'node_modules/angular/angular.js',
                        'node_modules/angular-ui-router/release/angular-ui-router.js',
                        'node_modules/lodash/lodash.js',
                        'node_modules/restangular/dist/restangular.js',
                        'node_modules/ngstorage/ngStorage.min.js',
                    ],
                },
            },
            // 2. App CSS + JS
            app: {
                options: {
                    addRootSlash: false,
                    ignorePath: 'src/',
                },
                files: {
                    'src/index.html': [
                        'src/styles/styles.css',
                        'src/app/constant/**/*.js',
                        'src/app/app.module.js',
                        'src/app/**/*.js',
                    ],
                },
            },
        },

        // ── Sass ──────────────────────────────────────────────────────────
        sass: {
            options: {
                implementation: sass,
                sourceMap: true,
                style: 'expanded',
            },
            dist: {
                files: {
                    'src/styles/styles.css': 'src/styles/index.scss',
                },
            },
        },

        // ── ng-annotate ───────────────────────────────────────────────────
        ngAnnotate: {
            options: { singleQuotes: true },
            app: {
                files: {
                    'dist/app.annotated.js': ['src/app/**/*.js'],
                },
            },
        },

        // ── Uglify ────────────────────────────────────────────────────────
        uglify: {
            dist: {
                files: { 'dist/app.min.js': ['dist/app.annotated.js'] },
            },
        },

        // ── JSHint ────────────────────────────────────────────────────────
        jshint: {
            options: {
                node: true,
                browser: true,
                globals: { angular: true, constant: true, _: true },
                esversion: 6,
                reporter: require('jshint-stylish'),
            },
            all: ['Gruntfile.js', 'src/**/*.js'],
        },

        // ── Connect dev server ────────────────────────────────────────────
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: ['src', '.'],
                    livereload: true,
                    open: true,
                    index: 'index.html',
                    middleware: function (connect, options, middlewares) {
                        return [
                            modRewrite(['^[^\\.]*$ /index.html [L]']),
                            function (req, res, next) {
                                res.setHeader(
                                    'Access-Control-Allow-Origin',
                                    '*'
                                );
                                return next();
                            },
                        ].concat(middlewares);
                    },
                },
            },
        },

        // ── Watch ─────────────────────────────────────────────────────────
        watch: {
            // JS added or deleted → re-copy base and re-inject all tags
            inject: {
                files: ['src/app/**/*.js'],
                tasks: ['copy:app', 'injector:vendors', 'injector:app'],
                options: {
                    event: ['added', 'deleted'],
                    livereload: true,
                },
            },
            // JS changed → livereload only (tags already in index.html)
            js: {
                files: ['src/app/**/*.js'],
                options: {
                    event: ['changed'],
                    livereload: true,
                },
            },
            // SCSS changed → recompile then update injected <link> tags
            sass: {
                files: ['src/styles/**/*.scss'],
                tasks: [
                    'sass:dist',
                    'copy:app',
                    'injector:vendors',
                    'injector:app',
                ],
                options: { livereload: true },
            },
            // index-base.html changed → rebuild index.html
            indexbase: {
                files: ['src/index-base.html'],
                tasks: ['copy:app', 'injector:vendors', 'injector:app'],
                options: { livereload: true },
            },
            // Other HTML changed → livereload
            html: {
                files: ['src/app/**/*.html', 'src/views/**/*.html'],
                options: { livereload: true },
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-prettier');

    // Rebuild index.html from base template + inject all scripts/styles
    grunt.registerTask('inject', [
        'copy:app',
        'injector:vendors',
        'injector:app',
    ]);

    // serve: lint → sass → inject → start server → watch
    grunt.registerTask('default', [
        'jshint',
        'sass:dist',
        'inject',
        'connect',
        'watch',
    ]);

    // build: full production build
    grunt.registerTask('build', [
        'jshint',
        'sass:dist',
        'inject',
        'ngAnnotate',
        'uglify',
    ]);
};
