import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
// import moment from 'moment/moment';

class SingleDatePickerView extends Component {
  constructor(props) {
    super(props);
    //this.state = {date:moment()}
    this.state = { dirty: false };
  }
  onDateChange = date => {
    //this.setState({ date: date });
    //this.props.onChange({ target: { value: date.format("MMM Do YYYY") } }, this.props._key)
    this.setState({ dirty: true }, () => {
      this.props.onChange({ target: { value: date } }, this.props._key);
    });
  };
  onFocusChange = ({ focused }) => {
    this.setState({ focused });
  };

  getDate = () => {
    if (this.props.value === '') {
      return null;
    } else {
      return this.props.value;
    }
  };
  render() {
    return (
      <div key={this.props._key}>
        <SingleDatePicker
          date={this.getDate()} // momentPropTypes.momentObj or null  current date
          small={true}
          showDefaultInputIcon={true}
          onDateChange={this.onDateChange} // PropTypes.func.isRequired
          focused={this.state.focused} // PropTypes.bool
          onFocusChange={this.onFocusChange}
          {...this.props.options}
        />
        <div className="invalid-feedback">
          {this.props.errorFor(this.props._key)}
        </div>
        <div className="valid-feedback">
          <small className="form-text">{this.props.small} </small>
        </div>
      </div>
    );
  }
}
SingleDatePickerView.propTypes = {
  _key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errorFor: PropTypes.func.isRequired
};

export default SingleDatePickerView;
/*
     ( Please provide valid {this.props.label}. )
*/