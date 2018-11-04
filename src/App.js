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
    axios.get("http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=fhruhErb7kOixSYUM2EV916C9qVt2wiL&limit=5")
      .then(({data}) => {
        console.log(data)
        this.setState({list:data.data})
      })
  }

  renderList = () => {
    return this.state.list.map((item, key) => 
    <li key={key}>
      <h2>{item.title}</h2>
      <img 
        src={item.images.original.url} 
        width={item.images.original.width} 
        height={item.images.original.height} 
        alt={item.title}
      />
    </li>)
  }

  render() {
    return (
      <div className="App">
        Giphy Search
        <ul>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

export default App;
