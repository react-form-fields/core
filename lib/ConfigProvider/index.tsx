import * as React from 'react';

import ConfigBuilderClass from './builder';
import FieldValidationConfigContext, { IConfig } from './context';

export { IConfig } from './context';
export const ConfigBuilder = ConfigBuilderClass;

export interface IConfigProviderProps extends React.Props<{}> {
  value: IConfig;
}

const ConfigProvider = React.memo<IConfigProviderProps>((props) => {
  const currentConfig = React.useContext(FieldValidationConfigContext);
  const config = React.useMemo(() => ({
    ...(currentConfig || {}), ...(props.value || {})
  }), [currentConfig, props.value]);

  return (
    <FieldValidationConfigContext.Provider value={config}>
      {props.children}
    </FieldValidationConfigContext.Provider>
  );
});

export default ConfigProvider;