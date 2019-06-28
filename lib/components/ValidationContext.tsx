import * as React from 'react';

import { FieldValidationContext, IFieldValidationContext, IFieldValidationContextRegister } from '../validator/context';

export interface IProps extends React.Props<IValidationContextRef> {
  children?: React.ReactNode;
}

export interface IValidationContextRef {
  isValid(formSubmitted?: boolean): boolean;
  reset(): void;
}

const ValidationContext = React.memo(React.forwardRef<IValidationContextRef, IProps>((props, ref) => {
  const fields = React.useMemo<{ [key: string]: IFieldValidationContextRegister }>(() => ({}), []);
  const context = React.useMemo<IFieldValidationContext>(() => {
    return {
      register: (field, data) => fields[field] = data,
      unregister: field => delete fields[field],
    };
  }, []);

  React.useImperativeHandle(ref, () => ({
    isValid: (formSubmitted = true) => {
      const values = Object.values(fields);
      values.forEach(v => v.onSubmitChange(formSubmitted));
      return values.every(f => f.isValid);
    },
    reset: () => Object.values(fields).forEach(f => f.onResetRequested())
  }), []);

  return (
    <FieldValidationContext.Provider value={context}>
      {props.children}
    </FieldValidationContext.Provider>
  );
}));

export default ValidationContext;