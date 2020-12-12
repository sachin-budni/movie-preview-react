import React from 'react';
import { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import no_poster from './../no_poster.jpg';
export default class Movie extends Component {
    redictToCurrentMovie = (id) => {
        const { pathname } = this.props.routes.location;
        this.props.routes.push(pathname + "/" + id)
    }

    render() {
        const { movie } = this.props;
        return (
            <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {movie && movie.results && movie.results.map(d => {
                        return (
                            <div key={d.id} style={{ maxWidth: '180px', margin: '20px' }}>
                                <img src={d.poster_path ? 'https://image.tmdb.org/t/p/w500'+d.poster_path : no_poster} alt={d.title} style={{ width: '100%' }} />
                                <div style={{width: '100%'}}>
                                    <p style={{textAlign: 'center', margin: '5px', fontFamily: "'Poppins', sans-serif", fontSize: '14px', cursor: 'pointer'}} onClick={() => this.redictToCurrentMovie(d.id)}>
                                        {d.title}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {movie && movie.page &&
                    <div style={{width: '100%', padding: '10px', background: 'rgb(0,0,0,0.8)'}}>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: "flex-end"}}>
                            <p>page {movie.page} of {movie.total_pages}</p>
                            <IconButton aria-label="delete" disabled={movie.page === 1}  onClick={() => this.props.nextPage(movie.page-1)}>
                                <ChevronLeftIcon />
                            </IconButton>
                            <IconButton aria-label="delete" disabled={movie.total_pages === movie.page} onClick={() => this.props.nextPage(movie.page+1)}>
                                <ChevronRightIcon />
                            </IconButton>
                        </div>
                    </div>
                }
            </div>
        );
    }
}


/* <div key={d.id} style={{ maxWidth: '180px', margin: '20px' }}>
                            <img src={'https://image.tmdb.org/t/p/w500'+d.poster_path} alt={d.title} style={{ width: '100%' }} />
                            <div style={{width: '100%'}}>
                                <p style={{textAlign: 'center', margin: '5px', fontFamily: "'Poppins', sans-serif", fontSize: '14px'}}>
                                    {d.title}
                                </p>
                            </div>
                        </div> */