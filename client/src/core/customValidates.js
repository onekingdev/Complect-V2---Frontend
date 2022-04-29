const requireForArray = arr => arr && arr.length > 0;

const requireDate = date => date && ( date !== null || date !== undefined );

const numberGreaterThanZero = number => number && number > 0;

const sameAsWith = compareWith => ( value, siblings ) => value === siblings[compareWith];

export { requireForArray, requireDate, numberGreaterThanZero, sameAsWith };
