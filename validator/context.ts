import * as React from 'react';

import FieldCoreBase from '../components/FieldCoreBase';

export interface IFieldValidationContext {
  getFields: () => FieldCoreBase[];
  register: (field: FieldCoreBase) => void;
  unregister: (field: FieldCoreBase) => void;
}

export const FieldValidation = React.createContext<IFieldValidationContext>(null);
