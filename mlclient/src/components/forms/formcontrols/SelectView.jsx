import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

class SelectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dirty: false
    };
  }
  // To style all selects
  componentDidMount() {
    // $('.selectpicker').selectpicker();
    $.fn.selectpicker.Constructor.BootstrapVersion = '4';
    $('select').selectpicker();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Typical usage (don't forget to compare props):
    // console.log('prevProps - model :', prevProps.options);
    if (prevProps.options) {
      $('select').selectpicker('refresh');
    }

  }
  onChange = e => {
    // console.log('Selected value: ', e.target.value);
    this.props.onChange({ target: { value: e.target.value } }, this.props._key);
    this.setState({ dirty: true });

  };

  getClassName = () => {
    if (this.state.dirty === true) {
      return 'form-control is-valid';
    } else {
      return 'form-control';
    }
  };

  render() {
    // console.log('this.props.options :', this.props.options) show-menu-arrow
    const options = this.props.options.map(o => (
      <option key={o.key} value={o.value}> {o.label}</option>
    ));

    let content = (
      <div key={this.props._key}>
        <select
          value={this.props.value}
          className={this.getClassName() + ' selectpicker show-tick'}
          width='auto'
          title="Nothing selected"
          data-live-search="true"
          // data-size="15"
          data-header={this.props.header}
          {...this.props.opts}
          onChange={e => this.onChange(e)} >
          {options}
        </select>
        <div className="invalid-feedback">
          {this.props.errorFor(this.props._key)}
        </div>
        <div className="valid-feedback">
          <small className="form-text">{this.props.small} </small>
        </div>
      </div>
    );

    // console.log("select : Rendered....")
    return content;
  }
} // end of TextView

SelectView.propTypes = {
  _key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errorFor: PropTypes.func.isRequired
};

export default SelectView;
/*
          ( Please provide valid {this.props.label}. )
  <select
        value={this.state.selected}
        className={this.getClassName()+' selectpicker show-tick show-menu-arrow'}
        width='100px'
        title="Choose one of the following..."
        data-size="5"
        data-live-search="false"
        {...this.props.opts}
        onChange={(e) => this.onChange(e)}>
        <optgroup label="Location">
          {content}
        </optgroup>
      </select>
*/
