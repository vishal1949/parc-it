import { connect } from 'react-redux';
import {filterBookings} from '../../actions/selectors';
import BookingForm from './booking_form';
import {withRouter} from 'react-router-dom'
import {
  createBooking,
  fetchAllListingBookings,
} from '../../actions/booking_actions';

const mapStateToProps = (state, ownProps) => {
  return ({
    currentUser: state.session.user,
    listing: ownProps.listing,
    bookings: state.entities.bookings,
  });
};
const mapDispatchToProps = (dispatch) => {
  return ({
    createBooking: (booking) => dispatch(createBooking(booking)),
    fetchAllListingBookings: (listing) => dispatch(fetchAllListingBookings(listing)),
  });
};

  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookingForm));
