/* eslint-disable no-undef */
import React from 'react';
import moment from 'moment';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: moment.utc(moment.utc().format()).local() //new Date().toLocaleString()
        };
    }
    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    tick() {
        this.setState({
            time: moment.utc(moment.utc().format()).local() //new Date().toLocaleString()
        });
    }
    render() {
        return (
            <div>{moment(this.state.time).format('dddd, Do MMMM YYYY, h:mm:ss a')}</div>
        );
    }
}

export default Clock;
