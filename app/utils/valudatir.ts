export const nameValidator = (value: string): string | false => {
    if (!/^[a-zA-Z ]+$/.test(value)) return "請輸入英文字母大小寫與空格";
    return false;
};

export const flightValidator = (value: string): string | false => {
    if (!/^[a-zA-Z]+$/.test(value)) return "請輸入英文字母大小寫";
    return false;
};

export const phoneValidator = (value: string): string | false => {
    if (!/^[0-9]+$/.test(value)) return "請輸入數字";
    return false;
};

export const IDValidator = (value: string): string | false => {
    if (!/^[a-zA-Z0-9]+$/.test(value)) return "請輸入英文字母與數字";
    return false;
};
