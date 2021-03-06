import './App.css';

import ConfigProvider, { ConfigBuilder } from '@react-form-fields/core/ConfigProvider';
import langDefault from '@react-form-fields/core/ConfigProvider/langs/en-us';
import CustomMessage from '@react-form-fields/core/CustomMessage';
import ValidationContext, { IValidationContextRef } from '@react-form-fields/core/ValidationContext';
import React, { SyntheticEvent, useCallback, useRef, useState } from 'react';

import Field from './Field';
import logo from './logo.svg';

const fieldConfig = new ConfigBuilder().fromLang(langDefault).build();

const App: React.FC = () => {
  const validationContextRef = useRef<IValidationContextRef>();

  const [value, setValue] = useState('');
  const [valueMoney, setValueMoney] = useState('');
  const [valueRequired, setValueRequired] = useState('');
  const [showDynamic, setShowDynamic] = useState(false);
  const [valueDynamic, setValueDynamic] = useState('');
  const [formValid, setFormValid] = useState<boolean>();

  const onSubmitHandler = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    validationContextRef.current.isValid().then(isValid => {
      setFormValid(isValid);
    });
  }, [validationContextRef]);

  const onResetHandler = useCallback((e: SyntheticEvent) => {
    e.preventDefault();

    validationContextRef.current.reset();
    setFormValid(null);
    setValue('');
    setValueMoney('');
  }, [validationContextRef]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <form onSubmit={onSubmitHandler} onReset={onResetHandler}>
          <ConfigProvider value={fieldConfig}>

            <ValidationContext ref={validationContextRef}>
              <Field
                name='text'
                placeholder='Type something'
                value={value}
                validation='required|string|min:3|max:10'
                onChange={setValue}
              />

              <Field
                placeholder='Type money'
                mask='money'
                value={valueMoney}
                validation='numeric|min:3|max:10'
                onChange={setValueMoney}
              />

              <Field
                placeholder='Custom Required Message'
                value={valueRequired}
                validation='required'
                onChange={setValueRequired}
              >
                <CustomMessage rules='required'>Required custom message</CustomMessage>
              </Field>

              <label>
                <input
                  type='checkbox'
                  checked={showDynamic}
                  onChange={() => setShowDynamic(!showDynamic)}
                />
                Show Dynamic Input
              </label>

              {showDynamic &&
                <Field
                  placeholder='Dynamic Field'
                  value={valueDynamic}
                  validation='required|string|min:3|max:10'
                  onChange={setValueDynamic}
                />
              }

            </ValidationContext>
          </ConfigProvider>

          <br />
          <button type='submit'>Send</button>
          <button type='reset'>Reset</button>

          {formValid === true &&
            <p className='success'>Form Valid</p>
          }

          {formValid === false &&
            <p className='error'>Form invalid</p>
          }
        </form>


      </header>
    </div>
  );
}

export default App;
