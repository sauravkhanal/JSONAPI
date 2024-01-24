const validateName = (value) => {
    const startsWithLetter = /^[a-zA-Z]/;
    const containsOnlyLettersAndNumbers = /^[a-zA-Z0-9]*$/;

    const errorMessages = {
        required: 'Name is required',
        minLength: 'Name must be at least 5 characters long',
        maxLength: 'Name cannot exceed 50 characters',
        startsWithLetter: 'Name must start with a letter',
        containsOnlyLettersAndNumbers: 'Name can only contain letters and numbers',
    };

    if (!containsOnlyLettersAndNumbers.test(value)) {
        return errorMessages.containsOnlyLettersAndNumbers;
    }

    if (!startsWithLetter.test(value)) {
        return errorMessages.startsWithLetter;
    }

    if (value.length < 5) {
        return errorMessages.minLength;
    }

    if (value.length > 50) {
        return errorMessages.maxLength;
    }


    return true; // Validation passed
};

export default validateName