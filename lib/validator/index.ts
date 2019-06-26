import * as validator from 'validatorjs';

export function validate(
  fieldName: string,
  value: any,
  rules: string,
  context: any = {},
  attributeNames: any = {},
  customMessages: validator.ErrorMessages = null)
  : { valid: boolean, message?: string } {
  if (!rules) return { valid: true };

  fieldName = fieldName || 'value';
  const result = new validator({ [fieldName]: value, ...context }, { [fieldName]: rules }, customMessages);

  if (attributeNames) {
    result.setAttributeNames(attributeNames);
  }

  if (result.passes()) {
    return { valid: true };
  }

  const allErrors = result.errors.all();
  return { valid: false, message: allErrors[fieldName][0] };
}

export function useLang(lang: string) {
  validator.useLang(lang);
}

export function addLang(lang: string, messages: validator.ErrorMessages) {
  validator.setMessages(lang, messages);
}