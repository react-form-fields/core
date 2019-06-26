import React from 'react';

import FieldValidationConfigContext from '../config/context';
import { IPropsFieldBase } from '../interfaces/props';

const useMask = ({ mask, value }: IPropsFieldBase) => {
  const configContext = React.useContext(FieldValidationConfigContext);

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