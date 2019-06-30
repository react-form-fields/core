import { useMemo } from 'react';

import { IPropsFieldBase } from '../interfaces/props';

/* eslint-disable max-len */
export default function useMemoOtherProps<T extends IPropsFieldBase, A extends string>(props: T, ownProp: A): Omit<T, keyof IPropsFieldBase | A>;
export default function useMemoOtherProps<T extends IPropsFieldBase, A extends string, B extends string>(props: T, ownPropA: A, ownPropB: B): Omit<T, keyof IPropsFieldBase | A | B>;
export default function useMemoOtherProps<T extends IPropsFieldBase, A extends string, B extends string, C extends string>(props: T, ownPropA: A, ownPropB: B, ownPropC: C): Omit<T, keyof IPropsFieldBase | A | B | C>;
export default function useMemoOtherProps<T extends IPropsFieldBase, A extends string, B extends string, C extends string, D extends string>(props: T, ownPropA: A, ownPropB: B, ownPropC: C, ownPropD: D): Omit<T, keyof IPropsFieldBase | A | B | C | D>;
export default function useMemoOtherProps<T extends IPropsFieldBase, A extends string, B extends string, C extends string, D extends string, E extends string>(props: T, ownPropA: A, ownPropB: B, ownPropC: C, ownPropD: D, ownPropE: E): Omit<T, keyof IPropsFieldBase | A | B | C | D | E>;
export default function useMemoOtherProps<T extends IPropsFieldBase, A extends string, B extends string, C extends string, D extends string, E extends string, F extends string>(props: T, ownPropA: A, ownPropB: B, ownPropC: C, ownPropD: D, ownPropE: E, ownPropF: F): Omit<T, keyof IPropsFieldBase | A | B | C | D | E | F>;
export default function useMemoOtherProps<T extends IPropsFieldBase, A extends string, B extends string, C extends string, D extends string, E extends string, F extends string, G extends string>(props: T, ownPropA: A, ownPropB: B, ownPropC: C, ownPropD: D, ownPropE: E, ownPropF: F, ownPropG: G): Omit<T, keyof IPropsFieldBase | A | B | C | D | E | F | G>;
export default function useMemoOtherProps<T extends IPropsFieldBase, A extends string, B extends string, C extends string, D extends string, E extends string, F extends string, G extends string, H extends string>(props: T, ownPropA: A, ownPropB: B, ownPropC: C, ownPropD: D, ownPropE: E, ownPropF: F, ownPropG: G, ownPropH: H): Omit<T, keyof IPropsFieldBase | A | B | C | D | E | F | G | H>;
export default function useMemoOtherProps<T extends IPropsFieldBase, A extends string, B extends string, C extends string, D extends string, E extends string, F extends string, G extends string, H extends string, I extends string>(props: T, ownPropA: A, ownPropB: B, ownPropC: C, ownPropD: D, ownPropE: E, ownPropF: F, ownPropG: G, ownPropH: H, ownPropI: I): Omit<T, keyof IPropsFieldBase | A | B | C | D | E | F | G | H | I>;
export default function useMemoOtherProps<T extends IPropsFieldBase, A extends string, B extends string, C extends string, D extends string, E extends string, F extends string, G extends string, H extends string, I extends string, J extends string>(props: T, ownPropA: A, ownPropB: B, ownPropC: C, ownPropD: D, ownPropE: E, ownPropF: F, ownPropG: G, ownPropH: H, ownPropI: I, ownPropJ: J): Omit<T, keyof IPropsFieldBase | A | B | C | D | E | F | G | H | I | J>;
export default function useMemoOtherProps<T extends IPropsFieldBase, A extends string, B extends string, C extends string, D extends string, E extends string, F extends string, G extends string, H extends string, I extends string, J extends string, L extends string>(props: T, ownPropA: A, ownPropB: B, ownPropC: C, ownPropD: D, ownPropE: E, ownPropF: F, ownPropG: G, ownPropH: H, ownPropI: I, ownPropJ: J, ownPropL: L): Omit<T, keyof IPropsFieldBase | A | B | C | D | E | F | G | H | I | J | L>;
export default function useMemoOtherProps<T extends IPropsFieldBase>(props: T, ...ownProps: string[]): any {
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
    'ref',
    'key',
    ...(ownProps || [])
  ];

  return useMemo(() => {
    return Object.keys(props).reduce((acc, key) => {
      if (!excludeProps.includes(key)) {
        acc[key] = props[key];
      }

      return acc;
    }, {});
  }, Object.keys(props).reduce((acc, key) => {
    if (!excludeProps.includes(key)) {
      acc.push(props[key]);
    }

    return acc;
  }, []));
}