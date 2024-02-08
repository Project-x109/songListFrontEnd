import { combineReducers } from 'redux';
import songReducer from './songReducer';
import countReducer from './statsticsReducer';

const rootReducer = combineReducers({
  song: songReducer,
  counts: countReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
