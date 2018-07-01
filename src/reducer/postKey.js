import { FETCH_POSTKEY } from '../action/posts';

export default (state = {}, action) => {
    switch(action.type) {
        case FETCH_POSTKEY:
            return action.payload          
    default:
    return state;
    }
}