export interface User {
    id?: string;
    email: string;
    password: string;
    name: string;
    avatar: string;
    projectIds: string[];
    roleIds: string[];
    token: string;
    dateOfBirth?: string;
    address?: Address;
    identity?: Identity;
}

// 地址
export interface Address {
    id?: string;
    province: string;
    city: string;
    district: string;
    street?: string;
}

// 身份
export interface Identity {
    identityNo: string;
    identityType: IdentityType;
}

// 证件类型
export enum IdentityType {
    Idcard = 0,
    Insurance,
    Passport,
    Military,
    Other
}
