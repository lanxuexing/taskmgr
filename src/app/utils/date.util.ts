import { differenceInYears, isDate, isFuture, isValid, parse } from 'date-fns';

// 校验是够是合法日期
export const isValidDate = (val: string): boolean => {
    const date = parse(val, 'yyyy-MM-dd', new Date());
    return isDate(date) && isValid(date) && !isFuture(date) && differenceInYears(Date.now(), date) < 150;
};
