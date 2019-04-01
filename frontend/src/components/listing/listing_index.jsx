import React from 'react';
import ListingIndexItem from './listing_index_item';
import GoogleMapContainer from '../map/map_container';
import {Link} from 'react-router-dom';
import axios from 'axios';



class ListingIndex extends React.Component{
  constructor(props){
    super(props);
    this.geocodeRequest.bind(this);
    this.filterListings.bind(this);
    this.coordinates = { lat: 0, lng: 0 }
    this.state = {
      listing: null,
      error: null
      // coordinates: { lat: 0, lng: 0 }
    };
    this.changeListing = this.changeListing.bind(this);
    if(this.props.search){
      this.results = this.filterListings();
      this.results =[];
    }
  }


  changeListing(id) {
    let newListing = this.props.listings[id];
    this.setState({listing: newListing});
  }

  componentDidMount(){
    // this.props.fetchListings();
    this.props.fetchListings().then(action =>{
      this.setState({ listing: action.listings[0] });
    });
    
  }



  filterListings(){
    // let result = [];
    console.log("reaching this")
    this.geocodeRequest(this.props.search).then(response => {
      this.coordinates.lat = response.lat;
      this.coordinates.lng = response.lng;
    }).catch(err => {
      this.setState({error: err})
    });
  }

  
  geocodeRequest(address){
    return fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAPjYkDq0-iiCd6W5-qCw46J-r0EW39L1U`,
      {
        method: "post",
      }
    ).then(res => res.json())
      .then(response => {
        return response.results[0].geometry.location;
      }).catch(err => {
          this.setState({error: err})
        })
      };
  

  render(){
    
    if (Object.keys(this.props.listings).length === 0) {
      return null;
      // can add little loading screen here
    }
    let listingsArray = Object.values(this.props.listings);
    let listings = Object.values(this.props.listings);
    if(this.coordinates.lat !== 0 || this.coordinates.lng !== 0){
      listings = [];
      listingsArray.map(listing => {
        if ((listing.lat <= this.coordinates.lat + .0055 && listing.lat >= this.coordinates.lat - .0055) &&
          (listing.lng <= this.coordinates.lng + .0083 && listing.lng >= this.coordinates.lng - .0083)) {
          listings.push(listing);
        }
      });
    }
    if(this.state.listing === null){
      return null;
    }
    const listingMapStyle = {
      width: '40%',
      height: '40%',
      'marginLeft': 'auto',
      'marginRight': 'auto',
      'zIndex': '0',
    };
    

    return(
      <>
      <div className="listing-index">
          <div className='map-div'>
            <GoogleMapContainer listings={listings} style={listingMapStyle} />
          </div>
      </div>
        <div className="listing-index2">
          <h1>Available Parking Spots</h1>
        </div>
          {/* <p>
            Here are
          </p> */}
          <div className="all-listings">
            {(listings.map(listing => {
              return <ListingIndexItem listing={listing} key={listing.id} />
            }))}
            {/* <ListingIndexItem listing={this.state.listing} />  */}
          </div>
        
    </>
    )
  }
};

export default ListingIndex;
