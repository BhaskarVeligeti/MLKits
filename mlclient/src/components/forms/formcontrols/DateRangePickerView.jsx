import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DateRangePicker } from 'react-dates';

class DateRangePickerView extends Component {
  constructor(props) {
    super(props);
    this.state = { startDate: null, endDate: null };
  }

  onDateRangeChange = ({ startDate, endDate }) => {
    // console.log(startDate, endDate);
    if (startDate != null && endDate != null) {
      this.setState({ startDate: startDate, endDate: endDate }, () => {
        // console.log(this.state);
        this.props.onChange(
          {
            target: {
              value: {
                // startDate: startDate.format('MMM Do YYYY'),
                // endDate: endDate.format('MMM Do YYYY')
                startDate: startDate,
                endDate: endDate
              }
            }
          },
          this.props._key
        );
      });
    } else {
      this.setState({ startDate: startDate, endDate: endDate });
    }
  };

  render() {
    return (
      <div key={this.props._key}>
        <DateRangePicker
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="startDateId"
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="endDateId"
          small={true}
          showDefaultInputIcon={true}
          onDatesChange={({ startDate, endDate }) =>
            this.onDateRangeChange({ startDate, endDate })
          } // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
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
} // end of SingleDatePickerView

DateRangePickerView.propTypes = {
  _key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errorFor: PropTypes.func.isRequired
};
export default DateRangePickerView;
/*
 ( Please provide a start and end date for {this.props.label}. )
*/