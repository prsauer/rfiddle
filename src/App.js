import React, { Component } from 'react';
import {
  getChampions
} from "./util/riot";

class App extends Component {

  componentDidMount() {
    var championsById = getChampions();
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
