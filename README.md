![logo](https://avatars2.githubusercontent.com/u/40718737?s=50&v=4)  
React Form Fields: Core
------------------------------

See [API.md](https://github.com/react-form-fields/core/blob/master/API.md) for details

## Requirements 

* React >= 16.3.0

## Install

```bash
yarn add @react-form-fields/core
```

## Implementations

* [Material UI](https://github.com/react-form-fields/material-ui)
* [NativeBase](https://github.com/react-form-fields/native-base)

### How to Create a Form Field

```tsx
import FieldCoreBase, { IPropsFieldBase, IStateFieldBase } from '@react-form-fields/core/components/FieldCoreBase';

interface IState extends IStateFieldBase {
  //your state props
}

interface IProps extends IPropsFieldBase {
  // your props
}

class MyComponentField extends FieldCoreBase<IProps, IState> {
  //If you need getDerivedStateFromProps dont forget to call super 
  static getDerivedStateFromProps(props: IProps, currentState: IState): IState {
    const state = super.getDerivedStateFromProps(props, currentState);
    // your logic....
    return state;
  }

  onChange = event => {
    const value = this.mask.clean(event.target ? event.target.value : event);

    this.setState({ touched: true }); //<-- important to show the error
    this.props.onChange(value);
  }

  render() {
    const { label, name } = this.props;

    return (
      <Fragment>
        {/* import: register the field in the validation context */}
        <ValidationContextRegister field={this} />

        {/* isRequired: check if validation prop contains the required rule */}
        <label>{label} {this.isRequired ? '*' : ''}</label>
        <input 
          name={name}
          value={this.getMaskedValue}
          onChange={this.onChange}
        />

        {/* errorMessage will be null if submitted and touched are false  */}
        {this.errorMessage ? <p class="error">{this.errorMessage}</p> : null}
      </Fragment>
    );
  }
}
```

### Common Masks

#### PT-BR:

* zipcode
* phone
* document (CNPJ/CPF)
* cpf
* cnpj