import React from 'react';
import MovieComponent from './MovieComponent';

class MovieList extends React.Component {

  constructor(props){
    super(props);
  }

  loopMovies(movie, i){
    return (
        <MovieComponent movie={movie} key={i}/>
    );
  }

  render(){
    var nowShowing = this.props.movies;

    return (
      <div>
        <h3 className="text-center">Now Showing</h3>
        <div className="row">
          {nowShowing.map(this.loopMovies,this)}
        </div>
      </div>
    )
  }

}

export default MovieList;
