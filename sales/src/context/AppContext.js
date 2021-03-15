/* eslint-disable no-console,no-undef,no-unused-vars */
import createDataContext from './createDataContext';
import { may2019Data, june2019Data } from '../fixtures/staticdata.json.js'



let response;
/************************************************************* step 1:initial values ***********************************************************/
const INITIAL_STATE = {

    errorMessage: null,
    loading: false,
    refreshing: false,
    navId: 0,
    showComponent: null,
    menuItems: [{ "key": 1, "name": 'May - 2019' }, { "key": 2, "name": 'June - 2019' }],
    selectedMenu: null,
    may2019: may2019Data,
    june2019: june2019Data
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
        case 'taggle_nav':
            return { ...state, navId: action.payload, showComponent: 0 };
        case 'taggle_component':
            return { ...state, showComponent: action.payload.id, selectedMenu: action.payload.menu };



        default:
            return state;
    }
};


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

/*------------Predict----------------------*/
const _predict = (dispatch) => async (taggle) => {
    // console.log('@_taggleComponent:', taggle);
    dispatch({ type: 'taggle_component', payload: taggle });
};


/**************************************************************** : END :************************************************************************************* */



const actions = {
    _taggleNav, _taggleComponent,_predict
}
/****************************** calling auotmatic context and passing reducer,actions,defauit state ---- it is magic part **************************/
export const { Context, Provider } = createDataContext(appReducer, actions, INITIAL_STATE);
