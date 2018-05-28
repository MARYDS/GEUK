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

ReactDOM.render(<App />, document.getElementById("app"));