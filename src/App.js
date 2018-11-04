import React, { Component } from 'react';
import './App.css';
import axios from "axios"
import Range from './component/range'

const API_URL = 'http://api.giphy.com/v1/gifs/search?'
const API_KEY = 'fhruhErb7kOixSYUM2EV916C9qVt2wiL'

class App extends Component {
  state = {
    list:[],
    searchTerm:"",
    rating:"",
    limit:3
  }

  componentDidMount() {
    axios.get(`${API_URL}q=funny+pug&api_key=${API_KEY}&limit=
      ${this.state.limit}`)
      .then(({data}) => {
        this.setState({list:data.data})
      })
  }

  renderList = () => {
    return this.state.list.map((item, key) => 
    <li key={item.id}>
      <h2>{item.title}</h2>
      <img 
        src={item.images.original.url} 
        width={item.images.original.width} 
        height={item.images.original.height} 
        alt={item.title}
      />
    </li>)
  }

  updateLimit = e => {
    this.setState({
      limit:e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <p>Giphy Search</p>
        <span>{this.state.limit}</span>
        <Range limit={this.state.limit} 
        updateLimit={this.updateLimit} />
        <ul>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

export default App;
