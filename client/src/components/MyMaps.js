import React, { Component } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4themes_dark from '@amcharts/amcharts4/themes/dark';
import am4themes_material from '@amcharts/amcharts4/themes/material';
import am4geodata_india2019Low from '@amcharts/amcharts4-geodata/india2019Low';

am4core.useTheme(am4themes_dark);

class MyMaps extends Component {
  componentDidMount() {
    let currentComponent = this;

    let map = am4core.create('mapdiv', am4maps.MapChart);
    let colorSet = new am4core.ColorSet();

    // Set map definition
    // map.geodata = am4geodata_worldIndiaLow;
    map.geodata = am4geodata_india2019Low;
    // map.geodataSource.url = '/IndiaStateTopojsonFiles/TamilNadu.geojson';

    // Set projection
    // map.projection = new am4maps.projections.Miller();

    // Disable zoom and pan
    map.seriesContainer.events.disableType('doublehit');
    map.chartContainer.background.events.disableType('doublehit');
    map.seriesContainer.draggable = false;
    map.seriesContainer.resizable = false;
    map.chartContainer.wheelable = false;

    // Create map polygon series
    let countrySeries = new am4maps.MapPolygonSeries();
    // Make map load polygon (like country names) data from GeoJSON
    countrySeries.useGeodata = true;
    countrySeries.calculateVisualCenter = true;
    map.series.push(countrySeries);

    // Configure series
    var polygonTemplate = countrySeries.mapPolygons.template;
    polygonTemplate.tooltipText = '{name}';
    polygonTemplate.fill = am4core.color('#74B266');
    // Set property fields
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeOpacity = 0.5;
    polygonTemplate.propertyFields.fill = 'fill';
    polygonTemplate.propertyFields.id = 'id';

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create('hover');
    hs.properties.fill = colorSet.getIndex(52); // am4core.color('#367B25');

    // Add some data
    // countrySeries.data = statecolors;
    // Set State colors
    countrySeries.events.on('beforedatavalidated', function (ev) {
      let source = ev.target.data;
      source.forEach((element) => {
        element.fill = colorSet.next();
      });
    });

    // map.events.on('ready', function (ev) {
    //   map.zoomToMapObject(countrySeries.getPolygonById('IN'));
    // });

    map.paddingRight = 20;
    this.map = map;

    // Create & add the Indian State Series
    let stateSeries = new am4maps.MapPolygonSeries();
    map.series.push(stateSeries);

    // Configure series
    let stateTemplate = stateSeries.mapPolygons.template;
    stateTemplate.tooltipText = '{Dist_Name}';
    stateTemplate.fill = am4core.color('#74B266');
    // Set property fields
    stateTemplate.propertyFields.fill = 'fill';
    stateTemplate.propertyFields.Dist_Name = 'Dist_Name';

    // Create hover state and set alternative fill color
    let ishs = stateTemplate.states.create('hover');
    ishs.properties.fill = colorSet.getIndex(9); //am4core.color('#367B25');

    stateSeries.geodataSource.events.on('done', function (ev) {
      am4core.unuseTheme(am4themes_dark);
      am4core.useTheme(am4themes_material);
      countrySeries.hide();
      stateSeries.show();
      back.show();
    });

    // Set district colors
    stateSeries.events.on('beforedatavalidated', function (ev) {
      let source = ev.target.data;
      source.forEach((element) => {
        element.fill = colorSet.next();
      });
    });

    // When User clicks on Country map
    countrySeries.mapPolygons.template.events.on('hit', function (ev) {
      // alert('Clicked on ' + ev.target.dataItem.dataContext.name);

      // Update React App State
      currentComponent.props.onMapStateChange(
        ev.target.dataItem.dataContext.id
      );

      const statename = ev.target.dataItem.dataContext.name.replace(/ /g, '');
      if (statename) {
        stateSeries.clearCache();
        stateSeries.geodataSource.url =
          '/IndiaStateTopojsonFiles/' + statename + '.geojson';
        // console.log('statename : ' + statename);
        stateSeries.useGeodata = true;
        stateSeries.calculateVisualCenter = true;
        stateSeries.geodataSource.load();
        ev.target.series.chart.zoomToMapObject(ev.target);
      }
    });

    // Home Button
    let back = map.chartContainer.createChild(am4core.Button);
    back.padding(5, 5, 5, 5);
    back.marginRight = '5%';
    back.align = 'right';
    back.valign = 'top';
    back.hide();
    back.events.on('hit', function () {
      countrySeries.show();
      map.goHome();
      stateSeries.hide();
      back.hide();
      // map.zoomToMapObject(countrySeries.getPolygonById('IN'));
    });
    back.fill = colorSet.getIndex(0); // am4core.color('#FFFFFF');
    back.icon = new am4core.Sprite();
    back.icon.path =
      'M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8';

    // Experimental
    // stateSeries.mapPolygons.seriesContainer.events.on('shown', function (ev) {
    //   console.log('childadenabledded ' + ev.dataItem);
    //   stateSeries.mapPolygons.each(function (polygon) {
    //     let state = polygon.dataItem.dataContext.Dist_Name;
    //     console.log(state);
    //   });
    // });

    // Experimental List All state ids
    // map.events.on('inited', function () {
    //   stateSeries.mapPolygons.each(function (polygon) {
    //     let state = polygon.dataItem.dataContext.Dist_Name;
    //     console.log(state);
    //   });
    // });
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.dispose();
    }
  }

  render() {
    return (
      <>
        {/* <Container
          id="mapdiv"
          style={{
            marginTop: '2em',
            width: '500px',
            height: '500px',
          }}></Container> */}
        <div id="mapdiv"></div>
      </>
    );
  }
}

export default MyMaps;
