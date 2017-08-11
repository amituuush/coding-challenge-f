const sortShipments = (input) => {
  
  // convert input into array of 2-tuples
  input = input.split('\n').map((line) => {
      return line.split(', ');
  });

  // convert data into hash (dependencies object) with all events and their associated dependency(ies)
  let dependencies = {};

  input.forEach((line) => {
      const first = line[0];
      const second = line[1];
      
      // if later event hasn't been created on dependencies, set it as new property on dependencies and set it equal to a hash with event that occurred before it as a prop on said hash.
      if (dependencies[second] === undefined){
          dependencies[second] = {};
          dependencies[second][first] = true;
      // if later event has already been created, simply add earlier event to later event's hash
      } else {
          dependencies[second][first] = true;
      }
  });

  // if earlier event hasn't been created on dependencies, set it as prop on dependencies and set it equal to empty hash
  // this grabs the remaining events that don't appear second in input and therefore must occur before any event
  input.forEach((line) => {
      const first = line[0];
      if (dependencies[first] === undefined){
          dependencies[first] = {};
      }
  });

  // find properties with array length === 0 (nothing can come before it)
  // add those properties to tempArr and to hasOccurred
  // push tempArr to result
  // delete properties from dependencies (so you don't look again through them)
  // go through dependencies and search for properties that have hasOccurred as a prop...delete prop (changed from arr to obj for faster lookup)
  // go until dependencies has 0 properties
  // add them to `hasOccurred`

  let resultArr = [];
  let hasOccurred = {};
  let dependenciesLength = Object.keys(dependencies).length;

  while (dependenciesLength > 0) {
    let tempArr = [];

    // find all events with no dependencies and push to `tempArr`
    // add them to `hasOccurred` and remove them as events from dependencies object
    for (let dep in dependencies) {
      if (Object.keys(dependencies[dep]).length === 0) {
        tempArr.push(dep);
        hasOccurred[dep] = true;
        delete dependencies[dep];
      }
      dependenciesLength = Object.keys(dependencies).length;
    }

    // push any events with no dependencies on the same loop (tempArr) to `resultArr`
    resultArr.push(tempArr);

    // loop through every event's dependencies to check if any of these dependencies match any properties on hasOccurred. If so, delete that dependency from its associated event.
    for (let dep in dependencies) {
      for (let prop in dependencies[dep]) {
        if (hasOccurred[prop]) {
          delete dependencies[dep][prop];
        }
      }
    }
  }

  // formatting for printed result
  let result = '\n';

  resultArr.forEach((line) => {
    let tempLine = '';
    line.forEach((event, index) => {
      if (index === line.length - 1) {
        tempLine += event + '\n';
      } else {
        tempLine += event + ', '
      }
    });
    result += tempLine;
  });

  console.log(result);
}

module.exports = sortShipments;