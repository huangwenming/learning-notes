import React, { Component } from 'react';
import FormatedDate from '../functionCom/index';

class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'hwm',
            country: 'China',
            birthTime: new Date()
        };
    }
    render() {
        return (
            <div>
                <p>this is a class component</p>
                <p>name: {this.state.name}</p>
                <p>country: {this.state.country}</p>
                <FormatedDate date={this.state.birthTime}></FormatedDate>
            </div>
        )
    }
}

export default Person;
