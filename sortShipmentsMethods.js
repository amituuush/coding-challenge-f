const sortShipmentsMethods = {
  convertToEventDependenciesObj: function(input) {
    // convert input into array of 2-tuples
    input = input.split('\n').map(line => {
        return line.split(', ');
    });

    // convert data into hash (eventDependencies) with all events and associated dependency(ies)
    let eventDependencies = {};

    input.forEach(line => {
        const first = line[0];
        const second = line[1];
        
        // if later event hasn't been created on eventDependencies, set it as new property on eventDependencies and set it equal to a hash with event that occurred before it as a prop on said hash.
        if (eventDependencies[second] === undefined){
            eventDependencies[second] = {};
            eventDependencies[second][first] = true;
        // if later event has already been created, simply add earlier event to later event's hash
        } else {
            eventDependencies[second][first] = true;
        }
    });

    // if earlier event hasn't been created on eventDependencies, set it as prop on eventDependencies and set it equal to empty hash
    // this grabs the remaining events that don't appear second in input and therefore must occur before any event
    input.forEach(line => {
        const first = line[0];
        if (eventDependencies[first] === undefined){
            eventDependencies[first] = {};
        }
    });

    return eventDependencies;
  },

  // use eventDependencies object and sort events
  sortEvents: function(eventDependencies) {
    let sortedEvents = [];
    let hasOccurred = {};
    let eventDependenciesLength = Object.keys(eventDependencies).length;

    while (eventDependenciesLength > 0) {
      let lineOfEvents = [];

      // find all events with no dependencies and push to `lineOfEvents`
      // add them to `hasOccurred` and remove them as events from eventDependencies object
      for (let event in eventDependencies) {
        if (Object.keys(eventDependencies[event]).length === 0) {
          lineOfEvents.push(event);
          hasOccurred[event] = true;
          delete eventDependencies[event];
        }
        eventDependenciesLength = Object.keys(eventDependencies).length;
      }

      // push any events with no dependencies on the same loop (lineOfEvents) to `sortedEvents`
      sortedEvents.push(lineOfEvents);

      // loop through every event's dependencies to check if any match properties on hasOccurred. If so, delete that dependency from its associated event.
      for (let event in eventDependencies) {
        for (let dep in eventDependencies[event]) {
          if (hasOccurred[dep]) {
            delete eventDependencies[event][dep];
          }
        }
      }
    }

    return sortedEvents;
  },
  
  // format for printed result
  formatSortedEvents: function(sortedEvents) {
    let result = '\n';

    sortedEvents.forEach(lineOfEvents => {
      let tempLine = '';
      lineOfEvents.forEach((event, index) => {
        if (index === lineOfEvents.length - 1) {
          tempLine += event + '\n';
        } else {
          tempLine += event + ', '
        }
      });
      result += tempLine;
    });

    return result;
  }
};

module.exports = sortShipmentsMethods;