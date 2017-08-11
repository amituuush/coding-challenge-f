const { convertToEventDependenciesObj, sortEvents, formatSortedEvents } = require('./sortShipmentsMethods.js');

const sortShipments = (input) => {
  const eventDependencies = convertToEventDependenciesObj(input);
  const sortedEvents = sortEvents(eventDependencies);
  const result = formatSortedEvents(sortedEvents);

  console.log(result);
}

module.exports = sortShipments;