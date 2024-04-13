export const nameValidator = (value: string): string | false => {
    return /^[a-zA-Z ]+$/.test(value) ? false : "請輸入英文字母大小寫與空格";
};

export const flightValidator = (value: string): string | false => {
    return /^[a-zA-Z0-9]+$/.test(value) ? false : "請輸入英文字母與數字";
};

export const phoneValidator = (value: string): string | false => {
    return /^[0-9]+$/.test(value) ? false : "請輸入數字";
};

export const IDValidator = (value: string): string | false => {
    return /^[a-zA-Z0-9]+$/.test(value) ? false : "請輸入英文字母與數字";
};
