import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SignInForm from '../components/forms/auth/SignInForm';
import { Context as AppContext } from '../context/AppContext';
// import process from '../images/LifestyleProcess.png';
import RenderError from '../components/error/RenderError';


const AuthContent = () => {
    const { state: { loading, errorMessage, updatePasswordResult }, _signIn } = useContext(AppContext);

    const handleSignIn = (formData) => {
        // alert(`Now You can submit form :,${JSON.stringify(formData)}`)   // formData: {"email":"test@test.com","password":"abc"}
        _signIn(formData);
    };




    return (

        <main role="main" className="container pt-5">
            {/* <div className="row">
                <div className="col-4">
                    <h4>Authentication...</h4>
                </div>
                <div className="col-4">
                    <img src={logo} width="50" height="50" className="rounded mx-auto d-block" alt="Responsive image" />
                </div>
            </div> */}

            <div className="row py-2">
                <div className="col-8">
                {/* <img src={process} width="100%" height="650" className="img" alt="" /> */}
                </div>

                <div className="col content-border-left-width">
                    {updatePasswordResult && <div className="alert alert-success" role="alert">
                        Password updated successfully!
                    </div>}
                
                        <div className="shadow-lg p-3 mb-5 bg-white rounded" style={{marginTop:'76px'}}>
                            <div style={{ marginTop: '-50px' }}>
                                <FontAwesomeIcon icon="user-circle" className="mr-2 rounded mx-auto d-block" style={{ fontSize: '50px', color: '#20c997' }} />
                            </div>
                            <div className="text-secondary text-center pt-5" >
                                <h5>Authentication</h5>
                            </div>
                            <div id="signin">
                                <RenderError errorMessage={errorMessage} loading={loading} />
                                <SignInForm handleSubmit={handleSignIn} loading={loading} />
                            </div>
                        </div>

                   
                </div>
            </div>





        </main >

    );


};
export default AuthContent;








