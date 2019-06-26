import useMask from '@react-form-fields/core/hooks/useMask';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { IPropsFieldBase } from '@react-form-fields/core/interfaces/props';
import React, { useCallback } from 'react';

interface IProps extends IPropsFieldBase {
  placeholder: string;
  value: string;
  onChange(value: string): void;
}

const Field = React.memo((props: IProps) => {
  const { onChange, placeholder } = props;
  const { errorMessage, showError, setDirty } = useValidation(props);
  const { maskedValue, maskClean } = useMask(props);

  const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDirty(true);
    onChange(maskClean(e.currentTarget.value) as string);
  }, [onChange, setDirty, maskClean]);

  return (
    <div className='input-container'>
      <input
        type='text'
        placeholder={placeholder}
        value={maskedValue}
        onChange={onChangeHandler}
      />

      {showError && errorMessage &&
        <p className='error'>{errorMessage}</p>
      }
    </div>
  )
});

export default Field;


