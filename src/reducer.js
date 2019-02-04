import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { goods } from './redux/goods.redux'
export default combineReducers({user: user, goods: goods})
