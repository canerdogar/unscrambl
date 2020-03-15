import {CCValidationEnum, checkCreditCard, CreditCardType} from "../payment/CreditCardValidator";

test('test when valid mastercard is given', () => {
    expect(checkCreditCard("5500 0000 0000 0004", CreditCardType.MASTERCARD)).toBe(CCValidationEnum.VALID);
});

test('test when valid visa is given', () => {
    expect(checkCreditCard("4111 1111 1111 1111", CreditCardType.VISA)).toBe(CCValidationEnum.VALID);
});

test('test when no input is given', () => {
    expect(checkCreditCard("", CreditCardType.VISA)).toBe(CCValidationEnum.NO_INPUT);
    expect(checkCreditCard("", CreditCardType.MASTERCARD)).toBe(CCValidationEnum.NO_INPUT);
});

test('test when scam is given', () => {
    expect(checkCreditCard("5490 9977 7109 2064", CreditCardType.VISA)).toBe(CCValidationEnum.SCAM_ATTEMPT);
    expect(checkCreditCard("5490 9977 7109 2064", CreditCardType.MASTERCARD)).toBe(CCValidationEnum.SCAM_ATTEMPT);
});

test('test when invalid number is given', () => {
    expect(checkCreditCard("1111 1111 1111 1111", CreditCardType.VISA)).toBe(CCValidationEnum.INVALID);
    expect(checkCreditCard("1111 1111 1111 1111", CreditCardType.MASTERCARD)).toBe(CCValidationEnum.INVALID);
});

test('test when inappropriate format is given', () => {
    expect(checkCreditCard("1111 1111 A111", CreditCardType.VISA)).toBe(CCValidationEnum.INVALID_FORMAT);
    expect(checkCreditCard("1111 1111 A111", CreditCardType.MASTERCARD)).toBe(CCValidationEnum.INVALID_FORMAT);
});
