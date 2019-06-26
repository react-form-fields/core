import * as React from 'react';
import { ErrorMessages } from 'validatorjs';

export interface IMask extends IMaskFunction {
  name: string;
}

export interface IMaskFunction {
  apply(value: string | number): string;
  clean(value: string): string | number;
}

export interface IConfig {
  masks?: IMask[];
  validation?: {
    lang: string;
    customMessages?: ErrorMessages;
  };
}

const FieldValidationConfigContext = React.createContext<IConfig>({});
export default FieldValidationConfigContext;
