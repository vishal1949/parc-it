import { connect } from 'react-redux';
import GoogleMapFinal from './map';
import { fetchListings } from '../../actions/listing_action';

const mapStateToProps = (state, ownProps) => {
  let listings;
  if(!ownProps.listings){
    listings = Object.values(state.entities.listings);
  }else{
    listings = Object.values(ownProps.listings);
  }
  return ({
    listings,
    style: ownProps.style,
    changeListing: ownProps.changeListing,
    newCenter : ownProps.newCenter,
  });
};
const mapDispatchToProps = (dispatch) => {
  return ({
    fetchAllListings: () => dispatch(fetchListings())
  });
};

const GoogleMapContainer =
  connect(mapStateToProps, mapDispatchToProps)(GoogleMapFinal);
export default GoogleMapContainer;
