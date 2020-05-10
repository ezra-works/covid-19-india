import React, { Component } from 'react';
import MyMaps from './components/MyMaps';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import { Container, Row, Col } from 'reactstrap';
import ScrapeData from './components/ScrapeData';

class App extends Component {
  state = {
    id: 'IN-TN',
  };
  onMapStateChange = (id) => {
    // this.setState({ id: 'IN-KL' });
    this.setState({ id });
  };
  render() {
    return (
      <>
        <ScrapeData />
        <AppNavbar></AppNavbar>
        <Container>
          <Row>
            <Col xs="6">
              <MyMaps
                paddingRight={20}
                stateId={this.state.id}
                onMapStateChange={this.onMapStateChange}></MyMaps>
            </Col>
            <Col>
              <Dashboard stateId={this.state.id}></Dashboard>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
