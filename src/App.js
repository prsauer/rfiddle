import React, { Component } from 'react';
import {
  getChampions,
  getMatches
} from "./util/riot";

var myid = 'Z2SI1qI2W86XQcY0L1gQ6Cr6rB8xQ_3vUY8Hq4mLgg-Arw';

class App extends Component {

  async componentDidMount() {
    console.log("Component Did Mount");
    setTimeout(async a => {
      var championsById = await getChampions();
      var matches = await getMatches(myid, false);
    }, 250);
  }

  componentWillUnmount() {
    console.log("Component Unmounting");
  }

  render() {
    return(
     <div>
        <h1>Hello React</h1>
     </div>
   )
  }
}

export default App;
