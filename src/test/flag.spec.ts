import { flag }        from "../lib"

const STRINGLITERALS = [ <const>"never", <const>"flag1", <const>"flag2", <const>"flag3", <const>"all" ];
const NUMBERLITERALS = [ <const>0, <const>1, <const>2, <const>3, <const>4, <const>5, <const>6, <const>7 ];
const FLAGS          = [ <const>0,       <const>1,       <const>2,       <const>4,       <const>7     ];

const flagged = flag( STRINGLITERALS, NUMBERLITERALS );
type  Flag    = keyof typeof flagged.base;
const Flags   = Object.freeze( flagged.enumeration );

describe( "logging.Flags.spec.ts", () => {
  describe( "testing imports from module", () => {
    describe( "Checking Flags", () => {
      it( "Instance 'Flags' should exist", () => {
          expect( Flags ).toBeDefined();
          expect( Flags ).not.toBeNull();
      });
      describe( "Instance 'Flags' should provide member 'Flags.keys()'", () => {
        it( "Member 'Flags.keys()' should exist", () => {
            expect( Flags.keys ).toBeDefined();
            expect( Flags.keys ).not.toBeNull();
        });
        let keys: Array<string> = Flags.keys();
        STRINGLITERALS.forEach(( element ) => {
          it( `Member 'Flags.keys()' should include element '${ element }'`, () => {
              expect( keys.includes( element )).toBeTruthy();
          });
        });
      });
      describe( "Instance 'Flags' should provide member 'Flags.or()'", () => {
        it( "Member 'Flags.or()' should exist", () => {
            expect( Flags.or ).toBeDefined();
            expect( Flags.or ).not.toBeNull();
        });
        it( `Member 'Flags.or( ${ Flags.never }, ${ Flags.never } )' should return 0`, () => {
            expect( Flags.or( Flags.never, Flags.never ) === 0 ).toBeTruthy();
        });
        it( `Member 'Flags.or( 0, ${ Flags.never } )' should return 0`, () => {
            expect( Flags.or( 0, Flags.never ) === 0 ).toBeTruthy();
        });
        it( `Member 'Flags.or( ${ Flags.never }, 0 )' should return 0`, () => {
            expect( Flags.or( Flags.never, 0 ) === 0 ).toBeTruthy();
        });
        it( `Member 'Flags.or( 0, 0 )' should return 0`, () => {
            expect( Flags.or( 0, 0 ) === 0 ).toBeTruthy();
        });
        it( `Member 'Flags.or( ${ Flags.never }, ${ Flags.all } )' should return 7`, () => {
            expect( Flags.or( Flags.never, Flags.all ) === 7 ).toBeTruthy();
        });
        it( `Member 'Flags.or( 0, ${ Flags.all } )' should return 7`, () => {
            expect( Flags.or( 0, Flags.all ) === 7 ).toBeTruthy();
        });
        it( `Member 'Flags.or( ${ Flags.never }, 7 )' should return 7`, () => {
            expect( Flags.or( Flags.never, 7 ) === 7 ).toBeTruthy();
        });
        it( `Member 'Flags.or( 0, 7 )' should return 7`, () => {
            expect( Flags.or( 0, 7 ) === 7 ).toBeTruthy();
        });
      });
      describe( "Instance 'Flags' should provide member 'Flags.test()'", () => {
        it( "Member 'Flags.test()' should exist", () => {
            expect( Flags.test ).toBeDefined();
            expect( Flags.test ).not.toBeNull();
        });
        it( `Member 'Flags.test( ${ Flags.never }, ${ Flags.never } )' should return 'true'`, () => {
            expect( Flags.test( Flags.never, Flags.never )).toBeTruthy();
        });
        it( `Member 'Flags.test( 0, ${ Flags.never } )' should return 'false'`, () => {
            expect( Flags.test( 0, Flags.never )).toBeFalsy();
        });
        it( `Member 'Flags.test( ${ Flags.all }, ${ Flags.never } )' should return 'false'`, () => {
            expect( Flags.test( Flags.all, Flags.never )).toBeFalsy();
        });
        it( `Member 'Flags.test( 7, ${ Flags.never } )' should return 'false'`, () => {
            expect( Flags.test( 7, Flags.never )).toBeFalsy();
        });
        it( `Member 'Flags.test( ${ Flags.all }, ${ Flags.flag1 } )' should return 'true'`, () => {
            expect( Flags.test( Flags.all, Flags.flag1 )).toBeTruthy();
        });
        it( `Member 'Flags.test( 7, ${ Flags.flag1 } )' should return 'true'`, () => {
            expect( Flags.test( 7, Flags.flag1 )).toBeTruthy();
        });
        it( `Member 'Flags.test( ${ Flags.all }, ${ Flags.flag2 } )' should return 'true'`, () => {
            expect( Flags.test( Flags.all, Flags.flag2 )).toBeTruthy();
        });
        it( `Member 'Flags.test( 7, ${ Flags.flag2 } )' should return 'true'`, () => {
            expect( Flags.test( 7, Flags.flag2 )).toBeTruthy();
        });
        it( `Member 'Flags.test( ${ Flags.all }, ${ Flags.flag3 } )' should return 'true'`, () => {
            expect( Flags.test( Flags.all, Flags.flag3 )).toBeTruthy();
        });
        it( `Member 'Flags.test( 7, ${ Flags.flag3 } )' should return 'true'`, () => {
            expect( Flags.test( 7, Flags.flag3 )).toBeTruthy();
        });
      });
      describe( "Instance 'Flags' should provide member 'Flags.values()'", () => {
        it( "Member 'Flags.values()' should exist", () => {
            expect( Flags.values ).toBeDefined();
            expect( Flags.values ).not.toBeNull();
        });
        let values: Array<number> = Flags.values();
        NUMBERLITERALS.forEach(( element ) => {
          it( `Member 'Flags.values()' should include element '${ element }'`, () => {
              expect( values.includes( element )).toBeTruthy();
          });
        });
      });
      describe( "Instance 'Flags' should provide member 'Flags.toValue()'", () => {
        it( "Member 'Flags.toValue()' should exist", () => {
            expect( Flags.toValue ).toBeDefined();
            expect( Flags.toValue ).not.toBeNull();
        });
        STRINGLITERALS.forEach(( element, index ) => {
          it( `Member 'Flags.toValue( ${ element } )' should equal '${ FLAGS[ index ] }'`, () => {
               expect( Flags.toValue( element ) === FLAGS[ index ]).toBeTruthy();
          });
        });
        NUMBERLITERALS.forEach(( element, index ) => {
          it( `Member 'Flags.toValue( ${ element } )' should equal '${ element }'`, () => {
               expect( Flags.toValue( element ) === element ).toBeTruthy();
          });
        });
      });
      describe( "Instance 'Flags' should provide member 'Flags.toValues()'", () => {
        it( "Member 'Flags.toValues()' should exist", () => {
          expect( Flags.toValues ).toBeDefined();
          expect( Flags.toValues ).not.toBeNull();
        });
        it( `Member 'Flags.toValues( 0 )' should equal '[ ]'`, () => {
             expect( Flags.toValues( 0 ).length === 0 ).toBeTruthy();
        });
        it( `Member 'Flags.toValues( 1 )' should equal '[ 1 ]'`, () => {
             expect( Flags.toValues( 1 ).length === 1 ).toBeTruthy();
             expect( Flags.toValues( 1 ).includes( 1 )).toBeTruthy();
        });
        it( `Member 'Flags.toValues( 2 )' should equal '[ 2 ]'`, () => {
             expect( Flags.toValues( 2 ).length === 1 ).toBeTruthy();
             expect( Flags.toValues( 2 ).includes( 2 )).toBeTruthy();
        });
        it( `Member 'Flags.toValues( 3 )' should equal '[ 1, 2 ]'`, () => {
             expect( Flags.toValues( 3 ).length === 2 ).toBeTruthy();
             expect( Flags.toValues( 3 ).includes( 1 )).toBeTruthy();
             expect( Flags.toValues( 3 ).includes( 2 )).toBeTruthy();
        });
        it( `Member 'Flags.toValues( 4 )' should equal '[ 4 ]'`, () => {
             expect( Flags.toValues( 4 ).length === 1 ).toBeTruthy();
             expect( Flags.toValues( 4 ).includes( 4 )).toBeTruthy();
        });
        it( `Member 'Flags.toValues( 5 )' should equal '[ 1, 4 ]'`, () => {
             expect( Flags.toValues( 5 ).length === 2 ).toBeTruthy();
             expect( Flags.toValues( 5 ).includes( 1 )).toBeTruthy();
             expect( Flags.toValues( 5 ).includes( 4 )).toBeTruthy();
        });
        it( `Member 'Flags.toValues( 6 )' should equal '[ 2, 4 ]'`, () => {
             expect( Flags.toValues( 6 ).length === 2 ).toBeTruthy();
             expect( Flags.toValues( 6 ).includes( 2 )).toBeTruthy();
             expect( Flags.toValues( 6 ).includes( 4 )).toBeTruthy();
        });
        it( `Member 'Flags.toValues( 7 )' should equal '[ 1, 2, 4 ]'`, () => {
             expect( Flags.toValues( 7 ).length === 3 ).toBeTruthy();
             expect( Flags.toValues( 7 ).includes( 1 )).toBeTruthy();
             expect( Flags.toValues( 7 ).includes( 2 )).toBeTruthy();
             expect( Flags.toValues( 7 ).includes( 4 )).toBeTruthy();
        });
        STRINGLITERALS.forEach(( element, index ) => {
          if ( index == 0 ) {
            it( `Member 'Flags.toValues( ${ element } )' should equal '[ ]'`, () => {
                 expect( Flags.toValues( element ).length === 0 ).toBeTruthy();
            });
          }
          else if ( index === ( STRINGLITERALS.length - 1 )) {
            it( `Member 'Flags.toValues( ${ element } )' should equal '[ 1, 2, 4 ]'`, () => {
                 expect( Flags.toValues( element ).length === 3 ).toBeTruthy();
                 expect( Flags.toValues( element ).includes( 1 )).toBeTruthy();
                 expect( Flags.toValues( element ).includes( 2 )).toBeTruthy();
                 expect( Flags.toValues( element ).includes( 4 )).toBeTruthy();
            });
          }
          else {
            it( `Member 'Flags.toValues( ${ element } )' should equal '[ ${ Flags.toValue( element ) } ]'`, () => {
                 expect( Flags.toValues( element ).length === 1 ).toBeTruthy();
                 expect( Flags.toValues( element ).includes( Flags.toValue( element ))).toBeTruthy();
            });
          }
        });
      });
      describe( "Instance 'Flags' should provide member 'Flags.toKeys()'", () => {
        it( "Member 'Flags.toKeys()' should exist", () => {
          expect( Flags.toKeys ).toBeDefined();
          expect( Flags.toKeys ).not.toBeNull();
        });
        it( `Member 'Flags.toKeys( 0 )' should equal '[ ]'`, () => {
             expect( Flags.toKeys( 0 ).length === 0 ).toBeTruthy();
        });
        it( `Member 'Flags.toKeys( 1 )' should equal '[ ${ Flags.flag1 } ]'`, () => {
             expect( Flags.toKeys( 1 ).length === 1 ).toBeTruthy();
             expect( Flags.toKeys( 1 ).includes( Flags.flag1 )).toBeTruthy();
        });
        it( `Member 'Flags.toKeys( 2 )' should equal '[ ${ Flags.flag2 } ]'`, () => {
             expect( Flags.toKeys( 2 ).length === 1 ).toBeTruthy();
             expect( Flags.toKeys( 2 ).includes( Flags.flag2 )).toBeTruthy();
        });
        it( `Member 'Flags.toKeys( 3 )' should equal '[ ${ Flags.flag1 }, ${ Flags.flag2 } ]'`, () => {
             expect( Flags.toKeys( 3 ).length === 2 ).toBeTruthy();
             expect( Flags.toKeys( 3 ).includes( Flags.flag1 )).toBeTruthy();
             expect( Flags.toKeys( 3 ).includes( Flags.flag2 )).toBeTruthy();
        });
        it( `Member 'Flags.toKeys( 4 )' should equal '[ ${ Flags.flag3 } ]'`, () => {
             expect( Flags.toKeys( 4 ).length === 1 ).toBeTruthy();
             expect( Flags.toKeys( 4 ).includes( Flags.flag3 )).toBeTruthy();
        });
        it( `Member 'Flags.toKeys( 5 )' should equal '[ ${ Flags.flag1 }, ${ Flags.flag3 } ]'`, () => {
             expect( Flags.toKeys( 5 ).length === 2 ).toBeTruthy();
             expect( Flags.toKeys( 5 ).includes( Flags.flag1 )).toBeTruthy();
             expect( Flags.toKeys( 5 ).includes( Flags.flag3 )).toBeTruthy();
        });
        it( `Member 'Flags.toKeys( 6 )' should equal '[ ${ Flags.flag2 }, ${ Flags.flag3 } ]'`, () => {
             expect( Flags.toKeys( 6 ).length === 2 ).toBeTruthy();
             expect( Flags.toKeys( 6 ).includes( Flags.flag2 )).toBeTruthy();
             expect( Flags.toKeys( 6 ).includes( Flags.flag3 )).toBeTruthy();
        });
        it( `Member 'Flags.toKeys( 7 )' should equal '[ ${ Flags.flag1 }, ${ Flags.flag2 }, ${ Flags.flag3 } ]'`, () => {
             expect( Flags.toKeys( 7 ).length === 3 ).toBeTruthy();
             expect( Flags.toKeys( 7 ).includes( Flags.flag1 )).toBeTruthy();
             expect( Flags.toKeys( 7 ).includes( Flags.flag2 )).toBeTruthy();
             expect( Flags.toKeys( 7 ).includes( Flags.flag3 )).toBeTruthy();
        });
        STRINGLITERALS.forEach(( element, index ) => {
          if ( index == 0 ) {
            it( `Member 'Flags.toKeys( ${ element } )' should equal '[ ]'`, () => {
                 expect( Flags.toKeys( element ).length === 0 ).toBeTruthy();
            });
          }
          else if ( index === ( STRINGLITERALS.length - 1 )) {
            it( `Member 'Flags.toKeys( ${ element } )' should equal '[  ${ Flags.flag1 }, ${ Flags.flag2 }, ${ Flags.flag3 } ]'`, () => {
                 expect( Flags.toKeys( element ).length === 3 ).toBeTruthy();
                 expect( Flags.toKeys( element ).includes( Flags.flag1 )).toBeTruthy();
                 expect( Flags.toKeys( element ).includes( Flags.flag2 )).toBeTruthy();
                 expect( Flags.toKeys( element ).includes( Flags.flag3 )).toBeTruthy();
            });
          }
          else {
            it( `Member 'Flags.toKeys( ${ element } )' should equal '[ ${ element } ]'`, () => {
                 expect( Flags.toKeys( element ).length === 1 ).toBeTruthy();
                 expect( Flags.toKeys( element ).includes( element )).toBeTruthy();
            });
          }
        });
      });
    });

    describe( "module 'logging.Flags' should provide type 'Flag'", () => {
      // TODO: check for values
    });
  });
});
