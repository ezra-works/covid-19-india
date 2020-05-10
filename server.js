const express = require('express');
const scrapdata = require('./routes/ScrapeData');
const app = express();

app.use(express.json());

// Use routes
app.use('/data', scrapdata);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started at ${port}`));
