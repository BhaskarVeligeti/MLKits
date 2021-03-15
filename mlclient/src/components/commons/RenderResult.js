import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const RenderResult = ({ message, loading }) => {
    // console.log('Rendermessage :', message,loading)
    if (message && !loading) {
        return (
            <div className="row" >
                <div className="col" >
                    <div className="alert alert-success" role="alert">
                    <FontAwesomeIcon icon="check-circle" className="mr-2" /> {message}
                    </div>
                </div>

            </div>

        )
    } else {
        return null
    }
}


export default RenderResult