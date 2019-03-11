import React from 'react';
import SearchContainer from '../../components/navbar/search_container'
import GoogleMapContainer from '../map/map';

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <h1>P.A.R.C.</h1>
        <SearchContainer />
        <GoogleMapContainer />
        <footer>
          Copyright &copy; 2019 B.V.G.S.
        </footer>
      </div>
    );
  }
}

export default MainPage;
