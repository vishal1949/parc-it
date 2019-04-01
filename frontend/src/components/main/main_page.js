import React from 'react';
import SearchContainer from '../../components/navbar/search_container';
import GoogleMapContainer from '../map/map_container';
import NavbarContainer from  '../../components/navbar/navbar_container';

class MainPage extends React.Component {
  componentDidMount() {
    this.props.fetchListings();
  }

  render() {
    if (this.props.listings === undefined) {
      return null;
      // can add a little loading screen here
    }

  return (
      <div className='map-and-info'>
        <GoogleMapContainer listings={this.props.listings} />
        <br/>
        <div className='our-description'>
          <h2 className='home-title'>Welcome to Parc-it</h2>
          <div className='main-description'>
            <div className='description-content for-right'>
              <h3 className='mini-titles'>What is Parc-it?</h3>
              <p>
                P.a.r.c stands for Parking At Residential Communities.
                We want to help you find parking in major cities or make a few extra bucks on the side 
                if you have a private parking spot.
              </p>
              <p>
                You, as a commuter, can look at parkings that are in the San Francisco area
                or search for a parking spot in a desired location and book it with a few clicks. We want to make parking
                cheap, affordable, and most importantly easy! 
              </p>
              <p>
                What if you have a private parking spot that you dont use? Well... you cant list it
                on our application and we will host it for you. When a commuter books your parking spot,
                you get PAID!
              </p>
            </div>
            <div className='description-content for-left'>
              <h3 className='mini-titles'>Who are we?</h3>
              <p>
                We are a team of 3 developers that love to code and want
                to provide a solution to the parking shortage that is happening
                in cities. We hope to grow our idea and turn it into
                something that can make a difference in the future.
              </p>
            <h3 className='mini-titles'>Our goals</h3>
              <ul>
                <li>Make parking EASY, FAST, and AFFORDABLE</li>
                <li>Help you EARN money on the side with a few clicks</li>
                <li>Let you Plan your trips with secured parking beforehand</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
