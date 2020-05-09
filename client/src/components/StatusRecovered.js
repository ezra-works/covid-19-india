import React from 'react';
import { getRecoveredCount } from '../constants/StateCounts';

const StatusRecovered = ({ stateId }) => {
  return (
    <div>
      <h6>{getRecoveredCount(stateId)}</h6>
    </div>
  );
};

export default StatusRecovered;
