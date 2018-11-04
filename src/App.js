import React, { Component } from 'react';
import './App.css';
import axios from "axios"
import Range from './component/range'
import Search from './component/search'
import FilterList from './component/filter-list'

const API_URL = 'http://api.giphy.com/v1/gifs/search?'
const API_KEY = 'fhruhErb7kOixSYUM2EV916C9qVt2wiL'

class App extends Component {
  state = {
    list:[],
    searchTerm:"lol",
    rating:[],
    currentRating:'',
    limit:3
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios
      .get(`${API_URL}q=${this.state.searchTerm}&api_key=${API_KEY}&
      limit=${this.state.limit}`)
      .then(({data}) => {
          this.setState({
            list:data.data,
            rating: [...new Set(data.data.map(x => x.rating))]
          })
      })
  }

  ratingChange = e => {
    this.setState({
      currentRating : e.target.value
    });
  }

  renderList = () => {
    return this.state.list
      .filter(item => this.state.currentRating.trim().lenght === 0 ? 
      true : (this.state.currentRating === item.rating) ? true: false)
      .map((item, _key) => 
        <li key={item.id}>
          <h2>{item.title} ({item.rating})</h2>
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
        <FilterList 
          ratingChange={this.ratingChange} 
          FilterList={this.state.rating} />
        <ul>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

export default App;
