const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
// const endpoint = 'https://datawrapper.dwcdn.net/h5y2W/42/';
// const endpoint = 'http://covidindiaupdates.in/';
const endpoint = 'https://www.datawrapper.de/_/h5y2W/';
const datafile = path.join(__dirname, '../data.json');

// asyn func to scrape covid data
const scrapdata = async () => {
  const browser = await puppeteer.launch();
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
  for (const tr of trs) {
    // const label = await frame.evaluate((el) => el.innerText, option);
    const rowval = await tr.$$eval('td', (tds) =>
      tds.map((td) => td.innerText)
    );
    let val = {
      name: rowval[0],
      active: Number(rowval[1].split('\n', 1)[0].replace(/,/, '')),
      recovered: Number(rowval[2].split('\n', 1)[0].replace(/,/, '')),
      deceased: Number(rowval[3].split('\n', 1)[0].replace(/,/, '')),
    };
    // console.log(val);
    data.push(val);
  }

  await browser.close();
  return data;

  function dumpFrameTree(frame, indent) {
    console.log(indent + frame.url() + indent + frame.name());
    for (const child of frame.childFrames()) {
      dumpFrameTree(child, indent + '  ');
    }
  }
};

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

// func to get data file stats
const getFileStats = () => {
  let mtime = new Date().addHours(-2);
  if (fs.existsSync(datafile)) {
    const stats = fs.statSync(datafile);
    mtime = stats.mtime;
    console.log('getFileStats: ' + mtime);
  }
  return mtime;
};

// true if the data file's modified time is less than an hour
const doIneedToScrape = (mtime) => {
  const now = new Date();
  // now.addHours(-2);
  console.log('mtime ' + mtime + ' now ' + now);
  const timediff = Math.abs(now - mtime);
  const LAST_HOUR = 24 * 60 * 60 * 1000;
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
    console.log('file modified not less than 1 day');
    scrapdata()
      .then((x) => {
        fs.writeFile(datafile, JSON.stringify(x), 'utf8', (err) => {
          if (err) throw err;
          console.log('Done writing'); // Success
        });
        res.send(x);
      })
      .catch((x) => res.send('no data available'));
  } else {
    console.log('data file generated less than 1 day so using it');
    fs.readFile(datafile, (err, data) => {
      if (err) throw err;
      res.send(JSON.parse(data));
    });
  }
});

module.exports = router;
