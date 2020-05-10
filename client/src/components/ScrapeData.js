import React, { Component } from 'react';
import { statevalues } from '../constants/StateValues';

export class ScrapeData extends Component {
  componentDidMount() {
    const scrapdata = async (endpoint) => {
      const res = await fetch(endpoint);
      let data = await res.json();
      return data;
    };

    scrapdata('/data')
      .then((data) => {
        let statedata = [];
        data.forEach((element) => {
          let statevalue = this.getStateValueByName(element.name);
          if (statevalue) {
            statevalue.active = element.active;
            statevalue.recovered = element.recovered;
            statevalue.deceased = element.deceased;
            statedata.push(statevalue);
          }
        });
      })
      .catch((x) => console.log(x));
  }

  getStateValueByName = (name) => {
    let statevalue = statevalues.find((state) => state.name === name.trim());
    return statevalue;
  };

  render() {
    return <></>;
  }
}

export default ScrapeData;
