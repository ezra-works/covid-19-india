import React from 'react';

const StatusTotal = ({ stateId, data }) => {
  return (
    <div>
      <h6>
        {data.map((states) => {
          if (states.id === stateId) return states.total;
          return '';
        })}
      </h6>
    </div>
  );
};

export default StatusTotal;
