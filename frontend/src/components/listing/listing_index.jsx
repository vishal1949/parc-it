import React from 'react';
import ListingIndexItem from './listing_index_item';
import GoogleMapContainer from '../map/map_container';
import {Link} from 'react-router-dom';
import axios from 'axios';



class ListingIndex extends React.Component{
  constructor(props){
    super(props)
    this.geocodeRequest.bind(this);
    this.filterListings.bind(this);
  }

  componentDidMount(){
    this.props.fetchListings();
  }



  filterListings = (state) => {
    let result = [];
    let listings = state.entities.listings;
    let search = state.ui.search;
    debugger;
    let listingsArray = Object.values(listings);
    let coordinates = { lat: 0, lng: 0 }
    debugger
    geocodeRequest(search).then(response => {
      coordinates.lat = response.lat;
      coordinates.lng = response.lng;
      listingsArray.map(listing => {
        if ((listing.lat <= coordinates.lat + .0055 && listing.lat >= coordinates.lat - .0055) &&
          (listing.lng <= coordinates.lng + .0083 && listing.lng >= coordinates.lng - .0083)) {
          result.push(listing);
        }
      });
      console.log(result);
      return result;
    })
  };
  geocodeRequest = (address) => {
    return fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAPjYkDq0-iiCd6W5-qCw46J-r0EW39L1U`,
      {
        method: "post",
      }
    ).then(res => res.json())
      .then(response => {
        return response.results[0].geometry.location;
      });
  }

  render(){
    debugger
    if (Object.keys(this.props.listings).length === 0) {
      return null;
      // can add little loading screen here
    }
    const listingsArray = Object.values(this.props.listings);
    const listingMapStyle = {
      width: '80%',
      height: '80%',
      'marginLeft': '0',
      'marginRight': '6%',
      'zIndex': '0',
    };

    return(
      <>
      <div className="listing-index">
        {/* <h1>Available Parking Spots</h1> */}
          <div className='map-div'>
            <GoogleMapContainer  listings={listingsArray} style={listingMapStyle} />
          </div>
      </div>
          <div className="all-listings">
            {/* {listingsArray.map(listing => {
              return <ListingIndexItem listing={listing} key={listing.id} />
            })} */}
            <ListingIndexItem listing={listingsArray[0]} /> 
          </div>
        
    </>
    )
  }
};

export default ListingIndex;
