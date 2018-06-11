import { FETCH_POSTS,FETCH_POST } from '../action/posts';

export default (state = {}, action) => {
    switch(action.type) {
        case FETCH_POSTS:
        console.log(action.payload)
            return action.payload
    default:
    return state;
    }
}