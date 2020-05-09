import React from 'react';
import { Container, Row, Col, Label } from 'reactstrap';
import StatusRecovered from './StatusRecovered';
import StatusActive from './StatusActive';
import StatusDeceased from './StatusDeceased';
// import PropTypes from 'prop-types';

const Dashboard = (props) => {
  return (
    // <Container className="split right">
    <Container style={{ marginTop: '8em' }}>
      <Row>
        <Col>
          <Label for="StatusActive">Active</Label>
          <StatusActive stateId={props.stateId} />
        </Col>
        <Col>
          <Label for="StatusRecovered">Recovered</Label>
          <StatusRecovered stateId={props.stateId} />
        </Col>
        <Col>
          <Label for="StatusDeceased">Deceased</Label>
          <StatusDeceased stateId={props.stateId} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
