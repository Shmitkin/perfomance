import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import NameSpace from './name-space.js';
import {reducer as TasksReducer} from "./tasks/tasks.js";

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  [NameSpace.TASKS]: TasksReducer,
});

export default createRootReducer;
