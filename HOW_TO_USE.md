# How To Use

### Base (Common props)

Component Base to create a form field.

| Props             | Required | Type                   | Description                                                            |
|-------------------|----------|------------------------|------------------------------------------------------------------------|
| name              | false    | string                 |                                                                        |
| value             | false    | any                    |                                                                        |
| submitted         | false    | boolean                | flag to set if form was submited (also can be set by setFormSubmitted) |
| validation        | false    | string                 | rules of validation                                                    |
| validationContext | false    | object { prop: value } | extra fields for validation bind (ex. required_if)                     |
| errorMessage      | false    | string                 | custom error message from external validation                          |

### How to Create a Form Field

```tsx
import FieldCoreBase, { IPropsFieldBase, IStateFieldBase } from '@react-form-fields/core/components/FieldCoreBase';

interface IState extends IStateFieldBase {
  //your state props
}

interface IProps extends IPropsFieldBase {
  // your props
  onChange: (value: string) => void;
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

### How extends default config

```ts
// your config/index.ts
import * as coreConfig from '@react-form-fields/core/config';

declare module '@react-form-fields/core/config' {
  interface IConfig {
    newProps?: string;
  }
}

const defaultConfig: coreConfig.IConfig = {
  newProps: 'teste'
};

export function getConfig(): coreConfig.IConfig {
  return {
    ...defaultConfig,
    ...(coreConfig.getConfig() || {})
  };
}

export function setConfig(config: coreConfig.IConfig) {
  coreConfig.setConfig(config);
}

// your config/builder.ts
import { IConfig } from '@react-form-fields/core/config';
import CoreConfigBuilder from '@react-form-fields/core/config/builder';

export default class ConfigBuilder extends CoreConfigBuilder {
  public setNewProps(newProps: string) {
    this.config = {
      ...this.config,
      newProps: newProps
    };

    return this; // <-- always return this
  }
}
```