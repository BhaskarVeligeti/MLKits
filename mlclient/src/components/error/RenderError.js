import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const RenderError = ({ errorMessage, loading }) => {
    // console.log('RenderError :', errorMessage,loading)
    if (errorMessage && !loading) {
        return (
            <div className="row" >
                <div className="col" >
                    <div className="alert alert-danger" role="alert">
                        <FontAwesomeIcon icon="exclamation-circle" className="mr-2" />
                        <strong>{errorMessage.status}</strong> |  {errorMessage.message}
                    </div>
                </div>

            </div>

        )
    } else {
        return null
    }
}


export default RenderError