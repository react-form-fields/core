export interface IPropsFieldBase {
  name?: string;
  value?: any;
  validation?: string;
  validationContext?: Object;
  validationAttributeNames?: Object;
  errorMessage?: string;
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
export type PropsResolver<T, U extends string = ''> =
  Omit<T, keyof IPropsFieldBase | U> &
  Omit<IPropsFieldBase, U>;