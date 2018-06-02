import React from 'react'
import {render} from 'react-dom'
import '../css/app.css'

import SummaryResults from "./summary.js";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SummaryResults />
      </div>
    );
  }
}

render(<App />, document.getElementById("app"));