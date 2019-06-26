# API

* [Validation Rules](#validation-rules)
* [Components](#components)
  * [CustomMessage](#custommessage)
  * [ValidationContext](#validationcontext)
* [Interfaces](#interfaces)
  * [IPropsFieldBase](#ipropsfieldbase)
* [Hooks](#hooks)
  * [useMask](#useMask)
  * [useValidation](#useValidation)

## Validation Rules

See [validatorjs](https://github.com/skaterdav85/validatorjs#available-rules) rules

## Components

### CustomMessage

Used to override a validation message, this will not output anything, just will change the default message of an error.

|  Props   | Required |             Type              |                 Description                 |
| -------- | -------- | ----------------------------- | ------------------------------------------- |
| rules    | true     | string                        | Rules separeted by common. Ex: required,min |
| children | true     | ReactNode (string, jsx e etc) | The new validation message                  |

Example:
```jsx
<YourFieldWithUseValidation>
  <CustomMessage rules='required'>Hey, this is required</CustomMessage>
</YourFieldWithUseValidation>
```

### ValidationContext

Used to control and check a group of fields.

| Props | Required | Type | Description |
| ----- | -------- | ---- | ----------- |
| none  |          |      |             |

|                Methods                 |    Return    |                                                        Description                                                        |
| -------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| isValid(formSubmitted: boolean = true) | boolean      | Check if all fiels are valid and set form as submitted or not                                                             |
| reset()                                | nothing/void | reset the state of form submission and all field are cleanup (dirty false), will not change any value of your model/state |

Example:
```tsx
import ValidationContext, { IValidationContextRef } from '@react-form-fields/core/components/ValidationContext';

const App = () => {
  const validationContextRef = useRef<IValidationContextRef>();

  //your form submission...
  validationContextRef.current.isValid();
  //....

  //your form reset...
  validationContextRef.current.reset();
  //....

  return (
    <ValidationContext ref={validationContextRef}>
      <YourFieldWithUseValidation/>
      <YourFieldWithUseValidation/>
      <YourFieldWithUseValidation/>
    </ValidationContext>
  );
}
```

## Interfaces

### IPropsFieldBase

Props Base to create a form field component.  
import from: @react-form-fields/core/interfaces/props

|          Props           | Required |          Type          |                              Description                               |
| ------------------------ | -------- | ---------------------- | ---------------------------------------------------------------------- |
| name                     | false    | string                 |                                                                        |
| value                    | false    | any                    |                                                                        |
| submitted                | false    | boolean                | flag to set if form was submited (also can be set by setFormSubmitted) |
| validation               | false    | string                 | rules of validation                                                    |
| validationContext        | false    | object { prop: value } | extra fields for validation bind (ex. required_if)                     |
| validationAttributeNames | false    | object { prop: value } | see: https://github.com/skaterdav85/validatorjs#custom-attribute-names |
| errorMessage             | false    | string                 | custom error message from external validation                          |

## Hooks

### useMask

| Result Props |   Type   |        Description        |
| ------------ | -------- | ------------------------- |
| maskApply    | Function | apply current mask        |
| maskClean    | Function | clean current mask        |
| maskedValue  | string   | value with mask applied   |
| cleanedValue | string   | value withou mask applied |

### useValidation

| Result Props |   Type   |                                                      Description                                                      |
| ------------ | -------- | --------------------------------------------------------------------------------------------------------------------- |
| isValid      | boolean  | if the field is valid or not                                                                                          |
| errorMessage | string   | current error message                                                                                                 |
| showError    | boolean  | if component should show the error message, true if form submitted or is field is dirty or errorMessage prop was pass |
| dirty        | boolean  | if the field was changed by your component                                                                            |
| setDirty     | Function | function to set if value was changed by your component                                                                |
| submitted    | boolean  | if form was submitted                                                                                                 |
