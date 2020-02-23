export interface User {
    id?: string;
    email: string;
    password: string;
    name: string;
    avatar: string;
    dateOfBirth: string;
    projectIds: string[];
    roleIds: string[];
    token: string;
}
