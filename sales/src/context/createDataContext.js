import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

/*  "createDataContext"  this file is very very important
Reusable Automatic Context creation and it is export a plane function from this file.
parameters :  reducer,actions,INITIAL_STATE
*/

const createDataContext = (reducer, actions, INITIAL_STATE) => {

    // Step 1: create context object, it is a just like pipeline to send data to below levels from Provider
    const Context = React.createContext();

    // Step 2:  create helper Provider Component    : { children } === <App/>
    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, INITIAL_STATE);   // initial state
        // actions === { addBlogPost: (dispatch) => { return () => { } } }
        const boundActions = {};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch)
        }
        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        )
    }
    Provider.propTypes = {
        children: PropTypes.node
    };
    /*
    Provider :  provides data  available  inside of application.
    Context : use to get access like pipe  from one of our child components to  app state.
    */
    return { Context, Provider }
}

createDataContext.propTypes = {
    // children: PropTypes.node,
    reducer: PropTypes.node,
    actions: PropTypes.node,
    INITIAL_STATE: PropTypes.node,
};
export default createDataContext
