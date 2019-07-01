import * as React from 'react';

import FieldValidationConfigContext from '../ConfigProvider/context';

const useConfigContext = () => {
  return React.useContext(FieldValidationConfigContext);
};

export default useConfigContext;