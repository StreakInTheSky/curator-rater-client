
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';
import authReducer from './reducers/auth-reducer';
import curateReducer from './reducers/curate-reducer';
import galleryReducer from './reducers/gallery-reducer';
import profileReducer from './reducers/profile-reducer';
import {setAuthToken} from './actions/auth';

const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        curate: curateReducer,
        gallery: galleryReducer,
        profile: profileReducer
    }),
    applyMiddleware(thunk)
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
}

export default store;
