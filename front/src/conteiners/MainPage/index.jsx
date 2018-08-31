import React, { Component } from 'react';
import Places from '../../components/Places';
import Parking from '../../components/Parking';

const places = [
  {
    
    id: 1,
    available: 'free',
    isFree: true
  },
  {
    id: 2,
    available: 'booked',
    isFree: false
  },
  {
    id: 3,
    available: 'free',
    isFree: true
  }
];

class MainPage extends Component {

  render() {
    return (
    <div> 
      <h1> Private parking </h1> 
      {/* <div>
        <Places park={places}/>
      </div> */}
      <div>
        <Parking />
      </div>
    </div>
    );
  }
}

export default MainPage;