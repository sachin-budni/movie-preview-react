import React from 'react';
import { Component } from 'react';
import no_poster from './../no_poster.jpg';
export class MovieDeails extends Component {
    constructor() {
        super()
        this.state = {
            details: {}
        }
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4b10cf2f8e6ed1fcb506bd3929ecee40&language=en-US&append_to_response=videos`)
        .then(res =>res.json())
        .then(res => {
            this.setState({
                details: res
            },() => console.log(this.state.details));
        })
    }
    render() {
        const { details } = this.state;
        return (
            <div>
                {details && details.id && 
                    <img src={details.poster_path ? 'https://image.tmdb.org/t/p/w500'+details.poster_path : no_poster} alt={details.title} style={{ width: '100%' }} />
                }
            </div>
        );
    }
}
