export const sellFormValuereplacer = (key, value) => {
    // Filtering out properties
    // if (key === 'buyer') {
    //   return value && value.hasOwnProperty('id') ? value.id : null;
    // }
    return value;
  }
  export const leafNodes = (obj): any => {
    let leaf = {};
    Object.keys(obj).forEach(key => {
      if (obj[key] instanceof Object) {
        leaf = Object.assign(
          leafNodes({
            ...obj[key]
          }),
          leaf);
      } else  {
        leaf = Object.assign(obj, leaf);
      }
    });
    return leaf;
  }
