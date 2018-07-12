import * as React from 'react';
import { ErrorMessages } from 'validatorjs';

import { getMask, IMaskFunction } from '../mask';
import { validate } from '../validator';
import { FieldValidation, IFieldValidationContext } from '../validator/context';
import CustomMessage from './CustomMessage';

export interface IStateFieldBase {
  touched: boolean;
  errorMessage: string;
  submitted: boolean;
}

export interface IPropsFieldBase {
  name?: string;
  value?: any;
  validation?: string;
  validationContext?: Object;
  errorMessage?: string;
  submitted?: boolean;
  mask?: string;
  children?: React.ReactNode;
}

export default class FieldCoreBase<
  P extends IPropsFieldBase = IPropsFieldBase,
  S extends IStateFieldBase = IStateFieldBase
  > extends React.PureComponent<P, S> {

  protected validationContext: IFieldValidationContext;

  constructor(props: any) {
    super(props);
    this.state = { touched: false, error: null } as any;
  }

  get errorMessage() {
    const { errorMessage: errorProp } = this.props;
    const { submitted, touched, errorMessage } = this.state;

    return submitted || touched ?
      errorProp || errorMessage : null;
  }

  get isRequired() {
    return (this.props.validation || '').includes('required');
  }

  get mask(): IMaskFunction {
    let mask = getMask(this.props.mask);

    if (!mask) {
      mask = { apply: v => v, clean: v => v };
      this.props.mask && console.warn(`@react-form-fields/core: Mask '${this.props.mask}' not found`)
    }

    return mask;
  }

  static getDerivedStateFromProps({ name, value, validation, validationContext, children, submitted }: IPropsFieldBase, currentState: IStateFieldBase): IStateFieldBase {
    const customMessages = React.Children
      .toArray(children)
      .reduce<ErrorMessages>((acc, child: any) => {
        if (child.type === CustomMessage) {
          child.props.rules.split(',').forEach((rule: string) => {
            acc[rule] = child.props.children;
          });
        }

        return acc;
      }, {});

    const error = validate(name, value, validation, validationContext, customMessages);

    return {
      ...currentState,
      submitted: submitted !== undefined ? submitted : currentState.submitted,
      errorMessage: error.message
    };
  }

  public componentWillUnmount() {
    this.validationContext && this.validationContext.unregister(this);
  }

  public setFormSubmitted = (submitted: boolean) => {
    this.setState({ submitted });
  }

  public resetState = () => {
    this.setState({ submitted: false, touched: false });
  }

  public isValid = () => {
    return !this.state.errorMessage && !this.props.errorMessage;
  }

  public setContext = (newContext: IFieldValidationContext): React.ReactNode => {
    if (newContext === this.validationContext) return null;

    this.validationContext && this.validationContext.unregister(this);

    if (newContext) {
      this.validationContext = newContext;
      this.validationContext.register(this);
    }

    return null;
  }

  public render() {
    return (
      <FieldValidation.Consumer>
        {this.setContext}
      </FieldValidation.Consumer>
    );
  }
}