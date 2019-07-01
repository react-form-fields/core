import { AttributeFormatter, ErrorMessages, RegisterAsyncCallback, RegisterCallback, ValidatorStatic } from 'validatorjs';

import { IConfig, IMask } from './context';

const validator: ValidatorStatic = require('validatorjs');

export default class ConfigBuilder {
  protected config: IConfig;

  public constructor() {
    this.clean();
  }

  public addMask(name: string, apply: IMask['apply'], clean: IMask['clean']) {
    this.config.masks = [...this.config.masks, { name, apply, clean }];
    return this;
  }

  public addMasks(masks: IMask[]) {
    this.config.masks = [...this.config.masks, ...masks];
    return this;
  }

  public addValidator(name: string, callback: RegisterCallback, errorMessage: string) {
    validator.register(name, callback, errorMessage);
    return this;
  }

  public addValidatorAsync(name: string, callback: RegisterAsyncCallback, errorMessage: string) {
    validator.registerAsync(name, callback, errorMessage);
    return this;
  }

  public setValidatorAttributeFormatter(func: AttributeFormatter) {
    validator.setAttributeFormatter(func);
    return this;
  }

  public addCustomMessages(lang: string, customMessages: ErrorMessages) {
    this.config.validation = { lang, customMessages };
    return this;
  }

  public fromLang(lang: IConfig) {
    this.config = { ...lang };
    return this;
  }

  public build() {
    return this.config;
  }

  public clean() {
    this.config = { masks: [], validation: null };
    return this;
  }
}