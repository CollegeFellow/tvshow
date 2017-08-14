import React from 'react';
import { connect } from 'react-redux';
import HomeCarousel from './HomeCarousel';
import MovieList from './MovieList';
import axios from 'axios';

class HomePage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      nowShowing: []
    };

    axios.get('/api/movies')
    .then((response) => {
      this.setState({ nowShowing: response.data.BookMyShow.Events });
    })
    .catch((err) => {
      console.log('ERRORRRRRRRRRRR',err);
    });
  }

  render() {
    return (
      <div>
        <HomeCarousel />
        <div className="jumbotron">
          <h1>YO!</h1>
        </div>
        <MovieList movies={this.state.nowShowing}/>
      </div>
    )
  }

}

function mapStateToProps(state){
  return {
    auth: state.homePageReducer
  }
}

export default connect(mapStateToProps)(HomePage);
