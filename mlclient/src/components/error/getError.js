export default (err) => {
    // err.response = Object { status: 422, message: "Invalid username" }
    if (err.response !== undefined) {
        switch (err.response.status) {
            case 502:   // from web server
                return { type: 'try_catch_errors', payload: { status: 502, message: ' web service is not running,Try later' } };
            case 400:   // from web server
                return { type: 'try_catch_errors', payload: { status: 400, message: 'web server was unable to process the request' } };
            case 422:   // from Express
                return { type: 'try_catch_errors', payload: { status: err.response.status, message: err.response.data } };
            default:
                return null;
        }
    } else {
        return { type: 'try_catch_errors', payload: { status: 500, message: ' Poor Network Signal,Try later' } };
    }

}