import React from 'react';
import { getActiveCount } from '../constants/StateCounts';

const StatusActive = ({ stateId }) => {
  return (
    <div>
      <h6>{getActiveCount(stateId)}</h6>
    </div>
  );
};

export default StatusActive;
