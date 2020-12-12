import React from 'react';
import { Component } from 'react';
import Movie from './movie';
export default class PopularMovie extends Component{

    constructor() {
        super();
        this.state = {
          movies: {}
        }
      }

    componentDidMount() {
        if(this.props.location.search.indexOf('page') !== -1) {
          fetch(`https://api.themoviedb.org/3/movie/popular${this.props.location.search}&api_key=4b10cf2f8e6ed1fcb506bd3929ecee40&language=en-US`)
          .then(res => res.json()).then((res) =>{
            this.setState({
              movies : res
            }, () => console.log(this.state.movies))
          }).catch(e => console.log(e))
        } else {
          console.log(this.props)
          this.props.history.push({
            pathname: '/popularmovies',
            search: "?page=1"
          })
          fetch(`https://api.themoviedb.org/3/movie/popular?page=1&api_key=4b10cf2f8e6ed1fcb506bd3929ecee40&language=en-US`)
          .then(res => res.json()).then((res) =>{
            this.setState({
              movies : res
            }, () => console.log(this.state.movies))
          }).catch(e => console.log(e))
        }
      }

      clickNextPage = (page) => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=4b10cf2f8e6ed1fcb506bd3929ecee40&language=en-US&page=${page}`)
        .then(res => res.json()).then((res) =>{
          this.setState({
            movies : res
          }, () => console.log(this.state.movies))
        }).catch(e => console.log(e))
      }

    render() {
        return (
            <div>
                <Movie routes={this.props.history} movie={this.state.movies} nextPage={this.clickNextPage}/>
            </div>
        );
    }
}