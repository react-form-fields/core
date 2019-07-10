import * as React from 'react';
import { ErrorMessages } from 'validatorjs';

import ConfigBuilderClass from './builder';

export const ConfigBuilder = ConfigBuilderClass;

export interface IMask extends IMaskFunction {
  name: string;
}

export interface IMaskFunction {
  apply(value: string | number): string;
  clean(value: string): string | number;
}

export interface IConfig {
  validationDelay?: number;
  masks?: IMask[];
  validation?: {
    lang: string;
    customMessages?: ErrorMessages;
  };
}

const FieldValidationConfigContext = React.createContext<IConfig>(null);
export default FieldValidationConfigContext;
