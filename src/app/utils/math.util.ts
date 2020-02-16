// 获取两个数之间的随机整数
export const getRandomNuberByRange = (start: number, end: number): number => {
    return Math.floor(Math.random() * (end - start) + start);
};
