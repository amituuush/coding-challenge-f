const sortShipments = require('./sortShipments.js');
const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) throw err;
  sortShipments(data);
});