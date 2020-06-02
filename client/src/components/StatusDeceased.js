import React from 'react';

const StatusDeceased = ({ stateId, data }) => {
  return (
    <div>
      <h6>
        {data.map((states) => {
          if (states.id === stateId) return states.deceased;
          return '';
        })}
      </h6>
    </div>
  );
};

export default StatusDeceased;
