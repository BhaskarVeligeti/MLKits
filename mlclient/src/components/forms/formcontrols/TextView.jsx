import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class TextView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dirty: false
    };
  }

  onChange = e => {
    // console.log('TextView:onChange', e.target.value);
    this.props.onChange({ target: { value: e.target.value } }, this.props._key);
    this.setState({ dirty: true });
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

  render() {

    return (
      <div key={this.props._key}>
        <div key={this.props._key} className={this.props.options.icon ? 'input-group mb-2' : ''} >
          {this.props.options.icon && (
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon icon={this.props.options.icon} style={this.getColor()} />
              </span>
            </div>
          )}
          <input
            className={this.getClassName()}
            type={this.props.type}
            key={this.props._key}
            value={this.props.value}
            onChange={e => this.onChange(e)}
            maxLength={this.props.maxLength}
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
    )
  }
}


export default TextView;
