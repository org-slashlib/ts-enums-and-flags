## enumeration and flag generator for typescript ##

provides typesave enumerations and flags

commonjs package with typings, compiled for es2017(es8)

### building the library ###

* Fork or download from https://github.com/org-slashlib/ts-enums-and-flags
* Run <code> npm install </code>
* Run <code> npm run test </code>
* Run <code> grunt </code>
* Change to subfolder <code> dist/ts-enums-and-flags </code> and run <code> npm pack </code>

### installing the library ###

This guide assumes, that you are familiar with the use of npm.  

If you built the library on your own:<br />
<code>npm install path/to/@org.slashlib-ts-enums-and-flags-&lt;version&gt;.tgz</code>

If you want to install the public version on npm:<br />
<code>npm install @org.slashlib/ts-enums-and-flags --save</code>

## usage ##
```javascript
import { enumerate } from "@org.slashlib/ts-enums-and-flags";

// Note: Both literal arrays must be of same size. stringliteral[0] will be mapped to numberliteral[0]
//       numberliteral[n] is called "index" of stringliteral[n]
const STRINGLITERALS = [ <const>"enum0", <const>"enum1", <const>"enum2", <const>"enum3", <const>"enum4" ];
const NUMBERLITERALS = [ <const>0,       <const>1,       <const>2,       <const>3,       <const>4       ];

const enumerated = enumerate( STRINGLITERALS, NUMBERLITERALS );

type  EnumType   = keyof typeof enumerated.base;
const EnumValues = Object.freeze( enumerated.enumeration );

let a0   : EnumType = EnumValues.enum0;       // ok
let a1   : EnumType = "enum0";                // ok
let a2   : EnumType = 0;                      // ok

let err1 : EnumType = "something different";  // compiler error
let err2 : EnumType = 10;                     // compiler error

// caveats: (you can ... but you'd better not... this will bypass compiler checks)
let c01  : EnumType = EnumValues[ 0 ];        // ok => EnumValues.0 (pseudo!)
let c02  : EnumType = EnumValues[ 200 ];      // ok and accepted by compiler, but
                                              // will result in c02 === undefined
let c03  : EnumType = EnumValues[ "enum1" ];  // ok => EnumValues.enum1
let c04  : EnumType = EnumValues[ "foo" ];    // ok and accepted by compiler, but
                                              // will result in c04 === undefined

// Returns all enumerations as enumerated names
let names   = EnumValues.keys();                        // => [ "enum0", ... ]
// Return all enumerations as enumerated indexes/values
let indices = EnumValues.indexes();                     // => [ 0, 1, ... ]

// Returns an enumerated index/value from an enumerated name
// (Transforms enum.string to enum.number)
let test01  = EnumValues.indexOf( "enum1" );            // => 1
let test02  = EnumValues.indexOf( EnumValues.enum1 );   // => 1


// Returns an enumerated name from  an enumerated index/value
// (Transforms enum.number to enum.string)
let test11   = EnumValues.byIndex( 2 ); // => EnumValues.enum2

// Normalizes any given enumerated name and enumerated index/value
// to an enumerated value.
// (Transforms enum.number and enum.string to enum.number)
let test21   = EnumValues.toIndex( "enum2" );           // => 2
let test21   = EnumValues.toIndex( EnumValues.enum2 );  // => 2
let test21   = EnumValues.toIndex( 2 );                 // => 2

// Normalizes any given enumerated name and enumerated index/value
// to an enumerated name.
// (Transforms enum.number and enum.string to enum.string)
let test31   = EnumValues.toKey( "enum2" );           // => EnumValues.enum2 / "enum2"
let test31   = EnumValues.toKey( EnumValues.enum2 );  // => EnumValues.enum2 / "enum2"
let test31   = EnumValues.toKey( 2 );                 // => EnumValues.enum2 / "enum2"


let test41: EnumType = 0; // any of 0 | 1 | 2 | 3 | 4 | enum0 | enum1 ... will work
switch( EnumValues.toKey( test41 )) {
   case EnumValues.enum0: {
      //statements;
      break;
   }
   case EnumValues.enum1: {
      //statements;
      break;
   }
   default: {
      //statements;
      break;
   }
}

switch( EnumValues.toIndex( test41 )) {
   case 0: {
      //statements;
      break;
   }
   case 1: {
      //statements;
      break;
   }
   default: {
      //statements;
      break;
   }
}

```
