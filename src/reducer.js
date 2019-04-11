import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { goods } from './redux/goods.redux'
import { cart } from './redux/cart.redux'
import { order } from './redux/order.redux'

export default combineReducers({user: user, goods: goods,cart: cart, order})
