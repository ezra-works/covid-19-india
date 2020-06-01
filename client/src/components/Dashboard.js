import React from 'react';
import StatusRecovered from './StatusRecovered';
import StatusActive from './StatusActive';
import StatusDeceased from './StatusDeceased';
import StatusTotal from './StatusTotal';

const Dashboard = (props) => {
  return (
    // <Container className="split right">
    // <Container style={{ marginTop: '8em' }}>
    //   <Row>
    //     <Col>
    //       <Label for="StatusActive">Active</Label>
    //       <StatusActive stateId={props.stateId} />
    //     </Col>
    //     <Col>
    //       <Label for="StatusRecovered">Recovered</Label>
    //       <StatusRecovered stateId={props.stateId} />
    //     </Col>
    //     <Col>
    //       <Label for="StatusDeceased">Deceased</Label>
    //       <StatusDeceased stateId={props.stateId} />
    //     </Col>
    //   </Row>
    // </Container>
    <div className="innerContainer">
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
