import { isString, registerDecorator } from 'class-validator';
import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function IsE164PhoneNumber(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isE164PhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `${propertyName} must be a valid e.164 phone number`,
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          if (!isString(value)) {
            return false;
          }
          const phoneNumber = parsePhoneNumberFromString(value);
          return phoneNumber?.number == value && phoneNumber?.isValid();
        },
      },
    });
  };
}
