import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux';

import appState from './store/appState.js';
import SummaryResults from "./components/container/SummaryResults.js";

import '../css/app.css'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store = {createStore(appState)}>
          <SummaryResults />
      </Provider>
    );
  }
}

render(<App />, document.getElementById("app"));