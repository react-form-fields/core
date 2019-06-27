import Validator, { AttributeFormatter, ErrorMessages, RegisterAsyncCallback, RegisterCallback } from 'validatorjs';

import { IConfig, IMask } from './context';

export default class ConfigBuilder<T extends IConfig = IConfig> {
  static create() {
    return new ConfigBuilder();
  }

  protected config: T;

  protected constructor() {
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
    Validator.register(name, callback, errorMessage);
    return this;
  }

  public addValidatorAsync(name: string, callback: RegisterAsyncCallback, errorMessage: string) {
    Validator.registerAsync(name, callback, errorMessage);
    return this;
  }

  public setValidatorAttributeFormatter(func: AttributeFormatter) {
    Validator.setAttributeFormatter(func);
    return this;
  }

  public addCustomMessages(lang: string, customMessages: ErrorMessages) {
    this.config.validation = { lang, customMessages };
    return this;
  }

  public fromLang(lang: T) {
    this.config = { ...lang };
    return this;
  }

  public build() {
    return this.config;
  }

  public clean() {
    this.config = { masks: [], validation: null } as T;
    return this;
  }
}