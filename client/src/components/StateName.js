import React from 'react';

const StateName = ({ stateId, data }) => {
  return (
    <div>
      <h6>
        {data.map((states) => {
          if (states.id === stateId) return states.name;
        })}
      </h6>
    </div>
  );
};

export default StateName;
