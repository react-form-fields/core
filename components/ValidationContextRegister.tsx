import * as React from 'react';

import { FieldValidation, IFieldValidationContext } from '../validator/context';
import FieldCoreBase from './FieldCoreBase';

interface IProps {
  field: FieldCoreBase;
}

export default class ValidationContextRegister extends React.PureComponent<IProps, {}> {
  private validationContext: IFieldValidationContext;

  private setContext = (newContext: IFieldValidationContext): React.ReactNode => {
    if (newContext === this.validationContext) return null;

    this.validationContext && this.validationContext.unregister(this.props.field);

    if (newContext) {
      this.validationContext = newContext;
      this.validationContext.register(this.props.field);
    }

    return null;
  }

  public componentWillMount() {
    this.validationContext && this.validationContext.unregister(this.props.field);
  }

  public render(): React.ReactNode {
    return (
      <FieldValidation.Consumer>
        {this.setContext}
      </FieldValidation.Consumer>
    );
  }
}