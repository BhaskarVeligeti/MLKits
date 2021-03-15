/* eslint-disable no-mixed-spaces-and-tabs */
import * as ErrorMessages from './errorMessages.js';

/* 
Add new rule and then set the errorMessage

field=state[key] (fieldValue)
fieldName = label   

 */

export const required = (field, fieldName) => {
  // console.log('in required ', 'fieldValue :', field, 'fieldName :', fieldName)
  if (field && field !== "" && field.length > 0) {
    return null;
  } else {
    return ErrorMessages.isRequired(fieldName);
  }
  // console.log(`required :${field}`)
};


export const isString = (text, fieldName) => {
  const regexp = /^[a-zA-Z]+$/;
  if (text && text.match(regexp) === null) {
    return ErrorMessages.isString(fieldName);
  } else {
    return null;
  }
  // console.log(`stringOnly :${text.match(regexp)}`)
};


export const minLength = length => {
  return (field, fieldName) => {
    // console.log(field.length,"vs",length)
    if (field.length >= length) {
      return null;
    } else {
      return ErrorMessages.minLength(length)(fieldName);
    }
  };
};

export const maxLength = length => {
  return (field, fieldName) => {
    // console.log(field.length,"vs",length)
    if (field.length > length) {
      return ErrorMessages.maxLength(length)(fieldName);
    } else {
      return null;
    }
  };
};

export const isCellnumber = (text, fieldName) => {
  const regexp = /^[0-9]{10}$/;

  // console.log(`isCellnumber :${text.match(regexp)}`)

  if (text.match(regexp) == null) {
    return ErrorMessages.isCellNumber(fieldName);
  } else {
    return null;
  }
  // console.log(`isCellnumber :${text.match(regexp)}`)
};

export const isNumber = (text, fieldName) => {
	const regexp = /^[1-9]\d{0,9}$/;
	if (!text || !text.match(regexp)) {
	  return ErrorMessages.isNumber(fieldName);
	} else {
	  return null;
	}
  };

  export const isCurrency = (text, fieldName) => {
    const regexp = /^\d{1,10}(\.\d{2})?$/;
    if (!text || !text.match(regexp)) {
      return ErrorMessages.isDecimal(fieldName);
    } else {
      return null;
    }
  };

export const emailFormat = (text, fieldName) => {
  const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (text && text.match(regexp) === null) {
    return ErrorMessages.isEmail(fieldName);
  } else {
    return null;
  }
  // console.log(`stringOnly :${text.match(regexp)}`)
};

export const isSDP = (field, fieldName) => {
  // console.log('in isDRP ', 'fieldValue :', field, 'fieldName :', fieldName)
  // console.log(`startDate:${field.CreatedAt}`)
  if (field && field !== '') {
    return null;
  } else {
    return ErrorMessages.isRequired(fieldName);
  }
  // console.log(`required :${field}`)
};

export const isDRP = (field, fieldName) => {
  // console.log('in isDRP ', 'fieldValue :', field, 'fieldName :', fieldName)
  // console.log(`startDate:${field.startDate}`)
  // console.log(`startDate:${field.endDate}`)

  // please add more scenarios for error

  if (field && field !== '') {
    return null;
  } else {
    return ErrorMessages.isRequired(fieldName);
  }
  // console.log(`required :${field}`)
};