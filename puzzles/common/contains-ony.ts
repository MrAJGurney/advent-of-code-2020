export const containsOnlyDigits =
    (text: string): boolean => /^\d+$/.test(text);

export const containsOnlyDigitsAndLowercaseLetters =
    (text: string): boolean => /^[a-z|\d]+$/.test(text);