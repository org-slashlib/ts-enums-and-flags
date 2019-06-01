import { enumerate }   from "../lib"

const STRINGLITERALS = [ <const>"enum0", <const>"enum1", <const>"enum2", <const>"enum3", <const>"enum4" ];
const NUMBERLITERALS = [ <const>0,       <const>1,       <const>2,       <const>3,       <const>4       ];

const enumerated = enumerate( STRINGLITERALS, NUMBERLITERALS );

type  EnumType   = keyof typeof enumerated.base;
const EnumValues = Object.freeze( enumerated.enumeration );

describe( "test.spec.ts", () => {
  describe( "testing imports from module", () => {
    describe( "Checking EnumValues", () => {
      it( "Instance 'EnumValues' should exist", () => {
          expect( EnumValues ).toBeDefined();
          expect( EnumValues ).not.toBeNull();
      });
      describe( "Instance 'EnumValues' should provide member 'EnumValues.keys()'", () => {
        it( "Member 'EnumValues.keys()' should exist", () => {
            expect( EnumValues.keys    ).toBeDefined();
            expect( EnumValues.keys    ).not.toBeNull();
        });
        let keys: Array<string> = EnumValues.keys();
        STRINGLITERALS.forEach(( element ) => {
          it( `Member 'EnumValues.keys()' should include element '${ element }'`, () => {
              expect( keys.includes( element )).toBeTruthy();
          });
        });
      });
      it( "Instance 'EnumValues' should provide member 'EnumValues.indexOf()'", () => {
          expect( EnumValues.indexOf ).toBeDefined();
          expect( EnumValues.indexOf ).not.toBeNull();
      });
      it( "Instance 'EnumValues' should provide member 'EnumValues.byIndex()'", () => {
          expect( EnumValues.byIndex ).toBeDefined();
          expect( EnumValues.byIndex ).not.toBeNull();
      });
      it( "Instance 'EnumValues' should provide member 'EnumValues.toIndex()'", () => {
          expect( EnumValues.toIndex ).toBeDefined();
          expect( EnumValues.toIndex ).not.toBeNull();
          expect( EnumValues.toIndex( EnumValues[4]    ) === 4 ).toBeTruthy();
          expect( EnumValues.toIndex( EnumValues.enum1 ) === 1 ).toBeTruthy();
      });
      it( "Instance 'EnumValues' should provide member 'EnumValues.toKey()'", () => {
          expect( EnumValues.toKey ).toBeDefined();
          expect( EnumValues.toKey ).not.toBeNull();
          expect( EnumValues.toKey( EnumValues[2]    ) === EnumValues.enum2 ).toBeTruthy();
          expect( EnumValues.toKey( EnumValues.enum3 ) === EnumValues.enum3 ).toBeTruthy();
      });
      describe( "Instance 'EnumValues' should provide indexed members:", () => {
        EnumValues.keys().forEach( function( element, index ) {
          it( `EnumValues[${ index }] <=> EnumValues.${ element }`, () => {
              expect( EnumValues[ element ]).toBeDefined();
              expect( EnumValues[ element ]).not.toBeNull();
              expect( EnumValues[ index   ]).toBeDefined();
              expect( EnumValues[ index   ]).not.toBeNull();
          });
        });
      });
    });

    describe( "Checking EnumType", () => {
      STRINGLITERALS.forEach(( element ) => {
        it( `Type "EnumType" should be accepting value '${ element }'`, () => {
            // note: proforma - this will raise compiler errors if assignment was invalid
            expect(() => { let value: EnumType = element; }).not.toThrow()
        });
      });
      NUMBERLITERALS.forEach(( index ) => {
        it( `Type "EnumType" should be accepting value '${ index }'`, () => {
            // note: proforma - this will raise compiler errors if assignment was invalid
            expect(() => { let value: EnumType = index; }).not.toThrow()
        });
      });
      EnumValues.keys().forEach(( element ) => {
        it( `Type "EnumType" should be accepting EnumValues['${ element }'] => EnumValues.${ element }`, () => {
            // note: proforma - this will raise compiler errors if assignment was invalid
            expect(() => { let value: EnumType = EnumValues[ element ]; }).not.toThrow()
        });
      });
    });
  });
});
