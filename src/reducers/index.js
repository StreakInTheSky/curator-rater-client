import { combineReducers } from 'redux';
import { combineForms } from 'react-redux-form';
import AuthReducer from './auth-reducer';
import ProfileReducer from './profile-reducer';
import CurateReducer from './curate-reducer';

const initialLoginState = {
  email: '',
  password: ''
}

const initialRegistrationState = {
  username: '',
  email: '',
  password: '',
  // passwordConfirm: ''
};

const rootReducer = combineReducers({
  auth: AuthReducer,
  profile: ProfileReducer,
  curate: CurateReducer,
  forms: combineForms({
    login: initialLoginState,
    register: initialRegistrationState
  }, 'forms')
});

export default rootReducer;
