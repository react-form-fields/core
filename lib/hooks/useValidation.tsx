import * as React from 'react';
import * as uuidV4 from 'uuid/v4';
import { ErrorMessages } from 'validatorjs';

import FieldValidationConfigContext from '../ConfigProvider/context';
import CustomMessage from '../CustomMessage';
import { IPropsFieldBase } from '../interfaces/props';
import { validate } from '../validator';
import { FieldValidationContext } from '../validator/context';

const useValidation = ({
  name,
  value,
  validation,
  validationContext,
  validationAttributeNames,
  errorMessage: errorProp,
  children
}: IPropsFieldBase) => {
  const [uuid] = React.useState(uuidV4());
  const config = React.useContext(FieldValidationConfigContext);
  const fieldContext = React.useContext(FieldValidationContext);

  if (!config) throw new Error('You must provide a valid FieldValidationConfigContext');

  const [dirty, setDirty] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isValid, setIsValid] = React.useState(Promise.resolve(true));

  const customMessages = React.useMemo(() => {
    return React.Children
      .toArray(children)
      .filter((child: any) => child.type === CustomMessage)
      .reduce<ErrorMessages>((acc, child: any) => {
        child.props.rules.split(',').forEach((rule: string) => acc[rule] = child.props.children);
        return acc;
      }, { ...(config.validation || { customMessages: {} }).customMessages });
  }, [children, config]);

  React.useEffect(() => {
    if (errorProp) {
      setIsValid(Promise.resolve(false));
      setErrorMessage(errorProp);
      return () => { };
    }

    let isValidPromise: (isValid: boolean) => void;
    setIsValid(new Promise(r => isValidPromise = r));

    const timeout = setTimeout(() => {
      const errorMessage = validate(name, value, validation, validationContext, validationAttributeNames, customMessages).message;
      isValidPromise(!errorMessage);
      setErrorMessage(errorMessage);
    }, config.validationDelay === undefined ? 500 : config.validationDelay);

    return () => clearTimeout(timeout);
  }, [name, value, validation, validationContext, validationAttributeNames, customMessages, errorProp, setIsValid]);

  React.useEffect(() => {
    fieldContext && fieldContext.register(uuid, {
      isValid,
      onSubmitChange: (submitted) => setSubmitted(submitted),
      onResetRequested: () => { setSubmitted(false); setDirty(false); }
    });
    return () => fieldContext && fieldContext.unregister(uuid);
  }, [fieldContext, errorMessage, setSubmitted, setDirty]);

  return {
    isValid: !errorMessage,
    errorMessage,
    showError: submitted || dirty || !!errorProp,
    dirty,
    setDirty,
    submitted
  };
};

export default useValidation;