export const onlyLetters = (value) => {
    let isValid = false
    const pattern = new RegExp('^[A-ZÁÉÍÓÚÑ ]+$', 'i')
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