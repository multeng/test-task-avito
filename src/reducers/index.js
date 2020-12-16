import { combineReducers } from 'redux';
import newsListReducer from './news-list';
import newsInfoReducer from './news-info';

export default combineReducers({
  newsListReducer,
  newsInfoReducer,
});
