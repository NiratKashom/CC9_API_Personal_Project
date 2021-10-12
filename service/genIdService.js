const { v4: uuidv4 } = require('uuid');

exports.genUserId = (arr) => {
  const firstLetter = arr.reduce((acc, item) => {
    item.slice(0, 1);
    return acc += item.slice(0, 1);
  }, '');
  const id = uuidv4().split('-').join('').slice(0, 12).toUpperCase();

  return firstLetter + id;
};

exports.genFlightId = (dest) => {
  let destName = '';
  switch (dest) {
    case 'moon':
      destName = 'mon';
      break;
    case 'mars':
      destName = 'mar';
      break;
    case 'jupiter':
      destName = 'jup';
      break;
    default:
      return;
  }
  const id = uuidv4().split('-').join('').slice(0, 15).toUpperCase();
  return destName.toUpperCase() + id;
};

exports.genFlightId = (dest) => {
  let destName = '';
  switch (dest) {
    case 'moon':
      destName = 'mon';
      break;
    case 'mars':
      destName = 'mar';
      break;
    case 'jupiter':
      destName = 'jup';
      break;
    default:
      return;
  }
  const id = uuidv4().split('-').join('').slice(0, 15).toUpperCase();
  return destName.toUpperCase() + id;
};

exports.genReserveId = (passengerId, flightId) => {
  return `${passengerId.slice(0, 7)}${flightId.slice(0, 7)}`;
};



