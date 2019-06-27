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
