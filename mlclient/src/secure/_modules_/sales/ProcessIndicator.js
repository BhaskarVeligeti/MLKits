import React from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/modal/Modal';
import RenderError from '../../../components/error/RenderError';
import logo from '../../../images/workflow.gif';

const ProcessIndicator = ({ showModal, loading, header, errorMessage }) => {
    return (
        <div >
            <Modal isOpen={showModal} large={1} >
                <ModalHeader>
                    <div className="row">
                        <div className="col">
                            {header}
                        </div>
                    </div>

                </ModalHeader>
                <ModalBody>
                    <RenderError errorMessage={errorMessage} loading={loading} />
                    {loading &&
                        <div className="text-center">
                            <img src={logo} className="rounded" alt="..." />
                        </div>
                    }
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </div>
    )
}

ProcessIndicator.propTypes = {
    showModal: PropTypes.any,
    loading: PropTypes.any,
    header: PropTypes.any,
    errorMessage: PropTypes.any
};

export default ProcessIndicator;
