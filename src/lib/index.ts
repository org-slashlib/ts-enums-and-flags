/**
 *  © 2019, slashlib.org.
 */
export type StringLiteral<S extends string>  = {[ K in S ] : S };
export type NumericLiteral<N extends number> = {[ I in N ] : N };

export interface Enum<S extends string, N extends number> {
  /**
   *  Return all enumerations as enumerated names
   */
  keys(): Array<S>;
  /**
   *  Return all enumerations as enumerated indexes/values
   */
  indexes(): Array<N>;
  /**
   *  Returns an enumerated index/value from an enumerated name
   *  (Transforms enum.string to enum.number)
   */
  indexOf( enumeration : S ): N;
  /**
   *  Returns an enumerated name from  an enumerated index/value
   *  (Transforms enum.number to enum.string)
   */
  byIndex( index: N ): S;
  /**
   *  Normalizes any given enumerated name and enumerated index/value
   *  to an enumerated value.
   *  (Transforms enum.number and enum.string to enum.number)
   */
  toIndex( value: N | S ): N;
  /**
   *  Normalizes any given enumerated name and enumerated index/value
   *  to an enumerated name.
   *  (Transforms enum.number and enum.string to enum.string)
   */
  toKey( value: N | S ): S;
}

export interface Flag<S extends string, N extends number> {
  /**
   *  Return all flag names
   */
  keys(): Array<S>;
  /**
   *  Return a value with ored flags
   */
  or( ...flag : Array<S|N> ): N;
  /**
   *  Returns true, if flag is set in value
   */
  test( value : S | N, flag: S ): boolean;
  /**
   *  Return all possible flag settings
   */
  values(): Array<N>;
  /**
   *  Return a flags value (2^n) from a flags name or value (2^n)
   *  valueOf( key : S ): N;
   */
  toValue( value : S | N ): N;
  /**
   *  Normalizes a value to its flag values
   */
  toValues( value: S | N ): Array<N>;
  /**
   *  Normalizes a value to its flag keys
   */
  toKeys( value: S | N ): Array<S>;
}

const ERRORMSG: string = "enumerate: literal arrays must be of same size"

export function literals<S extends string, N extends number>( s : Array<S>, n : Array<N>, sym?: boolean ):
  StringLiteral<S> & NumericLiteral<N> {
  if ((sym) && ( s.length !== n.length )) { throw new Error( ERRORMSG ); }

  let o = Object.create( null );

      o = s.reduce(( res, key ) => {
        if ( key ) { res[key] = key; }
        return res;
      }, o );

      o = n.reduce(( res, key ) => {
        res[key] = key;
        return res;
      }, o );

  return o;
}

export function enumerate<S extends string, N extends number>( s : Array<S>, n : Array<N> ):
  { enumeration: StringLiteral<S> & NumericLiteral<N> & Enum<S,N>, base: StringLiteral<S> & NumericLiteral<N> } {

  let base = literals( s, n, true );

  let sub  = Object.create( base );
      /**
       *  Return all enumerations as enumerated names
       */
      sub.keys = () => { return s; };
      /**
       *  Return all enumerations as enumerated indexes
       */
      sub.indexes = () => { return n; }
      /**
       *  Returns an enumerated name from  an enumerated index/value
       *  (Transforms enum.number to enum.string)
       *
       *  Note: index may be misleading. it may be an index as well as any numeric literal.
       */
      sub.byIndex = ( index: N ) => { return s[ n.indexOf( index )]; };
      /**
       *  Returns an enumerated index/value from an enumerated name
       *  (Transforms enum.string to enum.number)
       */
      sub.indexOf = ( enumeration: S ) => { return n[ s.indexOf( enumeration )];};
      /**
       *  Normalizes any given enumerated name and enumerated index/value
       *  to an enumerated value.
       *  (Transforms enum.number and enum.string to enum.number)
       */
      sub.toIndex = ( value: N | S ) => {
        if (( typeof value ) === "number" ) {
             return value;
        }
        else if (( typeof value ) === "string" ) {
             return sub.indexOf( value );
        }
        else throw new Error( `T<Enumeration>::toIndex( value ) -  parameter value: unknown literal '${ value }'` );
      };
      /**
       *  Normalizes any given enumerated name and enumerated index/value
       *  to an enumerated name.
       *  (Transforms enum.number and enum.string to enum.string)
       */
      sub.toKey = ( value: N | S ) => {
        if (( typeof value ) === "number" ) {
             return sub.byIndex( value );
        }
        else if (( typeof value ) === "string" ) {
             return value;
        }
        else throw new Error( `T<Enumeration>::toIndex( value ) -  parameter value: unknown literal '${ value }'` );
      };

  return { enumeration: sub, base: base };
}

export function flag<S extends string, N extends number>( s : Array<S>, n : Array<N> ):
  { enumeration: StringLiteral<S> & NumericLiteral<N> & Flag<S,N>, base: StringLiteral<S> & NumericLiteral<N> } {

    let base = literals( s, n, false );

    let sub  = Object.create( base );
        /**
         *  Return all flag names
         */
        sub.keys = () => { return s; };
        /**
         *  Return a value with ored flags
         *  or( ...flag : S | N ): N;
         */
        sub.or = ( ...flags: Array<S|N> ) => {
          return flags.reduce(( result, flag ) => {
            if (( typeof flag ) === "string" ) {
                  return result | sub.toValue( flag );
            }
            else return result | <N>flag;
          }, 0 );
        }
        /**
         *  Returns true, if flag is set in value
         *  test( value : S | N, flag S ): boolean;
         */
        sub.test = ( value : S | N, flag: S ) => {
          if (( typeof value ) === "string" ) {
                if ( value !== flag ) {
                     value = sub.toValue( value );
                }
                else return true;
          }
          return <N>value & sub.toValue( flag );
        }
        /**
         *  Return all possible flag settings
         */
        sub.values = () => { return n; }
        /**
         *  Return a flags value (2^n) from a flags name or value (2^n)
         *  toValue( key : S | N ): N;
         */
        sub.toValue = ( value : S | N ) => {
          if (( typeof value ) === "number" ) {
               return value;
          }
          else if (( typeof value ) === "string" ) {
               let index = s.indexOf( <S>value );
                   index = ( index == 0 ) ? 0 : (( index === ( s.length - 1 )) ? ( n.length - 1 ) : 1 << ( index - 1 ));
               return n[ index ];
          }
          else throw new Error( `T<Enumeration>::toIndex( value ) -  parameter value: unknown literal '${ value }'` );
        };
        /**
         *  Normalizes a value to its flag values
         *  toValues( value: S | N ): Array<N>;
         */
        sub.toValues = ( value : S | N ) => {
          let ret = Array<N>();
          if (( typeof value ) === "string" ) {
                value = sub.toValue( value );
          }
          let j    = 0;
          let curr = ( 1 << j++ );
          while ( curr <= value ) {
            if ( <N>value & curr ) {
                 ret.push( n[curr]);
            }
            curr = ( 1 << j++ );
          }
          return ret;
        }
        /**
         *  Normalizes a value to its flag keys
         *  toKeys( value: S | N ): Array<S>;
         */
        sub.toKeys = ( value : S | N ) => {
          let ret = Array<S>();
          if (( typeof value ) === "string" ) {
                value = sub.toValue( value );
          }
          let j    = 0;
          let curr = ( 1 << j++ );
          while ( curr <= value ) {
            if ( <N>value & curr ) {
                 ret.push( s[j]);
            }
            curr = ( 1 << j++ );
          }
          return ret;
        }

    return { enumeration: sub, base: base };
}
