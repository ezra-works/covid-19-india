const express = require('express');
const scrapdata = require('./routes/ScrapeData');
const app = express();

app.use(express.json());

// app.get('/', (req, res) => res.send('Hello World!'));

// Use routes
app.use('/data', scrapdata);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started at ${port}`));
