API
---

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

```jsx
import { FieldCoreBase } from '@react-form-fields/core';

class MyComponentField extends FieldCoreBase {
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