import React from 'react';

class ListingIndexItem extends React.Component{
  render() {
    return(
      <div className="listing-item">
        <img src="https://images.vexels.com/media/users/3/128399/isolated/lists/4c21120637e7ad87ca7d800c3d24eb21-parking-round-service-icon.png" alt=""/>
        <div className="listing-info">
          <div>{this.props.listing.street}</div>
          <div>{this.props.listing.city}*{this.props.listing.state}</div>
          <div>{this.props.listing.description}</div>
          <div>{this.props.listing.description}</div>
        </div>
      </div>
    )
  };
};

export default ListingIndexItem;
