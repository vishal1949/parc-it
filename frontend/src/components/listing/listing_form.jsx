import React from 'react';
import axios from 'axios';
// import {geocodeRequest} from '../../actions/selectors'

class ListingForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      street: '',
      city: '',
      state: '',
      zip: '',
      lat: 0,
      lng: 0,
      description: '',
      price: 15,
      photo: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.geocodeRequest = this.geocodeRequest.bind(this);
  };


geocodeRequest(address) {
    // let coordinates;
    return fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAPjYkDq0-iiCd6W5-qCw46J-r0EW39L1U`,
        {
            method: "post",
            // body: JSON.stringify({
            //   params: {
            //     address: address,
            //     key: "AIzaSyAPjYkDq0-iiCd6W5-qCw46J-r0EW39L1U"
            //   }
            // })
        }
    )
        .then(res => res.json())
        .then(response => {
            //response is the object the api returns
            //refer to this if you need help
            //https://developers.google.com/maps/documentation/geocoding/intro
            // console.log(response.data.results[0].geometry.location)
            return response.results[0].geometry.location;
            // return coordinates;
            //this is where we get an object with the results inside
            //response.data.results[0].
        });
}

handleSubmit(e) {
    e.preventDefault();
    let address = `${this.state.street} ${this.state.city}, ${this.state.state}`;
    this.geocodeRequest(address).then(response => {
        if (response === undefined) {

        } else {
            this.setState({
                lat: response.lat,
                lng: response.lng
            }, () => {
                let createdListing = Object.assign({}, this.state);
                this.props.createListing(createdListing);
            });
        }
    });
}

  update(field){
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  };


  // renderErrors() {
  //   // return null;
  //   if (this.props.errors.length > 0) {
  //     return (
  //       <ul id="errors">
  //         {this.props.errors.map((error, i) => (
  //           <li key={`error-${i}`}>
  //             {error}
  //           </li>
  //         ))}
  //       </ul>
  //     );
  //   }
  // };

  render(){
    return(
      <div className='entire-listing-form'>
      <h1 className='main-title-new'>Make your very own listing! </h1>
      <div className='main-title-new'>You're one step away from earning yourself some extra cash! Please fill
          out the form below so we can get you settled in and ready to see the cash
          come in to your pockets. We hope that you spread the word and bring your
          friends and family as new users so they can start earning as well.
      </div>
        <form className='listing-form' onSubmit={(e) => this.handleSubmit(e)}>
          <h3 className='listing-form-title'>Address</h3>
          <div className='attribute-titles'>Street: </div>
          <input id='text-box' type="text" value={this.state.street} placeholder='123 street...' onChange={this.update('street')}/>
          <div className='attribute-titles'>City: </div>
          <input id='text-box' type="text" value={this.state.city} placeholder='San Francisco' onChange={this.update('city')} />
          <div className='attribute-titles'>State: </div>
          <input id='text-box' type="text" value={this.state.state} placeholder='CA' onChange={this.update('state')} />
          <div className='attribute-titles'>Zip: </div>
          <input id='text-box' type="text" value={this.state.zip} placeholder='12345' onChange={this.update('zip')} />
          <div className='attribute-titles'>Description: </div>
                <input id='text-box' type="text" value={this.state.description} placeholder='P.a.r.c is amazing' onChange={this.update('description')}/>
          <div className='attribute-titles'>Price: </div>
          <input id='text-box' type="text" value={this.state.price} onChange={this.update('price')}/>
          <br/>
          <div className='attribute-titles'>Photo:</div>
          <input id='text-box' type="text" value={this.state.photo} onChange={this.update('photo')}/>
          <br/>
          <input className='photo-submit-button' type="submit"/>
        </form>
      </div>
    );
  };
};

export default ListingForm;
