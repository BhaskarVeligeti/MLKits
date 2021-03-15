/* eslint-disable no-alert, no-console,no-undef */
import React from 'react'
import ReactDOM from "react-dom";
import '../node_modules/normalize.css/normalize.css'; // provides better cross-browser consistency in the default styling of HTML elements. It's a modern, HTML5-ready,
import '../node_modules/bootstrap-select/dist/css/bootstrap-select.css'; // This line will only import the css part of bootstrap-select. 
import '../node_modules/bootstrap-select/dist/js/bootstrap-select.js'; //  This line will only import the js part of bootstrap-select.
import '../node_modules/react-dates/lib/css/_datepicker.css'; // react-dates css
import "../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css" // react-bootstrap-table2 css
import '../node_modules/react-dates/initialize'; // react-dates js
import 'popper.js' // ooltips rely on the 3rd party library
import 'util' // for tooltip building our JavaScript from source
import 'bootstrap'; // This line will only import the js part of bootstrap.
import './scss/bt.scss'; //include Bootstrap’s Sass into bundle 
import './styles/index.css'; // application custom css
import './styles/layout.js'; // application custom js
import App from './App';
/**ways you can use Font Awesome 5 with React.  Using Icons via Global Use */  // FontAwesome defaults to solid : <FontAwesomeIcon icon="coffee" />
import { library, config, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas); // you add all fas icons to the library:
config.searchPseudoElements = true; // FontAwesome Pseudo Elements Config
dom.watch();



ReactDOM.render(<App />, document.querySelector("#root"));


  // index.html and index.js files will serve as the entry point in our react application.




