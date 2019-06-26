/* eslint-disable camelcase */
import 'validatorjs/dist/lang/en';

import { IConfig } from '../../config/context';

const validation: IConfig['validation'] = {
  lang: 'custom-en-us',
  customMessages: {
    accepted: 'Must be accepted.',
    after: 'Must be after :after.',
    after_or_equal: 'Must be equal or after :after_or_equal.',
    alpha: 'Field must contain only alphabetic characters.',
    alpha_dash: 'Field may only contain alpha-numeric characters, as well as dashes and underscores.',
    alpha_num: 'Field must be alphanumeric.',
    before: 'Must be before :before.',
    before_or_equal: 'Must be equal or before :before_or_equal.',
    between: 'Field must be between :min and :max.',
    confirmed: 'Confirmation does not match.',
    email: 'Format is invalid.',
    date: 'Is not a valid date format.',
    def: 'Attribute has errors.',
    digits: 'Must be :digits digits.',
    different: 'And :different must be different.',
    in: 'Invalid.',
    integer: 'Must be an integer.',
    hex: 'Field should have hexadecimal format',
    min: {
      numeric: 'Must be at least :min.',
      string: 'Must be at least :min characters.'
    },
    max: {
      numeric: 'May not be greater than :max.',
      string: 'May not be greater than :max characters.'
    },
    not_in: 'Invalid.',
    numeric: 'Must be a number.',
    present: 'Field must be present (but can be empty).',
    required: 'Required.',
    required_if: 'Required when :other is :value.',
    required_unless: 'Required when :other is not :value.',
    required_with: 'Required when :field is not empty.',
    required_with_all: 'Required when :fields are not empty.',
    required_without: 'Required when :field is empty.',
    required_without_all: 'Required when :fields are empty.',
    same: ':same field must match.',
    size: {
      numeric: 'Must be :size.',
      string: 'Must be :size characters.'
    },
    string: 'Must be a string.',
    url: 'Format is invalid.',
    regex: 'Format is invalid.',
    attributes: {}
  }
};

export default validation;