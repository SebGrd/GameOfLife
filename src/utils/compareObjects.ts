export function compareObjects(object1: object, object2: object) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    const values1 = Object.values(object1);
    const values2 = Object.values(object2);
    const sameKeys = keys1.every(((value, index) => value === keys2[index]))
    const sameValues = values1.every(((value, index) => value === values2[index]))
    return sameKeys && sameValues;
}
