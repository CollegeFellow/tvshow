import React from 'react';
import HomeCarousel from './HomeCarousel';

class HomePage extends React.Component {

  render() {
    return (
      <div>
        <HomeCarousel />
        <div className="jumbotron">
          <h1>YO!</h1>
        </div>
      </div>
    )
  }

}

export default HomePage;
