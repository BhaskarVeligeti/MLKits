/* eslint-disable no-undef  */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

//Modal reusable component


export const ModalHeader = props => {
    return <div className="modal-header custom-modal-header pt-2 pb-2">{props.children}</div>;
};
ModalHeader.propTypes = {
    children: PropTypes.node
};

export const ModalBody = props => {
    return <div className="modal-body" style={{overflowX:"hidden"}}>{props.children}</div>;
};
ModalBody.propTypes = {
    children: PropTypes.node
};
export const ModalFooter = props => {
    return <div className="modal-footer pt-0 pb-0">{props.children}</div>;
};
ModalFooter.propTypes = {
    children: PropTypes.node
};

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: '',
            display: 'none'
        };
    }

    openModal() {
        this.setState({
            modalShow: 'show',
            display: 'block'
        });
    }

    closeModal() {
        this.setState({
            modalShow: '',
            display: 'none'
        });
    }

    componentDidMount() {
        this.props.isOpen ? this.openModal() : this.closeModal();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.props.isOpen ? this.openModal() : this.closeModal();
        }
    }

    getClassName = () => {
        // console.log('this.checkStage();', this.checkStage())
        var _className = "modal-dialog "
        if (this.props.large === 1) {
            _className = "modal-dialog modal-lg"
            if (this.props.scroll === 1) {
                _className = _className + " modal-dialog-scrollable"

            }
        }

        if (this.props.large === 2) {
            _className = "modal-dialog modal-xl"

            if (this.props.scroll === 1) {
                _className = _className + " modal-dialog-scrollable"
            }
        }

        // _className = "modal-dialog"

        // if (this.props.scroll === 1) {
        //     _className = _className + " modal-dialog-scrollable"

        // } else {
        //     _className = _className
        // }


        return _className;
    };

    render() {

        // return ( modal-dialog modal-dialog-scrollable
        //     <div id="myModal" className={'modal fade ' + this.state.modalShow}
        //         data-backdrop="static"
        //         data-keyboard="false"
        //         tabIndex="-1"
        //         role="dialog"
        //         aria-labelledby="staticBackdropLabel"
        //         aria-hidden="true"
        //         style={{ display: this.state.display }} >
        //         <div className="modal-dialog" role="document">
        //             <div className="modal-content">{this.props.children}</div>
        //         </div>
        //     </div> 
        // );




        return ReactDOM.createPortal(
            <div id="myModal"
                className={'modal fade ' + this.state.modalShow}
                tabIndex="-1"
                role="dialog"
                aria-hidden="true"
                style={{ display: this.state.display }} >
                {/* <div className={this.props.large === 1 ? "modal-dialog modal-dialog-scrollable modal-lg" : "modal-dialog modal-dialog-scrollable"} role="document"> */}
                <div className={this.getClassName()} role="document">
                    <div className="modal-content">{this.props.children}</div>
                </div>
            </div>, document.querySelector('#modal')
        );
    }
}



Modal.propTypes = {
    children: PropTypes.node,   // Anything that can be rendered: numbers, strings, elements or an array  (or fragment) containing these types.
    isOpen: PropTypes.any,
    large: PropTypes.any,
    scroll: PropTypes.any
};


export default Modal;

