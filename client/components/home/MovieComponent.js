import React from 'react';

class MovieComponent extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    let movie = this.props.movie;
    let myStyle = {
      movieDiv: {
        border: '1px solid #ccc',
        padding: '20px'
      },
      movieBanner: {
        width: '100%'
      }
    }

    let currentMovie = movie.ChildEvents[0];

    return (
      <div className="col-md-4 text-center" style={myStyle.movieDiv}>
        <img src={"//in.bmscdn.com/iedb/movies/images/mobile/listing/large/" + currentMovie.EventImageCode + ".jpg"} style={myStyle.movieBanner}/>

        <p><strong>{currentMovie.EventName}</strong></p>
        <small>{currentMovie.EventCode}</small>
        <br/>
        <small className="label label-primary">{currentMovie.EventLanguage}</small>

      </div>
    )
  }


}

export default MovieComponent;
