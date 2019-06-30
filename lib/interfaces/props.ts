import { Props } from 'react';

export interface IPropsFieldBase<Ref = {}> extends Props<Ref> {
  name?: string;
  value?: any;
  validation?: string;
  validationContext?: Object;
  validationAttributeNames?: Object;
  errorMessage?: string;
  mask?: string;
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
export type PropsResolver<T, U extends string = '', Ref = {}> =
  Omit<T, keyof IPropsFieldBase<Ref> | U> &
  Omit<IPropsFieldBase<Ref>, U>;