import { statevalues } from './StateValues';

export const getRecoveredCount = (id) => {
  const countrystate = statevalues.find((states) => states.id === id);
  return countrystate.recovered;
};

export const getActiveCount = (id) => {
  const countrystate = statevalues.find((states) => states.id === id);
  return countrystate.active;
};

export const getDeceasedCount = (id) => {
  const countrystate = statevalues.find((states) => states.id === id);
  return countrystate.deceased;
};

export const getTotalCount = (id) => {
  return statevalues.reduce((states) => {
    if (states.id === id)
      return states.active + states.recovered + states.deceased;
    return 0;
  });
};
