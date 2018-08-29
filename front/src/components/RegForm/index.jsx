import React, { Component } from 'react';

class RegForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: ''
        };
        this.handleChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('form is submitted. Value is', this.state.email);
    }

    handleChange(event) {
        console.log('email was changed', event.target.value);
        this.setState({email: event.target.value})
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                />
                <button>
                    Save
                </button>
            </form>
        );
    }
}

export default RegForm;