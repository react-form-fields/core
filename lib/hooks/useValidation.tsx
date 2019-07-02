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
  const configContext = React.useContext(FieldValidationConfigContext);
  const fieldContext = React.useContext(FieldValidationContext);

  if (!configContext) throw new Error('You must provide a valid FieldValidationConfigContext');

  const [dirty, setDirty] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const customMessages = React.useMemo(() => {
    return React.Children
      .toArray(children)
      .filter((child: any) => child.type === CustomMessage)
      .reduce<ErrorMessages>((acc, child: any) => {
        child.props.rules.split(',').forEach((rule: string) => acc[rule] = child.props.children);
        return acc;
      }, { ...(configContext.validation || { customMessages: {} }).customMessages });
  }, [children, configContext]);

  const errorMessage = React.useMemo(() => {
    return errorProp || validate(name, value, validation, validationContext, validationAttributeNames, customMessages).message;
  }, [name, value, validation, validationContext, validationAttributeNames, customMessages, errorProp]);

  React.useEffect(() => {
    fieldContext && fieldContext.register(uuid, {
      isValid: !errorMessage,
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