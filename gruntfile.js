/**
 *  © 2019, slashlib.org.
 */
"use strict";
const path      = require( "path" );
const yatsc       = require( "rollup-plugin-yatsc" );
const terser    = require( "rollup-plugin-terser" ).terser;

const BUILD     = "build";
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
      prerequisites_lib: {
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
                      `!./config/**/*`, // do not copy configuration tree (if there is one)
                      `!./node-*/**/*`, // do not copy projectroot/node binaries (junction on windows)
                      `!./node_modules` // do not copy projectroot/node_modules
                    ],
          dest:     BUILD
        },{
          expand:   true,
          cwd:      SRC,                // copy sources to build directory
          src:      [ "**/*" ],
          dest:     BUILD
        }]
      } // end of copy:prerequisites_lib
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
              declaration             : true,
              // sourceMap              : true, // cannot be used together with inlineSourceMap
              inlineSourceMap         : true,
              inlineSources           : true,
              emitDecoratorMetadata   : true,
              experimentalDecorators  : true,
              importHelpers           : true,
              removeComments          : true,
              typeRoots               : [ "node_modules/@types", "lib/@types" ],
              lib                     : [ "es7" ]
            },
            include : [ "build/**/*.ts"   ],
            exclude : [ "build/test/**/*" ]
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
            declaration   : true,
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
          main            : `bundles/${ pkglobl }.umd.js`,
          typings         : `${ pkglobl }.d.ts`,
          metadata        : `${ pkglobl }.metadata.json`,
          sideEffects     : true,
          dependencies    : { "tslib": "^1.9.0" },
          devDependencies : null
        }
      }
    }, // end of jsonfiles

    rollup: {
      esm5: {
        src   : `${ BUILD }/index.ts`,
        dest  : `dist/${ pkgname }/esm5/${ pkglobl }.js`,
        options: {
          plugins   : [ yatsc( `${ BUILD }/tsconfig.json` )],
          name      : `${ pkglobl }`,
          format    : "commonjs",
          sourcemap : "inline"
        }
      }
    }, // end of rollup

  }); // end of grunt.initConfig

  grunt.loadNpmTasks( "grunt-cleanempty"      );
  grunt.loadNpmTasks( "grunt-contrib-clean"   );
  grunt.loadNpmTasks( "grunt-contrib-copy"    );
  grunt.loadNpmTasks( "grunt-jsonfile"        );
  grunt.loadNpmTasks( "grunt-newer"           );
  grunt.loadNpmTasks( "grunt-rollup"          );

  grunt.registerTask( "clean-default",   [ "clean:dist", "clean:build", "cleanempty:always" ]);

  grunt.registerTask( "prepare-default", [ "newer:copy:prerequisites_lib", "cleanempty:always" ]);

  grunt.registerTask( "default",         [ "clean-default", "prepare-default", "jsonfile", "rollup" ]);
};
