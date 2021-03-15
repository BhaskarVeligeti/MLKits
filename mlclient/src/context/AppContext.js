/* eslint-disable no-console,no-undef,no-unused-vars */
import createDataContext from './createDataContext';
import expressApi from '../api/expressApi';
import history from '../history';
import getError from '../components/error/getError'
import { may2019Data, june2019Data } from '../fixtures/staticdata.json.js'

/**
     errorMessage: { message: "Incorrect email or password", status: 401 }
{
    authUser: {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjA2MTExNzUxMDUiLCJwYXNzd29yZCI6ImFiYyIsIm5hbWUiOiJNciBCaGFza2FyIFZlbGlnZXRpIiwicm9sZSI6IkFkbWluaXN0cmF0b3IiLCJpYXQiOjE1OTMxMDY0NTB9.9kWrAfwRh8MRKiSS26AZwbIfymwMemmEAsBXh2SoMbI",
        "username": "0611175105",
        "name": "Mr Bhaskar Veligeti",
        "role": "Administrator"
    }
}
 */


let response;
/************************************************************* step 1:initial values ***********************************************************/
const INITIAL_STATE = {
    send: '',
    receive: '',
    errorMessage: null,
    loading: false,
    authUser: null,
    navId: 0,
    showComponent: null,
    showModal: false,
    menuItems: [{ "key": 1, "name": 'May - 2019' }, { "key": 2, "name": 'June - 2019' }],
    selectedMenu: null,
    may2019: may2019Data,
    june2019: june2019Data,
    // prediction: [],
    lifestyle3MonthsStock: null,   // it is looks like : { yKey: 'Payments', data: [{ xValue: 'May', yValue: 500 }]
};

/*************************************************** step 2:creating  reducer  ...state = take all existing data ***********************************/
const appReducer = (state, action) => {
    switch (action.type) {
        /*--------------------------------------------------------------------------------------------------------------*/
        /** send: requset start time  | receive: response completed time */
        case 'request_send':
            return { ...state, loading: true };
        case 'response_receive':
            return { ...state, loading: false };
        case 'try_catch_errors':
            return { ...state, errorMessage: action.payload, loading: false };
        case 'initialState':
            return { ...state, ...INITIAL_STATE };
        case 'clear_messages':
            return { ...state, errorMessage: null, loading: false };
        case 'refresh':
            return { ...state, refreshing: action.payload };
        case 'auth_user':
            return { ...state, authUser: action.payload, errorMessage: null, loading: false };
        case 'signout':
            return { ...state, loading: false, ...INITIAL_STATE };
        case 'taggle_nav':
            return { ...state, navId: action.payload, showComponent: 0 };
        case 'taggle_component':
            return { ...state, showComponent: action.payload.id, selectedMenu: action.payload.menu };
        case 'modal':
            return { ...state, showModal: action.payload };
        case 'action':
            return { ...state, action: action.payload };
        case 'predict_request_send':
            return { ...state, loading: true, showModal: true };
        case 'predict_sales':
            return { ...state, prediction: [...state.prediction, action.payload], loading: false, showModal: false };// loading: false, showModal: false
        //prediction = { action, TotalBillAmount }

        default:
            return state;
    }
};


/*------------Authentication by Express server----------------------*/
const _predictSales = (dispatch) => async (input) => {
    // console.log('input@_predictSales :', input);
    try {
        /* step 1: make api request */
        dispatch({ type: 'predict_request_send' });
        response = await expressApi.post('/predict', input);
        // console.log('@response:', response.data); //{ action: 1, TotalBillAmount: 1.64 }
        if (response.data.message !== undefined) { // for Express Error
            let err = {
                "response": { status: response.data.status, data: response.data.message }
            }
            dispatch(getError(err));
        }
        else { //  Dispatch an action
            dispatch({ type: 'predict_sales', payload: response.data.prediction });
        }

    } catch (err) {
        // console.log('error@_signIn:', err);
        dispatch(getError(err));
    }
};


/*...........................................1.Prediction........................................................*/
/*------------Taggle Nav----------------------*/
const _taggleNav = (dispatch) => async (taggle) => {
    // console.log('@_taggleNav:', taggle);
    dispatch({ type: 'taggle_nav', payload: taggle });
};
/*------------Taggle Component----------------------*/
const _taggleComponent = (dispatch) => async (taggle) => {
    // console.log('@_taggleComponent:', taggle);
    dispatch({ type: 'taggle_component', payload: taggle });
};
const toggleModal = dispatch => (boolean) => {
    dispatch({ type: 'modal', payload: boolean });
};

/*------------Authentication by Express server----------------------*/
const _signIn = (dispatch) => async (input) => {
    // console.log('input@_signIn :', input);
    try {
        /* step 1: make api request */
        dispatch({ type: 'request_send' });
        response = await expressApi.post('/web/signin', input);
        // console.log('@response:', response.data);
        if (response.data.message !== undefined) { // for Express Error
            let err = {
                "response": { status: response.data.status, data: response.data.message }
            }
            dispatch(getError(err));
        }
        else { //  Dispatch an action
            /* step 2: Take JWT we get from API and store it on the localstorage */
            localStorage.setItem('user', JSON.stringify(response.data.authUser)); // convert into string object
            /* step 3:  Dispatch an action to put the token and user,role into state object as an object */
            dispatch({ type: 'auth_user', payload: response.data.authUser });
            /* step 4: Navigate the user to the 'Home' */
            history.push('/home');
        }

    } catch (err) {
        // console.log('error@_signIn:', err);
        dispatch(getError(err));
    }
};
const signOut = dispatch => async () => {
    // step 1: remove token
    try {
        dispatch({ type: 'request_send' });
        await localStorage.removeItem('user');
        dispatch({ type: 'signout' });
        history.push('/');
    } catch (error) {
        // console.log('error@signOut:', error.response.data);
        dispatch({ type: 'try_catch_errors', payload: error.response.data })
    }
}
const onRefresh = dispatch => (boolean) => {
    dispatch({ type: 'refresh', payload: boolean });
};
const clearMessages = dispatch => () => {
    dispatch({ type: 'clear_messages' });
};

/**************************************************************** : END :************************************************************************************* */



const actions = {
    onRefresh, clearMessages,
    _signIn, signOut,
    _taggleNav, _taggleComponent, toggleModal, _predictSales

}
/****************************** calling auotmatic context and passing reducer,actions,defauit state ---- it is magic part **************************/
export const { Context, Provider } = createDataContext(appReducer, actions, INITIAL_STATE);
