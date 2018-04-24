import { combineReducers } from 'redux';
import blogSearchBar from './blog_search_bar';

const rootReducer = combineReducers ({
    posts : blogSearchBar  
}); 

export default rootReducer;