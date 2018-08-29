import React, { Component } from 'react';
import style from './style.scss';

class Parcking extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            isFree : this.props.isFree,
            booked: 'no'
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        if(!this.state.isFree){
            this.setState({
                booked: 'yes' 
            })
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/getTest')
        .then((res) => {
            if (res.status >= 400) {
            throw new Error('Bad response from server');
            }
            res.json();
        })
        .then((result) => {
            this.setState({
            data: result
            });
        });
    }


    handleClick = (ev, id) => {

    }

    render() {
    const { handleClick } = this;
    const { data } = this.state;
        return(
            <div>
                {Object.keys(data).map(key => (
                    <div key={key} onClick={(ev) => handleClick(ev, data[key.id])}>
                    {key} : {data[key]}
                    </div>
                ))}
            </div>
        );
    }

    handleClick() {
        if(this.state.isFree){
            this.setState({
                isFree: false,
                booked: 'yes'
            })
        } else {
            this.setState({
                isFree: true,
                booked: 'no'
            })
        }
    }

    render() {
        return(
            <header>
                <div onClick={this.handleClick} className={style.place}>
                    <p>{this.state.booked}</p>
                    <p>{this.props.id}</p>
                </div>
            </header>
        )
    }
}

export default Parcking;