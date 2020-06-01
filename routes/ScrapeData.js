const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
let stateValues;

// const endpoint = 'https://datawrapper.dwcdn.net/h5y2W/42/';
// const endpoint = 'http://covidindiaupdates.in/';
const endpoint = 'https://www.datawrapper.de/_/h5y2W/';
const datafile = path.join(__dirname, '../data.json');
const statefile = path.join(__dirname, '../statevalue.json');

// asyn func to scrape covid data
const scrapdata = async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(endpoint);
  dumpFrameTree(page.mainFrame(), '');

  // set the frame that has the table
  const frame = page
    .frames()
    .find((frame) => frame.name() === 'datawrapper-chart-h5y2W');
  // .find((frame) => frame.url() === 'https://datawrapper.dwcdn.net/h5y2W/42/');

  // get the rows
  const trs = await frame.$x(
    '//*[@id="chart"]/div[2]/table/tbody/tr',
    (element) => element.textContent
  );
  //   console.log(trs.length);

  // prepare the value to send
  const data = [];
  let totalStateActive = 0;
  let totalStateRecovered = 0;
  let totalStateDeceased = 0;
  let totalStateAdded = 0;
  stateValues = readDefaultStateValue();

  for (const tr of trs) {
    // const label = await frame.evaluate((el) => el.innerText, option);
    const rowval = await tr.$$eval('td', (tds) =>
      tds.map((td) => td.innerText)
    );

    let val = getStateValueByName(rowval[0]);
    if (val) {
      // val.name = rowval[0];
      val.active = Number(rowval[1].split('\n', 1)[0].replace(/,/, ''));
      val.recovered = Number(rowval[2].split('\n', 1)[0].replace(/,/, ''));
      val.deceased = Number(rowval[3].split('\n', 1)[0].replace(/,/, ''));
      val.total = Number(rowval[4].split('\n', 1)[0].replace(/,/, ''));

      totalStateActive += val.active;
      totalStateRecovered += val.recovered;
      totalStateDeceased += val.deceased;
      totalStateAdded += val.total;
      data.push(val);
    }
  }

  // Calculate All states total
  let allstates = {
    id: 'IN-ALL',
    name: 'India-All-States',
    active: totalStateActive,
    recovered: totalStateRecovered,
    deceased: totalStateDeceased,
    total: totalStateAdded,
  };
  // console.log('allstates ' + allstates);
  data.push(allstates);

  await browser.close();
  return data;

  function dumpFrameTree(frame, indent) {
    console.log(indent + frame.url() + indent + frame.name());
    for (const child of frame.childFrames()) {
      dumpFrameTree(child, indent + '  ');
    }
  }
};

// Read Dummy data
const readDefaultStateValue = () => {
  let defaultData = fs.readFileSync(statefile, 'utf8');
  return JSON.parse(defaultData);
};

// Map country states by Name
const getStateValueByName = (name) => {
  let statevalue = stateValues.find((state) => state.name === name.trim());
  return statevalue;
};

// custom
Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

// func to get data file stats
const getFileStats = () => {
  let mtime = new Date().addHours(-3);
  if (fs.existsSync(datafile)) {
    const stats = fs.statSync(datafile);
    mtime = stats.mtime;
  }
  return mtime;
};

// true if the data file's modified time is less than an hour
const doIneedToScrape = (mtime) => {
  const now = new Date();
  console.log('getFileStats ' + mtime + ' now ' + now);
  const timediff = Math.abs(now - mtime);
  const LAST_HOUR = 60 * 60 * 1000;
  console.log('timediff : ' + timediff + ' LAST_HOUR: ' + LAST_HOUR);
  if (timediff < LAST_HOUR) return false;
  else return true;
};

// Route /
router.get('/', (req, res) => {
  const mtime = getFileStats();
  const shouldScrape = doIneedToScrape(mtime);

  // scrape if data file is old than an hour
  if (shouldScrape) {
    console.log('file modified an hour ago');
    scrapdata()
      .then((x) => {
        fs.writeFile(datafile, JSON.stringify(x), 'utf8', (err) => {
          if (err) throw err;
          console.log('Done writing'); // Success
        });
        res.send(x);
      })
      .catch((x) => res.send('no data available' + x));
  } else {
    console.log('data file generated less than 1 day so using it');
    fs.readFile(datafile, (err, data) => {
      if (err) throw err;
      res.send(JSON.parse(data));
    });
  }
});

module.exports = router;
