const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
// const endpoint = 'https://datawrapper.dwcdn.net/h5y2W/42/';
// const endpoint = 'http://covidindiaupdates.in/';
const endpoint = 'https://www.datawrapper.de/_/h5y2W/';

// asyn func to scrape covid data
const scrapdata = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(endpoint);
  dumpFrameTree(page.mainFrame(), '');

  // set the frame that has the table
  const frame = page
    .frames()
    .find((frame) => frame.url() === 'https://datawrapper.dwcdn.net/h5y2W/42/');

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
      active: Number(rowval[1].split('\n', 1)),
      recovered: Number(rowval[2].split('\n', 1)),
      deceased: Number(rowval[3].split('\n', 1)),
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

router.get('/', (req, res) => {
  scrapdata()
    .then((x) => res.send(x))
    .catch((x) => res.sendStatus(404).send('no data available'));
});

module.exports = router;
