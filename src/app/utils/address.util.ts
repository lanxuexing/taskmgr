import { cityConfig } from '../configs';

// 获取省列表
export const getProvince = () => {
    const provinces = [];
    for (const province in cityConfig) {
        if (cityConfig.hasOwnProperty(province)) {
            provinces.push(province);
        }
    }
    return provinces;
};

// 通过省获取城市列表
export const getCitiesByProvince = (province: string) => {
    if (!province || !cityConfig[province]) {
        return [];
    }
    const cities = [];
    const value = cityConfig[province];
    for (const city in value) {
        if (value.hasOwnProperty(city)) {
            cities.push(city);
        }
    }
    return cities;
};

// 通过城市获取区县列表
export const getAreaByCity = (province: string, city: string) => {
    if (!province || !cityConfig[province] || !cityConfig[province][city]) {
        return [];
    }
    return cityConfig[province][city];
};
