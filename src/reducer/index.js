import { combineReducers } from 'redux';
import posts from './blog_search_bar';
import postsKey from './postKey';

const rootReducer = combineReducers ({    
    posts : posts,
    postKey : postsKey
}); 
export default rootReducer;