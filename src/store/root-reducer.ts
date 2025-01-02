import { combineReducers } from 'redux'
import taskReducer from './tasks/reducer'

const rootReducer = combineReducers({
  task: taskReducer,
})

export default rootReducer