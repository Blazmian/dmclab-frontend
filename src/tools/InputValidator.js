export const onlyLetters = (value) => {
    let isValid = false
    const pattern = new RegExp('^[A-ZÁÉÍÓÚÑ ]+$', 'i')
    if (pattern.test(value)) {
        isValid = true
    }
    return isValid
}

export const onlyNumbers = (value) => {
    let isValid = false
    const pattern = new RegExp('^[0-9]+$', 'i')
    if (pattern.test(value)) {
        isValid = true
    }
    return isValid
}

export const validUserName = (value) => {
    let isValid = false
    const regex = /^[\p{L}\p{N}\.\-_]+$/u
    if (regex.test(value)) {
        isValid = true
    }
    return isValid
}

export const validateSecondLastName = (value) => {
    let isValid = false;
    const pattern = /^[a-zA-Z]*$|^null$|^undefined$/i; 
    if (pattern.test(value)) {
        isValid = true;
    }
    return isValid;
};

export const validateSerialNumber = (value) => {
    let isValid = false
    const pattern = new RegExp('/^[A-Z0-9-]{10}$/', 'i')
    if (pattern.test(value)) {
        isValid = true
    }
    return isValid
}
export const validateModel = (value) => {
    let isValid = false
    const pattern = new RegExp(/^[a-zA-Z0-9-]*$/, 'i')
    if (pattern.test(value)) {
        isValid = true
    }
    return isValid
}
