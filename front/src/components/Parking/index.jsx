import React, { Component } from 'react';
import style from './style.scss';

class Parking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      available: 'free'
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    fetch('http://localhost:5000/api/getData')
      .then(response => response.json())
      .then(results => results.places.reduce((acc, val) => {
        const id = val.id;
        acc[id] = val;
        return acc;
      }, {}))
      .then(data =>
        this.setState({
          data
        })
      )
      .catch(error => console.log('Data did not get', error));
  }

  handleClick(ev, id) {
    const { data } = this.state;
    const place = data[id];

    if (place.isFree == "free") {
      console.log('isFree', place.isFree)
      place.isFree = "booked";
      this.setState({
        ok: 'ok'
      })
/*
      const dataArr = Object.values(data);
      console.log('changed data', dataArr);

      const arrayToObject = (array, keyField) =>
      array.reduce((obj, item) => {
        obj[item[keyField]] = item
        return obj
      }, {})
      const dataObj = arrayToObject(dataArr, "id")
      console.log('obj data', dataObj)
*/
      function post(dataObj) {
        return fetch('http://localhost:5000/api/getData', {
          method: 'POST',
          body: JSON.stringify(dataObj),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(checkStatus)
          .then(()=>console.log('post!!!'))
      }
      
      function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
          return response
        } else {
          var error = new Error(response.statusText)
          error.response = response
          throw error
        }
      }

      post(data);

    } else {
      console.log('Already booked. isFree', place.isFree)
    }
  }

  renderItems(props) {
    const { data, onClick } = props;
    console.log('parsedData', data);

    return Object.keys(data).map((id) => (
      <div
        onClick={(ev) => onClick(ev, id)}
        className={style.place}
        key={id}
      >
        <div className={style.num}>
          {data[id].id}
        </div>
        <div className={style.free}>
          {data[id].isFree}
        </div>
      </div>
    ));
  }

  render() {
    const { data } = this.state;
    return (
      <header>
        <div>
          {data !== null ? (
            <this.renderItems
              data={data}
              onClick={this.handleClick}
            />
          ) : (
              <span> Loading ... </span>
            )}
        </div>
      </header>
    )
  }
}

export default Parking;