

import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { rootReducer } from '../reducers/rootReducer';



//Create reducers acepta sola una funcion, por lo que me creo un OBJETO que COMBINA los reducers,
//entonces si quiero agregar mas reducers, simplemente los agrego al objeto
// const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middleware = [thunk]

export const store = configureStore(
    {
        reducer: rootReducer,
        middleware,
        devTools: true
    },
);