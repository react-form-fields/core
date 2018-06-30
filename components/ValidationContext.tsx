import * as React from 'react';

import { FieldValidation, IFieldValidationContext } from '../validator/context';
import FieldCoreBase from './FieldCoreBase';

export default class ValidationContext extends React.PureComponent<{}> {
  public fields: FieldCoreBase<any, any>[] = [];
  private registerFields: IFieldValidationContext = {
    register: field => {
      this.fields.push(field);
    },
    unregister: field => {
      const index = this.fields.findIndex(f => f === field);
      this.fields.splice(index, 1);
    }
  };

  public isValid = (formSubmitted: boolean = true): boolean => {
    this.fields.forEach(f => f.setFormSubmitted(formSubmitted));
    return this.checkValidation();
  }

  public reset = (): void => {
    this.fields.forEach(f => f.setFormSubmitted(false));
  }

  private checkValidation = (): boolean => {
    if (!this.fields.length) {
      console.warn('@react-form-fields/core: There is no field registred');
    }

    return this.fields.every(f => f.isValid());
  }

  public render(): React.ReactNode {
    return (
      <FieldValidation.Provider value={this.registerFields}>
        {this.props.children}
      </FieldValidation.Provider>
    )
  }
}