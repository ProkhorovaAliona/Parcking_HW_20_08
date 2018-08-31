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
      .catch(error => console.log('failed', error));
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