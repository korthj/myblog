import { combineReducer } from 'redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducer ({
    form: formReducer
});

export default rootReducer;