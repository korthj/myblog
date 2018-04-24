import { SERACH_BAR } from '../action/google_search';


export default function(state = [], action) {
    switch(action.type) {
        case SERACH_BAR:
            return [...state, action.payload.data];
    default:
    return state;
        }
}