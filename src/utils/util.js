/**
 * 合并两个数组
 * @param {*} arr1
 * @param {*} arr2
 */
export const getUnion = (arr1, arr2) => Array.from(new Set([...arr1, ...arr2]))
