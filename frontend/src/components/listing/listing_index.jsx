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
    this.center = { lat: 37.7599043, lng: -122.4256016 };
    this.state = {
      listing: null,
      search: null,
      center: { lat: 37.7599043, lng: -122.4256016 },
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
    this.geocodeRequest(this.props.search).then(response => {
      this.coordinates.lat = response.lat;
      this.coordinates.lng = response.lng;
      this.center.lat = response.lat;
      this.center.lng = response.lng;
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
    if(this.props.search !== '' && this.props.search !== this.state.search){
      this.setState({search: this.props.search})
      this.filterListings();
    }
    if (Object.keys(this.props.listings).length === 0) {
      return null;
    }
    let listingsArray = Object.values(this.props.listings); //for mapping purposes
    let listings = Object.values(this.props.listings); //for display purposes
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
    
    if(this.coordinates.lat !== 0){
      this.center.lat = this.coordinates.lat;
      this.center.lng = this.coordinates.lng;
    }

    return(
      <>
      <div className="listing-index">
          <div className='map-div'>
            <GoogleMapContainer listings={listings} style={listingMapStyle} newCenter={this.center} />
          </div>
      </div>
        <div className='sf-divider'></div>
        <div className="listing-index2">
          <h1>Available Parking Spots</h1>
        </div>
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
