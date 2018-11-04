import React, { Component } from 'react';
import './App.css';
import axios from "axios"

class App extends Component {
  state = {
    list:[],
    searchTerm:"",
    rating:"",
    limit:3
  }
  componentDidMount() {
    axios.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=fhruhErb7kOixSYUM2EV916C9qVt2wiL&limit=5")
      .then(({data}) => {
        console.log(data)
        this.setState({list:data.data})
      })
  }
  render() {
    return (
      <div className="App">
        Giphy Search
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}

export default App;
