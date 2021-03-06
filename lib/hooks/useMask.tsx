import * as React from 'react';

import FieldValidationConfigContext from '../ConfigProvider/context';

export interface IUseMaskParams {
  value?: any;
  mask?: string;
}

const useMask = ({ mask, value }: IUseMaskParams) => {
  const configContext = React.useContext(FieldValidationConfigContext);
  if (!configContext) throw new Error('You must provide a valid FieldValidationConfigContext');

  const { apply: maskApply, clean: maskClean } = React.useMemo(() => {
    let maskFunc = (configContext.masks || []).find(m => m.name === mask);

    if (!maskFunc) {
      maskFunc = { name: 'not-found', apply: (v: string) => v, clean: v => v };
      mask && console.warn(`@react-form-fields/core: Mask '${mask}' not found`);
    }

    return maskFunc;
  }, [mask]);

  const maskedValue = React.useMemo(() => maskApply ? maskApply(value) : value, [value, maskApply]);
  const cleanedValue = React.useMemo(() => maskClean ? maskClean(value) : value, [value, maskClean]);

  return { maskApply, maskClean, maskedValue, cleanedValue };
};

export default useMask;