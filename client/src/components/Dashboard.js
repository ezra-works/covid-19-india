import React from 'react';
import StateName from './StateName';
import StatusActive from './StatusActive';
import StatusRecovered from './StatusRecovered';
import StatusDeceased from './StatusDeceased';
import StatusTotal from './StatusTotal';

const Dashboard = (props) => {
  return (
    <div className="innerContainer">
      <div>
        <h5 for="StateName">Region</h5>
        <StateName stateId={props.stateId} data={props.data} />
      </div>
      <div>
        <h5 for="StatusActive">Active</h5>
        <StatusActive stateId={props.stateId} data={props.data} />
      </div>
      <div>
        <h5 for="StatusRecovered">Recovered</h5>
        <StatusRecovered stateId={props.stateId} data={props.data} />
      </div>
      <div>
        <h5 for="StatusDeceased">Deceased</h5>
        <StatusDeceased stateId={props.stateId} data={props.data} />
      </div>
      <div>
        <h5 for="StatusTotal">Total</h5>
        <StatusTotal stateId={props.stateId} data={props.data} />
      </div>
    </div>
  );
};

export default Dashboard;
