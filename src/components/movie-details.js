import React from 'react';
import { Component } from 'react';
import no_poster from './../no_poster.jpg';
import './movie.css';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Movie from './movie';
export class MovieDeails extends Component {
    constructor() {
        super()
        this.state = {
            details: {},
            movies: {}
        }
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        this.fetchAllData(id);
    }
    fetchAllData = (id) => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4b10cf2f8e6ed1fcb506bd3929ecee40&language=en-US&append_to_response=videos`)
        .then(res =>res.json())
        .then(res => {
            window.scrollTo(0, 0);
            this.setState({
                details: res
            },() => console.log(this.state.details));
        })
        fetch(`https://api.themoviedb.org/3/movie/${id}/similar?page=1&api_key=4b10cf2f8e6ed1fcb506bd3929ecee40&language=en-US`)
        .then(res =>res.json())
        .then(res => {
            this.setState({
                movies: res
            },() => console.log(this.state.movies));
        })
    }
    clickNextPage = (page) => {
        const { id } = this.props.match.params;
        fetch(`https://api.themoviedb.org/3/movie/${id}/similar?page=${page}&api_key=4b10cf2f8e6ed1fcb506bd3929ecee40&language=en-US`)
        .then(res => res.json()).then((res) =>{
          this.setState({
            movies : res
          }, () => console.log(this.state.movies))
        }).catch(e => console.log(e))
      }
      changeMovieData = (id) => {
        this.fetchAllData(id);
      }
    render() {
        const { details } = this.state;
        return (
            <div>
                {details && details.id && 
                    <div className="main-movie">
                        <p className="title">{details.title}</p>
                        <p className="tagline">{details.original_title }</p>
                        <p className="tagline">{details.tagline}</p>
                        <div className="pt-10"/>
                        <div className="main-img-div">
                            <img src={details.poster_path ? 'https://image.tmdb.org/t/p/w500'+details.poster_path : no_poster} alt={details.title} style={{ width: '100%' }} />
                        </div>
                        <div className="row space-btn">
                            <p>Languages : {details.spoken_languages && details.spoken_languages.map(l => <span key={l.name}>{l.name}</span>)} </p>
                            <p>Rating : {details.vote_average}</p>
                        </div>
                        <div className="pb-10">
                            {details.genres && details.genres.map(g =>  <Chip key={g.id} label={g.name} variant="outlined" />)}
                        </div>
                        <Divider />
                        <p className="overview">{details.overview}</p>
                        <img className="w-100" src={`https://image.tmdb.org/t/p/w500${details.backdrop_path}`}/>
                        {details.videos && details.videos.results.map(v => (
                            <div className="videoWrapper" key={v.id}>
                                <iframe className="video" src={'https://www.youtube.com/embed/'+v.key} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen />
                            </div>
                        ))}
                        <Movie changeMovie={this.changeMovieData} routes={this.props.history} movie={this.state.movies} nextPage={this.clickNextPage}/>
                    </div>
                }
            </div>
        );
    }
}
