

function validate(obj: {[key:string]: string}, field: string, required: boolean, minLen: number, maxLen: number, regex?: RegExp): string | undefined {

    const value = obj[field];

    if (required && !value) {
        return field+' missing but required';
    }

    if (!value) return;

    if (minLen && value.length < minLen) return field+' too short';

    if (maxLen && value.length > maxLen) return field+' too long';

    if (!regex) return;

    if (!regex.test(value)) return field+' value invalid';

}

export default validate;


