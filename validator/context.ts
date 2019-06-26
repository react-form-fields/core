import * as React from 'react';

export interface IFieldValidationContext {
  register: (field: string, data: IFieldValidationContextRegister) => void;
  unregister: (field: string) => void;
}

export interface IFieldValidationContextRegister {
  isValid: boolean;
  onSubmitChange: (submitted: boolean) => void;
  onResetRequested: () => void;
}

export const FieldValidationContext = React.createContext<IFieldValidationContext>({
  register: () => { },
  unregister: () => { },
});
