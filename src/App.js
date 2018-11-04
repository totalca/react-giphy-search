import React, { Component } from 'react';
import './App.css';
import axios from "axios"
import Range from './component/range'
import Search from './component/search'

const API_URL = 'http://api.giphy.com/v1/gifs/search?'
const API_KEY = 'fhruhErb7kOixSYUM2EV916C9qVt2wiL'

class App extends Component {
  state = {
    list:[],
    searchTerm:"",
    rating:[],
    currentRating:"",
    limit:3
  }

  componentDidUpdate() {
    this.getData();
  }

  getData() {
    axios.get(`${API_URL}q=${this.state.searchTerm}&api_key=${API_KEY}&limit=
      ${this.state.limit}`)
      .then(({data}) => {
        this.setState({
          list:data.data,
          rating: [...new Set(data.data.map(x => x.rating))]
        })
      })
  }

  renderList = () => {
    return this.state.list.map((item, key) => 
    <li key={item.id}>
      <h2>{item.title}</h2>
      <img 
        src={item.images.fixed_height.url} 
        width={item.images.fixed_height.width} 
        height={item.images.fixed_height.height} 
        alt={item.title}
      />
    </li>)
  }

  updateLimit = e => {
    this.setState({
      limit:e.target.value
    })
  }

  searchIt = (event, element) => {
    event.preventDefault();
    this.setState({searchTerm: element.value.replace(/\s/, '+')});
    this.getData();
  }

  render() {
    return (
      <div className="App">
        <p>Giphy Search</p>
        <span>{this.state.limit}</span>
        <Range limit={this.state.limit} 
        updateLimit={this.updateLimit} />
        <Search searchIt={this.searchIt} />
        <ul>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

export default App;
