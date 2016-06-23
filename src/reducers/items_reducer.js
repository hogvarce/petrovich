import { FETCH_ITEMS, FILTER_ITEM } from '../actions';

const INITIAL_STATE = { all: [] };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_ITEMS:
            return { ...state, all: action.payload.data };
        case FILTER_ITEM:
            let filtered = [];
            for (let i in state.all){
                for (let filter in action.filters){
                    if ( state.all[i][action.filters[filter].toString()] )
                        filtered.push(state.all[i]);
                }
            }
            return { ...state, filtered: filtered };
        default:
            return state;
    }
}
