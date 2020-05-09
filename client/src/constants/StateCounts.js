import { statevalues } from './StateValues';

export const getRecoveredCount = (id) => {
  const countrystate = statevalues.find((states) => states.id === id);
  console.log(
    id + ' getRecoveredCount: ' + JSON.stringify(countrystate.recovered)
  );
  return countrystate.recovered;
};

export const getActiveCount = (id) => {
  const countrystate = statevalues.find((states) => states.id === id);
  console.log(id + ' getActiveCount: ' + JSON.stringify(countrystate.active));
  return countrystate.active;
};

export const getDeceasedCount = (id) => {
  const countrystate = statevalues.find((states) => states.id === id);
  console.log(
    id + ' getDeceasedCount: ' + JSON.stringify(countrystate.deceased)
  );
  return countrystate.deceased;
};

export const getTotalCount = (id) => {
  return statevalues.reduce((states) => {
    if (states.id === id)
      return states.active + states.recovered + states.deceased;
    return 0;
  });
  //   return countrystate.recovered + countrystate.active + countrystate.deceased;
};
