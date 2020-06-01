import React from 'react';

const StatusRecovered = ({ stateId, data }) => {
  return (
    <div>
      <h6>
        {data.map((states) => {
          if (states.id === stateId) return states.recovered;
        })}
      </h6>
    </div>
  );
};

export default StatusRecovered;
