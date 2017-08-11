# Coding Challenge
Thanks for checking out my submission to your coding challenge! See below for instructions on testing and an overview of my work.

## Local Testing

1. Clone repo locally
2. Navigate to repo in terminal
3. run `node program.js`

If you'd like to run additional test cases, simply replace data in `input.txt` with your test case and run `node program.js` while making sure there are no extra lines at the bottom of the file.


## Overview

Please note: In addition to this overview, I've inserted corresponding comments throughout my code.

I initially format the data into an array of 2-tuples, reflecting the order of the input data. I then convert this data into a hash (called `eventDependencies`) of all events with their values being every event that must come before it (as properties on another hash). See code for how I did this. 

*Moving forward, I'll refer to the `eventDependencies` object as 'eventDependencies', any property on it as 'event', and any property(ies) on an 'event' as a 'dependency' or 'dependencies'.

```
eventDependencies: { 
  customs_cleared: {
    // we know all these dependencies need to occur before their corresponding event (customs_cleared in this case)
    // Same goes for the remaining events and dependencies
    arrived_destination_port: true,
    undergoing_usda_exam: true,
    undergoing_fda_hold: true 
  },
  departed_destination_port: { 
    customs_cleared: true, 
    delivery_scheduled: true 
  },
  trucker_confirmed_delivery_order: { 
    sent_delivery_order_to_trucker: true 
  },
  undergoing_usda_exam: { 
    arrived_destination_port: true 
  },
  undergoing_fda_hold: { 
    arrived_destination_port: true 
  },
  delivery_scheduled: { 
    trucker_confirmed_delivery_order: true,
    customs_cleared: true 
  },
  arrived_destination_port: {},
  sent_delivery_order_to_trucker: {},
}
```

With the data formatted this way, we can loop through events on eventDependencies and automatically conclude that events with no dependencies (on any given loop) can be placed at the front of `sortedEvents` since no other event(s) need to come before it. Events with no dependencies on the same loop can be pushed together at the conclusion of the loop from `lineOfEvents` to `sortedEvents` because we don't know which should come first between events in the same `lineOfEvents`.

We also know that if any event has been placed in the `sortedEvents`, we want to account for it and remove it as a dependency from other events since it's currently in its proper place in the timeline and all remaining events occur after it. To do this, we first add it as a property to `hasOccurred`, delete it as an event from eventDependencies, and then loop through every event's dependencies to check if any of these dependencies match any properties on `hasOccurred`. If so, we delete that dependency from its associated event. 

From here, we just need to continue looping through eventDependencies until all events have been accounted for and are removed. We then know they are all in their proper order in `sortedEvents`.

The remainder of the code is simply formatting `sortedEvents` to match the challenge's specifications and finally printing the `result`.