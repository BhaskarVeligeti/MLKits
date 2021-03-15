import React, { Component } from 'react';
import PropTypes from 'prop-types';

 class CheckboxView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dirty: false,
      selected:
        this.props.value === undefined || this.props.value === ''
          ? []
          : this.props.value
    };
  }

  onChange = e => {
    // console.log('Key-checked :', e, e.target.name);
    // console.log('e.target.checked :', e.target.checked);

    if (e.target.checked === true) {
      this.state.selected.push(e.target.name); // add item into array
      // console.log('selected :', JSON.stringify(this.state.selected));
      this.props.onChange(
        { target: { value: this.state.selected } },
        this.props._key
      );
      this.setState({ dirty: true });
    }
    if (e.target.checked === false) {
      this.setState(
        {
          selected: this.state.selected.filter(
            d => d !== e.target.name // remove item from array
          ),
          dirty: true
        },
        () => {
          // console.log('state :',JSON.stringify(this.state))
          this.props.onChange(
            { target: { value: this.state.selected } },
            this.props._key
          );
        }
      );

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

  getClassName = () => {
    if (this.state.dirty === false) {
      return '';
    } else {
      if (this.props.errorFor(this.props._key) === '') {
        return 'is-valid';
      } else {
        return 'is-invalid';
      }
    }
  };

  check = key => {
    // console.log('check', key, this.props.value);
    var fd = false;
    if (this.props.value !== '') {
      this.props.value.forEach(e => {
        // console.log(e, key);
        if (e === key) {
          // console.log('true');
          fd = true;
        }
      });
    }
    // console.log(fd);
    return fd;
  };
  render() {
    const content = this.props.options.map((row, idx) => (
      <div
        key={'ll' + row.key}
        className={
          this.props.opts.inline === true
            ? 'custom-control-inline'
            : 'custom-control'
        }
      >
        <label key={'ll' + row.key} className="custom-control custom-checkbox">
          <input
            className={'custom-control-input'}
            type="checkbox"
            name={row.key}
            value={row.value}
            checked={this.check(row.key)}
            disabled={this.props.opts.disabled}
            onChange={e => {
              this.onChange(e);
            }}
          />
          <span className="custom-control-indicator" />
          <span className="custom-control-label "> {row.label}</span>
        </label>
      </div>
    ));
    return (
      <div>
        {content}
        {/* <div className="validation-error">
          {this.props.errorFor(this.props._key)}
        </div> */}
        <div className="invalid-feedback">
            {this.props.errorFor(this.props._key)}
          </div>
      </div>
    );
  }
} // end of CheckboxView

CheckboxView.propTypes = {
  _key: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  // reload: PropTypes.func.isRequired
  // errorFor: PropTypes.func.isRequired
  //className={this.getClassName() +'custom-control-input'}
};
export default CheckboxView;