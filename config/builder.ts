import { ErrorMessages } from 'validatorjs';

import { IConfig } from '.';
import { IMask } from '../mask';

export default class ConfigBuilder {
  protected config: IConfig;

  constructor() {
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

  public addCustomMessages(lang: string, customMessages: ErrorMessages) {
    this.config.validation = { lang, customMessages };
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