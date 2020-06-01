import React, { Component } from 'react';
import MyMaps from './components/MyMaps';
import Dashboard from './components/Dashboard';
import AppNavbar from './components/AppNavbar';
import './styles/App.css';

class App extends Component {
  state = {
    id: 'IN-ALL',
    data: [],
  };

  componentDidMount() {
    const scrapdata = async (endpoint) => {
      const res = await fetch(endpoint);
      let data = await res.json();
      return data;
    };

    scrapdata('/data')
      .then((data) => {
        this.onScrapdata(data);
      })
      .catch((x) => console.log(x));
  }

  onScrapdata = (data) => {
    this.setState({ ...this.state, data });
  };
  onMapStateChange = (id) => {
    // this.setState({ id: 'IN-KL' });
    this.setState({ id });
  };
  render() {
    return (
      <>
        <AppNavbar></AppNavbar>
        <Dashboard stateId={this.state.id} data={this.state.data}></Dashboard>
        {<h3 className="spaceify"></h3>}
        <MyMaps
          paddingRight={20}
          stateId={this.state.id}
          onMapStateChange={this.onMapStateChange}></MyMaps>
      </>
    );
  }
}

export default App;
