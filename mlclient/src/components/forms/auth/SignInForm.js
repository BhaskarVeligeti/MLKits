import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DynamicForm from '../dynamicform/DynamicForm.jsx';
import { signinForm } from '../form.json.js';


class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = { form: signinForm };
    }

    /* controls reload */
    reload = () => this.forceUpdate();

    /* form level checking all controls are pass validations */
    checkStage = () => {
        // console.log("checkStage")
        if (this.dynForm === undefined) {
            return true;
        }
        // console.log("before switch :", this.dynForm.state.stage)
        switch (this.dynForm.state.stage) {
            case 'Initial':
            case 'Incomplete':
                return true;
            case 'Complete':
                return this.props.loading ? true : false;
            default:
                return true;
        }
    };

    getClassName = () => {
        // console.log('this.checkStage();', this.checkStage())
        if (this.checkStage() === true) {
            return 'btn btn-primary btn-md btn-block';
        } else {
            return 'btn btn-primary btn-md btn-block';
        }
    };


    handleSubmit = e => {
        e.preventDefault();
        if (this.dynForm.checkValidations() === true) {
            var data = this.dynForm.getData();
            this.props.handleSubmit(data); // send to parent
        }
    };



    render() {
        return (
            <form>
                <DynamicForm          /* configure the form  controls */
                    model={this.state.form}
                    groups={1}        /* groups will be 1 to 4 only 1=col-md-12,  2= col-md-6 , 3=col-md-4  4= col-md-3 */
                    columns="col-md-12"
                    ref={node => (this.dynForm = node)}  /**you to have direct access to the DOM element or component instance. */
                    reload={this.reload}
                />
                <div className="auth-button-padding">
                    <button
                        disabled={this.checkStage()}
                        className={this.getClassName()}
                        onClick={this.handleSubmit}>
                        {this.props.loading && <div><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> <span >Processing...</span></div>}
                        {!this.props.loading && 'SignIn'}
                    </button>
                </div>
            </form>
        );
    }
}

SignInForm.propTypes = {
    loading: PropTypes.any,
    handleSubmit: PropTypes.any,
    type: PropTypes.any
};
export default SignInForm;
