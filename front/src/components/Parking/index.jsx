import React, { Component } from 'react';
import style from './style.scss';

class Parking extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
            available: 'available'
        }
        this.handleClick = this.handleClick.bind(this);
    }

    // componentWillMount() {
    //     const { data } = this.state;
    //     if(!data.isFree){
    //         this.setState({
    //           available: 'booked' 
    //         })
    //     }
    // }

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
   //   const { available } = this.state;
      const { data } = this.state;
      const place = data[id];
      console.log('event', ev)
        if(place.isFree == "free"){
          console.log('isFree', place.isFree)
          place.isFree = "booked";
          this.setState({
            available: "booked"
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
      return(
          <header>
            <div>
            { data !== null ? (
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