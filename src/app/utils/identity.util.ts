import { identityConfig } from '@configs/index';

// 提取身份证信息
export const extractInfo = (identityNo: string) => {
    const addrPart = identityNo.substring(0, 6);
    const birthPart = identityNo.substring(6, 14);
    return {
        addrCode: addrPart,
        dateOfBirth: birthPart && birthPart.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3') // 字符串 yyyymmdd 转换成日期格式 yyyy-mm-dd
    };
};

// 通过身份证号码获取地址
export const getAddrByCode = (code: string) => {
    const province = identityConfig[code.substring(0, 2) + '0000'];
    const city = identityConfig[code.substring(0, 4) + '00'].replace(province, '');
    const district = identityConfig[code].replace(province + city, '');
    return {
        province,
        city,
        district
    };
};

// 校验地址
export const isValidAddr = (addrCode: string) => {
    return identityConfig[addrCode] !== undefined;
};
