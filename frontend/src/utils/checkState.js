function is(x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    }
  
    return Number.isNaN(x) && Number.isNaN(y);
  }


export function isObjectPropEquals(objA, objB, keys) {
    if (is(objA, objB)) {
      return true;
    }
  
    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
      return false;
    }
  
    if (keys) {
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (!is(objA[key], objB[key])) {
          return false;
        }
      }
    } else {
      const keysA = Object.keys(objA);
      const keysB = Object.keys(objB);
  
      if (keysA.length !== keysB.length) {
        return false;
      }
  
      for (let i = 0; i < keysA.length; i++) {
        if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
          return false;
        }
      }
    }
    return true;
  }