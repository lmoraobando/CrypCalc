const isNumber = (value: any): boolean => {
    return (typeof value === 'number' && !isNaN(value))
        || ((typeof value === 'string') && value.trim() != '' && !isNaN(Number(value)))
}

export default isNumber;