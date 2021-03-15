import React from 'react';


const LoaderMessage = ({ loading, text }) => {

  if (loading) {
    return (
      <div className="row">
        <div className="col py-3">
          <div className="spinner-grow text-primary" role="status"> <span className="sr-only">{text}</span> </div>
        </div>
      </div>


    )
  }
  else { return null }
}


export default LoaderMessage;
