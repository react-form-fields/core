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