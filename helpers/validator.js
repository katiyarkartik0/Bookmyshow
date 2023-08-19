class Validator {
  constructor() {}
  fieldValidation(collectionOfFields) {
    const errors = [];
    Object.keys(collectionOfFields).forEach((fieldName) => {
      const fieldValue = collectionOfFields[fieldName];
      const isFieldValid =
        typeof fieldValue === "string" && fieldValue.length > 0;
      if (!isFieldValid) {
        errors.push(fieldName);
      }
    });
    if (errors.length > 0) {
      return {
        isValid: false,
        errors,
        msg: "please provide valid inputs",
      };
    }
    return {
      isValid: true,
    };
  }
  isValidNumber(collectionOfFields) {
    const errors = [];
    Object.keys(collectionOfFields).forEach((fieldName) => {
      const fieldValue = collectionOfFields[fieldName];
      const isFieldValid = isNaN(fieldValue) === false;
      if (!isFieldValid) {
        errors.push(fieldName);
      }
    });
    if (errors.length > 0) {
      return {
        isValid: false,
        errors,
        msg: "please provide valid inputs",
      };
    }
    return {
      isValid: true,
    };
  }
  isValidDate(date) {
    return date instanceof Date && !isNaN(date);
  }
}

module.exports = Validator;
