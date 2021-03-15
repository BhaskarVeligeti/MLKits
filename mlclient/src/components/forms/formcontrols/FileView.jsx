import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Each File is stored in a "FileList" object that is populated by a user interacting with the <input type="file> element.
 * The File objects in "FileList" are simply references to the file in your local filesystem.
 * so to get the actual data of that file to work with in the browser, we need to “import” it using the FileReader().
 */

class FileView extends Component {
  constructor(props) {
    super(props);
    // console.log("props :", this.props)
    this.state = { dirty: false };
  }

  onChange = async (e) => {
    var value = e.target.value;    //  C:\fakepath\Untitled.png path
    var file = e.target.files[0];  // can access the user uploaded file content
    var size = (file.size / 1024).toFixed(2); // in "KB"
    const objectURL = URL.createObjectURL(file)    //objectURL : blob:http://localhost:3000/684efd84-aef8-4bf2-ad19-aaba30c7ced9 The new object URL represents the specified File object or Blob object.

    /** check the size of the image */
    if (size < 1025) {
      this.props.onChange({ target: { value } }, this.props._key);
      this.setState({ imgUrl: objectURL, size, dirty: true, selected: file.name, size, imgError: undefined }, () => {
        // callback  send file to parent so that parent will get the content in base64 string
        this.props.file(file);
      })
    } else {
      this.setState({ size, imgError: "Please upload image size < 1 MB" })
    }




  }

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

  getClassName2 = () => {
    if (this.state.dirty === true) {
      return 'custom-file-label selected text-truncate';
    } else {
      return 'custom-file-label';
    }
  }

  getClassName = () => {
    if (this.state.dirty === false) {
      return 'form-control custom-file-input';
    } else {
      if (this.props.errorFor(this.props._key) === '') {
        return 'form-control is-valid custom-file-input';
      } else {
        return 'form-control is-invalid custom-file-input';
      }
    }
  };
  render() {
    return (
      <div key={this.props._key}>
        <div
          key={this.props._key}
          className='custom-file'
          style={this.state.imgUrl ? { marginBottom: 120 } : null}
        >
          <input
            ref="uploadImg"
            className={this.getClassName()}
            type={this.props.type}
            key={this.props._key}
            value={this.props.value}
            onChange={e => this.onChange(e)}
            {...this.props.options}
          />
          <label className={this.getClassName2()} data-browse="Browse">{this.state.selected}</label>
          <div >
            <small className="form-text text-danger">{this.props.errorFor(this.props._key)}</small>
          </div>
          <div>
            {this.state.imgError && <small className="form-text text-danger">{this.state.imgError && this.state.imgError}</small>}
          </div>
          <div className="valid-feedback">
            <small className="form-text">{this.props.small} {" Image size "}<code style={{ fontSize: "11px" }}>{this.state.size && this.state.size} {"KB"}</code></small>
            {this.state.imgUrl && <div className="py-1" ><img src={this.state.imgUrl} className="rounded mx-auto d-block" height="130"  alt="" /></div>}
          </div>

        </div>

      </div>
    );
  }
} // end of FileView

FileView.propTypes = {
  _key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  file: PropTypes.func.isRequired,
  errorFor: PropTypes.func.isRequired
};

export default FileView;
