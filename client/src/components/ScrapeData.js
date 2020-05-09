import React, { Component } from 'react';
import { statevalues } from '../constants/StateValues';

export class ScrapeData extends Component {
  componentDidMount() {
    const scrapdata = async (endpoint) => {
      const res = await fetch(endpoint);
      let data = await res.text();
      // console.log('data : ' + data);
      return data;
    };

    scrapdata('/data.html')
      .then((x) => {
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(x, 'text/html');
        let totalStates = htmlDoc.querySelectorAll(
          '#chart > div.table-scroll.svelte-nim44h > table > tbody > tr'
        );
        // console.log('totalStateLoop: ', totalStates.length);
        let statedata = [];
        for (var i = 1; i <= totalStates.length; i++) {
          //'#chart > div.table-scroll.svelte-nim44h > table > tbody > tr:nth-child(1) > td.type-text.svelte-nim44h.first-mobile.first-desktop.force-padding.dw-bold'
          let stateName = htmlDoc.querySelector(
            '#chart > div.table-scroll.svelte-nim44h > table > tbody > tr:nth-child(' +
              i +
              ') > td.type-text.svelte-nim44h.first-mobile.first-desktop.force-padding.dw-bold'
          );
          stateName = stateName.textContent.trim();
          // console.log('stateName :' + stateName);
          let active = htmlDoc.querySelector(
            '#chart > div.table-scroll.svelte-nim44h > table > tbody > tr:nth-child(' +
              i +
              ') > td:nth-child(2) > div > div.bar.svelte-tqss2h > div:nth-child(2)'
          );
          active = Number(active.textContent.trim().replace(/,/, ''));
          // console.log('active :' + active);
          let recovered = htmlDoc.querySelector(
            '#chart > div.table-scroll.svelte-nim44h > table > tbody > tr:nth-child(' +
              i +
              ') > td:nth-child(3) > div > div.bar.svelte-tqss2h > div:nth-child(2)'
          );
          recovered = Number(recovered.textContent.trim().replace(/,/, ''));
          // console.log('recovered :' + recovered);
          let deceased = htmlDoc.querySelector(
            '#chart > div.table-scroll.svelte-nim44h > table > tbody > tr:nth-child(' +
              i +
              ') > td:nth-child(4) > div > div.bar.svelte-tqss2h > div:nth-child(2)'
          );
          deceased = Number(deceased.textContent.trim().replace(/,/, ''));
          // console.log('death :' + death);

          let statevalue = this.getStateValueByName(stateName);
          if (statevalue) {
            statevalue.active = active;
            statevalue.recovered = recovered;
            statevalue.deceased = deceased;
            statedata.push(statevalue);
          }
        }
        console.log('statedata: ' + JSON.stringify(statedata));
      })
      .catch((x) => console.log(x));
  }

  getStateValueByName = (name) => {
    let statevalue = statevalues.find((state) => state.name === name.trim());
    // console.log(name + ' getStateValueByName: ' + statevalue);
    return statevalue;
  };

  render() {
    return <></>;
  }
}

export default ScrapeData;
