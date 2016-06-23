import { combineReducers } from 'redux';

import ItemsReducer from './items_reducer';
import FiltersReducer from './filter_reducer';

const rootReducer = combineReducers({
  items: ItemsReducer,
  filters: FiltersReducer
});

export default rootReducer;
