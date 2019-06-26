import * as React from 'react';

import { IPropsFieldBase } from '../interfaces/props';
import { getMask } from '../mask';

const useMask = ({ mask, value }: IPropsFieldBase) => {
  const { apply, clean } = React.useMemo(() => {
    let maskFunc = getMask(mask);

    if (!maskFunc) {
      maskFunc = { apply: (v: string) => v, clean: v => v };
      mask && console.warn(`@react-form-fields/core: Mask '${mask}' not found`);
    }

    return maskFunc;
  }, [mask]);

  const maskedValue = React.useMemo(() => apply ? apply(value) : value, [value, apply]);
  const cleanedValue = React.useMemo(() => clean ? clean(value) : value, [value, clean]);

  return { apply, clean, maskedValue, cleanedValue };
};

export default useMask;