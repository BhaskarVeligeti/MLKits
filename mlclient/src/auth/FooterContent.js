import React from 'react';
import moment from "moment";


const FooterContent = () => {

    return (
        <footer className="footer mt-auto py-2 fixed-bottom">
            <div className="container d-flex justify-content-center">
                <span className="footer-text">{moment.utc().format('YYYY')} &copy; RoRo Projects</span>
            </div>
        </footer>

    );


};
export default FooterContent;





