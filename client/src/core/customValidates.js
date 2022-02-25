const requireForArray = arr => arr && arr.length > 0;

const requireDate = date => date && ( date !== null || date !== undefined );


export { requireForArray, requireDate };
