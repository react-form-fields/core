import * as React from 'react';

import ConfigProvider, { IConfig } from './ConfigProvider';
import { FieldValidationContext, IFieldValidationContext, IFieldValidationContextRegister } from './validator/context';

export interface IProps extends React.Props<IValidationContextRef> {
  config?: IConfig;
}

export interface IValidationContextRef {
  isValid(formSubmitted?: boolean): Promise<boolean>;
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
    isValid: async (formSubmitted = true) => {
      const values = Object.values(fields);
      values.forEach(v => v.onSubmitChange(formSubmitted));

      const statuses = await Promise.all(values.map(f => f.isValid));
      return statuses.every(isValid => isValid);
    },
    reset: () => Object.values(fields).forEach(f => f.onResetRequested())
  }), []);

  return (
    <ConfigProvider value={props.config}>
      <FieldValidationContext.Provider value={context}>
        {props.children}
      </FieldValidationContext.Provider>
    </ConfigProvider>
  );
}));

export default ValidationContext;