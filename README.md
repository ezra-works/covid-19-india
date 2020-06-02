# covid-19-india

A React app [https://covid-19-india1.herokuapp.com/] using MERN stack (without the M 😉) provides current covid-19 India status. It uses context API and props for state management. A simple express backend route to fetch the data and react frontend to render. The data is refreshed daily once and cached locally so no need of a database as of now.


## Examples
![Alt text](github.gif?raw=true "Covid-19 India")

- On initial page load, the data is fectched and cached locally. 
- Click the states to view the current status
- Click Home button to go back
- Districts within the states won't provide the individual status but rather provides the state's
- gathering districts status I'm not doing it now. Feel free to fork if required.
- Clicking on the Banner will provide overall status

## Running the tests

tests won't break at this point because there are no tests.

## Deployment

The project is deployed using [Heroku Cloud Platform](https://www.heroku.com) 

## Built With

* Node v12.14.1 
* React ^16.13.1 (refer package.json)
* express ^4.17.1 (refer package.json)
* [Heroku Cloud Platform](https://www.heroku.com)


## Authors

* **Ezra Moses Rajkumar** - *Initial work* - [Ezra](https://github.com/ezra-moses)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [amcharts4](https://github.com/amcharts/amcharts4) - for rendering the maps
* [shklnrj](https://github.com/shklnrj/IndiaStateTopojsonFiles) - Indian states geojson
* [geojson](https://geojson.org) - geographic data structures as map inputs
* [puppetter](https://github.com/puppeteer/puppeteer) - for web scrapping
