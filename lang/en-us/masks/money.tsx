import padStart = require('lodash/padStart');

import { IMaskFunction } from '../../../mask';

const money: IMaskFunction = {
  apply: (value: number) => {
    if (value === null || value === undefined) return '';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  },
  clean: value => {
    value = (value || '').replace(/[^\d\,]/gi, '');

    if (!value.includes('.')) {
      value = '0.' + padStart(value, 2, '0');
    }

    const [, cents] = value.split('.');
    if (cents && cents.length != 2) {
      value = value.replace('.', '').replace(/(\d+)?(\d{2})/gi, '$1.$2').replace(/^\,/gi, '0.');
    }

    return parseFloat(value.replace(/\./gi, ''));
  }
};

export default money;