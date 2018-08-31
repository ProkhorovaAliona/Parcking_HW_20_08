import React, { Component } from 'react';
import Parking from '../../components/Parking';
import style from './style.scss'

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
        <div className={style.title}> Private parking </div> 
        <Parking />
      </div>
    );
  }
}

export default MainPage;