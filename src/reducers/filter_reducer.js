import { FETCH_FILTERS } from '../actions';

const INITIAL_STATE = { filters: {} };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_FILTERS:
            return { ...state, filters: action.payload.data };
        default:
            return state;
    }
}
