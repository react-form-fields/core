# How To Use

See [API.md](https://github.com/react-form-fields/core/blob/master/API.md) to see all configs available

* [How to Create a Form Field](#how-to-create-a-form-field)
* [How to a custom validation rules](#how-to-a-custom-validation-rules)
* [How extends default config](#how-extends-default-config)
* [How to create or extends a language config](#how-to-create-or-extends-a-language-config)

## How to Create a Form Field

```tsx
import useMask from '@react-form-fields/core/hooks/useMask';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { IPropsFieldBase } from '@react-form-fields/core/interfaces/props';
import React, { useCallback } from 'react';

interface IProps extends IPropsFieldBase { // <~extends your interface props from IPropsFieldBase
  placeholder: string;
  value: string;
  onChange(value: string): void;
}

const Field = React.memo((props: IProps) => {
  const { onChange, placeholder } = props;

  const { errorMessage, showError, setDirty } = useValidation(props); // <~ Register your field and get validation
  const { maskedValue, maskClean } = useMask(props); // <~ (optional) get the mask info, don't worry if no mask was pass, there is a default
 
  const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDirty(true); // <~ remember to check your field as dirty
    onChange(maskClean(e.currentTarget.value) as string); // <~ (optional) always pass the "clean" value
  }, [onChange, setDirty, maskClean]);

  return (
    <div className='input-container'>
      <input
        type='text'
        placeholder={placeholder}
        value={maskedValue} // <~ (optional) use the masked value
        onChange={onChangeHandler}
      />

      {showError && errorMessage && // <~ use showError to know when the error message should be display
        <p className='error'>{errorMessage}</p>
      }
    </div>
  )
});

export default Field;
```

## How to a custom validation rules

See [validatorjs](https://github.com/skaterdav85/validatorjs#register-custom-validation-rules)

## How extends default config

We recommend you to always create these files to avoid imports from **@react-form-fields/core**
directly, you can copy and paste initially.

Create config/context.tsx

```tsx
import FieldValidationConfigContextCore, { IConfig as IConfigCore } from '@react-form-fields/core/config';
import ConfigBuilderClass from './builder';

export interface IConfig extends IConfigCore {
  myNewBrandConfigProp?: string; // <~ all configs are optional
}

export const ConfigBuilder = ConfigBuilderClass;
export default FieldValidationConfigContext = FieldValidationConfigContextCore;
```

Create config/builder.tsx

```tsx
import CoreConfigBuilder from '@react-form-fields/core/config/builder';
import { IConfig } from './context';

export default class ConfigBuilder extends CoreConfigBuilder {
  public setMyNewBrandConfigProp(myNewBrandConfigProp: string) {
    this.config = {
      ...this.config, // <~ keeps already set's configs
      myNewBrandConfigProp
    };

    return this; // <~ always return this
  }

  public clean() { // <~you can override the celan method to add you own default values
    return {
      ...super.clean(),
      myNewBrandConfigProp: 'my default value' 
    }
  }
}
```

## How to create or extends a language config

Create you lang file in langs/your-lang.ts

```ts
import { IConfig } from '.../config/context';
import coreLangPTBR from '@react-form-fields/core/lang/pt-br'; // <~ import original lang config
import * as locale from 'date-fns/locale/pt-BR';

const langPTBR: IConfig = {
  ...coreLangPTBR,  // <~ extends the original lang config
  // add your configs
  myNewBrandConfigProp: 'default value for the lang',
  masks: [
    ...coreLangPTBR.masks
    // your masks
  ],
  validations: {
    lang: 'you-new-lang',
    customMessages: {
      ...coreLangPTBR.validations.customMessages
      // override the default messages
    }
  }
};

export default langPTBR;
```