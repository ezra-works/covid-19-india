import React from 'react';

const StatusActive = ({ stateId, data }) => {
  return (
    <div>
      <h6>
        {data.map((states) => {
          if (states.id === stateId) return states.active;
          return '';
        })}
      </h6>
    </div>
  );
};

export default StatusActive;
