/**
 *  © 2019, slashlib.org.
 */
"use strict";
const path      = require( "path" );
const yatsc     = require( "rollup-plugin-yatsc" );
const terser    = require( "rollup-plugin-terser" ).terser;

const BUILD     = "build";
const BUNDLES   = "bundles";
const CONFIG    = "config";
const DIST      = "dist";
const DOC       = "doc";
const LIB       = "lib";
const SRC       = "src";

module.exports = function( grunt ) {
  // set grunt options
  let pkgjson = grunt.file.readJSON( "package.json"  );
  let scope   = pkgjson.name.slice( 0, pkgjson.name.indexOf("/")).replace( "@", "" );
  let pkgname = pkgjson.name.slice( pkgjson.name.indexOf("/") + 1 );
  let pkglobl = scope ? `${ scope }.${ pkgname }` : pkgname;

  grunt.initConfig({

    clean: {
      build:        [ `${BUILD}/**/*` ],
      dist:         [ `${DIST}/**/*`  ]
    }, // end of clean

    cleanempty: {
      // remove empty folders in build and dist directories
      always: {
        src:        [ `${BUILD}/**/*`, `${DIST}/**/*` ]
      },
    }, // end of cleanempty

    copy: {
      build: {
        files: [{
          expand:   true,
          src:      [
                      `${DOC}/**/*`,    // copy docs to build directory
                      `./*`,            // copy licence, readme etc.
                      `!./*.bak`,       // do not copy projectroot/*.bak (backups)
                      `!./*.bak.*`,     // do not copy projectroot/*.bak.* (backups)
                      `!./*.bat`,       // do not copy projectroot/*.bat (windows batchfiles)
                      `!./*.js`,        // do not copy projectroot/*.js (gruntfile etc.)
                      `!./*.json`,      // do not copy projectroot/*.json (package.json etc.)
                      `!./*.lnk`,       // do not copy projectroot/*.lnk (windows desktop links)
                      `!./*.log`,       // do not copy projectroot/*.log  (logfiles)
                      `!./*.log.*`,     // do not copy projectroot/*.log.* (versioned or packed logfiles)
                      `!./*.zip`,       // do not copy projectroot/*.zip
                      `!./*.7z`,        // do not copy projectroot/*.7z
                      `!./*.tgz`,       // do not copy projectroot/*.tgz
                      `!./*.conf.*`,    // do not copy configuration files (karma...)
                      `!./*.conf`,      // do not copy configuration files
                      `!./config/**/*`, // do not copy configuration tree (if there is one)
                      `!./node-*/**/*`, // do not copy projectroot/node binaries (junction on windows)
                      `!./node_modules` // do not copy projectroot/node_modules
                    ],
          dest:     BUILD
        },{
          expand:   true,
          cwd:      SRC,                // copy sources to build directory
          src:      [
                      "**/*",
                      "!test/*"         // don't copy test files
                    ],
          dest:     BUILD
        }]
      }, // end of copy:build
      dist: {
        files: [{
          expand:   true,
          cwd:      BUILD,              // copy sources to build directory
          src:      [
                      `${DOC}/**/*`,    // copy docs to build directory
                      `./LICENSE`,      // copy licence
                      `./*.md`,         // copy readme etc.
                      `!./${LIB}/*`       // do not copy sources
                    ],
          dest:     `${ DIST }/${ pkgname }`
        }]
      }  // end of copy:dist
    }, // end of copy

    jsonfile: {
      options: {
        templates: {
          pkgjson:  "package.json",
          tsconfig: {
            compilerOptions: {
              // default typescript compiler options
              outDir                  : "xxx",
              target                  : "xxx",
              module                  : "xxx",
              moduleResolution        : "node",
              inlineSourceMap         : true,
              inlineSources           : true,
              emitDecoratorMetadata   : true,
              experimentalDecorators  : true,
              importHelpers           : true,
              removeComments          : true,
              typeRoots               : [ "node_modules/@types", `${LIB}/@types` ],
              lib                     : [ "es7" ]
            },
            include : [ "**/*.ts"   ],
            exclude : [ "test/**/*" ]
          }
        }
      },
      default: {
        template: "tsconfig",
        dest:     `${ BUILD }/tsconfig.json`,
        merge: {
          compilerOptions: {
            outDir        : `../${ DIST }/${ pkgname }`,
            target        : "es6",
            module        : "commonjs",
            declaration   : false,
            noImplicitAny : false,
            noLib         : false,
            allowJs       : true
          }
        }
      },
      pkgjson: {
        template: "pkgjson",
        dest:     `./${ DIST }/${ pkgname }/package.json`,
        merge: {
          cjs             : `${BUNDLES}/${ pkglobl }.commonjs.js`,
          esm2016         : `${BUNDLES}/${ pkglobl }.esm2016.js`,
          fcjs            : `${BUNDLES}/${ pkglobl }.commonjs.min.js`,
          fesm2016        : `${BUNDLES}/${ pkglobl }.esm2016.min.js`,
          module          : `${BUNDLES}/${ pkglobl }.esm2016.js`, // esm entry point
          main            : `${LIB}/index.js`,                    // commonjs/nodejs entry point
          scripts         : null,
          sideEffects     : true,
          // type           : "module"                            // this is, by default, a commonjs module
          dependencies    : { "tslib": "^1.9.0" },
          devDependencies : null
        }
      }
    }, // end of jsonfiles

    rollup: {
      commonjs: {
        src   : `${ BUILD }/${ LIB }/index.ts`,
        dest  : `dist/${ pkgname }/${BUNDLES}/${ pkglobl }.commonjs.js`,
        options: {
          plugins   : [ yatsc( `${ BUILD }/tsconfig.json` )],
          name      : `${ pkglobl }`,
          format    : "commonjs",
          sourcemap : "inline"
        }
      },
      fcommonjs: {
        src   : `${ BUILD }/${ LIB }/index.ts`,
        dest  : `dist/${ pkgname }/${BUNDLES}/${ pkglobl }.commonjs.min.js`,
        options: {
          plugins   : [ yatsc( `${ BUILD }/tsconfig.json` ), terser()],
          name      : `${ pkglobl }`,
          format    : "commonjs",
          sourcemap : "inline"
        }
      },
      esm2016: { // esm formatted package compiled for ES2016 (ES7)
        src   : `${ BUILD }/${ LIB }/index.ts`,
        dest  : `dist/${ pkgname }/${BUNDLES}/${ pkglobl }.esm2016.js`,
        options: {
          plugins   : [ yatsc( `${ BUILD }/tsconfig.json` )],
          name      : `${ pkglobl }`,
          format    : "esm",
          sourcemap : "inline"
        }
      },
      fesm2016: { // minified esm formatted package compiled for ES2016 (ES7)
        src   : `${ BUILD }/${ LIB }/index.ts`,
        dest  : `dist/${ pkgname }/${BUNDLES}/${ pkglobl }.esm2016.min.js`,
        options: {
          plugins   : [ yatsc( `${ BUILD }/tsconfig.json` ), terser()],
          name      : `${ pkglobl }`,
          format    : "esm",
          sourcemap : "inline"
        }
      },
    }, // end of rollup

    ts: {
      options: {
        rootDir   : "build"
      },
      commonjs: {
        tsconfig  : "build/tsconfig.json",
        src:        [ "build/**/*.ts" ]
      },
    } // end of grunt-ts (typescript compiler)
  }); // end of grunt.initConfig

  grunt.loadNpmTasks( "grunt-cleanempty"    );
  grunt.loadNpmTasks( "grunt-contrib-clean" );
  grunt.loadNpmTasks( "grunt-contrib-copy"  );
  grunt.loadNpmTasks( "grunt-jsonfile"      );
  grunt.loadNpmTasks( "grunt-newer"         );
  grunt.loadNpmTasks( "grunt-rollup"        );
  grunt.loadNpmTasks( "grunt-ts"            );

  grunt.registerTask( "clean-default",   [ "clean:dist", "clean:build", "cleanempty:always" ]);

  grunt.registerTask( "prepare-default", [ "newer:copy:build", "newer:copy:dist", "cleanempty:always" ]);

  grunt.registerTask( "default",         [ "clean-default", "prepare-default", "jsonfile", "ts", "rollup" ]);
};
