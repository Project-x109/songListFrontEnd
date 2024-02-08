import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { songsSaga } from './sagas/songSagas';
import rootReducer from './reducers/rootReducer';
import { statisticsSaga } from './sagas/statsticsSaga';
function* rootSaga() {
  yield all([songsSaga(), statisticsSaga()]);
}
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
export default store;
