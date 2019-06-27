export interface IPropsFieldBase {
  name?: string;
  value?: any;
  validation?: string;
  validationContext?: Object;
  validationAttributeNames?: Object;
  errorMessage?: string;
  submitted?: boolean;
  mask?: string;
  children?: React.ReactNode;
}

/* eslint-disable no-trailing-spaces */
/**
 * Merge props from IPropsFieldBase and T removing U. Example:  
 * 
 * interface IProps extends PropsResolver<AnotherInterface, 'ignoreProps' | 'anotherProps'> {
 *  myProps: string;
 * }
 */
/* eslint-enable no-trailing-spaces */
export type PropsResolver<T, U = ''> =
  { [K in Exclude<keyof T, keyof IPropsFieldBase | U>]?: T[K]; } &
  { [K in keyof IPropsFieldBase]: IPropsFieldBase[K]; };

/* eslint-disable max-len */
export function getOtherProps<T extends IPropsFieldBase, A extends string>(props: T, ownProp: A): { [K in Exclude<keyof T, keyof IPropsFieldBase | A>]?: T[K]; };
export function getOtherProps<T extends IPropsFieldBase, A extends string, B extends string>(props: T, ownPropA: A, ownPropB: B): { [K in Exclude<keyof T, keyof IPropsFieldBase | A | B>]?: T[K]; };
export function getOtherProps<T extends IPropsFieldBase, A extends string, B extends string, C extends string>(props: T, ownPropA: A, ownPropB: B, ownPropC: C): { [K in Exclude<keyof T, keyof IPropsFieldBase | A | B | C>]?: T[K]; };
export function getOtherProps<T extends IPropsFieldBase, A extends string, B extends string, C extends string, D extends string>(props: T, ownPropA: A, ownPropB: B, ownPropC: C, ownPropD: D): { [K in Exclude<keyof T, keyof IPropsFieldBase | A | B | C | D>]?: T[K]; };
export function getOtherProps<T extends IPropsFieldBase, A extends string, B extends string, C extends string, D extends string, E extends string>(props: T, ownPropA: A, ownPropB: B, ownPropC: C, ownPropD: D, ownPropE: E): { [K in Exclude<keyof T, keyof IPropsFieldBase | A | B | C | D | E>]?: T[K]; };
export function getOtherProps<T extends IPropsFieldBase, A extends string, B extends string, C extends string, D extends string, E extends string, F extends string>(props: T, ownPropA: A, ownPropB: B, ownPropC: C, ownPropD: D, ownPropE: E, ownPropF: F): { [K in Exclude<keyof T, keyof IPropsFieldBase | A | B | C | D | E | F>]?: T[K]; };
export function getOtherProps<T extends IPropsFieldBase, A extends string, B extends string, C extends string, D extends string, E extends string, F extends string, G extends string>(props: T, ownPropA: A, ownPropB: B, ownPropC: C, ownPropD: D, ownPropE: E, ownPropF: F, ownPropG: G): { [K in Exclude<keyof T, keyof IPropsFieldBase | A | B | C | D | E | F | G>]?: T[K]; };
export function getOtherProps<T extends IPropsFieldBase, A extends string, B extends string, C extends string, D extends string, E extends string, F extends string, G extends string, H extends string>(props: T, ownPropA: A, ownPropB: B, ownPropC: C, ownPropD: D, ownPropE: E, ownPropF: F, ownPropG: G, ownPropH: H): { [K in Exclude<keyof T, keyof IPropsFieldBase | A | B | C | D | E | F | G | H>]?: T[K]; };
export function getOtherProps<T extends IPropsFieldBase, A extends string, B extends string, C extends string, D extends string, E extends string, F extends string, G extends string, H extends string, I extends string>(props: T, ownPropA: A, ownPropB: B, ownPropC: C, ownPropD: D, ownPropE: E, ownPropF: F, ownPropG: G, ownPropH: H, ownPropI: I): { [K in Exclude<keyof T, keyof IPropsFieldBase | A | B | C | D | E | F | G | H | I>]?: T[K]; };
export function getOtherProps<T extends IPropsFieldBase, A extends string, B extends string, C extends string, D extends string, E extends string, F extends string, G extends string, H extends string, I extends string, J extends string>(props: T, ownPropA: A, ownPropB: B, ownPropC: C, ownPropD: D, ownPropE: E, ownPropF: F, ownPropG: G, ownPropH: H, ownPropI: I, ownPropJ: J): { [K in Exclude<keyof T, keyof IPropsFieldBase | A | B | C | D | E | F | G | H | I | J>]?: T[K]; };
export function getOtherProps<T extends IPropsFieldBase, A extends string, B extends string, C extends string, D extends string, E extends string, F extends string, G extends string, H extends string, I extends string, J extends string, L extends string>(props: T, ownPropA: A, ownPropB: B, ownPropC: C, ownPropD: D, ownPropE: E, ownPropF: F, ownPropG: G, ownPropH: H, ownPropI: I, ownPropJ: J, ownPropL: L): { [K in Exclude<keyof T, keyof IPropsFieldBase | A | B | C | D | E | F | G | H | I | J | L>]?: T[K]; };
export function getOtherProps<T extends IPropsFieldBase>(props: T, ...ownProps: string[]): any {
  const excludeProps = [
    'name',
    'value',
    'validation',
    'validationContext',
    'validationAttributeNames',
    'errorMessage',
    'submitted',
    'mask',
    'children',
    ...(ownProps || [])
  ];

  return Object.keys(props).reduce((acc, key) => {
    if (!excludeProps.includes(key)) {
      acc[key] = props[key];
    }

    return acc;
  }, {});
}