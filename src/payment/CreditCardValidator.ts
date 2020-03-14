interface CreditCard {
    name: CreditCardType,
    length: string;
    prefixes: string;
    checkdigit: boolean;
}

export enum CreditCardType {
    VISA = 0,
    MASTERCARD = 1,
}

const creditCards: CreditCard[] = [
    {
        name: CreditCardType.VISA,
        length: "13,16",
        prefixes: "4",
        checkdigit: true
    },
    {
        name: CreditCardType.MASTERCARD,
        length: "16",
        prefixes: "51,52,53,54,55",
        checkdigit: true
    }
];

export enum CCValidationEnum {
    NO_INPUT = "No card number provided",
    INVALID_FORMAT = "Credit card number is in invalid format",
    INVALID = "Credit card number is invalid",
    INAPPROPRIATE_NUMBER = "Credit card number has an inappropriate number of digits",
    SCAM_ATTEMPT = "Warning! This credit card number is associated with a scam attempt",
    VALID = "VALID",
}

export const checkCreditCard = (cardnumber: string, creditCardType: CreditCardType): CCValidationEnum => {

    // Ensure that the user has provided a credit card number
    if (cardnumber.length === 0)  {
        return CCValidationEnum.NO_INPUT;
    }

    // Now remove any spaces from the credit card number
    cardnumber = cardnumber.replace (/\s/g, "");

    // Check that the number is numeric
    let cardNo = cardnumber
    let cardexp = /^[0-9]{13,19}$/;
    if (!cardexp.exec(cardNo))  {
        return CCValidationEnum.INVALID_FORMAT;
    }

    // Now check the modulus 10 check digit

    let checksum = 0;                                  // running checksum total
    let j = 1;                                         // takes value of 1 or 2

    // Process each digit one by one starting at the right
    let calc;
    for (let i = cardNo.length - 1; i >= 0; i--) {

        // Extract the next digit and multiply by 1 or 2 on alternative digits.
        calc = Number(cardNo.charAt(i)) * j;

        // If the result is in two digits add 1 to the checksum total
        if (calc > 9) {
            checksum = checksum + 1;
            calc = calc - 10;
        }

        // Add the units element to the checksum total
        checksum = checksum + calc;

        // Switch the value of j
        if (j === 1) {j = 2} else {j = 1};
    }

    // All done - if checksum is divisible by 10, it is a valid modulus 10.
    // If not, report an error.
    if (checksum % 10 !== 0)  {
        return CCValidationEnum.INVALID;
    }

    // Check it's not a spam number
    if (cardNo === '5490997771092064') {
        return CCValidationEnum.SCAM_ATTEMPT
    }

    // The following are the card-specific checks we undertake.
    let LengthValid = false;
    let PrefixValid = false;

    // We use these for holding the valid lengths and prefixes of a card type
    let prefix = [];
    let lengths = [];

    // Load an array with the valid prefixes for this card
    prefix = (creditCards[creditCardType]).prefixes.split(",");

    // Now see if any of them match what we have in the card number
    for (let i=0; i<prefix.length; i++) {
        var exp = new RegExp ("^" + prefix[i]);
        if (exp.test (cardNo)) PrefixValid = true;
    }

    // If it isn't a valid prefix there's no point at looking at the length
    if (!PrefixValid) {
        return CCValidationEnum.INVALID;
    }

    // See if the length is valid for this card
    lengths = creditCards[creditCardType].length.split(",");
    for (let j=0; j<lengths.length; j++) {
        if (cardNo.length === parseInt(lengths[j])) LengthValid = true;
    }

    // See if all is OK by seeing if the length was valid. We only check the length if all else was
    // hunky dory.
    if (!LengthValid) {
        return CCValidationEnum.INAPPROPRIATE_NUMBER;
    };

    // The credit card is in the required format.
    return CCValidationEnum.VALID;

}
