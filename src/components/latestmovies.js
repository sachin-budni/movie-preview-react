import React from 'react';
import { Component } from 'react';
import Movie from './movie';

export default class LatestMovie extends Component{

    constructor() {
        super();
        this.state = {
          movies: {}
        }
      }

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/movie/latest?api_key=4b10cf2f8e6ed1fcb506bd3929ecee40&language=en-US&page=1')
        .then(res => res.json()).then((res) =>{
          this.setState({
            movies : res
          }, () => console.log(this.state.movies))
        }).catch(e => console.log(e))
      }

      clickNextPage = (page) => {
        fetch(`https://api.themoviedb.org/3/movie/latest?api_key=4b10cf2f8e6ed1fcb506bd3929ecee40&language=en-US&page=${page}`)
        .then(res => res.json()).then((res) =>{
          this.setState({
            movies : res
          }, () => console.log(this.state.movies))
        }).catch(e => console.log(e))
      }

    render() {
        return (
            <div>
                <Movie movie={this.state.movies} nextPage={this.clickNextPage}/>
            </div>
        );
    }
}