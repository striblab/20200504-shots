/**
 * Main JS file for project.
 */

/**
 * Define globals that are added through the js.globals in
 * the config.json file, here, mostly so linting won't get triggered
 * and its a good queue of what is available:
 */
// /* global $, _ */

/**
 * Adding dependencies
 * ---------------------------------
 * Import local ES6 or CommonJS modules like this:
 * import utilsFn from './shared/utils.js';
 *
 * Or import libraries installed with npm like this:
 * import module from 'module';
 */

// Dependencies
import utils from './shared/utils.js';

// DOM loaded
utils.documentReady(() => {
  // Mark page with note about development or staging
  utils.environmentNoting();
});


// Auto enable Pym for embedding.  This will enable a Pym Child if
// the url contains ?pym=true
utils.autoEnablePym();



/**
 * Adding Svelte templates in the client
 * ---------------------------------
 * We can bring in the same Svelte templates that we use
 * to render the HTML into the client for interactivity.  The key
 * part is that we need to have similar data.
 *
 * First, import the template.  This is the main one, and will
 * include any other templates used in the project.
 *
 *   `import Content from '../templates/_index-content.svelte.html';`
 *
 * Get the data parts that are needed.  There are two ways to do this.
 * If you are using the buildData function to get data, then add make
 * sure the config for your data has a `local: "content.json"` property
 *
 *  1. For smaller datasets, just import them like other files.
 *     `import content from '../assets/data/content.json';`
 *  2. For larger data points, utilize window.fetch.
 *     `let content = await (await window.fetch('../assets/data/content.json')).json();`
 *
 * Once you have your data, use it like a Svelte component:
 *
 * utils.documentReady(() => {
 *   const app = new Content({
 *     target: document.querySelector('.article-lcd-body-content'),
 *     hydrate: true,
 *     data: {
 *       content
 *     }
 *   });
 * });
 */



// Common code to get svelte template loaded on the client.  Note that
// we need to pull in the data we assume is in the template.
//
// import Content from '../templates/_index-content.svelte.html';
// // import content from '../content.json';
//
// utils.documentReady(() => {
//   const app = new Content({
//     target: document.querySelector('.article-lcd-body-content'),
//     hydrate: true,
//     data: {
//       // content
//     }
//   });
// });

import hex from '../sources/shots_hex.json';
import hex_na from '../sources/shots_hex_na.json';

$.urlParam = function(name) {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results != null) {
      return results[1] || 0;
  } else {
      return null;
  }
}

var selected = $.urlParam('chart');

if (selected != null) {
  $(".slide").hide();
  $("#" + selected).show();
}
if (selected == "all") {
  $(".slide").show();
}

mapboxgl.accessToken = 'pk.eyJ1Ijoic3RhcnRyaWJ1bmUiLCJhIjoiY2sxYjRnNjdqMGtjOTNjcGY1cHJmZDBoMiJ9.St9lE8qlWR5jIjkPYd3Wqw';

var dzoom = 10.5;

  if ($("#map").width() < 600) {
    dzoom = 10.5;
  }

var mzoom = 10.5;
var mobile_zoom = 10.5;
var center = [-93.265015, 44.977753];

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/startribune/ck1b7427307bv1dsaq4f8aa5h',
    center: center,
    zoom: mzoom,
    minZoom: dzoom,
    maxZoom: 13
});

class CityReset {
  onAdd(map){
    this.map = map;
    this.container = document.createElement('div');
    this.container.className = 'mapboxgl-ctrl my-custom-control2 mapboxgl-ctrl-group';

    const button = this._createButton('mapboxgl-ctrl-icon monitor_button2')
    this.container.appendChild(button);
    return this.container;
  }
  onRemove(){
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
  _createButton(className) {
    const el = window.document.createElement('button')
    el.className = className;
    el.innerHTML = '<i class="far fa-building"></i>';
    el.addEventListener('click',(e)=>{
      e.style.display = 'none'
      console.log(e);
      // e.preventDefault()
      e.stopPropagation()
    },false )
    return el;
  }
}

map.addControl(new mapboxgl.NavigationControl());

const toggleControl2 = new CityReset();
map.addControl(toggleControl2,'top-right');

$('.my-custom-control2').on('click', function(){
  map.jumpTo({
    center: center,
    zoom: mzoom,
  });
});

// map.addControl(new mapboxgl.NavigationControl());

map.scrollZoom.disable();
map.doubleClickZoom.disable();
map.touchZoomRotate.disableRotation();
map.dragRotate.disable();

                
map.on('load', function() {


      map.addSource('hex', {
        type: 'geojson',
        data: hex
      });

      map.addLayer({
        'id': 'hex-layer',
        'interactive': true,
        'source': 'hex',
        'layout': {},
        'type': 'fill',
             'paint': {
            'fill-antialias' : true,
            'fill-opacity': 0.7,
            'fill-color': {
             "property": "NUMPOINTS",
             "stops": [
               [0, "rgba(255, 255, 255, 0.5)"],
               [1, "rgba(255, 245, 240, 1)"],
               [400, "#D1E6E1"],
               [800, "#A7E6E3"],
               [1200, "#67B4C2"],
               [1600, "#3580A3"],
               [2000, "#0D4673"],
               [2400, "#022642"]
            ]
         },
            'fill-outline-color': "#000000"
      }
    }, "settlement-subdivision-label");

});


var map2 = new mapboxgl.Map({
  container: 'map2', // container id
  style: 'mapbox://styles/startribune/ck1b7427307bv1dsaq4f8aa5h',
  center: center,
  zoom: mzoom,
  minZoom: dzoom,
  maxZoom: 13
});


map2.addControl(new mapboxgl.NavigationControl());
map2.addControl(toggleControl2,'top-right');

$('.my-custom-control2').on('click', function(){
map2.jumpTo({
  center: center,
  zoom: mzoom,
});
});

// map.addControl(new mapboxgl.NavigationControl());

map2.scrollZoom.disable();
map2.doubleClickZoom.disable();
map2.touchZoomRotate.disableRotation();
map2.dragRotate.disable();

              
map2.on('load', function() {


    map2.addSource('hex_na', {
      type: 'geojson',
      data: hex_na
    });

    map2.addLayer({
      'id': 'hexna-layer',
      'interactive': true,
      'source': 'hex_na',
      'layout': {},
      'type': 'fill',
           'paint': {
          'fill-antialias' : true,
          'fill-opacity': 0.7,
          'fill-color': {
           "property": "NUMPOINTS",
           "stops": [
             [0, "rgba(255, 255, 255, 0.5)"],
             [1, "rgba(255, 245, 240, 1)"],
             [200, "#D1E6E1"],
             [400, "#A7E6E3"],
             [600, "#67B4C2"],
             [800, "#3580A3"],
             [1000, "#0D4673"],
             [1200, "#022642"]
          ]
       },
          'fill-outline-color': "#000000"
    }
  }, "settlement-subdivision-label");

});

$(document).ready(function() {
    if ($("#map").width() < 600) {
        map.flyTo({
            center: center,
            zoom: mobile_zoom,
        });
        map2.flyTo({
          center: center,
          zoom: mobile_zoom,
      });
    }
    $(window).resize(function() {
        if ($("#map").width() < 600) {
            map.flyTo({
                center: center,
                zoom: mobile_zoom,
            });
            map2.flyTo({
              center: center,
              zoom: mobile_zoom,
          });
        } else {
            map.flyTo({
                center: center,
                zoom: mzoom,
            });
            map2.flyTo({
              center: center,
              zoom: mzoom,
          });
        }
    });
});