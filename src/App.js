import React, { Component } from 'react';
import {
  getChampions,
  getMatches,
  getMatchDetails
} from "./util/riot";
import {
    mean,
    analyze,
    sum
} from "./util/stats";
import common from "./util/common";
import Signal from "./Signal";

var myid = 'Z2SI1qI2W86XQcY0L1gQ6Cr6rB8xQ_3vUY8Hq4mLgg-Arw';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signals: {},
    };
  }

  async componentDidMount() {
    console.log("Component Did Mount");
    setTimeout(async a => {
      var championsById = await getChampions();
      var matches = await getMatches(myid, false);
      var matchDetails = []

      for (let m of matches) {
          let details = await getMatchDetails(m['gameId']);
          matchDetails.push(details);
      }

      console.log(matchDetails[0]['participants'][0]);
      console.log(matchDetails[0]['participantIdentities'][0]);
      console.log(Object.keys(matchDetails[0]));
      let signals = analyze([
            common.gameDuration,
            common.alliedDeaths,
            common.enemyDeaths,
            common.myKillsPer10,
            common.myDeathsPer10,
            common.myKDA,
            common.myCSPerMin
      ], matchDetails, 'Armsperson').stats;
      console.log(signals);
      this.setState({
        signals
      });
    }, 250);
  }

  componentWillUnmount() {
    console.log("Component Unmounting");
  }

  render() {
    console.log('Render.App', this);
    let dp = Object.keys(this.state.signals).map(
      k => <Signal name={k} {...this.state.signals[k]} />
    );
    return(
     <div>
        <h1>Signals Analysis</h1>
        { dp }
     </div>
   )
  }
}

export default App;
