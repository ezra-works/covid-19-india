import React from 'react';
import { getDeceasedCount } from '../constants/StateCounts';

const StatusDeceased = ({ stateId }) => {
  return (
    <div>
      <h6>{getDeceasedCount(stateId)}</h6>
    </div>
  );
};

export default StatusDeceased;
