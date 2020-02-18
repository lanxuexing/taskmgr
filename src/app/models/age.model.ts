export interface Age {
    age: number;
    unit: AgeUnit
}

export enum AgeUnit {
    Year = 0,
    Month,
    Day
}