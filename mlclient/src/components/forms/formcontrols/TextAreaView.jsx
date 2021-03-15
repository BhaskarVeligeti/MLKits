import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

 class TextAreaView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dirty: false
    };
  }
  onChange = e => {
    // console.log('TextAreaView:onChange', e.target.value);
    this.props.onChange({ target: { value: e.target.value } }, this.props._key);
    this.setState({ dirty: true });
  };
  getColor = () => {
    // console.log("stage",this.props.stage,this.props._key,this.props.errorFor(this.props._key));
    if (this.state.dirty === false) {
      return {};
    } else {
      // console.log(this.state);
      if (this.props.errorFor(this.props._key) === '') {
        return { color: 'green' };
      } else {
        return { color: 'red' };
      }
    }
  };
  getClassName = () => {
    if (this.state.dirty === false) {
      return 'form-control';
    } else {
      if (this.props.errorFor(this.props._key) === '') {
        return 'form-control is-valid';
      } else {
        return 'form-control is-invalid';
      }
    }
  };
  render() {
    return (
      <div key={this.props._key}>
        <div
          key={this.props._key}
          className={this.props.options.icon ? 'input-group mb-2' : ''}
        >
          {this.props.options.icon && (
            <div className="input-group-prepend">
              <span className="input-group-text">
              <FontAwesomeIcon icon={this.props.options.icon} style={this.getColor()} />
              </span>
            </div>
          )}
          <textarea
            className={this.getClassName()}
            type={this.props.type}
            key={this.props._key}
            value={this.props.value}
            maxLength={this.props.maxLength}
            onChange={e => this.onChange(e)}
            {...this.props.options}
          />
           <div className="invalid-feedback">
            {this.props.errorFor(this.props._key)}
          </div>
          <div className="valid-feedback">
            <small className="form-text">{this.props.small} </small>
          </div>
        </div>
       
      </div>
    );
  }
} // end of TextView

TextAreaView.propTypes = {
  _key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errorFor: PropTypes.func.isRequired
};
/*
    ( Please provide valid {this.props.label}. )
*/
export default TextAreaView