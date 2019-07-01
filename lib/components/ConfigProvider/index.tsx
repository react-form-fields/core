import * as React from 'react';

import ConfigBuilderClass from './builder';
import FieldValidationConfigContext, { IConfig } from './context';

export { IConfig } from './context';
export const ConfigBuilder = ConfigBuilderClass;

export interface IConfigProviderProps extends React.Props<{}> {
  value: IConfig;
}

const ConfigProvider = React.memo<IConfigProviderProps>((props) => {
  return (
    <FieldValidationConfigContext.Provider value={props.value}>
      {props.children}
    </FieldValidationConfigContext.Provider>
  );
});

export default ConfigProvider;