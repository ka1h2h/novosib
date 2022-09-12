

function WidgetFieldValidation({ options, data, fetchDataById }) { 
    if (String(typeof options.min) !== 'undefined' || options.min) {  
        if (data.fieldValue.length < options.min) {
            return { validate: false, error: `Минимальная длина данного поля ${options.min} символов` }
        }
    }
    if (String(typeof options.max) !== 'undefined' || options.max) {
        if (data.fieldValue.length > options.max) {
            return { validate: false, error: `Максимальная длина данного поля ${options.max} символов` }
        }
    }
    if (String(typeof options.required) !== 'undefined' || options.required) {
        const checkField = fetchDataById[data.fieldName];
        if (checkField === '' || String(typeof checkField) === 'undefined') {
            return { validate: false, error: `Обязательное поле` }
        }
        return { validate: true, error: '' }
    }
    return { validate: true, error: `` }

}

export default WidgetFieldValidation