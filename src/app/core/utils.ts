export const sellFormValuereplacer = (key, value) => {
    // Filtering out properties
    if (key === 'buyer') {
      return value && value.hasOwnProperty('id') ? value.id : null;
    }
    return value;
  }