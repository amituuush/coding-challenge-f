let input = 'arrived_destination_port, customs_cleared\ncustoms_cleared, departed_destination_port\nsent_delivery_order_to_trucker, trucker_confirmed_delivery_order\narrived_destination_port, undergoing_usda_exam\narrived_destination_port, undergoing_fda_hold\ntrucker_confirmed_delivery_order, delivery_scheduled\nundergoing_usda_exam, customs_cleared\nundergoing_fda_hold, customs_cleared\ncustoms_cleared, delivery_scheduled\ndelivery_scheduled, departed_destination_port';

/*

arrived_destination_port, customs_cleared
customs_cleared, departed_destination_port
sent_delivery_order_to_trucker, trucker_confirmed_delivery_order
arrived_destination_port, undergoing_usda_exam
arrived_destination_port, undergoing_fda_hold
trucker_confirmed_delivery_order, delivery_scheduled
undergoing_usda_exam, customs_cleared
undergoing_fda_hold, customs_cleared
customs_cleared, delivery_scheduled
delivery_scheduled, departed_destination_port

=>

sent_delivery_order_to_trucker, arrived_destination_port
undergoing_usda_exam, undergoing_fda_hold, trucker_confirmed_delivery_order
customs_cleared
delivery_scheduled
departed_destination_port

*/

input = input.split('\n');

input = input.map((line) => {
    return line.split(', ');
})

console.log('input', input);

let dependencies = {};

// create dependencies object where each property's values are events that occur before it
input.forEach((line) => {
    const first = line[0];
    const second = line[1];
    
    // if later event hasn't been created on dependencies, create new prop on dependencies and set it equal to array with first value.
    if (dependencies[second] === undefined){
        dependencies[second] = {};
        dependencies[second][first] = true;
    // if later event has already been creater, simply push first to second prop on dependencies
    } else {
        dependencies[second][first] = true;
    }
});

console.log('dependencies', dependencies);

// if first event hasn't been created on dependencies, set it equal to empty array
// finds events that don't appear second in input and therefore must occur first
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
// 
let resultArr = [];
let hasOccurred = {};

let dependenciesLength = Object.keys(dependencies).length;

while (dependenciesLength > 0) {
  let tempArr = [];

  for (let dep in dependencies) {
    if (Object.keys(dependencies[dep]).length === 0) {
      tempArr.push(dep);
      hasOccurred[dep] = true;
      delete dependencies[dep];
    }
    dependenciesLength = Object.keys(dependencies).length;
  }
  resultArr.push(tempArr);

  for (let dep in dependencies) {
    for (let prop in dependencies[dep]) {
      if (hasOccurred[prop]) {
        delete dependencies[dep][prop];
      }
    }
  }
}

let result = '';

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

console.log('resultArr', resultArr);
console.log('result', result);

const output = 'sent_delivery_order_to_trucker, arrived_destination_port\nundergoing_usda_exam, undergoing_fda_hold, trucker_confirmed_delivery_order\ncustoms_cleared\ndelivery_scheduled\ndeparted_destination_port';

// console.log(output);
