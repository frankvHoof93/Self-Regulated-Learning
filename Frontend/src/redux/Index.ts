import { applyMiddleware, createStore, combineReducers } from 'redux'
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware as routerWare, connectRouter } from 'connected-react-router'

import { navigationReducer } from './navigation/Reducers';
import { authReducer } from './auth/Reducers';
import { feedbackReducer } from './feedback/Reducers';

export const history = createBrowserHistory()
const routerMiddleware = routerWare(history);

const rootReducer = combineReducers({
    navigation: navigationReducer,
    auth: authReducer,
    feedback: feedbackReducer,
    router: connectRouter(history),
});

const logger = createLogger({
    collapsed: true,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middelwares = [logger, thunkMiddleware, routerMiddleware];
    const middlewareEnhancer = applyMiddleware(...middelwares);

    const store = createStore(
        rootReducer,
        composeWithDevTools(middlewareEnhancer),
    );

    return store;
};