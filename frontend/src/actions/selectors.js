//THIS NEEDS TO BE IMPORTED TO LISTING INDEX CONTAINER AND MAP STATE TO PROPS pass in state
import axios from 'axios';


export const filterListings = (state) => {
  let result = [];
  let listings = state.entities.listings;
  let search = state.ui.search;
  let listingsArray = Object.values(listings);
  let coordinates = geocodeRequest(search)
  let bogus = listingsArray.map(listing => {
    if ((listing.lat <= coordinates.lat + .0055 || listing.lat >= coordinates.lat - .0055) &&
      (listing.lng <= coordinates.lng + .0083 || listing.longitude >= coordinates.lng - .0083)) {
      result.push(listing);
    }
    return null;
  });
  return result;
};

export const filterBookings = (state, id, type) => {
  let bookings = state.entities.bookings;
  let bookingsArray = Object.values(bookings);
  // do a map or filter here to grab the entries that match the id (user or listing)
  const result = bookingsArray.filter((booking) => booking[type].id === id);
  return result;
};

export const geocodeRequest = (address) => {
  let coordinates = {};
  axios.get('https://maps.googleapis.com/maps/api/geocode/json',
    {
      params: {
        address: address,
        key: "AIzaSyAPjYkDq0-iiCd6W5-qCw46J-r0EW39L1U"
      }
    }).then((response) => { //response is the object the api returns
      //refer to this if you need help
      //https://developers.google.com/maps/documentation/geocoding/intro
      coordinates = response.data.results[0].geometry.location;
      return coordinates;
      //this is where we get an object with the results inside
      //response.data.results[0].
    })
}

// export default filterListings;
