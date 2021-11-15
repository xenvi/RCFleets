import { combineReducers } from 'redux';
import auth from './auth';
import ui from './ui';
import fleet from './fleet';

export default combineReducers({
    auth,
    ui,
    fleet,
});
